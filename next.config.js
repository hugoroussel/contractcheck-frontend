/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NETWORK: process.env.NETWORK,
  }
}

module.exports = nextConfig
