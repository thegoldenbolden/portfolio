import type { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '~/components/project-card';
import { Observer } from '~/hooks/observer';
import { type Track, getRecentlyListened, projects } from '~/utils';
import {
  GithubIcon,
  LinkedinIcon,
  PlayIcon,
  TwitterIcon,
} from '~/components/icons';

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
                <TwitterIcon className="transition-transform group-hover:scale-125" />
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
      <section className="flex flex-col gap-3 px-4 py-8 md:col-start-2">
        <div className="sticky top-0 z-50 flex items-center justify-between gap-2 px-4 py-6 text-sm font-medium uppercase tracking-wider backdrop-blur-md md:static md:backdrop-blur-sm">
          <h2>Listening to</h2>
          <Link
            className="text-xs font-bold text-foreground/75 underline underline-offset-2 hover:text-foreground"
            href="/music"
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

async function MostRecent(): Promise<JSX.Element> {
  const tracks = await getRecentlyListened();
  const track = tracks?.[0]?.track;

  if (!track) {
    return <p className="px-3">Not listening to anything</p>;
  }

  return (
    <article className="grid grid-cols-[max-content_1fr] gap-6 rounded-md p-4 text-accent">
      <span className="self-start border border-primary">
        <AlbumCover images={track.album.images} name={track.album.name} />
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

function AlbumCover(album: Track['track']['album']): React.ReactNode {
  if (!album.images[0]) return null;

  return (
    <Image
      alt={`${album.name} album cover`}
      height={64}
      src={album.images[0].url}
      width={64}
    />
  );
}
