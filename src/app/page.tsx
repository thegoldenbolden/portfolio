import {
  GithubIcon,
  LinkedinIcon,
  PlayIcon,
  TwitterIcon,
} from '@/components/icons';
import { Project } from '@/components/project-card';
import { Observer } from '@/hooks/observer';
import { getRecentlyListened, projects } from '@/utils';
import { Suspense } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

const socials = {
  x: 'https://x.com/thagoldenbolden',
  github: 'https://github.com/thegoldenbolden',
  linkedin: 'https://linkedin.com/in/jbolden9',
};

export default function Page() {
  const homeProjects = projects.filter((p) => p.home);

  return (
    <main className="grid gap-4 py-8 md:grid-cols-2 md:px-6">
      <aside className="flex h-full max-h-[80svh] flex-col gap-8 self-start md:sticky md:top-24 md:gap-16">
        <div className="flex flex-col gap-8 px-3 md:px-0">
          <Image
            className="size-12"
            width={64}
            height={64}
            alt="avatar"
            src="/images/avatar.png"
            unoptimized
          />
          <h1 className="text-4xl font-bold">Jacob Bolden</h1>
          <p>I enjoy creating things.</p>
        </div>
        <nav className="hidden md:block" aria-label="in-site jump links">
          <ul className="flex flex-col gap-4">
            <Link
              data-active="false"
              href="#projects"
              className="group flex items-center gap-4 self-start rounded-sm"
            >
              <span className="h-[2px] w-8 bg-primary/35 transition-all group-hover:w-16 group-hover:bg-primary group-focus-visible:w-16 group-focus-visible:bg-primary group-data-[active=true]:w-16 group-data-[active=true]:bg-primary" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Projects
              </span>
            </Link>
            <a
              href="https://cv.jacobbolden.com"
              className="group flex items-center gap-4 self-start rounded-sm"
            >
              <span className="h-[2px] w-8 bg-primary/35 transition-all group-hover:w-16 group-hover:bg-primary group-focus-visible:w-16 group-focus-visible:bg-primary group-data-[active=true]:w-16 group-data-[active=true]:bg-primary" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Resume
              </span>
            </a>
          </ul>
        </nav>
        <nav className="mt-auto px-3 md:px-0" aria-label="socal media links">
          <ul className="flex items-center gap-4">
            <li>
              <a
                className="group block rounded-sm text-foreground/75 transition-colors hover:text-foreground focus-visible:text-foreground"
                target="_blank"
                href={socials.x}
                rel="noreferrer noopener"
              >
                <TwitterIcon className="transition-transform group-hover:scale-125" />
              </a>
            </li>
            <li>
              <a
                className="group block rounded-sm text-foreground/75 transition-colors hover:text-foreground focus-visible:text-foreground"
                target="_blank"
                href={socials.github}
                rel="noreferrer noopener"
              >
                <GithubIcon className="transition-transform group-hover:scale-125" />
              </a>
            </li>
            <li>
              <a
                className="group block rounded-sm text-foreground/75 transition-colors hover:text-foreground focus-visible:text-foreground"
                target="_blank"
                href={socials.linkedin}
                rel="noreferrer noopener"
              >
                <LinkedinIcon className="transition-transform group-hover:scale-125" />
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <section
        id="projects"
        className="flex flex-col gap-3 py-8 md:col-start-2"
      >
        <div className="sticky top-0 z-50 flex items-center justify-between gap-2 px-4 py-6 text-sm font-medium uppercase tracking-wider backdrop-blur-md md:static md:backdrop-blur-sm">
          <h2>Projects</h2>
          <Link
            href="/projects"
            className="text-xs font-bold text-foreground/75 underline underline-offset-2 hover:text-foreground"
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
      <section className="flex flex-col gap-3 px-4 py-8 md:col-start-2">
        <div className="sticky top-0 z-50 flex items-center justify-between gap-2 px-4 py-6 text-sm font-medium uppercase tracking-wider backdrop-blur-md md:static md:backdrop-blur-sm">
          <h2>Listening to</h2>
          <Link
            href="/music"
            className="text-xs font-bold text-foreground/75 underline underline-offset-2 hover:text-foreground"
          >
            Recent
          </Link>
        </div>
        <Suspense>
          <MostRecent />
        </Suspense>
      </section>
    </main>
  );
}

async function MostRecent() {
  const tracks = await getRecentlyListened();
  const track = tracks?.[0]?.track;

  if (!track) {
    return <p className="px-3">Not listening to anything</p>;
  }

  return (
    <article className="grid grid-cols-[max-content_1fr] gap-6 rounded-md p-4 text-accent">
      <span className="self-start border border-primary">
        <Image
          width={64}
          height={64}
          src={track.album.images[0].url}
          alt="avaatr"
        />
      </span>
      <div>
        <h2>{track.name}</h2>
        <p>{track.artists.map((n) => n.name).join(', ')}</p>
      </div>
      <div className="col-span-full flex items-center gap-2 rounded-md border border-primary p-1 px-4 shadow-2xl shadow-primary">
        <PlayIcon />
        <span className="h-1 w-full grow rounded-md bg-primary" />
      </div>
    </article>
  );
}
