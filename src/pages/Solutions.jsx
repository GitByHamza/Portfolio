import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Cpu, ShoppingBag, Layers, CheckCircle2, XCircle, ShieldCheck, Terminal } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { FadeIn, StaggerContainer, StaggerItem } from '../components/motion/MotionReveal'

export default function Solutions() {
  const { t, isUrdu } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const comparisonItems = [
    {
      dimension: isUrdu ? 'Code aur IP ki Malkiat' : 'Code & IP Ownership',
      texcodes: isUrdu
        ? '100% Client Ownership. Mukammal GitHub repo transfer aur azad PostgreSQL database control.'
        : '100% Client Ownership. Full GitHub repo transfer and independent PostgreSQL database control.',
      cms: isUrdu
        ? 'Vendor lock-in. Agar aap monthly subscription band karein to aapka data aur store band ho jata hai.'
        : 'Vendor lock-in. If you cancel your monthly store subscription, your store and customer data are inaccessible.',
      badge: '100% IP TRANSFER',
    },
    {
      dimension: isUrdu ? 'Platform Fees aur Commission' : 'Platform Fees & Revenue Cut',
      texcodes: isUrdu
        ? '0% sales commission. Har sale par 100% munafa aapka apna. Zero monthly transaction fees.'
        : '0% sales commission. 100% of your revenue stays in your business. No monthly transaction cut.',
      cms: isUrdu
        ? 'Har order par transaction percentage fees + mehangay plugins ke mahana charges.'
        : 'Platform transaction fees on every sale + recurring monthly costs for essential third-party plugins.',
      badge: 'ZERO PLATFORM TAX',
    },
    {
      dimension: isUrdu ? 'Custom Operational Logic' : 'Custom Operational Logic',
      texcodes: isUrdu
        ? 'Bespoke PC Builder compatibility calculation, multi-branch inventory sync, aur WhatsApp automated dispatch.'
        : 'Custom PC Builder compatibility validation, multi-branch stock sync, and direct WhatsApp dispatch.',
      cms: isUrdu
        ? 'Aam theme templates aur plugin restrictions mein qaid.'
        : 'Locked into generic theme templates and constrained by marketplace plugin limitations.',
      badge: 'TAILORED LOGIC',
    },
    {
      dimension: isUrdu ? 'Security aur Architecture' : 'Security & Architecture',
      texcodes: isUrdu
        ? 'Modern Next.js SSR, isolated relational database, aur vulnerable third-party plugins se mukammal chhutkara.'
        : 'Serverless deployment, isolated relational database, and zero vulnerable third-party plugin exploits.',
      cms: isUrdu
        ? 'Plugin vulnerabilities ka khatra, spam attacks, aur auto-updates ke baad tootne wale checkouts.'
        : 'Frequent plugin security vulnerabilities, spam injections, and broken checkouts after auto-updates.',
      badge: 'ENTERPRISE STABILITY',
    },
  ]

  return (
    <div className="w-full bg-[#F6F5F0] dark:bg-[#0F0F11] min-h-screen text-[#0F0F0F] dark:text-[#EDECE6] transition-colors duration-200">
      {/* ─── Page Header ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#161619] relative overflow-hidden">
        {/* Subtle decorative radial emerald glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

        <FadeIn className="max-w-7xl mx-auto space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#059669] dark:text-[#10B981] font-semibold bg-[#ECFDF5] dark:bg-[rgba(16,185,129,0.15)] px-3 py-1 border border-[#059669]/25 dark:border-[#10B981]/30">
            <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]" />
            {t('solutionsPage', 'badge')}
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6] leading-[0.88] max-w-5xl">
            {t('solutionsPage', 'title_p1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] via-[#10B981] to-[#34D399] drop-shadow-xs">
              {t('solutionsPage', 'title_accent')}
            </span>
          </h1>

          <p className="font-serif text-lg sm:text-xl text-[#575652] dark:text-[#9B9A95] max-w-3xl leading-relaxed">
            {t('solutionsPage', 'sub')}
          </p>
        </FadeIn>
      </section>

      {/* ─── Featured Flagship Solution: Computer & CCTV Retail OS ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)]">
        <FadeIn className="max-w-7xl mx-auto">
          <div className="card-hover-guided border-t-4 border-t-[#059669] dark:border-t-[#10B981] border-x border-b border-[#08966a] bg-white dark:bg-[#161619] p-6 sm:p-12 shadow-md space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <span className="tag-green">{t('solutionsPage', 'flagship_badge')}</span>
              <span className="text-[#059669] dark:text-[#10B981] font-semibold bg-[#ECFDF5] dark:bg-[#10B981]/15 px-2.5 py-0.5 border border-[#08966a]/30">
                OFFER CODE: TXS-RETAIL-OS
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-5">
                <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6] leading-[0.95]">
                  {t('solutionsPage', 'flagship_title')}
                </h2>
                <p className="font-serif text-base sm:text-lg text-[#575652] dark:text-[#9B9A95] leading-relaxed">
                  {t('solutionsPage', 'flagship_sub')}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs text-[#0F0F0F] dark:text-[#EDECE6]">
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
                  <Link to="/solutions/tech-retail" className="btn-blue text-xs shadow-sm group">
                    <span>{t('solutionsPage', 'flagship_cta')}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href="https://store-demo-eight.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-semibold text-[#059669] dark:text-[#10B981] hover:underline flex items-center gap-1 group"
                  >
                    <span>{t('solutionsPage', 'flagship_demo')}</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Right Tier Summary Box */}
              <div className="lg:col-span-5 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[#08966a]/30 p-6 space-y-4 font-mono text-xs">
                <div className="text-[10px] text-[#059669] dark:text-[#10B981] uppercase tracking-widest border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-2 font-bold flex items-center justify-between">
                  <span>{t('solutionsPage', 'tiers_title')}</span>
                  <span className="text-[9px] text-[#8E8D88] dark:text-[#6A6965]">FIXED INVESTMENT</span>
                </div>

                <div className="space-y-3">
                  <div className="card-hover-guided p-3 bg-white dark:bg-[#161619] border border-[#08966a]">
                    <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6]">{t('solutionsPage', 'tier1_title')}</div>
                    <div className="text-[#059669] dark:text-[#10B981] font-semibold text-sm">{t('solutionsPage', 'tier1_price')}</div>
                    <div className="text-[11px] text-[#575652] dark:text-[#9B9A95]">{t('solutionsPage', 'tier1_sub')}</div>
                  </div>

                  <div className="card-hover-guided p-3 bg-[#ECFDF5]/60 dark:bg-[#10B981]/10 border-2 border-[#08966a] dark:border-[#10B981] shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0F0F0F] dark:text-[#EDECE6]">{t('solutionsPage', 'tier2_title')}</span>
                      <span className="text-[9px] font-bold text-white bg-[#059669] dark:bg-[#10B981] px-2 py-0.5 uppercase tracking-wider">{t('solutionsPage', 'tier2_popular')}</span>
                    </div>
                    <div className="text-[#059669] dark:text-[#10B981] font-bold text-sm mt-0.5">{t('solutionsPage', 'tier2_price')}</div>
                    <div className="text-[11px] text-[#575652] dark:text-[#9B9A95]">{t('solutionsPage', 'tier2_sub')}</div>
                  </div>

                  <div className="card-hover-guided p-3 bg-white dark:bg-[#161619] border border-[#08966a]">
                    <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6]">{t('solutionsPage', 'tier3_title')}</div>
                    <div className="text-[#059669] dark:text-[#10B981] font-semibold text-sm">{t('solutionsPage', 'tier3_price')}</div>
                    <div className="text-[11px] text-[#575652] dark:text-[#9B9A95]">{t('solutionsPage', 'tier3_sub')}</div>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-[#8E8D88] dark:text-[#6A6965]">
                  {isUrdu
                    ? 'Tamam packages mein 100% source code aur database ownership transfer shamil hai.'
                    : 'All tiers include 100% source code & database ownership transfer upon final settlement.'}
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
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#059669] dark:text-[#10B981] font-semibold mb-2">
              {isUrdu ? 'MAZEED COMMERCIAL SALAHIYAT' : 'ADDITIONAL COMMERCIAL CAPABILITIES'}
            </div>
            <h2 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6] leading-[0.9]">
              {isUrdu ? 'ENGINEERED DIGITAL SYSTEMS' : 'ENGINEERED DIGITAL SYSTEMS'}
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Custom Commerce */}
            <StaggerItem>
              <div className="card-hover-guided h-full p-8 bg-white dark:bg-[#161619] border border-[#08966a] space-y-5">
                <div className="w-10 h-10 rounded-sm bg-[#ECFDF5] dark:bg-[#10B981]/15 flex items-center justify-center text-[#059669] dark:text-[#10B981]">
                  <ShoppingBag size={22} />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6]">
                  {isUrdu ? 'CUSTOM HEADLESS E-COMMERCE' : 'CUSTOM HEADLESS E-COMMERCE'}
                </h3>
                <p className="font-serif text-[#575652] dark:text-[#9B9A95] text-sm sm:text-base leading-relaxed">
                  {isUrdu
                    ? 'Aise brands ke liye jo slow Shopify themes ya WooCommerce plugin bloat se aagay nikalna chahte hain. Hum fast Next.js stores banate hain bina kisi commission tax ke.'
                    : 'For brands outgrowing cookie-cutter Shopify themes or suffering from slow WooCommerce plugin bloat. We engineer custom storefronts with instantaneous page navigation, tailored checkout flows, and zero recurring percentage fees taken from your gross revenue.'}
                </p>
                <ul className="font-mono text-xs text-[#575652] dark:text-[#9B9A95] space-y-2 list-disc list-inside">
                  <li>{isUrdu ? 'Custom Next.js App Router storefronts' : 'Custom Next.js App Router storefronts'}</li>
                  <li>{isUrdu ? 'Orders par 0% sales commission' : 'Zero platform sales tax on transactions'}</li>
                  <li>{isUrdu ? 'WhatsApp direct dispatch aur order confirmation' : 'Direct WhatsApp order confirmation & dispatch'}</li>
                  <li>{isUrdu ? 'Tailored product filteration aur specifications' : 'Tailored product filtering & specification matrices'}</li>
                </ul>
                <div className="pt-2">
                  <Link to="/contact" className="btn-outline text-xs group hover:border-[#08966a]">
                    <span>{isUrdu ? 'CUSTOM COMMERCE KI INQUIRY KAREIN' : 'INQUIRE ABOUT CUSTOM COMMERCE'}</span>
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
                <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6]">
                  {isUrdu ? 'AI AUTOMATIONS AUR BUSINESS OS' : 'AI AUTOMATIONS & INTERNAL BUSINESS OS'}
                </h3>
                <p className="font-serif text-[#575652] dark:text-[#9B9A95] text-sm sm:text-base leading-relaxed">
                  {isUrdu
                    ? 'Khas tor par aapke office aur dukan ke liye software jo manual paperwork aur messy spreadsheets ko khatam karta hai. 24/7 AI agents aur multi-branch inventory ERPs.'
                    : 'Purpose-built operational software replacing manual paperwork, messy spreadsheets, and disconnected tools. From 24/7 WhatsApp AI voice and chat agents to comprehensive hospital and inventory management ERPs.'}
                </p>
                <ul className="font-mono text-xs text-[#575652] dark:text-[#9B9A95] space-y-2 list-disc list-inside">
                  <li>{isUrdu ? 'Multi-guard Role-Based Access Control (RBAC)' : 'Multi-guard Role-Based Access Control (RBAC)'}</li>
                  <li>{isUrdu ? 'WhatsApp Voice & Text conversational agents' : 'WhatsApp Voice & Text conversational agents'}</li>
                  <li>{isUrdu ? 'Custom administrative analytics aur reporting' : 'Custom administrative analytics & reporting'}</li>
                  <li>{isUrdu ? 'PostgreSQL strict relational schema integrity' : 'PostgreSQL data modeling with strict relational integrity'}</li>
                </ul>
                <div className="pt-2">
                  <Link to="/contact" className="btn-outline text-xs group hover:border-[#08966a]">
                    <span>{isUrdu ? 'INTERNAL SYSTEMS KI INQUIRY KAREIN' : 'INQUIRE ABOUT INTERNAL SYSTEMS'}</span>
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
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#059669] dark:text-[#10B981] font-semibold mb-2">
              THE ARCHITECTURAL BENCHMARK
            </div>
            <h2 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6] leading-[0.9]">
              {t('solutionsPage', 'matrix_title')}
            </h2>
          </div>

          <div className="border border-[#08966a] bg-white dark:bg-[#161619] overflow-hidden shadow-sm card-hover-guided">
            <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#1F1F24] font-mono text-xs font-bold uppercase tracking-wider text-[#575652] dark:text-[#9B9A95]">
              <div className="p-4 md:col-span-4 hidden md:block">{t('solutionsPage', 'matrix_feature')}</div>
              <div className="p-4 md:col-span-4 text-[#059669] dark:text-[#10B981] bg-[#ECFDF5] dark:bg-[#10B981]/15 border-l md:border-r border-[#08966a]/20 dark:border-[#08966a]/30 font-extrabold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#10B981]" />
                {t('solutionsPage', 'matrix_txs')}
              </div>
              <div className="p-4 md:col-span-4">
                {t('solutionsPage', 'matrix_shopify')}
              </div>
            </div>

            <div className="divide-y divide-[rgba(15,15,15,0.1)] dark:divide-[rgba(255,255,255,0.1)] font-mono text-xs">
              {comparisonItems.map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-5 gap-3 md:gap-0 items-center">
                  <div className="md:col-span-4 pr-4">
                    <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6]">{item.dimension}</div>
                    <span className="tag-green text-[9px] mt-1 inline-block">{item.badge}</span>
                  </div>

                  <div className="md:col-span-4 md:px-4 text-[#0F0F0F] dark:text-[#EDECE6] flex items-start gap-2 bg-[#ECFDF5]/50 dark:bg-[#10B981]/10 py-2 border-l border-r border-[#08966a]/20 dark:border-[#10B981]/20 font-medium">
                    <CheckCircle2 size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                    <span>{item.texcodes}</span>
                  </div>

                  <div className="md:col-span-4 md:px-4 text-[#575652] dark:text-[#9B9A95] flex items-start gap-2 py-2">
                    <XCircle size={16} className="text-[#8E8D88] dark:text-[#6A6965] shrink-0 mt-0.5" />
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
          <h3 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6]">
            {t('solutionsPage', 'cta_box_title')}
          </h3>
          <p className="font-serif text-[#575652] dark:text-[#9B9A95] text-base sm:text-lg max-w-xl mx-auto">
            {t('solutionsPage', 'cta_box_desc')}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/923091824000?text=Hello%20Hamza%2C%20I%20reviewed%20your%20commercial%20solutions%20and%20want%20to%20discuss%20a%20build."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-blue text-xs shadow-sm group"
            >
              <span>{t('solutionsPage', 'cta_box_btn')}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link to="/contact" className="btn-outline text-xs group hover:border-[#08966a]">
              <span>{t('solutionsPage', 'cta_box_contact')}</span>
              <span className="group-hover:translate-x-1 transition-transform inline-block ml-1">→</span>
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
