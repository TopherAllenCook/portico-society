'use client'

import Script from 'next/script'

/**
 * ElevenLabs Audio Native player ("Listen to this post").
 *
 * Audio Native matches the current page URL to a project in your ElevenLabs
 * account, so the only required value is your account's public user id, set
 * once via NEXT_PUBLIC_ELEVENLABS_PUBLIC_USER_ID. When it is not set (local dev,
 * previews before the account is wired) the component renders nothing rather
 * than an empty widget.
 *
 * Setup:
 *  1. ElevenLabs dashboard -> Audio Native -> enable, copy your public user id.
 *  2. Add NEXT_PUBLIC_ELEVENLABS_PUBLIC_USER_ID to the Vercel env.
 *  3. In Audio Native, add each post URL (or enable URL auto-detection) so it
 *     generates the narration for that page.
 */

const PUBLIC_USER_ID = process.env.NEXT_PUBLIC_ELEVENLABS_PUBLIC_USER_ID

export default function AudioNativeVerve() {
  if (!PUBLIC_USER_ID) return null

  return (
    <div className="not-prose">
      <p
        className="text-xs font-medium uppercase tracking-[0.22em]"
        style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)', marginBottom: '0.5rem' }}
      >
        Listen to this post
      </p>
      <div
        id="elevenlabs-audionative-widget"
        data-height="90"
        data-width="100%"
        data-frameborder="no"
        data-scrolling="no"
        data-publicuserid={PUBLIC_USER_ID}
        data-playerurl="https://elevenlabs.io/player/index.html"
        data-small="False"
        data-textcolor="rgb(33, 28, 24)"
        data-backgroundcolor="rgb(241, 234, 217)"
      >
        Loading the audio version…
      </div>
      <Script
        src="https://elevenlabs.io/player/audioNativeHelper.js"
        strategy="afterInteractive"
      />
    </div>
  )
}
