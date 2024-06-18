import { useMemo } from 'react';

import { cx } from 'misc/utils';
import { MUSIC } from 'misc/data';
import StyledText from 'app/components/styled-text';

export const metadata = {
  title: 'Music',
  description: 'Some of the music I have worked on.',
};

export default function Music() {
  const generateSpanSequence = (n) => {
    const differences = [4, 4, 6, 6, 4];
    let sequence = [3];

    for (let i = 1; i < n; i++) {
      let nextValue =
        sequence[i - 1] + differences[(i - 1) % differences.length];
      sequence.push(nextValue);
    }

    return sequence;
  };

  const sequence = useMemo(() => generateSpanSequence(MUSIC.length), [MUSIC]);
  console.log(sequence.length, '<===');

  return (
    <section className='page__container'>
      <header className='page__header'>
        <h1>Music</h1>
      </header>
      <section className='music'>
        {MUSIC.map((m, idx) => (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={m.link}
            className={cx('music__node', sequence.includes(idx + 1) && 'span-2')}
            style={{'backgroundImage': `url('${m.image}')`}}
            key={idx}
          >
            <span className='music__node-text'>{m.name}</span>
          </a>
        ))}
      </section>
    </section>
  );
}
