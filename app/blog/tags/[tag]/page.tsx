import Link from "next/link";
import { Cross2Icon } from "@radix-ui/react-icons";

import { BlogPosts } from "app/components/posts";

export default function Tag({ params }) {
  const tag = params.tag.replace("%20", " ");

  return (
    <section className="container">
      <div className="blog ">
        <header className="blog__header">
          <h2>
            Articles tagged <span className="tag">"{tag}"</span>
          </h2>

          <Link href="/blog">
            Clear tag <Cross2Icon />
          </Link>
        </header>
        <BlogPosts tag={tag} />
      </div>
    </section>
  );
}
