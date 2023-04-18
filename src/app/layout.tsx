import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Link from "@components/active-link";

import { montserrat } from "@lib/fonts";
import Logo from "@components/logo";
import "./globals.css";

export const metadata: Metadata = {
 metadataBase: new URL("https://jacobbolden.com"),
 title: {
  default: "Jacob Bolden",
  template: "%s | Jacob Bolden",
 },
 description: "Hi, I'm Jacob. I like building things for the web.",
 applicationName: "Jacob Bolden",
 keywords: "jacob bolden, web developer, portfolio",
 icons: {
  icon: "/icons/favicon.ico",
  apple: "/icons/apple-icon.png",
 },
 robots: {
  index: true,
  follow: true,
  nocache: true,
  googleBot: {
   index: true,
   follow: true,
   noimageindex: true,
   "max-image-preview": "large",
   "max-snippet": -1,
   "max-video-preview": -1,
  },
 },
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <html lang="en" className={montserrat.variable}>
   <body className="bg-tw-white dark:bg-tw-black font-montserrat">
    <div className="flex flex-col sm:flex-row relative px-6 sm:px-2 gap-12 pt-32 pb-6 max-w-screen-md mx-auto text-tw-black dark:text-tw-white">
     <Navbar />
     <main className="grow">{children}</main>
    </div>
    <Analytics />
   </body>
  </html>
 );
}

function Navbar() {
 return (
  <aside className="sm:sticky sm:top-6 h-max flex items-start sm:items-center justify-center flex-col gap-6">
   <Logo />
   <nav className="flex text-lg flex-wrap sm:flex-col sm:justify-center items-center gap-2">
    <Link slug="">home</Link>
    <Link slug="projects">Projects</Link>
    <Link slug="collab">collab</Link>
    <Link slug="contact">contact</Link>
   </nav>
  </aside>
 );
}
