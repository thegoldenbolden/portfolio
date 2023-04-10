import type { Metadata } from "next";

type SearchParams = {
 searchParams: {
  error: string;
 };
};

export const metadata: Metadata = {
 title: "Oops..",
};

export default function Page({ searchParams }: SearchParams) {
 return (
  <>
   <h1 className="text-2xl">Uh oh..</h1>
   <p>Error: {searchParams.error}</p>
  </>
 );
}
