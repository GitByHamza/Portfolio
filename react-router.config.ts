import type { Config } from '@react-router/dev/config'
import { vercelPreset } from '@vercel/react-router/vite'
import { getPublicPages } from './src/lib/site.ts'

export default {
  appDirectory: 'src',
  presets: process.env.VERCEL === '1' ? [vercelPreset()] : [],
  ssr: true,
  // The small route map is cheaper than an extra discovery request on a tap.
  routeDiscovery: { mode: 'initial' },
  prerender: getPublicPages().map((page) => page.path),
  future: { v8_middleware: true },
} satisfies Config
