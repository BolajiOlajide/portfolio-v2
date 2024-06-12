import Link from 'next/link';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

import Hero from './hero';
import { BlogPosts } from 'app/components/posts';

export default function Page() {
  return (
    <div className='container'>
      <Hero />

      <section className='recent-posts'>
        <div className='recent-posts__header'>
          <h2>Recent Posts</h2>

          <Link href='/blog'>
            Read More <ArrowTopRightIcon />
          </Link>
        </div>
        <BlogPosts latest />
      </section>
    </div>
  );
}
