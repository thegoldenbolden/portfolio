"use client";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

export const LoginButton = () => {
 return (
  <button
   aria-label="login"
   className="rounded-full text-base bg-tw-spotify px-3 py-2 flex items-center gap-2"
   onClick={() => signIn("spotify", { callbackUrl: "/collab" })}
  >
   <Image src="/images/spotify.png" height={24} width={24} alt="spotify logo" />
   Login with Spotify
  </button>
 );
};

export const LogoutButton = () => {
 return (
  <button
   className="rounded-full text-base bg-tw-spotify px-3 py-2 flex items-center gap-2"
   aria-label="logout"
   onClick={() => signOut({ callbackUrl: "/collab" })}
  >
   <Image src="/images/spotify.png" height={24} width={24} alt="spotify logo" />
   Logout
  </button>
 );
};
