import { pricedCopy, pricedPlans, comparePrices } from '../pricing.ts'
import type { Language, Currency, PlanKey, OfferPlan, Extra } from '../pricing.ts'

const I18N_COPY: Record<Language, Record<string, string>> = {
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



    starter_delivery: 'Live in 10 days*',
    starter_support_usd: 'Optional Care Plan: {care_price} / month',
    starter_support_gbp: 'Optional Care Plan: {care_price} / month',
    starter_support_pkr: 'Optional Care Plan: {care_price} / month',
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



    growth_delivery: 'Live in 21 days*',
    growth_support_usd: 'Optional Care Plan: {care_price} / month',
    growth_support_gbp: 'Optional Care Plan: {care_price} / month',
    growth_support_pkr: 'Optional Care Plan: {care_price} / month',
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



    enterprise_delivery: 'From 30 days — fixed in your scope document',
    enterprise_support_usd: 'Dedicated Care Plan: {care_price} / month',
    enterprise_support_gbp: 'Dedicated Care Plan: {care_price} / month',
    enterprise_support_pkr: 'Dedicated Care Plan: {care_price} / month',
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



    starter_delivery: '10 din mein live*',
    starter_support_usd: 'Ikhtiyari Care Plan: {care_price} / mahana',
    starter_support_gbp: 'Ikhtiyari Care Plan: {care_price} / mahana',
    starter_support_pkr: 'Ikhtiyari Care Plan: {care_price} / mahana',
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



    growth_delivery: '21 din mein live*',
    growth_support_usd: 'Ikhtiyari Care Plan: {care_price} / mahana',
    growth_support_gbp: 'Ikhtiyari Care Plan: {care_price} / mahana',
    growth_support_pkr: 'Ikhtiyari Care Plan: {care_price} / mahana',
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



    enterprise_delivery: '30 din se — final date scope document mein',
    enterprise_support_usd: 'Dedicated Care Plan: {care_price} / mahana',
    enterprise_support_gbp: 'Dedicated Care Plan: {care_price} / mahana',
    enterprise_support_pkr: 'Dedicated Care Plan: {care_price} / mahana',
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

export const I18N_DATA = pricedCopy('console', I18N_COPY)

export const EXTRAS_DATA: Extra[] = [
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

export const COMPARE_PRICES = comparePrices('console')

export function getConsolePlans(lang: Language, currency: Currency = 'USD'): Record<PlanKey, OfferPlan> {
const isUrdu = lang === 'ur-en'
const t = I18N_DATA[lang]
const pick = (en: string, ur: string) => (isUrdu ? ur : en)
const priceFor = (usd: string, gbp: string, pkr: string) => (currency === 'USD' ? usd : currency === 'GBP' ? gbp : pkr)
const CONSOLE_DEMO_URL = 'https://console-store-demo.vercel.app/'
const CONSOLE_ADMIN_URL = 'https://console-store-demo.vercel.app/admin'
return {
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
}
export const PLANS_DETAIL = pricedPlans('console', { en: getConsolePlans('en'), 'ur-en': getConsolePlans('ur-en') })
