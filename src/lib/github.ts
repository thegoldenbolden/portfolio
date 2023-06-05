const init: RequestInit = {
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
  next: {
    revalidate: 86400,
  },
};

type Repository = {
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

export async function getRepos(): Promise<Repository[] | null> {
  const url = new URL('/search/repositories', baseUrl);
  url.searchParams.set('q', 'archived:false user:thegoldenbolden');
  url.searchParams.set('sort', 'pushed');
  url.searchParams.set('direction', 'desc');

  const response = await fetch(url.href, init);
  if (!response.ok) throw response;
  const data = await response.json();
  return data.items;
}

export async function getRepo(repo: string): Promise<Repository | null> {
  const url = new URL(`/repos/thegoldenbolden/${repo}`, baseUrl);
  url.searchParams.set('type', 'all');
  url.searchParams.set('sort', 'updated');
  url.searchParams.set('direction', 'desc');

  const response = await fetch(url.href, init);
  if (!response.ok) throw new Error('failed to fetch');
  return response.json();
}

export async function getReadme(repo: string) {
  const response = await fetch(
    `https://raw.githubusercontent.com/thegoldenbolden/${repo}/master/README.md`,
    init,
  );
  if (!response.ok) throw response;
  return response.text();
}
