import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import NavVerve from '@/components/verve/NavVerve'
import FooterVerve from '@/components/verve/FooterVerve'
import CTAButton from '@/components/verve/CTAButton'
import AudioNativeVerve from '@/components/verve/AudioNativeVerve'
import { getAllPosts, getPost, getPostSlugs } from '@/lib/blog'

const BASE_URL = 'https://www.vervemd.com'

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]
  return `${months[m - 1]} ${d}, ${y}`
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  if (!getPostSlugs().includes(slug)) return {}
  const post = getPost(slug)
  const url = `${BASE_URL}/blog/${post.slug}`
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${post.title} · Verve MD`,
      description: post.description,
      url,
      type: 'article',
      // og:image is provided by the per-post opengraph-image.tsx route.
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} · Verve MD`,
      description: post.description,
      // twitter:image falls back to the generated og:image.
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!getPostSlugs().includes(slug)) notFound()

  const post = getPost(slug)
  const url = `${BASE_URL}/blog/${post.slug}`

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2)

  const graph: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated,
        inLanguage: 'en-US',
        mainEntityOfPage: url,
        url,
        keywords: post.keyword,
        author: { '@type': 'Organization', name: 'Verve MD', url: BASE_URL },
        publisher: { '@id': `${BASE_URL}#organization` },
        ...(post.hero.src ? { image: `${BASE_URL}${post.hero.src}` } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { name: 'Home', item: BASE_URL },
          { name: 'Blog', item: `${BASE_URL}/blog` },
          { name: post.title, item: url },
        ].map((entry, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: entry.name,
          item: entry.item,
        })),
      },
      ...(post.faq.length
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: post.faq.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: { '@type': 'Answer', text: f.answer },
              })),
            },
          ]
        : []),
    ],
  }

  return (
    <>
      <NavVerve light />
      <main>
        {/* Header */}
        <section
          className="px-6 pt-32 pb-12 lg:px-16 lg:pt-40 lg:pb-16"
          style={{ background: 'var(--color-ivory)' }}
        >
          <div className="mx-auto max-w-3xl">
            <nav
              className="flex items-center gap-2 text-xs"
              style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:underline underline-offset-4">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/blog" className="hover:underline underline-offset-4">Blog</Link>
            </nav>

            <p
              className="mt-8 text-xs font-medium uppercase tracking-[0.22em]"
              style={{ color: 'var(--color-cinnabar-dark)', fontFamily: 'var(--font-body)' }}
            >
              {post.category} · {post.readingMinutes} min read
            </p>

            <h1
              className="mt-4 font-display font-semibold"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: 'var(--color-ink)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                maxWidth: '20ch',
              }}
            >
              {post.title}
            </h1>

            <p
              className="mt-6 text-lg leading-relaxed"
              style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', maxWidth: '60ch' }}
            >
              {post.description}
            </p>

            <p
              className="mt-6 text-sm"
              style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
            >
              By Verve MD · <time dateTime={post.date}>{formatDate(post.date)}</time>
            </p>

            <div className="mt-8">
              <AudioNativeVerve />
            </div>
          </div>
        </section>

        {/* Optional hero image */}
        {post.hero.src ? (
          <section className="px-6 lg:px-16" style={{ background: 'var(--color-ivory)' }}>
            <figure className="mx-auto max-w-4xl">
              <div
                className="relative w-full overflow-hidden rounded-2xl"
                style={{ aspectRatio: '16 / 9' }}
              >
                <Image src={post.hero.src} alt={post.hero.alt} fill className="object-cover" priority sizes="(min-width: 1024px) 56rem, 100vw" />
              </div>
              {post.hero.credit ? (
                <figcaption
                  className="mt-2 text-xs"
                  style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
                >
                  {post.hero.credit}
                </figcaption>
              ) : null}
            </figure>
          </section>
        ) : null}

        {/* Article body */}
        <section
          className="px-6 py-14 lg:px-16 lg:py-20"
          style={{ background: 'var(--color-ivory)' }}
        >
          <div
            className="prose-verve mx-auto max-w-3xl"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </section>

        {/* Conversion CTA */}
        <section
          className="px-6 py-20 lg:px-16 lg:py-28 text-center"
          style={{ background: 'var(--color-cta-surface)' }}
        >
          <div className="mx-auto max-w-2xl">
            <h2
              className="font-display font-semibold"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--color-ivory)', letterSpacing: '-0.025em' }}
            >
              See where your business stands in AI search.
            </h2>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: 'var(--color-body-text-on-dark)', fontFamily: 'var(--font-body)' }}
            >
              A free audit checks how ChatGPT, Claude, and Gemini answer for your trade and city, then shows the gaps to fix. No sales call. In your inbox in about three minutes.
            </p>
            <div className="mt-8 flex justify-center">
              <CTAButton href="/audit" label="Get your free audit" variant="primary" />
            </div>
          </div>
        </section>

        {/* Related posts */}
        {related.length ? (
          <section
            className="px-6 py-16 lg:px-16 lg:py-20"
            style={{ background: 'var(--color-stone)' }}
          >
            <div className="mx-auto max-w-3xl">
              <p
                className="text-xs font-medium uppercase tracking-[0.22em]"
                style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
              >
                Keep reading
              </p>
              <ul className="mt-6 grid gap-6 sm:grid-cols-2">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="block h-full rounded-2xl p-6 transition-colors"
                      style={{ background: 'var(--color-ivory)', border: '1px solid var(--color-ink-rule)' }}
                    >
                      <span
                        className="text-xs font-medium uppercase tracking-[0.18em]"
                        style={{ color: 'var(--color-cinnabar-dark)', fontFamily: 'var(--font-body)' }}
                      >
                        {p.category}
                      </span>
                      <span
                        className="mt-3 block font-display font-medium"
                        style={{ fontSize: '1.2rem', color: 'var(--color-ink)', letterSpacing: '-0.015em', lineHeight: 1.25 }}
                      >
                        {p.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/blog"
                  className="text-sm font-medium underline-offset-4 hover:underline"
                  style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
                >
                  ← All posts
                </Link>
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <FooterVerve />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
    </>
  )
}
