import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, ArrowLeft, CheckCircle2, Lock, Clock, FileText } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export default function TechRetailTerms() {
  const { isUrdu } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full bg-[#F6F5F0] dark:bg-[#0F0F11] min-h-screen py-16 px-4 sm:px-8 font-mono text-xs text-[#0F0F0F] dark:text-[#EDECE6] transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Back Link */}
        <div>
          <Link
            to="/solutions/tech-retail"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#059669] dark:text-[#10B981] hover:underline uppercase tracking-wider"
          >
            <ArrowLeft size={14} />
            <span>
              {isUrdu ? 'TECH-RETAIL PACKAGES PAR WAPIS JAYEIN' : 'BACK TO TECH-RETAIL SOLUTION & PRICING'}
            </span>
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-4 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] pb-8">
          <div className="tag-green">
            <ShieldCheck size={14} />
            <span>
              {isUrdu ? 'CONTRACTUAL SCOPE AGREEMENT AUR SLA GUARANTEE' : 'CONTRACTUAL SCOPE AGREEMENT & SLA GUARANTEE'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6] leading-[0.95]">
            {isUrdu ? 'SCOPE BOUNDARIES, CODE MALKIAT AUR WARRANTIES' : 'SCOPE BOUNDARIES, CODE OWNERSHIP & WARRANTIES'}
          </h1>

          <p className="font-serif text-sm sm:text-base text-[#575652] dark:text-[#9B9A95] leading-relaxed">
            {isUrdu
              ? 'TeXCodes custom e-commerce aur retail OS deployments ke liye contractual scope, GitHub repository transfer protocol aur technical warranty sharaait.'
              : 'Written contractual scope definitions, revision policies, GitHub repository ownership transfer protocol, and warranty terms for TeXCodes custom e-commerce and retail OS deployments.'}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 font-sans text-sm text-[#575652] dark:text-[#9B9A95] leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-display uppercase text-[#0F0F0F] dark:text-[#EDECE6] tracking-wide flex items-center gap-2">
              <span className="text-[#059669] dark:text-[#10B981] font-mono">01.</span>{' '}
              {isUrdu ? 'Package Scope Boundaries' : 'Package Scope Boundaries'}
            </h2>
            <p>
              {isUrdu
                ? 'Har deployment mutafiqa milestone specifications ke mutabiq execute ki jati hai taake waqt par guaranteed delivery aur fixed pricing barqarar rahe:'
                : 'Each deployment is executed strictly according to the agreed milestone specifications. To ensure rapid delivery, high performance, and fixed pricing without scope creep:'}
            </p>
            <div className="bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] p-5 space-y-3 font-mono text-xs text-[#0F0F0F] dark:text-[#EDECE6]">
              <div>
                <span className="font-bold text-[#059669] dark:text-[#10B981]">
                  • Starter Store (PKR 280,000 – 350,000 / 10–14 {isUrdu ? 'Din' : 'Days'}):
                </span>
                <p className="text-[#575652] dark:text-[#9B9A95] mt-0.5">
                  {isUrdu
                    ? 'Single storefront, 50 SKUs tak initial setup, basic stock manager, direct WhatsApp dispatch. Layout branding managed rehti hai.'
                    : 'Single storefront, up to 50 SKUs initial setup, basic admin stock updates, direct WhatsApp dispatch. Layout branding remains managed.'}
                </p>
              </div>

              <div className="pt-2 border-t border-[rgba(15,15,15,0.08)] dark:border-[rgba(255,255,255,0.08)]">
                <span className="font-bold text-[#059669] dark:text-[#10B981]">
                  • Growth Retailer (PKR 550,000 – 780,000 / 3–4 {isUrdu ? 'Hafte' : 'Weeks'}):
                </span>
                <p className="text-[#575652] dark:text-[#9B9A95] mt-0.5">
                  {isUrdu
                    ? 'PC Builder compatibility engine, 3 branches tak inventory tracking, serial number RMA warranty logging, aur promotional sales banner manager.'
                    : 'PC Builder compatibility engine, multi-branch inventory tracking (up to 3 nodes), serial number warranty logging, self-managed promo banners & flash sales.'}
                </p>
              </div>

              <div className="pt-2 border-t border-[rgba(15,15,15,0.08)] dark:border-[rgba(255,255,255,0.08)]">
                <span className="font-bold text-[#059669] dark:text-[#10B981]">
                  • Enterprise Custom (PKR 950,000 – 1,450,000 / ~6 {isUrdu ? 'Hafte' : 'Weeks'}):
                </span>
                <p className="text-[#575652] dark:text-[#9B9A95] mt-0.5">
                  {isUrdu
                    ? 'La-mehdood branches, custom ERP/POS API integrations, mukammal dynamic theme CMS, granular staff permissions, aur 30-day priority warranty.'
                    : 'Unlimited branches, custom ERP/POS API integrations, complete theme control CMS, granular staff permissions, 30-day priority engineering warranty.'}
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-display uppercase text-[#0F0F0F] dark:text-[#EDECE6] tracking-wide flex items-center gap-2">
              <span className="text-[#059669] dark:text-[#10B981] font-mono">02.</span>{' '}
              {isUrdu ? '100% Client Code aur Database Malkiat Transfer' : '100% Client Code & Database Ownership Transfer'}
            </h2>
            <p>
              {isUrdu
                ? 'Band SaaS platforms ke bar-aks jo aapka data qaid kar lete hain, TeXCodes 100% Client Ownership Guarantee par kaam karta hai:'
                : 'Unlike closed SaaS platforms that hold your storefront and customer data hostage, TeXCodes operates on a 100% Client Ownership Guarantee:'}
            </p>
            <div className="p-5 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-2 font-mono text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                <span>
                  {isUrdu
                    ? 'Final milestone payment par mukammal GitHub repository invitation aur transfer.'
                    : 'Full GitHub repository invitation & transfer upon final milestone settlement.'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                <span>
                  {isUrdu
                    ? 'PostgreSQL database ka direct administrative access raw SQL export ki salahiyat ke sath.'
                    : 'Direct administrative access to the PostgreSQL database with raw SQL export capability.'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                <span>
                  {isUrdu
                    ? 'Zero vendor lock-in: Aap kisi bhi waqt apne codebase ko aazadana host ya extend kar sakte hain.'
                    : 'Zero vendor lock-in: You may host, modify, or extend the codebase independently at any time.'}
                </span>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-display uppercase text-[#0F0F0F] dark:text-[#EDECE6] tracking-wide flex items-center gap-2">
              <span className="text-[#059669] dark:text-[#10B981] font-mono">03.</span>{' '}
              {isUrdu ? '30 Din Ki Post-Launch Warranty aur Support' : '30-Day Post-Launch Warranty & Support'}
            </h2>
            <p>
              {isUrdu
                ? 'Tamam tiers mein launch ke baad 30 din ki technical warranty shamil hai. Delivered scope se mutaliqa koi bhi bug priority par bila muawza theek kiya jayega.'
                : 'All tiers include a 30-day technical warranty period post-deployment. Any software bugs, layout discrepancies, or unexpected regressions directly related to the delivered scope will be resolved with priority engineering at zero additional charge.'}
            </p>
          </section>
        </div>

        {/* Footer Link */}
        <div className="pt-8 border-t border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] flex items-center justify-between font-mono text-xs">
          <Link to="/solutions/tech-retail" className="text-[#059669] dark:text-[#10B981] font-bold hover:underline">
            {isUrdu ? '← Solution Packages Par Wapis Jayein' : '← Return to Solution Packages'}
          </Link>
          <a
            href="https://wa.me/923091824000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0F0F0F] dark:text-[#EDECE6] hover:text-[#059669] dark:hover:text-[#10B981]"
          >
            {isUrdu ? 'WhatsApp Par Direct Rabta' : 'Direct Inquiries via WhatsApp'}
          </a>
        </div>
      </div>
    </div>
  )
}

