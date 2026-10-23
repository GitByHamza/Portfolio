// Public business details. The footer, contact page, legal pages and the
// JSON-LD in index.html must all match these (see business.test.js).
export const BUSINESS = {
  name: 'TeXCodes',
  owner: 'Muhammad Ameer Hamza',
  url: 'https://texcodes.com',
  email: 'admin@texcodes.com',
  phone: '+92 309 1824000',
  phoneE164: '+923091824000',
  address: {
    street: 'Bazar Mehar Noor Wala, Gali No 9, Mohalla Islam Pura',
    city: 'Gujranwala',
    region: 'Punjab',
    postalCode: '52250',
    country: 'Pakistan',
    countryCode: 'PK',
  },
}

const { street, city, postalCode, region, country } = BUSINESS.address
export const FULL_ADDRESS = `${street}, ${city} ${postalCode}, ${region}, ${country}`

export const LEGAL_PATHS = {
  privacy: '/privacy-policy',
  terms: '/terms-of-service',
  dataDeletion: '/data-deletion',
}

// Old URLs that are already shared or indexed. public/_redirects 301s them as well.
export const LEGACY_LEGAL_REDIRECTS = [
  { from: '/terms', to: LEGAL_PATHS.terms },
  { from: '/privacy', to: LEGAL_PATHS.privacy },
]

export const LEGAL_EFFECTIVE_DATE = 'October 24, 2026'
