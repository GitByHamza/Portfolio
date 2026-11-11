import OfferReference, { OfferExtra } from '../../components/offers/OfferReference'
import Link from '../../components/SiteLink'
import { I18N_DATA, getConsolePlans, EXTRAS_DATA as CONSOLE_EXTRAS_DATA, COMPARE_PRICES } from '../../content/offers/console.ts'
import { useState } from 'react'

import {
  ShieldCheck,
  Gamepad2,
  Zap,
  Check,
  X as XIcon,
  ExternalLink,
  ArrowRight,
  MessageSquare,
  Sliders,
  Boxes,
  Database,
  Clock,
  FileText,
  HelpCircle,
  Phone,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Maximize2,
  Info,
  ChevronDown,
  Disc,
  Sparkles,
  RefreshCw,
  Cpu,
  Tag,
  Package,
} from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '../../components/motion/MotionReveal'
import PlanDetailModal from '../../components/PlanDetailModal'
import OfferFAQ from '../../components/OfferFAQ'
import ComparePrice from '../../components/ComparePrice'
import { useCurrency } from '../../hooks/useCurrency'
import { useLanguage } from '../../context/LanguageContext'

// Geo / Timezone auto-selection for Language

const compareFor = (key, currency) =>
  key ? (currency === 'USD' ? COMPARE_PRICES[key].usd : currency === 'GBP' ? COMPARE_PRICES[key].gbp : COMPARE_PRICES[key].pkr) : null

export default function ConsoleRetailSolution() {
  const { lang, isUrdu } = useLanguage()
  const currency = useCurrency(['USD', 'GBP', 'PKR'])
  const [activeModalKey, setActiveModalKey] = useState(null)

  const t = I18N_DATA[lang] || I18N_DATA.en

  const openWhatsApp = (planName, price) => {
    const text = isUrdu
      ? `Assalam o Alaikum TeXCodes, mujhe apni video game dukan ke liye ${planName} (${price}) plan mein dilchaspi hai. Kya demo ho sakta hai?`
      : `Hello TeXCodes, I'm interested in the ${planName} (${price}) plan for my video game shop. Can we schedule a demo?`
    window.open(`https://wa.me/923091824000?text=${encodeURIComponent(text)}`, '_blank')
  }

  const openDemoWhatsApp = () => {
    const text = isUrdu
      ? 'Assalam o Alaikum TeXCodes, mujhe apni video game dukan ke liye Console & Games Retail OS ka demo chahiye.'
      : "Hello TeXCodes, I'd like a demo of the Console & Games Retail OS for my video game shop."
    window.open(`https://wa.me/923091824000?text=${encodeURIComponent(text)}`, '_blank')
  }

  // Comprehensive Modal Data
  // Field names match PlanDetailModal: name, badge, price, delivery, idealFor, artifacts, modules, exclusions.

  const modalData = getConsolePlans(lang, currency)

  return (
    <div className="w-full bg-[#F6F5F0] dark:bg-[#0F0F11] min-h-screen text-[#0F0F0F] dark:text-[#EDECE6] transition-colors duration-200">
      {/* ─── Hero Section ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] relative overflow-hidden bg-[#FAF9F5] dark:bg-[#161619]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

        <FadeIn className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold bg-[#ECFDF5] dark:bg-[rgba(16,185,129,0.15)] px-3 py-1 border border-[#059669]/25 dark:border-[#10B981]/30">
            <Gamepad2 size={14} className="text-[#059669] dark:text-[#10B981]" />
            <span>{t.hero_badge}</span>
          </div>

          <h1 className="offer-h1 text-[#0F0F0F] dark:text-[#EDECE6] max-w-5xl">
            {t.hero_title_1}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] via-[#10B981] to-[#34D399] drop-shadow-xs">
              {t.hero_title_accent}
            </span>{' '}
            {t.hero_title_2}
          </h1>

          <p className="offer-lede text-[#575652] dark:text-[#9B9A95] max-w-3xl">
            {t.hero_sub}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#plans"
              className="btn-blue offer-btn offer-btn-xl shadow-md group relative overflow-hidden"
            >
              <span className="relative z-10">{t.cta_primary}</span>
              <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1.5 transition-transform" />
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none animate-shimmer-sweep" />
            </a>
            <a
              href="#demo"
              className="btn-outline offer-btn offer-btn-lg group relative overflow-hidden"
            >
              <span className="relative z-10">{t.cta_secondary}</span>
              <ArrowUpRight size={14} className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#10B981]/15 to-transparent pointer-events-none animate-shimmer-sweep" />
            </a>
          </div>

          {/* Metrics Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] offer-ui">
            <div className="p-4 bg-white dark:bg-[#121215] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)]">
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#059669] dark:text-[#10B981]">{t.metrics_code_top}</div>
              <div className="text-xs text-[#575652] dark:text-[#9B9A95] mt-1">{t.metrics_code}</div>
            </div>
            <div className="p-4 bg-white dark:bg-[#121215] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)]">
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#059669] dark:text-[#10B981]">{t.metrics_tax_top}</div>
              <div className="text-xs text-[#575652] dark:text-[#9B9A95] mt-1">{t.metrics_tax}</div>
            </div>
            <div className="p-4 bg-white dark:bg-[#121215] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)]">
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#059669] dark:text-[#10B981]">{t.metrics_speed_top}</div>
              <div className="text-xs text-[#575652] dark:text-[#9B9A95] mt-1">{t.metrics_speed}</div>
            </div>
            <div className="p-4 bg-white dark:bg-[#121215] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)]">
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#059669] dark:text-[#10B981]">{t.metrics_rma_top}</div>
              <div className="text-xs text-[#575652] dark:text-[#9B9A95] mt-1">{t.metrics_rma}</div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── Zero-Risk Decision Matrix ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)]">
        <FadeIn className="max-w-7xl mx-auto space-y-8">
          <div>
            <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold mb-2">
              {t.ultimatum_badge}
            </div>
            <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
              {t.ultimatum_title}
            </h2>
            <p className="offer-body text-[#575652] dark:text-[#9B9A95] max-w-3xl mt-2">
              {t.ultimatum_sub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Best Case */}
            <div className="p-6 sm:p-8 bg-white dark:bg-[#161619] border-2 border-[#059669] dark:border-[#10B981] space-y-5 shadow-sm card-hover-guided">
              <div className="flex items-center justify-between border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-3">
                <span className="offer-eyebrow font-bold text-[#059669] dark:text-[#10B981] bg-[#ECFDF5] dark:bg-[#10B981]/15 px-2.5 py-0.5">
                  {t.ultimatum_best_tag}
                </span>
                <CheckCircle2 size={18} className="text-[#059669] dark:text-[#10B981]" />
              </div>
              <h3 className="offer-h3 text-[#0F0F0F] dark:text-[#EDECE6]">
                {t.ultimatum_best_title}
              </h3>
              <ul className="space-y-3 offer-ui text-[#575652] dark:text-[#9B9A95]">
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>{t.ultimatum_best_p1}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>{t.ultimatum_best_p2}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>{t.ultimatum_best_p3}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>{t.ultimatum_best_p4}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>{t.ultimatum_best_p5}</span>
                </li>
              </ul>
              <div className="pt-3 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] font-mono text-xs font-semibold text-[#059669] dark:text-[#10B981]">
                {t.ultimatum_best_footer}
              </div>
            </div>

            {/* Worst Case */}
            <div className="p-6 sm:p-8 bg-[#FAF9F5] dark:bg-[#121215] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-5 shadow-sm card-hover-guided">
              <div className="flex items-center justify-between border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-3">
                <span className="offer-eyebrow font-bold text-[#E11D48] bg-rose-50 dark:bg-rose-950/40 px-2.5 py-0.5">
                  {t.ultimatum_worst_tag}
                </span>
                <ShieldCheck size={18} className="text-[#059669] dark:text-[#10B981]" />
              </div>
              <h3 className="offer-h3 text-[#0F0F0F] dark:text-[#EDECE6]">
                {t.ultimatum_worst_title}
              </h3>
              <ul className="space-y-3 offer-ui text-[#575652] dark:text-[#9B9A95]">
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>{t.ultimatum_worst_p1}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>{t.ultimatum_worst_p2}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>{t.ultimatum_worst_p3}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>{t.ultimatum_worst_p4}</span>
                </li>
              </ul>
              <div className="pt-3 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] font-mono text-xs font-semibold text-[#575652] dark:text-[#9B9A95]">
                {t.ultimatum_worst_footer}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── Staging Guarantee Banner ─── */}
      <section className="px-4 sm:px-8 py-12 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#ECFDF5]/60 dark:bg-[rgba(16,185,129,0.06)]">
        <FadeIn className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 offer-eyebrow font-bold text-[#059669] dark:text-[#10B981]">
              <ShieldCheck size={16} />
              <span>{t.guarantee_badge}</span>
            </div>
            <h3 className="offer-h3 text-[#0F0F0F] dark:text-[#EDECE6]">
              {t.guarantee_title}
            </h3>
            <p className="offer-body text-[#575652] dark:text-[#9B9A95] max-w-3xl">
              {t.guarantee_sub}
            </p>
          </div>
          <Link
            to="/offers/terms?offer=console"
            className="btn-outline offer-btn offer-btn-md shrink-0 font-mono text-xs flex items-center gap-1.5"
          >
            <span>{t.view_terms}</span>
          </Link>
        </FadeIn>
      </section>

      {/* ─── System Architecture ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#121215]">
        <FadeIn className="max-w-7xl mx-auto space-y-12">
          <div>
            <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold mb-2">
              {t.arch_badge}
            </div>
            <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
              {t.arch_title}
            </h2>
            <p className="offer-body text-[#575652] dark:text-[#9B9A95] max-w-3xl mt-2">
              {t.arch_sub}
            </p>
          </div>

          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                <span className="font-bold">01</span>
                <Gamepad2 size={16} />
              </div>
              <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6]">{t.arch_01_title}</h4>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.arch_01_desc}</p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                <span className="font-bold">02</span>
                <RefreshCw size={16} />
              </div>
              <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6]">{t.arch_02_title}</h4>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.arch_02_desc}</p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                <span className="font-bold">03</span>
                <Disc size={16} />
              </div>
              <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6]">{t.arch_03_title}</h4>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.arch_03_desc}</p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                <span className="font-bold">04</span>
                <Boxes size={16} />
              </div>
              <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6]">{t.arch_04_title}</h4>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.arch_04_desc}</p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                <span className="font-bold">05</span>
                <Tag size={16} />
              </div>
              <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6]">{t.arch_05_title}</h4>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.arch_05_desc}</p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                <span className="font-bold">06</span>
                <MessageSquare size={16} />
              </div>
              <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6]">{t.arch_06_title}</h4>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.arch_06_desc}</p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border-2 border-[#059669] dark:border-[#10B981] space-y-3 card-hover-guided md:col-span-2 lg:col-span-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                <span className="font-bold">{isUrdu ? '07 · MULTI-BRANCH AUR CHAIN PLANS' : '07 · MULTI-BRANCH & CHAIN PLANS'}</span>
                <Sparkles size={16} />
              </div>
              <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6]">{t.arch_07_title}</h4>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.arch_07_desc}</p>
            </StaggerItem>
          </StaggerContainer>
        </FadeIn>
      </section>

      {/* ─── Live Demo Grid ─── */}
      <section id="demo" className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)]">
        <FadeIn className="max-w-7xl mx-auto space-y-8">
          <div>
            <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold mb-2">
              {t.demo_badge}
            </div>
            <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
              {t.demo_title}
            </h2>
            <p className="offer-body text-[#575652] dark:text-[#9B9A95] max-w-3xl mt-2">
              {t.demo_sub}
            </p>
          </div>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-3 gap-6 offer-ui">
            <StaggerItem>
              <a
                href="https://console-store-demo.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] card-hover-guided group block space-y-3 shadow-xs h-full"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                  <span>01</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6] group-hover:text-[#059669] dark:group-hover:text-[#10B981] transition-colors">
                  {t.demo_store_title}
                </h4>
                <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                  {t.demo_store_desc}
                </p>
              </a>
            </StaggerItem>

            <StaggerItem>
              <a
                href="https://console-store-demo.vercel.app/trade-in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] card-hover-guided group block space-y-3 shadow-xs h-full"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                  <span>02</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6] group-hover:text-[#059669] dark:group-hover:text-[#10B981] transition-colors">
                  {t.demo_filter_title}
                </h4>
                <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                  {t.demo_filter_desc}
                </p>
              </a>
            </StaggerItem>

            <StaggerItem>
              <a
                href="https://console-store-demo.vercel.app/admin"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] card-hover-guided group block space-y-3 shadow-xs h-full"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                  <span>03</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6] group-hover:text-[#059669] dark:group-hover:text-[#10B981] transition-colors">
                  {t.demo_admin_title}
                </h4>
                <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                  {t.demo_admin_desc}
                </p>
              </a>
            </StaggerItem>
          </StaggerContainer>
        </FadeIn>
      </section>

      {/* ─── Plans Section ─── */}
      <section id="plans" className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#121215]">
        <FadeIn className="max-w-7xl mx-auto space-y-8">
          <div>
            <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold mb-2">
              {t.plans_badge}
            </div>
            <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
              {t.plans_title}
            </h2>
            <p className="offer-body text-[#575652] dark:text-[#9B9A95] max-w-3xl mt-2">
              {t.plans_sub} {t.plans_sub_suffix}
            </p>
          </div>

          {/* Guided Conversion Flow Ribbon */}
          <div className="p-3 bg-[#ECFDF5] dark:bg-[#10B981]/10 border border-[#059669]/30 dark:border-[#10B981]/30 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#059669] dark:text-[#10B981]">
            <div className="flex items-center gap-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981] animate-ping" />
              <span>{isUrdu ? 'TAREEQA:' : 'HOW IT WORKS:'}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[#575652] dark:text-[#EDECE6]">
              <span>{isUrdu ? '1. Plan chunein' : '1. Choose a plan'}</span>
              <span>→</span>
              <span>{isUrdu ? '2. Poora scope dekhein' : '2. See the full scope'}</span>
              <span>→</span>
              <span>{isUrdu ? '3. WhatsApp par call book karein' : '3. Book a call on WhatsApp'}</span>
            </div>
          </div>

          <p className="offer-eyebrow text-[#8E8D88] dark:text-[#6A6965] text-center">
            {currency === 'PKR'
              ? isUrdu ? 'Prices PKR mein (Pakistan ke karobar ke liye)' : 'Prices in PKR (for businesses in Pakistan)'
              : isUrdu ? `Prices ${currency} mein` : `Prices in ${currency}`}
          </p>

          {/* 3 Plan Cards Grid */}
          <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* 1. Starter Tier */}
            <StaggerItem className="h-full">
              <div className="p-8 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow h-full card-hover-guided">
                <div className="space-y-4">
                  <div className="tag-green">{t.starter_badge}</div>
                  <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.starter_name}</div>
                  <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.starter_desc}</p>

                  <div className="pt-2 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)]">
                    <div className="offer-h3 text-[#059669] dark:text-[#10B981]">
                      <ComparePrice value={compareFor('starter', currency)} isUrdu={isUrdu} />
                      {currency === 'USD' ? t.starter_price_usd : currency === 'GBP' ? t.starter_price_gbp : t.starter_price_pkr}
                    </div>
                    <div className="offer-ui text-[#059669] dark:text-[#10B981] font-semibold mt-1">{t.starter_delivery}</div>
                  </div>

                  <div className="p-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] offer-ui text-[#0F0F0F] dark:text-[#EDECE6] space-y-1">
                    <div className="font-bold text-[#059669] dark:text-[#10B981] offer-eyebrow">{t.starter_callout_label}</div>
                    <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.starter_callout_text}</p>
                  </div>

                  <div className="pt-2 space-y-2 offer-ui text-[#0F0F0F] dark:text-[#EDECE6]">
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.starter_f1}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.starter_f2}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.starter_f3}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.starter_f4}</span>
                    </div>
                  </div>

                  {/* Modal Trigger Button */}
                  <div className="pt-3">
                    <button
                      onClick={() => setActiveModalKey('starter')}
                      className="relative overflow-hidden w-full bg-[#ECFDF5] dark:bg-[#10B981]/15 text-[#059669] dark:text-[#10B981] border-2 border-[#059669]/50 dark:border-[#10B981]/50 offer-btn offer-btn-sm font-extrabold hover:bg-[#059669] hover:text-white dark:hover:bg-[#10B981] dark:hover:text-black transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs animate-click-me group"
                    >
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#059669] dark:bg-[#10B981] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669] dark:bg-[#10B981]"></span>
                      </span>
                      <Info size={18} className="shrink-0 group-hover:rotate-12 transition-transform" />
                      <span>{t.detail_btn}</span>
                      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent pointer-events-none animate-shimmer-sweep" />
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] space-y-3">
                  <button
                    onClick={() => openWhatsApp(t.starter_name, currency === 'USD' ? t.starter_price_usd : currency === 'GBP' ? t.starter_price_gbp : t.starter_price_pkr)}
                    className="btn-outline w-full justify-center offer-btn offer-btn-lg animate-claim-outline group relative overflow-hidden transition-all duration-300 cursor-pointer"
                  >
                    <MessageSquare size={14} className="animate-icon-wiggle group-hover:scale-125 transition-transform text-[#059669] dark:text-[#10B981]" />
                    <span>{t.whatsapp_cta}</span>
                    <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#059669]/10 to-transparent pointer-events-none animate-shimmer-sweep" />
                  </button>
                  <div className="offer-ui text-[#8E8D88] dark:text-[#6A6965] text-center">
                    {currency === 'USD' ? t.starter_support_usd : currency === 'GBP' ? t.starter_support_gbp : t.starter_support_pkr}
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* 2. Growth Tier (Most Popular) */}
            <StaggerItem className="h-full">
              <div className="p-8 bg-white dark:bg-[#161619] border-2 border-[#059669] dark:border-[#10B981] space-y-6 flex flex-col justify-between shadow-lg relative hover:shadow-xl transition-shadow h-full card-hover-guided">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#059669] dark:bg-[#10B981] text-white offer-eyebrow font-bold px-3 py-1 shadow-sm">
                  {t.growth_badge}
                </div>

                <div className="space-y-4">
                  <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.growth_name}</div>
                  <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.growth_desc}</p>

                  <div className="pt-2 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)]">
                    <div className="offer-h3 text-[#059669] dark:text-[#10B981]">
                      <ComparePrice value={compareFor('growth', currency)} isUrdu={isUrdu} />
                      {currency === 'USD' ? t.growth_price_usd : currency === 'GBP' ? t.growth_price_gbp : t.growth_price_pkr}
                    </div>
                    <div className="offer-ui text-[#059669] dark:text-[#10B981] font-semibold mt-1">{t.growth_delivery}</div>
                  </div>

                  <div className="p-3 bg-[#ECFDF5] dark:bg-[#10B981]/15 border border-[#059669]/25 dark:border-[#10B981]/30 offer-ui text-[#0F0F0F] dark:text-[#EDECE6] space-y-1">
                    <div className="font-bold text-[#059669] dark:text-[#10B981] offer-eyebrow">{t.growth_callout_label}</div>
                    <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.growth_callout_text}</p>
                  </div>

                  <div className="pt-2 space-y-2 offer-ui text-[#0F0F0F] dark:text-[#EDECE6]">
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span className="font-bold">{t.growth_f1}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.growth_f2}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.growth_f3}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.growth_f4}</span>
                    </div>
                    <div className="flex items-start gap-2 text-[#059669] dark:text-[#10B981] font-semibold">
                      <Check size={14} className="shrink-0 mt-0.5" />
                      <span>{currency === 'USD' ? t.growth_f5_usd : currency === 'GBP' ? t.growth_f5_gbp : t.growth_f5_pkr}</span>
                    </div>
                    <div className="flex items-start gap-2 text-[#059669] dark:text-[#10B981] font-semibold">
                      <Check size={14} className="shrink-0 mt-0.5" />
                      <span>{currency === 'USD' ? t.growth_f6_usd : currency === 'GBP' ? t.growth_f6_gbp : t.growth_f6_pkr}</span>
                    </div>
                  </div>

                  {/* Prominent Modal Trigger Button */}
                  <div className="pt-3">
                    <button
                      onClick={() => setActiveModalKey('growth')}
                      className="relative overflow-hidden w-full bg-[#059669] dark:bg-[#10B981] text-white offer-btn offer-btn-sm font-extrabold hover:bg-[#047857] dark:hover:bg-[#059669] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md animate-click-me-solid group"
                    >
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      <Info size={18} className="shrink-0 group-hover:rotate-12 transition-transform" />
                      <span>{t.detail_btn}</span>
                      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none animate-shimmer-sweep" />
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] space-y-3">
                  <button
                    onClick={() => openWhatsApp(t.growth_name, currency === 'USD' ? t.growth_price_usd : currency === 'GBP' ? t.growth_price_gbp : t.growth_price_pkr)}
                    className="btn-blue w-full justify-center offer-btn offer-btn-lg animate-claim-solid shadow-md group relative overflow-hidden transition-all duration-300 cursor-pointer"
                  >
                    <MessageSquare size={14} className="animate-icon-wiggle group-hover:scale-125 transition-transform text-white" />
                    <span>{t.whatsapp_cta}</span>
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none animate-shimmer-sweep" />
                  </button>
                  <div className="offer-ui text-[#8E8D88] dark:text-[#6A6965] text-center">
                    {currency === 'USD' ? t.growth_support_usd : currency === 'GBP' ? t.growth_support_gbp : t.growth_support_pkr}
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* 3. Enterprise Tier */}
            <StaggerItem className="h-full">
              <div className="p-8 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow h-full card-hover-guided">
                <div className="space-y-4">
                  <div className="tag-green">{t.enterprise_badge}</div>
                  <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.enterprise_name}</div>
                  <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.enterprise_desc}</p>

                  <div className="pt-2 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)]">
                    <div className="offer-h3 text-[#059669] dark:text-[#10B981]">
                      <ComparePrice value={compareFor('enterprise', currency)} isUrdu={isUrdu} />
                      {currency === 'USD' ? t.enterprise_price_usd : currency === 'GBP' ? t.enterprise_price_gbp : t.enterprise_price_pkr}
                    </div>
                    <div className="offer-ui text-[#059669] dark:text-[#10B981] font-semibold mt-1">{t.enterprise_delivery}</div>
                  </div>

                  <div className="p-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] offer-ui text-[#0F0F0F] dark:text-[#EDECE6] space-y-1">
                    <div className="font-bold text-[#059669] dark:text-[#10B981] offer-eyebrow">{t.enterprise_callout_label}</div>
                    <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.enterprise_callout_text}</p>
                  </div>

                  <div className="pt-2 space-y-2 offer-ui text-[#0F0F0F] dark:text-[#EDECE6]">
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span className="font-bold">{t.enterprise_f1}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.enterprise_f2}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.enterprise_f3}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.enterprise_f4}</span>
                    </div>
                    <div className="flex items-start gap-2 text-[#059669] dark:text-[#10B981]">
                      <Check size={14} className="shrink-0 mt-0.5" />
                      <span>{t.enterprise_f5}</span>
                    </div>
                    <div className="flex items-start gap-2 text-[#059669] dark:text-[#10B981]">
                      <Check size={14} className="shrink-0 mt-0.5" />
                      <span>{t.enterprise_f6}</span>
                    </div>
                  </div>

                  {/* Modal Trigger Button */}
                  <div className="pt-3">
                    <button
                      onClick={() => setActiveModalKey('enterprise')}
                      className="relative overflow-hidden w-full bg-[#ECFDF5] dark:bg-[#10B981]/15 text-[#059669] dark:text-[#10B981] border-2 border-[#059669]/50 dark:border-[#10B981]/50 offer-btn offer-btn-sm font-extrabold hover:bg-[#059669] hover:text-white dark:hover:bg-[#10B981] dark:hover:text-black transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs animate-click-me group"
                    >
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#059669] dark:bg-[#10B981] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669] dark:bg-[#10B981]"></span>
                      </span>
                      <Info size={18} className="shrink-0 group-hover:rotate-12 transition-transform" />
                      <span>{t.detail_btn}</span>
                      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent pointer-events-none animate-shimmer-sweep" />
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] space-y-3">
                  <button
                    onClick={() => openWhatsApp(t.enterprise_name, currency === 'USD' ? t.enterprise_price_usd : currency === 'GBP' ? t.enterprise_price_gbp : t.enterprise_price_pkr)}
                    className="btn-outline w-full justify-center offer-btn offer-btn-lg animate-claim-outline group relative overflow-hidden transition-all duration-300 cursor-pointer"
                  >
                    <MessageSquare size={14} className="animate-icon-wiggle group-hover:scale-125 transition-transform text-[#059669] dark:text-[#10B981]" />
                    <span>{t.whatsapp_cta}</span>
                    <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#059669]/10 to-transparent pointer-events-none animate-shimmer-sweep" />
                  </button>
                  <div className="offer-ui text-[#8E8D88] dark:text-[#6A6965] text-center">
                    {currency === 'USD' ? t.enterprise_support_usd : currency === 'GBP' ? t.enterprise_support_gbp : t.enterprise_support_pkr}
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Delivery footnote & build capacity */}
          <div className="text-center offer-body text-[#575652] dark:text-[#9B9A95] max-w-2xl mx-auto space-y-2">
            <p className="offer-ui">
              {isUrdu
                ? '*Din us waqt se gine jate hain jab aapka content aur pehli payment humein mil jaye. Delivery date contract mein likhi hoti hai. Agar der hamari taraf se ho, to har hafte ki der par ek mahina Care Plan muft.'
                : "*Counted from the day we receive your content and first payment. The delivery date is written into your contract. If we're late, you get one free month of Care Plan for each week of delay."}
            </p>
            <p>
              {isUrdu
                ? 'Hum har mahine mehdood projects lete hain taake har project ko poora waqt mile. Agli start date ke liye message karein.'
                : 'We take on a limited number of builds each month so every project gets full attention. Message us for the next available start date.'}
            </p>
          </div>

          {/* ─── Add-ons / Extras Accordion ─── */}
          <div className="pt-12 border-t border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-6">
            <div>
              <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold mb-1">
                ADD-ONS
              </div>
              <h3 className="offer-h3 text-[#0F0F0F] dark:text-[#EDECE6]">
                {isUrdu ? 'Sirf zaroorat ki cheez add karein' : 'Add only what you need'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CONSOLE_EXTRAS_DATA.map((extra, idx) => <OfferExtra key={idx} extra={extra} currency={currency} isUrdu={isUrdu} />)}
            </div>
          </div>
        </FadeIn>
      </section>

      <OfferFAQ lang={lang} />

      {/* ─── Footer Action & Sticky Banner ─── */}
      <section className="px-4 sm:px-8 py-16 border-t border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#161619] text-center">
        <FadeIn className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold bg-[#ECFDF5] dark:bg-[rgba(16,185,129,0.15)] px-3 py-1">
            <ShieldCheck size={14} />
            <span>{isUrdu ? 'FIXED PRICE · MUKAMMAL HANDOVER' : 'FIXED PRICE · FULL HANDOVER'}</span>
          </div>

          <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
            {isUrdu ? 'Apne stock ke sath dekhein' : 'See it with your own stock'}
          </h2>

          <p className="offer-body text-[#575652] dark:text-[#9B9A95]">
            {isUrdu
              ? 'Apne kuch products bhejein. Hum unhein demo mein daal kar 15 minute ki WhatsApp call par dikhayenge.'
              : "Send us a few of your products. We'll load them into the demo and walk you through it on a 15-minute WhatsApp call."}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={openDemoWhatsApp}
              className="btn-blue offer-btn offer-btn-xl shadow-md group relative overflow-hidden cursor-pointer"
            >
              <MessageSquare size={16} className="relative z-10 animate-icon-wiggle" />
              <span className="relative z-10">{isUrdu ? 'WHATSAPP PAR DEMO BOOK KAREIN' : 'BOOK A DEMO ON WHATSAPP'}</span>
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none animate-shimmer-sweep" />
            </button>
            <Link
              to="/offers/terms?offer=console"
              className="btn-outline offer-btn offer-btn-lg"
            >
              <span>{isUrdu ? 'SHARAAIT PARHEIN' : 'READ THE TERMS'}</span>
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Plan Detail Modal */}
      {activeModalKey && modalData[activeModalKey] && (
        <PlanDetailModal
          onClose={() => setActiveModalKey(null)}
          plan={modalData[activeModalKey]}
          lang={lang}
          currency={currency}
          termsOffer="console"
          compare={compareFor(activeModalKey, currency)}
          onOpenWhatsApp={(name, price) => openWhatsApp(name, price)}
        />
      )}
    <OfferReference offerKey="console" />
</div>
  )
}
