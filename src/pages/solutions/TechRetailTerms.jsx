import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, ArrowLeft, CheckCircle2, Lock, Clock, FileText } from 'lucide-react'

export default function TechRetailTerms() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full bg-[#F6F5F0] min-h-screen py-16 px-4 sm:px-8 font-mono text-xs text-[#0F0F0F]">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Back Link */}
        <div>
          <Link
            to="/solutions/tech-retail"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1A4BFF] hover:underline uppercase tracking-wider"
          >
            <ArrowLeft size={14} />
            <span>BACK TO TECH-RETAIL SOLUTION & PRICING</span>
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-4 border-b border-[rgba(15,15,15,0.14)] pb-8">
          <div className="tag-blue">
            <ShieldCheck size={14} />
            <span>CONTRACTUAL SCOPE AGREEMENT & SLA GUARANTEE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[#0F0F0F] leading-[0.95]">
            SCOPE BOUNDARIES, CODE OWNERSHIP & WARRANTIES
          </h1>

          <p className="font-serif text-sm sm:text-base text-[#575652] leading-relaxed">
            Written contractual scope definitions, revision policies, GitHub repository ownership transfer protocol, 
            and warranty terms for TeXCodes custom e-commerce and retail OS deployments.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 font-sans text-sm text-[#575652] leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-display uppercase text-[#0F0F0F] tracking-wide flex items-center gap-2">
              <span className="text-[#1A4BFF] font-mono">01.</span> Package Scope Boundaries
            </h2>
            <p>
              Each deployment is executed strictly according to the agreed milestone specifications. 
              To ensure rapid delivery, high performance, and fixed pricing without scope creep:
            </p>
            <div className="bg-white border border-[rgba(15,15,15,0.14)] p-5 space-y-3 font-mono text-xs text-[#0F0F0F]">
              <div>
                <span className="font-bold text-[#1A4BFF]">• Starter Store (PKR 280,000 – 350,000 / 10–14 Days):</span>
                <p className="text-[#575652] mt-0.5">Single storefront, up to 50 SKUs initial setup, basic admin stock updates, direct WhatsApp dispatch. Layout branding remains managed.</p>
              </div>

              <div className="pt-2 border-t border-[rgba(15,15,15,0.08)]">
                <span className="font-bold text-[#1A4BFF]">• Growth Retailer (PKR 550,000 – 780,000 / 3–4 Weeks):</span>
                <p className="text-[#575652] mt-0.5">PC Builder compatibility engine, multi-branch inventory tracking (up to 3 nodes), serial number warranty logging, self-managed promo banners & flash sales.</p>
              </div>

              <div className="pt-2 border-t border-[rgba(15,15,15,0.08)]">
                <span className="font-bold text-[#1A4BFF]">• Enterprise Custom (PKR 950,000 – 1,450,000 / ~6 Weeks):</span>
                <p className="text-[#575652] mt-0.5">Unlimited branches, custom ERP/POS API integrations, complete theme control CMS, granular staff permissions, 30-day priority engineering warranty.</p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-display uppercase text-[#0F0F0F] tracking-wide flex items-center gap-2">
              <span className="text-[#1A4BFF] font-mono">02.</span> 100% Client Code & Database Ownership Transfer
            </h2>
            <p>
              Unlike closed SaaS platforms that hold your storefront and customer data hostage, TeXCodes operates on a 
              <strong> 100% Client Ownership Guarantee</strong>:
            </p>
            <div className="p-5 bg-white border border-[rgba(15,15,15,0.14)] space-y-2 font-mono text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#1A4BFF] shrink-0 mt-0.5" />
                <span>Full GitHub repository invitation & transfer upon final milestone settlement.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#1A4BFF] shrink-0 mt-0.5" />
                <span>Direct administrative access to the PostgreSQL database with raw SQL export capability.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#1A4BFF] shrink-0 mt-0.5" />
                <span>Zero vendor lock-in: You may host, modify, or extend the codebase independently at any time.</span>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-display uppercase text-[#0F0F0F] tracking-wide flex items-center gap-2">
              <span className="text-[#1A4BFF] font-mono">03.</span> 30-Day Post-Launch Warranty & Support
            </h2>
            <p>
              All tiers include a <strong>30-day technical warranty period</strong> post-deployment. 
              Any software bugs, layout discrepancies, or unexpected regressions directly related to the delivered scope 
              will be resolved with priority engineering at zero additional charge.
            </p>
          </section>
        </div>

        {/* Footer Link */}
        <div className="pt-8 border-t border-[rgba(15,15,15,0.14)] flex items-center justify-between font-mono text-xs">
          <Link to="/solutions/tech-retail" className="text-[#1A4BFF] font-bold hover:underline">
            ← Return to Solution Packages
          </Link>
          <a
            href="https://wa.me/923288197775"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0F0F0F] hover:text-[#1A4BFF]"
          >
            Direct Inquiries via WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
