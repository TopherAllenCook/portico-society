const MARKETS = [
  'Dallas', 'Manhattan', 'Los Angeles', 'Chicago',
  'Austin', 'Miami', 'Denver', 'Boston',
]

export default function LogoStripVerve() {
  return (
    <div
      className="px-6 py-8 lg:px-16"
      style={{ background: 'var(--color-ivory)', borderBottom: '1px solid var(--color-ink-rule)' }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
          <span
            className="text-xs font-medium uppercase tracking-[0.18em] mr-2"
            style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
          >
            Active in
          </span>
          {MARKETS.map((city, i) => (
            <span key={city} className="flex items-center gap-1">
              <span
                className="text-sm font-medium"
                style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}
              >
                {city}
              </span>
              {i < MARKETS.length - 1 && (
                <span style={{ color: 'var(--color-ink-muted)', opacity: 0.4, fontFamily: 'var(--font-body)' }}>·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
