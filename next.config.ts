import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
      },
    ],
  },
  async redirects() {
    return [
      // Orphan service pages (old design experiments). Canonical surface is /pricing.
      { source: '/services', destination: '/pricing', permanent: true },
      { source: '/services-2', destination: '/pricing', permanent: true },
      // Old name fragments.
      { source: '/work', destination: '/pricing', permanent: true },
      { source: '/case-studies', destination: '/', permanent: false },
    ]
  },
}

export default nextConfig
