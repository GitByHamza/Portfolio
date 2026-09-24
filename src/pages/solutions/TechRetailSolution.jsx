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
import OfferFAQ from '../../components/OfferFAQ'
import ComparePrice from '../../components/ComparePrice'
import { allowedCurrencies, defaultCurrency } from '../../lib/currency'
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

// Default currency: saved choice -> visitor country (Pakistan -> PKR) -> USD.
// PKR is only offered to visitors in Pakistan (rules in src/lib/currency.js).
const CURRENCIES = ['USD', 'PKR']
function detectInitialCurrency() {
  return defaultCurrency(CURRENCIES)
}

const I18N_DATA = {
  en: {
    hero_badge: 'TECH RETAIL OS · FOR COMPUTER, GAMING & CCTV SHOPS',
    hero_title_1: 'Sell custom PCs online —',
    hero_title_accent: 'every part checked.',
    hero_title_2: '',
    hero_sub:
      'An online store and back office built for computer shops. Customers build PCs with parts that actually fit, stock stays in sync across your branches, and every serial number is tracked for warranty. Live in 10–30 days, and you own the code.',
    cta_primary: 'See plans & pricing',
    cta_secondary: 'Try the live demo',
    metrics_code: 'Code, data and domain handed over',
    metrics_tax: 'No cut from your sales, ever',
    metrics_speed: 'Socket, RAM type and PSU wattage',
    metrics_rma: 'From supplier intake to customer claim',
    metrics_code_top: 'YOU OWN IT',
    metrics_tax_top: '0% COMMISSION',
    metrics_speed_top: 'PARTS CHECKED',
    metrics_rma_top: 'SERIAL WARRANTY',

    // How we work
    ultimatum_badge: 'HOW WE WORK',
    ultimatum_title: 'You see it working before you pay in full',
    ultimatum_sub:
      'Payments follow milestones. The final balance is due only after you approve your store on a private link, with your own products.',
    ultimatum_best_tag: 'WHAT YOU GET',
    ultimatum_best_title: 'A store built around how you sell',
    ultimatum_best_p1: 'An online store with your products, prices and branches.',
    ultimatum_best_p2: 'A PC builder that flags incompatible parts before checkout.',
    ultimatum_best_p3: 'Counter sales and online orders use the same stock count.',
    ultimatum_best_p4: 'No monthly platform fee, and no commission to us.',
    ultimatum_best_p5: 'Full code and database handover when the project is complete.',
    ultimatum_best_footer: 'Designed to cut repeat questions and wrong-part orders.',

    ultimatum_worst_tag: "IF SOMETHING ISN'T RIGHT",
    ultimatum_worst_title: 'We fix it, or you get your deposit back',
    ultimatum_worst_p1: 'Before launch, you test everything against a written checklist we both sign.',
    ultimatum_worst_p2: "Anything that doesn't match the checklist, we fix within 10 working days.",
    ultimatum_worst_p3: "If we still can't meet it, your deposit is refunded.",
    ultimatum_worst_p4: 'No lock-in contract and no hidden monthly charges.',
    ultimatum_worst_footer: 'Your payments are tied to results you can see.',

    // Staging approval banner
    guarantee_badge: 'STAGING APPROVAL',
    guarantee_title: 'Test your store on a private link before launch',
    guarantee_sub:
      'We set up your store with your real products on a private staging link. You test the storefront, PC builder and stock sync yourself. The final payment is due only after you approve it.',

    arch_badge: "WHAT'S INCLUDED",
    arch_title: 'One system for your shop, warehouse and website',
    arch_sub:
      'Not just a catalogue. Your storefront, branches, counter sales and WhatsApp orders all run on the same data.',
    arch_01_title: '01. ONLINE STORE',
    arch_01_desc:
      'A fast, mobile-friendly store for PC hardware, CCTV and electronics, with full spec sheets and filters.',
    arch_02_title: '02. PC BUILDER',
    arch_02_desc:
      'Customers pick parts step by step. The builder checks CPU socket (AM4/AM5, LGA1700/1851), DDR4 vs DDR5 and PSU wattage, and warns before checkout.',
    arch_03_title: '03. BRANCH STOCK',
    arch_03_desc:
      'Every shop and your warehouse (e.g. Hafeez Centre, Techno City) in one stock view. Counter and online sales update it instantly.',
    arch_04_title: '04. SERIAL & WARRANTY',
    arch_04_desc:
      'Record every GPU, motherboard or DVR serial at intake, link it to the invoice, and check warranty status in seconds.',
    arch_05_title: '05. WHATSAPP ORDERS',
    arch_05_desc:
      'Orders and custom builds arrive on your sales WhatsApp with items, specs, total and delivery details.',
    arch_06_title: '06. FULL HANDOVER',
    arch_06_desc:
      'Your GitHub repository, database and admin accounts are transferred to you.',
    arch_07_title: '07. AI SALES ASSISTANT',
    arch_07_desc:
      'A chat assistant on your store that suggests builds by budget, checks compatibility, and passes the customer to your WhatsApp with the full conversation.',

    demo_badge: 'LIVE DEMO',
    demo_title: 'Try it yourself',
    demo_sub:
      'A working demo store with sample products. Your version is set up with your products, branches and branding.',
    demo_store_title: '01. STOREFRONT',
    demo_store_desc: 'Browse the catalogue, filter by specs, and add to cart.',
    demo_pc_title: '02. PC BUILDER',
    demo_pc_desc: 'Pick parts, see compatibility warnings, and share a build to WhatsApp.',
    demo_admin_title: '03. ADMIN PANEL',
    demo_admin_desc: 'One-click demo login. See orders, stock by branch and serial records.',

    plans_badge: 'PLANS & PRICING',
    plans_title: 'Tech Retail plans',
    plans_sub: 'One fixed price per plan. No commission. Full handover when complete.',
    plans_sub_suffix: "Open any plan to see the full scope, what's excluded, and screenshots.",
    detail_btn: 'See full scope & screenshots →',

    starter_name: 'Single Store',
    starter_badge: '1 SHOP',
    starter_desc:
      'For a single computer or CCTV shop starting to sell online, with orders coming to WhatsApp.',
    starter_price_pkr: 'PKR 280,000',
    starter_price_usd: '$2,450',
    starter_delivery: 'Live in 10 days*',
    starter_support_pkr: 'Optional Care Plan: PKR 14,000 / month',
    starter_support_usd: 'Optional Care Plan: $140 / month',
    starter_callout_label: 'BEST FOR',
    starter_callout_text: 'Getting your shop online fast, with an admin panel your staff can use.',
    starter_f1: 'Online store — we load your first 50 products',
    starter_f2: 'Orders sent to your WhatsApp with full details',
    starter_f3: 'Admin panel for products, stock and orders',
    starter_f4: 'Google Search Console, sitemap and Analytics set up',

    growth_name: 'Multi-Branch',
    growth_badge: 'MOST POPULAR',
    growth_desc: 'For established hardware and gaming PC shops selling at the counter and online.',
    growth_price_pkr: 'PKR 550,000',
    growth_price_usd: '$4,850',
    growth_delivery: 'Live in 21 days*',
    growth_support_pkr: 'Optional Care Plan: PKR 28,000 / month',
    growth_support_usd: 'Optional Care Plan: $280 / month',
    growth_callout_label: 'EVERYTHING IN SINGLE STORE, PLUS',
    growth_callout_text:
      'PC builder, stock across 3 locations, serial warranty tracking, online payments and an AI sales assistant.',
    growth_f1: 'PC builder with compatibility checks',
    growth_f2: 'Stock synced across up to 3 locations',
    growth_f3: 'Serial-number warranty tracking',
    growth_f4: 'Coupons, flash sales and banners',
    growth_f5_pkr: 'Card & wallet payments — included (PKR 50,000 value)',
    growth_f5_usd: 'Card & wallet payments — included ($400 value)',
    growth_f6_pkr: 'AI sales assistant — included (PKR 65,000 value)',
    growth_f6_usd: 'AI sales assistant — included ($650 value)',

    enterprise_name: 'Chain & Wholesale',
    enterprise_badge: 'FOR CHAINS',
    enterprise_desc: 'For multi-branch chains, wholesalers and importers with staff across locations.',
    enterprise_price_pkr: 'From PKR 950,000',
    enterprise_price_usd: 'From $8,500',
    enterprise_delivery: 'From 30 days — fixed in your scope document',
    enterprise_support_pkr: 'Dedicated Care Plan: PKR 55,000 / month',
    enterprise_support_usd: 'Dedicated Care Plan: $550 / month',
    enterprise_callout_label: 'EVERYTHING IN MULTI-BRANCH, PLUS',
    enterprise_callout_text:
      'Unlimited branches, staff roles, a CMS, POS and courier integrations, and an AI assistant connected to live stock.',
    enterprise_f1: 'Unlimited branches and warehouses, with stock transfers',
    enterprise_f2: 'Staff roles: owner, manager, cashier, warehouse',
    enterprise_f3: 'Edit pages, menus and banners yourself (CMS)',
    enterprise_f4: 'POS hardware, courier (TCS, Leopards, Trax) and FBR integration',
    enterprise_f5: 'Multiple payment gateways — included',
    enterprise_f6: 'AI assistant with live stock and bulk quotes — included',

    whatsapp_cta: 'Discuss this plan on WhatsApp',
    view_terms: 'Read the scope, payment and warranty terms →',
  },
  'ur-en': {
    hero_badge: 'TECH RETAIL OS · COMPUTER, GAMING AUR CCTV DUKANON KE LIYE',
    hero_title_1: 'Custom PCs online bechein —',
    hero_title_accent: 'har part pehle se check.',
    hero_title_2: '',
    hero_sub:
      'Computer dukanon ke liye online store aur back office. Customer sirf compatible parts se PC banata hai, tamam branches ka stock sync rehta hai, aur har serial number warranty ke liye record hota hai. 10–30 din mein live, aur code aapka.',
    cta_primary: 'Plans aur prices dekhein',
    cta_secondary: 'Live demo try karein',
    metrics_code: 'Code, data aur domain aapke hawale',
    metrics_tax: 'Aapki sales mein se koi hissa nahi',
    metrics_speed: 'Socket, RAM type aur PSU wattage',
    metrics_rma: 'Supplier se customer claim tak',
    metrics_code_top: 'MALKIAT AAPKI',
    metrics_tax_top: '0% COMMISSION',
    metrics_speed_top: 'PARTS CHECK',
    metrics_rma_top: 'SERIAL WARRANTY',

    // How we work
    ultimatum_badge: 'HUM KAISE KAAM KARTE HAIN',
    ultimatum_title: 'Poori payment se pehle system chalta hua dekhein',
    ultimatum_sub:
      'Payment milestones ke sath hoti hai. Aakhri raqam tab, jab aap private link par apne products ke sath store approve kar dein.',
    ultimatum_best_tag: 'AAPKO KYA MILTA HAI',
    ultimatum_best_title: 'Aapke kaam ke mutabiq bana store',
    ultimatum_best_p1: 'Aapke products, prices aur branches ke sath online store.',
    ultimatum_best_p2: 'PC builder jo checkout se pehle ghalat parts bata deta hai.',
    ultimatum_best_p3: 'Counter sale aur online order — ek hi stock.',
    ultimatum_best_p4: 'Na mahana platform fee, na hamara koi commission.',
    ultimatum_best_p5: 'Project mukammal hone par poora code aur database aapke hawale.',
    ultimatum_best_footer: 'Baar baar ke sawal aur ghalat parts ke orders kam karne ke liye banaya gaya.',

    ultimatum_worst_tag: 'AGAR KUCH THEEK NA HO',
    ultimatum_worst_title: 'Hum theek karenge — warna deposit wapas',
    ultimatum_worst_p1: 'Launch se pehle aap har cheez ek likhi hui checklist ke mutabiq test karte hain, jis par hum dono sign karte hain.',
    ultimatum_worst_p2: 'Jo cheez checklist ke mutabiq na ho, hum 10 working days mein theek karte hain.',
    ultimatum_worst_p3: 'Phir bhi na ho sake, to aapki deposit wapas.',
    ultimatum_worst_p4: 'Na lock-in contract, na chhupe mahana charges.',
    ultimatum_worst_footer: 'Aapki payment un nataij se judi hai jo aap khud dekhte hain.',

    // Staging approval banner
    guarantee_badge: 'STAGING APPROVAL',
    guarantee_title: 'Launch se pehle private link par apna store test karein',
    guarantee_sub:
      'Hum aapka store aapke asli products ke sath private staging link par set karte hain. Storefront, PC builder aur stock sync aap khud test karte hain. Aakhri payment sirf aapki approval ke baad.',

    arch_badge: 'KYA SHAMIL HAI',
    arch_title: 'Dukan, godam aur website — ek system',
    arch_sub:
      'Sirf catalogue nahi. Storefront, branches, counter sale aur WhatsApp orders sab ek hi data par chalte hain.',
    arch_01_title: '01. ONLINE STORE',
    arch_01_desc:
      'PC hardware, CCTV aur electronics ke liye tez, mobile-friendly store — poori specs aur filters ke sath.',
    arch_02_title: '02. PC BUILDER',
    arch_02_desc:
      'Customer qadam ba qadam parts chunta hai. Builder CPU socket (AM4/AM5, LGA1700/1851), DDR4 ya DDR5 aur PSU wattage check kar ke checkout se pehle bata deta hai.',
    arch_03_title: '03. BRANCH STOCK',
    arch_03_desc:
      'Har dukan aur godam (maslan Hafeez Centre, Techno City) ek stock view mein. Counter ya online sale par stock foran update.',
    arch_04_title: '04. SERIAL AUR WARRANTY',
    arch_04_desc:
      'Har GPU, motherboard ya DVR ka serial intake par record, invoice se link, aur warranty status seconds mein.',
    arch_05_title: '05. WHATSAPP ORDERS',
    arch_05_desc:
      'Orders aur custom builds aapke sales WhatsApp par — items, specs, total aur delivery details ke sath.',
    arch_06_title: '06. MUKAMMAL HANDOVER',
    arch_06_desc:
      'GitHub repository, database aur admin accounts aapke naam transfer.',
    arch_07_title: '07. AI SALES ASSISTANT',
    arch_07_desc:
      'Aapke store par chat assistant jo budget ke mutabiq build suggest karta hai, compatibility check karta hai, aur poori chat ke sath customer ko aapke WhatsApp par bhej deta hai.',

    demo_badge: 'LIVE DEMO',
    demo_title: 'Khud chala kar dekhein',
    demo_sub:
      'Sample products ke sath chalta hua demo store. Aapka version aapke products, branches aur branding ke sath set hota hai.',
    demo_store_title: '01. STOREFRONT',
    demo_store_desc: 'Catalogue dekhein, specs se filter karein, cart mein daalein.',
    demo_pc_title: '02. PC BUILDER',
    demo_pc_desc: 'Parts chunein, compatibility warnings dekhein, build WhatsApp par share karein.',
    demo_admin_title: '03. ADMIN PANEL',
    demo_admin_desc: 'Ek click demo login. Orders, branch-wise stock aur serial records dekhein.',

    plans_badge: 'PLANS AUR PRICES',
    plans_title: 'Tech Retail plans',
    plans_sub: 'Har plan ki ek fixed price. Koi commission nahi. Mukammal hone par poora handover.',
    plans_sub_suffix: 'Poora scope, kya shamil nahi, aur screenshots dekhne ke liye plan kholein.',
    detail_btn: 'Poora scope aur screenshots dekhein →',

    starter_name: 'Single Store',
    starter_badge: '1 DUKAN',
    starter_desc:
      'Ek computer ya CCTV dukan ke liye jo online bechna shuru kar rahi hai — orders WhatsApp par.',
    starter_price_pkr: 'PKR 280,000',
    starter_price_usd: '$2,450',
    starter_delivery: '10 din mein live*',
    starter_support_pkr: 'Ikhtiyari Care Plan: PKR 14,000 / mahana',
    starter_support_usd: 'Ikhtiyari Care Plan: $140 / mahana',
    starter_callout_label: 'KIS KE LIYE BEHTAR',
    starter_callout_text: 'Dukan ko jaldi online lana, aisa admin panel jo staff aasani se chala sake.',
    starter_f1: 'Online store — pehle 50 products hum daalte hain',
    starter_f2: 'Orders poori details ke sath aapke WhatsApp par',
    starter_f3: 'Products, stock aur orders ke liye admin panel',
    starter_f4: 'Google Search Console, sitemap aur Analytics setup',

    growth_name: 'Multi-Branch',
    growth_badge: 'SAB SE MAQBOOL',
    growth_desc: 'Established hardware aur gaming PC dukanon ke liye jo counter aur online dono par bechti hain.',
    growth_price_pkr: 'PKR 550,000',
    growth_price_usd: '$4,850',
    growth_delivery: '21 din mein live*',
    growth_support_pkr: 'Ikhtiyari Care Plan: PKR 28,000 / mahana',
    growth_support_usd: 'Ikhtiyari Care Plan: $280 / mahana',
    growth_callout_label: 'SINGLE STORE KA SAB KUCH, AUR',
    growth_callout_text:
      'PC builder, 3 locations ka stock, serial warranty tracking, online payments aur AI sales assistant.',
    growth_f1: 'Compatibility check wala PC builder',
    growth_f2: '3 locations tak stock sync',
    growth_f3: 'Serial number warranty tracking',
    growth_f4: 'Coupons, flash sales aur banners',
    growth_f5_pkr: 'Card aur wallet payments — shamil (PKR 50,000 ki value)',
    growth_f5_usd: 'Card aur wallet payments — shamil ($400 ki value)',
    growth_f6_pkr: 'AI sales assistant — shamil (PKR 65,000 ki value)',
    growth_f6_usd: 'AI sales assistant — shamil ($650 ki value)',

    enterprise_name: 'Chain & Wholesale',
    enterprise_badge: 'CHAINS KE LIYE',
    enterprise_desc: 'Multi-branch chains, wholesalers aur importers ke liye jin ka staff kai locations par hai.',
    enterprise_price_pkr: 'PKR 950,000 se shuru',
    enterprise_price_usd: '$8,500 se shuru',
    enterprise_delivery: '30 din se — final date scope document mein',
    enterprise_support_pkr: 'Dedicated Care Plan: PKR 55,000 / mahana',
    enterprise_support_usd: 'Dedicated Care Plan: $550 / mahana',
    enterprise_callout_label: 'MULTI-BRANCH KA SAB KUCH, AUR',
    enterprise_callout_text:
      'La-mehdood branches, staff roles, CMS, POS aur courier integrations, aur live stock se juda AI assistant.',
    enterprise_f1: 'La-mehdood branches aur godam, stock transfer ke sath',
    enterprise_f2: 'Staff roles: owner, manager, cashier, godam',
    enterprise_f3: 'Pages, menus aur banners khud edit karein (CMS)',
    enterprise_f4: 'POS hardware, courier (TCS, Leopards, Trax) aur FBR integration',
    enterprise_f5: 'Ek se zyada payment gateways — shamil',
    enterprise_f6: 'Live stock aur bulk quotes wala AI assistant — shamil',

    whatsapp_cta: 'Is plan par WhatsApp par baat karein',
    view_terms: 'Scope, payment aur warranty ki sharaait parhein →',
  },
}

const PLANS_DETAIL = {
  en: {
    starter: {
      name: 'Single Store',
      code: '',
      badge: 'SINGLE STORE',
      pricePkr: 'PKR 280,000',
      priceUsd: '$2,450',
      delivery: '10 days',
      idealFor:
        'A single computer shop, CCTV vendor or electronics counter starting to sell online, with orders coming to WhatsApp.',
      artifacts: [
        { title: 'Storefront', image: '/txs/home.png', tag: 'Storefront' },
        { title: 'Product & order admin', image: '/txs/dashboard products.png', tag: 'Admin' },
      ],
      modules: [
        {
          title: 'Online store',
          desc: 'A fast, mobile-friendly store for computer and electronics products.',
          items: [
            'We load your first 50 products (no limit after that)',
            'Full spec sheets: CPU, GPU, RAM, storage',
            'Category and price filters',
            'Search and shopping cart',
          ],
        },
        {
          title: 'WhatsApp orders',
          desc: 'Every order arrives on your sales WhatsApp, ready to confirm.',
          items: [
            'Items, specs and order total',
            'Customer name, phone and delivery address',
            'No commission on any order',
          ],
        },
        {
          title: 'Admin panel',
          desc: 'Simple enough for shop staff.',
          items: [
            'Add, edit and remove products',
            'In stock / out of stock updates',
            'Order status: Pending → Dispatched → Completed',
            'Customer list with order history',
          ],
        },
        {
          title: 'Google setup',
          desc: 'So customers can find your shop.',
          items: ['Google Search Console', 'XML sitemap', 'Google Analytics (GA4)'],
        },
      ],
      exclusions: [
        'PC builder (in Multi-Branch and Chain)',
        'Stock across more than one location',
        'Serial-number warranty tracking',
        'Product photos and descriptions — you provide them; data entry beyond 50 products is an add-on',
        'Online card and wallet payments (add-on: +PKR 50,000 / $400; included in Multi-Branch & Chain)',
        'AI sales assistant (add-on: +PKR 65,000 / $650; included in Multi-Branch & Chain)',
      ],
    },
    growth: {
      name: 'Multi-Branch',
      code: '',
      badge: 'MOST POPULAR',
      pricePkr: 'PKR 550,000',
      priceUsd: '$4,850',
      delivery: '21 days',
      idealFor:
        'Established hardware and gaming PC shops selling high-value builds and parts, with stock at the counter and online.',
      artifacts: [
        { title: 'PC builder', image: '/txs/RIG BUILDER.png', tag: 'PC builder' },
        { title: 'Serial & warranty records', image: '/txs/admin warranty.png', tag: 'Warranty' },
        { title: 'Product catalogue', image: '/txs/products.png', tag: 'Catalogue' },
        { title: 'Sales dashboard', image: '/txs/dashboard.png', tag: 'Dashboard' },
      ],
      modules: [
        {
          title: 'PC builder',
          desc: 'Checks every part as the customer builds.',
          items: [
            'CPU socket: AM4/AM5 vs LGA1700/LGA1851',
            'RAM type: DDR4 vs DDR5',
            'PSU wattage headroom and GPU clearance',
            'Share the build to WhatsApp with specs and total',
          ],
        },
        {
          title: 'Stock across 3 locations',
          desc: 'One stock view for your counters and warehouse.',
          items: [
            'Up to 3 locations (e.g. Hafeez Centre, Techno City + warehouse)',
            'Stock by location in the admin',
            'Counter and online sales update stock instantly',
          ],
        },
        {
          title: 'Serial-number warranty',
          desc: 'Track each GPU, motherboard and PSU.',
          items: [
            'In stock → Sold (linked to invoice) → Warranty claim → Replaced',
            'Check any serial in seconds',
            'Clear records for supplier and customer disputes',
          ],
        },
        {
          title: 'Promotions & invoices',
          desc: 'Tools to bring customers back.',
          items: [
            'Banners and flash sales you manage yourself',
            'Coupon codes: percentage, fixed amount, minimum order',
            'Printable receipts and invoices',
          ],
        },
        {
          title: 'Online payments (included — PKR 50,000 value)',
          desc: 'Card and wallet checkout for prepaid orders.',
          items: [
            'One gateway of your choice: PayFast, Paymob, Bank Alfalah or Keenu',
            'Visa, Mastercard and UnionPay',
            'JazzCash and EasyPaisa',
            'Gateway approval and transaction fees are between you and your gateway',
          ],
        },
        {
          title: 'AI sales assistant (included — PKR 65,000 value)',
          desc: 'A chat assistant on your store.',
          items: [
            'Suggests builds by budget and checks compatibility',
            'Fills the PC builder or cart from the chat',
            'Hands the chat to your WhatsApp with full context',
            'AI usage fees are paid at cost; we estimate them upfront',
          ],
        },
      ],
      exclusions: [
        'More than 3 locations (Chain plan)',
        'FBR or accounting/ERP integration (add-on)',
        'Separate staff permission levels (add-on or Chain plan)',
        'Product photos and descriptions beyond the included setup',
        'Unlimited revisions — 2 rounds per milestone are included, then hourly',
      ],
    },
    enterprise: {
      name: 'Chain & Wholesale',
      code: '',
      badge: 'FOR CHAINS',
      pricePkr: 'From PKR 950,000',
      priceUsd: 'From $8,500',
      delivery: 'From 30 days',
      idealFor:
        'Computer retail chains, nationwide distributors and importers running several branches and warehouses.',
      artifacts: [
        { title: 'Site content & banners (CMS)', image: '/txs/admin site control.png', tag: 'CMS' },
        { title: 'Product & stock admin', image: '/txs/dashboard products.png', tag: 'Stock' },
        { title: 'PC builder', image: '/txs/RIG BUILDER.png', tag: 'PC builder' },
        { title: 'Serial & warranty records', image: '/txs/admin warranty.png', tag: 'Warranty' },
      ],
      modules: [
        {
          title: 'Unlimited branches & warehouses',
          desc: 'Stock across all your outlets.',
          items: [
            'Any number of shops, hubs and warehouses',
            'Stock transfer requests with dispatch and receipt sign-off',
            'Warehouse dispatch and counter pickup',
          ],
        },
        {
          title: 'Staff roles',
          desc: 'Each person sees only what their job needs.',
          items: [
            'Owner: profit, margins, branch performance, settings',
            'Branch manager: local sales, staff, stock adjustments',
            'Cashier: fast billing and receipt printing',
            'Warehouse: stock intake and bulk serial scanning',
          ],
        },
        {
          title: 'Content management (CMS)',
          desc: 'Change your store without code.',
          items: [
            'Edit menus, pages and announcement bars',
            'Brand colours and banners',
            'Receipt and email templates',
          ],
        },
        {
          title: 'Integrations',
          desc: 'Connect your counter and couriers.',
          items: [
            'Thermal printers and barcode scanners',
            'Courier booking and tracking: TCS, Trax, Leopards, CallCourier',
            'FBR POS integration (for Tier-1 retailers)',
          ],
        },
        {
          title: 'Payments (included)',
          desc: 'Built for high order volume.',
          items: [
            'More than one gateway, with fallback',
            'Cards, Raast QR, JazzCash and EasyPaisa',
            'Daily payment reconciliation report',
          ],
        },
        {
          title: 'AI assistant with live stock (included)',
          desc: 'Set up with your products and branches.',
          items: [
            'Answers with real-time stock by branch',
            'Handles bulk and corporate quote requests',
            'Chats and leads saved in your admin',
            'Tone and answers set to your brand',
          ],
        },
      ],
      exclusions: [
        'Hardware firmware changes (quoted separately)',
        'Bulk product photography and data entry (add-on)',
        'Unlimited revisions — 2 rounds per milestone are included, then hourly',
      ],
    },
  },
  'ur-en': {
    starter: {
      name: 'Single Store',
      code: '',
      badge: 'SINGLE STORE',
      pricePkr: 'PKR 280,000',
      priceUsd: '$2,450',
      delivery: '10 din',
      idealFor:
        'Ek computer dukan, CCTV vendor ya electronics counter jo online bechna shuru kar raha hai — orders WhatsApp par.',
      artifacts: [
        { title: 'Storefront', image: '/txs/home.png', tag: 'Storefront' },
        { title: 'Product aur order admin', image: '/txs/dashboard products.png', tag: 'Admin' },
      ],
      modules: [
        {
          title: 'Online store',
          desc: 'Computer aur electronics products ke liye tez, mobile-friendly store.',
          items: [
            'Pehle 50 products hum daalte hain (us ke baad koi limit nahi)',
            'Poori specs: CPU, GPU, RAM, storage',
            'Category aur price filters',
            'Search aur shopping cart',
          ],
        },
        {
          title: 'WhatsApp orders',
          desc: 'Har order confirm karne ke liye tayyar, aapke sales WhatsApp par.',
          items: [
            'Items, specs aur order total',
            'Customer ka naam, phone aur address',
            'Kisi order par koi commission nahi',
          ],
        },
        {
          title: 'Admin panel',
          desc: 'Itna aasan ke dukan ka staff chala sake.',
          items: [
            'Products add, edit aur remove',
            'In stock / out of stock updates',
            'Order status: Pending → Dispatched → Completed',
            'Customers ki list, order history ke sath',
          ],
        },
        {
          title: 'Google setup',
          desc: 'Taake customers aapki dukan dhoond sakein.',
          items: ['Google Search Console', 'XML sitemap', 'Google Analytics (GA4)'],
        },
      ],
      exclusions: [
        'PC builder (Multi-Branch aur Chain mein)',
        'Ek se zyada location ka stock',
        'Serial number warranty tracking',
        'Product photos aur descriptions aap dein ge; 50 se zyada products ki data entry add-on hai',
        'Online card aur wallet payments (add-on: +PKR 50,000 / $400; Multi-Branch aur Chain mein shamil)',
        'AI sales assistant (add-on: +PKR 65,000 / $650; Multi-Branch aur Chain mein shamil)',
      ],
    },
    growth: {
      name: 'Multi-Branch',
      code: '',
      badge: 'SAB SE MAQBOOL',
      pricePkr: 'PKR 550,000',
      priceUsd: '$4,850',
      delivery: '21 din',
      idealFor:
        'Established hardware aur gaming PC dukanein jo mehngi builds aur parts bechti hain, aur counter aur online dono ka stock chalati hain.',
      artifacts: [
        { title: 'PC builder', image: '/txs/RIG BUILDER.png', tag: 'PC builder' },
        { title: 'Serial aur warranty records', image: '/txs/admin warranty.png', tag: 'Warranty' },
        { title: 'Product catalogue', image: '/txs/products.png', tag: 'Catalogue' },
        { title: 'Sales dashboard', image: '/txs/dashboard.png', tag: 'Dashboard' },
      ],
      modules: [
        {
          title: 'PC builder',
          desc: 'Customer ke build karte waqt har part check.',
          items: [
            'CPU socket: AM4/AM5 vs LGA1700/LGA1851',
            'RAM type: DDR4 vs DDR5',
            'PSU wattage headroom aur GPU clearance',
            'Build WhatsApp par share, specs aur total ke sath',
          ],
        },
        {
          title: '3 locations ka stock',
          desc: 'Counters aur godam ka ek stock view.',
          items: [
            '3 locations tak (maslan Hafeez Centre, Techno City + godam)',
            'Admin mein location-wise stock',
            'Counter ya online sale par stock foran update',
          ],
        },
        {
          title: 'Serial number warranty',
          desc: 'Har GPU, motherboard aur PSU track karein.',
          items: [
            'In stock → Sold (invoice se link) → Warranty claim → Replaced',
            'Koi bhi serial seconds mein check',
            'Supplier aur customer ke jhagron ke liye saaf record',
          ],
        },
        {
          title: 'Promotions aur invoices',
          desc: 'Customers ko wapas lane ke tools.',
          items: [
            'Banners aur flash sales khud manage karein',
            'Coupon codes: percentage, fixed amount, minimum order',
            'Printable receipts aur invoices',
          ],
        },
        {
          title: 'Online payments (shamil — PKR 50,000 ki value)',
          desc: 'Prepaid orders ke liye card aur wallet checkout.',
          items: [
            'Aapki pasand ka ek gateway: PayFast, Paymob, Bank Alfalah ya Keenu',
            'Visa, Mastercard aur UnionPay',
            'JazzCash aur EasyPaisa',
            'Gateway approval aur transaction fees aapke aur gateway ke darmiyan',
          ],
        },
        {
          title: 'AI sales assistant (shamil — PKR 65,000 ki value)',
          desc: 'Aapke store par chat assistant.',
          items: [
            'Budget ke mutabiq build suggest aur compatibility check',
            'Chat se PC builder ya cart bhar deta hai',
            'Poori chat ke sath customer aapke WhatsApp par',
            'AI usage ki fee at-cost aap dete hain — hum pehle andaza bata dete hain',
          ],
        },
      ],
      exclusions: [
        '3 se zyada locations (Chain plan)',
        'FBR ya accounting/ERP integration (add-on)',
        'Alag alag staff permissions (add-on ya Chain plan)',
        'Included setup se zyada product photos aur descriptions',
        'La-mehdood revisions nahi — har milestone par 2 rounds, phir hourly',
      ],
    },
    enterprise: {
      name: 'Chain & Wholesale',
      code: '',
      badge: 'CHAINS KE LIYE',
      pricePkr: 'PKR 950,000 se shuru',
      priceUsd: '$8,500 se shuru',
      delivery: '30 din se',
      idealFor:
        'Computer retail chains, mulk bhar ke distributors aur importers jo kai branches aur godam chalate hain.',
      artifacts: [
        { title: 'Site content aur banners (CMS)', image: '/txs/admin site control.png', tag: 'CMS' },
        { title: 'Product aur stock admin', image: '/txs/dashboard products.png', tag: 'Stock' },
        { title: 'PC builder', image: '/txs/RIG BUILDER.png', tag: 'PC builder' },
        { title: 'Serial aur warranty records', image: '/txs/admin warranty.png', tag: 'Warranty' },
      ],
      modules: [
        {
          title: 'La-mehdood branches aur godam',
          desc: 'Tamam outlets ka stock.',
          items: [
            'Jitni chahein dukanein, hubs aur godam',
            'Stock transfer request — dispatch aur receipt sign-off ke sath',
            'Godam se dispatch aur counter pickup',
          ],
        },
        {
          title: 'Staff roles',
          desc: 'Har shakhs ko sirf apne kaam ki cheez nazar aaye.',
          items: [
            'Owner: munafa, margins, branch performance, settings',
            'Branch manager: local sales, staff, stock adjustment',
            'Cashier: tez billing aur receipt print',
            'Godam: stock intake aur bulk serial scanning',
          ],
        },
        {
          title: 'Content management (CMS)',
          desc: 'Baghair code ke store badlein.',
          items: [
            'Menus, pages aur announcement bars edit',
            'Brand colours aur banners',
            'Receipt aur email templates',
          ],
        },
        {
          title: 'Integrations',
          desc: 'Counter aur couriers ko jodein.',
          items: [
            'Thermal printers aur barcode scanners',
            'Courier booking aur tracking: TCS, Trax, Leopards, CallCourier',
            'FBR POS integration (Tier-1 retailers ke liye)',
          ],
        },
        {
          title: 'Payments (shamil)',
          desc: 'Zyada orders ke liye.',
          items: [
            'Ek se zyada gateway, backup ke sath',
            'Cards, Raast QR, JazzCash aur EasyPaisa',
            'Rozana payment reconciliation report',
          ],
        },
        {
          title: 'Live stock wala AI assistant (shamil)',
          desc: 'Aapke products aur branches par set.',
          items: [
            'Branch-wise live stock ke sath jawab',
            'Bulk aur corporate quotes ki requests',
            'Chats aur leads aapke admin mein',
            'Aapke brand ke mutabiq tone',
          ],
        },
      ],
      exclusions: [
        'Hardware firmware changes (alag quote)',
        'Bulk product photography aur data entry (add-on)',
        'La-mehdood revisions nahi — har milestone par 2 rounds, phir hourly',
      ],
    },
  },
}

const EXTRAS_DATA = [
  {
    en: 'Extra branch or warehouse',
    ur: 'Extra branch ya godam',
    pricePkr: '+ PKR 60,000',
    priceUsd: '+ $450',
    descEn:
      'Add another shop or godown, with its own stock, counter sales and transfers between locations.',
    descUr:
      'Ek aur dukan ya godam jodein — alag stock, counter sale aur locations ke darmiyan transfer.',
  },
  {
    en: 'Dealer & wholesale pricing',
    ur: 'Dealer aur wholesale pricing',
    pricePkr: '+ PKR 90,000',
    priceUsd: '+ $750',
    descEn:
      'Approved dealers log in to see dealer prices, minimum quantities (e.g. 5+) and their own account ledger (khata).',
    descUr:
      'Approved dealers login kar ke dealer rate, minimum quantity (maslan 5+) aur apna khata dekhte hain.',
  },
  {
    en: 'Loyalty points & gift cards',
    ur: 'Loyalty points aur gift cards',
    pricePkr: '+ PKR 70,000',
    priceUsd: '+ $550',
    descEn:
      'Customers earn points on every purchase and can pay with gift vouchers — a reason to come back.',
    descUr:
      'Har khareedari par points aur gift vouchers — wapas aane ki wajah.',
  },
  {
    en: 'Marketplace for other sellers',
    ur: 'Doosre sellers ka marketplace',
    pricePkr: '+ PKR 150,000',
    priceUsd: '+ $1,200',
    descEn:
      'Let other shops list their products on your site, and earn a commission on each sale.',
    descUr:
      'Doosri dukanein aapki site par products list karein, aur har sale par aapka commission.',
  },
  {
    en: 'Staff roles & permissions',
    ur: 'Staff roles aur permissions',
    pricePkr: '+ PKR 40,000',
    priceUsd: '+ $350',
    descEn:
      'Cashiers bill, technicians handle warranty, stock staff scan items. Purchase costs and profit stay visible to the owner only.',
    descUr:
      'Cashier bill banaye, technician warranty dekhe, stock staff scan kare. Purchase cost aur munafa sirf owner ko nazar aaye.',
  },
  {
    en: 'Product data entry (per 50 products)',
    ur: 'Product data entry (har 50 products)',
    pricePkr: '+ PKR 15,000 / 50',
    priceUsd: '+ $120 / 50',
    descEn:
      'We clean photos, write specs and upload your products in batches of 50.',
    descUr:
      'Hum photos saaf karte hain, specs likhte hain aur 50 ke batch mein products upload karte hain.',
  },
  {
    en: 'Courier integration',
    ur: 'Courier integration',
    pricePkr: '+ PKR 50,000',
    priceUsd: '+ $400',
    descEn:
      "Book TCS, Trax, Leopards or PostEx from the admin, and send the tracking link to the customer's WhatsApp.",
    descUr:
      'Admin se TCS, Trax, Leopards ya PostEx book karein, aur tracking link customer ke WhatsApp par.',
  },
  {
    en: 'Online card & wallet payments',
    ur: 'Online card aur wallet payments',
    pricePkr: '+ PKR 50,000',
    priceUsd: '+ $400',
    starterOnly: true,
    descEn:
      'Accept cards, JazzCash and EasyPaisa on your site. Included in Multi-Branch and Chain.',
    descUr:
      'Website par cards, JazzCash aur EasyPaisa. Multi-Branch aur Chain mein shamil.',
  },
  {
    en: 'AI sales assistant',
    ur: 'AI sales assistant',
    pricePkr: '+ PKR 65,000',
    priceUsd: '+ $650',
    starterOnly: true,
    descEn:
      'Suggests parts by budget, checks compatibility, and passes the chat to your WhatsApp. Included in Multi-Branch and Chain.',
    descUr:
      'Budget ke mutabiq parts suggest, compatibility check, aur chat aapke WhatsApp par. Multi-Branch aur Chain mein shamil.',
  },
  {
    en: 'FBR or accounting integration',
    ur: 'FBR ya accounting integration',
    pricePkr: '+ PKR 80,000',
    priceUsd: '+ $650',
    descEn:
      "Connect your counter to FBR's POS invoicing, or sync sales to QuickBooks, Zoho or Xero.",
    descUr:
      'Counter ko FBR POS invoicing se jodein, ya sales QuickBooks, Zoho ya Xero mein sync karein.',
  },
]

// Regular prices, shown struck through next to each plan price (keep in sync with /solutions)
const COMPARE_PRICES = {
  starter: { usd: '$2,950', pkr: 'PKR 340,000' },
  growth: { usd: '$5,800', pkr: 'PKR 660,000' },
  enterprise: { usd: '$10,200', pkr: 'PKR 1,140,000' },
}

export default function TechRetailSolution() {
  const { lang, setLang, isUrdu } = useLanguage()
  const [currency, setCurrency] = useState(detectInitialCurrency)
  // PKR is only offered in Pakistan, so everyone else sees USD with no toggle
  const showCurrencyToggle = allowedCurrencies(CURRENCIES).length > 1
  const [activeModalKey, setActiveModalKey] = useState(null)
  const [expandedExtra, setExpandedExtra] = useState(null)
  const t = I18N_DATA[lang] || I18N_DATA.en
  const activePlan = activeModalKey
    ? (PLANS_DETAIL[lang] || PLANS_DETAIL.en)[activeModalKey]
    : null

  const handleCurrencyChange = (newCurr) => {
    setCurrency(newCurr)
    try {
      localStorage.setItem('texcodes_currency', newCurr)
    } catch (e) {}
  }

  const toggleExtra = (index) => {
    setExpandedExtra((prev) => (prev === index ? null : index))
  }

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
                  ? 'Multi-Branch aur Chain mein shamil'
                  : 'Included in Multi-Branch & Chain'}
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
                  {isUrdu ? '(Sirf Single Store)' : '(Single Store only)'}
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
                      ? '✓ Multi-Branch aur Chain plans mein baghair izafi qeemat shamil.'
                      : '✓ Included in Multi-Branch and Chain at no extra cost.'}
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
          `Assalam o Alaikum TeXCodes, mujhe apni computer/CCTV dukan ke liye ${planName} (${price}) plan mein dilchaspi hai. Kya demo ho sakta hai?`
        )
      : encodeURIComponent(
          `Hello TeXCodes, I'm interested in the ${planName} (${price}) plan for my computer/CCTV shop. Can we schedule a demo?`
        )
    window.open(`https://wa.me/923091824000?text=${text}`, '_blank')
  }

  return (
    <div className="w-full bg-[#F6F5F0] dark:bg-[#0F0F11] min-h-screen text-[#0F0F0F] dark:text-[#EDECE6] transition-colors duration-200">
      {/* ─── Plan Detail Modal (Bilingual: English & Roman Urdu) ─── */}
      <PlanDetailModal
        plan={activePlan}
        lang={lang}
        currency={currency}
        compare={activeModalKey ? (currency === 'USD' ? COMPARE_PRICES[activeModalKey].usd : COMPARE_PRICES[activeModalKey].pkr) : null}
        onClose={() => setActiveModalKey(null)}
        onOpenWhatsApp={(name, price) => openWhatsApp(name, price)}
      />

      {/* ─── Top Language & Currency Bar ─── */}
      <div className="border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#161619] px-4 sm:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between offer-ui flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]" />
            <span className="text-[#0F0F0F] dark:text-[#EDECE6] font-bold uppercase tracking-wider hidden sm:inline">
              TEXCODES · TECH RETAIL OS
            </span>
            <span className="text-[#0F0F0F] dark:text-[#EDECE6] font-bold uppercase tracking-wider sm:hidden">
              RETAIL OS
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Currency Selector (only when PKR is available, i.e. visitors in Pakistan) */}
            {showCurrencyToggle && (
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
            )}

            {showCurrencyToggle && <span className="text-[rgba(15,15,15,0.2)] dark:text-[rgba(255,255,255,0.2)]">|</span>}

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
            <a href="#plans" className="btn-blue offer-btn offer-btn-xl shadow-sm group relative overflow-hidden">
              <span className="relative z-10">{t.cta_primary}</span>
              <ArrowRight size={14} className="relative z-10 arrow-slide" />
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none animate-shimmer-sweep" />
            </a>
            <a
              href="https://store-demo-eight.vercel.app/?mode=pc"
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

            <StaggerItem className="p-6 bg-[#ECFDF5] dark:bg-[#10B981]/10 border-2 border-[#059669] dark:border-[#10B981] space-y-3 card-hover-guided sm:col-span-2 lg:col-span-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-[#059669] dark:text-[#10B981] offer-ui">{t.arch_07_title}</span>
                <span className="offer-eyebrow bg-[#059669] dark:bg-[#10B981] text-white px-2 py-0.5 font-bold">
                  {isUrdu ? 'MULTI-BRANCH AUR CHAIN PLANS' : 'MULTI-BRANCH & CHAIN PLANS'}
                </span>
              </div>
              <p className="offer-ui text-[#0F0F0F] dark:text-[#EDECE6] font-medium">
                {t.arch_07_desc}
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
                href="https://store-demo-eight.vercel.app/?mode=pc"
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
                href="https://store-demo-eight.vercel.app/pc-builder?mode=pc"
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
                href="https://store-demo-eight.vercel.app/admin/dashboard"
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
                to="/solutions/terms"
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
              {isUrdu ? 'Plan chunein' : 'Choose a plan'}
            </span>
            <span className="text-[#8E8D88] dark:text-[#6A6965]">→</span>
            <span className="flex items-center gap-1.5 text-[#059669] dark:text-[#10B981] font-bold">
              <span className="w-5 h-5 rounded-full border border-[#059669] dark:border-[#10B981] flex items-center justify-center offer-ui">2</span>
              {isUrdu ? 'Scope dekhein' : 'See the scope'}
            </span>
            <span className="text-[#8E8D88] dark:text-[#6A6965]">→</span>
            <span className="flex items-center gap-1.5 text-[#059669] dark:text-[#10B981] font-bold">
              <span className="w-5 h-5 rounded-full border border-[#059669] dark:border-[#10B981] flex items-center justify-center offer-ui">3</span>
              {isUrdu ? 'Call book karein' : 'Book a call'}
            </span>
          </FadeIn>

          {/* Currency Toggle Ribbon directly above plan tiers */}
          <FadeIn direction="up" delay={0.05} className="flex flex-col items-center justify-center gap-2 pt-2 pb-2">
            {showCurrencyToggle && (
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
            )}
            <div className="offer-eyebrow text-[#8E8D88] dark:text-[#6A6965] text-center">
              {currency === 'USD'
                ? isUrdu
                  ? 'Prices USD mein'
                  : 'Prices in USD'
                : isUrdu
                ? 'Prices PKR mein (Pakistan ke karobar ke liye)'
                : 'Prices in PKR (for businesses in Pakistan)'}
            </div>
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
                  <div className="offer-h3 text-[#0F0F0F] dark:text-[#EDECE6]">
                    <ComparePrice value={currency === 'USD' ? COMPARE_PRICES.starter.usd : COMPARE_PRICES.starter.pkr} isUrdu={isUrdu} />
                    {currency === 'USD' ? t.starter_price_usd : t.starter_price_pkr}
                  </div>
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
                    <div className="offer-h3 text-[#059669] dark:text-[#10B981]">
                      <ComparePrice value={currency === 'USD' ? COMPARE_PRICES.growth.usd : COMPARE_PRICES.growth.pkr} isUrdu={isUrdu} />
                      {currency === 'USD' ? t.growth_price_usd : t.growth_price_pkr}
                    </div>
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

            {/* 3. Chain and Distribution OS */}
            <StaggerItem className="h-full">
              <div className="p-8 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-6 flex flex-col justify-between hover:border-[#059669] dark:hover:border-[#10B981] transition-colors h-full card-hover-guided">
                <div className="space-y-4">
                  <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] offer-ui">{t.enterprise_name}</div>
                  <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">
                    {t.enterprise_desc}
                  </p>

                  <div className="pt-2 border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)]">
                    <div className="offer-h3 text-[#0F0F0F] dark:text-[#EDECE6]">
                      <ComparePrice value={currency === 'USD' ? COMPARE_PRICES.enterprise.usd : COMPARE_PRICES.enterprise.pkr} isUrdu={isUrdu} />
                      {currency === 'USD' ? t.enterprise_price_usd : t.enterprise_price_pkr}
                    </div>
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

          {/* Delivery footnote & build capacity */}
          <FadeIn direction="up" className="text-center offer-body text-[#575652] dark:text-[#9B9A95] max-w-2xl mx-auto space-y-2">
            <p className="offer-ui">
              {isUrdu
                ? '*Din us waqt se gine jate hain jab aapka content aur pehli payment humein mil jaye. Delivery date contract mein likhi hoti hai. Agar der hamari taraf se ho, to har hafte ki der par ek mahina Care Plan muft.'
                : "*Counted from the day we receive your content and first payment. The delivery date is written into your contract. If we're late, you get one free month of Care Plan for each week of delay."}
            </p>
            <p>
              {isUrdu
                ? 'Hum har mahine mehdood projects lete hain taake har project ko poora waqt mile. Agli start date ke liye message karein.'
                : 'We take on a limited number of builds each month so every project gets full attention. Message us for the next available start date.'}
            </p>
          </FadeIn>

          {/* Extras menu */}
          <FadeIn direction="up" className="bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] p-6 sm:p-8 space-y-5">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold">
                  ADD-ONS
                </div>
                <div className="offer-ui text-[#059669] dark:text-[#10B981] flex items-center gap-1 font-medium bg-[#ECFDF5] dark:bg-[#10B981]/15 px-2 py-0.5 rounded border border-[#059669]/25">
                  <ChevronDown size={12} className="shrink-0" />
                  <span>{isUrdu ? 'Tafseel ke liye tap karein' : 'Tap an add-on for details'}</span>
                </div>
              </div>
              <h3 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
                {isUrdu ? 'Sirf zaroorat ki cheez add karein' : 'Add only what you need'}
              </h3>
              <p className="offer-body text-[#575652] dark:text-[#9B9A95] max-w-3xl">
                {isUrdu
                  ? 'Har plan ki ek fixed price. Add-ons ki qeemat pehle se tay aur invoice par alag likhi hoti hai.'
                  : 'Every plan has one fixed price. Add-ons are priced upfront and listed separately on your invoice.'}
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
                  {colIndices.map((idx) => renderExtraCard(EXTRAS_DATA[idx], idx))}
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
                ? 'Tamam add-on prices fixed hain. Kaam shuru hone se pehle final scope likh kar confirm hota hai.'
                : 'All add-on prices are fixed. The final scope is confirmed in writing before work starts.'}
            </p>
          </FadeIn>

          {/* Care Plan */}
          <FadeIn direction="up" className="space-y-5">
            <div className="text-center space-y-2">
              <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold">
                {isUrdu ? 'LAUNCH KE BAAD' : 'AFTER LAUNCH'}
              </div>
              <h3 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
                {isUrdu ? 'Care Plans: store hum chalta rakhte hain' : 'Care Plans: we keep your store running'}
              </h3>
              <p className="offer-body text-[#575652] dark:text-[#9B9A95] max-w-2xl mx-auto">
                {isUrdu
                  ? 'Har build ke sath 30 din ki warranty. Us ke baad Care Plan mein hosting, backups, updates aur support. Yeh ikhtiyari hai — code aapka hai, aap khud bhi host kar sakte hain.'
                  : "Every build includes a 30-day warranty. After that, a Care Plan covers hosting, backups, updates and support. It's optional — you own the code, so you can also host it yourself."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Basic Care', pricePkr: 'PKR 14,000 / mo', priceUsd: '$140 / mo', en: ['Hosting and SSL', 'Daily backups', 'Uptime monitoring', 'Small text and image edits', 'Email support'], ur: ['Hosting aur SSL', 'Rozana backups', 'Uptime monitoring', 'Chhoti text aur image edits', 'Email support'] },
                { name: 'Growth Care', pricePkr: 'PKR 28,000 / mo', priceUsd: '$280 / mo', en: ['Everything in Basic', 'Priority support — reply within 4 business hours', 'Small monthly feature changes', 'Hosting for multiple branches', 'WhatsApp support'], ur: ['Basic ka sab kuch', 'Priority support — 4 business hours mein jawab', 'Mahana chhoti feature changes', 'Multi-branch hosting', 'WhatsApp support'] },
                { name: 'Enterprise Care', pricePkr: 'PKR 55,000 / mo', priceUsd: '$550 / mo', en: ['Everything in Growth', 'Dedicated engineer hours each month', 'Integration and API support', '99.5% uptime target', 'Phone support'], ur: ['Growth ka sab kuch', 'Har mahine dedicated engineer hours', 'Integration aur API support', '99.5% uptime target', 'Phone support'] },
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
              to="/solutions/terms"
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
            {isUrdu ? 'CHALANE KA KHARCHA' : 'RUNNING COSTS'}
          </div>
          <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
            {isUrdu ? 'Ek dafa payment. Us ke baad koi commission nahi.' : 'Pay once. No commission after that.'}
          </h2>
          <p className="offer-body text-[#575652] dark:text-[#9B9A95]">
            {isUrdu
              ? 'Marketplaces aur kiraye ke store platforms har mahine fee ya har order par hissa lete hain — jab tak aap bechte rahein. Yahan aap build ki payment ek dafa karte hain. Launch ke baad kharcha sirf hosting aur payment gateway ki standard fee.'
              : "Marketplaces and rented store platforms charge a monthly fee or take a cut of every order, for as long as you sell. Here you pay for the build once. After launch, your running costs are hosting and your payment gateway's standard fees."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {[
              { big: currency === 'USD' ? '$0' : 'PKR 0', en: 'monthly platform fee after launch', ur: 'launch ke baad mahana platform fee' },
              { big: '0%', en: 'commission to us', ur: 'hamara commission' },
              { big: '100%', en: 'your code and data', ur: 'code aur data aapka' },
            ].map((s, i) => (
              <div key={i} className="bg-[#FAF9F5] dark:bg-[#161619] border border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] p-5 space-y-1">
                <div className="offer-h2 text-[#059669] dark:text-[#10B981]">{s.big}</div>
                <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{isUrdu ? s.ur : s.en}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OfferFAQ lang={lang} />

      {/* ─── Real builds / proof ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#121215]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold">
              {isUrdu ? 'HAMARA KAAM' : 'OUR WORK'}
            </div>
            <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
              {isUrdu ? 'Hamare banaye hue systems' : "Systems we've built"}
            </h2>
            <p className="offer-body text-[#575652] dark:text-[#9B9A95]">
              {isUrdu
                ? 'Koi banawati testimonials nahi. Neeche diye systems khol kar khud test karein.'
                : 'No made-up testimonials. Open the systems below and test them yourself.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {projectsData
              .filter((p) => [7, 9, 6].includes(p.id))
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
            <Link to="/work" className="offer-ui font-semibold text-[#059669] dark:text-[#10B981] hover:underline">
              {isUrdu ? 'Tamam projects dekhein →' : 'See all projects →'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
