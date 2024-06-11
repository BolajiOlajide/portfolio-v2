import { ReactNode } from "react";

export const metadata = {
  title: "Uses",
  description: "Things that I use for my day to day work and activities.",
};

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="page__container">
      <header className="page__header">
        <h1>Uses</h1>
      </header>
      <article className="page__content">{children}</article>
    </section>
  );
};

export default layout;
