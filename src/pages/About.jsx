import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { t, isUrdu } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const technicalStack = [
    {
      category: isUrdu ? 'BACKEND AUR DOMAIN APIS' : 'BACKEND & DOMAIN APIS',
      items: ['PHP Laravel 12', 'Node.js', 'REST APIs', 'Spatie RBAC', 'Database Seeders & Factories'],
    },
    {
      category: isUrdu ? 'FRONTEND AUR USER INTERFACES' : 'FRONTEND & USER INTERFACES',
      items: ['Next.js 16 (App Router)', 'React 19', 'Vue 3 (Composition API)', 'Tailwind CSS', 'TypeScript'],
    },
    {
      category: isUrdu ? 'DATABASE AUR DATA INTEGRITY' : 'DATABASE & DATA INTEGRITY',
      items: ['PostgreSQL', 'Prisma ORM', 'MySQL', 'Supabase', 'Relational Schema Migrations'],
    },
    {
      category: isUrdu ? 'PROCESSING AUR INFRASTRUCTURE' : 'PROCESSING & INFRASTRUCTURE',
      items: ['Sharp', 'FFmpeg', 'Docker', 'Vercel', 'Git / GitHub Workflow'],
    },
  ]

  return (
    <div className="w-full bg-[#F6F5F0] dark:bg-[#0A0A0A] min-h-screen transition-colors duration-200">
      {/* ─── Page Header ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.1)] bg-[#FAF9F5] dark:bg-[#111111]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#059669] dark:text-[#10B981] font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#059669] dark:bg-[#10B981] inline-block" />
            {t('aboutPage', 'badge')}
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-white leading-[0.88] max-w-5xl">
            {t('aboutPage', 'title')}
          </h1>

          <p className="font-serif text-lg sm:text-xl text-[#575652] dark:text-[#A3A29E] max-w-3xl leading-relaxed">
            {t('aboutPage', 'desc')}
          </p>
        </div>
      </section>

      {/* ─── Main Editorial Narrative ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.1)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Metadata / Quick Bio Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-8 lg:border-r border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.1)] lg:pr-8">
            <div className="p-6 bg-white dark:bg-[#141414] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.15)] space-y-4 font-mono text-xs">
              <div className="text-[10px] text-[#8E8D88] dark:text-[#737373] uppercase tracking-widest">
                {isUrdu ? 'ENGINEER SHANAKHT' : 'ENGINEER IDENTITY'}
              </div>
              <div className="text-xl font-display uppercase text-[#0F0F0F] dark:text-white tracking-tight">
                HAMZA (AMEER HAMZA)
              </div>
              <div className="space-y-2 text-[#575652] dark:text-[#A3A29E] text-[11px]">
                <div>{t('aboutPage', 'role')}</div>
                <div>{t('aboutPage', 'base')}</div>
                <div>{t('aboutPage', 'discipline')}</div>
                <div className="text-[#059669] dark:text-[#10B981] font-semibold">{t('aboutPage', 'status')}</div>
              </div>
            </div>

            {/* Handwritten Quote */}
            <div className="p-6 bg-[#ECFDF5] dark:bg-[#064E3B]/25 border border-[#059669]/25 dark:border-[#10B981]/30">
              <span className="font-mono text-[10px] uppercase text-[#059669] dark:text-[#10B981] tracking-widest block mb-1 font-semibold">
                {t('aboutPage', 'quote_badge')}
              </span>
              <p className="font-handwriting text-[#059669] dark:text-[#34D399] text-2xl font-bold leading-snug">
                {t('aboutPage', 'quote')}
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-2 font-mono text-xs">
              <div className="text-[10px] text-[#8E8D88] dark:text-[#737373] uppercase tracking-widest mb-2">
                {isUrdu ? 'TASDEEQ SHUDA LINKS' : 'VERIFIED ARCHIVES'}
              </div>
              <div>
                <a
                  href="https://github.com/GitByHamza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#059669] dark:text-[#10B981] hover:underline flex items-center gap-1"
                >
                  GitHub Profile (GitByHamza) <ArrowUpRight size={13} />
                </a>
              </div>
              <div>
                <a
                  href="https://toolkito.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#059669] dark:text-[#10B981] hover:underline flex items-center gap-1"
                >
                  Live Micro SaaS (toolkito.app) <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Detailed Longform Chapters (8 cols) */}
          <div className="lg:col-span-8 space-y-16 lg:pl-4 font-serif text-[#575652] dark:text-[#C5C4BE] text-base sm:text-lg leading-relaxed">
            {/* Chapter 1 */}
            <div className="space-y-4">
              <div className="font-mono text-xs font-semibold text-[#059669] dark:text-[#10B981] uppercase tracking-widest">
                {t('aboutPage', 'ch1_title')}
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-[#0F0F0F] dark:text-white uppercase tracking-tight">
                {isUrdu ? 'TEMPLATES SE LE KAR SYSTEMS ENGINEERING TAK' : 'THE TRANSITION FROM WEBSITES TO SYSTEMS'}
              </h2>
              <p>{t('aboutPage', 'ch1_p1')}</p>
              <p>{t('aboutPage', 'ch1_p2')}</p>
            </div>

            {/* Chapter 2 */}
            <div className="space-y-4 pt-8 border-t border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.1)]">
              <div className="font-mono text-xs font-semibold text-[#059669] dark:text-[#10B981] uppercase tracking-widest">
                {t('aboutPage', 'ch2_title')}
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-[#0F0F0F] dark:text-white uppercase tracking-tight">
                {isUrdu ? 'ENTERPRISE SCALE: MYLS SWITZERLAND PLATFORM' : 'SCALING & REFACTORING: THE MYLS SWITZERLAND PLATFORM'}
              </h2>
              <p>{t('aboutPage', 'ch2_p1')}</p>
              <div className="p-5 bg-white dark:bg-[#141414] border border-[rgba(15,15,15,0.12)] dark:border-[rgba(255,255,255,0.1)] space-y-3 font-mono text-xs text-[#0F0F0F] dark:text-white">
                <div className="font-bold text-[#059669] dark:text-[#10B981] uppercase tracking-wider">
                  {isUrdu ? 'LIVE PRODUCTION RESPONSIBILITIES:' : 'KEY FACTUAL ENGINEERING RESPONSIBILITIES:'}
                </div>
                <ul className="space-y-2 list-disc list-inside text-[#575652] dark:text-[#A3A29E] font-sans text-sm">
                  <li>
                    <strong>Monolith Modernization:</strong>{' '}
                    {isUrdu ? 'Legacy PHP Laravel 8 codebase ko modern Laravel 12 mein migrate kiya.' : 'Migrated legacy PHP Laravel 8 codebase to modern PHP Laravel 12.'}
                  </li>
                  <li>
                    <strong>Frontend Evolution:</strong>{' '}
                    {isUrdu ? 'Legacy Vue 2 UI ko modern Vue 3 (Composition API) mein upgrade kiya.' : 'Upgraded legacy Vue 2 UI into Vue 3 utilizing the modern Composition API.'}
                  </li>
                  <li>
                    <strong>Database Architecture:</strong>{' '}
                    {isUrdu ? 'Multi-tenant scale ke liye MySQL schema ko PostgreSQL mein re-architect kiya.' : 'Redesigned underlying schema architecture from MySQL to PostgreSQL for multi-tenant scalability.'}
                  </li>
                  <li>
                    <strong>Access Control:</strong>{' '}
                    {isUrdu ? 'Spatie permissions ke sath granular multi-tenant RBAC implement kiya.' : 'Implemented granular, multi-tenant role-based access control (RBAC) via Spatie permissions.'}
                  </li>
                  <li>
                    <strong>Direct APIs:</strong>{' '}
                    {isUrdu ? '37+ global directory platforms ke darmiyan high-throughput REST APIs engineer kiye.' : 'Built resilient direct REST APIs to eliminate fragile third-party aggregators.'}
                  </li>
                </ul>
              </div>
              <p>{t('aboutPage', 'ch2_p2')}</p>
            </div>

            {/* Chapter 3 */}
            <div className="space-y-4 pt-8 border-t border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.1)]">
              <div className="font-mono text-xs font-semibold text-[#059669] dark:text-[#10B981] uppercase tracking-widest">
                {t('aboutPage', 'ch3_title')}
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-[#0F0F0F] dark:text-white uppercase tracking-tight">
                {isUrdu ? 'COMMERCIAL SYSTEMS AUR COMPLETE HANDOVER' : 'PURPOSE-BUILT COMMERCIAL OPERATING SYSTEMS'}
              </h2>
              <p>{t('aboutPage', 'ch3_p1')}</p>
              <p>{t('aboutPage', 'ch3_p2')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Technical Craft Grid ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.1)] bg-[#FAF9F5] dark:bg-[#111111]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#059669] dark:text-[#10B981] font-semibold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#059669] dark:bg-[#10B981] inline-block" />
              {t('aboutPage', 'stack_title')}
            </div>
            <h2 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-white leading-[0.9]">
              {isUrdu ? 'TOOLS AUR ARCHITECTURAL BUNIYAD' : 'TOOLS & ARCHITECTURAL FOUNDATION'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
            {technicalStack.map((group, idx) => (
              <div
                key={idx}
                className="p-6 bg-white dark:bg-[#141414] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.15)] space-y-4"
              >
                <div className="font-bold text-[#0F0F0F] dark:text-white pb-2 border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] text-[11px] tracking-wider">
                  {group.category}
                </div>
                <ul className="space-y-2 text-[#575652] dark:text-[#A3A29E]">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#059669] dark:bg-[#10B981]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom Navigation CTA ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-20 text-center bg-[#F6F5F0] dark:bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-[#0F0F0F] dark:text-white">
            {t('aboutPage', 'cta_title')}
          </h3>
          <p className="font-serif text-[#575652] dark:text-[#A3A29E] text-base sm:text-lg max-w-xl mx-auto">
            {t('aboutPage', 'cta_sub')}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-outline text-xs border-[#059669] text-[#059669] hover:bg-[#059669] hover:text-white dark:border-[#10B981] dark:text-[#10B981] dark:hover:bg-[#10B981] dark:hover:text-black">
              {t('aboutPage', 'cta_btn')} <ArrowRight size={14} />
            </Link>
            <Link to="/work" className="btn-outline text-xs">
              {isUrdu ? 'WORK ARCHIVE DEKHEIN' : 'VIEW WORK ARCHIVE'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

