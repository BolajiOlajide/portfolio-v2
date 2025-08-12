import { ReactNode } from "react";

export const metadata = {
  title: "Recognitions",
  description: "Publications, appearances, and awards showcasing my work and expertise.",
};

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="page__container">
      <header className="page__header">
        <h1>Recognitions</h1>
      </header>
      <article className="page__content">{children}</article>
    </section>
  );
};

export default layout;
