# Page Commons — Current Status

Last updated: May 21, 2026
Current version: v0.28.1
Updated by: Claude session - icebreaker prompt regression fix

## What was done this session

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
