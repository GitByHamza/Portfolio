import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

// The pages are JSX, which node can't import here, so these checks read their
// source for the wording that Meta and TikTok reviewers look for. Whitespace is
// collapsed the way JSX renders it, so wrapped lines still match.
const pageSource = (name) =>
  readFileSync(new URL(`../pages/${name}.jsx`, import.meta.url), 'utf8').replace(/\s+/g, ' ')

const assertMentions = (name, phrases) => {
  const source = pageSource(name)
  for (const phrase of phrases) {
    assert.ok(source.includes(phrase), `${name} must mention "${phrase}"`)
  }
}

test('privacy policy explains CommentIQ platform data and links to data deletion', () => {
  assertMentions('PrivacyPolicy', [
    'CommentIQ',
    'Instagram professional accounts',
    'Facebook Pages',
    'TikTok accounts',
    'official Meta and TikTok APIs',
    'comments, posts and basic profile information',
    'We do not sell this data',
    'do not use it for advertising',
    'do not build profiles of commenters',
    'disconnect at any time',
    'LEGAL_PATHS.dataDeletion',
    'Your rights',
    'LEGAL_EFFECTIVE_DATE',
  ])
})

test('terms of service cover the standard SaaS sections under Pakistani law', () => {
  assertMentions('TermsOfService', [
    'Acceptable use',
    'Accounts',
    'Payments and subscriptions',
    'Termination',
    'Limitation of liability',
    'laws of Pakistan',
    'GitHub repository',
  ])
})

test('data deletion page gives the email subject and the 30-day deadline', () => {
  assertMentions('DataDeletion', [
    'BUSINESS.email',
    'subject=Data%20Deletion%20Request',
    'Data Deletion Request',
    'within 30 days',
    'disconnect',
    'If you remove CommentIQ from your Facebook or Instagram settings, we receive a notice from Meta and delete the data we hold for that account within 30 days.',
  ])
})

test('privacy policy names the services the site and CommentIQ use', () => {
  assertMentions('PrivacyPolicy', [
    'Netlify',
    'Supabase',
    'Zoho Mail',
    'Calendly',
    'BUSINESS.bookingUrl',
    "under Calendly’s own privacy policy",
    'Google Fonts',
    'COMMENTIQ_AI_PROVIDER',
    'TikTok API for Business',
    'bank transfer against an invoice',
  ])
})

test('privacy policy states how CommentIQ handles comment text, tokens and deletion', () => {
  assertMentions('PrivacyPolicy', [
    'only to produce the analysis for the user who connected the account',
    'model training turned off',
    'train or improve AI models',
    'Access tokens are stored encrypted on our servers and are never shared',
    "we delete that account’s tokens, comments and analysis within 30 days",
    'only as their platform terms allow',
  ])
})

test('privacy policy makes no claim the site code does not support', () => {
  const source = pageSource('PrivacyPolicy')
  // Supabase policies and the admin page don't restrict access to contact messages yet;
  // Iconify isn't loaded; only PKR, GBP and USD are offered; Google, Meta and TikTok
  // process data under their own policies, not only for us; the site has no checkout.
  for (const claim of ['limiting access', 'Iconify', 'local currency', 'only to provide their service to us', 'shown at checkout']) {
    assert.ok(!source.includes(claim), `PrivacyPolicy must not claim "${claim}"`)
  }
})

test('privacy policy discloses the Meta Pixel and where it is loaded', () => {
  assertMentions('PrivacyPolicy', [
    'Meta Pixel',
    'visitors in Pakistan only',
    'is not loaded for visitors in other countries',
    '_fbp',
    'Meta handles this data under its own privacy policy',
  ])
  assert.ok(!pageSource('PrivacyPolicy').includes('texcodes.com does not use advertising cookies or third-party analytics tools.</p>'), 'the old no-advertising claim must be gone')
})

test('published offer terms take priority over the general refund rule', () => {
  assertMentions('TermsOfService', ['/offers/terms', 'take priority'])
})
