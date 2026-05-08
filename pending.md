# Page Commons — Pending Work

Last updated: May 2026
Current version: v0.25 (v0.26 next deploy)
Launch target: June 1 2026 — Reddit

---

## How to use this file

This is the master backlog for Page Commons.
Work through items in priority order.
Mark items complete with [x] when done.
Add new items in the appropriate section.
Do not work on Priority 4+ before launch.

---

## BUGS (fix first)

- [x] Mixed content warnings
      Fixed: thumb.replace('http://', 'https://')
      in fetchGoogleBooks().

- [x] Truncated AI responses
      Max token limits were too low.
      Fixed: short 400, medium/detailed 1500
      across all three providers.
      Truncated replies append visible notice.

---

## PRIORITY 1 — Complete V1 core

- [x] Google Books API proxy
      /api/books.js exists and integrated.
      app.js calls /api/books?q=

- [x] Free tier shared AI pool
      api/ai.js proxies to Gemini Flash
      using server-side GEMINI_API_KEY.
      callAI() routes no-key users to
      callFreeTier(/api/ai).
      429 shows friendly message with
      prompt to add own key.

- [x] Vercel KV setup for API key transfer
      Upstash Redis via Vercel marketplace.
      Env vars: KV_REST_API_URL,
      KV_REST_API_TOKEN.
      Connected to Production and Preview.

- [x] transfer.html — API key transfer page
      Standalone page at /transfer.html.
      User pastes key, gets 6-digit code.
      10-minute countdown timer.
      Privacy statement matches app copy.

- [x] /api/transfer.js serverless function
      POST: store key in Upstash KV,
      10-min TTL, return 6-digit code.
      Rate limited (10/hr/IP).
      GET: GETDEL for one-time use,
      5-fail lockout.
      Never logs key values.

- [x] Kobo highlights import
      KoboReader.sqlite upload on search screen.
      sql.js (WebAssembly) loaded lazily from CDN.
      Queries Bookmark JOIN content tables.
      Extracts: title, author, highlight text,
      annotation notes, date, chapterProgress.
      source:'kobo' stored per highlight.
      ChapterProgress stored for future
      reading progress indicator.

- [x] Discovery companion mode
      "Is this for me?" button on every result.
      STATE.companionMode = 'discover'.
      Bypasses status screen.
      Discovery system prompt asks ONE
      preference question first, then describes
      book through reader's lens.
      Reading time estimate from pageCount.
      Book not added to shelf in discover mode.
      KNOWN ISSUE: no "I'll read this" button
      inside discover mode — user must go back
      to search to add book to shelf.
      Consider adding in polish pass.

- [ ] Surprise Me feature
      Two modes:
      (1) Shelf-based: picks from STATE.shelf
          weighted by recency.
      (2) Random: Open Library random endpoint
          openlibrary.org/random.json
      Random mode uses adventurous tone.
      Options after suggestion:
      "Not for me — try again"
      "Already read it — try again"
      Entry point from Library Hall.

- [ ] Affiliate links
      Show on book selection screen.
      Also natural fit inside Discovery mode.
      Amazon Associates link.
      Bookshop.org affiliate link.
      Waterstones affiliate link (UK).
      WorldCat link (free, always shown).
      Email link option.
      Clear disclosure always visible:
      "Buying via these links supports
      Page Commons at no extra cost to you."
      Non-affiliate option always alongside.

---

## PRIORITY 2 — UX and polish

- [x] Book recommendations in chat
      System prompt uses [RECOMMEND: Title
      by Author] tags converted to buttons.

- [x] Reply length enforcement
      max_tokens 150 for short mode.
      System prompt: "Maximum 2 sentences."

- [x] Ice breaker fix for "considering"
      Prompt asks what drew reader to book,
      not about book content.

- [x] Hall tagline
      "Just books. No noise." — deployed.

- [x] Your shelf prominence
      Shelf button added to search screen.

- [x] Randomised book search heading
      Pool of 7 headings, 5 personalised
      variants when userName is set.

- [x] Personal reflection notes per book
      Notes panel with timestamped entries.
      pc_notes_[bookKey] in localStorage.
      Separate from AI conversations.

- [x] Ice breaker prompts enriched
      Open Library subject metadata added
      to generation prompt.

- [x] Conversation export
      Downloads .txt file.
      Numbered exchanges, book header.
      Available in More panel.

- [x] Reading progress indicator
      ChapterProgress from Kobo SQLite.
      Kindle location as fallback.

- [x] Better book metadata display
      pageCount shown.
      Reading time estimate (~50 pages/hr).

- [ ] Discovery mode "I'll read this" button
      Add button inside discovery companion:
      "I want to read this"
      Adds book to shelf, sets status,
      navigates to reading companion.
      Removes current friction of going
      back to search to select book.

- [ ] Personal knowledge organizer
      Phase 1 (V1.5 — July target):
        Search across all highlights and notes
        Filter by book, date, keyword
        Results shown with book context
        Copy results to clipboard
        No AI synthesis yet
      Phase 2 (V2):
        Search extends to conversations
        Highlights + notes + conversations
        in one result set
      Phase 3 (V2):
        AI synthesis across all sources
        "What have I learned about X?"
        Export as blog post, email,
        markdown file

---

## PRIORITY 2 — E-ink compatibility

- [x] Clippings paste fallback
      Textarea below file upload.
      Same parser, different input method.

- [ ] XMLHttpRequest fallback for fetch
      Only implement after real device
      testing confirms fetch is broken.
      Do not implement speculatively.

---

## PRIORITY 3 — Settings page

- [x] Settings screen
      #settings screen accessible from Hall.
      Fields: name, provider, reply length,
      font size, companion name.
      All saved to localStorage.

- [ ] Companion persona customisation
      User selects companion personality
      in Settings screen.
      Saved to localStorage.
      Applied to system prompt tone only —
      core rules unchanged.
      Starting personas:
      - The Thoughtful Friend (default)
        Current personality — warm, curious
      - The Wit
        Sharp, playful, finds humour
        in ideas and contradictions
      - The Scholar
        Deep knowledge, cross-references
        other works naturally
      - The Everyday Mate
        Casual, no literary pretension
        talks about books normally
      - The Challenger
        Pushes back, Socratic approach
        makes you defend your views
      Can change per book, not just global.

---

## PRIORITY 3 — Sync and accounts

- [ ] Export and import localStorage
      Export all localStorage data as JSON.
      Import JSON to restore on new device.
      Available from Settings screen.
      No server needed. Privacy preserved.
      High value for launch users —
      enables Kobo + desktop use together.

- [ ] Turso and Clerk sync (medium term)
      Optional account creation via magic link.
      Syncs shelf and conversations.
      Opt-in only — never default.
      User controls what syncs.

- [ ] Data privacy for sync
      Plain-language explanation before activation.
      Delete account = delete all server data.
      Export before delete always available.

---

## PRIORITY 4 — Community layer (V2)

- [ ] Authentication
      Magic link email only. No passwords.
      Guest mode always remains available.
      Clerk integration.

- [ ] Book rooms — read only
      Single random note on room entry.
      Notes by reading stage.
      Spoiler gate after "I finished it."
      Language sub-rooms.
      Location filter: region only, opt-in.
      Time filter: recent/month/all time.
      No likes, no rankings, no metrics.

- [ ] Book rooms — writing
      Requires supporter account.
      7-day trial, card required.
      5 notes max during trial.
      Email verification required.
      Claude Haiku moderation on submission.
      3 flags auto-hides note.

- [ ] Shared highlights and notes
      Pay it forward feature.
      Explicit opt-in per highlight.
      Shown in book rooms alongside notes.
      Non-fiction primary use case.
      50 word max per passage (copyright).
      Buy link always shown alongside.
      Reader's application note optional.
      Anonymous by default.
      Withdrawal honoured at next regeneration.
      Cold start UX: progress to threshold.

- [ ] Reader Wiki
      AI-generated living document per book.
      Generated when book reaches 10 contributors.
      Regenerated at 10/25/50/100 milestones.
      One AI call per milestone — cost efficient.
      Sections:
        Book in one paragraph
        What readers found most valuable
        How readers applied this
        What readers wish they'd known
        Passages that changed minds
        Companion questions
      Cached and served to all visitors.
      No account needed to read.
      Free account needed to contribute.
      Attribution: collective only.
      Always prominent buy links.

- [ ] Opt-in reader reachability
      The Correspondent use case.
      Ghost (default): "a reader in [city]"
      Reader (opt-in): handle shown,
        contactable about this book only.
      Adults only. Age verified.
      Book-scoped threads not DMs.
      Block always available.
      No moderation of private messages.
      Safety reminder on first contact.
      Supporter tier initiates only.

- [ ] Reading pulse
      Live reader activity per book.
      "34 readers this week"
      No note needed to count.
      Warmth signal only.

- [ ] Libby annotation import
      Parse Libby email export format.
      After Kobo import confirmed stable.

---

## PRIORITY 5 — Sustainability (V2)

- [ ] Stripe subscription
      £3-5/month supporter tier.
      7-day trial, card required.
      Unlocks book room writing.
      Auto-lock on cancellation.

- [ ] Plausible analytics
      Single script tag addition.
      No cookies. No personal data.
      Privacy respecting.
      Add before launch if possible —
      useful signal from day one.

- [ ] Resend email
      Magic links for auth.
      Trial expiry nudges.
      3,000 free/month.

- [ ] Honest sustainability page
      How Page Commons stays independent.
      Affiliate disclosure.
      Full model explained openly.

---

## PRIORITY 6 — Book-mates (V3, maybe)

Only build if Correspondent use case
is stable and accepted first.

- [ ] Book-mates feature
      Mutual consent only — both agree.
      Earned through existing conversation.
      Users never searchable.
      No public profiles.
      Shared shelf trigger notification.
      User-set books-in-common threshold
      (default: 2).
      All conversation book-scoped.
      No general chat ever.
      Adults only.
      Block always available.

---

## PRIORITY 7 — Platform maturity (V3)

- [ ] Cloudflare Pages migration
      Better cost certainty at scale.
      Unlimited bandwidth.
      3M free function calls/month vs
      100K on Vercel free tier.
      Functions use different format:
        /functions/api/ not /api/
        onRequest not export default
        context.env not process.env
      Do after June 1 launch —
      not before.

- [ ] Self-hosted Docker release
      Single command deployment.
      Plain SQLite not Turso.
      No social features in self-hosted.
      AGPL-3.0 enforced.

- [ ] PWA capability
      Add to home screen.
      Offline-first operation.
      Service worker for caching.
      Especially valuable for Kindle.

- [ ] Non-English UI languages
      French, Spanish, German first.
      Community-contributed translations.

- [ ] API for integrations
      Third-party book clubs.
      Rate limited. Auth required.

---

## USE CASES — reference

1. The Archivist
   Highlights + personal notes.
   Private reading journal.
   No AI, no community.
   V1 delivers this ✓

2. The Reflective Reader
   Everything above + AI companion.
   Clips and saves AI conversations.
   No real people involved.
   V1 delivers this ✓

3. The Annotator
   Leaves notes in book rooms.
   Anonymous by default.
   V2 delivers this.

4. The Correspondent
   Opts in to handle on notes.
   Book-scoped contact.
   V2 delivers this.

5. The Book-mate
   Deep mutual connection.
   Earned through reading.
   V3 maybe.

---

## DECISIONS MADE — do not revisit

- index.html + external app.js architecture
- Per
