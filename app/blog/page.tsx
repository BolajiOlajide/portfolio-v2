import { getBlogPosts } from "./utils";
import Content from "./content";
import { Suspense } from "react";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  const posts = getBlogPosts();

  return (
    <Suspense>
      <Content posts={posts} />
    </Suspense>
  );
}
