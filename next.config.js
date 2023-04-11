/** @type {import("next").NextConfig} */

const nextConfig = {
 reactStrictMode: true,
 swcMinify: true,
 experimental: {
  appDir: true,
 },
 images: {
  formats: ["image/avif", "image/webp"],
  remotePatterns: [
   {
    protocol: "https",
    hostname: "i.scdn.co",
    pathname: "/**",
   },
   {
    protocol: "https",
    hostname: "avatars.githubusercontent.com",
    pathname: "/**",
   },
  ],
 },
};

module.exports = nextConfig;
