import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { BUSINESS, LEGAL_EFFECTIVE_DATE } from '../../data/business'

// Dark text with a green underline: the brand green alone is too faint for body text on the light background.
const linkClass =
  'text-[#0F0F0F] dark:text-[#EDECE6] underline decoration-[#059669] dark:decoration-[#10B981] underline-offset-2 hover:text-[#059669] dark:hover:text-[#10B981] transition-colors'

export const LegalLink = ({ href, to, children }) =>
  to ? (
    <Link to={to} className={linkClass}>
      {children}
    </Link>
  ) : (
    <a href={href} className={linkClass}>
      {children}
    </a>
  )

export const LegalSection = ({ number, title, children }) => (
  <section className="space-y-3">
    <h2 className="text-xl font-display uppercase text-[#0F0F0F] dark:text-white tracking-wide">
      {number}. {title}
    </h2>
    <div className="font-serif space-y-3">{children}</div>
  </section>
)

// Business details block for the "Contact us" section of each legal page.
export const LegalContact = () => (
  <address className="not-italic font-mono text-xs sm:text-sm text-[#0F0F0F] dark:text-[#EDECE6] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] p-4 sm:p-5 space-y-1.5 leading-relaxed">
    <div className="font-semibold">{BUSINESS.name}</div>
    <div>Owner: {BUSINESS.owner}</div>
    <div>
      Email: <LegalLink href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</LegalLink>
    </div>
    <div>
      Phone / WhatsApp: <LegalLink href={`tel:${BUSINESS.phoneE164}`}>{BUSINESS.phone}</LegalLink>
    </div>
  </address>
)

export const LegalPage = ({ title, children }) => {
  const { isUrdu } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
    const previousTitle = document.title
    document.title = `${title} — ${BUSINESS.name}`
    return () => {
      document.title = previousTitle
    }
  }, [title])

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

        <header className="space-y-4 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.1)] pb-8">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#059669] dark:text-[#10B981] font-semibold flex items-center gap-2">
            <ShieldCheck size={14} />
            Effective date: {LEGAL_EFFECTIVE_DATE}
          </div>

          <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-white leading-[0.9]">
            {title}
          </h1>
        </header>

        <div className="space-y-8 font-serif text-sm sm:text-base text-[#575652] dark:text-[#C5C4BE] leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:text-[#0F0F0F] dark:[&_strong]:text-[#EDECE6] [&_strong]:font-semibold">
          {children}
        </div>
      </div>
    </main>
  )
}
