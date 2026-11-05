import { htmlToText } from './html.ts'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { LanguageProvider } from '../context/LanguageContext.jsx'
import PrivacyPolicy from '../pages/PrivacyPolicy.jsx'
import TermsOfService from '../pages/TermsOfService.jsx'
import DataDeletion from '../pages/DataDeletion.jsx'
import RetailTerms from '../pages/solutions/TechRetailTerms.jsx'
import { briefingMarkdown, fullMarkdown, sitemapXml } from './public-content.ts'
import { getPublicPages, SITE_ORIGIN } from './site.ts'


function legalMarkdown() {
  return [PrivacyPolicy, TermsOfService, DataDeletion, RetailTerms].map((Page) => htmlToText(renderToStaticMarkup(<StaticRouter location="/solutions/terms"><LanguageProvider><Page /></LanguageProvider></StaticRouter>))).join('\n\n')
}

const cache = new Map<string, { body: string; type: string }>()
export function publicResource(path: string): { body: string; type: string } | undefined {
  if (cache.has(path)) return cache.get(path)
  let result
  if (path === '/context.md') result = { body: briefingMarkdown(), type: 'text/markdown; charset=utf-8' }
  if (path === '/llms-full.txt') result = { body: `${fullMarkdown()}\n\n## Full published terms and policies\n\n${legalMarkdown()}\n`, type: 'text/plain; charset=utf-8' }
  if (path === '/sitemap.xml') result = { body: sitemapXml(), type: 'application/xml; charset=utf-8' }
  if (path === '/robots.txt') result = { body: `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`, type: 'text/plain; charset=utf-8' }
  if (path === '/llms.txt') result = { body: ['# TeXCodes', '', '> Independent software engineering studio run by Muhammad Ameer Hamza, based in Pakistan and working remotely worldwide.', '', 'Public engineering services, retail offers, prices, plan scopes, project evidence and contact information.', '', '## Briefings', `- [Business briefing](${SITE_ORIGIN}/context.md): services, all offers, prices, ongoing costs and project index.`, `- [Complete public content](${SITE_ORIGIN}/llms-full.txt): full plan scopes, add-ons, FAQs, case studies and published terms.`, '', '## Public pages', ...getPublicPages().filter((page) => page.lang === 'en').map((page) => `- [${page.title}](${SITE_ORIGIN}${page.path}): ${page.description}`), '', '## Roman Urdu', `- [Roman Urdu portfolio](${SITE_ORIGIN}/ur)`, ''].join('\n'), type: 'text/plain; charset=utf-8' }
  if (result) cache.set(path, result)
  return result
}
