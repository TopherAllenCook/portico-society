'use client'

import { useState } from 'react'
import RevealOnScroll from './RevealOnScroll'

const faqs = [
  {
    q: 'What is the difference between this and traditional SEO?',
    a: 'Traditional SEO targets Google\'s search algorithm. AI search authority targets the recommendation engines inside ChatGPT, Perplexity, Google AI, and Gemini — which use different signals: citation quality, content depth, entity authority, and structured data. Most SEO work does not build these signals. Verve builds both in parallel.',
  },
  {
    q: 'How long before my practice appears in AI recommendations?',
    a: 'First citations typically appear within 60 days of engagement start. Full authority — where your practice is consistently named across multiple AI platforms for your specialty and market — builds over three to four months. The audit you receive first shows exactly where you stand today.',
  },
  {
    q: 'Do I need to stop working with my current marketing vendor?',
    a: 'Not necessarily. Verve focuses on AI search authority and inquiry architecture — areas most generalist agencies do not touch. If your current vendor handles paid social or website maintenance, that work typically continues alongside a Verve engagement without conflict.',
  },
  {
    q: 'What size practice does Verve work with?',
    a: 'Established practices generating $1M or more in annual revenue with at least three years of operation. The authority build only makes sense when there is existing patient volume to compound. Practices below this threshold or in high-volume med-spa categories are not a fit.',
  },
  {
    q: 'What if I am not ready for a full engagement?',
    a: 'Start with the Strategic Advisory tier. It is scoped to your specific situation — a competitive analysis, a new location launch, a positioning review — with clear milestones and no ongoing commitment unless you choose one.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderTop: '1px solid var(--color-ink-rule)' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-6 py-7 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{ outlineColor: 'var(--color-cinnabar)' }}
        aria-expanded={open}
      >
        <span
          className="font-display font-normal"
          style={{
            fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)',
            color: 'var(--color-ink)',
            letterSpacing: '-0.015em',
            lineHeight: 1.4,
          }}
        >
          {q}
        </span>
        <span
          className="flex-shrink-0 transition-transform duration-300"
          style={{
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            color: 'var(--color-cinnabar)',
          }}
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="pb-7">
          <p
            className="font-body font-light leading-relaxed"
            style={{ fontSize: '0.9375rem', color: 'var(--color-body-text)', maxWidth: '60ch' }}
          >
            {a}
          </p>
        </div>
      )}
    </div>
  )
}

export default function SvcFAQ() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-ivory)' }}
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-16">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-label-text)' }}
            >
              Questions
            </p>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'var(--color-ink-rule)' }}
              aria-hidden="true"
            />
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1.25fr]">

          <RevealOnScroll soft>
            <div className="pb-12 lg:pb-0 lg:pr-16">
              <h2
                id="faq-heading"
                className="font-display italic font-normal leading-snug"
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                  color: 'var(--color-ink)',
                  letterSpacing: '-0.025em',
                  maxWidth: '16ch',
                }}
              >
                Common questions from practice owners.
              </h2>
            </div>
          </RevealOnScroll>

          <div
            className="hidden lg:block"
            style={{ backgroundColor: 'var(--color-ink-rule)' }}
            aria-hidden="true"
          />

          <RevealOnScroll>
            <div className="lg:pl-16">
              {faqs.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
              <div style={{ borderTop: '1px solid var(--color-ink-rule)' }} aria-hidden="true" />
            </div>
          </RevealOnScroll>

        </div>

      </div>
    </section>
  )
}
