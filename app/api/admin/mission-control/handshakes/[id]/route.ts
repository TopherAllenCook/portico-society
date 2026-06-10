import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin/auth'
import { adminSupabase } from '@/lib/audit/supabase'
import type { HandshakeStatus } from '@/lib/dashboard/queries'

const ALLOWED: HandshakeStatus[] = ['pending', 'done', 'skipped']

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { id } = await params
  const body = (await req.json().catch(() => null)) as { status?: string; notes?: string } | null
  if (!body || !body.status || !ALLOWED.includes(body.status as HandshakeStatus)) {
    return NextResponse.json({ error: 'status required and must be valid' }, { status: 400 })
  }

  const status = body.status as HandshakeStatus
  const sb = adminSupabase()

  const updates: Record<string, unknown> = { status }
  if (status === 'done' || status === 'skipped') updates.completed_at = new Date().toISOString()
  else updates.completed_at = null
  if (typeof body.notes === 'string') updates.notes = body.notes

  const { error } = await sb.from('handshakes').update(updates).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
