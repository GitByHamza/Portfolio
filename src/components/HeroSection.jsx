import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, Terminal, Layers, Database, Cpu } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const HeroSection = () => {
  const { t, isUrdu } = useLanguage()

  const tools = [
    'Next.js',
    'TypeScript',
    'Laravel 12',
    'Vue 3',
    'PostgreSQL',
    'Prisma ORM',
    'Tailwind CSS',
    'REST APIs',
    'Docker',
  ]

  const indexItems = [
    { num: '01', title: 'TOOLKITO', category: 'PRODUCT / SAAS' },
    { num: '02', title: 'MYLS', category: 'SYSTEMS MODERNIZATION' },
    { num: '03', title: 'TXS RETAIL OS', category: 'CUSTOM E-COMMERCE' },
    { num: '04', title: 'MEDICORE HMS', category: 'HEALTHCARE ERP' },
    { num: '05', title: 'AI RECEPTIONIST', category: 'AUTOMATION' },
  ]

  return (
    <section id="hero" className="w-full bg-[#F6F5F0] dark:bg-[#0F0F11] border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] transition-colors duration-200">
      {/* ─── Massive Conceptual Statement ─── */}
      <div className="px-4 sm:px-8 pt-10 sm:pt-16 pb-8 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)]">
        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] font-display uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6] leading-[0.88] max-w-7xl">
          {isUrdu ? (
            <>
              BUILDING{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] via-[#10B981] to-[#34D399] relative inline-block drop-shadow-xs">
                DIGITAL SYSTEMS
              </span>
              <br className="hidden sm:inline" /> JO KAROBAR KO SCALE KAREIN.
            </>
          ) : (
            <>
              BUILDING{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] via-[#10B981] to-[#34D399] relative inline-block drop-shadow-xs">
                DIGITAL SYSTEMS
              </span>
              <br className="hidden sm:inline" /> THAT MOVE BUSINESSES.
            </>
          )}
        </h2>
      </div>

      {/* ─── 3-Column Editorial Grid ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)]">
        {/* ── Left Column: Profile & Tools (4 cols) ── */}
        <div className="lg:col-span-4 p-6 sm:p-8 lg:border-r border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#059669] dark:text-[#10B981] font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#059669] dark:bg-[#10B981] inline-block" />
              PROFILE // THE THESIS
            </div>
            <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6]">
              FROM CODE TO SYSTEMS
            </h3>
            <p className="font-serif text-[#575652] dark:text-[#9B9A95] text-base leading-relaxed">
              {isUrdu
                ? 'TeXCodes ek independent software engineering studio aur product builder hai. Hum live production SaaS platforms, custom business systems aur scalable web architectures engineer karte hain.'
                : 'TeXCodes is an independent software engineering studio and product builder. We engineer production SaaS platforms, custom business systems, and scalable web architectures built around how real operations function.'}
            </p>

            {/* CTAs */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a href="#work-section" className="btn-blue text-xs shadow-sm">
                {t('hero', 'cta_work')} <ArrowDown size={14} />
              </a>
              <Link to="/solutions" className="btn-outline text-xs">
                {t('hero', 'cta_solutions')} <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Tools & Craft Box */}
          <div className="pt-6 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.08)] space-y-2.5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E8D88] dark:text-[#6A6965] font-semibold">
              TOOLS & CRAFT
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tools.map((tItem) => (
                <span key={tItem} className="tag-pill text-[10px]">
                  {tItem}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Center Column: Editorial Architectural Visual & Hand Annotations (5 cols) ── */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:border-r border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#161619] flex flex-col justify-center relative overflow-hidden">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(#0F0F0F 1px, transparent 1px), linear-gradient(to right, #0F0F0F 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Handwritten Annotation 1: Speech Bubble Top */}
          <div className="relative z-10 mb-4 self-start">
            <div className="inline-block relative">
              <span className="font-handwriting text-[#059669] dark:text-[#10B981] text-xl font-bold bg-[#ECFDF5] dark:bg-[rgba(16,185,129,0.15)] border border-[#059669]/30 dark:border-[#10B981]/30 px-3 py-1 rounded-sm shadow-sm inline-flex items-center gap-1.5 rotate-[-2deg]">
                {t('hero', 'speech_bubble')}
              </span>
              <div className="w-2.5 h-2.5 bg-[#ECFDF5] dark:bg-[rgba(16,185,129,0.15)] border-r border-b border-[#059669]/30 dark:border-[#10B981]/30 absolute -bottom-1 left-4 rotate-45" />
            </div>
          </div>

          {/* Terminal / Architecture Card */}
          <div className="relative z-10 bg-white dark:bg-[#121215] border border-[rgba(15,15,15,0.18)] dark:border-[rgba(255,255,255,0.12)] shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0F0F0F]/20 dark:bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#0F0F0F]/20 dark:bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#0F0F0F]/20 dark:bg-white/20" />
                <span className="font-mono text-[11px] text-[#575652] dark:text-[#9B9A95] ml-2">sys_architecture.manifest</span>
              </div>
              <span className="font-mono text-[10px] text-[#059669] dark:text-[#10B981] font-semibold bg-[#ECFDF5] dark:bg-[rgba(16,185,129,0.15)] px-2 py-0.5 border border-[#059669]/20 dark:border-[#10B981]/25">
                VERIFIED STACK
              </span>
            </div>

            {/* Architecture Node Diagram */}
            <div className="grid grid-cols-3 gap-2 font-mono text-center text-[10px]">
              <div className="p-2.5 border border-[rgba(15,15,15,0.12)] dark:border-[rgba(255,255,255,0.08)] bg-[#FBFBF9] dark:bg-[#1A1A1E]">
                <Cpu size={14} className="mx-auto mb-1 text-[#059669] dark:text-[#10B981]" />
                <div className="font-semibold text-[#0F0F0F] dark:text-[#EDECE6]">NEXT.JS / VUE 3</div>
                <div className="text-[9px] text-[#8E8D88] dark:text-[#6A6965]">{t('hero', 'diag_node1_desc')}</div>
              </div>
              <div className="p-2.5 border border-[rgba(15,15,15,0.12)] dark:border-[rgba(255,255,255,0.08)] bg-[#FBFBF9] dark:bg-[#1A1A1E]">
                <Layers size={14} className="mx-auto mb-1 text-[#059669] dark:text-[#10B981]" />
                <div className="font-semibold text-[#0F0F0F] dark:text-[#EDECE6]">LARAVEL / NODE</div>
                <div className="text-[9px] text-[#8E8D88] dark:text-[#6A6965]">{t('hero', 'diag_node2_desc')}</div>
              </div>
              <div className="p-2.5 border border-[rgba(15,15,15,0.12)] dark:border-[rgba(255,255,255,0.08)] bg-[#FBFBF9] dark:bg-[#1A1A1E]">
                <Database size={14} className="mx-auto mb-1 text-[#059669] dark:text-[#10B981]" />
                <div className="font-semibold text-[#0F0F0F] dark:text-[#EDECE6]">POSTGRESQL</div>
                <div className="text-[9px] text-[#8E8D88] dark:text-[#6A6965]">{t('hero', 'diag_node3_desc')}</div>
              </div>
            </div>

            <div className="text-[11px] font-mono text-[#575652] dark:text-[#9B9A95] bg-[#F6F5F0] dark:bg-[#18181C] p-3 border-l-2 border-[#059669] dark:border-[#10B981] space-y-1">
              <div className="text-[#0F0F0F] dark:text-[#EDECE6] font-semibold flex items-center gap-1.5">
                <Terminal size={12} className="text-[#059669] dark:text-[#10B981]" /> {t('hero', 'diag_node4_title')}: 100% REPO & DATA
              </div>
              <p className="text-[10px] text-[#575652] dark:text-[#9B9A95]">
                {isUrdu
                  ? 'Zero vendor lock-in. Mukammal GitHub transfer saaf relational database schema ke sath.'
                  : 'Zero vendor lock-in. Full GitHub transfer with clean relational database schema.'}
              </p>
            </div>
          </div>

          {/* Handwritten Annotation 2: Bottom Note */}
          <div className="relative z-10 mt-4 self-end">
            <span className="font-handwriting text-[#059669] dark:text-[#10B981] text-lg font-bold inline-block rotate-[1deg]">
              {isUrdu ? '↳ Haqeeqi operations ke liye tayyar shuda.' : '↳ Built for real operations, not static mockups.'}
            </span>
          </div>
        </div>

        {/* ── Right Column: Structured Swiss Metadata (3 cols) ── */}
        <div className="lg:col-span-3 p-6 sm:p-8 flex flex-col justify-between space-y-6 font-mono text-xs">
          <div className="space-y-5">
            <div className="border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-3">
              <div className="text-[10px] text-[#8E8D88] dark:text-[#6A6965] uppercase tracking-widest mb-1">
                LOCATION / TIMEZONE
              </div>
              <div className="font-semibold text-[#0F0F0F] dark:text-[#EDECE6]">PAKISTAN</div>
              <div className="text-[11px] text-[#575652] dark:text-[#9B9A95]">PKT (UTC+5) · REMOTE READY</div>
            </div>

            <div className="border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-3">
              <div className="text-[10px] text-[#8E8D88] dark:text-[#6A6965] uppercase tracking-widest mb-1">
                PRIMARY FOCUS
              </div>
              <div className="font-semibold text-[#0F0F0F] dark:text-[#EDECE6]">
                {isUrdu ? 'SOFTWARE · SYSTEMS · PRODUCTS' : 'SOFTWARE · SYSTEMS · PRODUCTS'}
              </div>
              <div className="text-[11px] text-[#575652] dark:text-[#9B9A95]">
                {isUrdu ? 'Full-Stack Engineering & SaaS Architecture' : 'Full-Stack Engineering & SaaS Architecture'}
              </div>
            </div>

            <div className="border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-3">
              <div className="text-[10px] text-[#8E8D88] dark:text-[#6A6965] uppercase tracking-widest mb-1">
                PRODUCTION WORK
              </div>
              <div className="font-semibold text-[#0F0F0F] dark:text-[#EDECE6]">SAAS · COMMERCE · HEALTHCARE</div>
              <div className="text-[11px] text-[#575652] dark:text-[#9B9A95]">Toolkito SaaS · MYLS Swiss Platform · Retail OS</div>
            </div>

            <div>
              <div className="text-[10px] text-[#8E8D88] dark:text-[#6A6965] uppercase tracking-widest mb-1">
                AVAILABILITY STATUS
              </div>
              <div className="text-[#059669] dark:text-[#10B981] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]" />
                {t('nav', 'open_for_builds')}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)]">
            <Link
              to="/about"
              className="text-[11px] font-semibold text-[#0F0F0F] dark:text-[#EDECE6] hover:text-[#059669] dark:hover:text-[#10B981] transition-colors flex items-center justify-between"
            >
              <span>{isUrdu ? 'ENGINEERING KAHANI' : 'ENGINEERING BIOGRAPHY'}</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Bottom Ticker / Index Row ─── */}
      <div className="px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-y-2 text-[11px] font-mono text-[#575652] dark:text-[#9B9A95] overflow-x-auto">
        <span className="font-semibold text-[#0F0F0F] dark:text-[#EDECE6] shrink-0 mr-4">
          FEATURED INDEX:
        </span>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          {indexItems.map((item) => (
            <a
              key={item.num}
              href="#work-section"
              className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span className="font-bold text-[#059669] dark:text-[#10B981]">{item.num}</span>
              <span className="font-semibold text-[#0F0F0F] dark:text-[#EDECE6]">{item.title}</span>
              <span className="text-[10px] text-[#8E8D88] dark:text-[#6A6965]">({item.category})</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
