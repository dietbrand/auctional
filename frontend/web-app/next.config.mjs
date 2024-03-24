/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.pixabay.com',
        port: '',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  output: 'standalone',
};

export default nextConfig;
