import DownloadCard from "app/components/download-card";
import Label from "app/components/label";
import Prose from "app/components/prose";
import UnderlineLink from "app/components/underline-link";
import type { ShapeKind } from "app/components/shape";
import styles from "./tapestry.module.scss";

const RELEASES = "https://github.com/BolajiOlajide/tapestry-releases/releases";

// The installers keep the same names in every release, so these always point
// at the newest one.
const DOWNLOADS = [
  {
    platform: "macOS",
    shape: "circle" as ShapeKind,
    file: "Tapestry-macOS.pkg",
    details: "VST3 and Audio Unit. macOS 11 or later, Apple Silicon and Intel.",
  },
  {
    platform: "Windows",
    shape: "triangle" as ShapeKind,
    file: "Tapestry-Windows-Setup.exe",
    details: "VST3. Windows 10 or later, 64-bit.",
  },
];

// Shown beside the buttons when there is a published release; the page still
// works without it, so a failed lookup just leaves the version out.
async function latestVersion(): Promise<string | null> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/BolajiOlajide/tapestry-releases/releases/latest",
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) return null;

    const release = await response.json();
    return typeof release.tag_name === "string" ? release.tag_name.replace(/^v/, "") : null;
  } catch {
    return null;
  }
}

export default async function Tapestry() {
  const version = await latestVersion();

  return (
    <div className={`container ${styles.body}`}>
      <img
        className={styles.screenshot}
        src="/media/tapestry/tapestry.jpg"
        alt="Tapestry's window: a timeline of delay taps above a row of tap cards, with feedback and mix controls along the bottom."
        width={1600}
        height={1040}
      />

      <section className={styles.downloads} aria-label="Downloads">
        {DOWNLOADS.map(({ platform, file, details, shape }) => (
          <DownloadCard
            key={file}
            platform={platform}
            shape={shape}
            details={details}
            file={file}
            href={`${RELEASES}/latest/download/${file}`}
          />
        ))}
      </section>

      <p className={styles.meta}>
        {version && <>Version {version} · </>}
        <UnderlineLink href={RELEASES} tone="indigo" persistent>
          Release notes, checksums and older versions
        </UnderlineLink>
      </p>

      <div className={styles.details}>
        <div className={styles.detailsLabel}>
          <Label shape="square">Details</Label>
        </div>
        <Prose className={styles.prose}>
          <h2>What it does</h2>
          <ul>
            <li>Drag taps on the timeline, or type exact times. Taps snap to note values when synced to your project tempo, with swing.</li>
            <li>Switch on a filter, pitch shift or modulation per tap with its F, P and M buttons; the controls only appear when you use them.</li>
            <li>Feed any taps back into the delay, with tone and drive on the feedback path.</li>
            <li>Tap a rhythm in, start from a pattern, or quantize and humanize what you have.</li>
            <li>Ducking, A/B comparison, undo, presets, and light and dark appearance.</li>
          </ul>

          <h2>Installing</h2>
          <p>
            Open the installer and follow the steps. It puts the plugins in the
            standard system folders, so your DAW finds them after its next plugin
            scan.
          </p>
          <p>
            The Windows installer isn't signed yet, so Windows may show a
            SmartScreen warning. Choose <strong>More info</strong>, then{" "}
            <strong>Run anyway</strong>.
          </p>
        </Prose>
      </div>
    </div>
  );
}
