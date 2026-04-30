# Page Commons — Pending Work

Last updated: April 2026
Current version: v0.25

---

## How to use this file

This is the master backlog for Page Commons.
Work through items in priority order.
Mark items complete with [x] when done.
Add new items in the appropriate section.

---

## BUGS (fix first)

- [x] Mixed content warnings
      Fixed: thumb.replace('http://', 'https://') in fetchGoogleBooks().

---

## PRIORITY 1 — Complete V1 core

- [x] Google Books API proxy
      /api/books.js exists and integrated.
      app.js calls /api/books?q= (see fetchGoogleBooks).

- [x] Free tier shared AI pool
      Implemented: api/ai.js proxies to Gemini Flash using GEMINI_API_KEY.
      callAI() routes no-key users to callFreeTier(/api/ai).
      429 shows: "Our free companion is busy right now — add your own key."

- [x] Vercel KV setup for API key transfer
      Upstash Redis via Vercel marketplace.
      Env vars: KV_REST_API_URL, KV_REST_API_TOKEN.
      Connected to Production and Preview environments.

- [x] transfer.html — API key transfer page
      Standalone page at /transfer.html.
      User pastes key, gets 6-digit code.
      10-minute countdown timer.
      Privacy statement matches app copy.

- [x] /api/transfer.js serverless function
      POST: store key in Upstash KV, 10-min TTL,
      return 6-digit code. Rate limited (10/hr/IP).
      GET: GETDEL for one-time use, 5-fail lockout.
      Never logs key values.

- [ ] Kobo highlights import
      Accept KoboReader.sqlite file upload.
      Parse client-side using sql.js (WebAssembly).
      Query Bookmark and content tables.
      Extract: title, author, highlight text,
      annotation notes, date, chapter progress.
      Captures: Kobo native books, sideloaded ePubs,
      Libby books sent via Send to Kobo.
      Same privacy-first approach as Kindle import.
      ChapterProgress (0.0–1.0) stored for future
      reading progress indicator feature.

- [ ] Discovery companion mode
      Separate entry point from reading companion.
      "Is this book for me?" framing.
      Asks about reader preferences before describing.
      Surfaces what readers wish they had known.
      Provides reading time estimate from page count.
      Leads naturally to affiliate buy links.

- [ ] Surprise Me feature
      Two modes:
      (1) Based on shelf reading history.
      (2) Completely random from Open Library.
      Random mode uses adventurous, inviting tone.
      Options after suggestion:
      "Not for me — try again"
      "Already read it — try again"

- [ ] Affiliate links
      Show on book selection screen.
      Amazon Associates link.
      Bookshop.org affiliate link.
      Waterstones affiliate link (UK).
      WorldCat link (free, no affiliate, always shown).
      Email link option (user emails link to self).
      Clear disclosure always visible near links:
      "Buying via these links supports Page Commons
      at no extra cost to you."
      Non-affiliate option always shown alongside.

---

## PRIORITY 2 — UX and polish

- [x] Book recommendations in chat
      System prompt instructs AI to use [RECOMMEND: Title by Author].
      appendBubble() post-processes tags into tappable buttons.
      searchFromRecommend() navigates to search with title pre-filled.

- [x] Reply length enforcement
      Anthropic: max_tokens 150 when short.
      Gemini: generationConfig.maxOutputTokens 150 when short.
      Groq: max_tokens 150 when short.
      System prompt: "Maximum 2 sentences. Stop after 2 sentences."

- [x] Ice breaker fix for "considering" status
      Prompt now instructs AI to ask what drew the
      reader to the book, not about book content.
      Cache key already included reading status.

- [x] Hall tagline
      "Just books. No noise." — deployed.

- [x] Your shelf prominence
      Shelf button added to Which book? screen.
      Home button sub-text updated to mention shelf.

- [ ] Randomised book search heading
      Replace static "Which book?" heading with
      a randomised pool of headings.
      Add name personalisation when name is set:
      e.g. "What are you reading, [name]?"
      Requires Settings page (see below).

- [x] Personal reflection notes per book
      Notes toolbar button always visible.
      #notes-panel with textarea + Save note button.
      Timestamped entries, newest first.
      pc_notes_[bookKey] in localStorage.
      Completely separate from AI conversations.

- [ ] Ice breaker prompts enriched with metadata
      Add Open Library genre and subject metadata
      to the ice breaker generation prompt.
      Makes prompts more specific to book themes.
      Fetch subject data when book is selected.
      Cache alongside ice breakers in localStorage.

- [x] Conversation export
      exportConversation() downloads .txt file.
      Numbered exchanges, book/author/date header.
      "Export conversation" in More panel.

- [ ] Reading progress indicator
      Visual progress display not just status label.
      Use ChapterProgress field from Kobo SQLite
      where available (value is 0.0 to 1.0).
      Fall back to Kindle location data.
      Simple text indicator — e-ink appropriate.

- [x] Better book metadata display
      pageCount added to Google Books results and shelf.
      Book header shows "N pages · ~Xh read" when available.
      Gracefully absent for Open Library / no-pageCount books.

---

## PRIORITY 2 — E-ink compatibility

- [x] Clippings paste fallback
      Textarea added below file upload on search screen.
      parseClippingsPaste() reads textarea, calls same
      parseClippingsText() parser, same result handling.

- [ ] XMLHttpRequest fallback for fetch
      If Fetch API unavailable on older devices
      AI calls will fail silently.
      Wrap all fetch calls in try/catch.
      Fall back to XHR if fetch throws.
      Implement after real device testing
      confirms whether this is actually needed.

---

## PRIORITY 3 — Settings page

- [ ] Settings screen
      New screen: #settings
      Accessible from Library Hall footer.
      Fields:
      - Your name (enables personalised headings)
      - Default AI provider
      - Default reply length preference
      - Font size (persist across sessions)
      - Companion name preference
      All saved to localStorage.
      No account required.

---

## PRIORITY 3 — Sync and accounts

- [ ] Export and import (short term)
      Export all localStorage data as single JSON.
      Import JSON file to restore on new device.
      Enables device switching without account.
      No server needed. Privacy preserved fully.
      Available from Settings screen.

- [ ] Turso and Clerk sync (medium term)
      Optional account creation via magic link.
      Syncs shelf and conversations across devices.
      Clerk for authentication.
      Turso managed SQLite for storage.
      User controls exactly what syncs.
      Opt-in only — never default.

- [ ] Data privacy for sync
      Clear plain-language explanation of what
      is stored server-side when sync is enabled.
      Delete account deletes all server-side data.
      Export before delete option always available.
      Shown before sync is activated.

---

## PRIORITY 4 — Community layer (V2)

- [ ] Authentication
      Magic link email only. No passwords.
      Guest mode remains available always.
      Required before book rooms can be written to.
      Clerk integration.

- [ ] Book rooms — read only
      Single random note shown on room entry.
      Notes organised by reading stage.
      Spoiler gate after "I finished it."
      Language sub-rooms.
      Location filter: region only, opt-in.
      Time filter: recent / this month / all time.
      No likes, no rankings, no metrics.
      Notes feel like margin notes — short, personal.

- [ ] Book rooms — writing
      Requires supporter account.
      7-day trial with card required.
      Maximum 5 notes during trial period.
      Email verification before first note.
      AI moderation (Claude Haiku) on submission.
      3 community flags auto-hides a note.
      No manual review queue — automated only.

- [ ] Opt-in reader reachability
      The Correspondent use case.
      Two visibility states only:
      Ghost (default):
        Shown as "a reader in [city]"
        No handle displayed. Cannot be contacted.
      Reader (opt-in):
        Handle shown on notes.
        Can be contacted about this book only.
        Book-scoped thread, not general DM.
        First message pre-filled with book title.
      Adults only. Age verified at account creation.
      Block always visible and always works.
      No moderation of private messages ever.
      Block is the only remedy.
      Safety reminder shown on first contact:
      "Keep conversations about books.
      Do not share personal information."
      Supporter tier can initiate contact.
      Free accounts can receive contact only.
      Never presented as a matching feature.
      Discovered naturally through notes.

- [ ] Reading pulse
      Show live reader activity count per book.
      Example: "34 readers this week"
      No note required to count as a reader.
      Warmth signal only — not a metric.

- [ ] Libby annotation import
      Parse Libby email export format.
      Plain text format, different to Kobo SQLite.
      Edge case — implement after Kobo import done.

---

## PRIORITY 5 — Sustainability (V2)

- [ ] Stripe subscription
      Supporter tier: £3-5/month.
      Annual option with discount.
      7-day free trial, card required.
      Trial unlocks full book room writing access.
      Auto-lock on cancellation or chargeback.
      Webhook handles payment events.

- [ ] Plausible analytics
      Privacy-respecting analytics.
      No cookies. No personal data.
      Simple script addition to index.html.
      pagecommons.com domain setup in Plausible.

- [ ] Resend email
      Transactional email for magic links.
      Trial expiry nudge emails.
      Affiliate link emails.
      3,000 free emails per month on free tier.

- [ ] Honest sustainability page
      Plain explanation of how Page Commons
      is funded and stays independent.
      Affiliate link disclosure.
      Full model explained openly.
      No spin. Readers appreciate honesty.

---

## PRIORITY 6 — Book-mates (V3, maybe)

Only build this if Correspondent use case
is stable and accepted by users first.

- [ ] Book-mates feature
      Created by mutual consent only.
      Both users must agree — no one-sided follows.
      Earned through existing book conversation.
      Never through search or algorithmic matching.
      Users are never searchable.
      No public profiles ever.
      Shared shelf trigger:
        When a book-mate adds a book you have,
        quiet notification appears:
        "Your book-mate [handle] also has this book"
        Option to start a new conversation appears.
        Only at this moment — not proactively pushed.
      User-set threshold:
        Minimum books in common before
        book-mate suggestion can appear.
        Default: 2 books in common.
        User sets their own number.
      All conversation is book-scoped.
      No general chat thread ever.
      New book = new conversation thread.
      Adults only.
      No moderation of private messages.
      Block always available.
      Never marketed as a social feature.

---

## PRIORITY 7 — Platform maturity (V3)

- [ ] Self-hosted Docker release
      Single command deployment.
      Plain SQLite file instead of Turso.
      No social features in self-hosted version.
      Clear README with setup instructions.
      AGPL-3.0 licence enforced.

- [ ] PWA capability
      Add to home screen on mobile and e-ink.
      Offline-first operation.
      Service worker for asset caching.
      Especially valuable for Kindle users.

- [ ] Non-English UI languages
      Interface language separate from book language.
      French, Spanish, German as first wave.
      Community-contributed translations.

- [ ] API for integrations
      Public API for third-party book clubs.
      Developer documentation.
      Rate limited. Auth required.

---

## USE CASES — reference

These define who Page Commons is for.
Every feature should serve at least one.

1. The Archivist
   Uploads highlights and writes personal notes.
   Builds a private reading journal.
   No AI, no community needed.
   V1 delivers this.

2. The Reflective Reader
   Everything The Archivist has.
   Adds AI companion for deeper discussion.
   Clips and saves AI conversations.
   No real people involved.
   V1 delivers this.

3. The Annotator
   Leaves notes in book rooms for strangers.
   Reads what others have left.
   Anonymous by default.
   No AI or direct interaction needed.
   V2 delivers this.

4. The Correspondent
   Opts in to show their handle on notes.
   Open to book-scoped contact from other readers.
   Wants human resonance around shared books.
   V2 delivers this.

5. The Book-mate
   Deep ongoing reading connection.
   Mutual consent to link.
   Triggered by shared shelf discoveries.
   Always book-scoped. Never general chat.
   V3 maybe delivers this.

---

## DECISIONS MADE — do not revisit

- Single index.html + external app.js architecture
  External app.js required for Kobo WebKit
- All JS must be Babel transpiled (ie:11 target)
  Regenerator runtime included
  Never deploy raw modern JS to production
- Permanent IIFE at top of app.js
  Forces screen-home display:block before init()
  Required for Kobo render — do not remove
- vercel.json required for Content-Type headers
  application/javascript for app.js
  no-store cache control
- No CSS variables — hardcoded hex values only
- No border-radius — all zero
- No flexbox gap: — margin-based spacing only
- No calc() — hardcoded pixel values only
- Webkit vendor prefixes on all flexbox
- No author or genre rooms
- No likes or engagement metrics ever
- No streaming AI responses — batch only
- Bring your own key from day one
- API key tip: store in Apple Notes or Google Keep
  copy/paste on e-reader — no server involvement
- 6-digit transfer code available as alternative
  with clear statement that key briefly passes
  through Page Commons servers
  deleted immediately after transfer
- No server-side key storage beyond transfer TTL
- 7-day trial period (not 30-day)
- Read-only free tier for book rooms
- AI moderation not manual review (solo founder)
- Block only — no content reporting mechanism
- Private messages never moderated
- No general DMs — book-scoped threads only
- Level 2 social (open reachability) deferred
  until Level 1 Correspondent proven
- Book-mates deferred until Correspondent proven
- Kobo KoboRoot.tgz sync deferred to V2 minimum
