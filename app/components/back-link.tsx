import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

import styles from "./back-link.module.scss";

export default function BackLink({ href = "/blog", label = "All articles" }: { href?: string; label?: string }) {
  return (
    <Link href={href} className={styles.back}>
      <ArrowLeftIcon width={18} height={18} aria-hidden="true" className={styles.icon} />
      {label}
    </Link>
  );
}
