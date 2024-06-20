import { useMemo } from "react";

import { cx } from "misc/utils";
import { MUSIC } from "misc/data";

export const metadata = {
  title: "Music",
  description: "Some of the music I have worked on.",
};

export default function Music() {
  const generateSpanSequence = (n: number) => {
    const differences = [4, 6, 6, 4, 4];
    let sequence = [2];

    for (let i = 1; i < n; i++) {
      let nextValue =
        sequence[i - 1] + differences[(i - 1) % differences.length];
      sequence.push(nextValue);
    }

    return sequence;
  };

  const sequence = useMemo(() => generateSpanSequence(MUSIC.length), [MUSIC]);
  console.log(sequence.length, "<===");

  return (
    <section className="page__container">
      <header className="page__header">
        <h1>Music</h1>
      </header>
      <section className="music">
        {MUSIC.map((m, idx) => (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={m.link}
            className={cx(
              "music__node",
              sequence.includes(idx + 1) && "span-2"
            )}
            key={idx}
            aria-label={m.name}
          >
            <div className="music__node__cover">
              <img src={m.image} alt="cover art" />
            </div>

            <p className="music__node__text">{m.name}</p>
          </a>
        ))}
      </section>
    </section>
  );
}
