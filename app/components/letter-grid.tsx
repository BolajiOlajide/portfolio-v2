import type { CSSProperties } from "react";

import Shape, { type ShapeKind } from "./shape";
import styles from "./letter-grid.module.scss";

export type Cell = string | { shape: ShapeKind };

// Turn a word into cells: first O -> circle, first A -> triangle; if neither, a square is appended.
export function wordToCells(word: string): Cell[] {
  const used: Record<string, boolean> = {};
  const cells: Cell[] = word
    .toUpperCase()
    .split("")
    .map((ch) => {
      if (ch === "O" && !used.O) {
        used.O = true;
        return { shape: "circle" as const };
      }
      if (ch === "A" && !used.A) {
        used.A = true;
        return { shape: "triangle" as const };
      }
      return ch;
    });
  if (!used.O && !used.A) cells.push({ shape: "square" });
  return cells;
}

type Props = {
  rows: Array<string | Cell[]>;
  // Cell size in px at full width; cells shrink to fit narrow viewports.
  size?: number;
};

// Letters set one per cell in a hairline construction grid on ink.
// Purely decorative: callers must render the real word as text (e.g. a visually hidden h1).
export default function LetterGrid({ rows, size = 112 }: Props) {
  const norm = rows.map((r) => (typeof r === "string" ? wordToCells(r) : r));
  const cols = Math.max(...norm.map((r) => r.length));
  const vars = { "--cols": cols, "--size": `${size}px` } as CSSProperties;

  return (
    <div className={styles.grid} style={vars} aria-hidden="true">
      {norm.map((r, ri) =>
        Array.from({ length: cols }, (_, ci) => {
          const cell = r[ci] ?? "";
          return typeof cell === "string" ? (
            <div key={`${ri}-${ci}`} className={styles.cell}>
              {cell}
            </div>
          ) : (
            <div key={`${ri}-${ci}`} className={`${styles.cell} ${styles.shapeCell}`}>
              <Shape kind={cell.shape} size="fill" className={styles.shape} />
            </div>
          );
        })
      )}
    </div>
  );
}
