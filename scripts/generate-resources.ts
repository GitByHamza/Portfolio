import { copyFile, mkdir, writeFile } from 'node:fs/promises'
import { createRequestHandler } from 'react-router'
import { RESOURCE_PATHS, getPublicPages } from '../src/lib/site.ts'
import { resolveServerBuild } from './server-builds.ts'

const buildUrl = resolveServerBuild(new URL('../build/', import.meta.url))
const server = await import(buildUrl.href)
const handler = createRequestHandler(server, 'production')
const output = new URL('../build/client/', import.meta.url)
await mkdir(output, { recursive: true })
// Flat mirrors let static hosts serve slashless canonical URLs directly, while
// directory indexes retain compatibility with existing slash-terminated links.
for (const page of getPublicPages()) {
  if (page.path === '/') continue
  await copyFile(new URL(`${page.path.slice(1)}/index.html`, output), new URL(`${page.path.slice(1)}.html`, output))
}
for (const path of RESOURCE_PATHS) {
  const response = await handler(new Request(`http://localhost${path}`))
  if (!response.ok) throw new Error(`Cannot generate ${path}: HTTP ${response.status}`)
  await writeFile(new URL(path.slice(1), output), await response.text())
  console.log(`Generated ${path}`)
}
