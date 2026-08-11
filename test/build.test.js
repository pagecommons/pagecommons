'use strict';

// ─── Build integrity & Kobo/Kindle compatibility guard ──────────────────────
// The single most important safety net for this project: Vercel serves
// app.transpiled.js, and Kobo/Kindle's legacy WebKit will silently break on
// modern JS or on Babel's require() injections. These checks need no browser.

var test = require('node:test');
var assert = require('node:assert');
var fs = require('fs');
var path = require('path');
var cp = require('child_process');

var ROOT = path.join(__dirname, '..');
var transpiledPath = path.join(ROOT, 'app.transpiled.js');
var sourcePath = path.join(ROOT, 'app.js');
var transpiled = fs.readFileSync(transpiledPath, 'utf8');
var indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

test('app.transpiled.js is syntactically valid JS', function () {
  // Throws on a syntax error — same gate as `node --check`.
  cp.execFileSync(process.execPath, ['--check', transpiledPath]);
});

test('app.transpiled.js contains zero require() calls', function () {
  // @babel/plugin-transform-runtime would inject browser-fatal require()s.
  var count = (transpiled.match(/\brequire\s*\(/g) || []).length;
  assert.strictEqual(count, 0, 'found ' + count + ' require( call(s) in app.transpiled.js');
});

test('app.transpiled.js is in sync with app.js (re-transpile produces identical output)', function () {
  // Catches the classic "edited app.js but forgot to rebuild" deploy hazard.
  var babelBin = path.join(ROOT, 'node_modules', '.bin', 'babel');
  var fresh = cp.execFileSync(babelBin, [sourcePath], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  assert.strictEqual(
    fresh.trim(),
    transpiled.trim(),
    'app.transpiled.js is stale — run `npm run transpile` and commit the result'
  );
});

test('index.html serves app.transpiled.js, never the raw app.js', function () {
  assert.ok(/<script[^>]+src=["']app\.transpiled\.js["']/.test(indexHtml),
    'index.html must load app.transpiled.js');
  assert.ok(!/<script[^>]+src=["']app\.js["']/.test(indexHtml),
    'index.html must not load the raw, untranspiled app.js');
});

test('app.transpiled.js has no Kobo-fatal modern syntax', function () {
  // Defence in depth: if the build pipeline ever regresses, these patterns in
  // the *shipped* file would break legacy WebKit. (CLAUDE.md "Known Kobo
  // Constraints"). Babel normally strips all of these.
  var forbidden = [
    { re: /=>/, name: 'arrow function (=>)' },
    { re: /(^|[^.\w])(const|let)\s+[\w$]/, name: 'const/let declaration' },
    { re: /\?\./, name: 'optional chaining (?.)' },
    { re: /\?\?/, name: 'nullish coalescing (??)' },
    { re: /\bfor\s*\([^;)]*\bof\b/, name: 'for...of loop' },
    { re: /querySelectorAll\([^)]*\)\s*\.\s*forEach/, name: 'NodeList.forEach' },
    { re: /\bnew\s+Set\s*\(/, name: 'new Set()' },
    { re: /\bnew\s+Map\s*\(/, name: 'new Map()' },
    // Only an actual call counts — the source has an explanatory comment naming it.
    { re: /\bURLSearchParams\s*\(/, name: 'URLSearchParams() (client-side)' },
    { re: /scrollTo\s*\(\s*\{/, name: 'scrollTo({ ... }) object form' }
    // Template literals are intentionally not pattern-matched: Babel always
    // strips them, and the re-transpile-equality test above is the real
    // guarantee. (Raw backticks survive only inside regex/strings, e.g. the
    // markdown code-fence stripper, which would be false positives.)
  ];
  // Scan CODE only. String literals hold English prose (system prompts), and
  // an ordinary sentence can contain "let ", "const " or "?." without being
  // syntax at all — a Kindred persona line reading "better to let your last
  // sentence rest" tripped the const/let rule. Blank out string bodies first.
  var code = transpiled
    .replace(/'(?:[^'\\\n]|\\.)*'/g, "''")
    .replace(/"(?:[^"\\\n]|\\.)*"/g, '""')
    .replace(/\/\/[^\n]*/g, '');

  var hits = [];
  forbidden.forEach(function (f) {
    if (f.re.test(code)) hits.push(f.name);
  });
  assert.deepStrictEqual(hits, [], 'Kobo-fatal syntax found in app.transpiled.js: ' + hits.join(', '));
});

test('version tagline in index.html matches CLAUDE.md Current Version', function () {
  // Enforces the VERSIONING RULE: the two version markers stay in sync.
  var claudeMd = fs.readFileSync(path.join(ROOT, 'CLAUDE.md'), 'utf8');
  var htmlMatch = indexHtml.match(/v(\d+\.\d+)/);
  var mdMatch = claudeMd.match(/## Current Version\s*\n\s*v(\d+\.\d+)/);
  assert.ok(htmlMatch, 'no vX.YY tagline found in index.html');
  assert.ok(mdMatch, 'no "## Current Version" line found in CLAUDE.md');
  assert.strictEqual(htmlMatch[1], mdMatch[1],
    'index.html tagline v' + htmlMatch[1] + ' != CLAUDE.md Current Version v' + mdMatch[1]);
});
