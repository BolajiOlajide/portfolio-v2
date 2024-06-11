import Link from 'next/link';
import {
  formatDate,
  getBlogPostByTag,
  getLastThreeBlogPosts,
} from 'app/blog/utils';
import { ArrowRightIcon } from '@radix-ui/react-icons';

// I limited the amount of tags to show to 3.

type Props = {
  tag?: string;
  latest?: boolean;
};

export function BlogPosts({ latest = false, tag = '' }: Props) {
  let allBlogs = latest ? getLastThreeBlogPosts() : getBlogPostByTag(tag);

  return (
    <div>
      {allBlogs.length > 0 ? (
        allBlogs.map((post) => (
          <Link key={post.slug} className='post' href={`/blog/${post.slug}`}>
            <time>{formatDate(post.metadata.date, false)}</time>
            <div className='post__content'>
              <div className=''>
                <p> {post.metadata.title}</p>
                <div className='post__tags'>
                  {post.metadata.tags.slice(0, 3).map((tag) => (
                    <Link href={`/blog/tags/${tag}`} key={tag}>
                      <span className='status status--outline'>{tag}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <ArrowRightIcon />
            </div>
          </Link>
        ))
      ) : (
        <div className='posts--empty link-underline link-underline--accent'>
          <p>
            No results found. <Link href='/blog'>Back to all Articles</Link>
          </p>
        </div>
      )}
    </div>
  );
}
