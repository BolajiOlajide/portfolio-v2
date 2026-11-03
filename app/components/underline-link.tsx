import Link from "next/link";
import type { ReactNode } from "react";

import { cx } from "misc/utils";
import styles from "./underline-link.module.scss";

type Props = {
  children: ReactNode;
  href: string;
  tone?: "current" | "indigo" | "orange" | "yellow";
  persistent?: boolean;
  className?: string;
};

// Text link: a 3px bar sweeps in left to right on hover. `persistent` keeps a 1px rule at rest.
export default function UnderlineLink({ children, href, tone = "current", persistent = false, className }: Props) {
  const cls = cx(styles.link, styles[tone], persistent && styles.persistent, className);

  if (/^https?:/.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
