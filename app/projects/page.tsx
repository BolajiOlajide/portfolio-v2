import type { CSSProperties } from "react";

import { PROJECTS } from "misc/data";
import ProjectCard from "app/components/project-card";
import styles from "./projects.module.scss";

export default function SelectedProjects() {
  return (
    <div className={`container ${styles.body}`}>
      <ul className={styles.grid}>
        {PROJECTS.map((project, idx) => (
          <li key={project.name} className={styles.cell} style={{ "--i": idx } as CSSProperties}>
            <ProjectCard
              index={idx}
              name={project.name}
              description={project.description}
              href={project.link}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
