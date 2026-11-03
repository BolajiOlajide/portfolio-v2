"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";

import photo1 from "assets/images/photo-1.jpg";
import photo2 from "assets/images/photo-2.png";
import photo3 from "assets/images/photo-3.jpg";

import Label from "./label";
import LetterGrid, { type Cell } from "./letter-grid";
import Ticks from "./ticks";
import styles from "./home-hero.module.scss";

const PHOTOS: StaticImageData[] = [photo1, photo2, photo3];

// The name as one composition: the first O is the circle, the A in OLAJIDE the
// triangle, and BOLAJI closes with the square.
const NAME: Cell[][] = [
  ["B", { shape: "circle" }, "L", "A", "J", "I", { shape: "square" }],
  ["O", "L", { shape: "triangle" }, "J", "I", "D", "E"],
];

// Homepage hero on ink: name LetterGrid + grayscale portrait (colour on hover) + role label, ruler beneath.
export default function HomeHero() {
  // Start from a fixed photo so server and client markup match, then pick one at random.
  const [photo, setPhoto] = useState(PHOTOS[0]);
  useEffect(() => setPhoto(PHOTOS[Math.floor(Math.random() * PHOTOS.length)]), []);

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.name}>
          <span className="sr-only">Bolaji Olajide</span>
          <LetterGrid rows={NAME} size={112} />
        </h1>
        <div className={styles.side}>
          <Image
            src={photo}
            alt="Portrait of Bolaji Olajide"
            width={200}
            height={240}
            priority
            className={styles.photo}
          />
          <Label tone="inverse-muted" size="micro">
            Software Engineer · DJ · Producer
          </Label>
        </div>
      </div>
      <Ticks />
    </section>
  );
}
