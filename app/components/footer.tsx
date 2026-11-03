import styles from "./footer.module.scss";

const COLUMNS = [
  {
    title: "Engineering",
    links: [
      { label: "GitHub", href: "https://github.com/BolajiOlajide" },
      {
        label: "Resumé",
        href: "https://drive.google.com/file/d/1OFWfvitVWLn_UDLH-AW4SWr44qTl5gz5/view?usp=sharing",
      },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/bolaji-olajide-95b08777/" },
    ],
  },
  {
    title: "Music",
    links: [
      { label: "SoundCloud", href: "https://soundcloud.com/protonmakesmusic" },
      { label: "Spotify", href: "https://open.spotify.com/user/cooproton" },
      { label: "YouTube", href: "https://www.youtube.com/@beingproton" },
    ],
  },
];

// Dark footer: name with yellow full stop, two ruled link columns, tagline bar.
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <p className={styles.name}>
          Bolaji Olajide<span className={styles.stop}>.</span>
        </p>
        {COLUMNS.map((col) => (
          <div key={col.title} className={styles.col}>
            <h2 className={styles.colTitle}>{col.title}</h2>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.bar}>
        <div className={styles.barInner}>
          <span>Software Engineer | DJ | Music Producer</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
