const items = [
  'ChatGPT',
  'Perplexity',
  'Google AI Overviews',
  'Siri',
  'Gemini',
  'AI is the new front desk',
  'Who does AI recommend?',
  'Be the answer',
  'Your patients are already asking',
  'The first name wins',
]

export default function PhotoBand() {
  const doubled = [...items, ...items]

  return (
    <div
      className="overflow-hidden py-4"
      style={{ backgroundColor: 'var(--color-cinnabar)' }}
      aria-hidden="true"
    >
      <div className="marquee-track flex items-center gap-0 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center font-mono text-xs font-medium uppercase tracking-[0.18em]"
            style={{ color: 'var(--color-ivory)' }}
          >
            {item}
            <span
              className="mx-6 inline-block h-1 w-1 rounded-full flex-shrink-0"
              style={{ backgroundColor: 'oklch(97% 0.008 75 / 0.4)' }}
              aria-hidden="true"
            />
          </span>
        ))}
      </div>
    </div>
  )
}
