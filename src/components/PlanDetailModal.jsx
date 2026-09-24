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
    badge_default: 'PLAN DETAILS',
    plan_code: 'PLAN:',
    spec_suffix: 'full scope',
    ideal_fit: 'BEST FOR',
    artifacts_title: 'SCREENSHOTS',
    artifacts_hint: 'CLICK TO ENLARGE',
    artifacts_hint_mobile: 'SWIPE · TAP TO ENLARGE',
    modules_title: "WHAT'S INCLUDED",
    exclusions_title: 'NOT INCLUDED IN THIS PLAN',
    exclusions_terms: 'Full scope, revisions and warranty terms →',
    milestones_title: 'PAYMENT IN 3 MILESTONES',
    deposit_label: '40% to start',
    deposit_desc: 'Kickoff and setup',
    demo_label: '40% at approval',
    demo_desc: 'After you approve the private staging link',
    handover_label: '20% at launch',
    handover_desc: 'Go live + full code and database handover',
    storefront_demo: 'OPEN STORE DEMO',
    admin_demo: 'OPEN ADMIN DEMO',
    claim_whatsapp: 'DISCUSS THIS PLAN ON WHATSAPP',
    close: 'CLOSE',
    expand: 'ENLARGE',
    lightbox_return: 'Click outside or press Esc to close',
    preview_tag: 'SCREENSHOT',
    preview_counter: 'SCREENSHOT',
    guarantee_note:
      "Before launch, your store is set up on a private link with your own products. You test it against a written checklist we both sign. If anything doesn't match, we fix it within 10 working days. If we still can't meet the checklist, your deposit is refunded. Your delivery date is written into the contract.",
    payment_note:
      'Payments are split 40 / 40 / 20: to start, at staging approval, and at launch. Businesses in Pakistan are invoiced in PKR and pay by bank transfer. International clients are invoiced in USD or GBP and pay by international bank transfer or another method agreed in writing. Prices are fixed for the agreed scope; any change is quoted before work starts.',
  },
  'ur-en': {
    badge_default: 'PLAN KI TAFSEEL',
    plan_code: 'PLAN:',
    spec_suffix: 'poora scope',
    ideal_fit: 'KIS KE LIYE BEHTAR',
    artifacts_title: 'SCREENSHOTS',
    artifacts_hint: 'BARA DEKHNE KE LIYE CLICK KAREIN',
    artifacts_hint_mobile: 'SWIPE KAREIN · BARA DEKHNE KE LIYE TAP',
    modules_title: 'KYA SHAMIL HAI',
    exclusions_title: 'IS PLAN MEIN SHAMIL NAHI',
    exclusions_terms: 'Poora scope, revisions aur warranty sharaait →',
    milestones_title: '3 MARAHIL MEIN PAYMENT',
    deposit_label: '40% shuru mein',
    deposit_desc: 'Kickoff aur setup',
    demo_label: '40% approval par',
    demo_desc: 'Private staging link approve karne ke baad',
    handover_label: '20% launch par',
    handover_desc: 'Live + poora code aur database handover',
    storefront_demo: 'STORE DEMO',
    admin_demo: 'ADMIN DEMO',
    claim_whatsapp: 'WHATSAPP PAR BAAT KAREIN',
    close: 'BAND KAREIN',
    expand: 'BARA KAREIN',
    lightbox_return: 'Band karne ke liye bahar click karein ya Esc dabayein',
    preview_tag: 'SCREENSHOT',
    preview_counter: 'SCREENSHOT',
    guarantee_note:
      'Launch se pehle aapka store aapke products ke sath private link par set hota hai. Aap ise ek likhi hui checklist ke mutabiq test karte hain jis par hum dono sign karte hain. Jo cheez match na kare, hum 10 working days mein theek karte hain. Phir bhi checklist poori na ho sake, to aapki deposit wapas. Delivery date contract mein likhi hoti hai.',
    payment_note:
      'Payment 40 / 40 / 20 mein: shuru mein, staging approval par, aur launch par. Pakistan ke karobar ko PKR mein invoice (bank transfer). International clients ko USD ya GBP mein invoice (international bank transfer ya likh kar tay shuda tareeqa). Tay shuda scope ki price fixed hai; koi bhi tabdeeli kaam se pehle quote hoti hai.',
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

  // Pages may pass a ready-made `price` (e.g. GBP on the console page); otherwise pick USD/PKR.
  const displayPrice = plan.price || (currency === 'USD' ? plan.priceUsd : plan.pricePkr)

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
          className="relative max-w-6xl w-full bg-[#F6F5F0] dark:bg-[#161619] border border-[rgba(15,15,15,0.25)] dark:border-[rgba(255,255,255,0.15)] shadow-2xl h-[90vh] max-h-[90vh] flex flex-col overflow-hidden text-[#0F0F0F] dark:text-[#EDECE6] overscroll-contain transition-colors duration-200"
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
                {plan.code && (
                  <span className="offer-eyebrow text-[#8E8D88] dark:text-[#6A6965]">
                    {t.plan_code} {plan.code}
                  </span>
                )}
              </div>
              <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
                {plan.name} — {t.spec_suffix}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[#575652] dark:text-[#9B9A95] offer-ui">
                <span className="text-[#059669] dark:text-[#10B981] font-bold offer-ui">
                  {displayPrice}
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
                to="/solutions/terms"
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
                <span>{lang === 'ur-en' ? 'DELIVERY AUR APPROVAL' : 'DELIVERY & APPROVAL'}</span>
              </div>
              <p className="offer-body text-[#575652] dark:text-[#9B9A95] normal-case tracking-normal">
                {t.guarantee_note}
              </p>
            </div>

            {/* Payment & Ordering Note */}
            <div className="p-4 bg-[#FAF9F5] dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] offer-ui space-y-2">
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] uppercase tracking-wider flex items-center gap-2">
                <MessageSquare size={15} className="text-[#059669] dark:text-[#10B981]" />
                <span>{lang === 'ur-en' ? 'PAYMENT' : 'PAYMENT'}</span>
              </div>
              <p className="offer-body text-[#575652] dark:text-[#9B9A95] normal-case tracking-normal">
                {t.payment_note}
              </p>
            </div>
          </div>

          {/* ─── Modal Footer Actions (Fixed / Non-scrolling) ─── */}
          <div className="p-4 sm:p-6 border-t border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#1A1A1E] flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8 offer-ui shrink-0">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2">
              <a
                href={
                  plan?.storefrontDemoUrl ||
                  (plan?.name?.toLowerCase()?.includes('console')
                    ? 'https://console-store-demo.vercel.app/'
                    : 'https://store-demo-eight.vercel.app/')
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#059669] dark:text-[#10B981] hover:underline font-semibold inline-flex items-center gap-1 whitespace-nowrap"
              >
                {t.storefront_demo} <ArrowUpRight size={13} />
              </a>
              <span className="text-[rgba(15,15,15,0.2)] dark:text-[rgba(255,255,255,0.2)]" aria-hidden="true">|</span>
              <a
                href={
                  plan?.adminDemoUrl ||
                  (plan?.name?.toLowerCase()?.includes('console')
                    ? 'https://console-store-demo.vercel.app/admin'
                    : 'https://store-demo-eight.vercel.app/admin/dashboard')
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#059669] dark:text-[#10B981] hover:underline font-semibold inline-flex items-center gap-1 whitespace-nowrap"
              >
                {t.admin_demo} <ArrowUpRight size={13} />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
              <button
                onClick={() => onOpenWhatsApp(plan.name, displayPrice)}
                className="btn-blue offer-btn offer-btn-xl w-full sm:w-auto sm:flex-1 lg:flex-none whitespace-nowrap justify-center cursor-pointer animate-claim-solid group relative overflow-hidden shadow-md"
              >
                <MessageSquare size={20} className="animate-icon-wiggle group-hover:scale-125 transition-transform" />
                <span>{t.claim_whatsapp}</span>
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none animate-shimmer-sweep" />
              </button>
              <button
                onClick={onClose}
                className="btn-outline offer-btn shrink-0 whitespace-nowrap cursor-pointer"
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
                {plan.name}
                {plan.code ? <>{' // '}<span className="offer-code">{plan.code}</span></> : null}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null
}
