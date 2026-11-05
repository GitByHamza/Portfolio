import { useLoaderData } from 'react-router'
import type { LoaderFunctionArgs } from 'react-router'
import { loader as loadPage } from './page-loader.server.ts'
import { getOffer, getPlan } from '../content/offers.ts'
import { COMMERCIAL, money } from '../content/pricing.ts'
import { BUSINESS } from '../data/business.js'
import Link from '../components/SiteLink.jsx'
import { PricingTable } from '../components/offers/OfferReference.jsx'
export { meta, headers } from './page-meta.ts'

export function loader(args: LoaderFunctionArgs) {
  const base = loadPage(args)
  const offer = getOffer(base.page.offer!)!
  const plan = getPlan(offer.slug, base.page.plan!, base.page.lang)
  if (!plan) throw new Response('Plan not found', { status: 404 })
  return { ...base, offer: { name: offer.name, slug: offer.slug, key: offer.key, demo: offer.demo }, plan }
}

export default function PlanPage() {
  const { offer, plan } = useLoaderData<typeof loader>()
  return <main className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-20 space-y-10">
    <Link to={`/offers/${offer.slug}`} className="inline-block underline underline-offset-4">← {offer.name}</Link>
    <header className="space-y-5 border-b border-black/15 dark:border-white/15 pb-10">
      <p className="font-serif text-lg">{offer.name}</p>
      <h1 className="font-display text-5xl sm:text-7xl uppercase leading-none">{plan.name}</h1>
      <p className="font-serif text-xl max-w-3xl leading-relaxed">{plan.idealFor}</p>
      <p className="font-medium text-[#047857] dark:text-[#10B981]">{plan.priceUsd} USD · {plan.pricePkr}{plan.priceGbp && ` · ${plan.priceGbp} GBP`}</p>
      <p>Delivery: {plan.delivery}. Timelines start after content and first payment; the signed scope fixes the delivery date.</p>
      <div className="flex flex-wrap gap-3"><a href={`https://wa.me/${BUSINESS.phoneE164.slice(1)}?text=${encodeURIComponent(`Hello Hamza, I'd like to discuss ${offer.name} — ${plan.name}.`)}`} className="btn-outline">Discuss this plan</a><a href={offer.demo} className="btn-outline" target="_blank" rel="noreferrer">Open demo</a></div>
    </header>
    <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem] gap-10 lg:gap-16 items-start">
      <div className="space-y-10"><h2 className="font-display text-4xl">What's included</h2>{plan.modules.map((module) => <section key={module.title} className="space-y-3 border-t border-black/15 dark:border-white/15 pt-6"><h3 className="text-xl font-semibold">{module.title}</h3>{module.desc && <p className="font-serif text-lg max-w-prose leading-relaxed">{module.desc}</p>}<ul className="list-disc pl-5 space-y-2">{module.items?.map((item) => <li key={item}>{item}</li>)}</ul></section>)}</div>
      <aside className="space-y-7 border-y border-black/15 dark:border-white/15 py-6"><h2 className="font-display text-3xl">Not included</h2><ul className="list-disc pl-5 space-y-3 text-sm leading-relaxed">{plan.exclusions.map((item) => <li key={item}>{item}</li>)}</ul><Link to="/offers/terms" className="underline underline-offset-4 text-sm">Read full retail terms →</Link></aside>
    </div>
    <section className="space-y-5 border-t border-black/15 dark:border-white/15 pt-10"><h2 className="font-display text-4xl">Regional prices</h2><PricingTable offerKey={offer.key} /></section>
    <section className="space-y-5 border-t border-black/15 dark:border-white/15 pt-10 max-w-3xl"><h2 className="font-display text-4xl">Payment, delivery and handover</h2>{[COMMERCIAL.payment, COMMERCIAL.delivery, COMMERCIAL.ownership, COMMERCIAL.warranty, COMMERCIAL.guarantee, COMMERCIAL.costs].map((copy) => <p key={copy} className="font-serif text-lg leading-relaxed">{copy}</p>)}</section>
    <section className="space-y-5"><h2 className="font-display text-4xl">Payment milestones</h2><p className="font-serif">Example at the advertised USD {plan.prices.USD.startingAt ? 'starting ' : ''}price: {money(plan.prices.USD.amount * 0.4, 'USD')} to start; {money(plan.prices.USD.amount * 0.4, 'USD')} at staging approval; {money(plan.prices.USD.amount * 0.2, 'USD')} at launch. The agreed scope and invoice control the final amount.</p></section>
  </main>
}
