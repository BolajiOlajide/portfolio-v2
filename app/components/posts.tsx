import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import {
  formatDate,
  getBlogPostByTag,
  getLastThreeBlogPosts,
} from "app/blog/utils";
import StyledText from "./styled-text";

// NOTE: I limited the amount of tags to show to 3.

type Props = {
  tag?: string;
  latest?: boolean;
};

export function BlogPosts({ latest = false, tag = "" }: Props) {
  let allBlogs = latest ? getLastThreeBlogPosts() : getBlogPostByTag(tag);

  return (
    <div>
      {allBlogs.length > 0 ? (
        allBlogs.map((post) => (
          <div key={post.slug} className="post">
            <Link
              className="post__link"
              href={`/blog/${post.slug}`}
              aria-label={post.metadata.title}
            />

            <time>{formatDate(post.metadata.date, false)}</time>
            <div className="post__content">
              <div className="">
                <p> {post.metadata.title}</p>
                <div className="post__tags">
                  {post.metadata.tags.slice(0, 5).map((tag) => (
                    <StyledText
                      key={tag}
                      text={tag}
                      href={`/blog/tags/${tag}`}
                    />
                  ))}
                </div>
              </div>

              <ArrowRightIcon />
            </div>
          </div>
        ))
      ) : (
        <div className="posts--empty link-underline link-underline--accent">
          <p>
            No results found. <Link href="/blog">Back to all Articles</Link>
          </p>
        </div>
      )}
    </div>
  );
}
