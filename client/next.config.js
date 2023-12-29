/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  env: {
    SERVER_URL: "https://fiverr-back.onrender.com",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fiverr-back.onrender.com",
      },
    ],
    unoptimized: true,
  },
};
module.exports = nextConfig;