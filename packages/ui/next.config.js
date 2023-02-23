/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "clubs.ntu.edu.sg",
        port: "",
        pathname: "/csec/wp-content/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
