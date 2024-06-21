"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Cross2Icon } from "@radix-ui/react-icons";

import { BlogPosts } from "app/components/posts";

const Content = ({ posts }) => {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag") || "";

  return (
    <section className="container">
      <div className="blog">
        <header className="blog__header">
          <h2>Articles {tag && `tagged "${tag}"`}</h2>

          {tag && (
            <Link href="/blog">
              Clear tag <Cross2Icon />
            </Link>
          )}
        </header>
        <BlogPosts posts={posts} tag={tag} />
      </div>
    </section>
  );
};

export default Content;
