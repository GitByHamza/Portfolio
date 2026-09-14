import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Cpu, Layers, ShoppingBag } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { FadeIn, StaggerContainer, StaggerItem } from './motion/MotionReveal'

const SolutionsBridgeSection = () => {
  const { isUrdu } = useLanguage()

  const offerings = [
    {
      icon: Cpu,
      title: isUrdu ? 'COMPUTER & CCTV RETAIL OS' : 'COMPUTER & CCTV RETAIL OS',
      desc: isUrdu
        ? 'PC Builder compatibility validation, branch stock sync, aur serial number warranty tracking par mushtamil bespoke retail management engine.'
        : 'Bespoke retail management system with automated PC Builder compatibility validation, branch stock sync, and serial number warranty tracking.',
      link: '/solutions/tech-retail',
      linkText: isUrdu ? 'Retail Solution Offer Inspect Karein' : 'Inspect Retail Solution Offer',
    },
    {
      icon: ShoppingBag,
      title: isUrdu ? 'CUSTOM HIGH-PERFORMANCE COMMERCE' : 'CUSTOM HIGH-PERFORMANCE COMMERCE',
      desc: isUrdu
        ? 'Bari hardware product catalogs, direct WhatsApp order routing aur 100% source code aur database malkiat ke sath tailored storefronts.'
        : 'Engineered storefronts tailored to complex product catalogs, direct WhatsApp order routing, and 100% code and database ownership.',
      link: '/solutions',
      linkText: isUrdu ? 'Commerce Architecture Dekhein' : 'Explore Commerce Architecture',
    },
    {
      icon: Layers,
      title: isUrdu ? 'INTERNAL SYSTEMS & AUTOMATION' : 'INTERNAL SYSTEMS & AUTOMATION',
      desc: isUrdu
        ? 'Custom administrative operating panels, Spatie-style multi-guard staff RBAC permissions aur operational efficiency ke liye automated workflows.'
        : 'Custom administrative operating systems, Spatie-style multi-guard role permissions, and WhatsApp AI agents for operational efficiency.',
      link: '/solutions',
      linkText: isUrdu ? 'Systems Architecture Dekhein' : 'View Systems Architecture',
    },
  ]

  return (
    <section className="w-full bg-[#FAF9F5] dark:bg-[#161619] border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] py-16 sm:py-24 px-4 sm:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeIn direction="up" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] pb-12 mb-12">
          <div className="lg:col-span-8 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#059669] dark:text-[#10B981] font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#059669] dark:bg-[#10B981] inline-block" />
              {isUrdu ? 'BUSINESSES KE LIYE // COMMERCIAL SYSTEMS' : 'FOR BUSINESSES // COMMERCIAL SYSTEMS'}
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6] leading-[0.9]">
              {isUrdu ? 'AAPKE BUSINESS KO SIRF WEBSITE SE ZYADA KI ZAROORAT HAI.' : 'YOUR BUSINESS NEEDS MORE THAN A WEBSITE.'}
            </h2>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <p className="font-serif text-[#575652] dark:text-[#9B9A95] text-sm sm:text-base leading-relaxed">
              {isUrdu
                ? 'Custom digital systems jo aapke karobar ke mutabiq kaam karte hain — online sales, branch inventory sync, counter billing aur WhatsApp automated dispatch ko ek jagah jorne ke liye.'
                : 'Custom digital systems built around how your business actually operates — unifying online sales, inventory synchronization, counter sales, and customer order dispatch into one cohesive operational engine.'}
            </p>
            <div>
              <Link to="/solutions" className="btn-blue text-xs shadow-sm group">
                <span>{isUrdu ? 'TAMAM SOLUTIONS DEKHEIN' : 'EXPLORE ALL SOLUTIONS'}</span>
                <ArrowRight size={14} className="arrow-slide" />
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* 3 Offerings Grid */}
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offerings.map((item, idx) => (
            <StaggerItem
              key={idx}
              className="p-6 sm:p-8 bg-white dark:bg-[#121215] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] flex flex-col justify-between space-y-6 card-hover-guided"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[#8E8D88] dark:text-[#6A6965] font-mono text-xs">
                  <span>0{idx + 1}</span>
                  <item.icon size={18} className="text-[#059669] dark:text-[#10B981]" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6] leading-tight">
                  {item.title}
                </h3>
                <p className="font-serif text-sm text-[#575652] dark:text-[#9B9A95] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(15,15,15,0.08)] dark:border-[rgba(255,255,255,0.08)]">
                <Link
                  to={item.link}
                  className="font-mono text-xs font-semibold text-[#059669] dark:text-[#10B981] hover:underline flex items-center gap-1 group"
                >
                  <span>{item.linkText}</span>
                  <ArrowUpRight size={13} className="arrow-slide" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

export default SolutionsBridgeSection
