import RevealOnScroll from './RevealOnScroll'

export default function SelectedWork() {
  return (
    <section
      className="relative px-6 py-24 lg:px-16 lg:py-40"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-label="Selected work"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'oklch(14% 0.006 30 / 0.4)' }}
            >
              Selected Work
            </p>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'oklch(14% 0.006 30 / 0.1)' }}
              aria-hidden="true"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div
            className="grid grid-cols-1 gap-8 py-16 lg:grid-cols-2"
            style={{ borderTop: '1px solid oklch(14% 0.006 30 / 0.1)' }}
          >
            {[
              {
                category: 'Longevity Medicine',
                location: 'New England',
                result: 'Appeared in AI recommendations for "longevity clinic" + city within 68 days. Inquiry volume increased 3.1x. Average inquiry quality measurably higher: patients arrived having already researched the protocols.',
              },
              {
                category: 'Concierge Medicine',
                location: 'Pacific Northwest',
                result: 'Patient acquisition cost reduced by 54% over six months. Membership retention increased from 71% to 89% at the 12-month mark. Practice now operates with a waitlist.',
              },
            ].map(({ category, location, result }) => (
              <div
                key={category}
                className="p-8 lg:p-10"
                style={{ backgroundColor: 'var(--color-stone)' }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <p
                    className="font-mono text-xs font-medium tracking-[0.12em] uppercase"
                    style={{ color: 'var(--color-cinnabar)' }}
                  >
                    {category}
                  </p>
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{ backgroundColor: 'oklch(14% 0.006 30 / 0.2)' }}
                    aria-hidden="true"
                  />
                  <p
                    className="font-mono text-xs font-medium tracking-[0.1em]"
                    style={{ color: 'oklch(14% 0.006 30 / 0.35)' }}
                  >
                    {location}
                  </p>
                </div>
                <p
                  className="font-body font-light leading-relaxed"
                  style={{ fontSize: '0.9375rem', color: 'oklch(14% 0.006 30 / 0.65)' }}
                >
                  {result}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <p
            className="font-body font-light text-sm mt-6"
            style={{ color: 'oklch(14% 0.006 30 / 0.35)' }}
          >
            Client names withheld by agreement. Results available for discussion during the audit review.
          </p>
        </RevealOnScroll>

      </div>
    </section>
  )
}
