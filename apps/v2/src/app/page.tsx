import type { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '~/components/project-card';
import { Observer } from '~/hooks/observer';
import { projects, socials } from '@repo/utils';
import {
  GithubIcon,
  LinkedinIcon,
  SpotifyIcon,
  XIcon,
} from '@repo/ui/icons';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Page(): React.ReactNode {
  const homeProjects = projects.filter((p) => p.home);

  return (
    <main className="grid gap-4 py-8 md:grid-cols-2 md:px-6">
      <aside className="flex h-full max-h-[80svh] flex-col gap-8 self-start md:sticky md:top-24 md:gap-16">
        <div className="flex flex-col gap-8 px-3 md:px-0">
          <Image
            alt="avatar"
            className="size-12"
            height={64}
            src="/images/avatar.png"
            unoptimized
            width={64}
          />
          <h1 className="text-4xl font-bold">Jacob Bolden</h1>
          <p>I enjoy creating things.</p>
        </div>
        <nav aria-label="in-site jump links" className="hidden md:block">
          <ul className="flex flex-col gap-4">
            <Link
              className="group flex items-center gap-4 self-start rounded-sm"
              data-active="false"
              href="#projects"
            >
              <span className="h-[2px] w-8 bg-primary/35 transition-all group-hover:w-16 group-hover:bg-primary group-focus-visible:w-16 group-focus-visible:bg-primary group-data-[active=true]:w-16 group-data-[active=true]:bg-primary" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Projects
              </span>
            </Link>
            <a
              className="group flex items-center gap-4 self-start rounded-sm"
              href="https://cv.jacobbolden.com"
            >
              <span className="h-[2px] w-8 bg-primary/35 transition-all group-hover:w-16 group-hover:bg-primary group-focus-visible:w-16 group-focus-visible:bg-primary group-data-[active=true]:w-16 group-data-[active=true]:bg-primary" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Resume
              </span>
            </a>
          </ul>
        </nav>
        <nav aria-label="socal media links" className="mt-auto px-3 md:px-0">
          <ul className="flex items-center gap-4">
            <li>
              <a
                className="group block rounded-sm text-foreground/75 transition-colors hover:text-foreground focus-visible:text-foreground"
                href={socials.x}
                rel="noreferrer noopener"
                target="_blank"
              >
                <XIcon className="transition-transform group-hover:scale-125" />
              </a>
            </li>
            <li>
              <a
                className="group block rounded-sm text-foreground/75 transition-colors hover:text-foreground focus-visible:text-foreground"
                href={socials.github}
                rel="noreferrer noopener"
                target="_blank"
              >
                <GithubIcon className="transition-transform group-hover:scale-125" />
              </a>
            </li>
            <li>
              <a
                className="group block rounded-sm text-foreground/75 transition-colors hover:text-foreground focus-visible:text-foreground"
                href={socials.linkedin}
                rel="noreferrer noopener"
                target="_blank"
              >
                <LinkedinIcon className="transition-transform group-hover:scale-125" />
              </a>
            </li>
            <li>
              <a
                className="group block rounded-sm text-foreground/75 transition-colors hover:text-foreground focus-visible:text-foreground"
                href={socials.spotify}
                rel="noreferrer noopener"
                target="_blank"
              >
                <SpotifyIcon className="transition-transform group-hover:scale-125" />
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <section
        className="flex flex-col gap-3 py-8 md:col-start-2"
        id="projects"
      >
        <div className="sticky top-0 z-50 flex items-center justify-between gap-2 px-4 py-6 text-sm font-medium uppercase tracking-wider backdrop-blur-md md:static md:backdrop-blur-sm">
          <h2>Projects</h2>
          <Link
            className="text-xs font-bold text-foreground/75 underline underline-offset-2 hover:text-foreground"
            href="/projects"
          >
            All
          </Link>
        </div>
        <div className="flex flex-col gap-10 px-4">
          <ul className="flex flex-wrap items-center gap-8">
            {homeProjects.map((p) => (
              <Project key={p.name} project={p} />
            ))}
          </ul>
        </div>
      </section>
      <Suspense>
        <Observer />
      </Suspense>
    </main>
  );
}
