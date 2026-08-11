# Page Commons — Claude Code Context

## What This Is
Page Commons (pagecommons.com) is a 
reading companion web app optimised 
for e-ink devices (Kindle, Kobo Libra 
Colour). Open source, privacy-first, 
indie project by a solo founder.

## Live URLs
- Production: pagecommons.com
- Repo: github.com/pagecommons/pagecommons
- Personal GitHub also has collaborator
  access to this repo
- Deploy: Vercel auto-deploy from GitHub
  push to main → live in ~30 seconds

## Launch Target
- June 1 2026 — Reddit launch
- Target subreddits:
  r/kobo, r/kindle, r/books,
  r/selfhosted, r/privacy, r/eink
- Everything before June 1 is
  launch preparation only
- No new features beyond P1 items
- Polish, stability, device testing

## Architecture
- index.html — markup and CSS only
- app.js — ALL JavaScript (source)
- app.transpiled.js — Babel ES5 output
  THIS is what Vercel serves
- support.html — standalone support page
- transfer.html — desktop key transfer page
- privacy.html — standalone privacy policy page
- terms.html — standalone terms & conditions page
- vercel.json — headers config
- api/books.js — Google Books proxy
- api/ai.js — free tier Gemini proxy
- api/transfer.js — key transfer codes
- favicon.svg — dog-ear page icon
- CLAUDE.md — this file
- PENDING.md — full feature backlog (active)
- ROADMAP.md — long-term V2/V3 roadmap
  (was pending.md; renamed to fix a
  case-only clash with PENDING.md)
- STATUS.md — current session status
- STRATEGY.md — product direction (post-launch)
- test/ — headless harness (npm test)

## CRITICAL BUILD RULE
Kobo WebKit does not support modern JS.
ALL JavaScript in app.js must be 
transpiled through Babel before deploy.

Target: ie:11
Includes: regenerator runtime
(Babel helpers are inlined — no
@babel/runtime require() calls.)

No Promise polyfill ships: the app
relies on fetch() everywhere, and any
WebKit new enough to have fetch also
has Promise. The hand-written polyfills
at the top of app.js cover only
includes/startsWith/endsWith/Object.assign.

Never deploy raw app.js to production.
Always deploy app.transpiled.js.
index.html loads app.transpiled.js.

To rebuild: npm install (once), then
node_modules/.bin/babel app.js \
  -o app.transpiled.js
Then verify: grep -c 'require(' on the
output must be 0.

## VERSIONING RULE
Bump the version number on EVERY code
change. Update both:
- index.html header tagline span
  (the "vX.YY" next to "Just books.
  No noise.")
- the "## Current Version" line below
Keep them in sync. Increment the minor
version (v0.40 → v0.41 → …) each change
unless told otherwise.

## CRITICAL — Do Not Remove
The permanent synchronous IIFE at the
very top of app.js forces screen-home
to display:block before init() runs.
This is required for Kobo to render.
NEVER remove or move this block.

## Known Kobo Constraints
These will break the app on Kobo:
- async/await (use Babel transpilation)
- gap: in CSS (use margin instead)
- calc() (use hardcoded values)
- Template literals
- Optional chaining (?.)
- Nullish coalescing (??)
- const/let (use var)
- Arrow functions (use function(){})
- for...of loops
- Object/array spread
- NodeList.forEach
- Inline <script> blocks (use app.js)

## E-ink Design Rules (non-negotiable)
- White #ffffff background
- Black #111111 text
- No animations or transitions
- No gradients or shadows
- No CSS variables (hardcoded only)
- No border-radius (all 0)
- No flexbox gap: (use margins)
- No calc() (use fixed values)
- 44px minimum tap targets
- 18px minimum font size
- Georgia serif for content
- Helvetica Neue for UI chrome
- Max 600px content width
- No sticky headers
- No infinite scroll
- Batch AI responses only (never stream)
- Text-only loading states
- Webkit vendor prefixes on all flexbox

## AI Companion Design Rules
SHARED by every persona (never vary):
- Never summarises plot unprompted
- Short responses (e-ink screen size)
- Spoiler-aware by reading status
- Never says "Great question!"
- Plain prose only — no bullet points
- Honest about what it doesn't know;
  never confabulates, never escapes an
  unknown by suggesting another book
- [RECOMMEND: Title by Author] only when
  the reader asks for a recommendation

SET BY THE PERSONA (see PERSONAS in
app.js) — each supplies a `voice` and a
`closing`:
- companion (default) — warm but not
  gushing, well-read friend, ALWAYS ends
  with a question. This is the original
  pre-v0.60 voice; unchanged for anyone
  who never picks another.
- guide — patient explainer; context and
  ideas; questions only when useful
- direct — answer first, no padding,
  does NOT question the reader back
- kindred — quietly present for books
  that land emotionally; not a therapist

WRITING A `closing`: phrase it as an
instruction, never a permission. Models
default to ending on a question, so
"sometimes a question" reads as consent
and they ask every time — this is what
made Kindred behave like Companion in
v0.60. Any persona meant to hold back
must say "Do not end with a question..."
explicitly. A test enforces this.
No persona may stack two questions in
one reply.

"Always ends with a question" was a
blanket rule until v0.60. It is now
persona-dependent: it made the companion
interrogate readers who only wanted to
know what a book was like.

Persona resolution (getPersonaId):
  per-book pc_persona_override_<bk>
  → global pc_persona
  → 'companion'
Unknown/absent values fall back safely.

## INTERFACE LANGUAGE (i18n)
Interface text lives in UI_STRINGS
(app.js), keyed by screen:
  'home.talk_to_your_companion'
  'js.status_midway'   (JS-built text)

Markup carries the key, never the
translation:
  data-i18n             → textContent
  data-i18n-html        → innerHTML
                          (strings with
                          inline markup)
  data-i18n-placeholder → placeholder

applyLanguage(lang) walks those
attributes on boot and on every switch.
Text built in JS uses t('key').

ADDING A STRING: put the English in
UI_STRINGS.en, the translation in
UI_STRINGS['zh-TW'], then reference the
key from markup or t(). Tests fail if
either table is missing a key, if markup
references a key that doesn't exist, or
if any user-visible markup text has no
data-i18n at all.

MULTI-LINE / MIXED CONTENT: an element
whose text wraps across lines, or that
wraps text around <br>/<strong>, needs
data-i18n-html on the PARENT with the
markup inside the translation. Tagging
only the inner <strong> leaves the
surrounding text in English — this is
what shipped broken in v0.57. The same
applies to a wrapped placeholder= — the
attribute must be on the same construct
you annotate.

MARKUP REBUILT IN JS: if a function does
container.innerHTML = ... it destroys the
data-i18n attributes underneath, and
applyLanguage() can never reach them
again. Such code MUST build its text from
t(), not from an English constant. This
was the bug behind the status options,
the manual-entry form and the toolbar
counts. Static scans cannot see it —
the runtime test ("no English prose
survives on the core screens in Chinese")
is what catches it.

NEVER translate: the brand "Page
Commons", provider names (Anthropic
Claude, Google Gemini, Groq), or the
version string.

The interface language (pc_ui_lang) is
SEPARATE from the companion language
(pc_companion_lang) — readers may want
a Chinese interface with an English
companion, or the reverse.

Fonts: Georgia and Helvetica Neue have
no CJK glyphs, so every stack ends with
CJK families. Fallback is per-glyph, so
Latin text is unaffected. body.ui-cjk
carries CJK-only line-height and
letter-spacing tuning.

## App Structure
Single file SPA with hash navigation:
- #home — Library Hall
- #tc — Terms & Conditions
- #key — API key setup
- #search — Book search
- #book-detail — Book detail view
- #status — Reading status
- #language — Language choice
- #companion — AI chat
- #shelf — Your shelf
- #book-shelf — Book conversations
- #preferences — User preferences (incl. first-run setup)
- #age-gate — Adult content gate
- #onboarding — AI mode choice (first run)
- #about — About page

Standalone pages:
- support.html — Support / donate page

## Five Use Cases
1. The Archivist
   Highlights + personal notes only
   No AI, no community needed
   V1 delivers this ✓

2. The Reflective Reader
   Everything above + AI companion
   Saves conversations and passages
   No real people involved
   V1 delivers this ✓

3. The Annotator
   Leaves notes in book rooms
   Anonymous by default
   No AI or direct interaction needed
   V2 delivers this

4. The Correspondent
   Opts in to show handle on notes
   Book-scoped contact only
   V2 delivers this

5. The Book-mate
   Deep mutual reading connection
   Triggered by shared shelf
   Always book-scoped
   V3 maybe

## Providers
- Anthropic Claude Sonnet (primary BYOK)
  claude-sonnet-4-20250514
  https://api.anthropic.com/v1/messages
- Google Gemini (free shared tier pool)
  gemini-3.1-flash-lite
  Proxied via api/ai.js (500 RPD quota)
- BYOK alternatives: Gemini
  (gemini-2.5-flash) and Groq
  (openai/gpt-oss-120b — llama-3.3-70b
  decommissioned 2026-08-16)

## Environment Variables (Vercel)
- GOOGLE_BOOKS_API_KEY (sensitive)
- GEMINI_API_KEY (sensitive)
- KV_REST_API_URL (Upstash Redis)
- KV_REST_API_TOKEN (Upstash Redis)
- GDRIVE_CLIENT_ID (Drive sync OAuth, also hardcoded in app.js)
- GDRIVE_CLIENT_SECRET (Drive sync OAuth, sensitive — server only)

## Privacy Principles (non-negotiable)
- No user data ever stored server-side
  in V1 (localStorage only)
- API keys never logged or retained
- Transfer codes deleted immediately
  after retrieval (one-time use)
- Private messages never moderated
- Block is the only social remedy
- User owns all their data always

## Current Version
v0.62 — Runtime translation coverage + persona weighting. Fixes every remaining untranslated surface found in testing: status-screen options (JS rebuilt them from STATUS_OPTIONS_EN, discarding the markup's data-i18n), the manual-entry form, "About this book", "No notes yet", the clippings confirm, and three input placeholders whose attributes wrapped across lines. Persona closings are now RESTATED as the final line of the system prompt — they previously sat 19% in and were ignored by the free tier's flash-lite model. Companion and Kindred voices sharpened so they stop converging. New runtime test renders each screen in Chinese and fails on surviving English prose; it catches the whole "JS rebuilds annotated markup" class that three separate static tests missed. +3 tests (50 total).

Earlier (v0.61): Persona closings rewritten as instructions, not permissions. Kindred shipped with "sometimes a question, sometimes room to say more", which models read as permission and so asked every time — the exact behaviour personas exist to avoid. Guide had the same weakness. Both now carry an explicit "Do not end with a question by default". New shared rule: never more than one question per reply (the reported case stacked two). Also fixes a false positive in the Kobo-syntax test, which scanned string literals and tripped on the word "let" inside prose. +2 tests (47 total).

Earlier (v0.60): Companion personas. One voice did not fit every use case: the default always asks something back, which works against a reader using "Find out if it's for me" who simply wants to know what a book is like. Four voices — Companion (default, unchanged behaviour), Guide, Direct, Kindred — each supplying a `voice` and a `closing`; all other prompt rules stay shared. Global default in Preferences plus a per-book override via a new Voice button in the chat toolbar. Discover mode no longer demands a taste question before saying anything useful. Also fixes a v0.57 regression where the language panel's active highlight compared translated button text against English values. +7 tests (45 total).

Earlier (v0.59): ISBN lookup fixed: it queried Open Library ALONE, so recent titles returned "ISBN not found" even when Google Books had them (reported against 9781804953334). New lookupISBN() tries Google Books first via the authenticated /api/books proxy, keeping Open Library as fallback. Google Books also returns the categories the age gate reads, plus description and page count, which the Open Library path never provided. +5 regression tests (38 total). Also fixed "Is this for me?" on ISBN results, which was embedded in an innerHTML string and missed by the v0.58 sweep.

Earlier (v0.58): i18n coverage fixes found in testing: the home description and T&C notes (multi-line elements the first-pass audit skipped), the JS-injected "Preferences" footer link, book-detail buttons, Notes/Passages/Highlights toolbar counts, key status bar, and ~50 further JS-built strings (search statuses, transfer flow, toolbar messages). 280 keys × 2 languages. New test scans the WHOLE document for untranslated markup — the line-based audit that missed these is the reason they shipped.

Earlier (v0.57): Interface language (i18n) layer + Traditional Chinese. Markup carries data-i18n / data-i18n-html / data-i18n-placeholder keys; applyLanguage() fills them from UI_STRINGS on boot and on switch; JS-built text uses t('key'). New pc_ui_lang preference with a picker in Preferences, deliberately separate from the companion language. All font stacks extended with CJK fallbacks (also fixes Chinese book titles in the English UI). 244 keys × 2 languages, +7 regression tests (32 total). Traditional Chinese is a first-pass translation pending a native review.

Earlier (v0.56): Affiliate links removed for non-commercial compliance (Vercel Hobby): Amazon affiliate button + disclosure dropped from support.html (Ko-fi donation CTA kept), privacy/terms reworded, planning docs scrubbed of affiliate plans. The public lite version carries donations only.

Earlier (v0.55): Endless Back loop fix (BUGFIXES v0.55): endConversation() now clears the back stack and marks the navigation back-style, so chat → Back → shelf → Back goes to the Library Hall instead of bouncing back into the ended chat. Header links away from a live chat (Main / Find a book) still push 'companion' so Back returns to the active conversation. +1 regression test (25 total).

Earlier (v0.54): Groq model migration (BUGFIXES v0.54): llama-3.3-70b-versatile is decommissioned on Groq 2026-08-16; all five Groq call sites now use a single GROQ_MODEL constant set to openai/gpt-oss-120b (Groq's recommended replacement). Manual quality check on a real Groq key still pending — flip GROQ_MODEL to qwen/qwen3.6-27b if quality disappoints.

Earlier (v0.53): Bug-fix round ported from the private repo (see BUGFIXES v0.53 log): Gemini NL-search ReferenceError (langNote); manual book lookup LANG_CODE_TO_NAME + thumb/cats/description on buildBookFromGoogleItem; book-detail XSS escaping; discover-mode leaks (no shelf save, companionMode reset on continue/new conversation); offline queue rework (display-only pending bubbles, drain on companion open, replies saved); clippings progress regression guard; byokActive() helper so shared mode never bills a leftover BYOK key; 'revisiting' status labels; stale Passages/Notes toolbar counts; transfer-code SET NX collision retry; backup import restricted to pc_ keys.

Earlier (v0.52): End Chat restored to toolbar: header ← Back covers early exit (before much scrolling), toolbar End Chat covers exit after a long conversation without scrolling back up. Toolbar: Highlights · Passages · Notes · Language · Export · Sync · End Chat.

Earlier (v0.51): Header nav extended to companion/chat screen. Toolbar "Find a book" and "End Chat" buttons removed — header ← Back now triggers endConversation() (save + go to shelf), same behaviour as the old button. Toolbar is now purely chat tools: Highlights · Passages · Notes · Language · Export · Sync.

Earlier (v0.50): Header nav: on inner screens the tagline swaps for "← Back · Main · Find a book" right-aligned in the header, saving a full row of vertical space per screen. Home screen keeps the tagline. Companion/tc/onboarding show a minimal header.

Earlier (v0.49): Home screen: moved "No ads. No algorithms..." pitch into the description paragraph (same font/size, immediately visible). "Search for a book" / "Search book" renamed to "Find a book" across all screens and toolbar.

Earlier (v0.48): UI polish: search screen hint ("search by title and author below"); footer now has top border + header-matching "PAGE COMMONS" brand text; "Support" → "Support us"; home screen top/bottom spacing reduced so greeting is closer to header on small screens.

Earlier (v0.47): Shelf archiving: books can be archived from the shelf (collapsible "Archived" section, folded by default, revivable). Removed redundant "New book" button from companion header (replaced by "Search book" in toolbar).

Earlier (v0.46): Unified screen-nav row (← Back · Library Hall · Search for a book) applied to all inner screens: About, Book detail, Status, Language, Shelf, Preferences, Book conversations. Single .screen-nav CSS class. Key and Search screens left with their existing custom nav.

Earlier (v0.45): Shelf nav links moved above content. "Search book" button added to chat toolbar.

Earlier (v0.44): Anthropic model updated to claude-sonnet-4-6 and extracted to a single ANTHROPIC_MODEL constant (one place to update going forward).

Earlier (v0.43): Shelf screen: added Library Hall and Search navigation links. System prompt: tightened confabulation rule to distinguish well-known book content (state with confidence) from genuinely uncertain specifics (hedge and ask).

Earlier (v0.42): Kindle clippings import built but hidden. Full pipeline implemented
(gdriveDownloadText, importClippingsFromDrive, showDriveClippingsBooksConfirm,
confirmAddDriveBooks) and the existing parseClippingsText/getRelevantHighlights
context injection is intact. Hidden because 2024 Kindle uses MTP which Mac does
not support natively, making My Clippings.txt inaccessible for a significant
portion of users. Re-enable when a Mac-friendly import path exists (e.g. parser
for read.amazon.com/notebook format, or Bookcision export support).

Earlier (v0.41): post-verification polish. Fixed the bookKey() collision (now
keys on the full title+author, not the first 40 chars) with a one-time
shelf-driven migration of existing per-book data; one-row footer (brand
left, Support/Privacy/Terms right) across the app + standalone pages;
renamed pending.md → ROADMAP.md (case-clash fix). Added a headless test
harness (npm test). Google Drive sync is verified + live in production
(domain ownership via Cloudflare DNS). Kobo/Kindle device test of the
footer flex + bookKey migration pending.

Earlier (v0.40): soft-launch prep. Per-conversation .md sync to Google Drive;
fixed book-reload switching to a stale book and the companion-language
inconsistency (explicit choice now wins, defaults to English; auto-
follow-the-book option removed). Hid the Kindle clippings import for
the soft launch (markup kept). Moved a Sync button into the chat
toolbar (connect/disconnect stays in Preferences). Simplified chat
navigation (End Chat → Shelf, "New book" → search, removed duplicate
Shelf button). Added standalone privacy.html + terms.html (linked in
every screen footer) for Google Drive sync verification. Added
STRATEGY.md. Kobo/Kindle device test pending.

Earlier (v0.39): sanity-check bug-fix round — chat retry, AI-mode
toggle, Drive sync false success, sync merge, passages check, language
pref, offline queue, [RECOMMEND] escaping, Kobo-unsafe APIs, and the
Babel pipeline. See STATUS.md.

## What NOT to Change
- index.html + app.js architecture
- Permanent IIFE forcing screen-home visible
- E-ink design rules
- Privacy-first approach
- Batch AI responses (never stream)
- No author or genre rooms
- No likes or engagement metrics
- No CSS variables
- No modern JS without Babel transpilation
- vercel.json Content-Type headers

## Pending Work
See PENDING.md for full prioritised
list of what to build next.
See STATUS.md for current session state.

## End of Session Routine
At the end of every working session
update STATUS.md with:
- What was completed this session
- What was tested and results
- Current known issues
- Recommended next task
- Current version number
