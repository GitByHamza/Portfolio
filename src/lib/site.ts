import { localizePath } from './paths.ts'
export { localizePath } from './paths.ts'
import { BUSINESS, LEGAL_PAGES } from '../data/business.js'
import { projectsData } from '../data/projects.js'
import { offerIndex } from '../content/offer-index.ts'
import { PLAN_KEYS, PLAN_NAMES, PLAN_SLUGS } from '../content/pricing.ts'
import type { Language } from '../content/pricing.ts'

export type PublicPage = {
  path: string; title: string; description: string; lang: Language
  kind: 'home' | 'about' | 'work' | 'contact' | 'solutions' | 'offer' | 'funnel' | 'plan' | 'project' | 'terms' | 'legal' | 'context'
  offer?: string; plan?: string; projectId?: number; image?: string
}
export const SITE_ORIGIN = BUSINESS.url
export const CONTENT_UPDATED = '2026-11-05'
export const RESOURCE_PATHS = ['/context.md', '/llms.txt', '/llms-full.txt', '/sitemap.xml', '/robots.txt']

const basePages: Omit<PublicPage, 'lang'>[] = [
  { path: '/', kind: 'home', title: 'TeXCodes — Independent Software Engineering Studio & Product Builder', description: 'TeXCodes (Hamza) builds production SaaS, custom business systems, retail platforms and AI automation. Based in Pakistan, working remotely worldwide.' },
  { path: '/about', kind: 'about', title: 'About Hamza & TeXCodes', description: 'Muhammad Ameer Hamza’s software engineering background, production work, SaaS modernization and approach to building business systems.' },
  { path: '/work', kind: 'work', title: 'Software Projects & Case Studies', description: 'Explore 12 software projects: SaaS, enterprise systems, retail platforms, AI automation, business applications and mobile products.' },
  { path: '/contact', kind: 'contact', title: 'Contact TeXCodes', description: `Discuss a custom system, SaaS modernization or retail platform with Hamza. Email ${BUSINESS.email} or contact TeXCodes on WhatsApp.` },
  { path: '/offers', kind: 'solutions', title: 'Retail Software Offers & Plans', description: 'Compare Tech Retail OS, Laptop Retail OS and Console & Games Retail OS: plans, regional prices, source code handover and delivery scope.' },
  { path: '/tech-retail/offer', kind: 'funnel', title: 'Tech Retail OS — One System for Your PC Retail Business', description: 'PC compatibility checks, stock across three locations and serial-number warranty records. Explore the Multi-Branch offer and arrange a personalised demo.', offer: 'tech-retail', plan: 'multi-branch', image: '/tech-retail/preview.webp' },
  ...offerIndex.map((offer): Omit<PublicPage, 'lang'> => ({ path: `/offers/${offer.slug}`, kind: 'offer', title: `${offer.name} — Plans & Pricing`, description: offer.description, offer: offer.slug })),
  ...offerIndex.flatMap((offer) => PLAN_KEYS.map((key): Omit<PublicPage, 'lang'> => ({ path: `/offers/${offer.slug}/plans/${PLAN_SLUGS[key]}`, kind: 'plan', title: `${offer.name} — ${PLAN_NAMES[key]} Full Scope`, description: `Full ${PLAN_NAMES[key]} scope for ${offer.name}: included modules, exclusions, regional prices, delivery conditions and ownership.`, offer: offer.slug, plan: PLAN_SLUGS[key] }))),
  ...projectsData.map((project): Omit<PublicPage, 'lang'> => ({ path: `/project/${project.id}`, kind: 'project', title: project.title, description: project.overview, projectId: project.id, image: project.mainImage })),
  { path: '/offers/terms', kind: 'terms', title: 'Retail OS — Scope, Payment & Warranty Terms', description: 'The scope, ownership, delivery, revisions, warranty, payment milestones, hosting and support terms for all three TeXCodes retail offers.' },
  ...LEGAL_PAGES.map((page): Omit<PublicPage, 'lang'> => ({ ...page, kind: 'legal' })),
  { path: '/context', kind: 'context', title: 'TeXCodes — Business & Portfolio Briefing', description: 'A complete public briefing on Hamza, engineering services, three Retail OS offers, pricing, delivery, ownership, projects and contact details.' },
]

const aliases: Record<string, string> = {
  '/terms': '/terms-of-service', '/privacy': '/privacy-policy',
  '/solutions/tech-retail/terms': '/offers/terms',
  '/offers/tech-retail/terms': '/offers/terms',
  '/offer': '/offers/tech-retail', '/offer/tech-retail': '/offers/tech-retail',
  '/offer/laptop': '/offers/laptop-retail', '/offer/laptop-retail': '/offers/laptop-retail',
  '/offer/console': '/offers/console-retail', '/offer/console-retail': '/offers/console-retail',
  '/offer/gaming': '/offers/console-retail',
}


export function getPublicPages(): PublicPage[] {
  return basePages.flatMap((page) => {
    const english = { ...page, lang: 'en' as const }
    return ['legal', 'context'].includes(page.kind) ? [english] : [english, { ...page, path: localizePath(page.path, 'ur-en'), lang: 'ur-en' as const }]
  })
}

const pageMap = new Map(getPublicPages().map((page) => [page.path, page]))
export type Resolution = { kind: 'page'; page: PublicPage } | { kind: 'redirect'; to: string } | { kind: 'missing' }

export function resolvePublicPath(path: string): Resolution {
  const clean = path.replace(/\/+$/, '') || '/'
  const lang = /^\/ur(?:\/|$)/.test(clean) ? 'ur-en' : 'en'
  const plain = clean.replace(/^\/ur(?=\/|$)/, '') || '/'
  if (aliases[plain]) return { kind: 'redirect', to: localizePath(aliases[plain], lang) }
  const projectAlias = plain.match(/^\/work\/([1-9]\d*)$/)
  if (projectAlias && projectsData.some((project) => project.id === Number(projectAlias[1]))) {
    return { kind: 'redirect', to: localizePath(`/project/${projectAlias[1]}`, lang) }
  }
  const canonical = localizePath(plain.replace(/^\/solutions(?=\/|$)/, '/offers'), lang)
  const page = pageMap.get(canonical)
  if (page) return canonical !== path ? { kind: 'redirect', to: canonical } : { kind: 'page', page }
  if (clean !== path) return { kind: 'redirect', to: clean }
  return { kind: 'missing' }
}
