# Page Commons — Status

---

## Session ending 2026-05-08

**Branch:** `claude/review-and-plan-HPGDI`
**Build marker:** `36641b5+` (visible in hall tagline, bottom right)
**Declared version:** v0.25 (not bumped this session — suggest v0.26 on next release)

---

### Completed this session

**Language detection overhaul**
- Companion now auto-detects the book's language and responds in it
- `detectLanguage()` extended to distinguish Traditional Chinese from Simplified:
  - `zh-TW`, `zh-HK`, `zh-Hant` → Traditional Chinese
  - `zh-CN`, `zh-SG`, `zh-Hans` → Simplified Chinese
  - Bare `zh` or no lang code → scans title + author for 50+ Traditional-only Unicode
    code points (傳, 連, 種, 說, 來, 國, 為, 時, …)
- Language instruction sent as system message (not user prompt) across all three
  AI providers — the only way to reliably enforce it
- Language state refactored: `STATE.detectedLang` set synchronously in `selectBook`
  so it's available before any async steps; removed dependency on fragile
  `STATE.chatLanguage === 'native'` checks threading through async chains
- Ice breaker cache key includes language to prevent stale English prompts
  being served for non-English books
- Status screen heading uses Unicode character detection rather than language
  state, so it renders correctly regardless of async order

**Companion language setting**
- New dropdown in Settings: "Auto (match book)" (default) or any specific language
- Stored as `pc_companion_lang` in localStorage; `STATE.companionLangOverride`
- Feeds `getCompanionLang()` helper used by both `buildSystemPrompt` and
  `fetchAIIcebreakers`
- Initial render used `-webkit-appearance:none` without a custom arrow indicator —
  fixed with a `▼` overlay inside a relative wrapper

**Kobo highlights import**
- New section on search screen: upload `KoboReader.sqlite` from the `.kobo` folder
- sql.js (WebAssembly) loaded lazily from CDN — no overhead for non-Kobo users
- Queries `Bookmark JOIN content` tables; extracts title, author, highlight text,
  annotation notes, date, ChapterProgress (0.0–1.0)
- Prefers `BookTitle` over chapter `Title`; strips `"By "` prefix from Attribution
- `source: 'kobo'` tagged per highlight; panel shows "from your Kobo" not "Kindle"
- `chapterProgress` stored on each highlight for future reading progress indicator
- File never leaves the browser

**Randomised search heading**
- Static "Which book?" replaced with a pool of 7 variants
- 5 personalised variants when a name is set in Settings (e.g. "What are you
  reading, Alex?")
- Picked fresh on every navigate to the search screen

**Discovery companion mode**
- "Is this for me?" button added below every search result card (italic, secondary)
- `STATE.companionMode = 'discover'` — completely separate from reading mode
- Bypasses status screen; goes straight to companion
- Book is NOT added to shelf in discover mode
- Static preference-question ice breakers ("What kinds of books have you loved
  lately?", "What mood are you in?", etc.) — no AI call needed
- Discovery system prompt: asks ONE preference question first, then describes the
  book through the reader's lens (pace, texture, what readers wish they'd known)
  — never plot, never spoilers; includes reading time estimate from pageCount
- Companion header shows "Is this for me?" as status label
- Age gate wired up for discover flow via `_pendingDiscoverMode` flag
- Normal book selection (`selectBook`) always resets mode to 'reading'

---

### Tested by user

- ✓ Language auto-detection working on Traditional Chinese books
  (倪匡傳：哈哈哈哈, 連城訣, 第二種人)
- ✓ Build marker visible in hall tagline
- ✓ Status screen rendering in book language (not English)
- ✗ Initial fix had Simplified/Traditional mismatch: status screen showed
  Simplified, ice breakers showed Traditional — root cause was `detectLanguage`
  returning generic 'Chinese' for all zh variants. Fixed by distinguishing variants.
- ✗ Companion language dropdown not visible — root cause was `-webkit-appearance:none`
  hiding native select arrow with no replacement. Fixed with custom `▼` overlay.

### Not yet tested by user

- Discovery companion mode (no user feedback received)
- Kobo highlights import on a real device (sql.js WASM dependency is a risk on
  older Kobo WebKit — Libra Colour should be fine, older models uncertain)
- Companion language override setting (dropdown fix not yet confirmed)
- Randomised search heading

---

### Known issues / watch points

- **Kobo WebAssembly**: sql.js requires WASM support. Kobo Libra Colour (the
  target device) runs a modern enough browser, but any device older than ~2020
  may silently fail. The error message surfaces in `#kobo-status` — worth testing
  on device before shipping to users.
- **Discovery mode and shelf**: if a user starts in discover mode then decides
  they want to read the book, they need to go back to search and select it via
  the main card tap. There is no "I'll read this" button inside the discover
  companion. Could be a friction point.
- **Companion language for returning books**: the `chatLanguage` flow for books
  already on the shelf reads from `pc_lang_[bookKey]` in localStorage. The global
  `companionLangOverride` correctly takes precedence in `buildSystemPrompt` and
  `fetchAIIcebreakers`, but ice breaker cache keys still include `chatLanguage`
  — so cached ice breakers from before the override was set may be served. Clears
  itself naturally as cache expires; not a breaking issue.

---

### Next up (in priority order)

1. **Surprise Me** (Priority 1) — two modes: shelf-based and random Open Library.
   Open Library has a random works endpoint: `openlibrary.org/random.json`
   (redirects to a work). Shelf mode picks from `STATE.shelf` weighted by recency.

2. **Affiliate links** (Priority 1) — show on book selection. Amazon Associates,
   Bookshop.org, Waterstones (UK), WorldCat (always free). Clear disclosure copy.
   Natural fit to show inside the Discovery companion flow too.

3. **Export / import localStorage** (Priority 3) — single JSON dump of all
   `pc_*` keys. Restore on new device. No server needed. In Settings screen.
   Highest-value sync option before accounts exist.

4. **XHR fallback for fetch** (Priority 2) — deferred until real device testing
   confirms fetch is broken on a target device. Don't implement speculatively.

5. **Plausible analytics** (Priority 5) — single script tag, no cookies, no
   personal data. Easy to ship, useful signal once real users arrive.
