/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  env: {
    SERVER_URL: "https://fiverr-back.shoha-coder.uz",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "fiverr-back.shoha-coder.uz",
        port: "3001",
      },
    ],
    unoptimized: true
  },
  
};

module.exports = nextConfig;  