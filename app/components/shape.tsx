import { cx } from "misc/utils";
import styles from "./shape.module.scss";

export type ShapeKind = "circle" | "triangle" | "square";

export const SHAPES: ShapeKind[] = ["circle", "triangle", "square"];

// Class to put on a hoverable ancestor: any Shape inside it morphs on hover/focus
// (circle and square turn into diamonds, triangle flips).
export const MORPH = "morph";

type Props = {
  kind?: ShapeKind;
  size?: 8 | 10 | 12 | 14 | 16 | "fill";
  active?: boolean;
  className?: string;
};

// The Bauhaus primitive. Decorative, so hidden from assistive tech.
export default function Shape({ kind = "circle", size = 12, active = false, className }: Props) {
  return (
    <span
      aria-hidden="true"
      className={cx(styles.shape, styles[kind], styles[`s${size}`], active && styles.active, className)}
    />
  );
}
