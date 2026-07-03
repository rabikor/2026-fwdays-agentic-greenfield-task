/**
 * Global honesty disclaimer (BC-HONESTY-01, passive surface).
 *
 * Persistent on every route: states that chances are estimates, never a
 * guarantee. Passive only — it does not compute or gate any chance value.
 */
export function Disclaimer() {
  return (
    <aside className="pk-disclaimer" role="note" aria-label="Застереження">
      <div className="pk-container pk-disclaimer__inner">
        <span className="pk-disclaimer__mark" aria-hidden="true">
          i
        </span>
        <p className="pk-text-sm">
          Шанси на вступ — це оцінка на основі історичних даних, а не гарантія
          зарахування. Остаточні рішення ухвалюють заклади освіти; використовуйте
          ці показники лише як орієнтир.
        </p>
      </div>
    </aside>
  );
}
