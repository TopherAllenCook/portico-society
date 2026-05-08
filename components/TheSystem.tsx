import RevealOnScroll from './RevealOnScroll'

const nodes = [
  {
    label: 'Traffic',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    label: 'Messaging',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: 'Conversion',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="22" />
        <line x1="2" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
  {
    label: 'Tracking',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
]

export default function TheSystem() {
  return (
    <section
      className="relative px-6 py-28 lg:px-16 lg:py-44"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-label="The Verve system framework"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <p
            className="font-mono mb-10 text-xs font-medium uppercase tracking-[0.18em]"
            style={{ color: 'var(--color-label-text)' }}
          >
            The Foundation
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:items-center">

          {/* Left: copy */}
          <div>
            <RevealOnScroll>
              <h2
                className="font-display font-normal leading-tight mb-8"
                style={{
                  fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
                  color: 'var(--color-ink)',
                  letterSpacing: '-0.025em',
                }}
              >
                You don&apos;t need more marketing.{' '}
                <em style={{ color: 'var(--color-cinnabar)', fontStyle: 'italic' }}>
                  You need a system.
                </em>
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={80}>
              <p
                className="font-body font-light leading-relaxed mb-5"
                style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)', maxWidth: '48ch' }}
              >
                Most practices add more traffic, more campaigns, or more tools without fixing the foundation.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={130}>
              <p
                className="font-body font-light leading-relaxed mb-10"
                style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)', maxWidth: '48ch' }}
              >
                We connect your traffic, messaging, conversion, and tracking into a single system engineered to generate consistent, qualified leads.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={180}>
              <div
                className="px-5 py-4"
                style={{ border: '1px solid oklch(14% 0.006 30 / 0.12)' }}
              >
                <p
                  className="font-body"
                  style={{ fontSize: '0.9375rem', color: 'var(--color-ink)', lineHeight: 1.65 }}
                >
                  <strong className="font-medium">So every part of your marketing works together,</strong>{' '}
                  <span style={{ color: 'var(--color-body-text)', fontWeight: 300 }}>
                    not against each other.
                  </span>
                </p>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right: system diagram */}
          <RevealOnScroll delay={160}>
            <div className="relative mx-auto" style={{ maxWidth: '340px', width: '100%' }} aria-hidden="true">

              {/* Browser chrome */}
              <div
                style={{
                  border: '1px solid oklch(14% 0.006 30 / 0.12)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-ivory)',
                  boxShadow: '0 4px 24px oklch(14% 0.006 30 / 0.06)',
                }}
              >
                {/* Traffic lights */}
                <div
                  className="flex items-center gap-1.5 px-4 py-3"
                  style={{ borderBottom: '1px solid oklch(14% 0.006 30 / 0.1)' }}
                >
                  {['oklch(62% 0.18 25)', 'oklch(72% 0.14 78)', 'oklch(62% 0.16 138)'].map((color, i) => (
                    <div
                      key={i}
                      style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color, opacity: 0.75 }}
                    />
                  ))}
                </div>

                {/* 2×2 grid with center hub overlay */}
                <div
                  style={{
                    position: 'relative',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gridTemplateRows: '1fr 1fr',
                    gap: '1px',
                    backgroundColor: 'oklch(14% 0.006 30 / 0.08)',
                  }}
                >
                  {nodes.map(({ label, icon }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center justify-center gap-2 py-9"
                      style={{ backgroundColor: 'var(--color-ivory)' }}
                    >
                      <div style={{ color: 'var(--color-cinnabar)', opacity: 0.7 }}>
                        {icon}
                      </div>
                      <span
                        className="font-mono uppercase"
                        style={{
                          fontSize: '0.6rem',
                          letterSpacing: '0.1em',
                          color: 'var(--color-label-text)',
                        }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}

                  {/* Hub */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      backgroundColor: 'var(--color-ink)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                </div>

              </div>
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  )
}
