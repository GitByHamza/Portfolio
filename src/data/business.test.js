import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { BUSINESS, FULL_ADDRESS, LEGAL_PATHS } from './business.js'

test('business details keep the exact public spelling', () => {
  assert.equal(BUSINESS.name, 'TeXCodes')
  assert.equal(BUSINESS.owner, 'Muhammad Ameer Hamza')
  assert.equal(BUSINESS.email, 'admin@texcodes.com')
  assert.equal(BUSINESS.phone, '+92 309 1824000')
  assert.equal(BUSINESS.phoneE164, '+923091824000')
  assert.equal(FULL_ADDRESS, 'Bazar Mehar Noor Wala, Gali No 9, Mohalla Islam Pura, Gujranwala 52250, Punjab, Pakistan')
})

test('legal pages live at clean URLs', () => {
  assert.deepEqual(LEGAL_PATHS, { privacy: '/privacy-policy', terms: '/terms-of-service', dataDeletion: '/data-deletion' })
})

test('index.html Organization JSON-LD matches the business details', () => {
  const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8')
  const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
  assert.ok(json, 'index.html is missing the Organization JSON-LD')
  const { address } = BUSINESS
  assert.deepEqual(JSON.parse(json), {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BUSINESS.name,
    url: BUSINESS.url,
    email: BUSINESS.email,
    telephone: BUSINESS.phoneE164,
    founder: { '@type': 'Person', name: BUSINESS.owner },
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.countryCode,
    },
  })
})
