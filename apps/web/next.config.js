/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'clubs.ntu.edu.sg',
        pathname: '/csec/wp-content/uploads/**'
      }
    ]
  }
}

const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM(nextConfig);
