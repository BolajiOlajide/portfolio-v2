import { BlogPosts } from "app/components/posts";
import { getBlogPosts } from "./utils";
import Content from "./content";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  const posts = getBlogPosts();

  return <Content posts={posts} />;
}
