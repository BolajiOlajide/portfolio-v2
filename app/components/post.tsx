"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import StyledText from "./styled-text";
import { Post, formatDate } from "app/blog/utils";

const PostComponent = ({ post }: { post: Post }) => {
  return (
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
              <StyledText key={tag} text={tag} href={`/blog?tag=${tag}`} />
            ))}
          </div>
        </div>

        <ArrowRightIcon />
      </div>
    </div>
  );
};

export default PostComponent;
