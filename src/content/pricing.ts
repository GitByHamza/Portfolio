export type Language = 'en' | 'ur-en'
export type Currency = 'USD' | 'GBP' | 'PKR'
export type OfferKey = 'tech' | 'laptop' | 'console'
export type PlanKey = 'starter' | 'growth' | 'enterprise'
export type PlanSlug = 'online-store' | 'retail-operations' | 'chain-wholesale'
export type Price = { amount: number; compare: number; startingAt?: boolean }
export type RegionalPrices = { USD: Price; PKR: Price; GBP?: Price }
export type PlanModule = { title: string; desc?: string; items?: string[] }
export type OfferPlan = {
  name: string; badge: string; code?: string; delivery: string; idealFor: string
  modules: PlanModule[]; exclusions: string[]
  artifacts: { title: string; image: string; tag: string }[]
  price?: string; priceUsd?: string; pricePkr?: string; priceGbp?: string
  storefrontDemoUrl?: string; adminDemoUrl?: string
}
export type Extra = {
  en: string; ur: string; priceUsd: string; pricePkr: string; priceGbp?: string
  descEn: string; descUr: string; starterOnly?: boolean
}

export const PLAN_KEYS: PlanKey[] = ['starter', 'growth', 'enterprise']
export const PLAN_SLUGS: Record<PlanKey, PlanSlug> = {
  starter: 'online-store', growth: 'retail-operations', enterprise: 'chain-wholesale',
}
// Plan URLs used before the plans were renamed. Old links redirect to the new ones.
export const OLD_PLAN_SLUGS: Record<string, PlanSlug> = {
  'single-store': 'online-store', 'multi-branch': 'retail-operations',
}
export const PLAN_NAMES: Record<PlanKey, string> = {
  starter: 'Online Store', growth: 'Retail Operations', enterprise: 'Chain & Wholesale',
}

// Advertised regional prices, not live exchange-rate conversions.
export const priceCatalog: Record<OfferKey, Record<PlanKey, RegionalPrices>> = {
  tech: {
    starter: { USD: { amount: 2450, compare: 2950 }, PKR: { amount: 280000, compare: 340000 } },
    growth: { USD: { amount: 4850, compare: 5800 }, PKR: { amount: 550000, compare: 660000 } },
    enterprise: { USD: { amount: 8500, compare: 10200, startingAt: true }, PKR: { amount: 950000, compare: 1140000, startingAt: true } },
  },
  laptop: {
    starter: { USD: { amount: 2250, compare: 2700 }, PKR: { amount: 250000, compare: 300000 } },
    growth: { USD: { amount: 4450, compare: 5350 }, PKR: { amount: 490000, compare: 590000 } },
    enterprise: { USD: { amount: 7900, compare: 9500, startingAt: true }, PKR: { amount: 850000, compare: 1020000, startingAt: true } },
  },
  console: {
    starter: { USD: { amount: 2250, compare: 2700 }, GBP: { amount: 1850, compare: 2200 }, PKR: { amount: 260000, compare: 310000 } },
    growth: { USD: { amount: 4450, compare: 5350 }, GBP: { amount: 3650, compare: 4400 }, PKR: { amount: 490000, compare: 590000 } },
    enterprise: { USD: { amount: 7900, compare: 9500, startingAt: true }, GBP: { amount: 6500, compare: 7800, startingAt: true }, PKR: { amount: 850000, compare: 1020000, startingAt: true } },
  },
}

export const carePlans = [
  { name: 'Basic Care', USD: 140, GBP: 115, PKR: 14000, description: 'Hosting, SSL, daily backups, uptime monitoring, small edits and email support.' },
  { name: 'Growth Care', USD: 280, GBP: 230, PKR: 28000, description: 'Basic Care plus priority replies within 4 business hours, small monthly changes and WhatsApp support.' },
  { name: 'Enterprise Care', USD: 550, GBP: 450, PKR: 55000, description: 'Growth Care plus dedicated engineer hours, integration support, a 99.5% uptime target and phone support.' },
]

export function money(amount: number, currency: Currency): string {
  const prefix = currency === 'USD' ? '$' : currency === 'GBP' ? '£' : 'PKR '
  return `${prefix}${amount.toLocaleString('en-US')}`
}

export function priceLabel(price: Price, currency: Currency, lang: Language = 'en'): string {
  const label = money(price.amount, currency)
  return price.startingAt ? (lang === 'ur-en' ? `${label} se shuru` : `From ${label}`) : label
}

export function pricedCopy(key: OfferKey, copy: Record<Language, Record<string, string>>) {
  return Object.fromEntries(Object.entries(copy).map(([lang, dict]) => {
    const prices: Record<string, string> = {}
    for (const [index, plan] of PLAN_KEYS.entries()) {
      for (const [currency, price] of Object.entries(priceCatalog[key][plan])) {
        prices[`${plan}_price_${currency.toLowerCase()}`] = priceLabel(price, currency as Currency, lang as Language)
        const supportKey = `${plan}_support_${currency.toLowerCase()}`
        if (dict[supportKey]) prices[supportKey] = dict[supportKey].replace('{care_price}', money(carePlans[index][currency as Currency], currency as Currency))
      }
    }
    return [lang, { ...dict, ...prices }]
  })) as Record<Language, Record<string, string>>
}

export function pricedPlans(key: OfferKey, copy: Record<Language, Record<PlanKey, OfferPlan>>) {
  return Object.fromEntries(Object.entries(copy).map(([lang, plans]) => [lang,
    Object.fromEntries(PLAN_KEYS.map((plan) => {
      const prices = priceCatalog[key][plan]
      return [plan, { ...plans[plan],
        priceUsd: priceLabel(prices.USD, 'USD', lang as Language),
        pricePkr: priceLabel(prices.PKR, 'PKR', lang as Language),
        ...(prices.GBP ? { priceGbp: priceLabel(prices.GBP, 'GBP', lang as Language) } : {}),
      }]
    })),
  ])) as Record<Language, Record<PlanKey, OfferPlan>>
}

export function comparePrices(key: OfferKey) {
  return Object.fromEntries(PLAN_KEYS.map((plan) => [plan,
    Object.fromEntries(Object.entries(priceCatalog[key][plan]).map(([currency, price]) => [currency.toLowerCase(), money(price.compare, currency as Currency)])),
  ])) as Record<PlanKey, { usd: string; pkr: string; gbp?: string }>
}

export const COMMERCIAL = {
  payment: '40 / 40 / 20: to start, at staging approval, and at launch.',
  ownership: 'On final payment, your GitHub repository, database and admin accounts are transferred to you. Your design, content and custom features are yours alone. The core engine is shared across clients; market exclusivity can be arranged.',
  delivery: 'Online Store: 10 days. Retail Operations: 21 days. Chain & Wholesale: from 30 days, with the final date fixed in the scope document. The clock starts when content and first payment are received and pauses while awaiting content, feedback or third-party approvals.',
  warranty: 'Bugs in the delivered work are fixed free for 30 days. New features are quoted upfront or covered by a Care Plan.',
  guarantee: 'Test the private staging deployment against the signed acceptance checklist. Unmet items are fixed within 10 working days. If the checklist still cannot be met, the deposit is refundable on request and the engagement ends.',
  costs: 'No monthly platform fee or sales commission. Hosting, domain renewal, payment gateway fees, SMS/WhatsApp API costs and AI usage are paid separately. Care Plans are optional monthly services and include hosting.',
}
