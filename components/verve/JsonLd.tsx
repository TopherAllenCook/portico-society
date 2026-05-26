const BASE_URL = 'https://www.vervemd.com'

const organization = {
  '@type': 'Organization',
  '@id': `${BASE_URL}#organization`,
  name: 'Verve MD',
  legalName: 'Verve Clinic Marketing LLC',
  url: BASE_URL,
  logo: `${BASE_URL}/brand/wordmark-light.png`,
  image: `${BASE_URL}/opengraph-image`,
  description:
    'Marketing systems for longevity, concierge, and aesthetic medicine practices. SEO, AEO, paid media, AI patient agents.',
  email: 'hello@vervemd.com',
  sameAs: [],
}

const professionalService = {
  '@type': 'ProfessionalService',
  '@id': `${BASE_URL}#service`,
  name: 'Verve MD',
  url: BASE_URL,
  image: `${BASE_URL}/opengraph-image`,
  priceRange: '$1,500 to $6,500 per month',
  description:
    'Patient acquisition systems built exclusively for longevity, concierge, and aesthetic medicine. AI search visibility, paid media, lead capture, and reputation.',
  areaServed: { '@type': 'Country', name: 'United States' },
  serviceType: [
    'Search Engine Optimization',
    'Answer Engine Optimization',
    'Paid Search Management',
    'Website Design',
    'AI Patient Agents',
    'Reputation Management',
  ],
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Longevity, concierge, and aesthetic medicine practices',
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
    description: 'Active patient acquisition. Everything in Essential plus PPC, landing pages, content engine, lead nurture.',
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
    description: 'Complete marketing department. Everything in Growth plus AI Patient Agent, no-show recovery, retention engine, dedicated strategy lead.',
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
