import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MarkedMuse - Coming Soon | Independent Music & Creative Community Hub',
  description: 'MarkedMuse is building the ultimate platform for independent musicians and creatives to grow their audience, connect with their community, and showcase their art. Join the waitlist today.',
  keywords: 'independent music, creative community, musicians, artists, music platform, creative hub',
  openGraph: {
    title: 'MarkedMuse - Coming Soon',
    description: 'The future of creative communities is coming. Join the waitlist.',
    url: 'https://markedmuse.com',
    siteName: 'MarkedMuse',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MarkedMuse - Coming Soon',
    description: 'The future of creative communities is coming. Join the waitlist.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}