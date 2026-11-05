import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { createRequestHandler } from 'react-router'
import { getPublicPages, RESOURCE_PATHS } from './site.ts'
import { resolveServerBuild } from '../../scripts/server-builds.ts'

const buildRoot = new URL('../../build/', import.meta.url)
const built = existsSync(new URL('server/', buildRoot))

test('production SSR serves every public route and resource with real HTTP semantics', { skip: !built }, async () => {
  const build = await import(resolveServerBuild(buildRoot).href)
  assert.equal(build.routeDiscovery.mode, 'initial', 'small route map must not add discovery requests to a navigation')
  const handle = createRequestHandler(build, 'production')
  for (const page of getPublicPages()) {
    const response = await handle(new Request(`http://localhost${page.path}`))
    assert.equal(response.status, 200, page.path)
    const body = await response.text()
    assert.ok(body.includes('<h1'), page.path)
    assert.match(response.headers.get('Content-Type') || '', /text\/html/)
  }
  for (const [path, to] of [['/offer', '/solutions/tech-retail'], ['/offer/laptop', '/solutions/laptop-retail'], ['/work/12', '/project/12'], ['/ur/work/12', '/ur/project/12'], ['/terms', '/terms-of-service'], ['/privacy', '/privacy-policy'], ['/solutions/tech-retail/terms?offer=console', '/solutions/terms?offer=console'], ['/project/12/', '/project/12']]) {
    const response = await handle(new Request(`http://localhost${path}`))
    assert.equal(response.status, 301, path)
    assert.equal(response.headers.get('Location'), to, path)
  }
  for (const path of ['/not-a-page', '/project/999', '/project/12abc', '/work/999', '/solutions/tech-retail/plans/unknown']) {
    const response = await handle(new Request(`http://localhost${path}`))
    assert.equal(response.status, 404, path)
    assert.match(await response.text(), /404/)
  }
  for (const path of RESOURCE_PATHS) {
    const response = await handle(new Request(`http://localhost${path}`))
    assert.equal(response.status, 200, path)
    assert.match(response.headers.get('Content-Type') || '', path.endsWith('.xml') ? /application\/xml/ : /text\/(plain|markdown)/)
    assert.doesNotMatch(await response.text(), /<!DOCTYPE html>|<script/)
  }
  const admin = await handle(new Request('http://localhost/admin'))
  assert.equal(admin.status, 200)
  assert.match(admin.headers.get('Cache-Control') || '', /no-store/)
  assert.match(admin.headers.get('X-Robots-Tag') || '', /noindex/)
  const login = await admin.text()
  assert.match(login, /Admin sign-in/)
  assert.doesNotMatch(login, /admin_authed|Client enquiries|VITE_ADMIN_PASSWORD/)
})
