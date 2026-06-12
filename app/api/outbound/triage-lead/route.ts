import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { triageLead } from '@/lib/triage/analyze'

export const runtime = 'nodejs'
export const maxDuration = 60 // site fetch (https then http retry, 15s each) + 8s-capped Places call, run concurrently

/**
 * POST /api/outbound/triage-lead
 * Auth: x-outbound-trigger-token header must match OUTBOUND_TRIGGER_TOKEN env.
 *
 * Called per-prospect by the n8n "Verve: Mockup Autopilot" workflow right
 * after the Maps scraper lands new rows. Runs the free precursor audit
 * (website health, pixels, lead capture, GMB signals) and returns the fields
 * n8n writes back onto HVAC Prospects.
 *
 * Body: { website?, place_id?, rating?, reviews? }
 * Returns: { ok, score, tier, flags, summary, track }
 */
const TriageSchema = z.object({
  website: z.string().max(500).optional().nullable(),
  place_id: z.string().max(200).optional().nullable(),
  rating: z.coerce.number().min(0).max(5).optional().nullable(),
  reviews: z.coerce.number().int().min(0).optional().nullable(),
})

export async function POST(req: NextRequest) {
  const token = req.headers.get('x-outbound-trigger-token')
  if (!process.env.OUTBOUND_TRIGGER_TOKEN || token !== process.env.OUTBOUND_TRIGGER_TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'invalid_json' }, { status: 400 })

  const parsed = TriageSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation_failed', issues: parsed.error.flatten() }, { status: 400 })
  }

  try {
    const result = await triageLead(parsed.data)
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    console.error('[outbound/triage-lead] failure', err)
    return NextResponse.json({ error: 'triage_failed', message: (err as Error).message }, { status: 500 })
  }
}
