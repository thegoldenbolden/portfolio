import {
  CalendarIcon,
  ExternalLinkIcon,
  FoldersIcon,
  GithubIcon,
  MailIcon,
  RightArrowIcon,
} from '@components/icons';
import Form from './contact/form';
import Link from 'next/link';
import { Repository, getRepos } from '@lib/github';
import { Suspense } from 'react';
import Avatar from '@components/avatar';
import Social, { socials } from '@components/socials';
import { getRecentlyListened } from '@lib/spotify';
import Image from 'next/image';

export const revalidate = 3600;

export default async function Page() {
  return (
    <div className="my-6 md:my-32 flex flex-col gap-6 md:gap-12">
      <section id="about" className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold">hey i'm jacob</h1>
        <div className="flex mt-6 flex-col gap-6">
          <p className="max-w-[480px]">
            I'm a self-taught developer focusing on creating user friendly web
            applications.
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            <Avatar />
            <div className="flex flex-col gap-2 text-card-foreground">
              <a
                href={socials.twitter.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex gap-2 flex-wrap hover:text-foreground focus-visible:text-foreground"
              >
                <span>follow on twitter</span>
                <RightArrowIcon className="w-5 h-5 group-hover:motion-safe:animate-bounce-right group-focus-visible:motion-safe:animate-bounce-right" />
              </a>
              <a
                href={socials.github.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex gap-2 flex-wrap hover:text-foreground focus-visible:text-foreground"
              >
                follow on github
                <RightArrowIcon className="w-5 h-5 group-hover:motion-safe:animate-bounce-right group-focus-visible:motion-safe:animate-bounce-right" />
              </a>
              <a
                target="_blank"
                rel="noreferrer noopener"
                className="group flex gap-2 flex-wrap hover:text-foreground focus-visible:text-foreground"
                href={socials.linkedin.href}
              >
                follow on linkedin
                <RightArrowIcon className="w-5 h-5 group-hover:motion-safe:animate-bounce-right group-focus-visible:motion-safe:animate-bounce-right" />
              </a>
            </div>
            <p className="max-w-screen-sm">
              I am always looking for new opportunities to use my skills and
              expand my knowledge in the tech industry. If you have a position
              that could benefit from my experience and dedication, I would love
              to hear from you and see how we can work together. I look forward
              to hearing from you! 😀
            </p>
          </div>
        </div>
      </section>
      <section id="projects" className="flex flex-col gap-3">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="inline-flex flex-wrap gap-2 items-center text-2xl font-bold">
            <FoldersIcon className="inline w-7 h-7" />
            <span>a couple of projects I've done</span>
          </h2>
          <Link
            href="/projects"
            className="group lowercase py-1.5 flex gap-2 items-center group"
          >
            <span>View more</span>
            <RightArrowIcon className="w-4 h-4 group-hover:motion-safe:animate-bounce-right group-hover:motion-safe:animate-bounce-right" />
          </Link>
        </div>
        <ul className="grid grid-cols-gallery gap-3">
          <Suspense fallback={<Cards />}>
            <Projects filter />
          </Suspense>
        </ul>
      </section>
      <section className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="flex flex-wrap gap-2 items-center text-2xl font-bold">
            <MailIcon className="w-7 h-7" />
            <span>talk to me</span>
          </h2>
          <Link
            href="/resume.pdf"
            className="group lowercase py-1.5 flex gap-2 items-center group"
          >
            <span className="bg-background px-3">View resume</span>
            <RightArrowIcon className="w-4 h-4 group-hover:motion-safe:animate-bounce-right group-hover:motion-safe:animate-bounce-right" />
          </Link>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 md:gap-2">
          <div className="flex flex-col gap-3">
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://calendly.com/jlbolden9/15min"
              className="flex grow justify-center min-h-[2rem] max-h-[3rem] text-white bg-[#006bff] py-1.5 rounded-md items-center gap-2 hover:bg-[#0076ff] focus-visible:bg-[#0076ff] transition-colors"
            >
              <CalendarIcon className="w-6 h-6" />
              <span>schedule a meeting</span>
            </a>
            <div className="flex justify-center items-center relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-px before:w-full before:bg-border">
              <span className="px-3 bg-background rounded-full flex items-center justify-center py-1 text-sm text-card-foreground z-10">
                or
              </span>
            </div>
            <Form />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-3">
              <Avatar className="w-12 h-12" />
              <ul className="flex justify-center grow items-center gap-3 bg-card text-card-foreground border border-border border-solid rounded-full px-6 py-1.5">
                <li>
                  <Social social="twitter" />
                </li>
                <li>
                  <Social social="github" />
                </li>
                <li>
                  <Social social="instagram" />
                </li>
                <li>
                  <Social social="spotify" />
                </li>
                <li>
                  <Social social="twitch" />
                </li>
              </ul>
            </div>
            <div className="rounded-md w-full px-3 flex flex-col gap-2">
              <div className="flex items-center gap-2 py-0.5">
                <Image
                  src="/images/spotify.png"
                  alt="spotify brand logo"
                  height={24}
                  width={24}
                  className="w-6 h-6"
                />
                <h4>Recently Listened</h4>
              </div>
              <Suspense fallback={<TrackFallback />}>
                <RecentlyPlayed />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TrackFallback() {
  return (
    <div className="flex items-center gap-2 py-1.5">
      <div className="motion-safe:animate-pulse w-12 h-12 bg-card" />
      <div className="flex flex-col truncate">
        <span className="motion-safe:animate-pulse bg-card h-6 w-full" />
        <span className="motion-safe:animate-pulse bg-card h-6 w-full" />
      </div>
    </div>
  );
}

async function RecentlyPlayed() {
  const tracks = await getRecentlyListened();
  if (!tracks.length) return <span>Failed to get track</span>;

  return (
    <>
      {tracks.map(({ track }) => (
        <div key={track.id} className="flex items-center gap-2 py-1.5">
          {track.album.images[0].url && (
            <div className="w-12 h-12 aspect-square relative">
              <Image
                src={track.album.images[0].url}
                layout="fill"
                alt={`album cover for ${track.album.name}`}
              />
            </div>
          )}
          <div className="flex flex-col truncate">
            <a
              target="_blank"
              rel="noreferrer noopener"
              href={track.external_urls.spotify}
              className="text-ellipsis overflow-hidden hover:underline focus-visible:underline"
            >
              {track.name}
            </a>
            <div className="text-ellipsis overflow-hidden">
              {track.artists.map((a, i) => (
                <>
                  <a
                    key={a.name}
                    target="_blank"
                    rel="noreferrer noopener"
                    href={a.external_urls.spotify}
                    className="hover:underline focus-visible:underline"
                  >
                    {a.name}
                  </a>
                  {i !== track.artists.length - 1 && ', '}
                </>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export function Cards({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="motion-safe:animate-pulse bg-card h-[150px]" />
      ))}
    </>
  );
}

export async function Projects({ filter }: { filter?: boolean }) {
  const repos = await getRepos();
  const home = ['orgame', 'portfolio', 'pokefolder'];
  const projects = filter ? repos.filter((r) => home.includes(r.name)) : repos;

  return (
    <>
      {projects.map((project) => (
        <Project key={project.name} {...project} />
      ))}
    </>
  );
}

export function Project(props: Repository) {
  return (
    <li className="group bg-card border border-solid border-border flex flex-col gap-3 rounded-md px-3 py-4 hover:-translate-y-2 transition-all">
      <h3 className="text-xl capitalize font-bold text-foreground">
        {props.name}
      </h3>
      <p className="grow text-card-foreground">
        {props.description ?? 'No description available'}
      </p>
      <div className="flex items-center gap-4 justify-end">
        {props.homepage && (
          <a
            href={props.homepage}
            target="_blank"
            rel="noreferrer noopener"
            className="text-card-foreground transition-colors hover:text-primary focus-visible:text-primary"
          >
            <ExternalLinkIcon className="w-5 h-5" />
          </a>
        )}
        {props.visibility === 'public' && props.html_url && (
          <a
            href={props.html_url}
            target="_blank"
            rel="noreferrer noopener"
            className="text-card-foreground transition-colors hover:text-primary focus-visible:text-primary"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
        )}
      </div>
    </li>
  );
}
