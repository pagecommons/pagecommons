# Headless test harness

Run everything:

```
npm install   # once, pulls in jsdom (dev-only)
npm test
```

This boots the **real** production files (`index.html` + `app.transpiled.js`)
headlessly in jsdom — the same code Vercel serves to a Kobo/Kindle — with
`localStorage` seeded and `fetch` stubbed. No network, no browser, no real API
keys. Exit code is non-zero if anything fails, so it drops straight into CI.

## What each layer covers

- **`build.test.js`** — the deploy safety net (no browser needed):
  - `app.transpiled.js` is valid JS and contains **zero `require(`** calls.
  - `app.transpiled.js` is **in sync** with `app.js` — re-running Babel must
    produce identical output, catching "edited the source but forgot to
    rebuild".
  - `index.html` loads `app.transpiled.js`, never the raw `app.js`.
  - No Kobo-fatal modern syntax (arrow fns, `const`/`let`, `?.`, `??`,
    `for…of`, `NodeList.forEach`, `new Set`/`Map`, `URLSearchParams(`,
    `scrollTo({…})`) survives into the shipped bundle.
  - The `index.html` version tagline matches `CLAUDE.md`'s Current Version
    (the VERSIONING RULE).

- **`dom.test.js`** — boots the app and drives it like a user: first-run T&C
  gate, returning user → home, single-visible-screen invariant, hash
  navigation, the BYOK-key gate vs the shared-pool path, the no-book
  `#companion → #search` redirect, footer privacy/terms links, and the
  "End Chat" toolbar label.

- **`logic.test.js`** — pure functions that can silently corrupt data or open
  an XSS hole, which a visual test would miss: `getQueryParam` (the OAuth
  `?code=` vs `?promocode=` trap), `bookKey` determinism, `formatText` HTML
  escaping (incl. `"`), `detectLanguage`, and `mergeSyncPayloads` two-device
  union semantics (no book/preference dropped, timestamp conflict resolution).

## Helper

`helpers/boot.js` exposes `boot({ seed, hash, search })`, returning handles:
`window`, `document`, `localStorage`, `fetch` (with `.on(urlSubstr, resp)` to
register responses), `fetchCalls`, `errors`, `initError()`, `activeScreen()`,
`go(view)` (navigate + settle redirects), and `flush()`.

> Note: this harness is a headless smoke/regression net. It does **not** replace
> real Kobo Libra Colour / Kindle device testing — legacy WebKit quirks (CSS
> rendering, actual download/open behaviour) can only be confirmed on hardware.
