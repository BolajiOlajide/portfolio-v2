import type { ReactNode } from "react";

import { cx } from "misc/utils";
import Shape, { type ShapeKind } from "./shape";
import styles from "./label.module.scss";

type Props = {
  children: ReactNode;
  shape?: ShapeKind;
  size?: "label" | "micro";
  tone?: "default" | "muted" | "inverse-muted";
  className?: string;
};

// Uppercase label, optionally led by a shape marker. Used for indices, metadata, column heads.
export default function Label({ children, shape, size = "label", tone = "default", className }: Props) {
  return (
    <span className={cx(styles.label, styles[size], styles[tone], shape && styles.withShape, className)}>
      {shape && <Shape kind={shape} size={12} />}
      {children}
    </span>
  );
}
