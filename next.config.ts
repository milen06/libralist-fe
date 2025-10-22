import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["deepskyblue-lobster-291494.hostingersite.com", "robohash.org", "localhost:8000"],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/uploads/**',
      },
    ],
  }
};

export default nextConfig;
