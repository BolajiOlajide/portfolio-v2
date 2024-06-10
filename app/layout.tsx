import type { Metadata } from 'next';
import { Inter, Unbounded } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import '../styles/index.scss';

import { baseUrl } from './sitemap';
import { Navbar } from './components/nav';
import Footer from './components/footer';
import SmoothScroll from './components/smooth-scoll';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Bolaji Olajide',
    template: '%s | Bolaji Olajide',
  },
  description: 'Software Engineer by Day. DJ by moonlight',
  openGraph: {
    title: 'Bolaji Olajie',
    description: 'Software Engineer by Day. DJ by moonlight',
    url: baseUrl,
    siteName: 'Bolaji Olajie',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(' ');

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const unbounded = Unbounded({
  subsets: ['latin'],
  variable: '--font-unbounded',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={cx(inter.className, unbounded.variable)}
    >
      <body>
        <SmoothScroll>
          <ThemeProvider storageKey='proton-theme'>
            <main>
              <Navbar />
              {children}
              <Footer />
            </main>
          </ThemeProvider>
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
