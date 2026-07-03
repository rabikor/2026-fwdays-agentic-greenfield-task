"use client";

import { useState } from "react";
import type { ProfileApi } from "@/app/hooks/useProfile";
import type { CategoryFilter, ScoredProgram } from "@/app/lib/recommend";
import { matchesCategory } from "@/app/lib/recommend";
import { CategoryTabs } from "./CategoryTabs";
import { ProgramCard } from "./ProgramCard";

/**
 * Recommendations list (recommendations capability): the grouped, sorted set of
 * programs with chance %, band, and category (FR-SCORE-02/03). Includes the
 * risk-category filter and a helpful empty state when nothing matches
 * (FR-UX-01).
 */
export function Recommendations({
  scored,
  profile,
  onOpen,
}: {
  scored: ScoredProgram[];
  profile: ProfileApi;
  onOpen: (id: string) => void;
}) {
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const visible = scored.filter((s) => matchesCategory(s, filter));

  return (
    <section aria-label="Рекомендації">
      <CategoryTabs value={filter} onChange={setFilter} />

      {visible.length === 0 ? (
        <div className="pk-empty">
          <p className="pk-empty__title">У цій категорії порожньо</p>
          <p className="pk-empty__text">
            Спробуй інший фільтр або зміни бали зліва — рекомендації оновляться.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "var(--pk-space-4)",
          }}
        >
          {visible.map((s) => (
            <ProgramCard
              key={s.program.id}
              scored={s}
              profile={profile}
              onOpen={onOpen}
            />
          ))}
        </div>
      )}
    </section>
  );
}
