import { PROJECTS } from 'misc/data';

import StyledText from 'app/components/styled-text';

export const metadata = {
  title: 'Selected Projects',
  description: 'Some of the projects I have worked on.',
};

export default function Uses() {
  return (
    <section className='page__container'>
      <header className='page__header'>
        <h1>Selected Projects</h1>
      </header>
      <section className='projects'>
        {PROJECTS.map((project, idx) => (
          <div className='project' key={idx}>
            <h3>{project.name}</h3>

            <p>{project.description}</p>

            <StyledText text='Visit' href={project.link} />
          </div>
        ))}
      </section>
    </section>
  );
}
