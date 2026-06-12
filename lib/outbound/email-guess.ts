import dns from 'dns/promises'
import type { EmailPatterns } from './types'

/**
 * Generates ranked email candidate addresses for a clinic and verifies that
 * the domain at least has MX records (i.e. can receive email at all).
 *
 * This is the FREE tier of email discovery:
 *   - We do not verify individual mailboxes (would need Hunter / NeverBounce / Smartlead).
 *   - MX records only confirm the domain accepts mail — a 'hello@' could still bounce.
 *   - The 'primary' is the highest-confidence guess, not a verified address.
 *
 * Sam should treat the primary as a starting point and let Instantly's bounce
 * detection handle the final verification at send time.
 */

export interface GuessArgs {
  websiteUrl: string | null
  ownerNames: string[]
}

export async function guessEmails(args: GuessArgs): Promise<EmailPatterns> {
  const domain = extractDomain(args.websiteUrl)
  if (!domain) {
    return { candidates: [], primary: null, domain: null, mx_verified: false }
  }

  const mxOk = await checkMx(domain).catch(() => false)
  const candidates: string[] = []

  // 1. Owner-based patterns (highest confidence when we have names)
  for (const fullName of args.ownerNames) {
    const parts = fullName.toLowerCase().split(/\s+/).filter((p) => /^[a-z]/.test(p))
    if (parts.length < 2) continue
    const first = parts[0]
    const last = parts[parts.length - 1]
    candidates.push(
      `${first}.${last}@${domain}`,
      `${first}${last}@${domain}`,
      `${first[0]}${last}@${domain}`,
      `${first}@${domain}`,
    )
  }

  // 2. Generic role-based (most clinics monitor these)
  candidates.push(
    `info@${domain}`,
    `hello@${domain}`,
    `contact@${domain}`,
    `admin@${domain}`,
    `office@${domain}`,
  )

  // De-dupe while preserving rank order
  const seen = new Set<string>()
  const ranked = candidates.filter((e) => {
    const k = e.toLowerCase()
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })

  return {
    candidates: ranked,
    primary: ranked[0] ?? null,
    domain,
    mx_verified: mxOk,
  }
}

/* ─── Internal ──────────────────────────────────────────────────────────── */

function extractDomain(websiteUrl: string | null): string | null {
  if (!websiteUrl) return null
  try {
    const u = new URL(websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`)
    return u.hostname.replace(/^www\./i, '').toLowerCase()
  } catch {
    return null
  }
}

async function checkMx(domain: string): Promise<boolean> {
  const records = await dns.resolveMx(domain)
  return Array.isArray(records) && records.length > 0
}
