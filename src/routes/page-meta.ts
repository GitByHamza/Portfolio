import type { MetaFunction } from 'react-router'
import type { loader } from './page-loader.server.ts'
import { localizePath } from '../lib/paths.ts'
import { BUSINESS } from '../data/business.js'
const SITE_ORIGIN = BUSINESS.url

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [{ title: 'Page not found — TeXCodes' }, { name: 'robots', content: 'noindex' }]
  const { page, schema } = data
  const canonical = `${SITE_ORIGIN}${page.path}`
  const title = page.title.includes('TeXCodes') ? page.title : `${page.title} — TeXCodes`
  return [
    { title }, { name: 'description', content: page.description },
    { tagName: 'link', rel: 'canonical', href: canonical },
    { property: 'og:type', content: 'website' }, { property: 'og:title', content: title },
    { property: 'og:description', content: page.description }, { property: 'og:url', content: canonical },
    { property: 'og:image', content: new URL(page.image || '/brand/texcodes-social.png', SITE_ORIGIN).href },
    { property: 'og:image:alt', content: page.kind === 'project' ? page.title : 'TeXCodes' },
    { name: 'twitter:image', content: new URL(page.image || '/brand/texcodes-social.png', SITE_ORIGIN).href },
    { property: 'og:site_name', content: 'TeXCodes' }, { name: 'twitter:card', content: 'summary' },
    ...(!['legal', 'context'].includes(page.kind) ? [
      { tagName: 'link' as const, rel: 'alternate', hrefLang: 'en', href: `${SITE_ORIGIN}${localizePath(page.path, 'en')}` },
      { tagName: 'link' as const, rel: 'alternate', hrefLang: 'ur-Latn', href: `${SITE_ORIGIN}${localizePath(page.path, 'ur-en')}` },
      { tagName: 'link' as const, rel: 'alternate', hrefLang: 'x-default', href: `${SITE_ORIGIN}${localizePath(page.path, 'en')}` },
    ] : []),
    { 'script:ld+json': schema },
  ]
}

export function headers() {
  return { 'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' }
}
