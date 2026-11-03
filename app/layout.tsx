import type { Metadata } from "next";
import { Familjen_Grotesk, Jost } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';

import "../styles/index.scss";

import { baseUrl } from "./sitemap";
import { Navbar } from "./components/nav";
import Footer from "./components/footer";
import SmoothScroll from "./components/smooth-scoll";
import { ogImageFor, siteName } from "misc/metadata";
import { cx } from "misc/utils";
import { SpotifyProvider } from "./context/spotify";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: { canonical: baseUrl },
  title: {
    default: "Bolaji Olajide",
    template: "%s | Bolaji Olajide",
  },
  description: "Software Engineer by Day. DJ by Moonlight.",
  openGraph: {
    title: "Bolaji Olajide",
    description: "Software Engineer by Day. DJ by Moonlight.",
    url: baseUrl,
    siteName,
    locale: "en_US",
    type: "website",
    images: [ogImageFor(siteName)],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bolaji Olajide",
    description: "Software Engineer by Day. DJ by Moonlight.",
    images: [ogImageFor(siteName)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-familjen",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cx(familjen.variable, jost.variable)}>
      <body>
        <SmoothScroll>
          <SpotifyProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SpotifyProvider>
        </SmoothScroll>
      </body>
      <GoogleAnalytics gaId="G-6177H4FL4N" />
    </html>
  );
}
