function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Force home screen visible immediately (required for Kobo WebKit)
(function() {
  var el = document.getElementById('screen-home');
  if (el) { el.style.display = 'block'; }
})();

// ─── POLYFILLS for older WebKit (Kobo/Kindle) ───────────────────────────────
if (!Array.prototype.includes) {
  Array.prototype.includes = function (val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] === val) return true;
    }
    return false;
  };
}
if (!String.prototype.includes) {
  String.prototype.includes = function (val) {
    return this.indexOf(val) !== -1;
  };
}
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (val) {
    return this.indexOf(val) === 0;
  };
}
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (val) {
    return this.slice(-val.length) === val;
  };
}
if (!Object.assign) {
  Object.assign = function (t) {
    for (var i = 1; i < arguments.length; i++) {
      var s = arguments[i];
      for (var k in s) {
        if (Object.prototype.hasOwnProperty.call(s, k)) t[k] = s[k];
      }
    }
    return t;
  };
}
// ─────────────────────────────────────────────────────────────────────────────

// ═══════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════
var STATE = {
  apiKey: '',
  provider: 'anthropic',
  companionName: 'Companion',
  book: null,
  readingStatus: null,
  // 'considering' | 'started' | 'midway' | 'finished'
  chatLanguage: 'english',
  // 'english' | 'native'
  detectedLang: null,
  // language name detected from book, e.g. 'Chinese'
  highlights: [],
  messages: [],
  lastUserText: '',
  thinkingPhrases: null,
  currentConvId: null,
  currentConvName: null,
  pendingBook: null,
  // held during age gate
  passages: [],
  // saved passages for current book
  replyLength: 'medium', // 'short' | 'medium' | 'detailed'
  userName: ''
};
var STATIC_PROMPTS = ["I just finished it", "Something is still on my mind", "I want to understand something better", "There's a passage I keep thinking about", "I'm not sure how I feel about it", "I gave up — can we talk about why?", "I want to know what to read next", "Something surprised me"];
var STATIC_THINKING = ['Typing…', 'Reading your note…', 'Considering…', 'Let me think…', 'Hmm…', 'One moment…', 'With you…'];

// ═══════════════════════════════════════════════════
//  SCREENS + NAVIGATION
// ═══════════════════════════════════════════════════
var SCREENS = ['home', 'key', 'search', 'status', 'language', 'companion', 'about', 'shelf', 'book-shelf', 'tc', 'age-gate', 'settings'];

// navigate() defined above with showScreen

function showScreen(id) {
  var target = SCREENS.includes(id) ? id : 'home';
  SCREENS.forEach(function (s) {
    var el = document.getElementById('screen-' + s);
    if (el) {
      if (s === target) {
        el.classList.add('active');
        el.style.display = (s === 'home') ? 'block' : 'block';
      } else {
        el.classList.remove('active');
        el.style.display = 'none';
      }
    }
  });
  window.scrollTo(0, 0);
}
function handleRoute() {
  var hash = window.location.hash.replace('#', '') || 'home';

  // defensive redirects
  if (hash === 'companion') {
    if (!STATE.apiKey) {
      navigate('key');
      return;
    }
    if (!STATE.book) {
      navigate('search');
      return;
    }
  }
  if (hash === 'search' && !STATE.apiKey) {
    navigate('key');
    return;
  }
  var target = SCREENS.includes(hash) ? hash : 'home';
  showScreen(target);
  if (target === 'shelf') renderShelf();
  if (target === 'settings') loadSettingsScreen();
  updateTitleLink();
}
function navigate(view) {
  if (window.location.hash.replace('#', '') === view) {
    // Already on this hash — just show the screen directly (handles local file edge case)
    showScreen(view);
  } else {
    window.location.hash = view;
  }
}
window.addEventListener('hashchange', handleRoute);

// ═══════════════════════════════════════════════════
//  CLICKABLE TITLE
// ═══════════════════════════════════════════════════
// Update title clickability based on current screen
function updateTitleLink() {
  var el = document.getElementById('site-name-el');
  if (!el) return;
  var hash = window.location.hash.replace('#', '') || 'home';
  var noClick = ['home', 'key', 'tc'];
  if (noClick.includes(hash)) {
    el.style.cursor = 'default';
    el.onclick = null;
  } else {
    el.style.cursor = 'pointer';
    el.title = 'Back to library hall';
    el.onclick = function () {
      return navigate('home');
    };
  }
}

// ═══════════════════════════════════════════════════
//  OFFLINE + MESSAGE QUEUE
// ═══════════════════════════════════════════════════
function updateOffline() {
  document.getElementById('offline-banner').style.display = navigator.onLine ? 'none' : 'block';
}
window.addEventListener('offline', updateOffline);
window.addEventListener('online', function () {
  updateOffline();
  processOfflineQueue();
});
updateOffline();
function queueOfflineMessage(text) {
  var q = getOfflineQueue();
  q.push({
    text: text,
    book: STATE.book,
    timestamp: Date.now()
  });
  localStorage.setItem('pc_offline_queue', JSON.stringify(q));
}
function getOfflineQueue() {
  try {
    return JSON.parse(localStorage.getItem('pc_offline_queue') || '[]');
  } catch (e) {
    return [];
  }
}
function clearOfflineQueue() {
  localStorage.removeItem('pc_offline_queue');
}
function processOfflineQueue() {
  return _processOfflineQueue.apply(this, arguments);
} // ═══════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════
// init() called at end of file
function _processOfflineQueue() {
  _processOfflineQueue = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var queue, _qi, item, reply, el, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          queue = getOfflineQueue();
          if (!(!queue.length || !STATE.apiKey)) {
            _context.n = 1;
            break;
          }
          return _context.a(2);
        case 1:
          showToolbarMsg("You're back online — sending your saved message…");
          clearOfflineQueue();
          _qi = 0;
        case 2:
          if (!(_qi < queue.length)) {
            _context.n = 7;
            break;
          }
          item = queue[_qi];
          if (!(item.book && STATE.book && item.book.title === STATE.book.title)) {
            _context.n = 6;
            break;
          }
          STATE.messages.push({
            role: 'user',
            content: item.text
          });
          appendBubble('user', item.text);
          _context.p = 3;
          _context.n = 4;
          return callAI();
        case 4:
          reply = _context.v;
          STATE.messages.push({
            role: 'assistant',
            content: reply
          });
          el = appendBubble('companion', reply);
          scrollToMessage(el);
          _context.n = 6;
          break;
        case 5:
          _context.p = 5;
          _t = _context.v;
          appendError(_t);
        case 6:
          _qi++;
          _context.n = 2;
          break;
        case 7:
          return _context.a(2);
      }
    }, _callee, null, [[3, 5]]);
  }));
  return _processOfflineQueue.apply(this, arguments);
}
function bookKey(book) {
  return btoa(encodeURIComponent((book.title + '||' + book.author).slice(0, 40))).replace(/=/g, '');
}
function restoreCompanionUI(book) {
  document.getElementById('book-title-display').textContent = book.title;
  document.getElementById('book-author-display').textContent = book.author;
  document.getElementById('input-book-context').textContent = book.title + (book.author ? ' · ' + book.author : '');
  updateStatusDisplay();
  populateIcebreakers(book);
  renderHighlightsPanel();
}

// ═══════════════════════════════════════════════════
//  GREETING
// ═══════════════════════════════════════════════════
function updateGreeting() {
  var h = new Date().getHours();
  var g = h < 5 ? 'Reading late?' : h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : h < 21 ? 'Good evening' : 'Reading tonight?';
  var el = document.querySelector('.hall-greeting');
  if (el) el.textContent = g;
}

// ═══════════════════════════════════════════════════
//  PROVIDER SELECTION
// ═══════════════════════════════════════════════════
var PROVIDER_CONFIG = {
  anthropic: {
    placeholder: 'sk-ant-…',
    hint: 'Get your key at console.anthropic.com'
  },
  gemini: {
    placeholder: 'AIza…',
    hint: 'Get your free key at aistudio.google.com'
  },
  groq: {
    placeholder: 'gsk_…',
    hint: 'Get your free key at console.groq.com'
  }
};
function selectProvider(prov) {
  STATE.provider = prov;
  localStorage.setItem('pc_provider', prov);
  applyProviderUI(prov);
}
function applyProviderUI(prov) {
  ['anthropic', 'gemini', 'groq'].forEach(function (p) {
    var keyEl = document.getElementById('prov-' + p);
    if (keyEl) keyEl.classList[p === prov ? 'add' : 'remove']('selected');
    var settEl = document.getElementById('settings-prov-' + p);
    if (settEl) settEl.classList[p === prov ? 'add' : 'remove']('active');
  });
  var cfg = PROVIDER_CONFIG[prov];
  document.getElementById('api-key-input').placeholder = cfg.placeholder;
  document.getElementById('key-hint').textContent = cfg.hint;
}

// ═══════════════════════════════════════════════════
//  API KEY + COMPANION NAME
// ═══════════════════════════════════════════════════
function toggleKeyVisibility() {
  var inp = document.getElementById('api-key-input');
  var btn = document.querySelector('.key-toggle');
  inp.type = inp.type === 'password' ? 'text' : 'password';
  btn.textContent = inp.type === 'password' ? 'Show key' : 'Hide key';
}
function saveKey() {
  var val = document.getElementById('api-key-input').value.trim();
  var name = document.getElementById('companion-name-input').value.trim();
  var err = document.getElementById('key-error');
  err.style.display = 'none';
  if (!val) {
    err.textContent = 'Please enter your API key.';
    err.style.display = 'block';
    return;
  }
  STATE.apiKey = val;
  localStorage.setItem('pc_api_key', val);
  if (name) {
    STATE.companionName = name;
    localStorage.setItem('pc_companion_name', name);
  } else {
    STATE.companionName = 'Companion';
  }
  document.getElementById('key-status-bar').style.display = 'block';
  navigate('search');
}
function clearKey() {
  STATE.apiKey = '';
  localStorage.removeItem('pc_api_key');
  document.getElementById('api-key-input').value = '';
  document.getElementById('key-status-bar').style.display = 'none';
  navigate('key');
}

// ═══════════════════════════════════════════════════
//  BOOK SEARCH — AI interpretation + OL + Google Books
// ═══════════════════════════════════════════════════
function looksLikeNaturalLanguage(q) {
  var nl = /\b(the one|that book|written by|by the author|about|popular|famous|japanese|chinese|korean|french|spanish|german|italian|novel|memoir|classic|recent|new|old)\b/i;
  return nl.test(q) || q.trim().split(/\s+/).length > 5;
}
function interpretSearchQuery(_x) {
  return _interpretSearchQuery.apply(this, arguments);
} // ═══════════════════════════════════════════════════
//  RENDER BOOK BATCH (search results helper)
// ═══════════════════════════════════════════════════
function _interpretSearchQuery() {
  _interpretSearchQuery = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(q) {
    var prompt, text, res, _res, _res2, parsed, _t2, _t3, _t4, _t5, _t6, _t7, _t8;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          if (STATE.apiKey) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, {
            title: q,
            author: ''
          });
        case 1:
          prompt = 'A user is searching for a book with this query: "' + q + '"\nExtract the most likely book title and author. Return ONLY a JSON object like: {"title":"...","author":"..."}\nIf you cannot determine the author, use an empty string. No other text.';
          _context2.p = 2;
          text = '';
          if (!(STATE.provider === 'anthropic')) {
            _context2.n = 6;
            break;
          }
          _context2.n = 3;
          return fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': STATE.apiKey,
              'anthropic-version': '2023-06-01',
              'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
              model: 'claude-sonnet-4-20250514',
              max_tokens: 80,
              messages: [{
                role: 'user',
                content: prompt
              }]
            })
          });
        case 3:
          res = _context2.v;
          _t3 = function _t3(j) {
            return j && j.content && j.content[0] ? j.content[0].text : "";
          };
          _context2.n = 4;
          return res.json();
        case 4:
          _t2 = _t3(_context2.v);
          if (_t2) {
            _context2.n = 5;
            break;
          }
          _t2 = '';
        case 5:
          text = _t2;
          _context2.n = 14;
          break;
        case 6:
          if (!(STATE.provider === 'gemini')) {
            _context2.n = 10;
            break;
          }
          _context2.n = 7;
          return fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + STATE.apiKey, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.assign({
              contents: [{
                parts: [{
                  text: prompt
                }]
              }]
            }, langNote ? { systemInstruction: { parts: [{ text: langNote }] } } : {}))
          });
        case 7:
          _res = _context2.v;
          _t5 = function _t5(j) {
            return j && j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts && j.candidates[0].content.parts[0] ? j.candidates[0].content.parts[0].text : "";
          };
          _context2.n = 8;
          return _res.json();
        case 8:
          _t4 = _t5(_context2.v);
          if (_t4) {
            _context2.n = 9;
            break;
          }
          _t4 = '';
        case 9:
          text = _t4;
          _context2.n = 14;
          break;
        case 10:
          if (!(STATE.provider === 'groq')) {
            _context2.n = 14;
            break;
          }
          _context2.n = 11;
          return fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + STATE.apiKey
            },
            body: JSON.stringify({
              model: 'llama-3.3-70b-versatile',
              max_tokens: 80,
              messages: [{
                role: 'user',
                content: prompt
              }]
            })
          });
        case 11:
          _res2 = _context2.v;
          _t7 = function _t7(j) {
            return j && j.choices && j.choices[0] && j.choices[0].message ? j.choices[0].message.content : "";
          };
          _context2.n = 12;
          return _res2.json();
        case 12:
          _t6 = _t7(_context2.v);
          if (_t6) {
            _context2.n = 13;
            break;
          }
          _t6 = '';
        case 13:
          text = _t6;
        case 14:
          parsed = JSON.parse(text.replace(/```json|```/g, '').trim());
          if (!parsed.title) {
            _context2.n = 15;
            break;
          }
          return _context2.a(2, {
            title: parsed.title,
            author: parsed.author || ''
          });
        case 15:
          _context2.n = 17;
          break;
        case 16:
          _context2.p = 16;
          _t8 = _context2.v;
        case 17:
          return _context2.a(2, {
            title: q,
            author: ''
          });
      }
    }, _callee2, null, [[2, 16]]);
  }));
  return _interpretSearchQuery.apply(this, arguments);
}
function renderBookBatch(batch, container, insertBefore) {
  var anchor = insertBefore || container.querySelector('.manual-entry') || null;
  batch.forEach(function (book) {
    var el = document.createElement('div');
    el.className = 'book-result';
    var th = book.thumb ? '<img class="book-cover-thumb" src="' + esc(book.thumb) + '" alt="" loading="lazy">' : '';
    el.innerHTML = '<div class="book-result-inner">' + th + '<div class="book-result-text">' + '<div class="book-result-title">' + esc(book.title) + '</div>' + '<div class="book-result-author">' + esc(book.author) + '</div>' + '<div class="book-result-meta">' + (book.year ? book.year + ' · ' : '') + esc(book.source || 'Open Library') + '</div>' + '</div></div>';
    el.addEventListener('click', function () {
      return selectBookWithAgeCheck(book);
    });
    if (anchor) container.insertBefore(el, anchor);else container.appendChild(el);
  });
}
function searchFromRecommend(query) {
  navigate('search');
  var inp = document.getElementById('book-search-title');
  if (inp) inp.value = query;
  searchBooks();
}
function searchBooks() {
  return _searchBooks.apply(this, arguments);
}
function _searchBooks() {
  _searchBooks = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var rawTitle, rawAuthor, raw, statusEl, resultsEl, isbnClean, isbnUrl, res, data, key, b, book, el, th, searchTitle, searchAuthor, isNL, interp, gbParts, gbQuery, olQuery, hasNonLatin, _addShowMoreBtn, books, refineEl, _page, _olQuery, _gbQuery, _hasNonLatin, _seen, _t0, _t1;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          rawTitle = document.getElementById('book-search-title').value.trim();
          rawAuthor = document.getElementById('book-search-author').value.trim();
          raw = rawTitle || rawAuthor;
          if (raw) {
            _context4.n = 1;
            break;
          }
          return _context4.a(2);
        case 1:
          statusEl = document.getElementById('search-status');
          resultsEl = document.getElementById('search-results');
          resultsEl.innerHTML = '';

          // ISBN detection
          isbnClean = raw.replace(/[-\s]/g, '');
          if (!/^(97[89])?\d{9}[\dXx]$/.test(isbnClean)) {
            _context4.n = 7;
            break;
          }
          statusEl.textContent = 'Looking up ISBN…';
          statusEl.className = 'status-msg';
          statusEl.style.display = 'block';
          _context4.p = 2;
          isbnUrl = 'https://openlibrary.org/api/books?bibkeys=ISBN:' + isbnClean + '&format=json&jscmd=data';
          _context4.n = 3;
          return fetch(isbnUrl);
        case 3:
          res = _context4.v;
          _context4.n = 4;
          return res.json();
        case 4:
          data = _context4.v;
          key = 'ISBN:' + isbnClean;
          if (data[key]) {
            b = data[key];
            book = {
              title: b.title || 'Unknown title',
              author: (b.authors || [{
                name: 'Unknown author'
              }])[0].name,
              year: b.publish_date ? b.publish_date.slice(-4) : '',
              key: '',
              source: 'Open Library (ISBN)',
              thumb: b.cover ? b.cover.small || '' : ''
            };
            statusEl.style.display = 'none';
            el = document.createElement('div');
            el.className = 'book-result';
            th = book.thumb ? '<img class="book-cover-thumb" src="' + esc(book.thumb) + '" alt="" loading="lazy">' : '';
            el.innerHTML = '<div class="book-result-inner">' + th + '<div class="book-result-text"><div class="book-result-title">' + esc(book.title) + '</div><div class="book-result-author">' + esc(book.author) + '</div><div class="book-result-meta">' + (book.year || '') + (book.year ? ' · ' : '') + esc(book.source) + '</div></div></div>';
            el.addEventListener('click', function () {
              return selectBookWithAgeCheck(book);
            });
            resultsEl.appendChild(el);
          } else {
            statusEl.textContent = 'ISBN not found — try searching by title.';
            statusEl.style.display = 'block';
            renderManualEntry(raw, resultsEl);
          }
          _context4.n = 6;
          break;
        case 5:
          _context4.p = 5;
          _t0 = _context4.v;
          statusEl.textContent = 'ISBN lookup failed — check your connection.';
          statusEl.className = 'status-msg error';
          statusEl.style.display = 'block';
        case 6:
          return _context4.a(2);
        case 7:
          // Build search terms
          searchTitle = rawTitle, searchAuthor = rawAuthor;
          statusEl.textContent = 'Searching…';
          statusEl.className = 'status-msg';
          statusEl.style.display = 'block';

          // AI natural language interpretation (title field only, no author given)
          isNL = !rawAuthor && looksLikeNaturalLanguage(rawTitle);
          if (!(isNL && STATE.apiKey)) {
            _context4.n = 9;
            break;
          }
          statusEl.textContent = 'Understanding your search…';
          _context4.n = 8;
          return interpretSearchQuery(rawTitle);
        case 8:
          interp = _context4.v;
          searchTitle = interp.title;
          searchAuthor = interp.author || rawAuthor;
          statusEl.textContent = 'Searching for "' + searchTitle + '"' + (searchAuthor ? ' by ' + searchAuthor : '') + '…';
        case 9:
          gbParts = [];
          if (searchTitle) gbParts.push('intitle:' + searchTitle);
          if (searchAuthor) gbParts.push('inauthor:' + searchAuthor);
          gbQuery = gbParts.join('+');
          olQuery = [searchTitle, searchAuthor].filter(Boolean).join(' ');
          hasNonLatin = /[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af\u0600-\u06ff\u0400-\u04ff\u0900-\u097f\u0e00-\u0e7f]/.test(raw);
          _context4.p = 10;
          _addShowMoreBtn = function addShowMoreBtn() {
            var moreBtn = document.createElement('button');
            moreBtn.className = 'btn';
            moreBtn.textContent = 'Show more results';
            moreBtn.style.marginBottom = '10px';
            moreBtn.onclick = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
              var more, fresh, _manualEntry, noMore, _t9;
              return _regenerator().w(function (_context3) {
                while (1) switch (_context3.p = _context3.n) {
                  case 0:
                    moreBtn.textContent = 'Loading…';
                    moreBtn.disabled = true;
                    _page++;
                    _context3.p = 1;
                    more = [];
                    if (!_hasNonLatin) {
                      _context3.n = 3;
                      break;
                    }
                    _context3.n = 2;
                    return fetchGoogleBooks(_gbQuery, 6, (_page - 1) * 6);
                  case 2:
                    more = _context3.v;
                    _context3.n = 5;
                    break;
                  case 3:
                    _context3.n = 4;
                    return fetchOpenLibrary(_olQuery, _page * 6 + 6);
                  case 4:
                    more = _context3.v;
                  case 5:
                    fresh = more.filter(function (b) {
                      var k = b.title.toLowerCase() + '||' + b.author.toLowerCase();
                      if (_seen.has(k)) return false;
                      _seen.add(k);
                      return true;
                    });
                    _manualEntry = resultsEl.querySelector('.manual-entry');
                    moreBtn.remove();
                    if (fresh.length) {
                      renderBookBatch(fresh, resultsEl, _manualEntry || null);
                      if (fresh.length >= 4) _addShowMoreBtn();
                    } else {
                      noMore = document.createElement('p');
                      noMore.style.cssText = 'font-size:0.85rem;color:#777777;font-style:italic;margin-bottom:12px';
                      noMore.textContent = 'No more results found.';
                      if (_manualEntry) resultsEl.insertBefore(noMore, _manualEntry);else resultsEl.appendChild(noMore);
                    }
                    _context3.n = 7;
                    break;
                  case 6:
                    _context3.p = 6;
                    _t9 = _context3.v;
                    moreBtn.textContent = 'Show more results';
                    moreBtn.disabled = false;
                  case 7:
                    return _context3.a(2);
                }
              }, _callee3, null, [[1, 6]]);
            }));
            var manualEntry = resultsEl.querySelector('.manual-entry');
            if (manualEntry) resultsEl.insertBefore(moreBtn, manualEntry);else resultsEl.appendChild(moreBtn);
          };
          books = [];
          if (!hasNonLatin) {
            _context4.n = 12;
            break;
          }
          statusEl.textContent = 'Searching Google Books…';
          statusEl.style.display = 'block';
          _context4.n = 11;
          return fetchGoogleBooks(gbQuery);
        case 11:
          books = _context4.v;
          _context4.n = 19;
          break;
        case 12:
          _context4.n = 13;
          return fetchOpenLibrary(olQuery);
        case 13:
          books = _context4.v;
          if (!(!books.length && searchTitle && searchAuthor)) {
            _context4.n = 15;
            break;
          }
          statusEl.textContent = 'Trying title only…';
          statusEl.style.display = 'block';
          _context4.n = 14;
          return fetchOpenLibrary(searchTitle);
        case 14:
          books = _context4.v;
        case 15:
          if (books.length) {
            _context4.n = 17;
            break;
          }
          statusEl.textContent = 'Trying Google Books…';
          statusEl.style.display = 'block';
          _context4.n = 16;
          return fetchGoogleBooks(gbQuery);
        case 16:
          books = _context4.v;
        case 17:
          if (!(!books.length && searchTitle && searchAuthor)) {
            _context4.n = 19;
            break;
          }
          _context4.n = 18;
          return fetchGoogleBooks('intitle:' + searchTitle);
        case 18:
          books = _context4.v;
        case 19:
          statusEl.style.display = 'none';
          if (books.length) {
            _context4.n = 20;
            break;
          }
          statusEl.textContent = 'No results found — try different keywords or enter manually below.';
          statusEl.style.display = 'block';
          renderManualEntry(searchTitle, resultsEl);
          return _context4.a(2);
        case 20:
          // Author-only refine prompt
          if (!searchTitle && searchAuthor) {
            refineEl = document.createElement('p');
            refineEl.style.cssText = 'font-size:0.85rem;color:#777777;margin-bottom:12px;font-style:italic';
            refineEl.textContent = 'Showing books by "' + searchAuthor + '". Add a title above to narrow down.';
            resultsEl.appendChild(refineEl);
          }
          renderBookBatch(books.slice(0, 6), resultsEl, null);

          // Pagination state
          _page = 1;
          _olQuery = olQuery, _gbQuery = gbQuery, _hasNonLatin = hasNonLatin;
          _seen = new Set(books.map(function (b) {
            return b.title.toLowerCase() + '||' + b.author.toLowerCase();
          }));
          if (books.length >= 6) _addShowMoreBtn();
          renderManualEntry(searchTitle, resultsEl);
          _context4.n = 22;
          break;
        case 21:
          _context4.p = 21;
          _t1 = _context4.v;
          statusEl.textContent = 'Search failed — check your connection and try again.';
          statusEl.className = 'status-msg error';
          statusEl.style.display = 'block';
          renderManualEntry(searchTitle, resultsEl);
        case 22:
          return _context4.a(2);
      }
    }, _callee4, null, [[10, 21], [2, 5]]);
  }));
  return _searchBooks.apply(this, arguments);
}
function fetchOpenLibrary(_x2) {
  return _fetchOpenLibrary.apply(this, arguments);
}
function _fetchOpenLibrary() {
  _fetchOpenLibrary = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(q) {
    var limit,
      offset,
      res,
      data,
      seen,
      results,
      _args5 = arguments;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          limit = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : 10;
          offset = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : 0;
          _context5.n = 1;
          return fetch('https://openlibrary.org/search.json?q=' + encodeURIComponent(q) + '&limit=' + limit + '&offset=' + offset + '&fields=key,title,author_name,first_publish_year');
        case 1:
          res = _context5.v;
          _context5.n = 2;
          return res.json();
        case 2:
          data = _context5.v;
          seen = new Map();
          (data.docs || []).forEach(function (d) {
            var title = d.title || 'Unknown title',
              author = (d.author_name || ['Unknown author'])[0];
            var k = title.toLowerCase() + '||' + author.toLowerCase(),
              year = d.first_publish_year || 9999;
            var olid = d.cover_i ? 'https://covers.openlibrary.org/b/id/' + d.cover_i + '-S.jpg' : '';
            if (!seen.has(k) || year < seen.get(k).year) seen.set(k, {
              title: title,
              author: author,
              year: d.first_publish_year || '',
              key: d.key || '',
              source: 'Open Library',
              thumb: olid
            });
          });
          results = Array.from(seen.values()); // Sort: exact title matches first, then by year
          results.sort(function (a, b) {
            var aq = q.toLowerCase(),
              at = a.title.toLowerCase(),
              bt = b.title.toLowerCase();
            var aExact = at === aq ? 0 : at.startsWith(aq) ? 1 : 2;
            var bExact = bt === aq ? 0 : bt.startsWith(aq) ? 1 : 2;
            if (aExact !== bExact) return aExact - bExact;
            return (a.year || 9999) - (b.year || 9999);
          });
          return _context5.a(2, results);
      }
    }, _callee5);
  }));
  return _fetchOpenLibrary.apply(this, arguments);
}
function fetchGoogleBooks(_x3) {
  return _fetchGoogleBooks.apply(this, arguments);
}
function _fetchGoogleBooks() {
  _fetchGoogleBooks = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(q) {
    var maxResults,
      startIndex,
      res,
      data,
      seen,
      _args6 = arguments;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          maxResults = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : 8;
          startIndex = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : 0;
          _context6.n = 1;
          return fetch('/api/books?q=' + encodeURIComponent(q) + '&maxResults=' + maxResults + '&startIndex=' + startIndex);
        case 1:
          res = _context6.v;
          _context6.n = 2;
          return res.json();
        case 2:
          data = _context6.v;
          seen = new Map();
          (data.items || []).forEach(function (item) {
            var info = item.volumeInfo || {},
              title = info.title || 'Unknown title',
              author = (info.authors || ['Unknown author'])[0];
            var k = title.toLowerCase() + '||' + author.toLowerCase();
            var thumb = info.imageLinks && info.imageLinks.smallThumbnail ? info.imageLinks.smallThumbnail : info.imageLinks && info.imageLinks.thumbnail ? info.imageLinks.thumbnail : '';
            if (thumb) thumb = thumb.replace('http://', 'https://');
            var cats = (info.categories || []).join(' ').toLowerCase();
            if (!seen.has(k)) seen.set(k, {
              title: title,
              author: author,
              year: info.publishedDate ? info.publishedDate.slice(0, 4) : '',
              key: item.id || '',
              source: 'Google Books',
              lang: info.language || '',
              thumb: thumb,
              cats: cats,
              pageCount: info.pageCount || 0
            });
          });
          return _context6.a(2, Array.from(seen.values()).slice(0, 6));
      }
    }, _callee6);
  }));
  return _fetchGoogleBooks.apply(this, arguments);
}
function renderManualEntry(prefill, container) {
  var ex = container.querySelector('.manual-entry');
  if (ex) ex.remove();
  var wrap = document.createElement('div');
  wrap.className = 'manual-entry';
  wrap.innerHTML = '<p style="font-size:0.85rem;color:#777777;margin-bottom:14px">Not seeing your book? Enter it manually:</p>' + '<div class="field"><label>Title</label><input type="text" id="manual-title" /></div>' + '<div class="field"><label>Author <span style="font-weight:normal;text-transform:none">(optional)</span></label><input type="text" id="manual-author" placeholder="Author name" /></div>' + '<button class="btn btn-primary" onclick="selectManualBook()">Start companion</button>';
  container.appendChild(wrap);
  var ti = document.getElementById('manual-title');
  if (ti) ti.value = prefill || '';
}
function selectManualBook() {
  var title = (document.getElementById('manual-title') || {}).value || '';
  var author = (document.getElementById('manual-author') || {}).value || '';
  if (!title.trim()) return;
  selectBook({
    title: title.trim(),
    author: author.trim() || 'Unknown author',
    year: '',
    key: ''
  });
}

// ═══════════════════════════════════════════════════
//  AGE GATE + T&C
// ═══════════════════════════════════════════════════
function acceptTC() {
  localStorage.setItem('pc_tc_accepted', '1');
  navigate('key');
}
function isAdultBook(book) {
  var ADULT_TAGS = ['erotica', 'erotic', 'adult fiction', 'explicit', 'mature', 'sexuality', 'pornography'];
  var cats = (book.cats || '').toLowerCase();
  return ADULT_TAGS.some(function (t) {
    return cats.includes(t);
  });
}
var _pendingBookForAgeGate = null;
function selectBookWithAgeCheck(_x4) {
  return _selectBookWithAgeCheck.apply(this, arguments);
}
function _selectBookWithAgeCheck() {
  _selectBookWithAgeCheck = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(book) {
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          if (isAdultBook(book)) {
            _pendingBookForAgeGate = book;
            document.getElementById('age-gate-book-name').textContent = '"' + book.title + '"';
            navigate('age-gate');
          } else {
            selectBook(book);
          }
        case 1:
          return _context7.a(2);
      }
    }, _callee7);
  }));
  return _selectBookWithAgeCheck.apply(this, arguments);
}
function confirmAgeGate() {
  return _confirmAgeGate.apply(this, arguments);
} // ═══════════════════════════════════════════════════
//  STATUS SCREEN TRANSLATION
// ═══════════════════════════════════════════════════
function _confirmAgeGate() {
  _confirmAgeGate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          if (!_pendingBookForAgeGate) {
            _context8.n = 2;
            break;
          }
          _context8.n = 1;
          return selectBook(_pendingBookForAgeGate);
        case 1:
          _pendingBookForAgeGate = null;
        case 2:
          return _context8.a(2);
      }
    }, _callee8);
  }));
  return _confirmAgeGate.apply(this, arguments);
}
var STATUS_OPTIONS_EN = [{
  value: 'considering',
  label: 'Thinking about reading it',
  sub: "Help me decide if it's for me"
}, {
  value: 'started',
  label: 'Just started',
  sub: "I'm in the early pages"
}, {
  value: 'midway',
  label: 'Halfway through',
  sub: 'Getting into it'
}, {
  value: 'finished',
  label: 'Just finished',
  sub: 'Ready to talk about all of it'
}, {
  value: 'revisiting',
  label: 'Read before, revisiting',
  sub: 'Coming back with fresh eyes'
}];
function renderStatusScreen(_x5) {
  return _renderStatusScreen.apply(this, arguments);
} // ═══════════════════════════════════════════════════
//  BOOK SELECTION → STATUS → LANGUAGE → COMPANION
// ═══════════════════════════════════════════════════
function _renderStatusScreen() {
  _renderStatusScreen = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(book) {
    var lang, chatLang, options, cacheKey, cached, prompt, text, res, _res3, _res4, translated, container, h1, _t10, _t11, _t12, _t13, _t14, _t15, _t16;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          lang = STATE.detectedLang;
          chatLang = STATE.chatLanguage;
          options = STATUS_OPTIONS_EN; // Translate if native language chosen and language detected
          if (!(chatLang === 'native' && lang && STATE.apiKey)) {
            _context9.n = 15;
            break;
          }
          cacheKey = 'pc_status_opts_' + lang.toLowerCase();
          cached = localStorage.getItem(cacheKey);
          if (!cached) {
            _context9.n = 1;
            break;
          }
          try {
            options = JSON.parse(cached);
          } catch (e) {}
          _context9.n = 15;
          break;
        case 1:
          _context9.p = 1;
          prompt = 'Translate these 5 reading status options into ' + lang + '. Return ONLY a JSON array of 5 objects with "label" and "sub" keys, in the same order. No other text.\n' + JSON.stringify(STATUS_OPTIONS_EN.map(function (o) {
            return {
              label: o.label,
              sub: o.sub
            };
          }));
          text = '';
          if (!(STATE.provider === 'anthropic')) {
            _context9.n = 5;
            break;
          }
          _context9.n = 2;
          return fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': STATE.apiKey,
              'anthropic-version': '2023-06-01',
              'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
              model: 'claude-sonnet-4-20250514',
              max_tokens: 300,
              messages: [{
                role: 'user',
                content: prompt
              }]
            })
          });
        case 2:
          res = _context9.v;
          _t11 = function _t11(j) {
            return j && j.content && j.content[0] ? j.content[0].text : "";
          };
          _context9.n = 3;
          return res.json();
        case 3:
          _t10 = _t11(_context9.v);
          if (_t10) {
            _context9.n = 4;
            break;
          }
          _t10 = '';
        case 4:
          text = _t10;
          _context9.n = 13;
          break;
        case 5:
          if (!(STATE.provider === 'gemini')) {
            _context9.n = 9;
            break;
          }
          _context9.n = 6;
          return fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + STATE.apiKey, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: prompt
                }]
              }]
            })
          });
        case 6:
          _res3 = _context9.v;
          _t13 = function _t13(j) {
            return j && j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts && j.candidates[0].content.parts[0] ? j.candidates[0].content.parts[0].text : "";
          };
          _context9.n = 7;
          return _res3.json();
        case 7:
          _t12 = _t13(_context9.v);
          if (_t12) {
            _context9.n = 8;
            break;
          }
          _t12 = '';
        case 8:
          text = _t12;
          _context9.n = 13;
          break;
        case 9:
          if (!(STATE.provider === 'groq')) {
            _context9.n = 13;
            break;
          }
          _context9.n = 10;
          return fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + STATE.apiKey
            },
            body: JSON.stringify({
              model: 'llama-3.3-70b-versatile',
              max_tokens: 300,
              messages: [{
                role: 'user',
                content: prompt
              }]
            })
          });
        case 10:
          _res4 = _context9.v;
          _t15 = function _t15(j) {
            return j && j.choices && j.choices[0] && j.choices[0].message ? j.choices[0].message.content : "";
          };
          _context9.n = 11;
          return _res4.json();
        case 11:
          _t14 = _t15(_context9.v);
          if (_t14) {
            _context9.n = 12;
            break;
          }
          _t14 = '';
        case 12:
          text = _t14;
        case 13:
          translated = JSON.parse(text.replace(/```json|```/g, '').trim());
          if (Array.isArray(translated) && translated.length === 5) {
            options = STATUS_OPTIONS_EN.map(function (o, i) {
              return Object.assign({}, o, {
                label: translated[i].label || o.label,
                sub: translated[i].sub || o.sub
              });
            });
            localStorage.setItem(cacheKey, JSON.stringify(options));
          }
          _context9.n = 15;
          break;
        case 14:
          _context9.p = 14;
          _t16 = _context9.v;
        case 15:
          // Render buttons dynamically
          container = document.querySelector('#screen-status .status-options');
          if (container) {
            _context9.n = 16;
            break;
          }
          return _context9.a(2);
        case 16:
          container.innerHTML = '';
          options.forEach(function (opt) {
            var btn = document.createElement('button');
            btn.className = 'status-opt';
            btn.onclick = function () {
              return setReadingStatus(opt.value);
            };
            btn.innerHTML = '<span class="status-opt-label">' + esc(opt.label) + '</span><span class="status-opt-sub">' + esc(opt.sub) + '</span>';
            container.appendChild(btn);
          });

          // Update heading
          h1 = document.getElementById('status-book-title');
          if (h1) h1.textContent = lang && chatLang === 'native' ? book.title // just show title, keep heading neutral
          : 'Where are you with "' + book.title + '"?';
        case 17:
          return _context9.a(2);
      }
    }, _callee9, null, [[1, 14]]);
  }));
  return _renderStatusScreen.apply(this, arguments);
}
function selectBook(_x6) {
  return _selectBook.apply(this, arguments);
}
function _selectBook() {
  _selectBook = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(book) {
    var detectedLang, bk, savedStatus, savedLang;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.n) {
        case 0:
          STATE.book = book;
          STATE.messages = [];
          fetchAndCacheSubjects(book);

          // ensure lang field is persisted on book object (Bug Fix B)
          detectedLang = detectLanguage(book);
          if (detectedLang) book.detectedLang = detectedLang;
          localStorage.setItem('pc_last_book', JSON.stringify(book));
          bk = bookKey(book);
          savedStatus = localStorage.getItem('pc_status_' + bk);
          savedLang = localStorage.getItem('pc_lang_' + bk);
          if (!savedStatus) {
            _context0.n = 2;
            break;
          }
          // returning book — restore ALL language state before launching (Bug Fix A)
          STATE.readingStatus = savedStatus;
          STATE.chatLanguage = savedLang || 'english';
          STATE.detectedLang = detectedLang;
          // restore thinking phrases if native language was chosen
          if (!(STATE.chatLanguage === 'native' && detectedLang)) {
            _context0.n = 1;
            break;
          }
          _context0.n = 1;
          return generateThinkingPhrases(detectedLang);
        case 1:
          launchCompanion(book);
          _context0.n = 3;
          break;
        case 2:
          // new book — set detectedLang BEFORE renderStatusScreen so translation works
          STATE.detectedLang = detectedLang;
          renderStatusScreen(book);
          navigate('status');
        case 3:
          return _context0.a(2);
      }
    }, _callee0);
  }));
  return _selectBook.apply(this, arguments);
}
function setReadingStatus(_x7) {
  return _setReadingStatus.apply(this, arguments);
}
function _setReadingStatus() {
  _setReadingStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(status) {
    var lang, bk, savedLang;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.n) {
        case 0:
          STATE.readingStatus = status;
          localStorage.setItem('pc_status_' + bookKey(STATE.book), status);

          // detect if non-English
          lang = detectLanguage(STATE.book);
          STATE.detectedLang = lang;
          bk = bookKey(STATE.book);
          savedLang = localStorage.getItem('pc_lang_' + bk);
          if (lang && !savedLang) {
            // auto-set to native; user can change via language screen if they want
            STATE.chatLanguage = 'native';
            localStorage.setItem('pc_lang_' + bk, 'native');
            _context1.n = 1;
            break;
          }
          STATE.chatLanguage = savedLang || 'english';
          launchCompanion(STATE.book);
          _context1.n = 3;
          break;
        case 1:
          _context1.n = 2;
          return generateThinkingPhrases(lang);
        case 2:
          launchCompanion(STATE.book);
        case 3:
          return _context1.a(2);
      }
    }, _callee1);
  }));
  return _setReadingStatus.apply(this, arguments);
}
function setLanguage(_x8) {
  return _setLanguage.apply(this, arguments);
}
function _setLanguage() {
  _setLanguage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(choice) {
    var cacheKey;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.n) {
        case 0:
          STATE.chatLanguage = choice;
          localStorage.setItem('pc_lang_' + bookKey(STATE.book), choice);
          // await thinking phrases before launching so they're ready for first message
          if (!(choice === 'native' && STATE.detectedLang)) {
            _context10.n = 1;
            break;
          }
          _context10.n = 1;
          return generateThinkingPhrases(STATE.detectedLang);
        case 1:
          // Clear cached ice breakers so they regenerate in the chosen language
          cacheKey = 'pc_icebreakers_' + bookKey(STATE.book) + '_' + (STATE.readingStatus || '');
          localStorage.removeItem(cacheKey);
          launchCompanion(STATE.book);
        case 2:
          return _context10.a(2);
      }
    }, _callee10);
  }));
  return _setLanguage.apply(this, arguments);
}
function detectLanguage(book) {
  // detect from Google Books language code
  if (book.lang && book.lang !== 'en') {
    var LANG_NAMES = {
      zh: 'Chinese',
      ja: 'Japanese',
      ko: 'Korean',
      fr: 'French',
      de: 'German',
      es: 'Spanish',
      it: 'Italian',
      pt: 'Portuguese',
      ar: 'Arabic',
      ru: 'Russian',
      hi: 'Hindi',
      th: 'Thai',
      vi: 'Vietnamese',
      nl: 'Dutch',
      pl: 'Polish',
      tr: 'Turkish'
    };
    return LANG_NAMES[book.lang] || null;
  }
  // detect from non-ASCII characters in title
  var hasChinese = /[\u4e00-\u9fff]/.test(book.title);
  var hasJapanese = /[\u3040-\u30ff]/.test(book.title);
  var hasKorean = /[\uac00-\ud7af]/.test(book.title);
  var hasArabic = /[\u0600-\u06ff]/.test(book.title);
  var hasCyrillic = /[\u0400-\u04ff]/.test(book.title);
  if (hasChinese) return 'Chinese';
  if (hasJapanese) return 'Japanese';
  if (hasKorean) return 'Korean';
  if (hasArabic) return 'Arabic';
  if (hasCyrillic) return 'Russian';
  return null;
}
function launchCompanion(book) {
  // assign conversation ID if not set
  if (!STATE.currentConvId) {
    STATE.currentConvId = 'conv_' + Date.now();
    STATE.currentConvName = null;
  }
  // add to shelf
  if (typeof addBookToShelf === 'function') addBookToShelf(book);
  document.getElementById('book-title-display').textContent = book.title;
  document.getElementById('book-author-display').textContent = book.author;
  var metaEl = document.getElementById('book-meta-display');
  if (metaEl) {
    var metaParts = [];
    if (book.pageCount) {
      metaParts.push(book.pageCount + ' pages');
      var hrs = Math.round(book.pageCount / 60);
      if (hrs > 0) metaParts.push('~' + hrs + 'h read');
    }
    metaEl.textContent = metaParts.join(' · ');
  }
  var progEl = document.getElementById('book-progress-display');
  if (progEl) {
    var prog = getReadingProgress(book);
    if (prog) {
      var progText = 'Progress: p.' + prog.page;
      if (book.pageCount && prog.page <= book.pageCount) {
        progText += ' of ' + book.pageCount + ' (' + Math.round(prog.page / book.pageCount * 100) + '%)';
      }
      progEl.textContent = progText;
    } else {
      progEl.textContent = '';
    }
  }
  document.getElementById('input-book-context').textContent = book.title + (book.author ? ' · ' + book.author : '');
  document.getElementById('chat-log').innerHTML = '';
  document.getElementById('loading-indicator').style.display = 'none';
  document.getElementById('icebreakers').style.display = 'block';
  updateStatusDisplay();
  renderHighlightsPanel();
  updatePassagesToolbarBtn();
  updateNotesToolbarBtn();
  populateIcebreakers(book);
  navigate('companion');
}
function updateStatusDisplay() {
  var labels = {
    considering: 'Considering reading',
    started: 'Just started',
    midway: 'Halfway through',
    finished: 'Just finished'
  };
  var el = document.getElementById('book-status-display');
  if (STATE.readingStatus && labels[STATE.readingStatus]) {
    el.textContent = labels[STATE.readingStatus];
  } else {
    el.textContent = '';
  }
}

// ═══════════════════════════════════════════════════
//  AI-GENERATED THINKING PHRASES
// ═══════════════════════════════════════════════════
function generateThinkingPhrases(_x9) {
  return _generateThinkingPhrases.apply(this, arguments);
}
function _generateThinkingPhrases() {
  _generateThinkingPhrases = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(language) {
    var cacheKey, cached, prompt, text, res, _res5, _res6, phrases, _t17, _t18, _t19, _t20, _t21, _t22, _t23, _t24;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.p = _context11.n) {
        case 0:
          cacheKey = 'pc_thinking_' + language.toLowerCase();
          cached = localStorage.getItem(cacheKey);
          if (!cached) {
            _context11.n = 3;
            break;
          }
          _context11.p = 1;
          STATE.thinkingPhrases = JSON.parse(cached);
          return _context11.a(2);
        case 2:
          _context11.p = 2;
          _t17 = _context11.v;
        case 3:
          prompt = "Generate 6 short natural \"thinking\" indicators (like \"typing\u2026\", \"one moment\u2026\") in " + language + '. Max 3 words each with an ellipsis. Return ONLY a JSON array of 6 strings. No other text.';
          _context11.p = 4;
          text = '';
          if (!(STATE.provider === 'anthropic')) {
            _context11.n = 8;
            break;
          }
          _context11.n = 5;
          return fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': STATE.apiKey,
              'anthropic-version': '2023-06-01',
              'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
              model: 'claude-sonnet-4-20250514',
              max_tokens: 120,
              messages: [{
                role: 'user',
                content: prompt
              }]
            })
          });
        case 5:
          res = _context11.v;
          _t19 = function _t19(j) {
            return j && j.content && j.content[0] ? j.content[0].text : "";
          };
          _context11.n = 6;
          return res.json();
        case 6:
          _t18 = _t19(_context11.v);
          if (_t18) {
            _context11.n = 7;
            break;
          }
          _t18 = '';
        case 7:
          text = _t18;
          _context11.n = 16;
          break;
        case 8:
          if (!(STATE.provider === 'gemini')) {
            _context11.n = 12;
            break;
          }
          _context11.n = 9;
          return fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + STATE.apiKey, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: prompt
                }]
              }]
            })
          });
        case 9:
          _res5 = _context11.v;
          _t21 = function _t21(j) {
            return j && j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts && j.candidates[0].content.parts[0] ? j.candidates[0].content.parts[0].text : "";
          };
          _context11.n = 10;
          return _res5.json();
        case 10:
          _t20 = _t21(_context11.v);
          if (_t20) {
            _context11.n = 11;
            break;
          }
          _t20 = '';
        case 11:
          text = _t20;
          _context11.n = 16;
          break;
        case 12:
          if (!(STATE.provider === 'groq')) {
            _context11.n = 16;
            break;
          }
          _context11.n = 13;
          return fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + STATE.apiKey
            },
            body: JSON.stringify({
              model: 'llama-3.3-70b-versatile',
              max_tokens: 120,
              messages: [{
                role: 'user',
                content: prompt
              }]
            })
          });
        case 13:
          _res6 = _context11.v;
          _t23 = function _t23(j) {
            return j && j.choices && j.choices[0] && j.choices[0].message ? j.choices[0].message.content : "";
          };
          _context11.n = 14;
          return _res6.json();
        case 14:
          _t22 = _t23(_context11.v);
          if (_t22) {
            _context11.n = 15;
            break;
          }
          _t22 = '';
        case 15:
          text = _t22;
        case 16:
          phrases = JSON.parse(text.replace(/```json|```/g, '').trim());
          if (Array.isArray(phrases) && phrases.length >= 4) {
            STATE.thinkingPhrases = phrases;
            localStorage.setItem(cacheKey, JSON.stringify(phrases));
          }
          _context11.n = 18;
          break;
        case 17:
          _context11.p = 17;
          _t24 = _context11.v;
        case 18:
          return _context11.a(2);
      }
    }, _callee11, null, [[4, 17], [1, 2]]);
  }));
  return _generateThinkingPhrases.apply(this, arguments);
}
function getThinkingPhrase() {
  var phrases = STATE.thinkingPhrases || STATIC_THINKING;
  return phrases[Math.floor(Math.random() * phrases.length)];
}

// ═══════════════════════════════════════════════════
//  CLIPPINGS
// ═══════════════════════════════════════════════════
function parseClippings(input) {
  var file = input.files[0];
  if (!file) return;
  document.getElementById('clippings-filename').textContent = file.name;
  var statusEl = document.getElementById('clippings-status');
  statusEl.textContent = 'Reading clippings…';
  statusEl.style.display = 'block';
  var reader = new FileReader();
  reader.onload = function (e) {
    var highlights = parseClippingsText(e.target.result);
    if (!highlights.length) {
      statusEl.textContent = 'No highlights found in this file.';
      return;
    }
    STATE.highlights = highlights;
    localStorage.setItem('pc_highlights', JSON.stringify(highlights));
    updateProgressFromHighlights(highlights);
    var n = highlights.length,
      b = countBooks(highlights);
    statusEl.textContent = 'Loaded ' + n + ' highlight' + (n !== 1 ? 's' : '') + ' from ' + b + ' book' + (b !== 1 ? 's' : '') + '.';
    var top = getMostRecentBook(highlights);
    if (top) selectBook({
      title: top.title,
      author: top.author,
      year: '',
      key: ''
    });
  };
  reader.readAsText(file);
}
function parseClippingsPaste() {
  var textarea = document.getElementById('clippings-paste');
  var statusEl = document.getElementById('clippings-status');
  if (!textarea) return;
  var text = textarea.value.trim();
  if (!text) {
    statusEl.textContent = 'Please paste your clippings text first.';
    statusEl.style.display = 'block';
    return;
  }
  statusEl.textContent = 'Reading clippings…';
  statusEl.style.display = 'block';
  var highlights = parseClippingsText(text);
  if (!highlights.length) {
    statusEl.textContent = 'No highlights found. Make sure you pasted the full contents of My Clippings.txt.';
    return;
  }
  STATE.highlights = highlights;
  localStorage.setItem('pc_highlights', JSON.stringify(highlights));
  updateProgressFromHighlights(highlights);
  var n = highlights.length, b = countBooks(highlights);
  statusEl.textContent = 'Loaded ' + n + ' highlight' + (n !== 1 ? 's' : '') + ' from ' + b + ' book' + (b !== 1 ? 's' : '') + '.';
  var top = getMostRecentBook(highlights);
  if (top) selectBook({ title: top.title, author: top.author, year: '', key: '' });
}
function parseClippingsText(text) {
  var out = [];
  text.split('==========').forEach(function (entry) {
    var lines = entry.split('\n').map(function (l) {
      return l.trim();
    }).filter(Boolean);
    if (lines.length < 2) return;
    var content = lines.slice(2).join(' ').trim();
    if (!content || lines[1].toLowerCase().includes('bookmark')) return;
    var tm = lines[0].match(/^(.+?)\s*\(([^)]+)\)\s*$/);
    var dm = lines[1].match(/Added on (.+)$/i);
    var pm = lines[1].match(/page (\d+)/i);
    out.push({
      title: tm ? tm[1].trim() : lines[0],
      author: tm ? tm[2].trim() : 'Unknown',
      text: content,
      date: dm ? dm[1].trim() : '',
      page: pm ? parseInt(pm[1], 10) : null
    });
  });
  return out;
}
function countBooks(h) {
  return new Set(h.map(function (x) {
    return x.title;
  })).size;
}
function getMostRecentBook(h) {
  return h.length ? {
    title: h[h.length - 1].title,
    author: h[h.length - 1].author
  } : null;
}

// ═══════════════════════════════════════════════════
//  FUZZY HIGHLIGHTS MATCHING
// ═══════════════════════════════════════════════════
var STOP_WORDS = new Set(['the', 'a', 'an', 'of', 'and', 'in', 'on', 'at', 'to', 'for', 'by']);
function significantWords(str) {
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(function (w) {
    return w && !STOP_WORDS.has(w);
  }).slice(0, 3);
}
function fuzzyMatch(book, highlight) {
  var bw = significantWords(book.title),
    cw = significantWords(highlight.title);
  var titleMatch = bw.some(function (w) {
    return cw.includes(w);
  });
  var ba = (book.author || '').toLowerCase().replace(/[^a-z\s]/g, '');
  var ca = (highlight.author || '').toLowerCase().replace(/[^a-z\s]/g, '');
  var authorMatch = ba && ca && ba.split(/\s+/).some(function (w) {
    return w.length > 2 && ca.includes(w);
  });
  return titleMatch || authorMatch;
}
function getRelevantHighlights(book) {
  return STATE.highlights.filter(function (h) {
    return fuzzyMatch(book, h);
  });
}

// ═══════════════════════════════════════════════════
//  HIGHLIGHTS PANEL
// ═══════════════════════════════════════════════════
function renderHighlightsPanel() {
  var relevant = getRelevantHighlights(STATE.book);
  var btn = document.getElementById('highlights-toolbar-btn');
  if (relevant.length) {
    btn.style.display = 'block';
    btn.textContent = 'Highlights (' + relevant.length + ')';
    document.getElementById('highlights-count').textContent = relevant.length + ' highlight' + (relevant.length !== 1 ? 's' : '') + ' from your Kindle';
    document.getElementById('highlights-list').innerHTML = relevant.map(function (h) {
      return '<p style="border-left:3px solid #d0d0d0;padding-left:10px;margin-bottom:12px;font-style:italic">"' + esc(h.text) + '"</p>';
    }).join('');
  } else {
    btn.style.display = 'none';
  }
}
function toggleHighlights() {
  var panel = document.getElementById('highlights-panel'),
    btn = document.getElementById('highlights-toolbar-btn');
  panel.classList.toggle('open');
  document.getElementById('font-panel').classList.remove('open');
  document.getElementById('notes-panel').classList.remove('open');
  document.getElementById('font-toolbar-btn').classList.remove('active');
  document.getElementById('notes-toolbar-btn').classList.remove('active');
  panel.classList.contains('open') ? btn.classList.add('active') : btn.classList.remove('active');
}

// ═══════════════════════════════════════════════════
//  ICE BREAKERS
// ═══════════════════════════════════════════════════
function populateIcebreakers(_x0) {
  return _populateIcebreakers.apply(this, arguments);
}
function _populateIcebreakers() {
  _populateIcebreakers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(book) {
    var list, loadEl, cacheKey, c, prompts, _t25, _t26;
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.p = _context12.n) {
        case 0:
          list = document.getElementById('icebreaker-list');
          list.innerHTML = '';
          loadEl = document.createElement('div');
          loadEl.className = 'icebreaker-label';
          loadEl.style.fontStyle = 'italic';
          loadEl.textContent = 'Finding the right questions…';
          list.appendChild(loadEl);
          cacheKey = 'pc_icebreakers_' + bookKey(book) + '_' + (STATE.readingStatus || '') + '_' + (STATE.chatLanguage || 'english');
          _context12.p = 1;
          c = localStorage.getItem(cacheKey);
          if (!c) {
            _context12.n = 2;
            break;
          }
          renderIcebreakerButtons(JSON.parse(c), list);
          return _context12.a(2);
        case 2:
          _context12.n = 4;
          break;
        case 3:
          _context12.p = 3;
          _t25 = _context12.v;
        case 4:
          prompts = null;
          if (!STATE.apiKey) {
            _context12.n = 8;
            break;
          }
          _context12.p = 5;
          _context12.n = 6;
          return fetchAIIcebreakers(book);
        case 6:
          prompts = _context12.v;
          localStorage.setItem(cacheKey, JSON.stringify(prompts));
          _context12.n = 8;
          break;
        case 7:
          _context12.p = 7;
          _t26 = _context12.v;
          prompts = null;
        case 8:
          if (!prompts || !prompts.length) {
            // skip static prompts for non-English books — they're always in English
            if (STATE.chatLanguage !== 'native') {
              prompts = getStaticPromptsByStatus(STATE.readingStatus);
            }
          }
          renderIcebreakerButtons(prompts || [], list);
        case 9:
          return _context12.a(2);
      }
    }, _callee12, null, [[5, 7], [1, 3]]);
  }));
  return _populateIcebreakers.apply(this, arguments);
}
function getStaticPromptsByStatus(status) {
  var sets = {
    considering: ["What drew you to this book?", "Are you ready for its themes?", "What made you curious?", "Have you read similar books?"],
    started: ["What are your first impressions?", "Which character interests you most?", "Something already surprised me", "I want to know what lies ahead"],
    midway: ["Something unexpected happened", "I have a theory about the ending", "A character changed my mind", "I cannot put this down"],
    finished: ["I just finished it", "The ending stayed with me", "Something is still on my mind", "What should I read next?"]
  };
  return (sets[status] || STATIC_PROMPTS).slice(0, 4);
}
function fetchAIIcebreakers(_x1) {
  return _fetchAIIcebreakers.apply(this, arguments);
}
function _fetchAIIcebreakers() {
  _fetchAIIcebreakers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(book) {
    var statusLabels, statusLabel, langNote, prompt, text, res, _res7, _res8, clean, parsed, match, _t27, _t28, _t29, _t30, _t31, _t32;
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.n) {
        case 0:
          statusLabels = {
            considering: 'considering reading',
            started: 'just started',
            midway: 'halfway through',
            finished: 'just finished'
          };
          statusLabel = statusLabels[STATE.readingStatus] || 'reading';
          langNote = STATE.chatLanguage === 'native' && STATE.detectedLang ? 'You must write entirely in ' + STATE.detectedLang + '. Every word of your response must be in ' + STATE.detectedLang + '. Do not use any English.' : '';
          var cachedSubjects = localStorage.getItem('pc_subjects_' + bookKey(book));
          var subjectArr = cachedSubjects ? JSON.parse(cachedSubjects) : [];
          var subjectNote = subjectArr.length ? '\nKnown subjects/themes: ' + subjectArr.slice(0, 8).join(', ') + '.' : '';
          prompt = 'You are a literary companion helping a reader of "' + book.title + '" by ' + book.author + '.\n\n' + 'The reader\'s current status: ' + statusLabel + subjectNote + '\n\n' + "Generate exactly 4 ice breaker prompts that feel specific to THIS book \u2014 its themes, reputation, tone, setting, and what readers typically wonder about.\n\n" + 'Rules:\n' + '- Each prompt max 8 words\n' + '- Must feel specific to this exact book\n' + '- NOT generic questions that apply to any book\n' + '- NOT: "Is this book for me?"\n' + '- NOT: "What is the main idea?"\n' + '- NOT: "How long does it take to read?"\n' + '- Tone matches reading status:\n' + '  considering: ask what drew the READER to this book (curiosity, what they\'ve heard, what appeals) — NOT questions about the book\'s content or plot\n' + '  just started: early impressions, what to expect ahead\n' + '  halfway: tensions building, character observations, predictions\n' + '  just finished: emotional reactions, themes, meaning, what next' + '\n\n' + 'Return ONLY a JSON array of 4 strings. No preamble. No explanation. No markdown. Just the array.\n' + 'Example format: ["prompt one","prompt two","prompt three","prompt four"]';
          text = '';
          if (!(STATE.provider === 'anthropic')) {
            _context13.n = 4;
            break;
          }
          _context13.n = 1;
          return fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': STATE.apiKey,
              'anthropic-version': '2023-06-01',
              'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify(Object.assign({
              model: 'claude-sonnet-4-20250514',
              max_tokens: 200,
              messages: [{
                role: 'user',
                content: prompt
              }]
            }, langNote ? { system: langNote } : {}))
          });
        case 1:
          res = _context13.v;
          _t28 = function _t28(j) {
            return j && j.content && j.content[0] ? j.content[0].text : "";
          };
          _context13.n = 2;
          return res.json();
        case 2:
          _t27 = _t28(_context13.v);
          if (_t27) {
            _context13.n = 3;
            break;
          }
          _t27 = '';
        case 3:
          text = _t27;
          _context13.n = 12;
          break;
        case 4:
          if (!(STATE.provider === 'gemini')) {
            _context13.n = 8;
            break;
          }
          _context13.n = 5;
          return fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + STATE.apiKey, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.assign({
              contents: [{
                parts: [{
                  text: prompt
                }]
              }]
            }, langNote ? { systemInstruction: { parts: [{ text: langNote }] } } : {}))
          });
        case 5:
          _res7 = _context13.v;
          _t30 = function _t30(j) {
            return j && j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts && j.candidates[0].content.parts[0] ? j.candidates[0].content.parts[0].text : "";
          };
          _context13.n = 6;
          return _res7.json();
        case 6:
          _t29 = _t30(_context13.v);
          if (_t29) {
            _context13.n = 7;
            break;
          }
          _t29 = '';
        case 7:
          text = _t29;
          _context13.n = 12;
          break;
        case 8:
          if (!(STATE.provider === 'groq')) {
            _context13.n = 12;
            break;
          }
          _context13.n = 9;
          return fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + STATE.apiKey
            },
            body: JSON.stringify({
              model: 'llama-3.3-70b-versatile',
              max_tokens: 200,
              messages: (langNote ? [{ role: 'system', content: langNote }] : []).concat([{
                role: 'user',
                content: prompt
              }])
            })
          });
        case 9:
          _res8 = _context13.v;
          _t32 = function _t32(j) {
            return j && j.choices && j.choices[0] && j.choices[0].message ? j.choices[0].message.content : "";
          };
          _context13.n = 10;
          return _res8.json();
        case 10:
          _t31 = _t32(_context13.v);
          if (_t31) {
            _context13.n = 11;
            break;
          }
          _t31 = '';
        case 11:
          text = _t31;
        case 12:
          // Clean response and attempt JSON parse
          clean = text.replace(/```json|```/g, '').trim();
          parsed = null;
          try {
            parsed = JSON.parse(clean);
          } catch (e) {
            // Try to extract array with regex
            match = clean.match(/\[\s*"[^"]*"(?:\s*,\s*"[^"]*")*\s*\]/);
            if (match) {
              try {
                parsed = JSON.parse(match[0]);
              } catch (e2) {
                parsed = null;
              }
            }
          }
          if (!(!Array.isArray(parsed) || parsed.length < 2)) {
            _context13.n = 13;
            break;
          }
          throw new Error('bad response');
        case 13:
          return _context13.a(2, parsed.slice(0, 4));
      }
    }, _callee13);
  }));
  return _fetchAIIcebreakers.apply(this, arguments);
}
function renderIcebreakerButtons(prompts, list) {
  list.innerHTML = '';
  if (!prompts || !prompts.length) {
    document.getElementById('icebreakers').style.display = 'none';
    return;
  }
  prompts.forEach(function (text) {
    var btn = document.createElement('button');
    btn.className = 'icebreaker-btn';
    btn.textContent = text;
    btn.addEventListener('click', function () {
      var ta = document.getElementById('chat-input');
      ta.value = text;
      autoGrow(ta);
      ta.focus();
    });
    list.appendChild(btn);
  });
}

// ═══════════════════════════════════════════════════
//  CHAT
// ═══════════════════════════════════════════════════
function handleChatKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 600) {
    e.preventDefault();
    sendMessage();
  }
}
function autoGrow(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 200) + 'px';
}
function sendMessage(_x10) {
  return _sendMessage.apply(this, arguments);
}
function _sendMessage() {
  _sendMessage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(retryText) {
    var inputEl, text, w, r, b, loadEl, reply, el, _t33;
    return _regenerator().w(function (_context14) {
      while (1) switch (_context14.p = _context14.n) {
        case 0:
          inputEl = document.getElementById('chat-input');
          text = retryText || inputEl.value.trim();
          if (!(!text || !STATE.book)) {
            _context14.n = 1;
            break;
          }
          return _context14.a(2);
        case 1:
          _context14.n = 2;
          break;
        case 2:
          if (navigator.onLine) {
            _context14.n = 3;
            break;
          }
          queueOfflineMessage(text);
          if (!retryText) {
            inputEl.value = '';
            inputEl.style.height = 'auto';
          }
          STATE.messages.push({
            role: 'user',
            content: text
          });
          appendBubble('user', text);
          w = document.createElement('div');
          w.className = 'message companion';
          r = document.createElement('div');
          r.className = 'message-role';
          r.textContent = STATE.companionName;
          b = document.createElement('div');
          b.className = 'message-bubble';
          b.textContent = "Saved for when you're back online. Your companion will reply then.";
          w.appendChild(r);
          w.appendChild(b);
          document.getElementById('chat-log').appendChild(w);
          scrollBottom();
          return _context14.a(2);
        case 3:
          if (!retryText) {
            inputEl.value = '';
            inputEl.style.height = 'auto';
          }
          STATE.lastUserText = text;
          document.getElementById('icebreakers').style.display = 'none';
          if (!retryText) {
            STATE.messages.push({
              role: 'user',
              content: text
            });
            appendBubble('user', text);
          }
          loadEl = document.getElementById('loading-indicator');
          loadEl.textContent = getThinkingPhrase();
          loadEl.style.display = 'block';
          scrollBottom();
          _context14.p = 4;
          _context14.n = 5;
          return callAI();
        case 5:
          reply = _context14.v;
          STATE.messages.push({
            role: 'assistant',
            content: reply
          });
          loadEl.style.display = 'none';
          el = appendBubble('companion', reply);
          scrollToMessage(el);
          saveCurrentConversation();
          _context14.n = 7;
          break;
        case 6:
          _context14.p = 6;
          _t33 = _context14.v;
          loadEl.style.display = 'none';
          appendError(_t33);
          scrollBottom();
        case 7:
          return _context14.a(2);
      }
    }, _callee14, null, [[4, 6]]);
  }));
  return _sendMessage.apply(this, arguments);
}
function appendBubble(role, text) {
  var wrap = document.createElement('div');
  wrap.className = 'message ' + role;
  var roleEl = document.createElement('div');
  roleEl.className = 'message-role';
  roleEl.textContent = role === 'user' ? 'You' : STATE.companionName;
  var bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  var html = formatText(text);
  html = html.replace(/\[RECOMMEND:\s*([^\]]+)\]/g, function(match, q) {
    var safe = q.trim().replace(/'/g, '&#39;');
    return '<button class="recommend-btn" onclick="searchFromRecommend(\'' + safe + '\')">' + safe + '</button>';
  });
  bubble.innerHTML = html;
  wrap.appendChild(roleEl);
  wrap.appendChild(bubble);

  // Add copy + save actions to companion bubbles only
  if (role === 'companion') {
    var actions = document.createElement('div');
    actions.className = 'bubble-actions';
    var copyBtn = document.createElement('button');
    copyBtn.className = 'bubble-action-btn';
    copyBtn.textContent = 'Copy';
    copyBtn.onclick = function () {
      navigator.clipboard.writeText(text).then(function () {
        copyBtn.textContent = 'Copied';
        setTimeout(function () {
          copyBtn.textContent = 'Copy';
        }, 1500);
      }).catch(function () {
        return showToolbarMsg('Copy not available in this browser.');
      });
    };
    var saveBtn = document.createElement('button');
    saveBtn.className = 'bubble-action-btn';
    // Check if already saved
    var alreadySaved = getPassages().includes(text);
    saveBtn.textContent = alreadySaved ? 'Saved ✓' : 'Save passage';
    if (alreadySaved) saveBtn.classList.add('saved');
    saveBtn.onclick = function () {
      savePassage(text, saveBtn);
    };
    actions.appendChild(copyBtn);
    actions.appendChild(saveBtn);
    wrap.appendChild(actions);
  }
  document.getElementById('chat-log').appendChild(wrap);
  return wrap;
}
function appendError(err) {
  var isNetwork = !navigator.onLine || err.message === 'Failed to fetch' || err.message.includes('fetch');
  var isQuota = err.message && (err.message.toLowerCase().includes('quota') || err.message.toLowerCase().includes('rate limit') || (err.message.includes('429') && !isNetwork));
  var msg = err.isRateLimit ? err.message : isQuota ? 'Your AI key has hit its rate limit. Wait a moment and try again, or switch to a different provider.' : isNetwork ? "Couldn't reach your companion — poor connection? Try again when you have a better signal." : 'Something went wrong: ' + err.message;
  var wrap = document.createElement('div');
  wrap.className = 'message error-msg';
  var bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  bubble.textContent = msg;
  var retryBtn = document.createElement('button');
  retryBtn.className = 'retry-btn';
  retryBtn.textContent = 'Try again';
  retryBtn.onclick = function () {
    wrap.remove();
    if (STATE.messages.length && STATE.messages[STATE.messages.length - 1].role === 'user') STATE.messages.pop();
    sendMessage(STATE.lastUserText);
  };
  wrap.appendChild(bubble);
  wrap.appendChild(retryBtn);
  document.getElementById('chat-log').appendChild(wrap);
}
function formatText(t) {
  return t.replace(/&/g, '&' + 'amp;').replace(/</g, '&' + 'lt;').replace(/>/g, '&' + 'gt;').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>').replace(/\n\n+/g, '</p><p>').replace(/\n/g, '<br>').replace(/^/, '<p>').replace(/$/, '</p>');
}
function scrollBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'instant'
  });
}
function scrollToMessage(el) {
  if (!el) {
    scrollBottom();
    return;
  }
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 12,
    behavior: 'instant'
  });
}

// ═══════════════════════════════════════════════════
//  AI PROVIDERS
// ═══════════════════════════════════════════════════
function buildSystemPrompt() {
  var book = STATE.book;
  var relevant = getRelevantHighlights(book).slice(-8);
  var highlightsText = relevant.length ? '\n\nThe reader\'s highlights from this book:\n' + relevant.map(function (h) {
    return '- "' + h.text + '"';
  }).join('\n') : '';
  var statusInstructions = {
    considering: 'The reader is considering whether to read this book. Focus on helping them decide — share what makes it special, who tends to love it, what kind of read it is. No spoilers of any kind.',
    started: 'The reader has just started this book. Be curious about their first impressions. No spoilers beyond the early pages.',
    midway: 'The reader is halfway through. Engage with what they\'ve experienced so far. Check before discussing anything from the second half.',
    finished: 'The reader has just finished this book. Full discussion is welcome — no spoiler restrictions.',
    revisiting: 'The reader has read this book before and is revisiting it. They may have fresh perspectives or notice things they missed first time. Treat them as someone who knows the book well.'
  };
  var statusNote = statusInstructions[STATE.readingStatus] || 'Be spoiler-aware — ask the reader how far they\'ve got before revealing plot details.';
  var langNote = STATE.chatLanguage === 'native' && STATE.detectedLang ? '\n\nRespond entirely in ' + STATE.detectedLang + '. The reader has chosen to discuss this book in ' + STATE.detectedLang + '.' : '';
  var replyLengthNote = STATE.replyLength === 'short' ? "Maximum 2 sentences. Stop after 2 sentences." : STATE.replyLength === 'detailed' ? "You may give fuller, more detailed responses when the topic warrants it." : "Keep responses concise — 2 to 4 short paragraphs maximum.";
  return "You are a reading companion for \"" + book.title + "\" by " + book.author + ".\n\n" + "You are warm but not gushing. Curious — you always ask something back at the end. You never summarise the plot unprompted. You offer opinions when asked. You are honest about what you don't know. Literary without being academic. You feel like a well-read friend who has also read this book.\n\n" + "Never say \"Great question!\" Keep responses concise — this is read on an e-ink screen. Short paragraphs. Always end with a question or an invitation to continue.\n\n" + statusNote + "\n\n" + "If the conversation drifts away from the book, find a gentle bridge back — connect what the reader said to something in the book rather than refusing or redirecting bluntly. You are a reading companion, not a general assistant.\n\n" + "If a reader seems personally distressed — not just intellectually engaged with dark themes — acknowledge that warmth first before continuing the literary discussion.\n\n" + replyLengthNote + "\n\n" + "Be honest about the limits of your knowledge. If you are not confident about specific details of this book — plot points, character names, themes — say so openly and invite the reader to share what they know. Never confabulate or pretend to know something you are uncertain about. A good reading companion says \"I'm not sure about that — what did you make of it?\" rather than guessing.\n\n" + "Respond in plain prose only. No bullet points. No headers. No lists of any kind.\n\n" + "When you mention a specific book you'd recommend, format it exactly as: [RECOMMEND: Title by Author] — this renders as a tappable search button for the reader. Use this only when genuinely recommending a specific title, not for the current book being discussed.\n\n" + "If there are any signs this reader may be a minor, default to age-appropriate discussion regardless of the book's content rating." + langNote + highlightsText;
}
function callAI() {
  return _callAI.apply(this, arguments);
}
function _callAI() {
  _callAI = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
    var system, messages;
    return _regenerator().w(function (_context15) {
      while (1) switch (_context15.n) {
        case 0:
          system = buildSystemPrompt(), messages = STATE.messages.slice(-20);
          if (STATE.apiKey) {
            _context15.n = 1;
            break;
          }
          return _context15.a(2, callFreeTier(system, messages));
        case 1:
          if (!(STATE.provider === 'anthropic')) {
            _context15.n = 2;
            break;
          }
          return _context15.a(2, callAnthropic(system, messages));
        case 2:
          if (!(STATE.provider === 'gemini')) {
            _context15.n = 3;
            break;
          }
          return _context15.a(2, callGemini(system, messages));
        case 3:
          if (!(STATE.provider === 'groq')) {
            _context15.n = 4;
            break;
          }
          return _context15.a(2, callGroq(system, messages));
        case 4:
          throw new Error('Unknown provider');
        case 5:
          return _context15.a(2);
      }
    }, _callee15);
  }));
  return _callAI.apply(this, arguments);
}
function callFreeTier(system, messages) {
  return fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ system: system, messages: messages })
  }).then(function(res) {
    if (res.status === 429) {
      var rateLimitErr = new Error('Our free companion is busy right now — add your own key for instant access.');
      rateLimitErr.isRateLimit = true;
      throw rateLimitErr;
    }
    if (!res.ok) {
      return res.json().catch(function() { return {}; }).then(function(e) {
        throw new Error(e && e.error ? e.error : 'HTTP ' + res.status);
      });
    }
    return res.json().then(function(data) {
      return data && data.text ? data.text : '(No response)';
    });
  });
}
function callAnthropic(_x11, _x12) {
  return _callAnthropic.apply(this, arguments);
}
function _callAnthropic() {
  _callAnthropic = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(system, messages) {
    var res, e, _t34, _t35;
    return _regenerator().w(function (_context16) {
      while (1) switch (_context16.n) {
        case 0:
          _context16.n = 1;
          return fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': STATE.apiKey,
              'anthropic-version': '2023-06-01',
              'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
              model: 'claude-sonnet-4-20250514',
              max_tokens: STATE.replyLength === 'short' ? 400 : 1500,
              system: system,
              messages: messages
            })
          });
        case 1:
          res = _context16.v;
          if (res.ok) {
            _context16.n = 3;
            break;
          }
          _context16.n = 2;
          return res.json().catch(function () {
            return {};
          });
        case 2:
          e = _context16.v;
          throw new Error(e && e.error && e.error.message ? e.error.message : 'HTTP ' + res.status);
        case 3:
          _t35 = function _t35(j) {
            var txt = j && j.content && j.content[0] ? j.content[0].text : '';
            if (j && j.stop_reason === 'max_tokens') txt += '\n\n[Reply was cut short — switch to Detailed in the toolbar for longer responses.]';
            return txt || '(No response)';
          };
          _context16.n = 4;
          return res.json();
        case 4:
          _t34 = _t35(_context16.v);
          if (_t34) {
            _context16.n = 5;
            break;
          }
          _t34 = '(No response)';
        case 5:
          return _context16.a(2, _t34);
      }
    }, _callee16);
  }));
  return _callAnthropic.apply(this, arguments);
}
function callGemini(_x13, _x14) {
  return _callGemini.apply(this, arguments);
}
function _callGemini() {
  _callGemini = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(system, messages) {
    var contents, res, e, _t36, _t37;
    return _regenerator().w(function (_context17) {
      while (1) switch (_context17.n) {
        case 0:
          contents = messages.map(function (m) {
            return {
              role: m.role === 'user' ? 'user' : 'model',
              parts: [{
                text: m.content
              }]
            };
          });
          contents.unshift({
            role: 'user',
            parts: [{
              text: system
            }]
          });
          contents.splice(1, 0, {
            role: 'model',
            parts: [{
              text: 'Understood. I\'m ready.'
            }]
          });
          _context17.n = 1;
          return fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + STATE.apiKey, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              contents: contents,
              generationConfig: { maxOutputTokens: STATE.replyLength === 'short' ? 400 : 1500 }
            })
          });
        case 1:
          res = _context17.v;
          if (res.ok) {
            _context17.n = 3;
            break;
          }
          _context17.n = 2;
          return res.json().catch(function () {
            return {};
          });
        case 2:
          e = _context17.v;
          throw new Error(e && e.error && e.error.message ? e.error.message : 'HTTP ' + res.status);
        case 3:
          _t37 = function _t37(j) {
            var txt = j && j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts && j.candidates[0].content.parts[0] ? j.candidates[0].content.parts[0].text : '';
            if (j && j.candidates && j.candidates[0] && j.candidates[0].finishReason === 'MAX_TOKENS') txt += '\n\n[Reply was cut short — switch to Detailed in the toolbar for longer responses.]';
            return txt || '(No response)';
          };
          _context17.n = 4;
          return res.json();
        case 4:
          _t36 = _t37(_context17.v);
          if (_t36) {
            _context17.n = 5;
            break;
          }
          _t36 = '(No response)';
        case 5:
          return _context17.a(2, _t36);
      }
    }, _callee17);
  }));
  return _callGemini.apply(this, arguments);
}
function callGroq(_x15, _x16) {
  return _callGroq.apply(this, arguments);
} // ═══════════════════════════════════════════════════
//  FONT SIZE
// ═══════════════════════════════════════════════════
function _callGroq() {
  _callGroq = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(system, messages) {
    var res, e, _t38, _t39;
    return _regenerator().w(function (_context18) {
      while (1) switch (_context18.n) {
        case 0:
          _context18.n = 1;
          return fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + STATE.apiKey
            },
            body: JSON.stringify({
              model: 'llama-3.3-70b-versatile',
              max_tokens: STATE.replyLength === 'short' ? 400 : 1500,
              messages: [{
                role: 'system',
                content: system
              }].concat(messages)
            })
          });
        case 1:
          res = _context18.v;
          if (res.ok) {
            _context18.n = 3;
            break;
          }
          _context18.n = 2;
          return res.json().catch(function () {
            return {};
          });
        case 2:
          e = _context18.v;
          throw new Error(e && e.error && e.error.message ? e.error.message : 'HTTP ' + res.status);
        case 3:
          _t39 = function _t39(j) {
            var txt = j && j.choices && j.choices[0] && j.choices[0].message ? j.choices[0].message.content : '';
            if (j && j.choices && j.choices[0] && j.choices[0].finish_reason === 'length') txt += '\n\n[Reply was cut short — switch to Detailed in the toolbar for longer responses.]';
            return txt || '(No response)';
          };
          _context18.n = 4;
          return res.json();
        case 4:
          _t38 = _t39(_context18.v);
          if (_t38) {
            _context18.n = 5;
            break;
          }
          _t38 = '(No response)';
        case 5:
          return _context18.a(2, _t38);
      }
    }, _callee18);
  }));
  return _callGroq.apply(this, arguments);
}
function toggleFontPanel() {
  var panel = document.getElementById('font-panel'),
    btn = document.getElementById('font-toolbar-btn');
  panel.classList.toggle('open');
  document.getElementById('highlights-panel').classList.remove('open');
  document.getElementById('notes-panel').classList.remove('open');
  document.getElementById('highlights-toolbar-btn').classList.remove('active');
  document.getElementById('notes-toolbar-btn').classList.remove('active');
  panel.classList.contains('open') ? btn.classList.add('active') : btn.classList.remove('active');
}
function applyFontSize(size) {
  document.documentElement.style.fontSize = size + 'px';
  document.querySelectorAll('.font-size-opt').forEach(function (b) {
    parseInt(b.dataset.size) === size ? b.classList.add('active') : b.classList.remove('active');
  });
}
function setFontSize(size) {
  applyFontSize(size);
  localStorage.setItem('pc_font_size', size);
}

// ═══════════════════════════════════════════════════
//  OTHER OPTIONS
// ═══════════════════════════════════════════════════
function showOtherOptions() {
  var name = prompt('Give your companion a name (leave blank for "Companion"):');
  if (name === null) return; // cancelled
  var trimmed = name.trim();
  STATE.companionName = trimmed || 'Companion';
  localStorage.setItem('pc_companion_name', STATE.companionName);
  showToolbarMsg("Companion name set to \"" + STATE.companionName + "\".");
}

// ═══════════════════════════════════════════════════
//  TOOLBAR MESSAGE
// ═══════════════════════════════════════════════════
var toolbarMsgTimer = null;
function showToolbarMsg(text) {
  var el = document.getElementById('toolbar-msg');
  el.textContent = text;
  el.style.display = 'block';
  if (toolbarMsgTimer) clearTimeout(toolbarMsgTimer);
  toolbarMsgTimer = setTimeout(function () {
    el.style.display = 'none';
  }, 3000);
}

// ═══════════════════════════════════════════════════
//  UTILS
// ═══════════════════════════════════════════════════
function esc(s) {
  return String(s).replace(/&/g, '&' + 'amp;').replace(/</g, '&' + 'lt;').replace(/>/g, '&' + 'gt;').replace(/"/g, '&' + 'quot;');
}

// ═══════════════════════════════════════════════════
//  YOUR SHELF
// ═══════════════════════════════════════════════════

// Conversation storage structure:
// pc_convs_[bookKey] = [ { id, name, status, messages, lastUpdated }, ... ]

function getConvs(book) {
  try {
    return JSON.parse(localStorage.getItem('pc_convs_' + bookKey(book)) || '[]');
  } catch (e) {
    return [];
  }
}
function saveConvs(book, convs) {
  localStorage.setItem('pc_convs_' + bookKey(book), JSON.stringify(convs));
}
function getShelfBooks() {
  try {
    return JSON.parse(localStorage.getItem('pc_shelf_books') || '[]');
  } catch (e) {
    return [];
  }
}
function addBookToShelf(book) {
  var books = getShelfBooks();
  var bk = bookKey(book);
  if (!books.find(function (b) {
    return bookKey(b) === bk;
  })) {
    books.unshift({
      title: book.title,
      author: book.author,
      year: book.year || '',
      lang: book.lang || '',
      detectedLang: book.detectedLang || '',
      pageCount: book.pageCount || 0
    });
    localStorage.setItem('pc_shelf_books', JSON.stringify(books));
  }
}
function saveCurrentConversation() {
  if (!STATE.book || !STATE.messages.length) return;
  var convs = getConvs(STATE.book);
  var convId = STATE.currentConvId;
  var existing = convs.find(function (c) {
    return c.id === convId;
  });
  var name = STATE.currentConvName || (STATE.messages[0] && STATE.messages[0].content ? STATE.messages[0].content : 'Conversation').slice(0, 60);
  if (existing) {
    existing.messages = STATE.messages;
    existing.lastUpdated = Date.now();
    existing.status = STATE.readingStatus;
    existing.name = STATE.currentConvName || existing.name;
  } else {
    convs.unshift({
      id: convId,
      name: name,
      status: STATE.readingStatus,
      messages: STATE.messages,
      lastUpdated: Date.now()
    });
  }
  saveConvs(STATE.book, convs);
  addBookToShelf(STATE.book);
}
function renderShelf() {
  var books = getShelfBooks();
  var listEl = document.getElementById('shelf-list');
  if (!books.length) {
    listEl.innerHTML = '<p class="shelf-empty">Your shelf is empty. Start a conversation to add books here.</p>';
    return;
  }
  listEl.innerHTML = '';
  books.forEach(function (book) {
    var convs = getConvs(book);
    var last = convs.length ? new Date(convs[0].lastUpdated).toLocaleDateString() : '';
    var bk = bookKey(book);
    var status = localStorage.getItem('pc_status_' + bk) || '';
    var statusLabel = {
      considering: 'Considering',
      started: 'Just started',
      midway: 'Halfway through',
      finished: 'Finished'
    }[status] || '';
    var el = document.createElement('div');
    el.className = 'shelf-book';
    el.innerHTML = '<div class="shelf-book-title">' + esc(book.title) + '</div>' + '<div class="shelf-book-author">' + esc(book.author) + '</div>' + '<div class="shelf-book-meta">' + (statusLabel ? statusLabel + ' · ' : '') + convs.length + ' conversation' + (convs.length !== 1 ? 's' : '') + (last ? ' · Last: ' + last : '') + '</div>';
    el.addEventListener('click', function () {
      return openBookShelf(book);
    });
    listEl.appendChild(el);
  });
}
function openBookShelf(book) {
  STATE.book = book;
  var bk = bookKey(book);
  var status = localStorage.getItem('pc_status_' + bk) || '';
  var statusLabel = {
    considering: 'Considering',
    started: 'Just started',
    midway: 'Halfway through',
    finished: 'Finished'
  }[status] || '';
  document.getElementById('book-shelf-title').textContent = book.title;
  document.getElementById('book-shelf-author').textContent = book.author;
  document.getElementById('book-shelf-status').textContent = statusLabel;
  renderConvList(book);
  navigate('book-shelf');
}
function renderConvList(book) {
  var convs = getConvs(book);
  var listEl = document.getElementById('conv-list');
  if (!convs.length) {
    listEl.innerHTML = '<p class="shelf-empty">No conversations yet.</p>';
    return;
  }
  listEl.innerHTML = '';
  convs.forEach(function (conv) {
    var date = new Date(conv.lastUpdated).toLocaleDateString();
    var statusLabel = {
      considering: 'Considering',
      started: 'Just started',
      midway: 'Halfway through',
      finished: 'Finished'
    }[conv.status] || '';
    var el = document.createElement('div');
    el.className = 'conv-item';
    var safeId = String(conv.id).replace(/[^a-z0-9_]/gi, "");
    el.innerHTML = '<div class="conv-item-name">' + esc(conv.name) + '</div>' + '<div class="conv-item-meta">' + (statusLabel ? statusLabel + ' · ' : '') + date + '</div>' + '<div class="conv-actions">' + '<button class="conv-btn primary" data-action="continue" data-id="' + safeId + '">Continue</button>' + '<button class="conv-btn" data-action="rename" data-id="' + safeId + '">Rename</button>' + '<button class="conv-btn danger" data-action="delete" data-id="' + safeId + '">Delete</button>' + '</div>';
    el.addEventListener('click', function (evt) {
      var btn = evt.target;
      var action = btn.getAttribute('data-action');
      var id = btn.getAttribute('data-id');
      if (!action || !id) return;
      if (action === 'continue') continueConversation(id);else if (action === 'rename') renameConversation(id);else if (action === 'delete') deleteConversation(id);
    });
    listEl.appendChild(el);
  });
}
function continueConversation(_x17) {
  return _continueConversation.apply(this, arguments);
}
function _continueConversation() {
  _continueConversation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(convId) {
    var convs, conv, bk, log;
    return _regenerator().w(function (_context19) {
      while (1) switch (_context19.n) {
        case 0:
          convs = getConvs(STATE.book);
          conv = convs.find(function (c) {
            return c.id === convId;
          });
          if (conv) {
            _context19.n = 1;
            break;
          }
          return _context19.a(2);
        case 1:
          bk = bookKey(STATE.book);
          STATE.readingStatus = conv.status || localStorage.getItem('pc_status_' + bk) || null;
          STATE.chatLanguage = localStorage.getItem('pc_lang_' + bk) || 'english';
          STATE.detectedLang = STATE.book.detectedLang || detectLanguage(STATE.book);
          STATE.messages = conv.messages || [];
          STATE.currentConvId = conv.id;
          STATE.currentConvName = conv.name;
          if (!(STATE.chatLanguage === 'native' && STATE.detectedLang)) {
            _context19.n = 2;
            break;
          }
          _context19.n = 2;
          return generateThinkingPhrases(STATE.detectedLang);
        case 2:
          document.getElementById('book-title-display').textContent = STATE.book.title;
          document.getElementById('book-author-display').textContent = STATE.book.author;
          document.getElementById('input-book-context').textContent = STATE.book.title + (STATE.book.author ? ' · ' + STATE.book.author : '');
          document.getElementById('loading-indicator').style.display = 'none';
          document.getElementById('icebreakers').style.display = 'none';
          updateStatusDisplay();
          renderHighlightsPanel();

          // render existing messages
          log = document.getElementById('chat-log');
          log.innerHTML = '';
          STATE.messages.forEach(function (m) {
            return appendBubble(m.role === 'user' ? 'user' : 'companion', m.content);
          });
          navigate('companion');
        case 3:
          return _context19.a(2);
      }
    }, _callee19);
  }));
  return _continueConversation.apply(this, arguments);
}
function renameConversation(convId) {
  var convs = getConvs(STATE.book);
  var conv = convs.find(function (c) {
    return c.id === convId;
  });
  if (!conv) return;
  var newName = prompt('Rename this conversation:', conv.name);
  if (!newName || !newName.trim()) return;
  conv.name = newName.trim();
  if (STATE.currentConvId === convId) STATE.currentConvName = conv.name;
  saveConvs(STATE.book, convs);
  renderConvList(STATE.book);
}
function deleteConversation(convId) {
  var convs = getConvs(STATE.book);
  var filtered = convs.filter(function (c) {
    return c.id !== convId;
  });
  saveConvs(STATE.book, filtered);
  renderConvList(STATE.book);
}
function startNewConversation() {
  return _startNewConversation.apply(this, arguments);
}
function _startNewConversation() {
  _startNewConversation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20() {
    var bk;
    return _regenerator().w(function (_context20) {
      while (1) switch (_context20.n) {
        case 0:
          bk = bookKey(STATE.book);
          STATE.readingStatus = localStorage.getItem('pc_status_' + bk) || null;
          STATE.chatLanguage = localStorage.getItem('pc_lang_' + bk) || 'english';
          STATE.detectedLang = STATE.book.detectedLang || detectLanguage(STATE.book);
          STATE.messages = [];
          STATE.currentConvId = 'conv_' + Date.now();
          STATE.currentConvName = null;
          if (!(STATE.chatLanguage === 'native' && STATE.detectedLang)) {
            _context20.n = 1;
            break;
          }
          _context20.n = 1;
          return generateThinkingPhrases(STATE.detectedLang);
        case 1:
          launchCompanion(STATE.book);
        case 2:
          return _context20.a(2);
      }
    }, _callee20);
  }));
  return _startNewConversation.apply(this, arguments);
}
function updateBookStatus() {
  renderStatusScreen(STATE.book);
  navigate('status');
}

// launchCompanion shelf logic folded into main function below

// shelf render handled inside main handleRoute

// Auto-save is called directly inside sendMessage

// ═══════════════════════════════════════════════════
//  REPLY LENGTH
// ═══════════════════════════════════════════════════
function toggleLengthPanel() {
  var panel = document.getElementById('length-panel');
  var btn = document.getElementById('length-toolbar-btn');
  panel.classList.toggle('open');
  document.getElementById('font-panel').classList.remove('open');
  document.getElementById('highlights-panel').classList.remove('open');
  document.getElementById('passages-panel').classList.remove('open');
  document.getElementById('notes-panel').classList.remove('open');
  document.getElementById('font-toolbar-btn').classList.remove('active');
  document.getElementById('highlights-toolbar-btn').classList.remove('active');
  document.getElementById('passages-toolbar-btn').classList.remove('active');
  document.getElementById('notes-toolbar-btn').classList.remove('active');
  panel.classList.contains('open') ? btn.classList.add('active') : btn.classList.remove('active');
}
function setReplyLength(length) {
  STATE.replyLength = length;
  localStorage.setItem('pc_reply_length', length);
  document.querySelectorAll('.length-opt').forEach(function (b) {
    b.dataset.length === length ? b.classList.add('active') : b.classList.remove('active');
  });
  showToolbarMsg('Reply length set to ' + length + '.');
}

// ═══════════════════════════════════════════════════
//  PASSAGES
// ═══════════════════════════════════════════════════
function getPassages() {
  if (!STATE.book) return [];
  try {
    return JSON.parse(localStorage.getItem('pc_passages_' + bookKey(STATE.book)) || '[]');
  } catch (e) {
    return [];
  }
}
function savePassage(text, btn) {
  var passages = getPassages();
  // avoid duplicates
  if (passages.includes(text)) {
    btn.textContent = 'Already saved';
    btn.classList.add('saved');
    setTimeout(function () {
      btn.textContent = 'Save passage';
      btn.classList.remove('saved');
    }, 1500);
    return;
  }
  passages.push(text);
  localStorage.setItem('pc_passages_' + bookKey(STATE.book), JSON.stringify(passages));
  btn.textContent = 'Saved ✓';
  btn.classList.add('saved');
  setTimeout(function () {
    btn.textContent = 'Save passage';
    btn.classList.remove('saved');
  }, 1500);
  updatePassagesToolbarBtn();
  renderPassagesPanel();
}
function updatePassagesToolbarBtn() {
  var passages = getPassages();
  var btn = document.getElementById('passages-toolbar-btn');
  if (!btn) return;
  if (passages.length) {
    btn.style.display = 'block';
    btn.textContent = 'Passages (' + passages.length + ')';
  } else {
    btn.style.display = 'none';
  }
}
function renderPassagesPanel() {
  var passages = getPassages();
  var listEl = document.getElementById('passages-list');
  var countEl = document.getElementById('passages-count');
  if (!passages.length) {
    countEl.textContent = 'No passages saved yet';
    listEl.innerHTML = '';
    return;
  }
  countEl.textContent = passages.length + ' passage' + (passages.length !== 1 ? 's' : '') + ' saved';
  listEl.innerHTML = passages.map(function (p, i) {
    return '<div class="passage-item">' + formatText(p) + '</div>';
  }).join('');
}
function togglePassagesPanel() {
  var panel = document.getElementById('passages-panel');
  var btn = document.getElementById('passages-toolbar-btn');
  panel.classList.toggle('open');
  document.getElementById('font-panel').classList.remove('open');
  document.getElementById('highlights-panel').classList.remove('open');
  document.getElementById('notes-panel').classList.remove('open');
  document.getElementById('font-toolbar-btn').classList.remove('active');
  document.getElementById('highlights-toolbar-btn').classList.remove('active');
  document.getElementById('notes-toolbar-btn').classList.remove('active');
  panel.classList.contains('open') ? btn.classList.add('active') : btn.classList.remove('active');
  if (panel.classList.contains('open')) renderPassagesPanel();
}
function exportConversation() {
  if (!STATE.messages || !STATE.messages.length) {
    showToolbarMsg('No conversation to export yet.');
    return;
  }
  var book = STATE.book;
  var date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  var lines = [
    'Page Commons — Conversation Export',
    'Book: ' + (book ? book.title : 'Unknown'),
    'Author: ' + (book ? book.author : 'Unknown'),
    'Exported: ' + date,
    '',
    '---',
    ''
  ];
  var exchange = 0;
  STATE.messages.forEach(function(m) {
    if (m.role === 'user') {
      exchange++;
      lines.push('[' + exchange + '] You');
      lines.push(m.content);
      lines.push('');
    } else {
      lines.push(STATE.companionName || 'Companion');
      lines.push(m.content);
      lines.push('');
    }
  });
  var blob = new Blob([lines.join('\n')], { type: 'text/plain' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = (book ? book.title.replace(/[^a-z0-9]/gi, '-').toLowerCase() : 'conversation') + '-export.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function getNotes(book) {
  var bk = bookKey(book || STATE.book);
  return JSON.parse(localStorage.getItem('pc_notes_' + bk) || '[]');
}
function saveNoteEntry() {
  var ta = document.getElementById('note-input');
  if (!ta || !STATE.book) return;
  var text = ta.value.trim();
  if (!text) return;
  var bk = bookKey(STATE.book);
  var notes = getNotes(STATE.book);
  notes.unshift({ text: text, ts: Date.now() });
  localStorage.setItem('pc_notes_' + bk, JSON.stringify(notes));
  ta.value = '';
  renderNotesPanel();
  updateNotesToolbarBtn();
}
function renderNotesPanel() {
  var list = document.getElementById('notes-list');
  if (!list || !STATE.book) return;
  var notes = getNotes(STATE.book);
  if (!notes.length) {
    list.innerHTML = '<p class="passages-empty">No notes yet.</p>';
    return;
  }
  list.innerHTML = notes.map(function(n) {
    var d = new Date(n.ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    return '<div class="note-item"><div class="note-date">' + d + '</div>' + formatText(n.text) + '</div>';
  }).join('');
}
function toggleNotesPanel() {
  var panel = document.getElementById('notes-panel');
  var btn = document.getElementById('notes-toolbar-btn');
  panel.classList.toggle('open');
  document.getElementById('font-panel').classList.remove('open');
  document.getElementById('highlights-panel').classList.remove('open');
  document.getElementById('passages-panel').classList.remove('open');
  document.getElementById('length-panel').classList.remove('open');
  document.getElementById('font-toolbar-btn').classList.remove('active');
  document.getElementById('highlights-toolbar-btn').classList.remove('active');
  document.getElementById('passages-toolbar-btn').classList.remove('active');
  document.getElementById('length-toolbar-btn').classList.remove('active');
  if (panel.classList.contains('open')) {
    btn.classList.add('active');
    renderNotesPanel();
  } else {
    btn.classList.remove('active');
  }
}
function updateNotesToolbarBtn() {
  var btn = document.getElementById('notes-toolbar-btn');
  if (!btn || !STATE.book) return;
  var notes = getNotes(STATE.book);
  btn.textContent = notes.length ? 'Notes (' + notes.length + ')' : 'Notes';
}
function copyAllPassages() {
  var passages = getPassages();
  if (!passages.length) {
    showToolbarMsg('No passages saved yet.');
    return;
  }
  var text = passages.map(function (p, i) {
    return '[' + (i + 1) + '] ' + p;
  }).join('\n\n');
  navigator.clipboard.writeText(text).then(function () {
    showToolbarMsg(passages.length + ' passage' + (passages.length !== 1 ? 's' : '') + ' copied to clipboard.');
  }).catch(function () {
    return showToolbarMsg('Copy not available in this browser.');
  });
}

// ═══════════════════════════════════════════════════
//  END CONVERSATION
// ═══════════════════════════════════════════════════
function endConversation() {
  saveCurrentConversation();
  navigate('home');
}
// ═══════════════════════════════════════════════════
//  KEY TRANSFER
// ═══════════════════════════════════════════════════

function toggleTransferSection() {
  var fields = document.getElementById('transfer-fields');
  var btn = document.querySelector('#transfer-section .back-link');
  if (!fields) return;
  if (fields.style.display === 'none') {
    fields.style.display = 'block';
    if (btn) btn.textContent = '↑ Hide transfer code entry';
    var inp = document.getElementById('transfer-code-input');
    if (inp) inp.focus();
  } else {
    fields.style.display = 'none';
    if (btn) btn.textContent = '↓ Transferring from another device? Enter a code';
  }
}

function redeemTransferCode() {
  var input = document.getElementById('transfer-code-input');
  var errEl = document.getElementById('transfer-error');
  var okEl  = document.getElementById('transfer-success');
  if (!input) return;

  // Strip spaces and validate
  var code = input.value.replace(/\s/g, '');
  errEl.style.display = 'none';
  okEl.style.display  = 'none';

  if (!/^\d{6}$/.test(code)) {
    errEl.textContent = 'Please enter the 6-digit code exactly as shown.';
    errEl.style.display = 'block';
    return;
  }

  var btn = document.querySelector('#transfer-fields .btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Fetching…'; }

  fetch('/api/transfer?code=' + code)
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (btn) { btn.disabled = false; btn.textContent = 'Fetch my key'; }
      if (data.error) {
        errEl.textContent = data.error === 'Code not found or expired'
          ? 'Code not found or expired. Generate a new one and try again.'
          : 'Error: ' + data.error;
        errEl.style.display = 'block';
        return;
      }
      // Save the key
      STATE.apiKey = data.key;
      localStorage.setItem('pc_api_key', data.key);
      var keyInput = document.getElementById('api-key-input');
      if (keyInput) keyInput.value = data.key;
      var statusBar = document.getElementById('key-status-bar');
      if (statusBar) statusBar.style.display = 'block';
      // Show success
      okEl.textContent = 'Key transferred successfully! Tap Continue.';
      okEl.style.display = 'block';
      input.value = '';
      // Hide the transfer fields
      var fields = document.getElementById('transfer-fields');
      if (fields) fields.style.display = 'none';
    })
    .catch(function(err) {
      if (btn) { btn.disabled = false; btn.textContent = 'Fetch my key'; }
      errEl.textContent = 'Network error — please check your connection and try again.';
      errEl.style.display = 'block';
    });
}

function showInitError(msg) {
  try {
    var errDiv = document.getElementById('kobo-init-error');
    if (!errDiv) {
      errDiv = document.createElement('div');
      errDiv.id = 'kobo-init-error';
      errDiv.style.cssText = 'background:#f5f5f5;border:1px solid #111;padding:14px;margin:14px 0;font-size:16px;font-family:Georgia,serif;color:#111;';
      var page = document.querySelector('.page');
      if (page) page.insertBefore(errDiv, page.firstChild);
      else document.body.appendChild(errDiv);
    }
    errDiv.style.display = 'block';
    errDiv.textContent = 'Error: ' + msg;
  } catch (displayErr) {}
}
// ═══════════════════════════════════════════════════
//  SETTINGS
// ═══════════════════════════════════════════════════
function loadSettingsScreen() {
  var nameEl = document.getElementById('settings-name');
  if (nameEl) nameEl.value = STATE.userName || '';
  var cnEl = document.getElementById('settings-companion-name');
  if (cnEl) cnEl.value = STATE.companionName === 'Companion' ? '' : STATE.companionName;
  applyProviderUI(STATE.provider);
  document.querySelectorAll('.length-opt').forEach(function(b) {
    b.dataset.length === STATE.replyLength ? b.classList.add('active') : b.classList.remove('active');
  });
  document.querySelectorAll('.font-size-opt').forEach(function(b) {
    parseInt(b.dataset.size, 10) === (parseInt(localStorage.getItem('pc_font_size'), 10) || 18) ? b.classList.add('active') : b.classList.remove('active');
  });
}
function saveSettingName() {
  var val = (document.getElementById('settings-name').value || '').trim();
  STATE.userName = val;
  if (val) localStorage.setItem('pc_user_name', val);
  else localStorage.removeItem('pc_user_name');
}
function saveSettingCompanionName() {
  var val = (document.getElementById('settings-companion-name').value || '').trim();
  STATE.companionName = val || 'Companion';
  localStorage.setItem('pc_companion_name', STATE.companionName);
  var keyInp = document.getElementById('companion-name-input');
  if (keyInp) keyInp.value = val;
}

// ═══════════════════════════════════════════════════
//  READING PROGRESS
// ═══════════════════════════════════════════════════
function getReadingProgress(book) {
  try {
    return JSON.parse(localStorage.getItem('pc_progress_' + bookKey(book)) || 'null');
  } catch (e) { return null; }
}
function updateProgressFromHighlights(highlights) {
  var byBook = {};
  highlights.forEach(function(h) {
    if (!h.page) return;
    var bk = bookKey({ title: h.title, author: h.author });
    if (!byBook[bk] || h.page > byBook[bk]) byBook[bk] = h.page;
  });
  Object.keys(byBook).forEach(function(bk) {
    var existing = getReadingProgress({ title: bk, author: '' });
    if (!existing || byBook[bk] > (existing.page || 0)) {
      localStorage.setItem('pc_progress_' + bk, JSON.stringify({ page: byBook[bk], source: 'kindle' }));
    }
  });
}

// ═══════════════════════════════════════════════════
//  BOOK SUBJECTS (icebreaker enrichment)
// ═══════════════════════════════════════════════════
function fetchAndCacheSubjects(book) {
  var bk = bookKey(book);
  var cacheKey = 'pc_subjects_' + bk;
  if (localStorage.getItem(cacheKey)) return;
  if (book.key && book.key.indexOf('/works/') === 0) {
    fetch('https://openlibrary.org' + book.key + '.json')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        var subjects = (data.subjects || []).slice(0, 10);
        localStorage.setItem(cacheKey, JSON.stringify(subjects));
      })
      .catch(function() {});
  } else if (book.cats) {
    var cats = book.cats.split(/\s+/).filter(Boolean).slice(0, 6);
    if (cats.length) localStorage.setItem(cacheKey, JSON.stringify(cats));
  }
}

function init() {
  try {
    var prov = localStorage.getItem('pc_provider');
    if (prov) {
      STATE.provider = prov;
      applyProviderUI(prov);
    }
    var key = localStorage.getItem('pc_api_key');
    if (key) {
      STATE.apiKey = key;
      document.getElementById('api-key-input').value = key;
      document.getElementById('key-status-bar').style.display = 'block';
    }
    var name = localStorage.getItem('pc_companion_name');
    if (name) {
      STATE.companionName = name;
      document.getElementById('companion-name-input').value = name;
    }
    var uname = localStorage.getItem('pc_user_name');
    if (uname) STATE.userName = uname;
  } catch (e) {
    showInitError('settings: ' + e.message);
  }
  try {
    STATE.highlights = JSON.parse(localStorage.getItem('pc_highlights') || '[]');
  } catch (e) {}
  try {
    var sz = localStorage.getItem('pc_font_size');
    if (sz) applyFontSize(parseInt(sz));
    var rl = localStorage.getItem('pc_reply_length');
    if (rl) {
      STATE.replyLength = rl;
      document.querySelectorAll('.length-opt').forEach(function (b) {
        b.dataset.length === rl ? b.classList.add('active') : b.classList.remove('active');
      });
    }
  } catch (e) {
    showInitError('font: ' + e.message);
  }
  try {
    var savedBook = JSON.parse(localStorage.getItem('pc_last_book') || 'null');
    if (savedBook) {
      STATE.book = savedBook;
      STATE.readingStatus = localStorage.getItem('pc_status_' + bookKey(savedBook)) || null;
      STATE.chatLanguage = localStorage.getItem('pc_lang_' + bookKey(savedBook)) || 'english';
      STATE.detectedLang = savedBook.detectedLang || null;
      restoreCompanionUI(savedBook);
    }
  } catch (e) {
    showInitError('book restore: ' + e.message);
  }
  try {
    updateGreeting();
  } catch (e) {
    showInitError('greeting: ' + e.message);
  }
  try {
    if (!localStorage.getItem('pc_tc_accepted')) {
      showScreen('tc');
    } else {
      handleRoute();
    }
    if (!document.querySelector('.screen.active')) showScreen('home');
  } catch (e) {
    showInitError('routing: ' + e.message);
    try {
      showScreen('home');
    } catch (e2) {}
  }
}
function runInit() {
  // Ensure at least one screen is visible before init runs
  try {
    var allScreens = document.querySelectorAll('.screen');
    for (var _i = 0; _i < allScreens.length; _i++) {
      allScreens[_i].style.display = 'none';
    }
    var homeEl = document.getElementById('screen-home');
    if (homeEl) {
      homeEl.classList.add('active');
      homeEl.style.display = 'block';
    }
  } catch(e) {}
  try {
    init();
  } catch (e) {
    showInitError('crash: ' + e.message);
  }
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runInit);
} else {
  runInit();
}
