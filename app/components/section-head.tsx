import Shape, { type ShapeKind } from "./shape";
import UnderlineLink from "./underline-link";
import styles from "./section-head.module.scss";

type Props = {
  index: string;
  title: string;
  shape?: ShapeKind;
  action?: { label: string; href: string };
};

// Numbered section head on the 12-col grid: [index + shape] [title cols 3-10] [action].
export default function SectionHead({ index, title, shape = "triangle", action }: Props) {
  return (
    <div className={styles.head}>
      <span className={styles.index}>
        <Shape kind={shape} size={12} />
        {index}
      </span>
      <h2 className={styles.title}>{title}</h2>
      {action && (
        <span className={styles.action}>
          <UnderlineLink href={action.href}>{action.label}</UnderlineLink>
        </span>
      )}
    </div>
  );
}
