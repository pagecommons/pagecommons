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
- Deploy: Vercel auto-deploy from GitHub
  push to main → live in ~30 seconds

## Architecture
- index.html — markup and CSS only
- app.js — ALL JavaScript (source)
- app.transpiled.js — Babel ES5 output
  THIS is what Vercel serves
- vercel.json — headers config
- api/books.js — Google Books proxy
- favicon.svg — dog-ear page icon
- CLAUDE.md — this file

## CRITICAL BUILD RULE
Kobo WebKit does not support modern JS.
ALL JavaScript in app.js must be 
transpiled through Babel before deploy.

Target: ie:11
Includes: regenerator runtime
Includes: Promise polyfill

Never deploy raw app.js to production.
Always deploy app.transpiled.js.

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
- #status — Reading status
- #language — Language choice
- #companion — AI chat
- #shelf — Your shelf
- #book-shelf — Book conversations
- #about — About page

## Five Use Cases (in order of complexity)
1. The Archivist — highlights + notes only
2. The Reflective Reader — adds AI companion
3. The Annotator — shares notes in book rooms
4. The Correspondent — opts in to be contacted
5. The Book-mate — deep mutual connection

## Providers
- Anthropic Claude Sonnet (primary)
  claude-sonnet-4-20250514
  https://api.anthropic.com/v1/messages
- Google Gemini Flash (free tier/fallback)
  gemini-2.0-flash
- Groq Llama (last resort)

## Environment Variables (Vercel)
- GOOGLE_BOOKS_API_KEY (sensitive)
- GEMINI_API_KEY (sensitive)
- KV_REST_API_URL (for transfer codes)
- KV_REST_API_TOKEN (for transfer codes)

## Privacy Principles (non-negotiable)
- No user data ever stored server-side
  in V1 (localStorage only)
- API keys never logged or retained
- Transfer codes deleted immediately
  after retrieval
- Private messages never moderated
- Block is the only social remedy

## Current Version
v0.25 — confirmed working on 
Kobo Libra Colour device.

## What NOT to change
- Single HTML + app.js architecture
- E-ink design rules
- Privacy-first approach
- Batch AI responses (never stream)
- No author or genre rooms
- No likes or engagement metrics
- No CSS variables
- No modern JS without Babel

## Pending Work
See PENDING.md for full prioritised
list of what to build next.
