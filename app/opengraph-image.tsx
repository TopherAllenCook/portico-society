import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Verve MD: Marketing for Longevity & Aesthetics Clinics'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f1ead9',
          padding: '72px',
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              width: '88px',
              height: '88px',
              borderRadius: '14px',
              background: '#211c18',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <span
              style={{
                fontSize: '64px',
                fontWeight: 600,
                color: '#f1ead9',
                letterSpacing: '-2px',
                lineHeight: 1,
                marginTop: '-4px',
              }}
            >
              V
            </span>
            <span
              style={{
                position: 'absolute',
                bottom: '14px',
                right: '14px',
                width: '12px',
                height: '12px',
                borderRadius: '6px',
                background: '#d68d63',
              }}
            />
          </div>
          <span
            style={{
              fontSize: '36px',
              color: '#211c18',
              fontWeight: 600,
              letterSpacing: '-1px',
            }}
          >
            Verve <span style={{ color: '#a14823', fontStyle: 'italic' }}>MD</span>
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p
            style={{
              fontSize: '28px',
              color: '#a14823',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              margin: 0,
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 500,
            }}
          >
            For longevity &amp; aesthetics clinics
          </p>
          <h1
            style={{
              fontSize: '78px',
              color: '#211c18',
              lineHeight: 1.05,
              letterSpacing: '-2px',
              margin: 0,
              fontWeight: 600,
              maxWidth: '960px',
            }}
          >
            Every consult you miss is{' '}
            <span style={{ color: '#a14823', fontStyle: 'italic' }}>
              $5,000 walking past your door.
            </span>
          </h1>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '24px',
            borderTop: '1px solid #21281c33',
          }}
        >
          <span
            style={{
              fontSize: '22px',
              color: '#211c18',
              opacity: 0.7,
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            vervemd.com
          </span>
          <span
            style={{
              fontSize: '22px',
              color: '#211c18',
              opacity: 0.7,
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Free AI visibility audit · 3 min
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
