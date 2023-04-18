"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";

export default function Breadcrumb() {
 const segment = useSelectedLayoutSegment();
 return (
  <nav aria-label="breadcrumb" className="flex text-2xl flex-wrap gap-2">
   <Link
    href="/projects"
    className={
     segment
      ? "text-tw-gray hover:text-tw-black focus:text-tw-black dark:hover:text-tw-white dark:focus:text-tw-white"
      : "text-tw-black dark:text-tw-white"
    }
   >
    Projects
   </Link>
   {segment && (
    <>
     <span>•</span>
     <span className="capitalize">{segment.replaceAll("-", " ")}</span>
    </>
   )}
  </nav>
 );
}
