import { ReactNode } from "react";

export const metadata = {
  title: "Projects",
  description: "Some of the projects I have worked on.",
};

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="page__container">
      <header className="page__header">
        <h1>Projects</h1>
      </header>
      {children}
    </section>
  );
};

export default layout;
