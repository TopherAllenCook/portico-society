'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { AuditStatus, ModuleName, ModuleStatus } from '@/lib/audit/types'

type ModuleResult = { module: ModuleName; status: ModuleStatus }

const STEPS: { module: ModuleName | 'synth'; label: string }[] = [
  { module: 'crawl', label: 'Reading your website' },
  { module: 'pagespeed', label: 'Checking page performance' },
  { module: 'places', label: 'Pulling local presence' },
  { module: 'geo', label: 'Searching what AI engines say' },
  { module: 'schema', label: 'Auditing your structured data' },
  { module: 'leadgen', label: 'Auditing your inquiry path' },
  { module: 'dataforseo', label: 'Comparing to competitors' },
  { module: 'synth', label: 'Writing your audit' },
]

export default function AuditProgressPoller({
  jobStatus,
  modules,
  synthesisReady,
}: {
  jobStatus: AuditStatus
  modules: ModuleResult[]
  synthesisReady: boolean
}) {
  const router = useRouter()
  const isTerminal =
    jobStatus === 'complete' || jobStatus === 'partial' || jobStatus === 'failed'

  useEffect(() => {
    if (isTerminal && synthesisReady) return
    const t = setInterval(() => router.refresh(), 4000)
    return () => clearInterval(t)
  }, [isTerminal, synthesisReady, router])

  const moduleMap = new Map(modules.map((m) => [m.module, m.status]))

  return (
    <div
      className="mt-10 rounded-2xl p-8 lg:p-10"
      style={{
        background: 'var(--color-stone)',
        border: '1px solid var(--color-ink-rule)',
      }}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="mt-1 inline-block h-2.5 w-2.5 animate-pulse rounded-full"
          style={{ background: 'var(--color-cinnabar)' }}
        />
        <div>
          <p
            className="text-xs font-medium uppercase tracking-[0.18em]"
            style={{ color: 'var(--color-cinnabar-dark)', fontFamily: 'var(--font-body)' }}
          >
            Audit running
          </p>
          <p
            className="mt-2 font-display"
            style={{
              fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            We are running the same checks our analysts run, in real time.
          </p>
          <p
            className="mt-2 text-sm"
            style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
          >
            Usually finishes in about a minute. Keep this tab open. Refreshing is fine.
          </p>
        </div>
      </div>

      <ul
        className="mt-8 grid gap-0 sm:grid-cols-2"
        style={{ borderTop: '1px solid var(--color-ink-rule)' }}
      >
        {STEPS.map((step) => {
          const status =
            step.module === 'synth'
              ? synthesisReady
                ? 'complete'
                : isTerminal
                  ? 'failed'
                  : 'running'
              : (moduleMap.get(step.module) ?? 'pending')
          return (
            <li
              key={step.module}
              className="flex items-center gap-3 py-3.5"
              style={{ borderBottom: '1px solid var(--color-ink-rule)' }}
            >
              <StepIcon status={status} />
              <span
                className="text-sm"
                style={{
                  color:
                    status === 'complete'
                      ? 'var(--color-ink)'
                      : status === 'failed'
                        ? 'var(--color-body-text)'
                        : status === 'running'
                          ? 'var(--color-ink)'
                          : 'var(--color-label-text)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {step.label}
              </span>
              {status === 'running' && (
                <span
                  className="ml-auto text-[0.65rem] font-medium uppercase tracking-[0.16em]"
                  style={{ color: 'var(--color-cinnabar-dark)', fontFamily: 'var(--font-body)' }}
                >
                  Running
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function StepIcon({ status }: { status: ModuleStatus | 'complete' | 'failed' | 'running' | 'pending' }) {
  if (status === 'complete') {
    return (
      <span
        aria-hidden="true"
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
        style={{ background: 'var(--color-cinnabar)' }}
      >
        <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
          <path
            d="M2.5 6.2l2.3 2.3 4.7-4.7"
            stroke="var(--color-ivory)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </span>
    )
  }
  if (status === 'running') {
    return (
      <span
        aria-hidden="true"
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" className="animate-spin" aria-hidden="true">
          <circle cx="8" cy="8" r="6" stroke="var(--color-ink-rule)" strokeWidth="1.6" fill="none" />
          <path d="M14 8a6 6 0 0 0-6-6" stroke="var(--color-cinnabar)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </svg>
      </span>
    )
  }
  if (status === 'failed' || status === 'skipped') {
    return (
      <span
        aria-hidden="true"
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
        style={{ border: '1px solid var(--color-ink-rule)' }}
      >
        <span className="block h-0.5 w-2" style={{ background: 'var(--color-label-text)' }} />
      </span>
    )
  }
  // pending
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
      style={{ border: '1px solid var(--color-ink-rule)' }}
    />
  )
}
