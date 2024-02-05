/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  env: {
    SERVER_URL: "https://fiverr-back.shoha-coder.uz",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fiverr-back.shoha-coder.uz",
      },
    ],
    unoptimized: true,
  },
};
module.exports = nextConfig;