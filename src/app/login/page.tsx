import type { Metadata } from "next";
import { redirect } from "next/navigation";

import getUser from "@lib/get-user";
import { LoginButton } from "@components/buttons/auth";

export const metadata: Metadata = {
 title: "Login",
 description: "Help me discover music by logging in to Spotify",
};

export default async function Page() {
 const session = await getUser();

 if (session) {
  redirect("/logout");
 }

 return (
  <>
   <h1 className="text-2xl">Login to Spotify</h1>
   <p className="mb-6">Help me discover more music</p>
   <LoginButton />
  </>
 );
}
