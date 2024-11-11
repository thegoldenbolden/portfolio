import { GeistSans as font } from 'geist/font/sans';
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.jacobbolden.com'),
  title: {
    default: 'Jacob Bolden',
    template: '%s • Jacob Bolden',
  },
  description: "Hi, I'm Jacob. I like building things for the web.",
  applicationName: 'Jacob Bolden',
  keywords: ['jacob bolden', 'portfolio', 'web developer'],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout(
  props: React.PropsWithChildren,
): React.ReactNode {
  return (
    <html lang="en" className={`${font.className} antialiased`}>
      <body className="select:text-primary-foreground bg-background leading-8 text-foreground selection:bg-primary">
        <div className="mx-auto max-w-screen-lg">
          {props.children}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
