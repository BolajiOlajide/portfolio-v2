"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon, LinkedInLogoIcon, Share1Icon, TwitterLogoIcon } from "@radix-ui/react-icons";

import styles from "./social-share.module.scss";

interface SocialShareProps {
  title: string;
  url: string;
  summary?: string;
}

// Ruled share strip: label cell + X / LinkedIn / Copy link cells (+ native share where supported).
export function SocialShare({ title, url, summary }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && "share" in navigator);
  }, []);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedSummary = encodeURIComponent(summary || title);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}`;

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title, url, text: summary || title });
    } catch {
      console.log("Share cancelled or failed");
    }
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      console.log("Copy failed");
    }
  };

  return (
    <div className={styles.share}>
      <h2 className={styles.title}>Share this article</h2>
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className={styles.button}>
        <TwitterLogoIcon width={16} height={16} aria-hidden="true" />X / Twitter
      </a>
      <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className={styles.button}>
        <LinkedInLogoIcon width={16} height={16} aria-hidden="true" />
        LinkedIn
      </a>
      <button type="button" onClick={handleCopyLink} className={styles.button}>
        {copied ? <CheckIcon width={16} height={16} aria-hidden="true" /> : <CopyIcon width={16} height={16} aria-hidden="true" />}
        <span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
      </button>
      {canShare && (
        <button type="button" onClick={handleNativeShare} className={styles.button}>
          <Share1Icon width={16} height={16} aria-hidden="true" />
          Share
        </button>
      )}
    </div>
  );
}
