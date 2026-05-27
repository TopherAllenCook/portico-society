/**
 * Thin HubSpot CRM client. Used by /api/audit/submit and /api/inquiry/submit
 * to mirror leads into HubSpot in parallel with the existing email + Supabase
 * flow.
 *
 * Required env vars (set in Vercel, NOT committed):
 *   HUBSPOT_ACCESS_TOKEN     Private App token. Create at:
 *                            HubSpot → Settings → Integrations → Private Apps.
 *                            Required scopes: crm.objects.contacts.write,
 *                            crm.objects.deals.write, crm.objects.notes.write.
 *                            Token format: pat-na1-xxxx-xxxx-xxxx-xxxx
 *
 * Optional env vars:
 *   HUBSPOT_AUDIT_PIPELINE_ID    Pipeline ID to create audit-lead deals in.
 *                                If unset, uses the account's default pipeline.
 *   HUBSPOT_AUDIT_DEAL_STAGE_ID  Stage ID for new audit-lead deals.
 *                                If unset, uses the pipeline's first stage.
 *
 * Behavior: every helper here is best-effort. They never throw and never block
 * the caller. On failure they log and return null. The user-facing flow must
 * succeed even when HubSpot is misconfigured, throttled, or down.
 */

const HUBSPOT_API = 'https://api.hubapi.com'

type ContactProperties = {
  email: string
  firstname?: string
  lastname?: string
  phone?: string
  company?: string
  website?: string
  city?: string
  state?: string
  /** Lifecycle stage. 'lead' is the safest default for inbound forms. */
  lifecyclestage?: string
  /** Free-form notes that will land on the contact. */
  hs_lead_status?: string
  [key: string]: string | undefined
}

type DealProperties = {
  dealname: string
  amount?: string
  pipeline?: string
  dealstage?: string
  closedate?: string
  [key: string]: string | undefined
}

function hubspotEnabled(): boolean {
  return Boolean(process.env.HUBSPOT_ACCESS_TOKEN)
}

async function hubspotFetch(
  path: string,
  init: RequestInit & { body?: string } = {},
): Promise<Response | null> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN
  if (!token) return null

  try {
    const res = await fetch(`${HUBSPOT_API}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(init.headers ?? {}),
      },
    })
    return res
  } catch (err) {
    console.error(`[hubspot] fetch ${path} threw`, err)
    return null
  }
}

/**
 * Upsert a contact by email. Creates if new, updates if existing.
 * Returns the HubSpot contact ID on success, null otherwise.
 */
export async function upsertContact(props: ContactProperties): Promise<string | null> {
  if (!hubspotEnabled()) return null
  const { email, ...rest } = props

  // Filter out undefined values; HubSpot rejects them.
  const properties: Record<string, string> = { email }
  for (const [k, v] of Object.entries(rest)) {
    if (v != null && v !== '') properties[k] = v
  }

  // batch/upsert with idProperty=email is the cleanest dedup path.
  const res = await hubspotFetch('/crm/v3/objects/contacts/batch/upsert', {
    method: 'POST',
    body: JSON.stringify({
      inputs: [{ idProperty: 'email', id: email, properties }],
    }),
  })

  if (!res) return null
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    console.error(`[hubspot] upsertContact ${res.status}`, text.slice(0, 500))
    return null
  }

  const data = (await res.json().catch(() => null)) as
    | { results?: Array<{ id?: string }> }
    | null
  return data?.results?.[0]?.id ?? null
}

/**
 * Create a deal and (optionally) associate it with a contact.
 * Returns the deal ID on success, null otherwise.
 */
export async function createDeal(
  props: DealProperties,
  contactId?: string | null,
): Promise<string | null> {
  if (!hubspotEnabled()) return null

  const properties: Record<string, string> = { dealname: props.dealname }
  for (const [k, v] of Object.entries(props)) {
    if (k === 'dealname') continue
    if (v != null && v !== '') properties[k] = v
  }

  const auditPipeline = process.env.HUBSPOT_AUDIT_PIPELINE_ID
  const auditStage = process.env.HUBSPOT_AUDIT_DEAL_STAGE_ID
  if (auditPipeline && !properties.pipeline) properties.pipeline = auditPipeline
  if (auditStage && !properties.dealstage) properties.dealstage = auditStage

  const body: Record<string, unknown> = { properties }
  if (contactId) {
    body.associations = [
      {
        to: { id: contactId },
        types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }], // deal -> contact
      },
    ]
  }

  const res = await hubspotFetch('/crm/v3/objects/deals', {
    method: 'POST',
    body: JSON.stringify(body),
  })

  if (!res) return null
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    console.error(`[hubspot] createDeal ${res.status}`, text.slice(0, 500))
    return null
  }

  const data = (await res.json().catch(() => null)) as { id?: string } | null
  return data?.id ?? null
}

/**
 * Attach a free-form note to a contact. Useful for inquiry messages.
 * Returns the note ID on success, null otherwise.
 */
export async function addNoteToContact(
  contactId: string,
  body: string,
): Promise<string | null> {
  if (!hubspotEnabled()) return null

  const res = await hubspotFetch('/crm/v3/objects/notes', {
    method: 'POST',
    body: JSON.stringify({
      properties: {
        hs_note_body: body,
        hs_timestamp: new Date().toISOString(),
      },
      associations: [
        {
          to: { id: contactId },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }], // note -> contact
        },
      ],
    }),
  })

  if (!res) return null
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    console.error(`[hubspot] addNoteToContact ${res.status}`, text.slice(0, 500))
    return null
  }

  const data = (await res.json().catch(() => null)) as { id?: string } | null
  return data?.id ?? null
}

export { hubspotEnabled }
