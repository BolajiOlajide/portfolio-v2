"use client";

import { useEffect, useRef, useState } from "react";

import { cx } from "misc/utils";
import { useSpotify } from "app/context/spotify";
import PlayingBars from "./playing-bars";
import Spinner from "./spinner";
import styles from "./now-playing.module.scss";

// Owns the single <audio> element for the Spotify preview so the desktop bar and
// the mobile menu can both show (and toggle) the same playback state.
export function usePreview() {
  const details = useSpotify();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (details.previewUrl && audioRef.current) {
      setPlaying(false);
      audioRef.current.src = details.previewUrl;
      audioRef.current.load();
    }
  }, [details.previewUrl]);

  const toggle = () => {
    if (!details.previewUrl || !audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const audio = details.previewUrl ? (
    <audio ref={audioRef} src={details.previewUrl} preload="auto" onEnded={() => setPlaying(false)} />
  ) : null;

  return { details, playing, toggle, audio };
}

type Props = ReturnType<typeof usePreview> & { className?: string };

// Spotify status line: orange dot (or bars when live) + "Last played · Song — Artist".
export default function NowPlaying({ details, playing, toggle, className }: Props) {
  if (details.loading) {
    return (
      <span className={cx(styles.np, className)}>
        <Spinner size={8} />
      </span>
    );
  }

  const hasSong = !!(details.songName && details.artistName);
  const status = details.isPlaying ? "Now playing" : "Last played";
  const live = playing || details.isPlaying;

  const content = (
    <>
      <span className={styles.indicator} aria-hidden="true">
        {live ? <PlayingBars size={14} className={styles.bars} /> : null}
        <span className={cx(styles.dot, live && styles.dotLive)} />
      </span>
      <span className={styles.text}>
        {hasSong ? (
          <>
            {status} · {details.songName} — {details.artistName}
          </>
        ) : (
          "Currently offline"
        )}
      </span>
    </>
  );

  if (!details.previewUrl || !hasSong) {
    return <span className={cx(styles.np, className)}>{content}</span>;
  }

  return (
    <button
      type="button"
      className={cx(styles.np, styles.button, className)}
      onClick={toggle}
      aria-pressed={playing}
      title={playing ? "Pause preview" : "Play a preview"}
    >
      {content}
      <span className="sr-only">{playing ? " (pause preview)" : " (play preview)"}</span>
    </button>
  );
}
