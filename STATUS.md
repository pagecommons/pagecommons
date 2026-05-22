# Page Commons — Current Status

Last updated: May 22, 2026
Current version: v0.29
Updated by: Claude session - data export/import (localStorage backup)

## What was done this session

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
1. Test v0.28 on Kobo Libra Colour — focus on:
   - Traditional Chinese detection (蒙格之道, 三色貓探案)
   - Companion Language button and per-book override
   - Search still works (regression check)
   - support.html renders and links work
2. Kindle device test (any version)
3. Reddit launch post preparation

## Last Confirmed Working on Device
↳ Kobo Libra Colour: v0.25 ✓ (baseline — many features added since)
↳ Desktop: v0.28 ✓ (current)
↳ Kindle: not yet tested

## Broken / Do Not Touch
↳ Nothing currently broken
