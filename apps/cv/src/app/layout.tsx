import { GeistSans as font } from "geist/font/sans";
import type { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/react"
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://cv.jacobbolden.com'),
  title: {
    default: 'Jacob Bolden',
    template: '%s • Jacob Bolden',
  },
  description: "Hi, I'm Jacob. I like building things for the web.",
  applicationName: 'Jacob Bolden',
  keywords: ['jacob bolden', 'portfolio', 'developer', 'resume'],
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
      <body className="select:text-primary-foreground bg-background text-foreground">
        <div className="mx-auto max-w-screen-md">
          {props.children}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
