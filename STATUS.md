# Page Commons — Current Status

Last updated: May 19, 2026
Current version: v0.28
Updated by: Claude session - language detection + optional selector

## What was done this session

### Part 1: Chinese Language Detection Fix ✓
- Implemented character-counting detection for Traditional vs Simplified Chinese
- Built TRAD_CHARS (526 characters) and SIMP_CHARS (515 characters) regex from curated character pairs
- Removed shared characters that appear in both scripts
- Three-tier detection: character evidence > language code > default Traditional
- Include book description text as additional detection signal
- Fixed misdetection of books like 蒙格之道 (Traditional labeled as Simplified by Google Books)
- Version bumped to v0.27-zhdetect

### Part 2: Optional Per-Book Language Selector ✓
- Added "Language" button to companion screen reader-toolbar
- Collapsible language-panel with 9 language options:
  - English, French, German, Spanish, Portuguese
  - Japanese, Korean, Traditional Chinese, Simplified Chinese
- Auto-detect button to reset override
- Language selection saved per-book in localStorage (pc_companion_lang_override_<bookKey>)
- Language override applied to AI prompts when selected
- All panels close when switching books (reduce clutter)
- Language button shows active state when override is set

### Cache Invalidation Updates ✓
- Updated icebreaker cache key to include detected language
- Ensures old cached prompts are invalidated when detection changes
- Prevents stale Simplified prompts from showing after fix

## Testing Completed
- [x] Transpilation validates (Babel ES5 for Kobo compatibility)
- [x] All new functions present in transpiled output
- [x] Language detection functions integrated into prompt building
- [x] Language selector HTML/CSS/JS added to companion screen
- [x] Language override saves to localStorage and persists per-book
- [ ] On Kobo Libra Colour (device test needed)

## Current Known Issues
- None identified yet (needs Kobo device testing)

## What to Tackle Next
1. Test language detection fix on Kobo with Traditional Chinese books
2. Test language selector UI and language override on Kobo device
3. Verify Traditional Chinese prompts appear after language selection
4. Test switching books and loading correct language override
5. Confirm all 9 language options work in AI prompts
6. Check that cache invalidation works correctly

## Last Confirmed Working on Device
↳ Kobo Libra Colour: v0.25 ✓ (before detection fix)
↳ Desktop: v0.27-zhdetect ✓ (after detection fix + selector)
↳ Kindle: not yet tested

## Broken / Do Not Touch
↳ Nothing currently broken
