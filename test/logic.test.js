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

// ── bookKey collision fix + one-time migration (v0.41) ──────────────────────

function legacyKey(book) {
  return btoa(encodeURIComponent((book.title + '||' + book.author).slice(0, 40))).replace(/=/g, '');
}
function fullKey(book) {
  return btoa(encodeURIComponent(book.title + '||' + book.author)).replace(/=/g, '');
}
// A long-titled book whose title+author exceeds the old 40-char cap, so the
// legacy (truncated) key differs from the new (full) key.
var LONG_BOOK = { title: 'The Lord of the Rings: The Fellowship of the Ring', author: 'J.R.R. Tolkien' };
var SHORT_BOOK = { title: 'Dune', author: 'Frank Herbert' };

test('bookKey uses the full title+author (no 40-char collision)', async function () {
  var w = (await appP).window;
  // Two long titles that share the same first 40 chars must get distinct keys.
  var a = w.bookKey({ title: 'A Very Long Series Title, Book One: The Beginning', author: 'X' });
  var b = w.bookKey({ title: 'A Very Long Series Title, Book Two: The Middle', author: 'X' });
  assert.notStrictEqual(a, b, 'long titles sharing a 40-char prefix must not collide');
  // Short books keep the same key as the legacy scheme — no migration needed.
  assert.strictEqual(w.bookKey(SHORT_BOOK), legacyKey(SHORT_BOOK), 'short-title key must be unchanged');
});

test('migrateBookKeys moves a long-titled book’s data from legacy to new key', async function () {
  var seed = {
    pc_tc_accepted: '1', pc_preferences_set: '1', pc_ai_mode: 'shared',
    pc_shelf_books: JSON.stringify([LONG_BOOK])
  };
  // Durable data stored under the OLD key, as a pre-v0.41 user would have it.
  seed['pc_status_' + legacyKey(LONG_BOOK)] = 'finished';
  seed['pc_convs_' + legacyKey(LONG_BOOK)] = JSON.stringify([{ id: '1', messages: [] }]);

  var app = await boot({ seed: seed });
  var ls = app.localStorage;
  var newK = fullKey(LONG_BOOK);
  var oldK = legacyKey(LONG_BOOK);
  assert.notStrictEqual(newK, oldK, 'test book must actually have a truncated legacy key');

  assert.strictEqual(ls.getItem('pc_status_' + newK), 'finished', 'status must move to the new key');
  assert.strictEqual(ls.getItem('pc_convs_' + newK), JSON.stringify([{ id: '1', messages: [] }]), 'conversations must move');
  assert.strictEqual(ls.getItem('pc_status_' + oldK), null, 'legacy status key must be cleared');
  assert.strictEqual(ls.getItem('pc_bookkey_migrated_v1'), '1', 'migration flag must be set');
});

test('migrateBookKeys is a no-op when already migrated', async function () {
  var seed = {
    pc_tc_accepted: '1', pc_preferences_set: '1', pc_ai_mode: 'shared',
    pc_bookkey_migrated_v1: '1',
    pc_shelf_books: JSON.stringify([LONG_BOOK])
  };
  seed['pc_status_' + legacyKey(LONG_BOOK)] = 'midway';
  var app = await boot({ seed: seed });
  var ls = app.localStorage;
  // Flag already set → legacy data is left exactly where it was.
  assert.strictEqual(ls.getItem('pc_status_' + legacyKey(LONG_BOOK)), 'midway');
  assert.strictEqual(ls.getItem('pc_status_' + fullKey(LONG_BOOK)), null);
});

// ─── ISBN lookup ────────────────────────────────────────────────────────────
// Regression: ISBN search used to query Open Library alone, so recent titles
// came back "not found" even when Google Books had them (reported against
// 9781804953334). Google Books is now tried first, via the authenticated
// proxy, with Open Library kept as the fallback.

function stubISBNFetch(app, opts) {
  var calls = [];
  app.window.__isbnCalls = calls;
  app.window.fetch = function (url) {
    var u = String(url);
    calls.push(u);
    // Open Library's URL is openlibrary.org/api/books — test it first.
    if (u.indexOf('openlibrary.org') !== -1) {
      if (opts.olThrows) return Promise.reject(new Error('ol down'));
      return Promise.resolve({ ok: true, status: 200,
        json: function () { return Promise.resolve(opts.ol || {}); } });
    }
    if (opts.gbThrows) return Promise.reject(new Error('gb down'));
    return Promise.resolve({ ok: true, status: 200,
      json: function () { return Promise.resolve({ items: opts.gb || [] }); } });
  };
  return calls;
}

var GB_ITEM = [{
  id: 'gb1',
  volumeInfo: {
    title: 'A Recent Title', authors: ['Some Author'], publishedDate: '2024',
    language: 'en', pageCount: 300, categories: ['Fiction'], description: 'Blurb.'
  }
}];
var OL_REC = { 'ISBN:9781804953334': { title: 'Older Record', authors: [{ name: 'OL Author' }] } };

test('ISBN lookup prefers Google Books and skips Open Library on a hit', async function () {
  var app = await boot({ seed: SEED });
  var calls = stubISBNFetch(app, { gb: GB_ITEM, ol: OL_REC });
  var book = await app.window.lookupISBN('9781804953334');
  assert.ok(book, 'expected a book');
  assert.strictEqual(book.title, 'A Recent Title');
  assert.strictEqual(book.cats, 'fiction', 'categories must survive — the age gate reads them');
  assert.ok(calls.some(function (c) { return c.indexOf('/api/books?q=isbn%3A') !== -1; }),
    'should query Google Books through the authenticated proxy');
  assert.ok(!calls.some(function (c) { return c.indexOf('openlibrary') !== -1; }),
    'Open Library should not be queried when Google Books answers');
});

test('ISBN lookup falls back to Open Library when Google Books is empty', async function () {
  var app = await boot({ seed: SEED });
  stubISBNFetch(app, { gb: [], ol: OL_REC });
  var book = await app.window.lookupISBN('9781804953334');
  assert.ok(book, 'expected the Open Library fallback to answer');
  assert.strictEqual(book.title, 'Older Record');
  assert.strictEqual(book.cats, '', 'Open Library gives no categories');
});

test('ISBN lookup falls back when the Google Books call throws', async function () {
  var app = await boot({ seed: SEED });
  stubISBNFetch(app, { gbThrows: true, ol: OL_REC });
  var book = await app.window.lookupISBN('9781804953334');
  assert.ok(book && book.title === 'Older Record', 'a failed GB call must not abort the lookup');
});

test('ISBN lookup resolves to null when neither source has the book', async function () {
  var app = await boot({ seed: SEED });
  stubISBNFetch(app, { gb: [], ol: {} });
  assert.strictEqual(await app.window.lookupISBN('9781804953334'), null);
});

test('ISBN lookup resolves to null (not a rejection) when both sources fail', async function () {
  var app = await boot({ seed: SEED });
  stubISBNFetch(app, { gbThrows: true, olThrows: true });
  assert.strictEqual(await app.window.lookupISBN('9781804953334'), null);
});

// ─── Companion personas ─────────────────────────────────────────────────────
// One voice did not suit every use case: the default always asks something
// back, which works against a reader who only wants to know what a book is
// like. Personas swap the voice and the closing rule; everything else in the
// prompt (spoilers, honesty, formatting) is shared.

function withBook(app, book) {
  app.window.STATE.book = book || { title: 'Test Book', author: 'An Author', pageCount: 300 };
  app.window.STATE.readingStatus = 'midway';
  app.window.STATE.companionMode = 'reading';
}

test('the default persona is Companion and preserves the original voice', async function () {
  var app = await boot({ seed: SEED });
  withBook(app);
  assert.strictEqual(app.window.getPersonaId(), 'companion');
  var p = app.window.buildSystemPrompt();
  assert.match(p, /warm but not gushing/);
  assert.match(p, /Always end with a question/);
});

test('the Direct persona stops the companion interrogating the reader', async function () {
  var app = await boot({ seed: SEED });
  withBook(app);
  app.window.saveDefaultPersona('direct');
  var p = app.window.buildSystemPrompt();
  assert.match(p, /Lead with the answer/);
  assert.doesNotMatch(p, /Always end with a question/,
    'the always-ask rule must not survive under Direct');
  assert.match(p, /Do not end with a question unless/);
});

test('shared prompt rules survive every persona', async function () {
  var app = await boot({ seed: SEED });
  withBook(app);
  var ids = ['companion', 'guide', 'direct', 'kindred'];
  for (var i = 0; i < ids.length; i++) {
    app.window.saveDefaultPersona(ids[i]);
    var p = app.window.buildSystemPrompt();
    assert.match(p, /Never confabulate/, ids[i] + ' lost the honesty rule');
    assert.match(p, /RECOMMEND/, ids[i] + ' lost the recommendation format');
    assert.match(p, /No bullet points/, ids[i] + ' lost the plain-prose rule');
  }
});

test('discover mode no longer demands a taste question before helping', async function () {
  var app = await boot({ seed: SEED });
  withBook(app);
  app.window.STATE.companionMode = 'discover';
  var p = app.window.buildSystemPrompt();
  assert.doesNotMatch(p, /Start by asking ONE question/,
    'discover mode used to interrogate before saying anything useful');
  assert.match(p, /ANSWER WHAT THEY ASK/);
  assert.match(p, /Never reveal plot details/, 'discover must stay spoiler-safe');
});

test('a per-book voice overrides the global default, and clearing it falls back', async function () {
  var app = await boot({ seed: SEED });
  withBook(app);
  app.window.saveDefaultPersona('companion');
  app.window.setBookPersona('kindred');
  assert.strictEqual(app.window.getPersonaId(), 'kindred');
  assert.match(app.window.buildSystemPrompt(), /soft-spoken/i);

  // a different book is unaffected
  withBook(app, { title: 'Another Book', author: 'Someone Else' });
  assert.strictEqual(app.window.getPersonaId(), 'companion');

  withBook(app);
  app.window.setBookPersona(null);
  assert.strictEqual(app.window.getPersonaId(), 'companion');
});

test('an unrecognised stored persona falls back to Companion', async function () {
  var app = await boot({ seed: SEED });
  withBook(app);
  app.localStorage.setItem('pc_persona', 'nonsense');
  assert.strictEqual(app.window.getPersonaId(), 'companion');
});

test('every persona has a translated label and description', async function () {
  var app = await boot({ seed: SEED });
  var tables = app.window.UI_STRINGS;
  var ids = ['companion', 'guide', 'direct', 'kindred'];
  for (var i = 0; i < ids.length; i++) {
    var lab = 'persona.' + ids[i] + '.label', desc = 'persona.' + ids[i] + '.desc';
    assert.ok(tables.en[lab] && tables['zh-TW'][lab], 'missing label for ' + ids[i]);
    assert.ok(tables.en[desc] && tables['zh-TW'][desc], 'missing description for ' + ids[i]);
  }
});

test('non-default personas state the no-question rule as an instruction, not a permission', async function () {
  var app = await boot({ seed: SEED });
  withBook(app);
  // Kindred first shipped with "sometimes a question, sometimes room to say
  // more". Models read that as permission and asked every time, which is the
  // opposite of the point. Every persona that is meant to hold back must say
  // so with an explicit negative.
  var quiet = ['guide', 'direct', 'kindred'];
  for (var i = 0; i < quiet.length; i++) {
    app.window.saveDefaultPersona(quiet[i]);
    var p = app.window.buildSystemPrompt();
    assert.match(p, /Do not end (every turn |with a question)/,
      quiet[i] + ' must instruct against closing questions, not merely permit them');
    assert.doesNotMatch(p, /sometimes a question/,
      quiet[i] + ' reverted to permissive phrasing');
    assert.doesNotMatch(p, /Always end with a question/,
      quiet[i] + ' still carries the Companion closing');
  }
  // The default is unaffected — it is supposed to ask.
  app.window.saveDefaultPersona('companion');
  assert.match(app.window.buildSystemPrompt(), /Always end with a question/);
});

test('no persona is allowed to stack multiple questions in one reply', async function () {
  var app = await boot({ seed: SEED });
  withBook(app);
  var ids = ['companion', 'guide', 'direct', 'kindred'];
  for (var i = 0; i < ids.length; i++) {
    app.window.saveDefaultPersona(ids[i]);
    assert.match(app.window.buildSystemPrompt(), /Never ask more than one question/,
      ids[i] + ' may stack questions');
  }
  app.window.STATE.companionMode = 'discover';
  assert.match(app.window.buildSystemPrompt(), /Never ask more than one question/,
    'discover mode may stack questions');
});

// ─── Cross-book conversation leakage ────────────────────────────────────────
// Reported: starting a chat about one book, then opening another, made the
// companion contrast the two. The system prompt was correct for the new book,
// but STATE.messages still held the previous book's conversation — so it went
// to the model as history AND was written into the new book's saved
// conversation. Two of the four entry paths bypassed the message reset.

var BOOK_A = { title: '碧血劍', author: '金庸' };
var BOOK_B = { title: '連城訣', author: '金庸' };

function seedConversationAbout(app, book) {
  app.window.STATE.book = book;
  app.window.STATE.companionMode = 'reading';
  app.window.STATE.readingStatus = 'midway';
  app.window.STATE.currentConvId = 'conv_seed';
  app.window.STATE.currentConvName = null;
  app.window.STATE.messages = [
    { role: 'user', content: 'A-USER-TURN' },
    { role: 'assistant', content: 'A-REPLY' }
  ];
  // every real path into a chat stamps the buffer's owner
  app.window.STATE.messagesBookKey = app.window.bookKey(book);
}

test('book detail then status does not carry the previous book\'s conversation', async function () {
  var app = await boot({ seed: SEED });
  seedConversationAbout(app, BOOK_A);
  app.window.showBookDetail(BOOK_B);
  await app.window.setReadingStatus('started');
  assert.strictEqual(app.window.STATE.messages.length, 0,
    'the previous book\'s turns leaked into the new chat');
  assert.strictEqual(app.window.STATE.messagesBookKey, app.window.bookKey(BOOK_B));
});

test('shelf then Update status does not carry the previous conversation', async function () {
  var app = await boot({ seed: SEED });
  seedConversationAbout(app, BOOK_A);
  app.window.openBookShelf(BOOK_B);
  app.window.updateBookStatus();
  await app.window.setReadingStatus('midway');
  assert.strictEqual(app.window.STATE.messages.length, 0,
    'the previous book\'s turns leaked in via the shelf');
});

test('a leaked conversation is never written into another book\'s history', async function () {
  var app = await boot({ seed: SEED });
  seedConversationAbout(app, BOOK_A);
  app.window.showBookDetail(BOOK_B);
  await app.window.setReadingStatus('started');
  app.window.STATE.messages.push({ role: 'user', content: 'B-OWN-TURN' });
  app.window.saveCurrentConversation();
  var convs = JSON.parse(app.localStorage.getItem('pc_convs_' + app.window.bookKey(BOOK_B)) || '[]');
  var saved = convs.length ? convs[0].messages.map(function (m) { return m.content; }) : [];
  assert.deepStrictEqual(saved, ['B-OWN-TURN'],
    'another book\'s turns were saved into this book: ' + saved.join(' | '));
});

test('continuing a saved conversation keeps its own messages', async function () {
  var app = await boot({ seed: SEED });
  // store a conversation against book B, then continue it
  app.window.STATE.book = BOOK_B;
  app.window.STATE.companionMode = 'reading';
  app.window.STATE.currentConvId = 'conv_keep';
  app.window.STATE.messages = [{ role: 'user', content: 'B-SAVED-TURN' }];
  app.window.STATE.messagesBookKey = app.window.bookKey(BOOK_B);
  app.window.saveCurrentConversation();

  // arrive from a different book, then continue B's conversation
  seedConversationAbout(app, BOOK_A);
  app.window.STATE.book = BOOK_B;
  await app.window.continueConversation('conv_keep');
  var contents = app.window.STATE.messages.map(function (m) { return m.content; });
  assert.ok(contents.indexOf('B-SAVED-TURN') !== -1, 'the saved conversation was lost');
  assert.ok(contents.indexOf('A-USER-TURN') === -1, 'the other book\'s turns came along');
});
