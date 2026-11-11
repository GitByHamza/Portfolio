import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolvePublicPath } from './site.ts'
import { structuredData } from './public-content.ts'
import { htmlToText } from './html.ts'
import { FOUNDING_PARTNER_OPEN, FUNNEL_COPY, SHOP_TYPES, adRef, funnelDemoUrl, funnelFormWhatsAppUrl, funnelPath, funnelPlans, funnelPrice, funnelQualifier, funnelWhatsAppUrl, isShopType, loomEmbedUrl } from '../content/tech-retail-funnel.ts'
import { PLAN_KEYS, PLAN_NAMES } from '../content/pricing.ts'
import { EXTRAS_DATA as TECH_EXTRAS } from '../content/offers/tech.ts'
import { BRANCH_OPTIONS } from './funnel-lead.ts'

const WHATSAPP = 'https://wa.me/923091824000?text='
const LANGS = ['en', 'ur-en'] as const
const OPS_ONLY = /PC builder|serial|warranty tracking|3 locations|trade-in calculator|AI (sales|laptop|game)/i

test('only real HTTPS Loom recordings produce a trusted embed URL', () => {
  const id = '1234567890abcdef1234567890abcdef'
  assert.equal(loomEmbedUrl(null), null)
  for (const value of ['not a URL', `http://loom.com/share/${id}`, `https://example.com/share/${id}`, 'https://loom.com/share/no-recording']) assert.equal(loomEmbedUrl(value), null)
  for (const value of [`https://loom.com/share/${id}?sid=example`, `https://www.loom.com/embed/${id}/`]) assert.equal(loomEmbedUrl(value), `https://www.loom.com/embed/${id}`)
})

test('the funnel offers PC, laptop and console shops; mobile and camera wait for their own demo and price', () => {
  assert.deepEqual([...SHOP_TYPES], ['pc', 'laptop', 'console'])
  for (const shop of ['mobile', 'camera', '', null]) assert.equal(isShopType(shop), false)
  for (const lang of LANGS) {
    for (const shop of SHOP_TYPES) {
      const entry = FUNNEL_COPY[lang].shops[shop]
      for (const field of [entry.label, entry.chat, ...entry.headline, entry.sub, entry.opsName, entry.opsFeatures, entry.recommended, entry.question, entry.pain, entry.fix, entry.featureTitle, entry.featureCaption, entry.featureLine]) assert.ok(field.length > 2, `${lang}/${shop} is missing text`)
      assert.ok(shop === 'pc' ? entry.points === null : entry.points?.length === 3, `${lang}/${shop} needs its three product-page points`)
    }
  }
})

test('every plan feature matches the plan that includes it, for every shop type', () => {
  for (const lang of LANGS) for (const shop of SHOP_TYPES) {
    const plans = FUNNEL_COPY[lang].shops[shop].plans
    for (const key of PLAN_KEYS) assert.ok(plans[key].length >= 4, `${lang}/${shop}/${key}`)
    // Online Store is the storefront: no Retail Operations feature may appear in it.
    for (const item of plans.starter) assert.doesNotMatch(item, OPS_ONLY, `${lang}/${shop} Online Store must not promise "${item}"`)
    // Retail Operations includes basic owner/staff permissions for every shop type.
    assert.ok(plans.growth.some((item) => /owner/i.test(item) && /staff/i.test(item)), `${lang}/${shop} Retail Operations must include owner and staff logins`)
    // Only the PC version sells the PC builder.
    assert.equal(plans.growth.some((item) => /PC builder/.test(item)), shop === 'pc', `${lang}/${shop}`)
    for (const item of plans.starter) assert.doesNotMatch(item, /\b100\b/, 'every shop type loads 50 products at setup')
  }
})

test('prices on the funnel come from the same price list as the offer pages', () => {
  assert.equal(funnelPrice('pc', 'growth', 'en'), 'PKR 550,000')
  assert.equal(funnelPrice('pc', 'starter', 'en'), 'PKR 280,000')
  assert.equal(funnelPrice('laptop', 'growth', 'en'), 'PKR 490,000')
  assert.equal(funnelPrice('laptop', 'starter', 'en'), 'PKR 250,000')
  assert.equal(funnelPrice('console', 'starter', 'en'), 'PKR 260,000')
  assert.equal(funnelPrice('pc', 'enterprise', 'en'), 'From PKR 950,000')
  assert.equal(funnelPrice('console', 'enterprise', 'ur-en'), 'PKR 850,000 se shuru')
  for (const lang of LANGS) for (const shop of SHOP_TYPES) {
    const plans = funnelPlans(lang, shop)
    assert.deepEqual(plans.map((plan) => plan.name), PLAN_KEYS.map((key) => PLAN_NAMES[key]))
    assert.deepEqual(plans.map((plan) => !!plan.recommended), [false, true, false], 'only Retail Operations is recommended')
  }
})

test('the line under the hero names the plan the ads sell, its price and what it buys', () => {
  assert.equal(funnelQualifier('en', 'pc'), 'PC Retail Operations: PKR 550,000 one-time build. PC builder, serial-number warranty and stock for up to 3 locations. Running costs separate.')
  assert.match(funnelQualifier('ur-en', 'pc'), /^PC Retail Operations: PKR 550,000, ek dafa ki build fee\. /)
  assert.match(funnelQualifier('en', 'laptop'), /^Laptop Retail Operations: PKR 490,000 one-time build\./)
  assert.match(funnelQualifier('ur-en', 'console'), /^Console Retail Operations: PKR 490,000/)
  for (const lang of LANGS) for (const shop of SHOP_TYPES) assert.ok(funnelQualifier(lang, shop).includes(funnelPrice(shop, 'growth', lang)))
})

test('the money wording is precise: one-time fee, no platform fee or commission, running costs separate', () => {
  assert.equal(FUNNEL_COPY.en.plansIntro, 'One-time build fee. No TeXCodes monthly platform fee or sales commission. Hosting, domain and third-party usage costs are separate; Care Plans are optional.')
  for (const lang of LANGS) {
    const copy = FUNNEL_COPY[lang]
    assert.doesNotMatch(JSON.stringify(copy), /no monthly costs|money[- ]back|guaranteed compatible|MOST POPULAR|so rahe|sleep/i)
    assert.match(copy.guarantee, /10 working days/)
    assert.match(copy.guarantee, /refundable on request|kehne pe deposit wapas/)
    assert.match(copy.owned[0][1], /shared core/)
  }
})

test('the data-entry price in the FAQ matches the add-on price on the offer pages', () => {
  const dataEntry = TECH_EXTRAS.find((extra) => extra.en.startsWith('Product data entry'))
  assert.equal(dataEntry?.pricePkr, '+ PKR 15,000 / 50')
  for (const lang of LANGS) {
    const answer = FUNNEL_COPY[lang].faq[0][1]
    assert.match(answer, /PKR 15,000/)
    assert.match(answer, /50/)
  }
})

test('the FAQ answers training, stock accuracy and support before anyone pays', () => {
  for (const lang of LANGS) {
    const faq = FUNNEL_COPY[lang].faq.map(([question, answer]) => `${question} ${answer}`).join(' ')
    for (const subject of [/training/i, /recordings/i, /counter/i, /30 (days|din)/, /backups/i, /40 \/ 40 \/ 20/]) assert.match(faq, subject, `${lang}: ${subject}`)
  }
})

test('the hero leads with the pain for each shop type, with the approved PC headline', () => {
  assert.deepEqual(FUNNEL_COPY['ur-en'].shops.pc.headline, ['Har PC build ki quotation baar baar banani parti hai?', 'Customer parts select kare. Build ki details aap ke WhatsApp par aayein.'])
  assert.equal(FUNNEL_COPY['ur-en'].shops.pc.sub, 'PC builder, stock aur serial-number warranty ka record, aap ki shop ke liye ek system mein.')
  for (const lang of LANGS) assert.doesNotMatch(FUNNEL_COPY[lang].shopPrompt, /cheez/i)
})

test('funnel WhatsApp links open the business number with the shop type, the plan and the ad code', () => {
  for (const lang of LANGS) for (const shop of SHOP_TYPES) {
    const href = funnelWhatsAppUrl(lang, shop)
    assert.ok(href.startsWith(WHATSAPP), href)
    assert.ok(decodeURIComponent(href.slice(WHATSAPP.length)).includes(FUNNEL_COPY[lang].shops[shop].chat), `${lang}/${shop} message must name the shop type`)
  }
  assert.ok(funnelWhatsAppUrl('ur-en', 'pc', 'Retail Operations').includes(encodeURIComponent('Retail Operations')))
  assert.ok(decodeURIComponent(funnelWhatsAppUrl('en', 'pc', undefined, false, 'pc-1')).endsWith('demo. [pc-1]'))
  assert.ok(!decodeURIComponent(funnelWhatsAppUrl('en', 'pc', undefined, false, null)).includes('['))
})

test('the ad code comes from utm_content, is cleaned, and is left out when there is none', () => {
  assert.equal(adRef({ utm_content: 'PC 1 / Quote hook!' }), 'pc-1-quote-hook')
  assert.equal(adRef({ utm_campaign: 'pk-cold' }), 'pk-cold')
  assert.equal(adRef({ utm_content: 'pc-2', utm_campaign: 'pk-cold' }), 'pc-2')
  assert.equal(adRef({}), null)
  assert.equal(adRef({ utm_content: '!!!' }), null)
  assert.equal(adRef({ utm_content: 'x'.repeat(80) })?.length, 32)
})

test('proof copy is complete in both languages and the Founding Partner strip names no discount', () => {
  for (const lang of LANGS) {
    const copy = FUNNEL_COPY[lang]
    assert.deepEqual(copy.stores.map((store) => store.shop), ['pc', 'laptop', 'console'])
    assert.equal(copy.owned.length, 4)
    for (const text of [copy.storesHeading, copy.ownedHeading, copy.partnerStrip, copy.partnerStripCta, ...copy.partnerFaq]) assert.ok(text.length > 2)
    for (const ask of ['honest review', 'case study', 'feedback call']) assert.ok(copy.partnerFaq[1].includes(ask), `${lang} Founding Partner answer must name: ${ask}`)
    assert.doesNotMatch(`${copy.partnerStrip} ${copy.partnerFaq.join(' ')}`, /\d+\s?%|percent|discount|off\b|care plan|free/i, 'the Care bonus is not published until it is approved')
  }
  assert.equal(FOUNDING_PARTNER_OPEN, true)
  assert.ok(decodeURIComponent(funnelWhatsAppUrl('ur-en', 'laptop', undefined, true)).includes('Founding Partner'))
})

test('problem cards say who is asking, so a visitor knows what each quote is', () => {
  for (const lang of LANGS) {
    const copy = FUNNEL_COPY[lang]
    for (const text of [copy.problemIntro, copy.problemAsk, copy.stockAsk, copy.warrantyAsk, copy.planTag]) assert.ok(text.length > 10, lang)
  }
})

test('the short form has every label, option, error and save message in both languages', () => {
  for (const lang of LANGS) {
    const form = FUNNEL_COPY[lang].form
    for (const text of [form.shop, form.city, form.cityPlaceholder, form.branches, form.whatsapp, form.whatsappPlaceholder, form.submit, form.note, form.doneHeading, form.doneCopy, form.doneCta, form.saveFailed, form.saveRetry, form.saveRetrying, form.saved, FUNNEL_COPY[lang].orDirect]) assert.ok(text.length > 2, lang)
    assert.deepEqual(Object.keys(form.branchOptions), [...BRANCH_OPTIONS])
    assert.deepEqual(Object.keys(form.errors).sort(), ['branches', 'city', 'shop', 'whatsapp'])
    assert.match(form.saveFailed, /WhatsApp/, 'a failed save tells the visitor their answers are still in the message')
  }
})

test('after the form, WhatsApp opens on the business number with the answers and the ad code written in', () => {
  for (const lang of LANGS) {
    const href = funnelFormWhatsAppUrl(lang, { shop: 'laptop', city: 'Rawalpindi', branches: '2-3' }, 'laptop-1')
    assert.ok(href.startsWith(WHATSAPP), href)
    const message = decodeURIComponent(href.slice(WHATSAPP.length))
    for (const part of [FUNNEL_COPY[lang].shops.laptop.chat, 'Rawalpindi', FUNNEL_COPY[lang].form.branchOptions['2-3'], '[laptop-1]']) assert.ok(message.includes(part), `${lang}: ${message}`)
  }
})

test('each shop type opens its own demo store', () => {
  assert.equal(funnelDemoUrl('pc'), 'https://store-demo-eight.vercel.app/?mode=pc')
  assert.equal(funnelDemoUrl('laptop'), 'https://store-demo-eight.vercel.app/?mode=laptop')
  assert.equal(funnelDemoUrl('console'), 'https://console-store-demo.vercel.app/?currency=PKR')
})

test('the funnel and each shop type\'s page resolve in both languages, and search engines get no price', () => {
  for (const lang of LANGS) for (const shop of [undefined, ...SHOP_TYPES]) {
    const path = funnelPath(lang, shop)
    const result = resolvePublicPath(path)
    assert.equal(result.kind, 'page', path)
    if (result.kind !== 'page') continue
    assert.equal(result.page.shop, shop, path)
    assert.doesNotMatch(`${result.page.title} ${result.page.description}`, /Multi-Branch|Single Store|mobile|camera/i)
    const schema = JSON.stringify(structuredData(result.page))
    assert.match(schema, /"@type":"Service"/)
    assert.doesNotMatch(schema, /"price"|priceCurrency/)
  }
  for (const path of ['/tech-retail/offer/mobile', '/ur/tech-retail/offer/camera']) assert.equal(resolvePublicPath(path).kind, 'missing', path)
})

const output = new URL('../../build/client/', import.meta.url)
const built = (path: string) => readFileSync(new URL(`${path.slice(1)}/index.html`, output), 'utf8')
const PKR = /PKR\s?\d{1,3}(?:,\d{3})*/g

test('the built funnel pages show the right shop, prices and plans, with no portfolio navigation', { skip: !existsSync(new URL('index.html', output)) }, () => {
  for (const lang of LANGS) for (const shop of [undefined, ...SHOP_TYPES]) {
    const path = funnelPath(lang, shop)
    const page = shop ?? 'pc'
    const html = built(path)
    const text = htmlToText(html)
    const copy = FUNNEL_COPY[lang]
    assert.ok(text.includes(copy.shops[page].headline[0]), `${path} hero`)
    assert.ok(text.includes(funnelQualifier(lang, page)), `${path} qualifier`)
    assert.match(html, new RegExp(`data-shop-page="${page}"`))
    // Every price on the page is one of this shop type's plan prices or the data-entry add-on.
    const allowed = new Set([...PLAN_KEYS.map((key) => funnelPrice(page, key, lang).replace(/^From |\s*se shuru$/g, '')), 'PKR 15,000'])
    for (const price of text.match(PKR) ?? []) assert.ok(allowed.has(price), `${path} shows an unexpected price: ${price}`)
    for (const key of PLAN_KEYS) assert.match(html, new RegExp(`data-funnel-price="${key}"`))
    // The plan cards of a laptop or console page never mention the PC builder.
    const plans = html.match(/<section class="tr-offer-section[\s\S]*?<\/section>/)?.[0] ?? ''
    assert.ok(plans, `${path} plans`)
    if (page !== 'pc') assert.doesNotMatch(plans, /PC builder/)
    const actions = html.match(/<a[^>]*data-funnel-cta="[^"]*"[^>]*>/g) || []
    assert.equal(actions.length, 2, 'one WhatsApp button in the hero and one beside the form; plans and the sticky bar have their own')
    for (const action of actions) assert.match(action, /href="https:\/\/wa\.me\/923091824000\?text=/)
    assert.equal((html.match(/data-funnel-sticky=/g) || []).length, 1)
    assert.equal((html.match(/data-shop="/g) || []).length, 3)
    assert.equal((html.match(/data-funnel-plan="/g) || []).length, 3)
    assert.match(html, new RegExp(`data-funnel-demo="${page}"`))
    const stores = html.match(/<a[^>]*data-funnel-store="[^"]*"[^>]*>/g) || []
    assert.equal(stores.length, 3)
    assert.equal((html.match(/<a[^>]*data-funnel-partner="[^"]*"[^>]*href="https:\/\/wa\.me\/923091824000\?text=/g) || []).length, 1)
    assert.ok(html.indexOf('data-funnel-partner') < html.indexOf('tr-masthead'), 'the Founding Partner strip sits above everything else')
    assert.doesNotMatch(text.replace(/\(https?:[^)]*\)/g, ''), /\d+\s?%/, 'the funnel must not state a discount percentage')
    assert.doesNotMatch(html, /calendly|tr-founder/i)
    assert.doesNotMatch(text, /international businesses|Growth Care|MOST POPULAR|Multi-Branch|Single Store/i)
    assert.doesNotMatch(html, /<nav\b|VIEW ALL ARCHIVED|<iframe|autoplay|tech-retail-en\.vtt/)
    assert.match(html, /<video[^>]*controls=""[^>]*preload="none"/)
    assert.match(html, /tr-guarantee/)
    const form = html.match(/<form[^>]*data-funnel-form[^>]*>[\s\S]*?<\/form>/)?.[0] ?? ''
    assert.ok(form, 'the short form is on the page')
    assert.equal((form.match(/<option /g) || []).length, 3)
    assert.match(form, /name="website"[^>]*tabindex="-1"|tabindex="-1"[^>]*name="website"/, 'a hidden field catches spam bots')
    assert.equal((html.match(/<section/g) || []).length, 7, 'hero, problems, proof, plans, trust, FAQ, form')
    assert.equal((html.match(/<button[^>]*aria-controls="faq-answer-\d+"/g) || []).length, copy.faq.length + 1, 'every FAQ question, plus the Founding Partner question')
    assert.ok(text.includes(copy.faq[0][1]), 'FAQ answers are in the page for search engines')
    assert.match(html, /href="\/privacy-policy"/)
  }
  for (const prefix of ['', '/ur']) assert.ok(built(`${prefix}/offers`).includes(`href="${prefix}/tech-retail/offer"`))
})
