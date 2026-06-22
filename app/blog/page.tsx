import type { Metadata } from 'next'
import Link from 'next/link'
import NavVerve from '@/components/verve/NavVerve'
import FooterVerve from '@/components/verve/FooterVerve'
import { getAllPosts } from '@/lib/blog'

const BASE_URL = 'https://www.vervemd.com'
const BLOG_URL = `${BASE_URL}/blog`

const TITLE = 'Blog'
const DESC =
  'Field notes on AI search, lead generation, and marketing systems for home service businesses. How plumbing, HVAC, electrical, and roofing companies get found and book more jobs.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: BLOG_URL },
  openGraph: {
    title: `${TITLE} · Verve MD`,
    description: DESC,
    url: BLOG_URL,
    type: 'website',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} · Verve MD`,
    description: DESC,
    images: ['/twitter-image'],
  },
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ]
  return `${months[m - 1]} ${d}, ${y}`
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${BLOG_URL}#blog`,
        url: BLOG_URL,
        name: 'Verve MD Blog',
        description: DESC,
        publisher: { '@id': `${BASE_URL}#organization` },
        blogPost: posts.map((p) => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: `${BASE_URL}/blog/${p.slug}`,
          datePublished: p.date,
          dateModified: p.updated,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { name: 'Home', item: BASE_URL },
          { name: 'Blog', item: BLOG_URL },
        ].map((entry, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: entry.name,
          item: entry.item,
        })),
      },
    ],
  }

  return (
    <>
      <NavVerve light />
      <main>
        <section
          className="px-6 pt-32 pb-12 lg:px-16 lg:pt-40 lg:pb-16"
          style={{ background: 'var(--color-ivory)' }}
        >
          <div className="mx-auto max-w-4xl">
            <p
              className="text-xs font-medium uppercase tracking-[0.22em]"
              style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
            >
              Field notes
            </p>
            <h1
              className="mt-4 font-display font-semibold"
              style={{
                fontSize: 'clamp(2.25rem, 5.5vw, 3.75rem)',
                color: 'var(--color-ink)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                maxWidth: '20ch',
              }}
            >
              How home service businesses get{' '}
              <span style={{ color: 'var(--color-cinnabar)', fontStyle: 'italic' }}>found</span>.
            </h1>
            <p
              className="mt-6 text-base leading-relaxed"
              style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', maxWidth: '56ch' }}
            >
              {DESC}
            </p>
          </div>
        </section>

        <section
          className="px-6 pb-24 lg:px-16 lg:pb-32"
          style={{ background: 'var(--color-ivory)' }}
        >
          <div className="mx-auto max-w-4xl">
            {posts.length === 0 ? (
              <p style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}>
                New posts are on the way.
              </p>
            ) : (
              <ul style={{ borderTop: '1px solid var(--color-ink-rule)' }}>
                {posts.map((p) => (
                  <li key={p.slug} style={{ borderBottom: '1px solid var(--color-ink-rule)' }}>
                    <Link href={`/blog/${p.slug}`} className="group block py-8">
                      <div
                        className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.18em]"
                        style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
                      >
                        <span style={{ color: 'var(--color-cinnabar-dark)' }}>{p.category}</span>
                        <span aria-hidden="true">·</span>
                        <time dateTime={p.date}>{formatDate(p.date)}</time>
                        <span aria-hidden="true">·</span>
                        <span>{p.readingMinutes} min read</span>
                      </div>
                      <h2
                        className="mt-3 font-display font-medium transition-colors group-hover:text-[var(--color-cinnabar)]"
                        style={{
                          fontSize: 'clamp(1.4rem, 2.6vw, 2rem)',
                          color: 'var(--color-ink)',
                          letterSpacing: '-0.02em',
                          lineHeight: 1.15,
                          maxWidth: '26ch',
                        }}
                      >
                        {p.title}
                      </h2>
                      <p
                        className="mt-3 text-base leading-relaxed"
                        style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', maxWidth: '64ch' }}
                      >
                        {p.description}
                      </p>
                      <span
                        className="mt-4 inline-flex items-center gap-1 text-sm font-medium"
                        style={{ color: 'var(--color-cinnabar-dark)', fontFamily: 'var(--font-body)' }}
                      >
                        Read post
                        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <FooterVerve />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
    </>
  )
}
