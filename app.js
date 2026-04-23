// ═══════════════════════════════════════════════════
//  CANARY — remove once Kobo rendering confirmed
// ═══════════════════════════════════════════════════
(function() {
  var el = document.getElementById('screen-home');
  if (el) { el.style.display = 'block'; }
  var hdr = document.querySelector('.hall-title');
  if (hdr) { hdr.textContent = 'JS running — loading app…'; }
})();
// ═══════════════════════════════════════════════════

// ─── POLYFILLS for older WebKit (Kobo/Kindle) ───────────────────────────────
if (!Array.prototype.includes) {
  Array.prototype.includes = function(val) {
    for (var i = 0; i < this.length; i++) { if (this[i] === val) return true; }
    return false;
  };
}
if (!String.prototype.includes) {
  String.prototype.includes = function(val) { return this.indexOf(val) !== -1; };
}
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(val) { return this.indexOf(val) === 0; };
}
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(val) { return this.slice(-val.length) === val; };
}
if (!Object.assign) {
  Object.assign = function(t) {
    for (var i = 1; i < arguments.length; i++) {
      var s = arguments[i];
      for (var k in s) { if (Object.prototype.hasOwnProperty.call(s, k)) t[k] = s[k]; }
    }
    return t;
  };
}
// ─────────────────────────────────────────────────────────────────────────────

// ═══════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════
const STATE = {
  apiKey:        '',
  provider:      'anthropic',
  companionName: 'Companion',
  book:          null,
  readingStatus: null,   // 'considering' | 'started' | 'midway' | 'finished'
  chatLanguage:  'english', // 'english' | 'native'
  detectedLang:  null,   // language name detected from book, e.g. 'Chinese'
  highlights:    [],
  messages:      [],
  lastUserText:   '',
  thinkingPhrases:  null,
  currentConvId:   null,
  currentConvName: null,
  pendingBook:     null,   // held during age gate
  passages:        [],     // saved passages for current book
  replyLength:     'medium', // 'short' | 'medium' | 'detailed'
};

const STATIC_PROMPTS = [
  "I just finished it",
  "Something is still on my mind",
  "I want to understand something better",
  "There's a passage I keep thinking about",
  "I'm not sure how I feel about it",
  "I gave up — can we talk about why?",
  "I want to know what to read next",
  "Something surprised me",
];

const STATIC_THINKING = ['Typing…','Reading your note…','Considering…','Let me think…','Hmm…','One moment…','With you…'];

// ═══════════════════════════════════════════════════
//  SCREENS + NAVIGATION
// ═══════════════════════════════════════════════════
const SCREENS = ['home','key','search','status','language','companion','about','shelf','book-shelf','tc','age-gate'];

// navigate() defined above with showScreen

function showScreen(id) {
  const target = SCREENS.includes(id) ? id : 'home';
  SCREENS.forEach(s => {
    const el = document.getElementById('screen-'+s);
    if (el) { if (s === target) { el.classList.add('active'); } else { el.classList.remove('active'); } }
  });
  window.scrollTo(0,0);
}

function handleRoute() {
  const hash = window.location.hash.replace('#','') || 'home';

  // defensive redirects
  if (hash === 'companion') {
    if (!STATE.apiKey) { navigate('key');    return; }
    if (!STATE.book)   { navigate('search'); return; }
  }
  if (hash === 'search' && !STATE.apiKey) { navigate('key'); return; }

  const target = SCREENS.includes(hash) ? hash : 'home';
  showScreen(target);
  if (target === 'shelf') renderShelf();
  updateTitleLink();
}

function navigate(view) {
  if (window.location.hash.replace('#','') === view) {
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
  const el = document.getElementById('site-name-el');
  if (!el) return;
  const hash = window.location.hash.replace('#','') || 'home';
  const noClick = ['home','key','tc'];
  if (noClick.includes(hash)) {
    el.style.cursor = 'default';
    el.onclick = null;
  } else {
    el.style.cursor = 'pointer';
    el.title = 'Back to library hall';
    el.onclick = () => navigate('home');
  }
}

// ═══════════════════════════════════════════════════
//  OFFLINE + MESSAGE QUEUE
// ═══════════════════════════════════════════════════
function updateOffline() {
  document.getElementById('offline-banner').style.display = navigator.onLine ? 'none' : 'block';
}
window.addEventListener('offline', updateOffline);
window.addEventListener('online', () => { updateOffline(); processOfflineQueue(); });
updateOffline();

function queueOfflineMessage(text) {
  const q = getOfflineQueue();
  q.push({ text, book: STATE.book, timestamp: Date.now() });
  localStorage.setItem('pc_offline_queue', JSON.stringify(q));
}
function getOfflineQueue() { try { return JSON.parse(localStorage.getItem('pc_offline_queue') || '[]'); } catch(e) { return []; } }
function clearOfflineQueue() { localStorage.removeItem('pc_offline_queue'); }

async function processOfflineQueue() {
  const queue = getOfflineQueue();
  if (!queue.length || !STATE.apiKey) return;
  showToolbarMsg("You're back online — sending your saved message…");
  clearOfflineQueue();
  for (var _qi = 0; _qi < queue.length; _qi++) {
    var item = queue[_qi];
    if (item.book && STATE.book && item.book.title === STATE.book.title) {
      STATE.messages.push({ role: 'user', content: item.text });
      appendBubble('user', item.text);
      try {
        var reply = await callAI();
        STATE.messages.push({ role: 'assistant', content: reply });
        var el = appendBubble('companion', reply);
        scrollToMessage(el);
      } catch(err) { appendError(err); }
    }
  }
}

// ═══════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════
// init() called at end of file


function bookKey(book) {
  return btoa(encodeURIComponent((book.title + '||' + book.author).slice(0,40))).replace(/=/g,'');
}

function restoreCompanionUI(book) {
  document.getElementById('book-title-display').textContent  = book.title;
  document.getElementById('book-author-display').textContent = book.author;
  document.getElementById('input-book-context').textContent  = book.title + (book.author ? ' · ' + book.author : '');
  updateStatusDisplay();
  populateIcebreakers(book);
  renderHighlightsPanel();
}

// ═══════════════════════════════════════════════════
//  GREETING
// ═══════════════════════════════════════════════════
function updateGreeting() {
  const h = new Date().getHours();
  const g = h < 5 ? 'Reading late?' : h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : h < 21 ? 'Good evening' : 'Reading tonight?';
  const el = document.querySelector('.hall-greeting');
  if (el) el.textContent = g;
}

// ═══════════════════════════════════════════════════
//  PROVIDER SELECTION
// ═══════════════════════════════════════════════════
const PROVIDER_CONFIG = {
  anthropic: { placeholder: 'sk-ant-…',  hint: 'Get your key at console.anthropic.com' },
  gemini:    { placeholder: 'AIza…',      hint: 'Get your free key at aistudio.google.com' },
  groq:      { placeholder: 'gsk_…',      hint: 'Get your free key at console.groq.com' },
};

function selectProvider(prov) { STATE.provider = prov; localStorage.setItem('pc_provider', prov); applyProviderUI(prov); }

function applyProviderUI(prov) {
  ['anthropic','gemini','groq'].forEach(p => (p === prov ? document.getElementById('prov-'+p).classList.add('selected') : document.getElementById('prov-'+p).classList.remove('selected')));
  const cfg = PROVIDER_CONFIG[prov];
  document.getElementById('api-key-input').placeholder = cfg.placeholder;
  document.getElementById('key-hint').textContent = cfg.hint;
}

// ═══════════════════════════════════════════════════
//  API KEY + COMPANION NAME
// ═══════════════════════════════════════════════════
function toggleKeyVisibility() {
  const inp = document.getElementById('api-key-input');
  const btn = document.querySelector('.key-toggle');
  inp.type = inp.type === 'password' ? 'text' : 'password';
  btn.textContent = inp.type === 'password' ? 'Show key' : 'Hide key';
}

function saveKey() {
  const val  = document.getElementById('api-key-input').value.trim();
  const name = document.getElementById('companion-name-input').value.trim();
  const err  = document.getElementById('key-error');
  err.style.display = 'none';

  if (!val) { err.textContent = 'Please enter your API key.'; err.style.display = 'block'; return; }

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
  const nl = /\b(the one|that book|written by|by the author|about|popular|famous|japanese|chinese|korean|french|spanish|german|italian|novel|memoir|classic|recent|new|old)\b/i;
  return nl.test(q) || q.trim().split(/\s+/).length > 5;
}

async function interpretSearchQuery(q) {
  if (!STATE.apiKey) return { title: q, author: '' };
  var prompt = 'A user is searching for a book with this query: "' + q + '"\nExtract the most likely book title and author. Return ONLY a JSON object like: {"title":"...","author":"..."}\nIf you cannot determine the author, use an empty string. No other text.';
  try {
    let text = '';
    if (STATE.provider === 'anthropic') {
      const res = await fetch('https://api.anthropic.com/v1/messages', { method:'POST', headers:{'Content-Type':'application/json','x-api-key':STATE.apiKey,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'}, body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:80, messages:[{role:'user',content:prompt}] }) });
      text = ( function(j){return j&&j.content&&j.content[0]?j.content[0].text:""; })(await res.json()) || '';
    } else if (STATE.provider === 'gemini') {
      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + STATE.apiKey, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ contents:[{parts:[{text:prompt}]}] }) });
      text = (function(j){return j&&j.candidates&&j.candidates[0]&&j.candidates[0].content&&j.candidates[0].content.parts&&j.candidates[0].content.parts[0]?j.candidates[0].content.parts[0].text:"";})(await res.json()) || '';
    } else if (STATE.provider === 'groq') {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', { method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer ' + STATE.apiKey}, body: JSON.stringify({ model:'llama-3.3-70b-versatile', max_tokens:80, messages:[{role:'user',content:prompt}] }) });
      text = (function(j){return j&&j.choices&&j.choices[0]&&j.choices[0].message?j.choices[0].message.content:"";})(await res.json()) || '';
    }
    const parsed = JSON.parse(text.replace(/```json|```/g,'').trim());
    if (parsed.title) return { title: parsed.title, author: parsed.author || '' };
  } catch(e) {}
  return { title: q, author: '' };
}

// ═══════════════════════════════════════════════════
//  RENDER BOOK BATCH (search results helper)
// ═══════════════════════════════════════════════════
function renderBookBatch(batch, container, insertBefore) {
  const anchor = insertBefore || container.querySelector('.manual-entry') || null;
  batch.forEach(book => {
    const el = document.createElement('div'); el.className = 'book-result';
    const th = book.thumb
      ? '<img class="book-cover-thumb" src="' + esc(book.thumb) + '" alt="" loading="lazy">'
      : '';
    el.innerHTML = '<div class="book-result-inner">' + th +
      '<div class="book-result-text">' +
      '<div class="book-result-title">'  + esc(book.title)  + '</div>' +
      '<div class="book-result-author">' + esc(book.author) + '</div>' +
      '<div class="book-result-meta">'   + (book.year ? book.year + ' · ' : '') + esc(book.source || 'Open Library') + '</div>' +
      '</div></div>';
    el.addEventListener('click', () => selectBookWithAgeCheck(book));
    if (anchor) container.insertBefore(el, anchor);
    else container.appendChild(el);
  });
}


async function searchBooks() {
  const rawTitle  = document.getElementById('book-search-title').value.trim();
  const rawAuthor = document.getElementById('book-search-author').value.trim();
  const raw = rawTitle || rawAuthor;
  if (!raw) return;

  const statusEl  = document.getElementById('search-status');
  const resultsEl = document.getElementById('search-results');
  resultsEl.innerHTML = '';

  // ISBN detection
  const isbnClean = raw.replace(/[-\s]/g, '');
  if (/^(97[89])?\d{9}[\dXx]$/.test(isbnClean)) {
    statusEl.textContent = 'Looking up ISBN…'; statusEl.className = 'status-msg'; statusEl.style.display = 'block';
    try {
      const isbnUrl = 'https://openlibrary.org/api/books?bibkeys=ISBN:' + isbnClean + '&format=json&jscmd=data';
      const res  = await fetch(isbnUrl);
      const data = await res.json();
      const key  = 'ISBN:' + isbnClean;
      if (data[key]) {
        const b = data[key];
        const book = {
          title:  b.title || 'Unknown title',
          author: (b.authors || [{name:'Unknown author'}])[0].name,
          year:   b.publish_date ? b.publish_date.slice(-4) : '',
          key: '', source: 'Open Library (ISBN)',
          thumb: b.cover ? (b.cover.small || '') : '',
        };
        statusEl.style.display = 'none';
        const el = document.createElement('div'); el.className = 'book-result';
        const th = book.thumb ? '<img class="book-cover-thumb" src="' + esc(book.thumb) + '" alt="" loading="lazy">' : '';
        el.innerHTML = '<div class="book-result-inner">' + th + '<div class="book-result-text"><div class="book-result-title">' + esc(book.title) + '</div><div class="book-result-author">' + esc(book.author) + '</div><div class="book-result-meta">' + (book.year||'') + (book.year?' · ':'') + esc(book.source) + '</div></div></div>';
        el.addEventListener('click', () => selectBookWithAgeCheck(book));
        resultsEl.appendChild(el);
      } else {
        statusEl.textContent = 'ISBN not found — try searching by title.';
        statusEl.style.display = 'block';
        renderManualEntry(raw, resultsEl);
      }
    } catch(e) {
      statusEl.textContent = 'ISBN lookup failed — check your connection.';
      statusEl.className = 'status-msg error'; statusEl.style.display = 'block';
    }
    return;
  }

  // Build search terms
  let searchTitle = rawTitle, searchAuthor = rawAuthor;
  statusEl.textContent = 'Searching…'; statusEl.className = 'status-msg'; statusEl.style.display = 'block';

  // AI natural language interpretation (title field only, no author given)
  const isNL = !rawAuthor && looksLikeNaturalLanguage(rawTitle);
  if (isNL && STATE.apiKey) {
    statusEl.textContent = 'Understanding your search…';
    const interp = await interpretSearchQuery(rawTitle);
    searchTitle = interp.title;
    searchAuthor = interp.author || rawAuthor;
    statusEl.textContent = 'Searching for "' + searchTitle + '"' + (searchAuthor ? ' by ' + searchAuthor : '') + '…';
  }

  const gbParts = [];
  if (searchTitle)  gbParts.push('intitle:' + searchTitle);
  if (searchAuthor) gbParts.push('inauthor:' + searchAuthor);
  const gbQuery = gbParts.join('+');
  const olQuery = [searchTitle, searchAuthor].filter(Boolean).join(' ');
  const hasNonLatin = /[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af\u0600-\u06ff\u0400-\u04ff\u0900-\u097f\u0e00-\u0e7f]/.test(raw);

  try {
    let books = [];
    if (hasNonLatin) {
      statusEl.textContent = 'Searching Google Books…'; statusEl.style.display = 'block';
      books = await fetchGoogleBooks(gbQuery);
    } else {
      books = await fetchOpenLibrary(olQuery);
      if (!books.length && searchTitle && searchAuthor) {
        statusEl.textContent = 'Trying title only…'; statusEl.style.display = 'block';
        books = await fetchOpenLibrary(searchTitle);
      }
      if (!books.length) {
        statusEl.textContent = 'Trying Google Books…'; statusEl.style.display = 'block';
        books = await fetchGoogleBooks(gbQuery);
      }
      if (!books.length && searchTitle && searchAuthor) {
        books = await fetchGoogleBooks('intitle:' + searchTitle);
      }
    }

    statusEl.style.display = 'none';

    if (!books.length) {
      statusEl.textContent = 'No results found — try different keywords or enter manually below.';
      statusEl.style.display = 'block';
      renderManualEntry(searchTitle, resultsEl);
      return;
    }

    // Author-only refine prompt
    if (!searchTitle && searchAuthor) {
      const refineEl = document.createElement('p');
      refineEl.style.cssText = 'font-size:0.85rem;color:#777777;margin-bottom:12px;font-style:italic';
      refineEl.textContent = 'Showing books by "' + searchAuthor + '". Add a title above to narrow down.';
      resultsEl.appendChild(refineEl);
    }

    renderBookBatch(books.slice(0, 6), resultsEl, null);

    // Pagination state
    let _page = 1;
    const _olQuery = olQuery, _gbQuery = gbQuery, _hasNonLatin = hasNonLatin;
    const _seen = new Set(books.map(b => b.title.toLowerCase() + '||' + b.author.toLowerCase()));

    function addShowMoreBtn() {
      const moreBtn = document.createElement('button');
      moreBtn.className = 'btn';
      moreBtn.textContent = 'Show more results';
      moreBtn.style.marginBottom = '10px';
      moreBtn.onclick = async () => {
        moreBtn.textContent = 'Loading…'; moreBtn.disabled = true;
        _page++;
        try {
          let more = [];
          if (_hasNonLatin) {
            more = await fetchGoogleBooks(_gbQuery, 6, (_page-1)*6);
          } else {
            more = await fetchOpenLibrary(_olQuery, _page*6+6);
          }
          const fresh = more.filter(b => {
            const k = b.title.toLowerCase() + '||' + b.author.toLowerCase();
            if (_seen.has(k)) return false;
            _seen.add(k); return true;
          });
          const manualEntry = resultsEl.querySelector('.manual-entry');
          moreBtn.remove();
          if (fresh.length) {
            renderBookBatch(fresh, resultsEl, manualEntry || null);
            if (fresh.length >= 4) addShowMoreBtn();
          } else {
            const noMore = document.createElement('p');
            noMore.style.cssText = 'font-size:0.85rem;color:#777777;font-style:italic;margin-bottom:12px';
            noMore.textContent = 'No more results found.';
            if (manualEntry) resultsEl.insertBefore(noMore, manualEntry);
            else resultsEl.appendChild(noMore);
          }
        } catch(e) { moreBtn.textContent = 'Show more results'; moreBtn.disabled = false; }
      };
      const manualEntry = resultsEl.querySelector('.manual-entry');
      if (manualEntry) resultsEl.insertBefore(moreBtn, manualEntry);
      else resultsEl.appendChild(moreBtn);
    }

    if (books.length >= 6) addShowMoreBtn();
    renderManualEntry(searchTitle, resultsEl);

  } catch(e) {
    statusEl.textContent = 'Search failed — check your connection and try again.';
    statusEl.className = 'status-msg error'; statusEl.style.display = 'block';
    renderManualEntry(searchTitle, resultsEl);
  }
}

async function fetchOpenLibrary(q, limit=10, offset=0) {
  const res  = await fetch('https://openlibrary.org/search.json?q=' + encodeURIComponent(q) + '&limit=' + limit + '&offset=' + offset + '&fields=key,title,author_name,first_publish_year');
  const data = await res.json();
  const seen = new Map();
  (data.docs||[]).forEach(d => {
    const title = d.title||'Unknown title', author = (d.author_name||['Unknown author'])[0];
    const k = title.toLowerCase()+'||'+author.toLowerCase(), year = d.first_publish_year||9999;
    const olid = d.cover_i ? 'https://covers.openlibrary.org/b/id/' + d.cover_i + '-S.jpg' : '';
    if (!seen.has(k)||year<seen.get(k).year) seen.set(k,{title,author,year:d.first_publish_year||'',key:d.key||'',source:'Open Library',thumb:olid});
  });
  const results = Array.from(seen.values());
  // Sort: exact title matches first, then by year
  results.sort((a,b) => {
    const aq = q.toLowerCase(), at = a.title.toLowerCase(), bt = b.title.toLowerCase();
    const aExact = at === aq ? 0 : at.startsWith(aq) ? 1 : 2;
    const bExact = bt === aq ? 0 : bt.startsWith(aq) ? 1 : 2;
    if (aExact !== bExact) return aExact - bExact;
    return (a.year||9999) - (b.year||9999);
  });
  return results;
}

async function fetchGoogleBooks(q, maxResults=8, startIndex=0) {
  const res  = await fetch('/api/books?q=' + encodeURIComponent(q) + '&maxResults=' + maxResults + '&startIndex=' + startIndex);
  const data = await res.json();
  const seen = new Map();
  (data.items||[]).forEach(item => {
    const info = item.volumeInfo||{}, title = info.title||'Unknown title', author = (info.authors||['Unknown author'])[0];
    const k = title.toLowerCase()+'||'+author.toLowerCase();
    const thumb = (info.imageLinks && info.imageLinks.smallThumbnail ? info.imageLinks.smallThumbnail : (info.imageLinks && info.imageLinks.thumbnail ? info.imageLinks.thumbnail : ''));
    const cats = (info.categories||[]).join(' ').toLowerCase();
    if (!seen.has(k)) seen.set(k,{title,author,year:info.publishedDate?info.publishedDate.slice(0,4):'',key:item.id||'',source:'Google Books',lang:info.language||'',thumb,cats});
  });
  return Array.from(seen.values()).slice(0,6);
}

function renderManualEntry(prefill, container) {
  const ex = container.querySelector('.manual-entry'); if (ex) ex.remove();
  const wrap = document.createElement('div'); wrap.className = 'manual-entry';
  wrap.innerHTML = '<p style="font-size:0.85rem;color:#777777;margin-bottom:14px">Not seeing your book? Enter it manually:</p>' +
    '<div class="field"><label>Title</label><input type="text" id="manual-title" /></div>' +
    '<div class="field"><label>Author <span style="font-weight:normal;text-transform:none">(optional)</span></label><input type="text" id="manual-author" placeholder="Author name" /></div>' +
    '<button class="btn btn-primary" onclick="selectManualBook()">Start companion</button>';
  container.appendChild(wrap);
  const ti = document.getElementById('manual-title'); if (ti) ti.value = prefill||'';
}

function selectManualBook() {
  const title = (document.getElementById('manual-title')||{}).value||'';
  const author = (document.getElementById('manual-author')||{}).value||'';
  if (!title.trim()) return;
  selectBook({title:title.trim(),author:author.trim()||'Unknown author',year:'',key:''});
}


// ═══════════════════════════════════════════════════
//  AGE GATE + T&C
// ═══════════════════════════════════════════════════
function acceptTC() {
  localStorage.setItem('pc_tc_accepted', '1');
  navigate('key');
}

function isAdultBook(book) {
  const ADULT_TAGS = ['erotica','erotic','adult fiction','explicit','mature','sexuality','pornography'];
  const cats = (book.cats || '').toLowerCase();
  return ADULT_TAGS.some(t => cats.includes(t));
}

let _pendingBookForAgeGate = null;

async function selectBookWithAgeCheck(book) {
  if (isAdultBook(book)) {
    _pendingBookForAgeGate = book;
    document.getElementById('age-gate-book-name').textContent = '"' + book.title + '"';
    navigate('age-gate');
  } else {
    selectBook(book);
  }
}

async function confirmAgeGate() {
  if (_pendingBookForAgeGate) {
    await selectBook(_pendingBookForAgeGate);
    _pendingBookForAgeGate = null;
  }
}


// ═══════════════════════════════════════════════════
//  STATUS SCREEN TRANSLATION
// ═══════════════════════════════════════════════════
const STATUS_OPTIONS_EN = [
  { value: 'considering', label: 'Thinking about reading it',  sub: "Help me decide if it's for me" },
  { value: 'started',     label: 'Just started',               sub: "I'm in the early pages" },
  { value: 'midway',      label: 'Halfway through',            sub: 'Getting into it' },
  { value: 'finished',    label: 'Just finished',              sub: 'Ready to talk about all of it' },
  { value: 'revisiting',  label: 'Read before, revisiting',   sub: 'Coming back with fresh eyes' },
];

async function renderStatusScreen(book) {
  const lang = STATE.detectedLang;
  const chatLang = STATE.chatLanguage;
  let options = STATUS_OPTIONS_EN;

  // Translate if native language chosen and language detected
  if (chatLang === 'native' && lang && STATE.apiKey) {
    const cacheKey = 'pc_status_opts_' + lang.toLowerCase();
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try { options = JSON.parse(cached); } catch(e) {}
    } else {
      try {
        var prompt = 'Translate these 5 reading status options into ' + lang + '. Return ONLY a JSON array of 5 objects with "label" and "sub" keys, in the same order. No other text.\n' + JSON.stringify(STATUS_OPTIONS_EN.map(function(o){ return {label:o.label, sub:o.sub}; }));
        let text = '';
        if (STATE.provider === 'anthropic') {
          const res = await fetch('https://api.anthropic.com/v1/messages', { method:'POST', headers:{'Content-Type':'application/json','x-api-key':STATE.apiKey,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'}, body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:300, messages:[{role:'user',content:prompt}] }) });
          text = ( function(j){return j&&j.content&&j.content[0]?j.content[0].text:""; })(await res.json()) || '';
        } else if (STATE.provider === 'gemini') {
          const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + STATE.apiKey, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ contents:[{parts:[{text:prompt}]}] }) });
          text = (function(j){return j&&j.candidates&&j.candidates[0]&&j.candidates[0].content&&j.candidates[0].content.parts&&j.candidates[0].content.parts[0]?j.candidates[0].content.parts[0].text:"";})(await res.json()) || '';
        } else if (STATE.provider === 'groq') {
          const res = await fetch('https://api.groq.com/openai/v1/chat/completions', { method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer ' + STATE.apiKey}, body: JSON.stringify({ model:'llama-3.3-70b-versatile', max_tokens:300, messages:[{role:'user',content:prompt}] }) });
          text = (function(j){return j&&j.choices&&j.choices[0]&&j.choices[0].message?j.choices[0].message.content:"";})(await res.json()) || '';
        }
        const translated = JSON.parse(text.replace(/```json|```/g,'').trim());
        if (Array.isArray(translated) && translated.length === 5) {
          options = STATUS_OPTIONS_EN.map(function(o, i) { return Object.assign({}, o, { label: translated[i].label || o.label, sub: translated[i].sub || o.sub }); });
          localStorage.setItem(cacheKey, JSON.stringify(options));
        }
      } catch(e) { /* fall back to English */ }
    }
  }

  // Render buttons dynamically
  const container = document.querySelector('#screen-status .status-options');
  if (!container) return;
  container.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'status-opt';
    btn.onclick = () => setReadingStatus(opt.value);
    btn.innerHTML = '<span class="status-opt-label">' + esc(opt.label) + '</span><span class="status-opt-sub">' + esc(opt.sub) + '</span>';
    container.appendChild(btn);
  });

  // Update heading
  const h1 = document.getElementById('status-book-title');
  if (h1) h1.textContent = lang && chatLang === 'native'
    ? book.title  // just show title, keep heading neutral
    : 'Where are you with "' + book.title + '"?';
}

// ═══════════════════════════════════════════════════
//  BOOK SELECTION → STATUS → LANGUAGE → COMPANION
// ═══════════════════════════════════════════════════
async function selectBook(book) {
  STATE.book = book;
  STATE.messages = [];

  // ensure lang field is persisted on book object (Bug Fix B)
  const detectedLang = detectLanguage(book);
  if (detectedLang) book.detectedLang = detectedLang;
  localStorage.setItem('pc_last_book', JSON.stringify(book));

  const bk = bookKey(book);
  const savedStatus = localStorage.getItem('pc_status_' + bk);
  const savedLang   = localStorage.getItem('pc_lang_'   + bk);

  if (savedStatus) {
    // returning book — restore ALL language state before launching (Bug Fix A)
    STATE.readingStatus = savedStatus;
    STATE.chatLanguage  = savedLang || 'english';
    STATE.detectedLang  = detectedLang;
    // restore thinking phrases if native language was chosen
    if (STATE.chatLanguage === 'native' && detectedLang) {
      await generateThinkingPhrases(detectedLang);
    }
    launchCompanion(book);
  } else {
    // new book — set detectedLang BEFORE renderStatusScreen so translation works
    STATE.detectedLang = detectedLang;
    renderStatusScreen(book);
    navigate('status');
  }
}

async function setReadingStatus(status) {
  STATE.readingStatus = status;
  localStorage.setItem('pc_status_' + bookKey(STATE.book), status);

  // detect if non-English
  const lang = detectLanguage(STATE.book);
  STATE.detectedLang = lang;

  const bk = bookKey(STATE.book);
  const savedLang = localStorage.getItem('pc_lang_' + bk);

  if (lang && !savedLang) {
    // show language choice
    document.getElementById('lang-prompt-text').textContent =
      'This looks like it might be in ' + lang + '. Would you like to chat in ' + lang + ' or in English?';
    document.getElementById('lang-native-btn').textContent = 'Chat in ' + lang;
    navigate('language');
  } else {
    STATE.chatLanguage = savedLang || 'english';
    launchCompanion(STATE.book);
  }
}

async function setLanguage(choice) {
  STATE.chatLanguage = choice;
  localStorage.setItem('pc_lang_' + bookKey(STATE.book), choice);
  // await thinking phrases before launching so they're ready for first message
  if (choice === 'native' && STATE.detectedLang) {
    await generateThinkingPhrases(STATE.detectedLang);
  }
  // Clear cached ice breakers so they regenerate in the chosen language
  const cacheKey = 'pc_icebreakers_' + bookKey(STATE.book) + '_' + (STATE.readingStatus||'');
  localStorage.removeItem(cacheKey);
  launchCompanion(STATE.book);
}

function detectLanguage(book) {
  // detect from Google Books language code
  if (book.lang && book.lang !== 'en') {
    const LANG_NAMES = { zh:'Chinese', ja:'Japanese', ko:'Korean', fr:'French', de:'German', es:'Spanish', it:'Italian', pt:'Portuguese', ar:'Arabic', ru:'Russian', hi:'Hindi', th:'Thai', vi:'Vietnamese', nl:'Dutch', pl:'Polish', tr:'Turkish' };
    return LANG_NAMES[book.lang] || null;
  }
  // detect from non-ASCII characters in title
  const hasChinese  = /[\u4e00-\u9fff]/.test(book.title);
  const hasJapanese = /[\u3040-\u30ff]/.test(book.title);
  const hasKorean   = /[\uac00-\ud7af]/.test(book.title);
  const hasArabic   = /[\u0600-\u06ff]/.test(book.title);
  const hasCyrillic = /[\u0400-\u04ff]/.test(book.title);
  if (hasChinese)  return 'Chinese';
  if (hasJapanese) return 'Japanese';
  if (hasKorean)   return 'Korean';
  if (hasArabic)   return 'Arabic';
  if (hasCyrillic) return 'Russian';
  return null;
}

function launchCompanion(book) {
  // assign conversation ID if not set
  if (!STATE.currentConvId) {
    STATE.currentConvId   = 'conv_' + Date.now();
    STATE.currentConvName = null;
  }
  // add to shelf
  if (typeof addBookToShelf === 'function') addBookToShelf(book);

  document.getElementById('book-title-display').textContent  = book.title;
  document.getElementById('book-author-display').textContent = book.author;
  document.getElementById('input-book-context').textContent  = book.title + (book.author ? ' · ' + book.author : '');
  document.getElementById('chat-log').innerHTML = '';
  document.getElementById('loading-indicator').style.display = 'none';
  document.getElementById('icebreakers').style.display = 'block';
  updateStatusDisplay();
  renderHighlightsPanel();
  updatePassagesToolbarBtn();
  populateIcebreakers(book);
  navigate('companion');
}

function updateStatusDisplay() {
  const labels = { considering:'Considering reading', started:'Just started', midway:'Halfway through', finished:'Just finished' };
  const el = document.getElementById('book-status-display');
  if (STATE.readingStatus && labels[STATE.readingStatus]) {
    el.textContent = labels[STATE.readingStatus];
  } else {
    el.textContent = '';
  }
}

// ═══════════════════════════════════════════════════
//  AI-GENERATED THINKING PHRASES
// ═══════════════════════════════════════════════════
async function generateThinkingPhrases(language) {
  const cacheKey = 'pc_thinking_' + language.toLowerCase();
  const cached = localStorage.getItem(cacheKey);
  if (cached) { try { STATE.thinkingPhrases = JSON.parse(cached); return; } catch(e) {} }

  var prompt = 'Generate 6 short natural "thinking" indicators (like "typing\u2026", "one moment\u2026") in ' + language + '. Max 3 words each with an ellipsis. Return ONLY a JSON array of 6 strings. No other text.';
  try {
    let text = '';
    if (STATE.provider === 'anthropic') {
      const res = await fetch('https://api.anthropic.com/v1/messages', { method:'POST', headers:{'Content-Type':'application/json','x-api-key':STATE.apiKey,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'}, body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:120, messages:[{role:'user',content:prompt}] }) });
      text = ( function(j){return j&&j.content&&j.content[0]?j.content[0].text:""; })(await res.json()) || '';
    } else if (STATE.provider === 'gemini') {
      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + STATE.apiKey, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ contents:[{parts:[{text:prompt}]}] }) });
      text = (function(j){return j&&j.candidates&&j.candidates[0]&&j.candidates[0].content&&j.candidates[0].content.parts&&j.candidates[0].content.parts[0]?j.candidates[0].content.parts[0].text:"";})(await res.json()) || '';
    } else if (STATE.provider === 'groq') {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', { method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer ' + STATE.apiKey}, body: JSON.stringify({ model:'llama-3.3-70b-versatile', max_tokens:120, messages:[{role:'user',content:prompt}] }) });
      text = (function(j){return j&&j.choices&&j.choices[0]&&j.choices[0].message?j.choices[0].message.content:"";})(await res.json()) || '';
    }
    const phrases = JSON.parse(text.replace(/```json|```/g,'').trim());
    if (Array.isArray(phrases) && phrases.length >= 4) {
      STATE.thinkingPhrases = phrases;
      localStorage.setItem(cacheKey, JSON.stringify(phrases));
    }
  } catch(e) { /* fall back to English */ }
}

function getThinkingPhrase() {
  const phrases = STATE.thinkingPhrases || STATIC_THINKING;
  return phrases[Math.floor(Math.random() * phrases.length)];
}

// ═══════════════════════════════════════════════════
//  CLIPPINGS
// ═══════════════════════════════════════════════════
function parseClippings(input) {
  const file = input.files[0]; if (!file) return;
  document.getElementById('clippings-filename').textContent = file.name;
  const statusEl = document.getElementById('clippings-status');
  statusEl.textContent = 'Reading clippings…'; statusEl.style.display = 'block';
  const reader = new FileReader();
  reader.onload = function(e) {
    const highlights = parseClippingsText(e.target.result);
    if (!highlights.length) { statusEl.textContent = 'No highlights found in this file.'; return; }
    STATE.highlights = highlights;
    localStorage.setItem('pc_highlights', JSON.stringify(highlights));
    const n = highlights.length, b = countBooks(highlights);
    statusEl.textContent = ('Loaded ' + n + ' highlight' + (n!==1?'s':'') + ' from ' + b + ' book' + (b!==1?'s':'') + '.');
    const top = getMostRecentBook(highlights);
    if (top) selectBook({title:top.title,author:top.author,year:'',key:''});
  };
  reader.readAsText(file);
}

function parseClippingsText(text) {
  const out = [];
  text.split('==========').forEach(entry => {
    const lines = entry.split('\n').map(l=>l.trim()).filter(Boolean);
    if (lines.length < 2) return;
    const content = lines.slice(2).join(' ').trim();
    if (!content || lines[1].toLowerCase().includes('bookmark')) return;
    const tm = lines[0].match(/^(.+?)\s*\(([^)]+)\)\s*$/);
    const dm = lines[1].match(/Added on (.+)$/i);
    out.push({title:tm?tm[1].trim():lines[0],author:tm?tm[2].trim():'Unknown',text:content,date:dm?dm[1].trim():''});
  });
  return out;
}

function countBooks(h) { return new Set(h.map(x=>x.title)).size; }
function getMostRecentBook(h) { return h.length ? {title:h[h.length-1].title,author:h[h.length-1].author} : null; }

// ═══════════════════════════════════════════════════
//  FUZZY HIGHLIGHTS MATCHING
// ═══════════════════════════════════════════════════
const STOP_WORDS = new Set(['the','a','an','of','and','in','on','at','to','for','by']);

function significantWords(str) {
  return str.toLowerCase().replace(/[^a-z0-9\s]/g,'').split(/\s+/).filter(w=>w&&!STOP_WORDS.has(w)).slice(0,3);
}

function fuzzyMatch(book, highlight) {
  const bw = significantWords(book.title), cw = significantWords(highlight.title);
  const titleMatch = bw.some(w=>cw.includes(w));
  const ba = (book.author||'').toLowerCase().replace(/[^a-z\s]/g,'');
  const ca = (highlight.author||'').toLowerCase().replace(/[^a-z\s]/g,'');
  const authorMatch = ba && ca && ba.split(/\s+/).some(w=>w.length>2&&ca.includes(w));
  return titleMatch || authorMatch;
}

function getRelevantHighlights(book) { return STATE.highlights.filter(h=>fuzzyMatch(book,h)); }

// ═══════════════════════════════════════════════════
//  HIGHLIGHTS PANEL
// ═══════════════════════════════════════════════════
function renderHighlightsPanel() {
  const relevant = getRelevantHighlights(STATE.book);
  const btn = document.getElementById('highlights-toolbar-btn');
  if (relevant.length) {
    btn.style.display = 'block'; btn.textContent = 'Highlights (' + relevant.length + ')';
    document.getElementById('highlights-count').textContent = relevant.length + ' highlight' + (relevant.length!==1?'s':'') + ' from your Kindle';
    document.getElementById('highlights-list').innerHTML = relevant.map(h=>'<p style="border-left:3px solid #d0d0d0;padding-left:10px;margin-bottom:12px;font-style:italic">"' + esc(h.text) + '"</p>').join('');
  } else { btn.style.display = 'none'; }
}

function toggleHighlights() {
  const panel = document.getElementById('highlights-panel'), btn = document.getElementById('highlights-toolbar-btn');
  panel.classList.toggle('open');
  document.getElementById('font-panel').classList.remove('open');
  document.getElementById('font-toolbar-btn').classList.remove('active');
  (panel.classList.contains('open') ? btn.classList.add('active') : btn.classList.remove('active'));
}

// ═══════════════════════════════════════════════════
//  ICE BREAKERS
// ═══════════════════════════════════════════════════
async function populateIcebreakers(book) {
  const list = document.getElementById('icebreaker-list');
  list.innerHTML = '';
  const loadEl = document.createElement('div');
  loadEl.className = 'icebreaker-label'; loadEl.style.fontStyle = 'italic';
  loadEl.textContent = 'Finding the right questions…';
  list.appendChild(loadEl);

  const cacheKey = 'pc_icebreakers_' + bookKey(book) + '_' + (STATE.readingStatus||'');
  try { const c = localStorage.getItem(cacheKey); if (c) { renderIcebreakerButtons(JSON.parse(c), list); return; } } catch(e) {}

  let prompts = null;
  if (STATE.apiKey) {
    try { prompts = await fetchAIIcebreakers(book); localStorage.setItem(cacheKey, JSON.stringify(prompts)); } catch(e) { prompts = null; }
  }

  if (!prompts || !prompts.length) {
    prompts = getStaticPromptsByStatus(STATE.readingStatus);
  }

  renderIcebreakerButtons(prompts, list);
}

function getStaticPromptsByStatus(status) {
  const sets = {
    considering: [
      "What drew you to this book?",
      "Are you ready for its themes?",
      "What made you curious?",
      "Have you read similar books?",
    ],
    started: [
      "What are your first impressions?",
      "Which character interests you most?",
      "Something already surprised me",
      "I want to know what lies ahead",
    ],
    midway: [
      "Something unexpected happened",
      "I have a theory about the ending",
      "A character changed my mind",
      "I cannot put this down",
    ],
    finished: [
      "I just finished it",
      "The ending stayed with me",
      "Something is still on my mind",
      "What should I read next?",
    ],
  };
  return (sets[status] || STATIC_PROMPTS).slice(0,4);
}

async function fetchAIIcebreakers(book) {
  const statusLabels = {
    considering: 'considering reading',
    started:     'just started',
    midway:      'halfway through',
    finished:    'just finished',
  };
  const statusLabel = statusLabels[STATE.readingStatus] || 'reading';
  const langNote = (STATE.chatLanguage === 'native' && STATE.detectedLang)
    ? '\nGenerate the prompts in ' + STATE.detectedLang + '.' : '';

  var prompt = 'You are a literary companion helping a reader of "' + book.title + '" by ' + book.author + '.\n\n' +
    'The reader\'s current status: ' + statusLabel + '\n\n' +
    'Generate exactly 4 ice breaker prompts that feel specific to THIS book \u2014 its themes, reputation, tone, setting, and what readers typically wonder about.\n\n' +
    'Rules:\n' +
    '- Each prompt max 8 words\n' +
    '- Must feel specific to this exact book\n' +
    '- NOT generic questions that apply to any book\n' +
    '- NOT: "Is this book for me?"\n' +
    '- NOT: "What is the main idea?"\n' +
    '- NOT: "How long does it take to read?"\n' +
    '- Tone matches reading status:\n' +
    '  considering: curiosity, uncertainty, is this worth my time?\n' +
    '  just started: early impressions, what to expect ahead\n' +
    '  halfway: tensions building, character observations, predictions\n' +
    '  just finished: emotional reactions, themes, meaning, what next' + langNote + '\n\n' +
    'Return ONLY a JSON array of 4 strings. No preamble. No explanation. No markdown. Just the array.\n' +
    'Example format: ["prompt one","prompt two","prompt three","prompt four"]';

  let text = '';
  if (STATE.provider === 'anthropic') {
    const res = await fetch('https://api.anthropic.com/v1/messages', { method:'POST', headers:{'Content-Type':'application/json','x-api-key':STATE.apiKey,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'}, body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:200, messages:[{role:'user',content:prompt}] }) });
    text = ( function(j){return j&&j.content&&j.content[0]?j.content[0].text:""; })(await res.json()) || '';
  } else if (STATE.provider === 'gemini') {
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + STATE.apiKey, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ contents:[{parts:[{text:prompt}]}] }) });
    text = (function(j){return j&&j.candidates&&j.candidates[0]&&j.candidates[0].content&&j.candidates[0].content.parts&&j.candidates[0].content.parts[0]?j.candidates[0].content.parts[0].text:"";})(await res.json()) || '';
  } else if (STATE.provider === 'groq') {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', { method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer ' + STATE.apiKey}, body: JSON.stringify({ model:'llama-3.3-70b-versatile', max_tokens:200, messages:[{role:'user',content:prompt}] }) });
    text = (function(j){return j&&j.choices&&j.choices[0]&&j.choices[0].message?j.choices[0].message.content:"";})(await res.json()) || '';
  }

  // Clean response and attempt JSON parse
  const clean = text.replace(/```json|```/g,'').trim();
  let parsed = null;

  try {
    parsed = JSON.parse(clean);
  } catch(e) {
    // Try to extract array with regex
    const match = clean.match(/\[\s*"[^"]*"(?:\s*,\s*"[^"]*")*\s*\]/);
    if (match) {
      try { parsed = JSON.parse(match[0]); } catch(e2) { parsed = null; }
    }
  }

  if (!Array.isArray(parsed) || parsed.length < 2) throw new Error('bad response');
  return parsed.slice(0,4);
}

function renderIcebreakerButtons(prompts, list) {
  list.innerHTML = '';
  prompts.forEach(text => {
    const btn = document.createElement('button');
    btn.className = 'icebreaker-btn'; btn.textContent = text;
    btn.addEventListener('click', () => { const ta = document.getElementById('chat-input'); ta.value = text; autoGrow(ta); ta.focus(); });
    list.appendChild(btn);
  });
}

// ═══════════════════════════════════════════════════
//  CHAT
// ═══════════════════════════════════════════════════
function handleChatKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 600) { e.preventDefault(); sendMessage(); }
}

function autoGrow(el) { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 200)+'px'; }

async function sendMessage(retryText) {
  const inputEl = document.getElementById('chat-input');
  const text    = retryText || inputEl.value.trim();
  if (!text || !STATE.book) return;
  if (!STATE.apiKey) { navigate('key'); return; }

  if (!navigator.onLine) {
    queueOfflineMessage(text);
    if (!retryText) { inputEl.value = ''; inputEl.style.height = 'auto'; }
    STATE.messages.push({role:'user',content:text});
    appendBubble('user', text);
    const w = document.createElement('div'); w.className = 'message companion';
    const r = document.createElement('div'); r.className = 'message-role'; r.textContent = STATE.companionName;
    const b = document.createElement('div'); b.className = 'message-bubble'; b.textContent = "Saved for when you're back online. Your companion will reply then.";
    w.appendChild(r); w.appendChild(b); document.getElementById('chat-log').appendChild(w);
    scrollBottom(); return;
  }

  if (!retryText) { inputEl.value = ''; inputEl.style.height = 'auto'; }
  STATE.lastUserText = text;
  document.getElementById('icebreakers').style.display = 'none';

  if (!retryText) { STATE.messages.push({role:'user',content:text}); appendBubble('user', text); }

  const loadEl = document.getElementById('loading-indicator');
  loadEl.textContent = getThinkingPhrase();
  loadEl.style.display = 'block';
  scrollBottom();

  try {
    const reply = await callAI();
    STATE.messages.push({role:'assistant',content:reply});
    loadEl.style.display = 'none';
    const el = appendBubble('companion', reply);
    scrollToMessage(el);
    saveCurrentConversation();
  } catch(err) {
    loadEl.style.display = 'none';
    appendError(err);
    scrollBottom();
  }
}

function appendBubble(role, text) {
  const wrap = document.createElement('div'); wrap.className = 'message ' + role;
  const roleEl = document.createElement('div'); roleEl.className = 'message-role';
  roleEl.textContent = role === 'user' ? 'You' : STATE.companionName;
  const bubble = document.createElement('div'); bubble.className = 'message-bubble'; bubble.innerHTML = formatText(text);
  wrap.appendChild(roleEl); wrap.appendChild(bubble);

  // Add copy + save actions to companion bubbles only
  if (role === 'companion') {
    const actions = document.createElement('div');
    actions.className = 'bubble-actions';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'bubble-action-btn';
    copyBtn.textContent = 'Copy';
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.textContent = 'Copied';
        setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1500);
      }).catch(() => showToolbarMsg('Copy not available in this browser.'));
    };

    const saveBtn = document.createElement('button');
    saveBtn.className = 'bubble-action-btn';
    // Check if already saved
    const alreadySaved = getPassages().includes(text);
    saveBtn.textContent = alreadySaved ? 'Saved ✓' : 'Save passage';
    if (alreadySaved) saveBtn.classList.add('saved');
    saveBtn.onclick = () => {
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
  const isNetwork = !navigator.onLine || err.message === 'Failed to fetch' || err.message.includes('fetch');
  const msg = isNetwork ? "Couldn't reach your companion — poor connection? Try again when you have a better signal." : 'Something went wrong: ' + err.message;
  const wrap = document.createElement('div'); wrap.className = 'message error-msg';
  const bubble = document.createElement('div'); bubble.className = 'message-bubble'; bubble.textContent = msg;
  const retryBtn = document.createElement('button'); retryBtn.className = 'retry-btn'; retryBtn.textContent = 'Try again';
  retryBtn.onclick = () => { wrap.remove(); if (STATE.messages.length && STATE.messages[STATE.messages.length-1].role==='user') STATE.messages.pop(); sendMessage(STATE.lastUserText); };
  wrap.appendChild(bubble); wrap.appendChild(retryBtn);
  document.getElementById('chat-log').appendChild(wrap);
}

function formatText(t) {
  return t.replace(/&/g,'&'+'amp;').replace(/</g,'&'+'lt;').replace(/>/g,'&'+'gt;')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/\n\n+/g,'</p><p>').replace(/\n/g,'<br>').replace(/^/,'<p>').replace(/$/,'</p>');
}

function scrollBottom() { window.scrollTo({top:document.body.scrollHeight,behavior:'instant'}); }
function scrollToMessage(el) { if (!el) { scrollBottom(); return; } window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-12,behavior:'instant'}); }

// ═══════════════════════════════════════════════════
//  AI PROVIDERS
// ═══════════════════════════════════════════════════
function buildSystemPrompt() {
  const book = STATE.book;
  const relevant = getRelevantHighlights(book).slice(-8);
  const highlightsText = relevant.length ? '\n\nThe reader\'s highlights from this book:\n' + relevant.map(h=>'- "' + h.text + '"').join('\n') : '';

  const statusInstructions = {
    considering: 'The reader is considering whether to read this book. Focus on helping them decide — share what makes it special, who tends to love it, what kind of read it is. No spoilers of any kind.',
    started:     'The reader has just started this book. Be curious about their first impressions. No spoilers beyond the early pages.',
    midway:      'The reader is halfway through. Engage with what they\'ve experienced so far. Check before discussing anything from the second half.',
    finished:    'The reader has just finished this book. Full discussion is welcome — no spoiler restrictions.',
    revisiting:  'The reader has read this book before and is revisiting it. They may have fresh perspectives or notice things they missed first time. Treat them as someone who knows the book well.',
  };

  const statusNote = statusInstructions[STATE.readingStatus] || 'Be spoiler-aware — ask the reader how far they\'ve got before revealing plot details.';

  const langNote = (STATE.chatLanguage === 'native' && STATE.detectedLang)
    ? '\n\nRespond entirely in ' + STATE.detectedLang + '. The reader has chosen to discuss this book in ' + STATE.detectedLang + '.'
    : '';

  var replyLengthNote = STATE.replyLength === 'short' ? "Keep your response very brief — 2 to 3 short sentences maximum." : STATE.replyLength === 'detailed' ? "You may give fuller, more detailed responses when the topic warrants it." : "Keep responses concise — 2 to 4 short paragraphs maximum.";
  return "You are a reading companion for \"" + book.title + "\" by " + book.author + ".\n\n" +
    "You are warm but not gushing. Curious — you always ask something back at the end. You never summarise the plot unprompted. You offer opinions when asked. You are honest about what you don't know. Literary without being academic. You feel like a well-read friend who has also read this book.\n\n" +
    "Never say \"Great question!\" Keep responses concise — this is read on an e-ink screen. Short paragraphs. Always end with a question or an invitation to continue.\n\n" +
    statusNote + "\n\n" +
    "If the conversation drifts away from the book, find a gentle bridge back — connect what the reader said to something in the book rather than refusing or redirecting bluntly. You are a reading companion, not a general assistant.\n\n" +
    "If a reader seems personally distressed — not just intellectually engaged with dark themes — acknowledge that warmth first before continuing the literary discussion.\n\n" +
    replyLengthNote + "\n\n" +
    "Be honest about the limits of your knowledge. If you are not confident about specific details of this book — plot points, character names, themes — say so openly and invite the reader to share what they know. Never confabulate or pretend to know something you are uncertain about. A good reading companion says \"I'm not sure about that — what did you make of it?\" rather than guessing.\n\n" +
    "Respond in plain prose only. No bullet points. No headers. No lists of any kind.\n\n" +
    "If there are any signs this reader may be a minor, default to age-appropriate discussion regardless of the book's content rating." + langNote + highlightsText;
}

async function callAI() {
  const system = buildSystemPrompt(), messages = STATE.messages.slice(-20);
  if (STATE.provider === 'anthropic') return callAnthropic(system, messages);
  if (STATE.provider === 'gemini')    return callGemini(system, messages);
  if (STATE.provider === 'groq')      return callGroq(system, messages);
  throw new Error('Unknown provider');
}

async function callAnthropic(system, messages) {
  const res = await fetch('https://api.anthropic.com/v1/messages', { method:'POST', headers:{'Content-Type':'application/json','x-api-key':STATE.apiKey,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'}, body: JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:600,system,messages}) });
  if (!res.ok) { const e=await res.json().catch(()=>({})); throw new Error((e && e.error && e.error.message ? e.error.message : 'HTTP ' + res.status)); }
  return (function(j){return j&&j.content&&j.content[0]?j.content[0].text:"";})(await res.json()) || '(No response)';
}

async function callGemini(system, messages) {
  const contents = messages.map(m=>({role:m.role==='user'?'user':'model',parts:[{text:m.content}]}));
  contents.unshift({role:'user',parts:[{text:system}]});
  contents.splice(1,0,{role:'model',parts:[{text:'Understood. I\'m ready.'}]});
  const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + STATE.apiKey, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({contents}) });
  if (!res.ok) { const e=await res.json().catch(()=>({})); throw new Error((e && e.error && e.error.message ? e.error.message : 'HTTP ' + res.status)); }
  return (function(j){return j&&j.candidates&&j.candidates[0]&&j.candidates[0].content&&j.candidates[0].content.parts&&j.candidates[0].content.parts[0]?j.candidates[0].content.parts[0].text:"";})(await res.json()) || '(No response)';
}

async function callGroq(system, messages) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', { method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer ' + STATE.apiKey}, body: JSON.stringify({model:'llama-3.3-70b-versatile',max_tokens:600,messages:[{role:'system',content:system}].concat(messages)}) });
  if (!res.ok) { const e=await res.json().catch(()=>({})); throw new Error((e && e.error && e.error.message ? e.error.message : 'HTTP ' + res.status)); }
  return (function(j){return j&&j.choices&&j.choices[0]&&j.choices[0].message?j.choices[0].message.content:"";})(await res.json()) || '(No response)';
}

// ═══════════════════════════════════════════════════
//  FONT SIZE
// ═══════════════════════════════════════════════════
function toggleFontPanel() {
  const panel = document.getElementById('font-panel'), btn = document.getElementById('font-toolbar-btn');
  panel.classList.toggle('open');
  document.getElementById('highlights-panel').classList.remove('open');
  document.getElementById('highlights-toolbar-btn').classList.remove('active');
  (panel.classList.contains('open') ? btn.classList.add('active') : btn.classList.remove('active'));
}

function applyFontSize(size) {
  document.documentElement.style.fontSize = size + 'px';
  document.querySelectorAll('.font-size-opt').forEach(function(b){ parseInt(b.dataset.size)===size ? b.classList.add('active') : b.classList.remove('active'); });
}

function setFontSize(size) { applyFontSize(size); localStorage.setItem('pc_font_size', size); }

// ═══════════════════════════════════════════════════
//  OTHER OPTIONS
// ═══════════════════════════════════════════════════
function showOtherOptions() {
  const name = prompt('Give your companion a name (leave blank for "Companion"):');
  if (name === null) return; // cancelled
  const trimmed = name.trim();
  STATE.companionName = trimmed || 'Companion';
  localStorage.setItem('pc_companion_name', STATE.companionName);
  showToolbarMsg("Companion name set to \"" + STATE.companionName + "\".");
}

// ═══════════════════════════════════════════════════
//  TOOLBAR MESSAGE
// ═══════════════════════════════════════════════════
let toolbarMsgTimer = null;
function showToolbarMsg(text) {
  const el = document.getElementById('toolbar-msg');
  el.textContent = text; el.style.display = 'block';
  if (toolbarMsgTimer) clearTimeout(toolbarMsgTimer);
  toolbarMsgTimer = setTimeout(()=>{ el.style.display='none'; }, 3000);
}

// ═══════════════════════════════════════════════════
//  UTILS
// ═══════════════════════════════════════════════════
function esc(s) { return String(s).replace(/&/g,'&'+'amp;').replace(/</g,'&'+'lt;').replace(/>/g,'&'+'gt;').replace(/"/g,'&'+'quot;'); }

// ═══════════════════════════════════════════════════
//  YOUR SHELF
// ═══════════════════════════════════════════════════

// Conversation storage structure:
// pc_convs_[bookKey] = [ { id, name, status, messages, lastUpdated }, ... ]

function getConvs(book) {
  try { return JSON.parse(localStorage.getItem('pc_convs_' + bookKey(book)) || '[]'); } catch(e) { return []; }
}

function saveConvs(book, convs) {
  localStorage.setItem('pc_convs_' + bookKey(book), JSON.stringify(convs));
}

function getShelfBooks() {
  try { return JSON.parse(localStorage.getItem('pc_shelf_books') || '[]'); } catch(e) { return []; }
}

function addBookToShelf(book) {
  const books = getShelfBooks();
  const bk = bookKey(book);
  if (!books.find(b => bookKey(b) === bk)) {
    books.unshift({ title: book.title, author: book.author, year: book.year || '', lang: book.lang || '', detectedLang: book.detectedLang || '' });
    localStorage.setItem('pc_shelf_books', JSON.stringify(books));
  }
}

function saveCurrentConversation() {
  if (!STATE.book || !STATE.messages.length) return;
  const convs   = getConvs(STATE.book);
  const convId  = STATE.currentConvId;
  const existing = convs.find(c => c.id === convId);
  const name    = STATE.currentConvName ||
    (STATE.messages[0] && STATE.messages[0].content ? STATE.messages[0].content : 'Conversation').slice(0, 60);

  if (existing) {
    existing.messages    = STATE.messages;
    existing.lastUpdated = Date.now();
    existing.status      = STATE.readingStatus;
    existing.name        = STATE.currentConvName || existing.name;
  } else {
    convs.unshift({
      id:          convId,
      name,
      status:      STATE.readingStatus,
      messages:    STATE.messages,
      lastUpdated: Date.now(),
    });
  }
  saveConvs(STATE.book, convs);
  addBookToShelf(STATE.book);
}

function renderShelf() {
  const books  = getShelfBooks();
  const listEl = document.getElementById('shelf-list');
  if (!books.length) {
    listEl.innerHTML = '<p class="shelf-empty">Your shelf is empty. Start a conversation to add books here.</p>';
    return;
  }
  listEl.innerHTML = '';
  books.forEach(book => {
    const convs = getConvs(book);
    const last  = convs.length ? new Date(convs[0].lastUpdated).toLocaleDateString() : '';
    const bk    = bookKey(book);
    const status = localStorage.getItem('pc_status_' + bk) || '';
    const statusLabel = { considering:'Considering', started:'Just started', midway:'Halfway through', finished:'Finished' }[status] || '';

    const el = document.createElement('div');
    el.className = 'shelf-book';
    el.innerHTML =
      '<div class="shelf-book-title">' + esc(book.title) + '</div>' +
      '<div class="shelf-book-author">' + esc(book.author) + '</div>' +
      '<div class="shelf-book-meta">' + (statusLabel ? statusLabel + ' · ' : '') + convs.length + ' conversation' + (convs.length !== 1 ? 's' : '') + (last ? ' · Last: ' + last : '') + '</div>';
    el.addEventListener('click', () => openBookShelf(book));
    listEl.appendChild(el);
  });
}

function openBookShelf(book) {
  STATE.book = book;
  const bk     = bookKey(book);
  const status = localStorage.getItem('pc_status_' + bk) || '';
  const statusLabel = { considering:'Considering', started:'Just started', midway:'Halfway through', finished:'Finished' }[status] || '';

  document.getElementById('book-shelf-title').textContent  = book.title;
  document.getElementById('book-shelf-author').textContent = book.author;
  document.getElementById('book-shelf-status').textContent = statusLabel;

  renderConvList(book);
  navigate('book-shelf');
}

function renderConvList(book) {
  const convs  = getConvs(book);
  const listEl = document.getElementById('conv-list');

  if (!convs.length) {
    listEl.innerHTML = '<p class="shelf-empty">No conversations yet.</p>';
    return;
  }

  listEl.innerHTML = '';
  convs.forEach(conv => {
    const date  = new Date(conv.lastUpdated).toLocaleDateString();
    const statusLabel = { considering:'Considering', started:'Just started', midway:'Halfway through', finished:'Finished' }[conv.status] || '';
    const el = document.createElement('div');
    el.className = 'conv-item';
    var safeId = String(conv.id).replace(/[^a-z0-9_]/gi, "");
    el.innerHTML =
      '<div class="conv-item-name">' + esc(conv.name) + '</div>' +
      '<div class="conv-item-meta">' + (statusLabel ? statusLabel + ' · ' : '') + date + '</div>' +
      '<div class="conv-actions">' +
        '<button class="conv-btn primary" data-action="continue" data-id="' + safeId + '">Continue</button>' +
        '<button class="conv-btn" data-action="rename" data-id="' + safeId + '">Rename</button>' +
        '<button class="conv-btn danger" data-action="delete" data-id="' + safeId + '">Delete</button>' +
      '</div>';
    el.addEventListener('click', function(evt) {
      var btn = evt.target; var action = btn.getAttribute('data-action'); var id = btn.getAttribute('data-id');
      if (!action || !id) return;
      if (action === 'continue') continueConversation(id);
      else if (action === 'rename') renameConversation(id);
      else if (action === 'delete') deleteConversation(id);
    });
    listEl.appendChild(el);
  });
}

async function continueConversation(convId) {
  const convs = getConvs(STATE.book);
  const conv  = convs.find(c => c.id === convId);
  if (!conv) return;

  const bk = bookKey(STATE.book);
  STATE.readingStatus  = conv.status || localStorage.getItem('pc_status_' + bk) || null;
  STATE.chatLanguage   = localStorage.getItem('pc_lang_' + bk) || 'english';
  STATE.detectedLang   = STATE.book.detectedLang || detectLanguage(STATE.book);
  STATE.messages       = conv.messages || [];
  STATE.currentConvId  = conv.id;
  STATE.currentConvName = conv.name;

  if (STATE.chatLanguage === 'native' && STATE.detectedLang) {
    await generateThinkingPhrases(STATE.detectedLang);
  }

  document.getElementById('book-title-display').textContent  = STATE.book.title;
  document.getElementById('book-author-display').textContent = STATE.book.author;
  document.getElementById('input-book-context').textContent  =
    STATE.book.title + (STATE.book.author ? ' · ' + STATE.book.author : '');
  document.getElementById('loading-indicator').style.display = 'none';
  document.getElementById('icebreakers').style.display = 'none';
  updateStatusDisplay();
  renderHighlightsPanel();

  // render existing messages
  const log = document.getElementById('chat-log');
  log.innerHTML = '';
  STATE.messages.forEach(m => appendBubble(m.role === 'user' ? 'user' : 'companion', m.content));

  navigate('companion');
}

function renameConversation(convId) {
  const convs = getConvs(STATE.book);
  const conv  = convs.find(c => c.id === convId);
  if (!conv) return;
  const newName = prompt('Rename this conversation:', conv.name);
  if (!newName || !newName.trim()) return;
  conv.name = newName.trim();
  if (STATE.currentConvId === convId) STATE.currentConvName = conv.name;
  saveConvs(STATE.book, convs);
  renderConvList(STATE.book);
}

function deleteConversation(convId) {
  const convs    = getConvs(STATE.book);
  const filtered = convs.filter(c => c.id !== convId);
  saveConvs(STATE.book, filtered);
  renderConvList(STATE.book);
}

async function startNewConversation() {
  const bk = bookKey(STATE.book);
  STATE.readingStatus  = localStorage.getItem('pc_status_' + bk) || null;
  STATE.chatLanguage   = localStorage.getItem('pc_lang_' + bk) || 'english';
  STATE.detectedLang   = STATE.book.detectedLang || detectLanguage(STATE.book);
  STATE.messages       = [];
  STATE.currentConvId  = 'conv_' + Date.now();
  STATE.currentConvName = null;

  if (STATE.chatLanguage === 'native' && STATE.detectedLang) {
    await generateThinkingPhrases(STATE.detectedLang);
  }

  launchCompanion(STATE.book);
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
  const panel = document.getElementById('length-panel');
  const btn   = document.getElementById('length-toolbar-btn');
  panel.classList.toggle('open');
  // close other panels
  document.getElementById('font-panel').classList.remove('open');
  document.getElementById('highlights-panel').classList.remove('open');
  document.getElementById('passages-panel').classList.remove('open');
  document.getElementById('font-toolbar-btn').classList.remove('active');
  document.getElementById('highlights-toolbar-btn').classList.remove('active');
  document.getElementById('passages-toolbar-btn').classList.remove('active');
  (panel.classList.contains('open') ? btn.classList.add('active') : btn.classList.remove('active'));
}

function setReplyLength(length) {
  STATE.replyLength = length;
  localStorage.setItem('pc_reply_length', length);
  document.querySelectorAll('.length-opt').forEach(b => {
    (b.dataset.length === length ? b.classList.add('active') : b.classList.remove('active'));
  });
  showToolbarMsg('Reply length set to ' + length + '.');
}

// ═══════════════════════════════════════════════════
//  PASSAGES
// ═══════════════════════════════════════════════════
function getPassages() {
  if (!STATE.book) return [];
  try { return JSON.parse(localStorage.getItem('pc_passages_' + bookKey(STATE.book)) || '[]'); } catch(e) { return []; }
}

function savePassage(text, btn) {
  const passages = getPassages();
  // avoid duplicates
  if (passages.includes(text)) {
    btn.textContent = 'Already saved';
    btn.classList.add('saved');
    setTimeout(() => { btn.textContent = 'Save passage'; btn.classList.remove('saved'); }, 1500);
    return;
  }
  passages.push(text);
  localStorage.setItem('pc_passages_' + bookKey(STATE.book), JSON.stringify(passages));
  btn.textContent = 'Saved ✓';
  btn.classList.add('saved');
  setTimeout(() => { btn.textContent = 'Save passage'; btn.classList.remove('saved'); }, 1500);
  updatePassagesToolbarBtn();
  renderPassagesPanel();
}

function updatePassagesToolbarBtn() {
  const passages = getPassages();
  const btn = document.getElementById('passages-toolbar-btn');
  if (!btn) return;
  if (passages.length) {
    btn.style.display = 'block';
    btn.textContent = 'Passages (' + passages.length + ')';
  } else {
    btn.style.display = 'none';
  }
}

function renderPassagesPanel() {
  const passages = getPassages();
  const listEl   = document.getElementById('passages-list');
  const countEl  = document.getElementById('passages-count');
  if (!passages.length) {
    countEl.textContent = 'No passages saved yet';
    listEl.innerHTML = '';
    return;
  }
  countEl.textContent = passages.length + ' passage' + (passages.length !== 1 ? 's' : '') + ' saved';
  listEl.innerHTML = passages.map((p, i) =>
    '<div class="passage-item">' + formatText(p) + '</div>'
  ).join('');
}

function togglePassagesPanel() {
  const panel = document.getElementById('passages-panel');
  const btn   = document.getElementById('passages-toolbar-btn');
  panel.classList.toggle('open');
  document.getElementById('font-panel').classList.remove('open');
  document.getElementById('highlights-panel').classList.remove('open');
  document.getElementById('font-toolbar-btn').classList.remove('active');
  document.getElementById('highlights-toolbar-btn').classList.remove('active');
  (panel.classList.contains('open') ? btn.classList.add('active') : btn.classList.remove('active'));
  if (panel.classList.contains('open')) renderPassagesPanel();
}

function copyAllPassages() {
  const passages = getPassages();
  if (!passages.length) { showToolbarMsg('No passages saved yet.'); return; }
  const text = passages.map((p, i) => '[' + (i+1) + '] ' + p).join('\n\n');
  navigator.clipboard.writeText(text).then(() => {
    showToolbarMsg(passages.length + ' passage' + (passages.length !== 1 ? 's' : '') + ' copied to clipboard.');
  }).catch(() => showToolbarMsg('Copy not available in this browser.'));
}

// ═══════════════════════════════════════════════════
//  END CONVERSATION
// ═══════════════════════════════════════════════════
function endConversation() {
  saveCurrentConversation();
  navigate('home');
}


function showInitError(msg) {
  try {
    var errDiv = document.getElementById('kobo-init-error');
    if (!errDiv) {
      errDiv = document.createElement('div');
      errDiv.id = 'kobo-init-error';
      errDiv.style.cssText = 'background:#f5f5f5;border:2px solid #111;padding:16px;margin:16px 0;font-size:16px;font-family:Georgia,serif;color:#111;';
      var page = document.querySelector('.page');
      if (page) page.insertBefore(errDiv, page.firstChild); else document.body.appendChild(errDiv);
    }
    errDiv.style.display = 'block';
    errDiv.textContent = 'Page Commons error: ' + msg;
  } catch(displayErr) {}
}

function init() {
  try {
    var prov = localStorage.getItem('pc_provider');
    if (prov) { STATE.provider = prov; applyProviderUI(prov); }
    var key = localStorage.getItem('pc_api_key');
    if (key) { STATE.apiKey = key; document.getElementById('api-key-input').value = key; document.getElementById('key-status-bar').style.display = 'block'; }
    var name = localStorage.getItem('pc_companion_name');
    if (name) { STATE.companionName = name; document.getElementById('companion-name-input').value = name; }
  } catch(e) { showInitError('settings: ' + e.message); }

  try { STATE.highlights = JSON.parse(localStorage.getItem('pc_highlights') || '[]'); } catch(e) {}

  try {
    var sz = localStorage.getItem('pc_font_size');
    if (sz) applyFontSize(parseInt(sz));
    var rl = localStorage.getItem('pc_reply_length');
    if (rl) { STATE.replyLength = rl; document.querySelectorAll('.length-opt').forEach(function(b){ b.dataset.length === rl ? b.classList.add('active') : b.classList.remove('active'); }); }
  } catch(e) { showInitError('font: ' + e.message); }

  try {
    var savedBook = JSON.parse(localStorage.getItem('pc_last_book') || 'null');
    if (savedBook) {
      STATE.book          = savedBook;
      STATE.readingStatus = localStorage.getItem('pc_status_' + bookKey(savedBook)) || null;
      STATE.chatLanguage  = localStorage.getItem('pc_lang_'   + bookKey(savedBook)) || 'english';
      STATE.detectedLang  = savedBook.detectedLang || null;
      restoreCompanionUI(savedBook);
    }
  } catch(e) { showInitError('book restore: ' + e.message); }

  try { updateGreeting(); } catch(e) { showInitError('greeting: ' + e.message); }

  try {
    if (!localStorage.getItem('pc_tc_accepted')) {
      showScreen('tc');
    } else {
      handleRoute();
    }
    if (!document.querySelector('.screen.active')) showScreen('home');
  } catch(e) {
    showInitError('routing: ' + e.message);
    try { showScreen('home'); } catch(e2) {}
  }
}

try { init(); } catch(e) {
  showInitError(e.message);
  try {
    var fb = document.getElementById('screen-home');
    if (fb) { fb.style.display = 'flex'; }
  } catch(e2) {}
}
