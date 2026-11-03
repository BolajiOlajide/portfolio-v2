import { notFound } from "next/navigation";

import { baseUrl } from "app/sitemap";
import { CustomMDX } from "app/components/mdx";
import { formatListDate, getBlogPosts } from "app/blog/utils";
import BackLink from "app/components/back-link";
import Label from "app/components/label";
import PostHeader from "app/components/post-header";
import PostPagination from "app/components/post-pagination";
import Prose from "app/components/prose";
import Tag from "app/components/tag";
import { SocialShare } from "app/components/social-share";
import styles from "./post.module.scss";

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let { title, date, summary: description, image } = post.metadata;
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      date,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Blog({ params }) {
  let index;

  const posts = getBlogPosts();

  let post = posts.find((post, idx) => {
    if (post.slug === params.slug) {
      index = idx;
      return post;
    }
  });

  if (!post) {
    notFound();
  }

  const prevPost = posts[index - 1];
  const nextPost = posts[index + 1];

  return (
    <div className={`container ${styles.post}`}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.date,
            dateModified: post.metadata.date,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Bolaji Olajide",
            },
          }),
        }}
      />
      <BackLink />
      <PostHeader
        title={post.metadata.title}
        date={formatListDate(post.metadata.date)}
        dateTime={post.metadata.date}
        readingTime={post.metadata.readTime}
      />

      <div className={styles.body}>
        <Prose className={styles.prose}>
          <CustomMDX source={post.content} />
        </Prose>

        {post.metadata.tags.length > 0 && (
          <aside className={styles.aside}>
            <Label size="micro" className={styles.asideTitle}>
              Tags
            </Label>
            <div className={styles.tags}>
              {post.metadata.tags.map((tag) => (
                <Tag key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                  {tag}
                </Tag>
              ))}
            </div>
          </aside>
        )}
      </div>

      <div className={styles.share}>
        <SocialShare
          title={post.metadata.title}
          url={`${baseUrl}/blog/${post.slug}`}
          summary={post.metadata.summary}
        />
      </div>

      <PostPagination prev={prevPost} next={nextPost} />
    </div>
  );
}
