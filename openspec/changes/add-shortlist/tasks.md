## 1. Persistence and status domain

- [ ] 1.1 Confirm `app/lib/storage.ts` persists `saved: Record<id, SavedEntry>` (status + priority) under the versioned key and tolerates missing/corrupt payloads
- [ ] 1.2 Confirm `app/lib/status.ts` defines `STATUSES` in order (Збережено → Подано → Розглядається → Рекомендовано → Зараховано), `STATUS_MODIFIER` for `.pk-status--*`, and `nextStatus` cycling back to the first
- [ ] 1.3 Confirm the profile store exposes `toggleSave` (adds with status "Збережено", removes when present) and `advanceStatus` (applies `nextStatus`)

## 2. Saved-list view

- [ ] 2.1 Build `app/components/planner/SavedList.tsx` reading `profile.saved` and resolving each id to its program via `getProgram`
- [ ] 2.2 Render one row per saved item: university/specialty/city + a clickable status badge using `.pk-status--{modifier}` with the Ukrainian status label
- [ ] 2.3 Wire the status badge click to `advanceStatus(id)` and the ★ control to `toggleSave(id)`
- [ ] 2.4 Add a caption explaining the click-to-advance progression (Збережено → … → Зараховано)

## 3. Accessibility

- [ ] 3.1 Ensure the status badge shows its stage text label (not color-only) per NFR-A11Y-01
- [ ] 3.2 Ensure the status control is a real button with an accessible name and a ≥ 44px hit area

## 4. Empty state

- [ ] 4.1 Render a `.pk-empty` state when `saved` is empty, hinting to save options with the ★ button and track statuses here
- [ ] 4.2 Verify removing the last saved item returns to the empty state

## 5. Tests

- [ ] 5.1 Unit test: `nextStatus` advances through all five stages and cycles Зараховано → Збережено
- [ ] 5.2 Unit test: `toggleSave` adds with status "Збережено" and removes on re-toggle; `advanceStatus` on an unsaved id is a no-op
- [ ] 5.3 Unit test: `loadState` returns null for missing/corrupt storage so the store falls back to defaults
- [ ] 5.4 Component test: saved rows render with status badges; clicking a badge advances the label; the empty state shows when nothing is saved

## 6. Validation, docs, and archive prep

- [ ] 6.1 Run lint (`npm run lint`) and fix issues in touched files
- [ ] 6.2 Run unit + component tests and confirm the new tests pass
- [ ] 6.3 Run `next build` and confirm it succeeds with no type errors
- [ ] 6.4 Run `openspec validate add-shortlist --strict` and confirm it passes
- [ ] 6.5 Run `openspec validate --all --strict` and confirm the whole spec set still passes
- [ ] 6.6 Update `README` (if capability list is documented there) and append a `docs/current-state.md` entry for the shortlist slice
- [ ] 6.7 Manual real-storage smoke test: save 2–3 programs with ★; advance one status a few clicks and confirm it cycles Зараховано → Збережено; reload the page (real localStorage) and confirm the same programs and their last statuses are restored; remove all items and confirm the empty-list hint pointing at the ★ button appears; clear localStorage and confirm a clean default (no crash)
- [ ] 6.8 Run `npx openspec archive add-shortlist --yes` only after the smoke test in 6.7 passes
