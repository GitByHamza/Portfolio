// The Tech Retail funnel: one page for tech retailers in Pakistan, with a version for each shop type.
// Each version leads with the plan its ads promise (Retail Operations) and shows that plan's PKR price.
import { BUSINESS } from '../data/business.js'
import { PLAN_KEYS, PLAN_NAMES, priceCatalog, priceLabel } from './pricing.ts'
import type { OfferKey, PlanKey } from './pricing.ts'

// Mobile and camera shops are left out until each has its own demo, scope and price.
export const SHOP_TYPES = ['pc', 'laptop', 'console'] as const
export type ShopType = (typeof SHOP_TYPES)[number]
export type FunnelLanguage = 'en' | 'ur-en'
export const isShopType = (value: unknown): value is ShopType => (SHOP_TYPES as readonly unknown[]).includes(value)

// The hero film carries no pricing. Its source is the Remotion project in videos/tech-retail.
export const FUNNEL_ASSETS = { video: '/video/tech-retail-overview.mp4', poster: '/video/tech-retail-poster.webp', captions: '/video/tech-retail-captions.vtt' }

const DEMOS: Record<ShopType, string> = {
  pc: 'https://store-demo-eight.vercel.app/?mode=pc',
  laptop: 'https://store-demo-eight.vercel.app/?mode=laptop',
  console: 'https://console-store-demo.vercel.app/?currency=PKR',
}
export const funnelDemoUrl = (shop: ShopType): string => DEMOS[shop]

/** Each shop type has its own page, so an ad opens the right version without a flash of another one. */
export const funnelPath = (lang: FunnelLanguage, shop?: ShopType): string => `${lang === 'ur-en' ? '/ur' : ''}/tech-retail/offer${shop ? `/${shop}` : ''}`

const OFFER_FOR: Record<ShopType, OfferKey> = { pc: 'tech', laptop: 'laptop', console: 'console' }

/** The one-time PKR price of a plan for a shop type, from the same price list as the offer pages. */
export function funnelPrice(shop: ShopType, plan: PlanKey, lang: FunnelLanguage): string {
  return priceLabel(priceCatalog[OFFER_FOR[shop]][plan].PKR, 'PKR', lang)
}

export function loomEmbedUrl(value: string | null): string | null {
  if (!value) return null
  try {
    const url = new URL(value)
    const match = url.pathname.match(/^\/(?:share|embed)\/([a-f0-9]{32})\/?$/i)
    if (url.protocol !== 'https:' || !['loom.com', 'www.loom.com'].includes(url.hostname) || !match) return null
    return `https://www.loom.com/embed/${match[1]}`
  } catch { return null }
}

type Shop = {
  label: string; chat: string
  // The hero for this shop type: a pain-led question, the mechanism, and what the system keeps.
  headline: [string, string]; sub: string
  // The plan the ads sell, named for this shop type, and what it buys.
  opsName: string; opsFeatures: string; recommended: string
  question: string; pain: string; fix: string; fixPlan: PlanKey
  featureTitle: string; featureCaption: string; featureLine: string; points: [string, string][] | null
  plans: Record<PlanKey, string[]>
}
type Store = { shop: ShopType; name: string; line: string }

// Set to false the day the second Founding Partner shop signs: the top strip and its FAQ answer disappear.
export const FOUNDING_PARTNER_OPEN = true

const OWNER_STAFF = {
  en: 'Owner and staff logins: costs, margins and settings stay owner-only',
  'ur-en': 'Owner aur staff logins: cost, margin aur settings sirf owner ke paas',
}

export const FUNNEL_COPY = {
  en: {
    oneTime: 'one-time build',
    runningCosts: 'Running costs separate.',
    shopPrompt: 'Choose your shop category',
    cta: 'See the demo on WhatsApp',
    ctaNote: 'A two-minute demo for your kind of shop. No commitment.',
    demoCta: 'Try the live demo yourself',
    demoNote: 'Opens a working demo store with sample products.',
    preview: 'Tech Retail OS · 42-second overview',
    previewNote: 'Real product screens · Sample products and demo data',
    videoButton: 'Play the Tech Retail OS overview',
    videoFallback: 'Your browser cannot play this video.',
    stickyCta: 'Demo on WhatsApp',
    whatsappMessage: (shop: string, plan?: string) => `Assalam o Alaikum, I have a ${shop} shop and I would like to see the demo${plan ? ` and ask about the ${plan} plan` : ''}.`,
    problemHeading: 'Does this happen to you too?',
    problemIntro: 'The same questions, message after message. And every answer means checking by hand.',
    problemAsk: 'Customers keep asking you:',
    stockAsk: 'At the counter and on WhatsApp, every day:',
    warrantyAsk: 'When an item comes back for a claim:',
    planTag: 'In Retail Operations',
    shops: {
      pc: {
        label: 'PC & Gaming', chat: 'computer / gaming',
        headline: ['Making a fresh quote for every PC build?', 'Customers pick the parts. The build arrives on your WhatsApp.'],
        sub: 'PC builder, stock and serial-number warranty records, in one system for your shop.',
        opsName: 'PC Retail Operations', opsFeatures: 'PC builder, serial-number warranty and stock for up to 3 locations.', recommended: 'Recommended for shops selling custom builds',
        question: '“Will these parts work together?”', pain: 'Your team repeats the same socket, RAM and power-supply checks for every custom build.', fix: 'The PC builder checks the CPU socket, RAM type, power-supply wattage and GPU clearance as the customer picks parts.', fixPlan: 'growth',
        featureTitle: 'An online PC builder that works from your stock.', featureCaption: 'PC builder · Sample component catalogue', featureLine: 'Customers build their own PC on your website. The builder suggests only parts you have in stock that work together, and the finished build reaches you as an order on WhatsApp.', points: null,
        plans: {
          starter: ['Your own online store, with your first 50 products loaded', 'Full spec sheets, filters and search', 'Orders sent to your WhatsApp with full details', 'Admin panel for products, stock and orders'],
          growth: ['Everything in Online Store', 'PC builder with compatibility checks', 'Serial-number warranty tracking', 'Stock synced across up to 3 locations', OWNER_STAFF.en, 'Card and wallet payments, and an AI sales assistant'],
          enterprise: ['Everything in Retail Operations', 'Unlimited branches and warehouses, with stock transfers', 'Branch roles: owner, manager, cashier, warehouse', 'POS hardware, courier and FBR integration'],
        },
      },
      laptop: {
        label: 'Laptop', chat: 'laptop',
        headline: ['“Battery health? Condition? RAM?” A different answer for every customer?', 'Every laptop fully described on one page. The choice arrives on WhatsApp.'],
        sub: 'Condition, battery health, stock and serial warranty records, in one system for your shop.',
        opsName: 'Laptop Retail Operations', opsFeatures: 'Serial-number and battery warranty, and stock for up to 3 locations.', recommended: 'Recommended for dealers tracking serials and battery health',
        question: '“What is the battery health? Which grade?”', pain: 'Every customer asks the same thing, and you send a screenshot every time.', fix: 'Each laptop page shows its condition grade, battery health and upgrade options.', fixPlan: 'starter',
        featureTitle: 'Every laptop, fully described.', featureCaption: 'What each laptop page shows', featureLine: 'Customers see everything on the page, so you stop sending the same screenshots.', points: [['Condition grade', 'A, B or C, stated clearly'], ['Battery health', 'Shown for each unit'], ['Upgrades', 'RAM and SSD options']],
        plans: {
          starter: ['Your own online store, with your first 50 laptops loaded', 'Condition grade, battery health and RAM/SSD upgrade options on every page', 'Orders sent to your WhatsApp with full details', 'Admin panel for products, stock and orders'],
          growth: ['Everything in Online Store', 'Serial-number and battery warranty tracking', 'Stock synced across up to 3 locations (shop, testing bench, warehouse)', 'Accessory suggestions at checkout', OWNER_STAFF.en, 'Card and wallet payments, and an AI laptop finder'],
          enterprise: ['Everything in Retail Operations', 'Unlimited branches and warehouses, with stock transfers', 'Corporate quotes with tiered bulk pricing', 'Container import from a supplier spreadsheet'],
        },
      },
      console: {
        label: 'Console & Games', chat: 'console / games',
        headline: ['Sealed, used and trade-in stock, all tracked separately?', 'Trade-in quotes, condition and serial records in one system.'],
        sub: 'Customers see their trade-in value themselves, and you keep a serial and seal record for every console.',
        opsName: 'Console Retail Operations', opsFeatures: 'Trade-in calculator, serial and seal tracking, and stock for up to 3 locations.', recommended: 'Recommended for shops doing trade-ins',
        question: '“How much for the new one if I trade in my old console?”', pain: 'You work out the same trade-in sums again and again.', fix: 'The trade-in quote and the condition label are on the page.', fixPlan: 'growth',
        featureTitle: 'Trade-ins without the arithmetic.', featureCaption: 'What each console page shows', featureLine: 'Customers see what their old console is worth before they message you.', points: [['Trade-in quote', 'Shown on the page'], ['Condition label', 'For every used unit'], ['Serial warranty', 'A record for each sale']],
        plans: {
          starter: ['Your own game store, with your first 50 items loaded', 'Platform filters and condition labels (Sealed, Mint disc)', 'Orders sent to your WhatsApp with full details', 'Admin panel for products, stock and orders'],
          growth: ['Everything in Online Store', 'Trade-in calculator (cash or store credit)', 'Console serial and seal tracking', 'Stock synced across up to 3 locations', OWNER_STAFF.en, 'Card and wallet payments, and an AI game finder'],
          enterprise: ['Everything in Retail Operations', 'Unlimited branches and a counter trade-in kiosk', 'Wholesale and gaming-lounge invoicing', 'Branch roles: owner, technician, cashier'],
        },
      },
    } satisfies Record<ShopType, Shop>,
    stock: ['“Is it in stock?”', 'A customer waits while someone checks the shelf, the store room or the other branch.', 'Counter sales and online orders work from the same stock, by location.'],
    warranty: ['“Where is the warranty record?”', 'A returned item means searching bills, messages and supplier records.', 'Search the serial number and see when it was sold, to whom, and until when it is covered.'],
    stockTitle: 'Know what is in stock.',
    stockLine: 'Counter, website and every branch work from one stock. Sell at the counter and the website updates too.',
    stockCaption: 'Product and stock admin · Real screen, demo data',
    plansHeading: 'Three plans. One for your stage.',
    plansIntro: 'One-time build fee. No TeXCodes monthly platform fee or sales commission. Hosting, domain and third-party usage costs are separate; Care Plans are optional.',
    planLines: {
      starter: 'One shop online, with orders arriving on WhatsApp.',
      growth: 'One shop or up to 3 locations, with the tools your trade needs.',
      enterprise: 'Chains, wholesalers and importers with staff across locations.',
    } satisfies Record<PlanKey, string>,
    planDelivery: { starter: 'Live in 10 days', growth: 'Live in 21 days', enterprise: 'From 30 days' } satisfies Record<PlanKey, string>,
    planCta: 'Ask about this plan on WhatsApp',
    planItems: 'What is included',
    plansNote: 'Delivery time starts when your content and first payment arrive.',
    guaranteeTitle: 'You test before the final payment.',
    guarantee: 'You check your system on a private link against a signed acceptance checklist. Anything unmet is fixed within 10 working days. If the checklist still cannot be met, your deposit is refundable on request and the work ends.',
    storesHeading: 'Do not take our word for it. Use it.',
    storesIntro: 'Real screens with sample products. Open a demo store on your phone and place a test order.',
    stores: [
      { shop: 'pc', name: 'Computer & gaming store', line: 'With the PC builder' },
      { shop: 'laptop', name: 'Laptop store', line: 'With grades and battery health' },
      { shop: 'console', name: 'Console & games store', line: 'With trade-in quotes' },
    ] satisfies Store[],
    storeCta: 'Open the demo',
    ownedHeading: 'After launch, it is all yours.',
    owned: [['Code', 'Your store’s repository, with permanent use of the shared core'], ['Database', 'Your products, orders and customers'], ['Admin accounts', 'Every login is handed over'], ['30 days of bug fixes', 'Free, for what we delivered']],
    partnerStrip: 'Founding Partner: special terms for the first 2 tech shops only.',
    partnerStripCta: 'Ask on WhatsApp',
    partnerFaq: ['What is the Founding Partner offer?', 'We are starting in Pakistan, so the first 2 tech shops get special terms. In return we ask for three things: your honest review after launch, permission to show your shop as a case study, and a 20-minute feedback call.'] as [string, string],
    partnerMessage: ' I would also like to know about the Founding Partner terms.',
    processHeading: 'From first message to your own system.',
    process: [
      ['Demo first', 'We show you the system for your kind of shop. It costs nothing.'],
      ['Written scope', 'What will be built, and by when, is written down before you sign.'],
      ['You test, then launch', 'You check your own system on a private link. After launch the code, database and admin accounts are yours.'],
    ],
    faqHeading: 'Before we talk.',
    faq: [
      ['Can you bring over our existing products?', 'Your first 50 products are loaded in the setup. Send them in our spreadsheet format with photos. More products, or cleaning up messy data, costs PKR 15,000 per 50.'],
      ['Who trains my staff?', 'Before launch we run one training session for you and your staff, and give you short screen recordings to keep. Each staff login sees only its own work; purchase costs, margins and settings stay with the owner.'],
      ['Will the stock always be right?', 'Online orders update stock on their own. Counter sales and transfers between locations are right when your staff enter them; the system cannot see a sale nobody recorded.'],
      ['What happens after launch?', 'Bugs in what we delivered are fixed free for 30 days. After that, a Care Plan is optional: it covers hosting, backups and small changes, with the reply time written in each plan. Your data and backups belong to you.'],
      ['How do payments and approval work?', 'In three stages, 40 / 40 / 20: at the start, when you approve the test version, and at launch. You test against a signed checklist before the final stage.'],
    ],
    finalHeading: 'See how it fits your shop.',
    finalCopy: 'Four quick answers and we send the demo for your kind of shop on WhatsApp.',
    form: {
      shop: 'Shop category', city: 'City', cityPlaceholder: 'e.g. Lahore', branches: 'Branches',
      branchOptions: { '1': '1 shop', '2-3': '2–3 branches', '4+': '4 or more' },
      whatsapp: 'Your WhatsApp number', whatsappPlaceholder: '0300 1234567',
      submit: 'Send me the demo on WhatsApp', note: 'We use your number only to send the demo. No spam calls.',
      errors: { shop: 'Choose your shop type.', city: 'Write the city your shop is in.', branches: 'Choose how many branches you have.', whatsapp: 'Write a Pakistani mobile number, like 0300 1234567.' },
      doneHeading: 'Thank you. Now press send on WhatsApp.',
      doneCopy: 'Your answers are already written in the message. If WhatsApp did not open, tap the button.',
      doneCta: 'Open WhatsApp',
      saveFailed: 'We could not save your answers on our side. They are still in the WhatsApp message, so just press send.',
      saveRetry: 'Try saving again',
      saveRetrying: 'Saving…',
      saved: 'Saved. We have your answers.',
    },
    formMessage: (shop: string, city: string, branches: string) => `Assalam o Alaikum, I have a ${shop} shop in ${city} (${branches}). I would like to see the demo.`,
    orDirect: 'Or message us on WhatsApp directly',
    privacy: 'Privacy', terms: 'Terms', retailTerms: 'Retail delivery terms',
  },
  'ur-en': {
    oneTime: 'ek dafa ki build fee',
    runningCosts: 'Running costs alag.',
    shopPrompt: 'Apni shop ki category chunein',
    cta: 'WhatsApp pe demo dekhein',
    ctaNote: 'Aap ki shop ke hisaab se 2-minute demo. Koi commitment nahi.',
    demoCta: 'Live demo khud dekhein',
    demoNote: 'Chalta hua demo store khulega, sample products ke saath.',
    preview: 'Tech Retail OS · 42-second overview',
    previewNote: 'Real product screens · Sample products aur demo data',
    videoButton: 'Tech Retail OS ka overview chalayein',
    videoFallback: 'Aap ka browser yeh video nahi chala sakta.',
    stickyCta: 'WhatsApp pe demo',
    whatsappMessage: (shop: string, plan?: string) => `Assalam o Alaikum, meri ${shop} shop hai aur mujhe demo dekhna hai${plan ? `. ${plan} plan ke baare mein bhi poochna hai` : ''}.`,
    problemHeading: 'Kya aap ke saath bhi aisa hota hai?',
    problemIntro: 'Har customer wohi sawal baar baar poochta hai, aur har jawab ke liye aap ko khud check karna parta hai.',
    problemAsk: 'Customers aap se baar baar poochte hain:',
    stockAsk: 'Counter pe aur WhatsApp pe, roz:',
    warrantyAsk: 'Jab koi item claim ke liye wapas aaye:',
    planTag: 'Retail Operations mein',
    shops: {
      pc: {
        label: 'PC & Gaming', chat: 'computer / gaming',
        headline: ['Har PC build ki quotation baar baar banani parti hai?', 'Customer parts select kare. Build ki details aap ke WhatsApp par aayein.'],
        sub: 'PC builder, stock aur serial-number warranty ka record, aap ki shop ke liye ek system mein.',
        opsName: 'PC Retail Operations', opsFeatures: 'PC builder, serial-number warranty aur 3 locations tak stock.', recommended: 'Custom builds bechne wali shops ke liye',
        question: '“Kya yeh parts saath chalenge?”', pain: 'Har custom build ke liye socket, RAM aur power supply dobara check karni parti hai.', fix: 'PC builder customer ke parts chunte waqt CPU socket, RAM type, power supply wattage aur GPU clearance check karta hai.', fixPlan: 'growth',
        featureTitle: 'Online PC builder, aap ke stock se.', featureCaption: 'PC builder · Sample catalogue', featureLine: 'Customer aap ki website pe khud apna PC build karta hai. Builder sirf wohi parts suggest karta hai jo aap ke stock mein hain aur aapas mein compatible hain, aur poora build WhatsApp pe order ban kar aap tak aata hai.', points: null,
        plans: {
          starter: ['Aap ka apna online store, pehle 50 products hum load karte hain', 'Poori specs, filters aur search', 'Orders poori detail ke saath aap ke WhatsApp pe', 'Products, stock aur orders ka admin panel'],
          growth: ['Online Store ka sab kuch', 'PC builder, compatibility checks ke saath', 'Serial-number warranty tracking', '3 locations tak stock sync', OWNER_STAFF['ur-en'], 'Card aur wallet payments, aur AI sales assistant'],
          enterprise: ['Retail Operations ka sab kuch', 'Unlimited branches aur warehouses, stock transfers ke saath', 'Branch roles: owner, manager, cashier, warehouse', 'POS hardware, courier aur FBR integration'],
        },
      },
      laptop: {
        label: 'Laptop', chat: 'laptop',
        headline: ['“Battery health? Condition? RAM?” Har customer ko alag jawab?', 'Har laptop ki poori detail ek page par. Selection seedha WhatsApp par.'],
        sub: 'Condition, battery health, stock aur serial warranty ka record, aap ki shop ke liye ek system mein.',
        opsName: 'Laptop Retail Operations', opsFeatures: 'Serial-number aur battery warranty, aur 3 locations tak stock.', recommended: 'Serial aur battery health track karne wale dealers ke liye',
        question: '“Battery health kitni hai? Grade kya hai?”', pain: 'Har customer yehi poochta hai, aur aap har dafa screenshot bhejte hain.', fix: 'Har laptop ke page pe condition grade, battery health aur upgrade options likhe hote hain.', fixPlan: 'starter',
        featureTitle: 'Har laptop ki poori detail.', featureCaption: 'Har laptop ke page pe yeh nazar aata hai', featureLine: 'Customer page pe hi sab dekh leta hai, aap ko har dafa screenshot nahi bhejna parta.', points: [['Condition grade', 'A, B ya C, saaf likha hua'], ['Battery health', 'Har unit ke saath'], ['Upgrades', 'RAM aur SSD options']],
        plans: {
          starter: ['Aap ka apna online store, pehle 50 laptops hum load karte hain', 'Har page pe condition grade, battery health aur RAM/SSD upgrade options', 'Orders poori detail ke saath aap ke WhatsApp pe', 'Products, stock aur orders ka admin panel'],
          growth: ['Online Store ka sab kuch', 'Serial-number aur battery warranty tracking', '3 locations tak stock sync (dukan, testing bench, godam)', 'Checkout pe accessories suggestions', OWNER_STAFF['ur-en'], 'Card aur wallet payments, aur AI laptop finder'],
          enterprise: ['Retail Operations ka sab kuch', 'Unlimited branches aur warehouses, stock transfers ke saath', 'Corporate quotes, bulk pricing ke saath', 'Supplier spreadsheet se container import'],
        },
      },
      console: {
        label: 'Console & Games', chat: 'console / games',
        headline: ['Sealed, used aur trade-in stock ka record alag alag?', 'Trade-in quote, condition aur serial ka record, ek hi system mein.'],
        sub: 'Customer trade-in value khud dekhe, aur har console ka serial aur seal record aap ke paas.',
        opsName: 'Console Retail Operations', opsFeatures: 'Trade-in calculator, serial aur seal tracking, aur 3 locations tak stock.', recommended: 'Trade-in karne wali shops ke liye',
        question: '“Purana console de kar naya kitne ka parega?”', pain: 'Trade-in ka wohi hisaab aap baar baar lagate hain.', fix: 'Trade-in quote aur condition label page pe hi hota hai.', fixPlan: 'growth',
        featureTitle: 'Trade-in, bina hisaab kitaab ke.', featureCaption: 'Har console ke page pe yeh nazar aata hai', featureLine: 'Customer message karne se pehle hi dekh leta hai ke purane console ki kitni value hai.', points: [['Trade-in quote', 'Page pe hi'], ['Condition label', 'Har used unit ke saath'], ['Serial warranty', 'Har sale ka record']],
        plans: {
          starter: ['Aap ka apna game store, pehle 50 items hum load karte hain', 'Platform filters aur condition labels (Sealed, Mint disc)', 'Orders poori detail ke saath aap ke WhatsApp pe', 'Products, stock aur orders ka admin panel'],
          growth: ['Online Store ka sab kuch', 'Trade-in calculator (cash ya store credit)', 'Console serial aur seal tracking', '3 locations tak stock sync', OWNER_STAFF['ur-en'], 'Card aur wallet payments, aur AI game finder'],
          enterprise: ['Retail Operations ka sab kuch', 'Unlimited branches aur counter ka trade-in kiosk', 'Wholesale aur gaming lounges ki invoicing', 'Branch roles: owner, technician, cashier'],
        },
      },
    } satisfies Record<ShopType, Shop>,
    stock: ['“Stock mein hai?”', 'Customer wait karta hai aur koi shelf, godown ya doosri branch check karta hai.', 'Counter aur online orders ek hi stock se chalte hain, har location ke hisaab se.'],
    warranty: ['“Warranty ka record kahan hai?”', 'Return aaye to bills, messages aur supplier ke records dhoondne parte hain.', 'Serial number search karein: kab sale hua, kis ko, aur warranty kab tak hai.'],
    stockTitle: 'Stock ka pata, har waqt.',
    stockLine: 'Counter, website aur har branch ka stock ek hi jagah. Counter pe item bika to website pe bhi update ho jata hai.',
    stockCaption: 'Products aur stock admin · Real screen, demo data',
    plansHeading: '3 plans. Aap ki shop ke hisaab se.',
    plansIntro: 'Ek dafa ki build fee. TeXCodes ki koi monthly platform fee ya sales commission nahi. Hosting, domain aur third-party usage ka kharcha alag hai; Care Plans optional hain.',
    planLines: {
      starter: 'Ek shop online, orders WhatsApp pe.',
      growth: 'Ek shop ya 3 locations tak, aap ke kaam ke khaas tools ke saath.',
      enterprise: 'Chains, wholesalers aur importers, staff ke saath.',
    } satisfies Record<PlanKey, string>,
    planDelivery: { starter: '10 din mein live', growth: '21 din mein live', enterprise: '30 din se' } satisfies Record<PlanKey, string>,
    planCta: 'Is plan ke baare mein WhatsApp pe poochein',
    planItems: 'Is mein kya milta hai',
    plansNote: 'Delivery ka time aap ka content aur pehli payment milne se shuru hota hai.',
    guaranteeTitle: 'Aakhri payment se pehle aap test karte hain.',
    guarantee: 'Private link pe apna system signed acceptance checklist ke mutabiq check karein. Jo cheez poori na ho, 10 working days mein theek hoti hai. Agar checklist phir bhi poori na ho sake, to aap ke kehne pe deposit wapas aur kaam khatam.',
    storesHeading: 'Hamari baat pe na jayein. Khud chala kar dekhein.',
    storesIntro: 'Real screens, sample products ke saath. Apne phone pe demo store kholein aur ek test order kar ke dekhein.',
    stores: [
      { shop: 'pc', name: 'Computer & gaming store', line: 'PC builder ke saath' },
      { shop: 'laptop', name: 'Laptop store', line: 'Grades aur battery health ke saath' },
      { shop: 'console', name: 'Console & games store', line: 'Trade-in quotes ke saath' },
    ] satisfies Store[],
    storeCta: 'Demo kholein',
    ownedHeading: 'Launch ke baad sab aap ka.',
    owned: [['Code', 'Aap ke store ki repository, shared core ke permanent use ke saath'], ['Database', 'Aap ke products, orders aur customers'], ['Admin accounts', 'Har login aap ko milta hai'], ['30 din bug fixes', 'Free, jo humne banaya us ke liye']],
    partnerStrip: 'Founding Partner: sirf pehli 2 tech shops ke liye special terms.',
    partnerStripCta: 'WhatsApp pe poochein',
    partnerFaq: ['Founding Partner kya hai?', 'Hum Pakistan mein start kar rahe hain, is liye pehli 2 tech shops ko special terms milte hain. Badle mein hum 3 cheezein maangte hain: launch ke baad aap ka honest review, aap ki shop ko case study dikhane ki permission, aur 20-minute ka feedback call.'] as [string, string],
    partnerMessage: ' Founding Partner terms ke baare mein bhi batayein.',
    processHeading: 'Pehle message se apne system tak.',
    process: [
      ['Pehle demo', 'Hum aap ki shop ke hisaab se system dikhate hain. Bilkul free.'],
      ['Written scope', 'Kya banega aur kab tak: sign se pehle likha hua.'],
      ['Aap test karein, phir launch', 'Private link pe apna system check karein. Launch ke baad code, database aur admin accounts aap ke.'],
    ],
    faqHeading: 'Baat karne se pehle.',
    faq: [
      ['Hamare purane products aa jayenge?', 'Pehle 50 products setup mein hum daalte hain. Hamare spreadsheet format mein photos ke saath bhejein. Zyada products, ya ulta pulta data saaf karna, PKR 15,000 har 50 products.'],
      ['Staff ki training kaun karega?', 'Launch se pehle aap aur aap ke staff ke saath ek training session, aur rakhne ke liye chhoti screen recordings. Har staff login sirf apna kaam dekhta hai; purchase cost, margin aur settings owner ke paas rehte hain.'],
      ['Kya stock hamesha sahi rahega?', 'Online orders stock khud update karte hain. Counter sale aur branches ke darmiyan transfer tab sahi rehte hain jab staff unhein enter kare; jo sale kisi ne record hi na ki, system use nahi dekh sakta.'],
      ['Launch ke baad kya hota hai?', 'Jo humne banaya us ke bugs 30 din tak free theek hote hain. Us ke baad Care Plan optional hai: hosting, backups aur chhoti changes, aur har plan mein jawab ka time likha hai. Aap ka data aur backups aap ke hain.'],
      ['Payment aur approval kaise hoti hai?', '3 stages mein, 40 / 40 / 20: shuru mein, test version approve hone pe, aur launch pe. Aakhri stage se pehle aap signed checklist pe test karte hain.'],
    ],
    finalHeading: 'Dekhein yeh aap ki shop mein kaise chalega.',
    finalCopy: '4 chhote sawal, aur hum aap ki shop ke hisaab se demo WhatsApp pe bhej dete hain.',
    form: {
      shop: 'Shop ki category', city: 'Shehar', cityPlaceholder: 'Jaise Lahore', branches: 'Branches',
      branchOptions: { '1': '1 shop', '2-3': '2–3 branches', '4+': '4 ya zyada' },
      whatsapp: 'Aap ka WhatsApp number', whatsappPlaceholder: '0300 1234567',
      submit: 'Demo WhatsApp pe mangwayein', note: 'Number sirf demo bhejne ke liye. Koi spam call nahi.',
      errors: { shop: 'Shop type chunein.', city: 'Apni shop ka shehar likhein.', branches: 'Kitni branches hain, chunein.', whatsapp: 'Pakistani mobile number likhein, jaise 0300 1234567.' },
      doneHeading: 'Shukriya. Ab WhatsApp pe send dabayein.',
      doneCopy: 'Aap ke jawab message mein likhe hue hain. WhatsApp na khula ho to button dabayein.',
      doneCta: 'WhatsApp kholein',
      saveFailed: 'Aap ke jawab hamari taraf save nahi ho sake. Woh WhatsApp message mein mojood hain, bas send dabayein.',
      saveRetry: 'Dobara save karein',
      saveRetrying: 'Save ho raha hai…',
      saved: 'Save ho gaya. Aap ke jawab hamare paas hain.',
    },
    formMessage: (shop: string, city: string, branches: string) => `Assalam o Alaikum, meri ${shop} shop ${city} mein hai (${branches}). Mujhe demo dekhna hai.`,
    orDirect: 'Ya seedha WhatsApp pe message karein',
    privacy: 'Privacy', terms: 'Terms', retailTerms: 'Retail delivery terms',
  },
}

/** The line under the hero: the plan this page's ads sell, its price and what it buys. */
export function funnelQualifier(lang: FunnelLanguage, shop: ShopType): string {
  const copy = FUNNEL_COPY[lang]
  const entry = copy.shops[shop]
  const price = funnelPrice(shop, 'growth', lang)
  return lang === 'ur-en'
    ? `${entry.opsName}: ${price}, ${copy.oneTime}. ${entry.opsFeatures} ${copy.runningCosts}`
    : `${entry.opsName}: ${price} ${copy.oneTime}. ${entry.opsFeatures} ${copy.runningCosts}`
}

export const funnelPlans = (lang: FunnelLanguage, shop: ShopType) => PLAN_KEYS.map((key) => ({
  key, name: PLAN_NAMES[key], price: funnelPrice(shop, key, lang), line: FUNNEL_COPY[lang].planLines[key],
  delivery: FUNNEL_COPY[lang].planDelivery[key], items: FUNNEL_COPY[lang].shops[shop].plans[key],
  recommended: key === 'growth' ? FUNNEL_COPY[lang].shops[shop].recommended : null,
}))

// A short code naming the ad that sent the visitor, from utm_content (or utm_campaign).
// Added to WhatsApp messages so chats that skip the form still show which ad started them.
export function adRef(source: { utm_content?: string; utm_campaign?: string }): string | null {
  const raw = (source.utm_content || source.utm_campaign || '').toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 32)
  return raw || null
}
const withRef = (message: string, ref?: string | null) => ref ? `${message} [${ref}]` : message
const waUrl = (message: string) => `https://wa.me/${BUSINESS.phoneE164.replace('+', '')}?text=${encodeURIComponent(message)}`

export function funnelWhatsAppUrl(lang: FunnelLanguage, shop: ShopType, plan?: string, partner = false, ref?: string | null): string {
  const copy = FUNNEL_COPY[lang]
  return waUrl(withRef(copy.whatsappMessage(copy.shops[shop].chat, plan) + (partner ? copy.partnerMessage : ''), ref))
}

/** The WhatsApp chat opened after the short form: the visitor's answers are already written in it. */
export function funnelFormWhatsAppUrl(lang: FunnelLanguage, lead: { shop: ShopType; city: string; branches: '1' | '2-3' | '4+' }, ref?: string | null): string {
  const copy = FUNNEL_COPY[lang]
  return waUrl(withRef(copy.formMessage(copy.shops[lead.shop].chat, lead.city, copy.form.branchOptions[lead.branches]), ref))
}
