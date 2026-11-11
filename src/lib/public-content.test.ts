import test from 'node:test'
import assert from 'node:assert/strict'
import { getPublicPages, resolvePublicPath, localizePath } from './site.ts'
import { offers, getOffer, getPlan } from '../content/offers.ts'
import { briefingMarkdown, fullMarkdown, sitemapXml, structuredData } from './public-content.ts'
import { getConsolePlans } from '../content/offers/console.ts'

test('public inventory contains every project and all nine plan scopes without admin data', () => {
  const pages = getPublicPages()
  assert.equal(pages.filter((page) => page.lang === 'en').length, 38)
  assert.equal(pages.filter((page) => page.kind === 'project' && page.lang === 'en').length, 12)
  assert.equal(pages.filter((page) => page.kind === 'plan' && page.lang === 'en').length, 9)
  assert.equal(new Set(pages.map((page) => page.path)).size, pages.length)
  assert.ok(pages.every((page) => !page.path.includes('admin')))
})

test('route resolution rejects partial IDs and unknown offers and preserves aliases', () => {
  assert.equal(resolvePublicPath('/project/12abc').kind, 'missing')
  assert.equal(resolvePublicPath('/project/999').kind, 'missing')
  assert.equal(resolvePublicPath('/offers/unknown/plans/online-store').kind, 'missing')
  assert.deepEqual(resolvePublicPath('/offers/tech-retail/plans/multi-branch'), { kind: 'redirect', to: '/offers/tech-retail/plans/retail-operations' })
  assert.deepEqual(resolvePublicPath('/ur/offers/laptop-retail/plans/single-store'), { kind: 'redirect', to: '/ur/offers/laptop-retail/plans/online-store' })
  assert.deepEqual(resolvePublicPath('/work/12'), { kind: 'redirect', to: '/project/12' })
  assert.deepEqual(resolvePublicPath('/offer/console'), { kind: 'redirect', to: '/offers/console-retail' })
  assert.equal(resolvePublicPath('/ur/project/12').kind, 'page')
  assert.equal(resolvePublicPath('/project/12/').kind, 'redirect')
})

test('language URLs are stable, idempotent, and leave English legal pages alone', () => {
  assert.equal(localizePath('/offers?ref=home#plans', 'ur-en'), '/ur/offers?ref=home#plans')
  assert.equal(localizePath('/ur/offers', 'ur-en'), '/ur/offers')
  assert.equal(localizePath('/ur/offers', 'en'), '/offers')
  assert.equal(localizePath('/', 'ur-en'), '/ur')
  assert.equal(localizePath('/privacy-policy', 'ur-en'), '/privacy-policy')
  assert.equal(localizePath('https://example.com', 'ur-en'), 'https://example.com')
  assert.equal(localizePath('//example.com/path', 'ur-en'), '//example.com/path')
  assert.equal(localizePath('/admin', 'ur-en'), '/admin')
  assert.equal(localizePath('/llms.txt', 'ur-en'), '/llms.txt')
})

test('console scopes honor every supported regional price and language', () => {
  assert.equal(getConsolePlans('en', 'GBP').starter.price, '£1,850')
  assert.equal(getConsolePlans('ur-en', 'PKR').growth.price, 'PKR 490,000')
  assert.equal(getConsolePlans('en', 'USD').enterprise.price, 'From $7,900')
  const page = getPublicPages().find((item) => item.path === '/offers/console-retail/plans/online-store')!
  const data = JSON.stringify(structuredData(page))
  assert.match(data, /1850/)
  assert.doesNotMatch(data, /7900/)
})

test('prices retain current commercial values and regional eligibility', () => {
  assert.equal(offers.length, 3)
  assert.equal(getOffer('tech-retail')?.prices.starter.USD.amount, 2450)
  assert.equal(getOffer('laptop-retail')?.prices.starter.PKR?.amount, 250000)
  assert.equal(getOffer('console-retail')?.prices.starter.GBP?.amount, 1850)
  assert.equal(getOffer('tech-retail')?.prices.starter.GBP, undefined)
  assert.equal(getOffer('tech-retail')?.prices.enterprise.USD.startingAt, true)
  assert.equal(getPlan('console-retail', 'bad-plan'), undefined)
  for (const offer of offers) {
    for (const slug of ['online-store', 'retail-operations', 'chain-wholesale']) {
      const plan = getPlan(offer.slug, slug)
      assert.ok(plan?.modules.length && plan.exclusions.length, `${offer.slug}/${slug}`)
    }
  }
})

test('public text includes full scopes, all projects, recurring costs and ownership limits', () => {
  const briefing = briefingMarkdown()
  const full = fullMarkdown()
  for (const value of ['Muhammad Ameer Hamza', 'Tech Retail', 'Laptop Retail', 'Console', '40 / 40 / 20', 'shared', 'ClientDesk', 'Factory Khata', 'Cadence']) {
    assert.ok(briefing.includes(value), `briefing missing ${value}`)
  }
  for (const offer of offers) {
    for (const plan of Object.values(offer.plans.en)) {
      for (const module of plan.modules) assert.ok(full.includes(module.title), `full export missing ${module.title}`)
      for (const exclusion of plan.exclusions) assert.ok(full.includes(exclusion))
    }
  }
  assert.match(full, /Are there any monthly costs/)
  assert.match(full, /140/)
  assert.doesNotMatch(full, /VITE_ADMIN_PASSWORD|admin_authed|service_role/)
})

test('sitemap and structured data use canonical public URLs and real price amounts', () => {
  const xml = sitemapXml()
  assert.match(xml, /<loc>https:\/\/texcodes.com\/project\/12<\/loc>/)
  // Old /offer/... aliases never appear; the funnel's own per-shop pages do.
  assert.doesNotMatch(xml, /\/admin|\.com(?:\/ur)?\/offer\/|\/work\/12/)
  for (const shop of ['pc', 'laptop', 'console']) assert.ok(xml.includes(`<loc>https://texcodes.com/ur/tech-retail/offer/${shop}</loc>`), shop)
  const page = getPublicPages().find((item) => item.path === '/offers/tech-retail')!
  const json = JSON.stringify(structuredData(page))
  assert.match(json, /2450/)
  assert.match(json, /priceCurrency/)
  assert.doesNotMatch(json, /PostalAddress/)
})
