'use client'

import { useState } from 'react'
import RevealOnScroll from './RevealOnScroll'

const services = [
  {
    id: 'ai-receptionist',
    name: 'AI Receptionist',
    tag: '24/7 inbound voice',
    description:
      'A trained voice agent that answers every call, qualifies the caller, books appointments, and routes urgent calls to a human. Built on a custom knowledge base with full CRM integration. Every missed call becomes a captured lead.',
    includes: [
      'Voice agent with branded persona and knowledge base',
      'Call routing rules and warm transfer to humans',
      'Calendar booking integration',
      'CRM logging and call summaries via email or SMS',
      'Monthly call analytics and transcript review',
      'Ongoing prompt and knowledge updates',
    ],
    model: 'Setup + monthly',
    price: '$1,500 setup — from $497/mo',
  },
  {
    id: 'ai-sales-agent',
    name: 'AI Sales Agent',
    tag: 'Inbound + outbound',
    description:
      'Goes deeper than a receptionist. Discovery questions, objection handling, scheduling, and CRM disposition. Outbound dialing for cold or warm lead follow-up. Live transfer to human reps on hot calls. Built for teams with lead volume.',
    includes: [
      'Outbound dialer setup and DNC compliance',
      'Custom sales script and objection library',
      'Lead list ingestion and segmentation',
      'Live transfer to human reps on qualified calls',
      'CRM integration and disposition logging',
      'Weekly call review and script iteration',
    ],
    model: 'Setup + monthly or per appointment',
    price: '$2,500 setup — from $997/mo',
  },
  {
    id: 'aeo-geo',
    name: 'AEO + GEO',
    tag: 'AI search visibility',
    description:
      'Answer Engine Optimization plus Generative Engine Optimization. We make your brand the source of truth that ChatGPT, Perplexity, Claude, and Gemini cite when prospects ask buying questions. This is not SEO as it is typically practiced.',
    includes: [
      'Baseline visibility audit across AI search engines',
      'Question and topic map for your vertical',
      'Answer pages and FAQ content built for AI extraction',
      'Schema, structured data, and llms.txt setup',
      'Citation building across authoritative sources',
      'Monthly visibility report with cited mentions tracked',
    ],
    model: 'Monthly retainer — three tiers',
    price: 'Starter $1,500/mo — Authority $5,000/mo',
  },
  {
    id: 'ai-automations',
    name: 'AI Automations',
    tag: 'Ops and workflows',
    description:
      'Custom automations that remove human ops cost. We build the workflows that connect your tools, eliminate repetitive work, and add AI judgment where rules cannot. Proposal generation, lead routing, intake forms, internal copilots.',
    includes: [
      'Discovery workshop and process mapping',
      'Build of one to three core workflows',
      'AI agent or custom GPT build where appropriate',
      'Documentation and team training',
      '30-day stabilization period',
    ],
    model: 'Project fee + monthly maintenance',
    price: 'From $3,000 build — $500/mo maintenance',
  },
  {
    id: 'ai-chatbot',
    name: 'AI Chatbot',
    tag: 'Web + SMS',
    description:
      'A chatbot embedded on your site and connected to SMS, trained on your content, products, and FAQs. Captures leads, books appointments, answers questions, and hands off to humans when needed. Built for high-traffic sites and active ad spend.',
    includes: [
      'Knowledge base ingestion from your existing content',
      'Custom persona and conversation flows',
      'Lead capture with CRM push',
      'SMS channel hookup',
      'Monthly performance and conversation insights report',
    ],
    model: 'Setup + monthly',
    price: '$1,000 setup — from $297/mo',
  },
]

export default function SvcProductized() {
  const [active, setActive] = useState(0)
  const svc = services[active]

  return (
    <section
      id="svc-productized"
      className="relative px-6 py-24 lg:px-16 lg:py-36"
      style={{ backgroundColor: 'var(--color-ink)' }}
      aria-labelledby="productized-heading"
    >
      <div className="mx-auto max-w-5xl">

        <RevealOnScroll>
          <div className="flex items-baseline gap-8 mb-14">
            <p
              className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-label-text-on-dark)' }}
            >
              Motion B — Productized AI
            </p>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'var(--color-ivory-dim)' }}
              aria-hidden="true"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <h2
            id="productized-heading"
            className="font-display font-normal leading-snug mb-4"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-ivory)',
              letterSpacing: '-0.025em',
            }}
          >
            The AI stack, packaged and ready.
          </h2>
          <p
            className="font-body font-light leading-relaxed mb-14"
            style={{ fontSize: '1rem', color: 'var(--color-body-text-on-dark)', maxWidth: '56ch' }}
          >
            Productized services run on a setup fee and monthly retainer. You carry the
            subscription; we deliver the software and keep it running. Same AI stack we
            use internally, built and tuned for your business.
          </p>
        </RevealOnScroll>

        <RevealOnScroll>
          {/* Tab row */}
          <div
            className="flex gap-0 mb-14 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            style={{ borderBottom: '1px solid var(--color-ivory-subtle)' }}
            role="tablist"
            aria-label="AI services"
          >
            {services.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={active === i}
                aria-controls={`svc-panel-${s.id}`}
                onClick={() => setActive(i)}
                className="relative flex-shrink-0 cursor-pointer pb-5 pr-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ outlineColor: 'var(--color-label-text-on-dark)' }}
              >
                <span
                  className="font-mono text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-200"
                  style={{ color: active === i ? 'var(--color-ivory)' : 'var(--color-label-text-on-dark)' }}
                >
                  {s.name}
                </span>
                <span
                  className="absolute bottom-0 left-0 block"
                  style={{
                    right: '2rem',
                    height: '2px',
                    backgroundColor: 'var(--color-cinnabar)',
                    transform: active === i ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.3s var(--ease-expo)',
                  }}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div
            id={`svc-panel-${svc.id}`}
            role="tabpanel"
            tabIndex={0}
            key={svc.id}
            className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-24"
            style={{ animation: 'fadein 0.3s var(--ease-expo) forwards' }}
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-6">
                <h3
                  className="font-display font-normal leading-snug"
                  style={{
                    fontSize: 'clamp(1.375rem, 2.5vw, 2rem)',
                    color: 'var(--color-ivory)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {svc.name}
                </h3>
                <span
                  className="font-mono text-xs font-medium tracking-[0.1em] uppercase whitespace-nowrap mt-2 flex-shrink-0"
                  style={{ color: 'var(--color-cinnabar-on-dark)' }}
                >
                  {svc.tag}
                </span>
              </div>
              <p
                className="font-body font-light leading-relaxed"
                style={{ fontSize: '0.9375rem', color: 'var(--color-body-text-on-dark)', maxWidth: '52ch' }}
              >
                {svc.description}
              </p>
            </div>

            <div>
              <p
                className="font-mono text-xs font-medium tracking-[0.16em] uppercase mb-5"
                style={{ color: 'var(--color-label-text-on-dark)' }}
              >
                What&rsquo;s Included
              </p>
              <ul className="space-y-4 mb-10">
                {svc.includes.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-4 font-body font-light"
                    style={{ fontSize: '0.9375rem', color: 'var(--color-body-text-on-dark)' }}
                  >
                    <span
                      className="mt-[0.45rem] h-1 w-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'var(--color-cinnabar)' }}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{ borderTop: '1px solid var(--color-ivory-dim)', paddingTop: '1.25rem' }}>
                <p
                  className="font-mono text-xs font-medium tracking-[0.1em] uppercase mb-1"
                  style={{ color: 'var(--color-label-text-on-dark)' }}
                >
                  {svc.model}
                </p>
                <p
                  className="font-body font-light"
                  style={{ fontSize: '0.875rem', color: 'var(--color-cinnabar-on-dark)' }}
                >
                  {svc.price}
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  )
}
