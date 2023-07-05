import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    sitemap: 'https://jacobbolden.com/sitemap.xml',
    host: 'https://jacobbolden.com',
    rules: [{ userAgent: '*' }],
  };
}
