import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const PROBE_TOKEN = 'verve-env-probe-1779840000'

function digest(value: string | undefined): { present: boolean; length: number; prefix: string; suffix: string } {
  if (!value) return { present: false, length: 0, prefix: '', suffix: '' }
  return {
    present: true,
    length: value.length,
    prefix: value.slice(0, 6),
    suffix: value.slice(-4),
  }
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (token !== PROBE_TOKEN) return NextResponse.json({ error: 'forbidden' }, { status: 403 })

  const env = process.env
  return NextResponse.json({
    vercel_env: env.VERCEL_ENV ?? null,
    vercel_url: env.VERCEL_URL ?? null,
    vercel_git_commit_sha: env.VERCEL_GIT_COMMIT_SHA ?? null,
    next_public_supabase_url: env.NEXT_PUBLIC_SUPABASE_URL ?? null,
    supabase_service_role_key: digest(env.SUPABASE_SERVICE_ROLE_KEY),
    resend_api_key: digest(env.RESEND_API_KEY),
    audit_run_token: digest(env.AUDIT_RUN_TOKEN),
    public_base_url: env.PUBLIC_BASE_URL ?? null,
    audit_notify_email: env.AUDIT_NOTIFY_EMAIL ?? null,
    email_from: env.EMAIL_FROM ?? null,
  })
}
