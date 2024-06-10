import Link from 'next/link';
import {
  formatDate,
  getBlogPosts,
  getLastThreeBlogPosts,
} from 'app/blog/utils';
import { ArrowRightIcon } from '@radix-ui/react-icons';

type Props = {
  type: 'all' | 'latest';
};

export function BlogPosts({ type }: Props) {
  let allBlogs = type === 'all' ? getBlogPosts() : getLastThreeBlogPosts();

  return (
    <div className='posts'>
      {allBlogs.map((post) => (
        <Link key={post.slug} className='post' href={`/blog/${post.slug}`}>
          <time>{formatDate(post.metadata.date, false)}</time>
          <div className='post__content'>
            <div className=''>
              <p> {post.metadata.title}</p>
              <div className='post__tags'>
                {post.metadata.tags.map((tag) => (
                  <span key={tag} className='status status--outline'>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <ArrowRightIcon />
          </div>
        </Link>
      ))}
    </div>
  );
}
