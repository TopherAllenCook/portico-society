import type { LeadgenPayload } from './types'

/**
 * Lead-gen audit: a single Firecrawl scrape of the homepage gives us enough HTML to
 * detect CTAs, forms, booking widgets, analytics scripts, and chat. For a real
 * mobile-viewport screenshot pass we'd add Playwright; deferred for v1 to keep
 * the orchestrator stateless and fast.
 */
export function auditLeadgenFromHtml(url: string, html: string): LeadgenPayload {
  const lower = html.toLowerCase()

  const ctaWords = /(book|schedule|consult|get started|free audit|request|inquire|apply|call)/i
  const headerSlice = html.slice(0, 12000) // ~ first viewport worth of markup
  const ctaAboveFold = ctaWords.test(stripTags(headerSlice))

  const primaryCtaMatch = headerSlice.match(/<a[^>]*class=["'][^"']*(?:btn|button|cta)[^"']*["'][^>]*>([\s\S]*?)<\/a>/i)
    ?? headerSlice.match(/<button[^>]*>([\s\S]*?)<\/button>/i)
  const primaryCtaText = primaryCtaMatch ? stripTags(primaryCtaMatch[1]).slice(0, 80) : null

  const forms = matchAll(html, /<form\b[\s\S]*?<\/form>/gi)
  const formFieldCounts = forms.map((f) => (f.match(/<input\b/gi)?.length ?? 0) + (f.match(/<textarea\b/gi)?.length ?? 0))

  const phoneInHeader = /<header[\s\S]*?<\/header>/i.test(html)
    && /(tel:|\+?1?[\s-.]?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]?\d{4})/i.test(html.match(/<header[\s\S]*?<\/header>/i)?.[0] ?? '')
  const phoneClickable = /href=["']tel:/i.test(html)

  const bookingWidget = detect(lower, {
    calendly: ['calendly.com', 'data-calendly'],
    acuity: ['acuityscheduling.com'],
    nexhealth: ['nexhealth.com'],
    jane: ['jane.app', 'janeapp.com'],
    mindbody: ['mindbodyonline.com'],
    squarespace_scheduling: ['squarespacescheduling.com'],
    setmore: ['setmore.com'],
  })

  const chatWidget = detect(lower, {
    intercom: ['intercom.io', 'widget.intercom'],
    drift: ['drift.com', 'js.driftt.com'],
    hubspot: ['hs-scripts.com', 'hubspot.com/web-interactives'],
    tawk: ['tawk.to'],
    crisp: ['crisp.chat'],
    podium: ['podium.com', 'podium-app'],
  })

  return {
    url,
    cta_above_fold: ctaAboveFold,
    primary_cta_text: primaryCtaText,
    forms_found: forms.length,
    form_field_counts: formFieldCounts,
    phone_in_header: phoneInHeader,
    phone_clickable: phoneClickable,
    booking_widget: bookingWidget,
    chat_widget: chatWidget,
    ga4_present: /gtag\(['"]config['"],\s*['"]G-/i.test(html) || /www\.googletagmanager\.com\/gtag\/js\?id=G-/i.test(html),
    gtm_present: /www\.googletagmanager\.com\/gtm\.js/i.test(html) || /gtm-[a-z0-9]+/i.test(lower),
    meta_pixel_present: /fbq\(['"]init['"]/i.test(html) || /connect\.facebook\.net\/.+\/fbevents\.js/i.test(html),
    mobile_form_visible_at_375: forms.length > 0, // placeholder until Playwright pass exists
  }
}

function detect(haystack: string, map: Record<string, string[]>): string | null {
  for (const [name, needles] of Object.entries(map)) {
    if (needles.some((n) => haystack.includes(n))) return name
  }
  return null
}

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function matchAll(s: string, re: RegExp): string[] {
  const out: string[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(s)) !== null) out.push(m[0])
  return out
}
