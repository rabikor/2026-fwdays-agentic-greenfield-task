/**
 * Recommendation selectors — pure glue between `scoring-engine` and the UI
 * (recommendations, filtering, comparison, program-detail).
 *
 * No React, no storage: given a profile, produce scored + filtered + sorted
 * programs and the derived text (advice, score breakdown) the views render.
 */
import { PROGRAMS } from "@/app/lib/programs";
import {
  CATEGORY_LABEL,
  benefitBonus,
  categoryOf,
  evaluate,
  rawScore,
  type Evaluation,
} from "@/app/lib/scoring";
import { REQUIRED_SUBJECTS } from "@/app/lib/types";
import type {
  Benefits,
  Category,
  ElectiveSubject,
  Program,
  Scores,
} from "@/app/lib/types";

/** A program paired with its evaluation for the current profile. */
export interface ScoredProgram {
  program: Program;
  evaluation: Evaluation;
}

/** The inputs the selectors need (a subset of the persisted profile). */
export interface Profile {
  scores: Scores;
  benefits: Benefits;
  elective: ElectiveSubject;
  fields: string[];
  cities: string[];
}

/** Risk-category filter values used by the tabs (FR-FILTER-02). */
export type CategoryFilter = "all" | Category;

/**
 * Score every program for this profile, apply the field/city filters
 * (FR-FILTER-01), and sort. Fitting programs come first (highest chance
 * first); programs that don't accept the chosen elective sink to the bottom.
 */
export function selectPrograms(profile: Profile): ScoredProgram[] {
  const { fields, cities } = profile;
  return PROGRAMS.filter(
    (p) =>
      (fields.length === 0 || fields.includes(p.field)) &&
      (cities.length === 0 || cities.includes(p.city)),
  )
    .map((program) => ({
      program,
      evaluation: evaluate(program, profile.scores, profile.benefits, profile.elective),
    }))
    .sort((a, b) => {
      // Non-fitting programs always rank last, regardless of raw chance.
      const af = a.evaluation.fits ? a.evaluation.chance : -1;
      const bf = b.evaluation.fits ? b.evaluation.chance : -1;
      return bf - af;
    });
}

/** Predicate for the risk-category tabs; only fitting programs are categorized. */
export function matchesCategory(
  scored: ScoredProgram,
  filter: CategoryFilter,
): boolean {
  if (!scored.evaluation.fits) return filter === "all";
  if (filter === "all") return true;
  return scored.evaluation.category === filter;
}

/** How many programs accept the chosen elective (the "matches" count). */
export function fittingCount(list: ScoredProgram[]): number {
  return list.filter((s) => s.evaluation.fits).length;
}

/** Average of the four NMT scores (profile headline metric). */
export function averageScore(scores: Scores): number {
  return (scores.ukr + scores.math + scores.hist + scores.eng) / 4;
}

/** One line of the competitive-score breakdown (program-detail, FR-DETAIL-01). */
export interface BreakdownRow {
  label: string;
  value: number;
}

/**
 * Per-subject contributions + benefit line for the detail view.
 * Each row is `subject × weight → contribution`; the benefit row (if any) is
 * the additive bonus applied to the raw score.
 */
export function scoreBreakdown(
  program: Program,
  scores: Scores,
  benefits: Benefits,
  elective: ElectiveSubject,
): BreakdownRow[] {
  const rows: BreakdownRow[] = [];
  (["ukr", "eng", "hist", "math"] as const).forEach((key) => {
    const weight = program.coeff[key];
    if (!weight) return;
    const label = key === "eng" ? elective : REQUIRED_SUBJECTS[key];
    rows.push({ label: `${label} ×${weight}`, value: scores[key] * weight });
  });
  const bonus = benefitBonus(benefits);
  if (bonus > 0) {
    rows.push({
      label: `Пільга ×${(1 + bonus).toFixed(2)}`,
      value: rawScore(program, scores) * bonus,
    });
  }
  return rows;
}

/**
 * Category-appropriate advice for the detail view (§6 recommendations),
 * folding in the band and the number of state-funded seats for honesty/context.
 */
export function adviceFor(program: Program, evaluation: Evaluation): string {
  const { chance, band } = evaluation;
  const base =
    chance >= 75
      ? "Надійний вибір. Постав як запасний пріоритет, щоб точно вступити."
      : chance >= 40
        ? "Реально вступити. Подавай у пріоритеті 1–2."
        : "Складно, але спробувати варто одним із пріоритетів — раптом конкурс просяде.";
  return (
    `${base} Діапазон з урахуванням коливань прохідного: ` +
    `${band[0]}–${band[1]} %. Бюджетних місць: ${program.budgetSeats}.`
  );
}

/**
 * Text recommendation across compared programs (FR-COMPARE-01): the highest
 * chance among the selected options, framed as priority 1.
 */
export function compareAdvice(scored: ScoredProgram[]): string {
  if (scored.length < 2) return "";
  const best = [...scored].sort(
    (a, b) => b.evaluation.chance - a.evaluation.chance,
  )[0];
  return (
    `${best.program.uni} (${best.program.spec}) — найвищий шанс серед обраних ` +
    `(${best.evaluation.chance} %). Розглянь як пріоритет 1.`
  );
}

/** The Ukrainian label for a fitting program's category, or the not-fitting note. */
export function categoryLabel(evaluation: Evaluation): string {
  return evaluation.fits
    ? CATEGORY_LABEL[evaluation.category]
    : "Інший предмет НМТ";
}

export { categoryOf };
