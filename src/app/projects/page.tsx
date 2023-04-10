import type { Metadata } from "next";
import Link from "next/link";

import FormatDate from "@components/format-date";
import { FlameIcon } from "@components/icons";
import { getRepos } from "@lib/github";

const featured = {
 pokebinder: 1,
 versus: 1,
};

export const metadata: Metadata = {
 title: "Projects",
 description: "A list of projects I've worked on",
};

// Every 3 days
export const revalidate = 259200;

export default async function Page() {
 const projects = await getRepos();

 if (!projects?.[0]) {
  return <main>No projects found.</main>;
 }

 const sortByFeatured = projects.sort((project) =>
  featured[project.name.toLowerCase()] ? -1 : 1
 );

 return (
  <ul className="flex flex-col mt-2 gap-2 pb-6">
   {sortByFeatured.map((project) => {
    const name = project.name.toLowerCase();

    return (
     <li key={project.name} className="flex flex-col gap-px">
      <div className="flex flex-wrap gap-2 items-center">
       <Link href={`/projects/${project.name}`} className="flex flex-col gap-2">
        <span className="capitalize">{name.replaceAll("-", " ")}</span>
       </Link>
       {featured[name] && <FlameIcon className="text-tw-secondary w-4 h-4" />}
      </div>
      <span className="text-sm text-tw-gray">
       Updated at&nbsp;
       <FormatDate date={project.pushed_at} />
      </span>
     </li>
    );
   })}
  </ul>
 );
}
