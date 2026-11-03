"use client";

import { cx } from "misc/utils";
import type { SpotifyPlayingDetails } from "app/context/spotify";
import PlayingBars from "./playing-bars";
import Spinner from "./spinner";
import styles from "./now-playing.module.scss";

type Props = { details: SpotifyPlayingDetails; className?: string };

// Spotify status line: orange dot (or bars when live) + "Last played · Song — Artist".
export default function NowPlaying({ details, className }: Props) {
  if (details.loading) {
    return (
      <span className={cx(styles.np, className)}>
        <Spinner size={8} />
      </span>
    );
  }

  const hasSong = !!(details.songName && details.artistName);
  const status = details.isPlaying ? "Now playing" : "Last played";
  const live = details.isPlaying;

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

  if (!details.url || !hasSong) {
    return <span className={cx(styles.np, className)}>{content}</span>;
  }

  return (
    <a
      href={details.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(styles.np, styles.link, className)}
      title="Open track on Spotify"
    >
      {content}
      <span className="sr-only"> (opens Spotify in a new tab)</span>
    </a>
  );
}
