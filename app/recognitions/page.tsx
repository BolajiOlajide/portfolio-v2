import PageHero from "app/components/page-hero";
import ListGroup from "app/components/list-group";
import { SHAPES } from "app/components/shape";
import styles from "app/components/list-page.module.scss";
import { getListContent } from "misc/list-content";

export default function Recognitions() {
  const { intro, groups, outro } = getListContent("app", "recognitions", "content.mdx");

  return (
    <>
      <PageHero index="05" title="Recognitions" cell={80} description={intro.map((p) => <p key={p}>{p}</p>)} />
      <div className={`container ${styles.body}`}>
        {groups.map((g, i) => (
          <ListGroup
            key={g.title}
            index={String(i + 1).padStart(2, "0")}
            shape={SHAPES[i % 3]}
            title={g.title}
            subtitle={g.parent}
            items={g.items}
            order={i}
          />
        ))}
        {outro.map((p) => (
          <p key={p} className={styles.outro}>
            {p}
          </p>
        ))}
      </div>
    </>
  );
}
