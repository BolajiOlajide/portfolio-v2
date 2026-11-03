import { ReactNode } from "react";

import PageHero from "app/components/page-hero";
import { pageMetadata } from "misc/metadata";

export const metadata = pageMetadata({
  title: "Projects",
  description: "Some of the projects I have worked on.",
  path: "/projects",
});

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <PageHero
        index="04"
        title="Projects"
        description="Tools, libraries and products I've built — from audio plugins to CLIs."
      />
      {children}
    </>
  );
};

export default layout;
