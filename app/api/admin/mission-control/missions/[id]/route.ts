import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin/auth'
import { adminSupabase } from '@/lib/audit/supabase'
import type { MissionStatus } from '@/lib/dashboard/queries'

const ALLOWED: MissionStatus[] = ['planning', 'active', 'shipped', 'dropped']

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { id } = await params
  const body = (await req.json().catch(() => null)) as {
    status?: string
    dropped_reason?: string
    active_indicator?: boolean
  } | null
  if (!body) return NextResponse.json({ error: 'body required' }, { status: 400 })

  const updates: Record<string, unknown> = {}
  if (body.status) {
    if (!ALLOWED.includes(body.status as MissionStatus)) {
      return NextResponse.json({ error: 'invalid status' }, { status: 400 })
    }
    updates.status = body.status
    if (body.status === 'active') updates.started_at = new Date().toISOString()
    if (body.status === 'shipped') updates.shipped_at = new Date().toISOString()
    if (body.status === 'dropped' && typeof body.dropped_reason === 'string') {
      updates.dropped_reason = body.dropped_reason
    }
  }
  if (typeof body.active_indicator === 'boolean') updates.active_indicator = body.active_indicator

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'no updatable fields' }, { status: 400 })
  }

  const sb = adminSupabase()
  const { error } = await sb.from('missions').update(updates).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
