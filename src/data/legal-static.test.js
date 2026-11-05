import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { BUSINESS, LEGAL_PAGES } from './business.js'

// Checks the static HTML that `npm run build` writes for the legal pages, which
// Meta's URL checker reads without running JavaScript. Skipped until dist/ exists.
const dist = new URL('../../build/client/', import.meta.url)
const built = existsSync(new URL('index.html', dist))

const visibleText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')

const pageText = {
  '/privacy-policy': [
    'Information we collect',
    'We do not sell this data, do not use it for advertising, and do not build profiles of commenters.',
    'Zoho Mail',
    'Comment text is sent to OpenAI only to produce the analysis',
  ],
  '/terms-of-service': ['Acceptable use', 'These terms are governed by the laws of Pakistan.'],
  '/data-deletion': ['Data Deletion Request', 'we will complete the deletion within 30 days'],
}

for (const page of LEGAL_PAGES) {
  test(`static ${page.path} contains its page text`, { skip: !built && 'run npm run build first' }, () => {
    for (const file of [`${page.path.slice(1)}/index.html`]) {
      const path = new URL(file, dist)
      assert.ok(existsSync(path), `missing dist/${file}`)
      const html = readFileSync(path, 'utf8')
      assert.ok(html.includes(`<title>${page.title} — TeXCodes</title>`), `${file}: wrong <title>`)
      assert.equal(html.match(/<meta name="description" content="([^"]*)"/)?.[1], page.description, `${file}: wrong description`)
      assert.ok(!html.includes('<div id="root"></div>'), `${file}: root div is empty`)
      assert.doesNotMatch(html, /Gujranwala|Mehar Noor/i, `${file}: still shows the address`)
      assert.match(html, /<script type="module"/, `${file}: client script missing`)
      assert.match(html, /entry\.client-/, `${file}: hydration entry missing`)
      const text = visibleText(html)
      for (const phrase of [page.title, BUSINESS.email, ...pageText[page.path]]) {
        assert.ok(text.includes(phrase), `${file} must show "${phrase}"`)
      }
    }
  })
}
