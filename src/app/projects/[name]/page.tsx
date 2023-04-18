import { notFound } from "next/navigation";
import Link from "next/link";
import descriptions from "@lib/project-descriptions";
import { getRepo } from "@lib/github";
import uppercase from "@lib/uppercase";
import FormatDate from "@components/format-date";

type Params = { params: { name: string } };

export async function generateMetadata({ params }: Params) {
 const repo = await getRepo(params.name);
 if (!repo?.name) return { title: "Project Not Found" };

 const name = uppercase(repo.name).join(" ");
 return {
  title: name,
  description: repo.description ?? "No description available.",
  keywords: repo.topics ?? [],
 };
}

export const revalidate = 86400;
export default async function Page({ params }: Params) {
 const repo = await getRepo(params.name);

 if (!repo?.name) {
  return notFound();
 }

 const summary = descriptions[repo.name];

 return (
  <div className="mt-6 space-y-6">
   <p>{repo.description ?? "No description available."}</p>
   {!summary ? null : <p>{summary}</p>}
   <div className="flex flex-wrap items-center gap-2 lowercase">
    <Link
     className="text-tw-gray hover:text-tw-black focus:text-tw-black dark:hover:text-tw-white dark:focus:text-tw-white"
     target="_blank"
     rel="noreferrer noopener"
     href={repo.html_url}
    >
     source
    </Link>
    {repo.homepage && (
     <>
      <span>•</span>
      <Link
       className="text-tw-gray hover:text-tw-black focus:text-tw-black dark:hover:text-tw-white dark:focus:text-tw-white"
       target="_blank"
       href={repo.homepage}
      >
       website
      </Link>
     </>
    )}
   </div>
   {repo.topics.length === 0 ? null : (
    <div className="flex flex-wrap gap-2 text-sm text-gray">
     {repo.topics.map((topic) => (
      <span key={topic}>{`#${topic}`}</span>
     ))}
    </div>
   )}
   <hr className="border-tw-gray border-px border-solid" />
   <div className="text-sm text-tw-gray">
    Created at <FormatDate date={repo.created_at} />
   </div>
  </div>
 );
}
