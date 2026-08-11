# Page Commons — Current Status

Last updated: August 11, 2026
Current version: v0.61
Updated by: Claude session — v0.42–v0.61: nav/UI polish, shelf archiving,
private-repo bug-fix ports (v0.53–v0.55), affiliate removal (v0.56),
interface i18n + Traditional Chinese (v0.57–v0.58), ISBN lookup fix
(v0.59), companion personas (v0.60–v0.61)

## What was done this session [v0.42 → v0.61]

### v0.61 — Persona closings rewritten as instructions
Reported: Kindred still ended every reply with a question (two, in the
example given). Verified it was not a plumbing bug — the persona resolved
correctly and reached the prompt. The wording was the fault.

- **Cause.** Kindred's closing read "End with warmth — sometimes a
  question, sometimes simply room for them to say more." Models default
  strongly to closing on a question, so a permissive phrasing is read as
  consent and they ask every time. Guide had the same weakness ("only
  when it genuinely helps" — the model judges that it always helps).
  Only Direct was phrased as a real constraint, which is why only Direct
  behaved.
- **Fix.** Guide and Kindred now open with an explicit "Do not end every
  turn with a question" / "Do not end with a question by default".
  Companion is untouched — it is supposed to ask.
- **New shared rule:** never more than one question per reply. The
  reported example stacked two, which no persona should do.
- **Test added** asserting the distinction structurally: every non-default
  persona must contain an explicit negative and must not contain
  "sometimes a question"; Companion must keep "Always end with a
  question". Wording drift back to permissive phrasing now fails CI.
- **Also fixed:** the Kobo-syntax build test scanned string literals, so
  the word "let" inside the new prose ("better to let your last sentence
  rest") registered as a `let` declaration. It now blanks string bodies
  before scanning — verified it still catches a genuine injected `const`.

### v0.60 — Companion personas
Reported: the companion throws a question back on every turn, which is
wrong for a reader using "Find out if it's for me" who just wants to know
what a book is like — and different kinds of book want different kinds of
conversation.

- **Four voices.** Each persona supplies only two things: a `voice` (who
  it is) and a `closing` (whether it hands the turn back). Everything
  else — spoiler rules by reading status, the honesty/no-confabulation
  rules, plain-prose formatting, [RECOMMEND] — stays shared, so a persona
  can change the tone without loosening any of the guarantees.
  - **Companion** (default) — the existing voice, verbatim, still always
    ends with a question. Nobody who ignores this feature sees a change.
  - **Guide** — patient explainer: context, themes, structure.
  - **Direct** — answer first, no padding, explicitly does *not*
    interrogate. This is the fix for the reported problem.
  - **Kindred** — quietly present for books that land emotionally;
    explicitly not a therapist.
- **Two levels.** Global default in Preferences; per-book override from a
  new **Voice** button in the chat toolbar, mirroring how the companion
  language already works (`pc_persona` / `pc_persona_override_<bk>`).
  Unknown or missing values fall back to Companion.
- **Discover mode fixed independently.** It used to open with "ask ONE
  question about their preferences… wait for their answer before
  describing the book" — so the reader was interrogated before getting
  anything useful. It now leads with what the book is like and may ask
  about taste only *after* giving something worth reading. Spoiler rules
  unchanged.
- **Also fixed:** a v0.57 regression where the language panel's active
  highlight compared the button's *translated* text ("英文") against the
  stored English value, so no language ever highlighted in the Chinese
  UI. Now matches on a `data-lang` attribute. The "Prompts now in …"
  toolbar message was also still hardcoded English.
- **+7 tests (45 total)**, incl. that shared rules survive every persona,
  that Direct removes the always-ask rule, that discover no longer gates
  on a taste question, and per-book override precedence. Plus a 26-check
  browser pass.

**Note on scope:** CLAUDE.md's "AI Companion Design Rules" listed "Always
ends with question" as a blanket rule. That is now persona-dependent and
the file has been restructured into shared vs persona-set rules.

### v0.59 — ISBN lookup fixed (reported: 9781804953334 not found)
- **Cause:** the ISBN branch of `_searchBooks` queried **Open Library
  alone**, while every other search path uses Google Books as primary via
  the authenticated `/api/books` proxy. Open Library's coverage of recent
  editions is much thinner, so newer titles reported "ISBN not found"
  even when the same book was findable by title in the same app.
- **Fix:** new `lookupISBN()` tries Google Books first, falls back to
  Open Library, and resolves to null only when neither has the book.
- **Secondary bug fixed by the same change:** the Open Library path
  returned no `cats`, so **the age gate could not classify any
  ISBN-found book**. Google Books records carry categories, plus the
  description and page count the detail screen wants. The Open Library
  fallback now sets `cats: ''` explicitly (unclassified, not "safe").
- **i18n:** "Is this for me?" on ISBN results was embedded inside an
  innerHTML string, so the v0.58 sweep (which matched standalone
  literals) missed it. Now wired, along with a new `js.unknown_title`.
- **+5 regression tests (38 total)**, covering: GB hit skips OL, GB empty
  falls back, GB throwing still falls back, neither source → null, and
  both failing → null rather than an unhandled rejection.
- **Not verified against the live APIs.** This sandbox's network policy
  blocks Open Library and returns 429 on anonymous Google Books, and
  pagecommons.com/api/books answers 403 here — so whether that specific
  ISBN exists in Google Books is still unconfirmed. The logic is verified
  against stubs. Worth re-testing the real ISBN once deployed.

### v0.58 — i18n coverage fixes (found by the founder in testing)
Four gaps reported, and a root-cause sweep found more. All fixed.

- **Root cause:** the v0.57 gap audit ran line-by-line, so any element
  whose text spanned multiple lines was silently skipped — the home
  description (wrapped, with a `<br>`) and the four T&C notes (where only
  the inner `<strong>` was tagged, leaving the sentence after it English).
  Re-audited across the whole document and fixed with `data-i18n-html`
  on the parent.
- **Also fixed:** the JS-injected "Preferences" footer link; book-detail
  buttons ("Find out if it's for me", "I have this book", "Back");
  Notes / Passages / Highlights toolbar counts; the API-key status bar;
  and ~50 further JS-built strings swept up in the same pass (search
  statuses, ISBN lookup, transfer-code flow, toolbar messages, free-tier
  note, "Untitled" / "Unknown author" fallbacks).
- 244 → **280 keys** per language. Four orphaned `tc.*` keys removed.
- **New test: whole-document markup scan.** Fails if any user-visible
  text lacks a data-i18n attribute. Verified it catches a real
  regression by removing an annotation and watching it fail. This is the
  test that would have prevented v0.57 shipping incomplete; the lesson is
  that line-based scanning of HTML is not sound.
- Tests 32 → **33**; plus an 11-check browser pass over the exact items
  reported, and the 28-check i18n smoke still green.

### v0.57 — Interface language layer + Traditional Chinese
Motivation: a Cantonese YouTube channel demo / soft launch, which reads
much better with a Chinese interface. The companion side already spoke
Traditional Chinese; only the chrome was hardcoded English.

- **Architecture.** Interface text now lives in `UI_STRINGS` (app.js),
  **244 keys × 2 languages**. Markup carries the key, never the
  translation: `data-i18n` (textContent), `data-i18n-html` (strings with
  inline markup), `data-i18n-placeholder`. `applyLanguage(lang)` walks
  those attributes on boot and on every switch; JS-built text uses
  `t('key')`. All ES5/Kobo-safe — indexed loops, no NodeList.forEach.
- **Separate from the companion language.** New `pc_ui_lang` preference
  with its own picker in Preferences. A reader can run a Chinese
  interface with an English companion, or the reverse. A test asserts
  switching the interface never touches `pc_companion_lang`.
- **Fonts (the risk flagged before starting).** Georgia and Helvetica
  Neue carry no CJK glyphs. All 79 font stacks across index/support/
  privacy/terms now end with CJK families (Songti TC / Noto Serif CJK /
  PingFang TC / Noto Sans CJK / Microsoft JhengHei). Fallback is
  per-glyph so Latin text renders exactly as before — and this **also
  fixes Chinese book titles in the English UI**, a pre-existing gap.
  `body.ui-cjk` adds CJK-only line-height (1.8) and letter-spacing
  tuning, since Latin tracking looks broken on square glyphs.
- **Never translated:** brand "Page Commons", provider names, version.
- **Dead code removed:** `SEARCH_HEADINGS` / `SEARCH_HEADINGS_NAMED`
  arrays, now superseded by table keys that rotate per language.
- **Tests: 25 → 32.** New: default-English, switch-and-switch-back
  (asserts the exact English string returns), interface/companion
  independence, brand never translated, both tables have identical key
  sets, every markup key exists in the table, CJK fallback present and
  ordered after the Latin families. Plus a 28-check Chromium smoke pass
  (persistence across reload, no raw keys leaking to screen, no console
  errors).

**Open — needs the founder, a native speaker:** the Traditional Chinese
is a careful first pass, not a native review. The app's whole personality
lives in its wording ("warm but not gushing"), and machine translation
flattens exactly that. Terminology chosen: 書伴 (companion), 書架
(shelf), 摘句 (passages), 標註 (highlights), 主頁 (main). Worth a read
end-to-end before filming.

**Open — device test:** whether Kobo Libra Colour and Kindle actually
have a CJK font to fall back to. This cannot be settled headlessly and
is the one thing that could still derail a demo. Test before committing
to a filming date.

**Not translated (deliberate):** privacy.html and terms.html (1,367
words of legal text — a translation raises the question of which version
governs; the normal approach is a note that the English is authoritative).

### v0.56 — Affiliate links removed (non-commercial compliance)
- The public lite version must remain **non-commercial** (Vercel Hobby
  plan compliance). Removed the Amazon affiliate button and the
  disclosure line from support.html, plus the now-unused `.disclosure`
  CSS; the page now has a single Ko-fi CTA.
- privacy.html third-party-links section and terms.html third-party
  services section reworded to drop the Amazon/affiliate mentions.
- Planning docs scrubbed: ROADMAP.md V2 "Affiliate links" item replaced
  by non-commercial "Find this book" links (WorldCat/email) and the
  sustainability-page affiliate-disclosure line dropped; STRATEGY.md
  monetisation posture now states the public repo carries donations
  (Ko-fi) only; PENDING.md checklist items updated.
- Ko-fi (donations) intentionally kept everywhere.
- Note: `read.amazon.com` still appears in an index.html comment and
  CLAUDE.md — that is the technical reference for the hidden Kindle
  clippings-import feature (a device export URL), not a commercial link.

### v0.55 — Endless Back loop fix (BUGFIXES v0.55 port)
- `endConversation()` now clears the back stack and marks the navigation
  back-style, so chat → Back → shelf → Back goes to the Library Hall
  instead of bouncing back into the ended chat. Header links away from a
  live chat still push 'companion' so Back returns to the conversation.
  +1 regression test (25 total), verified failing against pre-fix bundle.

All on branch `claude/brave-lovelace-vet1sn`; v0.42–v0.52 merged to main
(PRs #2–#8, squash), v0.53–v0.55 merged via PR #9. All ES5/legacy-WebKit
safe; app.transpiled.js rebuilt and committed each round; `npm test`
green throughout (25 tests as of v0.55).

### v0.54 — Groq model migration (BUGFIXES v0.54 port)
- `llama-3.3-70b-versatile` is decommissioned on Groq **2026-08-16**.
  Added `GROQ_MODEL` constant (below `ANTHROPIC_MODEL`) set to
  `openai/gpt-oss-120b` (Groq's recommended replacement) and pointed all
  five Groq call sites at it (chat, NL search, status translation,
  thinking phrases, icebreakers). CLAUDE.md Providers updated.
- **Pending (user):** manual quality check on a real Groq key; flip
  `GROQ_MODEL` to `qwen/qwen3.6-27b` if quality disappoints. Must be on
  main before 2026-08-16 (ideally before June 1 launch).

### v0.53 — 11 bug fixes ported from the private repo (BUGFIXES v0.53)
High: Gemini NL-search ReferenceError (undeclared `langNote`); manual book
lookup (`LANG_CODE_TO_NAME` typo + `thumb`/`cats`/`description` on
`buildBookFromGoogleItem` — restores metadata and the age gate); book-detail
XSS escaping; discover-mode leaks (no shelf save from discover chats,
`companionMode` reset on continue/new conversation); offline-queue rework
(offline sends are display-only `pending-offline` bubbles, queue drains on
companion open not just the `online` event, replies persisted).
Medium/Low: clippings progress-regression guard (double-bookKey lookup);
`byokActive()` helper so shared mode never bills a leftover BYOK key
(6 call sites); `revisiting` status label in all four UI maps; stale
Passages/Notes toolbar counts on continue/restore; transfer-code `SET NX`
collision retry (api/transfer.js); backup import restricted to `pc_` keys.

### v0.47–v0.52 — navigation + UI polish (merged to main)
- **Header nav** (v0.50–v0.52): on inner screens the tagline swaps for a
  right-aligned `← Back · Main · Find a book` row in the header — one full
  row of vertical space saved per screen. Home keeps the tagline;
  tc/onboarding/age-gate get a minimal header; first-run preferences hides
  the nav. On the companion screen ← Back triggers `endConversation()`
  (save + shelf). **End Chat stayed in the toolbar** (v0.52): after a long
  chat the header is a long scroll away on e-ink.
- **Shelf archiving** (v0.47): per-book Archive/Restore, collapsible
  "Archived (N)" section folded by default (`archived` flag on
  `pc_shelf_books` entries). Removed the redundant "New book" companion
  header button.
- **Wording/layout** (v0.48–v0.49): footer top border + header-matching
  brand text; "Support us"; search-screen hint; home pitch line moved into
  the description; "Search for a book"/"Search book" → "Find a book".

### v0.42–v0.46 (earlier, merged to main)
- v0.42: Kindle clippings import via Drive built then **hidden** (2024
  Kindle is MTP-only, not mountable on macOS). Code kept for re-enable.
- v0.43: confabulation rule calibrated (well-known frameworks stated with
  confidence; hedge only genuinely uncertain specifics); shelf nav links.
- v0.44: Anthropic model → `claude-sonnet-4-6` via `ANTHROPIC_MODEL`
  constant. v0.45–v0.46: unified screen-nav row (since superseded by the
  v0.50 header nav).

### Verification this session
- Browser smoke test (Chromium/Playwright, 28/28): first-run T&C, header
  nav swap, archive/restore persistence, ← Back-from-chat = End Chat,
  first-run nav hiding, zero console errors.
- Known low-severity items (deliberate, documented): shelf merge is
  local-wins per book so the `archived` flag doesn't propagate across
  devices via Drive sync; ← Back from an empty chat lands on shelf.
- From the v0.53 log, needs a product decision (not fixed): /api/ai has no
  per-IP rate limit or payload cap; `exportUserData` includes `pc_api_key`
  in plaintext backups; dead `STATIC_PROMPTS`/`DISCOVER_PROMPTS` tables;
  50 vs 60 pages/hr inconsistency; transfer.html `reset()` doesn't clear
  the key field.

### Open items / next
1. **Merge v0.53 + v0.54 to main** (Groq deadline 2026-08-16; launch June 1).
2. Manual Groq quality check on `openai/gpt-oss-120b`.
3. Kobo Libra Colour + Kindle device pass over v0.42–v0.54 (header nav,
   shelf archiving, offline queue rework especially).
4. Decide the four "not fixed" items above before launch.

---

## Previous session [v0.41]

Post-verification polish on branch `claude/brave-lovelace-vet1sn`.
All ES5/legacy-WebKit safe; app.transpiled.js rebuilt; `npm test` green.

- **bookKey() collision fixed** (was deferred in v0.39). `bookKey()` now keys
  on the FULL `title + '||' + author` instead of the first 40 chars, so
  long-titled series volumes no longer collide and silently merge their
  conversations/passages/status. Backward-compatible: any book whose
  `title||author` is ≤ 40 chars gets the *same* key as before (no change).
  - `bookKeyLegacy()` retained only for migration.
  - `migrateBookKeys()` runs once at init (guarded by `pc_bookkey_migrated_v1`),
    driven by the shelf + `pc_last_book` (the only places we hold full book
    objects). For long-titled books it moves `pc_status_`, `pc_lang_`,
    `pc_companion_lang_override_`, `pc_convs_`, `pc_passages_`, `pc_notes_`,
    `pc_progress_` from the legacy key to the new key. Caches
    (`pc_icebreakers_`, `pc_subjects_`) are left to regenerate.
  - Limitation: a book with stored data that is NOT in the shelf and NOT the
    last-opened book can't be migrated (its full title is unrecoverable from
    the key). Realistically everything with data is shelved.
- **One-row footer** (matches the ShortJo layout): brand "Page Commons" left,
  `Support · Privacy · Terms` right, in a single flexbox row. Applied to all
  in-app screen footers (index.html) and the standalone privacy/terms/support
  pages. E-ink-safe: `-webkit-box` prefixes, `space-between`, `flex-wrap`, no
  `gap:`. The injected "Preferences" link now sits inline in the right group
  (`updatePreferencesFooterLinks` targets `.sf-links`).
  - transfer.html keeps its own distinct utility-page footer (left as-is).
- **pending.md → ROADMAP.md**: renamed to resolve the case-only filename clash
  with PENDING.md (broke on case-insensitive macOS/Windows checkouts). Added a
  header clarifying it's the long-term V2/V3 roadmap and that PENDING.md /
  STATUS.md are the live docs. CLAUDE.md file list updated.
- **About page**: confirmed present and wired (`#screen-about`, reached via the
  home "New here?" link). No work needed — it was not abolished.
- **Headless test harness** (from the prior step, now extended): `npm test`
  boots the real index.html + app.transpiled.js in jsdom (build integrity +
  Kobo-syntax guard, DOM/navigation, pure logic incl. the new bookKey
  migration). 24 tests, all green. See test/README.md.

### Open items / next
- **Device test (Kobo Libra Colour + Kindle)** the footer flexbox row and the
  bookKey migration on real legacy WebKit — the one thing the headless harness
  can't cover.
- Consider an email contact on privacy/terms (currently GitHub issues).

## What was done last session [v0.40]

Soft-launch preparation on branch `claude/brave-lovelace-vet1sn`
(v0.40 round merged to main as it went). All ES5/legacy-WebKit safe.

- **Per-conversation Markdown sync**: syncToDrive() now also writes each
  saved conversation to the Drive `conversations/` folder as
  `YYYY-MM-DD-[Book].md` (numbered when a book has several), upserting by
  filename so re-syncs update rather than duplicate.
- **Book reload fix**: launchCompanion() now persists `pc_last_book` on all
  entry paths (was only set during search selection), so reloading
  `#companion` no longer restores a stale/different book.
- **Companion language**: the user's explicit choice now wins everywhere and
  defaults to English; auto-follow-the-book was removed (UI auto options
  gone). Icebreaker cache key includes the override; status screen translates
  to the effective language.
- **Soft-launch trim**: hid the Kindle clippings import (search screen + About
  card) behind display:none, keeping the markup/code. Added a **Sync** button
  to the chat toolbar (shown only when Drive connected; feedback mirrors into
  the toolbar). Connect/disconnect stays in Preferences.
- **Navigation**: End Chat → Shelf; "Change book" renamed "New book" → search;
  removed the duplicate Shelf toolbar button (Sync took its slot); title still
  → Library Hall.
- **Legal pages**: added standalone `privacy.html` + `terms.html` (styled like
  support.html), linked in every screen footer and on support/transfer pages,
  for Google Drive OAuth verification. Privacy page documents the `drive.file`
  scope, local-only storage, and Google API Limited Use compliance.
- **Privacy-policy refinements** (later in session, merged to main):
  - Book-search section now names **both** sources: Google Books API (primary,
    via the serverless proxy) and **Open Library** (openlibrary.org, called
    directly from the browser as a fallback — see `fetchOpenLibrary()` in
    app.js). Notes neither receives PII, only the query.
  - BYOK section now names the **specific models** so users can gauge cost:
    Claude Sonnet 4 (`claude-sonnet-4-20250514`), Gemini 2.5 Flash
    (`gemini-2.5-flash`), Llama 3.3 70B (`llama-3.3-70b-versatile`), each
    subject to that provider's pricing (Groq free tier vs per-token for
    Anthropic/Google). If these model IDs change in app.js, update privacy.html
    to match.
- **Docs**: added `STRATEGY.md` (product direction); added a VERSIONING RULE to
  CLAUDE.md (bump version on every code change).

### Production milestone — Google Drive sync live
- **Domain ownership verified** for `pagecommons.com` via a **DNS TXT record on
  Cloudflare** (the domain provider). This is a Domain-property style
  verification, so it covers all subdomains — nothing tracked in the repo
  (no HTML verification file/meta tag needed, and none should be added).
- privacy.html + terms.html are live in production and serve as the OAuth
  consent-screen privacy/terms URLs. Drive sync is out of testing.
- NOTE for future: if the OAuth consent screen ever needs re-verification, the
  proof lives in Cloudflare DNS, not here. Don't remove or expect a
  `google*.html` file in the repo root.

### Open items / next
- Consider whether the privacy/terms contact should be an email (currently
  GitHub issues) — Google reviewers sometimes prefer an email.
- Kobo/Kindle device test of the v0.40 changes still pending.

---

## Previous session [v0.39]

## What was done this session [v0.39]

A full code sanity check turned up 12 bugs plus minor issues; all were
fixed on branch `claude/brave-lovelace-vet1sn`. None required modern JS —
every fix is ES5/legacy-WebKit safe.

### Critical
- **Chat "Try again" lost the user's message** (app.js appendError retry
  handler): it popped the failed user turn from STATE.messages, but
  sendMessage(retryText) never re-pushes it, so the retry was sent with a
  dangling/empty history. Removed the erroneous pop.
- **AI-mode toggle was ignored** (callAI): routed on STATE.apiKey only, so a
  BYOK user who switched to the free shared pool kept spending their own key.
  Now: shared mode → free tier even when a key is saved.
- **Drive sync reported false success** (gdriveFindOrCreateFolder,
  gdriveFindDataFile, gdriveDownloadJson, gdriveUploadJson, export upload):
  none checked res.ok, so a failed upload still applied merged data locally,
  set last-synced, and showed "Synced successfully." A failed folder-create
  also cached `undefined` into pc_gdrive_folder_id, permanently breaking sync.
  Added a gdriveJson() helper that throws on !res.ok, and folder-id validation.
- **Build pipeline was broken/unused**: .babelrc used
  @babel/plugin-transform-runtime, which injects browser-fatal require()
  calls into app.transpiled.js; meanwhile index.html loaded raw app.js.
  Removed transform-runtime (helpers now inlined), regenerated
  app.transpiled.js (0 require() calls, verified), pointed index.html at
  app.transpiled.js, and added its vercel.json Content-Type/no-store headers.

### Moderate
- **Sync merge dropped per-book data** (mergeSyncPayloads): reading_state and
  preferences were replaced wholesale last-write-wins, so a status set on
  device A could be erased by a later unrelated change on device B. Now uses
  per-key union (new mergeFlatMaps helper); conflicting keys resolve by
  sync_meta timestamp. Verified with a Node harness.
- **Passages "Saved ✓" never showed**: used getPassages().includes(text) but
  passages are {text, ts} objects since v0.38. Now .some(p => p.text === text).
- **Global companion-language preference wiped**: opening/restoring a book set
  STATE.companionLangOverride to the per-book value or null, clobbering the
  pc_companion_lang preference. Now falls back to the global pref.
- **Offline queue stranded shared-pool users**: processOfflineQueue bailed on
  !STATE.apiKey and cleared the queue before sending. Rewritten (plain ES5
  promise chain) to include shared mode, keep items for other books, and only
  clear successfully-sent items.
- **/api/transfer GET had no rate limit**: added per-IP limit (30/hr) so the
  6-digit code space can't be scanned to steal an in-flight key.
- **Open CORS on quota/secret endpoints**: api/ai.js and api/gdrive-token.js
  were Access-Control-Allow-Origin: *. Now an origin allowlist (pagecommons.com
  + www), still allowing requests with no Origin header (e-reader browsers).
- **XSS via [RECOMMEND]**: formatText now escapes " too, and the onclick
  attribute interpolation escapes backslashes + quotes properly.
- **Kobo-unsafe APIs** (CLAUDE.md lists these as breakers): replaced all
  NodeList.forEach with indexed loops, new Set/Map + Array.from with
  plain-object maps, client-side URLSearchParams with hand-rolled
  buildQueryString/getQueryParam helpers, and scrollTo({behavior}) with
  scrollTo(x, y).

### Minor
- Fixed a latent ReferenceError in fetchGoogleBooksWithFallback (passed an
  undefined `lang`).
- init() OAuth detection now matches a real `code` param (not ?promocode=…).
- api/books.js validates/encodes maxResults & startIndex.
- Removed dead `(s==='home')?'block':'block'` ternary in showScreen.

### Deferred (needs your call)
- bookKey() keys on the first 40 chars of title||author, so long-title series
  volumes collide. NOT changed — altering it would orphan existing users'
  stored conversations/passages/status. Needs a migration plan.
- `pending.md` (lowercase) is NOT a duplicate of PENDING.md — it's a separate
  ~27-item long-term roadmap (V2/V3/V4). Left in place rather than deleted, but
  the case-only filename clash with PENDING.md will collide on case-insensitive
  checkouts (macOS/Windows). Decide: merge into PENDING.md, rename, or drop.

### Follow-ups found during preview testing
- **CORS allowlist blocked preview builds**: the v0.39 origin allowlist on
  /api/ai + /api/gdrive-token only permitted pagecommons.com, so the app's own
  *.vercel.app preview returned 403 ("Something went wrong: Forbidden") on the
  first companion message. Now allows same-origin requests (Origin host ==
  serving host) plus the production domains; third-party cross-origin still
  rejected. Confirmed working on the preview by the user.
- **Conversation export now offers .txt or .md**: the Export toolbar button
  opens a small panel (mirrors the Language panel) with "Plain text (.txt)" and
  "Markdown (.md)". The Kindle browser only downloads/opens .txt, so plain text
  lets readers keep the conversation as a readable document on the device;
  Markdown stays for desktop/note apps. exportConversation(format) builds either
  layout; new toggleExportPanel() wired into the panel mutual-exclusion set.

### Not done (your task)
- Kobo Libra Colour + Kindle device testing of all the above, especially the
  Kobo-compat API replacements, the new app.transpiled.js, and the new .txt
  export actually downloading + opening on a Kindle.

## What was done last session [v0.38]

### Google Drive sync (ported from ShortJo pattern) ✓

**Note on version number:** Spec said "bump to v0.30" but that would go
backwards from v0.37. Bumped to v0.38 to keep versions monotonic.

#### Part 1 — Passages storage migration ✓
- `pc_passages_<bookKey>` shape changed from flat string array to
  `[{text, ts}, ...]` (mirrors `pc_notes_*`).
- `getPassages()` normalises old flat-string format on read so existing
  users' data still works without a migration step.
- `savePassage()`, `renderPassagesPanel()`, `copyAllPassages()` all updated
  to use `p.text`. Dedup check updated from `passages.includes(text)` to
  `passages.some(function(p) { return p.text === text; })`.
- Import path needs no change — it stores raw JSON; `getPassages()` handles
  the format on the next read.

#### Part 2 — pc_sync_meta + touchSyncMeta ✓
- New `touchSyncMeta(category)` helper sets `pc_sync_meta[<category>_modified]`
  to `Date.now()`.
- Called from every write site of: pc_shelf_books, pc_font_size,
  pc_reply_length, pc_companion_name (both write paths), pc_user_name,
  pc_companion_lang, pc_provider, pc_ai_mode (3 write paths), pc_status_*,
  pc_progress_*, pc_lang_*, pc_companion_lang_override_*.
- Categories: `shelf`, `preferences`, `status`.

#### Part 3 — /api/gdrive-token.js ✓
- New serverless function. Handles both `authorization_code` (initial
  exchange) and `refresh_token` (re-auth). Server holds GDRIVE_CLIENT_SECRET.
- Returns Google's token response verbatim with original status code.

#### Part 4 — Client-side Drive functions ✓
- `GDRIVE_CLIENT_ID` constant at top of GDrive section (must be filled in
  with real client ID — currently empty string).
- `initGDriveAuth()` — same-tab redirect to Google OAuth (works on Kindle).
- `handleGDriveCallback()` — exchanges `?code=` for tokens, fetches user
  email, strips code from URL.
- `refreshGDriveToken()` — refreshes access token via /api/gdrive-token.
- `gdriveFetch()` — fetch wrapper with token refresh + single retry on 401.
- `getOrCreatePageCommonsFolder()`, `getOrCreateConversationsFolder()` —
  search/create folder helpers, cache IDs in localStorage.
- `syncToDrive()` — refresh token → find/create folder → find data file →
  merge or upload → apply merged to local → update last_synced timestamp.
- `exportConversationToDrive()` — uploads single conversation as .md to
  Page Commons/conversations/.

#### Part 5 — Sync payload structure ✓
```
{ schema_version, last_synced, sync_meta,
  conversations, notes, passages, shelf,
  preferences, reading_state }
```
- Explicitly excluded: pc_api_key, pc_tc_accepted, pc_preferences_set,
  pc_icebreakers_*, pc_subjects_*, pc_categories_*, pc_thinking_*,
  pc_status_opts_*, pc_gdrive_*, pc_offline_queue, pc_last_book.

#### Part 6 — Merge rules ✓
- Conversations: merge by `id`, keep newer `lastUpdated`.
- Notes: union by `ts`.
- Passages: union by `text`, keep earliest `ts` on text collision.
- Shelf: union by `title|author` composite key.
- Preferences: last-write-wins via `sync_meta.preferences_modified`.
- Reading state: last-write-wins via `sync_meta.status_modified`.
- sync_meta: per-category max.

#### Part 7 — Preferences screen UI ✓
- New "Google Drive sync" section added below "Your data" inside the
  More settings ▾ expand. Hidden on first-run.
- Not connected view: "Connect Google Drive" button.
- Connected view: email + last synced + Sync now + Disconnect buttons.
- Inline messages via #gdrive-msg (#cc0000 errors, #006600 success).

#### Part 8 — OAuth callback handling ✓
- `init()` checks `window.location.search` for `?code=` before any routing.
- If present, calls handleGDriveCallback() then runInitInner() then
  navigates to #preferences so the user sees the connected status.
- URL is stripped via `history.replaceState` before normal routing.

### ACTION REQUIRED before deploying
1. **Set `GDRIVE_CLIENT_ID`** at top of GDrive section in app.js with the
   real OAuth 2.0 Web Application client ID from Google Cloud Console.
2. **Set `GDRIVE_CLIENT_SECRET`** in Vercel env vars.
3. In Google Cloud Console OAuth client: add the production redirect URI
   (https://pagecommons.com/) to authorised redirect URIs.
4. Confirm Drive API is enabled in the Google Cloud project.

## What was done last session [v0.37]

### Shared-pool model: Groq → Gemini 3.1 Flash-Lite ✓
- api/ai.js rewritten to call Gemini 3.1 Flash-Lite (gemini-3.1-flash-lite)
  instead of Groq llama-3.3-70b-versatile.
- Uses existing GEMINI_API_KEY Vercel env var (no new secret needed).
- 500 RPD free-tier quota — 25× more than Gemini 2.5 Flash (20 RPD); enough
  for launch.
- Gemma 4 26B was tested but rejected: its chain-of-thought thinking leaked
  into response output (system prompt + reasoning visible to users). Gemma
  on AI Studio does not support systemInstruction so the system prompt must
  be inlined into the user turn, which triggers the thinking bleed.
  Gemini 3.1 Flash-Lite supports systemInstruction natively and suppresses
  thinking via thinkingConfig.thinkingBudget: 0.
- jsonMode maps to generationConfig.responseMimeType: "application/json".
- 429 returns rate_limited → existing frontend message unchanged.
- ACTION REQUIRED: ensure GEMINI_API_KEY is set in Vercel env.
  GROQ_API_KEY(S) no longer used.

## What was done last session [v0.36]

### Shared-pool quality — prompt + expectations ✓
- Reading-mode system prompt: forbids the "I don't know, here's a different
  book" escape pattern. Strengthened the honesty paragraph to explicitly
  call out plot/characters/themes/author's arguments, and added a CRITICAL
  rule to stay on the current book and use what the reader shares.
- Rewrote the [RECOMMEND: ...] paragraph: only when the reader explicitly
  asks for a recommendation. Never as a deflection when unsure of the
  current book.
- Onboarding "Choose your companion" screen: more honest copy on both
  options. Shared = "Best for well-known books in English. May not know
  recent or niche titles in depth — works best when you share what you
  remember as you go." BYOK = "Stronger knowledge across more titles and
  languages." Also fixed the "change this in Settings" line to say
  "Preferences" (renamed in v0.33).
- Preferences AI-mode note for shared users: mirrors the same honesty
  ("Best for well-known books in English; weaker on recent, niche, or
  non-English titles").
- No model change; still Groq llama-3.3-70b-versatile in api/ai.js.

## What was done last session [v0.35]

### Home footer cleanup ✓
- Removed the duplicate "Preferences" link from the hall-footer (already
  reachable via the persistent footer link on every screen).
- Removed the "API key settings" link — API key now lives only inside
  Preferences → More settings → API key & provider (shown when BYOK is
  selected). One canonical place.
- Kept the "No ads. No algorithms. No engagement metrics. Just books."
  values line. Dropped the now-unused .hall-footer-links CSS.

### Flagged for later [no code change]
- Shared-pool (Groq llama-3.3-70b) response quality is noticeably weak on
  non-blockbuster books — model admits "not familiar" then pivots to
  unrelated recommendations. Tracked in PENDING.md with options for when
  we revisit (route to a stronger model, prompt-side grounding, or
  explicit expectation-setting on the free-tier choice screen).

## What was done last session [v0.34]

### First-run polish ✓
- "Your data" (Export / Import) section is now hidden during first-run —
  nothing to back up yet on a fresh install.
- Footer support line (Preferences → / Support it →) is now left-aligned,
  matching the rest of the app's layout. Same change applied to support.html.

### Chat toolbar slim-down ✓
- Removed "Aa" (text size) and "More" (reply length) buttons — both
  duplicated controls now in Preferences. With the persistent
  "Preferences →" footer link, users have one consistent place to tune
  these, and they're rarely changed mid-chat.
- Kept Notes, Language (per-book override is contextual, not a global
  preference), Shelf, Done, plus the conditional Highlights/Passages.
- "Export conversation" moved from the deleted length-panel into the
  Notes panel (the closest semantic home).
- Removed orphan toggleFontPanel / toggleLengthPanel functions and all
  sibling-deactivation references to the removed buttons/panels (would
  otherwise crash when Notes/Highlights/Passages tried to deactivate
  vanished buttons). Dropped the dead #font-panel / #length-panel CSS.

## What was done last session [v0.33]

### Renamed Settings → Preferences ✓
- #settings screen renamed to #preferences (id, function names, navigate calls,
  SCREENS, BACK_FALLBACK, home-page footer link). "Preferences" reads less
  engineering-y than "Settings".

### Preferences screen reorganised ✓
- Visible by default: Your name, Companion name, Companion language, Default
  reply length, Text size.
- "More settings ▾" collapsible expand below reveals: AI companion mode toggle,
  API key & provider (only when BYOK is selected via updateAIModeUI), Your data
  (export/import). Collapsed by default each time the screen opens.

### First-run preferences ✓
- pc_preferences_set localStorage flag drives first-run mode.
- First-run: no back link, intro line shown, big "Save & continue" button at
  the bottom. After tap, sets the flag and routes to #search.
- Returning users: back link shown, intro and Save button hidden — changes
  auto-save on input as before.
- Existing users with any prior config (api key, name, font size, etc.) are
  migrated to "first-run complete" silently on app init.

### First-run flow ✓
- T&C → onboarding (AI mode) → (BYOK only) #key → #preferences → #search
- chooseAIMode('shared') routes to #preferences on first run, #home after
- chooseAIMode('byok') routes to #key (which then routes to #preferences on
  first run, or #search after)

### Persistent Preferences footer link ✓
- updatePreferencesFooterLinks() injects a "Preferences →" link into every
  .screen-support-footer on every screen change.
- Hidden on first-run-flow screens (tc, onboarding, key, preferences itself)
  and until first-run is complete.

### Bug fixes ✓
- Home "Talk to your companion" button was hard-wired to navigate('key') —
  shared-pool users got the key screen. Now navigates to #search and lets
  handleRoute() apply the gate.
- Removed the "Give your companion a name" field from #screen-key — companion
  name now lives only in Preferences. saveKey() no longer touches it.

## What was done last session [v0.32]

### V1 scope trim ✓
- Removed Surprise Me feature entirely
  - app.js: STATE.surprise* fields, 'surprise' from SCREENS and BACK_FALLBACK,
    handleRoute initSurpriseScreen call, LANG_PROMPT_MAP, initSurpriseScreen,
    startSurpriseMe, selectSurpriseGenre, selectSurpriseLanguage,
    surpriseParseError, displaySurpriseResult, surpriseDiscover, surpriseSelect,
    surpriseNotForMe, tryAnotherBook, and the now-unused callGroqJSON helper
  - index.html: "Surprise me →" button on search, "Surprise me again" button in
    discover-convert-bar, and the entire #screen-surprise section
  - LANG_NAME_TO_CODE / LANG_CODE_TO_NAME / buildBookFromGoogleItem kept — still
    used by manual entry and other flows
- Removed Kobo highlights import (kept Kindle import)
  - app.js: KOBO HIGHLIGHTS IMPORT block (SQL_JS_CDN/SQL_WASM_CDN, loadSqlJs,
    parseKoboDatabase, processKoboHighlights), Kobo source label in the
    highlights panel (now always "Kindle")
  - index.html: "Or import from Kobo" section under search
  - Renamed the generic init-error div from kobo-init-error to pc-init-error
- Rationale: Surprise Me had quality issues with non-English recommendations and
  duplicated the existing search flow. Kobo import not yet tested by the user;
  drop it for V1 to reduce surface area, can return in a later release.

## What was done last session [v0.31]

### Onboarding Flow & AI-Mode System ✓
- New `#onboarding` screen shown after T&C accept for first-time users
  (returning users with pc_ai_mode already set skip it and go straight to handleRoute)
- Two choices: "Use free shared companion" (→ home) / "Use my own API key" (→ #key)
- `chooseAIMode(mode)` saves `pc_ai_mode` to localStorage and routes accordingly
- Existing users who already have a key migrated to `pc_ai_mode = 'byok'` silently
- Navigation gates relaxed: `!STATE.apiKey && STATE.aiMode !== 'shared'` — shared-mode
  users reach #search and #companion without a key; callAI() already falls through to
  callFreeTier() when no apiKey is set
- Settings: new "AI companion" section with Free shared pool / My own key toggle
  (`switchAIMode()`, `updateAIModeUI()`); label renamed "AI provider" → "API key & provider"
- `saveKey()` also sets `pc_ai_mode = 'byok'` so key entry always implies BYOK mode

### Surprise Me fixes (from previous session) ✓
- Error message no longer names underlying model or blames free-pool users
- "Surprise me anyway" grammar fix (anyGenre flag → "book of any genre")
- JSON mode + strict validation on Surprise Me suggestions
- Groq tip shown only for BYOK Groq + non-English (not to free-pool users)

## What was done last session [v0.30]

### Icebreaker quality + reliability ✓
- Hardened the icebreaker parser (parseIcebreakerList): tolerates markdown
  fences, smart quotes, surrounding prose, and numbered/bulleted/quoted lists
- Enforce the target language inside the user prompt (not just
  system/systemInstruction) so Gemini stops defaulting to English on
  non-English books
- Gemini icebreaker call requests responseMimeType application/json for
  reliable parseable output
- Made the static fallback language-aware (English + Traditional/Simplified
  Chinese, Japanese, Korean) so a non-English book never shows English prompts
- Genre-aware prompt: classify fiction vs non-fiction; non-fiction focuses on
  argument/ideas, never "characters/plot" (fixes Das Kapital-style misfires)
- Reworded icebreakers into first-person reader voice (the reader's own
  opening messages), since tapping one fills the chat box and is sent as the
  reader's message — interviewer-voice prompts were backwards

### AI model changes ✓
- BYOK Gemini upgraded gemini-2.0-flash → gemini-2.5-flash (all 5 call sites),
  with thinkingConfig.thinkingBudget = 0 so thinking tokens don't consume the
  maxOutputTokens caps (avoids truncated/empty JSON + chat replies)
- Free shared pool (api/ai.js) switched from Gemini to Groq
  (llama-3.3-70b-versatile) with multi-key support (GROQ_API_KEYS and/or
  GROQ_API_KEY_1..5), random key pick + failover on rate-limit
  - ACTION REQUIRED: set GROQ_API_KEY(S) in Vercel env or the free tier 503s.
    GEMINI_API_KEY is no longer used by the free pool.
  - NOTE: stacking multiple free Groq keys to dodge rate limits likely
    violates Groq ToS — prefer one paid key.

### Navigation & UX polish ✓
- Unified back navigation: a back stack maintained in showScreen() with a
  goBack() helper + per-screen fallbacks; every back link routes through
  goBack(); added missing back links to status and language screens
- Reading-status screen: removed the redundant "considering" option (still
  offered via "Find out if it's for me")
- Renamed book-detail "I'm reading this" → "I have this book"
- Surprise Me: "Try another book" → "Surprise me again" (disambiguates from
  header "Change book")
- Added a 1–2 sentence app intro under "Welcome to Page Commons"
- Removed the self-referential "Support it →" footer link from support.html
- Removed misleading "Get free key" links from the API provider buttons

### Architecture discussion (no code) — open decision
- Debated SPA vs MPA, e-ink vs mobile, and PWA→Capacitor. Conclusion: don't
  migrate pre-launch; the big framework/backend decision belongs at V2 (which
  needs a server + accounts anyway). See chat history. Tiered privacy model
  (BYOK local-first; opt-in minimal data for social) resolves the earlier
  privacy-vs-roadmap tension.

## Previous session

### Data Export / Import (localStorage backup) ✓ [v0.29]
- New "Your data" section on #settings screen (below Text size)
- Explanation line: "Back up your Page Commons data or restore it on another device."
- Two full-width .btn buttons, stacked, 48px min height (≥44px tap target)
- Export: collects all localStorage keys starting with `pc_`, builds JSON
  { exported_at, version, data: {...} }, triggers client-side download via
  temporary anchor + Blob URL, file named `pagecommons-backup-YYYY-MM-DD.json`
- Import: hidden file input (accept .json), triggered by visible button;
  FileReader → JSON.parse → validates presence of `data` object
- Invalid file shows inline red error "This doesn't look like a Page Commons
  backup file." (no alert)
- Valid import merges into localStorage (overwrites conflicts, keeps other
  keys), shows inline green "Data restored. Reload the page to see your shelf
  and settings." — no auto reload
- All messages inline below button: #cc0000 errors, #006600 success, auto-hide
  after 5s. No alert()/confirm() anywhere.
- Entirely client-side (FileReader + Blob, no libraries, no server)
- ES5-safe; transpiled to app.transpiled.js (IE 11 target)
- Logic verified in Node harness (export key filtering, metadata, filename,
  import validation, merge/overwrite behaviour, error/success messaging)

### Build note
- app.transpiled.js regenerated with:
  npx babel app.js -o app.transpiled.js \
    --plugins @babel/plugin-transform-regenerator,@babel/plugin-transform-member-expression-literals,@babel/plugin-transform-property-literals,@babel/plugin-transform-reserved-words \
    --presets @babel/preset-env
  (reproduces prior committed output style: "use strict" + bracket reserved words)

## Previous session

### Icebreaker Prompt Regression Fix ✓
- Root cause: Race condition in selectBook() — fetchAndCacheSubjects was async fire-and-forget
- populateIcebreakers ran immediately after, before subjects were cached from OpenLibrary
- fetchAIIcebreakers received no book subjects, generated generic prompts instead
- Fixed by: Making fetchAndCacheSubjects return Promise, awaiting it in selectBook before launchCompanion
- Result: Book subjects now cached before icebreakers generated; AI gets genre/theme context
- Prompts now specific to each book (e.g., finance-focused for business books like Rich Dad Poor Dad)

### Support Page (support.html) ✓ [from v0.28]
- Standalone page, no new dependencies, same CSS foundations as index.html
- Full-width CTA button: Ko-fi (one-time tip)
  (an affiliate button also shipped in v0.28; removed in v0.56 —
  the public repo is non-commercial)
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
1. Set GROQ_API_KEY(S) in Vercel env (free pool now uses Groq, not Gemini)
2. Review v0.30 on desktop, then device:
   - Back button on every screen returns to the correct previous screen
   - Status screen no longer shows "considering"; "I have this book" label
   - Icebreakers in first-person reader voice, correct language, genre-aware
   - BYOK Gemini 2.5-flash quality; free pool (Groq) responds once key is set
3. Onboarding Flow & AI-Mode System (the one big remaining Priority-1 item):
   intro screen + BYOK vs shared choice, providers.html, pc_ai_mode, relax the
   apiKey gate, Settings top-level toggle, persistent footer→Settings link
4. Kindle + Kobo device testing
5. Reddit launch post preparation

## Last Confirmed Working on Device
↳ Kobo Libra Colour: v0.25 ✓ (baseline — many features added since)
↳ Desktop: v0.29 ✓ (v0.30 changes verified via syntax checks only; not yet
  exercised in a browser this session)
↳ Kindle: not yet tested

## Broken / Do Not Touch
↳ Nothing currently broken
