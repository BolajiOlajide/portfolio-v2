import Label from "./label";
import styles from "./post-header.module.scss";

type Props = {
  title: string;
  date: string;
  dateTime?: string;
  readingTime?: string;
};

// Article title block on the 12-col grid: date + reading time left, 64px title cols 3-11.
export default function PostHeader({ title, date, dateTime, readingTime }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.meta}>
        <Label shape="square">
          <time dateTime={dateTime}>{date}</time>
        </Label>
        {readingTime && (
          <Label tone="muted" size="micro">
            {readingTime}
          </Label>
        )}
      </div>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}
