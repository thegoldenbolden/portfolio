import { cache } from 'react';

const init: RequestInit = {
  headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
  next: { revalidate: 86400 },
};

export type Repository = {
  name: string;
  html_url: string;
  description: string | null;
  pushed_at: string;
  updated_at: string;
  created_at: string;
  visibility: 'public' | 'private';
  homepage: string | null;
  forks_count: number;
  archived: boolean;
  topics: string[];
};

export const baseUrl = 'https://api.github.com';

export const getRepos = cache(async function getRepos(): Promise<Repository[]> {
  const url = new URL('/search/repositories', baseUrl);
  url.searchParams.set('q', 'archived:false user:thegoldenbolden');
  url.searchParams.set('sort', 'pushed');
  url.searchParams.set('direction', 'desc');

  const response = await fetch(url.href, init);
  if (!response.ok) throw response;
  const data = await response.json();
  return data.items ?? [];
});
