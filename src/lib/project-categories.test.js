import test from 'node:test'
import assert from 'node:assert/strict'
import { matchesProjectCategory } from './project-categories.js'

test('all includes projects with and without category metadata', () => {
  assert.equal(matchesProjectCategory({}, 'ALL'), true)
  assert.equal(matchesProjectCategory({ categories: ['MOBILE'] }, 'ALL'), true)
})

test('explicit categories take priority over technology-based guesses', () => {
  const wallpaper = { title: 'Lumina Walls', tags: ['Next.js', 'Tailwind CSS'], categories: ['WEB'] }
  assert.equal(matchesProjectCategory(wallpaper, 'WEB'), true)
  assert.equal(matchesProjectCategory(wallpaper, 'ENTERPRISE'), false)
  assert.equal(matchesProjectCategory(wallpaper, 'SAAS'), false)
  assert.equal(matchesProjectCategory({ categories: ['MOBILE', 'SAAS'] }, 'MOBILE'), true)
  assert.equal(matchesProjectCategory({ categories: ['BUSINESS', 'COMMERCE'] }, 'BUSINESS'), true)
})

test('legacy enterprise projects retain their archive categories', () => {
  for (const project of [{ tags: ['Laravel 12'] }, { title: 'Myls Platform' }, { title: 'Hospital Management' }, { title: 'Enterprise Tools' }]) {
    assert.equal(matchesProjectCategory(project, 'ENTERPRISE'), true)
  }
  assert.equal(matchesProjectCategory({}, 'ENTERPRISE'), false)
})

test('legacy commerce titles and Prisma tags remain discoverable', () => {
  for (const project of [{ tags: ['Prisma'] }, { title: 'Tech Store' }, { title: 'Shop' }, { title: 'Ecommerce App' }, { title: 'Console Retail OS' }]) {
    assert.equal(matchesProjectCategory(project, 'COMMERCE'), true)
  }
  assert.equal(matchesProjectCategory({}, 'COMMERCE'), false)
})

test('SaaS and AI filtering does not mistake Tailwind for an AI tool', () => {
  for (const project of [{ title: 'Micro SaaS' }, { title: 'AI Receptionist' }, { tags: ['AI Agent'] }, { tags: ['Micro SaaS'] }]) {
    assert.equal(matchesProjectCategory(project, 'SAAS'), true)
  }
  assert.equal(matchesProjectCategory({ tags: ['Tailwind CSS'] }, 'SAAS'), false)
  assert.equal(matchesProjectCategory({}, 'SAAS'), false)
})

test('new and unknown categories do not include unrelated legacy projects', () => {
  for (const category of ['MOBILE', 'BUSINESS', 'WEB', 'UNKNOWN']) {
    assert.equal(matchesProjectCategory({ title: 'Old App' }, category), false)
  }
})
