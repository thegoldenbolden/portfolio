import { getRepos } from '@lib/github';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    '',
    '/projects',
    '/collab',
    '/contact',
  ].map((route) => ({
    url: `https://jacobbolden.com${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  const projects: MetadataRoute.Sitemap = [];

  try {
    const repos = await getRepos();
    if (!repos) throw Error('No repos found');
    repos.map((repo) => {
      projects.push({
        url: `https://jacobbolden.com/projects/${repo.name}`,
        lastModified: repo.pushed_at,
      });
    });
  } catch (error) {
    console.error('SitemapReposError', error);
  }

  return [...routes, ...projects];
}
