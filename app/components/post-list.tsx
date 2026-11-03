import Link from "next/link";
import type { CSSProperties } from "react";

import { cx } from "misc/utils";
import { type Post, formatListDate } from "app/blog/utils";
import Shape, { MORPH } from "./shape";
import UnderlineLink from "./underline-link";
import styles from "./post-list.module.scss";

const HOVER = [styles.indigo, styles.yellow, styles.orange];

// 12-col row: date | dot + title | tags. The dot morphs into a coloured diamond on hover.
export function PostRow({ post, index = 0 }: { post: Post; index?: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className={cx(styles.row, MORPH, HOVER[index % 3])}>
      <time className={styles.date} dateTime={post.metadata.date}>
        {formatListDate(post.metadata.date)}
      </time>
      <span className={styles.title}>
        <Shape kind="circle" size={14} className={styles.dot} />
        {post.metadata.title}
      </span>
      <span className={styles.tags}>{post.metadata.tags.slice(0, 3).join(" · ")}</span>
    </Link>
  );
}

// Staggered list of PostRows; the empty state links back to all articles.
export default function PostList({ posts }: { posts: Post[] }) {
  if (!posts.length) {
    return (
      <p className={styles.empty}>
        No results found.{" "}
        <UnderlineLink href="/blog" tone="indigo" persistent>
          Back to all articles
        </UnderlineLink>
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {posts.map((post, i) => (
        <li key={post.slug} className={styles.item} style={{ "--i": i } as CSSProperties}>
          <PostRow post={post} index={i} />
        </li>
      ))}
    </ul>
  );
}
