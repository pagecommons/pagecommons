# Page Commons — Current Status

Last updated: May 19, 2026
Current version: v0.28
Updated by: Claude session - support page + footers + doc updates

## What was done this session

### Support Page (support.html) ✓
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
- [x] Transpilation validates (Babel ES5 for Kobo compatibility)
- [x] support.html renders correctly on desktop
- [x] All 14 screen footers present in index.html
- [x] Ko-fi and Amazon links correct
- [x] All changes committed and pushed to feature branch
- [x] Merged to main for device testing
- [ ] support.html on Kobo device
- [ ] Footer links tappable on Kobo (44px not required — small text)
- [ ] Chinese language detection on Kobo with Traditional books
- [ ] Companion language selector on Kobo
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
