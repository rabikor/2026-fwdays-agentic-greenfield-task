import { formatNumber, formatPercent, formatDate } from "@/app/lib/format";

/**
 * App-shell demo page. It renders inside the global frame (header, deadline
 * banner, disclaimer — see layout.tsx) and exercises the design system,
 * brand fonts, and uk-UA formatting so the shell is verifiable end-to-end.
 * Real feature content arrives with later capabilities.
 */
export default function Home() {
  const sample = { score: 187.5, chance: 54, cutoffDate: new Date("2025-07-15") };

  return (
    <>
      <section style={{ maxWidth: "42rem" }}>
        <p className="pk-label">Оболонка застосунку</p>
        <h1 className="pk-h1">Оцініть свої шанси на вступ</h1>
        <p className="pk-body" style={{ marginTop: "var(--pk-space-4)" }}>
          Це базова оболонка «Прохідного»: адаптивна верстка, українська
          локалізація та дизайн-система, які успадковують усі екрани застосунку.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gap: "var(--pk-space-4)",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          marginTop: "var(--pk-space-8)",
        }}
      >
        <div className="pk-card">
          <p className="pk-label">Приклад балу НМТ</p>
          <div className="pk-numeral" style={{ marginTop: "var(--pk-space-2)" }}>
            {formatNumber(sample.score, { minimumFractionDigits: 1 })}
          </div>
          <p className="pk-text-sm" style={{ marginTop: "var(--pk-space-2)" }}>
            Форматування чисел за стандартом uk-UA.
          </p>
        </div>

        <div className="pk-card">
          <p className="pk-label">Приклад шансу</p>
          <div className="pk-numeral" style={{ marginTop: "var(--pk-space-2)" }}>
            {formatPercent(sample.chance)}
          </div>
          {/* Traffic-light category is never color-only: dot + text label (NFR-A11Y-01) */}
          <span
            className="pk-pill pk-pill--real"
            style={{ marginTop: "var(--pk-space-3)" }}
          >
            <span className="pk-pill__dot" aria-hidden="true" />
            Реалістично
          </span>
        </div>

        <div className="pk-card">
          <p className="pk-label">Приклад дати</p>
          <div className="pk-h3" style={{ marginTop: "var(--pk-space-2)" }}>
            {formatDate(sample.cutoffDate)}
          </div>
          <p className="pk-text-sm" style={{ marginTop: "var(--pk-space-2)" }}>
            Дати форматуються українською.
          </p>
        </div>
      </section>
    </>
  );
}
