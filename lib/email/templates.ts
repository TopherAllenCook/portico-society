/**
 * Branded transactional email templates for Verve MD.
 *
 * Table-based layout (the only thing email clients agree on),
 * inline CSS only, web-safe fonts (Georgia for the display register;
 * system sans for body). Plain-text fallbacks included for clients
 * that don't render HTML.
 *
 * One shared shell, then per-message inner blocks composed into it.
 */

const COLORS = {
  ivory: '#F5EFE3',      // page bg
  card: '#FBF6EA',       // surface
  ink: '#1F1B16',        // body text
  body: '#4A4540',       // secondary text
  rule: '#E3DDCB',       // hairlines
  cinnabar: '#C44536',   // accent
  ivoryText: '#FFF8EA',  // on-accent text
} as const

interface ShellOpts {
  preheader: string         // hidden inbox preview
  body: string              // raw HTML for the body cell
  unsubscribeUrl?: string   // if set, renders an unsubscribe link in the outer footer
}

function shell({ preheader, body, unsubscribeUrl }: ShellOpts): string {
  const unsubLine = unsubscribeUrl
    ? ` <a href="${unsubscribeUrl}" style="color:${COLORS.body};text-decoration:underline;">Unsubscribe</a> to stop these messages.`
    : ''
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Verve MD</title>
</head>
<body style="margin:0;padding:0;background:${COLORS.ivory};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:${COLORS.ink};-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:${COLORS.ivory};opacity:0;">${escape(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLORS.ivory};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:${COLORS.card};border:1px solid ${COLORS.rule};border-radius:16px;">
          <!-- Header -->
          <tr>
            <td style="padding:28px 32px 18px 32px;border-bottom:1px solid ${COLORS.rule};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:600;letter-spacing:-0.01em;color:${COLORS.ink};">
                    Verve <span style="color:${COLORS.cinnabar};font-style:italic;">MD</span>
                  </td>
                  <td align="right" style="font-size:11px;font-weight:500;letter-spacing:0.16em;text-transform:uppercase;color:${COLORS.body};">
                    AI Search · Patient Acquisition
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:36px 32px 32px 32px;">
              ${body}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;border-top:1px solid ${COLORS.rule};font-size:12px;line-height:1.6;color:${COLORS.body};">
              <p style="margin:0 0 6px 0;">Verve MD &middot; AI search authority &amp; inquiry systems for established clinics.</p>
              <p style="margin:0;">
                <a href="https://vervemd.com" style="color:${COLORS.cinnabar};text-decoration:none;">vervemd.com</a>
                &nbsp;·&nbsp;
                <a href="mailto:hello@vervemd.com" style="color:${COLORS.cinnabar};text-decoration:none;">hello@vervemd.com</a>
              </p>
            </td>
          </tr>
        </table>
        <p style="font-size:11px;line-height:1.6;color:${COLORS.body};opacity:0.7;margin:18px 0 0 0;max-width:560px;">
          You're receiving this because you requested a free Verve MD audit.
          Reply to this email if you didn't.${unsubLine}
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function pillButton(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0;">
    <tr>
      <td style="border-radius:9999px;background:${COLORS.cinnabar};">
        <a href="${href}" style="display:inline-block;padding:14px 26px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:14px;font-weight:600;color:${COLORS.ivoryText};text-decoration:none;border-radius:9999px;">${escape(label)}</a>
      </td>
    </tr>
  </table>`
}

function eyebrow(text: string): string {
  return `<p style="margin:0 0 12px 0;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:${COLORS.cinnabar};">${escape(text)}</p>`
}

function display(text: string): string {
  return `<p style="margin:0 0 18px 0;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.15;letter-spacing:-0.02em;color:${COLORS.ink};">${escape(text)}</p>`
}

function para(text: string, opts: { muted?: boolean } = {}): string {
  const color = opts.muted ? COLORS.body : COLORS.ink
  return `<p style="margin:0 0 14px 0;font-size:15px;line-height:1.65;color:${color};">${escape(text)}</p>`
}

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
}

/* ─── Public templates ──────────────────────────────────────────────────── */

export interface AuditReadyArgs {
  contact_first_name: string
  clinic_name: string
  report_url: string
  city: string
  unsubscribe_url: string
}

export function auditReadyEmail(args: AuditReadyArgs): { subject: string; html: string; text: string } {
  const body = [
    eyebrow('Your audit is ready'),
    display(`${args.contact_first_name}, the report is in.`),
    para(`We ran the same checks our analysts use on ${args.clinic_name}: AI search visibility for your specialty in ${args.city}, citation gaps to the practices ChatGPT and Perplexity are naming, your structured data, page performance, and inquiry-path conversion.`),
    para(`The full audit is one click away. It's private to your inbox.`),
    pillButton(args.report_url, 'View your audit'),
    para(`Read it twice. The prioritized moves are ranked by impact, not effort. The cheap wins come first.`, { muted: true }),
    para(`Reply to this email with questions. The principal reads every response.`, { muted: true }),
  ].join('\n')

  return {
    subject: `Your Verve audit: ${args.clinic_name}`,
    html: shell({
      preheader: `Your AEO + marketing audit for ${args.clinic_name} is ready to view.`,
      body,
      unsubscribeUrl: args.unsubscribe_url,
    }),
    text:
      `${args.contact_first_name},\n\n` +
      `Your Verve MD audit for ${args.clinic_name} is ready.\n\n` +
      `View your audit: ${args.report_url}\n\n` +
      `Reply to this email with questions. The principal reads every response.\n\n` +
      `— Verve MD\nhttps://vervemd.com\n` +
      `Unsubscribe: ${args.unsubscribe_url}`,
  }
}

export interface AuditAckArgs {
  contact_first_name: string
  clinic_name: string
  status_url: string
  unsubscribe_url: string
}

export function auditAckEmail(args: AuditAckArgs): { subject: string; html: string; text: string } {
  const body = [
    eyebrow('Audit in progress'),
    display(`${args.contact_first_name}, we're on it.`),
    para(`We received the audit request for ${args.clinic_name}. The pipeline is running now: AI search visibility, citation gaps, structured data, page performance, and inquiry-path conversion.`),
    para(`Most audits land in your inbox within 10 minutes. If anything blocks the run, you'll hear from us directly.`),
    pillButton(args.status_url, 'Check audit status'),
    para(`Reply to this email anytime. The principal reads every response.`, { muted: true }),
  ].join('\n')

  return {
    subject: `We're preparing your Verve audit: ${args.clinic_name}`,
    html: shell({
      preheader: `Your audit for ${args.clinic_name} is generating now. We'll email the report shortly.`,
      body,
      unsubscribeUrl: args.unsubscribe_url,
    }),
    text:
      `${args.contact_first_name},\n\n` +
      `We received your audit request for ${args.clinic_name} and the pipeline is running now.\n\n` +
      `Most audits land in your inbox within 10 minutes. If anything blocks the run, you'll hear from us directly.\n\n` +
      `Check status: ${args.status_url}\n\n` +
      `Reply to this email anytime. The principal reads every response.\n\n` +
      `— Verve MD\nhttps://vervemd.com\n` +
      `Unsubscribe: ${args.unsubscribe_url}`,
  }
}

export interface LeadNotifyArgs {
  clinic_name: string
  website_url: string
  city: string
  state: string | null
  specialty: string
  contact_name: string
  contact_email: string
  contact_phone: string | null
  challenge: string | null
  audit_id: string
  admin_url: string
}

export function leadNotifyEmail(args: LeadNotifyArgs): { subject: string; html: string; text: string } {
  const fieldRow = (label: string, value: string | null) => {
    if (!value) return ''
    return `<tr>
      <td style="padding:10px 0;border-bottom:1px solid ${COLORS.rule};vertical-align:top;width:38%;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:${COLORS.body};">${escape(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid ${COLORS.rule};vertical-align:top;font-size:14px;color:${COLORS.ink};">${escape(value)}</td>
    </tr>`
  }

  const fields = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 22px 0;border-top:1px solid ${COLORS.rule};">
    ${fieldRow('Clinic', args.clinic_name)}
    ${fieldRow('Website', args.website_url)}
    ${fieldRow('City', args.state ? `${args.city}, ${args.state}` : args.city)}
    ${fieldRow('Specialty', args.specialty)}
    ${fieldRow('Contact', args.contact_name)}
    ${fieldRow('Email', args.contact_email)}
    ${fieldRow('Phone', args.contact_phone)}
    ${fieldRow('Challenge', args.challenge)}
    ${fieldRow('Audit ID', args.audit_id)}
  </table>`

  const body = [
    eyebrow('New lead'),
    display(`${args.clinic_name} just requested an audit.`),
    para(`Audit is generating now. They'll be redirected to the report when it's done. You'll get a copy of the final report email too.`, { muted: true }),
    fields,
    pillButton(args.admin_url, 'Open in admin'),
  ].join('\n')

  return {
    subject: `New lead: ${args.clinic_name} (${args.city})`,
    html: shell({ preheader: `${args.clinic_name} just requested an audit in ${args.city}.`, body }),
    text:
      `New audit lead\n\n` +
      `Clinic: ${args.clinic_name}\n` +
      `Website: ${args.website_url}\n` +
      `City: ${args.state ? `${args.city}, ${args.state}` : args.city}\n` +
      `Specialty: ${args.specialty}\n` +
      `Contact: ${args.contact_name} <${args.contact_email}>\n` +
      (args.contact_phone ? `Phone: ${args.contact_phone}\n` : '') +
      (args.challenge ? `Challenge: ${args.challenge}\n` : '') +
      `\nAudit ID: ${args.audit_id}\n` +
      `Admin: ${args.admin_url}\n`,
  }
}