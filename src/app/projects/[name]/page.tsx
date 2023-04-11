import { notFound } from "next/navigation";
import Link from "next/link";
import descriptions from "@lib/project-descriptions";
import { getRepo } from "@lib/github";
import uppercase from "@lib/uppercase";
import FormatDate from "@components/format-date";

type Params = { params: { name: string } };
export const revalidate = 259200;

export async function generateMetadata({ params }: Params) {
 const repo = await getRepo(params.name);
 if (!repo?.name) return { title: "Project Not Found" };

 const name = uppercase(repo.name).join(" ");
 return {
  title: name,
  description: repo.description ?? "No description available.",
 };
}

export default async function Page({ params }: Params) {
 const project = await getRepo(params.name);

 if (!project?.name) {
  return notFound();
 }

 const summary = descriptions[project.name];

 return (
  <div className="mt-6 space-y-6">
   <p>{project.description ?? "No description available."}</p>
   {!summary ? null : <p>{summary}</p>}
   <div className="flex flex-wrap items-center gap-2 lowercase">
    <Link
     className="text-tw-gray hover:text-tw-white focus:text-tw-white rounded-md"
     target="_blank"
     rel="noreferrer noopener"
     href={project.html_url}
    >
     source
    </Link>
    {project.homepage && (
     <Link
      className="text-tw-gray hover:text-tw-white focus:text-tw-white rounded-md"
      target="_blank"
      href={project.homepage}
     >
      website
     </Link>
    )}
   </div>
   <div className="text-sm text-tw-gray">
    Created at <FormatDate date={project.created_at} />
   </div>
  </div>
 );
}
