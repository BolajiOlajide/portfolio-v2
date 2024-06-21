import { Suspense } from "react";

import Content from "./content";
import { getBlogPosts } from "./utils";

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
