<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Product docs

The product is specified in the `docs/` folder. **Read these before planning or
building any feature** — they are the source of truth for scope and behavior:

- [`docs/PRD.md`](docs/PRD.md) — product requirements: problem, personas, core
  flow, functional specs (6.1–6.6), the chance-calculation model, and release plan.
- [`docs/requirements.md`](docs/requirements.md) — the numbered requirements
  (FR/NFR/TC/BC), user stories, acceptance criteria, and scope boundaries.

Trace any feature work back to a requirement ID (`FR-*`, `NFR-*`, `TC-*`, `BC-*`).
If the docs and a request conflict, surface the conflict instead of guessing.

# Current state

Maintain [`docs/current-state.md`](docs/current-state.md) as a running handoff
log. **Update it at the end of every work session** so the next agent (or human)
can pick up without re-deriving context.

- Read it first at the start of a session to understand what was done last time.
- Each entry records: an ISO 8601 timestamp of the action, what was done, which
  files/requirements were touched, the current status (done / in progress /
  blocked), and any next steps or open questions.
- Append newest-first; keep entries concise. Create the file if it does not exist.

# Design system

Prokhidnyi ships with a real, dependency-free design system. **Read `DESIGN.md`
before building or changing any UI** — it explains the tokens, typography,
traffic-light chance semantics, component classes, and the rules for using them.

- Source of truth: the CSS in `docs/design-system/` (`tokens.css` → `typography.css` → `base.css` → `components.css`, load in that order). `index.html` is a live gallery.
- Use the `--pk-*` tokens and `.pk-*` component classes; never hardcode a color, size, radius, or shadow a token already covers.
- Keep the traffic-light code (green = safe, amber = realistic, red = reach) for chance; blue (`--pk-action`) is for interactive actions only.
- Fonts: Unbounded for headings/numerals, Manrope for everything else.
