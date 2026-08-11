function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */var e,
    t,
    r = "function" == typeof Symbol ? Symbol : {},
    n = r.iterator || "@@iterator",
    o = r.toStringTag || "@@toStringTag";
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype);
    return _regeneratorDefine2(u, "_invoke", function (r, n, o) {
      var i,
        c,
        u,
        f = 0,
        p = o || [],
        y = !1,
        G = {
          p: 0,
          n: 0,
          v: e,
          a: d,
          f: d.bind(e, 4),
          d: function d(t, r) {
            return i = t, c = 0, u = e, G.n = r, a;
          }
        };
      function d(r, n) {
        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            d = G.p,
            l = i[2];
          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
        }
        if (o || r > 1) return a;
        throw y = !0, n;
      }
      return function (o, p, l) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
          try {
            if (f = 2, i) {
              if (c || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                u = t.value, c < 2 && (c = 0);
              } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
              i = e;
            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
          } catch (t) {
            i = e, c = 1, u = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), !0), u;
  }
  var a = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () {
      return this;
    }), t),
    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () {
    return this;
  }), _regeneratorDefine2(u, "toString", function () {
    return "[object Generator]";
  }), (_regenerator = function _regenerator() {
    return {
      w: i,
      m: f
    };
  })();
}
function _regeneratorDefine2(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e) {
    i = 0;
  }
  _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) {
    function o(r, n) {
      _regeneratorDefine2(e, r, function (e) {
        return this._invoke(r, n, e);
      });
    }
    r ? i ? i(e, r, {
      value: n,
      enumerable: !t,
      configurable: !t,
      writable: !t
    }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
  }, _regeneratorDefine2(e, r, n, t);
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
// Force home screen visible immediately (required for Kobo WebKit)
(function () {
  var el = document.getElementById('screen-home');
  if (el) {
    el.style.display = 'block';
  }
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
  aiMode: null,
  // 'shared' | 'byok' | null (not yet chosen)
  apiKey: '',
  provider: 'anthropic',
  companionName: 'Companion',
  companionMode: 'reading',
  // 'reading' | 'discover'
  book: null,
  // bookKey the live message buffer belongs to. Guards against one book's
  // conversation being carried into another — see ensureMessagesBelongTo().
  messagesBookKey: null,
  readingStatus: null,
  // 'considering' | 'started' | 'midway' | 'finished'
  chatLanguage: 'english',
  // 'english' | 'native'
  detectedLang: null,
  // language name detected from book, e.g. 'Traditional Chinese'
  companionLangOverride: null,
  // null = auto (match book); string = always use this language
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
  replyLength: 'medium',
  // 'short' | 'medium' | 'detailed'
  userName: ''
};
// ═══════════════════════════════════════════════════
//  SYNC METADATA — tracks modification timestamps for
//  categories that don't have per-item timestamps.
// ═══════════════════════════════════════════════════
function touchSyncMeta(category) {
  try {
    var meta = JSON.parse(localStorage.getItem('pc_sync_meta') || '{}');
    meta[category + '_modified'] = Date.now();
    localStorage.setItem('pc_sync_meta', JSON.stringify(meta));
  } catch (e) {}
}
var STATIC_PROMPTS = ["I just finished it", "Something is still on my mind", "I want to understand something better", "There's a passage I keep thinking about", "I'm not sure how I feel about it", "I gave up — can we talk about why?", "I want to know what to read next", "Something surprised me"];
var STATIC_THINKING = ['Typing…', 'Reading your note…', 'Considering…', 'Let me think…', 'Hmm…', 'One moment…', 'With you…'];

// ═══════════════════════════════════════════════════
//  INTERFACE LANGUAGE (i18n)
//  Markup carries data-i18n / data-i18n-html / data-i18n-placeholder
//  keys; applyLanguage() fills them from UI_STRINGS on boot and on every
//  language change. Text built in JS uses t('key').
//  Kobo-safe throughout: var, function(){}, indexed loops, no template
//  literals, no NodeList.forEach.
//  The interface language is deliberately SEPARATE from the companion
//  language (pc_companion_lang) — a reader may want a Chinese interface
//  with an English companion, or the reverse.
// ═══════════════════════════════════════════════════
var UI_LANGS = [{
  code: 'en',
  label: 'English'
}, {
  code: 'zh-TW',
  label: '繁體中文'
}];
// Locale used for dates rendered in the interface.
var UI_DATE_LOCALE = {
  'en': 'en-GB',
  'zh-TW': 'zh-TW'
};
var UI_STRINGS = {
  'en': {
    'js.select_books_to_add': 'Select books to add to your shelf:',
    'js.all_books_on_shelf': 'All books are already on your shelf.',
    'status.thinking_about_reading': 'Thinking about reading it',
    'status.help_me_decide': 'Help me decide if it\'s for me',
    'search.ph_title': 'e.g. Middlemarch, Reacher…',
    'search.ph_author': 'e.g. Austen, Lee Child…',
    'companion.ph_write_message': 'Write your message…',
    'js.not_seeing_your_book': 'Not seeing your book? Enter it manually:',
    'js.title': 'Title',
    'js.author': 'Author',
    'js.language': 'Language',
    'js.year': 'Year',
    'js.optional': '(optional)',
    'js.select_language': 'Select language...',
    'js.ph_author_name': 'Author name',
    'js.ph_year_example': 'e.g. 2024',
    'js.find_this_book': 'Find this book',
    'js.about_this_book': 'About this book ▾',
    'js.no_notes_yet': 'No notes yet.',
    'js.highlights_imported': 'Highlights imported.',
    'js.add_selected_to_shelf': 'Add selected to shelf',
    'persona.companion.label': 'Companion',
    'persona.companion.desc': 'Warm and curious — asks you something back',
    'persona.guide.label': 'Guide',
    'persona.guide.desc': 'Explains context and ideas, patiently',
    'persona.direct.label': 'Direct',
    'persona.direct.desc': 'Answers first — won\'t keep questioning you',
    'persona.kindred.label': 'Kindred',
    'persona.kindred.desc': 'Quietly present for books that move you',
    'companion.voice': 'Voice',
    'companion.companion_voice': 'Companion voice',
    'companion.voice_note': 'Applies to this book only. The default is set in Preferences.',
    'preferences.companion_voice': 'Companion voice',
    'preferences.companion_voice_note': 'How your companion talks. You can set a different voice for an individual book from the Voice button in a chat.',
    'js.voice_set_to': 'Voice set to ',
    'js.unknown_title': 'Unknown title',
    'js.by_author': ' by {author}',
    'js.preferences': 'Preferences',
    'js.trying_google': 'Trying Google Books…',
    'js.searching_for': 'Searching for “{title}”',
    'js.showing_books_by': 'Showing books by “{author}”. Add a title above to narrow down.',
    'js.free_tier_note': 'Using the free shared companion. Best for well-known books in English; weaker on recent, niche, or non-English titles. Add your own key for stronger book knowledge.',
    'js.is_this_for_me': 'Is this for me?',
    'js.reading_clippings': 'Reading clippings…',
    'js.no_highlights_file': 'No highlights found in this file.',
    'js.loaded': 'Loaded ',
    'js.paste_clippings_first': 'Please paste your clippings text first.',
    'js.no_highlights_paste': 'No highlights found. Make sure you pasted the full contents of My Clippings.txt.',
    'js.highlights': 'Highlights',
    'js.passages': 'Passages',
    'js.notes': 'Notes',
    'js.hide_transfer': '↑ Hide transfer code entry',
    'js.show_transfer': '↓ Transferring from another device? Enter a code',
    'js.enter_code_exactly': 'Please enter the 6-digit code exactly as shown.',
    'js.fetching': 'Fetching…',
    'js.fetch_my_key': 'Fetch my key',
    'js.key_transferred': 'Key transferred successfully! Tap Continue.',
    'js.network_error': 'Network error — please check your connection and try again.',
    'js.error_prefix': 'Error: ',
    'js.more_settings': 'More settings ▾',
    'js.companion_name_set': 'Companion name set to ',
    'js.reply_length_set': 'Reply length set to ',
    'js.prompts_now_in': 'Prompts now in ',
    'js.auto_detect_enabled': 'Auto-detect enabled.',
    'js.untitled': 'Untitled',
    'js.unknown_author': 'Unknown author',
    'js.no_description': 'No description available — the companion can still help you explore this book.',
    'js.find_out_if_for_me': 'Find out if it\'s for me →',
    'js.i_have_this_book': 'I have this book',
    'js.back_arrow': 'Back ←',
    'home.description': 'Discuss what you\'re reading, discover what others thought, or find your next book.<br>No ads. No algorithms. No engagement metrics. Just books.',
    'key.api_key_loaded': 'API key loaded',
    'tc.age_note': '<strong>Age:</strong> By continuing you confirm you are 13 years of age or older. Some books contain adult content — you confirm you are 18 or over before accessing such material.',
    'tc.privacy_note': '<strong>Privacy:</strong> Your API key and reading data are stored only in your browser. We do not collect or store personal data on our servers.',
    'tc.content_note': '<strong>Content:</strong> Page Commons is a reading companion. Discussions are anchored to books. We are not responsible for AI responses but take reasonable steps to keep them appropriate.',
    'tc.open_source_note': '<strong>Open source:</strong> Page Commons is open source software provided as-is. Use it responsibly.',
    'about.a_private_ai_companion': 'A private AI companion you can talk to about any book — like a well-read friend who has also read it.',
    'about.back_to_the_library': 'Back to the library',
    'about.book_rooms': 'Book rooms',
    'about.bring_your_own_key': 'Bring your own key',
    'about.coming_soon': '(coming soon)',
    'about.discusses_books_not_summaries': 'Discusses books, not summaries',
    'about.each_book_has_a': 'Each book has a room. Readers leave short notes — like margin notes in a second-hand book.',
    'about.import_your_kindle_clippings': 'Import your Kindle clippings and the companion will remember the passages that stayed with you.',
    'about.knows_your_highlights': 'Knows your highlights',
    'about.meets_you_where_you': 'Meets you where you are',
    'about.no_likes_no_rankings': 'No likes, no rankings',
    'about.notes_are_gated_by': 'Notes are gated by reading stage. You only see what\'s appropriate for where you are in the book.',
    'about.notes_are_shown_in': 'Notes are shown in reading order, not by popularity. There is no engagement metric to optimise for.',
    'about.page_commons_is_a': 'Page Commons is a quiet place for readers. No social feed, no follower counts, no algorithmic recommendations. Just books and the people who read them.',
    'about.page_commons_is_built': 'Page Commons is built for serious readers who feel underserved by Goodreads and generic AI chatbots. It is open source, privacy-first, and funded by readers — not advertisers.',
    'about.spoiler_aware_by_default': 'Spoiler-aware by default',
    'about.tell_it_whether_you': 'Tell it whether you\'re considering the book, just started, halfway through, or finished — and it adapts accordingly.',
    'about.the_philosophy': 'The philosophy',
    'about.what_is_page_commons': 'What is Page Commons?',
    'about.your_companion_never_recites': 'Your companion never recites plot points. It asks questions, offers opinions when asked, and follows your lead.',
    'about.your_conversations_are_powered': 'Your conversations are powered by your own AI provider key. Nothing is stored on our servers.',
    'about.your_reading_companion': 'Your reading companion',
    'age_gate.i_m_18_or': 'I\'m 18 or over — continue',
    'age_gate.just_a_moment': 'Just a moment',
    'age_gate.take_me_back': 'Take me back',
    'age_gate.this_book_has_been': 'This book has been flagged as containing adult content.',
    'age_gate.we_don_t_store': 'We don\'t store this confirmation — it is only used at this moment of adding the book.',
    'app.offline_your_message_will': 'Offline — your message will be saved and sent when you reconnect',
    'book_shelf.new_conversation': 'New conversation',
    'book_shelf.update_status': 'Update status',
    'common.english': 'English',
    'common.french': 'French',
    'common.german': 'German',
    'common.japanese': 'Japanese',
    'common.korean': 'Korean',
    'common.portuguese': 'Portuguese',
    'common.privacy': 'Privacy',
    'common.simplified_chinese': 'Simplified Chinese',
    'common.spanish': 'Spanish',
    'common.support_us': 'Support us',
    'common.terms': 'Terms',
    'common.traditional_chinese': 'Traditional Chinese',
    'companion.copy_all': 'Copy all',
    'companion.end_chat': 'End Chat',
    'companion.export': 'Export',
    'companion.export_conversation': 'Export conversation',
    'companion.highlights': 'Highlights',
    'companion.i_want_to_read': 'I want to read this',
    'companion.kindle_can_only_download': 'Kindle can only download and open .txt files. Markdown is best for desktop or note-taking apps.',
    'companion.language': 'Language',
    'companion.markdown_md': 'Markdown (.md)',
    'companion.no_passages_saved_yet': 'No passages saved yet',
    'companion.notes': 'Notes',
    'companion.passages': 'Passages',
    'companion.ph_write_a_private_note': 'Write a private note about this book…',
    'companion.plain_text_txt': 'Plain text (.txt)',
    'companion.prompt_language': 'Prompt language',
    'companion.remove': 'Remove',
    'companion.save_note': 'Save note',
    'companion.send': 'Send',
    'companion.start_here_or_write': 'Start here, or write your own below',
    'companion.sync': 'Sync',
    'companion.thinking': 'Thinking…',
    'companion.your_notes': 'Your notes',
    'header.back': '&#8592; Back',
    'header.find_a_book': 'Find a book',
    'header.main': 'Main',
    'header.tagline': 'Just books. No noise.',
    'home.a_quiet_place_to': 'A quiet place to talk about books.',
    'home.coming_soon_read_notes': 'Coming soon — read notes from other readers',
    'home.enter_a_book_room': 'Enter a book room',
    'home.new_here_learn_what': 'New here? Learn what Page Commons is →',
    'home.start_a_new_book': 'Start a new book conversation, or continue one from your shelf',
    'home.talk_to_your_companion': 'Talk to your companion',
    'js.already_saved': 'Already saved',
    'js.archive': 'Archive',
    'js.archived': 'Archived',
    'js.back_online_sending': 'You\'re back online — sending your saved message…',
    'js.connect_drive_first': 'Connect Google Drive in Preferences to sync.',
    'js.continue': 'Continue',
    'js.conversation': 'conversation',
    'js.conversations': 'conversations',
    'js.copied': 'Copied',
    'js.copy': 'Copy',
    'js.copy_unavailable': 'Copy not available in this browser.',
    'js.delete': 'Delete',
    'js.err_generic': 'Something went wrong: ',
    'js.err_network': 'Couldn\'t reach your companion — poor connection? Try again when you have a better signal.',
    'js.err_ratelimit': 'Your AI key has hit its rate limit. Wait a moment and try again, or switch to a different provider.',
    'js.finding_questions': 'Finding the right questions…',
    'js.greet_afternoon': 'Good afternoon',
    'js.greet_evening': 'Good evening',
    'js.greet_late': 'Reading late?',
    'js.greet_morning': 'Good morning',
    'js.greet_night': 'Reading tonight?',
    'js.isbn_failed': 'ISBN lookup failed — check your connection.',
    'js.isbn_not_found': 'ISBN not found — try searching by title.',
    'js.last': 'Last',
    'js.last_synced': 'Last synced: ',
    'js.last_synced_never': 'Last synced: never',
    'js.loading': 'Loading…',
    'js.looking_up_isbn': 'Looking up ISBN…',
    'js.no_conversations_yet': 'No conversations yet.',
    'js.no_export_yet': 'No conversation to export yet.',
    'js.no_more_results': 'No more results found.',
    'js.no_passages_yet': 'No passages saved yet',
    'js.no_results': 'No results found — try different keywords or enter manually below.',
    'js.offline_saved': 'Saved for when you\'re back online. Your companion will reply then.',
    'js.please_enter_key': 'Please enter your API key.',
    'js.rename': 'Rename',
    'js.restore': 'Restore',
    'js.save_passage': 'Save passage',
    'js.saved_check': 'Saved ✓',
    'js.search_failed': 'Search failed — check your connection and try again.',
    'js.search_heading_0': 'Which book?',
    'js.search_heading_1': 'What are you reading?',
    'js.search_heading_2': 'What are you lost in?',
    'js.search_heading_3': 'What\'s keeping you up?',
    'js.search_heading_4': 'What\'s calling to you?',
    'js.search_heading_5': 'What\'s in your hands?',
    'js.search_heading_6': 'Which world are you in?',
    'js.search_heading_named_0': 'What are you reading, {name}?',
    'js.search_heading_named_1': 'What are you lost in, {name}?',
    'js.search_heading_named_2': 'What\'s keeping you up, {name}?',
    'js.search_heading_named_3': 'What\'s calling to you, {name}?',
    'js.search_heading_named_4': 'Which world are you in, {name}?',
    'js.searching': 'Searching…',
    'js.searching_google': 'Searching Google Books…',
    'js.shelf_empty': 'Your shelf is empty. Start a conversation to add books here.',
    'js.show_more_results': 'Show more results',
    'js.status_considering': 'Considering',
    'js.status_considering_long': 'Considering reading',
    'js.status_finished': 'Finished',
    'js.status_finished_long': 'Just finished',
    'js.status_midway': 'Halfway through',
    'js.status_revisiting': 'Revisiting',
    'js.status_started': 'Just started',
    'js.thinking': 'Thinking…',
    'js.try_again': 'Try again',
    'js.trying_title_only': 'Trying title only…',
    'js.understanding_search': 'Understanding your search…',
    'key.6_digit_transfer_code': '6-digit transfer code',
    'key.ai_provider': 'AI Provider',
    'key.api_key': 'API Key',
    'key.choose_your_ai_provider': 'Choose your AI provider and enter your API key. Your key stays in your browser and never touches our servers — unless you use the transfer code option, where your key briefly passes through our servers to complete the transfer and is deleted immediately. No record is kept.',
    'key.continue': 'Continue',
    'key.fetch_my_key': 'Fetch my key',
    'key.generate_a_code_at': 'Generate a code at <strong>pagecommons.com/transfer.html</strong> on your phone or desktop.',
    'key.get_your_key_at': 'Get your key at console.anthropic.com',
    'key.show_key': 'Show key',
    'key.transferring_from_another_device': '↓ Transferring from another device? Enter a code',
    'key.your_companion_awaits': 'Your companion awaits',
    'key.your_key_briefly_passes': 'Your key briefly passes through our servers to complete this transfer and is deleted immediately. No record is kept.',
    'language.chat_in_english': 'Chat in English',
    'language.chat_in_the_book': 'Chat in the book\'s language',
    'language.this_looks_like_a': 'This looks like a non-English book. Would you like to chat in the book\'s language or in English?',
    'language.which_language': 'Which language?',
    'language.you_can_change_this': 'You can change this later in More.',
    'onboarding.choose_your_companion': 'Choose your companion',
    'onboarding.no_key_needed_best': 'No key needed. Best for well-known books in English. May not know recent or niche titles in depth — works best when you share what you remember as you go. Shared with other readers; may be slow at busy times.',
    'onboarding.page_commons_uses_ai': 'Page Commons uses AI to power your reading companion. You can use the free shared pool or bring your own API key.',
    'onboarding.stronger_knowledge_across_more': 'Stronger knowledge across more titles and languages, always available. Anthropic Claude, Google Gemini, or Groq. Your key is stored only in this browser and never sent to our servers.',
    'onboarding.use_free_shared_companion': 'Use free shared companion',
    'onboarding.use_my_own_api': 'Use my own API key',
    'onboarding.you_can_change_this': 'You can change this any time in Preferences.',
    'preferences.ai_companion': 'AI companion',
    'preferences.api_key_provider': 'API key &amp; provider',
    'preferences.arabic': 'Arabic',
    'preferences.back_up_and_access': 'Back up and access your conversations from any device.',
    'preferences.back_up_your_page': 'Back up your Page Commons data or restore it on another device.',
    'preferences.companion_language': 'Companion language',
    'preferences.companion_name': 'Companion name',
    'preferences.connect_google_drive': 'Connect Google Drive',
    'preferences.connected_as': 'Connected as',
    'preferences.default_reply_length': 'Default reply length',
    'preferences.detailed': 'Detailed',
    'preferences.disconnect': 'Disconnect',
    'preferences.dutch': 'Dutch',
    'preferences.export_my_data': 'Export my data',
    'preferences.free_shared_pool': 'Free shared pool',
    'preferences.google_drive_sync': 'Google Drive sync',
    'preferences.import_data_from_backup': 'Import data from backup',
    'preferences.import_my_clippings_txt': 'Import My Clippings.txt',
    'preferences.interface_language': 'Interface language',
    'preferences.interface_language_note': 'The language of buttons and labels. Your companion\'s language is set separately below.',
    'preferences.italian': 'Italian',
    'preferences.last_synced_never': 'Last synced: never',
    'preferences.leave_blank_to_use': 'Leave blank to use "Companion".',
    'preferences.medium': 'Medium',
    'preferences.more_settings': 'More settings ▾',
    'preferences.my_own_key': 'My own key',
    'preferences.ph_e_g_alex': 'e.g. Alex',
    'preferences.ph_e_g_ellis_river': 'e.g. Ellis, River, Claude…',
    'preferences.polish': 'Polish',
    'preferences.preferences': 'Preferences',
    'preferences.quick_setup_defaults_are': 'Quick setup. Defaults are fine — change anything you like, then continue.',
    'preferences.russian': 'Russian',
    'preferences.save_continue': 'Save & continue',
    'preferences.set_your_api_key': 'Set your API key →',
    'preferences.short': 'Short',
    'preferences.sync_now': 'Sync now',
    'preferences.text_size': 'Text size',
    'preferences.the_companion_chats_in': 'The companion chats in this language. Defaults to English; per-book overrides are available from the Language button in a chat.',
    'preferences.turkish': 'Turkish',
    'preferences.upload_my_clippings_txt': 'Upload My Clippings.txt from your Kindle to your &ldquo;Page Commons&rdquo; folder in Google Drive first.',
    'preferences.used_for_personalised_headings': 'Used for personalised headings.',
    'preferences.your_data': 'Your data',
    'preferences.your_name': 'Your name',
    'search.author': 'Author',
    'search.choose_file': 'Choose file',
    'search.everything_is_processed_locally': 'Everything is processed locally in your browser. The file is never uploaded.',
    'search.import_pasted_text': 'Import pasted text',
    'search.my_clippings_txt': 'My Clippings.txt',
    'search.no_file_chosen': 'No file chosen',
    'search.optional': '(optional)',
    'search.or_import_from_kindle': 'Or import from Kindle',
    'search.or_paste_clippings_text': 'Or paste clippings text',
    'search.or_search_by_title': 'Or search by title and author below.',
    'search.ph_paste_the_full_contents': 'Paste the full contents of My Clippings.txt here…',
    'search.search': 'Search',
    'search.tip_paste_an_isbn': 'Tip: paste an ISBN (e.g. 9780747532743) to find an exact edition.',
    'search.title': 'Title',
    'search.upload_clippings_hint': 'Upload your <em>My Clippings.txt</em> to auto-detect your last book and load your highlights.',
    'search.which_book': 'Which book?',
    'search.your_saved_books': 'Your saved books →',
    'shelf.your_shelf': 'Your shelf',
    'status.coming_back_with_fresh': 'Coming back with fresh eyes',
    'status.getting_into_it': 'Getting into it',
    'status.halfway_through': 'Halfway through',
    'status.i_m_in_the': 'I\'m in the early pages',
    'status.just_finished': 'Just finished',
    'status.just_started': 'Just started',
    'status.read_before_revisiting': 'Read before, revisiting',
    'status.ready_to_talk_about': 'Ready to talk about all of it',
    'status.where_are_you_with': 'Where are you with this book?',
    'tc.before_you_continue_please': 'Before you continue, please read and agree to the following:',
    'tc.i_agree_take_me': 'I agree — take me in',
    'tc.page_commons_is_a': 'Page Commons is a calm, private reading companion. Talk through the book you\'re reading with an AI that knows the work, save the passages that stay with you, and keep your shelf — all stored in your own browser, with no ads and no personal data on our servers.',
    'tc.welcome_to_page_commons': 'Welcome to Page Commons',
    'tc.your_agreement_is_stored': 'Your agreement is stored locally in your browser only.'
  },
  'zh-TW': {
    'js.select_books_to_add': '選擇要加入書架的書：',
    'js.all_books_on_shelf': '所有書籍都已在你的書架上。',
    'status.thinking_about_reading': '考慮讀這本書',
    'status.help_me_decide': '幫我看看適不適合我',
    'search.ph_title': '例如：紅樓夢、金庸…',
    'search.ph_author': '例如：張愛玲、東野圭吾…',
    'companion.ph_write_message': '寫下你的訊息…',
    'js.not_seeing_your_book': '找不到你的書？手動輸入：',
    'js.title': '書名',
    'js.author': '作者',
    'js.language': '語言',
    'js.year': '出版年份',
    'js.optional': '（可選）',
    'js.select_language': '選擇語言…',
    'js.ph_author_name': '作者姓名',
    'js.ph_year_example': '例如：2024',
    'js.find_this_book': '尋找這本書',
    'js.about_this_book': '關於這本書 ▾',
    'js.no_notes_yet': '還沒有筆記。',
    'js.highlights_imported': '標註已匯入。',
    'js.add_selected_to_shelf': '將所選加入書架',
    'persona.companion.label': '書伴',
    'persona.companion.desc': '溫暖而好奇——每次都會反問你',
    'persona.guide.label': '導讀',
    'persona.guide.desc': '耐心解說背景與思想',
    'persona.direct.label': '直說',
    'persona.direct.desc': '先給答案——不會一直反問你',
    'persona.kindred.label': '知音',
    'persona.kindred.desc': '安靜地陪你讀那些觸動你的書',
    'companion.voice': '語氣',
    'companion.companion_voice': '書伴語氣',
    'companion.voice_note': '只套用於這本書。預設值可在「偏好設定」中更改。',
    'preferences.companion_voice': '書伴語氣',
    'preferences.companion_voice_note': '書伴說話的方式。在對話中按「語氣」，可為個別書籍另設語氣。',
    'js.voice_set_to': '語氣已設為 ',
    'js.unknown_title': '書名不詳',
    'js.by_author': '（{author}）',
    'js.preferences': '偏好設定',
    'js.trying_google': '改用 Google Books 搜尋…',
    'js.searching_for': '正在搜尋「{title}」',
    'js.showing_books_by': '顯示「{author}」的著作。在上方加入書名可縮小範圍。',
    'js.free_tier_note': '正在使用免費共用書伴。最適合英文的知名書籍；對近期、冷門或非英文書籍較弱。加上你自己的金鑰可獲得更扎實的書籍知識。',
    'js.is_this_for_me': '這本書適合我嗎？',
    'js.reading_clippings': '正在讀取標註…',
    'js.no_highlights_file': '這個檔案中找不到標註。',
    'js.loaded': '已載入 ',
    'js.paste_clippings_first': '請先貼上你的標註文字。',
    'js.no_highlights_paste': '找不到標註。請確認你貼上了 My Clippings.txt 的完整內容。',
    'js.highlights': '標註',
    'js.passages': '摘句',
    'js.notes': '筆記',
    'js.hide_transfer': '↑ 收起傳送碼輸入',
    'js.show_transfer': '↓ 從其他裝置傳送？輸入傳送碼',
    'js.enter_code_exactly': '請完全依照顯示輸入 6 位數傳送碼。',
    'js.fetching': '取得中…',
    'js.fetch_my_key': '取得我的金鑰',
    'js.key_transferred': '金鑰傳送成功！請按「繼續」。',
    'js.network_error': '網絡錯誤——請檢查連線後再試。',
    'js.error_prefix': '錯誤："',
    'js.more_settings': '更多設定 ▾',
    'js.companion_name_set': '書伴名稱已設為 ',
    'js.reply_length_set': '回覆長度已設為 ',
    'js.prompts_now_in': '提示語言已設為 ',
    'js.auto_detect_enabled': '已啟用自動偵測。',
    'js.untitled': '未命名',
    'js.unknown_author': '作者不詳',
    'js.no_description': '沒有簡介——書伴仍然可以陪你探索這本書。',
    'js.find_out_if_for_me': '看看適不適合我 →',
    'js.i_have_this_book': '我有這本書',
    'js.back_arrow': '返回 ←',
    'home.description': '聊聊你正在讀的書，看看別人怎麼想，或找到下一本書。<br>沒有廣告。沒有演算法。沒有互動指標。只有書。',
    'key.api_key_loaded': 'API 金鑰已載入',
    'tc.age_note': '<strong>年齡：</strong>繼續即表示你確認已年滿 13 歲。部分書籍含有成人內容——取用該類內容前，你確認已年滿 18 歲。',
    'tc.privacy_note': '<strong>私隱：</strong>你的 API 金鑰與閱讀資料只儲存在你的瀏覽器中。我們不會在伺服器上收集或儲存個人資料。',
    'tc.content_note': '<strong>內容：</strong>Page Commons 是一位閱讀書伴，討論皆以書籍為本。我們不對 AI 的回應負責，但會採取合理措施使其保持適當。',
    'tc.open_source_note': '<strong>開放原始碼：</strong>Page Commons 是依現況提供的開放原始碼軟件。請負責任地使用。',
    'about.a_private_ai_companion': '一位私密的 AI 書伴，任何書都可以聊——像一位讀過同一本書的老朋友。',
    'about.back_to_the_library': '回到書房',
    'about.book_rooms': '書房',
    'about.bring_your_own_key': '使用你自己的金鑰',
    'about.coming_soon': '（即將推出）',
    'about.discusses_books_not_summaries': '談書，而不是複述內容',
    'about.each_book_has_a': '每本書都有自己的房間。讀者留下短短的筆記——就像二手書頁邊的字跡。',
    'about.import_your_kindle_clippings': '匯入你的 Kindle 標註，書伴會記得那些留在你心裡的段落。',
    'about.knows_your_highlights': '認得你的標註',
    'about.meets_you_where_you': '在你所在之處與你相遇',
    'about.no_likes_no_rankings': '沒有讚，沒有排名',
    'about.notes_are_gated_by': '筆記依閱讀進度顯示。你只會看到與你目前進度相符的內容。',
    'about.notes_are_shown_in': '筆記按閱讀順序排列，而非人氣。這裡沒有需要迎合的互動指標。',
    'about.page_commons_is_a': 'Page Commons 是屬於讀者的一處靜地。沒有社群動態，沒有追蹤人數，沒有演算法推薦。只有書，和讀書的人。',
    'about.page_commons_is_built': 'Page Commons 為認真的讀者而建——那些覺得 Goodreads 與一般 AI 聊天機械人並不合用的人。它開放原始碼、隱私優先，由讀者支持，而非廣告商。',
    'about.spoiler_aware_by_default': '預設避免劇透',
    'about.tell_it_whether_you': '告訴它你是正在考慮這本書、剛開始讀、讀到一半，還是已經讀完——它會隨之調整。',
    'about.the_philosophy': '我們的理念',
    'about.what_is_page_commons': 'Page Commons 是什麼？',
    'about.your_companion_never_recites': '你的書伴從不複述情節。它提問、在你想聽時給出看法，並且跟隨你的節奏。',
    'about.your_conversations_are_powered': '你的對話由你自己的 AI 服務金鑰驅動。我們的伺服器不會儲存任何內容。',
    'about.your_reading_companion': '你的閱讀書伴',
    'age_gate.i_m_18_or': '我已年滿 18 歲——繼續',
    'age_gate.just_a_moment': '請稍等',
    'age_gate.take_me_back': '返回',
    'age_gate.this_book_has_been': '這本書被標示為含有成人內容。',
    'age_gate.we_don_t_store': '我們不會儲存這項確認——它只在加入這本書的當下使用。',
    'app.offline_your_message_will': '離線中——你的訊息會先儲存，重新連線後送出',
    'book_shelf.new_conversation': '開始新對話',
    'book_shelf.update_status': '更新閱讀進度',
    'common.english': '英文',
    'common.french': '法文',
    'common.german': '德文',
    'common.japanese': '日文',
    'common.korean': '韓文',
    'common.portuguese': '葡萄牙文',
    'common.privacy': '私隱',
    'common.simplified_chinese': '簡體中文',
    'common.spanish': '西班牙文',
    'common.support_us': '支持我們',
    'common.terms': '條款',
    'common.traditional_chinese': '繁體中文',
    'companion.copy_all': '全部複製',
    'companion.end_chat': '結束對話',
    'companion.export': '匯出',
    'companion.export_conversation': '匯出對話',
    'companion.highlights': '標註',
    'companion.i_want_to_read': '我想讀這本書',
    'companion.kindle_can_only_download': 'Kindle 只能下載和開啟 .txt 檔案。Markdown 較適合電腦或筆記應用程式。',
    'companion.language': '語言',
    'companion.markdown_md': 'Markdown（.md）',
    'companion.no_passages_saved_yet': '尚未收藏任何摘句',
    'companion.notes': '筆記',
    'companion.passages': '摘句',
    'companion.ph_write_a_private_note': '寫下關於這本書的私人筆記…',
    'companion.plain_text_txt': '純文字（.txt）',
    'companion.prompt_language': '提示語言',
    'companion.remove': '移除',
    'companion.save_note': '儲存筆記',
    'companion.send': '傳送',
    'companion.start_here_or_write': '從這裡開始，或在下方自己寫',
    'companion.sync': '同步',
    'companion.thinking': '思考中…',
    'companion.your_notes': '你的筆記',
    'header.back': '&#8592; 返回',
    'header.find_a_book': '尋找書籍',
    'header.main': '主頁',
    'header.tagline': '只有書。沒有雜音。',
    'home.a_quiet_place_to': '一處安靜的地方，聊聊書。',
    'home.coming_soon_read_notes': '即將推出——閱讀其他讀者的筆記',
    'home.enter_a_book_room': '進入書房',
    'home.new_here_learn_what': '初次到訪？認識 Page Commons →',
    'home.start_a_new_book': '開始一段新的書話，或從書架接續之前的對話',
    'home.talk_to_your_companion': '與你的書伴聊聊',
    'js.already_saved': '已經收藏',
    'js.archive': '封存',
    'js.archived': '已封存',
    'js.back_online_sending': '已重新連線——正在送出你儲存的訊息…',
    'js.connect_drive_first': '請先在「偏好設定」連結 Google Drive 才能同步。',
    'js.continue': '繼續',
    'js.conversation': '段對話',
    'js.conversations': '段對話',
    'js.copied': '已複製',
    'js.copy': '複製',
    'js.copy_unavailable': '此瀏覽器不支援複製功能。',
    'js.delete': '刪除',
    'js.err_generic': '發生問題：',
    'js.err_network': '無法連上你的書伴——訊號不好？網絡穩定後再試一次。',
    'js.err_ratelimit': '你的 AI 金鑰已達速率上限。稍候再試，或改用其他服務供應商。',
    'js.finding_questions': '正在想幾個好問題…',
    'js.greet_afternoon': '午安',
    'js.greet_evening': '晚上好',
    'js.greet_late': '夜深了還在讀？',
    'js.greet_morning': '早晨',
    'js.greet_night': '今晚讀點什麼？',
    'js.isbn_failed': 'ISBN 查詢失敗——請檢查網絡連線。',
    'js.isbn_not_found': '找不到此 ISBN——試試用書名搜尋。',
    'js.last': '最後',
    'js.last_synced': '上次同步：',
    'js.last_synced_never': '上次同步：從未',
    'js.loading': '載入中…',
    'js.looking_up_isbn': '正在查詢 ISBN…',
    'js.no_conversations_yet': '還沒有對話。',
    'js.no_export_yet': '還沒有可匯出的對話。',
    'js.no_more_results': '沒有更多結果了。',
    'js.no_passages_yet': '尚未收藏任何摘句',
    'js.no_results': '找不到結果——換個關鍵字，或在下方手動輸入。',
    'js.offline_saved': '已為你儲存，重新連線後書伴會回覆。',
    'js.please_enter_key': '請輸入你的 API 金鑰。',
    'js.rename': '重新命名',
    'js.restore': '取回',
    'js.save_passage': '收藏摘句',
    'js.saved_check': '已收藏 ✓',
    'js.search_failed': '搜尋失敗——請檢查網絡連線後再試。',
    'js.search_heading_0': '哪一本書？',
    'js.search_heading_1': '你在讀什麼？',
    'js.search_heading_2': '你正沉浸在哪本書裡？',
    'js.search_heading_3': '哪本書讓你捨不得睡？',
    'js.search_heading_4': '哪本書在呼喚你？',
    'js.search_heading_5': '你手上拿著哪本書？',
    'js.search_heading_6': '你正身處哪個世界？',
    'js.search_heading_named_0': '{name}，你在讀什麼？',
    'js.search_heading_named_1': '{name}，你正沉浸在哪本書裡？',
    'js.search_heading_named_2': '{name}，哪本書讓你捨不得睡？',
    'js.search_heading_named_3': '{name}，哪本書在呼喚你？',
    'js.search_heading_named_4': '{name}，你正身處哪個世界？',
    'js.searching': '搜尋中…',
    'js.searching_google': '正在搜尋 Google Books…',
    'js.shelf_empty': '你的書架還是空的。開始一段對話，書就會出現在這裡。',
    'js.show_more_results': '顯示更多結果',
    'js.status_considering': '考慮中',
    'js.status_considering_long': '考慮閱讀',
    'js.status_finished': '已讀完',
    'js.status_finished_long': '剛剛讀完',
    'js.status_midway': '讀到一半',
    'js.status_revisiting': '重讀中',
    'js.status_started': '剛開始讀',
    'js.thinking': '思考中…',
    'js.try_again': '再試一次',
    'js.trying_title_only': '改用書名搜尋…',
    'js.understanding_search': '正在理解你的搜尋…',
    'key.6_digit_transfer_code': '6 位數傳送碼',
    'key.ai_provider': 'AI 服務供應商',
    'key.api_key': 'API 金鑰',
    'key.choose_your_ai_provider': '選擇你的 AI 服務供應商並輸入 API 金鑰。你的金鑰只留在瀏覽器中，不會經過我們的伺服器——除非你使用傳送碼功能，此時金鑰會短暫經過伺服器以完成傳送，並立即刪除，不留任何紀錄。',
    'key.continue': '繼續',
    'key.fetch_my_key': '取得我的金鑰',
    'key.generate_a_code_at': '在手機或電腦上前往 <strong>pagecommons.com/transfer.html</strong> 產生傳送碼。',
    'key.get_your_key_at': '前往 console.anthropic.com 取得金鑰',
    'key.show_key': '顯示金鑰',
    'key.transferring_from_another_device': '↓ 從其他裝置傳送？輸入傳送碼',
    'key.your_companion_awaits': '你的書伴在等你',
    'key.your_key_briefly_passes': '你的金鑰會短暫經過我們的伺服器以完成這次傳送，隨即刪除，不留任何紀錄。',
    'language.chat_in_english': '用英文聊',
    'language.chat_in_the_book': '用這本書的語言聊',
    'language.this_looks_like_a': '這似乎是一本非英文書籍。你想用這本書的語言，還是用英文聊？',
    'language.which_language': '使用哪種語言？',
    'language.you_can_change_this': '稍後可在「更多」中更改。',
    'onboarding.choose_your_companion': '選擇你的書伴',
    'onboarding.no_key_needed_best': '無需金鑰。最適合英文的知名書籍。對近期或冷門書籍未必深入——你邊讀邊分享記得的內容，效果最好。與其他讀者共用，繁忙時可能較慢。',
    'onboarding.page_commons_uses_ai': 'Page Commons 以 AI 驅動你的閱讀書伴。你可以使用免費共用資源，或帶上自己的 API 金鑰。',
    'onboarding.stronger_knowledge_across_more': '涵蓋更多書籍與語言，知識更紮實，隨時可用。支援 Anthropic Claude、Google Gemini 或 Groq。你的金鑰只儲存在這部瀏覽器，絕不會傳送到我們的伺服器。',
    'onboarding.use_free_shared_companion': '使用免費共用書伴',
    'onboarding.use_my_own_api': '使用我自己的 API 金鑰',
    'onboarding.you_can_change_this': '你隨時可以在「偏好設定」中更改。',
    'preferences.ai_companion': 'AI 書伴',
    'preferences.api_key_provider': 'API 金鑰與服務供應商',
    'preferences.arabic': '阿拉伯文',
    'preferences.back_up_and_access': '備份對話，並在任何裝置上取用。',
    'preferences.back_up_your_page': '備份你的 Page Commons 資料，或在另一部裝置上還原。',
    'preferences.companion_language': '書伴語言',
    'preferences.companion_name': '書伴名稱',
    'preferences.connect_google_drive': '連結 Google Drive',
    'preferences.connected_as': '已連結帳戶',
    'preferences.default_reply_length': '預設回覆長度',
    'preferences.detailed': '詳細',
    'preferences.disconnect': '中斷連結',
    'preferences.dutch': '荷蘭文',
    'preferences.export_my_data': '匯出我的資料',
    'preferences.free_shared_pool': '免費共用資源',
    'preferences.google_drive_sync': 'Google Drive 同步',
    'preferences.import_data_from_backup': '從備份匯入資料',
    'preferences.import_my_clippings_txt': '匯入 My Clippings.txt',
    'preferences.interface_language': '介面語言',
    'preferences.interface_language_note': '按鈕與標籤所用的語言。書伴的語言在下方另行設定。',
    'preferences.italian': '意大利文',
    'preferences.last_synced_never': '上次同步：從未',
    'preferences.leave_blank_to_use': '留空則使用「書伴」。',
    'preferences.medium': '中等',
    'preferences.more_settings': '更多設定 ▾',
    'preferences.my_own_key': '我自己的金鑰',
    'preferences.ph_e_g_alex': '例如：小明',
    'preferences.ph_e_g_ellis_river': '例如：小書、明月、Claude…',
    'preferences.polish': '波蘭文',
    'preferences.preferences': '偏好設定',
    'preferences.quick_setup_defaults_are': '快速設定。預設值已經合用——你可以隨意調整，然後繼續。',
    'preferences.russian': '俄文',
    'preferences.save_continue': '儲存並繼續',
    'preferences.set_your_api_key': '設定你的 API 金鑰 →',
    'preferences.short': '簡短',
    'preferences.sync_now': '立即同步',
    'preferences.text_size': '文字大小',
    'preferences.the_companion_chats_in': '書伴會以這種語言與你交談。預設為英文；在對話中按「語言」可為個別書籍另作設定。',
    'preferences.turkish': '土耳其文',
    'preferences.upload_my_clippings_txt': '請先將 Kindle 的 My Clippings.txt 上載到你 Google Drive 的「Page Commons」資料夾。',
    'preferences.used_for_personalised_headings': '用於個人化的標題。',
    'preferences.your_data': '你的資料',
    'preferences.your_name': '你的名字',
    'search.author': '作者',
    'search.choose_file': '選擇檔案',
    'search.everything_is_processed_locally': '所有處理都在你的瀏覽器本機完成。檔案不會被上載。',
    'search.import_pasted_text': '匯入貼上的文字',
    'search.my_clippings_txt': 'My Clippings.txt',
    'search.no_file_chosen': '尚未選擇檔案',
    'search.optional': '（可選）',
    'search.or_import_from_kindle': '或從 Kindle 匯入',
    'search.or_paste_clippings_text': '或貼上標註文字',
    'search.or_search_by_title': '或在下方以書名和作者搜尋。',
    'search.ph_paste_the_full_contents': '在此貼上 My Clippings.txt 的完整內容…',
    'search.search': '搜尋',
    'search.tip_paste_an_isbn': '小提示：貼上 ISBN（例如 9780747532743）可找到特定版本。',
    'search.title': '書名',
    'search.upload_clippings_hint': '上載你的 <em>My Clippings.txt</em>，自動辨識你最近讀的書並載入標註。',
    'search.which_book': '哪一本書？',
    'search.your_saved_books': '你收藏的書 →',
    'shelf.your_shelf': '你的書架',
    'status.coming_back_with_fresh': '以新的眼光重讀',
    'status.getting_into_it': '漸入佳境',
    'status.halfway_through': '讀到一半',
    'status.i_m_in_the': '還在前面幾頁',
    'status.just_finished': '剛剛讀完',
    'status.just_started': '剛開始讀',
    'status.read_before_revisiting': '讀過了，重讀中',
    'status.ready_to_talk_about': '可以聊整本書了',
    'status.where_are_you_with': '這本書你讀到哪裡了？',
    'tc.before_you_continue_please': '繼續之前，請閱讀並同意以下條款：',
    'tc.i_agree_take_me': '我同意——帶我進去',
    'tc.page_commons_is_a': 'Page Commons 是一位安靜而私密的閱讀書伴。與熟悉作品的 AI 聊聊你正在讀的書，收藏那些留在心裡的段落，整理自己的書架——全部儲存在你自己的瀏覽器中，沒有廣告，伺服器上也沒有你的個人資料。',
    'tc.welcome_to_page_commons': '歡迎來到 Page Commons',
    'tc.your_agreement_is_stored': '你的同意僅儲存在你的瀏覽器本機。'
  }
};
var UI_LANG = 'en';
function getUILang() {
  try {
    var saved = localStorage.getItem('pc_ui_lang');
    if (saved && UI_STRINGS[saved]) return saved;
  } catch (e) {}
  return 'en';
}
// Look up a string in the active language, falling back to English, then to
// the key itself so a missing entry is visible rather than blank.
function t(key, fallback) {
  var table = UI_STRINGS[UI_LANG] || UI_STRINGS['en'];
  var v = table[key];
  if (v === undefined && UI_STRINGS['en']) v = UI_STRINGS['en'][key];
  if (v === undefined) v = fallback === undefined ? key : fallback;
  return v;
}
function dateLocale() {
  return UI_DATE_LOCALE[UI_LANG] || 'en-GB';
}
// Walk the annotated markup and fill in the active language. Safe to call
// repeatedly; it is idempotent.
function applyLanguage(lang) {
  if (lang && UI_STRINGS[lang]) UI_LANG = lang;
  var i, els, el, key;
  try {
    document.documentElement.setAttribute('lang', UI_LANG === 'zh-TW' ? 'zh-Hant' : 'en');
  } catch (e) {}
  // CJK glyphs are absent from Georgia / Helvetica Neue, so the whole page
  // switches to a CJK-capable stack when a CJK interface is active.
  try {
    var root = document.body || document.documentElement;
    if (root) {
      var cls = (root.className || '').replace(/\s*\bui-cjk\b/g, '');
      root.className = UI_LANG === 'zh-TW' ? cls + ' ui-cjk' : cls;
    }
  } catch (e) {}
  els = document.querySelectorAll('[data-i18n]');
  for (i = 0; i < els.length; i++) {
    el = els[i];
    key = el.getAttribute('data-i18n');
    if (key) el.innerHTML = t(key);
  }
  els = document.querySelectorAll('[data-i18n-html]');
  for (i = 0; i < els.length; i++) {
    el = els[i];
    key = el.getAttribute('data-i18n-html');
    if (key) el.innerHTML = t(key);
  }
  els = document.querySelectorAll('[data-i18n-placeholder]');
  for (i = 0; i < els.length; i++) {
    el = els[i];
    key = el.getAttribute('data-i18n-placeholder');
    if (key) el.setAttribute('placeholder', t(key));
  }
  // Strings that JS owns and would otherwise keep their old-language text.
  try {
    updateGreeting();
  } catch (e) {}
  try {
    updateSearchHeading();
  } catch (e) {}
  try {
    if (STATE.book) updateStatusDisplay();
  } catch (e) {}
}
function setUILang(lang) {
  if (!UI_STRINGS[lang]) return;
  try {
    localStorage.setItem('pc_ui_lang', lang);
  } catch (e) {}
  touchSyncMeta('preferences');
  applyLanguage(lang);
  // Re-render whatever is on screen in the new language.
  try {
    var cur = currentScreen();
    if (cur === 'shelf') renderShelf();
    if (cur === 'book-shelf' && STATE.book) renderConvList(STATE.book);
  } catch (e) {}
}

// ═══════════════════════════════════════════════════
//  SCREENS + NAVIGATION
// ═══════════════════════════════════════════════════
var SCREENS = ['home', 'key', 'search', 'status', 'language', 'companion', 'about', 'shelf', 'book-shelf', 'book-detail', 'tc', 'age-gate', 'preferences', 'onboarding'];

// Search headings moved into UI_STRINGS ('js.search_heading_*' /
// 'js.search_heading_named_*') so they rotate in the active interface language.
function updateSearchHeading() {
  var el = document.getElementById('search-heading');
  if (!el) return;
  // Headings live in the string table so they rotate in the active language.
  var named = !!STATE.userName;
  var n = named ? 5 : 7;
  var key = 'js.search_heading_' + (named ? 'named_' : '') + Math.floor(Math.random() * n);
  el.textContent = t(key).replace('{name}', STATE.userName || '');
}

// navigate() defined above with showScreen

var navStack = [];
var _navBack = false;
// Fallback parent when the back stack is empty (e.g. deep link / fresh load)
var BACK_FALLBACK = {
  about: 'home',
  key: 'home',
  search: 'home',
  'book-detail': 'search',
  status: 'book-detail',
  language: 'status',
  companion: 'search',
  shelf: 'home',
  preferences: 'home',
  'book-shelf': 'shelf',
  'age-gate': 'search',
  onboarding: 'tc'
};
function currentScreen() {
  var el = document.querySelector('.screen.active');
  return el ? el.id.replace('screen-', '') : null;
}
function goBack() {
  if (currentScreen() === 'companion') {
    endConversation();
    return;
  }
  var prev = navStack.length ? navStack.pop() : null;
  if (!prev) {
    var cur = currentScreen() || 'home';
    prev = BACK_FALLBACK[cur] || 'home';
  }
  _navBack = true;
  navigate(prev);
}

// Hide on first-run-flow screens; also hide until the user has completed the
// initial preferences pass. Otherwise inject a "Preferences →" link above the
// existing "Support it →" line inside each .screen-support-footer.
var PREFS_FOOTER_HIDE = {
  tc: 1,
  onboarding: 1,
  key: 1,
  preferences: 1
};
function updatePreferencesFooterLinks() {
  var firstRunDone = !!localStorage.getItem('pc_preferences_set');
  var cur = currentScreen();
  var hideHere = !firstRunDone || cur && PREFS_FOOTER_HIDE[cur];
  var footers = document.querySelectorAll('.screen-support-footer');
  for (var i = 0; i < footers.length; i++) {
    var f = footers[i];
    // Inject the Preferences link into the right-side links group so it sits
    // inline with Support / Privacy / Terms.
    var group = f.querySelector('.sf-links') || f;
    var link = group.querySelector('.prefs-footer-link');
    if (hideHere) {
      if (link) link.style.display = 'none';
      continue;
    }
    if (!link) {
      link = document.createElement('a');
      link.className = 'prefs-footer-link';
      link.href = '#';
      link.textContent = t('js.preferences');
      link.style.color = '#666666';
      link.style.textDecoration = 'underline';
      link.onclick = function (e) {
        e.preventDefault();
        navigate('preferences');
        return false;
      };
      group.insertBefore(link, group.firstChild);
    } else {
      link.style.display = '';
    }
  }
}
var HEADER_NAV_SCREENS = {
  'about': true,
  'book-detail': true,
  'status': true,
  'language': true,
  'shelf': true,
  'preferences': true,
  'book-shelf': true,
  'key': true,
  'search': true,
  'companion': true
};
function updateHeaderNav(screenName) {
  var taglineEl = document.getElementById('site-tagline-el');
  var headerNav = document.getElementById('header-nav');
  if (!taglineEl || !headerNav) return;
  if (HEADER_NAV_SCREENS[screenName]) {
    taglineEl.style.display = 'none';
    headerNav.style.display = 'block';
  } else if (screenName === 'home') {
    taglineEl.style.display = 'block';
    headerNav.style.display = 'none';
  } else {
    taglineEl.style.display = 'none';
    headerNav.style.display = 'none';
  }
}
function showScreen(id) {
  var target = SCREENS.includes(id) ? id : 'home';
  var cur = currentScreen();
  // Maintain a back stack: record the screen we're leaving on forward
  // navigation; skip recording when goBack() is returning to a prior screen.
  if (cur && cur !== target) {
    if (!_navBack) {
      navStack.push(cur);
      if (navStack.length > 50) navStack.shift();
    }
  }
  _navBack = false;
  SCREENS.forEach(function (s) {
    var el = document.getElementById('screen-' + s);
    if (el) {
      if (s === target) {
        el.classList.add('active');
        el.style.display = 'block';
      } else {
        el.classList.remove('active');
        el.style.display = 'none';
      }
    }
  });
  updateHeaderNav(target);
  updatePreferencesFooterLinks();
  window.scrollTo(0, 0);
}
function handleRoute() {
  var hash = window.location.hash.replace('#', '') || 'home';

  // defensive redirects
  if (hash === 'companion') {
    if (!STATE.apiKey && STATE.aiMode !== 'shared') {
      navigate('key');
      return;
    }
    if (!STATE.book) {
      navigate('search');
      return;
    }
  }
  if (hash === 'search' && !STATE.apiKey && STATE.aiMode !== 'shared') {
    navigate('key');
    return;
  }
  var target = SCREENS.includes(hash) ? hash : 'home';
  showScreen(target);
  if (target === 'shelf') renderShelf();
  if (target === 'preferences') loadPreferencesScreen();
  if (target === 'search') updateSearchHeading();
  if (target === 'book-detail') loadBookDetailScreen();
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
  var queue = getOfflineQueue();
  // Shared-pool users have no apiKey but can still send via the free tier.
  if (!queue.length || !STATE.apiKey && STATE.aiMode !== 'shared') return Promise.resolve();
  // Items queued for a different book than the one currently open are kept
  // for a later visit instead of being dropped.
  var matching = [];
  var remaining = [];
  for (var qi = 0; qi < queue.length; qi++) {
    var item = queue[qi];
    if (item.book && STATE.book && item.book.title === STATE.book.title) matching.push(item);else remaining.push(item);
  }
  if (!matching.length) return Promise.resolve();
  showToolbarMsg("You're back online — sending your saved message…");
  // Drop the display-only placeholders; the real bubbles render below as
  // each queued message is actually sent.
  var log = document.getElementById('chat-log');
  if (log) {
    var pending = log.querySelectorAll('.pending-offline');
    for (var pi = 0; pi < pending.length; pi++) log.removeChild(pending[pi]);
  }
  var chain = Promise.resolve();
  function sendItem(it) {
    chain = chain.then(function () {
      STATE.messages.push({
        role: 'user',
        content: it.text
      });
      appendBubble('user', it.text);
      STATE.lastUserText = it.text;
      return callAI().then(function (reply) {
        STATE.messages.push({
          role: 'assistant',
          content: reply
        });
        var el = appendBubble('companion', reply);
        scrollToMessage(el);
        saveCurrentConversation();
      }).catch(function (err) {
        appendError(err);
      });
    });
  }
  for (var mi = 0; mi < matching.length; mi++) sendItem(matching[mi]);
  return chain.then(function () {
    if (remaining.length) localStorage.setItem('pc_offline_queue', JSON.stringify(remaining));else clearOfflineQueue();
  });
}
function bookKey(book) {
  // Full title+author, no truncation — the old 40-char slice collided for
  // long-titled series volumes (e.g. two long subtitles sharing a prefix),
  // silently merging their conversations/passages/status.
  return btoa(encodeURIComponent(book.title + '||' + book.author)).replace(/=/g, '');
}
// Pre-v0.41 key: truncated to the first 40 chars. Retained ONLY so a one-time
// migration can move existing users' data onto the collision-free key above.
// For any book whose title+author is <= 40 chars this returns the same value
// as bookKey(), so those (the vast majority) need no migration at all.
function bookKeyLegacy(book) {
  return btoa(encodeURIComponent((book.title + '||' + book.author).slice(0, 40))).replace(/=/g, '');
}
// One-time, idempotent migration. Driven by the shelf + last-opened book, the
// only places we hold full book objects (the storage keys themselves aren't
// reversible to a full title). Moves durable per-book data from the legacy key
// to the new key for long-titled books; short-titled books are untouched.
function migrateBookKeys() {
  try {
    if (localStorage.getItem('pc_bookkey_migrated_v1')) return;
    var prefixes = ['pc_status_', 'pc_lang_', 'pc_companion_lang_override_', 'pc_convs_', 'pc_passages_', 'pc_notes_', 'pc_progress_'];
    var books = [];
    try {
      var shelf = JSON.parse(localStorage.getItem('pc_shelf_books') || '[]');
      for (var i = 0; i < shelf.length; i++) books.push(shelf[i]);
    } catch (e) {}
    try {
      var last = JSON.parse(localStorage.getItem('pc_last_book') || 'null');
      if (last) books.push(last);
    } catch (e) {}
    for (var b = 0; b < books.length; b++) {
      var book = books[b];
      if (!book || !book.title) continue;
      var oldK = bookKeyLegacy(book);
      var newK = bookKey(book);
      if (oldK === newK) continue; // short title — key unchanged, nothing to move
      for (var p = 0; p < prefixes.length; p++) {
        var oldName = prefixes[p] + oldK;
        var newName = prefixes[p] + newK;
        var val = localStorage.getItem(oldName);
        if (val !== null && localStorage.getItem(newName) === null) {
          localStorage.setItem(newName, val);
          localStorage.removeItem(oldName);
        }
      }
    }
    localStorage.setItem('pc_bookkey_migrated_v1', '1');
  } catch (e) {}
}
function restoreCompanionUI(book) {
  document.getElementById('book-title-display').textContent = book.title;
  document.getElementById('book-author-display').textContent = book.author;
  document.getElementById('input-book-context').textContent = book.title + (book.author ? ' · ' + book.author : '');
  updateStatusDisplay();
  populateIcebreakers(book);
  renderHighlightsPanel();
  updatePassagesToolbarBtn();
  updateNotesToolbarBtn();
  updatePersonaPanelDisplay();
  // Load per-book language override; fall back to the global preference
  // (pc_companion_lang) instead of wiping it when no per-book override exists.
  var savedOverride = localStorage.getItem('pc_companion_lang_override_' + bookKey(book));
  STATE.companionLangOverride = savedOverride || localStorage.getItem('pc_companion_lang') || 'English';
  updateLanguagePanelDisplay();
  // Close all panels
  document.getElementById('highlights-panel').classList.remove('open');
  document.getElementById('passages-panel').classList.remove('open');
  document.getElementById('notes-panel').classList.remove('open');
  document.getElementById('language-panel').classList.remove('open');
  var _pp0 = document.getElementById('persona-panel');
  if (_pp0) _pp0.classList.remove('open');
  document.getElementById('export-panel').classList.remove('open');
  document.getElementById('highlights-toolbar-btn').classList.remove('active');
  document.getElementById('passages-toolbar-btn').classList.remove('active');
  document.getElementById('notes-toolbar-btn').classList.remove('active');
  document.getElementById('language-toolbar-btn').classList.remove('active');
  document.getElementById('export-toolbar-btn').classList.remove('active');
}

// ═══════════════════════════════════════════════════
//  GREETING
// ═══════════════════════════════════════════════════
function updateGreeting() {
  var h = new Date().getHours();
  var g = h < 5 ? t('js.greet_late') : h < 12 ? t('js.greet_morning') : h < 17 ? t('js.greet_afternoon') : h < 21 ? t('js.greet_evening') : t('js.greet_night');
  var el = document.querySelector('.hall-greeting');
  if (el) el.textContent = g;
}

// ═══════════════════════════════════════════════════
//  PROVIDER SELECTION
// ═══════════════════════════════════════════════════
// Single source of truth for the Anthropic model — update here only.
var ANTHROPIC_MODEL = 'claude-sonnet-4-6';
// Single source of truth for the Groq model — update here only.
// (llama-3.3-70b-versatile is decommissioned on Groq on 2026-08-16;
// openai/gpt-oss-120b is Groq's recommended replacement.)
var GROQ_MODEL = 'openai/gpt-oss-120b';
// True only when the user's own key should be billed: a key is saved AND the
// AI-mode toggle isn't set to the free shared tier. Every feature that can
// spend the user's key must branch on this, not on STATE.apiKey alone.
function byokActive() {
  return !!(STATE.apiKey && STATE.aiMode !== 'shared');
}
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
  touchSyncMeta('preferences');
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
  var err = document.getElementById('key-error');
  err.style.display = 'none';
  if (!val) {
    err.textContent = t('js.please_enter_key');
    err.style.display = 'block';
    return;
  }
  STATE.apiKey = val;
  localStorage.setItem('pc_api_key', val);
  STATE.aiMode = 'byok';
  localStorage.setItem('pc_ai_mode', 'byok');
  touchSyncMeta('preferences');
  document.getElementById('key-status-bar').style.display = 'block';
  navigate(localStorage.getItem('pc_preferences_set') ? 'search' : 'preferences');
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
          if (byokActive()) {
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
              model: ANTHROPIC_MODEL,
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
          return fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + STATE.apiKey, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: prompt
                }]
              }],
              generationConfig: {
                thinkingConfig: {
                  thinkingBudget: 0
                }
              }
            })
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
              model: GROQ_MODEL,
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
  batch.forEach(function (book, batchIdx) {
    var el = document.createElement('div');
    el.className = 'book-result';
    var th = book.thumb ? '<img class="book-cover-thumb" src="' + esc(book.thumb) + '" alt="" loading="lazy">' : '';
    var aboutId = 'about-' + Math.random().toString(36).substr(2, 9);
    var hasDesc = book.description && book.description.trim().length > 0;
    var descTrunc = hasDesc ? book.description.substring(0, 300) + (book.description.length > 300 ? '…' : '') : '';
    var aboutHtml = hasDesc ? '<button class="book-about-toggle" onclick="toggleBookAbout(\'' + aboutId + '\')">' + esc(t('js.about_this_book')) + '</button>' + '<div id="' + aboutId + '" class="book-about-text" style="display:none;padding:10px 16px;font-size:0.85rem;color:#555555;border-top:1px solid #e0e0e0;line-height:1.6">' + esc(descTrunc) + '</div>' : '';
    el.innerHTML = '<div class="book-result-inner">' + th + '<div class="book-result-text">' + '<div class="book-result-title">' + esc(book.title) + '</div>' + '<div class="book-result-author">' + esc(book.author) + '</div>' + '<div class="book-result-meta">' + (book.year ? book.year + ' · ' : '') + esc(book.source || 'Open Library') + '</div>' + '</div></div>' + aboutHtml;
    el.querySelector('.book-result-inner').addEventListener('click', function () {
      return showBookDetail(book);
    });
    if (anchor) container.insertBefore(el, anchor);else container.appendChild(el);
  });
}
function toggleBookAbout(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}
function searchFromRecommend(title, author) {
  navigate('search');
  var titleEl = document.getElementById('book-search-title');
  var authorEl = document.getElementById('book-search-author');
  if (titleEl) titleEl.value = title || '';
  if (authorEl) authorEl.value = author || '';
  searchBooks();
}
function searchBooks() {
  return _searchBooks.apply(this, arguments);
}
function _searchBooks() {
  _searchBooks = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var rawTitle, rawAuthor, raw, statusEl, resultsEl, isbnClean, res, data, key, b, book, el, th, searchTitle, searchAuthor, isNL, interp, gbParts, gbQuery, olQuery, hasNonLatin, _addShowMoreBtn, books, refineEl, _page, _olQuery, _gbQuery, _hasNonLatin, _seen, _t0, _t1;
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
          statusEl.textContent = t('js.looking_up_isbn');
          statusEl.className = 'status-msg';
          statusEl.style.display = 'block';
          _context4.p = 2;
          _context4.n = 4;
          return lookupISBN(isbnClean);
        case 4:
          book = _context4.v;
          if (book) {
            statusEl.style.display = 'none';
            el = document.createElement('div');
            el.className = 'book-result';
            th = book.thumb ? '<img class="book-cover-thumb" src="' + esc(book.thumb) + '" alt="" loading="lazy">' : '';
            el.innerHTML = '<div class="book-result-inner">' + th + '<div class="book-result-text"><div class="book-result-title">' + esc(book.title) + '</div><div class="book-result-author">' + esc(book.author) + '</div><div class="book-result-meta">' + (book.year || '') + (book.year ? ' · ' : '') + esc(book.source) + '</div></div></div>' + '<div class="book-result-actions"><button class="book-discover-btn">' + esc(t('js.is_this_for_me')) + '</button></div>';
            el.querySelector('.book-result-inner').addEventListener('click', function () {
              return selectBookWithAgeCheck(book);
            });
            el.querySelector('.book-discover-btn').addEventListener('click', function (e) {
              e.stopPropagation();
              discoverBookWithAgeCheck(book);
            });
            resultsEl.appendChild(el);
          } else {
            statusEl.textContent = t('js.isbn_not_found');
            statusEl.style.display = 'block';
            renderManualEntry(raw, resultsEl);
          }
          _context4.n = 6;
          break;
        case 5:
          _context4.p = 5;
          _t0 = _context4.v;
          statusEl.textContent = t('js.isbn_failed');
          statusEl.className = 'status-msg error';
          statusEl.style.display = 'block';
        case 6:
          return _context4.a(2);
        case 7:
          // Build search terms
          searchTitle = rawTitle, searchAuthor = rawAuthor;
          statusEl.textContent = t('js.searching');
          statusEl.className = 'status-msg';
          statusEl.style.display = 'block';

          // AI natural language interpretation (title field only, no author given)
          isNL = !rawAuthor && looksLikeNaturalLanguage(rawTitle);
          if (!(isNL && byokActive())) {
            _context4.n = 9;
            break;
          }
          statusEl.textContent = t('js.understanding_search');
          _context4.n = 8;
          return interpretSearchQuery(rawTitle);
        case 8:
          interp = _context4.v;
          searchTitle = interp.title;
          searchAuthor = interp.author || rawAuthor;
          statusEl.textContent = t('js.searching_for').replace('{title}', searchTitle) + (searchAuthor ? t('js.by_author').replace('{author}', searchAuthor) : '') + '…';
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
            moreBtn.textContent = t('js.show_more_results');
            moreBtn.style.marginBottom = '10px';
            moreBtn.onclick = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
              var more, fresh, _manualEntry, noMore, _t9;
              return _regenerator().w(function (_context3) {
                while (1) switch (_context3.p = _context3.n) {
                  case 0:
                    moreBtn.textContent = t('js.loading');
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
                    return fetchOpenLibrary(_olQuery, _page * 6 + 6, 0);
                  case 4:
                    more = _context3.v;
                  case 5:
                    fresh = more.filter(function (b) {
                      var k = b.title.toLowerCase() + '||' + b.author.toLowerCase();
                      if (_seen[k]) return false;
                      _seen[k] = 1;
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
                      noMore.textContent = t('js.no_more_results');
                      if (_manualEntry) resultsEl.insertBefore(noMore, _manualEntry);else resultsEl.appendChild(noMore);
                    }
                    _context3.n = 7;
                    break;
                  case 6:
                    _context3.p = 6;
                    _t9 = _context3.v;
                    moreBtn.textContent = t('js.show_more_results');
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
          statusEl.textContent = t('js.searching_google');
          statusEl.style.display = 'block';
          _context4.n = 11;
          return fetchGoogleBooksWithFallback(raw, gbQuery);
        case 11:
          books = _context4.v;
          _context4.n = 19;
          break;
        case 12:
          _context4.n = 13;
          return fetchOpenLibrary(olQuery, 10, 0);
        case 13:
          books = _context4.v;
          if (!(!books.length && searchTitle && searchAuthor)) {
            _context4.n = 15;
            break;
          }
          statusEl.textContent = t('js.trying_title_only');
          statusEl.style.display = 'block';
          _context4.n = 14;
          return fetchOpenLibrary(searchTitle, 10, 0);
        case 14:
          books = _context4.v;
        case 15:
          if (books.length) {
            _context4.n = 17;
            break;
          }
          statusEl.textContent = t('js.trying_google');
          statusEl.style.display = 'block';
          _context4.n = 16;
          return fetchGoogleBooks(gbQuery, 8, 0);
        case 16:
          books = _context4.v;
        case 17:
          if (!(!books.length && searchTitle && searchAuthor)) {
            _context4.n = 19;
            break;
          }
          _context4.n = 18;
          return fetchGoogleBooks('intitle:' + searchTitle, 8, 0);
        case 18:
          books = _context4.v;
        case 19:
          statusEl.style.display = 'none';
          if (books.length) {
            _context4.n = 20;
            break;
          }
          statusEl.textContent = t('js.no_results');
          statusEl.style.display = 'block';
          renderManualEntry(searchTitle, resultsEl);
          return _context4.a(2);
        case 20:
          // Author-only refine prompt
          if (!searchTitle && searchAuthor) {
            refineEl = document.createElement('p');
            refineEl.style.cssText = 'font-size:0.85rem;color:#777777;margin-bottom:12px;font-style:italic';
            refineEl.textContent = t('js.showing_books_by').replace('{author}', searchAuthor);
            resultsEl.appendChild(refineEl);
          }
          renderBookBatch(books.slice(0, 6), resultsEl, null);

          // Pagination state
          _page = 1;
          _olQuery = olQuery, _gbQuery = gbQuery, _hasNonLatin = hasNonLatin;
          _seen = {};
          books.forEach(function (b) {
            _seen[b.title.toLowerCase() + '||' + b.author.toLowerCase()] = 1;
          });
          if (books.length >= 6) _addShowMoreBtn();
          renderManualEntry(searchTitle, resultsEl);
          _context4.n = 22;
          break;
        case 21:
          _context4.p = 21;
          _t1 = _context4.v;
          statusEl.textContent = t('js.search_failed');
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
          return fetch('https://openlibrary.org/search.json?q=' + encodeURIComponent(q) + '&limit=' + limit + '&offset=' + offset + '&fields=key,title,author_name,first_publish_year,cover_i,language');
        case 1:
          res = _context5.v;
          _context5.n = 2;
          return res.json();
        case 2:
          data = _context5.v;
          seen = {};
          (data.docs || []).forEach(function (d) {
            var title = d.title || 'Unknown title',
              author = (d.author_name || ['Unknown author'])[0];
            var k = title.toLowerCase() + '||' + author.toLowerCase(),
              year = d.first_publish_year || 9999;
            var olid = d.cover_i ? 'https://covers.openlibrary.org/b/id/' + d.cover_i + '-S.jpg' : '';
            if (!seen[k] || year < seen[k].year) seen[k] = {
              title: title,
              author: author,
              year: d.first_publish_year || '',
              key: d.key || '',
              source: 'Open Library',
              thumb: olid
            };
          });
          results = Object.keys(seen).map(function (k) {
            return seen[k];
          }); // Sort: exact title matches first, then by year
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
// ISBN lookup. Google Books first, Open Library second.
//
// This used to query Open Library ALONE, which is why recent titles came back
// "ISBN not found" even though the same book was findable by title — Open
// Library's ISBN coverage of new editions is much thinner than Google Books'.
// Going through /api/books also means the authenticated key (no anonymous
// quota) and richer records: categories (which the age gate reads), the
// description, and page count, none of which the Open Library path returns.
// Resolves to a book object, or null when neither source has it.
function lookupISBN(isbn) {
  return fetchGoogleBooks('isbn:' + isbn, 5, 0).then(function (books) {
    if (books && books.length) return books[0];
    return fetchOpenLibraryISBN(isbn);
  })['catch'](function () {
    return fetchOpenLibraryISBN(isbn);
  });
}
function fetchOpenLibraryISBN(isbn) {
  var url = 'https://openlibrary.org/api/books?bibkeys=ISBN:' + isbn + '&format=json&jscmd=data';
  return fetch(url).then(function (r) {
    return r.json();
  }).then(function (data) {
    var b = data && data['ISBN:' + isbn];
    if (!b) return null;
    return {
      title: b.title || t('js.unknown_title'),
      author: (b.authors || [{
        name: t('js.unknown_author')
      }])[0].name,
      year: b.publish_date ? b.publish_date.slice(-4) : '',
      key: '',
      source: 'Open Library (ISBN)',
      thumb: b.cover ? b.cover.small || '' : '',
      // Open Library gives us no categories, so the age gate cannot judge
      // these; treated as unclassified rather than as safe.
      cats: '',
      description: '',
      pageCount: b.number_of_pages || 0
    };
  })['catch'](function () {
    return null;
  });
}
function fetchGoogleBooksWithFallback(bareQuery, intitleQuery) {
  return fetchGoogleBooks(bareQuery, 8, 0).then(function (books) {
    if (books.length) return books;
    return fetchGoogleBooks(intitleQuery, 8, 0);
  });
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
      seenOrder,
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
          seen = {};
          seenOrder = [];
          (data.items || []).forEach(function (item) {
            var info = item.volumeInfo || {},
              title = info.title || 'Unknown title',
              author = (info.authors || ['Unknown author'])[0];
            var k = title.toLowerCase() + '||' + author.toLowerCase();
            var thumb = info.imageLinks && info.imageLinks.smallThumbnail ? info.imageLinks.smallThumbnail : info.imageLinks && info.imageLinks.thumbnail ? info.imageLinks.thumbnail : '';
            if (thumb) thumb = thumb.replace('http://', 'https://');
            var cats = (info.categories || []).join(' ').toLowerCase();
            if (!seen[k]) {
              var langCode = info.language || 'en';
              var langName = LANG_CODE_TO_NAME[langCode] || 'English';
              seen[k] = {
                title: title,
                author: author,
                year: info.publishedDate ? info.publishedDate.slice(0, 4) : '',
                key: item.id || '',
                source: 'Google Books',
                lang: langCode,
                language: langName,
                thumb: thumb,
                cats: cats,
                pageCount: info.pageCount || 0,
                description: info.description || ''
              };
              seenOrder.push(k);
            }
          });
          return _context6.a(2, seenOrder.map(function (k) {
            return seen[k];
          }).slice(0, 6));
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
  var langOptions = '<option value="">' + esc(t('js.select_language')) + '</option>';
  Object.keys(LANG_NAME_TO_CODE).forEach(function (name) {
    // Language names have their own table entries where we have them; fall
    // back to the English name for the long tail.
    var lk = 'common.' + name.toLowerCase().replace(/\s+/g, '_');
    langOptions += '<option value="' + LANG_NAME_TO_CODE[name] + '">' + esc(t(lk, name)) + '</option>';
  });
  var opt = '<span style="font-weight:normal;text-transform:none">' + esc(t('js.optional')) + '</span>';
  wrap.innerHTML = '<p style="font-size:0.85rem;color:#777777;margin-bottom:14px">' + esc(t('js.not_seeing_your_book')) + '</p>' + '<div class="field"><label>' + esc(t('js.title')) + '</label><input type="text" id="manual-title" /></div>' + '<div class="field"><label>' + esc(t('js.author')) + ' ' + opt + '</label><input type="text" id="manual-author" placeholder="' + esc(t('js.ph_author_name')) + '" /></div>' + '<div class="field"><label>' + esc(t('js.language')) + ' ' + opt + '</label><select id="manual-language">' + langOptions + '</select></div>' + '<div class="field"><label>' + esc(t('js.year')) + ' ' + opt + '</label><input type="text" id="manual-year" placeholder="' + esc(t('js.ph_year_example')) + '" /></div>' + '<button class="btn btn-primary" onclick="lookupManualBook()">' + esc(t('js.find_this_book')) + '</button>';
  container.appendChild(wrap);
  var ti = document.getElementById('manual-title');
  if (ti) ti.value = prefill || '';
}
function lookupManualBook() {
  var title = (document.getElementById('manual-title') || {}).value || '';
  var author = (document.getElementById('manual-author') || {}).value || '';
  var lang = (document.getElementById('manual-language') || {}).value || '';
  var year = (document.getElementById('manual-year') || {}).value || '';
  if (!title.trim()) return;
  var query = title.trim();
  if (author.trim()) query += ' ' + author.trim();
  fetch('/api/books?q=' + encodeURIComponent(query) + (lang ? '&langRestrict=' + lang : '')).then(function (res) {
    return res.json();
  }).then(function (data) {
    var book = null;
    if (data && data.items && data.items[0]) {
      var item = data.items[0];
      var langCode = lang || item.volumeInfo.language || 'en';
      book = buildBookFromGoogleItem(item, LANG_CODE_TO_NAME[langCode] || item.volumeInfo.language || 'English', langCode);
    } else {
      book = {
        title: title.trim(),
        author: author.trim() || 'Unknown author',
        year: year.trim() || '',
        key: ''
      };
    }
    showBookDetail(book);
  }).catch(function () {
    var book = {
      title: title.trim(),
      author: author.trim() || 'Unknown author',
      year: year.trim() || '',
      key: ''
    };
    showBookDetail(book);
  });
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
  if (STATE.aiMode) {
    handleRoute();
  } else {
    navigate('onboarding');
  }
}
function chooseAIMode(mode) {
  STATE.aiMode = mode;
  localStorage.setItem('pc_ai_mode', mode);
  touchSyncMeta('preferences');
  if (mode === 'byok') {
    navigate('key');
  } else if (localStorage.getItem('pc_preferences_set')) {
    navigate('home');
  } else {
    navigate('preferences');
  }
}
function switchAIMode(mode) {
  STATE.aiMode = mode;
  localStorage.setItem('pc_ai_mode', mode);
  touchSyncMeta('preferences');
  updateAIModeUI();
}
function updateAIModeUI() {
  var sharedBtn = document.getElementById('settings-mode-shared');
  var byokBtn = document.getElementById('settings-mode-byok');
  var note = document.getElementById('settings-ai-mode-note');
  if (!sharedBtn || !byokBtn) return;
  var providerSection = document.getElementById('prefs-provider-section');
  if (STATE.aiMode === 'shared') {
    sharedBtn.classList.add('active');
    byokBtn.classList.remove('active');
    if (note) note.textContent = t('js.free_tier_note');
    if (providerSection) providerSection.style.display = 'none';
  } else {
    sharedBtn.classList.remove('active');
    byokBtn.classList.add('active');
    if (note) note.textContent = STATE.apiKey ? 'Using your own API key.' : 'No key saved yet. Set one below.';
    if (providerSection) providerSection.style.display = 'block';
  }
}
function isAdultBook(book) {
  var ADULT_TAGS = ['erotica', 'erotic', 'adult fiction', 'explicit', 'mature', 'sexuality', 'pornography'];
  var cats = (book.cats || '').toLowerCase();
  return ADULT_TAGS.some(function (t) {
    return cats.includes(t);
  });
}
var _pendingBookForAgeGate = null;
var _pendingDiscoverMode = false;
function selectBookWithAgeCheck(_x4) {
  return _selectBookWithAgeCheck.apply(this, arguments);
}
function _selectBookWithAgeCheck() {
  _selectBookWithAgeCheck = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(book) {
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          _pendingDiscoverMode = false;
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
function discoverBookWithAgeCheck(book) {
  _pendingDiscoverMode = true;
  if (isAdultBook(book)) {
    _pendingBookForAgeGate = book;
    document.getElementById('age-gate-book-name').textContent = '"' + book.title + '"';
    navigate('age-gate');
  } else {
    discoverBook(book);
  }
}
function discoverBook(book) {
  STATE.companionMode = 'discover';
  STATE.book = book;
  STATE.readingStatus = 'considering';
  STATE.messages = [];
  STATE.currentConvId = 'conv_' + Date.now();
  STATE.currentConvName = null;
  var dl = detectLanguage(book);
  STATE.detectedLang = dl;
  STATE.chatLanguage = dl ? 'native' : localStorage.getItem('pc_lang_' + bookKey(book)) || 'english';
  fetchAndCacheSubjects(book).then(function () {
    navigate('companion');
    launchCompanion(book);
  });
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
          if (_pendingDiscoverMode) {
            discoverBook(_pendingBookForAgeGate);
          } else {
            _context8.n = 1;
            return selectBook(_pendingBookForAgeGate);
          }
        case 1:
          _pendingBookForAgeGate = null;
          _pendingDiscoverMode = false;
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
// The status screen rebuilds its buttons in JS, which throws away the
// data-i18n attributes in the markup — so the options must come from the
// string table, not from STATUS_OPTIONS_EN. The English array is kept only
// as the source for the AI translation path (companion languages the table
// does not cover) and as the ultimate fallback.
var STATUS_OPTION_KEYS = {
  considering: ['status.thinking_about_reading', 'status.help_me_decide'],
  started: ['status.just_started', 'status.i_m_in_the'],
  midway: ['status.halfway_through', 'status.getting_into_it'],
  finished: ['status.just_finished', 'status.ready_to_talk_about'],
  revisiting: ['status.read_before_revisiting', 'status.coming_back_with_fresh']
};
function statusOptionsFromTable() {
  var out = [];
  for (var i = 0; i < STATUS_OPTIONS_EN.length; i++) {
    var o = STATUS_OPTIONS_EN[i];
    var keys = STATUS_OPTION_KEYS[o.value];
    out.push({
      value: o.value,
      label: keys ? t(keys[0], o.label) : o.label,
      sub: keys ? t(keys[1], o.sub) : o.sub
    });
  }
  return out;
}
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
          // Effective companion language: the user's explicit choice (per-book
          // override or global preference) wins over the auto-detected one, so
          // the status options match what the companion will speak.
          lang = getCompanionLang();
          chatLang = STATE.chatLanguage;
          options = statusOptionsFromTable();
          // The table already covers the interface language, so only reach for
          // a live AI translation when the interface is English but the
          // companion speaks something else — i.e. a language the table has no
          // entry for. When the interface is already translated, the table
          // wins and no call is made.
          if (!(lang && lang !== 'English' && byokActive() && UI_LANG === 'en')) {
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
              model: ANTHROPIC_MODEL,
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
          return fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + STATE.apiKey, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: prompt
                }]
              }],
              generationConfig: {
                thinkingConfig: {
                  thinkingBudget: 0
                }
              }
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
              model: GROQ_MODEL,
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
            // "Considering" is offered separately via "Find out if it's for me";
            // omit it here so it isn't a duplicate on the reading-status screen
            if (opt.value === 'considering') return;
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
          if (h1) h1.textContent = lang || /[\u0080-\uffff]/.test(book.title) ? book.title : 'Where are you with "' + book.title + '"?';
        case 17:
          return _context9.a(2);
      }
    }, _callee9, null, [[1, 14]]);
  }));
  return _renderStatusScreen.apply(this, arguments);
}
function showBookDetail(book) {
  STATE.book = book;
  showScreen('book-detail');
  loadBookDetailScreen();
}
function loadBookDetailScreen() {
  var book = STATE.book;
  if (!book) return;
  var container = document.getElementById('book-detail-content');
  if (!container) return;
  var meta = book.year || book.pageCount ? book.year + (book.pageCount ? ' · ' + book.pageCount + ' pages' : '') : '';
  var desc = (book.description || '').replace(/<[^>]*>/g, '');
  var truncated = desc.length > 300 ? desc.substring(0, 300) + '…' : desc;
  var descHTML = truncated ? '<p class="book-detail-description">' + esc(truncated) + '</p>' : '<p class="book-detail-description" style="color:#aaaaaa;font-style:italic;">' + esc(t('js.no_description')) + '</p>';
  container.innerHTML = '<h1 class="book-detail-title">' + esc(book.title || t('js.untitled')) + '</h1>' + '<p class="book-detail-author">' + esc(book.author || t('js.unknown_author')) + '</p>' + (meta ? '<p class="book-detail-meta">' + esc(meta) + '</p>' : '') + descHTML + '<div class="book-detail-actions">' + '<button class="btn btn-primary" onclick="setReadingStatus(\'considering\')">' + esc(t('js.find_out_if_for_me')) + '</button>' + '<button class="btn" onclick="renderStatusScreen(STATE.book);navigate(\'status\')">' + esc(t('js.i_have_this_book')) + '</button>' + '<button class="btn" onclick="goBack()">' + esc(t('js.back_arrow')) + '</button>' + '</div>';
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
          STATE.companionMode = 'reading';
          STATE.messages = [];
          _context0.n = 1;
          return fetchAndCacheSubjects(book);
        case 1:
          // ensure lang field is persisted on book object (Bug Fix B)
          detectedLang = detectLanguage(book);
          if (detectedLang) book.detectedLang = detectedLang;
          localStorage.setItem('pc_last_book', JSON.stringify(book));
          bk = bookKey(book);
          // Load the effective companion language (per-book override, else the
          // global preference) up front so the status screen renders in it.
          STATE.companionLangOverride = localStorage.getItem('pc_companion_lang_override_' + bk) || localStorage.getItem('pc_companion_lang') || 'English';
          savedStatus = localStorage.getItem('pc_status_' + bk);
          savedLang = localStorage.getItem('pc_lang_' + bk);
          if (!savedStatus) {
            _context0.n = 3;
            break;
          }
          // returning book — always use native for detected non-English books
          STATE.readingStatus = savedStatus;
          STATE.detectedLang = detectedLang;
          STATE.chatLanguage = detectedLang ? 'native' : savedLang || 'english';
          if (detectedLang) {
            localStorage.setItem('pc_lang_' + bk, 'native');
            touchSyncMeta('status');
          }
          // restore thinking phrases if native language was chosen
          if (!(STATE.chatLanguage === 'native' && detectedLang)) {
            _context0.n = 2;
            break;
          }
          _context0.n = 2;
          return generateThinkingPhrases(detectedLang);
        case 2:
          launchCompanion(book);
          _context0.n = 4;
          break;
        case 3:
          // new book — pre-set language so status screen renders in the right language
          STATE.detectedLang = detectedLang;
          if (detectedLang) STATE.chatLanguage = 'native';
          renderStatusScreen(book);
          navigate('status');
        case 4:
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
          touchSyncMeta('status');

          // detect if non-English
          lang = detectLanguage(STATE.book);
          STATE.detectedLang = lang;
          bk = bookKey(STATE.book);
          savedLang = localStorage.getItem('pc_lang_' + bk);
          if (lang && !savedLang) {
            // auto-set to native; user can change via language screen if they want
            STATE.chatLanguage = 'native';
            localStorage.setItem('pc_lang_' + bk, 'native');
            touchSyncMeta('status');
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
          touchSyncMeta('status');
          // await thinking phrases before launching so they're ready for first message
          if (!(choice === 'native' && STATE.detectedLang)) {
            _context10.n = 1;
            break;
          }
          _context10.n = 1;
          return generateThinkingPhrases(STATE.detectedLang);
        case 1:
          // Clear cached ice breakers so they regenerate in the chosen language
          cacheKey = 'pc_icebreakers_' + bookKey(STATE.book) + '_' + (STATE.readingStatus || '') + '_' + (STATE.chatLanguage || 'english') + '_' + (STATE.detectedLang || '') + '_' + (STATE.companionLangOverride || '');
          localStorage.removeItem(cacheKey);
          launchCompanion(STATE.book);
        case 2:
          return _context10.a(2);
      }
    }, _callee10);
  }));
  return _setLanguage.apply(this, arguments);
}
var KNOWN_LANGUAGE_NAMES = {
  'French': 1,
  'German': 1,
  'Spanish': 1,
  'Italian': 1,
  'Japanese': 1,
  'Korean': 1,
  'Traditional Chinese': 1,
  'Simplified Chinese': 1,
  'Portuguese': 1,
  'Arabic': 1,
  'Russian': 1,
  'Dutch': 1,
  'Polish': 1,
  'Turkish': 1,
  'Hindi': 1,
  'Thai': 1,
  'Vietnamese': 1
};
// Traditional-only and Simplified-only Chinese character sets (for script detection)
var TRAD_CHARS = /[並來個們備傳傷傾僅價儀億儉儘償優兌兒內兩冊凍凱別劃劇劉劍勁動務勝勞勢勳勵區協厲參叢問嘆嚇嚴國圍園圓圖團堅報場塊壓壘壞壟壯壺學實寫對廁廟廠廢廣廳彈從愛慮慶憂應懷懸戀戰戶採撥擁擇擊擔據攝數斷時書會東條業構樂樓標樣橋機檢權歡歲歷歸殺殼氣滅漢潔為煩熱燈燒營燭爺牆獎獨獸獻現瑪環產畢異當瘋療發盜監盤眾礙礦禮稅種稱積窩競筆節範築簡籃籌籠糧紀紅納純紙級紛細終組結給統絲經綠維網緊線編緻縣縮縱績繞繩繪繼續纖罈罷義習聖聞聯聰聲聶職聽腦膚膽臘臟與興舉舊艱艷萬蓋薦藍藥蘇蘭處號蝦蟲蠅術衛衝補裝製複褲見規視親覺觀觸訂計討記訪設許訴評詞詠試詩話該詳認語誠誤說誰課調談請論諸諾謀講謝證識譜譯議護讀讓貓買賞賠賢賣賤賬賭賴購贈贊贏趙趨跡踴躍車軌軍軒軟軸較載輔輕輛輝輩輪輸轉轎辦辭農這連進運過達遠適選還邊鄉鄭鄰釀釋針釣鈍鈔鈕鈣鈴鉛鉤銀銅銘銳鋒鋪鋸鋼錄錘錢錦錯鍋鍛鍵鎖鎮鏡鐘鐵鑄鑒長門閃閉開閏閑間閘閣閥閱闆闊闖關闡陘陣陰陳陸陽隊階際隨險隱隴隻雖雙雛雜雞離難雲電霧靈靜韋韌韓韻響頁頂頃項順須頌預頑頒頓頗領頭頰頸頻顆題額顏願顛類顧顫顯風飄飛飢飯飲飼飽飾餃餅養餌餓館餵饅馬馮馳馴駁駐駕駛駝駱騎騙騰騾驅驕驗驚驟髒體髮鬆鬚鬥鬧鬱魚魯鮮鯉鯨鯽鳥鳳鳴鴉鴨鴻鴿鵑鵝鶯鶴鷹鹽麗麥麵麼黃點黨黴鼴齊齋齒齡龍龐龜]/g;
var SIMP_CHARS = /[万与业丛东丝两严个为丽举么义乐习乡书买云产亲亿仅从仪们价众优会传伤体俭倾偿儿兑党兰关兴养兽内册写军农冯冲冻凤凯击刘别剑剧办务动励劲劳势勋区协卖卫厂厅历厉压厕县参双发只号叹吓听咏响喂团园围国图圆圣场坏块坚坛垄垒墙壮声壳壶处备复头奖学实对尽岁并广庆应庙庞废开异弹归当录忧怀恋悬惊愿战户护报担拥拨择据摄数斋断旧时显术机杀杂权条来松构标样桥检楼欢毕气汉洁灭灯灵点烛烦烧热爱爷独猫献玛环现电疗疯盐监盖盗盘矿碍礼离种积称税窝竞笔笼筑筹简篮类粮紧红纤级纪纯纳纵纷纸线组细终经结绕绘给统继绩续绳维绿编缩网罢聂职联聪肤胆胜脏脑腊腾艰艳节苏荐药莺营蓝虑虫虽虾蝇补装裤见观规视觉触计订认讨让议记讲许论设访证评识诉词译试诗诚话该详语误说请诸诺读课谁调谈谋谢谱贤账购贱赌赏赔赖赞赠赢赵趋跃踊车轨轩转轮软轴轻载轿较辅辆辈辉输辞边达过运还这进远连迹适选邻郁郑酿释鉴针钓钙钝钞钟钢钩钮钱铁铃铅铜铭银铸铺锁锅锋锐错锤锦键锯锻镇镜长门闪闭问闯闰闲间闸闹闻阀阁阅阐阔队阳阴阵阶际陆陇陈陉险随隐难雏雾霉静韦韧韩韵页顶顷项顺须顽顾顿颁颂预领颇颈颊频颗题颜额颠颤风飘飞饥饭饮饰饱饲饵饺饼饿馆馒马驯驰驱驳驶驻驼驾骄骆验骑骗骡骤鱼鲁鲜鲤鲫鲸鸟鸡鸣鸦鸭鸽鸿鹃鹅鹤鹰麦黄鼹齐齿龄龙龟]/g;
function detectLanguage(book) {
  var lang = book.lang || '';
  var titleAndAuthor = (book.title || '') + ' ' + (book.author || '');
  var description = book.description || '';

  // ---- JAPANESE / KOREAN: detect before Chinese (kanji range overlaps Chinese) ----
  if (/^ja/i.test(lang) || book.language === 'Japanese' || /[\u3040-\u30ff]/.test(titleAndAuthor)) {
    return 'Japanese';
  }
  if (/^ko/i.test(lang) || book.language === 'Korean' || /[\uac00-\ud7af]/.test(titleAndAuthor)) {
    return 'Korean';
  }

  // ---- CHINESE: Traditional vs Simplified decided by character evidence ----
  var langIsZh = /^zh/i.test(lang);
  var languageIsZh = book.language === 'Chinese' || book.language === 'Traditional Chinese' || book.language === 'Simplified Chinese';
  var titleHasCJK = /[\u4e00-\u9fff]/.test(titleAndAuthor);
  if (langIsZh || languageIsZh || titleHasCJK) {
    // Count script-specific characters across title, author and description.
    // Character evidence is more reliable than Google Books' language code,
    // which frequently mislabels Traditional books as Simplified.
    var combined = titleAndAuthor + ' ' + description;
    var tradMatches = combined.match(TRAD_CHARS);
    var simpMatches = combined.match(SIMP_CHARS);
    var tradCount = tradMatches ? tradMatches.length : 0;
    var simpCount = simpMatches ? simpMatches.length : 0;
    if (tradCount > simpCount) return 'Traditional Chinese';
    if (simpCount > tradCount) return 'Simplified Chinese';

    // No decisive character evidence — fall back to the language code
    if (/^zh[-_]?(CN|SG|Hans)/i.test(lang)) return 'Simplified Chinese';
    if (/^zh[-_]?(TW|HK|MO|Hant)/i.test(lang)) return 'Traditional Chinese';
    if (book.language === 'Simplified Chinese') return 'Simplified Chinese';
    if (book.language === 'Traditional Chinese') return 'Traditional Chinese';

    // Fully ambiguous — default to Traditional Chinese
    return 'Traditional Chinese';
  }

  // ---- OTHER LANGUAGES ----
  if (book.language && KNOWN_LANGUAGE_NAMES[book.language]) {
    return book.language;
  }
  if (/[\u0600-\u06ff]/.test(titleAndAuthor)) return 'Arabic';
  if (/[\u0400-\u04ff]/.test(titleAndAuthor)) return 'Russian';
  if (lang && lang !== 'en') {
    return LANG_CODE_TO_NAME[lang] || null;
  }
  return null;
}
function getCompanionLang() {
  // The companion speaks the user's chosen language, defaulting to English.
  // It no longer auto-follows the book's detected language.
  return STATE.companionLangOverride || 'English';
}
// The live message buffer belongs to exactly one book. Two paths reach a chat
// without passing through selectBook/discoverBook — book detail → status, and
// shelf → Update status — and they used to leave the previous book's
// conversation in STATE.messages. It was then sent to the model as history
// under the NEW book's system prompt, and saved into the new book's stored
// conversation. Guarding at this chokepoint, rather than in each caller, means
// a future entry point cannot quietly reintroduce the same leak.
function ensureMessagesBelongTo(book) {
  if (!book) return;
  var key = bookKey(book);
  if (STATE.messagesBookKey !== key && STATE.messages && STATE.messages.length) {
    STATE.messages = [];
    STATE.currentConvId = null;
    STATE.currentConvName = null;
  }
  STATE.messagesBookKey = key;
}
function launchCompanion(book) {
  ensureMessagesBelongTo(book);
  // assign conversation ID if not set
  if (!STATE.currentConvId) {
    STATE.currentConvId = 'conv_' + Date.now();
    STATE.currentConvName = null;
  }
  // add to shelf (skip in discover mode — user hasn't decided to read it yet)
  if (STATE.companionMode !== 'discover' && typeof addBookToShelf === 'function') addBookToShelf(book);
  // Persist as the active book so a page reload restores THIS book rather than
  // a stale pc_last_book (e.g. when entering a chat from the shelf).
  if (STATE.companionMode !== 'discover') {
    try {
      if (STATE.detectedLang && !book.detectedLang) book.detectedLang = STATE.detectedLang;
      localStorage.setItem('pc_last_book', JSON.stringify(book));
    } catch (e) {}
  }
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
  updatePersonaPanelDisplay();
  if (typeof renderDriveStatus === 'function') renderDriveStatus();
  populateIcebreakers(book);
  // Load per-book language override; fall back to the global preference
  // (pc_companion_lang) instead of wiping it when no per-book override exists.
  var savedOverride = localStorage.getItem('pc_companion_lang_override_' + bookKey(book));
  STATE.companionLangOverride = savedOverride || localStorage.getItem('pc_companion_lang') || 'English';
  updateLanguagePanelDisplay();
  // Close all panels
  document.getElementById('highlights-panel').classList.remove('open');
  document.getElementById('passages-panel').classList.remove('open');
  document.getElementById('notes-panel').classList.remove('open');
  document.getElementById('language-panel').classList.remove('open');
  var _pp0 = document.getElementById('persona-panel');
  if (_pp0) _pp0.classList.remove('open');
  document.getElementById('export-panel').classList.remove('open');
  document.getElementById('highlights-toolbar-btn').classList.remove('active');
  document.getElementById('passages-toolbar-btn').classList.remove('active');
  document.getElementById('notes-toolbar-btn').classList.remove('active');
  document.getElementById('language-toolbar-btn').classList.remove('active');
  document.getElementById('export-toolbar-btn').classList.remove('active');
  navigate('companion');
  // Drain messages queued offline for this book — the 'online' event only
  // helps if the tab stayed open; e-readers usually reopen the app later.
  // Discover chats skip this: queued messages belong to reading conversations.
  if (STATE.companionMode !== 'discover' && navigator.onLine) processOfflineQueue();
}
function updateStatusDisplay() {
  var labels = {
    considering: t('js.status_considering_long'),
    started: t('js.status_started'),
    midway: t('js.status_midway'),
    finished: t('js.status_finished_long'),
    revisiting: t('js.status_revisiting')
  };
  var el = document.getElementById('book-status-display');
  var ctaEl = document.getElementById('discover-convert-bar');
  if (STATE.companionMode === 'discover') {
    if (el) el.textContent = t('js.is_this_for_me');
    if (ctaEl) ctaEl.style.display = 'block';
  } else {
    if (el && STATE.readingStatus && labels[STATE.readingStatus]) {
      el.textContent = labels[STATE.readingStatus];
    } else if (el) {
      el.textContent = '';
    }
    if (ctaEl) ctaEl.style.display = 'none';
  }
}

// ═══════════════════════════════════════════════════
//  DISCOVER → READING CONVERSION
// ═══════════════════════════════════════════════════
function startReadingFromDiscover() {
  if (!STATE.book) return;
  STATE.companionMode = 'reading';
  STATE.messages = [];
  STATE.currentConvId = null;
  STATE.currentConvName = null;
  var ctaEl = document.getElementById('discover-convert-bar');
  if (ctaEl) ctaEl.style.display = 'none';
  renderStatusScreen(STATE.book);
  navigate('status');
}

// ═══════════════════════════════════════════════════
//  LANGUAGE MAPS (used by manual entry + discover flows)
// ═══════════════════════════════════════════════════

var LANG_NAME_TO_CODE = {
  'French': 'fr',
  'German': 'de',
  'Spanish': 'es',
  'Italian': 'it',
  'Japanese': 'ja',
  'Korean': 'ko',
  'Traditional Chinese': 'zh-TW',
  'Simplified Chinese': 'zh-CN',
  'Portuguese': 'pt',
  'Arabic': 'ar',
  'Russian': 'ru',
  'Dutch': 'nl',
  'Polish': 'pl',
  'Turkish': 'tr',
  'Hindi': 'hi',
  'Thai': 'th',
  'Vietnamese': 'vi'
};
var LANG_CODE_TO_NAME = {
  'en': 'English',
  'fr': 'French',
  'de': 'German',
  'es': 'Spanish',
  'it': 'Italian',
  'ja': 'Japanese',
  'ko': 'Korean',
  'zh': 'Chinese',
  'zh-TW': 'Traditional Chinese',
  'zh-CN': 'Simplified Chinese',
  'pt': 'Portuguese',
  'ar': 'Arabic',
  'ru': 'Russian',
  'nl': 'Dutch',
  'pl': 'Polish',
  'tr': 'Turkish',
  'hi': 'Hindi',
  'th': 'Thai',
  'vi': 'Vietnamese'
};
function buildBookFromGoogleItem(item, lang, langCode) {
  if (!item) return null;
  var vi = item.volumeInfo || {};
  if (!vi.title) return null;
  var thumb = vi.imageLinks && vi.imageLinks.thumbnail ? vi.imageLinks.thumbnail.replace('http://', 'https://') : '';
  return {
    title: vi.title,
    author: vi.authors && vi.authors[0] ? vi.authors[0] : '',
    year: vi.publishedDate ? vi.publishedDate.substring(0, 4) : '',
    key: item.id || '',
    source: 'Google Books',
    thumb: thumb,
    pageCount: vi.pageCount || 0,
    lang: vi.language || langCode,
    language: lang,
    cats: (vi.categories || []).join(' ').toLowerCase(),
    description: vi.description || ''
  };
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
          // Shared tier keeps its static English phrases \u2014 and a keyless
          // BYOK call here would be doomed anyway.
          if (!byokActive()) {
            return _context11.a(2);
          }
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
              model: ANTHROPIC_MODEL,
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
          return fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + STATE.apiKey, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: prompt
                }]
              }],
              generationConfig: {
                thinkingConfig: {
                  thinkingBudget: 0
                }
              }
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
              model: GROQ_MODEL,
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
  statusEl.textContent = t('js.reading_clippings');
  statusEl.style.display = 'block';
  var reader = new FileReader();
  reader.onload = function (e) {
    var highlights = parseClippingsText(e.target.result);
    if (!highlights.length) {
      statusEl.textContent = t('js.no_highlights_file');
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
    statusEl.textContent = t('js.paste_clippings_first');
    statusEl.style.display = 'block';
    return;
  }
  statusEl.textContent = t('js.reading_clippings');
  statusEl.style.display = 'block';
  var highlights = parseClippingsText(text);
  if (!highlights.length) {
    statusEl.textContent = t('js.no_highlights_paste');
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
  var titles = {};
  var n = 0;
  for (var i = 0; i < h.length; i++) {
    var t = h[i].title;
    if (!Object.prototype.hasOwnProperty.call(titles, t)) {
      titles[t] = 1;
      n++;
    }
  }
  return n;
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
var STOP_WORDS = {
  'the': 1,
  'a': 1,
  'an': 1,
  'of': 1,
  'and': 1,
  'in': 1,
  'on': 1,
  'at': 1,
  'to': 1,
  'for': 1,
  'by': 1
};
function significantWords(str) {
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(function (w) {
    return w && !STOP_WORDS[w];
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
    btn.textContent = t('js.highlights') + ' (' + relevant.length + ')';
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
  document.getElementById('notes-panel').classList.remove('open');
  document.getElementById('notes-toolbar-btn').classList.remove('active');
  document.getElementById('export-panel').classList.remove('open');
  document.getElementById('export-toolbar-btn').classList.remove('active');
  var _pp = document.getElementById('persona-panel');
  var _pb = document.getElementById('persona-toolbar-btn');
  if (_pp) _pp.classList.remove('open');
  if (_pb) _pb.classList.remove('active');
  panel.classList.contains('open') ? btn.classList.add('active') : btn.classList.remove('active');
}

// ═══════════════════════════════════════════════════
//  ICE BREAKERS
// ═══════════════════════════════════════════════════
var DISCOVER_PROMPTS = {
  'English': ['What kinds of books have you loved lately?', 'What mood are you in for reading right now?', 'What draws you to this one?', 'What would make this perfect for you right now?'],
  'Traditional Chinese': ['你最近喜歡什麼類型的書？', '你現在的閱讀心情是什麼？', '這本書的哪些地方吸引了你？', '什麼會讓這本書現在特別適合你？'],
  'Simplified Chinese': ['你最近喜欢什么类型的书？', '你现在的阅读心情是什么？', '这本书的哪些地方吸引了你？', '什么会让这本书现在特别适合你？'],
  'Japanese': ['最近どんな本を楽しみましたか？', '今どんな気分で読みたいですか？', 'この本のどこに引かれましたか？', '今のあなたにとって最高の一冊とは？'],
  'Korean': ['요즘 어떤 책이 좋으셨나요?', '지금 어떤 기분으로 읽고 싶으세요?', '이 책의 어떤 점이 끝렸나요?', '지금 이 책이 답일 것 같은 이유는요?'],
  'French': ['Quels livres avez-vous aimés récemment ?', 'Quelle est votre humeur de lecture en ce moment ?', 'Qu’est-ce qui vous attire vers ce livre ?', 'Qu’est-ce qui le rendrait parfait pour vous maintenant ?'],
  'Spanish': ['¿Qué libros te han gustado últimamente?', '¿En qué estado de ánimo estás para leer ahora?', '¿Qué te atrae de este libro?', '¿Qué lo haría perfecto para ti ahora?'],
  'German': ['Welche Bücher haben Sie zuletzt geliebt?', 'In welcher Lesestimmung sind Sie gerade?', 'Was zieht Sie zu diesem Buch?', 'Was würde es jetzt perfekt für Sie machen?'],
  'Portuguese': ['Que livros você amou ultimamente?', 'Qual é seu humor de leitura agora?', 'O que te atrai neste livro?', 'O que o tornaria perfeito para você agora?']
};
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
          loadEl.textContent = t('js.finding_questions');
          list.appendChild(loadEl);
          cacheKey = 'pc_icebreakers_' + bookKey(book) + '_' + (STATE.readingStatus || '') + '_' + (STATE.chatLanguage || 'english') + '_' + (STATE.detectedLang || '') + '_' + (STATE.companionLangOverride || '');
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
            // Always fall back to static prompts so the screen is never empty
            // (AI icebreakers can fail for any provider — e.g. Gemini returning
            // non-JSON). English fallback is acceptable over a blank panel.
            prompts = getStaticPromptsByStatus(STATE.readingStatus);
          }
          renderIcebreakerButtons(prompts || [], list);
        case 9:
          return _context12.a(2);
      }
    }, _callee12, null, [[5, 7], [1, 3]]);
  }));
  return _populateIcebreakers.apply(this, arguments);
}
var STATIC_PROMPT_SETS = {
  'English': {
    considering: ["Why should I read this book?", "What's this book really about?", "What makes it worth reading?", "Tell me what to expect."],
    started: ["Let me share my first impressions.", "What should I watch for early on?", "Something already caught my attention.", "Where is this heading?"],
    midway: ["Something unexpected just happened.", "I have a theory about the ending.", "A part of this changed my mind.", "I can't put this down."],
    finished: ["I just finished it.", "The ending stayed with me.", "Something is still on my mind.", "What should I read next?"]
  },
  'Traditional Chinese': {
    considering: ["我為什麼該讀這本書？", "這本書到底在講什麼？", "它哪裡值得一讀？", "告訴我可以期待什麼。"],
    started: ["說說我最初的印象。", "開頭我該留意什麼？", "有些地方已經吸引了我。", "接下來會怎麼發展？"],
    midway: ["剛剛發生了意想不到的事。", "我對結局有個猜測。", "有一段改變了我的看法。", "我完全停不下來。"],
    finished: ["我剛剛讀完了。", "結局一直在我心頭。", "有些東西仍縈繞心中。", "接下來我該讀什麼？"]
  },
  'Simplified Chinese': {
    considering: ["我为什么该读这本书？", "这本书到底在讲什么？", "它哪里值得一读？", "告诉我可以期待什么。"],
    started: ["说说我最初的印象。", "开头我该留意什么？", "有些地方已经吸引了我。", "接下来会怎么发展？"],
    midway: ["刚刚发生了意想不到的事。", "我对结局有个猜测。", "有一段改变了我的看法。", "我完全停不下来。"],
    finished: ["我刚刚读完了。", "结局一直在我心头。", "有些东西仍萦绕心中。", "接下来我该读什么？"]
  },
  'Japanese': {
    considering: ["なぜこの本を読むべき？", "この本は結局何の話？", "どこが読む価値ある？", "何を期待できるか教えて。"],
    started: ["最初の印象を話したい。", "序盤で何に注目すべき？", "もう惹かれた部分がある。", "この先どう展開するの？"],
    midway: ["思いがけないことが起きた。", "結末について予想がある。", "ある部分で考えが変わった。", "どうしても止められない。"],
    finished: ["今読み終えたところ。", "結末が心に残っている。", "まだ心に引っかかっている。", "次は何を読めばいい？"]
  },
  'Korean': {
    considering: ["이 책을 왜 읽어야 할까요?", "이 책은 결국 무슨 내용인가요?", "어디가 읽을 만한가요?", "무엇을 기대하면 될지 알려줘요."],
    started: ["첫인상을 이야기하고 싶어요.", "초반에 무엇을 눈여겨볼까요?", "벌써 끌리는 부분이 있어요.", "앞으로 어떻게 전개되나요?"],
    midway: ["방금 예상치 못한 일이 일어났어요.", "결말에 대한 추측이 있어요.", "어떤 부분이 제 생각을 바꿨어요.", "도무지 손에서 놓을 수 없어요."],
    finished: ["방금 다 읽었어요.", "결말이 마음에 남아요.", "아직도 마음에 걸리는 게 있어요.", "다음엔 뭘 읽을까요?"]
  }
};
function getStaticPromptsByStatus(status) {
  var lang = getCompanionLang();
  var sets = STATIC_PROMPT_SETS[lang] || STATIC_PROMPT_SETS['English'];
  return (sets[status] || sets.considering).slice(0, 4);
}
function _icebreakerStrings(v) {
  if (!Array.isArray(v)) return null;
  var out = [];
  for (var i = 0; i < v.length; i++) {
    if (typeof v[i] === 'string' && v[i].trim()) out.push(v[i].trim());else if (v[i] && typeof v[i].text === 'string' && v[i].text.trim()) out.push(v[i].text.trim());
  }
  return out.length ? out : null;
}
// Parse model output into a list of prompt strings, tolerating markdown
// fences, smart quotes, surrounding prose, and numbered/bulleted lists.
function parseIcebreakerList(text) {
  if (!text) return [];
  var clean = String(text).replace(/```json|```/g, '').trim();
  // Normalize curly/smart quotes to straight quotes so JSON.parse can work
  clean = clean.replace(/[“”„‟″‶]/g, '"').replace(/[‘’‚‛′‵]/g, "'");
  var arr = null;
  try {
    arr = _icebreakerStrings(JSON.parse(clean));
  } catch (e) {}
  if (arr) return arr;
  // Extract the first [...] block from surrounding prose and parse that
  var m = clean.match(/\[[\s\S]*\]/);
  if (m) {
    try {
      arr = _icebreakerStrings(JSON.parse(m[0]));
    } catch (e2) {}
    if (arr) return arr;
  }
  // Last resort: numbered / bulleted / quoted lines
  var lines = clean.split(/\r?\n/);
  var out = [];
  for (var i = 0; i < lines.length; i++) {
    var raw = lines[i].trim();
    if (!raw) continue;
    var marker = raw.match(/^(?:\d+[\.\)]|[-*•])\s+(.+)$/);
    var quoted = raw.match(/^["'](.+)["'],?$/);
    var item = marker ? marker[1] : quoted ? quoted[1] : null;
    if (item) {
      item = item.replace(/^["']+|["']+$/g, '').trim();
      if (item && item.length <= 80) out.push(item);
    }
  }
  return out;
}
function fetchAIIcebreakers(_x1) {
  return _fetchAIIcebreakers.apply(this, arguments);
}
function _fetchAIIcebreakers() {
  _fetchAIIcebreakers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(book) {
    var statusLabels, statusLabel, langNote, prompt, text, res, _res7, _res8, _res9, clean, parsed, match, _t27, _t28, _t29, _t30, _t31, _t32;
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
          var _lang = getCompanionLang();
          var _langNotes = {
            'Traditional Chinese': '寫全部繁體中文。You MUST write in Traditional Chinese (繁體中文) characters ONLY. Do NOT use Japanese, Simplified Chinese, or English. Every single word must be in Traditional Chinese.',
            'Simplified Chinese': '写全部简体中文。You MUST write in Simplified Chinese (简体中文) characters ONLY. Do NOT use Japanese, Traditional Chinese, or English. Every single word must be in Simplified Chinese.',
            'Japanese': 'すべて日本語で書いてください。You MUST write in Japanese (日本語) ONLY using hiragana, katakana, or kanji. Do NOT use Chinese or English.',
            'Korean': '모두 한국어로 쓰세요. You MUST write in Korean (한국어) using Hangul ONLY. Do NOT use Chinese, Japanese, or English.'
          };
          langNote = _lang ? _langNotes[_lang] || 'You must write entirely in ' + _lang + '. Every word of your response must be in ' + _lang + '. Do not use any English.' : '';
          var cachedSubjects = localStorage.getItem('pc_subjects_' + bookKey(book));
          var subjectArr = cachedSubjects ? JSON.parse(cachedSubjects) : [];
          var subjectNote = subjectArr.length ? '\nKnown subjects/themes: ' + subjectArr.slice(0, 8).join(', ') + '.' : '';
          prompt = 'You are a literary companion helping a reader of "' + book.title + '" by ' + book.author + '.\n\n' + 'The reader\'s current status: ' + statusLabel + subjectNote + '\n\n' + "First decide whether this book is fiction or non-fiction, then write exactly 4 short opening messages in the reader's OWN first-person voice — things the reader taps to say or ask you to begin the conversation. These are the reader speaking to you, never you asking the reader.\n\n" + 'Rules:\n' + '- Each message max 10 words\n' + "- Phrased as the reader speaking ('I...', 'Why does...', 'Tell me...', 'I've heard...')\n" + "- Specific to this exact book \u2014 its real themes, ideas, argument, setting, or reputation\n" + '- For NON-FICTION (economics, philosophy, history, science, etc.): focus on the central argument, key ideas, evidence, the author\'s perspective, and real-world relevance. NEVER mention characters, plot, or "the story".\n' + '- For FICTION: characters, plot, atmosphere, and the ending are all fair game\n' + '- NOT generic questions that fit any book\n' + '- NOT: "Is this book for me?"\n' + '- NOT: "What is the main idea?"\n' + '- NOT: "How long does it take to read?"\n' + '- NEVER phrased as a question TO the reader (no "What drew you to this?", "Are you ready for its themes?")\n' + '- Tone matches reading status, all in the reader\'s voice:\n' + '  considering: why the reader is drawn to it, what they\'ve heard, what they want to know before starting\n' + '  just started: the reader\'s first impressions, what they want to watch for\n' + '  halfway: what the reader is noticing now, a prediction or question they have\n' + '  just finished: what stayed with the reader, what it meant, what to read next' + '\n\n' + 'Return ONLY a JSON array of 4 strings. No preamble. No explanation. No markdown. Just the array.\n' + 'Example of the VOICE (not the content): ["I keep hearing about this book — why?","Tell me what makes it worth reading","I want to understand its main argument","What should I look out for early on?"]';
          // Reinforce language inside the user prompt — some providers (e.g.
          // Gemini) ignore the system/systemInstruction language note for this
          // short JSON task and default to English otherwise.
          if (langNote) {
            prompt += '\n\nThe text of all 4 prompt strings MUST be written in ' + _lang + '. ' + langNote + ' Keep the JSON array structure; only the wording inside each string changes language.';
          }
          text = '';
          if (!byokActive()) {
            _context13.n = 14;
            break;
          }
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
              model: ANTHROPIC_MODEL,
              max_tokens: 200,
              messages: [{
                role: 'user',
                content: prompt
              }]
            }, langNote ? {
              system: langNote
            } : {}))
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
          return fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + STATE.apiKey, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.assign({
              contents: [{
                parts: [{
                  text: prompt
                }]
              }],
              generationConfig: {
                responseMimeType: 'application/json',
                maxOutputTokens: 400,
                thinkingConfig: {
                  thinkingBudget: 0
                }
              }
            }, langNote ? {
              systemInstruction: {
                parts: [{
                  text: langNote
                }]
              }
            } : {}))
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
              model: GROQ_MODEL,
              max_tokens: 200,
              messages: (langNote ? [{
                role: 'system',
                content: langNote
              }] : []).concat([{
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
          _context13.n = 12;
          break;
        case 14:
          _context13.n = 15;
          return fetch('/api/ai', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              messages: [{
                role: 'user',
                content: prompt
              }],
              jsonMode: true
            })
          });
        case 15:
          _res9 = _context13.v;
          _context13.n = 16;
          return _res9.json();
        case 16:
          text = _context13.v && _context13.v.text ? _context13.v.text : '';
        case 12:
          parsed = parseIcebreakerList(text);
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
          // Display-only: the queued message lives ONLY in the queue until it
          // is actually sent, so reconnect processing can't duplicate it.
          el = appendBubble('user', text);
          el.className += ' pending-offline';
          w = document.createElement('div');
          w.className = 'message companion pending-offline';
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
  html = html.replace(/\[RECOMMEND:\s*([^\]]+)\]/g, function (match, q) {
    var raw = q.trim();
    var byMatch = raw.match(/^(.+?)\s+by\s+(.+)$/i);
    var title = byMatch ? byMatch[1].trim() : raw;
    var author = byMatch ? byMatch[2].trim() : '';
    // q comes from formatText output, so < > & " are already HTML-escaped.
    // Escape for the single-quoted JS string inside the onclick attribute:
    // backslashes first, then ' as \' (entity escapes like &#39; would be
    // decoded back to a raw quote by the HTML parser and break the JS).
    var jsEsc = function jsEsc(s) {
      return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    };
    var t = jsEsc(title);
    var a = jsEsc(author);
    return '<button class="recommend-btn" onclick="searchFromRecommend(\'' + t + '\', \'' + a + '\')">' + raw + '</button>';
  });
  bubble.innerHTML = html;
  wrap.appendChild(roleEl);
  wrap.appendChild(bubble);

  // Add copy + save actions to all bubbles (user and companion)
  if (role === 'companion' || role === 'user') {
    var actions = document.createElement('div');
    actions.className = 'bubble-actions';
    var copyBtn = document.createElement('button');
    copyBtn.className = 'bubble-action-btn';
    copyBtn.textContent = t('js.copy');
    copyBtn.onclick = function () {
      navigator.clipboard.writeText(text).then(function () {
        copyBtn.textContent = t('js.copied');
        setTimeout(function () {
          copyBtn.textContent = t('js.copy');
        }, 1500);
      }).catch(function () {
        return showToolbarMsg(t('js.copy_unavailable'));
      });
    };
    var saveBtn = document.createElement('button');
    saveBtn.className = 'bubble-action-btn';
    // Check if already saved
    var alreadySaved = getPassages().some(function (p) {
      return p.text === text;
    });
    saveBtn.textContent = alreadySaved ? t('js.saved_check') : t('js.save_passage');
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
  var isQuota = err.message && (err.message.toLowerCase().includes('quota') || err.message.toLowerCase().includes('rate limit') || err.message.includes('429') && !isNetwork);
  var msg = err.isRateLimit ? err.message : isQuota ? 'Your AI key has hit its rate limit. Wait a moment and try again, or switch to a different provider.' : isNetwork ? "Couldn't reach your companion — poor connection? Try again when you have a better signal." : 'Something went wrong: ' + err.message;
  var wrap = document.createElement('div');
  wrap.className = 'message error-msg';
  var bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  bubble.textContent = msg;
  var retryBtn = document.createElement('button');
  retryBtn.className = 'retry-btn';
  retryBtn.textContent = t('js.try_again');
  retryBtn.onclick = function () {
    wrap.remove();
    // The failed user message is still in STATE.messages; sendMessage with
    // retryText does not re-push it, so it must NOT be popped here.
    sendMessage(STATE.lastUserText);
  };
  wrap.appendChild(bubble);
  wrap.appendChild(retryBtn);
  document.getElementById('chat-log').appendChild(wrap);
}
function formatText(t) {
  return t.replace(/&/g, '&' + 'amp;').replace(/</g, '&' + 'lt;').replace(/>/g, '&' + 'gt;').replace(/"/g, '&' + 'quot;').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>').replace(/\n\n+/g, '</p><p>').replace(/\n/g, '<br>').replace(/^/, '<p>').replace(/$/, '</p>');
}
function scrollBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}
function scrollToMessage(el) {
  if (!el) {
    scrollBottom();
    return;
  }
  window.scrollTo(0, el.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || 0) - 12);
}

// ═══════════════════════════════════════════════════
//  AI PROVIDERS
// ═══════════════════════════════════════════════════
// ═══════════════════════════════════════════════════
//  COMPANION PERSONAS
//  One reading companion did not fit every use case: the default voice
//  always asks something back, which is right for reflective reading but
//  works against a reader who just wants to know what a book is like.
//  Each persona supplies a `voice` (who it is) and a `closing` (whether it
//  hands the turn back with a question). Everything else in the system
//  prompt — spoiler rules, honesty rules, formatting — is shared and does
//  not change with the persona.
//  'companion' is the default and reproduces the pre-v0.60 behaviour, so
//  existing readers notice no change unless they choose one.
// ═══════════════════════════════════════════════════
var PERSONAS = [{
  id: 'companion',
  voice: "You are warm but not gushing, and above all curious about the book itself — its characters, its craft, why it works the way it does. You have opinions about the text and offer them when asked. You never summarise the plot unprompted. You are honest about what you don't know. Literary without being academic. You feel like a well-read friend who has also read this book and wants to compare notes.",
  closing: 'Always end with a question or an invitation to continue.'
}, {
  id: 'guide',
  voice: "You are a patient guide to this book. You explain — context, themes, structure, the ideas behind the work — building from what the reader already knows rather than from nowhere. You reach for an analogy when it earns its place. You check whether an explanation landed before piling on another. Encouraging without being saccharine: when something in the book is genuinely difficult, you say so plainly instead of smoothing it over.",
  closing: 'Do not end every turn with a question — most turns should simply end once the explanation is complete. Ask only to check understanding after something genuinely difficult, or to offer a clear next step.'
}, {
  id: 'direct',
  voice: "You are direct. Lead with the answer, then the support for it. No padding, no restating the reader's question back to them, no hollow affirmations. Flag your assumptions and your uncertainties explicitly, and be clear about which parts are your reading of the book and which are widely agreed.",
  closing: 'Do not end with a question unless you genuinely need something from the reader in order to answer. Let them lead.'
}, {
  id: 'kindred',
  voice: "You are soft-spoken and personal. Books land on people, and that landing is what interests you — far more than the book's construction. When the reader tells you something, respond to the feeling in it before anything else, and stay there: do not hurry on to literary analysis, and do not treat a feeling as an introduction to a point about the text. Speak plainly and gently, in the second person, about them and their reading rather than about the author's technique. Silence and short replies are fine. You are not a therapist and do not perform therapy — you are the friend someone messages at 1am about a book that got to them.",
  closing: 'Do not end with a question by default. Usually it is better to let your last sentence rest — a reflection, or simply space. Ask something only when the reader has opened a door and a question would be a kindness rather than a prompt to keep talking.'
}];
function getPersonaById(id) {
  for (var i = 0; i < PERSONAS.length; i++) {
    if (PERSONAS[i].id === id) return PERSONAS[i];
  }
  return PERSONAS[0];
}
// Per-book override wins over the global preference, mirroring how the
// companion language already works.
function getPersonaId() {
  try {
    if (STATE.book) {
      var over = localStorage.getItem('pc_persona_override_' + bookKey(STATE.book));
      if (over && getPersonaById(over).id === over) return over;
    }
    var pref = localStorage.getItem('pc_persona');
    if (pref && getPersonaById(pref).id === pref) return pref;
  } catch (e) {}
  return 'companion';
}
function getPersona() {
  return getPersonaById(getPersonaId());
}
function buildDiscoveryPrompt() {
  var book = STATE.book;
  var readingTime = book.pageCount ? ' The book is ' + book.pageCount + ' pages — roughly ' + Math.round(book.pageCount / 50) + ' hours for an average reader.' : '';
  var _companionLang = getCompanionLang();
  var langNote = _companionLang && _companionLang !== 'English' ? '\n\nRespond entirely in ' + _companionLang + '. Do not use any other language.' : '';
  var persona = getPersona();
  return 'You are a book discovery companion. The reader is considering whether "' + book.title + '" by ' + book.author + ' is right for them.' + readingTime + '\n\n' + persona.voice + '\n\n' + 'Your role: help them decide if this book is for them — not summarise or sell it.\n\n' + 'ANSWER WHAT THEY ASK. A reader here wants to know what the book is like, so tell them: what kind of reader tends to love it, the mood and pace it creates, what it asks of the reader, what readers often wish they had known before starting — texture and experience, not plot. Do not interrogate them about their taste before you will say anything useful. If knowing their taste would genuinely sharpen your answer, you may ask for it once, after you have already given them something worth reading.\n\n' + 'Never reveal plot details, spoilers, or endings. Never summarise the story. Keep each response short — this is read on an e-ink screen.\n\n' + persona.closing + ' Never ask more than one question in a single reply. Respond in plain prose only. No bullet points. No headers.\n\n' + 'When you mention a specific book you\'d recommend, format it exactly as: [RECOMMEND: Title by Author].\n\n' + 'If there are any signs this reader may be a minor, default to age-appropriate discussion.' + langNote + '\n\n' + 'HOW TO END EVERY REPLY: ' + persona.closing + ' Never ask more than one question in a single reply. This instruction outranks any habit you have of closing with a question.';
}
function buildSystemPrompt() {
  if (STATE.companionMode === 'discover') return buildDiscoveryPrompt();
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
  var _companionLang = getCompanionLang();
  var langNote = _companionLang && _companionLang !== 'English' ? '\n\nRespond entirely in ' + _companionLang + '. Do not use any other language.' : '';
  var replyLengthNote = STATE.replyLength === 'short' ? "Maximum 2 sentences. Stop after 2 sentences." : STATE.replyLength === 'detailed' ? "You may give fuller, more detailed responses when the topic warrants it." : "Keep responses concise — 2 to 4 short paragraphs maximum.";
  var persona = getPersona();
  return "You are a reading companion for \"" + book.title + "\" by " + book.author + ".\n\n" + persona.voice + "\n\n" + "Never say \"Great question!\" Keep responses concise — this is read on an e-ink screen. Short paragraphs. " + persona.closing + " Never ask more than one question in a single reply.\n\n" + statusNote + "\n\n" + "If the conversation drifts away from the book, find a gentle bridge back — connect what the reader said to something in the book rather than refusing or redirecting bluntly. You are a reading companion, not a general assistant.\n\n" + "If a reader seems personally distressed — not just intellectually engaged with dark themes — acknowledge that warmth first before continuing the literary discussion.\n\n" + replyLengthNote + "\n\n" + "Be honest about the limits of your knowledge, but calibrate carefully. For well-known books, their central frameworks, famous arguments, and widely documented content are fair to state with confidence — if a book is famous for a specific framework or set of ideas, engage with those ideas directly rather than hedging. Reserve uncertainty for things you genuinely might misremember: exact quotes, minor plot details, precise chapter sequences, secondary characters. In those cases, say so plainly and invite the reader to share what they recall. Never confabulate. CRITICAL: do not escape an unknown by suggesting a different book. Stay with the book the reader is reading.\n\n" + "Respond in plain prose only. No bullet points. No headers. No lists of any kind.\n\n" + "Only suggest another book when the reader explicitly asks for a recommendation. When you do, format it exactly as: [RECOMMEND: Title by Author] — this renders as a tappable search button. Never use this as a way to deflect when you're unsure of the current book.\n\n" + "If there are any signs this reader may be a minor, default to age-appropriate discussion regardless of the book's content rating." + langNote + highlightsText + "\n\n" + "HOW TO END EVERY REPLY: " + persona.closing + " Never ask more than one question in a single reply. This instruction outranks any habit you have of closing with a question.";
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
          // Respect the AI-mode toggle: shared mode always uses the free
          // pool, even when a BYOK key is still saved in localStorage.
          if (byokActive()) {
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
function callFreeTier(system, messages, opts) {
  var body = {
    system: system,
    messages: messages
  };
  if (opts && opts.jsonMode) body.jsonMode = true;
  return fetch('/api/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(function (res) {
    if (res.status === 429) {
      var rateLimitErr = new Error('Our free companion is busy right now — add your own key for instant access.');
      rateLimitErr.isRateLimit = true;
      throw rateLimitErr;
    }
    if (!res.ok) {
      return res.json().catch(function () {
        return {};
      }).then(function (e) {
        throw new Error(e && e.error ? e.error : 'HTTP ' + res.status);
      });
    }
    return res.json().then(function (data) {
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
              model: ANTHROPIC_MODEL,
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
          return fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + STATE.apiKey, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              contents: contents,
              generationConfig: {
                maxOutputTokens: STATE.replyLength === 'short' ? 400 : 1500,
                thinkingConfig: {
                  thinkingBudget: 0
                }
              }
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
              model: GROQ_MODEL,
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
function applyFontSize(size) {
  document.documentElement.style.fontSize = size + 'px';
  var opts = document.querySelectorAll('.font-size-opt');
  for (var i = 0; i < opts.length; i++) {
    var b = opts[i];
    parseInt(b.dataset.size) === size ? b.classList.add('active') : b.classList.remove('active');
  }
}
function setFontSize(size) {
  applyFontSize(size);
  localStorage.setItem('pc_font_size', size);
  touchSyncMeta('preferences');
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
  touchSyncMeta('preferences');
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
    touchSyncMeta('shelf');
  }
}
function saveCurrentConversation() {
  if (!STATE.book || !STATE.messages.length) return;
  // Discover ("is this for me?") chats are throwaway by design — converting
  // via startReadingFromDiscover starts a fresh reading conversation.
  if (STATE.companionMode === 'discover') return;
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
function archiveBook(book) {
  var bk = bookKey(book);
  var books = getShelfBooks();
  for (var i = 0; i < books.length; i++) {
    if (bookKey(books[i]) === bk) {
      books[i].archived = true;
      break;
    }
  }
  localStorage.setItem('pc_shelf_books', JSON.stringify(books));
  touchSyncMeta('shelf');
  renderShelf();
}
function unarchiveBook(book) {
  var bk = bookKey(book);
  var books = getShelfBooks();
  for (var i = 0; i < books.length; i++) {
    if (bookKey(books[i]) === bk) {
      books[i].archived = false;
      break;
    }
  }
  localStorage.setItem('pc_shelf_books', JSON.stringify(books));
  touchSyncMeta('shelf');
  renderShelf();
}
function renderShelf() {
  var books = getShelfBooks();
  var listEl = document.getElementById('shelf-list');
  var active = [],
    archived = [];
  for (var i = 0; i < books.length; i++) {
    if (books[i].archived) archived.push(books[i]);else active.push(books[i]);
  }
  if (!active.length && !archived.length) {
    listEl.innerHTML = '<p class="shelf-empty">' + esc(t('js.shelf_empty')) + '</p>';
    return;
  }
  listEl.innerHTML = '';
  function makeBookEl(book, isArchived) {
    var convs = getConvs(book);
    var last = convs.length ? new Date(convs[0].lastUpdated).toLocaleDateString(dateLocale()) : '';
    var bk = bookKey(book);
    var status = localStorage.getItem('pc_status_' + bk) || '';
    var statusLabel = {
      considering: t('js.status_considering'),
      started: t('js.status_started'),
      midway: t('js.status_midway'),
      finished: t('js.status_finished'),
      revisiting: t('js.status_revisiting')
    }[status] || '';
    var el = document.createElement('div');
    el.className = 'shelf-book';
    var actionBtn = isArchived ? '<button class="shelf-archive-btn" data-action="unarchive">' + esc(t('js.restore')) + '</button>' : '<button class="shelf-archive-btn" data-action="archive">' + esc(t('js.archive')) + '</button>';
    // Chinese has no plural form; both keys resolve to the same word there.
    var convCount = convs.length + ' ' + (convs.length !== 1 ? t('js.conversations') : t('js.conversation'));
    el.innerHTML = '<div class="shelf-book-title">' + esc(book.title) + '</div>' + '<div class="shelf-book-author">' + esc(book.author) + '</div>' + '<div class="shelf-book-meta">' + (statusLabel ? esc(statusLabel) + ' · ' : '') + esc(convCount) + (last ? ' · ' + esc(t('js.last')) + ': ' + last : '') + '</div>' + actionBtn;
    el.addEventListener('click', function (evt) {
      var btn = evt.target;
      var action = btn.getAttribute ? btn.getAttribute('data-action') : null;
      if (action === 'archive') {
        archiveBook(book);
        return;
      }
      if (action === 'unarchive') {
        unarchiveBook(book);
        return;
      }
      openBookShelf(book);
    });
    return el;
  }
  for (var a = 0; a < active.length; a++) {
    listEl.appendChild(makeBookEl(active[a], false));
  }
  if (archived.length) {
    var toggle = document.createElement('button');
    toggle.className = 'shelf-archive-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = t('js.archived') + ' (' + archived.length + ')';
    var archivedList = document.createElement('div');
    archivedList.id = 'shelf-archived-list';
    archivedList.style.display = 'none';
    for (var b = 0; b < archived.length; b++) {
      archivedList.appendChild(makeBookEl(archived[b], true));
    }
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      archivedList.style.display = expanded ? 'none' : 'block';
    });
    listEl.appendChild(toggle);
    listEl.appendChild(archivedList);
  }
}
function openBookShelf(book) {
  STATE.book = book;
  var bk = bookKey(book);
  var status = localStorage.getItem('pc_status_' + bk) || '';
  var statusLabel = {
    considering: t('js.status_considering'),
    started: t('js.status_started'),
    midway: t('js.status_midway'),
    finished: t('js.status_finished'),
    revisiting: t('js.status_revisiting')
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
    listEl.innerHTML = '<p class="shelf-empty">' + esc(t('js.no_conversations_yet')) + '</p>';
    return;
  }
  listEl.innerHTML = '';
  convs.forEach(function (conv) {
    var date = new Date(conv.lastUpdated).toLocaleDateString(dateLocale());
    var statusLabel = {
      considering: t('js.status_considering'),
      started: t('js.status_started'),
      midway: t('js.status_midway'),
      finished: t('js.status_finished'),
      revisiting: t('js.status_revisiting')
    }[conv.status] || '';
    var el = document.createElement('div');
    el.className = 'conv-item';
    var safeId = String(conv.id).replace(/[^a-z0-9_]/gi, "");
    el.innerHTML = '<div class="conv-item-name">' + esc(conv.name) + '</div>' + '<div class="conv-item-meta">' + (statusLabel ? esc(statusLabel) + ' · ' : '') + date + '</div>' + '<div class="conv-actions">' + '<button class="conv-btn primary" data-action="continue" data-id="' + safeId + '">' + esc(t('js.continue')) + '</button>' + '<button class="conv-btn" data-action="rename" data-id="' + safeId + '">' + esc(t('js.rename')) + '</button>' + '<button class="conv-btn danger" data-action="delete" data-id="' + safeId + '">' + esc(t('js.delete')) + '</button>' + '</div>';
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
          // Saved conversations are always reading conversations — clear any
          // leftover discover mode so the right prompt and UI are used.
          STATE.companionMode = 'reading';
          bk = bookKey(STATE.book);
          STATE.readingStatus = conv.status || localStorage.getItem('pc_status_' + bk) || null;
          STATE.chatLanguage = localStorage.getItem('pc_lang_' + bk) || 'english';
          STATE.detectedLang = STATE.book.detectedLang || detectLanguage(STATE.book);
          STATE.messages = conv.messages || [];
          // This path navigates straight to the chat without calling
          // launchCompanion, so it claims the buffer itself — otherwise the
          // guard would later see a stale owner and wipe the restored
          // conversation.
          STATE.messagesBookKey = bookKey(STATE.book);
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
          updatePassagesToolbarBtn();
          updateNotesToolbarBtn();

          // render existing messages
          log = document.getElementById('chat-log');
          log.innerHTML = '';
          STATE.messages.forEach(function (m) {
            return appendBubble(m.role === 'user' ? 'user' : 'companion', m.content);
          });
          navigate('companion');
          if (navigator.onLine) processOfflineQueue();
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
          STATE.companionMode = 'reading';
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
function setReplyLength(length) {
  STATE.replyLength = length;
  localStorage.setItem('pc_reply_length', length);
  touchSyncMeta('preferences');
  var lenOpts = document.querySelectorAll('.length-opt');
  for (var i = 0; i < lenOpts.length; i++) {
    var b = lenOpts[i];
    b.dataset.length === length ? b.classList.add('active') : b.classList.remove('active');
  }
  showToolbarMsg('Reply length set to ' + length + '.');
}
function toggleLanguagePanel() {
  var panel = document.getElementById('language-panel');
  var btn = document.getElementById('language-toolbar-btn');
  panel.classList.toggle('open');
  document.getElementById('highlights-panel').classList.remove('open');
  document.getElementById('passages-panel').classList.remove('open');
  document.getElementById('notes-panel').classList.remove('open');
  document.getElementById('highlights-toolbar-btn').classList.remove('active');
  document.getElementById('passages-toolbar-btn').classList.remove('active');
  document.getElementById('notes-toolbar-btn').classList.remove('active');
  document.getElementById('export-panel').classList.remove('open');
  document.getElementById('export-toolbar-btn').classList.remove('active');
  var _pp = document.getElementById('persona-panel');
  var _pb = document.getElementById('persona-toolbar-btn');
  if (_pp) _pp.classList.remove('open');
  if (_pb) _pb.classList.remove('active');
  panel.classList.contains('open') ? btn.classList.add('active') : btn.classList.remove('active');
  updateLanguagePanelDisplay();
}
function setCompanionLanguage(lang) {
  STATE.companionLangOverride = lang || null;
  if (lang) {
    localStorage.setItem('pc_companion_lang_override_' + bookKey(STATE.book), lang);
    touchSyncMeta('status');
    showToolbarMsg(t('js.prompts_now_in') + lang + '.');
  } else {
    localStorage.removeItem('pc_companion_lang_override_' + bookKey(STATE.book));
    touchSyncMeta('status');
    showToolbarMsg(t('js.auto_detect_enabled'));
  }
  // Refresh the icebreaker prompts so they appear in the newly chosen language
  // right away (the cache key now includes the override, so this regenerates).
  if (STATE.book) populateIcebreakers(STATE.book);
  updateLanguagePanelDisplay();
}
function updateLanguagePanelDisplay() {
  var overrideLang = STATE.companionLangOverride;
  var langOpts = document.querySelectorAll('.language-opt');
  for (var i = 0; i < langOpts.length; i++) {
    var b = langOpts[i];
    // Match on the data-lang attribute, not the button's text: once the
    // interface is translated the label reads "英文" while the stored value
    // is still "English", so comparing text never matched.
    var btnLang = b.getAttribute('data-lang') || b.textContent.trim();
    if (overrideLang && btnLang === overrideLang) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  }
}
// Global default, used for any book without its own override.
function saveDefaultPersona(id) {
  if (getPersonaById(id).id !== id) return;
  localStorage.setItem('pc_persona', id);
  touchSyncMeta('preferences');
  updatePersonaPrefDescription();
  updatePersonaPanelDisplay();
}
function updatePersonaPrefDescription() {
  var el = document.getElementById('persona-pref-desc');
  if (!el) return;
  var sel = document.getElementById('settings-persona');
  var id = sel && sel.value || localStorage.getItem('pc_persona') || 'companion';
  el.textContent = t('persona.' + getPersonaById(id).id + '.desc');
}
// ── Persona picker (chat toolbar) ──────────────────────────────────────────
function togglePersonaPanel() {
  var panel = document.getElementById('persona-panel');
  var btn = document.getElementById('persona-toolbar-btn');
  if (!panel || !btn) return;
  panel.classList.toggle('open');
  var others = ['highlights', 'passages', 'notes', 'language', 'export'];
  for (var i = 0; i < others.length; i++) {
    var p = document.getElementById(others[i] + '-panel');
    var b = document.getElementById(others[i] + '-toolbar-btn');
    if (p) p.classList.remove('open');
    if (b) b.classList.remove('active');
  }
  panel.classList.contains('open') ? btn.classList.add('active') : btn.classList.remove('active');
  updatePersonaPanelDisplay();
}
function setBookPersona(id) {
  if (!STATE.book) return;
  var key = 'pc_persona_override_' + bookKey(STATE.book);
  if (id) {
    localStorage.setItem(key, id);
  } else {
    localStorage.removeItem(key); // fall back to the global preference
  }
  touchSyncMeta('status');
  showToolbarMsg(t('js.voice_set_to') + t('persona.' + getPersonaId() + '.label') + '.');
  updatePersonaPanelDisplay();
}
function updatePersonaPanelDisplay() {
  var active = getPersonaId();
  var opts = document.querySelectorAll('.persona-opt');
  for (var i = 0; i < opts.length; i++) {
    var b = opts[i];
    if (b.getAttribute('data-persona') === active) b.classList.add('active');else b.classList.remove('active');
  }
}

// ═══════════════════════════════════════════════════
//  PASSAGES
// ═══════════════════════════════════════════════════
function getPassages() {
  if (!STATE.book) return [];
  try {
    var raw = JSON.parse(localStorage.getItem('pc_passages_' + bookKey(STATE.book)) || '[]');
    // Normalise old flat-string format to {text, ts} objects for backwards compat
    return raw.map(function (p) {
      return typeof p === 'string' ? {
        text: p,
        ts: 0
      } : p;
    });
  } catch (e) {
    return [];
  }
}
function savePassage(text, btn) {
  var passages = getPassages();
  // avoid duplicates
  if (passages.some(function (p) {
    return p.text === text;
  })) {
    btn.textContent = t('js.already_saved');
    btn.classList.add('saved');
    setTimeout(function () {
      btn.textContent = t('js.save_passage');
      btn.classList.remove('saved');
    }, 1500);
    return;
  }
  passages.push({
    text: text,
    ts: Date.now()
  });
  localStorage.setItem('pc_passages_' + bookKey(STATE.book), JSON.stringify(passages));
  btn.textContent = t('js.saved_check');
  btn.classList.add('saved');
  setTimeout(function () {
    btn.textContent = t('js.save_passage');
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
    btn.textContent = t('js.passages') + ' (' + passages.length + ')';
  } else {
    btn.style.display = 'none';
  }
}
function renderPassagesPanel() {
  var passages = getPassages();
  var listEl = document.getElementById('passages-list');
  var countEl = document.getElementById('passages-count');
  if (!passages.length) {
    countEl.textContent = t('js.no_passages_yet');
    listEl.innerHTML = '';
    return;
  }
  countEl.textContent = passages.length + ' passage' + (passages.length !== 1 ? 's' : '') + ' saved';
  listEl.innerHTML = passages.map(function (p, i) {
    return '<div class="passage-item">' + formatText(p.text) + '</div>';
  }).join('');
}
function togglePassagesPanel() {
  var panel = document.getElementById('passages-panel');
  var btn = document.getElementById('passages-toolbar-btn');
  panel.classList.toggle('open');
  document.getElementById('highlights-panel').classList.remove('open');
  document.getElementById('notes-panel').classList.remove('open');
  document.getElementById('highlights-toolbar-btn').classList.remove('active');
  document.getElementById('notes-toolbar-btn').classList.remove('active');
  document.getElementById('export-panel').classList.remove('open');
  document.getElementById('export-toolbar-btn').classList.remove('active');
  var _pp = document.getElementById('persona-panel');
  var _pb = document.getElementById('persona-toolbar-btn');
  if (_pp) _pp.classList.remove('open');
  if (_pb) _pb.classList.remove('active');
  panel.classList.contains('open') ? btn.classList.add('active') : btn.classList.remove('active');
  if (panel.classList.contains('open')) renderPassagesPanel();
}
function toggleExportPanel() {
  var panel = document.getElementById('export-panel');
  var btn = document.getElementById('export-toolbar-btn');
  panel.classList.toggle('open');
  document.getElementById('highlights-panel').classList.remove('open');
  document.getElementById('passages-panel').classList.remove('open');
  document.getElementById('notes-panel').classList.remove('open');
  document.getElementById('language-panel').classList.remove('open');
  document.getElementById('highlights-toolbar-btn').classList.remove('active');
  document.getElementById('passages-toolbar-btn').classList.remove('active');
  document.getElementById('notes-toolbar-btn').classList.remove('active');
  document.getElementById('language-toolbar-btn').classList.remove('active');
  panel.classList.contains('open') ? btn.classList.add('active') : btn.classList.remove('active');
}

// format: 'txt' (plain text, the only thing a Kindle browser can download
// and read on-device) or 'md' (Markdown, for desktop / note apps).
function exportConversation(format) {
  format = format === 'md' ? 'md' : 'txt';
  var book = STATE.book;
  // Use the full saved conversation, not the in-memory sliding window
  var fullMessages = STATE.messages;
  if (STATE.currentConvId && book) {
    var convs = getConvs(book);
    var conv = convs.find(function (c) {
      return c.id === STATE.currentConvId;
    });
    if (conv && conv.messages && conv.messages.length) fullMessages = conv.messages;
  }
  if (!fullMessages || !fullMessages.length) {
    showToolbarMsg('No conversation to export yet.');
    return;
  }
  var now = new Date();
  var pad = function pad(n) {
    return n < 10 ? '0' + n : '' + n;
  };
  var isoDate = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
  var date = now.toLocaleDateString(dateLocale(), {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  var companionName = STATE.companionName || 'Companion';
  var title = book ? book.title : 'Conversation';
  var author = book ? book.author : 'Unknown';
  var lines;
  if (format === 'md') {
    lines = ['# ' + title, '', '**Author:** ' + author, '**Exported from Page Commons:** ' + date, '', '---', ''];
    fullMessages.forEach(function (m) {
      lines.push(m.role === 'user' ? '**You**' : '**' + companionName + '**');
      lines.push('');
      lines.push(m.content);
      lines.push('');
    });
  } else {
    lines = [title, 'Author: ' + author, 'Exported from Page Commons: ' + date, '', '----------------------------------------', ''];
    fullMessages.forEach(function (m) {
      lines.push(m.role === 'user' ? 'You:' : companionName + ':');
      lines.push(m.content);
      lines.push('');
    });
  }
  var mime = format === 'md' ? 'text/markdown' : 'text/plain';
  var blob = new Blob([lines.join('\n')], {
    type: mime + ';charset=utf-8'
  });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  var titlePart = book && book.title ? book.title.replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, ' ').trim() : 'Conversation';
  a.download = isoDate + '-' + titlePart + '.' + format;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  // Close the export panel after a choice is made
  var panel = document.getElementById('export-panel');
  var btn = document.getElementById('export-toolbar-btn');
  if (panel) panel.classList.remove('open');
  if (btn) btn.classList.remove('active');
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
  notes.unshift({
    text: text,
    ts: Date.now()
  });
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
    list.innerHTML = '<p class="passages-empty">' + esc(t('js.no_notes_yet')) + '</p>';
    return;
  }
  list.innerHTML = notes.map(function (n) {
    var d = new Date(n.ts).toLocaleDateString(dateLocale(), {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    return '<div class="note-item"><div class="note-date">' + d + '</div>' + formatText(n.text) + '</div>';
  }).join('');
}
function toggleNotesPanel() {
  var panel = document.getElementById('notes-panel');
  var btn = document.getElementById('notes-toolbar-btn');
  panel.classList.toggle('open');
  document.getElementById('highlights-panel').classList.remove('open');
  document.getElementById('passages-panel').classList.remove('open');
  document.getElementById('highlights-toolbar-btn').classList.remove('active');
  document.getElementById('passages-toolbar-btn').classList.remove('active');
  document.getElementById('export-panel').classList.remove('open');
  document.getElementById('export-toolbar-btn').classList.remove('active');
  var _pp = document.getElementById('persona-panel');
  var _pb = document.getElementById('persona-toolbar-btn');
  if (_pp) _pp.classList.remove('open');
  if (_pb) _pb.classList.remove('active');
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
  btn.textContent = notes.length ? t('js.notes') + ' (' + notes.length + ')' : t('js.notes');
}
function copyAllPassages() {
  var passages = getPassages();
  if (!passages.length) {
    showToolbarMsg('No passages saved yet.');
    return;
  }
  var text = passages.map(function (p, i) {
    return '[' + (i + 1) + '] ' + p.text;
  }).join('\n\n');
  navigator.clipboard.writeText(text).then(function () {
    showToolbarMsg(passages.length + ' passage' + (passages.length !== 1 ? 's' : '') + ' copied to clipboard.');
  }).catch(function () {
    return showToolbarMsg(t('js.copy_unavailable'));
  });
}

// ═══════════════════════════════════════════════════
//  END CONVERSATION
// ═══════════════════════════════════════════════════
function endConversation() {
  saveCurrentConversation();
  // Ending a chat is terminal, not a forward step. Left alone, showScreen
  // would push 'companion' onto the back stack, so Back on the shelf bounced
  // straight back into the ended chat — an endless chat↔shelf loop. Clear
  // the stack and mark this navigation back-style; Back from the shelf then
  // goes to the Library Hall (via BACK_FALLBACK) instead.
  navStack.length = 0;
  _navBack = true;
  // Land on the shelf — the reader's books and saved conversations — rather
  // than the Library Hall, so leaving a chat continues naturally from there.
  navigate('shelf');
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
    if (btn) btn.textContent = t('js.hide_transfer');
    var inp = document.getElementById('transfer-code-input');
    if (inp) inp.focus();
  } else {
    fields.style.display = 'none';
    if (btn) btn.textContent = t('js.show_transfer');
  }
}
function redeemTransferCode() {
  var input = document.getElementById('transfer-code-input');
  var errEl = document.getElementById('transfer-error');
  var okEl = document.getElementById('transfer-success');
  if (!input) return;

  // Strip spaces and validate
  var code = input.value.replace(/\s/g, '');
  errEl.style.display = 'none';
  okEl.style.display = 'none';
  if (!/^\d{6}$/.test(code)) {
    errEl.textContent = t('js.enter_code_exactly');
    errEl.style.display = 'block';
    return;
  }
  var btn = document.querySelector('#transfer-fields .btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = t('js.fetching');
  }
  fetch('/api/transfer?code=' + code).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (btn) {
      btn.disabled = false;
      btn.textContent = t('js.fetch_my_key');
    }
    if (data.error) {
      errEl.textContent = data.error === 'Code not found or expired' ? 'Code not found or expired. Generate a new one and try again.' : 'Error: ' + data.error;
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
    okEl.textContent = t('js.key_transferred');
    okEl.style.display = 'block';
    input.value = '';
    // Hide the transfer fields
    var fields = document.getElementById('transfer-fields');
    if (fields) fields.style.display = 'none';
  }).catch(function (err) {
    if (btn) {
      btn.disabled = false;
      btn.textContent = t('js.fetch_my_key');
    }
    errEl.textContent = t('js.network_error');
    errEl.style.display = 'block';
  });
}
function showInitError(msg) {
  try {
    var errDiv = document.getElementById('pc-init-error');
    if (!errDiv) {
      errDiv = document.createElement('div');
      errDiv.id = 'pc-init-error';
      errDiv.style.cssText = 'background:#f5f5f5;border:1px solid #111;padding:14px;margin:14px 0;font-size:16px;font-family:Georgia,serif;color:#111;';
      var page = document.querySelector('.page');
      if (page) page.insertBefore(errDiv, page.firstChild);else document.body.appendChild(errDiv);
    }
    errDiv.style.display = 'block';
    errDiv.textContent = 'Error: ' + msg;
  } catch (displayErr) {}
}
// ═══════════════════════════════════════════════════
//  PREFERENCES
// ═══════════════════════════════════════════════════
function loadPreferencesScreen() {
  var nameEl = document.getElementById('settings-name');
  if (nameEl) nameEl.value = STATE.userName || '';
  var cnEl = document.getElementById('settings-companion-name');
  if (cnEl) cnEl.value = STATE.companionName === 'Companion' ? '' : STATE.companionName;
  updateAIModeUI();
  applyProviderUI(STATE.provider);
  var prefLenOpts = document.querySelectorAll('.length-opt');
  for (var li = 0; li < prefLenOpts.length; li++) {
    var lb = prefLenOpts[li];
    lb.dataset.length === STATE.replyLength ? lb.classList.add('active') : lb.classList.remove('active');
  }
  var prefFontOpts = document.querySelectorAll('.font-size-opt');
  for (var fi = 0; fi < prefFontOpts.length; fi++) {
    var fb = prefFontOpts[fi];
    parseInt(fb.dataset.size, 10) === (parseInt(localStorage.getItem('pc_font_size'), 10) || 18) ? fb.classList.add('active') : fb.classList.remove('active');
  }
  var clangEl = document.getElementById('settings-companion-lang');
  if (clangEl) clangEl.value = STATE.companionLangOverride || 'English';
  var uilangEl = document.getElementById('settings-ui-lang');
  if (uilangEl) uilangEl.value = getUILang();
  var personaEl = document.getElementById('settings-persona');
  if (personaEl) personaEl.value = localStorage.getItem('pc_persona') || 'companion';
  updatePersonaPrefDescription();

  // First-run mode: hide back link, show intro + Save & continue, hide
  // the data export/import section (nothing to back up yet).
  // Normal mode: show back link, hide intro + Save button.
  var firstRun = !localStorage.getItem('pc_preferences_set');
  var backLink = document.getElementById('header-nav');
  var intro = document.getElementById('prefs-intro');
  var saveBtn = document.getElementById('prefs-save-continue');
  var dataSection = document.getElementById('prefs-data-section');
  if (backLink) backLink.style.display = firstRun ? 'none' : 'block';
  if (intro) intro.style.display = firstRun ? 'block' : 'none';
  if (saveBtn) saveBtn.style.display = firstRun ? 'block' : 'none';
  if (dataSection) dataSection.style.display = firstRun ? 'none' : 'block';

  // Hide Drive sync section during first-run (nothing to sync yet)
  var gdriveSection = document.getElementById('prefs-gdrive-section');
  if (gdriveSection) gdriveSection.style.display = firstRun ? 'none' : 'block';
  if (!firstRun) renderDriveStatus();

  // Collapse "More settings" by default each time the screen is opened.
  var more = document.getElementById('prefs-more');
  var toggle = document.getElementById('prefs-more-toggle');
  if (more) more.style.display = 'none';
  if (toggle) toggle.textContent = t('js.more_settings');
}
function togglePreferencesMore() {
  var more = document.getElementById('prefs-more');
  var toggle = document.getElementById('prefs-more-toggle');
  if (!more || !toggle) return;
  var open = more.style.display !== 'none';
  more.style.display = open ? 'none' : 'block';
  toggle.textContent = open ? t('js.more_settings') : 'More settings ▴';
}
function savePreferencesAndContinue() {
  localStorage.setItem('pc_preferences_set', '1');
  updatePreferencesFooterLinks();
  navigate('search');
}
function saveCompanionLangSetting(val) {
  STATE.companionLangOverride = val || 'English';
  localStorage.setItem('pc_companion_lang', STATE.companionLangOverride);
  touchSyncMeta('preferences');
}
function saveSettingName() {
  var val = (document.getElementById('settings-name').value || '').trim();
  STATE.userName = val;
  if (val) localStorage.setItem('pc_user_name', val);else localStorage.removeItem('pc_user_name');
  touchSyncMeta('preferences');
}
function saveSettingCompanionName() {
  var val = (document.getElementById('settings-companion-name').value || '').trim();
  STATE.companionName = val || 'Companion';
  localStorage.setItem('pc_companion_name', STATE.companionName);
  touchSyncMeta('preferences');
}

// ═══════════════════════════════════════════════════
//  DATA EXPORT / IMPORT (localStorage backup)
// ═══════════════════════════════════════════════════
var DATA_BACKUP_VERSION = '0.29';
function showDataMessage(elId, msg, isError) {
  var el = document.getElementById(elId);
  if (!el) return;
  el.textContent = msg;
  el.style.color = isError ? '#cc0000' : '#006600';
  el.style.display = 'block';
  if (el.pcMsgTimer) clearTimeout(el.pcMsgTimer);
  el.pcMsgTimer = setTimeout(function () {
    el.style.display = 'none';
    el.textContent = '';
  }, 5000);
}
function todayDateStamp() {
  var now = new Date();
  var y = now.getFullYear();
  var m = ('0' + (now.getMonth() + 1)).slice(-2);
  var d = ('0' + now.getDate()).slice(-2);
  return y + '-' + m + '-' + d;
}
function exportUserData() {
  try {
    var data = {};
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (k && k.indexOf('pc_') === 0) {
        data[k] = localStorage.getItem(k);
      }
    }
    var dateStr = todayDateStamp();
    var payload = {
      exported_at: dateStr,
      version: DATA_BACKUP_VERSION,
      data: data
    };
    var json = JSON.stringify(payload, null, 2);
    var blob = new Blob([json], {
      type: 'application/json'
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'pagecommons-backup-' + dateStr + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
    showDataMessage('data-export-msg', 'Backup downloaded.', false);
  } catch (e) {
    showDataMessage('data-export-msg', 'Export failed. Please try again.', true);
  }
}
function triggerImportPicker() {
  var inp = document.getElementById('data-import-input');
  if (!inp) return;
  inp.value = '';
  inp.click();
}
function importUserData(inputEl) {
  var file = inputEl && inputEl.files && inputEl.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function (e) {
    var parsed;
    try {
      parsed = JSON.parse(e.target.result);
    } catch (err) {
      showDataMessage('data-import-msg', "This doesn't look like a Page Commons backup file.", true);
      return;
    }
    if (!parsed || _typeof(parsed) !== 'object' || !parsed.data || _typeof(parsed.data) !== 'object') {
      showDataMessage('data-import-msg', "This doesn't look like a Page Commons backup file.", true);
      return;
    }
    try {
      var keys = Object.keys(parsed.data);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        // Only restore Page Commons keys — a crafted "backup" must not be
        // able to write arbitrary localStorage entries.
        if (k.indexOf('pc_') !== 0) continue;
        localStorage.setItem(k, String(parsed.data[k]));
      }
      showDataMessage('data-import-msg', 'Data restored. Reload the page to see your shelf and settings.', false);
    } catch (err2) {
      showDataMessage('data-import-msg', 'Import failed. Please try again.', true);
    }
  };
  reader.onerror = function () {
    showDataMessage('data-import-msg', 'Could not read the file. Please try again.', true);
  };
  reader.readAsText(file);
}

// ═══════════════════════════════════════════════════
//  READING PROGRESS
// ═══════════════════════════════════════════════════
function getReadingProgress(book) {
  try {
    return JSON.parse(localStorage.getItem('pc_progress_' + bookKey(book)) || 'null');
  } catch (e) {
    return null;
  }
}
function updateProgressFromHighlights(highlights) {
  var byBook = {};
  highlights.forEach(function (h) {
    if (!h.page) return;
    var bk = bookKey({
      title: h.title,
      author: h.author
    });
    if (!byBook[bk] || h.page > byBook[bk]) byBook[bk] = h.page;
  });
  Object.keys(byBook).forEach(function (bk) {
    // bk is already a bookKey — read the entry directly (getReadingProgress
    // would bookKey it a second time and never find the stored value).
    var existing = null;
    try {
      existing = JSON.parse(localStorage.getItem('pc_progress_' + bk) || 'null');
    } catch (e) {}
    if (!existing || byBook[bk] > (existing.page || 0)) {
      localStorage.setItem('pc_progress_' + bk, JSON.stringify({
        page: byBook[bk],
        source: 'kindle'
      }));
      touchSyncMeta('status');
    }
  });
}

// ═══════════════════════════════════════════════════
//  BOOK SUBJECTS (icebreaker enrichment)
// ═══════════════════════════════════════════════════
function fetchAndCacheSubjects(book) {
  var bk = bookKey(book);
  var cacheKey = 'pc_subjects_' + bk;
  if (localStorage.getItem(cacheKey)) return Promise.resolve();
  if (book.key && book.key.indexOf('/works/') === 0) {
    return fetch('https://openlibrary.org' + book.key + '.json').then(function (r) {
      return r.json();
    }).then(function (data) {
      var subjects = (data.subjects || []).slice(0, 10);
      localStorage.setItem(cacheKey, JSON.stringify(subjects));
    }).catch(function () {});
  } else if (book.cats) {
    var cats = book.cats.split(/\s+/).filter(Boolean).slice(0, 6);
    if (cats.length) localStorage.setItem(cacheKey, JSON.stringify(cats));
    return Promise.resolve();
  }
  return Promise.resolve();
}

// ═══════════════════════════════════════════════════
//  GOOGLE DRIVE SYNC
//  - OAuth via /api/gdrive-token.js (server holds client_secret)
//  - Scope: drive.file (only files this app creates)
//  - File: "Page Commons/pagecommons-data.json" plus
//    per-conversation markdown in "Page Commons/conversations/"
// ═══════════════════════════════════════════════════
// Public OAuth client ID — safe to ship in client code.
// Set GDRIVE_CLIENT_ID below and GDRIVE_CLIENT_SECRET in Vercel env.
var GDRIVE_CLIENT_ID = '391567836708-1eof6nlfsgplekj64apqk9dl36uh8trq.apps.googleusercontent.com';
var GDRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';
var GDRIVE_KEYS_DEVICE_LOCAL = ['pc_gdrive_access_token', 'pc_gdrive_refresh_token', 'pc_gdrive_user_email', 'pc_gdrive_folder_id', 'pc_gdrive_conv_folder_id', 'pc_gdrive_last_synced'];

// Keys that are NEVER synced (privacy / device-local)
var SYNC_EXCLUDE_PREFIXES = ['pc_api_key', 'pc_tc_accepted', 'pc_preferences_set', 'pc_icebreakers_', 'pc_subjects_', 'pc_categories_', 'pc_thinking_', 'pc_status_opts_', 'pc_gdrive_', 'pc_offline_queue', 'pc_last_book'];
function gdriveRedirectUri() {
  // Use origin only — no path — so OAuth lands on the app root and we
  // strip ?code= before normal routing.
  return window.location.origin + window.location.pathname;
}

// URLSearchParams isn't available on old Kobo/Kindle WebKit, so build and
// parse query strings by hand.
function buildQueryString(obj) {
  var parts = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
  }
  return parts.join('&');
}
function getQueryParam(qs, name) {
  var m = qs.match(new RegExp('[?&]' + name + '=([^&]*)'));
  return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : null;
}
function initGDriveAuth() {
  if (!GDRIVE_CLIENT_ID) {
    showSyncMessage('Drive sync not configured — set GDRIVE_CLIENT_ID.', true);
    return;
  }
  var query = buildQueryString({
    client_id: GDRIVE_CLIENT_ID,
    redirect_uri: gdriveRedirectUri(),
    response_type: 'code',
    scope: GDRIVE_SCOPE,
    access_type: 'offline',
    prompt: 'consent',
    include_granted_scopes: 'true'
  });
  // Same-tab redirect — works on Kindle / Kobo browsers
  window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?' + query;
}
function handleGDriveCallback() {
  var qs = window.location.search;
  var code = getQueryParam(qs, 'code');
  if (!code) return Promise.resolve(false);
  // Strip the code from the URL so it doesn't linger or get bookmarked
  try {
    window.history.replaceState({}, document.title, window.location.pathname);
  } catch (e) {}
  return fetch('/api/gdrive-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: gdriveRedirectUri()
    })
  }).then(function (r) {
    return r.json();
  }).then(function (data) {
    if (!data || !data.access_token) throw new Error('No access token');
    localStorage.setItem('pc_gdrive_access_token', data.access_token);
    if (data.refresh_token) localStorage.setItem('pc_gdrive_refresh_token', data.refresh_token);
    // Best-effort user email lookup (display only)
    return fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        'Authorization': 'Bearer ' + data.access_token
      }
    }).then(function (r) {
      return r.json();
    }).then(function (u) {
      if (u && u.email) localStorage.setItem('pc_gdrive_user_email', u.email);
    }).catch(function () {});
  }).then(function () {
    return true;
  }).catch(function () {
    return false;
  });
}
function refreshGDriveToken() {
  var rt = localStorage.getItem('pc_gdrive_refresh_token');
  if (!rt) return Promise.reject(new Error('Not connected'));
  return fetch('/api/gdrive-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      refresh_token: rt
    })
  }).then(function (r) {
    return r.json();
  }).then(function (data) {
    if (!data || !data.access_token) throw new Error('Token refresh failed');
    localStorage.setItem('pc_gdrive_access_token', data.access_token);
    return data.access_token;
  });
}
function gdriveFetch(url, opts) {
  // Wrap fetch with token refresh + single retry on 401.
  opts = opts || {};
  opts.headers = opts.headers || {};
  var tok = localStorage.getItem('pc_gdrive_access_token');
  if (!tok) {
    return refreshGDriveToken().then(function (newTok) {
      opts.headers['Authorization'] = 'Bearer ' + newTok;
      return fetch(url, opts);
    });
  }
  opts.headers['Authorization'] = 'Bearer ' + tok;
  return fetch(url, opts).then(function (res) {
    if (res.status === 401) {
      return refreshGDriveToken().then(function (newTok) {
        opts.headers['Authorization'] = 'Bearer ' + newTok;
        return fetch(url, opts);
      });
    }
    return res;
  });
}

// Parse a Drive API response, throwing on HTTP errors so callers never
// treat an error body as data (previously a failed upload still showed
// "Synced successfully" and undefined ids got cached into localStorage).
function gdriveJson(r) {
  if (!r.ok) throw new Error('Drive request failed (HTTP ' + r.status + ')');
  return r.json();
}
function gdriveFindOrCreateFolder(name, parentId) {
  var q = "mimeType='application/vnd.google-apps.folder' and trashed=false and name='" + name.replace(/'/g, "\\'") + "'";
  if (parentId) q += " and '" + parentId + "' in parents";
  var url = 'https://www.googleapis.com/drive/v3/files?q=' + encodeURIComponent(q) + '&fields=files(id,name)';
  return gdriveFetch(url).then(gdriveJson).then(function (data) {
    if (data && data.files && data.files.length) return data.files[0].id;
    var meta = {
      name: name,
      mimeType: 'application/vnd.google-apps.folder'
    };
    if (parentId) meta.parents = [parentId];
    return gdriveFetch('https://www.googleapis.com/drive/v3/files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(meta)
    }).then(gdriveJson).then(function (d) {
      if (!d || !d.id) throw new Error('Drive folder create failed');
      return d.id;
    });
  });
}
function getOrCreatePageCommonsFolder() {
  var cached = localStorage.getItem('pc_gdrive_folder_id');
  if (cached) return Promise.resolve(cached);
  return gdriveFindOrCreateFolder('Page Commons', null).then(function (id) {
    localStorage.setItem('pc_gdrive_folder_id', id);
    return id;
  });
}
function getOrCreateConversationsFolder(parentId) {
  var cached = localStorage.getItem('pc_gdrive_conv_folder_id');
  if (cached) return Promise.resolve(cached);
  return gdriveFindOrCreateFolder('conversations', parentId).then(function (id) {
    localStorage.setItem('pc_gdrive_conv_folder_id', id);
    return id;
  });
}
function shouldSyncKey(k) {
  for (var i = 0; i < SYNC_EXCLUDE_PREFIXES.length; i++) {
    if (k === SYNC_EXCLUDE_PREFIXES[i] || k.indexOf(SYNC_EXCLUDE_PREFIXES[i]) === 0) return false;
  }
  return k.indexOf('pc_') === 0;
}
function buildSyncPayload() {
  var conversations = {},
    notes = {},
    passages = {},
    reading_state = {};
  var preferences = {};
  var prefKeys = ['pc_user_name', 'pc_companion_name', 'pc_companion_lang', 'pc_font_size', 'pc_reply_length', 'pc_provider', 'pc_ai_mode'];
  for (var i = 0; i < localStorage.length; i++) {
    var k = localStorage.key(i);
    if (!k || !shouldSyncKey(k)) continue;
    var v = localStorage.getItem(k);
    if (k.indexOf('pc_convs_') === 0) {
      try {
        conversations[k.slice(9)] = JSON.parse(v);
      } catch (e) {}
    } else if (k.indexOf('pc_notes_') === 0) {
      try {
        notes[k.slice(9)] = JSON.parse(v);
      } catch (e) {}
    } else if (k.indexOf('pc_passages_') === 0) {
      try {
        passages[k.slice(12)] = JSON.parse(v);
      } catch (e) {}
    } else if (k.indexOf('pc_status_') === 0) {
      reading_state[k] = v;
    } else if (k.indexOf('pc_progress_') === 0) {
      reading_state[k] = v;
    } else if (k.indexOf('pc_lang_') === 0) {
      reading_state[k] = v;
    } else if (k.indexOf('pc_companion_lang_override_') === 0) {
      reading_state[k] = v;
    } else if (prefKeys.indexOf(k) !== -1) {
      preferences[k] = v;
    }
  }
  var shelf = [];
  try {
    shelf = JSON.parse(localStorage.getItem('pc_shelf_books') || '[]');
  } catch (e) {}
  var sync_meta = {};
  try {
    sync_meta = JSON.parse(localStorage.getItem('pc_sync_meta') || '{}');
  } catch (e) {}
  return {
    schema_version: 1,
    last_synced: new Date().toISOString(),
    sync_meta: sync_meta,
    conversations: conversations,
    notes: notes,
    passages: passages,
    shelf: shelf,
    preferences: preferences,
    reading_state: reading_state
  };
}
function mergeFlatMaps(localMap, remoteMap, remoteWins) {
  var out = {};
  var k;
  for (k in localMap) {
    if (Object.prototype.hasOwnProperty.call(localMap, k)) out[k] = localMap[k];
  }
  for (k in remoteMap) {
    if (!Object.prototype.hasOwnProperty.call(remoteMap, k)) continue;
    if (!Object.prototype.hasOwnProperty.call(out, k) || remoteWins) out[k] = remoteMap[k];
  }
  return out;
}
function mergeSyncPayloads(local, remote) {
  // Conversations — by id, keep newer lastUpdated
  var merged = JSON.parse(JSON.stringify(local));
  var bk;
  Object.keys(remote.conversations || {}).forEach(function (bk) {
    var localConvs = merged.conversations[bk] || [];
    var remoteConvs = remote.conversations[bk] || [];
    var byId = {};
    localConvs.forEach(function (c) {
      byId[c.id] = c;
    });
    remoteConvs.forEach(function (c) {
      var existing = byId[c.id];
      if (!existing || (c.lastUpdated || 0) > (existing.lastUpdated || 0)) byId[c.id] = c;
    });
    merged.conversations[bk] = Object.keys(byId).map(function (id) {
      return byId[id];
    });
  });
  // Notes — union by ts
  Object.keys(remote.notes || {}).forEach(function (bk) {
    var localNotes = merged.notes[bk] || [];
    var remoteNotes = remote.notes[bk] || [];
    var seen = {};
    localNotes.forEach(function (n) {
      seen[n.ts] = n;
    });
    remoteNotes.forEach(function (n) {
      if (!seen[n.ts]) seen[n.ts] = n;
    });
    merged.notes[bk] = Object.keys(seen).map(function (ts) {
      return seen[ts];
    });
  });
  // Passages — union by text (use earliest ts on conflict)
  Object.keys(remote.passages || {}).forEach(function (bk) {
    var localPs = merged.passages[bk] || [];
    var remotePs = remote.passages[bk] || [];
    var byText = {};
    localPs.forEach(function (p) {
      byText[p.text] = p;
    });
    remotePs.forEach(function (p) {
      if (!byText[p.text]) byText[p.text] = p;else if ((p.ts || 0) < (byText[p.text].ts || 0)) byText[p.text] = p;
    });
    merged.passages[bk] = Object.keys(byText).map(function (t) {
      return byText[t];
    });
  });
  // Shelf — union by title|author
  var shelfSeen = {};
  (merged.shelf || []).forEach(function (b) {
    shelfSeen[(b.title || '') + '|' + (b.author || '')] = b;
  });
  (remote.shelf || []).forEach(function (b) {
    var k = (b.title || '') + '|' + (b.author || '');
    if (!shelfSeen[k]) shelfSeen[k] = b;
  });
  merged.shelf = Object.keys(shelfSeen).map(function (k) {
    return shelfSeen[k];
  });
  // Preferences — per-key union; on a conflicting key the newer side
  // (by sync_meta.preferences_modified) wins. Keys present on only one
  // side always survive — wholesale replacement dropped them.
  var localPM = local.sync_meta && local.sync_meta.preferences_modified || 0;
  var remotePM = remote.sync_meta && remote.sync_meta.preferences_modified || 0;
  merged.preferences = mergeFlatMaps(local.preferences || {}, remote.preferences || {}, remotePM > localPM);
  // Reading state — same per-key union; statuses for books only touched on
  // one device must not be lost.
  var localSM = local.sync_meta && local.sync_meta.status_modified || 0;
  var remoteSM = remote.sync_meta && remote.sync_meta.status_modified || 0;
  merged.reading_state = mergeFlatMaps(local.reading_state || {}, remote.reading_state || {}, remoteSM > localSM);
  // sync_meta — take the max of each category timestamp
  var ms = {};
  ['shelf_modified', 'preferences_modified', 'status_modified'].forEach(function (k) {
    ms[k] = Math.max(local.sync_meta && local.sync_meta[k] || 0, remote.sync_meta && remote.sync_meta[k] || 0);
  });
  merged.sync_meta = ms;
  return merged;
}
function applySyncPayloadToLocal(merged) {
  // Conversations
  Object.keys(merged.conversations || {}).forEach(function (bk) {
    localStorage.setItem('pc_convs_' + bk, JSON.stringify(merged.conversations[bk]));
  });
  // Notes
  Object.keys(merged.notes || {}).forEach(function (bk) {
    localStorage.setItem('pc_notes_' + bk, JSON.stringify(merged.notes[bk]));
  });
  // Passages
  Object.keys(merged.passages || {}).forEach(function (bk) {
    localStorage.setItem('pc_passages_' + bk, JSON.stringify(merged.passages[bk]));
  });
  // Shelf
  localStorage.setItem('pc_shelf_books', JSON.stringify(merged.shelf || []));
  // Preferences
  var prefs = merged.preferences || {};
  Object.keys(prefs).forEach(function (k) {
    if (prefs[k] != null) localStorage.setItem(k, String(prefs[k]));
  });
  // Reading state
  var rs = merged.reading_state || {};
  Object.keys(rs).forEach(function (k) {
    if (rs[k] != null) localStorage.setItem(k, String(rs[k]));
  });
  // sync_meta
  if (merged.sync_meta) localStorage.setItem('pc_sync_meta', JSON.stringify(merged.sync_meta));
}
function gdriveFindDataFile(folderId) {
  var q = "name='pagecommons-data.json' and trashed=false and '" + folderId + "' in parents";
  return gdriveFetch('https://www.googleapis.com/drive/v3/files?q=' + encodeURIComponent(q) + '&fields=files(id,name)').then(gdriveJson).then(function (d) {
    return d && d.files && d.files.length ? d.files[0].id : null;
  });
}
function gdriveFindFileInFolder(folderId, filename) {
  var escapedName = filename.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  var q = "name='" + escapedName + "' and trashed=false and '" + folderId + "' in parents";
  return gdriveFetch('https://www.googleapis.com/drive/v3/files?q=' + encodeURIComponent(q) + '&fields=files(id)').then(gdriveJson).then(function (d) {
    return d && d.files && d.files.length ? d.files[0].id : null;
  });
}
function gdriveUploadMarkdown(folderId, existingId, filename, content) {
  var boundary = '----pc_md_' + Date.now();
  var meta = existingId ? {} : {
    name: filename,
    parents: [folderId],
    mimeType: 'text/markdown'
  };
  var bodyStr = '--' + boundary + '\r\n' + 'Content-Type: application/json; charset=UTF-8\r\n\r\n' + JSON.stringify(meta) + '\r\n' + '--' + boundary + '\r\n' + 'Content-Type: text/markdown\r\n\r\n' + content + '\r\n' + '--' + boundary + '--';
  var url = existingId ? 'https://www.googleapis.com/upload/drive/v3/files/' + existingId + '?uploadType=multipart' : 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
  return gdriveFetch(url, {
    method: existingId ? 'PATCH' : 'POST',
    headers: {
      'Content-Type': 'multipart/related; boundary=' + boundary
    },
    body: bodyStr
  }).then(gdriveJson);
}
function gdriveDownloadJson(fileId) {
  return gdriveFetch('https://www.googleapis.com/drive/v3/files/' + fileId + '?alt=media').then(gdriveJson);
}
function gdriveDownloadText(fileId) {
  return gdriveFetch('https://www.googleapis.com/drive/v3/files/' + fileId + '?alt=media').then(function (r) {
    if (!r.ok) throw new Error('Drive request failed (HTTP ' + r.status + ')');
    return r.text();
  });
}
function gdriveUploadJson(folderId, fileId, payload) {
  // Multipart upload: metadata + body. If fileId given, PATCH; else POST.
  var boundary = '----pc_boundary_' + Date.now();
  var meta = fileId ? {} : {
    name: 'pagecommons-data.json',
    parents: [folderId]
  };
  var bodyStr = '--' + boundary + '\r\n' + 'Content-Type: application/json; charset=UTF-8\r\n\r\n' + JSON.stringify(meta) + '\r\n' + '--' + boundary + '\r\n' + 'Content-Type: application/json\r\n\r\n' + JSON.stringify(payload) + '\r\n' + '--' + boundary + '--';
  var url = fileId ? 'https://www.googleapis.com/upload/drive/v3/files/' + fileId + '?uploadType=multipart' : 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
  return gdriveFetch(url, {
    method: fileId ? 'PATCH' : 'POST',
    headers: {
      'Content-Type': 'multipart/related; boundary=' + boundary
    },
    body: bodyStr
  }).then(gdriveJson);
}
function syncConversationMarkdowns(convFolderId) {
  var pad = function pad(n) {
    return n < 10 ? '0' + n : '' + n;
  };

  // Build bookKey → title map from shelf
  var shelf = [];
  try {
    shelf = JSON.parse(localStorage.getItem('pc_shelf_books') || '[]');
  } catch (e) {}
  var titleMap = {};
  for (var si = 0; si < shelf.length; si++) {
    titleMap[bookKey(shelf[si])] = shelf[si].title || 'Unknown';
  }
  var cName = STATE && STATE.companionName || localStorage.getItem('pc_companion_name') || 'Companion';

  // Collect upload tasks from all pc_convs_* keys
  var tasks = [];
  for (var li = 0; li < localStorage.length; li++) {
    var k = localStorage.key(li);
    if (!k || k.indexOf('pc_convs_') !== 0) continue;
    var bk = k.slice(9);
    var convList = [];
    try {
      convList = JSON.parse(localStorage.getItem(k) || '[]');
    } catch (e) {}
    if (!convList.length) continue;
    var bTitle = titleMap[bk] || 'Unknown Book';
    var titleSafe = bTitle.replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, ' ').trim().slice(0, 80);

    // Keep only conversations with messages, sorted oldest-first
    var withMsgs = [];
    for (var ci = 0; ci < convList.length; ci++) {
      if (convList[ci].messages && convList[ci].messages.length) withMsgs.push(convList[ci]);
    }
    withMsgs.sort(function (a, b) {
      var ta = a.lastUpdated || 0;
      var tb = b.lastUpdated || 0;
      return ta > tb ? 1 : ta < tb ? -1 : 0;
    });
    for (var wi = 0; wi < withMsgs.length; wi++) {
      var conv = withMsgs[wi];
      var d = conv.lastUpdated ? new Date(conv.lastUpdated) : new Date();
      var iso = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
      var dateStr = d.toLocaleDateString(dateLocale(), {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      var fname = withMsgs.length > 1 ? iso + '-' + titleSafe + '-' + (wi + 1) + '.md' : iso + '-' + titleSafe + '.md';
      var lines = ['# ' + bTitle, '', '**Exported from Page Commons:** ' + dateStr, '', '---', ''];
      for (var mi = 0; mi < conv.messages.length; mi++) {
        var m = conv.messages[mi];
        lines.push(m.role === 'user' ? '**You**' : '**' + cName + '**');
        lines.push('');
        lines.push(m.content);
        lines.push('');
      }
      tasks.push({
        filename: fname,
        content: lines.join('\n')
      });
    }
  }

  // Upload sequentially: find existing file by name then create/update
  return tasks.reduce(function (chain, task) {
    return chain.then(function () {
      return gdriveFindFileInFolder(convFolderId, task.filename).then(function (existingId) {
        return gdriveUploadMarkdown(convFolderId, existingId, task.filename, task.content);
      });
    });
  }, Promise.resolve());
}
function syncToDrive() {
  showSyncMessage('Syncing…', false);
  var mainFolderId;
  return refreshGDriveToken().then(function () {
    return getOrCreatePageCommonsFolder();
  }).then(function (folderId) {
    mainFolderId = folderId;
    return gdriveFindDataFile(folderId).then(function (fileId) {
      var local = buildSyncPayload();
      if (!fileId) {
        return gdriveUploadJson(folderId, null, local);
      }
      return gdriveDownloadJson(fileId).then(function (remote) {
        var merged = mergeSyncPayloads(local, remote || {});
        return gdriveUploadJson(folderId, fileId, merged).then(function () {
          applySyncPayloadToLocal(merged);
        });
      });
    });
  }).then(function () {
    return getOrCreateConversationsFolder(mainFolderId).then(function (convFolderId) {
      return syncConversationMarkdowns(convFolderId);
    });
  }).then(function () {
    var ts = Date.now();
    localStorage.setItem('pc_gdrive_last_synced', String(ts));
    showSyncMessage('Synced successfully.', false);
    renderDriveStatus();
  }).catch(function (err) {
    showSyncMessage('Sync failed — try again.', true);
  });
}
function exportConversationToDrive(book, fullMessages) {
  // Builds the same markdown the local export does, uploads to
  // Page Commons/conversations/. Returns the Drive web link.
  var now = new Date();
  var pad = function pad(n) {
    return n < 10 ? '0' + n : '' + n;
  };
  var iso = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
  var date = now.toLocaleDateString(dateLocale(), {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  var companionName = STATE.companionName || 'Companion';
  var lines = ['# ' + (book ? book.title : 'Conversation'), '', '**Author:** ' + (book ? book.author : 'Unknown'), '**Exported from Page Commons:** ' + date, '', '---', ''];
  fullMessages.forEach(function (m) {
    lines.push(m.role === 'user' ? '**You**' : '**' + companionName + '**');
    lines.push('');
    lines.push(m.content);
    lines.push('');
  });
  var md = lines.join('\n');
  var titlePart = book && book.title ? book.title.replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, ' ').trim() : 'Conversation';
  var filename = iso + '-' + titlePart + '.md';
  return refreshGDriveToken().then(function () {
    return getOrCreatePageCommonsFolder();
  }).then(function (folderId) {
    return getOrCreateConversationsFolder(folderId);
  }).then(function (convFolderId) {
    var boundary = '----pc_md_' + Date.now();
    var meta = {
      name: filename,
      parents: [convFolderId],
      mimeType: 'text/markdown'
    };
    var bodyStr = '--' + boundary + '\r\n' + 'Content-Type: application/json; charset=UTF-8\r\n\r\n' + JSON.stringify(meta) + '\r\n' + '--' + boundary + '\r\n' + 'Content-Type: text/markdown\r\n\r\n' + md + '\r\n' + '--' + boundary + '--';
    return gdriveFetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/related; boundary=' + boundary
      },
      body: bodyStr
    }).then(gdriveJson);
  });
}
function disconnectGDrive() {
  GDRIVE_KEYS_DEVICE_LOCAL.forEach(function (k) {
    localStorage.removeItem(k);
  });
  renderDriveStatus();
}

// ── Kindle clippings import from Drive ──────────────────────────────────────
// User uploads My Clippings.txt to their "Page Commons" Drive folder;
// we download it, parse it, and merge highlights into pc_highlights.
// The AI companion already picks up relevant highlights in buildSystemPrompt().

function importClippingsFromDrive() {
  var msgEl = document.getElementById('clippings-drive-msg');
  var confirmEl = document.getElementById('clippings-drive-confirm');
  if (confirmEl) {
    confirmEl.style.display = 'none';
    confirmEl.innerHTML = '';
  }
  if (msgEl) {
    msgEl.style.display = 'block';
    msgEl.textContent = 'Looking for My Clippings.txt in your Page Commons folder…';
  }
  getOrCreatePageCommonsFolder().then(function (folderId) {
    return gdriveFindFileInFolder(folderId, 'My Clippings.txt');
  }).then(function (fileId) {
    if (!fileId) {
      if (msgEl) msgEl.textContent = 'My Clippings.txt not found. Upload it to your “Page Commons” folder in Google Drive, then try again.';
      return;
    }
    if (msgEl) msgEl.textContent = 'Found — downloading…';
    return gdriveDownloadText(fileId).then(function (text) {
      var fresh = parseClippingsText(text);
      if (!fresh.length) {
        if (msgEl) msgEl.textContent = 'No highlights found in the file.';
        return;
      }
      // Merge with existing highlights, deduplicating by title+text pair.
      var existing = STATE.highlights.slice();
      var seen = {};
      var i;
      for (i = 0; i < existing.length; i++) {
        seen[existing[i].title + '\x00' + existing[i].text] = 1;
      }
      for (i = 0; i < fresh.length; i++) {
        var dk = fresh[i].title + '\x00' + fresh[i].text;
        if (!seen[dk]) {
          existing.push(fresh[i]);
          seen[dk] = 1;
        }
      }
      STATE.highlights = existing;
      localStorage.setItem('pc_highlights', JSON.stringify(existing));
      if (msgEl) {
        msgEl.style.display = 'none';
      }
      showDriveClippingsBooksConfirm(fresh);
    });
  }).catch(function (e) {
    if (msgEl) msgEl.textContent = 'Import failed — ' + (e && e.message ? e.message : 'please try again.');
  });
}
function showDriveClippingsBooksConfirm(highlights) {
  var confirmEl = document.getElementById('clippings-drive-confirm');
  if (!confirmEl) return;

  // Aggregate unique books and their highlight counts.
  var bookMap = {};
  var i, k;
  for (i = 0; i < highlights.length; i++) {
    var h = highlights[i];
    k = h.title + '\x00' + h.author;
    if (!bookMap[k]) bookMap[k] = {
      title: h.title,
      author: h.author,
      count: 0
    };
    bookMap[k].count++;
  }
  var shelf = getShelfBooks();
  var books = [];
  var keys = Object.keys(bookMap);
  for (i = 0; i < keys.length; i++) {
    var entry = bookMap[keys[i]];
    var onShelf = false;
    var bk = bookKey(entry);
    for (var j = 0; j < shelf.length; j++) {
      if (bookKey(shelf[j]) === bk) {
        onShelf = true;
        break;
      }
    }
    books.push({
      title: entry.title,
      author: entry.author,
      count: entry.count,
      onShelf: onShelf
    });
  }
  // New books first (sorted by highlight count), then already-on-shelf.
  books.sort(function (a, b) {
    if (a.onShelf !== b.onShelf) return a.onShelf ? 1 : -1;
    return b.count - a.count;
  });
  var newCount = 0;
  for (i = 0; i < books.length; i++) {
    if (!books[i].onShelf) newCount++;
  }
  function esc(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  var html = '<p style="margin-top:0;margin-bottom:14px"><strong>' + esc(t('js.highlights_imported')) + '</strong> ' + esc(newCount > 0 ? t('js.select_books_to_add') : t('js.all_books_on_shelf')) + '</p>' + '<div id="clippings-book-list">';
  for (i = 0; i < books.length; i++) {
    var b = books[i];
    var et = esc(b.title);
    var ea = esc(b.author);
    var countNote = ' <span style="font-size:0.8rem;color:#777777">(' + b.count + ' highlight' + (b.count !== 1 ? 's' : '') + ')</span>';
    if (b.onShelf) {
      html += '<div style="padding:10px 0;border-bottom:1px solid #eeeeee;color:#777777">' + et + ' <em>by</em> ' + ea + ' <span style="font-size:0.8rem">(already on shelf)</span></div>';
    } else {
      html += '<div style="padding:10px 0;border-bottom:1px solid #eeeeee">' + '<label style="display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:start;' + '-webkit-align-items:flex-start;align-items:flex-start;cursor:pointer">' + '<input type="checkbox" data-title="' + et + '" data-author="' + ea + '" checked ' + 'style="margin-right:10px;margin-top:3px;-webkit-flex-shrink:0;flex-shrink:0">' + '<span>' + et + ' <em>by</em> ' + ea + countNote + '</span></label></div>';
    }
  }
  html += '</div>';
  if (newCount > 0) {
    html += '<button class="btn btn-primary" style="margin-top:16px;width:100%" onclick="confirmAddDriveBooks()">' + esc(t('js.add_selected_to_shelf')) + '</button>';
  }
  html += '<p style="margin-top:10px;font-size:0.8rem;color:#777777">' + 'Your highlights inform your companion conversations — no action needed for that.</p>';
  confirmEl.innerHTML = html;
  confirmEl.style.display = 'block';
}
function confirmAddDriveBooks() {
  var listEl = document.getElementById('clippings-book-list');
  var confirmEl = document.getElementById('clippings-drive-confirm');
  if (!listEl) return;
  var checkboxes = listEl.querySelectorAll('input[type=checkbox]');
  var added = 0;
  for (var i = 0; i < checkboxes.length; i++) {
    var cb = checkboxes[i];
    if (cb.checked) {
      addBookToShelf({
        title: cb.getAttribute('data-title'),
        author: cb.getAttribute('data-author')
      });
      added++;
    }
  }
  if (confirmEl) {
    confirmEl.innerHTML = '<p style="margin-top:0">' + (added > 0 ? added + ' book' + (added !== 1 ? 's' : '') + ' added to your shelf.' : 'No books added.') + ' Your highlights are active — your companion will use them in chat.</p>';
  }
}

// Manual sync trigger from the conversation-view toolbar. Connect/disconnect
// stays in Preferences; this is just the "sync now" shortcut where it's useful.
function syncFromToolbar() {
  if (!localStorage.getItem('pc_gdrive_refresh_token')) {
    showToolbarMsg('Connect Google Drive in Preferences to sync.');
    return;
  }
  syncToDrive();
}
function showSyncMessage(text, isError) {
  // Mirror to the in-chat toolbar message so the toolbar Sync button gives
  // feedback when the Preferences panel isn't on screen.
  if (typeof currentScreen === 'function' && currentScreen() === 'companion') {
    showToolbarMsg(text);
  }
  var el = document.getElementById('gdrive-msg');
  if (!el) return;
  el.style.display = 'block';
  el.style.color = isError ? '#cc0000' : '#006600';
  el.textContent = text;
  if (showSyncMessage._t) clearTimeout(showSyncMessage._t);
  showSyncMessage._t = setTimeout(function () {
    el.style.display = 'none';
  }, 5000);
}
function renderDriveStatus() {
  var connected = !!localStorage.getItem('pc_gdrive_refresh_token');
  var notConnected = document.getElementById('gdrive-not-connected');
  var connectedBlock = document.getElementById('gdrive-connected');
  var emailEl = document.getElementById('gdrive-email');
  var lastEl = document.getElementById('gdrive-last-synced');
  // Show the toolbar Sync shortcut only when Drive is connected.
  var syncBtn = document.getElementById('sync-toolbar-btn');
  if (syncBtn) syncBtn.style.display = connected ? '' : 'none';
  if (!notConnected || !connectedBlock) return;
  if (connected) {
    notConnected.style.display = 'none';
    connectedBlock.style.display = 'block';
    if (emailEl) emailEl.textContent = localStorage.getItem('pc_gdrive_user_email') || '(connected)';
    var last = localStorage.getItem('pc_gdrive_last_synced');
    if (lastEl) {
      if (last) {
        var d = new Date(parseInt(last, 10));
        lastEl.textContent = t('js.last_synced') + d.toLocaleString(dateLocale(), {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } else {
        lastEl.textContent = t('js.last_synced_never');
      }
    }
  } else {
    notConnected.style.display = 'block';
    connectedBlock.style.display = 'none';
  }
}
function init() {
  // Handle OAuth callback first — strip ?code= from URL before any routing.
  // Match the real "code" param only (not e.g. ?promocode=...).
  if (getQueryParam(window.location.search, 'code')) {
    handleGDriveCallback().then(function () {
      runInitInner();
      try {
        renderDriveStatus();
        navigate('preferences');
      } catch (e) {}
    });
    return;
  }
  runInitInner();
}
function runInitInner() {
  // Paint the interface in the saved language before anything else renders,
  // so no screen flashes English on a Chinese install.
  applyLanguage(getUILang());
  // Migrate any legacy (truncated) book keys before we read per-book data.
  migrateBookKeys();
  try {
    var aiMode = localStorage.getItem('pc_ai_mode');
    if (aiMode) {
      STATE.aiMode = aiMode;
    } else if (localStorage.getItem('pc_api_key')) {
      // existing user who had a key before onboarding was added — treat as byok
      STATE.aiMode = 'byok';
      localStorage.setItem('pc_ai_mode', 'byok');
    }
    // Existing users who already had a configured app should skip the
    // first-run preferences pass.
    if (!localStorage.getItem('pc_preferences_set') && (localStorage.getItem('pc_api_key') || localStorage.getItem('pc_user_name') || localStorage.getItem('pc_companion_name') || localStorage.getItem('pc_font_size'))) {
      localStorage.setItem('pc_preferences_set', '1');
    }
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
    }
    var uname = localStorage.getItem('pc_user_name');
    if (uname) STATE.userName = uname;
    var clang = localStorage.getItem('pc_companion_lang');
    if (clang) STATE.companionLangOverride = clang;
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
      var initLenOpts = document.querySelectorAll('.length-opt');
      for (var ri = 0; ri < initLenOpts.length; ri++) {
        var rb = initLenOpts[ri];
        rb.dataset.length === rl ? rb.classList.add('active') : rb.classList.remove('active');
      }
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
  } catch (e) {}
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
