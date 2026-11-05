import test from 'node:test'
import assert from 'node:assert/strict'
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { nodeFileTrace } from '@vercel/nft'
import { resolveServerBuild } from '../../scripts/server-builds.ts'
import { getPublicPages, RESOURCE_PATHS } from './site.ts'

const root = fileURLToPath(new URL('../../', import.meta.url))
const buildRoot = new URL('../../build/', import.meta.url)

test('isolated server package serves documents and navigation data with both Node module modes', { skip: !existsSync(new URL('server/', buildRoot)) }, async (t) => {
  const server = fileURLToPath(resolveServerBuild(buildRoot))
  const wrapper = join(dirname(server), 'package-smoke.mjs')
  const scratch = mkdtempSync(join(tmpdir(), 'portfolio-server-package-'))
  t.after(() => {
    assert.ok(resolve(scratch).startsWith(resolve(tmpdir()) + sep))
    rmSync(scratch, { recursive: true, force: true })
    rmSync(wrapper, { force: true })
  })

  // Match Vercel's Web Request wrapper, then ship only files its dependency
  // tracer finds. The temporary directory cannot fall back to our node_modules.
  writeFileSync(wrapper, `import * as RR from 'react-router';
import * as build from './index.js';
const handle = RR.createRequestHandler(build, 'production');
export default request => build.future.v8_middleware
  ? handle(request, new RR.RouterContextProvider()) : handle(request);
`)
  const trace = await nodeFileTrace([wrapper], { base: root, processCwd: root })
  for (const file of trace.fileList) {
    assert.doesNotMatch(file, /(^|[\\/])\.env[^\\/]*$/)
    const target = resolve(scratch, file)
    assert.ok(target.startsWith(resolve(scratch) + sep))
    mkdirSync(dirname(target), { recursive: true })
    copyFileSync(resolve(root, file), target)
  }

  const relativeWrapper = relative(root, wrapper).replaceAll('\\', '/')
  const paths = getPublicPages().map((page) => page.path)
  const requests = [
    ...paths.map((path) => [path, 200, 'html']),
    ...paths.map((path) => [path === '/' ? '/_root.data' : `${path}.data`, 200, 'data']),
    ...RESOURCE_PATHS.map((path) => [path, 200, 'resource']),
    ['/admin', 200, 'html'], ['/not-a-page', 404, 'html'],
  ]
  const check = join(scratch, 'check.mjs')
  writeFileSync(check, `import assert from 'node:assert/strict';
import handler from './${relativeWrapper.replaceAll('\\', '/')}';
for (const [path, status, kind] of ${JSON.stringify(requests)}) {
  const response = await handler(new Request('https://texcodes.com' + path));
  const body = await response.text();
  assert.equal(response.status, status, path);
  assert.doesNotMatch(body, /This page could not load\.|FUNCTION_INVOCATION_FAILED/, path);
  assert.ok(body.length > 10, path);
  if (kind === 'html') assert.match(body, /<h1/, path);
  if (kind === 'data') assert.match(response.headers.get('content-type'), /text\\/x-script/, path);
}
`)
  for (const args of [[], ['--no-experimental-require-module']]) {
    const result = spawnSync(process.execPath, [...args, check], {
      cwd: scratch,
      env: { ...process.env, NODE_ENV: 'production', VERCEL: '1' },
      encoding: 'utf8', timeout: 30000,
    })
    assert.equal(result.status, 0, result.stderr || result.error?.message)
  }
})
