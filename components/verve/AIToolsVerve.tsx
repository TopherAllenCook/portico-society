import Link from 'next/link'
import { AI_TOOLS_SECTION } from '@/lib/verve/content'

export default function AIToolsVerve() {
  return (
    <section
      className="px-6 py-24 lg:px-16 lg:py-32"
      style={{ background: 'var(--color-ink)' }}
      aria-labelledby="ai-tools-heading"
    >
      <div className="mx-auto max-w-5xl">
        <p
          className="mb-3 text-xs font-medium uppercase tracking-[0.18em]"
          style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)' }}
        >
          AI-Powered Marketing
        </p>
        <h2
          id="ai-tools-heading"
          className="font-display font-semibold"
          style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            color: 'var(--color-ivory)',
            letterSpacing: '-0.025em',
            maxWidth: '28ch',
          }}
        >
          {AI_TOOLS_SECTION.title}
        </h2>
        <p
          className="mt-4 text-base leading-relaxed"
          style={{ color: 'var(--color-body-text-on-dark)', maxWidth: '52ch', fontFamily: 'var(--font-body)' }}
        >
          {AI_TOOLS_SECTION.sub}
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {AI_TOOLS_SECTION.tools.map((tool, i) => (
            <div
              key={tool.name}
              className="rounded-xl p-7"
              style={{ background: 'var(--color-cta-surface)', border: '1px solid var(--color-ivory-subtle)' }}
            >
              <div
                className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold"
                style={{ background: 'var(--color-ivory-dim)', color: 'var(--color-ivory)' }}
              >
                {i + 1}
              </div>
              <p
                className="font-display font-medium"
                style={{ fontSize: '1.1rem', color: 'var(--color-ivory)', letterSpacing: '-0.01em' }}
              >
                {tool.name}
              </p>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: 'var(--color-body-text-on-dark)', fontFamily: 'var(--font-body)' }}
              >
                {tool.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/ai"
            className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-100 opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ivory-glow)] rounded-sm"
            style={{ color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
          >
            See all 5 AI systems
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
