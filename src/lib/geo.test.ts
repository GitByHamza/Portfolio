import test from 'node:test'
import assert from 'node:assert/strict'
import geo, { config } from '../../netlify/edge-functions/geo.js'

test('country cookie is added only when necessary, with valid public country codes', async () => {
  const context = (country: string) => ({ geo: { country: { code: country } }, next: async () => new Response('page') })
  const response = await geo(new Request('https://texcodes.com/'), context('PK'))
  assert.match(response.headers.get('Set-Cookie') || '', /tx_country=PK; Path=\/; Max-Age=86400; SameSite=Lax; Secure/)
  const unchanged = await geo(new Request('https://texcodes.com/', { headers: { cookie: 'tx_country=PK' } }), context('PK'))
  assert.equal(unchanged.headers.get('Set-Cookie'), null)
  const invalid = await geo(new Request('https://texcodes.com/'), context('INVALID'))
  assert.equal(invalid.headers.get('Set-Cookie'), null)
})

test('prefetch and framework data resources avoid geo-cookie work', async () => {
  const request = new Request('https://texcodes.com/about.data', { headers: { 'Sec-Purpose': 'prefetch' } })
  const response = await geo(request, { geo: { country: { code: 'GB' } }, next: async () => new Response('data') })
  assert.equal(response.headers.get('Set-Cookie'), null)
  for (const path of ['/*.data', '/*.md', '/__manifest', '/assets/*']) assert.ok(config.excludedPath.includes(path))
})
