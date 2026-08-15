import type { Metadata } from 'next';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/content';
import CustomCursor from '@/components/CustomCursor';
import Grain from '@/components/Grain';
import Loader from '@/components/Loader';
import Header from '@/components/Header';
import TimelineBar from '@/components/TimelineBar';
import SmoothScroll from '@/components/SmoothScroll';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${site.name} — Video Editor`,
  description: `${site.name} is a freelance video editor crafting cinematic stories for brands, artists, and creators.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="font-body antialiased">
        <Grain />
        <CustomCursor />
        <Loader />
        <Header />
        <SmoothScroll>{children}</SmoothScroll>
        <TimelineBar />
      </body>
    </html>
  );
}
