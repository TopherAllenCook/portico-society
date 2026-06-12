/**
 * Honeypot field name shared by the public forms and their API routes.
 *
 * The field is rendered hidden + off-screen + aria-hidden + tabindex=-1 and
 * left empty by real users. Most dumb bots fill every input they find, so a
 * non-empty value is a strong bot signal.
 */
export const HONEYPOT_FIELD = 'company_size'

/**
 * Returns true if the submitted body looks like a bot (honeypot filled).
 * Callers should respond with a fake 200 so the bot learns nothing.
 */
export function checkHoneypot(body: unknown): boolean {
  if (!body || typeof body !== 'object') return false
  const value = (body as Record<string, unknown>)[HONEYPOT_FIELD]
  return typeof value === 'string' && value.trim().length > 0
}
