"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";

import { cx } from "misc/utils";
import Mark from "./mark";
import NowPlaying, { usePreview } from "./now-playing";
import styles from "./nav.module.scss";

const ITEMS = ["blog", "uses", "music", "projects", "recognitions"];

// A post sits under blog; the Tapestry page sits under projects.
function activeSection(pathname: string) {
  const first = pathname.split("/")[1] || "";
  return first === "tapestry" ? "projects" : first;
}

// Dark top bar: mark | ruled link cells | now-playing. Below 900px the links collapse into a dropdown.
export function Navbar() {
  const pathname = usePathname();
  const active = activeSection(pathname);
  const [open, setOpen] = useState(false);
  const preview = usePreview();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.header}>
      {preview.audio}
      <nav className={styles.nav} aria-label="Main">
        <Mark onClick={() => setOpen(false)} />

        <ul className={styles.links}>
          {ITEMS.map((name) => (
            <li key={name}>
              <Link
                href={`/${name}`}
                className={cx(styles.link, active === name && styles.active)}
                aria-current={active === name ? "page" : undefined}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <NowPlaying {...preview} className={styles.np} />

        <button
          type="button"
          className={styles.toggle}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <Cross1Icon width={22} height={22} /> : <HamburgerMenuIcon width={22} height={22} />}
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className={styles.dropdown}>
          {ITEMS.map((name) => (
            <li key={name}>
              <Link
                href={`/${name}`}
                className={cx(styles.dropLink, active === name && styles.dropActive)}
                aria-current={active === name ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {name}
              </Link>
            </li>
          ))}
          <li className={styles.dropNp}>
            <NowPlaying {...preview} />
          </li>
        </ul>
      )}
    </header>
  );
}
