import RevealOnScroll from '@/components/RevealOnScroll'

const phases = [
  {
    num: '01',
    name: 'Visibility Audit',
    timeline: 'Free — 48 hours',
    description:
      'We audit your current AI search presence and map the competitive gap. Three AI platforms, your top five patient personas, ten specialty queries per persona. You see exactly where your practice is not appearing and why, before any engagement.',
  },
  {
    num: '02',
    name: 'Authority Build',
    timeline: 'Months 1 through 4',
    description:
      'We engineer the content, citations, and entity signals that cause AI models to cite your practice by name. Not blog posts for volume — specific, structured content that answers the exact questions your patients ask AI before they call anyone.',
  },
  {
    num: '03',
    name: 'Inquiry Architecture',
    timeline: 'Months 3 through 6',
    description:
      'We redesign how patient inquiries are captured, qualified, and converted. The right patient finds your practice through AI, arrives educated, and converts at a higher rate. We measure in inquiries, conversions, and revenue — not impressions.',
  },
]

export default function ProcessV2() {
  return (
    <section
      id="process"
      className="px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-stone)' }}
      aria-label="How Verve works"
    >
      <div className="mx-auto max-w-5xl">

        {/* Section label */}
        <RevealOnScroll>
          <div className="flex items-center gap-6 mb-20">
            <p
              className="font-mono text-xs font-medium uppercase tracking-[0.2em]"
              style={{ color: 'var(--color-label-text)' }}
            >
              How It Works
            </p>
            <div
              style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-ink-rule)' }}
              aria-hidden="true"
            />
          </div>
        </RevealOnScroll>

        {/* Phase rows */}
        {phases.map((phase, i) => (
          <RevealOnScroll key={phase.num} delay={i * 60}>
            <div
              className="grid grid-cols-1 gap-8 py-14 lg:grid-cols-[2rem_9rem_1fr] lg:gap-x-12"
              style={{ borderTop: '1px solid var(--color-ink-rule)' }}
            >
              {/* Dot column */}
              <div className="hidden lg:flex items-start justify-center pt-2" aria-hidden="true">
                <div
                  className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-cinnabar)' }}
                />
              </div>

              {/* Left: number + title */}
              <div>
                <p
                  className="font-display font-normal leading-none mb-4"
                  style={{
                    fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
                    color: 'var(--color-ink)',
                    letterSpacing: '-0.04em',
                  }}
                >
                  {phase.num}
                </p>
                <p
                  className="font-display font-normal leading-snug"
                  style={{
                    fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
                    color: 'var(--color-ink)',
                    letterSpacing: '-0.015em',
                  }}
                >
                  {phase.name}
                </p>
                <p
                  className="font-mono mt-2 text-xs font-medium uppercase tracking-[0.1em]"
                  style={{ color: 'var(--color-cinnabar)' }}
                >
                  {phase.timeline}
                </p>
              </div>

              {/* Right: description */}
              <p
                className="font-body font-light leading-relaxed self-center"
                style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)', maxWidth: '60ch' }}
              >
                {phase.description}
              </p>
            </div>
          </RevealOnScroll>
        ))}

        {/* Closing rule */}
        <div
          style={{ height: '1px', backgroundColor: 'var(--color-ink-rule)' }}
          aria-hidden="true"
        />

      </div>
    </section>
  )
}
