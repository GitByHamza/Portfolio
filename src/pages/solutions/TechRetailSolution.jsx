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
} from 'lucide-react'
import PlanDetailModal from '../../components/PlanDetailModal'
import ThemeToggle from '../../components/ThemeToggle'
import { useLanguage } from '../../context/LanguageContext'

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
      'Eliminate slow off-the-shelf templates and recurring monthly software subscriptions. We deploy a custom Next.js high-performance retail system featuring a real-time PC Builder compatibility engine, multi-branch warehouse inventory, and automated WhatsApp order dispatch.',
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
    plans_title: 'Transparent, Fixed Investment Retail Plans',
    plans_sub:
      'Zero monthly sales commissions. 100% client code and database ownership upon completion.',
    plans_sub_suffix:
      'Click any plan below to inspect the complete deliverable breakdown, architecture specs, and visual previews.',
    detail_btn: 'CLICK ME FOR FULL DETAIL & PREVIEWS →',

    starter_name: 'Starter Store',
    starter_badge: 'SINGLE OUTLET',
    starter_desc:
      'For single-location computer stores & CCTV shops starting online sales with direct WhatsApp dispatch.',
    starter_price_pkr: 'PKR 280,000 – 350,000',
    starter_price_usd: '~$1,000 – $1,250 USD',
    starter_delivery: '⚡ 10–14 Days Guaranteed Delivery',
    starter_support: 'Optional Hosting & Maintenance: PKR 14,000 / mo',
    starter_callout_label: 'CORE CAPABILITY:',
    starter_callout_text:
      'Essential single-store online storefront with direct WhatsApp checkout and basic stock management.',
    starter_f1: 'Next.js Storefront (Up to 50 SKUs)',
    starter_f2: 'WhatsApp Order Dispatch',
    starter_f3: 'Basic Stock Updates & Orders',
    starter_f4: '100% Client Code & DB Ownership',

    growth_name: 'Growth Retailer',
    growth_badge: '★ MOST POPULAR // BEST VALUE',
    growth_desc:
      'For established electronics & hardware retailers selling across physical shops and online with custom PC builds.',
    growth_price_pkr: 'PKR 550,000 – 780,000',
    growth_price_usd: '~$2,000 – $2,800 USD',
    growth_delivery: '⚡ 3–4 Weeks Guaranteed Delivery',
    growth_support: 'Optional Managed Hosting & Support: PKR 28,000 / mo',
    growth_callout_label: 'MAJOR UPGRADE OVER STARTER:',
    growth_callout_text:
      'Adds the real-time PC Builder compatibility engine, 3-branch stock sync, and serial number warranty RMA tracking.',
    growth_f1: 'Interactive PC Builder Compatibility Matrix',
    growth_f2: '3-Branch Inventory Synchronization',
    growth_f3: 'Hardware Serial Number & RMA Warranty Tracking',
    growth_f4: 'Promotional Sliders, Flash Sales & Coupons',

    enterprise_name: 'Enterprise Custom',
    enterprise_badge: '★ COMPLETE RETAIL OS',
    enterprise_desc:
      'For multi-branch retail chains, wholesale hardware distributors, and computer importers operating high volume.',
    enterprise_price_pkr: 'PKR 950,000 – 1,450,000',
    enterprise_price_usd: '~$3,400 – $5,200 USD',
    enterprise_delivery: '⚡ ~6 Weeks Staging & Delivery',
    enterprise_support: 'Dedicated Enterprise Support Retainer: PKR 55,000 / mo',
    enterprise_callout_label: 'MAJOR UPGRADE OVER GROWTH:',
    enterprise_callout_text:
      'Adds unlimited branches, full theme content CMS, multi-guard staff RBAC, and bespoke POS/Courier API sync.',
    enterprise_f1: 'Unlimited Branches & Warehouse Sync',
    enterprise_f2: 'Granular Staff RBAC (Super Admin, Manager, Cashier)',
    enterprise_f3: 'Complete Theme & Navigation Content CMS',
    enterprise_f4: 'Custom POS Hardware & Courier API Sync',

    whatsapp_cta: 'Claim This Solution on WhatsApp',
    view_terms: 'Review Contract Scope & Warranty Terms →',
  },
  'ur-en': {
    hero_badge: 'COMMERCIAL SYSTEM // COMPUTER & CCTV RETAIL OS',
    hero_title_1: 'Computer, CCTV aur Tech Hardware Sell Karein',
    hero_title_accent: 'Online aur Multi-Branch',
    hero_title_2: 'Baghair Kisi Mahana Platform Commission Ke',
    hero_sub:
      'Slow websites aur mehangay monthly platform charges par waqt aur paisa zaya karna band karein. Hum aapke computer aur electronics store ke liye custom Next.js web store deploy karte hain — jisme live PC Builder compatibility, multi-branch stock sync aur WhatsApp automated dispatch shamil hai.',
    cta_primary: 'Apna Retail Plan Muntakhib Karein',
    cta_secondary: 'Live Demo Check Karein',
    metrics_code: '100% Code aur Data Ka Mukammal Ikhtiyar',
    metrics_tax: 'Baghair Kisi Sales Commission Ke',
    metrics_speed: 'Tez Tareen Next.js Server Rendering',
    metrics_rma: 'Serial Number aur Warranty Tracking',

    arch_badge: 'SYSTEM ARCHITECTURE',
    arch_title: 'RETAIL KAROBAR KE LIYE EK YAKJA SYSTEM',
    arch_sub:
      'Sirf ek aam website nahi. Storefront, godam, physical dukanein aur customer notifications ko aapas mein jorne wala mukammal system.',
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
    demo_title: 'LIVE PRODUCTION INTERFACE CHECK KAREIN',
    demo_sub:
      'Humare hosted sandbox environment par live customer shopping aur admin management controls khud chala kar dekhein.',
    demo_store_title: '01. STOREFRONT DEMO',
    demo_store_desc:
      'Live product catalog, hardware filters, shopping cart aur modern dark layout check karein.',
    demo_pc_title: '02. PC BUILDER ENGINE',
    demo_pc_desc:
      'Socket compatibility check, wattage calculator aur WhatsApp custom build share kar ke dekhein.',
    demo_admin_title: '03. ADMIN PANEL MATRIX',
    demo_admin_desc:
      '1-click admin demo login, live stock updates, orders tracker aur warranty serial numbers inspect karein.',

    plans_badge: 'COMMERCIAL INVESTMENT TIERS',
    plans_title: 'Wazeh aur Munasib Retail Packages',
    plans_sub:
      'Baghair kisi mahana sales commission ke. Mukammal source code ownership. Apni dukan ke mutabiq plan chunein.',
    plans_sub_suffix:
      'Mukammal architecture specs, modules aur visual previews dekhne ke liye kisi bhi plan par click karein.',
    detail_btn: 'MUKAMMAL DETAILS AUR PREVIEWS DEKHEIN →',

    starter_name: 'Starter Store',
    starter_badge: 'SINGLE DUKAN',
    starter_desc:
      'Single-location computer shops aur CCTV vendors ke liye jo direct WhatsApp dispatch ke sath online sales shuru kar rahe hain.',
    starter_price_pkr: 'PKR 280,000 – 350,000',
    starter_price_usd: '~$1,000 – $1,250 USD',
    starter_delivery: '⚡ 10–14 Dinon Mein Guaranteed Delivery',
    starter_support: 'Ikhtiyari Cloud Hosting aur Support: PKR 14,000 / mahana',
    starter_callout_label: 'BUNYADI SALAHIYAT:',
    starter_callout_text:
      'Single dukan ke liye online storefront jisme direct WhatsApp order checkout aur basic stock manager shamil hai.',
    starter_f1: 'Next.js Storefront (50 Products Tak)',
    starter_f2: 'Direct WhatsApp Order Dispatch',
    starter_f3: 'Live Stock Updates aur Orders Tracker',
    starter_f4: '100% Source Code aur Database Malikana Huqooq',

    growth_name: 'Growth Retailer',
    growth_badge: '★ SAB SE ZYADA PASANDIDAH // BEHTAREEN VALUE',
    growth_desc:
      'Bari electronics aur hardware dukanon ke liye jahan custom gaming PC builds aur physical store sync zaroori hai.',
    growth_price_pkr: 'PKR 550,000 – 780,000',
    growth_price_usd: '~$2,000 – $2,800 USD',
    growth_delivery: '⚡ 3–4 Hafton Mein Guaranteed Delivery',
    growth_support: 'Ikhtiyari Managed Cloud Hosting aur Support: PKR 28,000 / mahana',
    growth_callout_label: 'STARTER SE BARI UPGRADES:',
    growth_callout_text:
      'Isme real-time PC Builder compatibility engine, 3-branch stock sync, aur serial number warranty tracking shamil hai.',
    growth_f1: 'Interactive PC Builder Compatibility Matrix',
    growth_f2: '3 Physical Branches Ki Stock Synchronization',
    growth_f3: 'Hardware Serial Number aur RMA Warranty Tracker',
    growth_f4: 'Promotional Sliders, Flash Sales aur Coupons',

    enterprise_name: 'Enterprise Custom',
    enterprise_badge: '★ MUKAMMAL RETAIL OS',
    enterprise_desc:
      'Multi-branch retail chains, wholesale distributors aur computer importers ke liye jo bara volume operate karte hain.',
    enterprise_price_pkr: 'PKR 950,000 – 1,450,000',
    enterprise_price_usd: '~$3,400 – $5,200 USD',
    enterprise_delivery: '⚡ ~6 Hafton Mein Staging aur Launch',
    enterprise_support: 'Dedicated Enterprise Support Retainer: PKR 55,000 / mahana',
    enterprise_callout_label: 'GROWTH SE BARI UPGRADES:',
    enterprise_callout_text:
      'La-mehdood branches, mukammal dynamic theme CMS, granular staff RBAC, aur courier/POS API integration.',
    enterprise_f1: 'La-Mehdood Branches aur Godam Sync',
    enterprise_f2: 'Staff Permissions (Super Admin, Manager, Cashier)',
    enterprise_f3: 'Mukammal Storefront Theme aur Content CMS',
    enterprise_f4: 'Custom POS Hardware aur Courier API Sync',

    whatsapp_cta: 'Yeh Plan WhatsApp Par Book Karein',
    view_terms: 'Mukammal Sharaait aur Guarantees Dekhein →',
  },
}

const PLANS_DETAIL = {
  en: {
    starter: {
      name: 'Starter Store',
      code: 'TXS-STARTER',
      badge: 'ENTRY LEVEL // SINGLE OUTLET',
      pricePkr: 'PKR 280,000 – 350,000',
      priceUsd: '~$1,000 – $1,250 USD',
      delivery: '10–14 Days Delivery',
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
        'Multi-branch stock synchronization (Single outlet stock only).',
        'Hardware serial number and RMA warranty lifecycle tracking.',
        'Self-managed promotional banner CMS (layout branding is managed).',
      ],
    },
    growth: {
      name: 'Growth Retailer',
      code: 'TXS-GROWTH',
      badge: '★ MOST POPULAR // BEST VALUE',
      pricePkr: 'PKR 550,000 – 780,000',
      priceUsd: '~$2,000 – $2,800 USD',
      delivery: '3–4 Weeks Delivery',
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
      ],
      exclusions: [
        'Limited to 3 branch nodes (Unlimited branches supported in Enterprise).',
        'Does not include custom external accounting ERP/FBR direct API integrations.',
        'Super Admin vs Cashier granular permission matrices (Single admin level).',
      ],
    },
    enterprise: {
      name: 'Enterprise Custom',
      code: 'TXS-ENTERPRISE',
      badge: '★ COMPLETE RETAIL OS',
      pricePkr: 'PKR 950,000 – 1,450,000',
      priceUsd: '~$3,400 – $5,200 USD',
      delivery: '~6 Weeks Staging & Delivery',
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
      ],
      exclusions: [
        'Bespoke custom hardware firmware modifications (quoted separately on request).',
      ],
    },
  },
  'ur-en': {
    starter: {
      name: 'Starter Store',
      code: 'TXS-STARTER',
      badge: 'ENTRY LEVEL // SINGLE DUKAN',
      pricePkr: 'PKR 280,000 – 350,000',
      priceUsd: '~$1,000 – $1,250 USD',
      delivery: '10–14 Dinon Mein Delivery',
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
        'Multi-branch stock synchronization (Sirf single outlet inventory support karta hai).',
        'Hardware serial number aur RMA warranty lifecycle tracking.',
        'Self-managed promotional banner CMS (Layout branding managed rehti hai).',
      ],
    },
    growth: {
      name: 'Growth Retailer',
      code: 'TXS-GROWTH',
      badge: '★ SAB SE ZYADA PASANDIDAH // BEHTAREEN VALUE',
      pricePkr: 'PKR 550,000 – 780,000',
      priceUsd: '~$2,000 – $2,800 USD',
      delivery: '3–4 Hafton Mein Delivery',
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
          desc: 'Mukhtalif physical dukanon ke darmiyan yakja stock management.',
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
      ],
      exclusions: [
        'Sirf 3 branches tak mehdood (La-mehdood branches Enterprise tier mein shamil hain).',
        'Custom external accounting ERP ya FBR direct API integration shamil nahi.',
        'Super Admin vs Cashier granular staff permission matrix (Single admin level access).',
      ],
    },
    enterprise: {
      name: 'Enterprise Custom',
      code: 'TXS-ENTERPRISE',
      badge: '★ MUKAMMAL RETAIL OS',
      pricePkr: 'PKR 950,000 – 1,450,000',
      priceUsd: '~$3,400 – $5,200 USD',
      delivery: '~6 Hafton Mein Staging aur Launch',
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
      ],
      exclusions: [
        'Custom hardware firmware modifications (zaroorat ke mutabiq alag quote ki jayegi).',
      ],
    },
  },
}

export default function TechRetailSolution() {
  const { lang, setLang, isUrdu } = useLanguage()
  const [activeModalKey, setActiveModalKey] = useState(null)
  const t = I18N_DATA[lang] || I18N_DATA.en
  const activePlan = activeModalKey
    ? (PLANS_DETAIL[lang] || PLANS_DETAIL.en)[activeModalKey]
    : null

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
      <div className="border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#161619] px-4 sm:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-mono text-xs">
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
                className={`px-2.5 py-1 text-[11px] font-bold transition-colors cursor-pointer border ${
                  lang === 'en'
                    ? 'bg-[#059669] text-white border-[#059669] dark:bg-[#10B981] dark:border-[#10B981]'
                    : 'bg-white text-[#575652] border-[rgba(15,15,15,0.14)] hover:text-[#0F0F0F] dark:bg-[#161619] dark:text-[#9B9A95] dark:border-[rgba(255,255,255,0.12)]'
                }`}
              >
                ENGLISH
              </button>
              <button
                onClick={() => handleLanguageChange('ur-en')}
                className={`px-2.5 py-1 text-[11px] font-bold transition-colors cursor-pointer border ${
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
      </div>

      {/* ─── Hero Section ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] relative overflow-hidden">
        {/* Subtle decorative emerald blur */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#059669] dark:text-[#10B981] font-semibold bg-[#ECFDF5] dark:bg-[rgba(16,185,129,0.15)] px-3 py-1 border border-[#059669]/25 dark:border-[#10B981]/30">
            <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]" />
            {t.hero_badge}
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6] leading-[0.9]">
            {t.hero_title_1}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] via-[#10B981] to-[#34D399] block sm:inline drop-shadow-xs">
              {t.hero_title_accent}
            </span>
            <br />
            {t.hero_title_2}
          </h1>

          <p className="font-serif text-lg sm:text-xl text-[#575652] dark:text-[#9B9A95] max-w-3xl leading-relaxed">
            {t.hero_sub}
          </p>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 font-mono text-xs">
            <div className="p-4 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-1 hover:border-[#059669] dark:hover:border-[#10B981] transition-colors">
              <div className="text-[#059669] dark:text-[#10B981] font-bold text-sm">100% OWNERSHIP</div>
              <div className="text-[11px] text-[#575652] dark:text-[#9B9A95]">{t.metrics_code}</div>
            </div>
            <div className="p-4 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-1 hover:border-[#059669] dark:hover:border-[#10B981] transition-colors">
              <div className="text-[#059669] dark:text-[#10B981] font-bold text-sm">0% COMMISSION</div>
              <div className="text-[11px] text-[#575652] dark:text-[#9B9A95]">{t.metrics_tax}</div>
            </div>
            <div className="p-4 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-1 hover:border-[#059669] dark:hover:border-[#10B981] transition-colors">
              <div className="text-[#059669] dark:text-[#10B981] font-bold text-sm">NEXT.JS SPEED</div>
              <div className="text-[11px] text-[#575652] dark:text-[#9B9A95]">{t.metrics_speed}</div>
            </div>
            <div className="p-4 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-1 hover:border-[#059669] dark:hover:border-[#10B981] transition-colors">
              <div className="text-[#059669] dark:text-[#10B981] font-bold text-sm">SERIAL RMA</div>
              <div className="text-[11px] text-[#575652] dark:text-[#9B9A95]">{t.metrics_rma}</div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-wrap items-center gap-4 font-mono text-xs">
            <a href="#plans" className="btn-blue text-xs shadow-sm">
              {t.cta_primary} <ArrowRight size={14} />
            </a>
            <a
              href="https://store-demo-eight.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-xs"
            >
              {t.cta_secondary} <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── Core System Concept: One System For The Business ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#121215]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#059669] dark:text-[#10B981] font-semibold mb-2">
              {t.arch_badge}
            </div>
            <h2 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6] leading-[0.9]">
              {t.arch_title}
            </h2>
            <p className="font-serif text-base sm:text-lg text-[#575652] dark:text-[#9B9A95] max-w-2xl mt-3 leading-relaxed">
              {t.arch_sub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 hover:border-[#059669] dark:hover:border-[#10B981] transition-colors">
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] text-sm">{t.arch_01_title}</div>
              <p className="font-sans text-xs text-[#575652] dark:text-[#9B9A95] leading-relaxed">
                {t.arch_01_desc}
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 hover:border-[#059669] dark:hover:border-[#10B981] transition-colors">
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] text-sm">{t.arch_02_title}</div>
              <p className="font-sans text-xs text-[#575652] dark:text-[#9B9A95] leading-relaxed">
                {t.arch_02_desc}
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 hover:border-[#059669] dark:hover:border-[#10B981] transition-colors">
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] text-sm">{t.arch_03_title}</div>
              <p className="font-sans text-xs text-[#575652] dark:text-[#9B9A95] leading-relaxed">
                {t.arch_03_desc}
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 hover:border-[#059669] dark:hover:border-[#10B981] transition-colors">
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] text-sm">{t.arch_04_title}</div>
              <p className="font-sans text-xs text-[#575652] dark:text-[#9B9A95] leading-relaxed">
                {t.arch_04_desc}
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 hover:border-[#059669] dark:hover:border-[#10B981] transition-colors">
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] text-sm">{t.arch_05_title}</div>
              <p className="font-sans text-xs text-[#575652] dark:text-[#9B9A95] leading-relaxed">
                {t.arch_05_desc}
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 hover:border-[#059669] dark:hover:border-[#10B981] transition-colors">
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] text-sm">{t.arch_06_title}</div>
              <p className="font-sans text-xs text-[#575652] dark:text-[#9B9A95] leading-relaxed">
                {t.arch_06_desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Live Demo Experience Grid ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#059669] dark:text-[#10B981] font-semibold mb-2">
              {t.demo_badge}
            </div>
            <h2 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6] leading-[0.9]">
              {t.demo_title}
            </h2>
            <p className="font-serif text-sm sm:text-base text-[#575652] dark:text-[#9B9A95] max-w-2xl mt-2">
              {t.demo_sub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
            <a
              href="https://store-demo-eight.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] hover:border-[#059669] dark:hover:border-[#10B981] transition-colors group block space-y-3 shadow-xs"
            >
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] text-sm flex items-center justify-between">
                <span>{t.demo_store_title}</span>
                <ArrowUpRight size={14} className="text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="font-sans text-xs text-[#575652] dark:text-[#9B9A95]">
                {t.demo_store_desc}
              </p>
            </a>

            <a
              href="https://store-demo-eight.vercel.app/pc-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] hover:border-[#059669] dark:hover:border-[#10B981] transition-colors group block space-y-3 shadow-xs"
            >
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] text-sm flex items-center justify-between">
                <span>{t.demo_pc_title}</span>
                <ArrowUpRight size={14} className="text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="font-sans text-xs text-[#575652] dark:text-[#9B9A95]">
                {t.demo_pc_desc}
              </p>
            </a>

            <a
              href="https://store-demo-eight.vercel.app/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] hover:border-[#059669] dark:hover:border-[#10B981] transition-colors group block space-y-3 shadow-xs"
            >
              <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] text-sm flex items-center justify-between">
                <span>{t.demo_admin_title}</span>
                <ArrowUpRight size={14} className="text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="font-sans text-xs text-[#575652] dark:text-[#9B9A95]">
                {t.demo_admin_desc}
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* ─── Pricing & Packages Tiers ─── */}
      <section id="plans" className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#121215]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-[#059669] dark:text-[#10B981] font-semibold bg-[#ECFDF5] dark:bg-[rgba(16,185,129,0.15)] px-3 py-0.5 border border-[#059669]/25 dark:border-[#10B981]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#10B981]" />
              {t.plans_badge}
            </div>
            <h2 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6] leading-[0.9]">
              {t.plans_title}
            </h2>
            <p className="font-serif text-sm sm:text-base text-[#575652] dark:text-[#9B9A95]">
              {t.plans_sub} {t.plans_sub_suffix}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start font-mono text-xs">
            {/* 1. Starter Store */}
            <div className="p-8 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-6 flex flex-col justify-between hover:border-[#059669] dark:hover:border-[#10B981] transition-colors">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] text-base">{t.starter_name}</div>
                  <span className="text-[10px] text-[#8E8D88] dark:text-[#6A6965] uppercase">{t.starter_badge}</span>
                </div>
                <p className="font-sans text-xs text-[#575652] dark:text-[#9B9A95] leading-relaxed">
                  {t.starter_desc}
                </p>

                <div className="pt-2 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)]">
                  <div className="text-2xl font-display text-[#0F0F0F] dark:text-[#EDECE6]">{t.starter_price_pkr}</div>
                  <div className="text-[11px] text-[#8E8D88] dark:text-[#6A6965]">{t.starter_price_usd}</div>
                  <div className="text-[11px] text-[#059669] dark:text-[#10B981] font-semibold mt-1">{t.starter_delivery}</div>
                </div>

                {/* Clear Plan Differentiation Callout */}
                <div className="p-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] text-[11px] text-[#0F0F0F] dark:text-[#EDECE6] space-y-1">
                  <div className="font-bold text-[#059669] dark:text-[#10B981] text-[10px] uppercase">
                    {t.starter_callout_label}
                  </div>
                  <p className="font-sans text-[11px] text-[#575652] dark:text-[#9B9A95]">
                    {t.starter_callout_text}
                  </p>
                </div>

                <div className="pt-2 space-y-2 text-[11px] text-[#0F0F0F] dark:text-[#EDECE6]">
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
                    className="relative overflow-hidden w-full py-3 px-3 bg-[#ECFDF5] dark:bg-[#10B981]/15 text-[#059669] dark:text-[#10B981] border-2 border-[#059669]/50 dark:border-[#10B981]/60 font-mono text-[11px] font-extrabold uppercase tracking-wider hover:bg-[#059669] dark:hover:bg-[#10B981] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm animate-click-me group"
                  >
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#059669] dark:bg-[#10B981] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669] dark:bg-[#10B981]"></span>
                    </span>
                    <Info size={14} className="shrink-0 group-hover:rotate-12 transition-transform" />
                    <span>{t.detail_btn}</span>
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent pointer-events-none animate-shimmer-sweep" />
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] space-y-3">
                <button
                  onClick={() => openWhatsApp(t.starter_name, t.starter_price_pkr)}
                  className="btn-outline w-full justify-center text-xs animate-claim-outline group relative overflow-hidden transition-all duration-300 py-3 font-bold"
                >
                  <MessageSquare size={14} className="animate-icon-wiggle group-hover:scale-125 transition-transform text-[#059669] dark:text-[#10B981]" />
                  <span>{t.whatsapp_cta}</span>
                  <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#059669]/10 to-transparent pointer-events-none animate-shimmer-sweep" />
                </button>
                <div className="text-[10px] text-[#8E8D88] dark:text-[#6A6965] text-center">{t.starter_support}</div>
              </div>
            </div>

            {/* 2. Growth Retailer (Most Popular) */}
            <div className="p-8 bg-white dark:bg-[#161619] border-2 border-[#059669] dark:border-[#10B981] space-y-6 flex flex-col justify-between shadow-lg relative hover:shadow-xl transition-shadow">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#059669] dark:bg-[#10B981] text-white font-mono text-[9px] font-bold px-3 py-1 uppercase tracking-wider shadow-sm">
                {t.growth_badge}
              </div>

              <div className="space-y-4">
                <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] text-base">{t.growth_name}</div>
                <p className="font-sans text-xs text-[#575652] dark:text-[#9B9A95] leading-relaxed">
                  {t.growth_desc}
                </p>

                <div className="pt-2 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)]">
                  <div className="text-2xl font-display text-[#059669] dark:text-[#10B981]">{t.growth_price_pkr}</div>
                  <div className="text-[11px] text-[#8E8D88] dark:text-[#6A6965]">{t.growth_price_usd}</div>
                  <div className="text-[11px] text-[#059669] dark:text-[#10B981] font-semibold mt-1">{t.growth_delivery}</div>
                </div>

                {/* Clear Plan Differentiation Callout */}
                <div className="p-3 bg-[#ECFDF5] dark:bg-[#10B981]/15 border border-[#059669]/25 dark:border-[#10B981]/30 text-[11px] text-[#0F0F0F] dark:text-[#EDECE6] space-y-1">
                  <div className="font-bold text-[#059669] dark:text-[#10B981] text-[10px] uppercase">
                    {t.growth_callout_label}
                  </div>
                  <p className="font-sans text-[11px] text-[#575652] dark:text-[#9B9A95]">
                    {t.growth_callout_text}
                  </p>
                </div>

                <div className="pt-2 space-y-2 text-[11px] text-[#0F0F0F] dark:text-[#EDECE6]">
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
                </div>

                {/* Prominent Modal Trigger Button */}
                <div className="pt-3">
                  <button
                    onClick={() => setActiveModalKey('growth')}
                    className="relative overflow-hidden w-full py-3 px-3 bg-[#059669] dark:bg-[#10B981] text-white font-mono text-[11px] font-extrabold uppercase tracking-wider hover:bg-[#047857] dark:hover:bg-[#059669] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md animate-click-me-solid group"
                  >
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    <Info size={14} className="shrink-0 group-hover:rotate-12 transition-transform" />
                    <span>{t.detail_btn}</span>
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none animate-shimmer-sweep" />
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] space-y-3">
                <button
                  onClick={() => openWhatsApp(t.growth_name, t.growth_price_pkr)}
                  className="btn-blue w-full justify-center text-xs shadow-md animate-claim-solid group relative overflow-hidden transition-all duration-300 py-3.5 font-extrabold"
                >
                  <MessageSquare size={15} className="animate-icon-wiggle group-hover:scale-125 transition-transform" />
                  <span className="tracking-wider">{t.whatsapp_cta}</span>
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none animate-shimmer-sweep" />
                </button>
                <div className="text-[10px] text-[#8E8D88] dark:text-[#6A6965] text-center">{t.growth_support}</div>
              </div>
            </div>

            {/* 3. Enterprise Custom */}
            <div className="p-8 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-6 flex flex-col justify-between hover:border-[#059669] dark:hover:border-[#10B981] transition-colors">
              <div className="space-y-4">
                <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] text-base">{t.enterprise_name}</div>
                <p className="font-sans text-xs text-[#575652] dark:text-[#9B9A95] leading-relaxed">
                  {t.enterprise_desc}
                </p>

                <div className="pt-2 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)]">
                  <div className="text-2xl font-display text-[#0F0F0F] dark:text-[#EDECE6]">{t.enterprise_price_pkr}</div>
                  <div className="text-[11px] text-[#8E8D88] dark:text-[#6A6965]">{t.enterprise_price_usd}</div>
                  <div className="text-[11px] text-[#059669] dark:text-[#10B981] font-semibold mt-1">{t.enterprise_delivery}</div>
                </div>

                {/* Clear Plan Differentiation Callout */}
                <div className="p-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] text-[11px] text-[#0F0F0F] dark:text-[#EDECE6] space-y-1">
                  <div className="font-bold text-[#059669] dark:text-[#10B981] text-[10px] uppercase">
                    {t.enterprise_callout_label}
                  </div>
                  <p className="font-sans text-[11px] text-[#575652] dark:text-[#9B9A95]">
                    {t.enterprise_callout_text}
                  </p>
                </div>

                <div className="pt-2 space-y-2 text-[11px] text-[#0F0F0F] dark:text-[#EDECE6]">
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
                </div>

                {/* Prominent Modal Trigger Button */}
                <div className="pt-3">
                  <button
                    onClick={() => setActiveModalKey('enterprise')}
                    className="relative overflow-hidden w-full py-3 px-3 bg-[#ECFDF5] dark:bg-[#10B981]/15 text-[#059669] dark:text-[#10B981] border-2 border-[#059669]/50 dark:border-[#10B981]/60 font-mono text-[11px] font-extrabold uppercase tracking-wider hover:bg-[#059669] dark:hover:bg-[#10B981] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm animate-click-me group"
                  >
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#059669] dark:bg-[#10B981] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669] dark:bg-[#10B981]"></span>
                    </span>
                    <Info size={14} className="shrink-0 group-hover:rotate-12 transition-transform" />
                    <span>{t.detail_btn}</span>
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent pointer-events-none animate-shimmer-sweep" />
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] space-y-3">
                <button
                  onClick={() => openWhatsApp(t.enterprise_name, t.enterprise_price_pkr)}
                  className="btn-outline w-full justify-center text-xs animate-claim-outline group relative overflow-hidden transition-all duration-300 py-3 font-bold"
                >
                  <MessageSquare size={14} className="animate-icon-wiggle group-hover:scale-125 transition-transform text-[#059669] dark:text-[#10B981]" />
                  <span>{t.whatsapp_cta}</span>
                  <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#059669]/10 to-transparent pointer-events-none animate-shimmer-sweep" />
                </button>
                <div className="text-[10px] text-[#8E8D88] dark:text-[#6A6965] text-center">{t.enterprise_support}</div>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              to="/solutions/tech-retail/terms"
              className="text-xs font-mono font-semibold text-[#059669] dark:text-[#10B981] hover:underline"
            >
              {t.view_terms}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
