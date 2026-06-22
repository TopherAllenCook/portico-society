import type { Metadata } from 'next'
import NavVerve from '@/components/verve/NavVerve'
import FooterVerve from '@/components/verve/FooterVerve'
import NameCheckVerve from '@/components/verve/NameCheckVerve'

const PAGE_URL = 'https://www.vervemd.com/name-check'
const PAGE_TITLE = 'AI Name Check: See If AI Names Your Home Service Business'
const PAGE_DESC =
  'Type your business name, city, and trade. We ask the leading AI assistants the same question your next customer is asking, and show you whether you are named or whether a competitor is named instead. Free, no call.'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: PAGE_URL,
    type: 'website',
    images: ['/opengraph-image'],
  },
  twitter: { card: 'summary_large_image', title: PAGE_TITLE, description: PAGE_DESC, images: ['/twitter-image'] },
}

const pageLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESC,
      isPartOf: { '@id': 'https://www.vervemd.com#website' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.vervemd.com' },
        { '@type': 'ListItem', position: 2, name: 'AI Name Check', item: PAGE_URL },
      ],
    },
  ],
}

export default function NameCheckPage() {
  return (
    <>
      <NavVerve light />
      <main>
        <section
          className="px-6 pt-32 pb-14 lg:px-16 lg:pt-40 lg:pb-16"
          style={{ background: 'var(--color-ivory)' }}
        >
          <div className="mx-auto max-w-5xl">
            <p
              className="text-xs font-medium uppercase tracking-[0.22em]"
              style={{ color: 'var(--color-label-text)', fontFamily: 'var(--font-body)' }}
            >
              Free AI Name Check. No call, no email to run it
            </p>
            <h1
              className="mt-4 font-display font-semibold"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: 'var(--color-ink)',
                letterSpacing: '-0.03em',
                lineHeight: 1.03,
                maxWidth: '20ch',
              }}
            >
              See if AI names your business when a homeowner asks for the best in your city.
            </h1>
            <p
              className="mt-6 text-base leading-relaxed lg:text-lg"
              style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)', maxWidth: '56ch' }}
            >
              When a homeowner asks an AI assistant for the best plumber, HVAC company, electrician, or roofer near them,
              your business is either in the answer or it does not exist. Type three things you already know and see,
              honestly, whether you are named or whether a competitor is named instead.
            </p>
          </div>
        </section>

        <NameCheckVerve />
      </main>
      <FooterVerve />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />
    </>
  )
}
