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
import OfferFAQ from '../../components/OfferFAQ'
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
    hero_badge: 'LAPTOP RETAIL OS · FOR LAPTOP & ACCESSORIES SHOPS',
    hero_title_1: 'Sell more laptops online.',
    hero_title_accent: 'Answer fewer "price?" messages.',
    hero_title_2: '',
    hero_sub:
      'A store built for new, used and imported laptop dealers. Every listing shows grade, battery health and price upfront. Customers choose RAM and SSD upgrades themselves, and stock stays in sync across your branches. Live in 10–30 days, and the code is yours.',
    cta_primary: 'See plans & pricing',
    cta_secondary: 'Try the live demo',
    metrics_code: 'Code, data and domain handed over',
    metrics_tax: 'No cut from your sales, ever',
    metrics_speed: 'Tested health and grade on every listing',
    metrics_rma: 'Every laptop tracked by serial number',
    metrics_code_top: 'YOU OWN IT',
    metrics_tax_top: '0% COMMISSION',
    metrics_speed_top: 'BATTERY % SHOWN',
    metrics_rma_top: 'SERIAL WARRANTY',

    // How we work
    ultimatum_badge: 'HOW WE WORK',
    ultimatum_title: 'You see it working before you pay in full',
    ultimatum_sub:
      'Payments follow milestones. The final balance is due only after you approve your store on a private link, with your own laptops.',
    ultimatum_best_tag: 'WHAT YOU GET',
    ultimatum_best_title: 'A store built around how you sell',
    ultimatum_best_p1: 'An online store with your laptops, grades and branches.',
    ultimatum_best_p2: 'RAM and SSD upgrade options with instant pricing.',
    ultimatum_best_p3: 'Battery health and condition shown before customers message you.',
    ultimatum_best_p4: 'Shop counter, testing bench and warehouse share one stock count.',
    ultimatum_best_p5: 'No platform fee, no commission, full code handover.',
    ultimatum_best_footer: 'Designed to cut repeat questions and "is it still available?" messages.',

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
      'We set up your store with your real laptops on a private staging link. You test the storefront, upgrade options and stock sync yourself. The final payment is due only after you approve it.',

    arch_badge: "WHAT'S INCLUDED",
    arch_title: 'One system for your shop, testing bench and website',
    arch_sub:
      'Your storefront, testing bench, counters and WhatsApp orders all run on the same data.',
    arch_01_title: '01. CONDITION & GRADE',
    arch_01_desc:
      'Label every unit: Brand New, Open Box, Grade A+, A or B, with photos and a testing checklist.',
    arch_02_title: '02. RAM & SSD UPGRADES',
    arch_02_desc:
      'Customers pick upgrades (e.g. 16GB → 32GB, 512GB → 1TB) and the price updates instantly.',
    arch_03_title: '03. BATTERY HEALTH',
    arch_03_desc:
      'Show tested battery health % and backup time on every listing.',
    arch_04_title: '04. BRANCH STOCK',
    arch_04_desc:
      'Shops (e.g. Hafeez Centre, Techno City), testing bench and warehouse in one stock view.',
    arch_05_title: '05. SERIAL & WARRANTY',
    arch_05_desc:
      "Record each laptop's serial number and battery health on the invoice, so warranty claims are clear.",
    arch_06_title: '06. WHATSAPP ORDERS',
    arch_06_desc:
      'Orders arrive with the exact model, specs, upgrades and branch.',
    arch_07_title: '07. AI LAPTOP FINDER',
    arch_07_desc:
      'Customers describe their use (office, coding, design, gaming) and budget; the assistant suggests laptops you have in stock.',

    plans_badge: 'PLANS & PRICING',
    plans_title: 'Laptop Retail plans',
    plans_sub: 'One fixed price per plan. No commission. Full handover when complete.',
    plans_sub_suffix: "Open any plan to see the full scope, what's excluded, and screenshots.",
    detail_btn: 'See full scope & screenshots →',

    starter_name: 'Single Store',
    starter_badge: '1 SHOP',
    starter_desc: 'For an independent laptop or accessories shop starting to sell online.',
    starter_price_pkr: 'PKR 250,000',
    starter_price_usd: '$2,250',
    starter_delivery: 'Live in 10 days*',
    starter_support_pkr: 'Optional Care Plan: PKR 14,000 / month',
    starter_support_usd: 'Optional Care Plan: $140 / month',
    starter_callout_label: 'BEST FOR',
    starter_callout_text: 'Getting online fast, with upgrade options and battery badges from day one.',
    starter_f1: 'Online store — we load your first 100 products',
    starter_f2: 'RAM & SSD upgrade options',
    starter_f3: 'Grade and battery health on every listing',
    starter_f4: 'Orders sent to your WhatsApp',

    growth_name: 'Multi-Branch',
    growth_badge: 'MOST POPULAR',
    growth_desc:
      'For established dealers of used, imported and gaming laptops with more than one location.',
    growth_price_pkr: 'PKR 490,000',
    growth_price_usd: '$4,450',
    growth_delivery: 'Live in 21 days*',
    growth_support_pkr: 'Optional Care Plan: PKR 28,000 / month',
    growth_support_usd: 'Optional Care Plan: $280 / month',
    growth_callout_label: 'EVERYTHING IN SINGLE STORE, PLUS',
    growth_callout_text:
      'Stock across 3 locations, serial and battery warranty tracking, accessory suggestions, online payments and an AI laptop finder.',
    growth_f1: 'Stock synced across 3 locations (shop, testing bench, warehouse)',
    growth_f2: 'Serial number & battery warranty tracking',
    growth_f3: 'Accessory suggestions at checkout (bags, docks, chargers)',
    growth_f4: 'Banners and flash sales',
    growth_f5_pkr: 'Card & wallet payments — included (PKR 50,000 value)',
    growth_f5_usd: 'Card & wallet payments — included ($400 value)',
    growth_f6_pkr: 'AI laptop finder — included (PKR 65,000 value)',
    growth_f6_usd: 'AI laptop finder — included ($650 value)',

    enterprise_name: 'Chain & Wholesale',
    enterprise_badge: 'FOR CHAINS',
    enterprise_desc:
      'For importers, distributors and chains selling to shops, offices and institutions.',
    enterprise_price_pkr: 'From PKR 850,000',
    enterprise_price_usd: 'From $7,900',
    enterprise_delivery: 'From 30 days — fixed in your scope document',
    enterprise_support_pkr: 'Dedicated Care Plan: PKR 55,000 / month',
    enterprise_support_usd: 'Dedicated Care Plan: $550 / month',
    enterprise_callout_label: 'EVERYTHING IN MULTI-BRANCH, PLUS',
    enterprise_callout_text:
      'Unlimited branches, corporate bulk quotes, container spreadsheet import, staff roles and ERP/POS integration.',
    enterprise_f1: 'Unlimited branches and warehouses',
    enterprise_f2: 'Corporate quotes and invoices (5–50 units)',
    enterprise_f3: "Import a container's stock from a spreadsheet",
    enterprise_f4: 'Staff roles: owner, sales, cashier, technician',
    enterprise_f5: 'Multiple payment gateways — included',
    enterprise_f6: 'AI assistant with live stock — included',

    whatsapp_cta: 'Discuss this plan on WhatsApp',
    view_terms: 'Read the scope, payment and warranty terms →',

    // Live demo
    demo_badge: 'LIVE DEMO',
    demo_title: 'Try it yourself',
    demo_sub:
      'A working demo with sample laptops. Your version uses your stock, branches and branding.',
    demo_store_title: '1. Laptop store',
    demo_store_desc:
      'Browse business, gaming and MacBook listings with grade and battery health.',
    demo_filter_title: '2. All laptops',
    demo_filter_desc: 'Browse the full range and filter by specs.',
    demo_admin_title: '3. Admin panel',
    demo_admin_desc: 'One-click demo login. See stock by branch, orders and serial numbers.',
  },
  'ur-en': {
    hero_badge: 'LAPTOP RETAIL OS · LAPTOP AUR ACCESSORIES DUKANON KE LIYE',
    hero_title_1: 'Online zyada laptops bechein.',
    hero_title_accent: '"Price?" wale messages kam.',
    hero_title_2: '',
    hero_sub:
      'Naye, used aur imported laptop dealers ke liye store. Har listing par grade, battery health aur price pehle se. Customer RAM aur SSD upgrade khud chunta hai, aur tamam branches ka stock sync rehta hai. 10–30 din mein live, aur code aapka.',
    cta_primary: 'Plans aur prices dekhein',
    cta_secondary: 'Live demo try karein',
    metrics_code: 'Code, data aur domain aapke hawale',
    metrics_tax: 'Aapki sales mein se koi hissa nahi',
    metrics_speed: 'Har listing par tested health aur grade',
    metrics_rma: 'Har laptop serial number se track',
    metrics_code_top: 'MALKIAT AAPKI',
    metrics_tax_top: '0% COMMISSION',
    metrics_speed_top: 'BATTERY % NAZAR',
    metrics_rma_top: 'SERIAL WARRANTY',

    // How we work
    ultimatum_badge: 'HUM KAISE KAAM KARTE HAIN',
    ultimatum_title: 'Poori payment se pehle system chalta hua dekhein',
    ultimatum_sub:
      'Payment milestones ke sath hoti hai. Aakhri raqam tab, jab aap private link par apne laptops ke sath store approve kar dein.',
    ultimatum_best_tag: 'AAPKO KYA MILTA HAI',
    ultimatum_best_title: 'Aapke kaam ke mutabiq bana store',
    ultimatum_best_p1: 'Aapke laptops, grades aur branches ke sath online store.',
    ultimatum_best_p2: 'RAM aur SSD upgrade options, foran price.',
    ultimatum_best_p3: 'Customer ke message se pehle hi battery health aur condition nazar.',
    ultimatum_best_p4: 'Dukan, testing bench aur godam ka ek hi stock.',
    ultimatum_best_p5: 'Na platform fee, na commission, poora code aapka.',
    ultimatum_best_footer: 'Baar baar ke sawal aur "available hai?" wale messages kam karne ke liye.',

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
      'Hum aapka store aapke asli laptops ke sath private staging link par set karte hain. Storefront, upgrade options aur stock sync aap khud test karte hain. Aakhri payment sirf aapki approval ke baad.',

    arch_badge: 'KYA SHAMIL HAI',
    arch_title: 'Dukan, testing bench aur website — ek system',
    arch_sub:
      'Storefront, testing bench, counters aur WhatsApp orders sab ek hi data par.',
    arch_01_title: '01. CONDITION AUR GRADE',
    arch_01_desc:
      'Har unit par label: Brand New, Open Box, Grade A+, A ya B — photos aur testing checklist ke sath.',
    arch_02_title: '02. RAM AUR SSD UPGRADES',
    arch_02_desc:
      'Customer upgrade chunta hai (maslan 16GB → 32GB, 512GB → 1TB) aur price foran update.',
    arch_03_title: '03. BATTERY HEALTH',
    arch_03_desc:
      'Har listing par tested battery health % aur backup time.',
    arch_04_title: '04. BRANCH STOCK',
    arch_04_desc:
      'Dukanein (maslan Hafeez Centre, Techno City), testing bench aur godam — ek stock view.',
    arch_05_title: '05. SERIAL AUR WARRANTY',
    arch_05_desc:
      'Har laptop ka serial number aur battery health invoice par, taake warranty claim saaf rahe.',
    arch_06_title: '06. WHATSAPP ORDERS',
    arch_06_desc:
      'Orders exact model, specs, upgrades aur branch ke sath.',
    arch_07_title: '07. AI LAPTOP FINDER',
    arch_07_desc:
      'Customer apna kaam (office, coding, design, gaming) aur budget batata hai; assistant aapke stock mein se laptops suggest karta hai.',

    plans_badge: 'PLANS AUR PRICES',
    plans_title: 'Laptop Retail plans',
    plans_sub: 'Har plan ki ek fixed price. Koi commission nahi. Mukammal hone par poora handover.',
    plans_sub_suffix: 'Poora scope, kya shamil nahi, aur screenshots dekhne ke liye plan kholein.',
    detail_btn: 'Poora scope aur screenshots dekhein →',

    starter_name: 'Single Store',
    starter_badge: '1 DUKAN',
    starter_desc: 'Ek laptop ya accessories dukan ke liye jo online bechna shuru kar rahi hai.',
    starter_price_pkr: 'PKR 250,000',
    starter_price_usd: '$2,250',
    starter_delivery: '10 din mein live*',
    starter_support_pkr: 'Ikhtiyari Care Plan: PKR 14,000 / mahana',
    starter_support_usd: 'Ikhtiyari Care Plan: $140 / mahana',
    starter_callout_label: 'KIS KE LIYE BEHTAR',
    starter_callout_text: 'Jaldi online aana — pehle din se upgrade options aur battery badges.',
    starter_f1: 'Online store — pehle 100 products hum daalte hain',
    starter_f2: 'RAM aur SSD upgrade options',
    starter_f3: 'Har listing par grade aur battery health',
    starter_f4: 'Orders aapke WhatsApp par',

    growth_name: 'Multi-Branch',
    growth_badge: 'SAB SE MAQBOOL',
    growth_desc:
      'Used, imported aur gaming laptops ke established dealers ke liye jin ki ek se zyada location hai.',
    growth_price_pkr: 'PKR 490,000',
    growth_price_usd: '$4,450',
    growth_delivery: '21 din mein live*',
    growth_support_pkr: 'Ikhtiyari Care Plan: PKR 28,000 / mahana',
    growth_support_usd: 'Ikhtiyari Care Plan: $280 / mahana',
    growth_callout_label: 'SINGLE STORE KA SAB KUCH, AUR',
    growth_callout_text:
      '3 locations ka stock, serial aur battery warranty tracking, accessories suggestions, online payments aur AI laptop finder.',
    growth_f1: '3 locations ka stock sync (dukan, testing bench, godam)',
    growth_f2: 'Serial number aur battery warranty tracking',
    growth_f3: 'Checkout par accessories suggestions (bags, docks, chargers)',
    growth_f4: 'Banners aur flash sales',
    growth_f5_pkr: 'Card aur wallet payments — shamil (PKR 50,000 ki value)',
    growth_f5_usd: 'Card aur wallet payments — shamil ($400 ki value)',
    growth_f6_pkr: 'AI laptop finder — shamil (PKR 65,000 ki value)',
    growth_f6_usd: 'AI laptop finder — shamil ($650 ki value)',

    enterprise_name: 'Chain & Wholesale',
    enterprise_badge: 'CHAINS KE LIYE',
    enterprise_desc:
      'Importers, distributors aur chains ke liye jo dukanon, offices aur idaron ko bechte hain.',
    enterprise_price_pkr: 'PKR 850,000 se shuru',
    enterprise_price_usd: '$7,900 se shuru',
    enterprise_delivery: '30 din se — final date scope document mein',
    enterprise_support_pkr: 'Dedicated Care Plan: PKR 55,000 / mahana',
    enterprise_support_usd: 'Dedicated Care Plan: $550 / mahana',
    enterprise_callout_label: 'MULTI-BRANCH KA SAB KUCH, AUR',
    enterprise_callout_text:
      'La-mehdood branches, corporate bulk quotes, container spreadsheet import, staff roles aur ERP/POS integration.',
    enterprise_f1: 'La-mehdood branches aur godam',
    enterprise_f2: 'Corporate quotes aur invoices (5–50 units)',
    enterprise_f3: 'Container ka stock spreadsheet se import',
    enterprise_f4: 'Staff roles: owner, sales, cashier, technician',
    enterprise_f5: 'Ek se zyada payment gateways — shamil',
    enterprise_f6: 'Live stock wala AI assistant — shamil',

    whatsapp_cta: 'Is plan par WhatsApp par baat karein',
    view_terms: 'Scope, payment aur warranty ki sharaait parhein →',

    // Live demo
    demo_badge: 'LIVE DEMO',
    demo_title: 'Khud chala kar dekhein',
    demo_sub:
      'Sample laptops ke sath chalta hua demo. Aapka version aapke stock, branches aur branding ke sath.',
    demo_store_title: '1. Laptop store',
    demo_store_desc:
      'Business, gaming aur MacBook listings — grade aur battery health ke sath.',
    demo_filter_title: '2. Tamam laptops',
    demo_filter_desc: 'Poori range dekhein aur specs se filter karein.',
    demo_admin_title: '3. Admin panel',
    demo_admin_desc: 'Ek click demo login. Branch-wise stock, orders aur serial numbers.',
  },
}

const LAPTOP_PLANS_DETAIL = {
  en: {
    starter: {
      name: 'Single Store',
      code: '',
      badge: 'SINGLE STORE',
      pricePkr: 'PKR 250,000',
      priceUsd: '$2,250',
      delivery: '10 days',
      idealFor:
        'Independent laptop dealers and accessories shops starting to sell online, with orders coming to WhatsApp.',
      artifacts: [
        { title: 'Storefront', image: '/txs/home.png', tag: 'Storefront' },
        { title: 'Product catalogue', image: '/txs/products.png', tag: 'Catalogue' },
      ],
      modules: [
        {
          title: 'Laptop store (first 100 products loaded)',
          desc: 'A fast store for business, gaming and MacBook listings.',
          items: [
            'Filter by processor (Intel Core 8th–14th gen, Ryzen, Apple M-series)',
            'Condition filters: Brand New, Open Box, Grade A+',
            'Search by specs, screen size and GPU',
            'Mobile-first, for quick WhatsApp orders',
          ],
        },
        {
          title: 'RAM & SSD upgrade options',
          desc: 'Customers upgrade any model and see the new price instantly.',
          items: [
            'RAM: e.g. 8GB → 16GB → 32GB',
            'Storage: e.g. 256GB → 512GB → 1TB NVMe',
            'Order summary updates with the chosen upgrades',
          ],
        },
        {
          title: 'Grade & battery health',
          desc: "Answer the top two questions before they're asked.",
          items: [
            'Battery health % and tested backup time (e.g. 4–5 hours)',
            'Clear condition grades instead of endless photo requests',
            'Charger and warranty terms on every listing',
          ],
        },
        {
          title: 'Full ownership',
          desc: 'Everything is transferred to you on final payment.',
          items: [
            'Private GitHub repository',
            'Your own database with admin access',
            '0% commission on your sales',
          ],
        },
      ],
      exclusions: [
        'Stock across more than one location (Multi-Branch plan)',
        'Serial number and battery warranty tracking',
        'Online card and wallet payments (add-on: +PKR 50,000 / $400; included in Multi-Branch & Chain)',
        'AI laptop finder (add-on: +PKR 65,000 / $650; included in Multi-Branch & Chain)',
        'Photos and data entry beyond the first 100 products',
      ],
    },
    growth: {
      name: 'Multi-Branch',
      code: '',
      badge: 'MOST POPULAR',
      pricePkr: 'PKR 490,000',
      priceUsd: '$4,450',
      delivery: '21 days',
      idealFor:
        'Established laptop dealers, refurbished ThinkPad/MacBook specialists and gaming laptop shops with stock at the counter, testing bench and online.',
      artifacts: [
        { title: 'Serial & warranty records', image: '/txs/admin warranty.png', tag: 'Warranty' },
        { title: 'Product & stock admin', image: '/txs/dashboard products.png', tag: 'Stock' },
        { title: 'Sales dashboard', image: '/txs/dashboard.png', tag: 'Dashboard' },
      ],
      modules: [
        {
          title: 'Stock across 3 locations',
          desc: 'One stock view for counter, testing bench and warehouse.',
          items: [
            'Up to 3 locations (e.g. Hafeez Centre shop, testing counter, warehouse)',
            'Stock of every model by location',
            'Counter and online sales update stock instantly',
          ],
        },
        {
          title: 'Serial & battery warranty',
          desc: 'Every laptop tracked from intake to invoice.',
          items: [
            'In stock → Sold (linked to invoice) → Warranty claim → Replaced',
            'Battery health recorded at the time of sale',
            'Check warranty by serial number in seconds',
          ],
        },
        {
          title: 'Accessory suggestions',
          desc: 'Offer the right extras at checkout.',
          items: [
            'Bags, mice, USB-C docks and spare chargers',
            'One tap to add to the order',
          ],
        },
        {
          title: 'Online payments (included — PKR 50,000 value)',
          desc: 'Card and wallet checkout for prepaid orders.',
          items: [
            'Visa, Mastercard and UnionPay',
            'JazzCash, EasyPaisa and bank transfer',
            'Gateway approval and transaction fees are between you and your gateway',
          ],
        },
        {
          title: 'AI laptop finder (included — PKR 65,000 value)',
          desc: 'A chat assistant that matches needs and budget to your stock.',
          items: [
            'Set up with processors, RAM, battery life and GPUs',
            'Answers budget questions (e.g. "best laptop for coding")',
            'Fills the cart and hands the chat to your WhatsApp',
            'AI usage fees are paid at cost; we estimate them upfront',
          ],
        },
      ],
      exclusions: [
        'More than 3 locations (Chain plan)',
        'Corporate bulk quotes and container import (Chain plan)',
        'POS/ERP integration (Chain plan)',
        'Separate staff permission levels (add-on or Chain plan)',
      ],
    },
    enterprise: {
      name: 'Chain & Wholesale',
      code: '',
      badge: 'FOR CHAINS',
      pricePkr: 'From PKR 850,000',
      priceUsd: 'From $7,900',
      delivery: 'From 30 days',
      idealFor:
        'High-volume importers, nationwide refurbished distributors and multi-branch chains selling to shops and offices.',
      artifacts: [
        { title: 'Site content & banners (CMS)', image: '/txs/admin site control.png', tag: 'CMS' },
        { title: 'Product & stock admin', image: '/txs/dashboard products.png', tag: 'Stock' },
        { title: 'Serial & warranty records', image: '/txs/admin warranty.png', tag: 'Warranty' },
      ],
      modules: [
        {
          title: 'Unlimited branches & warehouses',
          desc: 'Stock across every outlet and hub.',
          items: [
            'Any number of shops, testing benches and warehouses',
            'Stock transfer requests with dispatch and receipt sign-off',
            'Warehouse dispatch and counter pickup',
          ],
        },
        {
          title: 'Corporate quotes & invoicing',
          desc: 'For offices and institutions buying 5–50 laptops.',
          items: [
            'Tiered bulk pricing (5+, 10+, 20+ units)',
            'Formal PDF quotations with NTN and bank payment terms',
            'Separate account ledgers (khata) for corporate clients',
          ],
        },
        {
          title: 'Container import',
          desc: 'Add hundreds of imported laptops from a supplier spreadsheet.',
          items: [
            "Import a container's stock (US, UK or UAE auctions) from CSV or Excel",
            'Models, specs and stock created and assigned to branches automatically',
          ],
        },
        {
          title: 'Staff roles',
          desc: 'Each person sees only what their job needs.',
          items: [
            'Owner: profit, margins, purchase costs, settings',
            'Technician: testing, battery health and warranty status only',
            'Cashier: invoices and WhatsApp orders only',
          ],
        },
      ],
      exclusions: [
        'Physical hardware repairs (software only)',
        'Product photography beyond initial setup (add-on)',
      ],
    },
  },
  'ur-en': {
    starter: {
      name: 'Single Store',
      code: '',
      badge: 'SINGLE STORE',
      pricePkr: 'PKR 250,000',
      priceUsd: '$2,250',
      delivery: '10 din',
      idealFor:
        'Independent laptop dealers aur accessories dukanein jo online bechna shuru kar rahi hain — orders WhatsApp par.',
      artifacts: [
        { title: 'Storefront', image: '/txs/home.png', tag: 'Storefront' },
        { title: 'Product catalogue', image: '/txs/products.png', tag: 'Catalogue' },
      ],
      modules: [
        {
          title: 'Laptop store (pehle 100 products)',
          desc: 'Business, gaming aur MacBook listings ke liye tez store.',
          items: [
            'Processor filter (Intel Core 8th–14th gen, Ryzen, Apple M-series)',
            'Condition filters: Brand New, Open Box, Grade A+',
            'Specs, screen size aur GPU se search',
            'Mobile-first, jaldi WhatsApp order ke liye',
          ],
        },
        {
          title: 'RAM aur SSD upgrade options',
          desc: 'Customer kisi bhi model ko upgrade kar ke nayi price foran dekhta hai.',
          items: [
            'RAM: maslan 8GB → 16GB → 32GB',
            'Storage: maslan 256GB → 512GB → 1TB NVMe',
            'Chune gaye upgrades ke sath order summary update',
          ],
        },
        {
          title: 'Grade aur battery health',
          desc: 'Do sab se aam sawalon ka jawab pehle hi.',
          items: [
            'Battery health % aur tested backup (maslan 4–5 ghante)',
            'Photo requests ki jagah saaf condition grades',
            'Har listing par charger aur warranty sharaait',
          ],
        },
        {
          title: 'Mukammal malkiat',
          desc: 'Aakhri payment par sab aapke naam.',
          items: [
            'Private GitHub repository',
            'Admin access ke sath aapka database',
            'Aapki sales par 0% commission',
          ],
        },
      ],
      exclusions: [
        'Ek se zyada location ka stock (Multi-Branch plan)',
        'Serial number aur battery warranty tracking',
        'Online card aur wallet payments (add-on: +PKR 50,000 / $400; Multi-Branch aur Chain mein shamil)',
        'AI laptop finder (add-on: +PKR 65,000 / $650; Multi-Branch aur Chain mein shamil)',
        'Pehle 100 products se zyada photos aur data entry',
      ],
    },
    growth: {
      name: 'Multi-Branch',
      code: '',
      badge: 'SAB SE MAQBOOL',
      pricePkr: 'PKR 490,000',
      priceUsd: '$4,450',
      delivery: '21 din',
      idealFor:
        'Established laptop dealers, refurbished ThinkPad/MacBook specialists aur gaming laptop dukanein jin ka stock counter, testing bench aur online hai.',
      artifacts: [
        { title: 'Serial aur warranty records', image: '/txs/admin warranty.png', tag: 'Warranty' },
        { title: 'Product aur stock admin', image: '/txs/dashboard products.png', tag: 'Stock' },
        { title: 'Sales dashboard', image: '/txs/dashboard.png', tag: 'Dashboard' },
      ],
      modules: [
        {
          title: '3 locations ka stock',
          desc: 'Counter, testing bench aur godam ka ek stock view.',
          items: [
            '3 locations tak (maslan Hafeez Centre dukan, testing counter, godam)',
            'Har model ka location-wise stock',
            'Counter ya online sale par stock foran update',
          ],
        },
        {
          title: 'Serial aur battery warranty',
          desc: 'Har laptop intake se invoice tak track.',
          items: [
            'In stock → Sold (invoice se link) → Warranty claim → Replaced',
            'Sale ke waqt battery health record',
            'Serial number se warranty seconds mein',
          ],
        },
        {
          title: 'Accessories suggestions',
          desc: 'Checkout par munasib accessories.',
          items: [
            'Bags, mouse, USB-C docks aur extra chargers',
            'Ek tap mein order mein add',
          ],
        },
        {
          title: 'Online payments (shamil — PKR 50,000 ki value)',
          desc: 'Prepaid orders ke liye card aur wallet checkout.',
          items: [
            'Visa, Mastercard aur UnionPay',
            'JazzCash, EasyPaisa aur bank transfer',
            'Gateway approval aur transaction fees aapke aur gateway ke darmiyan',
          ],
        },
        {
          title: 'AI laptop finder (shamil — PKR 65,000 ki value)',
          desc: 'Zaroorat aur budget ke mutabiq aapke stock se laptop.',
          items: [
            'Processors, RAM, battery life aur GPUs par set',
            'Budget sawalon ka jawab (maslan "coding ke liye behtareen laptop")',
            'Cart bhar kar chat aapke WhatsApp par',
            'AI usage ki fee at-cost aap dete hain — hum pehle andaza bata dete hain',
          ],
        },
      ],
      exclusions: [
        '3 se zyada locations (Chain plan)',
        'Corporate bulk quotes aur container import (Chain plan)',
        'POS/ERP integration (Chain plan)',
        'Alag alag staff permissions (add-on ya Chain plan)',
      ],
    },
    enterprise: {
      name: 'Chain & Wholesale',
      code: '',
      badge: 'CHAINS KE LIYE',
      pricePkr: 'PKR 850,000 se shuru',
      priceUsd: '$7,900 se shuru',
      delivery: '30 din se',
      idealFor:
        'Bare importers, mulk bhar ke refurbished distributors aur multi-branch chains jo dukanon aur offices ko bechte hain.',
      artifacts: [
        { title: 'Site content aur banners (CMS)', image: '/txs/admin site control.png', tag: 'CMS' },
        { title: 'Product aur stock admin', image: '/txs/dashboard products.png', tag: 'Stock' },
        { title: 'Serial aur warranty records', image: '/txs/admin warranty.png', tag: 'Warranty' },
      ],
      modules: [
        {
          title: 'La-mehdood branches aur godam',
          desc: 'Har outlet aur hub ka stock.',
          items: [
            'Jitni chahein dukanein, testing benches aur godam',
            'Stock transfer request — dispatch aur receipt sign-off ke sath',
            'Godam se dispatch aur counter pickup',
          ],
        },
        {
          title: 'Corporate quotes aur invoicing',
          desc: '5–50 laptops khareedne wale offices aur idaron ke liye.',
          items: [
            'Bulk pricing (5+, 10+, 20+ units)',
            'NTN aur bank payment terms ke sath formal PDF quotations',
            'Corporate clients ke liye alag khata',
          ],
        },
        {
          title: 'Container import',
          desc: 'Supplier ki spreadsheet se sainkaron imported laptops.',
          items: [
            'Container ka stock (US, UK ya UAE auctions) CSV ya Excel se import',
            'Models, specs aur stock khud ban kar branches mein assign',
          ],
        },
        {
          title: 'Staff roles',
          desc: 'Har shakhs ko sirf apne kaam ki cheez.',
          items: [
            'Owner: munafa, margins, purchase cost, settings',
            'Technician: sirf testing, battery health aur warranty status',
            'Cashier: sirf invoices aur WhatsApp orders',
          ],
        },
      ],
      exclusions: [
        'Physical hardware repair (sirf software)',
        'Initial setup se zyada product photography (add-on)',
      ],
    },
  },
}

const LAPTOP_EXTRAS_DATA = [
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
      'Let other laptop sellers list on your site, and earn a commission on each sale.',
    descUr:
      'Doosre laptop sellers aapki site par list karein, aur har sale par aapka commission.',
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
    en: 'Product data entry (per 50 products, after the first 100)',
    ur: 'Product data entry (har 50 products, pehle 100 ke baad)',
    pricePkr: '+ PKR 15,000 / 50',
    priceUsd: '+ $120 / 50',
    descEn:
      'We clean photos, write specs (CPU, RAM, storage, battery) and upload products in batches of 50.',
    descUr:
      'Hum photos saaf karte hain, specs (CPU, RAM, storage, battery) likhte hain aur 50 ke batch mein upload karte hain.',
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
    en: 'AI laptop finder',
    ur: 'AI laptop finder',
    pricePkr: '+ PKR 65,000',
    priceUsd: '+ $650',
    starterOnly: true,
    descEn:
      "Matches each customer's needs and budget to laptops in stock, then passes the chat to your WhatsApp. Included in Multi-Branch and Chain.",
    descUr:
      'Customer ki zaroorat aur budget ke mutabiq stock mein se laptop, phir chat aapke WhatsApp par. Multi-Branch aur Chain mein shamil.',
  },
  {
    en: 'Container import tool',
    ur: 'Container import tool',
    pricePkr: '+ PKR 60,000',
    priceUsd: '+ $450',
    descEn:
      "Upload hundreds of imported laptops from your supplier's spreadsheet, with specs, RAM and grades mapped automatically.",
    descUr:
      'Supplier ki spreadsheet se sainkaron imported laptops upload — specs, RAM aur grades khud map.',
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
      ? `Assalam o Alaikum TeXCodes, mujhe apni laptop dukan ke liye ${planName} (${price}) plan mein dilchaspi hai. Kya demo ho sakta hai?`
      : `Hello TeXCodes, I'm interested in the ${planName} (${price}) plan for my laptop shop. Can we schedule a demo?`
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
              TEXCODES · LAPTOP RETAIL OS
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
                  ? 'Prices USD mein'
                  : 'Prices in USD'
                : isUrdu
                ? 'Prices PKR mein (Pakistan ke karobar ke liye)'
                : 'Prices in PKR (for businesses in Pakistan)'}
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
                ? 'Tamam add-on prices fixed hain. Kaam shuru hone se pehle final scope likh kar confirm hota hai.'
                : 'All add-on prices are fixed. The final scope is confirmed in writing before work starts.'}
            </p>
          </FadeIn>

          {/* Care Plans */}
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

      {/* ─── Payback / ROI Section ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#121215]">
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
              <div key={i} className="bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] p-5 space-y-1">
                <div className="offer-h2 text-[#059669] dark:text-[#10B981]">{s.big}</div>
                <div className="offer-ui text-[#575652] dark:text-[#9B9A95]">{isUrdu ? s.ur : s.en}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OfferFAQ lang={lang} />
    </div>
  )
}
