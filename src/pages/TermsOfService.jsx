import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const TermsOfService = () => {
  const { t, isUrdu } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="w-full bg-[#F6F5F0] dark:bg-[#0A0A0A] min-h-screen py-16 px-4 sm:px-8 font-mono text-xs text-[#0F0F0F] dark:text-[#EDECE6] transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#059669] dark:text-[#10B981] hover:underline uppercase tracking-wider"
          >
            <ArrowLeft size={14} />
            <span>{isUrdu ? 'MAIN INDEX PAR WAPIS JAYEIN' : 'RETURN TO HOME'}</span>
          </Link>
        </div>

        <div className="space-y-4 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.1)] pb-8">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#059669] dark:text-[#10B981] font-semibold flex items-center gap-2">
            <ShieldCheck size={14} />
            {t('legal', 'last_updated')}
          </div>

          <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-white leading-[0.9]">
            {t('legal', 'terms_title')}
          </h1>
        </div>

        <div className="space-y-8 font-serif text-sm sm:text-base text-[#575652] dark:text-[#C5C4BE] leading-relaxed">
          <section className="space-y-2 font-sans">
            <h2 className="text-xl font-display uppercase text-[#0F0F0F] dark:text-white tracking-wide">
              1. {isUrdu ? 'Sharaait Ki Qubooliat' : 'Acceptance of Terms'}
            </h2>
            <p className="font-serif">
              {isUrdu
                ? 'Is website ko access aur istemal kar ke aap hamari sharaait aur ahkamaat ko qubool karte hain. Agar aap in sharaait se muttfiq nahi hain to barah-e-karam service istemal na karein.'
                : 'By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.'}
            </p>
          </section>

          <section className="space-y-2 font-sans">
            <h2 className="text-xl font-display uppercase text-[#0F0F0F] dark:text-white tracking-wide">
              2. {isUrdu ? 'Client Code aur IP Malkiat' : 'Client Code & IP Ownership'}
            </h2>
            <p className="font-serif">
              {isUrdu
                ? 'Client commissions aur bespoke solutions (jaisa ke Tech-Retail OS) mukammal GitHub repository aur database transfer ke sath deliver kiye jate hain. Final milestone payment par client apne codebase aur data ka mukammal malik hota hai.'
                : 'Client commissions and bespoke commercial solutions (such as Tech-Retail OS) are delivered with complete GitHub repository transfer and database control upon final milestone settlement.'}
            </p>
          </section>

          <section className="space-y-2 font-sans">
            <h2 className="text-xl font-display uppercase text-[#0F0F0F] dark:text-white tracking-wide">
              3. {isUrdu ? 'Rabta aur Maloomat' : 'Contact Information'}
            </h2>
            <p className="font-serif">
              {t('legal', 'contact_email')}
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

export default TermsOfService

