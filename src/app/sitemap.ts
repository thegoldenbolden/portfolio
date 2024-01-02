import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    '',
    '/projects',
    '/music'
  ].map((route) => ({
    url: `https://jacobbolden.com${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return routes;
}
