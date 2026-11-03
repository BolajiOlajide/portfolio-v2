import Tag from "./tag";
import styles from "./tag-filter.module.scss";

// Row of tags for filtering the blog; the active tag (or "all") is filled.
export default function TagFilter({ tags, active }: { tags: string[]; active?: string }) {
  return (
    <nav aria-label="Filter posts by tag" className={styles.filter}>
      <Tag href="/blog" active={!active} scroll={false}>
        all
      </Tag>
      {tags.map((t) => (
        <Tag key={t} href={`/blog?tag=${encodeURIComponent(t)}`} active={t === active} scroll={false}>
          {t}
        </Tag>
      ))}
    </nav>
  );
}
