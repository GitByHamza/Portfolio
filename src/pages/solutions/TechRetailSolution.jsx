import { LanguageLink } from '../../components/SiteLink'
import OfferReference, { OfferExtra } from '../../components/offers/OfferReference'
import Link from '../../components/SiteLink'
import { I18N_DATA, PLANS_DETAIL, EXTRAS_DATA, COMPARE_PRICES } from '../../content/offers/tech.ts'
import { useState } from 'react'

import {
  ShieldCheck,
  Cpu,
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
  Globe,
  ArrowUpRight,
  CheckCircle2,
  Maximize2,
  Info,
  ChevronDown,
} from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '../../components/motion/MotionReveal'
import PlanDetailModal from '../../components/PlanDetailModal'
import OfferFAQ from '../../components/OfferFAQ'
import ComparePrice from '../../components/ComparePrice'
import { useCurrency } from '../../hooks/useCurrency'
import ThemeToggle from '../../components/ThemeToggle'
import { useLanguage } from '../../context/LanguageContext'
import { projectsData, getLocalizedProject } from '../../data/projects'

export default function TechRetailSolution() {
  const { lang, isUrdu } = useLanguage()
  const currency = useCurrency(['USD', 'PKR'])
  const [activeModalKey, setActiveModalKey] = useState(null)

  const t = I18N_DATA[lang] || I18N_DATA.en
  const activePlan = activeModalKey
    ? (PLANS_DETAIL[lang] || PLANS_DETAIL.en)[activeModalKey]
    : null

  const renderExtraCard = (extra, index) => <OfferExtra key={index} extra={extra} currency={currency} isUrdu={isUrdu} />

  const openWhatsApp = (planName, price) => {
    const text = isUrdu
      ? encodeURIComponent(
          `Assalam o Alaikum TeXCodes, mujhe apni computer/CCTV dukan ke liye ${planName} (${price}) plan mein dilchaspi hai. Kya demo ho sakta hai?`
        )
      : encodeURIComponent(
          `Hello TeXCodes, I'm interested in the ${planName} (${price}) plan for my computer/CCTV shop. Can we schedule a demo?`
        )
    window.open(`https://wa.me/923091824000?text=${text}`, '_blank')
  }

  return (
    <div className="w-full bg-[#F6F5F0] dark:bg-[#0F0F11] min-h-screen text-[#0F0F0F] dark:text-[#EDECE6] transition-colors duration-200">
      {/* ─── Plan Detail Modal (Bilingual: English & Roman Urdu) ─── */}
      <PlanDetailModal
        plan={activePlan}
        lang={lang}
        currency={currency}
        compare={activeModalKey ? (currency === 'USD' ? COMPARE_PRICES[activeModalKey].usd : COMPARE_PRICES[activeModalKey].pkr) : null}
        onClose={() => setActiveModalKey(null)}
        onOpenWhatsApp={(name, price) => openWhatsApp(name, price)}
      />

      {/* ─── Top Language & Theme Bar ─── */}
      <div className="border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#161619] px-4 sm:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between offer-ui flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]" />
            <span className="text-[#0F0F0F] dark:text-[#EDECE6] font-bold uppercase tracking-wider hidden sm:inline">
              TEXCODES · TECH RETAIL OS
            </span>
            <span className="text-[#0F0F0F] dark:text-[#EDECE6] font-bold uppercase tracking-wider sm:hidden">
              RETAIL OS
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Language Selector */}
            <div className="flex items-center gap-1">
              <Globe size={13} className="text-[#575652] dark:text-[#9B9A95]" />
              <div className="inline-flex items-center border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#1A1A1E] p-0.5">
                <LanguageLink
                  language="en"
                  className={`px-2 py-0.5 offer-ui font-bold transition-colors cursor-pointer ${
                    lang === 'en'
                      ? 'bg-[#059669] text-white dark:bg-[#10B981]'
                      : 'text-[#575652] dark:text-[#9B9A95] hover:text-[#0F0F0F] dark:hover:text-[#EDECE6]'
                  }`}
                >
                  EN
                </LanguageLink>
                <LanguageLink
                  language="ur-en"
                  className={`px-2 py-0.5 offer-ui font-bold transition-colors cursor-pointer ${
                    lang === 'ur-en'
                      ? 'bg-[#059669] text-white dark:bg-[#10B981]'
                      : 'text-[#575652] dark:text-[#9B9A95] hover:text-[#0F0F0F] dark:hover:text-[#EDECE6]'
                  }`}
                >
                  UR
                </LanguageLink>
              </div>
            </div>

            <span className="text-[rgba(15,15,15,0.2)] dark:text-[rgba(255,255,255,0.2)] hidden sm:inline">|</span>
            <ThemeToggle className="hidden sm:inline-flex" />
            <ThemeToggle variant="icon" className="sm:hidden" />
          </div>
        </div>
      </div>

      {/* ─── Hero Section ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] relative overflow-hidden">
        {/* Subtle decorative emerald blur */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

        <FadeIn direction="up" className="max-w-7xl mx-auto space-y-6 relative z-10">
          <h1 className="offer-h1 text-[#0F0F0F] dark:text-[#EDECE6]">
            {t.hero_title_1}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] via-[#10B981] to-[#34D399] block sm:inline drop-shadow-xs">
              {t.hero_title_accent}
            </span>
            <br />
            {t.hero_title_2}
          </h1>

          <p className="offer-lede text-[#575652] dark:text-[#9B9A95] max-w-3xl">
            {t.hero_sub}
          </p>

          {/* Key Metrics Row */}
          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 offer-ui">
            <StaggerItem className="p-4 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-1 card-hover-guided">
              <div className="text-[#059669] dark:text-[#10B981] font-bold offer-ui">{t.metrics_code_top}</div>
              <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.metrics_code}</div>
            </StaggerItem>
            <StaggerItem className="p-4 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-1 card-hover-guided">
              <div className="text-[#059669] dark:text-[#10B981] font-bold offer-ui">{t.metrics_tax_top}</div>
              <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.metrics_tax}</div>
            </StaggerItem>
            <StaggerItem className="p-4 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-1 card-hover-guided">
              <div className="text-[#059669] dark:text-[#10B981] font-bold offer-ui">{t.metrics_speed_top}</div>
              <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.metrics_speed}</div>
            </StaggerItem>
            <StaggerItem className="p-4 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-1 card-hover-guided">
              <div className="text-[#059669] dark:text-[#10B981] font-bold offer-ui">{t.metrics_rma_top}</div>
              <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.metrics_rma}</div>
            </StaggerItem>
          </StaggerContainer>

          {/* Actions */}
          <div className="pt-4 flex flex-wrap items-center gap-4 offer-ui">
            <a href="#plans" className="btn-blue offer-btn offer-btn-xl shadow-sm group relative overflow-hidden">
              <span className="relative z-10">{t.cta_primary}</span>
              <ArrowRight size={14} className="relative z-10 arrow-slide" />
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none animate-shimmer-sweep" />
            </a>
            <a
              href="https://store-demo-eight.vercel.app/?mode=pc"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline offer-btn offer-btn-lg group relative overflow-hidden"
            >
              <span className="relative z-10">{t.cta_secondary}</span>
              <ArrowUpRight size={14} className="relative z-10 arrow-slide" />
              <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#10B981]/15 to-transparent pointer-events-none animate-shimmer-sweep" />
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ─── Core System Concept: One System For The Business ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#121215]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div>
            <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold mb-2">
              {t.arch_badge}
            </div>
            <h2 className="offer-h1 text-[#0F0F0F] dark:text-[#EDECE6]">
              {t.arch_title}
            </h2>
            <p className="offer-body text-[#575652] dark:text-[#9B9A95] max-w-2xl mt-3">
              {t.arch_sub}
            </p>
          </div>

          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 offer-ui">
            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.arch_01_title}</div>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                {t.arch_01_desc}
              </p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.arch_02_title}</div>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                {t.arch_02_desc}
              </p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.arch_03_title}</div>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                {t.arch_03_desc}
              </p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.arch_04_title}</div>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                {t.arch_04_desc}
              </p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.arch_05_title}</div>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                {t.arch_05_desc}
              </p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.arch_06_title}</div>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                {t.arch_06_desc}
              </p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-[#ECFDF5] dark:bg-[#10B981]/10 border-2 border-[#059669] dark:border-[#10B981] space-y-3 card-hover-guided sm:col-span-2 lg:col-span-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-[#059669] dark:text-[#10B981] offer-ui">{t.arch_07_title}</span>
                <span className="offer-eyebrow bg-[#059669] dark:bg-[#10B981] text-white px-2 py-0.5 font-bold">
                  {isUrdu ? 'MULTI-BRANCH AUR CHAIN PLANS' : 'MULTI-BRANCH & CHAIN PLANS'}
                </span>
              </div>
              <p className="offer-ui text-[#0F0F0F] dark:text-[#EDECE6] font-medium">
                {t.arch_07_desc}
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ─── Live Demo Experience Grid ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)]">
        <div className="max-w-7xl mx-auto space-y-8">
          <FadeIn direction="up">
            <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold mb-2">
              {t.demo_badge}
            </div>
            <h2 className="offer-h1 text-[#0F0F0F] dark:text-[#EDECE6]">
              {t.demo_title}
            </h2>
            <p className="offer-body text-[#575652] dark:text-[#9B9A95] max-w-2xl mt-2">
              {t.demo_sub}
            </p>
          </FadeIn>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-3 gap-6 offer-ui">
            <StaggerItem>
              <a
                href="https://store-demo-eight.vercel.app/?mode=pc"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] card-hover-guided group block space-y-3 shadow-xs h-full"
              >
                <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui flex items-center justify-between">
                  <span>{t.demo_store_title}</span>
                  <ArrowUpRight size={14} className="text-[#059669] dark:text-[#10B981] arrow-slide" />
                </div>
                <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                  {t.demo_store_desc}
                </p>
              </a>
            </StaggerItem>

            <StaggerItem>
              <a
                href="https://store-demo-eight.vercel.app/pc-builder?mode=pc"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] card-hover-guided group block space-y-3 shadow-xs h-full"
              >
                <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui flex items-center justify-between">
                  <span>{t.demo_pc_title}</span>
                  <ArrowUpRight size={14} className="text-[#059669] dark:text-[#10B981] arrow-slide" />
                </div>
                <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                  {t.demo_pc_desc}
                </p>
              </a>
            </StaggerItem>

            <StaggerItem>
              <a
                href="https://store-demo-eight.vercel.app/admin/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] card-hover-guided group block space-y-3 shadow-xs h-full"
              >
                <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui flex items-center justify-between">
                  <span>{t.demo_admin_title}</span>
                  <ArrowUpRight size={14} className="text-[#059669] dark:text-[#10B981] arrow-slide" />
                </div>
                <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                  {t.demo_admin_desc}
                </p>
              </a>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ─── Pricing & Packages Tiers ─── */}
      <section id="plans" className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#121215]">
        <div className="max-w-7xl mx-auto space-y-12">
          <FadeIn direction="up" className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold bg-[#ECFDF5] dark:bg-[rgba(16,185,129,0.15)] px-3 py-0.5 border border-[#059669]/25 dark:border-[#10B981]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#10B981]" />
              {t.plans_badge}
            </div>
            <h2 className="offer-h1 text-[#0F0F0F] dark:text-[#EDECE6]">
              {t.plans_title}
            </h2>
            <p className="offer-body text-[#575652] dark:text-[#9B9A95]">
              {t.plans_sub} {t.plans_sub_suffix}
            </p>
          </FadeIn>

          {/* ─── The Zero-Risk Decision Matrix (Best-Case vs Worst-Case) ─── */}
          <FadeIn direction="up" className="bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] p-6 sm:p-10 space-y-8 shadow-xs">
            <div className="text-center space-y-2 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-1.5 offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold bg-[#ECFDF5] dark:bg-[rgba(16,185,129,0.15)] px-3 py-0.5 border border-[#059669]/25 dark:border-[#10B981]/30">
                <ShieldCheck size={14} />
                <span>{t.ultimatum_badge}</span>
              </div>
              <h3 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
                {t.ultimatum_title}
              </h3>
              <p className="offer-body text-[#575652] dark:text-[#9B9A95]">
                {t.ultimatum_sub}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* Best Case Card */}
              <div className="p-6 sm:p-7 bg-[#FAF9F5] dark:bg-[#1A1A1F] border border-[#059669]/30 dark:border-[#10B981]/30 flex flex-col justify-between space-y-5 rounded-xs relative overflow-hidden">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-[#059669]/20 dark:border-[#10B981]/20 pb-3">
                    <span className="offer-eyebrow font-bold text-[#059669] dark:text-[#10B981] bg-[#ECFDF5] dark:bg-[#10B981]/20 px-2.5 py-1 rounded">
                      {t.ultimatum_best_tag}
                    </span>
                  </div>
                  <div className="offer-ui-strong text-[#0F0F0F] dark:text-[#EDECE6]">
                    {t.ultimatum_best_title}
                  </div>
                  <ul className="space-y-2.5 offer-ui text-[#575652] dark:text-[#9B9A95]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.ultimatum_best_p1}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.ultimatum_best_p2}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.ultimatum_best_p3}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.ultimatum_best_p4}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.ultimatum_best_p5}</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-[#059669]/20 dark:border-[#10B981]/20 offer-eyebrow text-[#059669] dark:text-[#10B981] font-bold">
                  {t.ultimatum_best_footer}
                </div>
              </div>

              {/* Worst Case Card */}
              <div className="p-6 sm:p-7 bg-[#FAF9F5] dark:bg-[#1A1A1F] border border-[rgba(15,15,15,0.16)] dark:border-[rgba(255,255,255,0.14)] flex flex-col justify-between space-y-5 rounded-xs relative overflow-hidden">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-3">
                    <span className="offer-eyebrow font-bold text-[#8E8D88] dark:text-[#6A6965] bg-neutral-200/60 dark:bg-neutral-800/60 px-2.5 py-1 rounded">
                      {t.ultimatum_worst_tag}
                    </span>
                  </div>
                  <div className="offer-ui-strong text-[#0F0F0F] dark:text-[#EDECE6]">
                    {t.ultimatum_worst_title}
                  </div>
                  <ul className="space-y-2.5 offer-ui text-[#575652] dark:text-[#9B9A95]">
                    <li className="flex items-start gap-2">
                      <ShieldCheck size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.ultimatum_worst_p1}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.ultimatum_worst_p2}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.ultimatum_worst_p3}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.ultimatum_worst_p4}</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] offer-eyebrow text-[#575652] dark:text-[#9B9A95] font-bold">
                  {t.ultimatum_worst_footer}
                </div>
              </div>
            </div>

            {/* Staging Guarantee Banner Callout */}
            <div className="p-4 sm:p-5 bg-[#ECFDF5] dark:bg-[#10B981]/15 border border-[#059669]/30 dark:border-[#10B981]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-4xl">
                <div className="offer-eyebrow font-bold text-[#059669] dark:text-[#10B981] flex items-center gap-1.5">
                  <ShieldCheck size={15} />
                  <span>{t.guarantee_badge}</span>
                </div>
                <div className="offer-ui-strong text-[#0F0F0F] dark:text-[#EDECE6]">
                  {t.guarantee_title}
                </div>
                <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                  {t.guarantee_sub}
                </p>
              </div>
              <Link
                to="/solutions/terms?offer=tech"
                className="btn-outline offer-btn offer-btn-sm shrink-0 whitespace-nowrap"
              >
                <span>{t.view_terms}</span>
              </Link>
            </div>
          </FadeIn>

          {/* Guided Conversion Flow Ribbon */}
          <FadeIn direction="up" delay={0.1} className="flex items-center justify-center gap-2 sm:gap-4 offer-eyebrow text-[#575652] dark:text-[#9B9A95] pb-2 flex-wrap">
            <span className="flex items-center gap-1.5 text-[#059669] dark:text-[#10B981] font-bold">
              <span className="w-5 h-5 rounded-full border border-[#059669] dark:border-[#10B981] flex items-center justify-center offer-ui">1</span>
              {isUrdu ? 'Plan chunein' : 'Choose a plan'}
            </span>
            <span className="text-[#8E8D88] dark:text-[#6A6965]">→</span>
            <span className="flex items-center gap-1.5 text-[#059669] dark:text-[#10B981] font-bold">
              <span className="w-5 h-5 rounded-full border border-[#059669] dark:border-[#10B981] flex items-center justify-center offer-ui">2</span>
              {isUrdu ? 'Scope dekhein' : 'See the scope'}
            </span>
            <span className="text-[#8E8D88] dark:text-[#6A6965]">→</span>
            <span className="flex items-center gap-1.5 text-[#059669] dark:text-[#10B981] font-bold">
              <span className="w-5 h-5 rounded-full border border-[#059669] dark:border-[#10B981] flex items-center justify-center offer-ui">3</span>
              {isUrdu ? 'Call book karein' : 'Book a call'}
            </span>
          </FadeIn>

          {/* Regional price label above plan tiers */}
          <FadeIn direction="up" delay={0.05} className="flex flex-col items-center justify-center gap-2 pt-2 pb-2">
            <div className="offer-eyebrow text-[#8E8D88] dark:text-[#6A6965] text-center">
              {currency === 'USD'
                ? isUrdu
                  ? 'Prices USD mein'
                  : 'Prices in USD'
                : isUrdu
                ? 'Prices PKR mein (Pakistan ke karobar ke liye)'
                : 'Prices in PKR (for businesses in Pakistan)'}
            </div>
          </FadeIn>

          <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start offer-ui">
            {/* 1. Single Store Launch */}
            <StaggerItem className="h-full">
              <div className="p-8 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-6 flex flex-col justify-between hover:border-[#059669] dark:hover:border-[#10B981] transition-colors h-full card-hover-guided">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.starter_name}</div>
                  <span className="offer-eyebrow text-[#8E8D88] dark:text-[#6A6965]">{t.starter_badge}</span>
                </div>
                <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                  {t.starter_desc}
                </p>

                <div className="pt-2 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)]">
                  <div className="offer-h3 text-[#0F0F0F] dark:text-[#EDECE6]">
                    <ComparePrice value={currency === 'USD' ? COMPARE_PRICES.starter.usd : COMPARE_PRICES.starter.pkr} isUrdu={isUrdu} />
                    {currency === 'USD' ? t.starter_price_usd : t.starter_price_pkr}
                  </div>
                  <div className="offer-ui text-[#059669] dark:text-[#10B981] font-semibold mt-1">{t.starter_delivery}</div>
                </div>

                {/* Clear Plan Differentiation Callout */}
                <div className="p-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] offer-ui text-[#0F0F0F] dark:text-[#EDECE6] space-y-1">
                  <div className="font-bold text-[#059669] dark:text-[#10B981] offer-eyebrow">
                    {t.starter_callout_label}
                  </div>
                  <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                    {t.starter_callout_text}
                  </p>
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

                {/* Prominent Modal Trigger Button */}
                <div className="pt-3">
                  <button
                    onClick={() => setActiveModalKey('starter')}
                    className="relative overflow-hidden w-full bg-[#ECFDF5] dark:bg-[#10B981]/15 text-[#059669] dark:text-[#10B981] border-2 border-[#059669]/50 dark:border-[#10B981]/60 offer-btn offer-btn-sm font-extrabold hover:bg-[#059669] dark:hover:bg-[#10B981] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm animate-click-me group"
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
                  onClick={() => openWhatsApp(t.starter_name, currency === 'USD' ? t.starter_price_usd : t.starter_price_pkr)}
                  className="btn-outline w-full justify-center offer-btn offer-btn-lg animate-claim-outline group relative overflow-hidden transition-all duration-300"
                >
                  <MessageSquare size={14} className="animate-icon-wiggle group-hover:scale-125 transition-transform text-[#059669] dark:text-[#10B981]" />
                  <span>{t.whatsapp_cta}</span>
                  <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#059669]/10 to-transparent pointer-events-none animate-shimmer-sweep" />
                </button>
                <div className="offer-ui text-[#8E8D88] dark:text-[#6A6965] text-center">
                  {currency === 'USD' ? t.starter_support_usd : t.starter_support_pkr}
                </div>
              </div>
            </div>
          </StaggerItem>

            {/* 2. Multi Branch Growth (Most Popular) */}
            <StaggerItem className="h-full">
              <div className="p-8 bg-white dark:bg-[#161619] border-2 border-[#059669] dark:border-[#10B981] space-y-6 flex flex-col justify-between shadow-lg relative hover:shadow-xl transition-shadow h-full card-hover-guided">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#059669] dark:bg-[#10B981] text-white offer-eyebrow font-bold px-3 py-1 shadow-sm">
                  {t.growth_badge}
                </div>

                <div className="space-y-4">
                  <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.growth_name}</div>
                  <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                    {t.growth_desc}
                  </p>

                  <div className="pt-2 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)]">
                    <div className="offer-h3 text-[#059669] dark:text-[#10B981]">
                      <ComparePrice value={currency === 'USD' ? COMPARE_PRICES.growth.usd : COMPARE_PRICES.growth.pkr} isUrdu={isUrdu} />
                      {currency === 'USD' ? t.growth_price_usd : t.growth_price_pkr}
                    </div>
                    <div className="offer-ui text-[#059669] dark:text-[#10B981] font-semibold mt-1">{t.growth_delivery}</div>
                  </div>

                  {/* Clear Plan Differentiation Callout */}
                  <div className="p-3 bg-[#ECFDF5] dark:bg-[#10B981]/15 border border-[#059669]/25 dark:border-[#10B981]/30 offer-ui text-[#0F0F0F] dark:text-[#EDECE6] space-y-1">
                    <div className="font-bold text-[#059669] dark:text-[#10B981] offer-eyebrow">
                      {t.growth_callout_label}
                    </div>
                    <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                      {t.growth_callout_text}
                    </p>
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
                      <span>{currency === 'USD' ? t.growth_f5_usd : t.growth_f5_pkr}</span>
                    </div>
                    <div className="flex items-start gap-2 text-[#059669] dark:text-[#10B981] font-semibold">
                      <Check size={14} className="shrink-0 mt-0.5" />
                      <span>{currency === 'USD' ? t.growth_f6_usd : t.growth_f6_pkr}</span>
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
                    onClick={() => openWhatsApp(t.growth_name, currency === 'USD' ? t.growth_price_usd : t.growth_price_pkr)}
                    className="btn-blue w-full justify-center offer-btn offer-btn-xl shadow-md animate-claim-solid group relative overflow-hidden transition-all duration-300"
                  >
                    <MessageSquare size={15} className="animate-icon-wiggle group-hover:scale-125 transition-transform" />
                    <span className="tracking-wider">{t.whatsapp_cta}</span>
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none animate-shimmer-sweep" />
                  </button>
                  <div className="offer-ui text-[#8E8D88] dark:text-[#6A6965] text-center">
                    {currency === 'USD' ? t.growth_support_usd : t.growth_support_pkr}
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* 3. Chain and Distribution OS */}
            <StaggerItem className="h-full">
              <div className="p-8 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-6 flex flex-col justify-between hover:border-[#059669] dark:hover:border-[#10B981] transition-colors h-full card-hover-guided">
                <div className="space-y-4">
                  <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.enterprise_name}</div>
                  <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                    {t.enterprise_desc}
                  </p>

                  <div className="pt-2 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)]">
                    <div className="offer-h3 text-[#0F0F0F] dark:text-[#EDECE6]">
                      <ComparePrice value={currency === 'USD' ? COMPARE_PRICES.enterprise.usd : COMPARE_PRICES.enterprise.pkr} isUrdu={isUrdu} />
                      {currency === 'USD' ? t.enterprise_price_usd : t.enterprise_price_pkr}
                    </div>
                    <div className="offer-ui text-[#059669] dark:text-[#10B981] font-semibold mt-1">{t.enterprise_delivery}</div>
                  </div>

                  {/* Clear Plan Differentiation Callout */}
                  <div className="p-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] offer-ui text-[#0F0F0F] dark:text-[#EDECE6] space-y-1">
                    <div className="font-bold text-[#059669] dark:text-[#10B981] offer-eyebrow">
                      {t.enterprise_callout_label}
                    </div>
                    <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                      {t.enterprise_callout_text}
                    </p>
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
                    <div className="flex items-start gap-2 text-[#059669] dark:text-[#10B981] font-semibold">
                      <Check size={14} className="shrink-0 mt-0.5" />
                      <span>{t.enterprise_f5}</span>
                    </div>
                    <div className="flex items-start gap-2 text-[#059669] dark:text-[#10B981] font-semibold">
                      <Check size={14} className="shrink-0 mt-0.5" />
                      <span>{t.enterprise_f6}</span>
                    </div>
                  </div>

                  {/* Prominent Modal Trigger Button */}
                  <div className="pt-3">
                    <button
                      onClick={() => setActiveModalKey('enterprise')}
                      className="relative overflow-hidden w-full bg-[#ECFDF5] dark:bg-[#10B981]/15 text-[#059669] dark:text-[#10B981] border-2 border-[#059669]/50 dark:border-[#10B981]/60 offer-btn offer-btn-sm font-extrabold hover:bg-[#059669] dark:hover:bg-[#10B981] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm animate-click-me group"
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
                    onClick={() => openWhatsApp(t.enterprise_name, currency === 'USD' ? t.enterprise_price_usd : t.enterprise_price_pkr)}
                    className="btn-outline w-full justify-center offer-btn offer-btn-lg animate-claim-outline group relative overflow-hidden transition-all duration-300"
                  >
                    <MessageSquare size={14} className="animate-icon-wiggle group-hover:scale-125 transition-transform text-[#059669] dark:text-[#10B981]" />
                    <span>{t.whatsapp_cta}</span>
                    <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#059669]/10 to-transparent pointer-events-none animate-shimmer-sweep" />
                  </button>
                  <div className="offer-ui text-[#8E8D88] dark:text-[#6A6965] text-center">
                    {currency === 'USD' ? t.enterprise_support_usd : t.enterprise_support_pkr}
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Delivery footnote & build capacity */}
          <FadeIn direction="up" className="text-center offer-body text-[#575652] dark:text-[#9B9A95] max-w-2xl mx-auto space-y-2">
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
          </FadeIn>

          {/* Extras menu */}
          <FadeIn direction="up" className="bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] p-6 sm:p-8 space-y-5">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold">
                  ADD-ONS
                </div>
                <div className="offer-ui text-[#059669] dark:text-[#10B981] flex items-center gap-1 font-medium bg-[#ECFDF5] dark:bg-[#10B981]/15 px-2 py-0.5 rounded border border-[#059669]/25">
                  <ChevronDown size={12} className="shrink-0" />
                  <span>{isUrdu ? 'Tafseel ke liye tap karein' : 'Tap an add-on for details'}</span>
                </div>
              </div>
              <h3 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
                {isUrdu ? 'Sirf zaroorat ki cheez add karein' : 'Add only what you need'}
              </h3>
              <p className="offer-body text-[#575652] dark:text-[#9B9A95] max-w-3xl">
                {isUrdu
                  ? 'Har plan ki ek fixed price. Add-ons ki qeemat pehle se tay aur invoice par alag likhi hoti hai.'
                  : 'Every plan has one fixed price. Add-ons are priced upfront and listed separately on your invoice.'}
              </p>
            </div>
            {/* Desktop 3-Column Layout: when an item in one column opens, only that column moves down; other columns are completely unaffected */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-3 items-start">
              {[
                [0, 3, 6, 9],
                [1, 4, 7],
                [2, 5, 8],
              ].map((colIndices, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-3">
                  {colIndices.map((idx) => renderExtraCard(EXTRAS_DATA[idx], idx))}
                </div>
              ))}
            </div>

            {/* Tablet 2-Column Layout */}
            <div className="hidden sm:grid lg:hidden sm:grid-cols-2 gap-3 items-start">
              {[
                [0, 2, 4, 6, 8],
                [1, 3, 5, 7, 9],
              ].map((colIndices, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-3">
                  {colIndices.map((idx) => renderExtraCard(EXTRAS_DATA[idx], idx))}
                </div>
              ))}
            </div>

            {/* Mobile 1-Column Layout */}
            <div className="flex sm:hidden flex-col gap-3">
              {EXTRAS_DATA.map((item, idx) => renderExtraCard(item, idx))}
            </div>
            <p className="offer-ui text-[#8E8D88] dark:text-[#6A6965]">
              {isUrdu
                ? 'Tamam add-on prices fixed hain. Kaam shuru hone se pehle final scope likh kar confirm hota hai.'
                : 'All add-on prices are fixed. The final scope is confirmed in writing before work starts.'}
            </p>
          </FadeIn>

          {/* Care Plan */}
          <FadeIn direction="up" className="space-y-5">
            <div className="text-center space-y-2">
              <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold">
                {isUrdu ? 'LAUNCH KE BAAD' : 'AFTER LAUNCH'}
              </div>
              <h3 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
                {isUrdu ? 'Care Plans: store hum chalta rakhte hain' : 'Care Plans: we keep your store running'}
              </h3>
              <p className="offer-body text-[#575652] dark:text-[#9B9A95] max-w-2xl mx-auto">
                {isUrdu
                  ? 'Har build ke sath 30 din ki warranty. Us ke baad Care Plan mein hosting, backups, updates aur support. Yeh ikhtiyari hai — code aapka hai, aap khud bhi host kar sakte hain.'
                  : "Every build includes a 30-day warranty. After that, a Care Plan covers hosting, backups, updates and support. It's optional — you own the code, so you can also host it yourself."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Basic Care', pricePkr: 'PKR 14,000 / mo', priceUsd: '$140 / mo', en: ['Hosting and SSL', 'Daily backups', 'Uptime monitoring', 'Small text and image edits', 'Email support'], ur: ['Hosting aur SSL', 'Rozana backups', 'Uptime monitoring', 'Chhoti text aur image edits', 'Email support'] },
                { name: 'Growth Care', pricePkr: 'PKR 28,000 / mo', priceUsd: '$280 / mo', en: ['Everything in Basic', 'Priority support — reply within 4 business hours', 'Small monthly feature changes', 'Hosting for multiple branches', 'WhatsApp support'], ur: ['Basic ka sab kuch', 'Priority support — 4 business hours mein jawab', 'Mahana chhoti feature changes', 'Multi-branch hosting', 'WhatsApp support'] },
                { name: 'Enterprise Care', pricePkr: 'PKR 55,000 / mo', priceUsd: '$550 / mo', en: ['Everything in Growth', 'Dedicated engineer hours each month', 'Integration and API support', '99.5% uptime target', 'Phone support'], ur: ['Growth ka sab kuch', 'Har mahine dedicated engineer hours', 'Integration aur API support', '99.5% uptime target', 'Phone support'] },
              ].map((c, i) => (
                <div key={i} className="bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] p-5 space-y-3">
                  <div className="offer-ui-strong text-[#0F0F0F] dark:text-[#EDECE6]">{c.name}</div>
                  <div className="offer-h3 text-[#059669] dark:text-[#10B981]">
                    {currency === 'USD' ? c.priceUsd : c.pricePkr}
                  </div>
                  <ul className="space-y-1.5">
                    {(isUrdu ? c.ur : c.en).map((li, j) => (
                      <li key={j} className="flex items-start gap-2 offer-ui text-[#575652] dark:text-[#9B9A95]">
                        <Check size={13} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </FadeIn>

          <div className="text-center pt-4">
            <Link
              to="/solutions/terms?offer=tech"
              className="offer-ui font-semibold text-[#059669] dark:text-[#10B981] hover:underline"
            >
              {t.view_terms}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Payback / ROI ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#0F0F11]">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold">
            {isUrdu ? 'CHALANE KA KHARCHA' : 'RUNNING COSTS'}
          </div>
          <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
            {isUrdu ? 'Ek dafa payment. Us ke baad koi commission nahi.' : 'Pay once. No commission after that.'}
          </h2>
          <p className="offer-body text-[#575652] dark:text-[#9B9A95]">
            {isUrdu
              ? 'Marketplaces aur kiraye ke store platforms har mahine fee ya har order par hissa lete hain — jab tak aap bechte rahein. Yahan aap build ki payment ek dafa karte hain. Launch ke baad kharcha sirf hosting aur payment gateway ki standard fee.'
              : "Marketplaces and rented store platforms charge a monthly fee or take a cut of every order, for as long as you sell. Here you pay for the build once. After launch, your running costs are hosting and your payment gateway's standard fees."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {[
              { big: currency === 'USD' ? '$0' : 'PKR 0', en: 'monthly platform fee after launch', ur: 'launch ke baad mahana platform fee' },
              { big: '0%', en: 'commission to us', ur: 'hamara commission' },
              { big: '100%', en: 'your code and data', ur: 'code aur data aapka' },
            ].map((s, i) => (
              <div key={i} className="bg-[#FAF9F5] dark:bg-[#161619] border border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] p-5 space-y-1">
                <div className="offer-h2 text-[#059669] dark:text-[#10B981]">{s.big}</div>
                <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{isUrdu ? s.ur : s.en}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OfferFAQ lang={lang} />

      {/* ─── Real builds / proof ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#121215]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold">
              {isUrdu ? 'HAMARA KAAM' : 'OUR WORK'}
            </div>
            <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
              {isUrdu ? 'Hamare banaye hue systems' : "Systems we've built"}
            </h2>
            <p className="offer-body text-[#575652] dark:text-[#9B9A95]">
              {isUrdu
                ? 'Koi banawati testimonials nahi. Neeche diye systems khol kar khud test karein.'
                : 'No made-up testimonials. Open the systems below and test them yourself.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {projectsData
              .filter((p) => [7, 9, 6].includes(p.id))
              .map((p) => {
                const lp = getLocalizedProject(p, lang)
                return (
                  <div key={p.id} className="bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] overflow-hidden flex flex-col group">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0F0F0F]">
                      <img
                        src={p.mainImage}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                    </div>
                    <div className="p-5 space-y-2 flex-1 flex flex-col">
                      <div className="offer-eyebrow text-[#059669] dark:text-[#10B981]">{lp.impact}</div>
                      <h3 className="offer-h3 text-[#0F0F0F] dark:text-[#EDECE6]">{p.title}</h3>
                      <div className="mt-auto pt-3 flex items-center gap-3 flex-wrap">
                        {p.demoUrl ? (
                          <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-outline offer-btn offer-btn-sm">
                            <ExternalLink size={18} />
                            <span>{isUrdu ? 'Live Demo Kholein' : 'Open Live Demo'}</span>
                          </a>
                        ) : null}
                        {p.githubUrl && p.githubUrl !== '#' ? (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="offer-ui text-[#575652] dark:text-[#9B9A95] hover:text-[#059669] dark:hover:text-[#10B981]"
                          >
                            {isUrdu ? 'Code dekhein' : 'View code'}
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
          <div className="text-center pt-2">
            <Link to="/work" className="offer-ui font-semibold text-[#059669] dark:text-[#10B981] hover:underline">
              {isUrdu ? 'Tamam projects dekhein →' : 'See all projects →'}
            </Link>
          </div>
        </div>
      </section>
    <OfferReference offerKey="tech" />
</div>
  )
}
