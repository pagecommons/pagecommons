# Page Commons — Current Status

Last updated: 2026-05-08
Current version: v0.25
Next version: v0.26 (bump on next deploy)
Branch: claude/review-and-plan-HPGDI
(ready to merge to main)

---

## What was completed this session

**Surprise Me feature (Priority 1)**
- Two modes: Random books + Shelf-based
- Entry point: Library Hall "Surprise me" button
- Dual-source architecture:
  - Non-English users: Google Books with
    langRestrict, stronger non-English catalogue
  - English users / no signal: Open Library subjects
- Language detection from shelf books' lang +
  detectedLang fields or companion override
- Threshold: 2+ books in language OR 40%+ of shelf
- Randomized startIndex (0-4) for variety
- Result validation: fallback if title missing
- Graceful fallback chain: Google → Open Library

**Plausible analytics (Priority 5)**
- Single script tag in <head>
- No cookies, no personal data
- Day-one signal for launch monitoring
- Privacy-respecting implementation

**Discovery mode "I'll read this" button**
- Converts discovery companion to reading mode
- Adds book to shelf with status
- Removes friction of going back to search
- Updates reading progress in shelves

---

## What was completed previously

**Language detection overhaul**
- Auto-detects book language and responds in it
- Distinguishes Traditional vs Simplified Chinese
- Language instruction sent as system message
- Ice breaker cache key includes language

**Companion language setting**
- Dropdown in Settings: Auto or specific language
- Stored as pc_companion_lang
- Custom arrow overlay fix applied

**Kobo highlights import**
- KoboReader.sqlite upload working
- sql.js WebAssembly loaded lazily
- Queries Bookmark JOIN content tables
- ChapterProgress stored per highlight

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

---

## What to tackle next

In priority order:

1. Affiliate links (Priority 1)
   On book selection screen
   Also inside Discovery mode flow
   Amazon, Bookshop.org, Waterstones,
   WorldCat (always free)
   Clear disclosure copy

2. Export/import localStorage (Priority 3)
   Single JSON dump of all pc_* keys
   Restore on new device
   High value for launch users
   Available from Settings screen

3. Merge branch to main
   Test on Kobo after merge (especially
   Surprise Me non-English flow)
   Bump to v0.26 on deploy

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

- [x] Surprise Me feature
- [x] Plausible analytics added
- [x] Discovery "I'll read this" button
- [ ] Affiliate links
- [ ] Export/import localStorage
- [ ] Branch merged to main
- [ ] Tested on Kobo Libra Colour (after merge)
- [ ] Tested on Kindle (when arrives)
- [ ] Version bumped to v0.26+
- [ ] README.md created
- [ ] About page polished
- [ ] Reddit post drafted
