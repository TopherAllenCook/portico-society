import { redirect } from 'next/navigation'
import { isAdmin, signIn } from '@/lib/admin/auth'

export const dynamic = 'force-dynamic'

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string; next?: string }> }) {
  const { error, next } = await searchParams
  if (await isAdmin()) redirect(next || '/admin')

  async function loginAction(formData: FormData) {
    'use server'
    const password = String(formData.get('password') ?? '')
    const nextPath = String(formData.get('next') ?? '/admin')
    const ok = await signIn(password)
    if (ok) redirect(nextPath)
    redirect(`/admin/login?error=1&next=${encodeURIComponent(nextPath)}`)
  }

  return (
    <div className="mx-auto mt-20 max-w-sm">
      <p
        className="text-xs uppercase tracking-[0.18em]"
        style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-mono)' }}
      >
        Verve Admin
      </p>
      <h1
        className="mt-2 font-display"
        style={{ fontSize: '1.75rem', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}
      >
        Sign in
      </h1>
      <form action={loginAction} className="mt-8 space-y-4">
        <input type="hidden" name="next" value={next || '/admin'} />
        <label className="block">
          <span
            className="block text-xs uppercase tracking-[0.1em]"
            style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}
          >
            Password
          </span>
          <input
            name="password"
            type="password"
            autoFocus
            className="mt-2 w-full rounded-md border px-4 py-3 text-sm"
            style={{ borderColor: 'var(--color-ink-subtle)', background: 'var(--color-ivory)', color: 'var(--color-ink)' }}
          />
        </label>
        {error && (
          <p className="text-xs" style={{ color: 'var(--color-cinnabar)' }}>
            Wrong password.
          </p>
        )}
        <button
          type="submit"
          className="w-full rounded-full py-3 text-sm font-semibold"
          style={{ background: 'var(--color-cinnabar)', color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
        >
          Sign in
        </button>
      </form>
    </div>
  )
}
