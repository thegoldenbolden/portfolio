import type { Metadata } from "next";
import { LogoutButton } from "@components/buttons/auth";

export const metadata: Metadata = {
 title: "Logout",
};

export default async function Page() {
 return (
  <>
   <h1 className="text-2xl">Logout</h1>
   <p className="mb-6">Thanks for checking this out!</p>
   <LogoutButton />
  </>
 );
}
