import test from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { BUSINESS, COMMENTIQ_AI_PROVIDER, LEGAL_PAGES, LEGAL_PATHS, LEGACY_LEGAL_REDIRECTS } from './business.js'
import { en } from '../locales/en.js'
import { ur } from '../locales/ur.js'
import { getPublicPages } from '../lib/site.ts'
import { structuredData } from '../lib/public-content.ts'

test('business details keep the exact public spelling', () => {
  assert.equal(BUSINESS.name, 'TeXCodes')
  assert.equal(BUSINESS.owner, 'Muhammad Ameer Hamza')
  assert.equal(BUSINESS.email, 'admin@texcodes.com')
  assert.equal(BUSINESS.phone, '+92 309 1824000')
  assert.equal(BUSINESS.phoneE164, '+923091824000')
  assert.equal(BUSINESS.bookingUrl, 'https://calendly.com/texcodes000/30min')
})

test('legal pages live at clean URLs', () => {
  assert.deepEqual(LEGAL_PATHS, { privacy: '/privacy-policy', terms: '/terms-of-service', dataDeletion: '/data-deletion' })
})

test('server-rendered Organization JSON-LD matches the business details', () => {
  const organization = structuredData(getPublicPages()[0])['@graph'][0]
  assert.deepEqual(organization, {
    '@type': 'Organization',
    '@id': `${BUSINESS.url}/#organization`,
    name: BUSINESS.name,
    url: BUSINESS.url,
    logo: `${BUSINESS.url}/brand/texcodes-logo.png`,
    email: BUSINESS.email,
    telephone: BUSINESS.phoneE164,
    founder: { '@type': 'Person', name: BUSINESS.owner },
  })
})

test('old legal URLs permanently redirect to canonical pages', () => {
  const rules = readFileSync(new URL('../../public/_redirects', import.meta.url), 'utf8')
    .split('\n')
    .map((line) => line.trim().split(/\s+/))
    .filter(([from]) => from && !from.startsWith('#'))
  for (const { from, to } of LEGACY_LEGAL_REDIRECTS) {
    const index = rules.findIndex(([source]) => source === from)
    assert.ok(index !== -1, `${from} must be redirected`)
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

test('contact page business card is labelled in both languages', () => {
  for (const dict of [en, ur]) {
    for (const key of ['business_heading', 'business_name_label', 'owner_label', 'business_email_label', 'phone_label']) {
      assert.ok(dict.contact[key]?.trim(), `missing contact.${key}`)
    }
  }
})

test('CommentIQ names OpenAI as its AI provider', () => {
  assert.equal(COMMENTIQ_AI_PROVIDER, 'OpenAI')
})

test('every legal path has static page metadata', () => {
  assert.deepEqual(LEGAL_PAGES.map((page) => page.path), Object.values(LEGAL_PATHS))
  for (const page of LEGAL_PAGES) {
    assert.ok(page.title.trim() && page.description.trim(), `${page.path}: needs a title and description`)
    assert.doesNotMatch(page.description, /["&<>]/, `${page.path}: keep the description free of HTML-escaped characters`)
  }
})

test('no SPA rewrite overrides server rendering or real 404s', () => {
  const rules = readFileSync(new URL('../../public/_redirects', import.meta.url), 'utf8').split('\n').map((line) => line.trim())
  assert.ok(!rules.some((line) => /^\/\*\s+\/index\.html/.test(line)))
})

test('no street address or city appears anywhere on the site', () => {
  const files = []
  const walk = (dir) => {
    for (const name of readdirSync(new URL(`../../${dir}`, import.meta.url))) {
      const path = `${dir}/${name}`
      if (statSync(new URL(`../../${path}`, import.meta.url)).isDirectory()) walk(path)
      else if (/\.(jsx?|tsx?|html)$/.test(name) && !/\.test\.[jt]s$/.test(name)) files.push(path)
    }
  }
  walk('src')
  for (const file of files) {
    const source = readFileSync(new URL(`../../${file}`, import.meta.url), 'utf8')
    assert.doesNotMatch(source, /Gujranwala|Mehar Noor|Islam Pura|52250|Punjab|PostalAddress/i, `${file} still shows the address or city`)
  }
})
