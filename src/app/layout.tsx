import { Analytics } from '@vercel/analytics/react';
import ActiveLink from '@components/active-link';
import { montserrat } from '@lib/fonts';
import Avatar from '@components/avatar';
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

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="bg-background text-foreground font-montserrat">
        <main className="max-w-screen-lg mx-auto px-3 grid grid-cols-1 md:grid-cols-[100px_1fr] md:gap-16">
          <aside>
            <nav className="flex flex-row md:flex-col py-12 gap-6 sticky top-0 px-3">
              <div className="flex justify-end">
                <Avatar className="w-12 h-12" />
              </div>
              <div className="flex flex-row md:flex-col items-end gap-2 lowercase">
                <ActiveLink route="/" className="md:text-lg xl:text-xl">
                  home
                </ActiveLink>
                <ActiveLink route="/projects" className="md:text-lg xl:text-xl">
                  Projects
                </ActiveLink>
              </div>
            </nav>
          </aside>
          {props.children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
