import RevealOnScroll from './RevealOnScroll'

const objections = [
  {
    doubt:
      'AI has no place in a brand built on discretion.',
    rebuttal:
      'The brands avoiding AI are not protecting quality. They are protecting familiarity. AI is what allows a luxury firm to be more specific — not less. Precision at scale is not a contradiction. It is the only viable strategy left.',
  },
  {
    doubt:
      'We have worked with agencies before. The results never justified the spend.',
    rebuttal:
      'You worked with firms optimized for throughput. Retainers sized for volume. Creative adapted from another client\'s playbook. Portico Society takes a limited number of engagements each year precisely because we do not operate that way.',
  },
  {
    doubt:
      'Luxury buyers cannot be reached through digital channels.',
    rebuttal:
      'Your buyers are on those channels. They are just not responding to the brands that treat digital as a broadcast medium. Specificity, not volume, is what earns attention at that level.',
  },
]

export default function Comparison() {
  return (
    <section
      aria-labelledby="difference-heading"
      style={{ backgroundColor: 'oklch(16% 0.006 35)' }}
    >
      {/* Opening strike */}
      <div className="px-6 pb-0 pt-24 lg:px-16 lg:pt-32">
        <RevealOnScroll>
          <p
            className="font-body mb-10 text-xs font-medium tracking-[0.22em] uppercase"
            style={{ color: 'oklch(92% 0.03 40 / 0.45)' }}
          >
            The Difference
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={80}>
          <h2
            id="difference-heading"
            className="font-display font-normal leading-[0.9] text-parchment"
            style={{ fontSize: 'clamp(2.75rem, 8vw, 7.5rem)' }}
          >
            Most luxury brands
            <br />
            that come to us have
            <br />
            <em style={{ color: 'oklch(92% 0.03 40)', fontStyle: 'italic' }}>
              already tried an agency.
            </em>
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={180}>
          <p
            className="font-body mt-10 max-w-[56ch] text-base font-light leading-relaxed lg:text-lg"
            style={{ color: 'oklch(97% 0.006 62 / 0.45)' }}
          >
            This section is not an argument for why agencies work.
            It is an explanation of why most of them do not — and what we do instead.
          </p>
        </RevealOnScroll>
      </div>

      {/* Objection / Rebuttal pairs */}
      <div className="mt-20 lg:mt-28">
        {objections.map((item, i) => (
          <RevealOnScroll key={i} delay={i * 60}>
            <div
              className="border-t px-6 py-14 lg:grid lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-16 lg:py-20"
              style={{ borderColor: 'oklch(97% 0.006 62 / 0.07)' }}
            >
              {/* The doubt — visitor's voice */}
              <p
                className="font-display mb-8 font-normal italic leading-tight lg:mb-0"
                style={{
                  fontSize: 'clamp(1.5rem, 3.2vw, 2.625rem)',
                  color: 'oklch(97% 0.006 62 / 0.22)',
                }}
              >
                &ldquo;{item.doubt}&rdquo;
              </p>

              {/* The rebuttal — Portico's voice */}
              <p
                className="font-body text-base font-light leading-relaxed lg:text-lg lg:pt-1"
                style={{ color: 'oklch(97% 0.006 62 / 0.78)' }}
              >
                {item.rebuttal}
              </p>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      {/* The Qualifier */}
      <RevealOnScroll>
        <div
          className="border-t px-6 py-16 lg:px-16 lg:py-24"
          style={{ borderColor: 'oklch(97% 0.006 62 / 0.07)' }}
        >
          <div className="max-w-[62ch]">
            <p
              className="font-body mb-6 text-xs font-medium tracking-[0.22em] uppercase"
              style={{ color: 'oklch(92% 0.03 40 / 0.5)' }}
            >
              Who we work with
            </p>
            <p
              className="font-body text-base font-light leading-relaxed lg:text-lg"
              style={{ color: 'oklch(97% 0.006 62 / 0.6)' }}
            >
              Portico Society works with a small number of luxury service brands each year.
              We are selective because precision requires it. If you are looking for an agency
              to execute a campaign on a timeline someone else set, we are not the right firm.
            </p>
            <p
              className="font-body mt-6 text-base font-light leading-relaxed lg:text-lg"
              style={{ color: 'oklch(97% 0.006 62 / 0.6)' }}
            >
              If you are willing to start with a free audit, see what we find, and decide from
              there — that is exactly how we work.
            </p>
            <p
              className="font-display mt-10 font-normal italic leading-snug"
              style={{
                fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
                color: 'oklch(97% 0.006 62 / 0.9)',
              }}
            >
              If this reads as too direct, we understand.
              <br />
              If it reads as exactly right — let&apos;s talk.
            </p>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
