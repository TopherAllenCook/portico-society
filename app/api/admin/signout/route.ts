import { NextResponse } from 'next/server'
import { signOut } from '@/lib/admin/auth'

export const runtime = 'nodejs'

export async function POST() {
  await signOut()
  return NextResponse.redirect(new URL('/admin/login', process.env.PUBLIC_BASE_URL ?? 'http://localhost:3000'))
}
