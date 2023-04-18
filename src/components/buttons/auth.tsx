"use client";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

export const LoginButton = () => {
 return (
  <button
   aria-label="login"
   className="rounded-md text-base text-tw-white bg-tw-gray-10 px-3 py-2 flex items-center gap-2 border-2 border-solid border-transparent transition-colors hover:border-tw-spotify focus-visible:border-tw-spotify"
   onClick={() => signIn("spotify")}
  >
   <Image src="/images/spotify.png" height={24} width={24} alt="spotify logo" />
   Login with Spotify
  </button>
 );
};

export const LogoutButton = () => {
 return (
  <button
   className="rounded-md text-base text-tw-white bg-tw-gray-10 px-3 py-2 flex items-center gap-2 border-2 border-solid border-transparent transition-colors hover:border-tw-spotify focus-visible:border-tw-spotify"
   aria-label="logout"
   onClick={() => signOut()}
  >
   <Image src="/images/spotify.png" height={24} width={24} alt="spotify logo" />
   Logout
  </button>
 );
};
