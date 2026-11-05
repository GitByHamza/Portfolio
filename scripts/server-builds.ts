import { existsSync, readdirSync } from 'node:fs'

// Vercel's preset groups Node routes under nodejs_<config hash>. Plain Node
// and Netlify builds keep the same entry at the server-directory root.
export function resolveServerBuild(buildRoot: URL): URL {
  const serverRoot = new URL('server/', buildRoot)
  const direct = new URL('index.js', serverRoot)
  if (existsSync(direct)) return direct
  if (!existsSync(serverRoot)) throw new Error('No server build; run the framework build first')
  const bundles = readdirSync(serverRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith('nodejs_'))
    .map((entry) => new URL(`${entry.name}/index.js`, serverRoot))
    .filter((url) => existsSync(url))
  if (bundles.length !== 1) throw new Error('Expected one Node server bundle for public content generation')
  return bundles[0]
}
