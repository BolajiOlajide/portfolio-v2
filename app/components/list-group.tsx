import type { CSSProperties } from "react";

import type { ListItem } from "misc/list-content";
import Shape, { type ShapeKind } from "./shape";
import styles from "./list-group.module.scss";

function Item({ name, href, note, meta }: ListItem) {
  const external = /^https?:/.test(href);
  return (
    <li className={styles.item}>
      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={styles.link}>
        <span className={styles.main}>
          <span className={styles.name}>{name}</span>
          {note && <span className={styles.note}>— {note}</span>}
        </span>
        {meta && <span className={styles.meta}>{meta}</span>}
      </a>
    </li>
  );
}

type Props = {
  index: string;
  title: string;
  subtitle?: string;
  shape?: ShapeKind;
  items: ListItem[];
  order?: number;
};

// Grouped list on the 12-col grid: [index + shape + group title] | [hairline item rows].
export default function ListGroup({ index, title, subtitle, shape = "circle", items, order = 0 }: Props) {
  return (
    <section className={styles.group} style={{ "--i": order } as CSSProperties}>
      <div className={styles.head}>
        <span className={styles.index}>
          <Shape kind={shape} />
          {index}
        </span>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      </div>
      <ul className={styles.items}>
        {items.map((it) => (
          <Item key={`${it.name}-${it.href}`} {...it} />
        ))}
      </ul>
    </section>
  );
}
