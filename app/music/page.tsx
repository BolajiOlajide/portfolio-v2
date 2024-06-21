"use client";

import { useMemo, useEffect } from "react";
import { useAnimate, stagger } from "framer-motion";

import { cx } from "misc/utils";
import { MUSIC } from "misc/data";

export default function Music() {
  const [scope, animate] = useAnimate();

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

  useEffect(() => {
    animate([
      [".music", { opacity: [0, 1] }, { duration: 0.01 }],
      [
        ".music__node",
        { y: [32, 0], opacity: [0, 1] },
        { delay: stagger(0.17), duration: 0.5 },
      ],
    ]);
  }, []);

  return (
    <section className="music" ref={scope}>
      {MUSIC.map((m, idx) => (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={m.link}
          className={cx("music__node", sequence.includes(idx + 1) && "span-2")}
          key={idx}
          aria-label={m.name}
        >
          <div className="music__node__cover">
            <img src={m.image} alt="cover art" loading="eager" />
          </div>

          <p className="music__node__text">{m.name}</p>
        </a>
      ))}
    </section>
  );
}
