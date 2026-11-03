import { Suspense } from "react";

import PageHero from "app/components/page-hero";
import { pageMetadata } from "misc/metadata";
import Content from "./content";
import { getBlogPosts } from "./utils";
import styles from "./blog.module.scss";

export const metadata = pageMetadata({
  title: "Blog",
  description: "Read my blog.",
  path: "/blog",
});

// Tags used by more than one post, most used first.
function commonTags(posts: ReturnType<typeof getBlogPosts>) {
  const counts = new Map<string, number>();
  posts.forEach((p) => p.metadata.tags.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)));
  return Array.from(counts.entries())
    .filter(([, n]) => n > 1)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([t]) => t);
}

export default function Page() {
  const posts = getBlogPosts();

  return (
    <>
      <PageHero
        index="01"
        title="Blog"
        description="Notes on software, tools and the occasional detour into music."
      />
      <div className={styles.body}>
        <Suspense>
          <Content posts={posts} tags={commonTags(posts)} />
        </Suspense>
      </div>
    </>
  );
}
