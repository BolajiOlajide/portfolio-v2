import { ReactNode } from "react";

import { pageMetadata } from "misc/metadata";

export const metadata = pageMetadata({
  title: "Uses",
  description: "Things that I use for my day to day work and activities.",
  path: "/uses",
});

const layout = ({ children }: { children: ReactNode }) => children;

export default layout;
