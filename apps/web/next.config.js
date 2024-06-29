/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['ui', 'merch-helpers'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "clubs.ntu.edu.sg",
        pathname: "/csec/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "clubs.ntu.edu.sg",
        pathname: "/csec/**",
      },
      {
        protocol: "https",
        hostname: "cdn.ntuscse.com",
        pathname: "/merch/products/images/**",
      },
      {
        protocol:"https",
        hostname: "api.qrserver.com",
        pathname: "/merch/order/**"
      },
      {
        protocol:"http",
        hostname: "localhost",
        port: "3003",
        pathname: "/**"
      }
    ],
  },
};

module.exports = nextConfig;
