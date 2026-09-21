import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Laptop,
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
  BatteryCharging,
  HardDrive,
  Cpu,
  Sparkles,
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
    const saved = localStorage.getItem('texcodes_laptop_lang') || localStorage.getItem('texcodes_retail_lang')
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

/**
 * Geo / Timezone auto-selection for Currency:
 */
function detectInitialCurrency() {
  if (typeof window === 'undefined') return 'USD'
  try {
    const saved = localStorage.getItem('texcodes_currency')
    if (saved === 'USD' || saved === 'PKR') {
      return saved
    }
  } catch (e) {}

  try {
    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase()
    if (tz === 'asia/karachi' || tz === 'asia/kolkata' || tz === 'asia/calcutta') {
      return 'PKR'
    }
  } catch (e) {}

  return 'USD'
}

const I18N_DATA = {
  en: {
    hero_badge: 'COMMERCIAL INFRASTRUCTURE // LAPTOP & ACCESSORIES RETAIL OS',
    hero_title_1: 'Automate Laptop Sales, Battery Verification & RAM Upgrades',
    hero_title_accent: 'With Zero Platform Commissions',
    hero_title_2: 'And 100% Code Ownership',
    hero_sub:
      'Turn your computer showroom into a 24/7 automated retail operation. Custom laptop storefront with dynamic RAM & SSD configurator, verified battery health badges, multi-branch stock sync, and 24/7 AI sales matchmaker—delivered in 21 days with 100% codebase and database ownership.',
    cta_primary: 'Choose Your Laptop Solution Plan',
    cta_secondary: 'Explore Live Store Demo',
    metrics_code: 'Full GitHub & DB Transfer',
    metrics_tax: 'Keep 100% Retail Margins',
    metrics_speed: 'Tested Battery & Grade Badges',
    metrics_rma: 'Motherboard Serial Tracking',
    metrics_code_top: '100% OWNERSHIP',
    metrics_tax_top: '0% PLATFORM TAX',
    metrics_speed_top: '<1% RETURN RATE',
    metrics_rma_top: 'BATTERY & SERIAL RMA',

    // Ultimatum Decision Matrix
    ultimatum_badge: 'THE ZERO-RISK DECISION MATRIX',
    ultimatum_title: 'WHY LEADING LAPTOP RETAILERS MOVE FORWARD',
    ultimatum_sub:
      'An offer structured so the laptop dealer wins in both scenarios. We assume the technical execution risk so you can modernize your operation with complete certainty.',
    ultimatum_best_tag: 'BEST-CASE SCENARIO',
    ultimatum_best_title: 'You launch an automated laptop sales machine',
    ultimatum_best_p1: 'Deploy a dedicated Next.js laptop catalog with RAM & SSD upgrades in 21 days.',
    ultimatum_best_p2: 'Repetitive WhatsApp inquiries drop by 80% with transparent condition and battery badges.',
    ultimatum_best_p3: 'Shop counters, testing labs, and warehouses share one real-time multi-branch stock matrix.',
    ultimatum_best_p4: 'Save thousands every year with zero recurring platform commissions or order cuts.',
    ultimatum_best_p5: 'Full GitHub repository and PostgreSQL database ownership transferred to your business.',
    ultimatum_best_footer: 'Outcome: You scale your operation, protect your margins, and own your software.',

    ultimatum_worst_tag: 'WORST-CASE SCENARIO',
    ultimatum_worst_title: 'If we fail to fulfill agreed specifications',
    ultimatum_worst_p1: '100% full refund of your commencement deposit processed immediately without dispute.',
    ultimatum_worst_p2: 'Keep our custom laptop catalog schema and architecture blueprint for free.',
    ultimatum_worst_p3: '$250 USD courtesy credit paid directly to your business as an apology for your time.',
    ultimatum_worst_p4: 'Zero contract lock-in, zero ongoing financial obligations, and zero risk.',
    ultimatum_worst_footer: 'Outcome: You risk zero capital, lose nothing, and keep an enterprise tech audit.',

    // Staging Guarantee Banner
    guarantee_badge: 'SAFETY NET // 100% MILESTONE-PROTECTED STAGING GUARANTEE',
    guarantee_title: 'Test Your System On A Live Staging URL Before Final Settlement',
    guarantee_sub:
      'You only pay the remaining balance after testing your fully functional custom laptop storefront, RAM/SSD configurator, and stock sync on a private staging URL with your own products. If it does not perform to agreed specifications, your deposit is refunded in full.',

    arch_badge: 'SYSTEM ARCHITECTURE',
    arch_title: 'ONE UNIFIED SYSTEM FOR THE LAPTOP RETAIL OPERATION',
    arch_sub:
      'Not just an online gallery. An integrated retail operating environment connecting storefront, testing lab, physical counters, and WhatsApp notifications.',
    arch_01_title: '01. GRADE & CONDITION TRANSPARENCY',
    arch_01_desc:
      'Showcase Brand New, Open-Box 10/10, and Grade A+ Renewed units with verified high-res photo carousels and testing certificates.',
    arch_02_title: '02. ON-THE-FLY RAM & SSD CONFIGURATOR',
    arch_02_desc:
      'Allow customers to select any base laptop and click +16GB RAM or +1TB NVMe SSD with live automatic price and stock updates.',
    arch_03_title: '03. TESTED BATTERY HEALTH BADGES',
    arch_03_desc:
      'Display tested battery backup hours and health percentage on every laptop card, eliminating repetitive customer questions.',
    arch_04_title: '04. MULTI-BRANCH STOCK SYNC',
    arch_04_desc:
      'Connect retail shops (Hafeez Centre, Techno City, Dubai Plaza), testing labs, and central warehouse in one live inventory panel.',
    arch_05_title: '05. MOTHERBOARD SERIAL & WARRANTY RMA',
    arch_05_desc:
      'Track individual laptop serial numbers and tested battery capacity on invoices to eliminate customer return and warranty fraud.',
    arch_06_title: '06. WHATSAPP AUTO DISPATCH',
    arch_06_desc:
      'Pre-formatted customer orders with exact processor specs, RAM/SSD configuration, and video link sent directly to sales counters.',
    arch_07_title: '07. AI LAPTOP MATCHMAKER CHATBOT',
    arch_07_desc:
      '24/7 automated sales assistant that matches customer budgets and use cases (Coding, Graphic Design, University, Gaming) to available stock.',

    plans_badge: 'COMMERCIAL INVESTMENT TIERS',
    plans_title: 'Laptop Solution Plans.',
    plans_sub:
      'Zero monthly sales commissions. 100% client code and database ownership upon completion.',
    plans_sub_suffix:
      'Click any plan below to inspect the complete deliverable breakdown, architecture specs, and visual previews.',
    detail_btn: 'CLICK ME FOR FULL DETAIL & PREVIEWS →',

    starter_name: 'Single Outlet Laptop Launch',
    starter_badge: 'SINGLE OUTLET',
    starter_desc:
      'For independent laptop dealers and accessories shops starting online sales with direct WhatsApp dispatch and RAM/SSD upgrades.',
    starter_price_pkr: 'PKR 250,000',
    starter_price_usd: '$2,250 USD',
    starter_delivery: '⚡ Delivered in 10 days, guaranteed',
    starter_support_pkr: 'Optional Care Plan: PKR 14,000 / mo',
    starter_support_usd: 'Optional Care Plan: $140 / mo',
    starter_callout_label: 'CORE CAPABILITY:',
    starter_callout_text:
      'Dedicated single-outlet laptop storefront with RAM/SSD upgrade configurator, battery badges, and WhatsApp dispatch.',
    starter_f1: 'Next.js Laptop Storefront (Up to 100 SKUs)',
    starter_f2: 'Dynamic RAM & SSD Upgrade Configurator',
    starter_f3: 'Condition Grade & Battery Health Badges',
    starter_f4: '100% Client Code & DB Ownership',

    growth_name: 'Multi-Branch Laptop Growth',
    growth_badge: '★ MOST POPULAR // BEST VALUE',
    growth_desc:
      'For established laptop retailers, imported notebook dealers, and gaming laptop stores selling across shop counters and online.',
    growth_price_pkr: 'PKR 490,000',
    growth_price_usd: '$4,450 USD',
    growth_delivery: '⚡ Delivered in 21 days, guaranteed',
    growth_support_pkr: 'Optional Care Plan: PKR 28,000 / mo',
    growth_support_usd: 'Optional Care Plan: $280 / mo',
    growth_callout_label: 'MAJOR UPGRADE OVER STARTER:',
    growth_callout_text:
      'Adds 3-branch inventory sync, motherboard serial RMA tracking, AI Laptop Matchmaker Chatbot, and online card payment gateway.',
    growth_f1: '3-Branch Inventory Sync (Counter, Lab, Warehouse)',
    growth_f2: 'Motherboard Serial Number & Battery RMA Tracker',
    growth_f3: 'Automated Accessories Cross-Sell & Upsell Engine',
    growth_f4: 'Promotional Hero Sliders & Flash Sale Banners',
    growth_f5_pkr: 'Online Card & Wallet Payment Gateway (Included — Save PKR 50,000)',
    growth_f5_usd: 'Online Card & Wallet Payment Gateway (Included — Save $400 USD)',
    growth_f6_pkr: 'AI Laptop Matchmaker Sales Chatbot (Included — Save PKR 65,000)',
    growth_f6_usd: 'AI Laptop Matchmaker Sales Chatbot (Included — Save $650 USD)',

    enterprise_name: 'Enterprise Wholesale & Chain OS',
    enterprise_badge: '★ COMPLETE RETAIL OS',
    enterprise_desc:
      'For high-volume laptop importers, nationwide distributors, and multi-branch retail chains needing enterprise ERP synchronization.',
    enterprise_price_pkr: 'From PKR 850,000',
    enterprise_price_usd: 'From $7,900 USD',
    enterprise_delivery: '⚡ Delivered in 30 days, guaranteed',
    enterprise_support_pkr: 'Dedicated Care Plan: PKR 55,000 / mo',
    enterprise_support_usd: 'Dedicated Care Plan: $550 / mo',
    enterprise_callout_label: 'MAJOR UPGRADE OVER GROWTH:',
    enterprise_callout_text:
      'Adds unlimited branches, B2B corporate fleet invoicing, bulk import manifest CSV sync, granular staff RBAC, and bespoke ERP/POS integration.',
    enterprise_f1: 'Unlimited Branches & Warehouse Outlets',
    enterprise_f2: 'B2B Corporate Fleet Invoicing (Bulk Office Quotes)',
    enterprise_f3: 'Bulk Manifest Import (Direct Container Intake)',
    enterprise_f4: 'Granular Staff RBAC (Tester, Sales, Cashier, Owner)',
    enterprise_f5: 'Multi-Gateway Card & Wallet Prepay Integration (Included)',
    enterprise_f6: 'Enterprise AI Laptop Sales & Knowledge Agent (Included)',

    whatsapp_cta: 'Claim This Plan on WhatsApp',
    view_terms: 'Review Contract Scope & Warranty Terms →',

    // Live Demo Grid
    demo_badge: 'LIVE PROOF // TEST THE ENGINE BEFORE YOU COMMIT',
    demo_title: 'Nothing is hidden. Click into the working demo systems below.',
    demo_sub:
      'Review how buyers browse Grade-A+ laptops with verified battery health, filter specs, and how shop staff manage stock across Hafeez Centre and Technocity branches.',
    demo_store_title: '1. Laptop & Accessories Storefront',
    demo_store_desc:
      'Explore verified business laptops, gaming machines, original chargers, and RAM upgrades with real-time branch availability in Lahore, Karachi, and Rawalpindi.',
    demo_filter_title: '2. Live Spec & Battery Health Filter',
    demo_filter_desc:
      'Test how buyers filter laptops by battery health, processor generation, screen size, and RAM/SSD upgrade options.',
    demo_admin_title: '3. Multi-Branch & Serial RMA Backoffice',
    demo_admin_desc:
      'Inspect how branch managers record container manifests, track warranty serial numbers, and view gross profit margins.',
  },
  'ur-en': {
    hero_badge: 'COMMERCIAL INFRASTRUCTURE // LAPTOP AUR ACCESSORIES RETAIL OS',
    hero_title_1: 'Laptop Sales, Battery Verification Aur RAM Upgrades Ko',
    hero_title_accent: 'Baghair Kisi Platform Commission Ke',
    hero_title_2: 'Automate Karein',
    hero_sub:
      'Apni laptop dukan ko 24/7 chalne wale automated retail store mein badlein. Live RAM aur SSD upgrade configurator, tasdeeq shuda battery health badges, multi-branch stock sync, aur 24/7 AI sales advisor—21 dinon mein 100% code aur database malkiat ke sath.',
    cta_primary: 'Apna Laptop Plan Select Karein',
    cta_secondary: 'Live Demo Test Karein',
    metrics_code: 'Mukammal GitHub Code Transfer',
    metrics_tax: 'Apna Pura Profit Khud Rakhein',
    metrics_speed: 'Battery Health aur Condition Badges',
    metrics_rma: 'Motherboard Serial Tracking',
    metrics_code_top: '100% MALKIAT',
    metrics_tax_top: '0% COMMISSION',
    metrics_speed_top: '<1% RETURNS',
    metrics_rma_top: 'BATTERY & SERIAL RMA',

    // Ultimatum Decision Matrix
    ultimatum_badge: 'ZERO-RISK DECISION MATRIX',
    ultimatum_title: 'LAPTOP DEALERS HUMARE SATH KYUN KAAM KARTE HAIN',
    ultimatum_sub:
      'Aisa offer jisme dono surton mein dealer ka faida hai. Technical risk hum uthate hain taake aap baghair kisi dar ke scale karein.',
    ultimatum_best_tag: 'BEST-CASE SCENARIO',
    ultimatum_best_title: 'Aapka 24/7 automated laptop sales system live hota hai',
    ultimatum_best_p1: '21 dinon mein dedicated Next.js storefront aur RAM/SSD upgrade configurator live.',
    ultimatum_best_p2: 'Condition aur battery health badges ki wajah se WhatsApp ke fazool sawalat 80% khatam.',
    ultimatum_best_p3: 'Dukan, testing lab aur godam ka combined real-time multi-branch stock sync.',
    ultimatum_best_p4: 'Zero platform fee aur zero sales commission se lakhoon ki salana bachat.',
    ultimatum_best_p5: 'GitHub source code aur PostgreSQL database ki 100% mukammal malkiat.',
    ultimatum_best_footer: 'Nateeja: Aapka business scale hota hai aur har rupay ka profit aapka rehta hai.',

    ultimatum_worst_tag: 'WORST-CASE SCENARIO',
    ultimatum_worst_title: 'Agar hum agreed specs fulfill na kar sakein',
    ultimatum_worst_p1: 'Aapki deposit raqam 100% fori wapas bila kisi behas.',
    ultimatum_worst_p2: 'Hamara tayyar kardah laptop database schema blueprint bilkul muft aapka.',
    ultimatum_worst_p3: 'Aapke waqt ke azaale ke tor par courtesy credit ada kiya jata hai.',
    ultimatum_worst_p4: 'Zero vendor lock-in aur koi chhupe huay ikhrajat nahi.',
    ultimatum_worst_footer: 'Nateeja: Aapka zero financial risk hai, kuch nahi kho te, aur technical audit muft milta hai.',

    // Staging Guarantee Banner
    guarantee_badge: 'SAFETY NET // 100% MILESTONE-PROTECTED STAGING GUARANTEE',
    guarantee_title: 'Final Payment Se Pehle Live Staging URL Par System Test Karein',
    guarantee_sub:
      'Baqi raqam aap tab ada karte hain jab aap apni private staging URL par laptops, RAM/SSD upgrades aur stock sync ko mukammal chala kar verify kar lein. Agar spec ke mutabiq na ho, to deposit fori wapas.',

    arch_badge: 'SYSTEM ARCHITECTURE',
    arch_title: 'LAPTOP BUSINESS KE LIYE COMPLETE OPERATING ENVIRONMENT',
    arch_sub:
      'Sirf aam online catalog nahi. Storefront, testing lab, physical counter aur WhatsApp dispatch ko jorne wala complete system.',
    arch_01_title: '01. CONDITION AUR GRADE TRANSPARENCY',
    arch_01_desc:
      'Brand New, Open-Box 10/10 aur Grade A+ Renewed laptops ko verified photo gallery aur testing checklist ke sath dikhayein.',
    arch_02_title: '02. ON-THE-FLY RAM AUR SSD CONFIGURATOR',
    arch_02_desc:
      'Customer kisi bhi base laptop ko select kar ke 1-click mein RAM (16GB/32GB) aur SSD (512GB/1TB) upgrade kar sakta hai.',
    arch_03_title: '03. TESTED BATTERY HEALTH BADGES',
    arch_03_desc:
      'Har laptop card par tested battery backup aur health percentage saaf nazar aati hai jisse customer ka aitmad barhta hai.',
    arch_04_title: '04. MULTI-BRANCH STOCK SYNC',
    arch_04_desc:
      'Dukanon (Hafeez Centre, Techno City, Dubai Plaza), testing counter aur godam ka stock ek live panel par synchronize rehta hai.',
    arch_05_title: '05. MOTHERBOARD SERIAL AUR WARRANTY RMA',
    arch_05_desc:
      'Invoice par laptop ka motherboard serial aur battery health record hoti hai taake customer return fraud se bacha ja sake.',
    arch_06_title: '06. WHATSAPP AUTO DISPATCH',
    arch_06_desc:
      'Customer order ki mukammal specs, upgraded RAM/SSD aur unit ki video verification seedha counter sales desk ko dispatch hoti hai.',
    arch_07_title: '07. AI LAPTOP MATCHMAKER CHATBOT',
    arch_07_desc:
      'Website par 24/7 mojud AI assistant jo customer ko budget aur kaam (Coding, Graphics, Office, Gaming) ke mutabiq laptop recommend karta hai.',

    plans_badge: 'COMMERCIAL INVESTMENT TIERS',
    plans_title: 'Laptop Solution Plans.',
    plans_sub:
      'Baghair kisi mahana sales commission ke. Mukammal source code ownership. Apni dukan ke mutabiq plan chunein.',
    plans_sub_suffix:
      'Mukammal architecture specs, modules aur visual previews dekhne ke liye kisi bhi plan par click karein.',
    detail_btn: 'MUKAMMAL DETAILS AUR PREVIEWS DEKHEIN →',

    starter_name: 'Single Outlet Laptop Launch',
    starter_badge: 'SINGLE DUKAN',
    starter_desc:
      'Single location laptop shops aur accessories vendors ke liye jo direct WhatsApp dispatch ke sath online sales shuru kar rahe hain.',
    starter_price_pkr: 'PKR 250,000',
    starter_price_usd: '$2,250 USD',
    starter_delivery: '⚡ 10 dinon mein delivery, guaranteed',
    starter_support_pkr: 'Optional Care Plan: PKR 14,000 / month',
    starter_support_usd: 'Optional Care Plan: $140 / month',
    starter_callout_label: 'MAIN CAPABILITY:',
    starter_callout_text:
      'Single dukan ke liye laptop storefront jisme RAM/SSD upgrade configurator, battery health badges aur WhatsApp checkout shamil hai.',
    starter_f1: 'Next.js Laptop Storefront (100 SKUs Tak)',
    starter_f2: 'Dynamic RAM aur SSD Upgrade Configurator',
    starter_f3: 'Condition Grade aur Battery Health Badges',
    starter_f4: '100% Client Code aur Database Ownership',

    growth_name: 'Multi-Branch Laptop Growth',
    growth_badge: '★ SAB SE ZYADA PASANDIDAH // BEHTAREEN VALUE',
    growth_desc:
      'Bari laptop dukanon aur imported notebook dealers ke liye jahan testing lab, physical counters aur accessories cross-sell zaroori hai.',
    growth_price_pkr: 'PKR 490,000',
    growth_price_usd: '$4,450 USD',
    growth_delivery: '⚡ 21 dinon mein delivery, guaranteed',
    growth_support_pkr: 'Optional Care Plan: PKR 28,000 / month',
    growth_support_usd: 'Optional Care Plan: $280 / month',
    growth_callout_label: 'STARTER SE BARI UPGRADES:',
    growth_callout_text:
      'Isme 3-branch inventory sync, serial RMA warranty tracking, AI Laptop Matchmaker Chatbot, aur payment gateway shamil hai.',
    growth_f1: '3 Branches Ki Stock Sync (Dukan, Testing Lab, Godam)',
    growth_f2: 'Motherboard Serial aur Battery Health RMA Tracker',
    growth_f3: 'Automated Accessories Upsell (Bags, Docks, Chargers)',
    growth_f4: 'Promotional Sliders aur Flash Sale Banners',
    growth_f5_pkr: 'Card Prepay Online Payment Gateway (Shamil Hai — Baghair Kisi 50K Fee Ke)',
    growth_f5_usd: 'Card Prepay Online Payment Gateway (Shamil Hai — Baghair Kisi $400 Fee Ke)',
    growth_f6_pkr: 'AI Laptop Matchmaker Sales Chatbot (Shamil Hai — Baghair Kisi 65K Fee Ke)',
    growth_f6_usd: 'AI Laptop Matchmaker Sales Chatbot (Shamil Hai — Baghair Kisi $650 Fee Ke)',

    enterprise_name: 'Enterprise Wholesale & Chain OS',
    enterprise_badge: '★ MUKAMMAL RETAIL OS',
    enterprise_desc:
      'Multi-branch retail chains, wholesale laptop importers aur corporate suppliers ke liye jo bara volume operate karte hain.',
    enterprise_price_pkr: 'PKR 850,000 se shuru',
    enterprise_price_usd: '$7,900 USD se shuru',
    enterprise_delivery: '⚡ 30 dinon mein delivery, guaranteed',
    enterprise_support_pkr: 'Dedicated Care Plan: PKR 55,000 / mahana',
    enterprise_support_usd: 'Dedicated Care Plan: $550 / mahana',
    enterprise_callout_label: 'GROWTH SE BARI UPGRADES:',
    enterprise_callout_text:
      'La-mehdood branches, B2B corporate fleet invoicing, bulk container CSV import, granular staff RBAC, aur custom ERP sync.',
    enterprise_f1: 'La-Mehdood Branches aur Central Warehouse Sync',
    enterprise_f2: 'B2B Corporate Fleet Invoicing (Bulk Office Deals)',
    enterprise_f3: 'Container Manifest Bulk CSV Import System',
    enterprise_f4: 'Staff Permissions (Tester, Cashier, Manager, Owner)',
    enterprise_f5: 'Online Payment Gateways aur Financial Reconciliation',
    enterprise_f6: 'Dedicated AI Laptop Sales Agent (Shamil Hai)',

    whatsapp_cta: 'Yeh Plan WhatsApp Par Book Karein',
    view_terms: 'Mukammal Sharaait aur Guarantees Dekhein →',

    // Live Demo Grid
    demo_badge: 'LIVE SABOOT // KAAM DEKH KAR FAISLA KAREIN',
    demo_title: 'Kuch chhupa hua nahi. Neeche live systems khud chala kar check karein.',
    demo_sub:
      'Dekhein customer battery health aur specs ke sath laptop kaise select karta hai, aur staff Hafeez Centre ya Technocity branches ka stock kaise manage karta hai.',
    demo_store_title: '1. Laptop aur Accessories Storefront Demo',
    demo_store_desc:
      'Business laptops, gaming machines, original chargers aur upgrades ka live storefront check karein.',
    demo_filter_title: '2. Battery Health aur Specs Filter Demo',
    demo_filter_desc:
      'Customer battery health, processor generation aur RAM/SSD upgrade kaise filter karta hai, live test karein.',
    demo_admin_title: '3. Multi-Branch aur Serial Number Backoffice',
    demo_admin_desc:
      'Container manifest bulk upload, serial number warranty tracking aur staff permissions ka live admin panel dekhein.',
  },
}

const LAPTOP_PLANS_DETAIL = {
  en: {
    starter: {
      name: 'Single Outlet Laptop Launch',
      code: 'LT-STARTER',
      badge: 'ENTRY LEVEL // SINGLE OUTLET',
      pricePkr: 'PKR 250,000',
      priceUsd: '$2,250 USD',
      delivery: '10 days, guaranteed',
      idealFor:
        'Single-location laptop dealers and tech accessories shops starting direct online sales with automated WhatsApp dispatch and RAM/SSD upgrade configurator.',
      artifacts: [
        {
          title: 'Next.js Laptop Storefront',
          image: '/txs/home.png',
          tag: 'Storefront',
        },
        {
          title: 'Condition & Battery Health Badges',
          image: '/txs/products.png',
          tag: 'Battery Badges',
        },
        {
          title: 'RAM & SSD Upgrade Selector',
          image: '/txs/RIG BUILDER.png',
          tag: 'Upgrades Engine',
        },
      ],
      modules: [
        {
          title: 'Custom Next.js Laptop Storefront (Up to 100 SKUs)',
          desc: 'High-speed modern storefront tailored specifically for business notebooks, gaming laptops, and accessories.',
          items: [
            'Filter by processor (Core i5/i7/i9 8th-14th Gen, Ryzen 5/7/9, Apple M1-M3)',
            'Dedicated condition filters (Brand New Sealed, Open-Box 10/10, Grade A+ Renewed)',
            'Instant search with specs, screen sizes (13.3", 14", 15.6", 16"), and graphic cards',
            'Mobile-responsive layout optimized for fast WhatsApp order placement',
          ],
        },
        {
          title: 'Dynamic RAM & SSD Upgrade Configurator',
          desc: 'Customers customize memory and storage on any model with instant price calculations.',
          items: [
            '1-click RAM selector (e.g. 8GB -> 16GB -> 32GB)',
            '1-click Storage upgrade (256GB -> 512GB -> 1TB NVMe)',
            'Auto price recalculation and pre-formatted order summary generation',
          ],
        },
        {
          title: 'Condition Grade & Battery Health Badges',
          desc: 'Displays verified battery backup hours and physical grade directly on product cards.',
          items: [
            'Prominent battery backup hours (e.g. "Tested 4-5 Hours Backup")',
            'Clear condition grading scale eliminating endless WhatsApp photo requests',
            'Included original charger and warranty terms displayed on product sheet',
          ],
        },
        {
          title: '100% Client Code & Database Ownership',
          desc: 'Full repository and database transfer directly to your accounts upon completion.',
          items: [
            'Private GitHub repository transfer on final milestone',
            'Dedicated PostgreSQL database with direct administrative access',
            '0% platform sales tax — you keep 100% of your retail profit',
          ],
        },
      ],
      exclusions: [
        'Multi-branch inventory sync (Single retail outlet stock only; available in Growth plan).',
        'Hardware serial number and battery cycle warranty RMA tracking.',
        'Online card prepay gateway (Included free in Growth & Enterprise plans).',
        'AI Laptop Matchmaker Chatbot (Included free in Growth & Enterprise plans).',
        'Product photos and specs data entry beyond the included 100 SKUs setup.',
      ],
    },
    growth: {
      name: 'Multi-Branch Laptop Growth',
      code: 'LT-GROWTH',
      badge: '★ MOST POPULAR // BEST VALUE',
      pricePkr: 'PKR 490,000',
      priceUsd: '$4,450 USD',
      delivery: '21 days, guaranteed',
      idealFor:
        'Established laptop dealers, renewed ThinkPad/MacBook specialists, and gaming laptop retailers managing inventory across shop counters, testing labs, and online.',
      artifacts: [
        {
          title: 'RAM & SSD Upgrade Configurator',
          image: '/txs/RIG BUILDER.png',
          tag: 'Upgrade Matrix',
        },
        {
          title: 'Motherboard Serial & Battery RMA',
          image: '/txs/admin warranty.png',
          tag: 'Serial Tracking',
        },
        {
          title: 'Multi-Branch Laptop Inventory',
          image: '/txs/dashboard products.png',
          tag: 'Branch Matrix',
        },
        {
          title: 'Central Revenue & Order Dashboard',
          image: '/txs/dashboard.png',
          tag: 'Admin Dashboard',
        },
      ],
      modules: [
        {
          title: 'Multi-Branch Inventory Sync (Up to 3 Nodes)',
          desc: 'Unified stock management across retail counters, testing bench, and warehouse.',
          items: [
            'Connect up to 3 physical nodes (e.g. Hafeez Centre Shop, Testing Counter, Central Warehouse)',
            'Branch-level stock matrix showing quantity of each laptop model in real time',
            'Automatic deduction upon in-store counter sale or online dispatch',
          ],
        },
        {
          title: 'Motherboard Serial Number & Battery RMA Tracking',
          desc: 'Track individual laptop serials and battery cycle count from intake to customer invoice.',
          items: [
            'Serial status: IN_STOCK -> SOLD (linked to invoice) -> RMA_PENDING -> REPLACED',
            'Logs tested battery health percentage at time of sale to eliminate customer return fraud',
            '1-click warranty verification by serial number',
          ],
        },
        {
          title: 'Accessories Upsell & Cross-Sell Engine',
          desc: 'Automatically recommends high-margin peripherals during laptop checkout.',
          items: [
            '1-click cross-sells: Laptop bags, wireless mice, Type-C multiport docks, extra chargers',
            'Increases Average Order Value (AOV) by 15% to 25% on every laptop sale',
          ],
        },
        {
          title: 'Online Payment Gateway Integration (Included — Save $400 / PKR 50,000)',
          desc: 'Direct card and wallet checkout for prepaid orders at zero extra integration fee.',
          items: [
            'Accept Visa, MasterCard, and UnionPay debit/credit cards directly on checkout',
            'JazzCash, EasyPaisa, and bank transfer support',
            'Zero add-on fee (fee waived for Growth plan)',
          ],
        },
        {
          title: 'AI Laptop Matchmaker Chatbot (Included — Save $650 / PKR 65,000)',
          desc: '24/7 automated laptop consultant directly inside the storefront.',
          items: [
            'Trained on laptop processors, RAM configurations, battery life, and gaming GPUs',
            'Answers natural language budget inquiries ("Best business laptop under $500")',
            'Direct 1-click cart prefill and WhatsApp handoff with full conversation context',
          ],
        },
      ],
      exclusions: [
        'Limited to 3 branch nodes (Unlimited branches supported in Enterprise plan).',
        'B2B Corporate Fleet Invoicing and Bulk Container CSV intake.',
        'Custom POS/ERP direct API integrations (Available in Enterprise plan).',
        'Granular Staff RBAC permission matrices (Single admin level).',
      ],
    },
    enterprise: {
      name: 'Enterprise Wholesale & Chain OS',
      code: 'LT-ENTERPRISE',
      badge: '★ COMPLETE RETAIL OS',
      pricePkr: 'From PKR 850,000',
      priceUsd: 'From $7,900 USD',
      delivery: '30 days, guaranteed',
      idealFor:
        'High-volume laptop importers, nationwide refurbished distributors, and multi-branch retail chains needing enterprise fleet management.',
      artifacts: [
        {
          title: 'B2B Fleet & Corporate Matrix',
          image: '/txs/admin site control.png',
          tag: 'Fleet Control',
        },
        {
          title: 'Multi-Branch Inventory Network',
          image: '/txs/dashboard products.png',
          tag: 'Branch Network',
        },
        {
          title: 'Serial Number & Battery Center',
          image: '/txs/admin warranty.png',
          tag: 'RMA Center',
        },
      ],
      modules: [
        {
          title: 'Unlimited Multi-Branch & Distribution Network',
          desc: 'Enterprise inventory distribution across all retail outlets and storage hubs.',
          items: [
            'Unlimited physical shops, testing benches, and regional distribution warehouses',
            'Inter-branch stock transfer requests with dispatch and receipt verification',
            'Unified warehouse dispatch and counter pickup routing',
          ],
        },
        {
          title: 'B2B Corporate Fleet Invoicing & Bulk Quotes',
          desc: 'Dedicated quote generator for corporate offices and institutions buying 5 to 50 laptops.',
          items: [
            'Tiered bulk volume pricing (e.g. 5+ units, 10+ units, 20+ units)',
            'Corporate PDF quotations with tax NTN details and formal bank payment terms',
            'Separate customer account ledgers (Khata) for corporate business clients',
          ],
        },
        {
          title: 'Container Manifest Bulk CSV Import System',
          desc: 'Upload hundreds of incoming imported laptops directly from supplier spreadsheets.',
          items: [
            '1-click CSV import for container shipments from US, UK, or UAE auctions',
            'Automatic model generation, spec assignment, and stock distribution to branches',
          ],
        },
        {
          title: 'Granular Multi-Guard Staff RBAC',
          desc: 'Spatie-style permissions restricting staff access according to job title.',
          items: [
            'Super Admin: Full P&L, gross margins, purchase costs, master settings',
            'Testing Lab Technician: Can only test specs, log battery health, and issue RMA status',
            'Counter Cashier: Can only process customer invoices and WhatsApp dispatch',
          ],
        },
      ],
      exclusions: [
        'Hardware component physical repairs (Software architecture only).',
        'Product photography beyond initial setup. Content supplied by client or added as extra.',
      ],
    },
  },
  'ur-en': {
    starter: {
      name: 'Single Outlet Laptop Launch',
      code: 'LT-STARTER',
      badge: 'ENTRY LEVEL // SINGLE DUKAN',
      pricePkr: 'PKR 250,000',
      priceUsd: '$2,250 USD',
      delivery: '10 dinon mein delivery, guaranteed',
      idealFor:
        'Single location laptop shops aur accessories vendors ke liye jo direct WhatsApp dispatch aur RAM/SSD upgrades ke sath online sales shuru kar rahe hain.',
      artifacts: [
        {
          title: 'Next.js Laptop Storefront',
          image: '/txs/home.png',
          tag: 'Storefront',
        },
        {
          title: 'Condition aur Battery Badges',
          image: '/txs/products.png',
          tag: 'Battery Badges',
        },
        {
          title: 'RAM aur SSD Upgrade Selector',
          image: '/txs/RIG BUILDER.png',
          tag: 'Upgrades Engine',
        },
      ],
      modules: [
        {
          title: 'Custom Next.js Laptop Storefront (100 SKUs Tak)',
          desc: 'Business laptops, gaming notebooks aur accessories ke liye fast aur modern web store.',
          items: [
            'Processor filters (Core i5/i7/i9 8th-14th Gen, Ryzen 5/7/9, Apple M1-M3)',
            'Condition filters (Brand New Sealed, Open-Box 10/10, Grade A+ Renewed)',
            'Screen sizes aur graphics card ke mutabiq instant hardware search',
            'Direct WhatsApp checkout button jo order details counter par bhejta hai',
          ],
        },
        {
          title: 'Dynamic RAM aur SSD Upgrade Configurator',
          desc: 'Customer kisi bhi model ki memory aur storage 1-click mein upgrade kar sakta hai.',
          items: [
            'RAM selector (8GB -> 16GB -> 32GB)',
            'SSD upgrade selector (256GB -> 512GB -> 1TB NVMe)',
            'Live price recalculation aur WhatsApp summary sheet',
          ],
        },
        {
          title: 'Condition Grade aur Battery Health Badges',
          desc: 'Product card par tested battery backup aur physical condition saaf nazar aati hai.',
          items: [
            'Battery backup hours (maslan "Tested 4-5 Hours Backup")',
            'Condition grading scale jo WhatsApp par bar bar photo maangne ka jhanjhat khatam kare',
            'Original charger aur warranty sharaait product sheet par darj',
          ],
        },
        {
          title: '100% Client Code aur Database Ownership',
          desc: 'Project mukammal hone par full GitHub source code aur database aapke hawale.',
          items: [
            'Final payment par private GitHub repository transfer',
            'PostgreSQL database ka direct administrative access',
            '0% platform commission — apna pura profit khud rakhein',
          ],
        },
      ],
      exclusions: [
        'Multi-branch stock sync (Single dukan ka stock shamil hai; Growth plan mein mojud).',
        'Motherboard serial number aur battery health RMA tracking.',
        'Online card payment gateway (Growth aur Enterprise plan mein muft shamil hai).',
        'AI Laptop Matchmaker Chatbot (Growth aur Enterprise plan mein muft shamil hai).',
      ],
    },
    growth: {
      name: 'Multi-Branch Laptop Growth',
      code: 'LT-GROWTH',
      badge: '★ SAB SE ZYADA PASANDIDAH // BEHTAREEN VALUE',
      pricePkr: 'PKR 490,000',
      priceUsd: '$4,450 USD',
      delivery: '21 dinon mein delivery, guaranteed',
      idealFor:
        'Bari laptop dukanon aur imported notebook dealers ke liye jahan testing lab, physical counters aur accessories cross-sell zaroori hai.',
      artifacts: [
        {
          title: 'RAM aur SSD Upgrade Configurator',
          image: '/txs/RIG BUILDER.png',
          tag: 'Upgrade Matrix',
        },
        {
          title: 'Motherboard Serial aur Battery RMA',
          image: '/txs/admin warranty.png',
          tag: 'Serial Tracking',
        },
        {
          title: 'Multi-Branch Laptop Inventory',
          image: '/txs/dashboard products.png',
          tag: 'Branch Matrix',
        },
        {
          title: 'Central Revenue aur Order Dashboard',
          image: '/txs/dashboard.png',
          tag: 'Admin Dashboard',
        },
      ],
      modules: [
        {
          title: 'Multi-Branch Inventory Sync (3 Branches Tak)',
          desc: 'Dukan, testing lab aur godam ke darmiyan live stock synchronization.',
          items: [
            '3 branches tak connect karein (maslan Hafeez Centre Shop, Testing Lab, Central Godam)',
            'Har branch mein har laptop model ka stock alag live nazar aata hai',
            'Counter sale ya online dispatch par real-time stock deduction',
          ],
        },
        {
          title: 'Motherboard Serial Number aur Battery RMA Tracker',
          desc: 'Har laptop ka serial aur battery health invoice banne ke waqt record hoti hai.',
          items: [
            'Serial status flow: IN_STOCK -> SOLD (invoice linked) -> RMA_PENDING -> REPLACED',
            'Sale ke waqt ki battery health record hone se customer fraud ka mukammal khatma',
            'Serial number daal kar chand seconds mein warranty claim check karein',
          ],
        },
        {
          title: 'Automated Accessories Cross-Sell Engine',
          desc: 'Laptop khareedte waqt high-margin accessories khud ba khud recommend karta hai.',
          items: [
            '1-click recommendations: Laptop bags, wireless mice, Type-C docks, extra chargers',
            'Har laptop sale par Average Order Value (AOV) 15% se 25% barhata hai',
          ],
        },
        {
          title: 'Online Payment Gateway Integration (Shamil Hai — Baghair Kisi 50K Fee Ke)',
          desc: 'Prepaid orders ke liye debit/credit card aur mobile wallet checkout.',
          items: [
            'Visa, MasterCard aur UnionPay cards support',
            'JazzCash, EasyPaisa aur direct bank transfer support',
            'Growth plan mein zero add-on fee',
          ],
        },
        {
          title: 'AI Laptop Matchmaker Sales Chatbot (Shamil Hai — Baghair Kisi 65K Fee Ke)',
          desc: 'Website par 24/7 mojud AI assistant jo customer ko compatible laptop recommend karta hai.',
          items: [
            'Processors, RAM, battery life aur gaming GPUs par pre-trained',
            'Customer ke budget aur zaroorat ke mutabiq best laptop suggest karta hai',
            'Direct 1-click cart aur WhatsApp order handoff',
          ],
        },
      ],
      exclusions: [
        '3 branches tak mehdood (La-mehdood branches Enterprise plan mein shamil hain).',
        'B2B Corporate Fleet Invoicing aur container CSV import.',
        'Granular staff RBAC permission matrices (Single admin level).',
      ],
    },
    enterprise: {
      name: 'Enterprise Wholesale & Chain OS',
      code: 'LT-ENTERPRISE',
      badge: '★ MUKAMMAL RETAIL OS',
      pricePkr: 'PKR 850,000 se shuru',
      priceUsd: '$7,900 USD se shuru',
      delivery: '30 dinon mein delivery, guaranteed',
      idealFor:
        'Bari laptop chains, wholesale importers aur corporate suppliers ke liye jo bara volume operate karte hain.',
      artifacts: [
        {
          title: 'B2B Fleet aur Corporate Matrix',
          image: '/txs/admin site control.png',
          tag: 'Fleet Control',
        },
        {
          title: 'Multi-Branch Inventory Network',
          image: '/txs/dashboard products.png',
          tag: 'Branch Network',
        },
        {
          title: 'Serial Number aur Battery Center',
          image: '/txs/admin warranty.png',
          tag: 'RMA Center',
        },
      ],
      modules: [
        {
          title: 'La-Mehdood Multi-Branch aur Godam Sync',
          desc: 'Tamam dukanon aur distribution hubs ke darmiyan centralized inventory sync.',
          items: [
            'La-mehdood physical dukanon aur testing counters ka live stock',
            'Inter-branch stock transfer requests dispatch aur sign-off ke sath',
          ],
        },
        {
          title: 'B2B Corporate Fleet Invoicing aur Bulk Quotes',
          desc: 'Offices aur institutions ke liye 5 se 50 laptops ke bulk order quotation engine.',
          items: [
            'Bulk quantity tiered discounts (maslan 5+ units, 10+ units)',
            'Official corporate PDF invoices NTN aur bank details ke sath',
            'Corporate clients ke liye alag khata management',
          ],
        },
        {
          title: 'Container Manifest Bulk CSV Import System',
          desc: 'Import shuda container manifests ko 1-click mein system mein upload karein.',
          items: [
            'US, UK ya UAE auctions ki Excel/CSV sheets seedha import karein',
            'Automatic model creation, specs assignment aur branches ko distribution',
          ],
        },
        {
          title: 'Staff Permissions (Tester, Cashier, Manager, Owner)',
          desc: 'Mulazimeen ke ikhtiyarat unke designation ke mutabiq restrict karein.',
          items: [
            'Owner: Mukammal munafa, purchase costs aur branch rankings dekhe ga',
            'Testing Lab Technician: Sirf specs check, battery health aur RMA update kare ga',
            'Counter Cashier: Sirf customer sales receipt aur WhatsApp dispatch manage kare ga',
          ],
        },
      ],
      exclusions: [
        'Hardware physical component repairs (Software architecture shamil hai).',
      ],
    },
  },
}

const LAPTOP_EXTRAS_DATA = [
  {
    en: 'Extra branch or warehouse node',
    ur: 'Extra branch ya godam node',
    pricePkr: '+ PKR 60,000',
    priceUsd: '+ $450 USD',
    descEn:
      'Adds another physical shop (e.g. Hafeez Centre, Techno City) or godown to your system. Monitor live stock counts separately, make counter sales per branch, and track stock transfers between shops.',
    descUr:
      'Aapki ek aur dukan (maslan Hafeez Centre ya Techno City) ya godam ko system se jodta hai. Har branch ka alag stock nazar aayega, counter sale hogi aur dukanon ke darmiyan stock transfer track hoga.',
  },
  {
    en: 'Wholesale and B2B pricing module',
    ur: 'Wholesale aur B2B pricing module',
    pricePkr: '+ PKR 90,000',
    priceUsd: '+ $750 USD',
    descEn:
      'Allows verified bulk buyers and dealers to log in and order at special discounted dealer rates, with minimum quantity rules (e.g. 5+ pieces) and separate customer account ledgers (Khata).',
    descUr:
      'Dealers aur wholesale khareedaron ke liye alag bulk rate dikhata hai. Wo login kar ke sasti rate par baray order de sakenge aur unka alag khata chalay ga.',
  },
  {
    en: 'Loyalty, wallet and gift cards',
    ur: 'Loyalty, wallet aur gift cards',
    pricePkr: '+ PKR 70,000',
    priceUsd: '+ $550 USD',
    descEn:
      'Rewards customers with cashback points in their digital store wallet on every purchase, and lets you issue digital gift vouchers so customers keep coming back to your shop.',
    descUr:
      'Customers ko har khareedari par reward points aur wallet cashback milta hai taake wo bar bar aap hi ki dukan se samaan khareedein.',
  },
  {
    en: 'Multi vendor marketplace',
    ur: 'Multi vendor marketplace',
    pricePkr: '+ PKR 150,000',
    priceUsd: '+ $1,200 USD',
    descEn:
      'Turns your site into an open platform like Daraz or Amazon where other third-party computer sellers and shops can list their own products, while you automatically collect a percentage commission on every sale.',
    descUr:
      'Aapki website ko Daraz ki tarah banata hai jahan doosray tech sellers aur shops apna samaan list karenge aur aap har sale par apna commission rakhain ge.',
  },
  {
    en: 'Advanced staff roles and permissions',
    ur: 'Advanced staff roles aur permissions',
    pricePkr: '+ PKR 40,000',
    priceUsd: '+ $350 USD',
    descEn:
      'Protects sensitive store data. Lets cashiers only make sales receipts, technicians view RMA repairs, and stock staff scan inventory — while purchase costs and profit margins remain strictly visible to the owner only.',
    descUr:
      'Dukan ke har mulazim ke liye alag ikhtiyar. Cashier sirf bill banaye ga, technician sirf warranty dekhe ga, aur dukan ka asli munafa ya purchase cost sirf maalik ko nazar aayegi.',
  },
  {
    en: 'Product data entry beyond 50 SKUs',
    ur: '50 SKUs se zyada product data entry',
    pricePkr: '+ PKR 15,000 / 50',
    priceUsd: '+ $120 USD / 50',
    descEn:
      "Don't have time to enter products? Our team cleans high-res photos, writes full technical specs (RAM generation, CPU socket, wattage), and uploads inventory in batches of 50 items.",
    descUr:
      'Agar aapke paas product upload karne ka waqt nahi, to hamari team 50 products ki tasweerein, specs aur qeematein khud system mein daal kar degi.',
  },
  {
    en: 'Courier tracking integration',
    ur: 'Courier tracking integration',
    pricePkr: '+ PKR 50,000',
    priceUsd: '+ $400 USD',
    descEn:
      "Generates courier booking slips (Trax, PostEx, Leopards, TCS) with 1 click directly from your admin panel, and automatically sends the live tracking link to your customer's WhatsApp.",
    descUr:
      'Admin panel se 1-click par courier slips (Trax, PostEx, Leopards, TCS) banayein aur tracking link customer ke WhatsApp par auto send ho jaye ga.',
  },
  {
    en: 'Online payment gateway for card prepay',
    ur: 'Card prepay ke liye online payment gateway',
    pricePkr: '+ PKR 50,000',
    priceUsd: '+ $400 USD',
    starterOnly: true,
    descEn:
      'Accepts Visa, Mastercard, PayPak, EasyPaisa, and JazzCash directly on your site for upfront prepaid orders. (Note: Multi Branch Growth and Chain plans already INCLUDE this at zero extra cost — no $400 / 50K fee).',
    descUr:
      'Website par hi Visa, Mastercard, EasyPaisa aur JazzCash se peshgi online payment receive karein. (Note: Multi-Branch Growth aur Chain plans mein yeh pehle se bilkul SHAMIL hai — baghair kisi 50K fee ke).',
  },
  {
    en: 'AI Retail Sales & Hardware Advisor Chatbot',
    ur: 'AI Retail Sales aur Hardware Advisor Chatbot',
    pricePkr: '+ PKR 65,000',
    priceUsd: '+ $650 USD',
    starterOnly: true,
    descEn:
      'Deploys an automated 24/7 AI Hardware Advisor directly on your storefront. Recommends parts by budget, checks socket/wattage compatibility, and converts visitors into WhatsApp and web orders. (Note: Multi Branch Growth and Chain plans already INCLUDE this at zero extra cost — no $650 / 65K fee).',
    descUr:
      'Website par 24/7 mojud AI assistant jo customer ke budget ke mutabiq compatible parts recommend karta hai, socket aur wattage match karta hai, aur orders seedha WhatsApp ya cart mein bhejta hai. (Note: Multi-Branch Growth aur Chain plans mein yeh pehle se bilkul SHAMIL hai).',
  },
  {
    en: 'Container manifest bulk CSV import tool',
    ur: 'Container manifest bulk CSV import tool',
    pricePkr: '+ PKR 60,000',
    priceUsd: '+ $450 USD',
    descEn:
      'Upload hundreds of incoming imported laptops directly from your supplier manifest spreadsheet in seconds, mapping specs, RAM, and grades automatically.',
    descUr:
      'Imported containers ki Excel/CSV sheet se sainkaron laptops chand seconds mein specs, RAM aur grades ke sath upload ho jate hain.',
  },
]

export default function LaptopRetailSolution() {
  const { lang, setLang, isUrdu } = useLanguage()
  const [currency, setCurrency] = useState(detectInitialCurrency)
  const [activeModalKey, setActiveModalKey] = useState(null)
  const [expandedExtra, setExpandedExtra] = useState(null)

  const t = I18N_DATA[lang] || I18N_DATA.en
  const plans = LAPTOP_PLANS_DETAIL[lang] || LAPTOP_PLANS_DETAIL.en

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleLanguageChange = (newLang) => {
    setLang(newLang)
  }

  const handleCurrencyChange = (newCurr) => {
    setCurrency(newCurr)
    try {
      localStorage.setItem('texcodes_currency', newCurr)
      localStorage.setItem('tex_pref_currency', newCurr)
    } catch (e) {}
  }

  const toggleExtra = (index) => {
    setExpandedExtra((prev) => (prev === index ? null : index))
  }

  const openWhatsApp = (planName, price) => {
    const text = isUrdu
      ? `Assalam-o-Alaikum TeXCodes, main ${planName} (${price}) Laptop Retail OS solution book karna chahta hoon.`
      : `Hello TeXCodes, I would like to schedule a consultation for the ${planName} (${price}) Laptop & Accessories Retail OS.`
    window.open(`https://wa.me/923091824000?text=${encodeURIComponent(text)}`, '_blank')
  }

  const activePlan = activeModalKey ? plans[activeModalKey] : null

  const renderExtraCard = (a, i) => {
    const isOpen = expandedExtra === i
    const displayPrice = currency === 'USD' ? a.priceUsd : a.pricePkr
    return (
      <motion.div
        layout
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        key={i}
        onClick={() => toggleExtra(i)}
        className={`border p-4 transition-colors duration-200 cursor-pointer select-none group flex flex-col ${
          isOpen
            ? 'bg-[#F0FDF4] dark:bg-[#14261C] border-[#059669] dark:border-[#10B981] shadow-sm'
            : 'bg-[#FAF9F5] dark:bg-[#0F0F11] border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] hover:border-[#059669]/60 dark:hover:border-[#10B981]/60'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="offer-ui text-[#0F0F0F] dark:text-[#EDECE6] font-semibold group-hover:text-[#059669] dark:group-hover:text-[#10B981] transition-colors block">
              {isUrdu ? a.ur : a.en}
            </span>
            {a.starterOnly && (
              <span className="inline-block px-1.5 py-0.5 rounded offer-ui font-bold bg-[#ECFDF5] dark:bg-[#10B981]/20 text-[#059669] dark:text-[#10B981] border border-[#059669]/30">
                {isUrdu
                  ? 'Growth & Chain mein SHAMIL (Bina Izafi Fee)'
                  : 'INCLUDED in Growth & Chain (Zero Fee)'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="text-right">
              <span className="offer-ui text-[#059669] dark:text-[#10B981] whitespace-nowrap font-bold block">
                {displayPrice}
              </span>
              {a.starterOnly && (
                <span className="offer-ui text-[#8E8D88] dark:text-[#6A6965] block">
                  {isUrdu ? '(Sirf Starter)' : '(Starter Only)'}
                </span>
              )}
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={`p-1 rounded-full ${
                isOpen
                  ? 'bg-[#059669] text-white'
                  : 'text-[#8E8D88] dark:text-[#6A6965] group-hover:text-[#059669] dark:group-hover:text-[#10B981] group-hover:bg-[rgba(5,150,105,0.1)]'
              }`}
            >
              <ChevronDown size={14} />
            </motion.div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-[rgba(15,15,15,0.08)] dark:border-[rgba(255,255,255,0.08)] space-y-2">
                <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                  {isUrdu ? a.descUr : a.descEn}
                </p>
                {a.starterOnly && (
                  <div className="p-2 bg-[#ECFDF5] dark:bg-[#10B981]/15 border border-[#059669]/30 offer-ui text-[#059669] dark:text-[#10B981] font-medium rounded-sm">
                    {isUrdu
                      ? `✓ Multi Branch Growth (${currency === 'USD' ? '$4,450 USD' : 'PKR 490,000'}) aur Chain OS (${currency === 'USD' ? '$7,900+ USD' : 'PKR 850,000'}) plans mein yeh pehle se mukammal shamil hai — koi izafi fee nahi deni parti.`
                      : `✓ Included standard in Multi Branch Growth (${currency === 'USD' ? '$4,450 USD' : 'PKR 490,000'}) & Chain OS (${currency === 'USD' ? 'From $7,900 USD' : 'From PKR 850,000'}) plans at NO extra charge.`}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  return (
    <div className="w-full bg-[#F6F5F0] dark:bg-[#0F0F11] text-[#0F0F0F] dark:text-[#EDECE6] min-h-screen transition-colors duration-200">
      {/* Plan Detail Modal */}
      <PlanDetailModal
        plan={activePlan}
        lang={lang}
        currency={currency}
        onClose={() => setActiveModalKey(null)}
        onOpenWhatsApp={(name, price) => openWhatsApp(name, price)}
      />

      {/* ─── Top Bar: Currency & Language Controls ─── */}
      <div className="border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#161619] px-4 sm:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between offer-ui flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]" />
            <span className="text-[#0F0F0F] dark:text-[#EDECE6] font-bold uppercase tracking-wider hidden sm:inline">
              TEXCODES LAPTOP RETAIL OS // COMMERCIAL SOLUTION
            </span>
            <span className="text-[#0F0F0F] dark:text-[#EDECE6] font-bold uppercase tracking-wider sm:hidden">
              LAPTOP OS
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Currency Selector */}
            <div className="inline-flex items-center border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#1A1A1E] p-0.5">
              <button
                onClick={() => handleCurrencyChange('USD')}
                className={`px-2.5 py-0.5 offer-ui font-bold transition-colors cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-[#059669] text-white dark:bg-[#10B981]'
                    : 'text-[#575652] dark:text-[#9B9A95] hover:text-[#0F0F0F] dark:hover:text-[#EDECE6]'
                }`}
                title="International Rates in USD"
              >
                $ USD
              </button>
              <button
                onClick={() => handleCurrencyChange('PKR')}
                className={`px-2.5 py-0.5 offer-ui font-bold transition-colors cursor-pointer ${
                  currency === 'PKR'
                    ? 'bg-[#059669] text-white dark:bg-[#10B981]'
                    : 'text-[#575652] dark:text-[#9B9A95] hover:text-[#0F0F0F] dark:hover:text-[#EDECE6]'
                }`}
                title="Pakistan Rates in PKR"
              >
                ₨ PKR
              </button>
            </div>

            <span className="text-[rgba(15,15,15,0.2)] dark:text-[rgba(255,255,255,0.2)]">|</span>

            {/* Language Selector */}
            <div className="flex items-center gap-1">
              <Globe size={13} className="text-[#575652] dark:text-[#9B9A95]" />
              <div className="inline-flex items-center border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#1A1A1E] p-0.5">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-2 py-0.5 offer-ui font-bold transition-colors cursor-pointer ${
                    lang === 'en'
                      ? 'bg-[#059669] text-white dark:bg-[#10B981]'
                      : 'text-[#575652] dark:text-[#9B9A95] hover:text-[#0F0F0F] dark:hover:text-[#EDECE6]'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange('ur-en')}
                  className={`px-2 py-0.5 offer-ui font-bold transition-colors cursor-pointer ${
                    lang === 'ur-en'
                      ? 'bg-[#059669] text-white dark:bg-[#10B981]'
                      : 'text-[#575652] dark:text-[#9B9A95] hover:text-[#0F0F0F] dark:hover:text-[#EDECE6]'
                  }`}
                >
                  UR
                </button>
              </div>
            </div>

            <span className="text-[rgba(15,15,15,0.2)] dark:text-[rgba(255,255,255,0.2)] hidden sm:inline">|</span>
            <ThemeToggle className="hidden sm:inline-flex" />
            <ThemeToggle variant="icon" className="sm:hidden" />
          </div>
        </div>
      </div>

      {/* ─── Hero Section ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

        <FadeIn direction="up" className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold bg-[#ECFDF5] dark:bg-[rgba(16,185,129,0.15)] px-3 py-1 border border-[#059669]/25 dark:border-[#10B981]/30">
            <Laptop size={14} />
            <span>{t.hero_badge}</span>
          </div>

          <h1 className="offer-h1 text-[#0F0F0F] dark:text-[#EDECE6]">
            {t.hero_title_1}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] via-[#10B981] to-[#34D399] block sm:inline drop-shadow-xs">
              {t.hero_title_accent}
            </span>
            <br />
            {t.hero_title_2}
          </h1>

          <p className="offer-lede text-[#575652] dark:text-[#9B9A95] max-w-3xl">
            {t.hero_sub}
          </p>

          {/* Key Metrics Row */}
          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 offer-ui">
            <StaggerItem className="p-4 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-1 card-hover-guided">
              <div className="text-[#059669] dark:text-[#10B981] font-bold offer-ui">{t.metrics_code_top}</div>
              <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.metrics_code}</div>
            </StaggerItem>
            <StaggerItem className="p-4 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-1 card-hover-guided">
              <div className="text-[#059669] dark:text-[#10B981] font-bold offer-ui">{t.metrics_tax_top}</div>
              <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.metrics_tax}</div>
            </StaggerItem>
            <StaggerItem className="p-4 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-1 card-hover-guided">
              <div className="text-[#059669] dark:text-[#10B981] font-bold offer-ui">{t.metrics_speed_top}</div>
              <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.metrics_speed}</div>
            </StaggerItem>
            <StaggerItem className="p-4 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-1 card-hover-guided">
              <div className="text-[#059669] dark:text-[#10B981] font-bold offer-ui">{t.metrics_rma_top}</div>
              <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.metrics_rma}</div>
            </StaggerItem>
          </StaggerContainer>

          {/* Actions */}
          <div className="pt-4 flex flex-wrap items-center gap-4 offer-ui">
            <a href="#laptop-plans" className="btn-blue offer-btn offer-btn-xl shadow-sm group relative overflow-hidden">
              <span className="relative z-10">{t.cta_primary}</span>
              <ArrowRight size={14} className="relative z-10 arrow-slide" />
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none animate-shimmer-sweep" />
            </a>
            <a
              href="https://store-demo-eight.vercel.app/?mode=laptop"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline offer-btn offer-btn-lg group relative overflow-hidden"
            >
              <span className="relative z-10">{t.cta_secondary}</span>
              <ArrowUpRight size={14} className="relative z-10 arrow-slide" />
              <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#10B981]/15 to-transparent pointer-events-none animate-shimmer-sweep" />
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ─── Core Architecture Breakdown ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#121215]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div>
            <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold mb-2">
              {t.arch_badge}
            </div>
            <h2 className="offer-h1 text-[#0F0F0F] dark:text-[#EDECE6] max-w-4xl">
              {t.arch_title}
            </h2>
            <p className="offer-body text-[#575652] dark:text-[#9B9A95] max-w-3xl mt-3">
              {t.arch_sub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: t.arch_01_title, desc: t.arch_01_desc, icon: Sparkles },
              { title: t.arch_02_title, desc: t.arch_02_desc, icon: HardDrive },
              { title: t.arch_03_title, desc: t.arch_03_desc, icon: BatteryCharging },
              { title: t.arch_04_title, desc: t.arch_04_desc, icon: Boxes },
              { title: t.arch_05_title, desc: t.arch_05_desc, icon: ShieldCheck },
              { title: t.arch_06_title, desc: t.arch_06_desc, icon: MessageSquare },
              { title: t.arch_07_title, desc: t.arch_07_desc, icon: Zap },
            ].map((item, idx) => {
              const IconComp = item.icon
              return (
                <div
                  key={idx}
                  className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded-sm bg-[#ECFDF5] dark:bg-[#10B981]/20 border border-[#059669]/30 flex items-center justify-center text-[#059669] dark:text-[#10B981]">
                      <IconComp size={18} />
                    </div>
                    <div className="offer-ui-strong text-[#0F0F0F] dark:text-[#EDECE6]">
                      {item.title}
                    </div>
                    <p className="offer-ui text-[#575652] dark:text-[#9B9A95] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Live Demo Experience Grid ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)]">
        <div className="max-w-7xl mx-auto space-y-8">
          <FadeIn direction="up">
            <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold mb-2">
              {t.demo_badge}
            </div>
            <h2 className="offer-h1 text-[#0F0F0F] dark:text-[#EDECE6]">
              {t.demo_title}
            </h2>
            <p className="offer-body text-[#575652] dark:text-[#9B9A95] max-w-2xl mt-2">
              {t.demo_sub}
            </p>
          </FadeIn>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-3 gap-6 offer-ui">
            <StaggerItem>
              <a
                href="https://store-demo-eight.vercel.app/?mode=laptop"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] card-hover-guided group block space-y-3 shadow-xs h-full"
              >
                <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui flex items-center justify-between">
                  <span>{t.demo_store_title}</span>
                  <ArrowUpRight size={14} className="text-[#059669] dark:text-[#10B981] arrow-slide" />
                </div>
                <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                  {t.demo_store_desc}
                </p>
              </a>
            </StaggerItem>

            <StaggerItem>
              <a
                href="https://store-demo-eight.vercel.app/category/all?mode=laptop"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] card-hover-guided group block space-y-3 shadow-xs h-full"
              >
                <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui flex items-center justify-between">
                  <span>{t.demo_filter_title}</span>
                  <ArrowUpRight size={14} className="text-[#059669] dark:text-[#10B981] arrow-slide" />
                </div>
                <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                  {t.demo_filter_desc}
                </p>
              </a>
            </StaggerItem>

            <StaggerItem>
              <a
                href="https://store-demo-eight.vercel.app/admin"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] card-hover-guided group block space-y-3 shadow-xs h-full"
              >
                <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui flex items-center justify-between">
                  <span>{t.demo_admin_title}</span>
                  <ArrowUpRight size={14} className="text-[#059669] dark:text-[#10B981] arrow-slide" />
                </div>
                <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                  {t.demo_admin_desc}
                </p>
              </a>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ─── Pricing & Packages Tiers ─── */}
      <section id="laptop-plans" className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#0F0F11]">
        <div className="max-w-7xl mx-auto space-y-12">
          <FadeIn direction="up" className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold bg-[#ECFDF5] dark:bg-[rgba(16,185,129,0.15)] px-3 py-0.5 border border-[#059669]/25 dark:border-[#10B981]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#10B981]" />
              {t.plans_badge}
            </div>
            <h2 className="offer-h1 text-[#0F0F0F] dark:text-[#EDECE6]">
              {t.plans_title}
            </h2>
            <p className="offer-body text-[#575652] dark:text-[#9B9A95]">
              {t.plans_sub} {t.plans_sub_suffix}
            </p>
          </FadeIn>

          {/* ─── The Zero-Risk Decision Matrix (Best-Case vs Worst-Case) ─── */}
          <FadeIn direction="up" className="bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] p-6 sm:p-10 space-y-8 shadow-xs">
            <div className="text-center space-y-2 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-1.5 offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold bg-[#ECFDF5] dark:bg-[rgba(16,185,129,0.15)] px-3 py-0.5 border border-[#059669]/25 dark:border-[#10B981]/30">
                <ShieldCheck size={14} />
                <span>{t.ultimatum_badge}</span>
              </div>
              <h3 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
                {t.ultimatum_title}
              </h3>
              <p className="offer-body text-[#575652] dark:text-[#9B9A95]">
                {t.ultimatum_sub}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* Best Case Card */}
              <div className="p-6 sm:p-7 bg-[#FAF9F5] dark:bg-[#1A1A1F] border border-[#059669]/30 dark:border-[#10B981]/30 flex flex-col justify-between space-y-5 rounded-xs relative overflow-hidden">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-[#059669]/20 dark:border-[#10B981]/20 pb-3">
                    <span className="offer-eyebrow font-bold text-[#059669] dark:text-[#10B981] bg-[#ECFDF5] dark:bg-[#10B981]/20 px-2.5 py-1 rounded">
                      {t.ultimatum_best_tag}
                    </span>
                    <span className="offer-ui text-[#059669] dark:text-[#10B981] font-bold">WIN #1</span>
                  </div>
                  <div className="offer-ui-strong text-[#0F0F0F] dark:text-[#EDECE6]">
                    {t.ultimatum_best_title}
                  </div>
                  <ul className="space-y-2.5 offer-ui text-[#575652] dark:text-[#9B9A95]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.ultimatum_best_p1}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.ultimatum_best_p2}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.ultimatum_best_p3}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.ultimatum_best_p4}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.ultimatum_best_p5}</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-[#059669]/20 dark:border-[#10B981]/20 offer-eyebrow text-[#059669] dark:text-[#10B981] font-bold">
                  {t.ultimatum_best_footer}
                </div>
              </div>

              {/* Worst Case Card */}
              <div className="p-6 sm:p-7 bg-[#FAF9F5] dark:bg-[#1A1A1F] border border-[rgba(15,15,15,0.16)] dark:border-[rgba(255,255,255,0.14)] flex flex-col justify-between space-y-5 rounded-xs relative overflow-hidden">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-3">
                    <span className="offer-eyebrow font-bold text-[#8E8D88] dark:text-[#6A6965] bg-neutral-200/60 dark:bg-neutral-800/60 px-2.5 py-1 rounded">
                      {t.ultimatum_worst_tag}
                    </span>
                    <span className="offer-ui text-[#8E8D88] dark:text-[#6A6965] font-bold">WIN #2</span>
                  </div>
                  <div className="offer-ui-strong text-[#0F0F0F] dark:text-[#EDECE6]">
                    {t.ultimatum_worst_title}
                  </div>
                  <ul className="space-y-2.5 offer-ui text-[#575652] dark:text-[#9B9A95]">
                    <li className="flex items-start gap-2">
                      <ShieldCheck size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.ultimatum_worst_p1}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.ultimatum_worst_p2}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.ultimatum_worst_p3}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck size={16} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.ultimatum_worst_p4}</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] offer-eyebrow text-[#575652] dark:text-[#9B9A95] font-bold">
                  {t.ultimatum_worst_footer}
                </div>
              </div>
            </div>

            {/* Staging Guarantee Banner Callout */}
            <div className="p-4 sm:p-5 bg-[#ECFDF5] dark:bg-[#10B981]/15 border border-[#059669]/30 dark:border-[#10B981]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-4xl">
                <div className="offer-eyebrow font-bold text-[#059669] dark:text-[#10B981] flex items-center gap-1.5">
                  <ShieldCheck size={15} />
                  <span>{t.guarantee_badge}</span>
                </div>
                <div className="offer-ui-strong text-[#0F0F0F] dark:text-[#EDECE6]">
                  {t.guarantee_title}
                </div>
                <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                  {t.guarantee_sub}
                </p>
              </div>
              <Link
                to="/solutions/tech-retail/terms"
                className="btn-outline offer-btn offer-btn-sm shrink-0 whitespace-nowrap"
              >
                <span>{t.view_terms}</span>
              </Link>
            </div>
          </FadeIn>

          {/* Guided Conversion Flow Ribbon */}
          <FadeIn direction="up" delay={0.1} className="flex items-center justify-center gap-2 sm:gap-4 offer-eyebrow text-[#575652] dark:text-[#9B9A95] pb-2 flex-wrap">
            <span className="flex items-center gap-1.5 text-[#059669] dark:text-[#10B981] font-bold">
              <span className="w-5 h-5 rounded-full border border-[#059669] dark:border-[#10B981] flex items-center justify-center offer-ui">1</span>
              {isUrdu ? 'Tier Muntakhib Karein' : 'Select Tier'}
            </span>
            <span className="text-[#8E8D88] dark:text-[#6A6965]">→</span>
            <span className="flex items-center gap-1.5 text-[#059669] dark:text-[#10B981] font-bold">
              <span className="w-5 h-5 rounded-full border border-[#059669] dark:border-[#10B981] flex items-center justify-center offer-ui">2</span>
              {isUrdu ? 'Live Proof Inspect Karein' : 'Inspect Previews'}
            </span>
            <span className="text-[#8E8D88] dark:text-[#6A6965]">→</span>
            <span className="flex items-center gap-1.5 text-[#059669] dark:text-[#10B981] font-bold">
              <span className="w-5 h-5 rounded-full border border-[#059669] dark:border-[#10B981] flex items-center justify-center offer-ui">3</span>
              {isUrdu ? 'WhatsApp Par Claim Karein' : 'Claim on WhatsApp'}
            </span>
          </FadeIn>

          {/* Currency Toggle Ribbon directly above plan tiers */}
          <FadeIn direction="up" delay={0.05} className="flex flex-col items-center justify-center gap-2 pt-2 pb-2">
            <div className="inline-flex items-center p-1 rounded-md border border-[rgba(15,15,15,0.15)] dark:border-[rgba(255,255,255,0.15)] bg-white dark:bg-[#161619] shadow-sm">
              <button
                onClick={() => handleCurrencyChange('USD')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded text-xs font-bold offer-ui transition-all cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-[#059669] dark:bg-[#10B981] text-white shadow-xs'
                    : 'text-[#575652] dark:text-[#9B9A95] hover:text-[#0F0F0F] dark:hover:text-[#EDECE6]'
                }`}
              >
                <span>$ USD</span>
                <span className="text-[10px] opacity-80 font-normal">(International)</span>
              </button>
              <button
                onClick={() => handleCurrencyChange('PKR')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded text-xs font-bold offer-ui transition-all cursor-pointer ${
                  currency === 'PKR'
                    ? 'bg-[#059669] dark:bg-[#10B981] text-white shadow-xs'
                    : 'text-[#575652] dark:text-[#9B9A95] hover:text-[#0F0F0F] dark:hover:text-[#EDECE6]'
                }`}
              >
                <span>₨ PKR</span>
                <span className="text-[10px] opacity-80 font-normal">(Pakistan)</span>
              </button>
            </div>
            <div className="offer-eyebrow text-[#8E8D88] dark:text-[#6A6965] text-center">
              {currency === 'USD'
                ? isUrdu
                  ? '🌍 International USD rates active (Bahar ke mulkon ke clients ke liye)'
                  : '🌍 International USD rates active (Auto-selected for overseas clients)'
                : isUrdu
                ? '🇵🇰 Pakistan domestic rates active (PKR)'
                : '🇵🇰 Pakistan domestic rates active (PKR)'}
            </div>
          </FadeIn>

          {/* Plans Grid */}
          <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start offer-ui">
            {/* 1. Single Outlet Launch */}
            <StaggerItem className="h-full">
              <div className="p-8 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-6 flex flex-col justify-between hover:border-[#059669] dark:hover:border-[#10B981] transition-colors h-full card-hover-guided">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.starter_name}</div>
                    <span className="offer-eyebrow text-[#8E8D88] dark:text-[#6A6965]">{t.starter_badge}</span>
                  </div>
                  <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                    {t.starter_desc}
                  </p>

                  <div className="pt-2 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)]">
                    <div className="offer-h3 text-[#0F0F0F] dark:text-[#EDECE6]">
                      {currency === 'USD' ? t.starter_price_usd : t.starter_price_pkr}
                    </div>
                    <div className="offer-ui text-[#059669] dark:text-[#10B981] font-semibold mt-1">{t.starter_delivery}</div>
                  </div>

                  <div className="p-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] offer-ui text-[#0F0F0F] dark:text-[#EDECE6] space-y-1">
                    <div className="font-bold text-[#059669] dark:text-[#10B981] offer-eyebrow">
                      {t.starter_callout_label}
                    </div>
                    <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                      {t.starter_callout_text}
                    </p>
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

                  {/* Prominent Modal Trigger Button */}
                  <div className="pt-3">
                    <button
                      onClick={() => setActiveModalKey('starter')}
                      className="relative overflow-hidden w-full bg-[#ECFDF5] dark:bg-[#10B981]/15 text-[#059669] dark:text-[#10B981] border-2 border-[#059669]/50 dark:border-[#10B981]/60 offer-btn offer-btn-sm font-extrabold hover:bg-[#059669] dark:hover:bg-[#10B981] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm animate-click-me group"
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
                    onClick={() => openWhatsApp(t.starter_name, currency === 'USD' ? t.starter_price_usd : t.starter_price_pkr)}
                    className="btn-outline w-full justify-center offer-btn offer-btn-lg animate-claim-outline group relative overflow-hidden transition-all duration-300"
                  >
                    <MessageSquare size={14} className="animate-icon-wiggle group-hover:scale-125 transition-transform text-[#059669] dark:text-[#10B981]" />
                    <span>{t.whatsapp_cta}</span>
                    <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#059669]/10 to-transparent pointer-events-none animate-shimmer-sweep" />
                  </button>
                  <div className="offer-ui text-[#8E8D88] dark:text-[#6A6965] text-center">
                    {currency === 'USD' ? t.starter_support_usd : t.starter_support_pkr}
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* 2. Multi-Branch Laptop Growth (Featured) */}
            <StaggerItem className="h-full">
              <div className="p-8 bg-white dark:bg-[#161619] border-2 border-[#059669] dark:border-[#10B981] space-y-6 flex flex-col justify-between shadow-lg relative hover:shadow-xl transition-shadow h-full card-hover-guided">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#059669] dark:bg-[#10B981] text-white offer-eyebrow font-bold px-3 py-1 shadow-sm">
                  {t.growth_badge}
                </div>

                <div className="space-y-4">
                  <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.growth_name}</div>
                  <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                    {t.growth_desc}
                  </p>

                  <div className="pt-2 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)]">
                    <div className="offer-h3 text-[#059669] dark:text-[#10B981]">
                      {currency === 'USD' ? t.growth_price_usd : t.growth_price_pkr}
                    </div>
                    <div className="offer-ui text-[#059669] dark:text-[#10B981] font-semibold mt-1">{t.growth_delivery}</div>
                  </div>

                  <div className="p-3 bg-[#ECFDF5] dark:bg-[#10B981]/15 border border-[#059669]/25 dark:border-[#10B981]/30 offer-ui text-[#0F0F0F] dark:text-[#EDECE6] space-y-1">
                    <div className="font-bold text-[#059669] dark:text-[#10B981] offer-eyebrow">
                      {t.growth_callout_label}
                    </div>
                    <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                      {t.growth_callout_text}
                    </p>
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
                      <span>{currency === 'USD' ? t.growth_f5_usd : t.growth_f5_pkr}</span>
                    </div>
                    <div className="flex items-start gap-2 text-[#059669] dark:text-[#10B981] font-semibold">
                      <Check size={14} className="shrink-0 mt-0.5" />
                      <span>{currency === 'USD' ? t.growth_f6_usd : t.growth_f6_pkr}</span>
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
                    onClick={() => openWhatsApp(t.growth_name, currency === 'USD' ? t.growth_price_usd : t.growth_price_pkr)}
                    className="btn-blue w-full justify-center offer-btn offer-btn-xl shadow-md animate-claim-solid group relative overflow-hidden transition-all duration-300"
                  >
                    <MessageSquare size={15} className="animate-icon-wiggle group-hover:scale-125 transition-transform" />
                    <span className="tracking-wider">{t.whatsapp_cta}</span>
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none animate-shimmer-sweep" />
                  </button>
                  <div className="offer-ui text-[#8E8D88] dark:text-[#6A6965] text-center">
                    {currency === 'USD' ? t.growth_support_usd : t.growth_support_pkr}
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* 3. Enterprise Wholesale & Chain OS */}
            <StaggerItem className="h-full">
              <div className="p-8 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-6 flex flex-col justify-between hover:border-[#059669] dark:hover:border-[#10B981] transition-colors h-full card-hover-guided">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.enterprise_name}</div>
                    <span className="offer-eyebrow text-[#8E8D88] dark:text-[#6A6965]">{t.enterprise_badge}</span>
                  </div>
                  <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                    {t.enterprise_desc}
                  </p>

                  <div className="pt-2 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)]">
                    <div className="offer-h3 text-[#0F0F0F] dark:text-[#EDECE6]">
                      {currency === 'USD' ? t.enterprise_price_usd : t.enterprise_price_pkr}
                    </div>
                    <div className="offer-ui text-[#059669] dark:text-[#10B981] font-semibold mt-1">{t.enterprise_delivery}</div>
                  </div>

                  <div className="p-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] offer-ui text-[#0F0F0F] dark:text-[#EDECE6] space-y-1">
                    <div className="font-bold text-[#059669] dark:text-[#10B981] offer-eyebrow">
                      {t.enterprise_callout_label}
                    </div>
                    <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                      {t.enterprise_callout_text}
                    </p>
                  </div>

                  <div className="pt-2 space-y-2 offer-ui text-[#0F0F0F] dark:text-[#EDECE6]">
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span>{t.enterprise_f1}</span>
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
                    <div className="flex items-start gap-2 text-[#059669] dark:text-[#10B981] font-semibold">
                      <Check size={14} className="shrink-0 mt-0.5" />
                      <span>{t.enterprise_f5}</span>
                    </div>
                    <div className="flex items-start gap-2 text-[#059669] dark:text-[#10B981] font-semibold">
                      <Check size={14} className="shrink-0 mt-0.5" />
                      <span>{t.enterprise_f6}</span>
                    </div>
                  </div>

                  {/* Prominent Modal Trigger Button */}
                  <div className="pt-3">
                    <button
                      onClick={() => setActiveModalKey('enterprise')}
                      className="relative overflow-hidden w-full bg-[#ECFDF5] dark:bg-[#10B981]/15 text-[#059669] dark:text-[#10B981] border-2 border-[#059669]/50 dark:border-[#10B981]/60 offer-btn offer-btn-sm font-extrabold hover:bg-[#059669] dark:hover:bg-[#10B981] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm animate-click-me group"
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
                    onClick={() => openWhatsApp(t.enterprise_name, currency === 'USD' ? t.enterprise_price_usd : t.enterprise_price_pkr)}
                    className="btn-outline w-full justify-center offer-btn offer-btn-lg animate-claim-outline group relative overflow-hidden transition-all duration-300"
                  >
                    <MessageSquare size={14} className="animate-icon-wiggle group-hover:scale-125 transition-transform text-[#059669] dark:text-[#10B981]" />
                    <span>{t.whatsapp_cta}</span>
                    <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#059669]/10 to-transparent pointer-events-none animate-shimmer-sweep" />
                  </button>
                  <div className="offer-ui text-[#8E8D88] dark:text-[#6A6965] text-center">
                    {currency === 'USD' ? t.enterprise_support_usd : t.enterprise_support_pkr}
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Extras menu */}
          <FadeIn direction="up" className="bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] p-6 sm:p-8 space-y-5">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold">
                  {isUrdu ? 'EXTRAS // SIRF ZAROORAT KI CHEEZ ADD KAREIN' : 'EXTRAS // PAY ONLY FOR WHAT YOU NEED'}
                </div>
                <div className="offer-ui text-[#059669] dark:text-[#10B981] flex items-center gap-1 font-medium bg-[#ECFDF5] dark:bg-[#10B981]/15 px-2 py-0.5 rounded border border-[#059669]/25">
                  <ChevronDown size={12} className="shrink-0" />
                  <span>{isUrdu ? 'Kisi bhi item par click karein wazahat dekhne ke liye' : 'Click any item below to view simple layman explanation'}</span>
                </div>
              </div>
              <h3 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
                {isUrdu ? 'Base price mein yeh shamil nahi. Jo chahiye add karein.' : 'Not in the base price. Add only what you need.'}
              </h3>
              <p className="offer-body text-[#575652] dark:text-[#9B9A95] max-w-3xl">
                {isUrdu
                  ? 'Har plan ek fixed base price par aata hai. Extra modules neeche diye gaye hain aur final invoice mein saaf lafzon mein add hotay hain. Koi chhupa hua cost nahi.'
                  : 'Every plan starts at one fixed base price. Extra modules are listed below and added to your final invoice in plain terms. No hidden costs.'}
              </p>
            </div>
            {/* Desktop 3-Column Layout: when an item in one column opens, only that column moves down; other columns are completely unaffected */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-3 items-start">
              {[
                [0, 3, 6, 9],
                [1, 4, 7],
                [2, 5, 8],
              ].map((colIndices, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-3">
                  {colIndices.map((idx) => renderExtraCard(LAPTOP_EXTRAS_DATA[idx], idx))}
                </div>
              ))}
            </div>

            {/* Tablet 2-Column Layout */}
            <div className="hidden sm:grid lg:hidden sm:grid-cols-2 gap-3 items-start">
              {[
                [0, 2, 4, 6, 8],
                [1, 3, 5, 7, 9],
              ].map((colIndices, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-3">
                  {colIndices.map((idx) => renderExtraCard(LAPTOP_EXTRAS_DATA[idx], idx))}
                </div>
              ))}
            </div>

            {/* Mobile 1-Column Layout */}
            <div className="flex sm:hidden flex-col gap-3">
              {LAPTOP_EXTRAS_DATA.map((item, idx) => renderExtraCard(item, idx))}
            </div>
            <p className="offer-ui text-[#8E8D88] dark:text-[#6A6965]">
              {isUrdu
                ? 'Tamam extra prices fixed hain aur pehle se bataye jate hain. Final scope WhatsApp par confirm hota hai.'
                : 'All extra prices are fixed and quoted up front. Final scope is confirmed on WhatsApp before work starts.'}
            </p>
          </FadeIn>

          {/* Care Plans */}
          <FadeIn direction="up" className="space-y-5">
            <div className="text-center space-y-2">
              <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold">
                {isUrdu ? 'CARE PLAN // LAUNCH KE BAAD' : 'CARE PLAN // AFTER LAUNCH'}
              </div>
              <h3 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
                {isUrdu ? 'Launch ke baad hum sambhal lete hain' : 'We keep it running after launch'}
              </h3>
              <p className="offer-body text-[#575652] dark:text-[#9B9A95] max-w-2xl mx-auto">
                {isUrdu
                  ? '30 din ki warranty ke baad, Care Plan aapke system ko online, secure aur updated rakhta hai. Code aapka hai, hosting hum par chhod dein ya khud manage karein.'
                  : 'After the 30 day warranty, a Care Plan keeps your laptop store online, secure and updated. You own the code, so let us host it or run it yourself.'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Basic Care', pricePkr: 'PKR 14,000 / mo', priceUsd: '$140 / mo', en: ['Managed hosting and SSL', 'Daily automated backups', 'Uptime monitoring', 'Small text and image edits', 'Email support'], ur: ['Managed hosting aur SSL', 'Rozana backups', 'Uptime monitoring', 'Chhoti text aur image edits', 'Email support'] },
                { name: 'Growth Care', pricePkr: 'PKR 28,000 / mo', priceUsd: '$280 / mo', en: ['Everything in Basic Care', 'Priority support within 4 business hours', 'Monthly feature tweaks', 'Multi branch hosting', 'WhatsApp support'], ur: ['Basic Care ki sab cheezein', '4 business hours ke andar priority support', 'Mahana feature tweaks', 'Multi branch hosting', 'WhatsApp support'] },
                { name: 'Enterprise Care', pricePkr: 'PKR 55,000 / mo', priceUsd: '$550 / mo', en: ['Everything in Growth Care', 'Dedicated engineer hours each month', 'Integration and API support', '99.5% uptime target', 'Phone support'], ur: ['Growth Care ki sab cheezein', 'Har mahine dedicated engineer hours', 'Integration aur API support', '99.5% uptime target', 'Phone support'] },
              ].map((c, i) => (
                <div key={i} className="bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] p-5 space-y-3">
                  <div className="offer-ui-strong text-[#0F0F0F] dark:text-[#EDECE6]">{c.name}</div>
                  <div className="offer-h3 text-[#059669] dark:text-[#10B981]">
                    {currency === 'USD' ? c.priceUsd : c.pricePkr}
                  </div>
                  <ul className="space-y-1.5">
                    {(isUrdu ? c.ur : c.en).map((li, j) => (
                      <li key={j} className="flex items-start gap-2 offer-ui text-[#575652] dark:text-[#9B9A95]">
                        <Check size={13} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </FadeIn>

          <div className="text-center pt-4">
            <Link
              to="/solutions/tech-retail/terms"
              className="offer-ui font-semibold text-[#059669] dark:text-[#10B981] hover:underline"
            >
              {t.view_terms}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Payback / ROI Section ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#121215]">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold">
            {isUrdu ? 'WAPSI // YEH KHUD KO KAISE PAY KARTA HAI' : 'PAYBACK // HOW THIS PAYS FOR ITSELF'}
          </div>
          <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
            {isUrdu ? 'Aap ek dafa pay karte hain, phir commission nahi' : 'You pay once, then never pay commission again'}
          </h2>
          <p className="offer-body text-[#575652] dark:text-[#9B9A95]">
            {isUrdu
              ? 'Rented platform par aap har mahine subscription dete hain aur har order par ek cut kat ta hai. Yahan aap system ke mukammal malik bante hain. Har laptop sale par aapka munafa 100% aapke business mein rehta hai.'
              : 'On a rented platform you pay a subscription every month plus a cut on every order. Here you own the system outright. The money you save on recurring commissions pays for the entire build in just a few months.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {[
              { big: currency === 'USD' ? '$0' : 'PKR 0', en: 'monthly platform fee after launch', ur: 'launch ke baad mahana platform fee' },
              { big: '0%', en: 'commission on your orders, ever', ur: 'aapke orders par commission, kabhi nahi' },
              { big: '100%', en: 'of the code and data is yours', ur: 'code aur data par aapka mukammal haq' },
            ].map((s, i) => (
              <div key={i} className="bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] p-5 space-y-1">
                <div className="offer-h2 text-[#059669] dark:text-[#10B981]">{s.big}</div>
                <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{isUrdu ? s.ur : s.en}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
