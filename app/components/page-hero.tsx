import type { ReactNode } from "react";

import Label from "./label";
import LetterGrid from "./letter-grid";
import Ticks from "./ticks";
import styles from "./page-hero.module.scss";

type Props = {
  index: string;
  title: string;
  description?: ReactNode;
  cell?: number;
};

// Inner-page header on ink: "03 / Projects" index, the page word in a LetterGrid, optional intro.
export default function PageHero({ index, title, description, cell = 88 }: Props) {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <Label tone="inverse-muted" size="micro">
          {index} / {title}
        </Label>
        <div className={styles.row}>
          <h1 className={styles.title}>
            <span className="sr-only">{title}</span>
            <LetterGrid rows={[title]} size={cell} />
          </h1>
          {description && <div className={styles.description}>{description}</div>}
        </div>
      </div>
      <Ticks />
    </section>
  );
}
