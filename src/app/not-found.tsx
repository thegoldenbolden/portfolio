import Link from "next/link";

export default function NotFound() {
 return (
  <>
   <h2 className="text-2xl">Page Not Found</h2>
   <Link className="hover:underline focus:underline" href="/">
    Back to Home
   </Link>
  </>
 );
}
