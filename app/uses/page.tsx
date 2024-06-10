import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx';
import { formatDate, getBlogPosts } from 'app/blog/utils';

export default function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <h1>{post.metadata.title}</h1>
      <div>
        <p>{formatDate(post.metadata.date)}</p>
      </div>
      <article className='prose'>
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
