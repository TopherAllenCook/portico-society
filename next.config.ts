import type { NextConfig } from 'next'

const SECURITY_HEADERS = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // Starter CSP. Loose enough for Tailwind inline styles, Cal.com embed, and Vercel previews.
  // Tighten once a CSP-report endpoint is wired.
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.cal.com https://cal.com https://*.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "media-src 'self' data: https:",
      "connect-src 'self' https://app.cal.com https://cal.com https://api.cal.com https://*.supabase.co https://vitals.vercel-insights.com",
      "frame-src 'self' https://app.cal.com https://cal.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      'upgrade-insecure-requests',
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'fastly.picsum.photos' },
    ],
  },
  async redirects() {
    return [
      // Orphan service pages (old design experiments). Canonical surface is /pricing.
      { source: '/services', destination: '/pricing', permanent: true },
      { source: '/services-2', destination: '/pricing', permanent: true },
      // Calculator now lives embedded on / and as the Bundle Builder on /pricing.
      { source: '/calculator', destination: '/pricing', permanent: true },
      // Old name fragments.
      { source: '/work', destination: '/pricing', permanent: true },
      { source: '/case-studies', destination: '/', permanent: false },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: SECURITY_HEADERS,
      },
    ]
  },
}

export default nextConfig
