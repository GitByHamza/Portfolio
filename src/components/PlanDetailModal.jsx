import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import {
  X,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Clock,
  ShieldCheck,
  ArrowUpRight,
  Maximize2,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const MODAL_I18N = {
  en: {
    badge_default: 'VERIFIED SCOPE SPECIFICATION',
    plan_code: '// PLAN CODE:',
    spec_suffix: 'FULL ARCHITECTURAL SPECIFICATION',
    ideal_fit: 'IDEAL CLIENT PROFILE & BUSINESS FIT:',
    artifacts_title: 'SYSTEM INTERFACE ARTIFACTS INCLUDED IN THIS TIER:',
    artifacts_hint: 'CLICK ANY IMAGE TO EXPAND',
    artifacts_hint_mobile: 'SWIPE TO BROWSE • TAP TO EXPAND',
    modules_title: 'COMPREHENSIVE DELIVERABLE MODULES & ARCHITECTURAL SCOPE:',
    exclusions_title: 'STRICT SCOPE BOUNDARIES // WHAT IS NOT INCLUDED IN THIS TIER:',
    exclusions_terms: 'Full scope boundaries, revision policy & warranty terms →',
    milestones_title: 'ETHICAL MILESTONE PAYMENT & 100% OWNERSHIP PLEDGE',
    deposit_label: '40% Deposit',
    deposit_desc: 'Project initiation & repository setup',
    demo_label: '40% Demo Milestone',
    demo_desc: 'Approved staging build walkthrough',
    handover_label: '20% Launch Handover',
    handover_desc: 'Full GitHub repo & PostgreSQL transfer',
    storefront_demo: 'TEST STOREFRONT DEMO',
    admin_demo: 'TEST ADMIN DEMO',
    claim_whatsapp: 'CLAIM PLAN ON WHATSAPP',
    close: 'CLOSE',
    expand: 'EXPAND',
    lightbox_return: 'Click outside or press ESC to return to plan specification',
    preview_tag: 'SYSTEM PREVIEW',
    preview_counter: 'PREVIEW',
    guarantee_note:
      '100% Milestone-Protected Staging Guarantee: Test your custom Next.js storefront, PC Builder, and inventory on a live private staging URL with your own products before secondary settlement. If the staging demo fails to satisfy the signed technical specification, your deposit is refunded 100% in full, you keep the architectural blueprint for free, and receive a $250 USD courtesy credit for your time. The delivery date in this plan is written into the contract, not a rough estimate.',
    payment_note:
      'Payment is split 40 / 40 / 20 across commencement deposit, approved staging demo, and launch handover. Invoices are denominated in your preferred currency (USD for international via wire/Stripe/Wise, PKR for domestic). All deliverables are covered under our fixed-price guarantee with 100% intellectual property transfer.',
  },
  'ur-en': {
    badge_default: 'TASDEEQ SHUDA SCOPE SPECIFICATION',
    plan_code: '// PLAN CODE:',
    spec_suffix: 'MUKAMMAL ARCHITECTURAL SPECIFICATION',
    ideal_fit: 'DUKAN KA PROFILE AUR BUSINESS FIT:',
    artifacts_title: 'IS PLAN MEIN SHAMIL SYSTEM INTERFACES:',
    artifacts_hint: 'TASVEER BARI DEKHNE KE LIYE CLICK KAREIN',
    artifacts_hint_mobile: 'SWIPE KAREIN • BARI DEKHNE KE LIYE TAP KAREIN',
    modules_title: 'MUKAMMAL DELIVERABLE MODULES AUR ARCHITECTURAL SCOPE:',
    exclusions_title: 'STRICT SCOPE BOUNDARIES // YEH CHEEZAIN IS PLAN MEIN SHAMIL NAHI:',
    exclusions_terms: 'Mukammal scope boundaries, revision policy & warranty sharaait →',
    milestones_title: 'ETHICAL MILESTONE PAYMENT AUR 100% MALIKANA HUQOOQ:',
    deposit_label: '40% Peshgi Raqam',
    deposit_desc: 'Project initiation aur repository setup',
    demo_label: '40% Demo Milestone',
    demo_desc: 'Approved staging demo walkthrough',
    handover_label: '20% Launch Handover',
    handover_desc: 'Mukammal GitHub repo aur PostgreSQL database transfer',
    storefront_demo: 'STOREFRONT DEMO DEKHEIN',
    admin_demo: 'ADMIN DEMO DEKHEIN',
    claim_whatsapp: 'YEH PLAN WHATSAPP PAR BOOK KAREIN',
    close: 'BAND KAREIN',
    expand: 'BARA KAREIN',
    lightbox_return: 'Wapas aane ke liye bahar click karein ya ESC dabayein',
    preview_tag: 'SYSTEM PREVIEW',
    preview_counter: 'PREVIEW',
    guarantee_note:
      '100% Milestone-Protected Staging Guarantee: Doosri payment aur final launch se pehle apni private staging URL par custom storefront, PC Builder aur inventory ko test karein. Agar staging demo mutafiqa specs fulfill na kare, to aapki deposit 100% fori wapas, architecture blueprint muft aapka, aur waqt ke azaale ke tor par courtesy credit diya jata hai. Delivery date contract mein likhi hoti hai, andaza nahi.',
    payment_note:
      'Raqam 40 / 40 / 20 mein banti hai: peshgi deposit, approved staging demo, aur launch handover. International clients ke liye direct USD invoicing aur muqami clients ke liye PKR. Tamam deliverables fixed-price guarantee aur 100% intellectual property transfer ke tehat mukammal kiye jate hain.',
  },
}

function formatScopeCurrency(text, currency) {
  if (!text) return text
  if (currency === 'USD') {
    return text
      .replace(/\+PKR\s*50,000\s*\/\s*\$400/gi, '+$400 USD')
      .replace(/\$400\s*\/\s*PKR\s*50K/gi, '$400 USD')
      .replace(/Save\s*\$400\s*\/\s*PKR\s*50K/gi, 'Save $400 USD')
      .replace(/PKR\s*50,000\s*(extra\s*fee\s*waived|ki\s*izafi\s*fee|Bachat)/gi, '$400 USD $1')
      .replace(/\+PKR\s*65,000\s*\/\s*\$650/gi, '+$650 USD')
      .replace(/\$650\s*\/\s*PKR\s*65K/gi, '$650 USD')
      .replace(/\$650\s*\/\s*PKR\s*65,000/gi, '$650 USD')
      .replace(/Save\s*\$650\s*\/\s*PKR\s*65K/gi, 'Save $650 USD')
      .replace(/PKR\s*65,000/gi, '$650 USD')
      .replace(/PKR\s*65K/gi, '$650 USD')
      .replace(/PKR\s*50K/gi, '$400 USD')
      .replace(/PKR\s*50,000/gi, '$400 USD')
  } else {
    return text
      .replace(/\+PKR\s*50,000\s*\/\s*\$400/gi, '+PKR 50,000')
      .replace(/\$400\s*\/\s*PKR\s*50K/gi, 'PKR 50,000')
      .replace(/Save\s*\$400\s*\/\s*PKR\s*50K/gi, 'Save PKR 50,000')
      .replace(/\$400\s*USD/gi, 'PKR 50,000')
      .replace(/\$400/gi, 'PKR 50,000')
      .replace(/\+PKR\s*65,000\s*\/\s*\$650/gi, '+PKR 65,000')
      .replace(/\$650\s*\/\s*PKR\s*65K/gi, 'PKR 65,000')
      .replace(/\$650\s*\/\s*PKR\s*65,000/gi, 'PKR 65,000')
      .replace(/Save\s*\$650\s*\/\s*PKR\s*65K/gi, 'Save PKR 65,000')
      .replace(/\$650\s*USD/gi, 'PKR 65,000')
      .replace(/\$650/gi, 'PKR 65,000')
  }
}

export default function PlanDetailModal({ plan, lang = 'en', currency = 'USD', onClose, onOpenWhatsApp }) {
  const bodyRef = useRef(null)
  const galleryRef = useRef(null)
  const [expandedImageIndex, setExpandedImageIndex] = useState(null)
  const [activeArtifact, setActiveArtifact] = useState(0)
  const t = MODAL_I18N[lang] || MODAL_I18N.en

  // Reset expanded image and mobile gallery position when plan changes
  useEffect(() => {
    setExpandedImageIndex(null)
    setActiveArtifact(0)
  }, [plan])

  // Track which artifact card is centered while swiping on mobile
  const handleGalleryScroll = () => {
    const el = galleryRef.current
    if (!el) return
    const cards = Array.from(el.children)
    if (!cards.length) return
    const elRect = el.getBoundingClientRect()
    const centerX = elRect.left + elRect.width / 2
    let nearest = 0
    let bestDist = Infinity
    cards.forEach((card, i) => {
      const r = card.getBoundingClientRect()
      const dist = Math.abs(r.left + r.width / 2 - centerX)
      if (dist < bestDist) {
        bestDist = dist
        nearest = i
      }
    })
    setActiveArtifact(nearest)
  }

  // Dot tap: bring that artifact card to the center of the swipe row
  const scrollToArtifact = (idx) => {
    const el = galleryRef.current
    const card = el?.children[idx]
    if (!el || !card) return
    const elRect = el.getBoundingClientRect()
    const cardRect = card.getBoundingClientRect()
    el.scrollTo({
      left: el.scrollLeft + (cardRect.left - elRect.left) - (el.clientWidth - cardRect.width) / 2,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      // If lightbox is open, handle its navigation and dismiss
      if (expandedImageIndex !== null && plan?.artifacts?.length) {
        if (e.key === 'Escape') {
          e.stopPropagation()
          setExpandedImageIndex(null)
          return
        }
        if (e.key === 'ArrowLeft') {
          e.stopPropagation()
          setExpandedImageIndex((prev) =>
            prev > 0 ? prev - 1 : plan.artifacts.length - 1
          )
          return
        }
        if (e.key === 'ArrowRight') {
          e.stopPropagation()
          setExpandedImageIndex((prev) =>
            prev < plan.artifacts.length - 1 ? prev + 1 : 0
          )
          return
        }
      } else if (e.key === 'Escape') {
        onClose()
      }
    }

    if (plan) {
      // 1. Pause Lenis smooth scroll so it does not intercept wheel events
      window.__lenis?.stop()

      // 2. Lock root HTML and body overflow to prevent background scrolling
      const originalHtmlOverflow = document.documentElement.style.overflow
      const originalBodyOverflow = document.body.style.overflow

      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'

      window.addEventListener('keydown', handleKeyDown)

      // 3. Reset scroll position to top
      if (bodyRef.current && expandedImageIndex === null) {
        bodyRef.current.scrollTop = 0
      }

      return () => {
        document.documentElement.style.overflow = originalHtmlOverflow || ''
        document.body.style.overflow = originalBodyOverflow || ''
        window.removeEventListener('keydown', handleKeyDown)

        // Resume Lenis smooth scroll
        window.__lenis?.start()
      }
    }
  }, [plan, onClose, expandedImageIndex])

  if (!plan) return null

  const modalContent = (
    <>
      {/* ─── Backdrop ─── */}
      <div
        className="fixed inset-0 z-[9998] bg-[#0F0F0F]/80 dark:bg-black/85 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ─── Modal Shell Container ─── */}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 pointer-events-auto"
        onClick={onClose}
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
      >
        <div
          className="relative max-w-4xl w-full bg-[#F6F5F0] dark:bg-[#161619] border border-[rgba(15,15,15,0.25)] dark:border-[rgba(255,255,255,0.15)] shadow-2xl h-[90vh] max-h-[90vh] flex flex-col overflow-hidden text-[#0F0F0F] dark:text-[#EDECE6] overscroll-contain transition-colors duration-200"
          onClick={(e) => e.stopPropagation()}
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* ─── Modal Top Masthead Header (Fixed / Non-scrolling) ─── */}
          <div className="p-4 sm:p-6 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#1A1A1E] flex items-start justify-between gap-4 shrink-0">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="tag-blue offer-badge">
                  {plan.badge || t.badge_default}
                </span>
                <span className="offer-eyebrow text-[#8E8D88] dark:text-[#6A6965]">
                  {t.plan_code} {plan.code}
                </span>
              </div>
              <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
                {plan.name} — {t.spec_suffix}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[#575652] dark:text-[#9B9A95] offer-ui">
                <span className="text-[#059669] dark:text-[#10B981] font-bold offer-ui">
                  {currency === 'USD' ? plan.priceUsd : plan.pricePkr}
                </span>
                <span className="text-[rgba(15,15,15,0.2)] dark:text-[rgba(255,255,255,0.2)]">|</span>
                <span className="flex items-center gap-1 font-semibold text-[#0F0F0F] dark:text-[#EDECE6]">
                  <Clock size={12} className="text-[#059669] dark:text-[#10B981]" /> {plan.delivery}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#0F0F0F] dark:text-[#EDECE6] hover:text-[#059669] dark:hover:text-[#10B981] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.15)] bg-white dark:bg-[#1F1F24] hover:bg-[#FAF9F5] dark:hover:bg-[#2A2A30] transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* ─── Scrollable Modal Body (Takes remaining height, scrolls internally) ─── */}
          <div
            ref={bodyRef}
            data-lenis-prevent="true"
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-8 space-y-8 offer-ui focus:outline-none"
            tabIndex={0}
          >
            {/* Ideal Client Profile */}
            <div className="p-4 bg-white dark:bg-[#1F1F24] border border-[rgba(15,15,15,0.12)] dark:border-[rgba(255,255,255,0.1)] space-y-1 offer-ui">
              <span className="offer-eyebrow text-[#8E8D88] dark:text-[#6A6965] block font-bold">
                {t.ideal_fit}
              </span>
              <p className="offer-body text-[#0F0F0F] dark:text-[#EDECE6]">
                {plan.idealFor}
              </p>
            </div>

            {/* Feature Visual Artifacts Gallery */}
            {plan.artifacts && plan.artifacts.length > 0 && (
              <div className="space-y-3 offer-ui">
                <div className="offer-eyebrow font-bold text-[#0F0F0F] dark:text-[#EDECE6] flex items-center justify-between">
                  <span>{t.artifacts_title}</span>
                  <span className="offer-ui text-[#8E8D88] dark:text-[#6A6965] hidden sm:inline">{t.artifacts_hint}</span>
                  <span className="offer-ui text-[#8E8D88] dark:text-[#6A6965] sm:hidden">{t.artifacts_hint_mobile}</span>
                </div>
                <div
                  ref={galleryRef}
                  onScroll={handleGalleryScroll}
                  className="-mx-4 px-4 flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-1 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:snap-none lg:grid-cols-3"
                >
                  {plan.artifacts.map((art, idx) => (
                    <div
                      key={idx}
                      onClick={() => setExpandedImageIndex(idx)}
                      className="group w-[80%] shrink-0 snap-center sm:w-auto sm:shrink sm:snap-align-none border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] hover:border-[#059669] dark:hover:border-[#10B981] bg-white dark:bg-[#1F1F24] p-1.5 shadow-xs space-y-1.5 cursor-zoom-in transition-all"
                      title="Click to expand full image"
                    >
                      <div className="relative aspect-video overflow-hidden bg-[#ECEAE3] dark:bg-[#121215]">
                        <img
                          src={encodeURI(art.image)}
                          alt={art.title}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute bottom-1 left-1 bg-[#0F0F0F] dark:bg-[#059669] text-white offer-eyebrow px-1.5 py-0.5">
                          {art.tag}
                        </div>
                        {/* Hover Overlay with Zoom Icon */}
                        <div className="absolute inset-0 bg-[#0F0F0F]/0 group-hover:bg-[#0F0F0F]/30 flex items-center justify-center transition-colors">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 dark:bg-[#161619]/95 text-[#0F0F0F] dark:text-[#EDECE6] px-2 py-1 offer-ui font-bold flex items-center gap-1 shadow-md border border-[rgba(15,15,15,0.15)] dark:border-[rgba(255,255,255,0.15)]">
                            <ZoomIn size={12} className="text-[#059669] dark:text-[#10B981]" /> {t.expand}
                          </span>
                        </div>
                      </div>
                      <div className="px-1 offer-ui font-semibold text-[#0F0F0F] dark:text-[#EDECE6] group-hover:text-[#059669] dark:group-hover:text-[#10B981] transition-colors truncate flex items-center justify-between">
                        <span className="truncate">{art.title}</span>
                        <Maximize2 size={10} className="text-[#8E8D88] dark:text-[#6A6965] group-hover:text-[#059669] dark:group-hover:text-[#10B981] shrink-0 ml-1" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Swipe position dots (mobile only) */}
                {plan.artifacts.length > 1 && (
                  <div className="flex sm:hidden items-center justify-center gap-1.5">
                    {plan.artifacts.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => scrollToArtifact(i)}
                        aria-label={`Go to preview ${i + 1}`}
                        className={`h-1.5 cursor-pointer transition-all ${
                          i === activeArtifact
                            ? 'w-5 bg-[#059669] dark:bg-[#10B981]'
                            : 'w-1.5 bg-[rgba(15,15,15,0.2)] dark:bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(15,15,15,0.45)] dark:hover:bg-[rgba(255,255,255,0.45)]'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Included Modules Detail */}
            <div className="space-y-4">
              <div className="offer-eyebrow font-bold text-[#0F0F0F] dark:text-[#EDECE6] border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-2">
                {t.modules_title}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plan.modules.map((mod, i) => (
                  <div
                    key={i}
                    className="p-4 bg-white dark:bg-[#1F1F24] border border-[rgba(15,15,15,0.12)] dark:border-[rgba(255,255,255,0.1)] space-y-2"
                  >
                    <div className="offer-ui font-bold text-[#0F0F0F] dark:text-[#EDECE6] flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-[#059669] dark:text-[#10B981] shrink-0" />
                      <span>{formatScopeCurrency(mod.title, currency)}</span>
                    </div>
                    <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                      {formatScopeCurrency(mod.desc, currency)}
                    </p>
                    {mod.items && (
                      <ul className="offer-ui text-[#0F0F0F] dark:text-[#EDECE6] space-y-1 pt-1 border-t border-[rgba(15,15,15,0.06)] dark:border-[rgba(255,255,255,0.08)]">
                        {mod.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-1.5 text-[#575652] dark:text-[#9B9A95]">
                            <span className="text-[#059669] dark:text-[#10B981]">•</span>
                            <span>{formatScopeCurrency(item, currency)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Scope Boundaries / Exclusions */}
            <div className="p-4 sm:p-5 bg-white dark:bg-[#1F1F24] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 offer-ui">
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] uppercase tracking-wider flex items-center gap-2">
                <XCircle size={15} className="text-[#8E8D88] dark:text-[#6A6965]" />
                <span>{t.exclusions_title}</span>
              </div>
              <ul className="space-y-1.5 text-[#575652] dark:text-[#9B9A95] offer-ui">
                {plan.exclusions.map((exc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span>{formatScopeCurrency(exc, currency)}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/solutions/tech-retail/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="offer-ui inline-flex items-center gap-1.5 font-semibold text-[#059669] dark:text-[#10B981] hover:underline pt-1 border-t border-[rgba(15,15,15,0.08)] dark:border-[rgba(255,255,255,0.08)] mt-1"
              >
                {t.exclusions_terms}
              </Link>
            </div>

            {/* Payment Milestones & Ownership Policy */}
            <div className="p-4 bg-[#ECFDF5] dark:bg-[#10B981]/15 border border-[#059669]/25 dark:border-[#10B981]/30 offer-ui space-y-2">
              <div className="font-bold text-[#059669] dark:text-[#10B981] uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck size={15} />
                <span>{t.milestones_title}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 offer-ui text-[#0F0F0F] dark:text-[#EDECE6]">
                <div className="p-2 bg-white/70 dark:bg-[#161619]/70 border border-[#059669]/20 dark:border-[#10B981]/30">
                  <span className="font-bold block text-[#059669] dark:text-[#10B981]">{t.deposit_label}</span>
                  <span className="text-[#575652] dark:text-[#9B9A95] offer-ui">{t.deposit_desc}</span>
                </div>
                <div className="p-2 bg-white/70 dark:bg-[#161619]/70 border border-[#059669]/20 dark:border-[#10B981]/30">
                  <span className="font-bold block text-[#059669] dark:text-[#10B981]">{t.demo_label}</span>
                  <span className="text-[#575652] dark:text-[#9B9A95] offer-ui">{t.demo_desc}</span>
                </div>
                <div className="p-2 bg-white/70 dark:bg-[#161619]/70 border border-[#059669]/20 dark:border-[#10B981]/30">
                  <span className="font-bold block text-[#059669] dark:text-[#10B981]">{t.handover_label}</span>
                  <span className="text-[#575652] dark:text-[#9B9A95] offer-ui">{t.handover_desc}</span>
                </div>
              </div>
            </div>

            {/* Delivery Guarantee Note */}
            <div className="p-4 bg-[#FAF9F5] dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] offer-ui space-y-2">
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] uppercase tracking-wider flex items-center gap-2">
                <Clock size={15} className="text-[#059669] dark:text-[#10B981]" />
                <span>{lang === 'ur-en' ? 'DELIVERY AUR SLA ZIMMEDARI' : 'DELIVERY AND SLA COMMITMENT'}</span>
              </div>
              <p className="offer-body text-[#575652] dark:text-[#9B9A95] normal-case tracking-normal">
                {t.guarantee_note}
              </p>
            </div>

            {/* Payment & Ordering Note */}
            <div className="p-4 bg-[#FAF9F5] dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] offer-ui space-y-2">
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] uppercase tracking-wider flex items-center gap-2">
                <MessageSquare size={15} className="text-[#059669] dark:text-[#10B981]" />
                <span>{lang === 'ur-en' ? 'PAYMENT AUR ORDER KARNE KA TAREEQA' : 'HOW PAYMENT AND ORDERING WORK'}</span>
              </div>
              <p className="offer-body text-[#575652] dark:text-[#9B9A95] normal-case tracking-normal">
                {t.payment_note}
              </p>
            </div>
          </div>

          {/* ─── Modal Footer Actions (Fixed / Non-scrolling) ─── */}
          <div className="p-4 sm:p-6 border-t border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#1A1A1E] flex flex-col sm:flex-row items-center justify-between gap-4 offer-ui shrink-0">
            <div className="flex items-center gap-3">
              <a
                href={
                  plan?.storefrontDemoUrl ||
                  (plan?.name?.toLowerCase()?.includes('console')
                    ? 'https://console-store-demo.vercel.app/'
                    : 'https://store-demo-eight.vercel.app/')
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#059669] dark:text-[#10B981] hover:underline font-semibold flex items-center gap-1"
              >
                {t.storefront_demo} <ArrowUpRight size={13} />
              </a>
              <span className="text-[rgba(15,15,15,0.2)] dark:text-[rgba(255,255,255,0.2)]">|</span>
              <a
                href={
                  plan?.adminDemoUrl ||
                  (plan?.name?.toLowerCase()?.includes('console')
                    ? 'https://console-store-demo.vercel.app/admin'
                    : 'https://store-demo-eight.vercel.app/admin')
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#059669] dark:text-[#10B981] hover:underline font-semibold flex items-center gap-1"
              >
                {t.admin_demo} <ArrowUpRight size={13} />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onOpenWhatsApp(plan.name, currency === 'USD' ? plan.priceUsd : plan.pricePkr)}
                className="btn-blue offer-btn offer-btn-xl w-full sm:w-auto sm:flex-none justify-center cursor-pointer animate-claim-solid group relative overflow-hidden shadow-md"
              >
                <MessageSquare size={20} className="animate-icon-wiggle group-hover:scale-125 transition-transform" />
                <span>{t.claim_whatsapp}</span>
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none animate-shimmer-sweep" />
              </button>
              <button
                onClick={onClose}
                className="btn-outline offer-btn cursor-pointer"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Fullscreen Image Modal Lightbox (Expands on Click) ─── */}
      {expandedImageIndex !== null && plan.artifacts && plan.artifacts[expandedImageIndex] && (
        <div
          className="fixed inset-0 z-[10000] bg-[#0F0F0F]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 offer-ui"
          onClick={() => setExpandedImageIndex(null)}
          onWheel={(e) => e.stopPropagation()}
        >
          <div
            className="relative max-w-5xl w-full bg-[#F6F5F0] dark:bg-[#161619] border border-[rgba(15,15,15,0.25)] dark:border-[rgba(255,255,255,0.15)] p-3 sm:p-5 shadow-2xl space-y-3 text-[#0F0F0F] dark:text-[#EDECE6]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Masthead */}
            <div className="flex items-center justify-between border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] pb-2 px-1">
              <div className="flex items-center gap-2">
                <span className="tag-blue offer-badge">
                  {plan.artifacts[expandedImageIndex].tag || t.preview_tag}
                </span>
                <span className="offer-h3 text-[#0F0F0F] dark:text-[#EDECE6]">
                  {plan.artifacts[expandedImageIndex].title}
                </span>
                <span className="offer-ui text-[#8E8D88] dark:text-[#6A6965] hidden sm:inline">
                  // {t.preview_counter} {expandedImageIndex + 1} / {plan.artifacts.length}
                </span>
              </div>

              <button
                onClick={() => setExpandedImageIndex(null)}
                className="p-1.5 text-[#0F0F0F] dark:text-[#EDECE6] hover:text-[#059669] dark:hover:text-[#10B981] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.15)] bg-white dark:bg-[#1F1F24] hover:bg-[#FAF9F5] dark:hover:bg-[#2A2A30] transition-colors cursor-pointer"
                aria-label="Close expanded preview"
              >
                <X size={18} />
              </button>
            </div>

            {/* Expanded Image Frame */}
            <div className="relative flex items-center justify-center max-h-[76vh] overflow-hidden bg-[#ECEAE3] dark:bg-[#121215] border border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] p-1">
              <img
                src={encodeURI(plan.artifacts[expandedImageIndex].image)}
                alt={plan.artifacts[expandedImageIndex].title}
                className="max-h-[73vh] w-auto max-w-full object-contain mx-auto shadow"
              />

              {plan.artifacts.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setExpandedImageIndex((prev) =>
                        prev > 0 ? prev - 1 : plan.artifacts.length - 1
                      )
                    }}
                    className="absolute left-3 p-2.5 bg-[#F6F5F0] dark:bg-[#1F1F24] text-[#0F0F0F] dark:text-[#EDECE6] hover:bg-[#059669] dark:hover:bg-[#10B981] hover:text-white border border-[rgba(15,15,15,0.2)] dark:border-[rgba(255,255,255,0.2)] shadow-md cursor-pointer transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setExpandedImageIndex((prev) =>
                        prev < plan.artifacts.length - 1 ? prev + 1 : 0
                      )
                    }}
                    className="absolute right-3 p-2.5 bg-[#F6F5F0] dark:bg-[#1F1F24] text-[#0F0F0F] dark:text-[#EDECE6] hover:bg-[#059669] dark:hover:bg-[#10B981] hover:text-white border border-[rgba(15,15,15,0.2)] dark:border-[rgba(255,255,255,0.2)] shadow-md cursor-pointer transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Lightbox Footer Caption */}
            <div className="flex items-center justify-between offer-ui text-[#575652] dark:text-[#9B9A95] pt-1 px-1">
              <span>
                {t.lightbox_return} (<kbd className="px-1.5 py-0.5 bg-white dark:bg-[#1F1F24] border border-[rgba(15,15,15,0.2)] dark:border-[rgba(255,255,255,0.2)] offer-badge text-[#0F0F0F] dark:text-[#EDECE6]">
                  ESC
                </kbd>)
              </span>
              <span className="offer-ui font-semibold text-[#0F0F0F] dark:text-[#EDECE6] hidden sm:inline">
                {plan.name} // <span className="offer-code">{plan.code}</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null
}
