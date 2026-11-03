import type { ReactNode } from "react";

import Shape from "./shape";
import styles from "./intro.module.scss";

type Props = {
  index?: string;
  children: ReactNode;
  meta?: Array<{ label: string; value: ReactNode }>;
};

// Statement paragraph (cols 3-10, 40px grotesk) with a ruled metadata column on the right.
export default function Intro({ index = "01", children, meta = [] }: Props) {
  return (
    <section className={styles.intro}>
      <span className={styles.index}>
        <Shape kind="circle" />
        {index}
      </span>
      <p className={styles.statement}>{children}</p>
      {meta.length > 0 && (
        <dl className={styles.meta}>
          {meta.map((m) => (
            <div key={m.label}>
              <dt>{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
