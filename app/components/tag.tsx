import Link from "next/link";
import type { ReactNode } from "react";

import { cx } from "misc/utils";
import styles from "./tag.module.scss";

type Props = {
  children: ReactNode;
  href: string;
  active?: boolean;
  scroll?: boolean;
};

// Hairline-bordered uppercase tag; inverts to ink on hover. `active` renders it filled.
export default function Tag({ children, href, active = false, scroll }: Props) {
  return (
    <Link
      href={href}
      scroll={scroll}
      className={cx(styles.tag, active && styles.active)}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
