import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolvePublicPath } from './site.ts'
import { structuredData } from './public-content.ts'
import { htmlToText } from './html.ts'
import { FUNNEL_COPY, SHOP_TYPES, funnelDemoUrl, funnelWhatsAppUrl, loomEmbedUrl } from '../content/tech-retail-funnel.ts'

const PRICE = /\$\s?\d|PKR|USD|GBP|\bRs\.?\s?\d|\d{2,3},\d{3}|\/\s?(month|mahana)/i

test('the price check catches prices and ignores ordinary sentences', () => {
  for (const priced of ['$4,850', 'PKR 280,000', 'Rs. 5000', 'Rs 250000', '280 / month', '28,000 mahana', '4850 USD']) assert.match(priced, PRICE)
  for (const plain of ['WhatsApp pe orders.\n10 din mein live', '40 / 40 / 20', 'pehle 50 products', '3 locations tak']) assert.doesNotMatch(plain, PRICE)
})
const WHATSAPP = 'https://wa.me/923091824000?text='

test('only real HTTPS Loom recordings produce a trusted embed URL', () => {
  const id = '1234567890abcdef1234567890abcdef'
  assert.equal(loomEmbedUrl(null), null)
  for (const value of ['not a URL', `http://loom.com/share/${id}`, `https://example.com/share/${id}`, 'https://loom.com/share/no-recording']) assert.equal(loomEmbedUrl(value), null)
  for (const value of [`https://loom.com/share/${id}?sid=example`, `https://www.loom.com/embed/${id}/`]) assert.equal(loomEmbedUrl(value), `https://www.loom.com/embed/${id}`)
})

test('funnel copy covers every shop type and all three plans in both languages, with no pricing', () => {
  assert.deepEqual([...SHOP_TYPES], ['pc', 'laptop', 'mobile', 'camera', 'console'])
  for (const lang of ['en', 'ur-en'] as const) {
    const copy = FUNNEL_COPY[lang]
    for (const shop of SHOP_TYPES) {
      const entry = copy.shops[shop]
      for (const field of [entry.label, entry.chat, entry.question, entry.pain, entry.fix, entry.featureTitle, entry.featureCaption]) assert.ok(field.length > 2, `${lang}/${shop} is missing text`)
      assert.ok(shop === 'pc' ? entry.points === null : entry.points?.length === 3, `${lang}/${shop} needs its three product-page points`)
    }
    assert.deepEqual(copy.plans.map((plan) => plan.name), ['Single Store', 'Multi-Branch', 'Chain & Wholesale'])
    for (const plan of copy.plans) assert.ok(plan.items.length >= 4 && plan.delivery && plan.line)
    assert.doesNotMatch(JSON.stringify(copy), PRICE, `${lang} funnel copy must not contain a price`)
  }
})

test('funnel WhatsApp links open the business number with the chosen shop type in the message', () => {
  for (const lang of ['en', 'ur-en'] as const) for (const shop of SHOP_TYPES) {
    const href = funnelWhatsAppUrl(lang, shop)
    assert.ok(href.startsWith(WHATSAPP), href)
    assert.ok(decodeURIComponent(href.slice(WHATSAPP.length)).includes(FUNNEL_COPY[lang].shops[shop].chat), `${lang}/${shop} message must name the shop type`)
  }
  assert.ok(funnelWhatsAppUrl('ur-en', 'pc', 'Multi-Branch').includes(encodeURIComponent('Multi-Branch')))
})

test('each shop type opens a real demo store', () => {
  assert.equal(funnelDemoUrl('laptop'), 'https://store-demo-eight.vercel.app/?mode=laptop')
  assert.equal(funnelDemoUrl('console'), 'https://console-store-demo.vercel.app/')
  for (const shop of ['pc', 'mobile', 'camera'] as const) assert.equal(funnelDemoUrl(shop), 'https://store-demo-eight.vercel.app/?mode=pc')
})

test('the funnel resolves in both languages and publishes no price to search engines', () => {
  for (const path of ['/tech-retail/offer', '/ur/tech-retail/offer']) {
    const result = resolvePublicPath(path)
    assert.equal(result.kind, 'page', path)
    if (result.kind !== 'page') return
    assert.doesNotMatch(`${result.page.title} ${result.page.description}`, /Multi-Branch|PC Retail Business|three locations/)
    const schema = JSON.stringify(structuredData(result.page))
    assert.match(schema, /"@type":"Service"/)
    assert.doesNotMatch(schema, /"price"|priceCurrency|4850|550000|280000/)
  }
})

const output = new URL('../../build/client/', import.meta.url)
test('the built funnel has WhatsApp actions, shop types, three plans, no pricing and no portfolio navigation', { skip: !existsSync(new URL('index.html', output)) }, () => {
  for (const prefix of ['', '/ur']) {
    const html = readFileSync(new URL(`${prefix.slice(1)}${prefix ? '/' : ''}tech-retail/offer/index.html`, output), 'utf8')
    const text = htmlToText(html)
    const actions = html.match(/<a[^>]*data-funnel-cta="[^"]*"[^>]*>/g) || []
    assert.equal(actions.length, 4)
    for (const action of actions) assert.match(action, /href="https:\/\/wa\.me\/923091824000\?text=/)
    assert.equal((html.match(/data-funnel-sticky=/g) || []).length, 1)
    assert.equal((html.match(/data-shop="/g) || []).length, 5)
    assert.equal((html.match(/data-funnel-plan="/g) || []).length, 3)
    assert.match(html, /href="https:\/\/store-demo-eight\.vercel\.app\/\?mode=pc"/)
    assert.doesNotMatch(html, /calendly/i)
    assert.doesNotMatch(text, PRICE, 'the funnel must not show a price')
    assert.doesNotMatch(text, /international businesses|Growth Care/i)
    assert.doesNotMatch(html, /<nav\b|VIEW ALL ARCHIVED|<iframe|autoplay|tech-retail-en\.vtt/)
    assert.match(html, /<video[^>]*controls=""[^>]*preload="none"/)
    assert.match(html, /poster="\/video\/tech-retail-poster\.webp"/)
    assert.match(html, /src="\/video\/tech-retail-overview\.mp4"/)
    assert.match(html, /kind="captions"[^>]*src="\/video\/tech-retail-captions\.vtt"/)
    assert.doesNotMatch(text, /MOST POPULAR/)
    assert.match(html, /<details/)
    assert.match(html, /href="\/privacy-policy"/)
    assert.match(html, /href="\/terms-of-service"/)
    assert.match(html, /\/tech-retail\/preview\.webp/)
    assert.match(html, /\/tech-retail\/pc-builder\.webp/)
  }
  for (const prefix of ['', '/ur']) {
    const html = readFileSync(new URL(`${prefix.slice(1)}${prefix ? '/' : ''}offers/index.html`, output), 'utf8')
    assert.ok(html.includes(`href="${prefix}/tech-retail/offer"`))
  }
})
