import Script from 'next/script'

/**
 * GA4 measurement ID. Hardcoded because it's a public identifier (visible in
 * any pageview's network tab), not a secret. If you ever need a per-environment
 * split (e.g. separate property for staging), swap to env-var:
 *
 *   const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
 */
const GA_ID = 'G-DRF89N1D8T'

interface GoogleAnalyticsProps {
  /**
   * Force the script to load even outside production. Defaults to false so
   * `npm run dev` and Vercel preview deployments don't pollute the prod GA
   * property with developer traffic.
   */
  forceLoad?: boolean
}

export default function GoogleAnalytics({ forceLoad = false }: GoogleAnalyticsProps) {
  if (!forceLoad && process.env.NODE_ENV !== 'production') return null
  if (!GA_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
