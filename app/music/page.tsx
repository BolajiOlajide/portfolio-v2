import { PROJECTS } from 'misc/data';

import StyledText from 'app/components/styled-text';
import { cx } from 'misc/utils';
import { useMemo } from 'react';

export const metadata = {
  title: 'Music',
  description: 'Some of the music I have worked on.',
};

export default function Uses() {
  const generateSpanSequence = (n) => {
    const initial = 3;
    const differences = [4, 4, 6, 6, 4];
    let sequence = [initial];

    for (let i = 1; i < n; i++) {
      let nextValue =
        sequence[i - 1] + differences[(i - 1) % differences.length];
      sequence.push(nextValue);
    }

    return sequence;
  };

  const sequence = useMemo(() => generateSpanSequence(30), [PROJECTS]);

  console.log('sequence', sequence);

  return (
    <section className='page__container'>
      <header className='page__header'>
        <h1>Music</h1>
      </header>
      <section className='music'>
        {[...Array(30).fill(null)].map((project, idx) => (
          <div
            className={cx('project', sequence.includes(idx + 1) && 'span-2')}
            key={idx}
          >
            {idx + 1}
          </div>
        ))}
      </section>
    </section>
  );
}
