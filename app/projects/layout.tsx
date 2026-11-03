import { ReactNode } from "react";

import PageHero from "app/components/page-hero";

export const metadata = {
  title: "Projects",
  description: "Some of the projects I have worked on.",
};

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
