/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    ppr: 'incremental',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pingpongranking.s3.us-east-2.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
