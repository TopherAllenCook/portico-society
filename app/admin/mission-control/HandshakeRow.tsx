'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import type { HandshakeRow as HandshakeRowType } from '@/lib/dashboard/queries'

export function HandshakeRow({ handshake }: { handshake: HandshakeRowType }) {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(handshake.status === 'done')

  async function toggle() {
    if (busy) return
    const next = done ? 'pending' : 'done'
    setDone(!done)
    setBusy(true)
    try {
      const res = await fetch(`/api/admin/mission-control/handshakes/${handshake.id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ status: next }),
      })
      if (!res.ok) {
        setDone(done)
      } else {
        startTransition(() => router.refresh())
      }
    } catch {
      setDone(done)
    } finally {
      setBusy(false)
    }
  }

  const overdue = handshake.due_at && new Date(handshake.due_at).getTime() < Date.now()

  return (
    <div
      className="flex items-start gap-3 border-b px-4 py-3 last:border-b-0"
      style={{
        borderColor: 'var(--color-ink-subtle)',
        background: done ? 'var(--color-stone)' : 'transparent',
      }}
    >
      <button
        type="button"
        onClick={toggle}
        disabled={busy}
        aria-label={done ? 'mark not done' : 'mark done'}
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border"
        style={{
          borderColor: done ? '#16A34A' : 'var(--color-ink-subtle)',
          background: done ? '#16A34A' : 'transparent',
          cursor: busy ? 'wait' : 'pointer',
        }}
      >
        {done && (
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
            textDecoration: done ? 'line-through' : 'none',
          }}
        >
          {handshake.description}
        </p>
        {handshake.due_at && (
          <p
            className="mt-1 text-xs"
            style={{
              color: overdue ? 'var(--color-cinnabar)' : 'var(--color-ink-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            due {new Date(handshake.due_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            {overdue && ', overdue'}
          </p>
        )}
      </div>
    </div>
  )
}
