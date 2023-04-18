import { LoginButton, LogoutButton } from "@components/buttons/auth";
import getUser from "@lib/get-user";

export default async function CollabLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 const session = await getUser();

 return (
  <>
   <h1 className="flex text-2xl flex-wrap justify-between items-center gap-2 capitalize mb-6">
    Help me discover more music
    {session?.user ? <LogoutButton /> : <LoginButton />}
   </h1>
   {children}
  </>
 );
}
