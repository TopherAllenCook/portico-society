import type { NextRequest } from 'next/server'

/**
 * Dependency-free in-memory fixed-window rate limiter.
 *
 * This intentionally has no Redis/Upstash dependency — it's a first line of
 * defense against a single source hammering an endpoint, not a distributed
 * quota. On a multi-instance serverless deployment each instance keeps its own
 * window, so the effective ceiling is (limit × warm instances). That's still
 * enough to stop a naive bot from spinning the paid-API pipeline thousands of
 * times. If we ever need hard global limits, swap the Map for Upstash here and
 * nothing else changes.
 */

interface Window {
  count: number
  resetAt: number // epoch ms
}

const windows = new Map<string, Window>()
let lastSweep = 0

function sweep(now: number) {
  // Cheap opportunistic GC so the Map can't grow unbounded across many IPs.
  if (now - lastSweep < 60_000) return
  lastSweep = now
  for (const [key, w] of windows) {
    if (w.resetAt <= now) windows.delete(key)
  }
}

export interface RateLimitResult {
  ok: boolean
  remaining: number
  retryAfterSec: number
}

export function rateLimit(
  key: string,
  opts: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now()
  sweep(now)

  const existing = windows.get(key)
  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + opts.windowMs })
    return { ok: true, remaining: opts.limit - 1, retryAfterSec: 0 }
  }

  if (existing.count >= opts.limit) {
    return { ok: false, remaining: 0, retryAfterSec: Math.ceil((existing.resetAt - now) / 1000) }
  }

  existing.count += 1
  return { ok: true, remaining: opts.limit - existing.count, retryAfterSec: 0 }
}

/**
 * Best-effort client IP from proxy headers.
 *
 * SECURITY: the LEFTMOST x-forwarded-for entry is supplied by the client and is
 * therefore spoofable. Keying the limiter on it lets an attacker mint a fresh
 * identity per request and never trip the cap. Trusted proxies (Vercel's edge)
 * APPEND the real client IP to the RIGHT end of x-forwarded-for, so we read the
 * entry TRUSTED_PROXY_HOPS positions from the right (default 1, correct for
 * Vercel), never the left. Falls back to x-real-ip, then a constant so a missing
 * header can't bypass the limiter entirely. If you sit behind extra trusted
 * proxies, set TRUSTED_PROXY_HOPS to the number of hops your infra appends.
 */
export function clientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) {
    const parts = fwd.split(',').map((s) => s.trim()).filter(Boolean)
    if (parts.length) {
      const hops = Math.max(1, Number(process.env.TRUSTED_PROXY_HOPS) || 1)
      const ip = parts[Math.max(0, parts.length - hops)]
      if (ip) return ip
    }
  }
  return req.headers.get('x-real-ip')?.trim() || 'unknown'
}
