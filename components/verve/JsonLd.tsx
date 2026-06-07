const BASE_URL = 'https://www.vervemd.com'

const organization = {
  '@type': 'Organization',
  '@id': `${BASE_URL}#organization`,
  name: 'Verve MD',
  legalName: 'Verve Marketing Department LLC',
  url: BASE_URL,
  logo: `${BASE_URL}/brand/wordmark-light.png`,
  image: `${BASE_URL}/opengraph-image`,
  description:
    'Marketing systems for home service businesses. SEO, AEO, paid media, AI call agents, lead capture, and reputation.',
  email: 'hello@vervemd.com',
  telephone: '+1-385-275-6931',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'hello@vervemd.com',
      telephone: '+1-385-275-6931',
      areaServed: 'US',
      availableLanguage: ['en'],
    },
  ],
  sameAs: ['https://www.linkedin.com/company/118464101/'],
}

const professionalService = {
  '@type': 'ProfessionalService',
  '@id': `${BASE_URL}#service`,
  name: 'Verve MD',
  url: BASE_URL,
  image: `${BASE_URL}/opengraph-image`,
  priceRange: '$1,500 to $6,500 per month',
  description:
    'Lead generation systems built for home service businesses. AI search visibility, paid media, lead capture, call answering, and reputation.',
  areaServed: { '@type': 'Country', name: 'United States' },
  serviceType: [
    'Search Engine Optimization',
    'Answer Engine Optimization',
    'Paid Search Management',
    'Local Service Ads Management',
    'Website Design',
    'AI Call Agents',
    'Reputation Management',
  ],
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Home service businesses and trade contractors',
  },
  parentOrganization: { '@id': `${BASE_URL}#organization` },
}

const website = {
  '@type': 'WebSite',
  '@id': `${BASE_URL}#website`,
  url: BASE_URL,
  name: 'Verve MD',
  publisher: { '@id': `${BASE_URL}#organization` },
  inLanguage: 'en-US',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

const offers = [
  {
    '@type': 'Offer',
    '@id': `${BASE_URL}#offer-essential`,
    name: 'Essential',
    description: 'Foundation for visibility. SEO, AEO, Google Business, review requests, dashboard.',
    price: '1500',
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '1500',
      priceCurrency: 'USD',
      unitText: 'MONTH',
    },
    url: `${BASE_URL}/pricing`,
  },
  {
    '@type': 'Offer',
    '@id': `${BASE_URL}#offer-growth`,
    name: 'Growth',
    description: 'Active lead generation. Everything in Essential plus PPC, Local Service Ads, landing pages, content engine, lead nurture.',
    price: '3500',
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '3500',
      priceCurrency: 'USD',
      unitText: 'MONTH',
    },
    url: `${BASE_URL}/pricing`,
  },
  {
    '@type': 'Offer',
    '@id': `${BASE_URL}#offer-full`,
    name: 'Full Service',
    description: 'Complete marketing department. Everything in Growth plus AI Call Agent, missed-call recovery, reactivation engine, dedicated strategy lead.',
    price: '6500',
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '6500',
      priceCurrency: 'USD',
      unitText: 'MONTH',
    },
    url: `${BASE_URL}/pricing`,
  },
]

const graph = {
  '@context': 'https://schema.org',
  '@graph': [organization, professionalService, website, ...offers],
}

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
