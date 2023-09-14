import { ExternalLinkIcon, GithubIcon } from '@/components/icons';
import type { Metadata } from 'next';
import { cache } from 'react';

const init: RequestInit = {
  headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
  next: { revalidate: 86400 },
};

type Repository = {
  name: string;
  html_url: string;
  visibility: 'public' | 'private';
  homepage: string | null;
  description: string | null;
  pushed_at?: string;
  updated_at?: string;
  created_at?: string;
  forks_count?: number;
  archived?: boolean;
  topics?: string[];
  image?: {
    src: string;
    alt: string;
    height: number;
    width: number;
  };
};

const baseUrl = 'https://api.github.com';

const getRepos = cache(async function getRepos(): Promise<Repository[]> {
  const url = new URL('/search/repositories', baseUrl);
  url.searchParams.set('q', 'archived:false is:public user:thegoldenbolden');
  url.searchParams.set('sort', 'pushed');
  url.searchParams.set('direction', 'desc');

  const response = await fetch(url.href, init);
  if (!response.ok) throw response;
  const data = await response.json();
  return data.items ?? [];
});

export const metadata: Metadata = {
  title: 'Projects',
  description: "A list of projects I've worked on",
};

export const revalidate = 86400;
export default async function Page() {
  return (
    <>
      <h1 className="mb-8 text-2xl font-bold">Projects</h1>
      <ul className="grid min-h-[75vh] grid-cols-1 gap-4 text-sm sm:grid-cols-2">
        <Repos />
      </ul>
    </>
  );
}

async function Repos() {
  const repos = await getRepos();

  return (
    <>
      {repos
        .filter((r) => r.name !== 'thegoldenbolden')
        .map((repo) => (
          <li className="group flex flex-col gap-2 rounded-md border border-solid border-border bg-card px-3 py-4 transition-all hover:-translate-y-2">
            <h3 className="text-xl font-bold capitalize text-foreground">
              {repo.name}
            </h3>
            <p className="grow text-base text-card-foreground">
              {repo.description ?? 'No description available'}
            </p>
            <div className="flex items-center justify-end gap-4">
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-card-foreground transition-colors hover:text-primary focus-visible:text-primary"
                >
                  <ExternalLinkIcon className="h-5 w-5" />
                </a>
              )}
              {repo.visibility === 'public' && repo.html_url && (
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-card-foreground transition-colors hover:text-primary focus-visible:text-primary"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          </li>
        ))}
    </>
  );
}

function Fallback() {
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`repo-fallback-${i}`}
          className="h-32 w-full bg-card motion-safe:animate-pulse"
        />
      ))}
    </>
  );
}
