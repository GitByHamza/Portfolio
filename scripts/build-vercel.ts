import { spawnSync } from 'node:child_process'

const npmCli = process.env.npm_execpath
if (!npmCli) throw new Error('Run this through npm run build:vercel')
const result = spawnSync(process.execPath, [npmCli, 'run', 'build'], {
  stdio: 'inherit',
  env: { ...process.env, VERCEL: '1' },
})
if (result.error) throw result.error
process.exit(result.status ?? 1)
