import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.vervemd.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/audit', priority: 0.95, changeFrequency: 'weekly' as const },
    { path: '/pricing', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/ai', priority: 0.85, changeFrequency: 'monthly' as const },
    // /kit is gated until the lead-magnet page ships; re-add when it returns 200.
    { path: '/about', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/faq', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'yearly' as const },
    { path: '/security', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
