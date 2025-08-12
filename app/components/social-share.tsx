'use client';

import { useState, useEffect } from 'react';
import { Share1Icon, TwitterLogoIcon, LinkedInLogoIcon, CopyIcon, CheckIcon } from '@radix-ui/react-icons';

interface SocialShareProps {
  title: string;
  url: string;
  summary?: string;
}

export function SocialShare({ title, url, summary }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCanShare(typeof navigator !== 'undefined' && 'share' in navigator);
  }, []);

  const shareData = {
    title,
    url,
    text: summary || title,
  };

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedSummary = encodeURIComponent(summary || title);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}`;

  const handleNativeShare = async () => {
    if (canShare && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Share cancelled or failed');
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.log('Copy failed');
    }
  };

  if (!mounted) {
    return (
      <div className="social-share">
        <h3 className="social-share__title">Share this article</h3>
        <div className="social-share__buttons">
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="social-share__button social-share__button--twitter"
            aria-label="Share on Twitter"
          >
            <TwitterLogoIcon />
            <span>Twitter</span>
          </a>
          
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="social-share__button social-share__button--linkedin"
            aria-label="Share on LinkedIn"
          >
            <LinkedInLogoIcon />
            <span>LinkedIn</span>
          </a>

          <button
            className="social-share__button social-share__button--copy"
            aria-label="Copy link"
            disabled
          >
            <CopyIcon />
            <span>Copy Link</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="social-share">
      <h3 className="social-share__title">Share this article</h3>
      <div className="social-share__buttons">
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="social-share__button social-share__button--twitter"
          aria-label="Share on Twitter"
        >
          <TwitterLogoIcon />
          <span>Twitter</span>
        </a>
        
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="social-share__button social-share__button--linkedin"
          aria-label="Share on LinkedIn"
        >
          <LinkedInLogoIcon />
          <span>LinkedIn</span>
        </a>

        <button
          onClick={handleCopyLink}
          className="social-share__button social-share__button--copy"
          aria-label="Copy link"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>

        {canShare && (
          <button
            onClick={handleNativeShare}
            className="social-share__button social-share__button--native"
            aria-label="Share via device"
          >
            <Share1Icon />
            <span>Share</span>
          </button>
        )}
      </div>
    </div>
  );
}
