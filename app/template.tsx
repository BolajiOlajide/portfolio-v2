"use client";

import { useIsPresent, useAnimate, stagger } from "framer-motion";
import { useEffect } from "react";

const Template = ({ children }: { children: React.ReactNode }) => {
  const isPresent = useIsPresent();

  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate([
      [
        ".loading-screen",
        { scaleY: [1, 0] },
        {
          delay: stagger(0.15),
          duration: 0.5,
          type: "tween",
          ease: "circIn",
        },
      ],
    ]);
  }, [isPresent, animate]);

  return (
    <div ref={scope}>
      <div className="loading-screen loading-screen__one" />
      <div className="loading-screen" />
      {children}
    </div>
  );
};

export default Template;
