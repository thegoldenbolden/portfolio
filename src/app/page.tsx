import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  RightArrowIcon,
  SpotifyIcon,
  TwitchIcon,
  TwitterIcon,
} from '@/components/icons';
import Image from 'next/image';
import Link from 'next/link';

const recent = [
  {
    name: 'Wouldry',
    description:
      'A Would You Rather app, built with Next.js, TailwindCSS, Prisma',
    homepage: 'https://www.wouldry.com',
    html_url: 'https://www.github.com/thegoldenbolden/wouldry',
    image: {
      src: '/images/wouldry.png',
      alt: 'wouldry logo',
      height: 256,
      width: 256,
    },
  },
  {
    name: 'Pokefolder',
    visibility: 'public',
    description:
      'An app for finding Pokémon card prices, built with Next.js, TailwindCSS',
    homepage: 'https://www.pokefolder.com',
    html_url: 'https://www.github.com/thegoldenbolden/pokefolder',
    image: {
      src: '/images/pokefolder.png',
      height: 180,
      width: 180,
      alt: 'pokefolder logo',
    },
  },
  {
    name: 'Portfolio',
    visibility: 'public',
    description: "What you're currently looking at, made with Next.js",
    homepage: 'https://www.portfolio.com',
    html_url: 'https://www.github.com/thegoldenbolden/portfolio',
    image: {
      src: '/images/portfolio.png',
      height: 320,
      width: 320,
      alt: 'portfolio logo',
    },
  },
];

export default function Page() {
  return (
    <>
      <section className="flex flex-col gap-8 sm:gap-4">
        <h1 className="text-2xl font-bold">hey, i'm jacob</h1>
        <p>
          I'm a self-taught developer focusing on creating user friendly web
          applications. I like basketball, anime and manga, and music.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Image
            height={320}
            width={320}
            src="/images/portfolio.png"
            className="h-40 w-40"
            alt="my profile picture"
          />
          <div className="flex flex-col gap-2 text-card-foreground">
            <a
              href="https://x.com/thagoldenbolden"
              target="_blank"
              rel="noreferrer noopener"
              className="group flex flex-wrap items-center gap-2 hover:text-ring focus-visible:text-ring"
            >
              <span>follow on x</span>
              <RightArrowIcon className="h-5 w-5 group-hover:motion-safe:animate-bounce-right group-focus-visible:motion-safe:animate-bounce-right" />
            </a>
            <a
              href="https://github.com/thegoldenbolden"
              target="_blank"
              rel="noreferrer noopener"
              className="group flex flex-wrap items-center gap-2 hover:text-ring focus-visible:text-ring"
            >
              follow on github
              <RightArrowIcon className="h-5 w-5 group-hover:motion-safe:animate-bounce-right group-focus-visible:motion-safe:animate-bounce-right" />
            </a>
            <a
              target="_blank"
              rel="noreferrer noopener"
              className="group flex flex-wrap items-center gap-2 hover:text-ring focus-visible:text-ring"
              href="https://linkedin.com/in/jbolden9"
            >
              follow on linkedin
              <RightArrowIcon className="h-5 w-5 group-hover:motion-safe:animate-bounce-right group-focus-visible:motion-safe:animate-bounce-right" />
            </a>
          </div>
        </div>
        <p>
          I am always looking for new opportunities to use my skills and expand
          my knowledge in the tech industry. If you have a position that could
          benefit from my experience and dedication, I would love to hear from
          you and see how we can work together. I look forward to hearing from
          you! 😀
        </p>
      </section>
      <section className="flex flex-col gap-4">
        <ul className="flex flex-col gap-4">
          {recent.map((project) => (
            <li className="grid grid-cols-[max-content_1fr] gap-4 rounded-lg bg-card p-4 outline-none transition-all hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-ring md:hover:scale-105">
              <Image
                quality={100}
                height={project.image.height}
                width={project.image.width}
                alt={project.image.alt}
                src={project.image.src}
                className="h-12 w-12 rounded-full sm:h-24 sm:w-24"
              />
              <div className="flex w-full flex-col gap-2 text-card-foreground">
                <span className="w-min text-base font-semibold text-foreground underline-offset-2 sm:text-lg">
                  {project.name}
                </span>
                <p className="line-clamp-2 text-sm sm:text-base">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    target="_blank"
                    className="text-xs underline-offset-2 hover:underline focus-visible:underline sm:text-sm"
                    href={project.html_url}
                  >
                    View Github
                  </a>
                  <a
                    target="_blank"
                    className="text-xs underline-offset-2 hover:underline focus-visible:underline sm:text-sm"
                    href={project.homepage}
                  >
                    View Live
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="flex flex-col gap-4">
        <p className="text-center">
          If you're interested, check out what I've recently listened to.&nbsp;
          <Link
            href="/music"
            className="inline-flex flex-wrap items-center gap-2 rounded-sm text-card-foreground hover:underline hover:underline-offset-1"
          >
            See music
          </Link>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/thegoldenbolden"
          >
            <GithubIcon />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://x.com/thagoldenbolden"
          >
            <TwitterIcon />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://instagram.com/thegoldenbolden"
          >
            <InstagramIcon />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://linkedin.com/in/jbolden9"
          >
            <LinkedinIcon />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://open.spotify.com/user/thegoldenbolden"
          >
            <SpotifyIcon />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitch.tv/thagoldenbolden"
          >
            <TwitchIcon />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:jlbolden9@gmail.com"
          >
            <MailIcon />
          </a>
        </div>
      </section>
    </>
  );
}
