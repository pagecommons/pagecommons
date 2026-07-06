# Page Commons — Strategy Note

Last updated: June 2026
Status: Post-launch thinking, not pre-launch work
Companion to: CLAUDE.md, PENDING.md, STATUS.md

---

## Purpose of this document

This captures product direction and strategic decisions
that sit above the feature backlog. It is deliberately
separate from PENDING.md, which is execution.

Nothing in here is to be built before the V1 lite launch.
The launch is the experiment. This document describes what
happens after the experiment returns a signal.

---

## The core reframe — what Page Commons actually is

The companion is not a chatbot you talk *to*. It is a
thinking tool you think *with*.

For non-fiction especially, the act of articulating what
you took from a book — prompted by a companion that asks
good questions — is how understanding consolidates. The
companion is a Socratic partner that draws thoughts out
of the reader.

The conversation is the artifact. Not the answer the AI
gives, but the thinking the reader does in response to it.

This distinguishes Page Commons from:
- Goodreads (cataloguing what you read)
- Generic AI chat (answering questions you ask)

Page Commons is reflective reading as a practice.

### Implications of this reframe

- Conversation export is central, not peripheral. A
  reader's reflections must never be trapped. Lite exports
  to .txt; the modern version exports to Obsidian, Notion,
  iCloud, Google Drive via the device share sheet.
- The lite version is not "cheap." It is a complete,
  focused tool for thinking through what you read, on the
  device you read on. That framing matters for how it is
  perceived and described.
- Launch copy should lead with the thinking-tool angle,
  not the chat angle. Position it as a reading practice,
  not a novelty.

---

## The two-version strategy

### Why diverge

The e-ink constraints that make the lite version special
are also a ceiling. No streaming, no modern JS, tiny
screens, slow processors, painful text input. The build
has been a constant fight against these limits.

Key audience insight: anyone who discovers Page Commons
found it on a phone or computer. Reddit does not render
well on a Kindle. Every user already owns a modern device.
The e-ink version is a nice-to-have for the reading moment;
the phone is where discovery, sharing, and richer features
naturally live.

### The split

**Lite version (current codebase)**
- E-reader specific (Kindle, Kobo browsers)
- Frozen feature set after launch: chat with companion,
  import clippings, personal shelf, personal notes
- Serves the Archivist and Reflective Reader use cases
- Receives bug fixes only after freeze
- Does one thing and does it properly: think with the
  companion on the device you are reading on

**Modern version (future, reception-gated)**
- For smartphone, iPad, desktop browsers
- PWA first (preserves instant-deploy advantage)
- Native iOS/Android via Capacitor only if warranted
  later — note this inherits app store review cycles,
  Apple's cut, and Android testing requirements
- Where all new development happens
- Where book rooms, sync, and richer export land
- Built by reusing the core logic of the lite version

### Managing divergence cost

Two diverging codebases is a real maintenance burden for
a solo founder. Mitigation: freeze the lite version. If
lite only ever receives bug fixes and stays core-feature
only, divergence cost stays low. All new development moves
to the modern version.

---

## Decision gate

The lite launch is reception-gated:

- **Bad reception** → development slows. Re-evaluate
  whether the idea has legs before investing further.
- **Neutral-to-good reception** → proceed with the
  modern version. Keep lite alive and frozen because
  retiring something that works would be a waste.

Do not let the modern-version idea pull focus before
launch. Hold to the gate.

---

## Feature allocation

### Lite version (frozen set)
- Chat with companion (core)
- Import Kindle My Clippings.txt
- Personal shelf
- Personal reflection notes per book
- Conversation export to .txt
- Companion language detection and per-book override

### Modern version (future)
- Everything in lite, richer
- Book rooms (read + write) — the Annotator and
  Correspondent use cases
- Export to Obsidian, Notion, iCloud, Google Drive
  via native share sheet
- Cross-device sync (Turso + Clerk)
- Reader Wiki, reading pulse, and other V2+ community
  features

### On book rooms specifically
Read-only book rooms could technically work on Kindle,
but writing, threading, filtering, and accounts run into
Kindle limits, and the server infrastructure (Turso,
Clerk, moderation) breaks the lite version's clean
privacy-first localStorage-only model.

Decision: keep "Enter a book room — coming soon" in lite
as a signal of intent, but do not build it into lite.
Book rooms land on the modern version. When a lite user
taps the teaser, it can eventually point them to the
modern version — a natural discovery path. The future copy
can become "Book rooms are available on Page Commons for
phone and desktop" with a link to the modern version.

---

## Brand and ecosystem context

- Same founder (Pete) behind Pausle and Page Commons.
  Shared voice across both support pages builds trust
  and a small ecosystem.
- Positioning vs Folio (Taiwanese reading-buddy app):
  Folio is social-first, requires other people to be
  available, collects location and sensitive data. Page
  Commons is private-first, works alone, and runs in any
  browser with no install. Page Commons is the anti-Folio
  in the best sense. The reading-companion idea has
  validated demand; the positioning is distinct.

---

## AI model strategy

- Primary free pool: Gemini 3.1 Flash-Lite. Supports
  systemInstruction, keeps reasoning internal, strong
  multilingual quality including Traditional Chinese.
  500 RPD — sufficient for launch.
- Emergency fallback: Gemini 2.5 Flash (RPD 20, fires
  only when primary hits daily cap).
- Rejected: Gemma 4 26B — no systemInstruction support
  and thinking-mode leakage make it unusable in the
  current AI Studio setup, despite the higher RPD.
- Post-launch options if 500 RPD becomes a real
  constraint (evaluate together, pick one):
  - Groq paid tier ($5) if paid upgrades have reopened —
    simplest integration
  - OpenRouter ($10) — OpenAI-compatible, multi-model,
    needs a new api route
  - Vertex AI MaaS for Gemma 4 — proper systemInstruction
    support and 1.5K RPD, but needs OAuth service account
    setup on Vercel
- BYOK remains available for users who want Claude Sonnet
  or their own provider.

---

## Monetisation posture

- Core stays free, always. No ads, no data selling, no
  algorithmic feed.
- Day-one support: Ko-fi tip jar (donations only), surfaced
  via a subtle per-screen footer linking to the support page.
  This public lite version stays non-commercial — no
  affiliate or referral links (Vercel Hobby compliance).
- A paid supporter tier comes later (Stripe + Clerk),
  framed as supporters subsidising the free tier — not
  free users being downgraded.
- Ko-fi cannot reliably gate a subscription tier on its
  own; Stripe is the right foundation when that time comes.

---

## One-line summary

The lite version's frozen feature set is: chat with
companion, personal shelf, personal notes, sync
conversation — the Reflective Reader and Archivist use
cases. That's it. Book rooms — the community layer, the
Annotator and Correspondent use cases — become a modern
version feature.
