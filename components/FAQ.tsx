import RevealOnScroll from './RevealOnScroll'

const faqs = [
  {
    q: 'How quickly will we see results?',
    a: 'Paid media results are visible within the first two weeks. Organic search and AI visibility are slower compounders: most clients see meaningful movement in 60 to 90 days. We do not promise viral moments. We promise compounding precision that makes every subsequent campaign cheaper and more effective.',
  },
  {
    q: 'Do you work with brands outside your listed sectors?',
    a: 'We are selective by design. Our expertise is calibrated for hospitality, concierge medicine, longevity, beauty, and premium events. Outside those verticals, another agency will serve you better. The free audit tells us both whether the fit is right before any commitment is made.',
  },
  {
    q: 'What does the Society Membership actually include?',
    a: 'Monthly strategy, weekly execution across AI implementation, SEO, and paid media, weekly reporting with interpretation, and quarterly roadmap reviews. We function as your marketing department. You stay focused on the brand; we stay focused on growing it.',
  },
  {
    q: 'Why the free audit before a sales conversation?',
    a: 'Because we want to prove the methodology before asking for a commitment. The audit is real work: we analyze your search visibility, competitive gaps, AI indexing status, and paid performance. The report shows you exactly where your brand is losing ground. That conversation is more productive than any introductory call.',
  },
  {
    q: 'How involved do we need to be?',
    a: 'We need your brand voice, your seasonal calendar, and approximately 45 minutes per month for strategy review. We handle the rest. Weekly reporting keeps you informed without requiring your time to produce it.',
  },
]

export default function FAQ() {
  return (
    <section
      className="bg-parchment px-6 py-24 lg:px-16 lg:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-4xl">
        <RevealOnScroll>
          <header className="mb-16 lg:mb-20">
            <p className="font-body mb-4 text-xs font-medium tracking-[0.2em] uppercase text-stone-mid">
              Questions
            </p>
            <h2
              id="faq-heading"
              className="font-display font-normal text-inkwell"
              style={{ fontSize: 'var(--text-headline)' }}
            >
              What discerning clients
              <br />
              want to know first.
            </h2>
          </header>
        </RevealOnScroll>

        <dl>
          {faqs.map((faq, i) => (
            <RevealOnScroll key={i} delay={i * 50}>
              <details
                className="group border-t"
                style={{ borderColor: 'oklch(88% 0.005 55)' }}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-7 lg:py-8 [&::-webkit-details-marker]:hidden">
                  <dt
                    className="font-display font-normal leading-snug text-inkwell"
                    style={{ fontSize: 'var(--text-title)' }}
                  >
                    {faq.q}
                  </dt>
                  <span
                    className="mt-1 flex-shrink-0 font-light text-terracotta transition-transform duration-300 group-open:rotate-45"
                    aria-hidden="true"
                    style={{ fontSize: '1.75rem', lineHeight: 1 }}
                  >
                    +
                  </span>
                </summary>
                <dd className="pb-8 pt-2">
                  <p
                    className="font-body text-base font-light leading-relaxed"
                    style={{ color: 'oklch(16% 0.006 35 / 0.7)', maxWidth: '60ch' }}
                  >
                    {faq.a}
                  </p>
                </dd>
              </details>
            </RevealOnScroll>
          ))}
          <div
            className="border-t"
            style={{ borderColor: 'oklch(88% 0.005 55)' }}
          />
        </dl>
      </div>
    </section>
  )
}
