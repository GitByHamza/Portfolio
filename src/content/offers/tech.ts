import { pricedCopy, pricedPlans, comparePrices } from '../pricing.ts'
import type { Language, PlanKey, OfferPlan, Extra } from '../pricing.ts'

const I18N_COPY: Record<Language, Record<string, string>> = {
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

    starter_name: 'Online Store',
    starter_badge: '1 SHOP',
    starter_desc:
      'For a single computer or CCTV shop starting to sell online, with orders coming to WhatsApp.',


    starter_delivery: 'Live in 10 days*',
    starter_support_pkr: 'Optional Care Plan: {care_price} / month',
    starter_support_usd: 'Optional Care Plan: {care_price} / month',
    starter_callout_label: 'BEST FOR',
    starter_callout_text: 'Getting your shop online fast, with an admin panel your staff can use.',
    starter_f1: 'Online store — we load your first 50 products',
    starter_f2: 'Orders sent to your WhatsApp with full details',
    starter_f3: 'Admin panel for products, stock and orders',
    starter_f4: 'Google Search Console, sitemap and Analytics set up',

    growth_name: 'Retail Operations',
    growth_badge: 'RECOMMENDED',
    growth_desc: 'For established hardware and gaming PC shops selling at the counter and online.',


    growth_delivery: 'Live in 21 days*',
    growth_support_pkr: 'Optional Care Plan: {care_price} / month',
    growth_support_usd: 'Optional Care Plan: {care_price} / month',
    growth_callout_label: 'EVERYTHING IN ONLINE STORE, PLUS',
    growth_callout_text:
      'PC builder, stock across 3 locations, serial warranty tracking, online payments and an AI sales assistant.',
    growth_f1: 'PC builder with compatibility checks',
    growth_f2: 'Stock synced across up to 3 locations',
    growth_f3: 'Serial-number warranty tracking',
    growth_f4: 'Owner and staff logins: costs, margins and settings stay owner-only',
    growth_f5_pkr: 'Card & wallet payments — included (PKR 50,000 value)',
    growth_f5_usd: 'Card & wallet payments — included ($400 value)',
    growth_f6_pkr: 'AI sales assistant — included (PKR 65,000 value)',
    growth_f6_usd: 'AI sales assistant — included ($650 value)',

    enterprise_name: 'Chain & Wholesale',
    enterprise_badge: 'FOR CHAINS',
    enterprise_desc: 'For multi-branch chains, wholesalers and importers with staff across locations.',


    enterprise_delivery: 'From 30 days — fixed in your scope document',
    enterprise_support_pkr: 'Dedicated Care Plan: {care_price} / month',
    enterprise_support_usd: 'Dedicated Care Plan: {care_price} / month',
    enterprise_callout_label: 'EVERYTHING IN RETAIL OPERATIONS, PLUS',
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

    starter_name: 'Online Store',
    starter_badge: '1 DUKAN',
    starter_desc:
      'Ek computer ya CCTV dukan ke liye jo online bechna shuru kar rahi hai — orders WhatsApp par.',


    starter_delivery: '10 din mein live*',
    starter_support_pkr: 'Ikhtiyari Care Plan: {care_price} / mahana',
    starter_support_usd: 'Ikhtiyari Care Plan: {care_price} / mahana',
    starter_callout_label: 'KIS KE LIYE BEHTAR',
    starter_callout_text: 'Dukan ko jaldi online lana, aisa admin panel jo staff aasani se chala sake.',
    starter_f1: 'Online store — pehle 50 products hum daalte hain',
    starter_f2: 'Orders poori details ke sath aapke WhatsApp par',
    starter_f3: 'Products, stock aur orders ke liye admin panel',
    starter_f4: 'Google Search Console, sitemap aur Analytics setup',

    growth_name: 'Retail Operations',
    growth_badge: 'RECOMMENDED',
    growth_desc: 'Established hardware aur gaming PC dukanon ke liye jo counter aur online dono par bechti hain.',


    growth_delivery: '21 din mein live*',
    growth_support_pkr: 'Ikhtiyari Care Plan: {care_price} / mahana',
    growth_support_usd: 'Ikhtiyari Care Plan: {care_price} / mahana',
    growth_callout_label: 'ONLINE STORE KA SAB KUCH, AUR',
    growth_callout_text:
      'PC builder, 3 locations ka stock, serial warranty tracking, online payments aur AI sales assistant.',
    growth_f1: 'Compatibility check wala PC builder',
    growth_f2: '3 locations tak stock sync',
    growth_f3: 'Serial number warranty tracking',
    growth_f4: 'Owner aur staff logins: cost, margin aur settings sirf owner ke paas',
    growth_f5_pkr: 'Card aur wallet payments — shamil (PKR 50,000 ki value)',
    growth_f5_usd: 'Card aur wallet payments — shamil ($400 ki value)',
    growth_f6_pkr: 'AI sales assistant — shamil (PKR 65,000 ki value)',
    growth_f6_usd: 'AI sales assistant — shamil ($650 ki value)',

    enterprise_name: 'Chain & Wholesale',
    enterprise_badge: 'CHAINS KE LIYE',
    enterprise_desc: 'Multi-branch chains, wholesalers aur importers ke liye jin ka staff kai locations par hai.',


    enterprise_delivery: '30 din se — final date scope document mein',
    enterprise_support_pkr: 'Dedicated Care Plan: {care_price} / mahana',
    enterprise_support_usd: 'Dedicated Care Plan: {care_price} / mahana',
    enterprise_callout_label: 'RETAIL OPERATIONS KA SAB KUCH, AUR',
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

export const I18N_DATA = pricedCopy('tech', I18N_COPY)

const PLAN_COPY: Record<Language, Record<PlanKey, OfferPlan>> = {
  en: {
    starter: {
      name: 'Online Store',
      code: '',
      badge: 'ONLINE STORE',


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
        'PC builder (in Retail Operations and Chain)',
        'Stock across more than one location',
        'Serial-number warranty tracking',
        'Product photos and descriptions — you provide them; data entry beyond 50 products is an add-on',
        'Online card and wallet payments (add-on: +PKR 50,000 / $400; included in Retail Operations & Chain)',
        'AI sales assistant (add-on: +PKR 65,000 / $650; included in Retail Operations & Chain)',
      ],
    },
    growth: {
      name: 'Retail Operations',
      code: '',
      badge: 'RECOMMENDED',


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
          title: 'Owner and staff access',
          desc: 'Staff see only what their job needs.',
          items: [
            'Owner only by default: purchase costs, margins, settings and staff accounts',
            'Staff logins limited to their own work: sales, stock or warranty',
            'The owner decides what each staff login can do',
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
        'Product photos and descriptions beyond the included setup',
        'Unlimited revisions — 2 rounds per milestone are included, then hourly',
      ],
    },
    enterprise: {
      name: 'Chain & Wholesale',
      code: '',
      badge: 'FOR CHAINS',


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
      name: 'Online Store',
      code: '',
      badge: 'ONLINE STORE',


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
        'PC builder (Retail Operations aur Chain mein)',
        'Ek se zyada location ka stock',
        'Serial number warranty tracking',
        'Product photos aur descriptions aap dein ge; 50 se zyada products ki data entry add-on hai',
        'Online card aur wallet payments (add-on: +PKR 50,000 / $400; Retail Operations aur Chain mein shamil)',
        'AI sales assistant (add-on: +PKR 65,000 / $650; Retail Operations aur Chain mein shamil)',
      ],
    },
    growth: {
      name: 'Retail Operations',
      code: '',
      badge: 'RECOMMENDED',


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
          title: 'Owner aur staff access',
          desc: 'Staff ko sirf apne kaam ki cheezein nazar aati hain.',
          items: [
            'Default mein sirf owner: purchase cost, margin, settings aur staff accounts',
            'Staff login sirf apne kaam tak: sale, stock ya warranty',
            'Har staff login kya kar sakta hai, yeh owner tay karta hai',
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
        'Included setup se zyada product photos aur descriptions',
        'La-mehdood revisions nahi — har milestone par 2 rounds, phir hourly',
      ],
    },
    enterprise: {
      name: 'Chain & Wholesale',
      code: '',
      badge: 'CHAINS KE LIYE',


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

export const PLANS_DETAIL = pricedPlans('tech', PLAN_COPY)

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
      'Let other shops list their products on your site, and earn a commission on each sale.',
    descUr:
      'Doosri dukanein aapki site par products list karein, aur har sale par aapka commission.',
  },
  {
    en: 'Staff roles & permissions',
    starterOnly: true,
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
      'Accept cards, JazzCash and EasyPaisa on your site. Included in Retail Operations and Chain.',
    descUr:
      'Website par cards, JazzCash aur EasyPaisa. Retail Operations aur Chain mein shamil.',
  },
  {
    en: 'AI sales assistant',
    ur: 'AI sales assistant',
    pricePkr: '+ PKR 65,000',
    priceUsd: '+ $650',
    starterOnly: true,
    descEn:
      'Suggests parts by budget, checks compatibility, and passes the chat to your WhatsApp. Included in Retail Operations and Chain.',
    descUr:
      'Budget ke mutabiq parts suggest, compatibility check, aur chat aapke WhatsApp par. Retail Operations aur Chain mein shamil.',
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

export const COMPARE_PRICES = comparePrices('tech')
