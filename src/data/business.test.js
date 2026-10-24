import test from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { BUSINESS, COMMENTIQ_AI_PROVIDER, LEGAL_PAGES, LEGAL_PATHS, LEGACY_LEGAL_REDIRECTS } from './business.js'
import { en } from '../locales/en.js'
import { ur } from '../locales/ur.js'

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

test('index.html Organization JSON-LD matches the business details', () => {
  const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8')
  const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
  assert.ok(json, 'index.html is missing the Organization JSON-LD')
  assert.deepEqual(JSON.parse(json), {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BUSINESS.name,
    url: BUSINESS.url,
    email: BUSINESS.email,
    telephone: BUSINESS.phoneE164,
    founder: { '@type': 'Person', name: BUSINESS.owner },
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

test('SPA fallback is not forced, so Netlify serves the prerendered legal pages first', () => {
  const rules = readFileSync(new URL('../../public/_redirects', import.meta.url), 'utf8').split('\n').map((line) => line.trim())
  // A forced rule ("200!") would shadow dist/privacy-policy/index.html and the other static pages.
  assert.ok(rules.some((line) => /^\/\*\s+\/index\.html\s+200$/.test(line)), 'fallback must be "/* /index.html 200" (not forced)')
  assert.ok(!rules.some((line) => /^\/\*.*!$/.test(line)))
})

test('no street address or city appears anywhere on the site', () => {
  const files = ['index.html']
  const walk = (dir) => {
    for (const name of readdirSync(new URL(`../../${dir}`, import.meta.url))) {
      const path = `${dir}/${name}`
      if (statSync(new URL(`../../${path}`, import.meta.url)).isDirectory()) walk(path)
      else if (/\.(jsx?|html)$/.test(name) && !name.endsWith('.test.js')) files.push(path)
    }
  }
  walk('src')
  for (const file of files) {
    const source = readFileSync(new URL(`../../${file}`, import.meta.url), 'utf8')
    assert.doesNotMatch(source, /Gujranwala|Mehar Noor|Islam Pura|52250|Punjab|PostalAddress/i, `${file} still shows the address or city`)
  }
})
