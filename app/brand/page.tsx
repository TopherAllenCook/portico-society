import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brand Guide',
  robots: { index: false, follow: false },
}

/* ============================================================
   Verve MD Brand Guide — the cinematic system behind vervemd.com
   Cream / charcoal / teal, with a little orange.
   Space Grotesk (display + body) + Chivo Mono (labels).
   ============================================================ */

const PALETTE = [
  { name: 'Cream', hex: '#F3ECDA', token: '--color-ivory', role: 'Primary background (light sections)' },
  { name: 'Charcoal', hex: '#1F2624', token: '--color-ink', role: 'Primary text + dark sections' },
  { name: 'Teal', hex: '#1F9E93', token: '--color-cinnabar', role: 'Primary accent' },
  { name: 'Teal deep', hex: '#117A70', token: '--color-cinnabar-dark', role: 'Accent text on cream (contrast)' },
  { name: 'Orange', hex: '#EF6A2C', token: '--color-orange', role: 'Secondary accent. A little only.' },
  { name: 'Stone', hex: '#E3D9C1', token: '--color-sand', role: 'Secondary surface + dividers' },
]

const TYPE = [
  { label: 'Display', font: 'Space Grotesk 600', size: '3.75vw (~54px)', sample: 'Own your pipeline', weight: 600, px: 46 },
  { label: 'Heading', font: 'Space Grotesk 500', size: '2.78vw (~40px)', sample: 'Your complete growth matrix', weight: 500, px: 34 },
  { label: 'Statement', font: 'Space Grotesk 500', size: '2.36vw (~34px)', sample: 'Built on how homeowners search now', weight: 500, px: 26 },
  { label: 'Body', font: 'Space Grotesk 400', size: '1.06rem', sample: 'AI search, paid media, and 24/7 lead capture, run as one connected department.', weight: 400, px: 17 },
]

const SIGNATURES = [
  { tag: 'Motion', title: 'Per-character reveal', body: 'Headlines wipe in letter by letter, each glyph flashing from teal to its final color. Easing: easeOutCubic.' },
  { tag: 'Frame', title: 'Crosshair corner ticks', body: 'Media blocks and cards are framed with thin gradient corner ticks that fade outward from each corner.' },
  { tag: 'Label', title: 'Mono section tags', body: 'Every section opens with a Chivo Mono label on a rule with small orange corner brackets.' },
  { tag: 'Action', title: 'Clipped-corner pill', body: 'Primary CTAs use a clipped-corner pill with an orange square bullet. Fills teal on hover.' },
  { tag: 'Image', title: 'Teal / charcoal duotone', body: 'Photography carries a teal-to-charcoal duotone overlay so every photo sits in the palette.' },
  { tag: 'Light', title: 'Soft teal glow', body: 'Dark sections are lit with soft teal radial glows, plus a single faint orange ember in the hero.' },
]

const VOICE = [
  { do: 'Lead with the number or the outcome.', dont: 'Open with throat-clearing or mission-speak.' },
  { do: 'Plain English a contractor respects.', dont: 'Agency jargon, buzzwords, or hype.' },
  { do: 'Confident and direct. Short sentences.', dont: 'Hedging, qualifiers, and filler.' },
]

const ASSETS = [
  { name: 'Wordmark, light', file: '/brand/wordmark-light.svg', bg: 'var(--color-ivory)', note: 'Default. Use on cream, stone, or warm light surfaces.' },
  { name: 'Wordmark, dark', file: '/brand/wordmark-dark.svg', bg: 'var(--color-ink)', note: 'Use on charcoal or photographic dark backgrounds.' },
  { name: 'Wordmark, mono', file: '/brand/wordmark-mono.svg', bg: 'var(--color-ivory)', note: 'One-color contexts: embossing, fax, monochrome print.' },
  { name: 'Square mark', file: '/brand/mark.svg', bg: 'var(--color-ivory)', note: 'Avatars, favicons, app icons. 1:1 ratio.' },
]

const MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--color-label-text)',
}

function Wordmark({ color, size = 34 }: { color: string; size?: number }) {
  return (
    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '0.26em', fontSize: size, color }}>
      VERVE<span style={{ color: 'var(--color-orange)' }}>·</span>MD
    </span>
  )
}

export default function BrandGuide() {
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
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        {/* Header */}
        <header style={{ marginBottom: 64, borderBottom: '1px solid var(--color-ink-rule)', paddingBottom: 28 }}>
          <p style={{ ...MONO, marginBottom: 14 }}>Internal · Brand guide · vervemd.com</p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.6rem, 5vw, 4.25rem)',
              fontWeight: 600,
              lineHeight: 1.04,
              letterSpacing: '-0.02em',
            }}
          >
            Verve MD brand guide
          </h1>
          <p style={{ fontSize: 18, color: 'var(--color-body-text)', marginTop: 16, maxWidth: 760, lineHeight: 1.5 }}>
            The cinematic system behind the live site. Cream and charcoal surfaces, a teal primary accent
            with a little orange, set in Space Grotesk and Chivo Mono. CSS variables in{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 14 }}>app/globals.css</code> are the source of truth.
          </p>
        </header>

        {/* Logo / wordmark */}
        <Section title="Logo" dim="VERVE·MD wordmark">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 28 }}>
            <Frame bg="var(--color-ivory)" label="On cream">
              <Wordmark color="var(--color-ink)" />
            </Frame>
            <Frame bg="var(--color-ink)" label="On charcoal">
              <Wordmark color="var(--color-ivory)" />
            </Frame>
          </div>
          <p style={{ fontSize: 15, color: 'var(--color-body-text)', maxWidth: 720, lineHeight: 1.6 }}>
            Set in Space Grotesk, uppercase, with generous tracking. The dot between{' '}
            <strong style={{ color: 'var(--color-ink)' }}>VERVE</strong> and{' '}
            <strong style={{ color: 'var(--color-ink)' }}>MD</strong> is always orange. It is the one place orange
            appears in the logo. Keep clear space of at least the cap height on every side. Never recolor the
            letters to teal or stretch the tracking shut.
          </p>

          {/* downloads */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginTop: 28 }}>
            {ASSETS.map((a) => (
              <article key={a.file} style={{ border: '1px solid var(--color-ink-rule)' }}>
                <div style={{ background: a.bg, padding: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 150 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.file} alt={a.name} style={{ maxWidth: '82%', maxHeight: 96, height: 'auto', display: 'block' }} />
                </div>
                <div style={{ padding: 16, borderTop: '1px solid var(--color-ink-rule)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600 }}>{a.name}</h3>
                    <a href={a.file} download style={{ ...MONO, color: 'var(--color-cinnabar-dark)', fontSize: 11 }}>
                      SVG ↓
                    </a>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--color-body-text)', marginTop: 6, lineHeight: 1.5 }}>{a.note}</p>
                </div>
              </article>
            ))}
          </div>
          <p style={{ fontSize: 13, color: 'var(--color-label-text)', marginTop: 16 }}>
            Run <code style={{ fontFamily: 'var(--font-mono)' }}>npm run brand:export</code> for retina PNGs.
          </p>
        </Section>

        {/* Color */}
        <Section title="Color" dim="hex + token · cream / charcoal / teal / orange">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {PALETTE.map((c) => (
              <div key={c.name} style={{ border: '1px solid var(--color-ink-rule)' }}>
                <div style={{ background: c.hex, height: 104, borderBottom: '1px solid var(--color-ink-rule)' }} />
                <div style={{ padding: 14 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16 }}>{c.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-body-text)', marginTop: 2 }}>{c.hex}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-label-text)', marginTop: 2 }}>{c.token}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--color-body-text)', marginTop: 8, lineHeight: 1.45 }}>{c.role}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: '16px 18px', border: '1px solid var(--color-ink-rule)', background: 'var(--color-stone)' }}>
            <p style={{ fontSize: 14, color: 'var(--color-body-text)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--color-ink)' }}>Accent rule.</strong> Teal is the primary accent:
              headline emphasis, stats, links, glows, and active states. On cream, use{' '}
              <strong style={{ color: 'var(--color-cinnabar-dark)' }}>teal deep</strong> for text-level contrast.
              Orange is the secondary accent and stays small: the wordmark dot, button square bullets, the icon
              hover blink, and the hero ember. Never use orange for large blocks or body copy.
            </p>
          </div>
        </Section>

        {/* Typography */}
        <Section title="Typography" dim="Space Grotesk + Chivo Mono">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {TYPE.map((t) => (
              <div
                key={t.label}
                style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 24, alignItems: 'baseline', borderBottom: '1px solid var(--color-ink-rule)', paddingBottom: 18 }}
              >
                <div>
                  <div style={{ ...MONO, color: 'var(--color-ink)' }}>{t.label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-label-text)', marginTop: 6 }}>{t.font}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-label-text)' }}>{t.size}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: t.weight, fontSize: t.px, lineHeight: 1.2, letterSpacing: t.px > 24 ? '-0.02em' : '0' }}>
                  {t.sample}
                </div>
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 24, alignItems: 'baseline' }}>
              <div>
                <div style={{ ...MONO, color: 'var(--color-ink)' }}>Label</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-label-text)', marginTop: 6 }}>Chivo Mono 500</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-label-text)' }}>12px · 0.14em · UPPER</div>
              </div>
              <div style={{ ...MONO, color: 'var(--color-cinnabar-dark)', fontSize: 13 }}>Capability coverage · how homeowners search now</div>
            </div>
          </div>
        </Section>

        {/* Design language */}
        <Section title="Design language" dim="the cinematic signatures">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {SIGNATURES.map((s) => (
              <div key={s.title} style={{ border: '1px solid var(--color-ink-rule)', padding: 22, position: 'relative', background: 'var(--color-paper)' }}>
                <span style={{ position: 'absolute', top: -1, left: -1, width: 7, height: 7, borderTop: '1px solid var(--color-orange)', borderLeft: '1px solid var(--color-orange)' }} />
                <div style={{ ...MONO, color: 'var(--color-cinnabar-dark)' }}>{s.tag}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600, marginTop: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--color-body-text)', marginTop: 8, lineHeight: 1.55 }}>{s.body}</p>
              </div>
            ))}
          </div>

          {/* live component specimens */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', marginTop: 24 }}>
            {/* clipped pill */}
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, padding: '11px 18px',
                color: 'var(--color-ink)', border: '1px solid var(--color-ink-ring)', fontSize: 14, fontWeight: 500,
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
              }}
            >
              <span style={{ width: 7, height: 7, background: 'var(--color-orange)', display: 'inline-block' }} />
              Book a free audit
            </span>
            {/* mono tag with bracket */}
            <span style={{ position: 'relative', paddingTop: 10, borderTop: '1px solid var(--color-ink-rule)', display: 'inline-block' }}>
              <span style={{ position: 'absolute', top: -1, left: 0, width: 7, height: 7, borderTop: '1px solid var(--color-orange)', borderLeft: '1px solid var(--color-orange)' }} />
              <span style={MONO}>Capability coverage</span>
            </span>
            {/* teal glow chip */}
            <span style={{ width: 120, height: 44, background: 'radial-gradient(60% 120% at 30% 50%, rgba(40,183,168,0.5), #1f2624 70%)', border: '1px solid var(--color-ink)', display: 'inline-block' }} />
          </div>
        </Section>

        {/* Voice */}
        <Section title="Voice" dim="operator with an edge">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, border: '1px solid var(--color-ink-rule)', background: 'var(--color-ink-rule)' }}>
            <div style={{ ...MONO, color: 'var(--color-cinnabar-dark)', background: 'var(--color-ivory)', padding: '12px 18px' }}>Do</div>
            <div style={{ ...MONO, color: 'var(--color-label-text)', background: 'var(--color-ivory)', padding: '12px 18px' }}>Not</div>
            {VOICE.map((v, i) => (
              <FragmentRow key={i} a={v.do} b={v.dont} />
            ))}
          </div>
        </Section>

        {/* LinkedIn banner */}
        <Section title="LinkedIn banner" dim="1584 × 396">
          <p style={{ fontSize: 14, color: 'var(--color-body-text)', marginBottom: 16, maxWidth: 720, lineHeight: 1.6 }}>
            Personal-profile cover. For the company-page cover (1128 × 191) the right capability column crops out
            cleanly. Test at 100% zoom before exporting.
          </p>
          <div style={{ border: '1px solid var(--color-ink-rule)', maxWidth: 1056, aspectRatio: '1584/396' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/linkedin-banner.svg" alt="Verve MD LinkedIn banner" style={{ width: '100%', height: '100%', display: 'block' }} />
          </div>
          <a href="/brand/linkedin-banner.svg" download style={{ ...MONO, color: 'var(--color-cinnabar-dark)', display: 'inline-block', marginTop: 16 }}>
            Download SVG ↓
          </a>
        </Section>
      </div>
    </main>
  )
}

function FragmentRow({ a, b }: { a: string; b: string }) {
  return (
    <>
      <div style={{ background: 'var(--color-ivory)', padding: '14px 18px', fontSize: 14.5, color: 'var(--color-ink)' }}>{a}</div>
      <div style={{ background: 'var(--color-ivory)', padding: '14px 18px', fontSize: 14.5, color: 'var(--color-body-text)' }}>{b}</div>
    </>
  )
}

function Frame({ bg, label, children }: { bg: string; label: string; children: React.ReactNode }) {
  return (
    <div style={{ border: '1px solid var(--color-ink-rule)' }}>
      <div style={{ background: bg, minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 36 }}>
        {children}
      </div>
      <div style={{ ...MONO, padding: '10px 14px', borderTop: '1px solid var(--color-ink-rule)' }}>{label}</div>
    </div>
  )
}

function Section({ title, dim, children }: { title: string; dim: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 72 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24, borderBottom: '1px solid var(--color-ink-rule)', paddingBottom: 12, position: 'relative' }}>
        <span style={{ position: 'absolute', bottom: -1, left: 0, width: 8, height: 8, borderBottom: '2px solid var(--color-orange)', borderLeft: '2px solid var(--color-orange)' }} />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</h2>
        <span style={{ ...MONO }}>{dim}</span>
      </div>
      {children}
    </section>
  )
}
