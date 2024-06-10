import { BlogPosts } from 'app/components/posts';

export default function Page() {
  return (
    <section className='container'>
      <h1>My Portfolio</h1>
      <p>
        {`I'm a Vim enthusiast and tab advocate, finding unmatched efficiency in
        Vim's keystroke commands and tabs' flexibility for personal viewing
        preferences. This extends to my support for static typing, where its
        early error detection ensures cleaner code, and my preference for dark
        mode, which eases long coding sessions by reducing eye strain.`}
      </p>
      <div>
        <BlogPosts />
      </div>
    </section>
  );
}
