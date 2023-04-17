import { getRepos } from "@lib/github";

export default async function sitemap() {
 const routes = ["", "/projects", "/collab", "/contact"].map((route) => ({
  url: `https://jacobbolden.com${route}`,
  lastModified: new Date().toISOString().split("T")[0],
 }));

 let projects: { url: string; lastModified: string }[] = [];

 try {
  const repos = await getRepos();

  repos?.map((repo) => {
   projects = [
    ...projects,
    {
     url: `https://jacobbolden.com/projects/${repo.name}`,
     lastModified: repo.pushed_at,
    },
   ];
  });
 } catch (error) {
  console.error("Sitemap: Failed to get repos - ", error);
 }

 return [...routes, ...projects];
}
