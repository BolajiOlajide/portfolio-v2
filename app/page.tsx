import { ArrowTopRightIcon } from "@radix-ui/react-icons";

import HomeHero from "app/components/home-hero";
import Intro from "app/components/intro";
import PostList from "app/components/post-list";
import SectionHead from "app/components/section-head";
import UnderlineLink from "app/components/underline-link";
import { getLastThreeBlogPosts } from "./blog/utils";

export default function Page() {
  const posts = getLastThreeBlogPosts();

  return (
    <>
      <HomeHero />
      <Intro
        meta={[
          { label: "Day job", value: "Software Engineer, Sourcegraph" },
          { label: "Experience", value: "5+ years, full-stack" },
          {
            label: "Listen",
            value: (
              <UnderlineLink href="https://soundcloud.com/protonmakesmusic">
                SoundCloud <ArrowTopRightIcon aria-hidden="true" />
              </UnderlineLink>
            ),
          },
        ]}
      >
        By day, a full-stack engineer boosting developer productivity at{" "}
        <UnderlineLink href="https://sourcegraph.com/" tone="indigo">
          Sourcegraph
        </UnderlineLink>
        . By night,{" "}
        <UnderlineLink href="/music" tone="orange">
          PROTON
        </UnderlineLink>{" "}
        — a DJ and producer fusing electronic, house and techno.
      </Intro>
      <div className="container">
        <SectionHead index="02" title="Recent Posts" action={{ label: "All articles →", href: "/blog" }} />
        <PostList posts={posts} />
      </div>
    </>
  );
}
