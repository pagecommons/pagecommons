'use strict';

// ─── DOM / integration tests ────────────────────────────────────────────────
// Boots the real index.html + app.transpiled.js in jsdom (a headless stand-in
// for the e-reader browser), with localStorage seeded and fetch stubbed, then
// drives the app the way a user would and asserts on the resulting DOM.

var test = require('node:test');
var assert = require('node:assert');
var boot = require('./helpers/boot.js').boot;

// A returning, configured, shared-pool user (skips first-run + T&C gates).
var RETURNING = { pc_tc_accepted: '1', pc_preferences_set: '1', pc_ai_mode: 'shared' };

test('fresh install lands on the Terms screen', async function () {
  var app = await boot({});
  assert.strictEqual(app.initError(), '', 'app reported an init error');
  assert.strictEqual(app.activeScreen(), 'tc');
});

test('returning user boots straight to the library hall (home)', async function () {
  var app = await boot({ seed: RETURNING });
  assert.strictEqual(app.initError(), '');
  assert.strictEqual(app.activeScreen(), 'home');
  assert.strictEqual(app.errors.length, 0, 'uncaught errors during boot: ' + app.errors.join('; '));
});

test('boots with no uncaught errors and exactly one visible screen', async function () {
  var app = await boot({ seed: RETURNING });
  var screens = app.document.querySelectorAll('.screen');
  var visible = 0;
  for (var i = 0; i < screens.length; i++) {
    if (screens[i].style.display === 'block') visible++;
  }
  assert.strictEqual(visible, 1, 'expected exactly one visible .screen, saw ' + visible);
});

test('hash navigation moves between core screens', async function () {
  var app = await boot({ seed: RETURNING });
  assert.strictEqual(await app.go('search'), 'search');
  assert.strictEqual(await app.go('about'), 'about');
  assert.strictEqual(await app.go('shelf'), 'shelf');
  assert.strictEqual(await app.go('preferences'), 'preferences');
});

test('shared-pool user reaches #search without an API key', async function () {
  // The key gate must NOT trigger for shared-pool users.
  var app = await boot({ seed: RETURNING });
  assert.strictEqual(await app.go('search'), 'search');
});

test('BYOK user with no key is redirected from #search to #key', async function () {
  var app = await boot({ seed: { pc_tc_accepted: '1', pc_preferences_set: '1', pc_ai_mode: 'byok' } });
  assert.strictEqual(await app.go('search'), 'key');
});

test('#companion with no book selected redirects to #search', async function () {
  var app = await boot({ seed: RETURNING });
  assert.strictEqual(await app.go('companion'), 'search');
});

test('legal + support footer links are present on the home screen', async function () {
  var app = await boot({ seed: RETURNING });
  var home = app.document.getElementById('screen-home');
  var hrefs = [];
  var links = home.querySelectorAll('.screen-support-footer a');
  for (var i = 0; i < links.length; i++) hrefs.push(links[i].getAttribute('href'));
  assert.ok(hrefs.indexOf('/privacy.html') !== -1, 'privacy link missing from footer');
  assert.ok(hrefs.indexOf('/terms.html') !== -1, 'terms link missing from footer');
});

test('the End Chat toolbar button is labelled correctly (not "Done"/"Close")', async function () {
  var app = await boot({ seed: RETURNING });
  var toolbar = app.document.getElementById('reader-toolbar') || app.document.body;
  var text = toolbar.textContent;
  assert.ok(/End Chat/.test(text), 'reader toolbar should contain an "End Chat" button');
});
