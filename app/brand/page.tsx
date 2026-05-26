import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brand Assets',
  robots: { index: false, follow: false },
}

const ASSETS = [
  {
    name: 'Wordmark, Light',
    file: '/brand/wordmark-light.svg',
    bg: 'var(--color-ivory)',
    note: 'Default. Use on ivory, sand, or other warm light surfaces.',
  },
  {
    name: 'Wordmark, Dark',
    file: '/brand/wordmark-dark.svg',
    bg: 'var(--color-ink)',
    note: 'Use on charcoal, deep terracotta, or photographic dark backgrounds.',
  },
  {
    name: 'Wordmark, Mono',
    file: '/brand/wordmark-mono.svg',
    bg: 'var(--color-ivory)',
    note: 'Single-color contexts (one-color print, embossing, faxes).',
  },
  {
    name: 'Square mark',
    file: '/brand/mark.svg',
    bg: 'var(--color-ivory)',
    note: 'For avatars, favicons, app icons. 1:1 ratio.',
  },
]

export default function BrandPreview() {
  return (
    <main
      style={{
        background: 'var(--color-ivory)',
        color: 'var(--color-ink)',
        minHeight: '100vh',
        padding: '64px 48px 96px',
        fontFamily: 'var(--font-body)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <header style={{ marginBottom: 48, borderBottom: '1px solid var(--color-ink-rule)', paddingBottom: 24 }}>
          <p
            style={{
              fontSize: 12,
              letterSpacing: '0.2em',
              fontWeight: 500,
              color: 'var(--color-label-text)',
              marginBottom: 12,
            }}
          >
            INTERNAL · BRAND ASSETS
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Verve MD identity
          </h1>
          <p style={{ fontSize: 17, color: 'var(--color-body-text)', marginTop: 12, maxWidth: 720 }}>
            Wordmark in Fraunces. Cinnabar accent reserved for the &ldquo;MD&rdquo; only.
            Download any SVG below, or run <code>npm run brand:export</code> for retina PNGs.
          </p>
        </header>

        {/* LinkedIn banner */}
        <section style={{ marginBottom: 64 }}>
          <SectionHeader title="LinkedIn banner" dim="1584 × 396" />
          <p style={{ fontSize: 14, color: 'var(--color-body-text)', marginBottom: 16 }}>
            Personal-profile cover dimensions. For company-page cover (1128 × 191), the right pillar column
            crops out cleanly. Test in a browser at 100% zoom before exporting.
          </p>
          <div
            style={{
              border: '1px solid var(--color-ink-rule)',
              maxWidth: 1056,
              aspectRatio: '1584/396',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/linkedin-banner.svg"
              alt="Verve MD LinkedIn banner"
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          </div>
          <a
            href="/brand/linkedin-banner.svg"
            download
            style={{
              display: 'inline-block',
              marginTop: 16,
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--color-cinnabar)',
              borderBottom: '1px solid var(--color-cinnabar)',
              paddingBottom: 2,
            }}
          >
            Download SVG
          </a>
        </section>

        {/* Wordmark variants */}
        <section style={{ marginBottom: 64 }}>
          <SectionHeader title="Wordmark + mark" dim="vector · scales to any size" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
              gap: 24,
            }}
          >
            {ASSETS.map((a) => (
              <article
                key={a.file}
                style={{
                  border: '1px solid var(--color-ink-rule)',
                  background: 'white',
                }}
              >
                <div
                  style={{
                    background: a.bg,
                    padding: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 220,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.file}
                    alt={a.name}
                    style={{ maxWidth: '85%', maxHeight: 140, height: 'auto', display: 'block' }}
                  />
                </div>
                <div style={{ padding: 20, borderTop: '1px solid var(--color-ink-rule)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 20,
                        fontWeight: 600,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {a.name}
                    </h3>
                    <a
                      href={a.file}
                      download
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        letterSpacing: '0.1em',
                        color: 'var(--color-cinnabar)',
                      }}
                    >
                      SVG ↓
                    </a>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--color-body-text)', marginTop: 6 }}>{a.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Palette */}
        <section style={{ marginBottom: 32 }}>
          <SectionHeader title="Palette" dim="hex · for non-CSS contexts (Canva, Figma, print)" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 16,
            }}
          >
            {PALETTE.map((c) => (
              <div key={c.name} style={{ border: '1px solid var(--color-ink-rule)' }}>
                <div style={{ background: c.hex, height: 96, borderBottom: '1px solid var(--color-ink-rule)' }} />
                <div style={{ padding: 12 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16 }}>{c.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-body-text)' }}>
                    {c.hex}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--color-body-text)', marginTop: 4 }}>{c.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

function SectionHeader({ title, dim }: { title: string; dim: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: 16,
        borderBottom: '1px solid var(--color-ink-rule)',
        paddingBottom: 12,
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h2>
      <span
        style={{
          fontSize: 12,
          letterSpacing: '0.15em',
          color: 'var(--color-label-text)',
          fontWeight: 500,
        }}
      >
        {dim.toUpperCase()}
      </span>
    </div>
  )
}

const PALETTE = [
  { name: 'Ink', hex: '#211c18', role: 'Primary text + dark surfaces' },
  { name: 'Ivory', hex: '#f1ead9', role: 'Primary background' },
  { name: 'Cinnabar', hex: '#a14823', role: 'Accent; use sparingly' },
  { name: 'Cinnabar pale', hex: '#d68d63', role: 'Accent on dark surfaces' },
  { name: 'Sand', hex: '#e6d9b8', role: 'Editorial accent block' },
  { name: 'Stone', hex: '#e0d8c8', role: 'Section dividers' },
]
