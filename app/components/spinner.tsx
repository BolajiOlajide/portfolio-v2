import Shape, { SHAPES } from "./shape";
import styles from "./spinner.module.scss";

// Loading: the three shapes pulse in sequence.
export default function Spinner({ size = 14 }: { size?: 8 | 10 | 12 | 14 }) {
  return (
    <span role="status" aria-label="Loading" className={styles.spinner}>
      {SHAPES.map((k) => (
        <Shape key={k} kind={k} size={size} className={styles.pulse} />
      ))}
    </span>
  );
}
