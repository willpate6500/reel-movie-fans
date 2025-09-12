import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: '/photos/**' },
      { pathname: '/img/**' },
    ],
  },
};

export default nextConfig;
