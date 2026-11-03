import type { Metadata } from "next";

import { baseUrl } from "app/sitemap";

export const siteName = "Bolaji Olajide";

type Image = { url: string; width?: number; height?: number; alt?: string };

export const ogImageFor = (title: string): Image => ({
  url: `${baseUrl}/og?title=${encodeURIComponent(title)}`,
  width: 1200,
  height: 630,
  alt: title,
});

// Next.js replaces a parent's openGraph and twitter objects instead of merging
// them, so every page has to restate siteName, locale and the image.
export function pageMetadata({
  title,
  description,
  path,
  image = ogImageFor(title),
}: {
  title: string;
  description: string;
  path: string;
  image?: Image;
}): Metadata {
  const url = `${baseUrl}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "en_US",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
