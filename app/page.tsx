import Link from "next/link";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

import Hero from "./hero";
import { BlogPosts } from "app/components/posts";
import { getLastThreeBlogPosts } from "./blog/utils";

export default function Page() {
  const posts = getLastThreeBlogPosts();

  return (
    <div className="container">
      <Hero />

      <section className="recent-posts">
        <div className="recent-posts__header">
          <h2>Recent Posts</h2>

          <Link href="/blog">
            See More <ArrowTopRightIcon />
          </Link>
        </div>
        <BlogPosts posts={posts} />
      </section>
    </div>
  );
}
