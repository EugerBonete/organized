/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
