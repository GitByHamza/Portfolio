import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { SHOP_TYPES } from '../content/tech-retail-funnel.ts'
import { BRANCH_OPTIONS, leadRow, normalizePakistaniMobile, readAdSource, rememberAdSource, saveLeadRow, validateLead } from './funnel-lead.ts'

test('Pakistani mobile numbers are accepted in every common format and stored as +92', () => {
  for (const input of ['03091824000', '0309 1824000', '0309-182-4000', '+92 309 1824000', '923091824000', '00923091824000', '3091824000', ' (0309) 1824000 ']) {
    assert.equal(normalizePakistaniMobile(input), '+923091824000', input)
  }
})

test('landlines, short numbers and foreign numbers are rejected', () => {
  for (const input of ['', '0423 5761234', '042111222333', '0309182400', '030918240001', '+44 7700 900123', '+1 555 010 0000', 'abc', '03O91824000', '0209 1824000']) {
    assert.equal(normalizePakistaniMobile(input), null, input)
  }
})

test('a complete lead passes and is cleaned', () => {
  const result = validateLead({ shop: 'console', city: '  Lahore ', branches: '2-3', whatsapp: '0300 1234567', website: '' })
  assert.deepEqual(result, { ok: true, spam: false, lead: { shop: 'console', city: 'Lahore', branches: '2-3', whatsapp: '+923001234567' } })
  // Mobile and camera are no longer offered, so the form does not accept them.
  assert.equal(validateLead({ shop: 'camera', city: 'Lahore', branches: '1', whatsapp: '03001234567' }).ok, false)
})

test('each missing or wrong field is reported, and nothing else', () => {
  const result = validateLead({ shop: 'bakery', city: 'L', branches: '9', whatsapp: '12345' })
  assert.equal(result.ok, false)
  if (!result.ok) assert.deepEqual(result.errors, { shop: true, city: true, branches: true, whatsapp: true })
  const partial = validateLead({ shop: 'pc', city: 'Karachi', branches: '1', whatsapp: '' })
  assert.equal(partial.ok, false)
  if (!partial.ok) assert.deepEqual(partial.errors, { whatsapp: true })
})

test('city names are limited in length and to plain text', () => {
  assert.equal(validateLead({ shop: 'pc', city: 'x'.repeat(61), branches: '1', whatsapp: '03001234567' }).ok, false)
  assert.equal(validateLead({ shop: 'pc', city: '<script>', branches: '1', whatsapp: '03001234567' }).ok, false)
  for (const city of ['Rawalpindi', 'Dera Ghazi Khan', "D.I. Khan", 'Mandi Bahauddin', 'لاہور']) {
    assert.equal(validateLead({ shop: 'pc', city, branches: '1', whatsapp: '03001234567' }).ok, true, city)
  }
})

test('a filled hidden field marks the submission as spam without telling the visitor', () => {
  const result = validateLead({ shop: 'pc', city: 'Lahore', branches: '1', whatsapp: '03001234567', website: 'http://spam.example' })
  assert.equal(result.ok, true)
  if (result.ok) assert.equal(result.spam, true)
})

test('branch options match the instant form', () => {
  assert.deepEqual([...BRANCH_OPTIONS], ['1', '2-3', '4+'])
})

test('ad parameters are read from the landing URL, trimmed and capped', () => {
  assert.deepEqual(readAdSource('?utm_source=facebook&utm_medium=paid&utm_campaign=pk-cold&utm_content=hook-shutter&fbclid=abc123&other=x'), {
    utm_source: 'facebook', utm_medium: 'paid', utm_campaign: 'pk-cold', utm_content: 'hook-shutter', fbclid: 'abc123',
  })
  assert.deepEqual(readAdSource(''), {})
  assert.deepEqual(readAdSource('?utm_source=%20%20'), {})
  assert.equal(readAdSource(`?utm_campaign=${'a'.repeat(400)}`).utm_campaign?.length, 200)
})

function memoryStorage() {
  const data = new Map<string, string>()
  return { getItem: (key: string) => data.get(key) ?? null, setItem: (key: string, value: string) => { data.set(key, value) } }
}

test('the ad source from the landing page survives later page views without parameters', () => {
  const storage = memoryStorage()
  assert.deepEqual(rememberAdSource('?utm_campaign=pk-cold&utm_content=hook-gpu', storage), { utm_campaign: 'pk-cold', utm_content: 'hook-gpu' })
  assert.deepEqual(rememberAdSource('', storage), { utm_campaign: 'pk-cold', utm_content: 'hook-gpu' })
  assert.deepEqual(rememberAdSource('?utm_campaign=pk-retarget', storage), { utm_campaign: 'pk-retarget' }, 'a newer ad click replaces the old one')
})

test('blocked or broken storage never stops the form', () => {
  const blocked = { getItem: () => { throw new Error('blocked') }, setItem: () => { throw new Error('blocked') } }
  assert.deepEqual(rememberAdSource('?utm_source=ig', blocked), { utm_source: 'ig' })
  assert.deepEqual(rememberAdSource('', blocked), {})
  const corrupt = { getItem: () => '{not json', setItem: () => {} }
  assert.deepEqual(rememberAdSource('', corrupt), {})
  const tampered = { getItem: () => JSON.stringify({ utm_source: 'ig', evil: 'x', utm_term: 42 }), setItem: () => {} }
  assert.deepEqual(rememberAdSource('', tampered), { utm_source: 'ig' })
})

test('the database migration accepts everything the form accepts', () => {
  const sql = readFileSync(new URL('../../supabase/migrations/20261111_funnel_leads.up.sql', import.meta.url), 'utf8')
  // The table keeps accepting mobile and camera so leads already saved for them stay valid.
  const allowed = sql.match(/shop_type in (([^)]*))/)?.[1] ?? ''
  for (const shop of SHOP_TYPES) assert.ok(allowed.includes(`'${shop}'`), `the database must accept ${shop}`)
  assert.ok(sql.includes(`branches in (${BRANCH_OPTIONS.map((option) => `'${option}'`).join(', ')})`))
  assert.ok(sql.includes(String.raw`whatsapp ~ '^\+923[0-9]{9}$'`))
  for (const column of Object.keys(leadRow({ shop: 'pc', city: 'Lahore', branches: '1', whatsapp: '+923001234567' }, 'en', {}, '/'))) assert.match(sql, new RegExp(`\\n  ${column} `), `missing column ${column}`)
  assert.match(sql, /enable row level security/)
  assert.doesNotMatch(sql, /for select to (anon|public)/, 'visitors must not be able to read leads')
})

test('the saved row has the database column names and only known fields', () => {
  const row = leadRow({ shop: 'laptop', city: 'Karachi', branches: '1', whatsapp: '+923001234567' }, 'ur-en', { utm_campaign: 'pk-cold', fbclid: 'abc' }, '/ur/tech-retail/offer')
  assert.deepEqual(row, {
    shop_type: 'laptop', city: 'Karachi', branches: '1', whatsapp: '+923001234567', language: 'ur-en', page_path: '/ur/tech-retail/offer',
    utm_source: null, utm_medium: null, utm_campaign: 'pk-cold', utm_content: null, utm_term: null, fbclid: 'abc',
  })
})

const row = leadRow({ shop: 'pc', city: 'Lahore', branches: '1', whatsapp: '+923001234567' }, 'en', {}, '/tech-retail/offer/pc')
const quiet = async (run: () => Promise<boolean>) => { const warn = console.warn; console.warn = () => {}; try { return await run() } finally { console.warn = warn } }

test('saving a lead reports success only when the database accepts it', async () => {
  const saved: unknown[] = []
  assert.equal(await saveLeadRow(async (lead) => { saved.push(lead); return { error: null } }, row), true)
  assert.deepEqual(saved, [row])
  assert.equal(await quiet(() => saveLeadRow(async () => ({ error: { message: 'new row violates row-level security policy' } }), row)), false)
})

test('a failed or slow save returns false instead of throwing, so the visitor can retry', async () => {
  assert.equal(await quiet(() => saveLeadRow(async () => { throw new Error('network down') }, row)), false)
  const started = Date.now()
  assert.equal(await quiet(() => saveLeadRow(() => new Promise(() => {}), row, 50)), false)
  assert.ok(Date.now() - started < 2000, 'the timeout ends the wait')
})
