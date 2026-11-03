import { ReactNode } from "react";

import PageHero from "app/components/page-hero";
import { pageMetadata } from "misc/metadata";

export const metadata = pageMetadata({
  title: "Tapestry",
  description:
    "A free multitap delay plugin for macOS and Windows, with up to 32 taps that each have their own level, pan, filter, pitch and modulation.",
  path: "/tapestry",
  image: {
    url: "/media/tapestry/tapestry.jpg",
    width: 1600,
    height: 1040,
    alt: "Tapestry's window: a timeline of delay taps above a row of tap cards, with feedback and mix controls along the bottom.",
  },
});

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <PageHero
        index="04.1"
        title="Tapestry"
        description="A free multitap delay plugin. Place up to 32 echoes anywhere in time and give each one its own level, pan, filter, pitch and modulation."
      />
      {children}
    </>
  );
};

export default layout;
