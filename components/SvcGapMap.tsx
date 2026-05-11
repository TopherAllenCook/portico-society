'use client'
import { useChartReveal } from './useChartReveal'

const platforms = ['ChatGPT', 'Perplexity', 'Claude', 'Google SGE']
const competitors = ['Competitor A', 'Competitor B', 'Your Practice']

const results: boolean[][] = [
  [true,  true,  false],
  [true,  true,  false],
  [true,  false, false],
  [true,  false, false],
]

export default function SvcGapMap() {
  const { ref, triggered } = useChartReveal()

  return (
    <div ref={ref} className="mt-10 mb-2">
      <p
        className="font-mono text-xs font-medium tracking-[0.14em] uppercase mb-6"
        style={{ color: 'var(--color-label-text)' }}
      >
        AI Recommendation Results
      </p>

      <div className="overflow-x-auto">
        <table
          style={{ borderCollapse: 'collapse', width: '100%' }}
          aria-label="Which practices appear in AI search recommendations"
        >
          <thead>
            <tr>
              <th
                className="pb-3 pr-10 text-left"
                style={{ borderBottom: '1px solid var(--color-ink-rule)', width: '32%' }}
              >
                <span className="sr-only">Platform</span>
              </th>
              {competitors.map((name, i) => (
                <th
                  key={name}
                  scope="col"
                  className="pb-3 text-center font-mono text-xs font-medium tracking-[0.1em] uppercase"
                  style={{
                    borderBottom: '1px solid var(--color-ink-rule)',
                    color: i === 2 ? 'var(--color-cinnabar)' : 'var(--color-label-text)',
                  }}
                >
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {platforms.map((platform, row) => (
              <tr key={platform}>
                <th
                  scope="row"
                  className="py-4 pr-10 text-left font-mono text-xs font-medium"
                  style={{
                    borderBottom: '1px solid var(--color-ink-rule)',
                    color: 'var(--color-label-text)',
                    opacity: triggered ? 1 : 0,
                    transform: triggered ? 'none' : 'translateY(6px)',
                    transition: triggered
                      ? `opacity 0.45s ease ${row * 80}ms, transform 0.45s cubic-bezier(0.25,1,0.5,1) ${row * 80}ms`
                      : 'none',
                  }}
                >
                  {platform}
                </th>
                {results[row].map((appears, col) => (
                  <td
                    key={col}
                    className="py-4 text-center"
                    style={{
                      borderBottom: '1px solid var(--color-ink-rule)',
                      opacity: triggered ? 1 : 0,
                      transform: triggered ? 'none' : 'translateY(6px)',
                      transition: triggered
                        ? `opacity 0.45s ease ${row * 80 + col * 40}ms, transform 0.45s cubic-bezier(0.25,1,0.5,1) ${row * 80 + col * 40}ms`
                        : 'none',
                    }}
                  >
                    {appears ? (
                      <span
                        className="font-mono text-sm"
                        style={{ color: 'var(--color-ink)' }}
                        aria-label="appears"
                      >
                        ✓
                      </span>
                    ) : (
                      <span
                        className="font-mono text-sm font-medium"
                        style={{ color: 'var(--color-cinnabar)' }}
                        aria-label="does not appear"
                      >
                        ✗
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p
        className="font-body font-light mt-5 text-xs"
        style={{
          color: 'var(--color-body-text)',
          maxWidth: '52ch',
          opacity: triggered ? 1 : 0,
          transition: triggered ? 'opacity 0.5s ease 480ms' : 'none',
        }}
      >
        0 of 4 AI platforms cite your practice. Your primary competitor appears in all 4.
      </p>
    </div>
  )
}
