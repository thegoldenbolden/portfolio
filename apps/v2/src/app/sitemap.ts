import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = ['', '/projects'].map(
    (route) => ({
      url: `https://jacobbolden.com${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    }),
  );

  return routes;
}
