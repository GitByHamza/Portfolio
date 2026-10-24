import test from 'node:test'
import assert from 'node:assert/strict'
import { injectPage } from './prerender.js'

const template = `<!doctype html>
<html lang="en">
<head>
  <title>TeXCodes — Studio</title>
  <meta name="description"
    content="Generic site description" />
  <script type="module" src="/assets/index-abc.js"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>`

const page = { title: 'Privacy Policy', description: 'How "we" handle data & privacy', html: '<main><h1>Privacy Policy</h1></main>' }

test('injectPage puts the rendered page inside the root div', () => {
  assert.match(injectPage(template, page), /<div id="root"><main><h1>Privacy Policy<\/h1><\/main><\/div>/)
})

test('injectPage replaces the title and meta description with escaped page values', () => {
  const html = injectPage(template, page)
  assert.match(html, /<title>Privacy Policy — TeXCodes<\/title>/)
  assert.match(html, /<meta name="description" content="How &quot;we&quot; handle data &amp; privacy" \/>/)
  assert.doesNotMatch(html, /Generic site description|TeXCodes — Studio/)
})

test('injectPage keeps the client script so the app still loads', () => {
  assert.match(injectPage(template, page), /<script type="module" src="\/assets\/index-abc.js"><\/script>/)
})

test('injectPage fails loudly when the template has no empty root div', () => {
  assert.throws(() => injectPage(template.replace('<div id="root"></div>', ''), page), /root/)
})
