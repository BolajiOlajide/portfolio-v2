import Link from "next/link";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

import { cx } from "misc/utils";
import Shape, { MORPH, SHAPES } from "./shape";
import styles from "./project-card.module.scss";

type Props = {
  index: number;
  name: string;
  description: string;
  href: string;
  cta?: string;
};

// Ruled grid cell for a project. Inverts to ink on hover; shape morphs; arrow rotates.
// The containing grid draws the top/left rules.
export default function ProjectCard({ index, name, description, href, cta = "Visit" }: Props) {
  const body = (
    <>
      <span className={styles.top}>
        {String(index + 1).padStart(2, "0")}
        <Shape kind={SHAPES[index % 3]} size={16} />
      </span>
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.description}>{description}</p>
      <span className={styles.cta}>
        {cta}
        <ArrowTopRightIcon width={16} height={16} aria-hidden="true" className={styles.arrow} />
      </span>
    </>
  );
  const cls = cx(styles.card, MORPH);

  if (/^https?:/.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {body}
    </Link>
  );
}
