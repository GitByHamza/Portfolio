import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { BUSINESS, FULL_ADDRESS, LEGAL_PATHS, LEGACY_LEGAL_REDIRECTS } from './business.js'
import { en } from '../locales/en.js'
import { ur } from '../locales/ur.js'

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

test('old legal URLs 301 to the new ones before the SPA fallback', () => {
  const rules = readFileSync(new URL('../../public/_redirects', import.meta.url), 'utf8')
    .split('\n')
    .map((line) => line.trim().split(/\s+/))
    .filter(([from]) => from && !from.startsWith('#'))
  const fallback = rules.findIndex(([from]) => from === '/*')
  assert.notEqual(fallback, -1, 'SPA fallback rule is missing')
  for (const { from, to } of LEGACY_LEGAL_REDIRECTS) {
    const index = rules.findIndex(([source]) => source === from)
    assert.ok(index !== -1 && index < fallback, `${from} must be redirected before the /* fallback`)
    assert.deepEqual(rules[index].slice(1), [to, '301'])
  }
})

test('footer legal copy uses the TeXCodes spelling in both languages', () => {
  for (const dict of [en, ur]) {
    assert.equal(dict.footer.copyright, '© 2026 TeXCodes · Independent Software Engineering & Product Building')
    assert.equal(dict.footer.terms, 'Terms of Service')
    assert.equal(dict.footer.privacy, 'Privacy Policy')
    assert.equal(dict.footer.data_deletion, 'Data Deletion')
  }
})
