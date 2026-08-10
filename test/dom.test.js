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

test('footer is a single row: brand left, Support/Privacy/Terms right', async function () {
  var app = await boot({ seed: RETURNING });
  var footer = app.document.querySelector('#screen-home .screen-support-footer');
  var brand = footer.querySelector('.sf-brand');
  assert.ok(brand && /Page Commons/.test(brand.textContent), 'footer should show the brand on the left');

  var hrefs = [];
  var links = footer.querySelectorAll('.sf-links a');
  for (var i = 0; i < links.length; i++) hrefs.push(links[i].getAttribute('href'));
  assert.ok(hrefs.indexOf('/support.html') !== -1, 'Support link missing from footer');
  assert.ok(hrefs.indexOf('/privacy.html') !== -1, 'Privacy link missing from footer');
  assert.ok(hrefs.indexOf('/terms.html') !== -1, 'Terms link missing from footer');
});

// ─── Interface language (i18n) ──────────────────────────────────────────────
var HAN = /[一-鿿]/;

test('interface defaults to English and carries no CJK class', async function () {
  var app = await boot({ seed: RETURNING });
  assert.ok(!HAN.test(app.document.querySelector('.hall-title').textContent),
    'default UI should be English');
  assert.ok(!/ui-cjk/.test(app.document.body.className), 'ui-cjk must be off by default');
});

test('setUILang swaps the interface to Traditional Chinese and back', async function () {
  var app = await boot({ seed: RETURNING });
  var englishTitle = app.document.querySelector('.hall-title').textContent;

  app.window.setUILang('zh-TW');
  assert.ok(HAN.test(app.document.querySelector('.hall-title').textContent),
    'hall title should be Chinese after switching');
  assert.ok(HAN.test(app.document.getElementById('header-nav').textContent),
    'header nav should be Chinese after switching');
  assert.ok(/ui-cjk/.test(app.document.body.className), 'ui-cjk class should be applied');
  assert.strictEqual(app.localStorage.getItem('pc_ui_lang'), 'zh-TW', 'choice should persist');

  app.window.setUILang('en');
  assert.strictEqual(app.document.querySelector('.hall-title').textContent, englishTitle,
    'switching back should restore the exact English string');
  assert.ok(!/ui-cjk/.test(app.document.body.className), 'ui-cjk class should be removed');
});

test('interface language is independent of companion language', async function () {
  var app = await boot({ seed: RETURNING });
  app.window.setUILang('zh-TW');
  assert.strictEqual(app.localStorage.getItem('pc_companion_lang'), null,
    'switching the interface must not touch the companion language preference');
});

test('the brand name is never translated', async function () {
  var app = await boot({ seed: RETURNING });
  app.window.setUILang('zh-TW');
  assert.strictEqual(app.document.getElementById('site-name-el').textContent.trim(), 'Page Commons');
});

test('every English string key has a Traditional Chinese counterpart', async function () {
  var app = await boot({ seed: RETURNING });
  var tables = app.window.UI_STRINGS;
  var en = Object.keys(tables.en), zh = tables['zh-TW'];
  var missing = en.filter(function (k) { return !(k in zh); });
  assert.strictEqual(missing.length, 0, 'untranslated keys: ' + missing.join(', '));
  var extra = Object.keys(zh).filter(function (k) { return !(k in tables.en); });
  assert.strictEqual(extra.length, 0, 'stale zh-TW keys with no English source: ' + extra.join(', '));
});

test('every data-i18n key in the markup exists in the string table', async function () {
  var app = await boot({ seed: RETURNING });
  var en = app.window.UI_STRINGS.en;
  var missing = [];
  var attrs = ['data-i18n', 'data-i18n-html', 'data-i18n-placeholder'];
  for (var a = 0; a < attrs.length; a++) {
    var els = app.document.querySelectorAll('[' + attrs[a] + ']');
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute(attrs[a]);
      if (key && !(key in en)) missing.push(key);
    }
  }
  assert.strictEqual(missing.length, 0, 'markup references unknown keys: ' + missing.join(', '));
});

// This scans the WHOLE document rather than line by line. The first pass of
// the i18n work used a line-based audit, which silently skipped any element
// whose text spanned several lines (the home description, the T&C notes) and
// shipped them untranslated. Whole-document scanning is what catches those.
test('no user-visible markup text is left untranslated', async function () {
  var fs = require('fs');
  var path = require('path');
  var html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  var body = html.replace(/<style[\s\S]*?<\/style>/g, '').replace(/<!--[\s\S]*?-->/g, '');
  // Elements translated wholesale via data-i18n-html own all their inner text.
  body = body.replace(/<([a-z0-9]+)([^>]*\sdata-i18n-html="[^"]*"[^>]*)>[\s\S]*?<\/\1>/g, '<$1$2></$1>');

  // Deliberately untranslated: brand, third-party product names, version,
  // language names shown in their own language, and JS-owned text.
  var ALLOWED = /^(Page Commons|Anthropic Claude|Google Gemini|Groq|v0\.\d+|English|繁體中文|Good evening|My Clippings\.txt)$/;

  var missing = [], re = />([^<>]+)</g, m;
  while ((m = re.exec(body))) {
    var text = m[1].replace(/\s+/g, ' ').trim();
    // Entities carry latin letters (&nbsp; &mdash;) but are punctuation, not
    // copy — strip them before deciding whether this is real text.
    var words = text.replace(/&[a-z]+;|&#\d+;/g, ' ').trim();
    if (!text || words.length < 3 || !/[A-Za-z]/.test(words)) continue;
    if (ALLOWED.test(text)) continue;
    var before = body.slice(0, m.index + 1);
    var openTag = before.slice(before.lastIndexOf('<'));
    if (/data-i18n/.test(openTag)) continue;
    missing.push(text.slice(0, 60));
  }
  assert.strictEqual(missing.length, 0,
    'untranslated markup text:\n  ' + missing.join('\n  '));
});

test('font stacks carry a CJK fallback after the Latin families', async function () {
  var app = await boot({ seed: RETURNING });
  var css = '';
  var styles = app.document.querySelectorAll('style');
  for (var i = 0; i < styles.length; i++) css += styles[i].textContent;
  assert.ok(/Songti TC|Noto Serif CJK/.test(css), 'serif stack needs a CJK fallback');
  assert.ok(/PingFang TC|Noto Sans CJK/.test(css), 'sans stack needs a CJK fallback');
  // Latin must still win for Latin glyphs.
  assert.ok(/Georgia,\s*'Times New Roman',\s*'Songti TC'/.test(css),
    'CJK families must come after Georgia, not before');
});

test('Back from an ended chat does not loop between shelf and chat', async function () {
  var app = await boot({ seed: RETURNING });
  // A selected book lets #companion pass its handleRoute redirect gate.
  app.window.STATE.book = { title: 'Loop Test Book', author: 'An Author' };
  assert.strictEqual(await app.go('companion'), 'companion');
  // Header ← Back on the chat ends the conversation → shelf.
  app.window.goBack();
  await app.flush();
  await app.flush();
  assert.strictEqual(app.activeScreen(), 'shelf', 'ending the chat should land on the shelf');
  // Back on the shelf must NOT bounce into the ended chat.
  app.window.goBack();
  await app.flush();
  await app.flush();
  assert.notStrictEqual(app.activeScreen(), 'companion', 'Back from shelf looped back into the ended chat');
  assert.strictEqual(app.activeScreen(), 'home', 'Back from the shelf after ending a chat should go home');
});

test('companion header nav is present and toolbar has End Chat', async function () {
  var app = await boot({ seed: RETURNING });
  var nav = app.document.getElementById('header-nav');
  assert.ok(nav, 'header-nav element should exist');
  var navText = nav.textContent;
  assert.ok(/Back/.test(navText), 'header-nav should contain Back');
  assert.ok(/Main/.test(navText), 'header-nav should contain Main');
  assert.ok(/Find/.test(navText), 'header-nav should contain Find');
  var toolbar = app.document.getElementById('reader-toolbar');
  assert.ok(toolbar && /End Chat/.test(toolbar.textContent), 'toolbar should contain End Chat button');
});
