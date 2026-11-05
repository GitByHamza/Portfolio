import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, unlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve, sep } from 'node:path'
import { pathToFileURL } from 'node:url'
import { resolveServerBuild } from '../../scripts/server-builds.ts'

test('Vercel serves framework routes instead of rewriting every document to an SPA shell', () => {
  const config = JSON.parse(readFileSync(new URL('../../vercel.json', import.meta.url), 'utf8'))
  assert.equal(config.framework, 'react-router')
  assert.equal(config.outputDirectory, 'build/client')
  assert.ok(!(config.rewrites || []).some((rule: { destination: string }) => rule.destination === '/index.html'))
})

test('resource generation finds plain and Vercel Node builds and rejects ambiguous output', (t) => {
  const scratch = mkdtempSync(join(tmpdir(), 'portfolio-ssr-build-'))
  t.after(() => {
    const target = resolve(scratch)
    assert.ok(target.startsWith(resolve(tmpdir()) + sep))
    rmSync(target, { recursive: true, force: true })
  })
  const root = pathToFileURL(scratch + sep)
  assert.throws(() => resolveServerBuild(root), /No server build/)
  mkdirSync(join(scratch, 'server'), { recursive: true })
  writeFileSync(join(scratch, 'server', 'index.js'), '// test entry')
  assert.equal(resolveServerBuild(root).href, new URL('server/index.js', root).href)
  unlinkSync(join(scratch, 'server', 'index.js'))
  mkdirSync(join(scratch, 'server', 'nodejs_one'))
  writeFileSync(join(scratch, 'server', 'nodejs_one', 'index.js'), '// test bundle')
  assert.equal(resolveServerBuild(root).href, new URL('server/nodejs_one/index.js', root).href)
  mkdirSync(join(scratch, 'server', 'nodejs_two'))
  writeFileSync(join(scratch, 'server', 'nodejs_two', 'index.js'), '// second bundle')
  assert.throws(() => resolveServerBuild(root), /Expected one Node/)
})
