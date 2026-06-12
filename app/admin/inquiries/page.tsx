import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/admin/auth'
import { adminSupabase } from '@/lib/audit/supabase'

export const dynamic = 'force-dynamic'

interface InquiryRow {
  id: string
  created_at: string
  name: string
  email: string
  practice: string | null
  message: string
  source: string
  hubspot_contact_id: string | null
}

export default async function AdminInquiriesPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  if (!(await isAdmin())) redirect('/admin/login?next=/admin/inquiries')
  const { q } = await searchParams

  const sb = adminSupabase()
  let query = sb
    .from('inquiries')
    .select('id, created_at, name, email, practice, message, source, hubspot_contact_id')
    .order('created_at', { ascending: false })
    .limit(200)

  if (q) query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,practice.ilike.%${q}%`)

  const { data, error } = await query
  const inquiries = (data ?? []) as InquiryRow[]

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-mono)' }}>
            Inquiries
          </p>
          <h1 className="mt-1 font-display" style={{ fontSize: '2rem', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>
            Contact form
          </h1>
        </div>
        <form className="flex items-center gap-2" action="/admin/inquiries">
          <input
            name="q"
            defaultValue={q ?? ''}
            placeholder="Search name, email, practice"
            className="rounded-md border px-3 py-2 text-sm"
            style={{ borderColor: 'var(--color-ink-subtle)', background: 'var(--color-ivory)', color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
          />
        </form>
      </div>

      {error && (
        <p className="mt-6 text-sm" style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-body)' }}>
          Failed to load inquiries: {error.message}
        </p>
      )}

      <div className="mt-8 overflow-hidden rounded-xl border" style={{ borderColor: 'var(--color-ink-subtle)' }}>
        <table className="w-full text-sm" style={{ fontFamily: 'var(--font-body)' }}>
          <thead>
            <tr style={{ background: 'var(--color-stone)' }}>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Practice</Th>
              <Th>Message</Th>
              <Th>CRM</Th>
              <Th>Received</Th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-12 text-center" style={{ color: 'var(--color-ink-muted)' }}>No inquiries.</td></tr>
            )}
            {inquiries.map((i) => (
              <tr key={i.id} className="border-t align-top" style={{ borderColor: 'var(--color-ink-subtle)' }}>
                <Td><span className="font-medium">{i.name}</span></Td>
                <Td>
                  <a href={`mailto:${i.email}`} className="hover:underline" style={{ color: 'var(--color-ink)' }}>{i.email}</a>
                </Td>
                <Td>{i.practice ?? '—'}</Td>
                <Td>
                  <span style={{ color: 'var(--color-ink-muted)' }}>
                    {i.message.length > 160 ? `${i.message.slice(0, 160)}…` : i.message}
                  </span>
                </Td>
                <Td>{i.hubspot_contact_id ? <span title={i.hubspot_contact_id} style={{ color: '#16A34A' }}>Synced</span> : <span style={{ color: 'var(--color-ink-muted)' }}>—</span>}</Td>
                <Td className="whitespace-nowrap">{fmt(i.created_at)}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.1em]"
      style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}
    >
      {children}
    </th>
  )
}

function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 ${className ?? ''}`} style={{ color: 'var(--color-ink)' }}>{children}</td>
}

function fmt(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}
