import type { Language } from '../content/pricing.ts'
const ENGLISH_ONLY = new Set(['/privacy-policy', '/terms-of-service', '/data-deletion', '/context'])
const RESOURCES = new Set(['/context.md', '/llms.txt', '/llms-full.txt', '/robots.txt', '/sitemap.xml'])

export function localizePath(path: string, lang: Language): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path
  const match = path.match(/^([^?#]*)(.*)$/)!
  const clean = match[1].replace(/^\/ur(?=\/|$)/, '') || '/'
  const englishOnly = ENGLISH_ONLY.has(clean) || clean.startsWith('/admin') || RESOURCES.has(clean)
  return `${lang === 'ur-en' && !englishOnly ? `/ur${clean === '/' ? '' : clean}` : clean}${match[2]}`
}
