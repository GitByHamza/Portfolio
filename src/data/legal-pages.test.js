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
  ])
})
