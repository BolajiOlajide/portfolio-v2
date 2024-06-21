"use client";

import { useEffect } from "react";
import { useAnimate, stagger } from "framer-motion";

import { PROJECTS } from "misc/data";

import StyledText from "app/components/styled-text";

export default function SelectedProjects() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate([
      [
        ".projects> div",
        { y: [32, 0], opacity: [0, 1] },
        { delay: stagger(0.17), duration: 0.5 },
      ],
    ]);
  }, []);

  return (
    <section className="projects" ref={scope}>
      {PROJECTS.map((project, idx) => (
        <div key={idx}>
          <div className="project">
            <h3>{project.name}</h3>

            <p>{project.description}</p>

            <StyledText text="Visit" href={project.link} />
          </div>
        </div>
      ))}
    </section>
  );
}
