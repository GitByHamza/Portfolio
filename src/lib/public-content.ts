import { BUSINESS } from '../data/business.js'
import { projectsData } from '../data/projects.js'
import { en } from '../locales/en.js'
import { offers } from '../content/offers.ts'
import { FAQ_I18N } from '../content/faq.ts'
import { carePlans, COMMERCIAL, PLAN_KEYS, PLAN_SLUGS, money, priceLabel } from '../content/pricing.ts'
import type { Currency } from '../content/pricing.ts'
import { CONTENT_UPDATED, SITE_ORIGIN, getPublicPages } from './site.ts'
import type { PublicPage } from './site.ts'

const absolute = (path: string) => `${SITE_ORIGIN}${path}`

export function briefingMarkdown(): string {
  const lines = [
    '# TeXCodes — business and portfolio briefing', '', `Reviewed: ${CONTENT_UPDATED}`, '',
    `${BUSINESS.owner} (Hamza) runs ${BUSINESS.name}, an independent software engineering studio and product builder based in Pakistan (PKT / UTC+5), working remotely worldwide.`, '',
    '## Engineering services', '',
    'Custom SaaS and SaaS modernization; business operations systems, CRMs and ERPs; retail commerce platforms; AI and WhatsApp automation. Technologies include Next.js, React, Vue, Laravel, Node.js, PostgreSQL and Prisma.', '',
    '## Commercial offers', '',
  ]
  for (const offer of offers) {
    lines.push(`### ${offer.name}`, '', offer.description, '', `Offer: ${absolute(`/offers/${offer.slug}`)}`, `Demo: ${offer.demo}`, '')
    for (const key of PLAN_KEYS) {
      const plan = offer.plans.en[key]
      const prices = Object.entries(offer.prices[key]).map(([currency, value]) => `${priceLabel(value, currency as Currency)} ${currency}${currency === 'PKR' ? ' (Pakistan)' : currency === 'GBP' ? ' (UK)' : ' (international)'}`).join('; ')
      lines.push(`- **${plan.name}** — ${prices}. Delivery: ${plan.delivery}. Best for: ${plan.idealFor}`, `  Full scope: ${absolute(`/offers/${offer.slug}/plans/${PLAN_SLUGS[key]}`)}`)
    }
    lines.push('')
  }
  lines.push('## Delivery, ownership and ongoing costs', '', COMMERCIAL.delivery, '', COMMERCIAL.payment, '', COMMERCIAL.ownership, '', COMMERCIAL.warranty, '', COMMERCIAL.guarantee, '', COMMERCIAL.costs, '', 'Optional Care Plans, per month (GBP available for Console):', '')
  for (const care of carePlans) lines.push(`- ${care.name}: ${money(care.USD, 'USD')} USD / ${money(care.GBP, 'GBP')} GBP / ${money(care.PKR, 'PKR')} PKR. ${care.description}`)
  lines.push('', `Authoritative retail terms: ${absolute('/offers/terms')}`, '', '## Portfolio evidence', '', 'Project descriptions below reflect the published portfolio. Demo and development status are identified where provided.', '')
  for (const project of projectsData) lines.push(`### ${project.title}`, '', project.overview, '', `Status / evidence: ${project.impact}`, `Case study: ${absolute(`/project/${project.id}`)}`, ...(project.demoUrl ? [`Live / demo: ${project.demoUrl}`] : []), ...(project.githubUrl && project.githubUrl !== '#' ? [`Repository: ${project.githubUrl}`] : []), '')
  lines.push('## Contact', '', `Email: ${BUSINESS.email}`, `WhatsApp: https://wa.me/${BUSINESS.phoneE164.replace('+', '')}`, `Phone: ${BUSINESS.phone}`, `Book a call: ${BUSINESS.bookingUrl}`, '', `Full public content: ${absolute('/llms-full.txt')}`, `Privacy: ${absolute('/privacy-policy')}`, `General terms: ${absolute('/terms-of-service')}`, `Data deletion: ${absolute('/data-deletion')}`, '')
  return lines.join('\n')
}

export function fullMarkdown(): string {
  const lines = [briefingMarkdown(), '## Engineering background', '', ...Object.entries(en.aboutPage).filter(([key]) => /^ch\d_p\d$/.test(key)).map(([, value]) => `${value}\n`)]
  for (const offer of offers) {
    lines.push(`## ${offer.name} — complete plan scopes`, '')
    for (const key of PLAN_KEYS) {
      const plan = offer.plans.en[key]
      lines.push(`### ${plan.name}`, '', `Delivery: ${plan.delivery}`, '', `Best for: ${plan.idealFor}`, '')
      for (const module of plan.modules) lines.push(`#### ${module.title}`, '', module.desc || '', ...(module.items || []).map((item) => `- ${item}`), '')
      lines.push('#### Exclusions', '', ...plan.exclusions.map((item) => `- ${item}`), '')
    }
    lines.push('### Optional add-ons', '')
    for (const extra of offer.extras) lines.push(`- ${extra.en}: ${extra.priceUsd} USD; ${extra.pricePkr} PKR${extra.priceGbp ? `; ${extra.priceGbp} GBP` : ''}. ${extra.descEn}`)
    lines.push('')
  }
  lines.push('## Frequently asked questions', '')
  for (const item of FAQ_I18N.en.items) lines.push(`### ${item.q}`, '', item.a, '')
  for (const project of projectsData) {
    lines.push(`## Case study: ${project.title}`, '', project.description || project.overview, '', ...project.features.map((feature) => `- ${feature}`), '', 'Technology:', ...project.techStack.map((entry) => `- ${entry.category}: ${entry.tech}`), '')
  }
  return lines.join('\n')
}

const xmlEscape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;')

export function sitemapXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${getPublicPages().map((page) => `  <url><loc>${xmlEscape(absolute(page.path))}</loc></url>`).join('\n')}\n</urlset>\n`
}

export function structuredData(page: PublicPage): Record<string, unknown> {
  const organization = { '@type': 'Organization', '@id': `${SITE_ORIGIN}/#organization`, name: BUSINESS.name, url: SITE_ORIGIN, logo: absolute('/brand/texcodes-logo.png'), email: BUSINESS.email, telephone: BUSINESS.phoneE164, founder: { '@type': 'Person', name: BUSINESS.owner } }
  const graph: Record<string, unknown>[] = [organization, { '@type': 'WebSite', '@id': `${SITE_ORIGIN}/#website`, name: BUSINESS.name, url: SITE_ORIGIN, publisher: { '@id': organization['@id'] } }, { '@type': 'WebPage', '@id': absolute(page.path), url: absolute(page.path), name: page.title, description: page.description, inLanguage: page.lang === 'ur-en' ? 'ur-Latn' : 'en', isPartOf: { '@id': `${SITE_ORIGIN}/#website` } }]
  const offer = offers.find((offer) => offer.slug === page.offer)
  if (offer) {
    const keys = page.plan ? PLAN_KEYS.filter((key) => PLAN_SLUGS[key] === page.plan) : PLAN_KEYS
    graph.push({ '@type': 'Service', name: offer.name, description: offer.description, provider: { '@id': organization['@id'] }, url: absolute(page.kind === 'funnel' ? page.path : `/offers/${offer.slug}`), offers: keys.flatMap((key) => Object.entries(offer.prices[key])
      .filter(([currency]) => page.kind !== 'funnel' || currency === 'USD')
      .map(([currency, price]) => ({ '@type': 'Offer', name: offer.plans.en[key].name, price: price.amount, priceCurrency: currency, url: absolute(`/offers/${offer.slug}/plans/${PLAN_SLUGS[key]}`), description: `${price.startingAt ? 'Starting price; final scope quoted. ' : 'Fixed agreed scope. '}${currency === 'PKR' ? 'For businesses in Pakistan.' : currency === 'GBP' ? 'For UK Console clients.' : 'For international clients.'}` }))) })
  }
  if (page.kind === 'project') graph.push({ '@type': 'CreativeWork', name: page.title, description: page.description, url: absolute(page.path), creator: { '@type': 'Person', name: BUSINESS.owner } })
  return { '@context': 'https://schema.org', '@graph': graph }
}
