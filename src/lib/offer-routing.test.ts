import test from 'node:test'
import assert from 'node:assert/strict'
import { getPublicPages, resolvePublicPath } from './site.ts'
import { briefingMarkdown, fullMarkdown, sitemapXml, structuredData } from './public-content.ts'

test('Offers URLs are canonical and every former Solutions page redirects in one hop', () => {
  const pages = getPublicPages().filter((page) => /^\/(?:ur\/)?offers(?:\/|$)/.test(page.path))
  assert.equal(pages.length, 28)
  assert.ok(getPublicPages().every((page) => !/^\/(?:ur\/)?solutions(?:\/|$)/.test(page.path)))
  for (const page of pages) {
    assert.equal(resolvePublicPath(page.path).kind, 'page', page.path)
    const legacy = page.path.replace('/offers', '/solutions')
    for (const suffix of ['', '/', '///']) {
      assert.deepEqual(resolvePublicPath(legacy + suffix), { kind: 'redirect', to: page.path }, legacy + suffix)
    }
  }
  for (const prefix of ['', '/ur']) {
    for (const base of ['/solutions', '/offers']) {
      assert.deepEqual(resolvePublicPath(`${prefix}${base}/tech-retail/terms/`), { kind: 'redirect', to: `${prefix}/offers/terms` })
      assert.equal(resolvePublicPath(`${prefix}${base}/unknown`).kind, 'missing')
      assert.equal(resolvePublicPath(`${prefix}${base}/tech-retail/plans/unknown`).kind, 'missing')
    }
    assert.equal(resolvePublicPath(`${prefix}/tech-retail/offer`).kind, 'page', 'the campaign keeps its dedicated URL')
    assert.deepEqual(resolvePublicPath(`${prefix}/offer/laptop/`), { kind: 'redirect', to: `${prefix}/offers/laptop-retail` })
  }
  assert.equal(resolvePublicPath('/solutions-other').kind, 'missing')
})

test('public exports and structured offer data advertise the new canonical Offers URLs', () => {
  const exports = [briefingMarkdown(), fullMarkdown(), sitemapXml()]
  for (const value of exports) {
    assert.match(value, /\/offers\/tech-retail/)
    assert.doesNotMatch(value, /\/solutions(?:\/|[?#]|$)/)
  }
  for (const page of getPublicPages()) {
    assert.doesNotMatch(JSON.stringify(structuredData(page)), /\/solutions(?:\/|[?#]|$)/, page.path)
  }
})
