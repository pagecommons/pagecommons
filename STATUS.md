# Page Commons — Current Status

Last updated: June 4, 2026
Current version: v0.32
Updated by: Claude session — V1 scope trim (remove Surprise Me, remove Kobo import)

## What was done this session [v0.32]

### V1 scope trim ✓
- Removed Surprise Me feature entirely
  - app.js: STATE.surprise* fields, 'surprise' from SCREENS and BACK_FALLBACK,
    handleRoute initSurpriseScreen call, LANG_PROMPT_MAP, initSurpriseScreen,
    startSurpriseMe, selectSurpriseGenre, selectSurpriseLanguage,
    surpriseParseError, displaySurpriseResult, surpriseDiscover, surpriseSelect,
    surpriseNotForMe, tryAnotherBook, and the now-unused callGroqJSON helper
  - index.html: "Surprise me →" button on search, "Surprise me again" button in
    discover-convert-bar, and the entire #screen-surprise section
  - LANG_NAME_TO_CODE / LANG_CODE_TO_NAME / buildBookFromGoogleItem kept — still
    used by manual entry and other flows
- Removed Kobo highlights import (kept Kindle import)
  - app.js: KOBO HIGHLIGHTS IMPORT block (SQL_JS_CDN/SQL_WASM_CDN, loadSqlJs,
    parseKoboDatabase, processKoboHighlights), Kobo source label in the
    highlights panel (now always "Kindle")
  - index.html: "Or import from Kobo" section under search
  - Renamed the generic init-error div from kobo-init-error to pc-init-error
- Rationale: Surprise Me had quality issues with non-English recommendations and
  duplicated the existing search flow. Kobo import not yet tested by the user;
  drop it for V1 to reduce surface area, can return in a later release.

## What was done last session [v0.31]

### Onboarding Flow & AI-Mode System ✓
- New `#onboarding` screen shown after T&C accept for first-time users
  (returning users with pc_ai_mode already set skip it and go straight to handleRoute)
- Two choices: "Use free shared companion" (→ home) / "Use my own API key" (→ #key)
- `chooseAIMode(mode)` saves `pc_ai_mode` to localStorage and routes accordingly
- Existing users who already have a key migrated to `pc_ai_mode = 'byok'` silently
- Navigation gates relaxed: `!STATE.apiKey && STATE.aiMode !== 'shared'` — shared-mode
  users reach #search and #companion without a key; callAI() already falls through to
  callFreeTier() when no apiKey is set
- Settings: new "AI companion" section with Free shared pool / My own key toggle
  (`switchAIMode()`, `updateAIModeUI()`); label renamed "AI provider" → "API key & provider"
- `saveKey()` also sets `pc_ai_mode = 'byok'` so key entry always implies BYOK mode

### Surprise Me fixes (from previous session) ✓
- Error message no longer names underlying model or blames free-pool users
- "Surprise me anyway" grammar fix (anyGenre flag → "book of any genre")
- JSON mode + strict validation on Surprise Me suggestions
- Groq tip shown only for BYOK Groq + non-English (not to free-pool users)

## What was done last session [v0.30]

### Icebreaker quality + reliability ✓
- Hardened the icebreaker parser (parseIcebreakerList): tolerates markdown
  fences, smart quotes, surrounding prose, and numbered/bulleted/quoted lists
- Enforce the target language inside the user prompt (not just
  system/systemInstruction) so Gemini stops defaulting to English on
  non-English books
- Gemini icebreaker call requests responseMimeType application/json for
  reliable parseable output
- Made the static fallback language-aware (English + Traditional/Simplified
  Chinese, Japanese, Korean) so a non-English book never shows English prompts
- Genre-aware prompt: classify fiction vs non-fiction; non-fiction focuses on
  argument/ideas, never "characters/plot" (fixes Das Kapital-style misfires)
- Reworded icebreakers into first-person reader voice (the reader's own
  opening messages), since tapping one fills the chat box and is sent as the
  reader's message — interviewer-voice prompts were backwards

### AI model changes ✓
- BYOK Gemini upgraded gemini-2.0-flash → gemini-2.5-flash (all 5 call sites),
  with thinkingConfig.thinkingBudget = 0 so thinking tokens don't consume the
  maxOutputTokens caps (avoids truncated/empty JSON + chat replies)
- Free shared pool (api/ai.js) switched from Gemini to Groq
  (llama-3.3-70b-versatile) with multi-key support (GROQ_API_KEYS and/or
  GROQ_API_KEY_1..5), random key pick + failover on rate-limit
  - ACTION REQUIRED: set GROQ_API_KEY(S) in Vercel env or the free tier 503s.
    GEMINI_API_KEY is no longer used by the free pool.
  - NOTE: stacking multiple free Groq keys to dodge rate limits likely
    violates Groq ToS — prefer one paid key.

### Navigation & UX polish ✓
- Unified back navigation: a back stack maintained in showScreen() with a
  goBack() helper + per-screen fallbacks; every back link routes through
  goBack(); added missing back links to status and language screens
- Reading-status screen: removed the redundant "considering" option (still
  offered via "Find out if it's for me")
- Renamed book-detail "I'm reading this" → "I have this book"
- Surprise Me: "Try another book" → "Surprise me again" (disambiguates from
  header "Change book")
- Added a 1–2 sentence app intro under "Welcome to Page Commons"
- Removed the self-referential "Support it →" footer link from support.html
- Removed misleading "Get free key" links from the API provider buttons

### Architecture discussion (no code) — open decision
- Debated SPA vs MPA, e-ink vs mobile, and PWA→Capacitor. Conclusion: don't
  migrate pre-launch; the big framework/backend decision belongs at V2 (which
  needs a server + accounts anyway). See chat history. Tiered privacy model
  (BYOK local-first; opt-in minimal data for social) resolves the earlier
  privacy-vs-roadmap tension.

## Previous session

### Data Export / Import (localStorage backup) ✓ [v0.29]
- New "Your data" section on #settings screen (below Text size)
- Explanation line: "Back up your Page Commons data or restore it on another device."
- Two full-width .btn buttons, stacked, 48px min height (≥44px tap target)
- Export: collects all localStorage keys starting with `pc_`, builds JSON
  { exported_at, version, data: {...} }, triggers client-side download via
  temporary anchor + Blob URL, file named `pagecommons-backup-YYYY-MM-DD.json`
- Import: hidden file input (accept .json), triggered by visible button;
  FileReader → JSON.parse → validates presence of `data` object
- Invalid file shows inline red error "This doesn't look like a Page Commons
  backup file." (no alert)
- Valid import merges into localStorage (overwrites conflicts, keeps other
  keys), shows inline green "Data restored. Reload the page to see your shelf
  and settings." — no auto reload
- All messages inline below button: #cc0000 errors, #006600 success, auto-hide
  after 5s. No alert()/confirm() anywhere.
- Entirely client-side (FileReader + Blob, no libraries, no server)
- ES5-safe; transpiled to app.transpiled.js (IE 11 target)
- Logic verified in Node harness (export key filtering, metadata, filename,
  import validation, merge/overwrite behaviour, error/success messaging)

### Build note
- app.transpiled.js regenerated with:
  npx babel app.js -o app.transpiled.js \
    --plugins @babel/plugin-transform-regenerator,@babel/plugin-transform-member-expression-literals,@babel/plugin-transform-property-literals,@babel/plugin-transform-reserved-words \
    --presets @babel/preset-env
  (reproduces prior committed output style: "use strict" + bracket reserved words)

## Previous session

### Icebreaker Prompt Regression Fix ✓
- Root cause: Race condition in selectBook() — fetchAndCacheSubjects was async fire-and-forget
- populateIcebreakers ran immediately after, before subjects were cached from OpenLibrary
- fetchAIIcebreakers received no book subjects, generated generic prompts instead
- Fixed by: Making fetchAndCacheSubjects return Promise, awaiting it in selectBook before launchCompanion
- Result: Book subjects now cached before icebreakers generated; AI gets genre/theme context
- Prompts now specific to each book (e.g., finance-focused for business books like Rich Dad Poor Dad)

### Support Page (support.html) ✓ [from v0.28]
- Standalone page, no new dependencies, same CSS foundations as index.html
- Two full-width CTA buttons: Ko-fi (one-time tip) and Amazon affiliate
- Affiliate disclosure below Amazon button (16px, #777777)
- GitHub issues link as plain inline text
- Italic "Pete" sign-off
- Back link "← Page Commons" at top
- All e-ink design rules respected (no border-radius, no animations, Georgia serif)

### Per-Screen Support Footer ✓
- `.screen-support-footer` CSS class added to index.html
- "Page Commons is free and ad-free. Support it →" line on all 14 screens:
  home, about, key, search, book-detail, status, language, companion,
  tc, age-gate, shelf, settings, surprise, book-shelf
- 15px font, #666666 colour, centred, padding-top: 32px, padding-bottom: 16px
- Links to /support.html

### Removed Search Language Selector ✓ (earlier in session)
- Removed 18-option language dropdown from search form
- Reverted all API fetch functions to original signatures
- Removed ISO_TO_MARC mapping and langRestrict / MARC language filtering
- Rationale: API language filtering proved ineffective for author-based searches

### Chinese Language Detection Fix ✓ (earlier sessions)
- TRAD_CHARS (526) vs SIMP_CHARS (515) character-count detection
- Three-tier: character evidence > language code > default Traditional
- Book description used as additional detection signal
- Fixed: 蒙格之道, 蜜蜂與遠雷, 三色貓探案, 射雕英雄傳, 孫子兵法

### Per-Book Language Selector on Companion Screen ✓ (earlier sessions)
- Language button in reader-toolbar, collapsible 9-option panel
- Saves to localStorage per book (pc_companion_lang_override_<bookKey>)
- Applied to AI prompts; auto-detect reset button

## Testing Completed
- [x] Icebreaker fix transpiled and verified
- [x] All changes committed to feature branch
- [ ] Device testing on Kobo Libra Colour with v0.28.1 (icebreaker fix)
  - [ ] Icebreaker prompts are book-specific, not generic
  - [ ] Test with Rich Dad Poor Dad (Business): expect finance-focused questions
  - [ ] Test with a novel: expect narrative-focused questions
- [ ] Verify no regression in: language detection, language selector, support page footer
- [ ] Search regression test on Kobo

## Current Known Issues
- None identified

## What to Tackle Next
1. Set GROQ_API_KEY(S) in Vercel env (free pool now uses Groq, not Gemini)
2. Review v0.30 on desktop, then device:
   - Back button on every screen returns to the correct previous screen
   - Status screen no longer shows "considering"; "I have this book" label
   - Icebreakers in first-person reader voice, correct language, genre-aware
   - BYOK Gemini 2.5-flash quality; free pool (Groq) responds once key is set
3. Onboarding Flow & AI-Mode System (the one big remaining Priority-1 item):
   intro screen + BYOK vs shared choice, providers.html, pc_ai_mode, relax the
   apiKey gate, Settings top-level toggle, persistent footer→Settings link
4. Kindle + Kobo device testing
5. Reddit launch post preparation

## Last Confirmed Working on Device
↳ Kobo Libra Colour: v0.25 ✓ (baseline — many features added since)
↳ Desktop: v0.29 ✓ (v0.30 changes verified via syntax checks only; not yet
  exercised in a browser this session)
↳ Kindle: not yet tested

## Broken / Do Not Touch
↳ Nothing currently broken
