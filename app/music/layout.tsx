import { ReactNode } from "react";

import PageHero from "app/components/page-hero";

export const metadata = {
  title: "Music",
  description: "Some of the music I have worked on.",
};

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
