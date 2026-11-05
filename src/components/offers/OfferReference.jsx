import { ArrowRight, ChevronDown } from 'lucide-react'
import Link from '../SiteLink'
import { useLanguage } from '../../context/LanguageContext'
import { offerIndex } from '../../content/offer-index.ts'
import { carePlans, priceCatalog, PLAN_KEYS, PLAN_NAMES, PLAN_SLUGS, priceLabel, money } from '../../content/pricing.ts'

export function OfferExtra({ extra, currency = 'USD', isUrdu = false }) {
  const price = currency === 'PKR' ? extra.pricePkr : currency === 'GBP' && extra.priceGbp ? extra.priceGbp : extra.priceUsd
  return <details className="offer-extra group border border-[rgba(15,15,15,0.14)] dark:border-white/15 bg-[#FAF9F5] dark:bg-[#161619] p-4">
    <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
      <span className="space-y-1"><span className="offer-ui-strong block">{isUrdu ? extra.ur : extra.en}</span><span className="offer-ui text-[#047857] dark:text-[#10B981] block">{price}</span></span>
      <ChevronDown size={16} className="shrink-0 mt-1 group-open:rotate-180 transition-transform" />
    </summary>
    <p className="offer-body pt-4 mt-3 border-t border-black/10 dark:border-white/10 text-[#575652] dark:text-[#C5C4BE]">{isUrdu ? extra.descUr : extra.descEn}</p>
    {extra.starterOnly && <p className="offer-ui mt-3 text-[#047857] dark:text-[#10B981]">{isUrdu ? 'Multi-Branch aur Chain mein shamil.' : 'Included in Multi-Branch and Chain.'}</p>}
  </details>
}

export function PricingTable({ offerKey }) {
  const prices = priceCatalog[offerKey]
  const hasGbp = Boolean(prices.starter.GBP)
  return <div className="overflow-x-auto border border-black/15 dark:border-white/15">
    <table className="w-full text-left text-sm tabular-nums">
      <caption className="text-left px-4 py-3 font-serif text-[#575652] dark:text-[#C5C4BE]">Regional build prices. PKR applies to businesses in Pakistan{hasGbp ? '; GBP is available for UK Console clients' : ''}. These are fixed regional prices, not currency conversions.</caption>
      <thead className="border-y border-black/15 dark:border-white/15 bg-white/60 dark:bg-white/5"><tr><th scope="col" className="p-4">Plan</th><th scope="col" className="p-4">USD</th><th scope="col" className="p-4">PKR</th>{hasGbp && <th scope="col" className="p-4">GBP</th>}</tr></thead>
      <tbody>{PLAN_KEYS.map((key) => <tr key={key} className="border-t border-black/10 dark:border-white/10"><th scope="row" className="p-4 font-medium">{PLAN_NAMES[key]}</th>{['USD', 'PKR', ...(hasGbp ? ['GBP'] : [])].map((currency) => <td key={currency} className="p-4 whitespace-nowrap">{priceLabel(prices[key][currency], currency)}</td>)}</tr>)}</tbody>
    </table>
  </div>
}

export function CarePricing() {
  return <div className="overflow-x-auto"><table className="w-full text-left text-sm tabular-nums">
    <caption className="text-left py-3 font-serif">Optional Care Plans, per month. GBP is available for Console clients. Hosting is included; third-party usage is billed separately.</caption>
    <thead><tr>{['Care Plan', 'USD / month', 'PKR / month', 'GBP / month'].map((title) => <th key={title} scope="col" className="p-3 border-b border-black/15 dark:border-white/15">{title}</th>)}</tr></thead>
    <tbody>{carePlans.map((care) => <tr key={care.name}><th scope="row" className="p-3 font-medium">{care.name}</th>{['USD', 'PKR', 'GBP'].map((currency) => <td key={currency} className="p-3 whitespace-nowrap">{money(care[currency], currency)}</td>)}</tr>)}</tbody>
  </table></div>
}

export default function OfferReference({ offerKey }) {
  const { isUrdu } = useLanguage()
  const offer = offerIndex.find((item) => item.key === offerKey)
  return <section className="px-4 sm:px-8 py-12 sm:py-16 border-b border-black/15 dark:border-white/15 bg-[#F6F5F0] dark:bg-[#0F0F11]">
    <div className="max-w-6xl mx-auto space-y-7">
      <h2 className="offer-h2">{isUrdu ? 'Har plan ka poora scope' : 'Every plan, in full.'}</h2>
      <p className="font-serif max-w-3xl text-[#575652] dark:text-[#C5C4BE]">{isUrdu ? 'Shamil features, exclusions aur delivery ki sharaait parhein.' : 'Read the included modules, exclusions, delivery conditions and handover details before choosing a plan.'}</p>
      <div className="divide-y divide-black/15 dark:divide-white/15 border-y border-black/15 dark:border-white/15">
        {PLAN_KEYS.map((key) => <Link key={key} to={`/offers/${offer.slug}/plans/${PLAN_SLUGS[key]}`} className="flex justify-between items-center gap-4 py-5 font-medium hover:text-[#047857] dark:hover:text-[#10B981]"><span>{PLAN_NAMES[key]} — {isUrdu ? 'poori tafseel' : 'full scope'}</span><ArrowRight size={18} /></Link>)}
      </div>
      <PricingTable offerKey={offerKey} />
    </div>
  </section>
}
