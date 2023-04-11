import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";

import { montserrat } from "@lib/fonts";
import Logo from "@components/logo";
import "./globals.css";

export const metadata: Metadata = {
 metadataBase: new URL("https://jacobbolden.com"),
 title: {
  default: "Jacob Bolden",
  template: "%s | Jacob Bolden",
 },
 description: "Developer",
 applicationName: "Jacob Bolden",
 keywords: "jacob bolden, web developer, portfolio",
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
   <body className="bg-tw-black font-montserrat">
    <div className="flex flex-col sm:flex-row relative px-2 gap-12 pt-32 max-w-screen-md mx-auto text-tw-white">
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
  <aside className="sm:sticky sm:top-6 h-max">
   <nav className="flex flex-wrap sm:flex-col sm:justify-center items-center gap-2">
    <Logo />
    <Link href="/" className="lowercase">
     home
    </Link>
    <Link href="/projects" className="lowercase">
     Projects
    </Link>
    <Link href="/collab" className="lowercase">
     collab
    </Link>
    <Link href="/contact" className="lowercase">
     contact
    </Link>
   </nav>
  </aside>
 );
}