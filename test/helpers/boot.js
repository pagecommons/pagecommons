'use strict';

// Boots the real production app (index.html + app.transpiled.js) inside jsdom
// with a controllable localStorage and a stubbed fetch, exactly as a Kobo /
// Kindle browser would load it — but headless. Returns handles the tests use
// to drive the app and assert on the DOM.
//
// The app declares its functions at top level, so after we run the transpiled
// bundle in jsdom's VM context every handler (navigate, showScreen, sendMessage,
// mergeSyncPayloads, bookKey, …) is reachable as window.<name>.

var fs = require('fs');
var path = require('path');
var vm = require('vm');
var jsdom = require('jsdom');
var JSDOM = jsdom.JSDOM;

var ROOT = path.join(__dirname, '..', '..');

// A minimal synchronous localStorage that we can seed *before* the app boots.
// jsdom ships one, but rolling our own lets tests pre-seed deterministically
// and inspect every write.
function makeLocalStorage(seed) {
  var store = {};
  if (seed) {
    Object.keys(seed).forEach(function (k) { store[k] = String(seed[k]); });
  }
  return {
    getItem: function (k) { return Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null; },
    setItem: function (k, v) { store[k] = String(v); },
    removeItem: function (k) { delete store[k]; },
    clear: function () { store = {}; },
    key: function (i) { return Object.keys(store)[i] || null; },
    get length() { return Object.keys(store).length; },
    _dump: function () { return JSON.parse(JSON.stringify(store)); }
  };
}

// A fetch stub. Tests register handlers keyed by a substring of the URL; the
// first match wins. Every call is recorded for assertions. Unmatched URLs get
// a benign empty-200 so a stray request never throws.
function makeFetch(calls) {
  var handlers = [];
  function fetchStub(url, opts) {
    var u = typeof url === 'string' ? url : (url && url.url) || String(url);
    calls.push({ url: u, opts: opts || {} });
    var handler = null;
    for (var i = 0; i < handlers.length; i++) {
      if (u.indexOf(handlers[i].match) !== -1) { handler = handlers[i]; break; }
    }
    var spec = handler ? handler.respond(u, opts) : { status: 200, body: {} };
    var status = spec.status == null ? 200 : spec.status;
    var body = spec.body == null ? {} : spec.body;
    var text = typeof body === 'string' ? body : JSON.stringify(body);
    return Promise.resolve({
      ok: status >= 200 && status < 400,
      status: status,
      json: function () { return Promise.resolve(typeof body === 'string' ? JSON.parse(body) : body); },
      text: function () { return Promise.resolve(text); }
    });
  }
  // `respond` may be a function(url, opts) -> {status, body} or a plain object.
  fetchStub.on = function (match, respond) {
    handlers.push({ match: match, respond: typeof respond === 'function' ? respond : function () { return respond; } });
    return fetchStub;
  };
  return fetchStub;
}

// Boot the app. opts:
//   seed:  object of localStorage key/values present before init runs
//   hash:  initial location.hash (e.g. '#search')
//   search: initial location.search (e.g. '?code=abc' for the OAuth path)
// Returns a Promise of the app handles. We wait for jsdom to finish loading
// the document *before* injecting the bundle: once readyState is 'complete'
// the app's bootstrap takes its synchronous `else { runInit() }` branch, so
// the whole app is initialised by the time the promise resolves — no races.
function boot(opts) {
  opts = opts || {};
  var html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  var appCode = fs.readFileSync(path.join(ROOT, 'app.transpiled.js'), 'utf8');

  // Swallow jsdom's "Not implemented: window.scrollTo" style notices — the app
  // legitimately calls scrollTo on every screen change and it's a no-op here.
  var virtualConsole = new jsdom.VirtualConsole();
  virtualConsole.on('jsdomError', function (e) {
    if (e && /Not implemented/.test(e.message || '')) return;
    // surface anything genuinely unexpected
    throw e;
  });

  var url = 'https://pagecommons.com/' + (opts.search || '') + (opts.hash || '');
  var dom = new JSDOM(html, {
    url: url,
    runScripts: 'outside-only', // do NOT auto-run <script src> tags; we inject manually
    pretendToBeVisual: true,
    virtualConsole: virtualConsole
  });
  var window = dom.window;

  function inject() {
    // Controllable storage + stubbed network, installed before the app runs.
    var localStorage = makeLocalStorage(opts.seed);
    Object.defineProperty(window, 'localStorage', { value: localStorage, configurable: true });
    var fetchCalls = [];
    var fetchStub = makeFetch(fetchCalls);
    window.fetch = fetchStub;

    // Capture anything the app reports through uncaught errors.
    var errors = [];
    window.addEventListener('error', function (e) { errors.push(e.error || e.message); });

    // Run the production bundle in jsdom's context — equivalent to the browser
    // evaluating <script src="app.transpiled.js">. readyState is 'complete', so
    // the app's bootstrap runs runInit() synchronously here.
    var context = dom.getInternalVMContext();
    vm.runInContext(appCode, context, { filename: 'app.transpiled.js' });

    return buildHandles(dom, window, localStorage, fetchStub, fetchCalls, errors);
  }

  return new Promise(function (resolve) {
    if (window.document.readyState === 'complete') {
      resolve(inject());
    } else {
      window.addEventListener('load', function () { resolve(inject()); });
    }
  });
}

function buildHandles(dom, window, localStorage, fetchStub, fetchCalls, errors) {
  return {
    dom: dom,
    window: window,
    document: window.document,
    localStorage: localStorage,
    fetch: fetchStub,
    fetchCalls: fetchCalls,
    errors: errors,
    // Read the on-screen init-error banner the app writes when boot throws.
    initError: function () {
      var el = window.document.getElementById('pc-init-error');
      return el && el.textContent ? el.textContent.trim() : '';
    },
    // Which .screen is currently visible (display:block) — the app's notion of
    // the active view.
    activeScreen: function () {
      var screens = window.document.querySelectorAll('.screen');
      for (var i = 0; i < screens.length; i++) {
        var s = screens[i];
        var disp = s.style.display;
        if (disp === 'block' || (s.classList.contains('active') && disp !== 'none')) {
          return s.id.replace(/^screen-/, '');
        }
      }
      return null;
    },
    // Let queued promises (fetch handlers, then-chains) settle.
    flush: function () { return new Promise(function (r) { setTimeout(r, 0); }); },
    // Navigate and wait for the async hashchange → handleRoute → showScreen
    // cycle to settle. handleRoute may itself redirect (e.g. an unauthorised
    // #companion → #search), firing a second hashchange, so we settle across
    // several ticks until the active screen stops changing. Resolves with the
    // final active screen id.
    go: function (view) {
      function activeScreenId() {
        var screens = window.document.querySelectorAll('.screen');
        for (var i = 0; i < screens.length; i++) {
          if (screens[i].style.display === 'block') return screens[i].id.replace(/^screen-/, '');
        }
        return null;
      }
      function tick() { return new Promise(function (r) { setTimeout(r, 0); }); }
      window.navigate(view);
      var prev = null;
      return (function settle(n) {
        return tick().then(function () {
          var cur = activeScreenId();
          if (cur === prev || n <= 0) return cur;
          prev = cur;
          return settle(n - 1);
        });
      })(6);
    }
  };
}

module.exports = { boot: boot, makeLocalStorage: makeLocalStorage };
