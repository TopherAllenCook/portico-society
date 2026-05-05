import RevealOnScroll from './RevealOnScroll'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    body: 'We spend the first two weeks auditing your digital presence, your competitor landscape, and your target client\'s actual search behavior. Not assumptions — data. Most luxury brands are losing ground to competitors they have never considered.',
  },
  {
    number: '02',
    title: 'Strategy',
    body: 'We build a 12-month precision marketing roadmap aligned with your calendar, your seasonality, and your revenue goals. Every channel is justified by a specific outcome. Nothing is included because it sounds good.',
  },
  {
    number: '03',
    title: 'Execution',
    body: 'Our team deploys AI-enhanced content, search optimization, and paid campaigns simultaneously. You receive weekly reporting with interpretation, not just data. You should always know exactly what is working and why.',
  },
  {
    number: '04',
    title: 'Compound Growth',
    body: 'We iterate on what earns attention and cut what does not. Luxury marketing compounds: the right positioning today makes every campaign cheaper next quarter. Most clients see meaningful movement within 90 days.',
  },
]

export default function Process() {
  return (
    <section
      id="process"
      className="bg-parchment px-6 py-24 lg:px-16 lg:py-32"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <header className="mb-20 lg:mb-24">
            <p className="font-body mb-4 text-xs font-medium tracking-[0.2em] uppercase text-stone-mid">
              How It Works
            </p>
            <h2
              id="process-heading"
              className="font-display font-normal text-inkwell"
              style={{ fontSize: 'var(--text-headline)' }}
            >
              A methodology built for
              <br />
              brands that cannot afford
              <br />
              to get this wrong.
            </h2>
          </header>
        </RevealOnScroll>

        <div className="flex flex-col">
          {steps.map((step, i) => (
            <RevealOnScroll key={step.number} delay={i * 80}>
              <article
                className="grid grid-cols-1 gap-6 border-t py-12 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:py-14"
                style={{ borderColor: 'oklch(88% 0.005 55)' }}
              >
                {/* Left: number + title */}
                <div className="flex items-start gap-6 lg:flex-col lg:gap-4">
                  <span
                    className="font-display font-normal leading-none text-terracotta"
                    style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <h3
                    className="font-display pt-1 font-normal text-inkwell lg:pt-0"
                    style={{ fontSize: 'var(--text-title)' }}
                  >
                    {step.title}
                  </h3>
                </div>

                {/* Right: body */}
                <p
                  className="font-body text-base font-light leading-relaxed"
                  style={{ color: 'oklch(16% 0.006 35 / 0.7)', maxWidth: '58ch' }}
                >
                  {step.body}
                </p>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
