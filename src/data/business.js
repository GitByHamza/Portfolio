// Public business details. The footer, contact page, legal pages and the
// JSON-LD in index.html must all match these (see business.test.js).
export const BUSINESS = {
  name: 'TeXCodes',
  owner: 'Muhammad Ameer Hamza',
  url: 'https://texcodes.com',
  email: 'admin@texcodes.com',
  phone: '+92 309 1824000',
  phoneE164: '+923091824000',
  bookingUrl: 'https://calendly.com/texcodes000/30min',
}

export const LEGAL_PATHS = {
  privacy: '/privacy-policy',
  terms: '/terms-of-service',
  dataDeletion: '/data-deletion',
}

// Static HTML is written for these at build time (scripts/prerender-legal.js).
export const LEGAL_PAGES = [
  {
    path: LEGAL_PATHS.privacy,
    title: 'Privacy Policy',
    description:
      'How TeXCodes collects, uses and protects personal information on texcodes.com and in CommentIQ, including data from connected Instagram, Facebook and TikTok accounts.',
  },
  {
    path: LEGAL_PATHS.terms,
    title: 'Terms of Service',
    description:
      'The terms for using texcodes.com and TeXCodes software, including CommentIQ: accounts, acceptable use, payments, termination, liability and governing law.',
  },
  {
    path: LEGAL_PATHS.dataDeletion,
    title: 'Data Deletion',
    description:
      'How to ask TeXCodes to delete your data, including CommentIQ data from connected Instagram, Facebook and TikTok accounts. Deletion is completed within 30 days.',
  },
]

// Old URLs that are already shared or indexed. public/_redirects 301s them as well.
export const LEGACY_LEGAL_REDIRECTS = [
  { from: '/terms', to: LEGAL_PATHS.terms },
  { from: '/privacy', to: LEGAL_PATHS.privacy },
]

export const LEGAL_EFFECTIVE_DATE = 'October 24, 2026'

// The AI service that analyses comment text for CommentIQ (OpenAI API, GPT models),
// named in the Privacy Policy.
export const COMMENTIQ_AI_PROVIDER = 'OpenAI'
