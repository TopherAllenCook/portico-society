export default function LogoStripVerve() {
  const placeholders = ['Clinic A', 'Practice B', 'Wellness C', 'Med Spa D', 'Longevity E', 'Health F']

  return (
    <div
      className="px-6 py-10 lg:px-16"
      style={{ background: 'var(--color-ink)', borderBottom: '1px solid var(--color-ivory-subtle)' }}
    >
      <div className="mx-auto max-w-5xl">
        <p
          className="mb-6 text-center text-xs font-medium uppercase tracking-[0.18em]"
          style={{ color: 'var(--color-label-text-on-dark)', fontFamily: 'var(--font-body)' }}
        >
          Trusted by longevity & aesthetics practices
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {placeholders.map((name) => (
            <span
              key={name}
              className="text-sm font-medium opacity-30"
              style={{ color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
