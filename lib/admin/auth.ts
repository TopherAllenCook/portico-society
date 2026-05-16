import { cookies } from 'next/headers'
import { createHmac, timingSafeEqual } from 'crypto'

const COOKIE_NAME = 'verve_admin'
const MAX_AGE_S = 60 * 60 * 24 * 14 // 14 days

function secret(): string {
  const s = process.env.ADMIN_PASSWORD
  if (!s) throw new Error('ADMIN_PASSWORD env missing')
  return s
}

function sessionToken(): string {
  // HMAC of a static label — keyed by the env password. Rotating the env
  // password invalidates every existing session.
  return createHmac('sha256', secret()).update('verve-admin-v1').digest('hex')
}

export async function isAdmin(): Promise<boolean> {
  if (!process.env.ADMIN_PASSWORD) return false
  const jar = await cookies()
  const cookie = jar.get(COOKIE_NAME)?.value
  if (!cookie) return false
  const expected = sessionToken()
  try {
    const a = Buffer.from(cookie, 'hex')
    const b = Buffer.from(expected, 'hex')
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

export async function signIn(password: string): Promise<boolean> {
  if (!process.env.ADMIN_PASSWORD) return false
  const a = Buffer.from(password)
  const b = Buffer.from(process.env.ADMIN_PASSWORD)
  if (a.length !== b.length) return false
  if (!timingSafeEqual(a, b)) return false
  const jar = await cookies()
  jar.set(COOKIE_NAME, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE_S,
  })
  return true
}

export async function signOut() {
  const jar = await cookies()
  jar.delete(COOKIE_NAME)
}
