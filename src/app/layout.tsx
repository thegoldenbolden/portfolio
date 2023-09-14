import ActiveLink from '@/components/active-link';
import { Nunito } from 'next/font/google';
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
  colorScheme: 'dark light',
  keywords: ['jacob bolden', 'portfolio', 'developer'],
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

export const font = Nunito({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${font.variable}`}>
      <body className="bg-background font-body leading-8 text-foreground">
        <div className="mx-auto flex max-w-screen-sm flex-col gap-8 px-4 lg:px-0">
          <header className="flex flex-col gap-4">
            <nav>
              <ul className="flex flex-wrap items-center gap-4 py-2">
                <li>
                  <ActiveLink href="/">Home</ActiveLink>
                </li>
                <li>
                  <ActiveLink href="/projects">Projects</ActiveLink>
                </li>
                <li>
                  <ActiveLink href="/resume">Resume</ActiveLink>
                </li>
              </ul>
            </nav>
          </header>
          <main className="flex flex-col gap-8 py-8">{props.children}</main>
        </div>
      </body>
    </html>
  );
}
