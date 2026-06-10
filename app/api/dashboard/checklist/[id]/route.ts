import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin/auth'
import { adminSupabase } from '@/lib/audit/supabase'

const FREQ_MS: Record<string, number> = {
  daily: 24 * 3600 * 1000,
  weekly: 7 * 24 * 3600 * 1000,
  monthly: 30 * 24 * 3600 * 1000,
}

/**
 * PATCH /api/dashboard/checklist/[id]
 *
 * Body: { complete: true } | { complete: false } | { title, frequency, notes }
 *
 * complete=true: stamps last_completed_at=now() and computes next_due_at
 * based on the item's frequency. Toggling complete=false clears it.
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { id } = await params
  const body = (await req.json().catch(() => null)) as {
    complete?: boolean
    title?: string
    frequency?: string
    notes?: string
  } | null
  if (!body) return NextResponse.json({ error: 'body required' }, { status: 400 })

  const sb = adminSupabase()
  const updates: Record<string, unknown> = {}

  if (typeof body.complete === 'boolean') {
    if (body.complete) {
      const { data } = await sb.from('checklist_items').select('frequency').eq('id', id).single()
      const freq = data?.frequency ?? 'weekly'
      const ms = FREQ_MS[freq] ?? FREQ_MS.weekly
      updates.last_completed_at = new Date().toISOString()
      updates.next_due_at = new Date(Date.now() + ms).toISOString()
    } else {
      updates.last_completed_at = null
      updates.next_due_at = null
    }
  }
  if (typeof body.title === 'string') updates.title = body.title
  if (typeof body.frequency === 'string') updates.frequency = body.frequency
  if (typeof body.notes === 'string') updates.notes = body.notes

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'no updatable fields' }, { status: 400 })
  }

  const { error } = await sb.from('checklist_items').update(updates).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

/**
 * DELETE /api/dashboard/checklist/[id]
 */
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { id } = await params
  const sb = adminSupabase()
  const { error } = await sb.from('checklist_items').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
