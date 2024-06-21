"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAnimate, stagger } from "framer-motion";

import PostComponent from "./post";
import { Post } from "app/blog/utils";

type Props = {
  posts?: Post[];
};

export function BlogPosts({ posts = [] }: Props) {
  const [scope, animate] = useAnimate();
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag") || "";

  let allBlogs =
    tag === ""
      ? posts
      : posts.filter((post) => post.metadata.tags.includes(tag));

  useEffect(() => {
    animate([
      [
        "li",
        { x: [32, 0], opacity: [0, 1] },
        {
          delay: stagger(0.1),
          at: "-0.15",
          ease: "easeOut",
          duration: 0.4,
        },
      ],
    ]);
  }, []);

  return allBlogs.length > 0 ? (
    <ul ref={scope}>
      {allBlogs.map((post) => (
        <li key={post.slug}>
          <PostComponent post={post} />
        </li>
      ))}
    </ul>
  ) : (
    <div className="posts--empty link-underline link-underline--accent">
      <p>
        No results found. <Link href="/blog">Back to all articles</Link>
      </p>
    </div>
  );
}
