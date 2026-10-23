import test from 'node:test'
import assert from 'node:assert/strict'
import { BUSINESS, FULL_ADDRESS, LEGAL_PATHS } from './business.js'

test('business details keep the exact public spelling', () => {
  assert.equal(BUSINESS.name, 'TeXCodes')
  assert.equal(BUSINESS.owner, 'Muhammad Ameer Hamza')
  assert.equal(BUSINESS.email, 'admin@texcodes.com')
  assert.equal(BUSINESS.phone, '+92 309 1824000')
  assert.equal(BUSINESS.phoneE164, '+923091824000')
  assert.equal(FULL_ADDRESS, 'Bazar Mehar Noor Wala, Gali No 9, Mohalla Islam Pura, Gujranwala 52250, Punjab, Pakistan')
})

test('legal pages live at clean URLs', () => {
  assert.deepEqual(LEGAL_PATHS, { privacy: '/privacy-policy', terms: '/terms-of-service', dataDeletion: '/data-deletion' })
})
