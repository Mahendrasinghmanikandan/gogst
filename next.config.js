/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_URL: process.env.DB_URL,
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
