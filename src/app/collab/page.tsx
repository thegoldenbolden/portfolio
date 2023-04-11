import type { Session } from "next-auth";
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";

import { LoginButton, LogoutButton } from "@components/buttons/auth";
import { SPOTIFY_TRACK, SPOTIFY_USER } from "@lib/spotify";
import { getRecommendations } from "@lib/prisma";
import DeleteButton from "./delete-button";
import getUser from "@lib/get-user";
import Form from "./form";

export const metadata: Metadata = {
 title: "Collab",
 description: "Help me discover more music",
 robots: {
  index: true,
  follow: false,
  noimageindex: true,
  googleBot: {
   index: true,
   follow: false,
   noimageindex: true,
  },
 },
};

export const dynamic = "force-dynamic";
export default async function Page() {
 const session = await getUser();

 return (
  <>
   <h1 className="flex text-2xl flex-wrap justify-between items-center gap-2 capitalize mb-6">
    Help me discover more music
    {session?.user ? <LogoutButton /> : <LoginButton />}
   </h1>
   <div
    className={`grid grid-cols-auto gap-6 ${
     session?.user ? "sm:grid-cols-2" : ""
    }`}
   >
    {!session ? null : <Form />}
    <Suspense fallback={<span>Loading recommendations..</span>}>
     {/** @ts-expect-error Server Component */}
     <Recommendations user={session?.user} />
    </Suspense>
   </div>
  </>
 );
}

async function Recommendations({ user }: { user?: Session["user"] }) {
 const recommendations = await getRecommendations();
 if (!recommendations) {
  return <p className="text-sm">There was an error getting recommendations.</p>;
 }

 if (recommendations.length === 0) {
  return <p className="text-sm">No recommendations have been made yet.</p>;
 }

 return (
  <ul className="flex flex-col gap-2 text-sm overflow-hidden">
   {recommendations.map((rec) => {
    return (
     <li key={rec.id} className="text-sm flex gap-px">
      {rec.user.username === user?.name && <DeleteButton id={rec.id} />}
      <div className="flex flex-col gap-px">
       <Link
        className="text-tw-secondary hover:underline focus:underline"
        href={`${SPOTIFY_TRACK}/${rec.track.id}`}
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
