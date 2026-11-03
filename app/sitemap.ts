import type { MetadataRoute } from 'next';

import { getBlogPosts } from 'app/blog/utils';

export const baseUrl = 'https://bolaji.de';

const PAGES = ['', '/projects', '/music', '/uses', '/recognitions', '/tapestry'];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getBlogPosts();

  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.date,
  }));

  // Pages without a real modification date leave lastModified out. Stamping
  // them with the build date tells crawlers they change on every deploy.
  const pages = PAGES.map((route) => ({ url: `${baseUrl}${route}` }));

  const blogIndex = {
    url: `${baseUrl}/blog`,
    lastModified: posts[0]?.metadata.date,
  };

  return [...pages, blogIndex, ...blogPosts];
}
