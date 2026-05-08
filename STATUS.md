# Page Commons — Current Status

Last updated: 2026-05-08
Current version: v0.25
Next version: v0.26 (bump on next deploy)
Branch: claude/review-and-plan-HPGDI
(needs merging to main)

---

## What was completed recently

**Language detection overhaul**
- Auto-detects book language and
  responds in it
- Distinguishes Traditional vs
  Simplified Chinese correctly
- Language instruction sent as
  system message across all providers
- Ice breaker cache key includes language

**Companion language setting**
- Dropdown in Settings:
  Auto (match book) or specific language
- Stored as pc_companion_lang
- Custom arrow overlay fix applied

**Kobo highlights import**
- KoboReader.sqlite upload working
- sql.js WebAssembly loaded lazily
- Queries Bookmark JOIN content tables
- ChapterProgress stored per highlight
- File never leaves browser

**Randomised search heading**
- Pool of 7 variants
- 5 personalised with name from Settings

**Discovery companion mode**
- "Is this for me?" on every search result
- Separate system prompt and flow
- Book not added to shelf in discover mode
- Reading time estimate from pageCount

---

## Confirmed working on device

- Kobo Libra Colour: v0.25 ✓
  Loads, renders, scrolls, taps respond
  Navigation works
  Home screen displays correctly
- Desktop/mobile browser: ✓
- Kindle: not yet tested
  (device expected — test when arrives)

---

## Current known issues

- Discovery mode missing "I'll read this"
  button — user must go back to search
  to add book to shelf after discovery.
  Add in next polish pass.

- Kobo WebAssembly for sql.js:
  Kobo Libra Colour should be fine.
  Older Kobo models uncertain.
  Error surfaces in #kobo-status.
  Test on device before shipping.

- Companion language for returning books:
  Cached ice breakers from before
  override was set may be served.
  Clears naturally as cache expires.
  Not breaking.

- Branch not yet merged to main:
  claude/review-and-plan-HPGDI
  Merge before next device test.

---

## What to tackle next

In priority order:

1. Surprise Me feature (Priority 1)
   Open Library random endpoint:
   openlibrary.org/random.json
   Two modes: shelf-based and random
   Entry point from Library Hall

2. Affiliate links (Priority 1)
   On book selection screen
   Also inside Discovery mode flow
   Amazon, Bookshop.org, Waterstones,
   WorldCat (always free)
   Clear disclosure copy

3. Export/import localStorage (Priority 3)
   Single JSON dump of all pc_* keys
   Restore on new device
   High value for launch users
   Available from Settings screen

4. Plausible analytics (Priority 5)
   Single script tag
   No cookies, no personal data
   Add before launch for day-one signal

5. Discovery mode "I'll read this" button
   Remove current friction point
   Add to polish pass

6. Merge branch to main
   Test on Kobo after merge
   Bump to v0.26

---

## Infrastructure status

- Vercel: active, auto-deploying from
  pagecommons/pagecommons main branch
- Upstash Redis: connected via Vercel KV
  Transfer codes working
- Google Books API proxy: working
- Free tier Gemini pool: working
- Cloudflare DNS: active
- pagecommons.com: live

## Post-launch infrastructure (do not do before June 1)
- Migrate to Cloudflare Pages
- GitHub account restructuring

---

## Launch checklist (June 1 target)

- [ ] Surprise Me feature
- [ ] Affiliate links
- [ ] Export/import localStorage
- [ ] Plausible analytics added
- [ ] Discovery "I'll read this" button
- [ ] Branch merged to main
- [ ] Tested on Kobo Libra Colour
- [ ] Tested on Kindle (when arrives)
- [ ] Version bumped to v0.26+
- [ ] README.md created
- [ ] About page polished
- [ ] Reddit post drafted
