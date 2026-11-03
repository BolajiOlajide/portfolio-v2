"use client";

import { useSearchParams } from "next/navigation";

import PostList from "app/components/post-list";
import TagFilter from "app/components/tag-filter";
import type { Post } from "./utils";

const Content = ({ posts, tags }: { posts: Post[]; tags: string[] }) => {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag") || "";

  const filtered = tag === "" ? posts : posts.filter((post) => post.metadata.tags.includes(tag));
  // A tag reached from a post may not be one of the common ones; show it so it can be seen as active.
  const shown = tag && !tags.includes(tag) ? [...tags, tag] : tags;

  return (
    <div className="container">
      <div className="blog-filter">
        <TagFilter tags={shown} active={tag || undefined} />
      </div>
      <div className="blog-list">
        <PostList key={tag || "all"} posts={filtered} />
      </div>
    </div>
  );
};

export default Content;
