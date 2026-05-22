# Page Commons — Pending Work

## Priority 1: Pre-Launch Polish (Target: June 1, 2026)

### Testing & Validation
- [ ] Full device testing on Kobo Libra Colour (v0.28.1)
  - [ ] Icebreaker prompts are book-specific, not generic (race condition fix)
  - [ ] Test with Rich Dad Poor Dad (Business): expect finance-focused questions
  - [ ] Test with a novel: expect narrative-focused questions
  - [ ] Traditional Chinese language detection (e.g. 蒙格之道, 三色貓探案)
  - [ ] CJK language disambiguation (Traditional vs Japanese, e.g. 東方快車謀殺案)
  - [ ] Companion language selector (Language button in toolbar)
  - [ ] Per-book language override persists across book switches
  - [ ] Discover mode returns book-specific prompts (not generic)
  - [ ] Surprise Me returns correct language edition (not alternate editions)
  - [ ] Pagination "Show more results" still works
  - [ ] Search still works (language filter removed — verify no regression)
  - [ ] Data export downloads a valid JSON backup on device (Kobo/Kindle)
  - [ ] Data import restores from backup file and merges localStorage
  - [ ] Import error message shows for non-backup JSON (inline red, no alert)
- [ ] Full device testing on Kindle (any model)
- [ ] Test manual entry Google Books lookup across different queries
- [ ] Test About toggle doesn't interfere with book result tapping
- [ ] Test back navigation flow (search → book-detail → search)

### UI/UX Polish
- [ ] #home (Welcome screen): add a short 1–2 sentence intro below "Welcome to Page Commons" explaining what the app is
- [ ] Reading-status screen: omit the "considering / thinking about reading it" option when the screen is reached via the book-detail "I have this book" button — it duplicates the book-detail "Find out if it's for me" option already offered on the previous screen
- [ ] Rename book-detail button "I'm reading this" → "I have this book"
- [ ] Move tagline "Just books. No noise." to right side of header
- [ ] Consider minimum width/responsiveness on very large e-ink screens
- [ ] Review all button text for consistency and brevity
- [ ] Verify all 44px minimum tap targets on device

### Support Page
- [ ] support.html: remove the "Support it →" footer link (it loops back to the same page)
- [ ] Verify support.html renders correctly on Kobo
- [ ] Verify Ko-fi and Amazon links open correctly
- [ ] Confirm per-screen footer line "Support it →" appears on all screens

### AI Companion Refinement
- [ ] Implement reply length enforcement for companion messages
- [ ] Review and improve genre list (currently 8 options)
- [ ] Test Gemini free tier performance under various contexts
- [ ] Add graceful fallback if Gemini API fails during Surprise Me
- [ ] Fix icebreaker voice: prompts are tapped to fill the chat box and sent as the reader's own message, but they're phrased in interviewer voice (the companion asking the reader, e.g. "What drew you to this book?" / 「為何想深入了解林振強的詞作？」), which is backwards when sent to the AI. Rephrase into first-person reader voice (things the reader would say to the companion). Requires updating the icebreaker generation prompt (drop "ask the READER" wording at ~app.js:2629) and rewriting the STATIC_PROMPT_SETS fallback sets across all languages

### Onboarding Flow & AI-Mode System
- [ ] After first-time T&C accept → intro screen with a brief introduction, then a choice: BYOK vs Use shared AI pool
- [ ] Shared = the existing /api/ai shared proxy (now Groq-backed; already powers the companion when no key is set). Show a reminder it's shared and may be unavailable under heavy use → goes straight to the main hall, no key entry
- [ ] BYOK → link to a new providers.html (standalone page) explaining how to get a key from each provider (Anthropic, Gemini, Groq) → then show #key entry → then main hall
- [ ] Persist choice in localStorage (pc_ai_mode = byok | shared); returning users skip the choice step
- [ ] Relax the current STATE.apiKey gate (around app.js:137 / :146) so shared-mode users reach search/companion without a key
- [ ] Settings: BYOK/Shared becomes the top-level toggle; the AI-provider radio + key field only apply in BYOK mode; Shared forces the shared proxy and hides the key field
- [ ] Persistent footer link on every screen → goes to Settings (full Settings page, not just AI), reusing the existing per-screen support-footer area

## Priority 2: V2 Features (Post-Launch, Community Rooms)

### Book Rooms Infrastructure
- [ ] Create #book-room screen (read-only view of all notes in a book)
- [ ] Implement note posting UI (anonymous by default)
- [ ] Add moderation tools for book owners/admins
- [ ] Implement block/mute functionality
- [ ] Design note threading/reply system
- [ ] Create notification feed for note activity

### Book Shelf Visibility
- [ ] Add privacy toggle: shelf visibility (private/friends-only/public)
- [ ] Implement shelf following (with permission)
- [ ] Create "Books in Common" discovery view
- [ ] Add reading status aggregates for books with multiple readers

## Priority 3: V3 Features (Deep Connections)

### Book-Mate System
- [ ] Mutual reading detection (same book + reading status match)
- [ ] Conversation initiation (direct messaging between readers)
- [ ] Reading progress synchronization
- [ ] Reading pace sync (discuss finishing timeline)
- [ ] Annotation sharing (with explicit consent)

## Technical Debt & Known Limitations

### Do Not Change Without Approval
- Single-page app architecture (index.html + app.js)
- Permanent IIFE forcing #screen-home visibility
- Batch AI responses (never stream)
- ES5-only JavaScript (Babel IE 11 transpilation)
- E-ink design constraints (no animations, gradients, CSS variables)
- Privacy-first localStorage approach (no server persistence v1)

### Optimizations Deferred
- Code splitting (single file maintains simplicity)
- CSS minification (keep human-readable)
- Image optimization (relies on Google Books proxy)
- Service worker / offline-first (may conflict with e-ink updates)
- Database migration (in favor of localStorage for privacy)

## Completed ✓

### v0.29 — Data export / import (localStorage backup)
- [x] "Your data" section on #settings (below Text size)
- [x] Export my data: downloads pagecommons-backup-YYYY-MM-DD.json (all pc_ keys
      + exported_at/version metadata) via Blob URL, fully client-side
- [x] Import data from backup: hidden .json file input, FileReader + JSON.parse
- [x] Validates `data` field; merges into localStorage (overwrites conflicts,
      keeps other keys); no auto reload
- [x] Inline messages only (no alert/confirm): #cc0000 errors, #006600 success,
      auto-hide after 5s
- [x] ES5-safe, transpiled to app.transpiled.js (IE 11 target)

### v0.28 — Support page + per-screen footer
- [x] support.html created (Ko-fi, Amazon affiliate, GitHub issues link)
- [x] Per-screen "Support it →" footer on all 14 screens in index.html
- [x] Removed ineffective search language selector (API filtering unreliable)

### v0.27 — Chinese language detection + companion language selector
- [x] Chinese script detection rewritten with character-count evidence
  (TRAD_CHARS 526, SIMP_CHARS 515 — built from curated pairs)
- [x] Three-tier detection: character evidence > lang code > default Traditional
- [x] Book description included as detection signal
- [x] Fixed misdetection for 蒙格之道, 蜜蜂與遠雷, 三色貓探案, 射雕英雄傳
- [x] Per-book language override on companion screen (9 options)
- [x] Language button in reader-toolbar (collapsible panel)
- [x] localStorage persistence per book (pc_companion_lang_override_<bookKey>)
- [x] Icebreaker cache key includes detected language (prevents stale prompts)
- [x] Surprise Me: genre + language selection, AI-powered suggestions
- [x] Business & Investment genre added to Surprise Me
- [x] Discover mode "Try another book" button spacing fixed
- [x] Book detail screen added (#book-detail)
- [x] Manual book entry improved
- [x] Kobo SQLite import
- [x] Transfer code system (key transfer between devices)

## Bug Reports / Edge Cases

### Under Investigation
- None currently reported

### Won't Fix (By Design)
- Genre/language suggestions may repeat across session (intentional)
- Manual entry doesn't remember previous searches (privacy first)
- No user accounts or cross-device sync (intentional)
- Search language filter not implemented (APIs don't support it reliably)

## Deployment Checklist (Pre-Launch)

- [ ] All v0.28 features tested on actual Kobo device
- [ ] STATUS.md confirms all critical features working on device
- [ ] No console errors on Kobo or Kindle
- [ ] Network tests confirm /api/* endpoints accessible
- [ ] Performance: app.js loads in <2s on 4G
- [ ] Reddit launch post prepared with screenshots
