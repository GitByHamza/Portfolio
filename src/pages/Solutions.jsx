import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Cpu, ShoppingBag, Layers, CheckCircle2, XCircle, ShieldCheck, Terminal } from 'lucide-react'

export default function Solutions() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const comparisonItems = [
    {
      dimension: 'Code & IP Ownership',
      texcodes: '100% Client Ownership. Full GitHub repo transfer and independent PostgreSQL database control.',
      cms: 'Vendor lock-in. If you cancel your monthly store subscription, your store and customer data are inaccessible.',
      badge: '100% IP TRANSFER',
    },
    {
      dimension: 'Platform Fees & Revenue Cut',
      texcodes: '0% sales commission. 100% of your revenue stays in your business. No monthly transaction cut.',
      cms: 'Platform transaction fees on every sale + recurring monthly costs for essential third-party plugins.',
      badge: 'ZERO PLATFORM TAX',
    },
    {
      dimension: 'Custom Operational Logic',
      texcodes: 'Custom PC Builder compatibility validation, multi-branch stock sync, and direct WhatsApp dispatch.',
      cms: 'Locked into generic theme templates and constrained by marketplace plugin limitations.',
      badge: 'TAILORED LOGIC',
    },
    {
      dimension: 'Security & Architecture',
      texcodes: 'Serverless deployment, isolated relational database, and zero vulnerable third-party plugin exploits.',
      cms: 'Frequent plugin security vulnerabilities, spam injections, and broken checkouts after auto-updates.',
      badge: 'ENTERPRISE STABILITY',
    },
  ]

  return (
    <div className="w-full bg-[#F6F5F0] min-h-screen">
      {/* ─── Page Header ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#1A4BFF] font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#1A4BFF] inline-block" />
            COMMERCIAL SOFTWARE OFFERINGS
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-display uppercase tracking-tight text-[#0F0F0F] leading-[0.88] max-w-5xl">
            COMMERCIAL SYSTEMS, NOT GENERIC WEBSITES.
          </h1>

          <p className="font-serif text-lg sm:text-xl text-[#575652] max-w-3xl leading-relaxed">
            Custom digital infrastructure engineered around how a business actually operates — unifying online sales, 
            warehouse inventory, physical store counters, and WhatsApp order communication into one cohesive system.
          </p>
        </div>
      </section>

      {/* ─── Featured Flagship Solution: Computer & CCTV Retail OS ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)]">
        <div className="max-w-7xl mx-auto">
          <div className="border border-[rgba(15,15,15,0.18)] bg-white p-6 sm:p-12 shadow-sm space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <span className="tag-blue">FLAGSHIP COMMERCIAL SOLUTION</span>
              <span className="text-[#8E8D88]">OFFER CODE: TXS-RETAIL-OS</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-5">
                <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-[#0F0F0F] leading-[0.95]">
                  COMPUTER, GAMING & CCTV RETAIL OS
                </h2>
                <p className="font-serif text-base sm:text-lg text-[#575652] leading-relaxed">
                  Tailored specifically for established technology and hardware retailers in Pakistan 
                  (Hafeez Centre, Techno City, Hall Road, Dubai Plaza, and multi-branch operations). 
                  Unifies your physical counters, multi-branch stock, and online storefront into a single operational interface.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs text-[#0F0F0F]">
                  <div className="p-3 bg-[#FAF9F5] border border-[rgba(15,15,15,0.1)] flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#1A4BFF] shrink-0" />
                    <span>Real-Time PC Builder Engine</span>
                  </div>
                  <div className="p-3 bg-[#FAF9F5] border border-[rgba(15,15,15,0.1)] flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#1A4BFF] shrink-0" />
                    <span>Multi-Branch Stock Synchronization</span>
                  </div>
                  <div className="p-3 bg-[#FAF9F5] border border-[rgba(15,15,15,0.1)] flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#1A4BFF] shrink-0" />
                    <span>Hardware Serial Number & RMA</span>
                  </div>
                  <div className="p-3 bg-[#FAF9F5] border border-[rgba(15,15,15,0.1)] flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#1A4BFF] shrink-0" />
                    <span>WhatsApp Order & PC Build Share</span>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <Link to="/solutions/tech-retail" className="btn-blue text-xs">
                    INSPECT RETAIL PACKAGES & PRICING <ArrowRight size={14} />
                  </Link>
                  <a
                    href="https://store-demo-eight.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-semibold text-[#1A4BFF] hover:underline flex items-center gap-1"
                  >
                    EXPLORE LIVE STORE DEMO <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Right Tier Summary Box */}
              <div className="lg:col-span-5 bg-[#FAF9F5] border border-[rgba(15,15,15,0.12)] p-6 space-y-4 font-mono text-xs">
                <div className="text-[10px] text-[#8E8D88] uppercase tracking-widest border-b border-[rgba(15,15,15,0.1)] pb-2">
                  OFFER PACKAGES SUMMARY
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-white border border-[rgba(15,15,15,0.1)]">
                    <div className="font-bold text-[#0F0F0F]">STARTER STORE</div>
                    <div className="text-[#1A4BFF] font-semibold text-sm">PKR 280,000 – 350,000</div>
                    <div className="text-[11px] text-[#575652]">Single-location computer & CCTV stores.</div>
                  </div>

                  <div className="p-3 bg-white border-2 border-[#1A4BFF]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0F0F0F]">GROWTH RETAILER</span>
                      <span className="text-[9px] font-bold text-[#1A4BFF] uppercase">MOST POPULAR</span>
                    </div>
                    <div className="text-[#1A4BFF] font-semibold text-sm">PKR 550,000 – 780,000</div>
                    <div className="text-[11px] text-[#575652]">Includes PC Builder compatibility engine & analytics.</div>
                  </div>

                  <div className="p-3 bg-white border border-[rgba(15,15,15,0.1)]">
                    <div className="font-bold text-[#0F0F0F]">ENTERPRISE CUSTOM</div>
                    <div className="text-[#1A4BFF] font-semibold text-sm">PKR 950,000 – 1,450,000</div>
                    <div className="text-[11px] text-[#575652]">Multi-branch warehouse sync, RMA tracking, full custom ERP.</div>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-[#8E8D88]">
                  All tiers include 100% source code & database ownership transfer upon final settlement.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Other Commercial Pillars ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#1A4BFF] font-semibold mb-2">
              ADDITIONAL COMMERCIAL CAPABILITIES
            </div>
            <h2 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-[#0F0F0F] leading-[0.9]">
              ENGINEERED DIGITAL SYSTEMS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Custom Commerce */}
            <div className="p-8 bg-white border border-[rgba(15,15,15,0.14)] space-y-5">
              <ShoppingBag size={24} className="text-[#1A4BFF]" />
              <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-[#0F0F0F]">
                CUSTOM HEADLESS E-COMMERCE
              </h3>
              <p className="font-serif text-[#575652] text-sm sm:text-base leading-relaxed">
                For brands outgrowing cookie-cutter Shopify themes or suffering from slow WooCommerce plugin bloat. 
                We engineer custom storefronts with instantaneous page navigation, tailored checkout flows, 
                and zero recurring percentage fees taken from your gross revenue.
              </p>
              <ul className="font-mono text-xs text-[#575652] space-y-2 list-disc list-inside">
                <li>Custom Next.js App Router storefronts</li>
                <li>Zero platform sales tax on transactions</li>
                <li>Direct WhatsApp order confirmation & dispatch</li>
                <li>Tailored product filtering & specification matrices</li>
              </ul>
              <div className="pt-2">
                <Link to="/contact" className="btn-outline text-xs">
                  INQUIRE ABOUT CUSTOM COMMERCE <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* AI Automations & Internal Business OS */}
            <div className="p-8 bg-white border border-[rgba(15,15,15,0.14)] space-y-5">
              <Layers size={24} className="text-[#1A4BFF]" />
              <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-[#0F0F0F]">
                AI AUTOMATIONS & INTERNAL BUSINESS OS
              </h3>
              <p className="font-serif text-[#575652] text-sm sm:text-base leading-relaxed">
                Purpose-built operational software replacing manual paperwork, messy spreadsheets, and disconnected tools. 
                From 24/7 WhatsApp AI voice and chat agents to comprehensive hospital and inventory management ERPs.
              </p>
              <ul className="font-mono text-xs text-[#575652] space-y-2 list-disc list-inside">
                <li>Multi-guard Role-Based Access Control (RBAC)</li>
                <li>WhatsApp Voice & Text conversational agents</li>
                <li>Custom administrative analytics & reporting</li>
                <li>PostgreSQL data modeling with strict relational integrity</li>
              </ul>
              <div className="pt-2">
                <Link to="/contact" className="btn-outline text-xs">
                  INQUIRE ABOUT INTERNAL SYSTEMS <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Engineering Benchmark Table ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#1A4BFF] font-semibold mb-2">
              THE ARCHITECTURAL BENCHMARK
            </div>
            <h2 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-[#0F0F0F] leading-[0.9]">
              ENGINEERED SOFTWARE VS OFF-THE-SHELF CMS
            </h2>
          </div>

          <div className="border border-[rgba(15,15,15,0.18)] bg-white overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[rgba(15,15,15,0.14)] bg-[#FAF9F5] font-mono text-xs font-bold uppercase tracking-wider text-[#575652]">
              <div className="p-4 md:col-span-4 hidden md:block">DIMENSION</div>
              <div className="p-4 md:col-span-4 text-[#1A4BFF] bg-[#EFF3FF] border-l md:border-r border-[rgba(15,15,15,0.1)]">
                TEXCODES CUSTOM ARCHITECTURE
              </div>
              <div className="p-4 md:col-span-4">
                OFF-THE-SHELF CMS / SHOPIFY
              </div>
            </div>

            <div className="divide-y divide-[rgba(15,15,15,0.1)] font-mono text-xs">
              {comparisonItems.map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-5 gap-3 md:gap-0 items-center">
                  <div className="md:col-span-4 pr-4">
                    <div className="font-bold text-[#0F0F0F]">{item.dimension}</div>
                    <span className="tag-blue text-[9px] mt-1 inline-block">{item.badge}</span>
                  </div>

                  <div className="md:col-span-4 md:px-4 text-[#0F0F0F] flex items-start gap-2 bg-[#EFF3FF]/40 py-2">
                    <CheckCircle2 size={16} className="text-[#1A4BFF] shrink-0 mt-0.5" />
                    <span>{item.texcodes}</span>
                  </div>

                  <div className="md:col-span-4 md:px-4 text-[#575652] flex items-start gap-2 py-2">
                    <XCircle size={16} className="text-[#8E8D88] shrink-0 mt-0.5" />
                    <span>{item.cms}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-[#0F0F0F]">
            READY TO DISCUSS YOUR SYSTEM REQUIREMENTS?
          </h3>
          <p className="font-serif text-[#575652] text-base sm:text-lg max-w-xl mx-auto">
            Book an architecture consultation with lead engineer Hamza to map your workflows and commercial deliverables.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-blue text-xs">
              BOOK ARCHITECTURE CONSULTATION <ArrowRight size={14} />
            </Link>
            <Link to="/solutions/tech-retail" className="btn-outline text-xs">
              VIEW TECH RETAIL OFFER →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
