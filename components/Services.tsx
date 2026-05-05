import RevealOnScroll from './RevealOnScroll'

const services = [
  {
    number: '01',
    name: 'AI Implementation',
    description:
      'We build and deploy AI-powered content engines, lead qualification systems, and search intelligence tools — the same infrastructure we sell to your clients, running inside your marketing stack.',
    detail: 'Content generation · Lead scoring · Predictive search',
  },
  {
    number: '02',
    name: 'Search Engine Optimization',
    description:
      'Precision organic growth calibrated for luxury search behavior. We target the queries your ideal clients actually run, not the high-volume keywords that attract the wrong audience.',
    detail: 'Technical audit · Content architecture · Authority building',
  },
  {
    number: '03',
    name: 'Pay-Per-Click Advertising',
    description:
      'Paid media that earns its budget. We build campaigns around margin, not volume — reaching high-intent buyers on Google, Meta, and niche placements specific to your vertical.',
    detail: 'Google · Meta · Programmatic · Retargeting',
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-parchment px-6 py-24 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <RevealOnScroll>
          <p className="font-body mb-16 text-xs font-medium tracking-[0.2em] uppercase text-stone-mid lg:mb-20">
            What We Do
          </p>
        </RevealOnScroll>

        {/* Services grid — border is on the wrapper to avoid first:child selector bug */}
        <div className="grid gap-0 lg:grid-cols-3">
          {services.map((service, i) => (
            <RevealOnScroll
              key={service.number}
              delay={i * 100}
              className={[
                'flex flex-col gap-5 border-t py-12 lg:border-t-0 lg:px-10 lg:py-0',
                i > 0 ? 'lg:border-l' : '',
              ].join(' ')}
            >
              {/* Number */}
              <span
                className="font-display block font-normal leading-none text-terracotta"
                style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}
                aria-hidden="true"
              >
                {service.number}
              </span>

              {/* Name */}
              <h2
                className="font-display font-normal leading-tight text-inkwell"
                style={{ fontSize: 'var(--text-title)' }}
              >
                {service.name}
              </h2>

              {/* Description */}
              <p
                className="font-body text-base font-light leading-relaxed"
                style={{ color: 'oklch(16% 0.006 35 / 0.72)', maxWidth: '42ch' }}
              >
                {service.description}
              </p>

              {/* Detail */}
              <p
                className="font-body mt-auto pt-4 text-xs font-medium tracking-[0.12em] uppercase"
                style={{ color: 'oklch(47% 0.135 33 / 0.65)' }}
              >
                {service.detail}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
