import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolvePublicPath } from './site.ts'
import { structuredData } from './public-content.ts'
import { htmlToText } from './html.ts'
import { FUNNEL_ASSETS, loomEmbedUrl } from '../content/tech-retail-funnel.ts'

test('only real HTTPS Loom recordings produce a trusted embed URL', () => {
  const id = '1234567890abcdef1234567890abcdef'
  assert.equal(loomEmbedUrl(null), null)
  for (const value of ['not a URL', `http://loom.com/share/${id}`, `https://example.com/share/${id}`, 'https://loom.com/share/no-recording']) assert.equal(loomEmbedUrl(value), null)
  for (const value of [`https://loom.com/share/${id}?sid=example`, `https://www.loom.com/embed/${id}/`]) assert.equal(loomEmbedUrl(value), `https://www.loom.com/embed/${id}`)
})

test('the standalone retail funnel resolves in both languages and advertises only its featured plan', () => {
  for (const path of ['/tech-retail/offer', '/ur/tech-retail/offer']) {
    const result = resolvePublicPath(path)
    assert.equal(result.kind, 'page', path)
    if (result.kind !== 'page') return
    const schema = JSON.stringify(structuredData(result.page))
    assert.doesNotMatch(schema, /550000|PKR/)
    assert.match(schema, /4850/)
    assert.doesNotMatch(schema, /2450|8500/)
  }
})

const output = new URL('../../build/client/', import.meta.url)
test('the funnel has four consistent booking actions, honest preview content and no portfolio navigation', { skip: !existsSync(new URL('index.html', output)) }, () => {
  for (const prefix of ['', '/ur']) {
    const html = readFileSync(new URL(`${prefix.slice(1)}${prefix ? '/' : ''}tech-retail/offer/index.html`, output), 'utf8')
    assert.equal((html.match(/data-funnel-cta=/g) || []).length, 4)
    assert.doesNotMatch(html, /<nav\b|VIEW ALL ARCHIVED|Try the live demo/)
    assert.doesNotMatch(htmlToText(html), /MOST POPULAR/)
    assert.doesNotMatch(htmlToText(html), /PKR|550,000|For businesses in Pakistan/)
    assert.match(html, /4,850/)
    assert.match(html, /40 \/ 40 \/ 20/)
    assert.match(html, /<details/)
    assert.match(html, /href="\/privacy-policy"/)
    assert.match(html, /href="\/terms-of-service"/)
    assert.doesNotMatch(html, /<iframe|autoplay|href="https:\/\/store-demo/)
    assert.match(html, /<video[^>]*controls=""[^>]*preload="none"/)
    assert.match(html, /poster="\/video\/tech-retail-poster.webp"/)
    assert.match(html, /src="\/video\/tech-retail-overview.mp4"/)
    assert.match(html, /kind="captions"[^>]*src="\/video\/tech-retail-en.vtt"/)
    assert.match(html, /\/tech-retail\/pc-builder.webp/)
    if (!FUNNEL_ASSETS.bookingUrl) assert.equal((html.match(/disabled=""/g) || []).length, 4)
    else assert.equal((html.match(new RegExp(`href="${FUNNEL_ASSETS.bookingUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g')) || []).length, 4)
  }
  for (const prefix of ['', '/ur']) {
    const html = readFileSync(new URL(`${prefix.slice(1)}${prefix ? '/' : ''}offers/index.html`, output), 'utf8')
    assert.ok(html.includes(`href="${prefix}/tech-retail/offer"`))
  }
})
