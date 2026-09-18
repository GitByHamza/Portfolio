import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Cpu,
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
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn, StaggerContainer, StaggerItem } from '../../components/motion/MotionReveal'
import PlanDetailModal from '../../components/PlanDetailModal'
import ThemeToggle from '../../components/ThemeToggle'
import { useLanguage } from '../../context/LanguageContext'
import { projectsData, getLocalizedProject } from '../../data/projects'

/**
 * Geo / Country / Timezone auto-selection helper:
 * - Checks localStorage for any manual user override first.
 * - Inspects Intl.DateTimeFormat().resolvedOptions().timeZone (synchronous, 0 latency).
 *   - Asia/Karachi (Pakistan), Asia/Kolkata / Asia/Calcutta (India) -> 'ur-en' (Roman Urdu)
 *   - America/*, Europe/*, Atlantic/* (USA, UK, EU countries) -> 'en' (English)
 * - Inspects navigator.languages for pk/in locales.
 * - Defaults to 'en' if undetermined.
 */
function detectInitialLanguage() {
  if (typeof window === 'undefined') return 'en'

  // 1. User manual override priority
  try {
    const saved = localStorage.getItem('texcodes_retail_lang')
    if (saved === 'en' || saved === 'ur-en') {
      return saved
    }
  } catch (e) {}

  // 2. Immediate synchronous timezone detection
  try {
    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase()

    // Pakistan & India timezones -> Roman Urdu
    if (
      tz === 'asia/karachi' ||
      tz === 'asia/kolkata' ||
      tz === 'asia/calcutta'
    ) {
      return 'ur-en'
    }

    // USA, UK, Canada, Australia, EU timezones -> English
    if (
      tz.startsWith('america/') ||
      tz.startsWith('europe/') ||
      tz.startsWith('atlantic/') ||
      tz.startsWith('australia/')
    ) {
      return 'en'
    }
  } catch (e) {}

  // 3. Immediate browser locale inspection
  try {
    const navLangs = (navigator.languages || [navigator.language || '']).map((l) =>
      l.toLowerCase()
    )
    const isDesiLocale = navLangs.some(
      (l) =>
        l.includes('-pk') ||
        l.includes('-in') ||
        l.startsWith('ur') ||
        l.startsWith('hi') ||
        l.startsWith('pa')
    )
    if (isDesiLocale) return 'ur-en'

    const isWesternLocale = navLangs.some(
      (l) =>
        l.startsWith('en') ||
        l.startsWith('de') ||
        l.startsWith('fr') ||
        l.startsWith('es') ||
        l.startsWith('it')
    )
    if (isWesternLocale) return 'en'
  } catch (e) {}

  return 'en'
}

const I18N_DATA = {
  en: {
    hero_badge: 'COMMERCIAL SYSTEM // COMPUTER & CCTV RETAIL OS',
    hero_title_1: 'Sell Computers, CCTV & Tech Hardware',
    hero_title_accent: 'Online & Multi-Branch',
    hero_title_2: 'Without Monthly Platform Commissions',
    hero_sub:
      'Ditch slow templates and monthly subscriptions. We build a custom Next.js retail system: PC Builder compatibility engine, multi-branch inventory, automated WhatsApp dispatch.',
    cta_primary: 'Choose Your Solution Plan',
    cta_secondary: 'Explore Live Store Demo',
    metrics_code: '100% Client Code Ownership',
    metrics_tax: 'Zero Platform Sales Commission',
    metrics_speed: 'Fast Next.js Server Rendering',
    metrics_rma: 'Serial Number & Warranty Tracking',

    arch_badge: 'SYSTEM ARCHITECTURE',
    arch_title: 'ONE UNIFIED SYSTEM FOR THE RETAIL OPERATION',
    arch_sub:
      'Not just an online catalog. An integrated retail operating environment connecting storefront, warehouse, physical counters, and customer notifications.',
    arch_01_title: '01. CUSTOM WEB STOREFRONT',
    arch_01_desc:
      'Fast Next.js storefront designed for PC hardware, CCTV kits, and electronics with rich spec sheets and instant filtering.',
    arch_02_title: '02. PC BUILDER ENGINE',
    arch_02_desc:
      'Validates CPU socket (AM5/LGA1700), DDR4/DDR5 RAM, and wattage limits automatically before checkout.',
    arch_03_title: '03. MULTI-BRANCH STOCK SYNC',
    arch_03_desc:
      'Connect physical shops (Hafeez Centre, Techno City, Dubai Plaza) and warehouses in one live inventory panel.',
    arch_04_title: '04. SERIAL NUMBER & RMA',
    arch_04_desc:
      'Track individual GPU, motherboard, and DVR serial numbers from supplier intake to customer invoice and warranty return.',
    arch_05_title: '05. WHATSAPP AUTO DISPATCH',
    arch_05_desc:
      'Pre-formatted customer order summaries and custom PC build spec sheets sent directly to your sales WhatsApp desk.',
    arch_06_title: '06. 100% CODE & DATA TRANSFER',
    arch_06_desc:
      'Full GitHub repository and PostgreSQL database ownership transferred directly to your business account.',

    demo_badge: 'VERIFIABLE SYSTEM DEMONSTRATION',
    demo_title: 'TEST THE LIVE PRODUCTION INTERFACE',
    demo_sub:
      'Test actual customer workflows and administrative controls on our hosted sandbox environment.',
    demo_store_title: '01. STOREFRONT DEMO',
    demo_store_desc:
      'Explore product catalogs, spec filtering, cart logic, and dark aesthetic storefront.',
    demo_pc_title: '02. PC BUILDER ENGINE',
    demo_pc_desc:
      'Test socket matching, wattage calculation, and custom build WhatsApp sharing.',
    demo_admin_title: '03. ADMIN PANEL MATRIX',
    demo_admin_desc:
      'Inspect 1-click admin demo mode, stock updates, orders, and warranty logs.',

    plans_badge: 'COMMERCIAL INVESTMENT TIERS',
    plans_title: 'Plans.',
    plans_sub:
      'Zero monthly sales commissions. 100% client code and database ownership upon completion.',
    plans_sub_suffix:
      'Click any plan below to inspect the complete deliverable breakdown, architecture specs, and visual previews.',
    detail_btn: 'CLICK ME FOR FULL DETAIL & PREVIEWS →',

    starter_name: 'Single Store Launch',
    starter_badge: 'SINGLE OUTLET',
    starter_desc:
      'For single location computer stores & CCTV shops starting online sales with direct WhatsApp dispatch.',
    starter_price_pkr: 'PKR 280,000',
    starter_price_usd: '~$1,000 USD',
    starter_delivery: '⚡ Delivered in 10 days, guaranteed',
    starter_support: 'Optional Care Plan: PKR 14,000 / mo',
    starter_callout_label: 'CORE CAPABILITY:',
    starter_callout_text:
      'Essential single-store online storefront with direct WhatsApp checkout and basic stock management.',
    starter_f1: 'Next.js Storefront (Up to 50 SKUs)',
    starter_f2: 'WhatsApp Order Dispatch',
    starter_f3: 'Basic Stock Updates & Orders',
    starter_f4: '100% Client Code & DB Ownership',

    growth_name: 'Multi Branch Growth',
    growth_badge: '★ MOST POPULAR // BEST VALUE',
    growth_desc:
      'For established electronics and hardware retailers selling across physical shops and online with custom PC builds.',
    growth_price_pkr: 'PKR 550,000',
    growth_price_usd: '~$2,000 USD',
    growth_delivery: '⚡ Delivered in 21 days, guaranteed',
    growth_support: 'Optional Care Plan: PKR 28,000 / mo',
    growth_callout_label: 'MAJOR UPGRADE OVER STARTER:',
    growth_callout_text:
      'Adds the real-time PC Builder compatibility engine, 3-branch stock sync, and serial number warranty RMA tracking.',
    growth_f1: 'Interactive PC Builder Compatibility Matrix',
    growth_f2: '3-Branch Inventory Synchronization',
    growth_f3: 'Hardware Serial Number & RMA Warranty Tracking',
    growth_f4: 'Promotional Sliders, Flash Sales & Coupons',
    growth_f5: 'Online Card & Wallet Payment Gateway (Included — No +50K Fee)',

    enterprise_name: 'Chain and Distribution OS',
    enterprise_badge: '★ COMPLETE RETAIL OS',
    enterprise_desc:
      'For multi branch retail chains, wholesale hardware distributors, and computer importers operating high volume.',
    enterprise_price_pkr: 'From PKR 950,000',
    enterprise_price_usd: '~$3,400 USD',
    enterprise_delivery: '⚡ Delivered in 30 days, guaranteed',
    enterprise_support: 'Dedicated Care Plan: PKR 55,000 / mo',
    enterprise_callout_label: 'MAJOR UPGRADE OVER GROWTH:',
    enterprise_callout_text:
      'Adds unlimited branches, full theme content CMS, multi-guard staff RBAC, and bespoke POS/Courier API sync.',
    enterprise_f1: 'Unlimited Branches & Warehouse Sync',
    enterprise_f2: 'Granular Staff RBAC (Super Admin, Manager, Cashier)',
    enterprise_f3: 'Complete Theme & Navigation Content CMS',
    enterprise_f4: 'Custom POS Hardware & Courier API Sync',
    enterprise_f5: 'Multi-Gateway Card & Wallet Prepay Integration (Included)',

    whatsapp_cta: 'Claim This Solution on WhatsApp',
    view_terms: 'Review Contract Scope & Warranty Terms →',
  },
  'ur-en': {
    hero_badge: 'COMMERCIAL SYSTEM // COMPUTER & CCTV RETAIL OS',
    hero_title_1: 'Computer, CCTV aur Tech Hardware Sell Karein',
    hero_title_accent: 'Online aur Multi-Branch',
    hero_title_2: 'Baghair Kisi Mahana Platform Commission Ke',
    hero_sub:
      'Slow templates aur monthly subscriptions khatam. Hum banate hain custom Next.js retail system: PC Builder compatibility engine, multi-branch stock sync, automated WhatsApp dispatch.',
    cta_primary: 'Apna Retail Plan Select Karein',
    cta_secondary: 'Live Demo Test Karein',
    metrics_code: '100% Code aur Data Ka Mukammal Ikhtiyar',
    metrics_tax: 'Baghair Kisi Sales Commission Ke',
    metrics_speed: 'Tez Tareen Next.js Server Rendering',
    metrics_rma: 'Serial Number aur Warranty Tracking',

    arch_badge: 'SYSTEM ARCHITECTURE',
    arch_title: 'ONLINE AUR DUKAN DONO KE LIYE COMBINED SYSTEM',
    arch_sub:
      'Sirf ek aam website nahi. Storefront, godam, physical dukan aur customer orders ko jorne wala complete system.',
    arch_01_title: '01. CUSTOM WEB STOREFRONT',
    arch_01_desc:
      'PC hardware, CCTV packages aur electronics ke liye tayyar shuda tez tareen Next.js web store.',
    arch_02_title: '02. PC BUILDER ENGINE',
    arch_02_desc:
      'CPU socket (AM5/LGA1700), DDR4/DDR5 RAM aur power supply wattage compatibility auto-check karta hai.',
    arch_03_title: '03. MULTI-BRANCH STOCK SYNC',
    arch_03_desc:
      'Physical dukanon (Hafeez Centre, Techno City, Dubai Plaza) aur godam ka stock ek live panel par dekhein.',
    arch_04_title: '04. SERIAL NUMBER AUR RMA',
    arch_04_desc:
      'Har GPU, motherboard aur DVR ka serial number supplier intake se customer warranty claim tak track karein.',
    arch_05_title: '05. WHATSAPP AUTO DISPATCH',
    arch_05_desc:
      'Pre-formatted order details aur custom PC build sheets seedha aapke sales counter WhatsApp par pohanchti hain.',
    arch_06_title: '06. 100% CODE AUR DATA TRANSFER',
    arch_06_desc:
      'Mukammal GitHub source code aur PostgreSQL database ki ownership aapke company account ko transfer hoti hai.',

    demo_badge: 'VERIFIABLE SYSTEM DEMONSTRATION',
    demo_title: 'LIVE PRODUCTION INTERFACE TEST KAREIN',
    demo_sub:
      'Humare hosted sandbox environment par live customer shopping aur admin management controls khud chala kar dekhein.',
    demo_store_title: '01. STOREFRONT DEMO',
    demo_store_desc:
      'Live product catalog, hardware filters, shopping cart aur modern dark layout test karein.',
    demo_pc_title: '02. PC BUILDER ENGINE',
    demo_pc_desc:
      'Socket compatibility check, wattage calculator aur WhatsApp custom build share kar ke dekhein.',
    demo_admin_title: '03. ADMIN PANEL MATRIX',
    demo_admin_desc:
      '1-click admin demo login, live stock updates, orders tracker aur warranty serial numbers inspect karein.',

    plans_badge: 'COMMERCIAL INVESTMENT TIERS',
    plans_title: 'Plans.',
    plans_sub:
      'Baghair kisi mahana sales commission ke. Mukammal source code ownership. Apni dukan ke mutabiq plan chunein.',
    plans_sub_suffix:
      'Mukammal architecture specs, modules aur visual previews dekhne ke liye kisi bhi plan par click karein.',
    detail_btn: 'MUKAMMAL DETAILS AUR PREVIEWS DEKHEIN →',

    starter_name: 'Single Store Launch',
    starter_badge: 'SINGLE DUKAN',
    starter_desc:
      'Single location computer shops aur CCTV vendors ke liye jo direct WhatsApp dispatch ke sath online sales shuru kar rahe hain.',
    starter_price_pkr: 'PKR 280,000',
    starter_price_usd: '~$1,000 USD',
    starter_delivery: '⚡ 10 dinon mein delivery, guaranteed',
    starter_support: 'Optional Care Plan: PKR 14,000 / month',
    starter_callout_label: 'MAIN CAPABILITY:',
    starter_callout_text:
      'Single dukan ke liye online storefront jisme direct WhatsApp order checkout aur basic stock manager shamil hai.',
    starter_f1: 'Next.js Storefront (50 Products Tak)',
    starter_f2: 'Direct WhatsApp Order Dispatch',
    starter_f3: 'Live Stock Updates aur Orders Tracker',
    starter_f4: '100% Client Code aur Database Ownership',

    growth_name: 'Multi Branch Growth',
    growth_badge: '★ SAB SE ZYADA PASANDIDAH // BEHTAREEN VALUE',
    growth_desc:
      'Bari electronics aur hardware dukanon ke liye jahan custom gaming PC builds aur physical store sync zaroori hai.',
    growth_price_pkr: 'PKR 550,000',
    growth_price_usd: '~$2,000 USD',
    growth_delivery: '⚡ 21 dinon mein delivery, guaranteed',
    growth_support: 'Optional Care Plan: PKR 28,000 / month',
    growth_callout_label: 'STARTER SE BARI UPGRADES:',
    growth_callout_text:
      'Isme real-time PC Builder compatibility engine, 3-branch stock sync, aur serial number warranty tracking shamil hai.',
    growth_f1: 'Interactive PC Builder Compatibility Matrix',
    growth_f2: '3 Physical Branches Ki Stock Synchronization',
    growth_f3: 'Hardware Serial Number aur RMA Warranty Tracker',
    growth_f4: 'Promotional Sliders, Flash Sales aur Coupons',
    growth_f5: 'Card Prepay Online Payment Gateway (Shamil Hai — Baghair Kisi 50K Fee Ke)',

    enterprise_name: 'Chain and Distribution OS',
    enterprise_badge: '★ MUKAMMAL RETAIL OS',
    enterprise_desc:
      'Multi branch retail chains, wholesale distributors aur computer importers ke liye jo bara volume operate karte hain.',
    enterprise_price_pkr: 'PKR 950,000 se shuru',
    enterprise_price_usd: '~$3,400 USD',
    enterprise_delivery: '⚡ 30 dinon mein delivery, guaranteed',
    enterprise_support: 'Dedicated Care Plan: PKR 55,000 / mahana',
    enterprise_callout_label: 'GROWTH SE BARI UPGRADES:',
    enterprise_callout_text:
      'La-mehdood branches, mukammal dynamic theme CMS, granular staff RBAC, aur courier/POS API integration.',
    enterprise_f1: 'La-Mehdood Branches aur Godam Sync',
    enterprise_f2: 'Staff Permissions (Super Admin, Manager, Cashier)',
    enterprise_f3: 'Mukammal Storefront Theme aur Content CMS',
    enterprise_f4: 'Custom POS Hardware aur Courier API Sync',
    enterprise_f5: 'Online Payment Gateways aur Custom Financial APIs Shamil',

    whatsapp_cta: 'Yeh Plan WhatsApp Par Book Karein',
    view_terms: 'Mukammal Sharaait aur Guarantees Dekhein →',
  },
}

const PLANS_DETAIL = {
  en: {
    starter: {
      name: 'Single Store Launch',
      code: 'TXS-STARTER',
      badge: 'ENTRY LEVEL // SINGLE OUTLET',
      pricePkr: 'PKR 280,000',
      priceUsd: '~$1,000 USD',
      delivery: '10 days, guaranteed',
      idealFor:
        'Single-location computer shops, CCTV vendors, and electronics retail counters beginning online sales with direct WhatsApp dispatch without ongoing platform taxes.',
      artifacts: [
        {
          title: 'Next.js Public Storefront',
          image: '/txs/home.png',
          tag: 'Storefront',
        },
        {
          title: 'Product Stock & Order Manager',
          image: '/txs/dashboard products.png',
          tag: 'Admin Panel',
        },
      ],
      modules: [
        {
          title: 'Custom Next.js Web Storefront',
          desc: 'Fast, responsive storefront tailored for computer & electronics products.',
          items: [
            'Up to 50 SKUs initial setup and categorization',
            'Rich technical specifications display (CPU, GPU, RAM, Storage)',
            'Category & price filtering for desktop and mobile',
            'Fast search and shopping cart functionality',
          ],
        },
        {
          title: 'WhatsApp Order Dispatch Integration',
          desc: 'Instant direct checkout routing to your sales desk.',
          items: [
            'Pre-formatted WhatsApp message with items, specs, and total PKR price',
            'Customer contact details and delivery address auto-captured',
            'Zero platform transaction fee taken from your gross revenue',
          ],
        },
        {
          title: 'Essential Admin Control Panel',
          desc: 'Straightforward management interface designed for shop floor staff.',
          items: [
            'Product Add / Edit / Delete interface',
            'Real-time stock count updates (In Stock / Out of Stock status)',
            'Order status tracker (Pending → Dispatched → Completed)',
            'Customer details archive (Name, phone, delivery history)',
          ],
        },
        {
          title: 'SEO & Search Engine Indexing',
          desc: 'Foundational search configuration to rank for local keywords.',
          items: [
            'Google Search Console setup and verification',
            'Automated XML sitemap generation',
            'Google Analytics 4 (GA4) visitor & event tracking setup',
          ],
        },
      ],
      exclusions: [
        'Interactive PC Builder compatibility engine (Available in Growth & Enterprise).',
        'Multi branch stock synchronization (Single outlet stock only).',
        'Hardware serial number and RMA warranty lifecycle tracking.',
        'Product photos, descriptions, and data entry beyond the first 50 SKUs. You supply the content and we set it up.',
        'Online card prepay payment gateway (Available as +PKR 50,000 add-on; included free in Growth & Chain plans).',
      ],
    },
    growth: {
      name: 'Multi Branch Growth',
      code: 'TXS-GROWTH',
      badge: '★ MOST POPULAR // BEST VALUE',
      pricePkr: 'PKR 550,000',
      priceUsd: '~$2,000 USD',
      delivery: '21 days, guaranteed',
      idealFor:
        'Established computer hardware and gaming PC retailers selling high-ticket rigs, components, and managing stock across shop counters and online simultaneously.',
      artifacts: [
        {
          title: 'Interactive PC Builder Configurator',
          image: '/txs/RIG BUILDER.png',
          tag: 'Compatibility Engine',
        },
        {
          title: 'Hardware Serial & RMA Warranty',
          image: '/txs/admin warranty.png',
          tag: 'Serial Tracking',
        },
        {
          title: 'Storefront Hardware Catalog',
          image: '/txs/products.png',
          tag: 'Hardware Catalog',
        },
        {
          title: 'Central Revenue & Order Dashboard',
          image: '/txs/dashboard.png',
          tag: 'Admin Dashboard',
        },
      ],
      modules: [
        {
          title: 'Interactive PC Builder Compatibility Engine',
          desc: 'Real-time hardware validation preventing mismatched customer orders.',
          items: [
            'CPU Socket Matching (AM4/AM5 vs LGA1700/LGA1851)',
            'RAM Generation Validation (DDR4 vs DDR5)',
            'Power supply wattage overhead & GPU clearance calculation',
            'One-click WhatsApp build sharing with pre-formatted specs and PKR total',
          ],
        },
        {
          title: 'Multi-Branch Inventory Synchronization (Up to 3 Nodes)',
          desc: 'Unified stock management across multiple physical counters.',
          items: [
            'Connect up to 3 physical branches (e.g. Hafeez Centre, Techno City) + central warehouse',
            'Branch-level stock counts visible in the admin matrix',
            'Real-time deduction upon store sales and online orders',
          ],
        },
        {
          title: 'Hardware Serial Number & RMA Lifecycle',
          desc: 'Track individual GPUs, motherboards, and power supplies from intake to warranty.',
          items: [
            'Serial status: IN_STOCK → SOLD (linked to invoice) → RMA_PENDING → REPLACED',
            'Eliminates customer return fraud and distributor disputes',
            'Search warranty status by serial number in seconds',
          ],
        },
        {
          title: 'Marketing, Discounts & Automated PDF Invoices',
          desc: 'Promotions engine to drive repeat commercial purchases.',
          items: [
            'Self-managed promotional hero sliders and flash sale banners',
            'Coupon code engine (percentage discounts, flat PKR, minimum order rules)',
            'Automated professional PDF receipts and invoice generation',
          ],
        },
        {
          title: 'Online Payment Gateway Integration (Included — Save PKR 50,000)',
          desc: 'Direct card and mobile wallet checkout for prepaid orders at zero extra integration fee.',
          items: [
            'Paymob, Bank Alfalah Alfa, Keenu, or PayFast payment gateway integration',
            'Accept Visa, MasterCard, and UnionPay debit/credit cards directly on checkout',
            'JazzCash & EasyPaisa direct mobile wallet payments',
            'Zero add-on fee (PKR 50,000 extra fee waived for Growth plan)',
          ],
        },
      ],
      exclusions: [
        'Limited to 3 branch nodes (Unlimited branches supported in Enterprise).',
        'Does not include custom external accounting ERP/FBR direct API integrations.',
        'Super Admin vs Cashier granular permission matrices (Single admin level).',
        'Product photos, descriptions, and catalog migration beyond the included setup. You supply the content.',
        'Unlimited revisions. Two revision rounds are included per milestone and further changes are billed hourly.',
      ],
    },
    enterprise: {
      name: 'Chain and Distribution OS',
      code: 'TXS-ENTERPRISE',
      badge: '★ COMPLETE RETAIL OS',
      pricePkr: 'From PKR 950,000',
      priceUsd: '~$3,400 USD',
      delivery: '30 days, guaranteed',
      idealFor:
        'High-volume computer retail chains, nationwide hardware distributors, and tech importers with multi-branch networks requiring a custom enterprise ERP.',
      artifacts: [
        {
          title: 'Site CMS & Banner Control Matrix',
          image: '/txs/admin site control.png',
          tag: 'CMS Panel',
        },
        {
          title: 'Multi-Branch Inventory Management',
          image: '/txs/dashboard products.png',
          tag: 'Branch Matrix',
        },
        {
          title: 'PC Builder Rig Configurator',
          image: '/txs/RIG BUILDER.png',
          tag: 'Rig Builder',
        },
        {
          title: 'Serial Number Warranty & RMA',
          image: '/txs/admin warranty.png',
          tag: 'RMA Center',
        },
      ],
      modules: [
        {
          title: 'Unlimited Multi-Branch & Warehouse Network',
          desc: 'Enterprise inventory distribution across all outlets.',
          items: [
            'Unlimited physical retail shops, distribution hubs, and warehouses',
            'Inter-branch stock transfer requests with dispatch and receipt sign-off',
            'Unified warehouse dispatch and counter pickup routing',
          ],
        },
        {
          title: 'Granular Multi-Guard Role-Based Access Control (RBAC)',
          desc: 'Spatie-style permissions restricting staff access according to job title.',
          items: [
            'Super Admin: Financial P&L, gross margins, branch revenue rankings, master settings',
            'Branch Manager: Local counter sales, staff rosters, local stock adjustments',
            'Counter Cashier: Fast point-of-sale checkout and receipt printing',
            'Warehouse Barcode Manager: Inbound shipment intake and bulk serial scanning',
          ],
        },
        {
          title: 'Dynamic Theme & Content Management CMS',
          desc: 'Complete control over your storefront without writing code.',
          items: [
            'Navigation menu editor, custom landing page builder, announcement bars',
            'Dynamic branding colors and hero promotional sliders',
            'Customizable receipt and email template editor',
          ],
        },
        {
          title: 'Bespoke Third-Party API Integrations',
          desc: 'Seamless connections to physical retail hardware and logistics.',
          items: [
            'Thermal receipt printer and barcode scanner compatibility',
            'Courier tracking API integration (TCS, Trax, Leopards, CallCourier)',
            'FBR digital invoice compliance (optional integration)',
          ],
        },
        {
          title: 'Multi-Gateway Online Prepay & Financial Engine (Included)',
          desc: 'Enterprise-grade payment routing and automated settlement reconciliation.',
          items: [
            'Multiple simultaneous payment gateways for high-volume failover',
            'Direct credit/debit card, Raast P2M QR, JazzCash, and EasyPaisa integrations',
            'Automated payment reconciliation reports with bank statements',
            'Zero add-on fee (included standard in Chain and Distribution OS)',
          ],
        },
      ],
      exclusions: [
        'Bespoke custom hardware firmware modifications (quoted separately on request).',
        'Bulk product photography and catalog data entry. You supply the content or we add it as a paid add-on.',
        'Unlimited revisions. Two revision rounds are included per milestone and further changes are billed hourly.',
      ],
    },
  },
  'ur-en': {
    starter: {
      name: 'Single Store Launch',
      code: 'TXS-STARTER',
      badge: 'ENTRY LEVEL // SINGLE DUKAN',
      pricePkr: 'PKR 280,000',
      priceUsd: '~$1,000 USD',
      delivery: '10 dinon mein, guaranteed',
      idealFor:
        'Single-location computer dukanon, CCTV vendors, aur retail counters ke liye jo direct WhatsApp order dispatch ke sath online sales shuru karna chahte hain — baghair kisi mahana platform tax ke.',
      artifacts: [
        {
          title: 'Next.js Public Online Storefront',
          image: '/txs/home.png',
          tag: 'Web Storefront',
        },
        {
          title: 'Product Stock aur Order Manager',
          image: '/txs/dashboard products.png',
          tag: 'Admin Panel',
        },
      ],
      modules: [
        {
          title: 'Custom Next.js Web Storefront',
          desc: 'Computer aur electronics products ke liye fast aur responsive web store.',
          items: [
            '50 SKUs tak ki initial setup aur product categories',
            'Mukammal technical specifications display (CPU, GPU, RAM, Storage)',
            'Category aur price filters (Desktop aur Mobile dono par)',
            'Tez search bar aur direct shopping cart functionality',
          ],
        },
        {
          title: 'WhatsApp Direct Order Dispatch Integration',
          desc: 'Har order seedha aapke sales counter WhatsApp par dispatch hota hai.',
          items: [
            'Pre-formatted WhatsApp message jisme items, specs aur total PKR price shamil ho',
            'Customer ka naam, phone number aur delivery address auto-capture',
            'Aapki kul amdani par 0% platform sales commission',
          ],
        },
        {
          title: 'Bunyadi Admin Control Panel',
          desc: 'Dukan ke staff ke liye aasan aur seedha management panel.',
          items: [
            'Naya product add / edit / delete karne ka aasan panel',
            'Live stock update status (In Stock / Out of Stock)',
            'Order status tracker (Pending → Dispatched → Completed)',
            'Customer details archive (Naam, mobile number, delivery history)',
          ],
        },
        {
          title: 'SEO aur Search Engine Indexing',
          desc: 'Google par aapki dukan ko local keywords ke liye rank karne ki bunyad.',
          items: [
            'Google Search Console setup aur site verification',
            'Automated XML sitemap generation',
            'Google Analytics 4 (GA4) visitor aur events tracking setup',
          ],
        },
      ],
      exclusions: [
        'Interactive PC Builder compatibility engine (Growth aur Enterprise mein dastiyab hai).',
        'Multi branch stock synchronization (Sirf single outlet inventory support karta hai).',
        'Hardware serial number aur RMA warranty lifecycle tracking.',
        'Product photos, descriptions aur pehle 50 SKUs se zyada data entry. Content aap dein ge, hum setup karein ge.',
        'Online card prepay payment gateway (Sirf +PKR 50,000 add-on ke tor par dastiyab hai; Growth aur Enterprise mein shamil hai).',
      ],
    },
    growth: {
      name: 'Multi Branch Growth',
      code: 'TXS-GROWTH',
      badge: '★ SAB SE ZYADA PASANDIDAH // BEHTAREEN VALUE',
      pricePkr: 'PKR 550,000',
      priceUsd: '~$2,000 USD',
      delivery: '21 dinon mein, guaranteed',
      idealFor:
        'Established computer hardware aur gaming PC retailers ke liye jo high-ticket custom rigs aur components bechte hain, aur dukan counter aur online stock ko ek sath chalate hain.',
      artifacts: [
        {
          title: 'Interactive PC Builder Configurator',
          image: '/txs/RIG BUILDER.png',
          tag: 'Compatibility Engine',
        },
        {
          title: 'Hardware Serial Number aur RMA Warranty',
          image: '/txs/admin warranty.png',
          tag: 'Serial Tracking',
        },
        {
          title: 'Storefront Hardware Catalog',
          image: '/txs/products.png',
          tag: 'Hardware Catalog',
        },
        {
          title: 'Central Revenue aur Order Dashboard',
          image: '/txs/dashboard.png',
          tag: 'Admin Dashboard',
        },
      ],
      modules: [
        {
          title: 'Interactive PC Builder Compatibility Engine',
          desc: 'Real-time hardware validation jo galat component orders ko mukammal rokta hai.',
          items: [
            'CPU Socket Matching (AM4/AM5 vs LGA1700/LGA1851)',
            'RAM Generation Check (DDR4 vs DDR5 compatibility)',
            'Power supply wattage overhead aur GPU clearance auto calculation',
            'One-click WhatsApp build sharing pre-formatted specs aur PKR total ke sath',
          ],
        },
        {
          title: 'Multi-Branch Inventory Synchronization (3 Branches Tak)',
          desc: 'Mukhtalif physical dukanon ke darmiyan combined stock management.',
          items: [
            '3 physical branches tak connect karein (maslan Hafeez Centre, Techno City) + central warehouse',
            'Branch-level stock matrix admin panel mein live nazar aayegi',
            'Counter sale ya online order par real-time stock deduction',
          ],
        },
        {
          title: 'Hardware Serial Number aur RMA Lifecycle',
          desc: 'Har GPU, motherboard aur PSU ko intake se warranty claim tak track karein.',
          items: [
            'Serial status flow: IN_STOCK → SOLD (invoice linked) → RMA_PENDING → REPLACED',
            'Customer fraud aur distributor disputes ka mukammal khatma',
            'Serial number daal kar chand seconds mein warranty status check karein',
          ],
        },
        {
          title: 'Marketing, Discounts aur Automated PDF Invoices',
          desc: 'Dobara khareedari barhane ke liye promotions aur professional billing engine.',
          items: [
            'Promotional hero sliders aur flash sale banners khud manage karein',
            'Coupon code engine (percentage discounts, flat PKR chhoot, minimum order rules)',
            'Automated professional PDF receipts aur printable customer invoices',
          ],
        },
        {
          title: 'Online Payment Gateway Integration (Shamil Hai — PKR 50,000 Bachat)',
          desc: 'Baghair kisi izafi fee ke online card aur wallet payments receive karein.',
          items: [
            'Paymob, Bank Alfalah Alfa, Keenu ya PayFast payment gateway integration',
            'Visa, MasterCard aur UnionPay cards se peshgi payment direct account mein',
            'JazzCash aur EasyPaisa mobile wallets se aasan checkout',
            'PKR 50,000 ki izafi fee bilkul FREE (Growth plan mein pehle se shamil hai)',
          ],
        },
      ],
      exclusions: [
        'Sirf 3 branches tak mehdood (La-mehdood branches Enterprise tier mein shamil hain).',
        'Custom external accounting ERP ya FBR direct API integration shamil nahi.',
        'Super Admin vs Cashier granular staff permission matrix (Single admin level access).',
        'Product photos, descriptions aur included setup se zyada catalog migration. Content aap dein ge.',
        'La-mehdood revisions nahi. Har milestone par 2 revision rounds shamil hain, uske baad changes hourly charge honge.',
      ],
    },
    enterprise: {
      name: 'Chain and Distribution OS',
      code: 'TXS-ENTERPRISE',
      badge: '★ MUKAMMAL RETAIL OS',
      pricePkr: 'PKR 950,000 se shuru',
      priceUsd: '~$3,400 USD',
      delivery: '30 dinon mein, guaranteed',
      idealFor:
        'Bari computer retail chains, nationwide hardware distributors, aur tech importers ke liye jinko multi-branch network aur custom enterprise ERP ki zaroorat hoti hai.',
      artifacts: [
        {
          title: 'Site CMS aur Banner Control Matrix',
          image: '/txs/admin site control.png',
          tag: 'CMS Panel',
        },
        {
          title: 'Multi-Branch Inventory Management',
          image: '/txs/dashboard products.png',
          tag: 'Branch Matrix',
        },
        {
          title: 'PC Builder Rig Configurator',
          image: '/txs/RIG BUILDER.png',
          tag: 'Rig Builder',
        },
        {
          title: 'Serial Number Warranty aur RMA Center',
          image: '/txs/admin warranty.png',
          tag: 'RMA Center',
        },
      ],
      modules: [
        {
          title: 'La-Mehdood Multi-Branch aur Warehouse Network',
          desc: 'Tamam outlets aur godam ke darmiyan enterprise inventory distribution.',
          items: [
            'La-mehdood physical shops, distribution hubs aur central warehouses',
            'Inter-branch stock transfer requests dispatch aur receipt sign-off ke sath',
            'Unified warehouse dispatch aur counter pickup routing',
          ],
        },
        {
          title: 'Granular Multi-Guard Role-Based Access Control (RBAC)',
          desc: 'Spatie-style staff permissions jo designation ke mutabiq ikhtiyarat deti hain.',
          items: [
            'Super Admin: Mukammal P&L, gross margins, branch revenue reports aur master settings',
            'Branch Manager: Local counter sales, staff shifts, aur local stock adjustments',
            'Counter Cashier: Fast point-of-sale billing aur instant receipt printing',
            'Warehouse Barcode Manager: Inbound shipments intake aur bulk serial scanning',
          ],
        },
        {
          title: 'Dynamic Theme aur Content Management CMS',
          desc: 'Baghair kisi code ke apna storefront mukammal control karein.',
          items: [
            'Navigation menu editor, custom landing pages, aur announcement bars',
            'Dynamic branding colors aur hero promotional sliders',
            'Customizable invoice receipts aur email template editor',
          ],
        },
        {
          title: 'Bespoke Third-Party API Integrations',
          desc: 'Hardware POS devices aur delivery logistics ke sath seamless connection.',
          items: [
            'Thermal receipt printer aur barcode scanner compatibility',
            'Courier tracking API integration (TCS, Trax, Leopards, CallCourier)',
            'FBR digital invoice tax compliance (ikhtiyari integration)',
          ],
        },
        {
          title: 'Enterprise Multi-Gateway Prepay aur Financial Engine (Shamil Hai)',
          desc: 'High-volume transactions ke liye payment routing aur auto bank reconciliation.',
          items: [
            'Ek se zyada payment gateways tak seamlessly connect karein',
            'Credit/Debit card, Raast QR, JazzCash aur EasyPaisa support',
            'Bank statements aur daily sales ki auto reconciliation reports',
            'Koi izafi charges nahi (Chain and Distribution OS mein standard shamil hai)',
          ],
        },
      ],
      exclusions: [
        'Custom hardware firmware modifications (zaroorat ke mutabiq alag quote ki jayegi).',
        'Bulk product photography aur catalog data entry. Content aap dein ge ya hum paid add-on ke tor par add karein ge.',
        'La-mehdood revisions nahi. Har milestone par 2 revision rounds shamil hain, uske baad changes hourly charge honge.',
      ],
    },
  },
}

const EXTRAS_DATA = [
  {
    en: 'Extra branch or warehouse node',
    ur: 'Extra branch ya godam node',
    price: '+ PKR 60,000',
    descEn:
      'Adds another physical shop (e.g. Hafeez Centre, Techno City) or godown to your system. Monitor live stock counts separately, make counter sales per branch, and track stock transfers between shops.',
    descUr:
      'Aapki ek aur dukan (maslan Hafeez Centre ya Techno City) ya godam ko system se jodta hai. Har branch ka alag stock nazar aayega, counter sale hogi aur dukanon ke darmiyan stock transfer track hoga.',
  },
  {
    en: 'Wholesale and B2B pricing module',
    ur: 'Wholesale aur B2B pricing module',
    price: '+ PKR 90,000',
    descEn:
      'Allows verified bulk buyers and dealers to log in and order at special discounted dealer rates, with minimum quantity rules (e.g. 5+ pieces) and separate customer account ledgers (Khata).',
    descUr:
      'Dealers aur wholesale khareedaron ke liye alag bulk rate dikhata hai. Wo login kar ke sasti rate par baray order de sakenge aur unka alag khata chalay ga.',
  },
  {
    en: 'Loyalty, wallet and gift cards',
    ur: 'Loyalty, wallet aur gift cards',
    price: '+ PKR 70,000',
    descEn:
      'Rewards customers with cashback points in their digital store wallet on every purchase, and lets you issue digital gift vouchers so customers keep coming back to your shop.',
    descUr:
      'Customers ko har khareedari par reward points aur wallet cashback milta hai taake wo bar bar aap hi ki dukan se samaan khareedein.',
  },
  {
    en: 'Multi vendor marketplace',
    ur: 'Multi vendor marketplace',
    price: '+ PKR 150,000',
    descEn:
      'Turns your site into an open platform like Daraz or Amazon where other third-party computer sellers and shops can list their own products, while you automatically collect a percentage commission on every sale.',
    descUr:
      'Aapki website ko Daraz ki tarah banata hai jahan doosray tech sellers aur shops apna samaan list karenge aur aap har sale par apna commission rakhain ge.',
  },
  {
    en: 'Advanced staff roles and permissions',
    ur: 'Advanced staff roles aur permissions',
    price: '+ PKR 40,000',
    descEn:
      'Protects sensitive store data. Lets cashiers only make sales receipts, technicians view RMA repairs, and stock staff scan inventory — while purchase costs and profit margins remain strictly visible to the owner only.',
    descUr:
      'Dukan ke har mulazim ke liye alag ikhtiyar. Cashier sirf bill banaye ga, technician sirf warranty dekhe ga, aur dukan ka asli munafa ya purchase cost sirf maalik ko nazar aayegi.',
  },
  {
    en: 'Product data entry beyond 50 SKUs',
    ur: '50 SKUs se zyada product data entry',
    price: '+ PKR 15,000 / 50',
    descEn:
      "Don't have time to enter products? Our team cleans high-res photos, writes full technical specs (RAM generation, CPU socket, wattage), and uploads inventory in batches of 50 items.",
    descUr:
      'Agar aapke paas product upload karne ka waqt nahi, to hamari team 50 products ki tasweerein, specs aur qeematein khud system mein daal kar degi.',
  },
  {
    en: 'Courier tracking integration',
    ur: 'Courier tracking integration',
    price: '+ PKR 50,000',
    descEn:
      "Generates courier booking slips (Trax, PostEx, Leopards, TCS) with 1 click directly from your admin panel, and automatically sends the live tracking link to your customer's WhatsApp.",
    descUr:
      'Admin panel se 1-click par courier slips (Trax, PostEx, Leopards, TCS) banayein aur tracking link customer ke WhatsApp par auto send ho jaye ga.',
  },
  {
    en: 'Online payment gateway for card prepay',
    ur: 'Card prepay ke liye online payment gateway',
    price: '+ PKR 50,000',
    starterOnly: true,
    descEn:
      'Accepts Visa, Mastercard, PayPak, EasyPaisa, and JazzCash directly on your site for upfront prepaid orders. (Note: Multi Branch Growth and Chain plans already INCLUDE this at zero extra cost — no 50K fee).',
    descUr:
      'Website par hi Visa, Mastercard, EasyPaisa aur JazzCash se peshgi online payment receive karein. (Note: Multi-Branch Growth aur Chain plans mein yeh pehle se bilkul SHAMIL hai — baghair kisi 50K fee ke).',
  },
  {
    en: 'FBR or accounting API integration',
    ur: 'FBR ya accounting API integration',
    price: '+ PKR 80,000',
    descEn:
      "Connects your sales counter directly with FBR's POS digital invoice system for tax compliance, or syncs your daily books with QuickBooks, Zoho, or Xero automatically.",
    descUr:
      'Dukan ki sales ko FBR digital invoicing system se direct jodta hai, ya aapke rozana khate ko QuickBooks aur Xero se auto-sync karta hai.',
  },
]

export default function TechRetailSolution() {
  const { lang, setLang, isUrdu } = useLanguage()
  const [activeModalKey, setActiveModalKey] = useState(null)
  const [expandedExtra, setExpandedExtra] = useState(null)
  const t = I18N_DATA[lang] || I18N_DATA.en
  const activePlan = activeModalKey
    ? (PLANS_DETAIL[lang] || PLANS_DETAIL.en)[activeModalKey]
    : null

  const toggleExtra = (index) => {
    setExpandedExtra((prev) => (prev === index ? null : index))
  }

  const renderExtraCard = (a, i) => {
    const isOpen = expandedExtra === i
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
                {isUrdu ? 'Growth & Chain mein SHAMIL (Bina 50K Fee)' : 'INCLUDED in Growth & Chain (Save 50K)'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="text-right">
              <span className="offer-ui text-[#059669] dark:text-[#10B981] whitespace-nowrap font-bold block">
                {a.price}
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
                      ? '✓ Multi Branch Growth (PKR 550,000) aur Chain OS (PKR 950,000) plans mein online payment gateway pehle se mukammal shamil hai — koi +50,000 fee nahi deni parti.'
                      : '✓ Online payment gateway is already included standard in Multi Branch Growth (PKR 550,000) & Chain OS (PKR 950,000) plans at NO extra charge.'}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleLanguageChange = (newLang) => {
    setLang(newLang)
  }

  const openWhatsApp = (planName, price) => {
    const text = isUrdu
      ? encodeURIComponent(
          `Assalam o Alaikum TeXCodes team, main apne Computer / CCTV retail business ke liye [${planName} - ${price}] plan mein interested hoon. Barah-e-karam demo schedule karein aur agle marahil discuss karein.`
        )
      : encodeURIComponent(
          `Hello TeXCodes team, I am interested in the [${planName} - ${price}] for my Computer / CCTV retail business. I would like to schedule a demonstration and discuss deployment.`
        )
    window.open(`https://wa.me/923091824000?text=${text}`, '_blank')
  }

  return (
    <div className="w-full bg-[#F6F5F0] dark:bg-[#0F0F11] min-h-screen text-[#0F0F0F] dark:text-[#EDECE6] transition-colors duration-200">
      {/* ─── Plan Detail Modal (Bilingual: English & Roman Urdu) ─── */}
      <PlanDetailModal
        plan={activePlan}
        lang={lang}
        onClose={() => setActiveModalKey(null)}
        onOpenWhatsApp={(name, price) => openWhatsApp(name, price)}
      />

      {/* ─── Top Language Toggle Bar ─── */}
      {/* <div className="border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#161619] px-4 sm:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between offer-ui">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]" />
            <span className="text-[#0F0F0F] dark:text-[#EDECE6] font-bold uppercase tracking-wider hidden sm:inline">
              TEXCODES RETAIL OS // COMMERCIAL SOLUTION
            </span>
            <span className="text-[#0F0F0F] dark:text-[#EDECE6] font-bold uppercase tracking-wider sm:hidden">
              RETAIL OS
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5">
              <Globe size={13} className="text-[#575652] dark:text-[#9B9A95]" />
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-2.5 py-1 offer-ui font-bold transition-colors cursor-pointer border${
                  lang === 'en'
                    ? 'bg-[#059669] text-white border-[#059669] dark:bg-[#10B981] dark:border-[#10B981]'
                    : 'bg-white text-[#575652] border-[rgba(15,15,15,0.14)] hover:text-[#0F0F0F] dark:bg-[#161619] dark:text-[#9B9A95] dark:border-[rgba(255,255,255,0.12)]'
                }`}
              >
                ENGLISH
              </button>
              <button
                onClick={() => handleLanguageChange('ur-en')}
                className={`px-2.5 py-1 offer-ui font-bold transition-colors cursor-pointer border${
                  lang === 'ur-en'
                    ? 'bg-[#059669] text-white border-[#059669] dark:bg-[#10B981] dark:border-[#10B981]'
                    : 'bg-white text-[#575652] border-[rgba(15,15,15,0.14)] hover:text-[#0F0F0F] dark:bg-[#161619] dark:text-[#9B9A95] dark:border-[rgba(255,255,255,0.12)]'
                }`}
              >
                ROMAN URDU
              </button>
            </div>
            <span className="text-[rgba(15,15,15,0.2)] dark:text-[rgba(255,255,255,0.2)] hidden sm:inline">|</span>
            <ThemeToggle className="hidden sm:inline-flex" />
            <ThemeToggle variant="icon" className="sm:hidden" />
          </div>
        </div>
      </div> */}

      {/* ─── Hero Section ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] relative overflow-hidden">
        {/* Subtle decorative emerald blur */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

        <FadeIn direction="up" className="max-w-7xl mx-auto space-y-6 relative z-10">
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
              <div className="text-[#059669] dark:text-[#10B981] font-bold offer-ui">100% OWNERSHIP</div>
              <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.metrics_code}</div>
            </StaggerItem>
            <StaggerItem className="p-4 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-1 card-hover-guided">
              <div className="text-[#059669] dark:text-[#10B981] font-bold offer-ui">0% COMMISSION</div>
              <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.metrics_tax}</div>
            </StaggerItem>
            <StaggerItem className="p-4 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-1 card-hover-guided">
              <div className="text-[#059669] dark:text-[#10B981] font-bold offer-ui">NEXT.JS SPEED</div>
              <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.metrics_speed}</div>
            </StaggerItem>
            <StaggerItem className="p-4 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-1 card-hover-guided">
              <div className="text-[#059669] dark:text-[#10B981] font-bold offer-ui">SERIAL RMA</div>
              <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.metrics_rma}</div>
            </StaggerItem>
          </StaggerContainer>

          {/* Actions */}
          <div className="pt-4 flex flex-wrap items-center gap-4 offer-ui">
            <a href="#plans" className="btn-blue offer-btn offer-btn-xl shadow-sm group relative overflow-hidden">
              <span className="relative z-10">{t.cta_primary}</span>
              <ArrowRight size={14} className="relative z-10 arrow-slide" />
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none animate-shimmer-sweep" />
            </a>
            <a
              href="https://store-demo-eight.vercel.app/"
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

      {/* ─── Core System Concept: One System For The Business ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#121215]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div>
            <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold mb-2">
              {t.arch_badge}
            </div>
            <h2 className="offer-h1 text-[#0F0F0F] dark:text-[#EDECE6]">
              {t.arch_title}
            </h2>
            <p className="offer-body text-[#575652] dark:text-[#9B9A95] max-w-2xl mt-3">
              {t.arch_sub}
            </p>
          </div>

          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 offer-ui">
            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.arch_01_title}</div>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                {t.arch_01_desc}
              </p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.arch_02_title}</div>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                {t.arch_02_desc}
              </p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.arch_03_title}</div>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                {t.arch_03_desc}
              </p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.arch_04_title}</div>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                {t.arch_04_desc}
              </p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.arch_05_title}</div>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                {t.arch_05_desc}
              </p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.arch_06_title}</div>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                {t.arch_06_desc}
              </p>
            </StaggerItem>
          </StaggerContainer>
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
                href="https://store-demo-eight.vercel.app/"
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
                href="https://store-demo-eight.vercel.app/pc-builder"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] card-hover-guided group block space-y-3 shadow-xs h-full"
              >
                <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui flex items-center justify-between">
                  <span>{t.demo_pc_title}</span>
                  <ArrowUpRight size={14} className="text-[#059669] dark:text-[#10B981] arrow-slide" />
                </div>
                <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                  {t.demo_pc_desc}
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
      <section id="plans" className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#121215]">
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

          <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start offer-ui">
            {/* 1. Single Store Launch */}
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
                  <div className="offer-h3 text-[#0F0F0F] dark:text-[#EDECE6]">{t.starter_price_pkr}</div>
                  <div className="offer-ui text-[#8E8D88] dark:text-[#6A6965]">{t.starter_price_usd}</div>
                  <div className="offer-ui text-[#059669] dark:text-[#10B981] font-semibold mt-1">{t.starter_delivery}</div>
                </div>

                {/* Clear Plan Differentiation Callout */}
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
                  onClick={() => openWhatsApp(t.starter_name, t.starter_price_pkr)}
                  className="btn-outline w-full justify-center offer-btn offer-btn-lg animate-claim-outline group relative overflow-hidden transition-all duration-300"
                >
                  <MessageSquare size={14} className="animate-icon-wiggle group-hover:scale-125 transition-transform text-[#059669] dark:text-[#10B981]" />
                  <span>{t.whatsapp_cta}</span>
                  <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#059669]/10 to-transparent pointer-events-none animate-shimmer-sweep" />
                </button>
                <div className="offer-ui text-[#8E8D88] dark:text-[#6A6965] text-center">{t.starter_support}</div>
              </div>
            </div>
          </StaggerItem>

            {/* 2. Multi Branch Growth (Most Popular) */}
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
                    <div className="offer-h3 text-[#059669] dark:text-[#10B981]">{t.growth_price_pkr}</div>
                    <div className="offer-ui text-[#8E8D88] dark:text-[#6A6965]">{t.growth_price_usd}</div>
                    <div className="offer-ui text-[#059669] dark:text-[#10B981] font-semibold mt-1">{t.growth_delivery}</div>
                  </div>

                  {/* Clear Plan Differentiation Callout */}
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
                      <span>{t.growth_f5}</span>
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
                    onClick={() => openWhatsApp(t.growth_name, t.growth_price_pkr)}
                    className="btn-blue w-full justify-center offer-btn offer-btn-xl shadow-md animate-claim-solid group relative overflow-hidden transition-all duration-300"
                  >
                    <MessageSquare size={15} className="animate-icon-wiggle group-hover:scale-125 transition-transform" />
                    <span className="tracking-wider">{t.whatsapp_cta}</span>
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none animate-shimmer-sweep" />
                  </button>
                  <div className="offer-ui text-[#8E8D88] dark:text-[#6A6965] text-center">{t.growth_support}</div>
                </div>
              </div>
            </StaggerItem>

            {/* 3. Chain and Distribution OS */}
            <StaggerItem className="h-full">
              <div className="p-8 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-6 flex flex-col justify-between hover:border-[#059669] dark:hover:border-[#10B981] transition-colors h-full card-hover-guided">
                <div className="space-y-4">
                  <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.enterprise_name}</div>
                  <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                    {t.enterprise_desc}
                  </p>

                  <div className="pt-2 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)]">
                    <div className="offer-h3 text-[#0F0F0F] dark:text-[#EDECE6]">{t.enterprise_price_pkr}</div>
                    <div className="offer-ui text-[#8E8D88] dark:text-[#6A6965]">{t.enterprise_price_usd}</div>
                    <div className="offer-ui text-[#059669] dark:text-[#10B981] font-semibold mt-1">{t.enterprise_delivery}</div>
                  </div>

                  {/* Clear Plan Differentiation Callout */}
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
                    <div className="flex items-start gap-2 text-[#059669] dark:text-[#10B981] font-semibold">
                      <Check size={14} className="shrink-0 mt-0.5" />
                      <span>{t.enterprise_f5}</span>
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
                    onClick={() => openWhatsApp(t.enterprise_name, t.enterprise_price_pkr)}
                    className="btn-outline w-full justify-center offer-btn offer-btn-lg animate-claim-outline group relative overflow-hidden transition-all duration-300"
                  >
                    <MessageSquare size={14} className="animate-icon-wiggle group-hover:scale-125 transition-transform text-[#059669] dark:text-[#10B981]" />
                    <span>{t.whatsapp_cta}</span>
                    <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#059669]/10 to-transparent pointer-events-none animate-shimmer-sweep" />
                  </button>
                  <div className="offer-ui text-[#8E8D88] dark:text-[#6A6965] text-center">{t.enterprise_support}</div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Limited build slots */}
          <FadeIn direction="up" className="text-center offer-body text-[#575652] dark:text-[#9B9A95] max-w-2xl mx-auto">
            {isUrdu
              ? 'Hum har mahine sirf 3 retail builds lete hain taake har project ko pura waqt mile. Agli available start date ke liye WhatsApp par rabta karein.'
              : 'We take on only 3 retail builds each month so every project gets full attention. Message us on WhatsApp to confirm the next available start date.'}
          </FadeIn>

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
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
              ].map((colIndices, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-3">
                  {colIndices.map((idx) => renderExtraCard(EXTRAS_DATA[idx], idx))}
                </div>
              ))}
            </div>

            {/* Tablet 2-Column Layout */}
            <div className="hidden sm:grid lg:hidden sm:grid-cols-2 gap-3 items-start">
              {[
                [0, 2, 4, 6, 8],
                [1, 3, 5, 7],
              ].map((colIndices, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-3">
                  {colIndices.map((idx) => renderExtraCard(EXTRAS_DATA[idx], idx))}
                </div>
              ))}
            </div>

            {/* Mobile 1-Column Layout */}
            <div className="flex sm:hidden flex-col gap-3">
              {EXTRAS_DATA.map((item, idx) => renderExtraCard(item, idx))}
            </div>
            <p className="offer-ui text-[#8E8D88] dark:text-[#6A6965]">
              {isUrdu
                ? 'Tamam extra prices fixed hain aur pehle se bataye jate hain. Final scope WhatsApp par confirm hota hai.'
                : 'All extra prices are fixed and quoted up front. Final scope is confirmed on WhatsApp before work starts.'}
            </p>
          </FadeIn>

          {/* Care Plan */}
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
                  : 'After the 30 day warranty, a Care Plan keeps your system online, secure and updated. You own the code, so let us host it or run it yourself.'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Basic Care', price: 'PKR 14,000 / mo', en: ['Managed hosting and SSL', 'Daily backups', 'Uptime monitoring', 'Small text and image edits', 'Email support'], ur: ['Managed hosting aur SSL', 'Rozana backups', 'Uptime monitoring', 'Chhoti text aur image edits', 'Email support'] },
                { name: 'Growth Care', price: 'PKR 28,000 / mo', en: ['Everything in Basic Care', 'Priority support within 4 business hours', 'Monthly feature tweaks', 'Multi branch hosting', 'WhatsApp support'], ur: ['Basic Care ki sab cheezein', '4 business hours ke andar priority support', 'Mahana feature tweaks', 'Multi branch hosting', 'WhatsApp support'] },
                { name: 'Enterprise Care', price: 'PKR 55,000 / mo', en: ['Everything in Growth Care', 'Dedicated engineer hours each month', 'Integration and API support', '99.5% uptime target', 'Phone support'], ur: ['Growth Care ki sab cheezein', 'Har mahine dedicated engineer hours', 'Integration aur API support', '99.5% uptime target', 'Phone support'] },
              ].map((c, i) => (
                <div key={i} className="bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] p-5 space-y-3">
                  <div className="offer-ui-strong text-[#0F0F0F] dark:text-[#EDECE6]">{c.name}</div>
                  <div className="offer-h3 text-[#059669] dark:text-[#10B981]">{c.price}</div>
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

      {/* ─── Payback / ROI ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#0F0F11]">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold">
            {isUrdu ? 'WAPSI // YEH KHUD KO KAISE PAY KARTA HAI' : 'PAYBACK // HOW THIS PAYS FOR ITSELF'}
          </div>
          <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
            {isUrdu ? 'Aap ek dafa pay karte hain, phir commission nahi' : 'You pay once, then never pay commission again'}
          </h2>
          <p className="offer-body text-[#575652] dark:text-[#9B9A95]">
            {isUrdu
              ? 'Rented platform par aap har mahine subscription dete hain aur har order par ek cut kat ta hai. Yeh kharcha kabhi khatam nahi hota. Yahan aap system ke mukammal malik bante hain. Jo paisa aap har mahine platform ko dete, wahi bachat is build ko kuch hi arsay mein pura kar deti hai.'
              : 'On a rented platform you pay a subscription every month plus a cut on every order, and that bill never ends. Here you own the system outright. The money you would have handed a platform every month stays in your business, and that saving is what pays the build back.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {[
              { big: 'PKR 0', en: 'monthly platform fee after launch', ur: 'launch ke baad mahana platform fee' },
              { big: '0%', en: 'commission on your orders, ever', ur: 'aapke orders par commission, kabhi nahi' },
              { big: '100%', en: 'of the code and data is yours', ur: 'code aur data par aapka mukammal haq' },
            ].map((s, i) => (
              <div key={i} className="bg-[#FAF9F5] dark:bg-[#161619] border border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] p-5 space-y-1">
                <div className="offer-h2 text-[#059669] dark:text-[#10B981]">{s.big}</div>
                <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{isUrdu ? s.ur : s.en}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Real builds / proof ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#121215]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold">
              {isUrdu ? 'ASLI KAAM // KHUD KHOL KAR DEKHEIN' : 'REAL WORK // OPEN IT YOURSELF'}
            </div>
            <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
              {isUrdu ? 'Yeh asli builds hain, aap abhi khol kar dekh sakte hain' : 'These are real builds you can open right now'}
            </h2>
            <p className="offer-body text-[#575652] dark:text-[#9B9A95]">
              {isUrdu
                ? 'Hum nakli testimonials nahi dikhate. Neeche diye gaye systems asli aur live hain. Click karein, khud test karein, phir faisla karein.'
                : 'We will not pad this page with fake quotes. The systems below are real and live. Click them, test them yourself, then decide.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {projectsData
              .filter((p) => [7, 1, 4].includes(p.id))
              .map((p) => {
                const lp = getLocalizedProject(p, lang)
                return (
                  <div key={p.id} className="bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] overflow-hidden flex flex-col group">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0F0F0F]">
                      <img
                        src={p.mainImage}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                    </div>
                    <div className="p-5 space-y-2 flex-1 flex flex-col">
                      <div className="offer-eyebrow text-[#059669] dark:text-[#10B981]">{lp.impact}</div>
                      <h3 className="offer-h3 text-[#0F0F0F] dark:text-[#EDECE6]">{p.title}</h3>
                      <div className="mt-auto pt-3 flex items-center gap-3 flex-wrap">
                        {p.demoUrl ? (
                          <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-outline offer-btn offer-btn-sm">
                            <ExternalLink size={18} />
                            <span>{isUrdu ? 'Live Demo Kholein' : 'Open Live Demo'}</span>
                          </a>
                        ) : null}
                        {p.githubUrl && p.githubUrl !== '#' ? (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="offer-ui text-[#575652] dark:text-[#9B9A95] hover:text-[#059669] dark:hover:text-[#10B981]"
                          >
                            {isUrdu ? 'Code dekhein' : 'View code'}
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
          <div className="text-center pt-2">
            <Link to="/projects" className="offer-ui font-semibold text-[#059669] dark:text-[#10B981] hover:underline">
              {isUrdu ? 'Tamam projects dekhein →' : 'See all projects →'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
