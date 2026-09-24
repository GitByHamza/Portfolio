import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Cpu, ShoppingBag, Layers, CheckCircle2, XCircle, ShieldCheck, Terminal, Laptop, Gamepad2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { FadeIn, StaggerContainer, StaggerItem } from '../components/motion/MotionReveal'

// Glowing "discounted price" label shown above each plan list
function DiscountBadge() {
  return (
    <span className="discount-glow inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 border border-[#059669]/40 dark:border-[#10B981]/50 bg-[#ECFDF5] dark:bg-[#10B981]/15 text-[#047857] dark:text-[#34D399] font-bold">
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75 motion-safe:animate-ping" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#10B981]" />
      </span>
      DISCOUNTED PRICE
    </span>
  )
}

// Plan price with the regular price struck through (dark red in light mode, light red in dark mode)
function PriceLine({ compare, price, strong = false, isUrdu = false }) {
  return (
    <div className={`flex flex-wrap items-baseline gap-x-2 offer-ui ${strong ? 'mt-0.5' : ''}`}>
      {compare && (
        <del className="line-through decoration-[1.5px] text-[#B91C1C] dark:text-[#FCA5A5] font-medium">
          <span className="sr-only">{isUrdu ? 'Pehle ' : 'Was '}</span>
          {compare}
        </del>
      )}
      <span className={`text-[#059669] dark:text-[#10B981] ${strong ? 'font-bold' : 'font-semibold'}`}>
        {compare && <span className="sr-only">{isUrdu ? 'Ab ' : 'Now '}</span>}
        {price}
      </span>
    </div>
  )
}

export default function Solutions() {
  const { t, isUrdu } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const comparisonItems = [
    {
      dimension: isUrdu ? 'Store ka malik kaun' : 'Who owns the store',
      texcodes: isUrdu
        ? 'Aap. Code, data aur domain aapke hawale.'
        : 'You. Code, data and domain are handed over to you.',
      freelancer: isUrdu
        ? 'Asal store nahi — sirf page aur chats.'
        : 'No real store — just a page and chats.',
      agency: isUrdu
        ? 'Listing aur customer marketplace ke hain.'
        : 'The marketplace owns the listing and the customer.',
      cms: isUrdu
        ? 'Kiraye par. Payment band, store band.'
        : 'You rent it. Stop paying and it goes offline.',
      badge: isUrdu ? 'MALKIAT AAPKI' : 'YOU OWN IT',
    },
    {
      dimension: isUrdu ? 'Har sale ka kharcha' : 'Cost per sale',
      texcodes: isUrdu
        ? '0% commission. Sirf aapke payment gateway ki standard fee.'
        : "0% commission. Only your payment gateway's standard fee.",
      freelancer: isUrdu
        ? 'Fee nahi, magar har sale ke liye lambi chat.'
        : 'No fees, but every sale takes manual chatting.',
      agency: isUrdu
        ? 'Har order par commission aur fees.'
        : 'Commission and fees on every order.',
      cms: isUrdu
        ? 'Mahana plan, paid apps, aur kuch gateways par izafi fees.'
        : 'Monthly plan, paid apps, and extra fees with some gateways.',
      badge: '0% COMMISSION',
    },
    {
      dimension: isUrdu ? 'Tech products ke liye' : 'Built for tech products',
      texcodes: isUrdu
        ? 'PC builder, battery health, trade-in aur serial warranty pehle se shamil.'
        : 'PC builder, battery health, trade-ins and serial warranty built in.',
      freelancer: isUrdu
        ? 'Specs aur prices DMs mein gum ho jati hain.'
        : 'Specs and prices get lost in DMs.',
      agency: isUrdu
        ? 'Aam listings, competitors ke bilkul sath.'
        : 'Generic listings, side by side with competitors.',
      cms: isUrdu
        ? 'Kai paid apps chahiye — ya mumkin hi nahi.'
        : "Needs several paid apps — or isn't possible.",
      badge: isUrdu ? 'TECH KE LIYE' : 'BUILT FOR TECH',
    },
    {
      dimension: isUrdu ? 'Branches aur stock' : 'Branches & stock',
      texcodes: isUrdu
        ? 'Dukanon, godam aur website ka ek hi stock.'
        : 'One stock count across shops, warehouse and website.',
      freelancer: isUrdu
        ? 'Staff phone kar ke stock check karta hai.'
        : 'Staff check stock by phone.',
      agency: isUrdu
        ? 'Sirf marketplace wala stock.'
        : 'Covers only your marketplace stock.',
      cms: isUrdu
        ? 'Aksar mehnga plan ya izafi apps.'
        : 'Usually needs higher plans or extra apps.',
      badge: isUrdu ? 'EK STOCK' : 'ONE STOCK',
    },
  ]

  return (
    <div className="w-full bg-[#F6F5F0] dark:bg-[#0F0F11] min-h-screen text-[#0F0F0F] dark:text-[#EDECE6] transition-colors duration-200">
      {/* ─── Page Header ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#161619] relative overflow-hidden">
        {/* Subtle decorative radial emerald glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

        <FadeIn className="max-w-7xl mx-auto space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold bg-[#ECFDF5] dark:bg-[rgba(16,185,129,0.15)] px-3 py-1 border border-[#059669]/25 dark:border-[#10B981]/30">
            <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]" />
            {t('solutionsPage', 'badge')}
          </div>

          <h1 className="offer-h1 text-[#0F0F0F] dark:text-[#EDECE6] max-w-5xl">
            {t('solutionsPage', 'title_p1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] via-[#10B981] to-[#34D399] drop-shadow-xs">
              {t('solutionsPage', 'title_accent')}
            </span>
          </h1>

          <p className="offer-lede text-[#575652] dark:text-[#9B9A95] max-w-3xl">
            {t('solutionsPage', 'sub')}
          </p>
        </FadeIn>
      </section>

      {/* ─── Featured Flagship Solution: Computer & CCTV Retail OS ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)]">
        <FadeIn className="max-w-7xl mx-auto">
          <div className="card-hover-guided border-t-4 border-t-[#059669] dark:border-t-[#10B981] border-x border-b border-[#08966a] bg-white dark:bg-[#161619] p-6 sm:p-12 shadow-md space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 offer-ui">
              <span className="tag-green">{t('solutionsPage', 'flagship_badge')}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-5">
                <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
                  {t('solutionsPage', 'flagship_title')}
                </h2>
                <p className="offer-body text-[#575652] dark:text-[#9B9A95]">
                  {t('solutionsPage', 'flagship_sub')}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 offer-ui text-[#0F0F0F] dark:text-[#EDECE6]">
                  <div className="p-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[#08966a]/30 flex items-center gap-2.5">
                    <span className="p-1 rounded-full bg-[#ECFDF5] dark:bg-[#10B981]/20 text-[#059669] dark:text-[#10B981]">
                      <CheckCircle2 size={15} className="shrink-0" />
                    </span>
                    <span className="font-medium">{t('solutionsPage', 'flagship_f1')}</span>
                  </div>
                  <div className="p-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[#08966a]/30 flex items-center gap-2.5">
                    <span className="p-1 rounded-full bg-[#ECFDF5] dark:bg-[#10B981]/20 text-[#059669] dark:text-[#10B981]">
                      <CheckCircle2 size={15} className="shrink-0" />
                    </span>
                    <span className="font-medium">{t('solutionsPage', 'flagship_f2')}</span>
                  </div>
                  <div className="p-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[#08966a]/30 flex items-center gap-2.5">
                    <span className="p-1 rounded-full bg-[#ECFDF5] dark:bg-[#10B981]/20 text-[#059669] dark:text-[#10B981]">
                      <CheckCircle2 size={15} className="shrink-0" />
                    </span>
                    <span className="font-medium">{t('solutionsPage', 'flagship_f3')}</span>
                  </div>
                  <div className="p-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[#08966a]/30 flex items-center gap-2.5">
                    <span className="p-1 rounded-full bg-[#ECFDF5] dark:bg-[#10B981]/20 text-[#059669] dark:text-[#10B981]">
                      <CheckCircle2 size={15} className="shrink-0" />
                    </span>
                    <span className="font-medium">{t('solutionsPage', 'flagship_f4')}</span>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <Link to="/solutions/tech-retail" className="btn-blue offer-btn offer-btn-xl shadow-sm group relative overflow-hidden">
                    <span className="relative z-10">{t('solutionsPage', 'flagship_cta')}</span>
                    <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1.5 transition-transform" />
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none animate-shimmer-sweep" />
                  </Link>
                  <a
                    href="https://store-demo-eight.vercel.app/?mode=pc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline offer-btn offer-btn-lg group relative overflow-hidden"
                  >
                    <span className="relative z-10">{t('solutionsPage', 'flagship_demo')}</span>
                    <ArrowUpRight size={14} className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#10B981]/15 to-transparent pointer-events-none animate-shimmer-sweep" />
                  </a>
                </div>
              </div>

              {/* Right Tier Summary Box */}
              <div className="lg:col-span-5 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[#08966a]/30 p-6 space-y-4 offer-ui">
                <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-2 font-bold flex items-center justify-between">
                  <span>{t('solutionsPage', 'tiers_title')}</span>
                  <DiscountBadge />
                </div>

                <div className="space-y-3">
                  <div className="card-hover-guided p-3 bg-white dark:bg-[#161619] border border-[#08966a]">
                    <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6]">{t('solutionsPage', 'tier1_title')}</div>
                    <PriceLine compare={t('solutionsPage', 'tier1_compare')} price={t('solutionsPage', 'tier1_price')} isUrdu={isUrdu} />
                    <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t('solutionsPage', 'tier1_sub')}</div>
                  </div>

                  <div className="card-hover-guided p-3 bg-[#ECFDF5]/60 dark:bg-[#10B981]/10 border-2 border-[#08966a] dark:border-[#10B981] shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0F0F0F] dark:text-[#EDECE6]">{t('solutionsPage', 'tier2_title')}</span>
                      <span className="offer-eyebrow font-bold text-white bg-[#059669] dark:bg-[#10B981] px-2 py-0.5">{t('solutionsPage', 'tier2_popular')}</span>
                    </div>
                    <PriceLine strong compare={t('solutionsPage', 'tier2_compare')} price={t('solutionsPage', 'tier2_price')} isUrdu={isUrdu} />
                    <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t('solutionsPage', 'tier2_sub')}</div>
                  </div>

                  <div className="card-hover-guided p-3 bg-white dark:bg-[#161619] border border-[#08966a]">
                    <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6]">{t('solutionsPage', 'tier3_title')}</div>
                    <PriceLine compare={t('solutionsPage', 'tier3_compare')} price={t('solutionsPage', 'tier3_price')} isUrdu={isUrdu} />
                    <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t('solutionsPage', 'tier3_sub')}</div>
                  </div>
                </div>

                <div className="pt-2 offer-ui text-[#8E8D88] dark:text-[#6A6965]">
                  {isUrdu
                    ? 'Har plan mein aakhri payment par mukammal code aur database handover shamil hai.'
                    : 'All plans include full code and database handover on final payment.'}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── Featured Flagship Solution 02: Laptop & Accessories Retail OS ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#121215]">
        <FadeIn className="max-w-7xl mx-auto">
          <div className="card-hover-guided border-t-4 border-t-[#059669] dark:border-t-[#10B981] border-x border-b border-[#08966a] bg-white dark:bg-[#161619] p-6 sm:p-12 shadow-md space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 offer-ui">
              <span className="tag-green">{t('solutionsPage', 'flagship2_badge')}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-5">

                <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
                  {t('solutionsPage', 'flagship2_title')}
                </h2>
                <p className="offer-body text-[#575652] dark:text-[#9B9A95]">
                  {t('solutionsPage', 'flagship2_sub')}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 offer-ui text-[#0F0F0F] dark:text-[#EDECE6]">
                  <div className="p-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[#08966a]/30 flex items-center gap-2.5">
                    <span className="p-1 rounded-full bg-[#ECFDF5] dark:bg-[#10B981]/20 text-[#059669] dark:text-[#10B981]">
                      <CheckCircle2 size={15} className="shrink-0" />
                    </span>
                    <span className="font-medium">{t('solutionsPage', 'flagship2_f1')}</span>
                  </div>
                  <div className="p-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[#08966a]/30 flex items-center gap-2.5">
                    <span className="p-1 rounded-full bg-[#ECFDF5] dark:bg-[#10B981]/20 text-[#059669] dark:text-[#10B981]">
                      <CheckCircle2 size={15} className="shrink-0" />
                    </span>
                    <span className="font-medium">{t('solutionsPage', 'flagship2_f2')}</span>
                  </div>
                  <div className="p-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[#08966a]/30 flex items-center gap-2.5">
                    <span className="p-1 rounded-full bg-[#ECFDF5] dark:bg-[#10B981]/20 text-[#059669] dark:text-[#10B981]">
                      <CheckCircle2 size={15} className="shrink-0" />
                    </span>
                    <span className="font-medium">{t('solutionsPage', 'flagship2_f3')}</span>
                  </div>
                  <div className="p-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[#08966a]/30 flex items-center gap-2.5">
                    <span className="p-1 rounded-full bg-[#ECFDF5] dark:bg-[#10B981]/20 text-[#059669] dark:text-[#10B981]">
                      <CheckCircle2 size={15} className="shrink-0" />
                    </span>
                    <span className="font-medium">{t('solutionsPage', 'flagship2_f4')}</span>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <Link to="/solutions/laptop-retail" className="btn-blue offer-btn offer-btn-xl shadow-sm group relative overflow-hidden">
                    <span className="relative z-10">{t('solutionsPage', 'flagship2_cta')}</span>
                    <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1.5 transition-transform" />
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none animate-shimmer-sweep" />
                  </Link>
                  <a
                    href="https://store-demo-eight.vercel.app/?mode=laptop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline offer-btn offer-btn-lg group relative overflow-hidden"
                  >
                    <span className="relative z-10">{isUrdu ? 'LAPTOP DEMO KHOLEIN' : 'OPEN LAPTOP DEMO'}</span>
                    <ArrowUpRight size={14} className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#10B981]/15 to-transparent pointer-events-none animate-shimmer-sweep" />
                  </a>
                </div>
              </div>

              {/* Right Tier Summary Box */}
              <div className="lg:col-span-5 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[#08966a]/30 p-6 space-y-4 offer-ui">
                <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-2 font-bold flex items-center justify-between">
                  <span>{t('solutionsPage', 'tiers_title')}</span>
                  <DiscountBadge />
                </div>

                <div className="space-y-3">
                  <div className="card-hover-guided p-3 bg-white dark:bg-[#161619] border border-[#08966a]">
                    <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6]">{t('solutionsPage', 'flagship2_tier1_title')}</div>
                    <PriceLine compare={t('solutionsPage', 'flagship2_tier1_compare')} price={t('solutionsPage', 'flagship2_tier1_price')} isUrdu={isUrdu} />
                    <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t('solutionsPage', 'flagship2_tier1_sub')}</div>
                  </div>

                  <div className="card-hover-guided p-3 bg-[#ECFDF5]/60 dark:bg-[#10B981]/10 border-2 border-[#08966a] dark:border-[#10B981] shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0F0F0F] dark:text-[#EDECE6]">{t('solutionsPage', 'flagship2_tier2_title')}</span>
                      <span className="offer-eyebrow font-bold text-white bg-[#059669] dark:bg-[#10B981] px-2 py-0.5">{t('solutionsPage', 'tier2_popular')}</span>
                    </div>
                    <PriceLine strong compare={t('solutionsPage', 'flagship2_tier2_compare')} price={t('solutionsPage', 'flagship2_tier2_price')} isUrdu={isUrdu} />
                    <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t('solutionsPage', 'flagship2_tier2_sub')}</div>
                  </div>

                  <div className="card-hover-guided p-3 bg-white dark:bg-[#161619] border border-[#08966a]">
                    <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6]">{t('solutionsPage', 'flagship2_tier3_title')}</div>
                    <PriceLine compare={t('solutionsPage', 'flagship2_tier3_compare')} price={t('solutionsPage', 'flagship2_tier3_price')} isUrdu={isUrdu} />
                    <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t('solutionsPage', 'flagship2_tier3_sub')}</div>
                  </div>
                </div>

                <div className="pt-2 offer-ui text-[#8E8D88] dark:text-[#6A6965]">
                  {isUrdu
                    ? 'Har plan mein aakhri payment par mukammal code aur database handover shamil hai.'
                    : 'All plans include full code and database handover on final payment.'}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── Featured Flagship Solution 03: Gaming Consoles & Discs Retail OS ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)]">
        <FadeIn className="max-w-7xl mx-auto">
          <div className="card-hover-guided border-t-4 border-t-[#059669] dark:border-t-[#10B981] border-x border-b border-[#08966a] bg-white dark:bg-[#161619] p-6 sm:p-12 shadow-md space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 offer-ui">
              <span className="tag-green">{t('solutionsPage', 'flagship3_badge')}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-5">

                <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
                  {t('solutionsPage', 'flagship3_title')}
                </h2>
                <p className="offer-body text-[#575652] dark:text-[#9B9A95]">
                  {t('solutionsPage', 'flagship3_sub')}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 offer-ui text-[#0F0F0F] dark:text-[#EDECE6]">
                  <div className="p-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[#08966a]/30 flex items-center gap-2.5">
                    <span className="p-1 rounded-full bg-[#ECFDF5] dark:bg-[#10B981]/20 text-[#059669] dark:text-[#10B981]">
                      <CheckCircle2 size={15} className="shrink-0" />
                    </span>
                    <span className="font-medium">{t('solutionsPage', 'flagship3_f1')}</span>
                  </div>
                  <div className="p-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[#08966a]/30 flex items-center gap-2.5">
                    <span className="p-1 rounded-full bg-[#ECFDF5] dark:bg-[#10B981]/20 text-[#059669] dark:text-[#10B981]">
                      <CheckCircle2 size={15} className="shrink-0" />
                    </span>
                    <span className="font-medium">{t('solutionsPage', 'flagship3_f2')}</span>
                  </div>
                  <div className="p-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[#08966a]/30 flex items-center gap-2.5">
                    <span className="p-1 rounded-full bg-[#ECFDF5] dark:bg-[#10B981]/20 text-[#059669] dark:text-[#10B981]">
                      <CheckCircle2 size={15} className="shrink-0" />
                    </span>
                    <span className="font-medium">{t('solutionsPage', 'flagship3_f3')}</span>
                  </div>
                  <div className="p-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[#08966a]/30 flex items-center gap-2.5">
                    <span className="p-1 rounded-full bg-[#ECFDF5] dark:bg-[#10B981]/20 text-[#059669] dark:text-[#10B981]">
                      <CheckCircle2 size={15} className="shrink-0" />
                    </span>
                    <span className="font-medium">{t('solutionsPage', 'flagship3_f4')}</span>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <Link to="/solutions/console-retail" className="btn-blue offer-btn offer-btn-xl shadow-sm group relative overflow-hidden">
                    <span className="relative z-10">{t('solutionsPage', 'flagship3_cta')}</span>
                    <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1.5 transition-transform" />
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none animate-shimmer-sweep" />
                  </Link>
                  <a
                    href="https://console-store-demo.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline offer-btn offer-btn-lg group relative overflow-hidden"
                  >
                    <span className="relative z-10">{isUrdu ? 'CONSOLE DEMO KHOLEIN' : 'OPEN CONSOLE DEMO'}</span>
                    <ArrowUpRight size={14} className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#10B981]/15 to-transparent pointer-events-none animate-shimmer-sweep" />
                  </a>
                </div>
              </div>

              {/* Right Tier Summary Box */}
              <div className="lg:col-span-5 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[#08966a]/30 p-6 space-y-4 offer-ui">
                <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-2 font-bold flex items-center justify-between">
                  <span>{t('solutionsPage', 'tiers_title')}</span>
                  <DiscountBadge />
                </div>

                <div className="space-y-3">
                  <div className="card-hover-guided p-3 bg-white dark:bg-[#161619] border border-[#08966a]">
                    <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6]">{t('solutionsPage', 'flagship3_tier1_title')}</div>
                    <PriceLine compare={t('solutionsPage', 'flagship3_tier1_compare')} price={t('solutionsPage', 'flagship3_tier1_price')} isUrdu={isUrdu} />
                    <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t('solutionsPage', 'flagship3_tier1_sub')}</div>
                  </div>

                  <div className="card-hover-guided p-3 bg-[#ECFDF5]/60 dark:bg-[#10B981]/10 border-2 border-[#08966a] dark:border-[#10B981] shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0F0F0F] dark:text-[#EDECE6]">{t('solutionsPage', 'flagship3_tier2_title')}</span>
                      <span className="offer-eyebrow font-bold text-white bg-[#059669] dark:bg-[#10B981] px-2 py-0.5">{t('solutionsPage', 'tier2_popular')}</span>
                    </div>
                    <PriceLine strong compare={t('solutionsPage', 'flagship3_tier2_compare')} price={t('solutionsPage', 'flagship3_tier2_price')} isUrdu={isUrdu} />
                    <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t('solutionsPage', 'flagship3_tier2_sub')}</div>
                  </div>

                  <div className="card-hover-guided p-3 bg-white dark:bg-[#161619] border border-[#08966a]">
                    <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6]">{t('solutionsPage', 'flagship3_tier3_title')}</div>
                    <PriceLine compare={t('solutionsPage', 'flagship3_tier3_compare')} price={t('solutionsPage', 'flagship3_tier3_price')} isUrdu={isUrdu} />
                    <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t('solutionsPage', 'flagship3_tier3_sub')}</div>
                  </div>
                </div>

                <div className="pt-2 offer-ui text-[#8E8D88] dark:text-[#6A6965]">
                  {isUrdu
                    ? 'Har plan mein aakhri payment par mukammal code aur database handover shamil hai.'
                    : 'All plans include full code and database handover on final payment.'}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── Other Commercial Pillars ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#121215]">
        <div className="max-w-7xl mx-auto space-y-12">
          <FadeIn>
            <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold mb-2">
              {isUrdu ? 'YEH BHI DASTIYAB' : 'ALSO AVAILABLE'}
            </div>
            <h2 className="offer-h1 text-[#0F0F0F] dark:text-[#EDECE6]">
              {isUrdu ? 'CUSTOM BUILDS' : 'CUSTOM BUILDS'}
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Custom Commerce */}
            <StaggerItem>
              <div className="card-hover-guided h-full p-8 bg-white dark:bg-[#161619] border border-[#08966a] space-y-5">
                <div className="w-10 h-10 rounded-sm bg-[#ECFDF5] dark:bg-[#10B981]/15 flex items-center justify-center text-[#059669] dark:text-[#10B981]">
                  <ShoppingBag size={22} />
                </div>
                <h3 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
                  {isUrdu ? 'CUSTOM ONLINE STORES' : 'CUSTOM ONLINE STORES'}
                </h3>
                <p className="offer-body text-[#575652] dark:text-[#9B9A95]">
                  {isUrdu
                    ? 'Un brands ke liye jo template store se aage barh chuke hain. Apna design, tez store, aapke products ke mutabiq checkout, aur sales par koi commission nahi.'
                    : 'For brands that have outgrown a template store. Your own design, a faster store, a checkout built around your products, and no commission on sales.'}
                </p>
                <ul className="offer-ui text-[#575652] dark:text-[#9B9A95] space-y-2 list-disc list-inside">
                  <li>{isUrdu ? 'Custom storefront (Next.js)' : 'Custom storefront (Next.js)'}</li>
                  <li>{isUrdu ? 'Aapki sales par 0% commission' : '0% commission on your sales'}</li>
                  <li>{isUrdu ? 'WhatsApp par order confirmation' : 'WhatsApp order confirmation'}</li>
                  <li>{isUrdu ? 'Aapke product specs ke mutabiq filters' : 'Filters built around your product specs'}</li>
                </ul>
                <div className="pt-2">
                  <Link to="/contact" className="btn-outline offer-btn group hover:border-[#08966a]">
                    <span>{isUrdu ? 'CUSTOM STORE PAR BAAT KAREIN' : 'DISCUSS A CUSTOM STORE'}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform inline-block ml-1" />
                  </Link>
                </div>
              </div>
            </StaggerItem>

            {/* AI Automations & Internal Business OS */}
            <StaggerItem>
              <div className="card-hover-guided h-full p-8 bg-white dark:bg-[#161619] border border-[#08966a] space-y-5">
                <div className="w-10 h-10 rounded-sm bg-[#ECFDF5] dark:bg-[#10B981]/15 flex items-center justify-center text-[#059669] dark:text-[#10B981]">
                  <Layers size={22} />
                </div>
                <h3 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
                  {isUrdu ? 'INTERNAL TOOLS AUR AUTOMATION' : 'INTERNAL TOOLS & AUTOMATION'}
                </h3>
                <p className="offer-body text-[#575652] dark:text-[#9B9A95]">
                  {isUrdu
                    ? 'Excel sheets aur manual kaam ki jagah aapki team ke liye software: inventory aur billing systems, dashboards, staff permissions aur WhatsApp assistants.'
                    : 'Replace spreadsheets and manual work with software built for your team: inventory and billing systems, dashboards, staff permissions and WhatsApp assistants.'}
                </p>
                <ul className="offer-ui text-[#575652] dark:text-[#9B9A95] space-y-2 list-disc list-inside">
                  <li>{isUrdu ? 'Staff roles aur permissions' : 'Staff roles and permissions'}</li>
                  <li>{isUrdu ? 'WhatsApp chat aur voice assistants' : 'WhatsApp chat & voice assistants'}</li>
                  <li>{isUrdu ? 'Reports aur dashboards' : 'Reports and dashboards'}</li>
                  <li>{isUrdu ? 'Mazboot database design' : 'Reliable database design'}</li>
                </ul>
                <div className="pt-2">
                  <Link to="/contact" className="btn-outline offer-btn group hover:border-[#08966a]">
                    <span>{isUrdu ? 'INTERNAL SYSTEM PAR BAAT KAREIN' : 'DISCUSS AN INTERNAL SYSTEM'}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform inline-block ml-1" />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ─── Engineering Benchmark Table ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)]">
        <FadeIn className="max-w-7xl mx-auto space-y-12">
          <div>
            <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold mb-2">
              {isUrdu ? 'MUQABLA' : 'COMPARISON'}
            </div>
            <h2 className="offer-h1 text-[#0F0F0F] dark:text-[#EDECE6]">
              {t('solutionsPage', 'matrix_title')}
            </h2>
          </div>

          <div className="border border-[#08966a] bg-white dark:bg-[#161619] overflow-hidden shadow-sm card-hover-guided">
            <div className="hidden md:grid md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr] border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#1F1F24] offer-eyebrow font-bold text-[#575652] dark:text-[#9B9A95]">
              <div className="p-4">{t('solutionsPage', 'matrix_feature')}</div>
              <div className="p-4 text-[#059669] dark:text-[#10B981] bg-[#ECFDF5] dark:bg-[#10B981]/15 border-l border-r border-[#08966a]/20 dark:border-[#08966a]/30 font-extrabold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#10B981]" />
                {t('solutionsPage', 'matrix_txs')}
              </div>
              <div className="p-4 border-r border-[rgba(15,15,15,0.08)] dark:border-[rgba(255,255,255,0.08)]">{t('solutionsPage', 'matrix_freelancer')}</div>
              <div className="p-4 border-r border-[rgba(15,15,15,0.08)] dark:border-[rgba(255,255,255,0.08)]">{t('solutionsPage', 'matrix_agency')}</div>
              <div className="p-4">{t('solutionsPage', 'matrix_shopify')}</div>
            </div>

            <div className="offer-ui max-md:flex max-md:flex-col max-md:gap-3 max-md:p-3 md:divide-y md:divide-[rgba(15,15,15,0.1)] dark:md:divide-[rgba(255,255,255,0.1)]">
              {comparisonItems.map((item, idx) => (
                <div key={idx} className="offer-cmp-card md:grid md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr] md:p-4 lg:p-5 md:gap-0 md:items-start">
                  <div className="md:pr-4">
                    <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui-strong">{item.dimension}</div>
                    <span className="tag-green offer-badge mt-1.5 inline-block">{item.badge}</span>
                  </div>

                  <div className="offer-cmp-txs md:px-4 md:py-2 text-[#0F0F0F] dark:text-[#EDECE6] flex items-start gap-2 md:bg-[#ECFDF5]/50 dark:md:bg-[#10B981]/10 md:border-l md:border-r md:border-[#08966a]/20 dark:md:border-[#10B981]/20 font-medium">
                    <CheckCircle2 size={18} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                    <span className="md:hidden font-bold offer-eyebrow text-[#059669] dark:text-[#10B981] mr-1">{t('solutionsPage', 'matrix_txs')}</span>
                    <span>{item.texcodes}</span>
                  </div>

                  <div className="offer-cmp-row md:px-4 md:py-2 text-[#575652] dark:text-[#9B9A95] flex items-start gap-2 md:border-r md:border-[rgba(15,15,15,0.08)] dark:md:border-[rgba(255,255,255,0.08)]">
                    <XCircle size={18} className="text-[#8E8D88] dark:text-[#6A6965] shrink-0 mt-0.5" />
                    <span className="md:hidden font-bold offer-eyebrow text-[#8E8D88] dark:text-[#6A6965] mr-1">{t('solutionsPage', 'matrix_freelancer')}</span>
                    <span>{item.freelancer}</span>
                  </div>

                  <div className="offer-cmp-row md:px-4 md:py-2 text-[#575652] dark:text-[#9B9A95] flex items-start gap-2 md:border-r md:border-[rgba(15,15,15,0.08)] dark:md:border-[rgba(255,255,255,0.08)]">
                    <XCircle size={18} className="text-[#8E8D88] dark:text-[#6A6965] shrink-0 mt-0.5" />
                    <span className="md:hidden font-bold offer-eyebrow text-[#8E8D88] dark:text-[#6A6965] mr-1">{t('solutionsPage', 'matrix_agency')}</span>
                    <span>{item.agency}</span>
                  </div>

                  <div className="md:px-4 md:py-2 text-[#575652] dark:text-[#9B9A95] flex items-start gap-2">
                    <XCircle size={18} className="text-[#8E8D88] dark:text-[#6A6965] shrink-0 mt-0.5" />
                    <span className="md:hidden font-bold offer-eyebrow text-[#8E8D88] dark:text-[#6A6965] mr-1">{t('solutionsPage', 'matrix_shopify')}</span>
                    <span>{item.cms}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
        <FadeIn className="max-w-4xl mx-auto space-y-6 relative z-10">
          <h3 className="offer-h1 text-[#0F0F0F] dark:text-[#EDECE6]">
            {t('solutionsPage', 'cta_box_title')}
          </h3>
          <p className="offer-body text-[#575652] dark:text-[#9B9A95] max-w-xl mx-auto">
            {t('solutionsPage', 'cta_box_desc')}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/923091824000?text=${encodeURIComponent(
                isUrdu
                  ? 'Assalam o Alaikum Hamza, mujhe apni dukan ke liye aapke retail system ka demo chahiye.'
                  : "Hello Hamza, I'd like a demo of your retail system for my shop."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-blue offer-btn offer-btn-lg shadow-sm group"
            >
              <span>{t('solutionsPage', 'cta_box_btn')}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link to="/contact" className="btn-outline offer-btn group hover:border-[#08966a]">
              <span>{t('solutionsPage', 'cta_box_contact')}</span>
              <span className="group-hover:translate-x-1 transition-transform inline-block ml-1">→</span>
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
