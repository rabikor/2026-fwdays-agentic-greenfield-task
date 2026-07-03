<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Design system

Prokhidnyi ships with a real, dependency-free design system. **Read `DESIGN.md`
before building or changing any UI** — it explains the tokens, typography,
traffic-light chance semantics, component classes, and the rules for using them.

- Source of truth: the CSS in `docs/design-system/` (`tokens.css` → `typography.css` → `base.css` → `components.css`, load in that order). `index.html` is a live gallery.
- Use the `--pk-*` tokens and `.pk-*` component classes; never hardcode a color, size, radius, or shadow a token already covers.
- Keep the traffic-light code (green = safe, amber = realistic, red = reach) for chance; blue (`--pk-action`) is for interactive actions only.
- Fonts: Unbounded for headings/numerals, Manrope for everything else.
