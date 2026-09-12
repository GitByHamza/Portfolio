import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
} from 'lucide-react'

const I18N_DATA = {
  en: {
    hero_badge: 'COMMERCIAL SYSTEM // COMPUTER & CCTV RETAIL OS',
    hero_title_1: 'Sell Computers, CCTV & Tech Hardware',
    hero_title_accent: 'Online & Multi-Branch',
    hero_title_2: 'Without Monthly Platform Commissions',
    hero_sub:
      'Eliminate slow off-the-shelf templates and recurring monthly software subscriptions. We deploy a custom Next.js high-performance retail system featuring a real-time PC Builder compatibility engine, multi-branch warehouse inventory, and automated WhatsApp order dispatch.',
    cta_primary: 'Choose Your Solution Plan',
    cta_secondary: 'Explore Live Store Demo',
    metrics_code: '100% Client Code Ownership',
    metrics_tax: 'Zero Platform Sales Commission',
    metrics_speed: 'Fast Next.js Server Rendering',
    metrics_rma: 'Serial Number & Warranty Tracking',

    plans_title: 'Transparent, Fixed Investment Retail Plans',
    plans_sub: 'Zero monthly sales commissions. 100% client code and database ownership upon completion.',

    starter_name: 'Starter Store',
    starter_desc: 'For single-location computer stores & CCTV shops starting online sales with direct WhatsApp dispatch.',
    starter_price_pkr: 'PKR 280,000 – 350,000',
    starter_price_usd: '~$1,000 – $1,250 USD',
    starter_delivery: '⚡ 10–14 Days Guaranteed Delivery',
    starter_support: 'Optional Hosting & Maintenance: PKR 14,000 / mo',

    growth_name: 'Growth Retailer',
    growth_badge: '★ MOST POPULAR // BEST VALUE',
    growth_desc: 'For established electronics & hardware retailers selling across physical shops and online with custom PC builds.',
    growth_price_pkr: 'PKR 550,000 – 780,000',
    growth_price_usd: '~$2,000 – $2,800 USD',
    growth_delivery: '⚡ 3–4 Weeks Guaranteed Delivery',
    growth_support: 'Optional Managed Hosting & Support: PKR 28,000 / mo',

    enterprise_name: 'Enterprise Custom',
    enterprise_badge: '★ COMPLETE RETAIL OS',
    enterprise_desc: 'For multi-branch retail chains, wholesale hardware distributors, and computer importers operating high volume.',
    enterprise_price_pkr: 'PKR 950,000 – 1,450,000',
    enterprise_price_usd: '~$3,400 – $5,200 USD',
    enterprise_delivery: '⚡ ~6 Weeks Staging & Delivery',
    enterprise_support: 'Dedicated Enterprise Support Retainer: PKR 55,000 / mo',

    whatsapp_cta: 'Claim This Solution on WhatsApp',
    view_terms: 'Review Contract Scope & Warranty Terms →',
  },
  'ur-en': {
    hero_badge: 'COMMERCIAL SYSTEM // COMPUTER & CCTV RETAIL OS',
    hero_title_1: 'Computer, CCTV aur Tech Hardware Bechain',
    hero_title_accent: 'Online aur Multi-Branch',
    hero_title_2: 'Baghair Kisi Mahana Platform Commission Ke',
    hero_sub:
      'Aahista templates aur mehangay monthly software charges par waqt zaya karna band karein. Hum aapke computer aur electronics store ke liye custom Next.js web store deploy karte hain — jisme live PC Builder compatibility, multi-branch stock sync aur WhatsApp automated dispatch shamil hai.',
    cta_primary: 'Apna Retail Plan Muntakhib Karein',
    cta_secondary: 'Live Demo Check Karein',
    metrics_code: '100% Code aur Data Ka Mukammal Ikhtiyar',
    metrics_tax: 'Baghair Kisi Sales Commission Ke',
    metrics_speed: 'Tez Tareen Next.js Server Rendering',
    metrics_rma: 'Serial Number aur Warranty Tracking',

    plans_title: 'Wazeh aur Munasib Retail Packages',
    plans_sub: 'Baghair kisi mahana sales commission ke. Mukammal source code ownership. Apni dukan ke mutabiq plan chunein.',

    starter_name: 'Starter Store',
    starter_desc: 'Single-location computer shops aur CCTV vendors ke liye jo online sales shuru kar rahe hain.',
    starter_price_pkr: 'PKR 280,000 – 350,000',
    starter_price_usd: '~$1,000 – $1,250 USD',
    starter_delivery: '⚡ 10–14 Dinon Mein Guaranteed Delivery',
    starter_support: 'Ikhtiyari Cloud Hosting aur Support: PKR 14,000 / mahana',

    growth_name: 'Growth Retailer',
    growth_badge: '★ SAB SE ZYADA PASANDIDAH // BEHTAREEN VALUE',
    growth_desc: 'Bari electronics aur hardware dukanon ke liye jahan custom gaming PC builds aur physical store sync zaroori hai.',
    growth_price_pkr: 'PKR 550,000 – 780,000',
    growth_price_usd: '~$2,000 – $2,800 USD',
    growth_delivery: '⚡ 3–4 Hafton Mein Guaranteed Delivery',
    growth_support: 'Ikhtiyari Managed Cloud Hosting aur Support: PKR 28,000 / mahana',

    enterprise_name: 'Enterprise Custom',
    enterprise_badge: '★ MUKAMMAL RETAIL OS',
    enterprise_desc: 'Multi-branch retail chains, wholesale distributors aur computer importers ke liye jo bara volume operate karte hain.',
    enterprise_price_pkr: 'PKR 950,000 – 1,450,000',
    enterprise_price_usd: '~$3,400 – $5,200 USD',
    enterprise_delivery: '⚡ ~6 Hafton Mein Staging aur Launch',
    enterprise_support: 'Dedicated Enterprise Support Retainer: PKR 55,000 / mahana',

    whatsapp_cta: 'Yeh Plan WhatsApp Par Book Karein',
    view_terms: 'Mukammal Sharaait aur Guarantees Dekhein →',
  },
}

export default function TechRetailSolution() {
  const [lang, setLang] = useState('en')
  const t = I18N_DATA[lang]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const openWhatsApp = (planName) => {
    const text = encodeURIComponent(
      `Hello TeXCodes team, I am interested in the [${planName}] for my Computer / CCTV retail business. I would like to schedule a demonstration and discuss deployment.`
    )
    window.open(`https://wa.me/923288197775?text=${text}`, '_blank')
  }

  return (
    <div className="w-full bg-[#F6F5F0] min-h-screen">
      {/* ─── Top Language Toggle Bar ─── */}
      <div className="border-b border-[rgba(15,15,15,0.14)] bg-[#FAF9F5] px-4 sm:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1A4BFF]" />
            <span className="text-[#0F0F0F] font-bold uppercase tracking-wider hidden sm:inline">
              TEXCODES RETAIL OS // COMMERCIAL SOLUTION
            </span>
            <span className="text-[#0F0F0F] font-bold uppercase tracking-wider sm:hidden">
              RETAIL OS
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Globe size={13} className="text-[#575652]" />
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 text-[11px] font-bold transition-colors cursor-pointer border ${
                lang === 'en'
                  ? 'bg-[#0F0F0F] text-white border-[#0F0F0F]'
                  : 'bg-white text-[#575652] border-[rgba(15,15,15,0.14)] hover:text-[#0F0F0F]'
              }`}
            >
              ENGLISH
            </button>
            <button
              onClick={() => setLang('ur-en')}
              className={`px-2.5 py-1 text-[11px] font-bold transition-colors cursor-pointer border ${
                lang === 'ur-en'
                  ? 'bg-[#0F0F0F] text-white border-[#0F0F0F]'
                  : 'bg-white text-[#575652] border-[rgba(15,15,15,0.14)] hover:text-[#0F0F0F]'
              }`}
            >
              ROMAN URDU
            </button>
          </div>
        </div>
      </div>

      {/* ─── Hero Section ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)]">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#1A4BFF] font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#1A4BFF] inline-block" />
            {t.hero_badge}
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display uppercase tracking-tight text-[#0F0F0F] leading-[0.9]">
            {t.hero_title_1}{' '}
            <span className="text-[#1A4BFF] block sm:inline">
              {t.hero_title_accent}
            </span>
            <br />
            {t.hero_title_2}
          </h1>

          <p className="font-serif text-lg sm:text-xl text-[#575652] max-w-3xl leading-relaxed">
            {t.hero_sub}
          </p>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 font-mono text-xs">
            <div className="p-4 bg-white border border-[rgba(15,15,15,0.14)] space-y-1">
              <div className="text-[#1A4BFF] font-bold text-sm">100% OWNERSHIP</div>
              <div className="text-[11px] text-[#575652]">{t.metrics_code}</div>
            </div>
            <div className="p-4 bg-white border border-[rgba(15,15,15,0.14)] space-y-1">
              <div className="text-[#1A4BFF] font-bold text-sm">0% COMMISSION</div>
              <div className="text-[11px] text-[#575652]">{t.metrics_tax}</div>
            </div>
            <div className="p-4 bg-white border border-[rgba(15,15,15,0.14)] space-y-1">
              <div className="text-[#1A4BFF] font-bold text-sm">NEXT.JS SPEED</div>
              <div className="text-[11px] text-[#575652]">{t.metrics_speed}</div>
            </div>
            <div className="p-4 bg-white border border-[rgba(15,15,15,0.14)] space-y-1">
              <div className="text-[#1A4BFF] font-bold text-sm">SERIAL RMA</div>
              <div className="text-[11px] text-[#575652]">{t.metrics_rma}</div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-wrap items-center gap-4 font-mono text-xs">
            <a href="#plans" className="btn-blue text-xs">
              {t.cta_primary} <ArrowRight size={14} />
            </a>
            <a
              href="https://store-demo-eight.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-xs"
            >
              {t.cta_secondary} <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── Core System Concept: One System For The Business ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#1A4BFF] font-semibold mb-2">
              SYSTEM ARCHITECTURE
            </div>
            <h2 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-[#0F0F0F] leading-[0.9]">
              ONE UNIFIED SYSTEM FOR THE RETAIL OPERATION
            </h2>
            <p className="font-serif text-base sm:text-lg text-[#575652] max-w-2xl mt-3 leading-relaxed">
              Not just an online catalog. An integrated retail operating environment connecting storefront, 
              warehouse, physical counters, and customer notifications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-6 bg-white border border-[rgba(15,15,15,0.14)] space-y-3">
              <div className="font-bold text-[#0F0F0F] text-sm">01. CUSTOM WEB STOREFRONT</div>
              <p className="font-sans text-xs text-[#575652] leading-relaxed">
                Fast Next.js storefront designed for PC hardware, CCTV kits, and electronics with rich spec sheets and instant filtering.
              </p>
            </div>

            <div className="p-6 bg-white border border-[rgba(15,15,15,0.14)] space-y-3">
              <div className="font-bold text-[#0F0F0F] text-sm">02. PC BUILDER ENGINE</div>
              <p className="font-sans text-xs text-[#575652] leading-relaxed">
                Validates CPU socket (AM5/LGA1700), DDR4/DDR5 RAM, and wattage limits automatically before checkout.
              </p>
            </div>

            <div className="p-6 bg-white border border-[rgba(15,15,15,0.14)] space-y-3">
              <div className="font-bold text-[#0F0F0F] text-sm">03. MULTI-BRANCH STOCK SYNC</div>
              <p className="font-sans text-xs text-[#575652] leading-relaxed">
                Connect physical shops (Hafeez Centre, Techno City, Dubai Plaza) and warehouses in one live inventory panel.
              </p>
            </div>

            <div className="p-6 bg-white border border-[rgba(15,15,15,0.14)] space-y-3">
              <div className="font-bold text-[#0F0F0F] text-sm">04. SERIAL NUMBER & RMA</div>
              <p className="font-sans text-xs text-[#575652] leading-relaxed">
                Track individual GPU, motherboard, and DVR serial numbers from supplier intake to customer invoice and warranty return.
              </p>
            </div>

            <div className="p-6 bg-white border border-[rgba(15,15,15,0.14)] space-y-3">
              <div className="font-bold text-[#0F0F0F] text-sm">05. WHATSAPP AUTO DISPATCH</div>
              <p className="font-sans text-xs text-[#575652] leading-relaxed">
                Pre-formatted customer order summaries and custom PC build spec sheets sent directly to your sales WhatsApp desk.
              </p>
            </div>

            <div className="p-6 bg-white border border-[rgba(15,15,15,0.14)] space-y-3">
              <div className="font-bold text-[#0F0F0F] text-sm">06. 100% CODE & DATA TRANSFER</div>
              <p className="font-sans text-xs text-[#575652] leading-relaxed">
                Full GitHub repository and PostgreSQL database ownership transferred directly to your business account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Live Demo Experience Grid ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#1A4BFF] font-semibold mb-2">
              VERIFIABLE SYSTEM DEMONSTRATION
            </div>
            <h2 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-[#0F0F0F] leading-[0.9]">
              TEST THE LIVE PRODUCTION INTERFACE
            </h2>
            <p className="font-serif text-sm sm:text-base text-[#575652] max-w-2xl mt-2">
              Test actual customer workflows and administrative controls on our hosted sandbox environment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
            <a
              href="https://store-demo-eight.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-white border border-[rgba(15,15,15,0.14)] hover:border-[#1A4BFF] transition-colors group block space-y-3"
            >
              <div className="font-bold text-[#0F0F0F] text-sm flex items-center justify-between">
                <span>01. STOREFRONT DEMO</span>
                <ArrowUpRight size={14} className="text-[#1A4BFF] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="font-sans text-xs text-[#575652]">
                Explore product catalogs, spec filtering, cart logic, and dark aesthetic storefront.
              </p>
            </a>

            <a
              href="https://store-demo-eight.vercel.app/pc-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-white border border-[rgba(15,15,15,0.14)] hover:border-[#1A4BFF] transition-colors group block space-y-3"
            >
              <div className="font-bold text-[#0F0F0F] text-sm flex items-center justify-between">
                <span>02. PC BUILDER ENGINE</span>
                <ArrowUpRight size={14} className="text-[#1A4BFF] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="font-sans text-xs text-[#575652]">
                Test socket matching, wattage calculation, and custom build WhatsApp sharing.
              </p>
            </a>

            <a
              href="https://store-demo-eight.vercel.app/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-white border border-[rgba(15,15,15,0.14)] hover:border-[#1A4BFF] transition-colors group block space-y-3"
            >
              <div className="font-bold text-[#0F0F0F] text-sm flex items-center justify-between">
                <span>03. ADMIN PANEL MATRIX</span>
                <ArrowUpRight size={14} className="text-[#1A4BFF] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="font-sans text-xs text-[#575652]">
                Inspect 1-click admin demo mode, stock updates, orders, and warranty logs.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* ─── Pricing & Packages Tiers ─── */}
      <section id="plans" className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#1A4BFF] font-semibold">
              COMMERCIAL INVESTMENT TIERS
            </div>
            <h2 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-[#0F0F0F] leading-[0.9]">
              {t.plans_title}
            </h2>
            <p className="font-serif text-sm sm:text-base text-[#575652]">
              {t.plans_sub}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start font-mono text-xs">
            {/* 1. Starter Store */}
            <div className="p-8 bg-white border border-[rgba(15,15,15,0.14)] space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="font-bold text-[#0F0F0F] text-base">{t.starter_name}</div>
                <p className="font-sans text-xs text-[#575652] leading-relaxed">
                  {t.starter_desc}
                </p>

                <div className="pt-2 border-t border-[rgba(15,15,15,0.1)]">
                  <div className="text-2xl font-display text-[#0F0F0F]">{t.starter_price_pkr}</div>
                  <div className="text-[11px] text-[#8E8D88]">{t.starter_price_usd}</div>
                  <div className="text-[11px] text-[#1A4BFF] font-semibold mt-1">{t.starter_delivery}</div>
                </div>

                <div className="pt-4 space-y-2.5 text-[11px] text-[#0F0F0F]">
                  <div className="font-bold uppercase text-[#8E8D88] tracking-wider text-[10px]">INCLUDED:</div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#1A4BFF] shrink-0 mt-0.5" />
                    <span>Custom Next.js Web Storefront (Up to 50 SKUs)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#1A4BFF] shrink-0 mt-0.5" />
                    <span>WhatsApp Order Dispatch Integration</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#1A4BFF] shrink-0 mt-0.5" />
                    <span>Basic Admin Stock & Inventory Panel</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#1A4BFF] shrink-0 mt-0.5" />
                    <span>Google Analytics 4 & XML Sitemap Setup</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#1A4BFF] shrink-0 mt-0.5" />
                    <span>100% Client Code & Data Ownership</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[rgba(15,15,15,0.1)] space-y-3">
                <button
                  onClick={() => openWhatsApp('Starter Store (PKR 280,000 – 350,000)')}
                  className="btn-outline w-full justify-center text-xs"
                >
                  <MessageSquare size={13} /> {t.whatsapp_cta}
                </button>
                <div className="text-[10px] text-[#8E8D88] text-center">{t.starter_support}</div>
              </div>
            </div>

            {/* 2. Growth Retailer (Most Popular) */}
            <div className="p-8 bg-white border-2 border-[#1A4BFF] space-y-6 flex flex-col justify-between shadow-md relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1A4BFF] text-white font-mono text-[9px] font-bold px-3 py-0.5 uppercase tracking-wider">
                {t.growth_badge}
              </div>

              <div className="space-y-4">
                <div className="font-bold text-[#0F0F0F] text-base">{t.growth_name}</div>
                <p className="font-sans text-xs text-[#575652] leading-relaxed">
                  {t.growth_desc}
                </p>

                <div className="pt-2 border-t border-[rgba(15,15,15,0.1)]">
                  <div className="text-2xl font-display text-[#1A4BFF]">{t.growth_price_pkr}</div>
                  <div className="text-[11px] text-[#8E8D88]">{t.growth_price_usd}</div>
                  <div className="text-[11px] text-[#1A4BFF] font-semibold mt-1">{t.growth_delivery}</div>
                </div>

                <div className="pt-4 space-y-2.5 text-[11px] text-[#0F0F0F]">
                  <div className="font-bold uppercase text-[#1A4BFF] tracking-wider text-[10px]">EVERYTHING IN STARTER PLUS:</div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#1A4BFF] shrink-0 mt-0.5" />
                    <span className="font-semibold">Interactive PC Builder Compatibility Engine</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#1A4BFF] shrink-0 mt-0.5" />
                    <span>Multi-Branch Stock Synchronization (Up to 3 Branches)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#1A4BFF] shrink-0 mt-0.5" />
                    <span>Hardware Serial Number Tracking (IN_STOCK, SOLD, RMA)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#1A4BFF] shrink-0 mt-0.5" />
                    <span>Self-Managed Promo Banners & Flash Sales Engine</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#1A4BFF] shrink-0 mt-0.5" />
                    <span>Automated PDF Receipt & Invoice Generation</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[rgba(15,15,15,0.1)] space-y-3">
                <button
                  onClick={() => openWhatsApp('Growth Retailer (PKR 550,000 – 780,000)')}
                  className="btn-blue w-full justify-center text-xs"
                >
                  <MessageSquare size={13} /> {t.whatsapp_cta}
                </button>
                <div className="text-[10px] text-[#8E8D88] text-center">{t.growth_support}</div>
              </div>
            </div>

            {/* 3. Enterprise Custom */}
            <div className="p-8 bg-white border border-[rgba(15,15,15,0.14)] space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="font-bold text-[#0F0F0F] text-base">{t.enterprise_name}</div>
                <p className="font-sans text-xs text-[#575652] leading-relaxed">
                  {t.enterprise_desc}
                </p>

                <div className="pt-2 border-t border-[rgba(15,15,15,0.1)]">
                  <div className="text-2xl font-display text-[#0F0F0F]">{t.enterprise_price_pkr}</div>
                  <div className="text-[11px] text-[#8E8D88]">{t.enterprise_price_usd}</div>
                  <div className="text-[11px] text-[#1A4BFF] font-semibold mt-1">{t.enterprise_delivery}</div>
                </div>

                <div className="pt-4 space-y-2.5 text-[11px] text-[#0F0F0F]">
                  <div className="font-bold uppercase text-[#8E8D88] tracking-wider text-[10px]">ALL IN GROWTH PLUS:</div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#1A4BFF] shrink-0 mt-0.5" />
                    <span className="font-semibold">Unlimited Multi-Branch & Warehouse Sync</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#1A4BFF] shrink-0 mt-0.5" />
                    <span>Granular Spatie-Style RBAC (Super Admin, Branch Manager, Staff)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#1A4BFF] shrink-0 mt-0.5" />
                    <span>Custom POS & Accounting API Sync (FBR / POS)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#1A4BFF] shrink-0 mt-0.5" />
                    <span>Full Theme Accent & Content Management CMS</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-[#1A4BFF] shrink-0 mt-0.5" />
                    <span>30-Day Priority Engineering SLA Warranty</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[rgba(15,15,15,0.1)] space-y-3">
                <button
                  onClick={() => openWhatsApp('Enterprise Custom (PKR 950,000 – 1,450,000)')}
                  className="btn-outline w-full justify-center text-xs"
                >
                  <MessageSquare size={13} /> {t.whatsapp_cta}
                </button>
                <div className="text-[10px] text-[#8E8D88] text-center">{t.enterprise_support}</div>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              to="/solutions/tech-retail/terms"
              className="text-xs font-mono font-semibold text-[#1A4BFF] hover:underline"
            >
              {t.view_terms}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
