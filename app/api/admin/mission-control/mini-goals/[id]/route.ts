import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin/auth'
import { adminSupabase } from '@/lib/audit/supabase'
import type { MiniGoalStatus } from '@/lib/dashboard/queries'

const ALLOWED: MiniGoalStatus[] = ['pending', 'active', 'waiting_on_human', 'done', 'blocked']

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { id } = await params
  const body = (await req.json().catch(() => null)) as { status?: string; output_notes?: string } | null
  if (!body || !body.status || !ALLOWED.includes(body.status as MiniGoalStatus)) {
    return NextResponse.json({ error: 'status required and must be valid' }, { status: 400 })
  }

  const status = body.status as MiniGoalStatus
  const sb = adminSupabase()

  const updates: Record<string, unknown> = { status }
  if (status === 'active') updates.started_at = new Date().toISOString()
  if (status === 'done') updates.completed_at = new Date().toISOString()
  if (typeof body.output_notes === 'string') updates.output_notes = body.output_notes

  const { error } = await sb.from('mini_goals').update(updates).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
