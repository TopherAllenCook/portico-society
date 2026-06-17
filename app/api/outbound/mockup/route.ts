import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { z } from 'zod'
import { adminSupabase } from '@/lib/audit/supabase'
import { specialtyFor } from '@/lib/outbound/trade'

export const runtime = 'nodejs'

/**
 * POST /api/outbound/mockup
 * Auth: x-outbound-trigger-token header must match OUTBOUND_TRIGGER_TOKEN env.
 *
 * Generates (or refreshes) an auto-designed homepage mockup for a prospect.
 * Persists the render config to mockup_previews; /preview/[slug] renders it.
 * Called by the n8n "Verve: Mockup Autopilot" workflow for ICP-fit prospects;
 * the returned URL is written back to HVAC Prospects."Mockup Link".
 *
 * Body: { company_name, city?, state?, phone?, rating?, reviews?, specialty?,
 *         website?, airtable_record_id? }
 * Returns: { ok, slug, url }
 */
const MockupSchema = z.object({
  company_name: z.string().min(2).max(120),
  city: z.string().max(80).optional().nullable(),
  state: z.string().max(40).optional().nullable(),
  phone: z.string().max(40).optional().nullable(),
  rating: z.coerce.number().min(0).max(5).optional().nullable(),
  reviews: z.coerce.number().int().min(0).optional().nullable(),
  specialty: z.string().max(40).optional().nullable(),
  website: z.string().max(500).optional().nullable(),
  airtable_record_id: z.string().max(40).optional().nullable(),
})

/**
 * Slug = readable prefix + 6-char identity hash. The hash makes the slug
 * unique per prospect (so two "Quality Plumbing" rows in different states
 * never collide and silently overwrite each other's mockup) while staying
 * stable across re-runs for the same record (so an already-sent link keeps
 * working). Keyed on airtable_record_id when present, else on the full
 * name+city+state+website identity.
 */
function slugFor(d: {
  company_name: string
  city?: string | null
  state?: string | null
  website?: string | null
  airtable_record_id?: string | null
}) {
  const prefix =
    [d.company_name, d.city ?? '', d.state ?? '']
      .join(' ')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 72) || 'preview'
  const identity =
    d.airtable_record_id ?? `${d.company_name}|${d.city ?? ''}|${d.state ?? ''}|${d.website ?? ''}`
  const hash = createHash('sha256').update(identity).digest('hex').slice(0, 6)
  return `${prefix}-${hash}`
}

export async function POST(req: NextRequest) {
  const token = req.headers.get('x-outbound-trigger-token')
  if (!process.env.OUTBOUND_TRIGGER_TOKEN || token !== process.env.OUTBOUND_TRIGGER_TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'invalid_json' }, { status: 400 })

  const parsed = MockupSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation_failed', issues: parsed.error.flatten() }, { status: 400 })
  }
  const d = parsed.data
  const slug = slugFor(d)

  const sb = adminSupabase()
  const { error } = await sb.from('mockup_previews').upsert(
    {
      slug,
      company_name: d.company_name,
      city: d.city ?? null,
      state: d.state ?? null,
      phone: d.phone ?? null,
      rating: d.rating ?? null,
      reviews: d.reviews ?? null,
      // The upstream ICP Gate hardcodes specialty:'hvac'; derive the real trade
      // from the company name so the stored value matches what /preview renders.
      specialty: specialtyFor(d.company_name),
      website: d.website ?? null,
      airtable_record_id: d.airtable_record_id ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'slug' },
  )
  if (error) {
    console.error('[outbound/mockup] upsert failed', error)
    return NextResponse.json({ error: 'persist_failed' }, { status: 500 })
  }

  const base = (process.env.PUBLIC_BASE_URL ?? 'https://vervemd.com').replace(/\/$/, '')
  return NextResponse.json({ ok: true, slug, url: `${base}/preview/${slug}` })
}
