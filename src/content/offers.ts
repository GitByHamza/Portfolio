import * as tech from './offers/tech.ts'
import * as laptop from './offers/laptop.ts'
import * as consoleOffer from './offers/console.ts'
import { offerIndex } from './offer-index.ts'
import { PLAN_KEYS, PLAN_SLUGS, priceCatalog } from './pricing.ts'
import type { Language, PlanKey } from './pricing.ts'

const content = { tech, laptop, console: consoleOffer }

export const offers = offerIndex.map((entry) => ({
  ...entry,
  prices: priceCatalog[entry.key],
  plans: content[entry.key].PLANS_DETAIL,
  extras: content[entry.key].EXTRAS_DATA,
  copy: content[entry.key].I18N_DATA,
}))

export function getOffer(slug: string) {
  return offers.find((offer) => offer.slug === slug)
}

export function getPlan(offerSlug: string, planSlug: string, lang: Language = 'en') {
  const offer = getOffer(offerSlug)
  const key = planKeyFromSlug(planSlug)
  return offer && key ? { ...offer.plans[lang][key], key, slug: planSlug, prices: offer.prices[key] } : undefined
}

export function planKeyFromSlug(slug: string): PlanKey | undefined {
  return PLAN_KEYS.find((key) => PLAN_SLUGS[key] === slug)
}
