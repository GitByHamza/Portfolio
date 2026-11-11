import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolvePublicPath } from './site.ts'
import { structuredData } from './public-content.ts'
import { htmlToText } from './html.ts'
import { BOOK_DEMO_ID, FOUNDING_PARTNER_OPEN, FUNNEL_COPY, NEED_OPTIONS, PROCESS_OPTIONS, SHOP_TYPES, adRef, funnelDemoUrl, funnelFormWhatsAppUrl, funnelOutcomes, funnelPath, funnelWhatsAppUrl, isShopType, loomEmbedUrl, needLabel } from '../content/tech-retail-funnel.ts'
import { PLAN_NAMES, priceCatalog } from '../content/pricing.ts'
import { BRANCH_OPTIONS } from './funnel-lead.ts'

const WHATSAPP = 'https://wa.me/923091824000?text='
const LANGS = ['en', 'ur-en'] as const
// Consultation first: no amount, currency, percentage or plan name anywhere on the campaign pages.
const PRICE = /PKR|Rs\.?\s?\d|\$\s?\d|\d[\d,]*\s?(?:lakh|k\b)|\d+\s?%/i
const PLAN_NAME = new RegExp(Object.values(PLAN_NAMES).map((name) => name.replace('&', '(?:&|&amp;)')).join('|'))
const CHEAP = /cheap|affordable|low[- ]cost|budget[- ]friendly|discount|sasta|kam (?:qeemat|kharch)|bachat/i

test('only real HTTPS Loom recordings produce a trusted embed URL', () => {
  const id = '1234567890abcdef1234567890abcdef'
  assert.equal(loomEmbedUrl(null), null)
  for (const value of ['not a URL', `http://loom.com/share/${id}`, `https://example.com/share/${id}`, 'https://loom.com/share/no-recording']) assert.equal(loomEmbedUrl(value), null)
  for (const value of [`https://loom.com/share/${id}?sid=example`, `https://www.loom.com/embed/${id}/`]) assert.equal(loomEmbedUrl(value), `https://www.loom.com/embed/${id}`)
})

test('the funnel offers PC, laptop and console shops; mobile and camera wait for their own demo and scope', () => {
  assert.deepEqual([...SHOP_TYPES], ['pc', 'laptop', 'console'])
  for (const shop of ['mobile', 'camera', '', null]) assert.equal(isShopType(shop), false)
  for (const lang of LANGS) {
    for (const shop of SHOP_TYPES) {
      const entry = FUNNEL_COPY[lang].shops[shop]
      for (const field of [entry.label, entry.chat, ...entry.headline, entry.sub, entry.positioning, entry.question, entry.pain, entry.fix, ...entry.outcome, entry.need, entry.featureTitle, entry.featureCaption, entry.featureLine]) assert.ok(field.length > 2, `${lang}/${shop} is missing text`)
      assert.ok(shop === 'pc' ? entry.points === null : entry.points?.length === 3, `${lang}/${shop} needs its three product-page points`)
    }
  }
})

test('the funnel copy states no price, plan name or discount: the investment is explained on the call', () => {
  for (const lang of LANGS) {
    const text = JSON.stringify(FUNNEL_COPY[lang])
    assert.doesNotMatch(text, PRICE, `${lang} copy states a price`)
    assert.doesNotMatch(text, PLAN_NAME, `${lang} copy names a plan`)
  }
  // The internal price list is unchanged: the offer pages still read it.
  assert.equal(priceCatalog.tech.growth.PKR.amount, 550000)
  assert.equal(priceCatalog.tech.starter.PKR.amount, 280000)
})

test('nothing on the funnel suggests the service is cheap', () => {
  for (const lang of LANGS) assert.doesNotMatch(JSON.stringify(FUNNEL_COPY[lang]), CHEAP, lang)
})

test('the hero says who it is built for: established shops, custom-built, not a website template', () => {
  for (const lang of LANGS) {
    const copy = FUNNEL_COPY[lang]
    for (const shop of SHOP_TYPES) {
      assert.match(copy.shops[shop].positioning, /custom-built/, `${lang}/${shop}`)
      assert.match(copy.shops[shop].positioning, /[Ee]stablished/, `${lang}/${shop}`)
      assert.match(copy.shops[shop].positioning, /retail operations system/, `${lang}/${shop}`)
    }
    assert.match(copy.outcomes.map((item) => item.join(' ')).join(' '), /website template/i)
    assert.match(copy.fitNote, /catalogue website/)
  }
  assert.equal(FUNNEL_COPY.en.cta, 'Book a demo for your shop')
  assert.equal(FUNNEL_COPY['ur-en'].cta, 'Apni shop ka demo book karein')
})

test('the outcomes lead with the one only this shop type gets, then the five every shop gets', () => {
  for (const lang of LANGS) for (const shop of SHOP_TYPES) {
    const outcomes = funnelOutcomes(lang, shop)
    assert.equal(outcomes.length, 6)
    assert.deepEqual(outcomes[0], FUNNEL_COPY[lang].shops[shop].outcome)
    for (const [title, line] of outcomes) assert.ok(title.length > 8 && line.length > 20, `${lang}/${shop}: ${title}`)
    // Only the PC version talks about builds.
    assert.equal(/build/i.test(outcomes[0].join(' ')), shop === 'pc', `${lang}/${shop}`)
  }
})

test('the written proposal promises every cost in writing before any payment', () => {
  for (const lang of LANGS) {
    const copy = FUNNEL_COPY[lang]
    for (const cost of ['build', 'hosting', 'domain', 'third-party', 'optional support']) assert.ok(copy.proposal.includes(cost), `${lang} proposal must name ${cost}`)
    assert.match(copy.proposal, /written approval/)
    const steps = copy.process.map(([title]) => title)
    assert.equal(steps.length, 4)
    assert.equal(steps[2], 'Written proposal')
    assert.match(copy.process[2][1], /(every cost|har kharcha)/)
    assert.match(copy.guarantee, /10 working days/)
    assert.match(copy.guarantee, /refundable on request|kehne pe deposit wapas/)
    assert.match(copy.owned[0][1], /shared core/)
    assert.doesNotMatch(JSON.stringify(copy), /no monthly costs|money[- ]back|guaranteed compatible|MOST POPULAR|so rahe|sleep/i)
  }
})

test('the FAQ answers the cost question first, with no number and every fee named', () => {
  for (const lang of LANGS) {
    const [question, answer] = FUNNEL_COPY[lang].faq[0]
    assert.match(question, /cost|kharcha/i)
    assert.doesNotMatch(answer, /\d/, 'the cost answer gives no amount')
    for (const cost of ['build', 'hosting', 'domain', 'third-party', 'optional support']) assert.ok(answer.includes(cost), `${lang} cost answer must name ${cost}`)
    assert.match(answer, /written proposal/)
    assert.match(FUNNEL_COPY[lang].faq[1][1], /written proposal/, 'the product-loading answer points to the proposal instead of a price')
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

test('funnel WhatsApp links open the business number with the shop type, a demo request and the ad code', () => {
  for (const lang of LANGS) for (const shop of SHOP_TYPES) {
    const href = funnelWhatsAppUrl(lang, shop)
    assert.ok(href.startsWith(WHATSAPP), href)
    const message = decodeURIComponent(href.slice(WHATSAPP.length))
    assert.ok(message.includes(FUNNEL_COPY[lang].shops[shop].chat), `${lang}/${shop} message must name the shop type`)
    assert.match(message, /book (a )?demo|demo book/)
  }
  assert.ok(decodeURIComponent(funnelWhatsAppUrl('en', 'pc', false, 'pc-1')).endsWith('demo. [pc-1]'))
  assert.ok(!decodeURIComponent(funnelWhatsAppUrl('en', 'pc', false, null)).includes('['))
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
  assert.ok(decodeURIComponent(funnelWhatsAppUrl('ur-en', 'laptop', true)).includes('Founding Partner'))
})

test('problem cards say who is asking, so a visitor knows what each quote is', () => {
  for (const lang of LANGS) {
    const copy = FUNNEL_COPY[lang]
    for (const text of [copy.problemIntro, copy.problemAsk, copy.stockAsk, copy.warrantyAsk]) assert.ok(text.length > 10, lang)
  }
})

test('the demo form has every label, option, error and save message in both languages', () => {
  for (const lang of LANGS) {
    const form = FUNNEL_COPY[lang].form
    for (const text of [form.shop, form.city, form.cityPlaceholder, form.branches, form.process, form.needs, form.needsHint, form.whatsapp, form.whatsappPlaceholder, form.submit, form.note, form.doneHeading, form.doneCopy, form.doneCta, form.saveFailed, form.saveRetry, form.saveRetrying, form.saved, FUNNEL_COPY[lang].orDirect]) assert.ok(text.length > 2, lang)
    assert.deepEqual(Object.keys(form.branchOptions), [...BRANCH_OPTIONS])
    assert.deepEqual(Object.keys(form.processOptions), [...PROCESS_OPTIONS])
    assert.deepEqual(Object.keys(form.needOptions), NEED_OPTIONS.filter((need) => need !== 'trade'), 'the first need is named for each shop type')
    for (const shop of SHOP_TYPES) for (const need of NEED_OPTIONS) assert.ok(needLabel(lang, shop, need).length > 5, `${lang}/${shop}/${need}`)
    assert.deepEqual(Object.keys(form.errors).sort(), ['branches', 'city', 'needs', 'process', 'shop', 'whatsapp'])
    assert.match(form.saveFailed, /WhatsApp/, 'a failed save tells the visitor their answers are still in the message')
    assert.match(form.submit, /demo/i)
  }
})

test('after the form, WhatsApp opens on the business number with every answer and the ad code written in', () => {
  for (const lang of LANGS) {
    const href = funnelFormWhatsAppUrl(lang, { shop: 'laptop', city: 'Rawalpindi', branches: '2-3', process: 'sheets', needs: ['trade', 'warranty'] }, 'laptop-1')
    assert.ok(href.startsWith(WHATSAPP), href)
    const message = decodeURIComponent(href.slice(WHATSAPP.length))
    const form = FUNNEL_COPY[lang].form
    for (const part of [FUNNEL_COPY[lang].shops.laptop.chat, 'Rawalpindi', form.branchOptions['2-3'], form.processOptions.sheets, needLabel(lang, 'laptop', 'trade'), form.needOptions.warranty, '[laptop-1]']) assert.ok(message.includes(part), `${lang}: ${message}`)
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
    const summary = `${result.page.title} ${result.page.description}`
    assert.doesNotMatch(summary, /Multi-Branch|Single Store|mobile|camera/i)
    assert.doesNotMatch(summary, PRICE)
    assert.doesNotMatch(summary, PLAN_NAME, `${path} title names a plan`)
    assert.match(summary, /Book a demo/)
    const schema = JSON.stringify(structuredData(result.page))
    assert.match(schema, /"@type":"Service"/)
    assert.doesNotMatch(schema, /"price"|priceCurrency/)
  }
  for (const path of ['/tech-retail/offer/mobile', '/ur/tech-retail/offer/camera']) assert.equal(resolvePublicPath(path).kind, 'missing', path)
})

const output = new URL('../../build/client/', import.meta.url)
const built = (path: string) => readFileSync(new URL(`${path.slice(1)}/index.html`, output), 'utf8')

test('the built funnel pages show the right shop, outcomes and demo form, and no price', { skip: !existsSync(new URL('index.html', output)) }, () => {
  for (const lang of LANGS) for (const shop of [undefined, ...SHOP_TYPES]) {
    const path = funnelPath(lang, shop)
    const page = shop ?? 'pc'
    const html = built(path)
    const text = htmlToText(html)
    const copy = FUNNEL_COPY[lang]
    assert.ok(text.includes(copy.shops[page].headline[0]), `${path} hero`)
    assert.ok(text.includes(copy.shops[page].positioning), `${path} positioning`)
    assert.match(html, new RegExp(`data-shop-page="${page}"`))
    // Consultation first: no amount, plan name or price card on the page.
    assert.doesNotMatch(text.replace(/\(https?:[^)]*\)/g, ''), PRICE, `${path} shows a price`)
    assert.doesNotMatch(text, PLAN_NAME, `${path} names a plan`)
    assert.doesNotMatch(html, /data-funnel-price|data-funnel-plan|tr-plan|data-funnel-qualifier/)
    // Outcomes for this shop type, with no PC builder on a laptop or console page.
    const outcomes = html.match(/<section class="tr-outcomes[\s\S]*?<\/section>/)?.[0] ?? ''
    assert.ok(outcomes, `${path} outcomes`)
    for (const [title] of funnelOutcomes(lang, page)) assert.ok(htmlToText(outcomes).includes(title), `${path} outcome: ${title}`)
    if (page !== 'pc') assert.doesNotMatch(outcomes, /PC builder|build quotes/i)
    assert.match(outcomes, /tr-proposal/)
    assert.match(outcomes, /tr-guarantee/)
    // Every "Book a demo" button leads to the form; WhatsApp stays one tap away beside it.
    const hero = html.match(/<a[^>]*data-funnel-cta="hero"[^>]*>/)?.[0] ?? ''
    assert.match(hero, new RegExp(`href="#${BOOK_DEMO_ID}"`))
    assert.ok(text.includes(copy.cta))
    assert.match(html, new RegExp(`<section[^>]*id="${BOOK_DEMO_ID}"`))
    assert.match(html.match(/<a[^>]*data-funnel-sticky[^>]*>/)?.[0] ?? '', new RegExp(`href="#${BOOK_DEMO_ID}"`))
    assert.match(html.match(/<a[^>]*data-funnel-cta="final"[^>]*>/)?.[0] ?? '', /href="https:\/\/wa\.me\/923091824000\?text=/)
    assert.equal((html.match(/data-funnel-cta=/g) || []).length, 2)
    assert.equal((html.match(/data-funnel-sticky=/g) || []).length, 1)
    assert.equal((html.match(/data-shop="/g) || []).length, 3)
    assert.match(html, new RegExp(`data-funnel-demo="${page}"`))
    const stores = html.match(/<a[^>]*data-funnel-store="[^"]*"[^>]*>/g) || []
    assert.equal(stores.length, 3)
    assert.match(stores[0], new RegExp(`data-funnel-store="${page}"`), 'this shop type\'s demo store comes first')
    assert.equal((html.match(/<a[^>]*data-funnel-partner="[^"]*"[^>]*href="https:\/\/wa\.me\/923091824000\?text=/g) || []).length, 1)
    assert.ok(html.indexOf('data-funnel-partner') < html.indexOf('tr-masthead'), 'the Founding Partner strip sits above everything else')
    assert.doesNotMatch(html, /calendly|tr-founder/i)
    assert.doesNotMatch(text, /international businesses|Growth Care|MOST POPULAR|Multi-Branch|Single Store/i)
    assert.doesNotMatch(html, /<nav\b|VIEW ALL ARCHIVED|<iframe|autoplay|tech-retail-en\.vtt/)
    assert.match(html, /<video[^>]*controls=""[^>]*preload="none"/)
    // The demo form asks the six qualification questions.
    const form = html.match(/<form[^>]*data-funnel-form[^>]*>[\s\S]*?<\/form>/)?.[0] ?? ''
    assert.ok(form, 'the demo form is on the page')
    assert.equal((form.match(/<option /g) || []).length, 3)
    assert.equal((form.match(/name="branches"/g) || []).length, BRANCH_OPTIONS.length)
    assert.equal((form.match(/type="radio" name="process"|name="process"[^>]*type="radio"/g) || []).length, PROCESS_OPTIONS.length)
    assert.equal((form.match(/type="checkbox" name="needs"|name="needs"[^>]*type="checkbox"/g) || []).length, NEED_OPTIONS.length)
    assert.ok(htmlToText(form).includes(copy.shops[page].need), `${path} names this shop type's first need`)
    assert.match(form, /name="website"[^>]*tabindex="-1"|tabindex="-1"[^>]*name="website"/, 'a hidden field catches spam bots')
    assert.equal((html.match(/<section/g) || []).length, 7, 'hero, problems, proof, outcomes, trust, FAQ, form')
    assert.equal((html.match(/<button[^>]*aria-controls="faq-answer-\d+"/g) || []).length, copy.faq.length + 1, 'every FAQ question, plus the Founding Partner question')
    assert.ok(text.includes(copy.faq[0][1]), 'FAQ answers are in the page for search engines')
    assert.match(html, /href="\/privacy-policy"/)
  }
  for (const prefix of ['', '/ur']) assert.ok(built(`${prefix}/offers`).includes(`href="${prefix}/tech-retail/offer"`))
})
