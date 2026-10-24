// Writes static HTML for the legal pages after `vite build`, so crawlers that
// don't run JavaScript (such as Meta's URL checker) get the full text.
// Each page is written as dist/<page>/index.html and dist/<page>.html, so
// Netlify serves it at /<page> and /<page>/ without a redirect.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { injectPage } from '../src/lib/prerender.js'
import { LEGAL_PAGES } from '../src/data/business.js'

const { render } = await import('../dist-ssr/entry-legal.js')
const dist = new URL('../dist/', import.meta.url)
const template = readFileSync(new URL('index.html', dist), 'utf8')

for (const page of LEGAL_PAGES) {
  const html = injectPage(template, { ...page, html: render(page.path) })
  const name = page.path.slice(1)
  mkdirSync(new URL(`${name}/`, dist), { recursive: true })
  writeFileSync(new URL(`${name}/index.html`, dist), html)
  writeFileSync(new URL(`${name}.html`, dist), html)
  console.log(`prerendered ${page.path}`)
}
