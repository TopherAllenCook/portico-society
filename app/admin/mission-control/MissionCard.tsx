'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import type { MissionWithChildren, MiniGoalRow, MiniGoalStatus } from '@/lib/dashboard/queries'

export function MissionCard({ mission }: { mission: MissionWithChildren }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const { progress } = mission
  const pct = progress.total === 0 ? 0 : Math.round((progress.done / progress.total) * 100)
  const daysLeft = mission.target_date ? daysBetween(new Date(), new Date(mission.target_date)) : null
  const urgency = daysLeft === null ? 'neutral' : daysLeft < 0 ? 'overdue' : daysLeft <= 3 ? 'soon' : 'neutral'

  async function shipMission() {
    if (!confirm(`Mark "${mission.title}" as shipped?`)) return
    await fetch(`/api/admin/mission-control/missions/${mission.id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ status: 'shipped' }),
    })
    startTransition(() => router.refresh())
  }

  return (
    <article
      className="rounded-xl border p-5"
      style={{
        borderColor: mission.active_indicator ? '#16A34A' : 'var(--color-ink-subtle)',
        background: 'var(--color-ivory)',
        boxShadow: mission.active_indicator ? '0 0 0 1px #16A34A inset' : 'none',
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {mission.active_indicator && <PulseDot />}
            <span
              className="text-xs uppercase tracking-[0.18em]"
              style={{
                color: 'var(--color-ink-muted)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {mission.owner}
            </span>
          </div>
          <h3
            className="mt-1 font-display"
            style={{ fontSize: '1.25rem', color: 'var(--color-ink)', letterSpacing: '-0.01em' }}
          >
            {mission.title}
          </h3>
          <p
            className="mt-1 text-sm"
            style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}
          >
            {mission.binary_outcome}
          </p>
        </div>
        <div className="text-right" style={{ fontFamily: 'var(--font-mono)' }}>
          {mission.target_date && (
            <p
              className="text-xs"
              style={{
                color:
                  urgency === 'overdue'
                    ? 'var(--color-cinnabar)'
                    : urgency === 'soon'
                    ? '#D97706'
                    : 'var(--color-ink-muted)',
              }}
            >
              {mission.target_date}
              {daysLeft !== null && (
                <span className="ml-1">
                  ({daysLeft < 0 ? `${-daysLeft}d overdue` : `${daysLeft}d left`})
                </span>
              )}
            </p>
          )}
          <button
            type="button"
            onClick={shipMission}
            disabled={pending}
            className="mt-2 rounded-md border px-3 py-1 text-xs"
            style={{
              borderColor: 'var(--color-ink-subtle)',
              color: 'var(--color-ink)',
              background: 'transparent',
              fontFamily: 'var(--font-mono)',
              opacity: pending ? 0.5 : 1,
              cursor: pending ? 'wait' : 'pointer',
            }}
          >
            Mark shipped
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div
          className="h-1.5 w-full overflow-hidden rounded-full"
          style={{ background: 'var(--color-stone)' }}
        >
          <div
            className="h-full"
            style={{
              width: `${pct}%`,
              background: pct === 100 ? '#16A34A' : 'var(--color-ink)',
              transition: 'width 300ms ease',
            }}
          />
        </div>
        <p
          className="mt-1 text-xs"
          style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}
        >
          {progress.done} / {progress.total} mini-goals, {pct}%
        </p>
      </div>

      <ul className="mt-4 space-y-2">
        {mission.mini_goals.map(g => (
          <MiniGoalItem key={g.id} goal={g} onChanged={() => startTransition(() => router.refresh())} />
        ))}
      </ul>
    </article>
  )
}

function MiniGoalItem({ goal, onChanged }: { goal: MiniGoalRow; onChanged: () => void }) {
  const [busy, setBusy] = useState(false)
  const [optimisticStatus, setOptimisticStatus] = useState<MiniGoalStatus>(goal.status)

  const isDone = optimisticStatus === 'done'
  const isBlocked = optimisticStatus === 'blocked'

  async function toggle() {
    if (busy) return
    const next: MiniGoalStatus = isDone ? 'pending' : 'done'
    setOptimisticStatus(next)
    setBusy(true)
    try {
      const res = await fetch(`/api/admin/mission-control/mini-goals/${goal.id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ status: next }),
      })
      if (!res.ok) {
        setOptimisticStatus(goal.status)
      } else {
        onChanged()
      }
    } catch {
      setOptimisticStatus(goal.status)
    } finally {
      setBusy(false)
    }
  }

  const assigneeColor =
    goal.assignee === 'ai' ? '#7C3AED' : goal.assignee === 'chris' ? 'var(--color-cinnabar)' : '#0284C7'

  return (
    <li
      className="flex items-start gap-3 rounded-md border px-3 py-2"
      style={{
        borderColor: 'var(--color-ink-subtle)',
        background: isDone ? 'var(--color-stone)' : 'transparent',
        opacity: isBlocked ? 0.7 : 1,
      }}
    >
      <button
        type="button"
        onClick={toggle}
        disabled={busy}
        aria-label={isDone ? 'mark not done' : 'mark done'}
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border"
        style={{
          borderColor: isDone ? '#16A34A' : 'var(--color-ink-subtle)',
          background: isDone ? '#16A34A' : 'transparent',
          cursor: busy ? 'wait' : 'pointer',
        }}
      >
        {isDone && (
          <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="white" strokeWidth="2">
            <path d="M2 6l2.5 2.5L10 3" />
          </svg>
        )}
      </button>
      <div className="min-w-0 flex-1">
        <p
          className="text-sm"
          style={{
            color: 'var(--color-ink)',
            fontFamily: 'var(--font-body)',
            textDecoration: isDone ? 'line-through' : 'none',
          }}
        >
          {goal.title}
        </p>
        {goal.output_notes && (
          <p
            className="mt-1 text-xs"
            style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}
          >
            {goal.output_notes}
          </p>
        )}
      </div>
      <span
        className="shrink-0 rounded-full px-2 py-0.5 text-xs"
        style={{
          background: assigneeColor,
          color: '#FFF8EA',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {goal.assignee}
      </span>
      {isBlocked && (
        <span
          className="shrink-0 rounded-full px-2 py-0.5 text-xs"
          style={{ background: '#DC2626', color: '#FFF8EA', fontFamily: 'var(--font-mono)' }}
        >
          blocked
        </span>
      )}
    </li>
  )
}

function PulseDot() {
  return (
    <span
      className="inline-block h-2 w-2 rounded-full"
      style={{ background: '#16A34A', animation: 'pulse-dot 2s infinite ease-in-out' }}
    />
  )
}

function daysBetween(a: Date, b: Date): number {
  const ms = b.getTime() - a.getTime()
  return Math.ceil(ms / 86400000)
}
