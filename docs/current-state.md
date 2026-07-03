# Current state

Running handoff log. Newest entry first. Each entry: ISO 8601 timestamp, what was
done, files/requirements touched, status, and next steps / open questions.

> Convention defined in [`AGENTS.md`](../AGENTS.md) → "Current state": read this
> file at the start of every work session and update it at the end. Applies to
> both AI agents and human contributors.

---

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
