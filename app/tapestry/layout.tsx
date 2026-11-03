import { ReactNode } from "react";

import PageHero from "app/components/page-hero";

export const metadata = {
  title: "Tapestry",
  description:
    "A free multitap delay plugin for macOS and Windows, with up to 32 taps that each have their own level, pan, filter, pitch and modulation.",
};

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
