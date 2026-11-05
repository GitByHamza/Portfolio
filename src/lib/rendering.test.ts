import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { getPublicPages, RESOURCE_PATHS, SITE_ORIGIN } from './site.ts'
import { htmlToText } from './html.ts'
import { offers } from '../content/offers.ts'
import { FAQ_I18N } from '../content/faq.ts'
import { briefingMarkdown } from './public-content.ts'
import { PLAN_SLUGS } from '../content/pricing.ts'

const output = new URL('../../build/client/', import.meta.url)
const built = existsSync(new URL('index.html', output))
const htmlFor = (path: string) => readFileSync(new URL(`${path === '/' ? '' : path.slice(1) + '/'}index.html`, output), 'utf8')
const normalize = (text: string) => text.replace(/\s+/g, ' ').trim()

test('text extraction strips scripts and decodes escaped commercial copy', () => {
  assert.equal(htmlToText('<p>Code &amp; data &#x27;ownership&#39;</p><script>private()</script>'), "Code & data 'ownership'")
  assert.equal(htmlToText('<a href="/terms?a=1&amp;b=2">Terms</a>'), 'Terms (/terms?a=1&b=2)')
})

test('every canonical page has visible-content HTML, hydration, unique metadata and a language tag', { skip: !built }, () => {
  for (const page of getPublicPages()) {
    const html = htmlFor(page.path)
    if (page.path !== '/') assert.equal(readFileSync(new URL(`${page.path.slice(1)}.html`, output), 'utf8'), html, `${page.path}: slashless static mirror`)
    assert.ok(html.includes('<h1'), `${page.path}: no main heading`)
    assert.ok(html.includes(`lang="${page.lang === 'ur-en' ? 'ur-Latn' : 'en'}"`))
    assert.ok(html.includes(`rel="canonical" href="${SITE_ORIGIN}${page.path}"`), `${page.path}: canonical`)
    assert.equal((html.match(/<title>/g) || []).length, 1, `${page.path}: title count`)
    assert.match(html, /entry\.client-/)
    assert.ok(htmlToText(html).length > 1000, `${page.path}: content missing from HTML`)
    assert.doesNotMatch(html, /VITE_ADMIN_PASSWORD|admin_authed/)
    assert.doesNotMatch(html, /style="[^"]*opacity:0(?:;|")/, `${page.path}: content hidden before hydration`)
  }
})

test('all FAQ answers, add-on descriptions, regional prices and scope links exist before clicks', { skip: !built }, () => {
  for (const offer of offers) {
    for (const lang of ['en', 'ur-en'] as const) {
      const prefix = lang === 'en' ? '' : '/ur'
      const html = htmlFor(`${prefix}/offers/${offer.slug}`)
      const text = normalize(htmlToText(html))
      for (const item of FAQ_I18N[lang].items) assert.ok(text.includes(normalize(item.a)), `${offer.slug}/${lang}: ${item.q}`)
      for (const extra of offer.extras) assert.ok(text.includes(normalize(lang === 'en' ? extra.descEn : extra.descUr)))
      for (const slug of Object.values(PLAN_SLUGS)) assert.ok(html.includes(`href="${prefix}/offers/${offer.slug}/plans/${slug}"`))
      assert.match(html, /<details/)
    }
  }
})

test('all dedicated scopes contain their complete modules and exclusions in raw HTML', { skip: !built }, () => {
  for (const offer of offers) for (const key of ['starter', 'growth', 'enterprise'] as const) {
    const text = normalize(htmlToText(htmlFor(`/offers/${offer.slug}/plans/${PLAN_SLUGS[key]}`)))
    for (const module of offer.plans.en[key].modules) {
      assert.ok(text.includes(normalize(module.title)))
      for (const item of module.items || []) assert.ok(text.includes(normalize(item)))
    }
    for (const exclusion of offer.plans.en[key].exclusions) assert.ok(text.includes(normalize(exclusion)))
  }
})

test('generated public resources are complete, match their source, and include published legal text', { skip: !built }, () => {
  for (const path of RESOURCE_PATHS) assert.ok(statSync(new URL(path.slice(1), output)).size > 30)
  assert.equal(readFileSync(new URL('context.md', output), 'utf8'), briefingMarkdown())
  const full = readFileSync(new URL('llms-full.txt', output), 'utf8')
  for (const phrase of ['Information we collect', 'Data Deletion Request', 'laws of Pakistan', 'Cancellation and refunds', 'Care Plans']) assert.ok(full.includes(phrase), phrase)
  assert.doesNotMatch(full, /admin_authed|VITE_ADMIN_PASSWORD|<script/)
})

test('briefing page links stay on the current site and downloads use native resource URLs', { skip: !built }, () => {
  const html = htmlFor('/context')
  assert.ok(html.includes('href="/project/10"'))
  assert.ok(html.includes('href="/offers/tech-retail/plans/single-store"'))
  assert.ok(html.includes('href="/llms-full.txt"'))
  assert.doesNotMatch(html, /href="https:\/\/texcodes.com\/project\//)
})

test('homepage initial scripts exclude unrelated offers and backend SDKs', { skip: !built }, () => {
  const html = htmlFor('/')
  const preloads = [...html.matchAll(/rel="modulepreload" href="([^"]+)"/g)].map((match) => match[1])
  assert.ok(preloads.length > 0)
  // The small laptop icon also uses a laptop-* filename; exclude route chunks.
  assert.ok(preloads.every((path) => !/\/(?:tech|laptop|console|admin|supabase)-/.test(path) || statSync(new URL(path.slice(1), output)).size < 1500))
  const initialBytes = preloads.reduce((sum, path) => sum + statSync(new URL(path.slice(1), output)).size, 0)
  assert.ok(initialBytes < 650000, `Initial JS grew to ${initialBytes} bytes`)
})

test('public pages keep portfolio text branding and reserve the supplied logo for the funnel', { skip: !built }, () => {
  for (const page of getPublicPages()) {
    const html = htmlFor(page.path)
    assert.match(html, /href="\/brand\/favicon-32.png"/, page.path)
    if (page.kind === 'funnel') {
      assert.match(html, /src="\/brand\/texcodes-mark.png"/, page.path)
      assert.match(html, /src="\/brand\/texcodes-wordmark.webp"/, page.path)
    } else {
      assert.doesNotMatch(html, /src="\/brand\/texcodes-(?:mark.png|wordmark.webp)"/, page.path)
      assert.match(html, />TEXCODES<\/span>/, page.path)
    }
    assert.doesNotMatch(html, /href="\/Icon.png"/, page.path)
  }
})

test('Offers navigation exposes three direct localised offer links before JavaScript', { skip: !built }, () => {
  for (const prefix of ['', '/ur']) {
    const html = htmlFor(prefix || '/')
    const menu = html.match(/<details[^>]*class="nav-offers\b[\s\S]*?<\/details>/)?.[0]
    assert.ok(menu, `${prefix || '/'}: offers disclosure missing`)
    assert.match(menu, />OFFERS<svg/)
    assert.equal((menu.match(/<a\b/g) || []).length, 3)
    for (const path of ['/offers/tech-retail', '/offers/laptop-retail', '/offers/console-retail']) {
      assert.ok(menu.includes(`href="${prefix}${path}"`), `${prefix}${path}`)
    }
    assert.doesNotMatch(menu, /href="(?:\/ur)?\/offers"/)
    assert.doesNotMatch(menu, /href="(?:\/ur)?\/tech-retail\/offer"/)
  }
})

test('generated links use Offers URLs and old static pages cannot bypass redirects', { skip: !built }, () => {
  for (const page of getPublicPages()) {
    assert.doesNotMatch(htmlFor(page.path), /href="(?:https:\/\/texcodes.com)?(?:\/ur)?\/solutions(?:[\/\?#"])/, page.path)
  }
  assert.equal(existsSync(new URL('solutions/index.html', output)), false)
  assert.equal(existsSync(new URL('ur/solutions/index.html', output)), false)
})
