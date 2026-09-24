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
import OfferFAQ from '../../components/OfferFAQ'
import ComparePrice from '../../components/ComparePrice'
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
    hero_badge: 'CONSOLE & GAMES RETAIL OS · FOR VIDEO GAME SHOPS',
    hero_title_1: 'Instant trade-in quotes —',
    hero_title_accent: 'online and at the counter.',
    hero_title_2: '',
    hero_sub:
      'A store and back office for video game shops. Customers get a cash or store-credit quote for their old console or discs in seconds, every item shows its condition, and every console is logged by serial number. Live in 10–30 days, and the code is yours.',
    cta_primary: 'See plans & pricing',
    cta_secondary: 'Try the live demo',
    metrics_code: 'Code, data and domain handed over',
    metrics_tax: 'No cut from your sales, ever',
    metrics_speed: 'Cash or store credit, instantly',
    metrics_rma: 'Logged on every console invoice',
    metrics_code_top: 'YOU OWN IT',
    metrics_tax_top: '0% COMMISSION',
    metrics_speed_top: 'TRADE-IN QUOTES',
    metrics_rma_top: 'SERIAL & SEAL',

    // How we work
    ultimatum_badge: 'HOW WE WORK',
    ultimatum_title: 'You see it working before you pay in full',
    ultimatum_sub:
      'Payments follow milestones. The final balance is due only after you approve your store on a private link, with your own stock.',
    ultimatum_best_tag: 'WHAT YOU GET',
    ultimatum_best_title: 'A store built around how you sell',
    ultimatum_best_p1: 'An online store for consoles, games and accessories.',
    ultimatum_best_p2: 'A trade-in calculator with cash and store-credit offers.',
    ultimatum_best_p3: 'Clear condition labels on every disc and console.',
    ultimatum_best_p4: 'Showroom and online orders share one stock count.',
    ultimatum_best_p5: 'No platform fee, no commission, full code handover.',
    ultimatum_best_footer: 'Designed to speed up trade-ins and cut condition disputes.',

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
      'We set up your store with your real stock on a private staging link. You test the storefront, trade-in calculator and stock sync yourself. The final payment is due only after you approve it.',

    arch_badge: "WHAT'S INCLUDED",
    arch_title: 'One system for your showroom, trade-ins and website',
    arch_sub:
      'Your storefront, counter, trade-in desk and WhatsApp orders all run on the same data.',
    arch_01_title: 'GAME STORE',
    arch_01_desc:
      'A fast store for PS5, Xbox, Switch, retro consoles and discs, with trailers and platform filters.',
    arch_02_title: 'TRADE-IN CALCULATOR',
    arch_02_desc:
      'Customers pick their console or disc and its condition (boxed, unboxed, fair) and get a cash or store-credit quote, like the big trade-in chains.',
    arch_03_title: 'CONDITION LABELS',
    arch_03_desc:
      'Sealed, Mint disc, Grade A or Refurbished, with your warranty terms on each listing.',
    arch_04_title: 'BRANCH STOCK',
    arch_04_desc:
      'Showrooms, testing bench and warehouse in one stock view.',
    arch_05_title: 'SERIAL & SEAL',
    arch_05_desc:
      "Print each console's serial number and warranty-seal ID on the invoice, so swapped parts and false returns are easy to spot.",
    arch_06_title: 'WHATSAPP ORDERS',
    arch_06_desc:
      'Orders arrive with platform, edition (disc/digital), region and delivery details.',
    arch_07_title: 'AI GAME FINDER',
    arch_07_desc:
      'Suggests games by platform, genre, multiplayer and age rating (PEGI/ESRB).',

    plans_badge: 'PLANS & PRICING',
    plans_title: 'Console Retail plans',
    plans_sub: 'One fixed price per plan. No commission. Full handover when complete.',
    plans_sub_suffix: "Open any plan to see the full scope, what's excluded, and screenshots.",
    detail_btn: 'See full scope & screenshots →',

    starter_name: 'Single Store',
    starter_badge: '1 SHOP',
    starter_desc: 'For an independent game or retro shop starting to sell online.',
    starter_price_usd: '$2,250',
    starter_price_gbp: '£1,850',
    starter_price_pkr: 'PKR 260,000',
    starter_delivery: 'Live in 10 days*',
    starter_support_usd: 'Optional Care Plan: $140 / month',
    starter_support_gbp: 'Optional Care Plan: £115 / month',
    starter_support_pkr: 'Optional Care Plan: PKR 14,000 / month',
    starter_callout_label: 'BEST FOR',
    starter_callout_text: 'Getting online fast with platform filters, condition labels and WhatsApp orders.',
    starter_f1: 'Online store — we load your first 100 items',
    starter_f2: 'Filters for PS5, Xbox, Switch and retro',
    starter_f3: 'Condition labels on discs and consoles',
    starter_f4: 'Orders sent to your WhatsApp',

    growth_name: 'Multi-Branch',
    growth_badge: 'MOST POPULAR',
    growth_desc:
      'For established game shops that buy and sell used consoles at the counter and online.',
    growth_price_usd: '$4,450',
    growth_price_gbp: '£3,650',
    growth_price_pkr: 'PKR 490,000',
    growth_delivery: 'Live in 21 days*',
    growth_support_usd: 'Optional Care Plan: $280 / month',
    growth_support_gbp: 'Optional Care Plan: £230 / month',
    growth_support_pkr: 'Optional Care Plan: PKR 28,000 / month',
    growth_callout_label: 'EVERYTHING IN SINGLE STORE, PLUS',
    growth_callout_text:
      'The trade-in calculator, stock across 3 locations, serial & seal tracking and an AI game finder.',
    growth_f1: 'Trade-in calculator (cash or store credit)',
    growth_f2: 'Stock synced across 3 locations',
    growth_f3: 'Console serial & seal tracking',
    growth_f4: 'Controller and accessory suggestions at checkout',
    growth_f5_usd: 'Card & wallet payments — included ($400 value)',
    growth_f5_gbp: 'Card & wallet payments — included (£320 value)',
    growth_f5_pkr: 'Card & wallet payments — included (PKR 50,000 value)',
    growth_f6_usd: 'AI game finder — included ($650 value)',
    growth_f6_gbp: 'AI game finder — included (£520 value)',
    growth_f6_pkr: 'AI game finder — included (PKR 65,000 value)',

    enterprise_name: 'Chain & Wholesale',
    enterprise_badge: 'FOR CHAINS',
    enterprise_desc:
      'For chains, franchises and distributors supplying shops and gaming lounges.',
    enterprise_price_usd: 'From $7,900',
    enterprise_price_gbp: 'From £6,500',
    enterprise_price_pkr: 'From PKR 850,000',
    enterprise_delivery: 'From 30 days — fixed in your scope document',
    enterprise_support_usd: 'Dedicated Care Plan: $550 / month',
    enterprise_support_gbp: 'Dedicated Care Plan: £450 / month',
    enterprise_support_pkr: 'Dedicated Care Plan: PKR 55,000 / month',
    enterprise_callout_label: 'EVERYTHING IN MULTI-BRANCH, PLUS',
    enterprise_callout_text:
      'Unlimited branches, an in-store trade-in kiosk, barcode labels, wholesale invoicing and staff roles.',
    enterprise_f1: 'Unlimited branches and testing counters',
    enterprise_f2: 'In-store trade-in kiosk and barcode labels',
    enterprise_f3: 'Wholesale and gaming-lounge invoicing',
    enterprise_f4: 'Staff roles: owner, manager, cashier, technician',
    enterprise_f5: 'Multiple payment gateways — included',
    enterprise_f6: 'AI game finder with live stock — included',

    whatsapp_cta: 'Discuss this plan on WhatsApp',
    view_terms: 'Read the scope, payment and warranty terms →',

    // Live demo
    demo_badge: 'LIVE DEMO',
    demo_title: 'Try it yourself',
    demo_sub:
      'A working demo with sample stock (it resets when you refresh). Your version uses your products, prices and branches.',
    demo_store_title: '1. Game store',
    demo_store_desc: 'Browse consoles, discs and controllers.',
    demo_filter_title: '2. Trade-in calculator',
    demo_filter_desc: 'Pick a console or disc and get an instant quote.',
    demo_admin_title: '3. Admin panel',
    demo_admin_desc: 'See stock by branch, the trade-in queue and serial records.',
  },
  'ur-en': {
    hero_badge: 'CONSOLE & GAMES RETAIL OS · VIDEO GAME DUKANON KE LIYE',
    hero_title_1: 'Foran trade-in quotes —',
    hero_title_accent: 'online bhi, counter par bhi.',
    hero_title_2: '',
    hero_sub:
      'Video game dukanon ke liye store aur back office. Customer ko purane console ya discs ka cash ya store credit quote seconds mein milta hai, har item ki condition nazar aati hai, aur har console serial number ke sath record hota hai. 10–30 din mein live, aur code aapka.',
    cta_primary: 'Plans aur prices dekhein',
    cta_secondary: 'Live demo try karein',
    metrics_code: 'Code, data aur domain aapke hawale',
    metrics_tax: 'Aapki sales mein se koi hissa nahi',
    metrics_speed: 'Cash ya store credit, foran',
    metrics_rma: 'Har console invoice par record',
    metrics_code_top: 'MALKIAT AAPKI',
    metrics_tax_top: '0% COMMISSION',
    metrics_speed_top: 'TRADE-IN QUOTES',
    metrics_rma_top: 'SERIAL & SEAL',

    // How we work
    ultimatum_badge: 'HUM KAISE KAAM KARTE HAIN',
    ultimatum_title: 'Poori payment se pehle system chalta hua dekhein',
    ultimatum_sub:
      'Payment milestones ke sath hoti hai. Aakhri raqam tab, jab aap private link par apne stock ke sath store approve kar dein.',
    ultimatum_best_tag: 'AAPKO KYA MILTA HAI',
    ultimatum_best_title: 'Aapke kaam ke mutabiq bana store',
    ultimatum_best_p1: 'Consoles, games aur accessories ka online store.',
    ultimatum_best_p2: 'Cash aur store credit offers wala trade-in calculator.',
    ultimatum_best_p3: 'Har disc aur console par saaf condition label.',
    ultimatum_best_p4: 'Showroom aur online orders ka ek hi stock.',
    ultimatum_best_p5: 'Na platform fee, na commission, poora code aapka.',
    ultimatum_best_footer: 'Trade-in tez aur condition ke jhagre kam karne ke liye.',

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
      'Hum aapka store aapke asli stock ke sath private staging link par set karte hain. Storefront, trade-in calculator aur stock sync aap khud test karte hain. Aakhri payment sirf aapki approval ke baad.',

    arch_badge: 'KYA SHAMIL HAI',
    arch_title: 'Showroom, trade-ins aur website — ek system',
    arch_sub:
      'Storefront, counter, trade-in desk aur WhatsApp orders sab ek hi data par.',
    arch_01_title: 'GAME STORE',
    arch_01_desc:
      'PS5, Xbox, Switch, retro consoles aur discs ke liye tez store — trailers aur platform filters ke sath.',
    arch_02_title: 'TRADE-IN CALCULATOR',
    arch_02_desc:
      'Customer apna console ya disc aur us ki condition (boxed, unboxed, fair) chunta hai aur cash ya store credit quote pata hai — bari trade-in chains ki tarah.',
    arch_03_title: 'CONDITION LABELS',
    arch_03_desc:
      'Sealed, Mint disc, Grade A ya Refurbished — har listing par aapki warranty sharaait ke sath.',
    arch_04_title: 'BRANCH STOCK',
    arch_04_desc:
      'Showrooms, testing bench aur godam — ek stock view.',
    arch_05_title: 'SERIAL AUR SEAL',
    arch_05_desc:
      'Har console ka serial number aur warranty seal ID invoice par, taake badle hue parts aur jhoote returns foran pakre jayein.',
    arch_06_title: 'WHATSAPP ORDERS',
    arch_06_desc:
      'Orders platform, edition (disc/digital), region aur delivery details ke sath.',
    arch_07_title: 'AI GAME FINDER',
    arch_07_desc:
      'Platform, genre, multiplayer aur age rating (PEGI/ESRB) ke mutabiq games suggest karta hai.',

    plans_badge: 'PLANS AUR PRICES',
    plans_title: 'Console Retail plans',
    plans_sub: 'Har plan ki ek fixed price. Koi commission nahi. Mukammal hone par poora handover.',
    plans_sub_suffix: 'Poora scope, kya shamil nahi, aur screenshots dekhne ke liye plan kholein.',
    detail_btn: 'Poora scope aur screenshots dekhein →',

    starter_name: 'Single Store',
    starter_badge: '1 DUKAN',
    starter_desc: 'Ek game ya retro dukan ke liye jo online bechna shuru kar rahi hai.',
    starter_price_usd: '$2,250',
    starter_price_gbp: '£1,850',
    starter_price_pkr: 'PKR 260,000',
    starter_delivery: '10 din mein live*',
    starter_support_usd: 'Ikhtiyari Care Plan: $140 / mahana',
    starter_support_gbp: 'Ikhtiyari Care Plan: £115 / mahana',
    starter_support_pkr: 'Ikhtiyari Care Plan: PKR 14,000 / mahana',
    starter_callout_label: 'KIS KE LIYE BEHTAR',
    starter_callout_text: 'Jaldi online aana — platform filters, condition labels aur WhatsApp orders ke sath.',
    starter_f1: 'Online store — pehle 100 items hum daalte hain',
    starter_f2: 'PS5, Xbox, Switch aur retro filters',
    starter_f3: 'Discs aur consoles par condition labels',
    starter_f4: 'Orders aapke WhatsApp par',

    growth_name: 'Multi-Branch',
    growth_badge: 'SAB SE MAQBOOL',
    growth_desc:
      'Established game dukanon ke liye jo used consoles counter aur online dono par khareedti-bechti hain.',
    growth_price_usd: '$4,450',
    growth_price_gbp: '£3,650',
    growth_price_pkr: 'PKR 490,000',
    growth_delivery: '21 din mein live*',
    growth_support_usd: 'Ikhtiyari Care Plan: $280 / mahana',
    growth_support_gbp: 'Ikhtiyari Care Plan: £230 / mahana',
    growth_support_pkr: 'Ikhtiyari Care Plan: PKR 28,000 / mahana',
    growth_callout_label: 'SINGLE STORE KA SAB KUCH, AUR',
    growth_callout_text:
      'Trade-in calculator, 3 locations ka stock, serial & seal tracking aur AI game finder.',
    growth_f1: 'Trade-in calculator (cash ya store credit)',
    growth_f2: '3 locations ka stock sync',
    growth_f3: 'Console serial aur seal tracking',
    growth_f4: 'Checkout par controllers aur accessories suggestions',
    growth_f5_usd: 'Card aur wallet payments — shamil ($400 ki value)',
    growth_f5_gbp: 'Card aur wallet payments — shamil (£320 ki value)',
    growth_f5_pkr: 'Card aur wallet payments — shamil (PKR 50,000 ki value)',
    growth_f6_usd: 'AI game finder — shamil ($650 ki value)',
    growth_f6_gbp: 'AI game finder — shamil (£520 ki value)',
    growth_f6_pkr: 'AI game finder — shamil (PKR 65,000 ki value)',

    enterprise_name: 'Chain & Wholesale',
    enterprise_badge: 'CHAINS KE LIYE',
    enterprise_desc:
      'Chains, franchises aur distributors ke liye jo dukanon aur gaming lounges ko maal dete hain.',
    enterprise_price_usd: '$7,900 se shuru',
    enterprise_price_gbp: '£6,500 se shuru',
    enterprise_price_pkr: 'PKR 850,000 se shuru',
    enterprise_delivery: '30 din se — final date scope document mein',
    enterprise_support_usd: 'Dedicated Care Plan: $550 / mahana',
    enterprise_support_gbp: 'Dedicated Care Plan: £450 / mahana',
    enterprise_support_pkr: 'Dedicated Care Plan: PKR 55,000 / mahana',
    enterprise_callout_label: 'MULTI-BRANCH KA SAB KUCH, AUR',
    enterprise_callout_text:
      'La-mehdood branches, dukan mein trade-in kiosk, barcode labels, wholesale invoicing aur staff roles.',
    enterprise_f1: 'La-mehdood branches aur testing counters',
    enterprise_f2: 'Dukan mein trade-in kiosk aur barcode labels',
    enterprise_f3: 'Wholesale aur gaming lounge invoicing',
    enterprise_f4: 'Staff roles: owner, manager, cashier, technician',
    enterprise_f5: 'Ek se zyada payment gateways — shamil',
    enterprise_f6: 'Live stock wala AI game finder — shamil',

    whatsapp_cta: 'Is plan par WhatsApp par baat karein',
    view_terms: 'Scope, payment aur warranty ki sharaait parhein →',

    // Live demo
    demo_badge: 'LIVE DEMO',
    demo_title: 'Khud chala kar dekhein',
    demo_sub:
      'Sample stock ke sath chalta hua demo (refresh par reset hota hai). Aapka version aapke products, prices aur branches ke sath.',
    demo_store_title: '1. Game store',
    demo_store_desc: 'Consoles, discs aur controllers dekhein.',
    demo_filter_title: '2. Trade-in calculator',
    demo_filter_desc: 'Console ya disc chunein aur foran quote lein.',
    demo_admin_title: '3. Admin panel',
    demo_admin_desc: 'Branch-wise stock, trade-in queue aur serial records dekhein.',
  },
}

const CONSOLE_EXTRAS_DATA = [
  {
    en: 'Trade-in module (Single Store)',
    ur: 'Trade-in module (Single Store)',
    priceUsd: '+ $650',
    priceGbp: '+ £520',
    pricePkr: '+ PKR 85,000',
    descEn:
      'Customers value used consoles and discs online for cash or store credit, with a condition checklist and a printable trade-in slip. Included in Multi-Branch.',
    descUr:
      'Customer online purane consoles aur discs ki cash ya store credit value nikalta hai — condition checklist aur printable trade-in slip ke sath. Multi-Branch mein shamil.',
  },
  {
    en: 'Digital code delivery',
    ur: 'Digital codes delivery',
    priceUsd: '+ $450',
    priceGbp: '+ £360',
    pricePkr: '+ PKR 60,000',
    descEn:
      'Send PlayStation Plus, Game Pass, eShop and Steam codes by WhatsApp or SMS right after payment is confirmed.',
    descUr:
      'Payment confirm hote hi PlayStation Plus, Game Pass, eShop aur Steam codes WhatsApp ya SMS par.',
  },
  {
    en: 'Disc rental & membership',
    ur: 'Disc rental aur membership',
    priceUsd: '+ $750',
    priceGbp: '+ £600',
    pricePkr: '+ PKR 95,000',
    descEn:
      'Monthly rental plans (e.g. 2 games at a time) with deposits, return reminders and late fees.',
    descUr:
      'Mahana rental plans (maslan ek waqt mein 2 games) — deposit, wapsi reminders aur late fee ke sath.',
  },
  {
    en: 'Extra branch or warehouse',
    ur: 'Extra branch ya godam',
    priceUsd: '+ $450',
    priceGbp: '+ £360',
    pricePkr: '+ PKR 60,000',
    descEn:
      'Add another store or warehouse with its own stock, counter sales and transfers.',
    descUr:
      'Ek aur dukan ya godam — alag stock, counter sale aur transfer ke sath.',
  },
  {
    en: 'Loyalty points & wallet',
    ur: 'Loyalty points aur wallet',
    priceUsd: '+ $550',
    priceGbp: '+ £440',
    pricePkr: '+ PKR 70,000',
    descEn:
      'Customers earn points and store credit on purchases and trade-ins.',
    descUr:
      'Khareedari aur trade-in par points aur store credit.',
  },
  {
    en: 'Marketplace for other sellers',
    ur: 'Doosre sellers ka marketplace',
    priceUsd: '+ $1,200',
    priceGbp: '+ £980',
    pricePkr: '+ PKR 150,000',
    descEn:
      'Let trusted sellers and collectors list consoles and rare discs on your site, and earn a commission on each sale.',
    descUr:
      'Bharosemand sellers aur collectors aapki site par consoles aur rare discs list karein, aur har sale par aapka commission.',
  },
]

// Regular prices, shown struck through next to each plan price (keep in sync with /solutions)
const COMPARE_PRICES = {
  starter: { usd: '$2,700', gbp: '£2,200', pkr: 'PKR 310,000' },
  growth: { usd: '$5,350', gbp: '£4,400', pkr: 'PKR 590,000' },
  enterprise: { usd: '$9,500', gbp: '£7,800', pkr: 'PKR 1,020,000' },
}
const compareFor = (key, currency) =>
  key ? (currency === 'USD' ? COMPARE_PRICES[key].usd : currency === 'GBP' ? COMPARE_PRICES[key].gbp : COMPARE_PRICES[key].pkr) : null

export default function ConsoleRetailSolution() {
  const { lang, setLang, isUrdu } = useLanguage()
  const [currency, setCurrency] = useState(detectInitialCurrency)
  const [activeModalKey, setActiveModalKey] = useState(null)
  const [expandedExtras, setExpandedExtras] = useState({})

  const t = I18N_DATA[lang] || I18N_DATA.en

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleLangChange = (newLang) => {
    setLang(newLang)
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
    const text = isUrdu
      ? `Assalam o Alaikum TeXCodes, mujhe apni video game dukan ke liye ${planName} (${price}) plan mein dilchaspi hai. Kya demo ho sakta hai?`
      : `Hello TeXCodes, I'm interested in the ${planName} (${price}) plan for my video game shop. Can we schedule a demo?`
    window.open(`https://wa.me/923091824000?text=${encodeURIComponent(text)}`, '_blank')
  }

  const openDemoWhatsApp = () => {
    const text = isUrdu
      ? 'Assalam o Alaikum TeXCodes, mujhe apni video game dukan ke liye Console & Games Retail OS ka demo chahiye.'
      : "Hello TeXCodes, I'd like a demo of the Console & Games Retail OS for my video game shop."
    window.open(`https://wa.me/923091824000?text=${encodeURIComponent(text)}`, '_blank')
  }

  // Comprehensive Modal Data
  // Field names match PlanDetailModal: name, badge, price, delivery, idealFor, artifacts, modules, exclusions.
  const pick = (en, ur) => (isUrdu ? ur : en)
  const priceFor = (usd, gbp, pkr) => (currency === 'USD' ? usd : currency === 'GBP' ? gbp : pkr)
  const CONSOLE_DEMO_URL = 'https://console-store-demo.vercel.app/'
  const CONSOLE_ADMIN_URL = 'https://console-store-demo.vercel.app/admin'

  const modalData = {
    starter: {
      name: t.starter_name,
      badge: 'SINGLE STORE',
      price: priceFor(t.starter_price_usd, t.starter_price_gbp, t.starter_price_pkr),
      delivery: pick('10 days', '10 din'),
      storefrontDemoUrl: CONSOLE_DEMO_URL,
      adminDemoUrl: CONSOLE_ADMIN_URL,
      idealFor: pick(
        'Independent game shops, retro console sellers and disc dealers starting to sell online, with orders on WhatsApp.',
        'Independent game dukanein, retro console sellers aur disc dealers jo online bechna shuru kar rahe hain — orders WhatsApp par.'
      ),
      artifacts: [
        { title: 'Game store', image: '/console/home.png', tag: 'Storefront' },
        { title: 'Product page', image: '/console/product.png', tag: 'Product' },
      ],
      modules: [
        {
          title: 'Game store',
          desc: pick(
            'A fast store with platform filters (PS5, Xbox, Switch, retro).',
            'Platform filters (PS5, Xbox, Switch, retro) ke sath tez store.'
          ),
          items: [
            pick('Up to 100 consoles, discs and controllers loaded', '100 tak consoles, discs aur controllers'),
            pick('Condition labels: Sealed, Mint disc', 'Condition labels: Sealed, Mint disc'),
            pick('Orders sent to your WhatsApp', 'Orders aapke WhatsApp par'),
          ],
        },
        {
          title: pick('Full ownership', 'Mukammal malkiat'),
          desc: pick(
            'Code and database transferred on final payment.',
            'Aakhri payment par code aur database aapke naam.'
          ),
          items: [
            pick('No platform fee or commission', 'Na platform fee, na commission'),
            pick('Your own database, no lock-in', 'Aapka apna database, koi lock-in nahi'),
          ],
        },
      ],
      exclusions: [
        pick('Trade-in calculator (add-on; included in Multi-Branch)', 'Trade-in calculator (add-on; Multi-Branch mein shamil)'),
        pick('Stock across more than one location (Multi-Branch)', 'Ek se zyada location ka stock (Multi-Branch)'),
      ],
    },
    growth: {
      name: t.growth_name,
      badge: pick('MOST POPULAR', 'SAB SE MAQBOOL'),
      price: priceFor(t.growth_price_usd, t.growth_price_gbp, t.growth_price_pkr),
      delivery: pick('21 days', '21 din'),
      storefrontDemoUrl: CONSOLE_DEMO_URL,
      adminDemoUrl: CONSOLE_ADMIN_URL,
      idealFor: pick(
        'Established game shops, used-console trade-in stores and busy multi-counter shops selling in store and online.',
        'Established game dukanein, used console trade-in stores aur masroof multi-counter dukanein jo dukan aur online dono par bechti hain.'
      ),
      artifacts: [
        { title: pick('Trade-in calculator', 'Trade-in calculator'), image: '/console/trade-in.png', tag: 'Trade-in' },
        { title: pick('Back office', 'Back office'), image: '/console/admin.png', tag: 'Admin' },
        { title: pick('Product page', 'Product page'), image: '/console/product.png', tag: 'Product' },
      ],
      modules: [
        {
          title: 'Trade-in calculator',
          desc: pick(
            'Instant cash or store-credit quotes, based on condition.',
            'Condition ke mutabiq foran cash ya store credit quote.'
          ),
          items: [
            pick('Condition options: boxed, unboxed, fair', 'Condition: boxed, unboxed, fair'),
            pick('Trade-in voucher for counter drop-off or courier', 'Counter drop-off ya courier ke liye trade-in voucher'),
          ],
        },
        {
          title: pick('Serial & seal tracking', 'Serial aur seal tracking'),
          desc: pick('Every console logged on the invoice.', 'Har console invoice par record.'),
          items: [
            pick('Serial number stored on invoice and warranty records', 'Serial number invoice aur warranty record mein'),
            pick('Makes swapped parts and fake returns easy to spot', 'Badle hue parts aur jhoote returns foran pakre jate hain'),
          ],
        },
        {
          title: pick('Stock across 3 locations', '3 locations ka stock'),
          desc: pick('Showroom, testing bench and warehouse.', 'Showroom, testing bench aur godam.'),
          items: [
            pick('Counter sales update online stock instantly', 'Counter sale par online stock foran update'),
            pick('Transfers between locations with sign-off', 'Locations ke darmiyan transfer, sign-off ke sath'),
          ],
        },
        {
          title: 'AI game finder',
          desc: pick('Suggests games customers will like.', 'Customer ki pasand ke games suggest.'),
          items: [
            pick('By platform, genre, co-op/single-player and age rating', 'Platform, genre, co-op/single-player aur age rating ke mutabiq'),
            pick('Sends the customer to checkout or your WhatsApp', 'Customer ko checkout ya aapke WhatsApp par bhejta hai'),
          ],
        },
      ],
      exclusions: [
        pick('Physical console repairs (software only)', 'Console ki physical repair (sirf software)'),
      ],
    },
    enterprise: {
      name: t.enterprise_name,
      badge: pick('FOR CHAINS', 'CHAINS KE LIYE'),
      price: priceFor(t.enterprise_price_usd, t.enterprise_price_gbp, t.enterprise_price_pkr),
      delivery: pick('From 30 days', '30 din se'),
      storefrontDemoUrl: CONSOLE_DEMO_URL,
      adminDemoUrl: CONSOLE_ADMIN_URL,
      idealFor: pick(
        'Game retail chains, console importers, franchises and suppliers to gaming lounges.',
        'Game retail chains, console importers, franchises aur gaming lounges ke suppliers.'
      ),
      artifacts: [
        { title: pick('Back office', 'Back office'), image: '/console/admin.png', tag: 'Admin' },
        { title: pick('Trade-in calculator', 'Trade-in calculator'), image: '/console/trade-in.png', tag: 'Trade-in' },
        { title: pick('Game store', 'Game store'), image: '/console/home.png', tag: 'Storefront' },
      ],
      modules: [
        {
          title: pick('Unlimited branches & trade-in kiosk', 'La-mehdood branches aur trade-in kiosk'),
          desc: pick('Run every branch from one system.', 'Har branch ek system se.'),
          items: [
            pick('Touchscreen trade-in kiosk for the counter', 'Counter ke liye touchscreen trade-in kiosk'),
            pick('Barcode labels for graded used games and consoles', 'Graded used games aur consoles ke liye barcode labels'),
          ],
        },
        {
          title: pick('Wholesale & lounge invoicing', 'Wholesale aur lounge invoicing'),
          desc: pick(
            'Bulk quotes for gaming cafés, esports centres and sub-dealers.',
            'Gaming cafés, esports centres aur sub-dealers ke liye bulk quotes.'
          ),
          items: [
            pick('Volume discounts and invoices with tax details', 'Volume discounts aur tax details wali invoices'),
            pick('Separate ledger and credit limit for trusted dealers', 'Bharosemand dealers ke liye alag khata aur credit limit'),
          ],
        },
        {
          title: 'Staff roles',
          desc: pick('Each person sees only what their job needs.', 'Har shakhs ko sirf apne kaam ki cheez.'),
          items: [
            pick('Owner: margins, purchases and branch performance', 'Owner: margins, purchases aur branch performance'),
            pick('Technician: testing, grading and serial logging', 'Technician: testing, grading aur serial logging'),
            pick('Cashier: sales, trade-in payouts and receipts', 'Cashier: sales, trade-in payouts aur receipts'),
          ],
        },
      ],
      exclusions: [
        pick('Store signage and printing (software and digital assets only)', 'Dukan ke signboards aur printing (sirf software aur digital assets)'),
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
            <span className="uppercase tracking-wider">TEXCODES · CONSOLE & GAMES RETAIL OS</span>
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
            to="/solutions/terms"
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
                <span className="font-bold">01</span>
                <Gamepad2 size={16} />
              </div>
              <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6]">{t.arch_01_title}</h4>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.arch_01_desc}</p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                <span className="font-bold">02</span>
                <RefreshCw size={16} />
              </div>
              <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6]">{t.arch_02_title}</h4>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.arch_02_desc}</p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                <span className="font-bold">03</span>
                <Disc size={16} />
              </div>
              <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6]">{t.arch_03_title}</h4>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.arch_03_desc}</p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                <span className="font-bold">04</span>
                <Boxes size={16} />
              </div>
              <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6]">{t.arch_04_title}</h4>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.arch_04_desc}</p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                <span className="font-bold">05</span>
                <Tag size={16} />
              </div>
              <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6]">{t.arch_05_title}</h4>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.arch_05_desc}</p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-3 card-hover-guided">
              <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                <span className="font-bold">06</span>
                <MessageSquare size={16} />
              </div>
              <h4 className="offer-h4 text-[#0F0F0F] dark:text-[#EDECE6]">{t.arch_06_title}</h4>
              <p className="offer-ui text-[#575652] dark:text-[#9B9A95]">{t.arch_06_desc}</p>
            </StaggerItem>

            <StaggerItem className="p-6 bg-white dark:bg-[#161619] border-2 border-[#059669] dark:border-[#10B981] space-y-3 card-hover-guided md:col-span-2 lg:col-span-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#059669] dark:text-[#10B981]">
                <span className="font-bold">{isUrdu ? '07 · MULTI-BRANCH AUR CHAIN PLANS' : '07 · MULTI-BRANCH & CHAIN PLANS'}</span>
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
                href="https://console-store-demo.vercel.app/"
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
                href="https://console-store-demo.vercel.app/trade-in"
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
                href="https://console-store-demo.vercel.app/admin"
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
              <span>{isUrdu ? 'TAREEQA:' : 'HOW IT WORKS:'}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[#575652] dark:text-[#EDECE6]">
              <span>{isUrdu ? '1. Plan chunein' : '1. Choose a plan'}</span>
              <span>→</span>
              <span>{isUrdu ? '2. Poora scope dekhein' : '2. See the full scope'}</span>
              <span>→</span>
              <span>{isUrdu ? '3. WhatsApp par call book karein' : '3. Book a call on WhatsApp'}</span>
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
                      <ComparePrice value={compareFor('starter', currency)} isUrdu={isUrdu} />
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
                      <ComparePrice value={compareFor('growth', currency)} isUrdu={isUrdu} />
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
                      <ComparePrice value={compareFor('enterprise', currency)} isUrdu={isUrdu} />
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

          {/* Delivery footnote & build capacity */}
          <div className="text-center offer-body text-[#575652] dark:text-[#9B9A95] max-w-2xl mx-auto space-y-2">
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
          </div>

          {/* ─── Add-ons / Extras Accordion ─── */}
          <div className="pt-12 border-t border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-6">
            <div>
              <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold mb-1">
                ADD-ONS
              </div>
              <h3 className="offer-h3 text-[#0F0F0F] dark:text-[#EDECE6]">
                {isUrdu ? 'Sirf zaroorat ki cheez add karein' : 'Add only what you need'}
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
                      <span>{isExpanded ? (isUrdu ? 'Chhupayein' : 'Hide') : (isUrdu ? 'Tafseel' : 'Details')}</span>
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

      <OfferFAQ lang={lang} />

      {/* ─── Footer Action & Sticky Banner ─── */}
      <section className="px-4 sm:px-8 py-16 border-t border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#161619] text-center">
        <FadeIn className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold bg-[#ECFDF5] dark:bg-[rgba(16,185,129,0.15)] px-3 py-1">
            <ShieldCheck size={14} />
            <span>{isUrdu ? 'FIXED PRICE · MUKAMMAL HANDOVER' : 'FIXED PRICE · FULL HANDOVER'}</span>
          </div>

          <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">
            {isUrdu ? 'Apne stock ke sath dekhein' : 'See it with your own stock'}
          </h2>

          <p className="offer-body text-[#575652] dark:text-[#9B9A95]">
            {isUrdu
              ? 'Apne kuch products bhejein. Hum unhein demo mein daal kar 15 minute ki WhatsApp call par dikhayenge.'
              : "Send us a few of your products. We'll load them into the demo and walk you through it on a 15-minute WhatsApp call."}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={openDemoWhatsApp}
              className="btn-blue offer-btn offer-btn-xl shadow-md group relative overflow-hidden cursor-pointer"
            >
              <MessageSquare size={16} className="relative z-10 animate-icon-wiggle" />
              <span className="relative z-10">{isUrdu ? 'WHATSAPP PAR DEMO BOOK KAREIN' : 'BOOK A DEMO ON WHATSAPP'}</span>
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none animate-shimmer-sweep" />
            </button>
            <Link
              to="/solutions/terms"
              className="btn-outline offer-btn offer-btn-lg"
            >
              <span>{isUrdu ? 'SHARAAIT PARHEIN' : 'READ THE TERMS'}</span>
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Plan Detail Modal */}
      {activeModalKey && modalData[activeModalKey] && (
        <PlanDetailModal
          onClose={() => setActiveModalKey(null)}
          plan={modalData[activeModalKey]}
          lang={lang}
          currency={currency}
          compare={compareFor(activeModalKey, currency)}
          onOpenWhatsApp={(name, price) => openWhatsApp(name, price)}
        />
      )}
    </div>
  )
}
