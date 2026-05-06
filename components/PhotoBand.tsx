type BandItem = string | { text: string; display: true }

const items: BandItem[] = [
  'ChatGPT',
  'Perplexity',
  'Google AI Overviews',
  'Siri',
  'Gemini',
  { text: 'Be the answer.', display: true },
  'AI is the new front desk',
  'Who does AI recommend?',
  'Your patients are already asking',
  'The first name wins',
]

export default function PhotoBand() {
  const doubled = [...items, ...items]

  return (
    <div
      className="overflow-hidden py-5 lg:py-7"
      style={{ backgroundColor: 'var(--color-cinnabar)' }}
      aria-hidden="true"
    >
      <div className="marquee-track flex items-center gap-0 whitespace-nowrap">
        {doubled.map((item, i) => {
          const isDisplay = typeof item === 'object'
          const text = typeof item === 'string' ? item : item.text
          return (
            <span key={i} className="flex items-center flex-shrink-0">
              <span
                className={
                  isDisplay
                    ? 'font-display italic'
                    : 'font-mono text-xs font-medium uppercase tracking-[0.18em]'
                }
                style={{
                  color: 'var(--color-ivory)',
                  ...(isDisplay ? { fontSize: 'clamp(0.9rem, 1.2vw, 1.125rem)' } : {}),
                }}
              >
                {text}
              </span>
              <span
                className="mx-6 inline-block h-1 w-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: 'oklch(97% 0.008 75 / 0.4)' }}
                aria-hidden="true"
              />
            </span>
          )
        })}
      </div>
    </div>
  )
}
