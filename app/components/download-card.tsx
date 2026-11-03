import { cx } from "misc/utils";
import Shape, { MORPH, type ShapeKind } from "./shape";
import styles from "./download-card.module.scss";

type Props = {
  platform: string;
  details?: string;
  file?: string;
  href: string;
  shape?: ShapeKind;
};

// Bordered download cell (Tapestry). Inverts on hover; file name turns yellow.
export default function DownloadCard({ platform, details, file, href, shape = "square" }: Props) {
  return (
    <a href={href} className={cx(styles.card, MORPH)}>
      <span className={styles.top}>
        <span className={styles.label}>Download for</span>
        <Shape kind={shape} size={14} />
      </span>
      <h3 className={styles.platform}>{platform}</h3>
      {details && <p className={styles.details}>{details}</p>}
      {file && (
        <span className={styles.file}>
          <span aria-hidden="true">↓ </span>
          {file}
        </span>
      )}
    </a>
  );
}
