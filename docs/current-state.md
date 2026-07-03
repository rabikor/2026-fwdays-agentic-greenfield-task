# Current state

Running handoff log. Newest entry first. Each entry: ISO 8601 timestamp, what was
done, files/requirements touched, status, and next steps / open questions.

> Convention defined in [`AGENTS.md`](../AGENTS.md) → "Current state": read this
> file at the start of every work session and update it at the end. Applies to
> both AI agents and human contributors.

---

## 2026-07-03T00:00:00Z — Implemented `app-shell` capability (Wave 0)

- **Done:** Authored and applied OpenSpec change `add-app-shell` (proposal + spec +
  design + 26 tasks). Built the responsive Ukrainian Next.js 16 shell every UI slice
  inherits: `<html lang="uk">`, Ukrainian metadata; **removed Tailwind** (deps,
  `postcss.config.mjs`, `globals.css` `@import`/`@theme`) per `TC-STACK-01`; vendored
  the design system into `app/styles/` (`tokens → typography → base → components → shell`,
  imported in order via `app/globals.css`); loaded Unbounded + Manrope via `next/font`
  (self-hosted, cyrillic subset) and bound them to `--pk-font-display`/`--pk-font-text`;
  added `app/lib/format.ts` (`uk-UA` number/percent/date helpers, `54 %`-style percent);
  built the frame (Header/nav, DeadlineBanner, Disclaimer) with global honesty +
  deadline surfaces on every route; replaced `app/page.tsx` with a design-system demo.
- **Verified:** `next build` green (TS clean); served HTML has `lang="uk"`, Ukrainian
  title, disclaimer, deadline banner, `54 %`; no `fonts.googleapis.com` request (fonts
  self-hosted as `.woff2`); `--pk-*` tokens + `--font-unbounded` binding present in
  built CSS; `openspec validate add-app-shell --strict` passes.
- **Files touched:** `app/layout.tsx`, `app/page.tsx`, `app/globals.css`,
  `app/styles/{tokens,typography,base,components,shell}.css`, `app/lib/format.ts`,
  `app/components/{Header,DeadlineBanner,Disclaimer}.tsx`, `package.json`,
  `postcss.config.mjs` (deleted); `openspec/changes/add-app-shell/*`.
- **Requirements:** NFR-RESP-01, NFR-A11Y-01, BC-LANG-01, TC-STACK-01, TC-PLATFORM-01,
  BC-DEADLINE-01 (passive), BC-HONESTY-01 (passive disclaimer).
- **Status:** done (tasks 26/26). Synced + archived: delta promoted to
  `openspec/specs/app-shell/spec.md` (baseline, 7 requirements, strict-valid); change
  moved to `openspec/changes/archive/2026-07-03-add-app-shell/`. No active changes remain.
- **Next steps:** Proceed to the other Wave 0 capability
  `program-data`, followed by Wave 1 (`scoring-engine`, `state-persistence`,
  `score-input`). Deadline banner + disclaimer copy are static placeholders; finalize
  wording against `docs/PRD.md` when feature content lands. Manual desktop→phone resize
  was validated via CSS/build only (no headless browser in this session).

## 2026-07-03T00:00:00Z — Split requirements into OpenSpec capabilities

- **Done:** Decomposed `docs/requirements.md` into 10 MVP capabilities + 3
  deferred (Phase 3) ones. Created `docs/capabilities.md` (index: capability →
  requirement-ID mapping, dependency graph, wave-based build order) and one
  detail file per capability under `docs/capabilities/`. Each traces back to
  `FR/NFR/TC/BC` IDs. OpenSpec (`openspec/`) is still empty — no specs/changes
  authored yet.
- **Files touched:** `docs/capabilities.md`, `docs/capabilities/*.md` (11 files,
  committed as `c40ba50`); this log.
- **Requirements:** all FR-* plus NFR-PERF/RESP/A11Y/PRIV/SYNC, TC-*, BC-* mapped.
- **Status:** done.
- **Next steps:** Generate OpenSpec change proposals via `/openspec-propose`,
  starting with Wave 0 (`program-data`, `app-shell`), one change at a time.
  App is still at the Next.js scaffold stage (bare `app/`); the `shipped`
  statuses in requirements.md describe the HTML prototype, not this app.

## 2026-07-03T00:00:00Z — Added product-docs and current-state rules to AGENTS.md

- **Done:** Added a "Product docs" section pointing agents to `docs/PRD.md` and
  `docs/requirements.md`, and a "Current state" section requiring this handoff log
  to be read at session start and updated at session end.
- **Files touched:** `AGENTS.md`, `docs/current-state.md` (created).
- **Status:** done.
- **Next steps:** Begin feature work against the requirements in `docs/`; app is
  still at the Next.js scaffold stage.
