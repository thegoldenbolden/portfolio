import { getRepos } from "@lib/github";
import Breadcrumb from "./breadcrumb";

export async function generateStaticParams() {
 console.log("Generating static params");
 const repos = await getRepos();
 if (!repos) return [];
 return repos.map((repo) => ({ name: repo.name }));
}

export default function Layout({ children }: { children?: React.ReactNode }) {
 return (
  <>
   <Breadcrumb />
   {children}
  </>
 );
}
