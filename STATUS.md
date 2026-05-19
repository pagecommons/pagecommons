# Page Commons — Current Status

Last updated: May 19, 2026
Current version: v0.28
Updated by: Claude session - search language selector removal

## What was done this session

### Removed Search Language Selector Feature ✓
- Removed language selector HTML element from search form (was added between Author field and ISBN tip)
- Removed searchLang variable and DOM reading logic from searchBooks()
- Reverted fetchGoogleBooks() signature: removed lang parameter and langRestrict API filter
- Reverted fetchOpenLibrary() signature: removed lang parameter and MARC code conversion filter
- Removed ISO_TO_MARC mapping object (en→eng, fr→fre, de→ger, es→spa, ja→jpn, ko→kor, zh→chi, etc.)
- Removed _searchLang closure variable from pagination "Show more results" handler
- Cleaned up unused variable declarations

**Rationale**: Feature tested and found ineffective. When searching by author name (e.g., "赤川次郎" with Traditional Chinese filter), APIs returned Japanese results regardless of language parameter. Language filtering doesn't work reliably in APIs for author-based searches. User decision: abandon feature rather than debug black-box API behavior.

**Preserved**: Companion screen language selector IS working and remains untouched. 9-option per-book language override still available after entering discovery mode.

## Previous Sessions: Chinese Language Detection & Companion Selector

### Part 1: Chinese Language Detection Fix ✓
- Character-counting detection: TRAD_CHARS (526) vs SIMP_CHARS (515)
- Three-tier priority: character evidence > language code > default Traditional
- Included book description as detection signal
- Fixed misdetection (e.g., 蒙格之道, 蜜蜂與遠雨, 三色貓探案)
- Version bumped to v0.27-zhdetect

### Part 2: Optional Per-Book Language Selector ✓
- "Language" button in companion screen reader-toolbar
- 9 language options with auto-detect reset
- Per-book localStorage persistence (pc_companion_lang_override_<bookKey>)
- Language applied to AI prompts when selected
- Active button state indicator

## Testing Completed
- [x] Transpilation validates (Babel ES5 for Kobo compatibility)
- [x] Searched and removed all searchLang parameter usage
- [x] Reverted all fetch function signatures to pre-filter versions
- [x] Removed ISO_TO_MARC mapping and language code conversion
- [x] Removed Google Books langRestrict parameter
- [x] Removed OpenLibrary MARC language filtering
- [x] All changes transpiled to app.transpiled.js
- [x] Code committed and pushed to feature branch
- [ ] Desktop smoke test (verify search still works without language filter)
- [ ] On Kobo Libra Colour (device test needed)

## Current Known Issues
- None identified

## What to Tackle Next
1. Desktop smoke test: verify search functionality still works
2. Test on Kobo Libra Colour with Traditional/Simplified books
3. Confirm companion language selector still works (should be unaffected)
4. Verify language detection still correct (unchanged)
5. Check pagination "Show more" works without _searchLang closure variable

## Last Confirmed Working on Device
↳ Kobo Libra Colour: v0.25 ✓ (baseline before detection fix)
↳ Desktop: v0.28 ✓ (after search filter removal)
↳ Kindle: not yet tested

## Broken / Do Not Touch
↳ Nothing currently broken
