import { ImageResponse } from 'next/og'
import { getPostMeta, getPostSlugs } from '@/lib/blog'

// Node runtime (not edge): the card reads post frontmatter via lib/blog, which uses fs.
export const alt = 'Verve MD blog post'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export default async function BlogOgImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostSlugs().includes(slug) ? getPostMeta(slug) : null
  const category = post?.category ?? 'Field notes'
  const title = post?.title ?? 'Verve MD Blog'
  const minutes = post?.readingMinutes ?? 0
  // Scale the headline down as the title grows so it never overflows the card.
  const titleSize = title.length > 54 ? 58 : title.length > 38 ? 68 : 80

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f1ead9',
          padding: '72px',
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        {/* Logo lockup */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '14px',
              background: '#211c18',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <span
              style={{
                fontSize: '52px',
                fontWeight: 600,
                color: '#f1ead9',
                letterSpacing: '-2px',
                lineHeight: 1,
                marginTop: '-4px',
              }}
            >
              V
            </span>
            <span
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                width: '10px',
                height: '10px',
                borderRadius: '5px',
                background: '#d68d63',
              }}
            />
          </div>
          <span style={{ fontSize: '30px', color: '#211c18', fontWeight: 600, letterSpacing: '-1px' }}>
            Verve <span style={{ color: '#a14823', fontStyle: 'italic' }}>MD</span>
          </span>
        </div>

        {/* Eyebrow + title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p
            style={{
              fontSize: '26px',
              color: '#a14823',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              margin: 0,
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 500,
            }}
          >
            {category}
          </p>
          <h1
            style={{
              fontSize: `${titleSize}px`,
              color: '#211c18',
              lineHeight: 1.05,
              letterSpacing: '-2px',
              margin: 0,
              fontWeight: 600,
              maxWidth: '1000px',
            }}
          >
            {title}
          </h1>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '24px',
            borderTop: '1px solid #21281c33',
          }}
        >
          <span style={{ fontSize: '22px', color: '#211c18', opacity: 0.7, fontFamily: 'system-ui, sans-serif' }}>
            vervemd.com/blog
          </span>
          <span style={{ fontSize: '22px', color: '#211c18', opacity: 0.7, fontFamily: 'system-ui, sans-serif' }}>
            {minutes ? `${minutes} min read` : 'Free audit'}
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
