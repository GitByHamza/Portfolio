// The Tech Retail funnel: one page for tech retailers in Pakistan, with a version for each shop type.
// Consultation first: the page sells outcomes and a demo call, and shows no price. The investment is
// explained on the call and written in the proposal; the price list stays in pricing.ts for the offer pages.
import { BUSINESS } from '../data/business.js'

// Mobile and camera shops are left out until each has its own demo and scope.
export const SHOP_TYPES = ['pc', 'laptop', 'console'] as const
export type ShopType = (typeof SHOP_TYPES)[number]
export type FunnelLanguage = 'en' | 'ur-en'
export const isShopType = (value: unknown): value is ShopType => (SHOP_TYPES as readonly unknown[]).includes(value)

// Lightweight qualification on the demo form: how the shop keeps records today, and what it needs first.
export const PROCESS_OPTIONS = ['register', 'sheets', 'software', 'whatsapp'] as const
export type CurrentProcess = (typeof PROCESS_OPTIONS)[number]
export const NEED_OPTIONS = ['trade', 'stock', 'warranty', 'orders', 'staff'] as const
export type Need = (typeof NEED_OPTIONS)[number]
export type FunnelBranches = '1' | '2-3' | '4+'

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

/** Where every "Book a demo" button on the page leads: the qualification form. */
export const BOOK_DEMO_ID = 'book-demo'

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
  // The hero for this shop type: a pain-led question, the mechanism, what the system keeps, and who it is built for.
  headline: [string, string]; sub: string; positioning: string
  question: string; pain: string; fix: string
  // The outcome only this shop type gets, and its name on the form's "what do you need first" list.
  outcome: [string, string]; need: string
  featureTitle: string; featureCaption: string; featureLine: string; points: [string, string][] | null
}
type Store = { shop: ShopType; name: string; line: string }

// Set to false the day the second Founding Partner shop signs: the top strip and its FAQ answer disappear.
export const FOUNDING_PARTNER_OPEN = true

export const FUNNEL_COPY = {
  en: {
    shopPrompt: 'Choose your shop category',
    cta: 'Book a demo for your shop',
    ctaNote: 'We look at how your shop works and show what would fit. No commitment.',
    demoCta: 'Try the live demo yourself',
    demoNote: 'Opens a working demo store with sample products.',
    preview: 'Tech Retail OS · 42-second overview',
    previewNote: 'Real product screens · Sample products and demo data',
    videoButton: 'Play the Tech Retail OS overview',
    videoFallback: 'Your browser cannot play this video.',
    stickyCta: 'Book a demo',
    whatsappMessage: (shop: string) => `Assalam o Alaikum, I have a ${shop} shop and I would like to book a demo.`,
    problemHeading: 'Does this happen to you too?',
    problemIntro: 'The same questions, message after message. And every answer means checking by hand.',
    problemAsk: 'Customers keep asking you:',
    stockAsk: 'At the counter and on WhatsApp, every day:',
    warrantyAsk: 'When an item comes back for a claim:',
    shops: {
      pc: {
        label: 'PC & Gaming', chat: 'computer / gaming',
        headline: ['Making a fresh quote for every PC build?', 'Customers pick the parts. The build arrives on your WhatsApp.'],
        sub: 'PC builder, stock and serial-number warranty records, in one system for your shop.',
        positioning: 'A retail operations system, custom-built for established PC and gaming shops.',
        question: '“Will these parts work together?”', pain: 'Your team repeats the same socket, RAM and power-supply checks for every custom build.', fix: 'The PC builder checks the CPU socket, RAM type, power-supply wattage and GPU clearance as the customer picks parts.',
        outcome: ['Custom builds without the back-and-forth', 'Customers pick compatible parts from your stock. You confirm the build and the price.'], need: 'PC build quotes',
        featureTitle: 'An online PC builder that works from your stock.', featureCaption: 'PC builder · Sample component catalogue', featureLine: 'Customers build their own PC on your website. The builder suggests only parts you have in stock that work together, and the finished build reaches you as an order on WhatsApp.', points: null,
      },
      laptop: {
        label: 'Laptop', chat: 'laptop',
        headline: ['“Battery health? Condition? RAM?” A different answer for every customer?', 'Every laptop fully described on one page. The choice arrives on WhatsApp.'],
        sub: 'Condition, battery health, stock and serial warranty records, in one system for your shop.',
        positioning: 'A retail operations system, custom-built for established laptop dealers.',
        question: '“What is the battery health? Which grade?”', pain: 'Every customer asks the same thing, and you send a screenshot every time.', fix: 'Each laptop page shows its condition grade, battery health and upgrade options.',
        outcome: ['Fewer repeat questions', 'Grade, battery health and upgrades are on every laptop page, so customers have their answers before they message you.'], need: 'Laptop condition and battery details',
        featureTitle: 'Every laptop, fully described.', featureCaption: 'What each laptop page shows', featureLine: 'Customers see everything on the page, so you stop sending the same screenshots.', points: [['Condition grade', 'A, B or C, stated clearly'], ['Battery health', 'Shown for each unit'], ['Upgrades', 'RAM and SSD options']],
      },
      console: {
        label: 'Console & Games', chat: 'console / games',
        headline: ['Sealed, used and trade-in stock, all tracked separately?', 'Trade-in quotes, condition and serial records in one system.'],
        sub: 'Customers see their trade-in value themselves, and you keep a serial and seal record for every console.',
        positioning: 'A retail operations system, custom-built for established console and games shops.',
        question: '“How much for the new one if I trade in my old console?”', pain: 'You work out the same trade-in sums again and again.', fix: 'The trade-in quote and the condition label are on the page.',
        outcome: ['Trade-ins without the arithmetic', 'Customers see a trade-in quote on the page, and you set the rules behind it.'], need: 'Trade-in quotes',
        featureTitle: 'Trade-ins without the arithmetic.', featureCaption: 'What each console page shows', featureLine: 'Customers see what their old console is worth before they message you.', points: [['Trade-in quote', 'Shown on the page'], ['Condition label', 'For every used unit'], ['Serial warranty', 'A record for each sale']],
      },
    } satisfies Record<ShopType, Shop>,
    stock: ['“Is it in stock?”', 'A customer waits while someone checks the shelf, the store room or the other branch.', 'Counter sales and online orders work from the same stock, by location.'],
    warranty: ['“Where is the warranty record?”', 'A returned item means searching bills, messages and supplier records.', 'Search the serial number and see when it was sold, to whom, and until when it is covered.'],
    stockTitle: 'Know what is in stock.',
    stockLine: 'Counter, website and every branch work from one stock. Sell at the counter and the website updates too.',
    stockCaption: 'Product and stock admin · Real screen, demo data',
    storesHeading: 'Do not take our word for it. Use it.',
    storesIntro: 'Real screens with sample products. Open a demo store on your phone and place a test order.',
    stores: [
      { shop: 'pc', name: 'Computer & gaming store', line: 'With the PC builder' },
      { shop: 'laptop', name: 'Laptop store', line: 'With grades and battery health' },
      { shop: 'console', name: 'Console & games store', line: 'With trade-in quotes' },
    ] satisfies Store[],
    storeCta: 'Open the demo',
    outcomesHeading: 'Built for established shops.',
    outcomesIntro: 'A retail operations system for shops with steady daily sales, set up around how your shop already works.',
    outcomes: [
      ['One stock for counter, website and branches', 'Sell at the counter and the website knows. Each location keeps its own count.'],
      ['Warranty claims checked with one search', 'Every serial is tied to its supplier, invoice and sale date.'],
      ['Orders that arrive complete', 'Online orders reach your WhatsApp with the items, the total and the delivery details.'],
      ['The owner stays in control', 'Costs, margins and settings stay with the owner. Staff see only their own work.'],
      ['Built around your shop', 'Your products, branches, staff roles and way of selling. Not a website template.'],
    ] as [string, string][],
    fitTitle: 'A good fit if you:',
    fit: ['Run a busy shop, or 2–3 locations', 'Have staff at the counter', 'Track stock, serials or builds by hand today', 'Want the system, code and data to be yours'],
    fitNote: 'Only need a basic catalogue website? A website builder will suit you better. Tech Retail OS is for running the shop.',
    proposalTitle: 'Every cost in writing, before you pay.',
    proposal: 'Your proposal lists the one-time build, hosting, domain, third-party fees and optional support. Nothing is added later without your written approval.',
    guaranteeTitle: 'You test before the final payment.',
    guarantee: 'You check your system on a private link against a signed acceptance checklist. Anything unmet is fixed within 10 working days. If the checklist still cannot be met, your deposit is refundable on request and the work ends.',
    ownedHeading: 'After launch, it is all yours.',
    owned: [['Code', 'Your store’s repository, with permanent use of the shared core'], ['Database', 'Your products, orders and customers'], ['Admin accounts', 'Every login is handed over'], ['30 days of bug fixes', 'Free, for what we delivered']],
    partnerStrip: 'Founding Partner: special terms for the first 2 tech shops only.',
    partnerStripCta: 'Ask on WhatsApp',
    partnerFaq: ['What is the Founding Partner offer?', 'We are starting in Pakistan, so the first 2 tech shops get special terms. In return we ask for three things: your honest review after launch, permission to show your shop as a case study, and a 20-minute feedback call.'] as [string, string],
    partnerMessage: ' I would also like to know about the Founding Partner terms.',
    processHeading: 'From first message to your own system.',
    process: [
      ['Book a demo', 'Tell us about your shop in six quick answers. We reply on WhatsApp to set a time.'],
      ['Demo call', 'We show the system with products like yours and look at how your shop works today.'],
      ['Written proposal', 'Scope, timeline and every cost in writing, before you sign or pay anything.'],
      ['You test, then launch', 'You check your own system on a private link. After launch the code, database and admin accounts are yours.'],
    ],
    faqHeading: 'Before we talk.',
    faq: [
      ['What does it cost?', 'It depends on your shop: how many branches, how many products and which tools you need. On the demo call we look at how your shop works and explain the scope. Then you get a written proposal with every cost: the one-time build, hosting, domain, third-party fees and optional support. You decide after reading it.'],
      ['Can you bring over our existing products?', 'Yes. Loading your products is part of the setup. The written proposal states how many products are included and what any extra data work costs, so nothing comes as a surprise.'],
      ['Who trains my staff?', 'Before launch we run one training session for you and your staff, and give you short screen recordings to keep. Each staff login sees only its own work; purchase costs, margins and settings stay with the owner.'],
      ['Will the stock always be right?', 'Online orders update stock on their own. Counter sales and transfers between locations are right when your staff enter them; the system cannot see a sale nobody recorded.'],
      ['What happens after launch?', 'Bugs in what we delivered are fixed free for 30 days. After that, a Care Plan is optional: it covers hosting, backups and small changes, with the reply time written in each plan. Your data and backups belong to you.'],
      ['How do payments and approval work?', 'In three stages, 40 / 40 / 20: at the start, when you approve the test version, and at launch. You test against a signed checklist before the final stage.'],
    ],
    finalHeading: 'Book a demo for your shop.',
    finalCopy: 'Six quick answers help us prepare the call for your shop. We reply on WhatsApp to set a time.',
    form: {
      shop: 'Shop category', city: 'City', cityPlaceholder: 'e.g. Lahore', branches: 'Branches',
      branchOptions: { '1': '1 shop', '2-3': '2–3 branches', '4+': '4 or more' },
      process: 'How do you keep stock and sales records today?',
      processOptions: { register: 'Register or notebook', sheets: 'Excel or Google Sheets', software: 'POS or accounting software', whatsapp: 'WhatsApp and memory' },
      needs: 'What should the system handle first?', needsHint: 'Choose all that apply.',
      needOptions: { stock: 'Stock across branches', warranty: 'Serial-number warranty', orders: 'Online orders on WhatsApp', staff: 'Staff logins and permissions' },
      whatsapp: 'Your WhatsApp number', whatsappPlaceholder: '0300 1234567',
      submit: 'Book my demo on WhatsApp', note: 'We use your number only to arrange the demo. No spam calls.',
      errors: { shop: 'Choose your shop type.', city: 'Write the city your shop is in.', branches: 'Choose how many branches you have.', process: 'Choose how you keep records today.', needs: 'Choose at least one.', whatsapp: 'Write a Pakistani mobile number, like 0300 1234567.' },
      doneHeading: 'Thank you. Now press send on WhatsApp.',
      doneCopy: 'Your answers are already written in the message. We reply to set a time for your demo call. If WhatsApp did not open, tap the button.',
      doneCta: 'Open WhatsApp',
      saveFailed: 'We could not save your answers on our side. They are still in the WhatsApp message, so just press send.',
      saveRetry: 'Try saving again',
      saveRetrying: 'Saving…',
      saved: 'Saved. We have your answers.',
    },
    formMessage: (shop: string, city: string, branches: string, process: string, needs: string) => `Assalam o Alaikum, I have a ${shop} shop in ${city} (${branches}). Records today: ${process}. We need help with: ${needs}. I would like to book a demo.`,
    orDirect: 'Or message us on WhatsApp directly',
    privacy: 'Privacy', terms: 'Terms', retailTerms: 'Retail delivery terms',
  },
  'ur-en': {
    shopPrompt: 'Apni shop ki category chunein',
    cta: 'Apni shop ka demo book karein',
    ctaNote: 'Hum aap ki shop ka kaam samajh kar dikhate hain ke kya fit hoga. Koi commitment nahi.',
    demoCta: 'Live demo khud dekhein',
    demoNote: 'Chalta hua demo store khulega, sample products ke saath.',
    preview: 'Tech Retail OS · 42-second overview',
    previewNote: 'Real product screens · Sample products aur demo data',
    videoButton: 'Tech Retail OS ka overview chalayein',
    videoFallback: 'Aap ka browser yeh video nahi chala sakta.',
    stickyCta: 'Demo book karein',
    whatsappMessage: (shop: string) => `Assalam o Alaikum, meri ${shop} shop hai aur mujhe demo book karna hai.`,
    problemHeading: 'Kya aap ke saath bhi aisa hota hai?',
    problemIntro: 'Har customer wohi sawal baar baar poochta hai, aur har jawab ke liye aap ko khud check karna parta hai.',
    problemAsk: 'Customers aap se baar baar poochte hain:',
    stockAsk: 'Counter pe aur WhatsApp pe, roz:',
    warrantyAsk: 'Jab koi item claim ke liye wapas aaye:',
    shops: {
      pc: {
        label: 'PC & Gaming', chat: 'computer / gaming',
        headline: ['Har PC build ki quotation baar baar banani parti hai?', 'Customer parts select kare. Build ki details aap ke WhatsApp par aayein.'],
        sub: 'PC builder, stock aur serial-number warranty ka record, aap ki shop ke liye ek system mein.',
        positioning: 'Established PC aur gaming shops ke liye custom-built retail operations system.',
        question: '“Kya yeh parts saath chalenge?”', pain: 'Har custom build ke liye socket, RAM aur power supply dobara check karni parti hai.', fix: 'PC builder customer ke parts chunte waqt CPU socket, RAM type, power supply wattage aur GPU clearance check karta hai.',
        outcome: ['Custom build, bina lambi chat ke', 'Customer aap ke stock se compatible parts chunta hai. Build aur price aap confirm karte hain.'], need: 'PC build ki quotation',
        featureTitle: 'Online PC builder, aap ke stock se.', featureCaption: 'PC builder · Sample catalogue', featureLine: 'Customer aap ki website pe khud apna PC build karta hai. Builder sirf wohi parts suggest karta hai jo aap ke stock mein hain aur aapas mein compatible hain, aur poora build WhatsApp pe order ban kar aap tak aata hai.', points: null,
      },
      laptop: {
        label: 'Laptop', chat: 'laptop',
        headline: ['“Battery health? Condition? RAM?” Har customer ko alag jawab?', 'Har laptop ki poori detail ek page par. Selection seedha WhatsApp par.'],
        sub: 'Condition, battery health, stock aur serial warranty ka record, aap ki shop ke liye ek system mein.',
        positioning: 'Established laptop dealers ke liye custom-built retail operations system.',
        question: '“Battery health kitni hai? Grade kya hai?”', pain: 'Har customer yehi poochta hai, aur aap har dafa screenshot bhejte hain.', fix: 'Har laptop ke page pe condition grade, battery health aur upgrade options likhe hote hain.',
        outcome: ['Kam repeat sawal', 'Har laptop ke page pe grade, battery health aur upgrades, is liye customer ko message se pehle hi jawab mil jata hai.'], need: 'Laptop condition aur battery detail',
        featureTitle: 'Har laptop ki poori detail.', featureCaption: 'Har laptop ke page pe yeh nazar aata hai', featureLine: 'Customer page pe hi sab dekh leta hai, aap ko har dafa screenshot nahi bhejna parta.', points: [['Condition grade', 'A, B ya C, saaf likha hua'], ['Battery health', 'Har unit ke saath'], ['Upgrades', 'RAM aur SSD options']],
      },
      console: {
        label: 'Console & Games', chat: 'console / games',
        headline: ['Sealed, used aur trade-in stock ka record alag alag?', 'Trade-in quote, condition aur serial ka record, ek hi system mein.'],
        sub: 'Customer trade-in value khud dekhe, aur har console ka serial aur seal record aap ke paas.',
        positioning: 'Established console aur games shops ke liye custom-built retail operations system.',
        question: '“Purana console de kar naya kitne ka parega?”', pain: 'Trade-in ka wohi hisaab aap baar baar lagate hain.', fix: 'Trade-in quote aur condition label page pe hi hota hai.',
        outcome: ['Trade-in, bina hisaab kitaab ke', 'Customer page pe trade-in quote dekhta hai, aur us ke rules aap set karte hain.'], need: 'Trade-in quotes',
        featureTitle: 'Trade-in, bina hisaab kitaab ke.', featureCaption: 'Har console ke page pe yeh nazar aata hai', featureLine: 'Customer message karne se pehle hi dekh leta hai ke purane console ki kitni value hai.', points: [['Trade-in quote', 'Page pe hi'], ['Condition label', 'Har used unit ke saath'], ['Serial warranty', 'Har sale ka record']],
      },
    } satisfies Record<ShopType, Shop>,
    stock: ['“Stock mein hai?”', 'Customer wait karta hai aur koi shelf, godown ya doosri branch check karta hai.', 'Counter aur online orders ek hi stock se chalte hain, har location ke hisaab se.'],
    warranty: ['“Warranty ka record kahan hai?”', 'Return aaye to bills, messages aur supplier ke records dhoondne parte hain.', 'Serial number search karein: kab sale hua, kis ko, aur warranty kab tak hai.'],
    stockTitle: 'Stock ka pata, har waqt.',
    stockLine: 'Counter, website aur har branch ka stock ek hi jagah. Counter pe item bika to website pe bhi update ho jata hai.',
    stockCaption: 'Products aur stock admin · Real screen, demo data',
    storesHeading: 'Hamari baat pe na jayein. Khud chala kar dekhein.',
    storesIntro: 'Real screens, sample products ke saath. Apne phone pe demo store kholein aur ek test order kar ke dekhein.',
    stores: [
      { shop: 'pc', name: 'Computer & gaming store', line: 'PC builder ke saath' },
      { shop: 'laptop', name: 'Laptop store', line: 'Grades aur battery health ke saath' },
      { shop: 'console', name: 'Console & games store', line: 'Trade-in quotes ke saath' },
    ] satisfies Store[],
    storeCta: 'Demo kholein',
    outcomesHeading: 'Established shops ke liye bana.',
    outcomesIntro: 'Retail operations system un shops ke liye jin ki roz ki sale hai, aap ki shop ke kaam ke tareeqe ke hisaab se set up.',
    outcomes: [
      ['Counter, website aur branches, ek stock', 'Counter pe sale ho to website ko bhi pata. Har location ka apna count.'],
      ['Warranty claim, ek search mein', 'Har serial apne supplier, invoice aur sale date se juda hua.'],
      ['Poore orders, WhatsApp pe', 'Online order items, total aur delivery detail ke saath aap ke WhatsApp pe.'],
      ['Control owner ke paas', 'Cost, margin aur settings sirf owner ke paas. Staff sirf apna kaam dekhta hai.'],
      ['Aap ki shop ke hisaab se', 'Aap ke products, branches, staff roles aur bechne ka tareeqa. Website template nahi.'],
    ] as [string, string][],
    fitTitle: 'Aap ke liye sahi hai agar:',
    fit: ['Ek busy shop hai, ya 2–3 locations', 'Counter pe staff hai', 'Stock, serials ya builds abhi haath se track hote hain', 'Aap chahte hain ke system, code aur data aap ka ho'],
    fitNote: 'Sirf ek basic catalogue website chahiye? Us ke liye website builder behtar hai. Tech Retail OS shop chalane ke liye hai.',
    proposalTitle: 'Har kharcha likha hua, payment se pehle.',
    proposal: 'Proposal mein ek dafa ki build fee, hosting, domain, third-party fees aur optional support, sab likha hota hai. Aap ki written approval ke baghair baad mein kuch add nahi hota.',
    guaranteeTitle: 'Aakhri payment se pehle aap test karte hain.',
    guarantee: 'Private link pe apna system signed acceptance checklist ke mutabiq check karein. Jo cheez poori na ho, 10 working days mein theek hoti hai. Agar checklist phir bhi poori na ho sake, to aap ke kehne pe deposit wapas aur kaam khatam.',
    ownedHeading: 'Launch ke baad sab aap ka.',
    owned: [['Code', 'Aap ke store ki repository, shared core ke permanent use ke saath'], ['Database', 'Aap ke products, orders aur customers'], ['Admin accounts', 'Har login aap ko milta hai'], ['30 din bug fixes', 'Free, jo humne banaya us ke liye']],
    partnerStrip: 'Founding Partner: sirf pehli 2 tech shops ke liye special terms.',
    partnerStripCta: 'WhatsApp pe poochein',
    partnerFaq: ['Founding Partner kya hai?', 'Hum Pakistan mein start kar rahe hain, is liye pehli 2 tech shops ko special terms milte hain. Badle mein hum 3 cheezein maangte hain: launch ke baad aap ka honest review, aap ki shop ko case study dikhane ki permission, aur 20-minute ka feedback call.'] as [string, string],
    partnerMessage: ' Founding Partner terms ke baare mein bhi batayein.',
    processHeading: 'Pehle message se apne system tak.',
    process: [
      ['Demo book karein', '6 chhote sawalon mein apni shop ke baare mein batayein. Hum WhatsApp pe time set karte hain.'],
      ['Demo call', 'Aap jaise products ke saath system dikhate hain, aur samajhte hain ke aap ki shop abhi kaise chalti hai.'],
      ['Written proposal', 'Scope, timeline aur har kharcha likha hua, sign ya payment se pehle.'],
      ['Aap test karein, phir launch', 'Private link pe apna system check karein. Launch ke baad code, database aur admin accounts aap ke.'],
    ],
    faqHeading: 'Baat karne se pehle.',
    faq: [
      ['Is ka kharcha kitna hai?', 'Yeh aap ki shop pe depend karta hai: kitni branches, kitne products, aur kaun se tools chahiyein. Demo call pe hum aap ki shop ka kaam samajh kar scope batate hain. Phir aap ko written proposal milta hai jis mein har kharcha likha hota hai: ek dafa ki build fee, hosting, domain, third-party fees aur optional support. Parh kar aap faisla karein.'],
      ['Hamare purane products aa jayenge?', 'Ji haan. Products load karna setup ka hissa hai. Kitne products shamil hain aur extra data ka kaam kitne ka hai, yeh written proposal mein likha hota hai, taake baad mein koi surprise na ho.'],
      ['Staff ki training kaun karega?', 'Launch se pehle aap aur aap ke staff ke saath ek training session, aur rakhne ke liye chhoti screen recordings. Har staff login sirf apna kaam dekhta hai; purchase cost, margin aur settings owner ke paas rehte hain.'],
      ['Kya stock hamesha sahi rahega?', 'Online orders stock khud update karte hain. Counter sale aur branches ke darmiyan transfer tab sahi rehte hain jab staff unhein enter kare; jo sale kisi ne record hi na ki, system use nahi dekh sakta.'],
      ['Launch ke baad kya hota hai?', 'Jo humne banaya us ke bugs 30 din tak free theek hote hain. Us ke baad Care Plan optional hai: hosting, backups aur chhoti changes, aur har plan mein jawab ka time likha hai. Aap ka data aur backups aap ke hain.'],
      ['Payment aur approval kaise hoti hai?', '3 stages mein, 40 / 40 / 20: shuru mein, test version approve hone pe, aur launch pe. Aakhri stage se pehle aap signed checklist pe test karte hain.'],
    ],
    finalHeading: 'Apni shop ka demo book karein.',
    finalCopy: '6 chhote sawal, taake hum call aap ki shop ke hisaab se tayyar karein. Hum WhatsApp pe time set karte hain.',
    form: {
      shop: 'Shop ki category', city: 'Shehar', cityPlaceholder: 'Jaise Lahore', branches: 'Branches',
      branchOptions: { '1': '1 shop', '2-3': '2–3 branches', '4+': '4 ya zyada' },
      process: 'Abhi stock aur sale ka record kaise rakhte hain?',
      processOptions: { register: 'Register ya copy', sheets: 'Excel ya Google Sheets', software: 'POS ya accounting software', whatsapp: 'WhatsApp aur yaad se' },
      needs: 'System pehle kya sambhale?', needsHint: 'Jitne chahein chunein.',
      needOptions: { stock: 'Branches ka stock', warranty: 'Serial-number warranty', orders: 'Online orders WhatsApp pe', staff: 'Staff logins aur permissions' },
      whatsapp: 'Aap ka WhatsApp number', whatsappPlaceholder: '0300 1234567',
      submit: 'WhatsApp pe demo book karein', note: 'Number sirf demo ka time set karne ke liye. Koi spam call nahi.',
      errors: { shop: 'Shop type chunein.', city: 'Apni shop ka shehar likhein.', branches: 'Kitni branches hain, chunein.', process: 'Record rakhne ka tareeqa chunein.', needs: 'Kam az kam ek chunein.', whatsapp: 'Pakistani mobile number likhein, jaise 0300 1234567.' },
      doneHeading: 'Shukriya. Ab WhatsApp pe send dabayein.',
      doneCopy: 'Aap ke jawab message mein likhe hue hain. Hum demo call ka time set karne ke liye reply karte hain. WhatsApp na khula ho to button dabayein.',
      doneCta: 'WhatsApp kholein',
      saveFailed: 'Aap ke jawab hamari taraf save nahi ho sake. Woh WhatsApp message mein mojood hain, bas send dabayein.',
      saveRetry: 'Dobara save karein',
      saveRetrying: 'Save ho raha hai…',
      saved: 'Save ho gaya. Aap ke jawab hamare paas hain.',
    },
    formMessage: (shop: string, city: string, branches: string, process: string, needs: string) => `Assalam o Alaikum, meri ${shop} shop ${city} mein hai (${branches}). Abhi record: ${process}. Zaroorat: ${needs}. Mujhe demo book karna hai.`,
    orDirect: 'Ya seedha WhatsApp pe message karein',
    privacy: 'Privacy', terms: 'Terms', retailTerms: 'Retail delivery terms',
  },
}

/** The label of one "what do you need first" option. The first option is named for the shop type. */
export function needLabel(lang: FunnelLanguage, shop: ShopType, need: Need): string {
  const copy = FUNNEL_COPY[lang]
  return need === 'trade' ? copy.shops[shop].need : copy.form.needOptions[need]
}

/** What the shop gets, for the outcomes section: its own outcome first, then the ones every shop gets. */
export const funnelOutcomes = (lang: FunnelLanguage, shop: ShopType): [string, string][] => [FUNNEL_COPY[lang].shops[shop].outcome, ...FUNNEL_COPY[lang].outcomes]

// A short code naming the ad that sent the visitor, from utm_content (or utm_campaign).
// Added to WhatsApp messages so chats that skip the form still show which ad started them.
export function adRef(source: { utm_content?: string; utm_campaign?: string }): string | null {
  const raw = (source.utm_content || source.utm_campaign || '').toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 32)
  return raw || null
}
const withRef = (message: string, ref?: string | null) => ref ? `${message} [${ref}]` : message
const waUrl = (message: string) => `https://wa.me/${BUSINESS.phoneE164.replace('+', '')}?text=${encodeURIComponent(message)}`

export function funnelWhatsAppUrl(lang: FunnelLanguage, shop: ShopType, partner = false, ref?: string | null): string {
  const copy = FUNNEL_COPY[lang]
  return waUrl(withRef(copy.whatsappMessage(copy.shops[shop].chat) + (partner ? copy.partnerMessage : ''), ref))
}

export type FunnelLeadAnswers = { shop: ShopType; city: string; branches: FunnelBranches; process: CurrentProcess; needs: Need[] }

/** The WhatsApp chat opened after the demo form: the visitor's answers are already written in it. */
export function funnelFormWhatsAppUrl(lang: FunnelLanguage, lead: FunnelLeadAnswers, ref?: string | null): string {
  const copy = FUNNEL_COPY[lang]
  const needs = lead.needs.map((need) => needLabel(lang, lead.shop, need)).join(', ')
  return waUrl(withRef(copy.formMessage(copy.shops[lead.shop].chat, lead.city, copy.form.branchOptions[lead.branches], copy.form.processOptions[lead.process], needs), ref))
}
