// The short lead form on the Tech Retail funnel: validation, ad-source capture and the database row.
// The same four questions as the Meta instant form: shop type, city, branches, WhatsApp number.
import { SHOP_TYPES } from '../content/tech-retail-funnel.ts'
import type { FunnelLanguage, ShopType } from '../content/tech-retail-funnel.ts'

export const BRANCH_OPTIONS = ['1', '2-3', '4+'] as const
export type Branches = (typeof BRANCH_OPTIONS)[number]

export type Lead = { shop: ShopType; city: string; branches: Branches; whatsapp: string }
export type LeadField = 'shop' | 'city' | 'branches' | 'whatsapp'
export type LeadInput = { shop: string; city: string; branches: string; whatsapp: string; website?: string }
export type LeadResult = { ok: true; spam: boolean; lead: Lead } | { ok: false; errors: Partial<Record<LeadField, true>> }

const CITY = /^[\p{L}\p{M}][\p{L}\p{M} .'-]{1,59}$/u

/** Returns the number as +923XXXXXXXXX, or null when it is not a Pakistani mobile number. */
export function normalizePakistaniMobile(input: string): string | null {
  const compact = input.replace(/[\s().-]/g, '')
  const digits = compact.replace(/^\+/, '')
  if (!/^\d+$/.test(digits)) return null
  const national = digits.replace(/^0092/, '').replace(/^92(?=3\d{9}$)/, '').replace(/^0(?=3\d{9}$)/, '')
  return /^3\d{9}$/.test(national) ? `+92${national}` : null
}

export function validateLead(input: LeadInput): LeadResult {
  const errors: Partial<Record<LeadField, true>> = {}
  const city = input.city.trim().replace(/\s+/g, ' ')
  const whatsapp = normalizePakistaniMobile(input.whatsapp)
  if (!(SHOP_TYPES as readonly string[]).includes(input.shop)) errors.shop = true
  if (!CITY.test(city)) errors.city = true
  if (!(BRANCH_OPTIONS as readonly string[]).includes(input.branches)) errors.branches = true
  if (!whatsapp) errors.whatsapp = true
  if (Object.keys(errors).length || !whatsapp) return { ok: false, errors }
  return { ok: true, spam: !!input.website?.trim(), lead: { shop: input.shop as ShopType, city, branches: input.branches as Branches, whatsapp } }
}

// Which ad brought the visitor. Saved with each form lead so leads can be matched to hooks.
export const AD_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'] as const
type AdParam = (typeof AD_PARAMS)[number]
export type AdSource = Partial<Record<AdParam, string>>
const MAX_LENGTH: Record<AdParam, number> = { utm_source: 200, utm_medium: 200, utm_campaign: 200, utm_content: 200, utm_term: 200, fbclid: 500 }
const STORAGE_KEY = 'tx_ad_source'

function clean(values: Record<string, unknown>): AdSource {
  const source: AdSource = {}
  for (const key of AD_PARAMS) {
    const value = values[key]
    if (typeof value === 'string' && value.trim()) source[key] = value.trim().slice(0, MAX_LENGTH[key])
  }
  return source
}

export function readAdSource(search: string): AdSource {
  return clean(Object.fromEntries(new URLSearchParams(search)))
}

type SessionStore = { getItem(key: string): string | null; setItem(key: string, value: string): void }

/** The ad parameters of this visit: from the URL when it has any, otherwise the ones saved on landing. */
export function rememberAdSource(search: string, storage: SessionStore | null): AdSource {
  const fromUrl = readAdSource(search)
  if (Object.keys(fromUrl).length) {
    try { storage?.setItem(STORAGE_KEY, JSON.stringify(fromUrl)) } catch { /* storage blocked */ }
    return fromUrl
  }
  try {
    const saved: unknown = JSON.parse(storage?.getItem(STORAGE_KEY) ?? '{}')
    return saved && typeof saved === 'object' ? clean(saved as Record<string, unknown>) : {}
  } catch {
    return {}
  }
}

export function leadRow(lead: Lead, language: FunnelLanguage, source: AdSource, pagePath: string) {
  return {
    shop_type: lead.shop, city: lead.city, branches: lead.branches, whatsapp: lead.whatsapp, language, page_path: pagePath.slice(0, 200),
    ...Object.fromEntries(AD_PARAMS.map((key) => [key, source[key] ?? null])) as Record<AdParam, string | null>,
  }
}
