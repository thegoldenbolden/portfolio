/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.jacobbolden.com',
        pathname: '/**'
      }
    ],
  },
};

module.exports = nextConfig;
