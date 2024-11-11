/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.jacobbolden.com',
        pathname: '/**'
      }
    ],
  },
};

module.exports = nextConfig;
