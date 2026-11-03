import type { CSSProperties } from "react";

import { cx } from "misc/utils";
import Shape, { MORPH, SHAPES } from "./shape";
import styles from "./music-tile.module.scss";

type Props = {
  index: number;
  name: string;
  image: string;
  href: string;
  platform?: string;
  size?: "sm" | "lg";
};

// Cover art in a ruled cell: grayscale at rest, colour on hover; caption row below with platform + shape.
export default function MusicTile({ index, name, image, href, platform, size = "sm" }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(styles.tile, MORPH, size === "lg" && styles.lg)}
      style={{ "--i": index } as CSSProperties}
    >
      <span className={styles.cover}>
        {/* Remote cover art from several hosts; next/image would need each one allow-listed. */}
        <img src={image} alt="" loading={index < 4 ? "eager" : "lazy"} />
      </span>
      <span className={styles.caption}>
        <Shape kind={SHAPES[index % 3]} size={10} />
        <span className={styles.name}>{name}</span>
        {platform && <span className={styles.platform}>{platform}</span>}
      </span>
    </a>
  );
}
