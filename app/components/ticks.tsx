import { cx } from "misc/utils";
import styles from "./ticks.module.scss";

// Ruler strip: 24 ticks, every 6th full height. Closes every dark band.
export default function Ticks({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <div aria-hidden="true" className={cx(styles.ticks, styles[tone])}>
      {Array.from({ length: 24 }, (_, i) => (
        <i key={i} className={i % 6 === 0 ? styles.major : undefined} />
      ))}
    </div>
  );
}
