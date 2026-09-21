import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Gamepad2,
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
  Maximize2,
  Info,
  ChevronDown,
  Disc,
  Sparkles,
  RefreshCw,
  Cpu,
  Tag,
  Package,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn, StaggerContainer, StaggerItem } from '../../components/motion/MotionReveal'
import PlanDetailModal from '../../components/PlanDetailModal'
import ThemeToggle from '../../components/ThemeToggle'
import { useLanguage } from '../../context/LanguageContext'

// Geo / Timezone auto-selection for Language
function detectInitialLanguage() {
  if (typeof window === 'undefined') return 'en'
  try {
    const saved = localStorage.getItem('texcodes_console_lang') || localStorage.getItem('texcodes_retail_lang')
    if (saved === 'en' || saved === 'ur-en') {
      return saved
    }
  } catch (e) {}

  try {
    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase()
    if (tz === 'asia/karachi' || tz === 'asia/kolkata' || tz === 'asia/calcutta') {
      return 'ur-en'
    }
    if (
      tz.startsWith('america/') ||
      tz.startsWith('europe/') ||
      tz.startsWith('atlantic/') ||
      tz.startsWith('australia/')
    ) {
      return 'en'
    }
    const navLangs = (navigator.languages || [navigator.language || '']).map((l) => l.toLowerCase())
    if (navLangs.some((l) => l.includes('-pk') || l.includes('-in') || l.startsWith('ur') || l.startsWith('hi'))) {
      return 'ur-en'
    }
    if (navLangs.some((l) => l.startsWith('en') || l.startsWith('de') || l.startsWith('fr') || l.startsWith('es'))) {
      return 'en'
    }
  } catch (e) {}

  return 'en'
}

// Geo / Timezone auto-selection for Currency
function detectInitialCurrency() {
  if (typeof window === 'undefined') return 'USD'
  try {
    const saved = localStorage.getItem('texcodes_currency')
    if (saved === 'USD' || saved === 'GBP' || saved === 'PKR') {
      return saved
    }
  } catch (e) {}

  try {
    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase()
    if (tz === 'europe/london' || tz.includes('london') || tz.includes('belfast') || tz.includes('dublin')) {
      return 'GBP'
    }
    if (tz === 'asia/karachi' || tz === 'asia/kolkata' || tz === 'asia/calcutta') {
      return 'PKR'
    }
  } catch (e) {}

  return 'USD'
}

const I18N_DATA = {
  en: {
    hero_badge: 'COMMERCIAL INFRASTRUCTURE // GAMING CONSOLES & DISCS RETAIL OS',
    hero_title_1: 'Automate Console Sales, Game Disc Trade-Ins & Pre-Orders',
    hero_title_accent: 'With Zero Platform Commissions',
    hero_title_2: 'And 100% Codebase Ownership',
    hero_sub:
      'Turn your video game boutique or retail chain into an automated 24/7 gaming commerce hub. Dedicated storefront for PS5, Xbox Series X, Nintendo Switch, physical game discs, and accessories with instant trade-in valuation, serial warranty tracking, and WhatsApp dispatch—delivered in 21 days with 100% code and database ownership.',
    cta_primary: 'Choose Your Gaming Solution Plan',
    cta_secondary: 'Explore Live Console Demo',
    metrics_code: 'Full GitHub & DB Transfer',
    metrics_tax: 'Keep 100% Retail Margins',
    metrics_speed: 'Instant Trade-In Calculator',
    metrics_rma: 'Console Motherboard Serials',
    metrics_code_top: '100% OWNERSHIP',
    metrics_tax_top: '0% PLATFORM TAX',
    metrics_speed_top: 'TRADE-IN ENGINE',
    metrics_rma_top: 'SERIAL & SEAL RMA',

    // Ultimatum Decision Matrix
    ultimatum_badge: 'THE ZERO-RISK DECISION MATRIX',
    ultimatum_title: 'WHY LEADING CONSOLE RETAILERS MOVE FORWARD',
    ultimatum_sub:
      'An offer structured so the video game merchant wins in both scenarios. We assume the technical execution risk so you can modernize your operation with complete certainty.',
    ultimatum_best_tag: 'BEST-CASE SCENARIO',
    ultimatum_best_title: 'You launch an automated gaming retail machine',
    ultimatum_best_p1: 'Deploy a high-speed Next.js console storefront with live trade-in valuations in 21 days.',
    ultimatum_best_p2: 'Customer disc questions drop to zero with clear condition grades (Brand New Sealed, Mint Scratch-Free Discs).',
    ultimatum_best_p3: 'Physical counters and online orders share one real-time multi-branch stock inventory.',
    ultimatum_best_p4: 'Save thousands every year with zero recurring platform commissions or order fees.',
    ultimatum_best_p5: 'Full GitHub repository and PostgreSQL database ownership transferred to your accounts.',
    ultimatum_best_footer: 'Outcome: You scale your gaming business, protect retail margins, and own your software.',

    ultimatum_worst_tag: 'WORST-CASE SCENARIO',
    ultimatum_worst_title: 'If we fail to fulfill agreed specifications',
    ultimatum_worst_p1: '100% full refund of your commencement deposit processed immediately without dispute.',
    ultimatum_worst_p2: 'Keep our custom console catalog schema, trade-in rules, and architecture blueprint for free.',
    ultimatum_worst_p3: '$250 USD courtesy credit paid directly to your business as an apology for your time.',
    ultimatum_worst_p4: 'Zero contract lock-in, zero ongoing financial obligations, and zero risk.',
    ultimatum_worst_footer: 'Outcome: You risk zero capital, lose nothing, and keep an enterprise tech audit.',

    // Staging Guarantee Banner
    guarantee_badge: 'SAFETY NET // 100% MILESTONE-PROTECTED STAGING GUARANTEE',
    guarantee_title: 'Test Your System On A Live Staging URL Before Final Settlement',
    guarantee_sub:
      'You only pay the remaining balance after testing your fully functional custom storefront, trade-in calculator, and multi-branch stock sync on a private staging URL with your own consoles and games. If it does not perform to agreed specifications, your deposit is refunded in full.',

    arch_badge: 'SYSTEM ARCHITECTURE',
    arch_title: 'ONE UNIFIED SYSTEM FOR CONSOLE GAMING RETAIL',
    arch_sub:
      'Not just an online shop. An integrated gaming retail operating environment connecting storefront, showroom counters, trade-in intake, and customer order dispatch.',
    arch_01_title: '01. CUSTOM CONSOLE STOREFRONT',
    arch_01_desc:
      'Ultra-fast Next.js gaming storefront for PS5, Xbox Series X/S, Nintendo Switch, Retro Consoles, and physical discs with rich media, trailer embeds, and instant platform filtering.',
    arch_02_title: '02. CONSOLE & DISC TRADE-IN ENGINE',
    arch_02_desc:
      'Allow gamers to select their old console or game disc, choose condition (Boxed, Unboxed, Fair), and get instant Cash and Store Credit valuation—just like CEX and GameStop.',
    arch_03_title: '03. DISC & CONSOLE CONDITION GRADING',
    arch_03_desc:
      'Display verified condition badges on every listing: Brand New Sealed, Grade A Mint Disc (Scratch Guarantee), or Refurbished Console with 90-Day Local Warranty.',
    arch_04_title: '04. MULTI-BRANCH STOCK SYNC',
    arch_04_desc:
      'Connect retail showrooms, repair/testing benches, and central warehouse in one real-time inventory management panel.',
    arch_05_title: '05. MOTHERBOARD SERIAL & WARRANTY RMA',
    arch_05_desc:
      'Print unique console motherboard serial numbers and anti-tamper security sticker IDs on invoices to eliminate customer return fraud and part-swapping.',
    arch_06_title: '06. WHATSAPP & COURIER AUTO DISPATCH',
    arch_06_desc:
      'Pre-formatted customer orders with exact console edition (Disc vs Digital), disc region (PAL/NTSC), and tracking updates sent directly to sales counters.',
    arch_07_title: '07. AI GAME MATCHMAKER CHATBOT',
    arch_07_desc:
      '24/7 automated gaming sales assistant that recommends games by platform, genre (Action, RPG, Sports, Soulslike), multiplayer mode, and PEGI/ESRB age ratings.',

    plans_badge: 'COMMERCIAL INVESTMENT TIERS',
    plans_title: 'Console Solution Plans.',
    plans_sub:
      'Zero monthly sales commissions. 100% client code and database ownership upon completion.',
    plans_sub_suffix:
      'Click any plan below to inspect the complete deliverable breakdown, architecture specs, and visual previews.',
    detail_btn: 'CLICK ME FOR FULL DETAIL & PREVIEWS →',

    starter_name: 'Single Boutique Gaming Launch',
    starter_badge: 'SINGLE STORE',
    starter_desc:
      'For independent console shops, game disc dealers, and retro gaming boutiques starting online sales with WhatsApp dispatch.',
    starter_price_usd: '$2,250 USD',
    starter_price_gbp: '£1,850 GBP',
    starter_price_pkr: 'PKR 260,000',
    starter_delivery: '⚡ Delivered in 10 days, guaranteed',
    starter_support_usd: 'Optional Care Plan: $140 / mo',
    starter_support_gbp: 'Optional Care Plan: £115 / mo',
    starter_support_pkr: 'Optional Care Plan: PKR 14,000 / mo',
    starter_callout_label: 'CORE CAPABILITY:',
    starter_callout_text:
      'Dedicated single-outlet console storefront with platform filters, disc condition tags, and direct WhatsApp checkout.',
    starter_f1: 'Next.js Console Storefront (Up to 100 SKUs)',
    starter_f2: 'Platform Filtering (PS5, Xbox, Switch, Retro)',
    starter_f3: 'Disc & Console Condition Grading Badges',
    starter_f4: '100% Client Code & DB Ownership',

    growth_name: 'Multi-Branch Gaming Retailer',
    growth_badge: '★ MOST POPULAR // BEST VALUE',
    growth_desc:
      'For established video game shops, trade-in retailers, and high-volume console merchants selling across physical counters and online.',
    growth_price_usd: '$4,450 USD',
    growth_price_gbp: '£3,650 GBP',
    growth_price_pkr: 'PKR 490,000',
    growth_delivery: '⚡ Delivered in 21 days, guaranteed',
    growth_support_usd: 'Optional Care Plan: $280 / mo',
    growth_support_gbp: 'Optional Care Plan: £230 / mo',
    growth_support_pkr: 'Optional Care Plan: PKR 28,000 / mo',
    growth_callout_label: 'MAJOR UPGRADE OVER STARTER:',
    growth_callout_text:
      'Adds automated Console & Disc Trade-In Valuation Calculator, 3-branch stock sync, serial RMA tracking, and AI Game Matchmaker.',
    growth_f1: 'Console & Disc Trade-In / Buyback Valuation Engine',
    growth_f2: '3-Branch Inventory Sync (Showroom, Counter, Warehouse)',
    growth_f3: 'Console Motherboard Serial & Anti-Tamper RMA Tracker',
    growth_f4: 'Automated Controller & Accessory Cross-Sell Engine',
    growth_f5_usd: 'Online Card & Wallet Payment Gateway (Included — Save $400 USD)',
    growth_f5_gbp: 'Online Card & Wallet Payment Gateway (Included — Save £320 GBP)',
    growth_f5_pkr: 'Online Card & Wallet Payment Gateway (Included — Save PKR 50,000)',
    growth_f6_usd: 'AI Game Matchmaker Sales Chatbot (Included — Save $650 USD)',
    growth_f6_gbp: 'AI Game Matchmaker Sales Chatbot (Included — Save £520 GBP)',
    growth_f6_pkr: 'AI Game Matchmaker Sales Chatbot (Included — Save PKR 65,000)',

    enterprise_name: 'Enterprise Chain & Wholesale OS',
    enterprise_badge: '★ COMPLETE GAMING OS',
    enterprise_desc:
      'For nationwide video game chains, console distributors, and franchise networks needing enterprise trade-in kiosks and ERP integration.',
    enterprise_price_usd: 'From $7,900 USD',
    enterprise_price_gbp: 'From £6,500 GBP',
    enterprise_price_pkr: 'From PKR 850,000',
    enterprise_delivery: '⚡ Delivered in 30 days, guaranteed',
    enterprise_support_usd: 'Dedicated Care Plan: $550 / mo',
    enterprise_support_gbp: 'Dedicated Care Plan: £450 / mo',
    enterprise_support_pkr: 'Dedicated Care Plan: PKR 55,000 / mo',
    enterprise_callout_label: 'MAJOR UPGRADE OVER GROWTH:',
    enterprise_callout_text:
      'Adds unlimited branch outlets, trade-in kiosk mode, B2B gaming cafe / wholesale distribution invoicing, and staff RBAC.',
    enterprise_f1: 'Unlimited Branch Outlets & Testing Counters',
    enterprise_f2: 'In-Store Trade-In Kiosk & Barcode Label Printing',
    enterprise_f3: 'B2B Wholesale Game Distribution & Lounge Invoicing',
    enterprise_f4: 'Granular Staff RBAC (Cashier, Technician, Manager, Owner)',
    enterprise_f5: 'Multi-Gateway Card & Wallet Prepay Integration (Included)',
    enterprise_f6: 'Enterprise AI Game Recommender & Knowledge Agent (Included)',

    whatsapp_cta: 'Claim This Plan on WhatsApp',
    view_terms: 'Review Contract Scope & Warranty Terms →',

    // Live Demo Grid
    demo_badge: 'LIVE PROOF // TEST THE ENGINE BEFORE YOU COMMIT',
    demo_title: 'Nothing is hidden. Click into the working demo systems below.',
    demo_sub:
      'Review how gamers browse PS5 consoles and discs with verified condition grades, calculate trade-in values, and how staff manage serial numbers.',
    demo_store_title: '1. Gaming Storefront Demo',
    demo_store_desc:
      'Explore PS5, Xbox Series X, Nintendo Switch, game discs, and elite controllers with live stock availability.',
    demo_filter_title: '2. Console & Disc Trade-In Engine',
    demo_filter_desc:
      'Test how customers select their console or game disc to get instant cash or store credit valuation.',
    demo_admin_title: '3. Serial Number & RMA Backoffice',
    demo_admin_desc:
      'Inspect how staff log console motherboard serials, anti-tamper seals, and track gross profit margins.',
  },
  'ur-en': {
    hero_badge: 'COMMERCIAL INFRASTRUCTURE // GAMING CONSOLES & DISCS RETAIL OS',
    hero_title_1: 'Console Sales, Game Disc Trade-Ins Aur Pre-Orders Automate Karein',
    hero_title_accent: 'Zero Platform Commission Ke Sath',
    hero_title_2: 'Aur 100% Code Aur Database Malkiat',
    hero_sub:
      'Apni video game shop ya gaming chain ko 24/7 automated retail engine mein tabdeel karein. PS5, Xbox Series X, Nintendo Switch, game discs aur accessories ka custom storefront jismein instant trade-in valuation, serial warranty tracking aur WhatsApp dispatch shamil hai—21 dinon mein 100% code aur database malkiat ke sath.',
    cta_primary: 'Apna Gaming Solution Plan Chunein',
    cta_secondary: 'Live Console Store Demo Dekhein',
    metrics_code: 'Mukammal GitHub & DB Transfer',
    metrics_tax: '100% Retail Munafa Aapka',
    metrics_speed: 'Instant Trade-In Calculator',
    metrics_rma: 'Console Motherboard Serials',
    metrics_code_top: '100% OWNERSHIP',
    metrics_tax_top: '0% PLATFORM TAX',
    metrics_speed_top: 'TRADE-IN ENGINE',
    metrics_rma_top: 'SERIAL & SEAL RMA',

    // Ultimatum Decision Matrix
    ultimatum_badge: 'THE ZERO-RISK DECISION MATRIX',
    ultimatum_title: 'LEADING GAMING RETAILERS HUMAIN KYUN CHUNTAY HAIN',
    ultimatum_sub:
      'Yeh offer is tarah design ki gayi hai ke console retailer har surat mein jeetay. Hum technical execution ka risk apne sar letay hain taake aap baghair kisi khadshay ke business barha sakein.',
    ultimatum_best_tag: 'BEHTAREEN SURAT-E-HAAL',
    ultimatum_best_title: 'Aap ek automated gaming sales engine launch karte hain',
    ultimatum_best_p1: '21 dinon mein dedicated Next.js console storefront aur live trade-in calculator deploy karein.',
    ultimatum_best_p2: 'Discs ke baray mein sawalat khatam ho jayein ge (Brand New Sealed, Mint Scratch-Free Disc badges).',
    ultimatum_best_p3: 'Showroom counter aur online orders ek hi real-time stock inventory share karein ge.',
    ultimatum_best_p4: 'Zero monthly sales commission ke zariye har saal lakhoon rupay bachayein.',
    ultimatum_best_p5: 'Mukammal GitHub repository aur PostgreSQL database aapke accounts mein transfer ho ga.',
    ultimatum_best_footer: 'Nateeja: Aapka karobar barhay ga, retail munafa mehfooz rahay ga aur software aapka apna ho ga.',

    ultimatum_worst_tag: 'BAD-TAREEN SURAT-E-HAAL',
    ultimatum_worst_title: 'Agar hum mutafiqa specifications fulfill na kar sakein',
    ultimatum_worst_p1: 'Aapki jama karwai gayi peshgi deposit 100% fori wapas, baghair kisi jhagray ke.',
    ultimatum_worst_p2: 'Hamara custom console catalog schema aur architecture blueprint muft aapke paas rahay ga.',
    ultimatum_worst_p3: 'Aapke waqt ke azaale ke tor par $250 USD courtesy credit seedha aapke business ko ada kiya jaye ga.',
    ultimatum_worst_p4: 'Koi contract lock-in nahi, koi hidden charges nahi, aur zero financial risk.',
    ultimatum_worst_footer: 'Nateeja: Aapka zero sarmaya risk par hai, nuqsaan kuch nahi aur enterprise tech audit muft milta hai.',

    // Staging Guarantee Banner
    guarantee_badge: 'SAFETY NET // 100% MILESTONE-PROTECTED STAGING GUARANTEE',
    guarantee_title: 'Aakhri Payment Se Pehle Live Staging URL Par Test Karein',
    guarantee_sub:
      'Aap baqaya raqam sirf tab ada karte hain jab aap apne consoles aur games ke sath private staging link par mukammal storefront, trade-in calculator aur multi-branch inventory test kar lein. Agar yeh agreed specs par pura na utray, to peshgi raqam 100% wapas kar di jaye gi.',

    arch_badge: 'SYSTEM ARCHITECTURE',
    arch_title: 'CONSOLE GAMING RETAIL KE LIYE EK YAKJA OPERATING SYSTEM',
    arch_sub:
      'Sirf aam online dukan nahi. Storefront, counter billing, used console trade-in valuation aur WhatsApp dispatch ko aapas mein jorne wala mukammal operating environment.',
    arch_01_title: '01. CUSTOM CONSOLE STOREFRONT',
    arch_01_desc:
      'PS5, Xbox Series X/S, Nintendo Switch, Retro Consoles aur game discs ke liye ultra-fast Next.js storefront jismein game trailers aur platform filtering shamil hai.',
    arch_02_title: '02. CONSOLE & DISC TRADE-IN ENGINE',
    arch_02_desc:
      'Gamers ko apna purana console ya game disc select kar ke condition ke mutabiq fori Cash ya Store Credit valuation check karne ki sahulat dein (CEX style).',
    arch_03_title: '03. DISC & CONSOLE CONDITION GRADING',
    arch_03_desc:
      'Har listing par wazeh badges: Brand New Sealed, Mint Scratch-Free Disc (Checking Guarantee), ya Refurbished Console 90-din warranty ke sath.',
    arch_04_title: '04. MULTI-BRANCH STOCK SYNC',
    arch_04_desc:
      'Physical showrooms, repair/testing counter aur godam ke darmiyan centralized real-time stock synchronization.',
    arch_05_title: '05. MOTHERBOARD SERIAL & WARRANTY RMA',
    arch_05_desc:
      'Invoice par console ka unique motherboard serial aur anti-tamper security sticker print karein taake wapsi par part-swapping ka fraud khatam ho jaye.',
    arch_06_title: '06. WHATSAPP & COURIER AUTO DISPATCH',
    arch_06_desc:
      'Customer ka order console edition, disc region (PAL/NTSC) aur delivery tracking ke sath seedha aapke WhatsApp counter par deliver hota hai.',
    arch_07_title: '07. AI GAME MATCHMAKER CHATBOT',
    arch_07_desc:
      '24/7 automated sales assistant jo customers ke budget, platform aur pasandeeda genres ke mutabiq best games recommend karta hai.',

    plans_badge: 'COMMERCIAL INVESTMENT TIERS',
    plans_title: 'Console Solution Plans.',
    plans_sub:
      'Zero monthly sales commissions. Kaam mukammal hone par 100% source code aur database aapka apna.',
    plans_sub_suffix:
      'Har plan ki mukammal deliverable details, architecture specs aur visual previews dekhne ke liye neeche click karein.',
    detail_btn: 'FULL DETAIL & PREVIEWS DEKHNE KE LIYE CLICK KAREIN →',

    starter_name: 'Single Boutique Gaming Launch',
    starter_badge: 'SINGLE STORE',
    starter_desc:
      'Console shops aur game disc dealers ke liye jo online sales, WhatsApp dispatch aur platform filtering shuru karna chahte hain.',
    starter_price_usd: '$2,250 USD',
    starter_price_gbp: '£1,850 GBP',
    starter_price_pkr: 'PKR 260,000',
    starter_delivery: '⚡ 10 dinon mein guaranteed delivery',
    starter_support_usd: 'Optional Care Plan: $140 / mo',
    starter_support_gbp: 'Optional Care Plan: £115 / mo',
    starter_support_pkr: 'Optional Care Plan: PKR 14,000 / mo',
    starter_callout_label: 'BUNYADI SALAHIYAT:',
    starter_callout_text:
      'Dedicated single-outlet console storefront jismein platform filters, disc condition tags aur WhatsApp checkout shamil hai.',
    starter_f1: 'Next.js Console Storefront (100 SKUs tak)',
    starter_f2: 'Platform Filtering (PS5, Xbox, Switch, Retro)',
    starter_f3: 'Disc & Console Condition Grading Badges',
    starter_f4: '100% Client Code & DB Ownership',

    growth_name: 'Multi-Branch Gaming Retailer',
    growth_badge: '★ MOST POPULAR // BEST VALUE',
    growth_desc:
      'Established video game retailers, trade-in shops aur high-volume console dealers ke liye jo counter aur online dono par sell karte hain.',
    growth_price_usd: '$4,450 USD',
    growth_price_gbp: '£3,650 GBP',
    growth_price_pkr: 'PKR 490,000',
    growth_delivery: '⚡ 21 dinon mein guaranteed delivery',
    growth_support_usd: 'Optional Care Plan: $280 / mo',
    growth_support_gbp: 'Optional Care Plan: £230 / mo',
    growth_support_pkr: 'Optional Care Plan: PKR 28,000 / mo',
    growth_callout_label: 'STARTER SE BARA IZAFA:',
    growth_callout_text:
      'Console & Disc Trade-In Valuation Calculator, 3 branches ka live stock, motherboard serial RMA tracking aur AI Game Matchmaker shamil hai.',
    growth_f1: 'Console & Disc Trade-In / Buyback Valuation Engine',
    growth_f2: '3 Branches Ka Live Stock Sync (Showroom, Counter, Godam)',
    growth_f3: 'Console Serial Number & Anti-Tamper RMA Tracker',
    growth_f4: 'Controllers & Accessories Cross-Sell Engine',
    growth_f5_usd: 'Online Card & Wallet Payment Gateway (Shamil Hai — $400 USD Bachayein)',
    growth_f5_gbp: 'Online Card & Wallet Payment Gateway (Shamil Hai — £320 GBP Bachayein)',
    growth_f5_pkr: 'Online Card & Wallet Payment Gateway (Shamil Hai — PKR 50,000 Bachayein)',
    growth_f6_usd: 'AI Game Matchmaker Sales Chatbot (Shamil Hai — $650 USD Bachayein)',
    growth_f6_gbp: 'AI Game Matchmaker Sales Chatbot (Shamil Hai — £520 GBP Bachayein)',
    growth_f6_pkr: 'AI Game Matchmaker Sales Chatbot (Shamil Hai — PKR 65,000 Bachayein)',

    enterprise_name: 'Enterprise Chain & Wholesale OS',
    enterprise_badge: '★ COMPLETE GAMING OS',
    enterprise_desc:
      'Nationwide video game chains, console distributors aur franchise networks ke liye jinko trade-in kiosks aur ERP sync ki zaroorat hai.',
    enterprise_price_usd: 'From $7,900 USD',
    enterprise_price_gbp: 'From £6,500 GBP',
    enterprise_price_pkr: 'From PKR 850,000',
    enterprise_delivery: '⚡ 30 dinon mein guaranteed delivery',
    enterprise_support_usd: 'Dedicated Care Plan: $550 / mo',
    enterprise_support_gbp: 'Dedicated Care Plan: £450 / mo',
    enterprise_support_pkr: 'Dedicated Care Plan: PKR 55,000 / mo',
    enterprise_callout_label: 'GROWTH SE BARA IZAFA:',
    enterprise_callout_text:
      'La-mehdood branches, in-store trade-in kiosk mode, gaming cafes/lounges ke liye bulk fleet invoicing aur staff RBAC permissions.',
    enterprise_f1: 'La-Mehdood Branches & Testing Counters',
    enterprise_f2: 'In-Store Trade-In Kiosk & Barcode Label Printing',
    enterprise_f3: 'B2B Wholesale Game Distribution & Lounge Invoicing',
    enterprise_f4: 'Granular Staff RBAC (Cashier, Technician, Manager, Owner)',
    enterprise_f5: 'Multi-Gateway Card & Wallet Prepay Integration (Shamil Hai)',
    enterprise_f6: 'Enterprise AI Game Recommender & Knowledge Agent (Shamil Hai)',

    whatsapp_cta: 'Yeh Plan WhatsApp Par Book Karein',
    view_terms: 'Contract Scope & Warranty Sharaait Dekhein →',

    // Live Demo Grid
    demo_badge: 'LIVE PROOF // SYSTEM CHECK KAREIN',
    demo_title: 'Kuch chupa nahi. Live working demo systems khud test karein.',
    demo_sub:
      'Gamers PS5 consoles aur discs ko condition grades ke sath kaise browse karte hain, trade-in calculator kaise kaam karta hai, aur staff serials kaise manage karta hai.',
    demo_store_title: '1. Gaming Storefront Demo',
    demo_store_desc:
      'PS5, Xbox Series X, Nintendo Switch, game discs aur controllers ko real-time branch stock ke sath inspect karein.',
    demo_filter_title: '2. Console & Disc Trade-In Engine',
    demo_filter_desc:
      'Gamers apna purana console ya disc select kar ke fori cash ya store credit value kaise nikalte hain.',
    demo_admin_title: '3. Serial Number & RMA Backoffice',
    demo_admin_desc:
      'Staff console serial numbers, security seal verification aur munafa kaise track karta hai.',
  },
}

const CONSOLE_EXTRAS_DATA = [
  {
    en: 'Console & Disc Trade-In / Buyback Module',
    ur: 'Console & Disc Trade-In / Buyback Module',
    priceUsd: '+ $650 USD',
    priceGbp: '+ £520 GBP',
    pricePkr: '+ PKR 85,000',
    descEn:
      'Enables customers to value their used consoles (PS5, Xbox, Switch) and game discs online for Cash or Store Credit, with condition checklists (Boxed, Unboxed, Fair) and instant purchase slip generation.',
    descUr:
      'Customers ko online purana console ya game disc select kar ke fori Cash ya Store Credit valuation nikalne ki sahulat deta hai (CEX style purchase slip ke sath).',
  },
  {
    en: 'Digital Game Keys & Gift Card Instant Delivery',
    ur: 'Digital Game Keys & Gift Card Delivery',
    priceUsd: '+ $450 USD',
    priceGbp: '+ £360 GBP',
    pricePkr: '+ PKR 60,000',
    descEn:
      'Automated SMS & WhatsApp dispatch of digital codes for PlayStation Plus, Xbox Game Pass, Nintendo eShop, and Steam wallet cards immediately after verified online payment.',
    descUr:
      'Online payment verify hotay hi PlayStation Plus, Game Pass aur Steam wallet ke digital codes WhatsApp aur SMS par automated send karta hai.',
  },
  {
    en: 'Game Disc Rental & Subscription Engine',
    ur: 'Game Disc Rental & Subscription Engine',
    priceUsd: '+ $750 USD',
    priceGbp: '+ £600 GBP',
    pricePkr: '+ PKR 95,000',
    descEn:
      'Allows your store to offer monthly disc rental memberships (e.g. 2 games at a time) with security deposit tracking, automated return due-date reminders, and late fee calculations.',
    descUr:
      'Mahana subscription par game discs rent karne ka system, security deposit tracking aur wapsi ke automated WhatsApp reminders ke sath.',
  },
  {
    en: 'Extra branch or warehouse node',
    ur: 'Extra branch ya godam node',
    priceUsd: '+ $450 USD',
    priceGbp: '+ £360 GBP',
    pricePkr: '+ PKR 60,000',
    descEn:
      'Adds another physical retail store or warehouse to your system. Monitor live console and game stock separately, execute counter sales per branch, and track inter-shop stock transfers.',
    descUr:
      'Aapki ek aur dukan ya godam ko system se jodta hai. Har branch ka alag stock nazar aayega, counter sale hogi aur stock transfer track hoga.',
  },
  {
    en: 'Gamer Loyalty Rewards & Wallet Cashback',
    ur: 'Gamer Loyalty Rewards & Wallet Cashback',
    priceUsd: '+ $550 USD',
    priceGbp: '+ £440 GBP',
    pricePkr: '+ PKR 70,000',
    descEn:
      'Rewards gamers with XP points and store wallet credit on every game purchase and trade-in, driving repeat footfall to your physical counter and website.',
    descUr:
      'Gamers ko har purchase aur trade-in par reward points aur store wallet balance deta hai taake wo bar bar aapki dukan se games khareedein.',
  },
  {
    en: 'Multi-vendor gaming marketplace',
    ur: 'Multi-vendor gaming marketplace',
    priceUsd: '+ $1,200 USD',
    priceGbp: '+ £980 GBP',
    pricePkr: '+ PKR 150,000',
    descEn:
      'Allows trusted third-party game sellers and retro collectors to list their consoles and rare discs on your platform while you retain an automated commission on every transaction.',
    descUr:
      'Doosray gaming sellers aur retro collectors ko aapki site par samaan bechne ki ijazat deta hai jahan aap har sale par commission rakhain ge.',
  },
]

export default function ConsoleRetailSolution() {
  const [lang, setLang] = useState(detectInitialLanguage)
  const [currency, setCurrency] = useState(detectInitialCurrency)
  const [activeModalKey, setActiveModalKey] = useState(null)
  const [expandedExtras, setExpandedExtras] = useState({})

  const isUrdu = lang === 'ur-en'
  const t = I18N_DATA[lang] || I18N_DATA.en

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleLangChange = (newLang) => {
    setLang(newLang)
    try {
      localStorage.setItem('texcodes_console_lang', newLang)
    } catch (e) {}
  }

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency)
    try {
      localStorage.setItem('texcodes_currency', newCurrency)
    } catch (e) {}
  }

  const toggleExtra = (idx) => {
    setExpandedExtras((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }))
  }

  const openWhatsApp = (planName, price) => {
    const text = `Hi TeXCodes, I am interested in the ${planName} (${price}) for my Video Game & Console retail store. I would like to inspect the technical scope and discuss deployment.`
    window.open(`https://wa.me/923091824000?text=${encodeURIComponent(text)}`, '_blank')
  }

  // Comprehensive Modal Data
  const modalData = {
    starter: {
      planCode: 'TXS-CONSOLE-STARTER',
      tierName: t.starter_name,
      price: currency === 'USD' ? t.starter_price_usd : currency === 'GBP' ? t.starter_price_gbp : t.starter_price_pkr,
      deliveryTime: t.starter_delivery,
      supportPlan: currency === 'USD' ? t.starter_support_usd : currency === 'GBP' ? t.starter_support_gbp : t.starter_support_pkr,
      idealFit: isUrdu
        ? 'Single boutique video game stores, retro console sellers, aur game disc dealers jo online sales aur direct WhatsApp checkout shuru karna chahte hain.'
        : 'Single video game boutique shops, retro console sellers, and physical game disc dealers starting online sales with WhatsApp order routing.',
      artifacts: [
        {
          title: 'Console Storefront & Platform Filter',
          image: '/txs/dashboard products.png',
          tag: 'Storefront',
        },
        {
          title: 'Disc Condition & Verification Badges',
          image: '/txs/admin site control.png',
          tag: 'Catalog UI',
        },
      ],
      modules: [
        {
          title: isUrdu ? 'Custom Next.js Gaming Storefront' : 'Custom Next.js Gaming Storefront',
          desc: isUrdu
            ? 'PS5, Xbox, Nintendo Switch aur retro games ke liye tezz tareen storefront.'
            : 'Ultra-fast Next.js gaming storefront with platform filters (PS5, Xbox, Switch, Retro).',
          items: [
            isUrdu ? '100 SKUs tak consoles, games aur controllers ka catalog' : 'Up to 100 console, game disc, and controller listings',
            isUrdu ? 'Brand New Sealed aur Mint Scratch-Free Disc condition tags' : 'Condition grading badges (Brand New Sealed, Mint Scratch-Free)',
            isUrdu ? 'Direct WhatsApp automated order dispatch' : 'Pre-formatted customer WhatsApp order dispatch',
          ],
        },
        {
          title: isUrdu ? '100% Code Aur Database Malkiat' : '100% Code & Database Ownership',
          desc: isUrdu
            ? 'Launch par mukammal GitHub repo aur PostgreSQL database transfer.'
            : 'Full GitHub repository and PostgreSQL database ownership transferred upon final settlement.',
          items: [
            isUrdu ? 'Zero monthly sales commissions ya platform fees' : 'Zero monthly transaction fees or platform tax',
            isUrdu ? 'Mukammal source code aur data aapke azad control mein' : 'Independent database control with no third-party lock-in',
          ],
        },
      ],
      exclusions: [
        isUrdu ? 'Console & disc trade-in buyback engine (Growth plan mein shamil hai).' : 'Console & disc trade-in buyback engine (Included in Growth tier).',
        isUrdu ? 'Multi-branch inventory sync (Growth plan mein shamil hai).' : 'Multi-branch stock synchronization (Included in Growth tier).',
      ],
    },
    growth: {
      planCode: 'TXS-CONSOLE-GROWTH',
      tierName: t.growth_name,
      price: currency === 'USD' ? t.growth_price_usd : currency === 'GBP' ? t.growth_price_gbp : t.growth_price_pkr,
      deliveryTime: t.growth_delivery,
      supportPlan: currency === 'USD' ? t.growth_support_usd : currency === 'GBP' ? t.growth_support_gbp : t.growth_support_pkr,
      idealFit: isUrdu
        ? 'Established gaming stores, used console trade-in retailers, aur multi-counter shops jo showroom aur online dono par sell karte hain.'
        : 'Established video game shops, used console trade-in retailers, and high-volume gaming stores operating physical counters and online sales.',
      artifacts: [
        {
          title: 'Trade-In Valuation Calculator',
          image: '/txs/dashboard orders.png',
          tag: 'Trade-In Engine',
        },
        {
          title: 'Console Serial & Warranty RMA Tracker',
          image: '/txs/admin warranty.png',
          tag: 'Serial RMA',
        },
        {
          title: 'Multi-Branch Inventory Sync',
          image: '/txs/dashboard inventory.png',
          tag: 'Stock Matrix',
        },
      ],
      modules: [
        {
          title: isUrdu ? 'Console & Disc Trade-In / Buyback Engine' : 'Console & Disc Trade-In / Buyback Engine',
          desc: isUrdu
            ? 'Customers ko online used console ya games select kar ke fori Cash ya Store Credit quote lene ki sahulat.'
            : 'Allows customers to select used consoles or game discs and get instant Cash or Store Credit valuations based on condition.',
          items: [
            isUrdu ? 'PS5, PS4, Xbox, Switch ke liye condition grading (Boxed, Unboxed, Fair)' : 'Condition grading matrices (Boxed, Unboxed, Fair) with automated valuations',
            isUrdu ? 'Instant customer trade-in slip generation for shop counter drop-off' : 'Instant customer trade-in vouchers for counter drop-off and courier intake',
          ],
        },
        {
          title: isUrdu ? 'Console Serial Number & Security Seal RMA' : 'Console Motherboard Serial & Anti-Tamper RMA',
          desc: isUrdu
            ? 'Invoices par console motherboard serial aur warranty stickers print kar ke fraud rokain.'
            : 'Track console motherboard serial numbers and anti-tamper security stickers on invoices to eliminate return fraud.',
          items: [
            isUrdu ? 'Har console ka unique serial number database mein store ho ga' : 'Unique hardware serial logging on invoice and warranty records',
            isUrdu ? 'Part-swapping aur counterfeit disc return claims ka fori khatma' : 'Eliminates part-swapping fraud and counterfeit disc returns',
          ],
        },
        {
          title: isUrdu ? '3-Branch Inventory Sync' : '3-Branch Real-Time Inventory Sync',
          desc: isUrdu
            ? 'Showroom counter, testing lab aur godam ke darmiyan live stock update.'
            : 'Live stock count synchronization across showroom counters, testing benches, and central warehouse.',
          items: [
            isUrdu ? 'Counter sale hotay hi online website par stock fori update' : 'Instant online catalog stock update upon in-store counter checkout',
            isUrdu ? 'Dukanon ke darmiyan internal stock transfer slips' : 'Branch-to-branch transfer logging and sign-off',
          ],
        },
        {
          title: isUrdu ? 'AI Game Matchmaker Sales Chatbot' : 'AI Game Matchmaker Sales Chatbot',
          desc: isUrdu
            ? '24/7 automated sales assistant jo customers ko unke budget aur genre ke mutabiq games recommend karta hai.'
            : '24/7 automated sales assistant that matches customer budgets and preferences to in-stock consoles and games.',
          items: [
            isUrdu ? 'Couch Co-op, RPG, Sports, Soulslike filters' : 'Filters by single-player, couch co-op, PEGI/ESRB age ratings, and genres',
            isUrdu ? 'Visitors ko seedha WhatsApp aur online checkout par convert karta hai' : 'Converts gaming inquiries directly into verified sales',
          ],
        },
      ],
      exclusions: [
        isUrdu ? 'Physical console hardware board repairs (Software architecture shamil hai).' : 'Physical console hardware motherboard repairs (Software and systems included).',
      ],
    },
    enterprise: {
      planCode: 'TXS-CONSOLE-ENTERPRISE',
      tierName: t.enterprise_name,
      price: currency === 'USD' ? t.enterprise_price_usd : currency === 'GBP' ? t.enterprise_price_gbp : t.enterprise_price_pkr,
      deliveryTime: t.enterprise_delivery,
      supportPlan: currency === 'USD' ? t.enterprise_support_usd : currency === 'GBP' ? t.enterprise_support_gbp : t.enterprise_support_pkr,
      idealFit: isUrdu
        ? 'Nationwide video game retail chains, console importers, franchise networks, aur gaming lounges ke wholesale suppliers.'
        : 'Nationwide video game retail chains, console importers, franchise networks, and commercial suppliers to gaming lounges and esports centers.',
      artifacts: [
        {
          title: 'In-Store Trade-In Kiosk & Barcode System',
          image: '/txs/admin site control.png',
          tag: 'Kiosk System',
        },
        {
          title: 'B2B Wholesale & Gaming Lounge Invoicing',
          image: '/txs/dashboard products.png',
          tag: 'B2B Fleet',
        },
        {
          title: 'Granular Multi-Staff RBAC Matrix',
          image: '/txs/admin warranty.png',
          tag: 'Staff RBAC',
        },
      ],
      modules: [
        {
          title: isUrdu ? 'La-Mehdood Branches Aur Trade-In Kiosk Mode' : 'Unlimited Branches & In-Store Trade-In Kiosks',
          desc: isUrdu
            ? 'Tamam retail outlets aur testing counters ke liye centralized enterprise control.'
            : 'Centralized enterprise retail operation across unlimited physical store branches and testing counters.',
          items: [
            isUrdu ? 'Dukan ke counter par touch-screen trade-in kiosk mode' : 'Touchscreen trade-in kiosk mode for physical counter intake',
            isUrdu ? 'Thermal barcode label printing used games aur consoles ke liye' : 'Thermal barcode sticker printing for graded used discs and consoles',
          ],
        },
        {
          title: isUrdu ? 'B2B Wholesale & Gaming Lounge Fleet Invoicing' : 'B2B Wholesale & Gaming Lounge Fleet Invoicing',
          desc: isUrdu
            ? 'Gaming cafes aur wholesale buyers ke liye 5 se 50 consoles ke bulk quotes.'
            : 'Bulk quotation and invoicing engine for gaming cafes, esports centers, and sub-dealers.',
          items: [
            isUrdu ? 'Bulk tiered discounts aur corporate PDF invoices' : 'Tiered volume discounts and corporate PDF invoices with tax breakdown',
            isUrdu ? 'Wholesale buyers ke liye alag khata management' : 'Separate ledger and credit line management for trusted sub-dealers',
          ],
        },
        {
          title: isUrdu ? 'Staff RBAC Permissions (Technician, Cashier, Manager, Owner)' : 'Granular Staff RBAC Permissions',
          desc: isUrdu
            ? 'Mulazimeen ke ikhtiyarat unke designation ke mutabiq restrict karein.'
            : 'Enforce role-based access control across testing technicians, cashiers, store managers, and owners.',
          items: [
            isUrdu ? 'Owner: Mukammal munafa, purchase costs aur branch rankings dekhe ga' : 'Owner: Complete profit margin oversight, purchase ledger, and branch metrics',
            isUrdu ? 'Technician: Sirf console testing, condition grading aur RMA log kare ga' : 'Technician: Restricted to hardware testing, condition grading, and serial logging',
            isUrdu ? 'Cashier: Sirf customer sale, trade-in voucher redemption aur receipt banaye ga' : 'Cashier: Restricted to sales checkout, trade-in voucher payout, and receipt printing',
          ],
        },
      ],
      exclusions: [
        isUrdu ? 'Physical store interior signage printing (Software architecture shamil hai).' : 'Physical store interior signage printing (Full software and digital assets included).',
      ],
    },
  }

  return (
    <div className="w-full bg-[#F6F5F0] dark:bg-[#0F0F11] min-h-screen text-[#0F0F0F] dark:text-[#EDECE6] transition-colors duration-200">
      {/* ─── Top Control Strip ─── */}
      <div className="border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#161619] px-4 sm:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#059669] dark:text-[#10B981] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981] animate-pulse" />
            <span className="uppercase tracking-wider">OFFER CODE: TXS-CONSOLE-OS</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="inline-flex items-center bg-white dark:bg-[#1F1F24] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] p-0.5">
              <button
                onClick={() => handleLangChange('en')}
                className={`px-2 py-0.5 font-bold transition-colors cursor-pointer ${
                  lang === 'en'
                    ? 'bg-[#059669] text-white shadow-xs'
                    : 'text-[#575652] dark:text-[#9B9A95] hover:text-[#0F0F0F] dark:hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLangChange('ur-en')}
                className={`px-2 py-0.5 font-bold transition-colors cursor-pointer ${
                  lang === 'ur-en'
                    ? 'bg-[#059669] text-white shadow-xs'
                    : 'text-[#575652] dark:text-[#9B9A95] hover:text-[#0F0F0F] dark:hover:text-white'
                }`}
              >
                URDU (ROMAN)
              </button>
            </div>

            {/* Currency Selector */}
            <div className="inline-flex items-center bg-white dark:bg-[#1F1F24] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] p-0.5">
              <button
                onClick={() => handleCurrencyChange('USD')}
                className={`px-2 py-0.5 font-bold transition-colors cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-[#059669] text-white shadow-xs'
                    : 'text-[#575652] dark:text-[#9B9A95] hover:text-[#0F0F0F] dark:hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => handleCurrencyChange('GBP')}
                className={`px-2 py-0.5 font-bold transition-colors cursor-pointer ${
                  currency === 'GBP'
                    ? 'bg-[#059669] text-white shadow-xs'
                    : 'text-[#575652] dark:text-[#9B9A95] hover:text-[#0F0F0F] dark:hover:text-white'
                }`}
              >
                GBP (£)
              </button>
              <button
                onClick={() => handleCurrencyChange('PKR')}
                className={`px-2 py-0.5 font-bold transition-colors cursor-pointer ${
                  currency === 'PKR'
                    ? 'bg-[#059669] text-white shadow-xs'
                    : 'text-[#575652] dark:text-[#9B9A95] hover:text-[#0F0F0F] dark:hover:text-white'
                }`}
              >
                PKR (Rs)
              </button>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* ─── Hero Section ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] relative overflow-hidden bg-[#FAF9F5] dark:bg-[#161619]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

        <FadeIn className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold bg-[#ECFDF5] dark:bg-[rgba(16,185,129,0.15)] px-3 py-1 border border-[#059669]/25 dark:border-[#10B981]/30">
            <Gamepad2 size={14} className="text-[#059669] dark:text-[#10B981]" />
            <span>{t.hero_badge}</span>
          </div>

          <h1 className="offer-h1 text-[#0F0F0F] dark:text-[#EDECE6] max-w-5xl">
            {t.hero_title_1}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] via-[#10B981] to-[#34D399] drop-shadow-xs">
              {t.hero_title_accent}
            </span>{' '}
            {t.hero_title_2}
          </h1>

          <p className="offer-lede text-[#575652] dark:text-[#9B9A95] max-w-3xl">
            {t.hero_sub}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#plans"
              className="btn-blue offer-btn offer-btn-xl shadow-md group relative overflow-hidden"
            >
              <span className="relative z-10">{t.cta_primary}</span>
              <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1.5 transition-transform" />
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none animate-shimmer-sweep" />
            </a>
            <a
              href="#demo"
              className="btn-outline offer-btn offer-btn-lg group relative overflow-hidden"
            >
              <span className="relative z-10">{t.cta_secondary}</span>
              <ArrowUpRight size={14} className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#10B981]/15 to-transparent pointer-events-none animate-shimmer-sweep" />
            </a>
          </div>

          {/* Metrics Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] offer-ui">
            <div className="p-4 bg-white dark:bg-[#121215] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)]">
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#059669] dark:text-[#10B981]">{t.metrics_code_top}</div>
              <div className="text-xs text-[#575652] dark:text-[#9B9A95] mt-1">{t.metrics_code}</div>
            </div>
            <div className="p-4 bg-white dark:bg-[#121215] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)]">
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#059669] dark:text-[#10B981]">{t.metrics_tax_top}</div>
              <div className="text-xs text-[#575652] dark:text-[#9B9A95] mt-1">{t.metrics_tax}</div>
            </div>
            <div className="p-4 bg-white dark:bg-[#121215] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)]">
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#059669] dark:text-[#10B981]">{t.metrics_speed_top}</div>
              <div className="text-xs text-[#575652] dark:text-[#9B9A95] mt-1">{t.metrics_speed}</div>
            </div>
            <div className="p-4 bg-white dark:bg-[#121215] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)]">
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#059669] dark:text-[#10B981]">{t.metrics_rma_top}</div>
              <div className="text-xs text-[#575652] dark:text-[#9B9A95] mt-1">{t.metrics_rma}</div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── Zero-Risk Decision Matrix ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)]">
        <FadeIn className="max-w-7xl mx-auto space-y-8">
          <div>
            <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold mb-2">
              {t.ultimatum_badge}
            </div>
            <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
              {t.ultimatum_title}
            </h2>
            <p className="offer-body text-[#575652] dark:text-[#9B9A95] max-w-3xl mt-2">
              {t.ultimatum_sub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Best Case */}
            <div className="p-6 sm:p-8 bg-white dark:bg-[#161619] border-2 border-[#059669] dark:border-[#10B981] space-y-5 shadow-sm card-hover-guided">
              <div className="flex items-center justify-between border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-3">
                <span className="offer-eyebrow font-bold text-[#059669] dark:text-[#10B981] bg-[#ECFDF5] dark:bg-[#10B981]/15 px-2.5 py-0.5">
                  {t.ultimatum_best_tag}
                </span>
                <CheckCircle2 size={18} className="text-[#059669] dark:text-[#10B981]" />
              </div>
              <h3 className="offer-h3 text-[#0F0F0F] dark:text-[#EDECE6]">
                {t.ultimatum_best_title}
              </h3>
              <ul className="space-y-3 offer-ui text-[#575652] dark:text-[#9B9A95]">
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>{t.ultimatum_best_p1}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>{t.ultimatum_best_p2}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>{t.ultimatum_best_p3}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>{t.ultimatum_best_p4}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>{t.ultimatum_best_p5}</span>
                </li>
              </ul>
              <div className="pt-3 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] font-mono text-xs font-semibold text-[#059669] dark:text-[#10B981]">
                {t.ultimatum_best_footer}
              </div>
            </div>

            {/* Worst Case */}
            <div className="p-6 sm:p-8 bg-[#FAF9F5] dark:bg-[#121215] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-5 shadow-sm card-hover-guided">
              <div className="flex items-center justify-between border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-3">
                <span className="offer-eyebrow font-bold text-[#E11D48] bg-rose-50 dark:bg-rose-950/40 px-2.5 py-0.5">
                  {t.ultimatum_worst_tag}
                </span>
                <ShieldCheck size={18} className="text-[#059669] dark:text-[#10B981]" />
              </div>
              <h3 className="offer-h3 text-[#0F0F0F] dark:text-[#EDECE6]">
                {t.ultimatum_worst_title}
              </h3>
              <ul className="space-y-3 offer-ui text-[#575652] dark:text-[#9B9A95]">
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>{t.ultimatum_worst_p1}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>{t.ultimatum_worst_p2}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>{t.ultimatum_worst_p3}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>{t.ultimatum_worst_p4}</span>
                </li>
              </ul>
              <div className="pt-3 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] font-mono text-xs font-semibold text-[#575652] dark:text-[#9B9A95]">
                {t.ultimatum_worst_footer}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── Staging Guarantee Banner ─── */}
      <section className="px-4 sm:px-8 py-12 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#ECFDF5]/60 dark:bg-[rgba(16,185,129,0.06)]">
        <FadeIn className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 offer-eyebrow font-bold text-[#059669] dark:text-[#10B981]">
              <ShieldCheck size={16} />
              <span>{t.guarantee_badge}</span>
            </div>
            <h3 className="offer-h3 text-[#0F0F0F] dark:text-[#EDECE6]">
              {t.guarantee_title}
            </h3>
            <p className="offer-body text-[#575652] dark:text-[#9B9A95] max-w-3xl">
              {t.guarantee_sub}
            </p>
          </div>
          <Link
            to="/solutions/tech-retail/terms"
            className="btn-outline offer-btn offer-btn-md shrink-0 font-mono text-xs flex items-center gap-1.5"
          >
            <span>{t.view_terms}</span>
          </Link>
        </FadeIn>
      </section>

      {/* ─── System Architecture ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#121215]">
        <FadeIn className="max-w-7xl mx-auto space-y-12">
          <div>
            <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold mb-2">
              {t.arch_badge}
            </div>
            <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
              {t.arch_title}
            </h2>
            <p className="offer-body text-[#575652] dark:text-[#9B9A95] max-w-3xl mt-2">
              {t.arch_sub}
            </p>
          </div>

          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                <span className="font-bold">MOD_01</span>
                <Gamepad2 size={16} />
              </div>
              <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6]">{t.arch_01_title}</h4>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.arch_01_desc}</p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                <span className="font-bold">MOD_02</span>
                <RefreshCw size={16} />
              </div>
              <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6]">{t.arch_02_title}</h4>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.arch_02_desc}</p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                <span className="font-bold">MOD_03</span>
                <Disc size={16} />
              </div>
              <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6]">{t.arch_03_title}</h4>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.arch_03_desc}</p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                <span className="font-bold">MOD_04</span>
                <Boxes size={16} />
              </div>
              <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6]">{t.arch_04_title}</h4>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.arch_04_desc}</p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                <span className="font-bold">MOD_05</span>
                <Tag size={16} />
              </div>
              <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6]">{t.arch_05_title}</h4>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.arch_05_desc}</p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                <span className="font-bold">MOD_06</span>
                <MessageSquare size={16} />
              </div>
              <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6]">{t.arch_06_title}</h4>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.arch_06_desc}</p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border-2 border-[#059669] dark:border-[#10B981] space-y-3 card-hover-guided md:col-span-2 lg:col-span-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                <span className="font-bold">MOD_07 // AI SALES AGENT</span>
                <Sparkles size={16} />
              </div>
              <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6]">{t.arch_07_title}</h4>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.arch_07_desc}</p>
            </StaggerItem>
          </StaggerContainer>
        </FadeIn>
      </section>

      {/* ─── Live Demo Grid ─── */}
      <section id="demo" className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)]">
        <FadeIn className="max-w-7xl mx-auto space-y-8">
          <div>
            <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold mb-2">
              {t.demo_badge}
            </div>
            <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
              {t.demo_title}
            </h2>
            <p className="offer-body text-[#575652] dark:text-[#9B9A95] max-w-3xl mt-2">
              {t.demo_sub}
            </p>
          </div>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-3 gap-6 offer-ui">
            <StaggerItem>
              <a
                href="http://localhost:5174"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] card-hover-guided group block space-y-3 shadow-xs h-full"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                  <span>01</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6] group-hover:text-[#059669] dark:group-hover:text-[#10B981] transition-colors">
                  {t.demo_store_title}
                </h4>
                <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                  {t.demo_store_desc}
                </p>
              </a>
            </StaggerItem>

            <StaggerItem>
              <a
                href="http://localhost:5174#trade-in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] card-hover-guided group block space-y-3 shadow-xs h-full"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                  <span>02</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6] group-hover:text-[#059669] dark:group-hover:text-[#10B981] transition-colors">
                  {t.demo_filter_title}
                </h4>
                <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                  {t.demo_filter_desc}
                </p>
              </a>
            </StaggerItem>

            <StaggerItem>
              <a
                href="http://localhost:5174#admin"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] card-hover-guided group block space-y-3 shadow-xs h-full"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                  <span>03</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6] group-hover:text-[#059669] dark:group-hover:text-[#10B981] transition-colors">
                  {t.demo_admin_title}
                </h4>
                <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                  {t.demo_admin_desc}
                </p>
              </a>
            </StaggerItem>
          </StaggerContainer>
        </FadeIn>
      </section>

      {/* ─── Plans Section ─── */}
      <section id="plans" className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#121215]">
        <FadeIn className="max-w-7xl mx-auto space-y-8">
          <div>
            <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold mb-2">
              {t.plans_badge}
            </div>
            <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
              {t.plans_title}
            </h2>
            <p className="offer-body text-[#575652] dark:text-[#9B9A95] max-w-3xl mt-2">
              {t.plans_sub} {t.plans_sub_suffix}
            </p>
          </div>

          {/* Guided Conversion Flow Ribbon */}
          <div className="p-3 bg-[#ECFDF5] dark:bg-[#10B981]/10 border border-[#059669]/30 dark:border-[#10B981]/30 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#059669] dark:text-[#10B981]">
            <div className="flex items-center gap-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981] animate-ping" />
              <span>HOW TO PROCEED:</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[#575652] dark:text-[#EDECE6]">
              <span>1. Choose your plan tier</span>
              <span>→</span>
              <span>2. Click button to inspect full specs & screenshots</span>
              <span>→</span>
              <span>3. Claim via WhatsApp with 100% money-back staging guarantee</span>
            </div>
          </div>

          {/* 3 Plan Cards Grid */}
          <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* 1. Starter Tier */}
            <StaggerItem className="h-full">
              <div className="p-8 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow h-full card-hover-guided">
                <div className="space-y-4">
                  <div className="tag-green">{t.starter_badge}</div>
                  <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.starter_name}</div>
                  <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.starter_desc}</p>

                  <div className="pt-2 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)]">
                    <div className="offer-h3 text-[#059669] dark:text-[#10B981]">
                      {currency === 'USD' ? t.starter_price_usd : currency === 'GBP' ? t.starter_price_gbp : t.starter_price_pkr}
                    </div>
                    <div className="offer-ui text-[#059669] dark:text-[#10B981] font-semibold mt-1">{t.starter_delivery}</div>
                  </div>

                  <div className="p-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] offer-ui text-[#0F0F0F] dark:text-[#EDECE6] space-y-1">
                    <div className="font-bold text-[#059669] dark:text-[#10B981] offer-eyebrow">{t.starter_callout_label}</div>
                    <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.starter_callout_text}</p>
                  </div>

                  <div className="pt-2 space-y-2 offer-ui text-[#0F0F0F] dark:text-[#EDECE6]">
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.starter_f1}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.starter_f2}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.starter_f3}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.starter_f4}</span>
                    </div>
                  </div>

                  {/* Modal Trigger Button */}
                  <div className="pt-3">
                    <button
                      onClick={() => setActiveModalKey('starter')}
                      className="relative overflow-hidden w-full bg-[#ECFDF5] dark:bg-[#10B981]/15 text-[#059669] dark:text-[#10B981] border-2 border-[#059669]/50 dark:border-[#10B981]/50 offer-btn offer-btn-sm font-extrabold hover:bg-[#059669] hover:text-white dark:hover:bg-[#10B981] dark:hover:text-black transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs animate-click-me group"
                    >
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#059669] dark:bg-[#10B981] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669] dark:bg-[#10B981]"></span>
                      </span>
                      <Info size={18} className="shrink-0 group-hover:rotate-12 transition-transform" />
                      <span>{t.detail_btn}</span>
                      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent pointer-events-none animate-shimmer-sweep" />
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] space-y-3">
                  <button
                    onClick={() => openWhatsApp(t.starter_name, currency === 'USD' ? t.starter_price_usd : currency === 'GBP' ? t.starter_price_gbp : t.starter_price_pkr)}
                    className="btn-outline w-full justify-center offer-btn offer-btn-lg animate-claim-outline group relative overflow-hidden transition-all duration-300 cursor-pointer"
                  >
                    <MessageSquare size={14} className="animate-icon-wiggle group-hover:scale-125 transition-transform text-[#059669] dark:text-[#10B981]" />
                    <span>{t.whatsapp_cta}</span>
                    <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#059669]/10 to-transparent pointer-events-none animate-shimmer-sweep" />
                  </button>
                  <div className="offer-ui text-[#8E8D88] dark:text-[#6A6965] text-center">
                    {currency === 'USD' ? t.starter_support_usd : currency === 'GBP' ? t.starter_support_gbp : t.starter_support_pkr}
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* 2. Growth Tier (Most Popular) */}
            <StaggerItem className="h-full">
              <div className="p-8 bg-white dark:bg-[#161619] border-2 border-[#059669] dark:border-[#10B981] space-y-6 flex flex-col justify-between shadow-lg relative hover:shadow-xl transition-shadow h-full card-hover-guided">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#059669] dark:bg-[#10B981] text-white offer-eyebrow font-bold px-3 py-1 shadow-sm">
                  {t.growth_badge}
                </div>

                <div className="space-y-4">
                  <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.growth_name}</div>
                  <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.growth_desc}</p>

                  <div className="pt-2 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)]">
                    <div className="offer-h3 text-[#059669] dark:text-[#10B981]">
                      {currency === 'USD' ? t.growth_price_usd : currency === 'GBP' ? t.growth_price_gbp : t.growth_price_pkr}
                    </div>
                    <div className="offer-ui text-[#059669] dark:text-[#10B981] font-semibold mt-1">{t.growth_delivery}</div>
                  </div>

                  <div className="p-3 bg-[#ECFDF5] dark:bg-[#10B981]/15 border border-[#059669]/25 dark:border-[#10B981]/30 offer-ui text-[#0F0F0F] dark:text-[#EDECE6] space-y-1">
                    <div className="font-bold text-[#059669] dark:text-[#10B981] offer-eyebrow">{t.growth_callout_label}</div>
                    <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.growth_callout_text}</p>
                  </div>

                  <div className="pt-2 space-y-2 offer-ui text-[#0F0F0F] dark:text-[#EDECE6]">
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span className="font-bold">{t.growth_f1}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.growth_f2}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.growth_f3}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.growth_f4}</span>
                    </div>
                    <div className="flex items-start gap-2 text-[#059669] dark:text-[#10B981] font-semibold">
                      <Check size={14} className="shrink-0 mt-0.5" />
                      <span>{currency === 'USD' ? t.growth_f5_usd : currency === 'GBP' ? t.growth_f5_gbp : t.growth_f5_pkr}</span>
                    </div>
                    <div className="flex items-start gap-2 text-[#059669] dark:text-[#10B981] font-semibold">
                      <Check size={14} className="shrink-0 mt-0.5" />
                      <span>{currency === 'USD' ? t.growth_f6_usd : currency === 'GBP' ? t.growth_f6_gbp : t.growth_f6_pkr}</span>
                    </div>
                  </div>

                  {/* Prominent Modal Trigger Button */}
                  <div className="pt-3">
                    <button
                      onClick={() => setActiveModalKey('growth')}
                      className="relative overflow-hidden w-full bg-[#059669] dark:bg-[#10B981] text-white offer-btn offer-btn-sm font-extrabold hover:bg-[#047857] dark:hover:bg-[#059669] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md animate-click-me-solid group"
                    >
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      <Info size={18} className="shrink-0 group-hover:rotate-12 transition-transform" />
                      <span>{t.detail_btn}</span>
                      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none animate-shimmer-sweep" />
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] space-y-3">
                  <button
                    onClick={() => openWhatsApp(t.growth_name, currency === 'USD' ? t.growth_price_usd : currency === 'GBP' ? t.growth_price_gbp : t.growth_price_pkr)}
                    className="btn-blue w-full justify-center offer-btn offer-btn-lg animate-claim-solid shadow-md group relative overflow-hidden transition-all duration-300 cursor-pointer"
                  >
                    <MessageSquare size={14} className="animate-icon-wiggle group-hover:scale-125 transition-transform text-white" />
                    <span>{t.whatsapp_cta}</span>
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none animate-shimmer-sweep" />
                  </button>
                  <div className="offer-ui text-[#8E8D88] dark:text-[#6A6965] text-center">
                    {currency === 'USD' ? t.growth_support_usd : currency === 'GBP' ? t.growth_support_gbp : t.growth_support_pkr}
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* 3. Enterprise Tier */}
            <StaggerItem className="h-full">
              <div className="p-8 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow h-full card-hover-guided">
                <div className="space-y-4">
                  <div className="tag-green">{t.enterprise_badge}</div>
                  <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.enterprise_name}</div>
                  <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.enterprise_desc}</p>

                  <div className="pt-2 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)]">
                    <div className="offer-h3 text-[#059669] dark:text-[#10B981]">
                      {currency === 'USD' ? t.enterprise_price_usd : currency === 'GBP' ? t.enterprise_price_gbp : t.enterprise_price_pkr}
                    </div>
                    <div className="offer-ui text-[#059669] dark:text-[#10B981] font-semibold mt-1">{t.enterprise_delivery}</div>
                  </div>

                  <div className="p-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] offer-ui text-[#0F0F0F] dark:text-[#EDECE6] space-y-1">
                    <div className="font-bold text-[#059669] dark:text-[#10B981] offer-eyebrow">{t.enterprise_callout_label}</div>
                    <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.enterprise_callout_text}</p>
                  </div>

                  <div className="pt-2 space-y-2 offer-ui text-[#0F0F0F] dark:text-[#EDECE6]">
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span className="font-bold">{t.enterprise_f1}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.enterprise_f2}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.enterprise_f3}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.enterprise_f4}</span>
                    </div>
                    <div className="flex items-start gap-2 text-[#059669] dark:text-[#10B981]">
                      <Check size={14} className="shrink-0 mt-0.5" />
                      <span>{t.enterprise_f5}</span>
                    </div>
                    <div className="flex items-start gap-2 text-[#059669] dark:text-[#10B981]">
                      <Check size={14} className="shrink-0 mt-0.5" />
                      <span>{t.enterprise_f6}</span>
                    </div>
                  </div>

                  {/* Modal Trigger Button */}
                  <div className="pt-3">
                    <button
                      onClick={() => setActiveModalKey('enterprise')}
                      className="relative overflow-hidden w-full bg-[#ECFDF5] dark:bg-[#10B981]/15 text-[#059669] dark:text-[#10B981] border-2 border-[#059669]/50 dark:border-[#10B981]/50 offer-btn offer-btn-sm font-extrabold hover:bg-[#059669] hover:text-white dark:hover:bg-[#10B981] dark:hover:text-black transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs animate-click-me group"
                    >
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#059669] dark:bg-[#10B981] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669] dark:bg-[#10B981]"></span>
                      </span>
                      <Info size={18} className="shrink-0 group-hover:rotate-12 transition-transform" />
                      <span>{t.detail_btn}</span>
                      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent pointer-events-none animate-shimmer-sweep" />
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] space-y-3">
                  <button
                    onClick={() => openWhatsApp(t.enterprise_name, currency === 'USD' ? t.enterprise_price_usd : currency === 'GBP' ? t.enterprise_price_gbp : t.enterprise_price_pkr)}
                    className="btn-outline w-full justify-center offer-btn offer-btn-lg animate-claim-outline group relative overflow-hidden transition-all duration-300 cursor-pointer"
                  >
                    <MessageSquare size={14} className="animate-icon-wiggle group-hover:scale-125 transition-transform text-[#059669] dark:text-[#10B981]" />
                    <span>{t.whatsapp_cta}</span>
                    <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#059669]/10 to-transparent pointer-events-none animate-shimmer-sweep" />
                  </button>
                  <div className="offer-ui text-[#8E8D88] dark:text-[#6A6965] text-center">
                    {currency === 'USD' ? t.enterprise_support_usd : currency === 'GBP' ? t.enterprise_support_gbp : t.enterprise_support_pkr}
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* ─── Add-ons / Extras Accordion ─── */}
          <div className="pt-12 border-t border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-6">
            <div>
              <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold mb-1">
                {isUrdu ? 'IKHTIYARI IZAFI MODULES' : 'OPTIONAL EXPANSION MODULES'}
              </div>
              <h3 className="offer-h3 text-[#0F0F0F] dark:text-[#EDECE6]">
                {isUrdu ? 'Aapki Gaming Dukan Ke Liye Izafi Capabilities' : 'Custom Capabilities For Your Video Game Retail Operation'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CONSOLE_EXTRAS_DATA.map((extra, idx) => {
                const isExpanded = !!expandedExtras[idx]
                return (
                  <div
                    key={idx}
                    className="p-5 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">
                        {isUrdu ? extra.ur : extra.en}
                      </div>
                      <div className="text-xs font-mono font-bold text-[#059669] dark:text-[#10B981] shrink-0">
                        {currency === 'USD' ? extra.priceUsd : currency === 'GBP' ? extra.priceGbp : extra.pricePkr}
                      </div>
                    </div>

                    <button
                      onClick={() => toggleExtra(idx)}
                      className="text-xs font-mono font-bold text-[#059669] dark:text-[#10B981] flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <span>{isExpanded ? (isUrdu ? 'Tafseel Chupayein' : 'Hide Details') : (isUrdu ? 'Tafseel Dekhein' : 'Inspect Module Scope')}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pt-2 border-t border-[rgba(15,15,15,0.08)] dark:border-[rgba(255,255,255,0.08)] offer-ui text-[#575652] dark:text-[#9B9A95]"
                        >
                          <p>{isUrdu ? extra.descUr : extra.descEn}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── Footer Action & Sticky Banner ─── */}
      <section className="px-4 sm:px-8 py-16 border-t border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#161619] text-center">
        <FadeIn className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold bg-[#ECFDF5] dark:bg-[rgba(16,185,129,0.15)] px-3 py-1">
            <ShieldCheck size={14} />
            <span>{isUrdu ? '100% FIXED PRICE & CODE TRANSFER' : '100% FIXED PRICE & CODE TRANSFER'}</span>
          </div>

          <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
            {isUrdu
              ? 'Apni Gaming Dukan Ko Aaj Hi Automate Karein.'
              : 'Modernize Your Gaming Store Operation Today.'}
          </h2>

          <p className="offer-body text-[#575652] dark:text-[#9B9A95]">
            {isUrdu
              ? 'WhatsApp par hamari technical team se rabta karein aur 21 dinon mein mukammal code aur database malkiat ke sath apna bespoke gaming operating system hasil karein.'
              : 'Connect directly with our engineering team on WhatsApp to review your inventory requirements and launch your bespoke gaming retail OS in 21 days.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openWhatsApp('Console Retail OS Consultation', 'Direct Inquiry')}
              className="btn-blue offer-btn offer-btn-xl shadow-md group relative overflow-hidden cursor-pointer"
            >
              <MessageSquare size={16} className="relative z-10 animate-icon-wiggle" />
              <span className="relative z-10">{isUrdu ? 'WHATSAPP PAR RABTA KAREIN' : 'SCHEDULE WHATSAPP DEMO'}</span>
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none animate-shimmer-sweep" />
            </button>
            <Link
              to="/solutions/tech-retail/terms"
              className="btn-outline offer-btn offer-btn-lg"
            >
              <span>{isUrdu ? 'CONTRACT SHARAAIT' : 'REVIEW CONTRACT TERMS'}</span>
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Plan Detail Modal */}
      {activeModalKey && modalData[activeModalKey] && (
        <PlanDetailModal
          isOpen={true}
          onClose={() => setActiveModalKey(null)}
          plan={modalData[activeModalKey]}
          lang={lang}
          currency={currency}
          isUrdu={isUrdu}
          onClaimWhatsApp={(planCode, price) => openWhatsApp(planCode, price)}
        />
      )}
    </div>
  )
}
