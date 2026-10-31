import { ReactNode } from "react";

export const metadata = {
  title: "Tapestry",
  description:
    "A free multitap delay plugin for macOS and Windows, with up to 32 taps that each have their own level, pan, filter, pitch and modulation.",
};

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="page__container">
      <header className="page__header">
        <h1>Tapestry</h1>
      </header>
      {children}
    </section>
  );
};

export default layout;
