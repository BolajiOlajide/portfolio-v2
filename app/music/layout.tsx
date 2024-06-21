import { ReactNode } from "react";

export const metadata = {
  title: "Music",
  description: "Some of the music I have worked on.",
};

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="page__container">
      <header className="page__header">
        <h1>Music</h1>
      </header>
      {children}
    </section>
  );
};

export default layout;
