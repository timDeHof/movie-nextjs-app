// @ts-check
const { withExpo } = require('@expo/next-adapter');
/** @type {import('next').NextConfig} */
const nextConfig = withExpo({
  reactStrictMode: true,
  transpilePackages: ['react-native', 'expo'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
    ],
  },
  typescript: { ignoreBuildErrors: true }, //
});

module.exports = nextConfig;
