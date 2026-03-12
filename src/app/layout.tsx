import type { Metadata } from 'next';
import { Orbitron, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers/Providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'NemmFX — Professional Forex Trading Tools',
    template: '%s | NemmFX',
  },
  description:
    'NemmFX is your trusted source for professional forex trading tools, Expert Advisors, and algorithmic trading products. Built by CharlessDev.',
  keywords: [
    'forex',
    'trading',
    'expert advisor',
    'EA',
    'MT5',
    'algorithmic trading',
    'NemmFX',
    'Money Maker',
  ],
  authors: [{ name: 'CharlessDev', url: 'https://charless-dev.vercel.app' }],
  openGraph: {
    title: 'NemmFX — Professional Forex Trading Tools',
    description:
      'Your trusted source for professional forex trading tools and Expert Advisors.',
    url: 'https://nemmfx.vercel.app',
    siteName: 'NemmFX',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NemmFX — Professional Forex Trading Tools',
    description:
      'Your trusted source for professional forex trading tools and Expert Advisors.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
