import Link from "next/link";

import Shape, { MORPH } from "./shape";
import styles from "./mark.module.scss";

// Brand mark: circle, triangle, square. Shapes morph on hover.
export default function Mark({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" aria-label="Bolaji Olajide — home" className={`${styles.mark} ${MORPH}`} onClick={onClick}>
      <Shape kind="circle" size={12} />
      <Shape kind="triangle" size={12} />
      <Shape kind="square" size={12} />
    </Link>
  );
}
