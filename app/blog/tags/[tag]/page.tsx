import { BlogPosts } from 'app/components/posts';

export default function Tag({ params }) {
  const tag = params.tag.replace('%20', ' ');

  return (
    <section className='container'>
      <div className='blog'>
        <h2>
          Articles tagged <span className='tag'>"{tag}"</span>
        </h2>
        <BlogPosts tag={tag} />
      </div>
    </section>
  );
}
