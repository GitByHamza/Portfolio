import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { Buffer } from 'node:buffer'
import { projectsData, getLocalizedProject } from './projects.js'

test('case-study IDs stay unique for routing and navigation', () => {
  assert.equal(new Set(projectsData.map((project) => project.id)).size, projectsData.length)
})

test('every local cover and gallery file exists and contains image data', () => {
  for (const project of projectsData) {
    for (const asset of new Set([project.mainImage, ...(project.images || [])])) {
      if (!asset?.startsWith('/')) continue
      const path = new URL(`../../public${asset}`, import.meta.url)
      assert.ok(existsSync(path), `${project.title}: missing ${asset}`)
      const bytes = readFileSync(path)
      const isPng = bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
      const isJpeg = bytes[0] === 255 && bytes[1] === 216
      assert.ok(isPng || isJpeg, `${asset} is not a PNG or JPEG screenshot`)
    }
  }
})

test('featured additions have complete translated content and explicit categories', () => {
  for (const project of projectsData.filter((entry) => entry.featured)) {
    for (const key of ['overview', 'description', 'impact', 'overview_ur', 'description_ur', 'impact_ur']) {
      assert.ok(project[key]?.trim(), `${project.title}: missing ${key}`)
    }
    assert.ok(project.categories.length)
    assert.ok(project.features.length)
    assert.equal(project.features.length, project.features_ur.length)
    assert.ok(project.techStack.length)
    assert.ok(project.githubUrl.startsWith('https://github.com/GitByHamza/'))
    assert.ok(project.images.length >= 4, `${project.title}: needs four additional screenshots`)
    assert.ok(!project.images.includes(project.mainImage), `${project.title}: header must not repeat in the gallery`)
    assert.equal(new Set(project.images).size, project.images.length, `${project.title}: gallery screenshots must be distinct`)
  }
})

test('project localization preserves English, translates Urdu, and falls back safely', () => {
  const project = projectsData.find((entry) => entry.mediaNote_ur)
  assert.equal(getLocalizedProject(project, 'en').overview, project.overview)
  const urdu = getLocalizedProject(project, 'ur-en')
  assert.equal(urdu.overview, project.overview_ur)
  assert.equal(urdu.description, project.description_ur)
  assert.equal(urdu.impact, project.impact_ur)
  assert.deepEqual(urdu.features, project.features_ur)
  assert.equal(urdu.mediaNote, project.mediaNote_ur)
  const fallback = { overview: 'Overview', description: 'Details', impact: 'Impact', features: [], mediaNote: 'Sample records' }
  assert.deepEqual(getLocalizedProject(fallback, 'ur-en'), fallback)
  assert.equal(getLocalizedProject(null, 'en'), null)
})
