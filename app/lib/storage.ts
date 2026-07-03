/**
 * Client-side persistence (state-persistence capability).
 *
 * TC-STORAGE-01: `localStorage` only, no backend. NFR-PRIV-01 / BC-PRIVACY-01:
 * sensitive scores/benefits never leave the device and no analytics touch them.
 *
 * SSR-safe (guards `window`), versioned key, and corruption-tolerant: a missing
 * or unparseable payload yields `null` so callers fall back to fresh defaults
 * rather than crashing.
 */
import type {
  ApplicationStatus,
  Benefits,
  ElectiveSubject,
  Scores,
} from "@/app/lib/types";

/** Versioned key — bump the suffix on a breaking shape change. */
const STORAGE_KEY = "prokhidnyi.v1";

/** One saved program: its application status and shortlist priority. */
export interface SavedEntry {
  status: ApplicationStatus;
  priority: number;
}

/** The full persisted profile (FR-STATE-01). */
export interface PersistedState {
  scores: Scores;
  benefits: Benefits;
  elective: ElectiveSubject;
  fields: string[];
  cities: string[];
  saved: Record<string, SavedEntry>;
  compare: string[];
}

/** True only in a browser with a working `localStorage`. */
function hasStorage(): boolean {
  return typeof window !== "undefined" && !!window.localStorage;
}

/** Load persisted state, or `null` if absent/corrupt (fresh-start fallback). */
export function loadState(): Partial<PersistedState> | null {
  if (!hasStorage()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : null;
  } catch {
    return null;
  }
}

/** Persist state. Silently no-ops when storage is unavailable or throws. */
export function saveState(state: PersistedState): void {
  if (!hasStorage()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota / private-mode — non-fatal, the app keeps working in-memory */
  }
}

/** Remove all persisted state (fresh start). */
export function clearState(): void {
  if (!hasStorage()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* non-fatal */
  }
}

/** Re-exported so consumers can type against the storage shapes directly. */
export type { Benefits, Scores };
