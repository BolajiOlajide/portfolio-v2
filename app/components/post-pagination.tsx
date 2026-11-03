import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

import { cx } from "misc/utils";
import type { Post } from "app/blog/utils";
import styles from "./post-pagination.module.scss";

function Side({ dir, post }: { dir: "prev" | "next"; post?: Post }) {
  if (!post) return <div className={styles.empty} />;
  const next = dir === "next";

  return (
    <Link href={`/blog/${post.slug}`} className={cx(styles.side, next && styles.next)}>
      <span className={styles.label}>
        {!next && <ArrowLeftIcon width={16} height={16} aria-hidden="true" />}
        {next ? "Next" : "Previous"}
        {next && <ArrowRightIcon width={16} height={16} aria-hidden="true" />}
      </span>
      <span className={styles.title}>{post.metadata.title}</span>
    </Link>
  );
}

// Two ruled cells; each inverts to ink on hover.
export default function PostPagination({ prev, next }: { prev?: Post; next?: Post }) {
  return (
    <nav aria-label="More articles" className={styles.pagination}>
      <Side dir="prev" post={prev} />
      <Side dir="next" post={next} />
    </nav>
  );
}
