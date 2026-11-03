import { MUSIC } from "misc/data";
import { platformFor } from "misc/utils";
import MusicTile from "app/components/music-tile";
import styles from "./music.module.scss";

// Tiles drawn large; with the dense grid they leave no gaps.
const BIG = [0, 5];

export default function Music() {
  return (
    <div className={`container ${styles.body}`}>
      <div className={styles.grid}>
        {MUSIC.map((m, idx) => (
          <MusicTile
            key={m.link}
            index={idx}
            name={m.name}
            image={m.image}
            href={m.link}
            platform={platformFor(m.link)}
            size={BIG.includes(idx) ? "lg" : "sm"}
          />
        ))}
      </div>
    </div>
  );
}
