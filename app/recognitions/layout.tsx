import { ReactNode } from "react";

import { pageMetadata } from "misc/metadata";

export const metadata = pageMetadata({
  title: "Recognitions",
  description: "Publications, appearances, and awards showcasing my work and expertise.",
  path: "/recognitions",
});

const layout = ({ children }: { children: ReactNode }) => children;

export default layout;
