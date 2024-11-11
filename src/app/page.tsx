import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { projects, socials } from '~/utils';
import {
  GithubIcon,
  LinkedinIcon,
  SpotifyIcon,
  XIcon,
} from '~/components/icons';
import { Project } from '~/components/project-card';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Page(): React.ReactNode {

  return (

    <main>
      <div className="flex flex-col mt-16 items-center gap-8 px-3 md:px-0">
        <Image
          alt="avatar"
          className="size-24"
          height={64}
          src="/images/avatar.png"
          unoptimized
          width={64}
        />
        <h1 className="text-4xl font-bold">Jacob Bolden</h1>
        <p>I enjoy creating things.</p>
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
      </div>

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
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-8">
            {projects.map((p) => (
              <Project className="h-full" key={p.name} project={p} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

