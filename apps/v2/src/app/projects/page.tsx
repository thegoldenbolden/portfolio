import type { Metadata } from 'next';
import Link from 'next/link';
import { RightArrowIcon } from '~/components/icons';
import { Project } from '~/components/project-card';
import { projects } from '~/utils';

export const metadata: Metadata = {
  title: 'Projects',
  description: "A list of projects I've worked on",
  alternates: {
    canonical: 'https://jacobbolden.com/projects',
  },
};

export default function Page(): React.ReactNode {
  const now = projects.filter((p) => p.status === 'now');
  const past = projects.filter((p) => p.status === 'past');

  return (
    <main className="my-24 px-3 xl:px-0">
      <div className="flex flex-wrap items-center gap-2 text-sm font-medium uppercase tracking-wide text-foreground/75">
        <Link
          href="/"
          className="hover:text-foreground focus-visible:text-foreground"
        >
          Jacob Bolden
        </Link>
        <RightArrowIcon className="size-4" />
        <h1 className="text-foreground">Projects</h1>
      </div>
      <section className="my-12 flex flex-col gap-4">
        <h2 className="sticky top-0 z-50 py-4 text-sm font-medium uppercase tracking-wider text-foreground/75 backdrop-blur-sm">
          Now
        </h2>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {now.map((project) => {
            return <Project key={project.name} project={project} />;
          })}
        </ul>
      </section>
      <section className="my-12 flex flex-col gap-4">
        <h2 className="sticky top-0 z-50 py-4 text-sm font-medium uppercase tracking-wider text-foreground/75 backdrop-blur-sm">
          Past
        </h2>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {past.map((project) => {
            return <Project key={project.name} project={project} />;
          })}
        </ul>
      </section>
    </main>
  );
}
