import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin/auth'
import { adminSupabase } from '@/lib/audit/supabase'

const ALLOWED_FREQUENCIES = new Set(['daily', 'weekly', 'monthly'])

/**
 * POST /api/dashboard/checklist
 *
 * Body: { title: string, frequency: 'daily' | 'weekly' | 'monthly', category?: string, order_index?: number, notes?: string }
 */
export async function POST(req: Request): Promise<NextResponse> {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const body = (await req.json().catch(() => null)) as {
    title?: string
    frequency?: string
    category?: string
    order_index?: number
    notes?: string
  } | null
  if (!body || !body.title || typeof body.title !== 'string') {
    return NextResponse.json({ error: 'title required' }, { status: 400 })
  }
  const frequency = body.frequency && ALLOWED_FREQUENCIES.has(body.frequency) ? body.frequency : 'weekly'

  const sb = adminSupabase()
  const { data, error } = await sb
    .from('checklist_items')
    .insert({
      title: body.title.trim(),
      frequency,
      category: body.category ?? frequency,
      order_index: typeof body.order_index === 'number' ? body.order_index : 0,
      notes: body.notes ?? null,
      next_due_at: new Date().toISOString(),
    })
    .select('id')
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true, id: data?.id })
}
