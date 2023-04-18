"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";

export default function ActiveLink({
 slug,
 children,
}: {
 slug: string;
 children: React.ReactNode;
}) {
 const segment = useSelectedLayoutSegment() || "";
 const className =
  segment === slug
   ? "text-tw-secondary"
   : "text-tw-black dark:text-tw-white transition-colors hover:text-tw-secondary focus-visible:text-tw-secondary";

 return (
  <Link
   className={`lowercase ${className}`}
   aria-label={`go to ${slug}`}
   href={`/${slug}`}
  >
   {children}
  </Link>
 );
}
