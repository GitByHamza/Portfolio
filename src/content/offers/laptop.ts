import { pricedCopy, pricedPlans, comparePrices } from '../pricing.ts'
import type { Language, PlanKey, OfferPlan, Extra } from '../pricing.ts'

const I18N_COPY: Record<Language, Record<string, string>> = {
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


    starter_delivery: 'Live in 10 days*',
    starter_support_pkr: 'Optional Care Plan: {care_price} / month',
    starter_support_usd: 'Optional Care Plan: {care_price} / month',
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


    growth_delivery: 'Live in 21 days*',
    growth_support_pkr: 'Optional Care Plan: {care_price} / month',
    growth_support_usd: 'Optional Care Plan: {care_price} / month',
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


    enterprise_delivery: 'From 30 days — fixed in your scope document',
    enterprise_support_pkr: 'Dedicated Care Plan: {care_price} / month',
    enterprise_support_usd: 'Dedicated Care Plan: {care_price} / month',
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


    starter_delivery: '10 din mein live*',
    starter_support_pkr: 'Ikhtiyari Care Plan: {care_price} / mahana',
    starter_support_usd: 'Ikhtiyari Care Plan: {care_price} / mahana',
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


    growth_delivery: '21 din mein live*',
    growth_support_pkr: 'Ikhtiyari Care Plan: {care_price} / mahana',
    growth_support_usd: 'Ikhtiyari Care Plan: {care_price} / mahana',
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


    enterprise_delivery: '30 din se — final date scope document mein',
    enterprise_support_pkr: 'Dedicated Care Plan: {care_price} / mahana',
    enterprise_support_usd: 'Dedicated Care Plan: {care_price} / mahana',
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

export const I18N_DATA = pricedCopy('laptop', I18N_COPY)

const PLAN_COPY: Record<Language, Record<PlanKey, OfferPlan>> = {
  en: {
    starter: {
      name: 'Single Store',
      code: '',
      badge: 'SINGLE STORE',


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

export const PLANS_DETAIL = pricedPlans('laptop', PLAN_COPY)

export const EXTRAS_DATA: Extra[] = [
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

export const COMPARE_PRICES = comparePrices('laptop')
