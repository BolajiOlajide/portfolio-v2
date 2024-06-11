import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

import { baseUrl } from 'app/sitemap';
import { CustomMDX } from 'app/components/mdx';
import { formatDate, getBlogPosts } from 'app/blog/utils';

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
      type: 'article',
      date,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
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
    <section className='blog-post__container'>
      <script
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.date,
            dateModified: post.metadata.date,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Bolaji Olajide',
            },
          }),
        }}
      />
      <Link className='back' href='/blog'>
        <ArrowLeftIcon /> All Articles
      </Link>
      <header className='blog-post__header'>
        <h1 className='blog-post__title'>{post.metadata.title}</h1>
        <div>
          <p>{formatDate(post.metadata.date)}</p>
        </div>

        <hr className='blog-post__divider' />
      </header>
      <article className='blog-post'>
        <CustomMDX source={post.content} />
      </article>

      <div className='blog-post__tags'>
        <p>Tags:</p>{' '}
        <div className='post__tags'>
          {post.metadata.tags.map((tag) => (
            <Link href={`/blog/tags/${tag}`}>
              <span className='status status--outline'>{tag}</span>
            </Link>
          ))}
        </div>
      </div>

      <hr className='blog-post__divider' />

      <div className='blog-post__pagination link-underline link-underline--accent'>
        {prevPost && (
          <div>
            <p>
              <ArrowLeftIcon /> Previous
            </p>

            <Link href={`/blog/${prevPost.slug}`}>
              {prevPost.metadata.title}
            </Link>
          </div>
        )}

        {nextPost && (
          <div>
            <p className='blog-post__link-text'>
              Next <ArrowRightIcon />
            </p>
            <Link href={`/blog/${nextPost.slug}`}>
              {nextPost.metadata.title}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
