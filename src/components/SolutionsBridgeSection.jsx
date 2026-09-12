import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Cpu, Layers, ShoppingBag } from 'lucide-react'

const SolutionsBridgeSection = () => {
  const offerings = [
    {
      icon: Cpu,
      title: 'COMPUTER & CCTV RETAIL OS',
      desc: 'Bespoke retail management system with automated PC Builder compatibility validation, branch stock sync, and serial number warranty tracking.',
      link: '/solutions/tech-retail',
      linkText: 'Inspect Retail Solution Offer',
    },
    {
      icon: ShoppingBag,
      title: 'CUSTOM HIGH-PERFORMANCE COMMERCE',
      desc: 'Engineered storefronts tailored to complex product catalogs, direct WhatsApp order routing, and 100% code and database ownership.',
      link: '/solutions',
      linkText: 'Explore Commerce Architecture',
    },
    {
      icon: Layers,
      title: 'INTERNAL SYSTEMS & AUTOMATION',
      desc: 'Custom administrative operating systems, Spatie-style multi-guard role permissions, and WhatsApp AI agents for operational efficiency.',
      link: '/solutions',
      linkText: 'View Systems Architecture',
    },
  ]

  return (
    <section className="w-full bg-[#FAF9F5] border-b border-[rgba(15,15,15,0.14)] py-16 sm:py-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[rgba(15,15,15,0.14)] pb-12 mb-12">
          <div className="lg:col-span-8 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#1A4BFF] font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#1A4BFF] inline-block" />
              FOR BUSINESSES // COMMERCIAL SYSTEMS
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display uppercase tracking-tight text-[#0F0F0F] leading-[0.9]">
              YOUR BUSINESS NEEDS MORE THAN A WEBSITE.
            </h2>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <p className="font-serif text-[#575652] text-sm sm:text-base leading-relaxed">
              Custom digital systems built around how your business actually operates — unifying online sales, 
              inventory synchronization, counter sales, and customer order dispatch into one cohesive operational engine.
            </p>
            <div>
              <Link to="/solutions" className="btn-blue text-xs">
                EXPLORE ALL SOLUTIONS <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offerings.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 bg-white border border-[rgba(15,15,15,0.14)] flex flex-col justify-between space-y-6 hover:border-[#1A4BFF] transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[#8E8D88] font-mono text-xs">
                  <span>0{idx + 1}</span>
                  <item.icon size={18} className="text-[#1A4BFF]" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-[#0F0F0F] leading-tight">
                  {item.title}
                </h3>
                <p className="font-serif text-sm text-[#575652] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(15,15,15,0.08)]">
                <Link
                  to={item.link}
                  className="font-mono text-xs font-semibold text-[#1A4BFF] hover:underline flex items-center gap-1"
                >
                  {item.linkText} <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SolutionsBridgeSection
