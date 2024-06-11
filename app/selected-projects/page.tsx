import { PROJECTS, USES } from 'misc/data';

import { CustomMDX } from 'app/components/mdx';
import StyledText from 'app/components/styled-text';

export const metadata = {
  title: 'Selected Projects',
  description: 'Things that I use for my day to day work and activities.',
};

export default function Uses() {
  return (
    <section className='page__container'>
      <header className='page__header'>
        <h1>Selected Projects</h1>

        <hr className='page__divider' />
      </header>
      <section className='projects'>
        {PROJECTS.map((project, idx) => (
          <div className='project' key={idx}>
            <h3>{project.name}</h3>

            <p className='project__desc'>{project.description}</p>

            <StyledText text='Visit' href={project.link} />
          </div>
        ))}
      </section>
    </section>
  );
}
