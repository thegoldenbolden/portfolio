const requestInit: RequestInit = {
 headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
 next: { revalidate: 86400 },
};

type Repository = {
 name: string;
 html_url: string;
 description: string | null;
 pushed_at: string;
 updated_at: string;
 created_at: string;
 homepage: string | null;
 forks_count: number;
 archived: boolean;
 topics: string[];
};

export const GITHUB_API = "https://api.github.com";
export const GITHUB_REPOS = `${GITHUB_API}/users/thegoldenbolden/repos?type=all&sort=pushed&direction=desc`;
export const getGithubRepo = (repo: string) =>
 `${GITHUB_API}/repos/thegoldenbolden/${repo}`;

export async function getRepos(): Promise<Repository[] | null> {
 try {
  const response = await fetch(GITHUB_REPOS, requestInit);
  if (!response.ok) throw response;
  if (response.status > 299 || response.status < 200) {
   throw new Error(response.statusText);
  }
  return response.json();
 } catch (error) {
  console.error(error);
  return null;
 }
}

export async function getRepo(repo: string): Promise<Repository | null> {
 try {
  const response = await fetch(getGithubRepo(repo), requestInit);
  if (!response.ok) throw response;
  if (response.status > 299 || response.status < 200) {
   throw new Error(response.statusText);
  }
  return response.json();
 } catch (error) {
  console.error(error);
  return null;
 }
}
