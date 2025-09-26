/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    // Add images configuration
    images: {
      domains: ['causeforpaws.in','www.causeforpaws.in'], // Add your VPS domain here
      unoptimized: true,
    },
    // Modify rewrites to handle uploads directory
    async rewrites() {
      return [
        {
          source: '/uploads/:path*',
          destination: '/public/uploads/:path*',
        },
        {
          source: '/assets/images/:path*',
          destination: '/public/assets/images/:path*',
        },
      ];
    },
    // Update headers to include uploads directory
    async headers() {
      return [
        {
          source: '/uploads/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=3600', // Cache uploads for 1 hour
            },
          ],
        },
        {
          source: '/assets/images/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  