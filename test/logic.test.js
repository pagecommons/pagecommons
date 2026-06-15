'use strict';

// ─── Pure-logic tests ───────────────────────────────────────────────────────
// Exercises the app's data/text functions directly against the booted globals.
// These cover the bugs most likely to silently corrupt user data or open an
// XSS hole, none of which a visual user-test would reliably catch.

var test = require('node:test');
var assert = require('node:assert');
var boot = require('./helpers/boot.js').boot;

var SEED = { pc_tc_accepted: '1', pc_preferences_set: '1', pc_ai_mode: 'shared' };

// One booted instance shared across the pure-function tests (no DOM mutation).
var appP = boot({ seed: SEED });

test('getQueryParam reads code and ignores look-alike params (promocode)', async function () {
  var w = (await appP).window;
  assert.strictEqual(w.getQueryParam('?foo=1&code=abc123&x=2', 'code'), 'abc123');
  assert.strictEqual(w.getQueryParam('?promocode=zzz', 'code'), null,
    'must not false-match ?promocode= (the v0.39 OAuth init bug)');
  assert.strictEqual(w.getQueryParam('', 'code'), null);
});

test('bookKey is deterministic and distinguishes different books', async function () {
  var w = (await appP).window;
  var a = w.bookKey({ title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' });
  var a2 = w.bookKey({ title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' });
  var b = w.bookKey({ title: 'Moby Dick', author: 'Herman Melville' });
  assert.strictEqual(a, a2, 'same book must yield the same key');
  assert.notStrictEqual(a, b, 'different books must yield different keys');
  assert.ok(a.length > 0);
});

test('formatText escapes HTML metacharacters (< > & ")', async function () {
  var w = (await appP).window;
  var out = w.formatText('<script>alert(1)</script> & "x"');
  assert.ok(out.indexOf('<script>') === -1, 'raw <script> must be escaped');
  assert.ok(out.indexOf('&lt;') !== -1 && out.indexOf('&gt;') !== -1, 'angle brackets escaped');
  assert.ok(out.indexOf('&amp;') !== -1, 'ampersand escaped');
  assert.ok(out.indexOf('&quot;') !== -1, 'double quote escaped (XSS hardening)');
});

test('detectLanguage recognises Chinese and defaults English to null', async function () {
  var w = (await appP).window;
  assert.strictEqual(
    w.detectLanguage({ title: '孫子兵法', author: '孫子', description: '兵者，國之大事' }),
    'Traditional Chinese'
  );
  assert.strictEqual(
    w.detectLanguage({ title: 'Moby Dick', author: 'Herman Melville', description: 'Call me Ishmael' }),
    null
  );
});

test('mergeSyncPayloads unions reading_state across devices (no book dropped)', async function () {
  var w = (await appP).window;
  var local = {
    schema_version: 1,
    sync_meta: { reading_state_modified: 100, status_modified: 100, preferences_modified: 100, shelf_modified: 100 },
    reading_state: { bookA: 'finished', bookB: 'midway' },
    preferences: { font_size: '18' },
    shelf: [{ title: 'A', author: 'x' }],
    conversations: {}, notes: {}, passages: {}
  };
  var remote = {
    schema_version: 1,
    sync_meta: { reading_state_modified: 200, status_modified: 200, preferences_modified: 50, shelf_modified: 200 },
    reading_state: { bookB: 'finished', bookC: 'started' },
    preferences: { font_size: '22', reply_length: 'short' },
    shelf: [{ title: 'B', author: 'y' }],
    conversations: {}, notes: {}, passages: {}
  };
  var m = w.mergeSyncPayloads(local, remote);

  // Keys unique to one side always survive.
  assert.strictEqual(m.reading_state.bookA, 'finished', 'local-only book must survive merge');
  assert.strictEqual(m.reading_state.bookC, 'started', 'remote-only book must survive merge');
  // Conflicting key resolves to the side with the newer timestamp (remote here).
  assert.strictEqual(m.reading_state.bookB, 'finished', 'newer (remote) status should win');
});

test('mergeSyncPayloads resolves preferences by timestamp and keeps both shelves', async function () {
  var w = (await appP).window;
  var local = {
    sync_meta: { preferences_modified: 100, shelf_modified: 100, status_modified: 100, reading_state_modified: 100 },
    preferences: { font_size: '18' },
    shelf: [{ title: 'A', author: 'x' }],
    reading_state: {}, conversations: {}, notes: {}, passages: {}
  };
  var remote = {
    sync_meta: { preferences_modified: 50, shelf_modified: 200, status_modified: 200, reading_state_modified: 200 },
    preferences: { font_size: '22', reply_length: 'short' },
    shelf: [{ title: 'B', author: 'y' }],
    reading_state: {}, conversations: {}, notes: {}, passages: {}
  };
  var m = w.mergeSyncPayloads(local, remote);

  assert.strictEqual(m.preferences.font_size, '18', 'newer (local) preference should win');
  assert.strictEqual(m.preferences.reply_length, 'short', 'remote-only preference should be kept');
  assert.strictEqual(m.shelf.length, 2, 'shelf should be the union of both devices');
});
