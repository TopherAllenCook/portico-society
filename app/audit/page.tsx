import NavVerve from '@/components/verve/NavVerve'
import AuditHeroVerve from '@/components/verve/AuditHeroVerve'
import AuditFormVerve from '@/components/verve/AuditFormVerve'
import AuditWhatYouGetVerve from '@/components/verve/AuditWhatYouGetVerve'
import PhotoBandVerve from '@/components/verve/PhotoBandVerve'
import FooterVerve from '@/components/verve/FooterVerve'
import type { Metadata } from 'next'

const PAGE_URL = 'https://www.vervemd.com/audit'
const PAGE_TITLE = 'Free AEO + Marketing Audit for Home Service Businesses'
const PAGE_DESC =
  'Find out if AI recommends your business. Free AEO visibility audit + marketing assessment for home service businesses. Delivered in 48 hours, no sales call.'

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

const AUDIT_FAQ = [
  {
    q: 'What is the free audit, and what do I actually get?',
    a: 'A real-time check of how ChatGPT, Claude, and Gemini answer customer questions for your trade and city. You get an AI Visibility Score, a Competitor Edge Map, SEO + schema health notes, and an Inquiry Path audit with specific fixes ranked by impact. Delivered to your inbox in about three minutes.',
  },
  {
    q: 'How long does it take?',
    a: 'About three minutes for the live report. A copy lands in your inbox within 48 hours, polished and ready to forward.',
  },
  {
    q: 'Do I have to talk to a salesperson?',
    a: 'No. The audit is free, no call required. If you want to talk through the findings, the report includes a link to book a 25-minute call with the founder.',
  },
  {
    q: 'Is the audit really free? What is the catch?',
    a: 'It is free, and the catch is that we run it knowing most businesses will not buy. The audit is the cheapest, most honest way to find businesses worth working with.',
  },
]

const pageLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.vervemd.com' },
        { '@type': 'ListItem', position: 2, name: 'Free Audit', item: PAGE_URL },
      ],
    },
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'Free AEO + Marketing Audit',
      description:
        'A free AI visibility and marketing audit for home service businesses. Delivered in 48 hours with no sales call required.',
      provider: { '@id': 'https://www.vervemd.com#organization' },
      areaServed: { '@type': 'Country', name: 'United States' },
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'Home service businesses and trade contractors',
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: AUDIT_FAQ.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ],
}

export default function AuditPage() {
  return (
    <>
      <NavVerve light />
      <main>
        <AuditHeroVerve />
        <PhotoBandVerve
          src="https://images.unsplash.com/photo-1657687380097-88a4a3570bba?auto=format&fit=crop&w=2400&q=80"
          height="clamp(200px, 26vw, 340px)"
        />
        <section id="audit-form" className="px-6 py-16 lg:px-16" style={{ background: 'var(--color-ink)' }}>
          <AuditFormVerve />
        </section>
        <AuditWhatYouGetVerve />
      </main>
      <FooterVerve />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />
    </>
  )
}
