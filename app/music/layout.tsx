import { ReactNode } from "react";

import PageHero from "app/components/page-hero";
import { pageMetadata } from "misc/metadata";

export const metadata = pageMetadata({
  title: "Music",
  description: "Some of the music I have worked on.",
  path: "/music",
});

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <PageHero
        index="03"
        title="Music"
        description="Mixes, edits and live sets as PROTON — house, afro house and techno."
      />
      {children}
    </>
  );
};

export default layout;
