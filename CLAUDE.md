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
- vercel.json — headers config
- api/books.js — Google Books proxy
- api/ai.js — free tier Gemini proxy
- api/transfer.js — key transfer codes
- favicon.svg — dog-ear page icon
- CLAUDE.md — this file
- PENDING.md — full feature backlog
- STATUS.md — current session status

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
- Warm but not gushing
- Curious — always asks something back
- Never summarises plot unprompted
- Short responses (e-ink screen size)
- Always ends with question
- Spoiler-aware by reading status
- Never says "Great question!"
- Feels like a well-read friend
- Plain prose only — no bullet points

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
v0.39 — sanity-check bug-fix round. Fixed chat retry losing the
user's message, AI-mode toggle being ignored (BYOK key spent in
shared mode), Drive sync reporting false success / caching undefined
folder ids, sync merge dropping per-book reading state, passages
"Saved ✓" check, global companion-language preference being wiped,
offline queue for shared-pool users, [RECOMMEND] attribute escaping,
and Kobo-unsafe APIs (NodeList.forEach, Set/Map, URLSearchParams,
scrollTo options). Also fixed the broken Babel pipeline (was emitting
require() calls) and pointed index.html at app.transpiled.js.
See STATUS.md. Kobo/Kindle device test pending.

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
