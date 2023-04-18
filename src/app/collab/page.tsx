import type { Session } from "next-auth";
import type { Metadata } from "next";
import nextDynamic from "next/dynamic";
import { Suspense } from "react";
import Link from "next/link";

import { SPOTIFY_TRACK, SPOTIFY_USER } from "@lib/spotify";
import { getRecommendations } from "@lib/prisma";
import RemoveButton from "./remove";
import getUser from "@lib/get-user";

export const metadata: Metadata = {
 title: "Collab",
 description: "Help me discover more music",
};

export const dynamic = "force-dynamic";
const Form = nextDynamic(() => import("./form"));
export default async function Page() {
 const session = await getUser();
 return (
  <div
   className={`grid grid-cols-auto gap-6 ${
    session?.user ? "sm:grid-cols-2" : ""
   }`}
  >
   {session?.user && session?.access_token && <Form />}
   <Suspense fallback={<span>Loading recommendations..</span>}>
    {/** @ts-expect-error Server Component */}
    <Recommendations user={session?.user} />
   </Suspense>
  </div>
 );
}

async function Recommendations({ user }: { user?: Session["user"] }) {
 const recommendations = await getRecommendations();
 if (!recommendations) {
  return (
   <p className="text-base">There was an error getting recommendations.</p>
  );
 }

 if (recommendations.length === 0) {
  return <p className="text-base">No recommendations have been made yet.</p>;
 }

 return (
  <ul className="flex flex-col gap-2 text-sm overflow-hidden">
   {recommendations.map((rec) => {
    return (
     <li key={rec.id} className="text-sm flex gap-px">
      {rec.user.username === user?.name && <RemoveButton id={rec.id} />}
      <div className="flex flex-col gap-px">
       <Link
        className="text-tw-secondary hover:underline focus:underline"
        href={`${SPOTIFY_TRACK}/${rec.track.id}`}
        target="_blank"
        rel="noreferrer noopener"
       >
        {rec.track.name}
       </Link>
       <div>
        {rec.anonymous ? (
         <span className="text-tw-gray">Anonymous: </span>
        ) : (
         <Link
          className="text-tw-gray hover:underline focus:underline"
          href={`${SPOTIFY_USER}/${rec.username}`}
          target="_blank"
          rel="noreferrer noopener"
         >
          {rec.username}
         </Link>
        )}
        {rec.content && <p className="inline break-words">: {rec.content}</p>}
       </div>
      </div>
     </li>
    );
   })}
  </ul>
 );
}
