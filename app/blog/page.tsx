import { BlogPosts } from 'app/components/posts';

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
};

export default function Page() {
  return (
    <section className='container'>
      <div className='blog'>
        <h2>Articles</h2>
        <BlogPosts  />
      </div>
    </section>
  );
}
