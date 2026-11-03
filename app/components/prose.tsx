import type { ReactNode } from "react";

import { cx } from "misc/utils";
import styles from "./prose.module.scss";

// Long-form MDX body: Jost 18/30, grotesk headings, orange square bullets, ink code blocks.
export default function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <article className={cx(styles.prose, className)}>{children}</article>;
}
