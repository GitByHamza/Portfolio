// The Tech Retail funnel: one page for tech retailers in Pakistan.
// It shows no pricing. Every action opens a WhatsApp chat; prices are discussed there after the demo.
import { BUSINESS } from '../data/business.js'

export const SHOP_TYPES = ['pc', 'laptop', 'mobile', 'camera', 'console'] as const
export type ShopType = (typeof SHOP_TYPES)[number]
export type FunnelLanguage = 'en' | 'ur-en'

// The hero film carries no pricing. Its source is the Remotion project in videos/tech-retail.
export const FUNNEL_ASSETS = { video: '/video/tech-retail-overview.mp4', poster: '/video/tech-retail-poster.webp', captions: '/video/tech-retail-captions.vtt' }

const PC_DEMO = 'https://store-demo-eight.vercel.app/?mode=pc'
const DEMOS: Record<ShopType, string> = {
  pc: PC_DEMO, mobile: PC_DEMO, camera: PC_DEMO,
  laptop: 'https://store-demo-eight.vercel.app/?mode=laptop',
  console: 'https://console-store-demo.vercel.app/',
}
export const funnelDemoUrl = (shop: ShopType): string => DEMOS[shop]

export function loomEmbedUrl(value: string | null): string | null {
  if (!value) return null
  try {
    const url = new URL(value)
    const match = url.pathname.match(/^\/(?:share|embed)\/([a-f0-9]{32})\/?$/i)
    if (url.protocol !== 'https:' || !['loom.com', 'www.loom.com'].includes(url.hostname) || !match) return null
    return `https://www.loom.com/embed/${match[1]}`
  } catch { return null }
}

type Shop = { label: string; chat: string; question: string; pain: string; fix: string; featureTitle: string; featureCaption: string; featureLine: string; points: [string, string][] | null }
type Plan = { name: string; line: string; delivery: string; items: string[] }
type Store = { shop: ShopType; name: string; line: string }

// Set to false the day the second Founding Partner shop signs: the top strip and its FAQ answer disappear.
export const FOUNDING_PARTNER_OPEN = true

export const FUNNEL_COPY = {
  en: {
    headline: ['Your tech shop, online.', 'Orders keep coming while you sleep.'],
    intro: 'Computer, laptop, mobile, camera or console: your own website takes orders day and night and keeps your stock and warranty records for you. Built for tech shops in Pakistan.',
    shopPrompt: 'Choose your shop category',
    cta: 'See the demo on WhatsApp',
    ctaNote: 'A two-minute demo for your kind of shop. No commitment.',
    demoCta: 'Try the live demo yourself',
    demoNote: 'Opens a working demo store with sample products.',
    demoNoteOther: 'Opens the computer-shop demo store as an example, with sample products.',
    preview: 'Tech Retail OS · 42-second overview',
    previewNote: 'Real product screens · Sample products and demo data',
    videoButton: 'Play the Tech Retail OS overview',
    videoFallback: 'Your browser cannot play this video.',
    stickyCta: 'Demo on WhatsApp',
    whatsappMessage: (shop: string, plan?: string) => `Assalam o Alaikum, I have a ${shop} shop and I would like to see the demo${plan ? ` and get a quote for the ${plan} plan` : ''}.`,
    problemHeading: 'Does this happen to you too?',
    problemIntro: 'The same questions, message after message. And every answer means checking by hand.',
    problemAsk: 'Customers keep asking you:',
    stockAsk: 'At the counter and on WhatsApp, every day:',
    warrantyAsk: 'When an item comes back for a claim:',
    shops: {
      pc: { label: 'PC & Gaming', chat: 'computer / gaming', question: '“Will these parts work together?”', pain: 'Your team repeats the same socket, RAM and power-supply checks for every custom build.', fix: 'The PC builder on your website shows customers only parts that fit: socket, RAM and power supply are checked first.', featureTitle: 'An online PC builder that works from your stock.', featureCaption: 'PC builder · Sample component catalogue', featureLine: 'Customers build their own PC on your website. The builder suggests only parts you have in stock that work together, and the finished build reaches you as an order on WhatsApp.', points: null },
      laptop: { label: 'Laptop', chat: 'laptop', question: '“What is the battery health? Which grade?”', pain: 'Every customer asks the same thing, and you send a screenshot every time.', fix: 'Each laptop page shows its condition grade, battery health and upgrade options.', featureTitle: 'Every laptop, fully described.', featureCaption: 'What each laptop page shows', featureLine: 'Customers see everything on the page, so you stop sending the same screenshots.', points: [['Condition grade', 'A, B or C, stated clearly'], ['Battery health', 'Shown for each unit'], ['Upgrades', 'RAM and SSD options']] },
      mobile: { label: 'Mobile', chat: 'mobile', question: '“Is it PTA approved? Does it come with the box?”', pain: 'The same questions and the same answers, all day.', fix: 'You write the condition, PTA status, box and warranty on the product page once.', featureTitle: 'Answers on the page, not in the chat.', featureCaption: 'What you write on each phone page', featureLine: 'Customers find the answers on the page, so fewer of the same questions reach your WhatsApp.', points: [['Condition', 'New, used or open box'], ['PTA status', 'Approved or non-PTA'], ['Warranty', 'How long, and whose']] },
      camera: { label: 'Camera', chat: 'camera', question: '“What is the shutter count? Is the lens included?”', pain: 'Every buyer asks about condition, box and warranty before anything else.', fix: 'You write the condition, shutter count, box contents and warranty on the product page once.', featureTitle: 'Answers on the page, not in the chat.', featureCaption: 'What you write on each camera page', featureLine: 'Customers find the answers on the page, so fewer of the same questions reach your WhatsApp.', points: [['Condition', 'Body and lens, stated clearly'], ['Shutter count', 'Written for each body'], ['Warranty', 'How long, and whose']] },
      console: { label: 'Console & Games', chat: 'console / games', question: '“How much for the new one if I trade in my old console?”', pain: 'You work out the same trade-in sums again and again.', fix: 'The trade-in quote and the condition label are on the page.', featureTitle: 'Trade-ins without the arithmetic.', featureCaption: 'What each console page shows', featureLine: 'Customers see what their old console is worth before they message you.', points: [['Trade-in quote', 'Shown on the page'], ['Condition label', 'For every used unit'], ['Serial warranty', 'A record for each sale']] },
    } satisfies Record<ShopType, Shop>,
    stock: ['“Is it in stock?”', 'A customer waits while someone checks the shelf, the store room or the other branch.', 'Counter sales and online orders work from the same stock, by location.'],
    warranty: ['“Where is the warranty record?”', 'A returned item means searching bills, messages and supplier records.', 'Search the serial number and see when it was sold, to whom, and until when it is covered.'],
    stockTitle: 'Know what is in stock.',
    stockLine: 'Counter, website and every branch work from one stock. Sell at the counter and the website updates too.',
    stockCaption: 'Product and stock admin · Real screen, demo data',
    plansHeading: 'Three plans. One for your stage.',
    plansIntro: 'Tell us about your shop on WhatsApp and we will send the exact quote for the plan that fits.',
    plans: [
      { name: 'Single Store', line: 'One shop going online, with orders arriving on WhatsApp.', delivery: 'Live in 10 days', items: ['Your own online store, with your first 50 products loaded', 'Orders sent to your WhatsApp with full details', 'Admin panel for products, stock and orders', 'Google Search Console, sitemap and analytics set up'] },
      { name: 'Multi-Branch', line: 'Counter and online together, across up to 3 locations.', delivery: 'Live in 21 days', items: ['Everything in Single Store', 'PC builder with compatibility checks', 'Stock synced across up to 3 locations', 'Serial-number warranty tracking', 'Card and wallet payments, and an AI sales assistant'] },
      { name: 'Chain & Wholesale', line: 'Chains, wholesalers and importers with staff across locations.', delivery: 'From 30 days', items: ['Everything in Multi-Branch', 'Unlimited branches and warehouses, with stock transfers', 'Staff roles: owner, manager, cashier, warehouse', 'POS hardware, courier and FBR integration'] },
    ] satisfies Plan[],
    planCta: 'Get the quote on WhatsApp',
    planItems: 'What is included',
    plansNote: 'Delivery time starts when your content and first payment arrive.',
    storesHeading: 'Do not take our word for it. Use it.',
    storesIntro: 'Real screens with sample products. Open a demo store on your phone and place a test order.',
    stores: [
      { shop: 'pc', name: 'Computer & gaming store', line: 'With the PC builder' },
      { shop: 'laptop', name: 'Laptop store', line: 'With grades and battery health' },
      { shop: 'console', name: 'Console & games store', line: 'With trade-in quotes' },
    ] satisfies Store[],
    storeCta: 'Open the demo',
    ownedHeading: 'After launch, it is all yours.',
    owned: [['Code', 'The full repository'], ['Database', 'Your products, orders and customers'], ['Admin accounts', 'Every login is handed over'], ['30 days of bug fixes', 'Free, for what we delivered']],
    partnerStrip: 'Founding Partner: special terms for the first 2 tech shops only.',
    partnerStripCta: 'Ask on WhatsApp',
    partnerFaq: ['What is the Founding Partner offer?', 'We are starting in Pakistan, so the first 2 tech shops get special terms. In return we ask for three things: your review after launch, permission to show your shop as a case study, and a 20-minute feedback call.'] as [string, string],
    partnerMessage: ' I would also like to know about the Founding Partner terms.',
    processHeading: 'From first message to your own system.',
    process: [
      ['Demo first', 'We show you the system for your kind of shop. It costs nothing.'],
      ['Written scope', 'What will be built, and by when, is written down before you sign.'],
      ['You test, then launch', 'You check your own system on a private link. After launch the code, database and admin accounts are yours.'],
    ],
    faqHeading: 'Before we talk.',
    faq: [
      ['Can you bring over our existing products?', 'Your first 50 products are included in the setup. Send a sample of your catalogue; larger imports and clean-up are agreed before work starts.'],
      ['Can my staff run it?', 'The admin panel is made for shop staff. We agree the training and handover your team needs.'],
      ['How do payments and approval work?', 'In three stages, 40 / 40 / 20: at the start, when you approve the test version, and at launch. You test against a signed checklist before the final stage.'],
      ['My shop is not a computer shop. Does it still fit?', 'Yes. The online store, stock and warranty records work for any tech shop. The PC builder is an extra for shops that sell custom builds.'],
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
    },
    formMessage: (shop: string, city: string, branches: string) => `Assalam o Alaikum, I have a ${shop} shop in ${city} (${branches}). I would like to see the demo.`,
    orDirect: 'Or message us on WhatsApp directly',
    privacy: 'Privacy', terms: 'Terms', retailTerms: 'Retail delivery terms',
  },
  'ur-en': {
    headline: ['Aap ki tech shop, online.', 'Aap so rahe hon, orders phir bhi aayein.'],
    intro: 'Computer, laptop, mobile, camera ya console: aap ki apni website din raat orders leti hai, aur stock aur warranty ka record khud rakhti hai. Pakistan ki tech shops ke liye bana hai.',
    shopPrompt: 'Apni shop ki category chunein',
    cta: 'WhatsApp pe demo dekhein',
    ctaNote: 'Aap ki shop ke hisaab se 2-minute demo. Koi commitment nahi.',
    demoCta: 'Live demo khud dekhein',
    demoNote: 'Chalta hua demo store khulega, sample products ke saath.',
    demoNoteOther: 'Example ke taur pe computer shop ka demo store khulega, sample products ke saath.',
    preview: 'Tech Retail OS · 42-second overview',
    previewNote: 'Real product screens · Sample products aur demo data',
    videoButton: 'Tech Retail OS ka overview chalayein',
    videoFallback: 'Aap ka browser yeh video nahi chala sakta.',
    stickyCta: 'WhatsApp pe demo',
    whatsappMessage: (shop: string, plan?: string) => `Assalam o Alaikum, meri ${shop} shop hai aur mujhe demo dekhna hai${plan ? `. ${plan} plan ka quote bhi chahiye` : ''}.`,
    problemHeading: 'Kya aap ke saath bhi aisa hota hai?',
    problemIntro: 'Har customer wohi sawal baar baar poochta hai, aur har jawab ke liye aap ko khud check karna parta hai.',
    problemAsk: 'Customers aap se baar baar poochte hain:',
    stockAsk: 'Counter pe aur WhatsApp pe, roz:',
    warrantyAsk: 'Jab koi item claim ke liye wapas aaye:',
    shops: {
      pc: { label: 'PC & Gaming', chat: 'computer / gaming', question: '“Kya yeh parts saath chalenge?”', pain: 'Har custom build ke liye socket, RAM aur power supply dobara check karni parti hai.', fix: 'Aap ki website ka PC builder customer ko sirf wohi parts dikhata hai jo fit hon: socket, RAM aur power supply pehle se check.', featureTitle: 'Online PC builder, aap ke stock se.', featureCaption: 'PC builder · Sample catalogue', featureLine: 'Customer aap ki website pe khud apna PC build karta hai. Builder sirf wohi parts suggest karta hai jo aap ke stock mein hain aur aapas mein compatible hain, aur poora build WhatsApp pe order ban kar aap tak aata hai.', points: null },
      laptop: { label: 'Laptop', chat: 'laptop', question: '“Battery health kitni hai? Grade kya hai?”', pain: 'Har customer yehi poochta hai, aur aap har dafa screenshot bhejte hain.', fix: 'Har laptop ke page pe condition grade, battery health aur upgrade options likhe hote hain.', featureTitle: 'Har laptop ki poori detail.', featureCaption: 'Har laptop ke page pe yeh nazar aata hai', featureLine: 'Customer page pe hi sab dekh leta hai, aap ko har dafa screenshot nahi bhejna parta.', points: [['Condition grade', 'A, B ya C, saaf likha hua'], ['Battery health', 'Har unit ke saath'], ['Upgrades', 'RAM aur SSD options']] },
      mobile: { label: 'Mobile', chat: 'mobile', question: '“PTA approved hai? Box ke saath hai?”', pain: 'Roz wohi sawal, roz wohi jawab.', fix: 'Condition, PTA status, box aur warranty aap product page pe ek dafa likh dete hain.', featureTitle: 'Jawab page pe, chat mein nahi.', featureCaption: 'Har phone ke page pe aap yeh likhte hain', featureLine: 'Customer ko jawab page pe mil jata hai, is liye WhatsApp pe wohi sawal kam aate hain.', points: [['Condition', 'New, used ya open box'], ['PTA status', 'Approved ya non-PTA'], ['Warranty', 'Kitni, aur kis ki']] },
      camera: { label: 'Camera', chat: 'camera', question: '“Shutter count kitna hai? Lens saath hai?”', pain: 'Har customer pehle condition, box aur warranty poochta hai.', fix: 'Condition, shutter count, box aur warranty aap product page pe ek dafa likh dete hain.', featureTitle: 'Jawab page pe, chat mein nahi.', featureCaption: 'Har camera ke page pe aap yeh likhte hain', featureLine: 'Customer ko jawab page pe mil jata hai, is liye WhatsApp pe wohi sawal kam aate hain.', points: [['Condition', 'Body aur lens, saaf likha hua'], ['Shutter count', 'Har body ke saath'], ['Warranty', 'Kitni, aur kis ki']] },
      console: { label: 'Console & Games', chat: 'console / games', question: '“Purana console de kar naya kitne ka parega?”', pain: 'Trade-in ka wohi hisaab aap baar baar lagate hain.', fix: 'Trade-in quote aur condition label page pe hi hota hai.', featureTitle: 'Trade-in, bina hisaab kitaab ke.', featureCaption: 'Har console ke page pe yeh nazar aata hai', featureLine: 'Customer message karne se pehle hi dekh leta hai ke purane console ki kitni value hai.', points: [['Trade-in quote', 'Page pe hi'], ['Condition label', 'Har used unit ke saath'], ['Serial warranty', 'Har sale ka record']] },
    } satisfies Record<ShopType, Shop>,
    stock: ['“Stock mein hai?”', 'Customer wait karta hai aur koi shelf, godown ya doosri branch check karta hai.', 'Counter aur online orders ek hi stock se chalte hain, har location ke hisaab se.'],
    warranty: ['“Warranty ka record kahan hai?”', 'Return aaye to bills, messages aur supplier ke records dhoondne parte hain.', 'Serial number search karein: kab sale hua, kis ko, aur warranty kab tak hai.'],
    stockTitle: 'Stock ka pata, har waqt.',
    stockLine: 'Counter, website aur har branch ka stock ek hi jagah. Counter pe item bika to website pe bhi update ho jata hai.',
    stockCaption: 'Products aur stock admin · Real screen, demo data',
    plansHeading: '3 plans. Aap ki shop ke hisaab se.',
    plansIntro: 'WhatsApp pe apni shop ke baare mein batayein, hum aap ko sahi plan ka exact quote bhej dete hain.',
    plans: [
      { name: 'Single Store', line: 'Ek shop, online store aur WhatsApp pe orders.', delivery: '10 din mein live', items: ['Aap ka apna online store, pehle 50 products hum load karte hain', 'Orders poori detail ke saath aap ke WhatsApp pe', 'Products, stock aur orders ka admin panel', 'Google Search Console, sitemap aur analytics setup'] },
      { name: 'Multi-Branch', line: 'Counter aur online saath, 3 locations tak.', delivery: '21 din mein live', items: ['Single Store ka sab kuch', 'PC builder, compatibility checks ke saath', '3 locations tak stock sync', 'Serial-number warranty tracking', 'Card aur wallet payments, aur AI sales assistant'] },
      { name: 'Chain & Wholesale', line: 'Chains, wholesalers aur importers, staff ke saath.', delivery: '30 din se', items: ['Multi-Branch ka sab kuch', 'Unlimited branches aur warehouses, stock transfers ke saath', 'Staff roles: owner, manager, cashier, warehouse', 'POS hardware, courier aur FBR integration'] },
    ] satisfies Plan[],
    planCta: 'Quote WhatsApp pe lein',
    planItems: 'Is mein kya milta hai',
    plansNote: 'Delivery ka time aap ka content aur pehli payment milne se shuru hota hai.',
    storesHeading: 'Hamari baat pe na jayein. Khud chala kar dekhein.',
    storesIntro: 'Real screens, sample products ke saath. Apne phone pe demo store kholein aur ek test order kar ke dekhein.',
    stores: [
      { shop: 'pc', name: 'Computer & gaming store', line: 'PC builder ke saath' },
      { shop: 'laptop', name: 'Laptop store', line: 'Grades aur battery health ke saath' },
      { shop: 'console', name: 'Console & games store', line: 'Trade-in quotes ke saath' },
    ] satisfies Store[],
    storeCta: 'Demo kholein',
    ownedHeading: 'Launch ke baad sab aap ka.',
    owned: [['Code', 'Poori repository'], ['Database', 'Aap ke products, orders aur customers'], ['Admin accounts', 'Har login aap ko milta hai'], ['30 din bug fixes', 'Free, jo humne banaya us ke liye']],
    partnerStrip: 'Founding Partner: sirf pehli 2 tech shops ke liye special terms.',
    partnerStripCta: 'WhatsApp pe poochein',
    partnerFaq: ['Founding Partner kya hai?', 'Hum Pakistan mein start kar rahe hain, is liye pehli 2 tech shops ko special terms milte hain. Badle mein hum 3 cheezein maangte hain: launch ke baad aap ka review, aap ki shop ko case study dikhane ki permission, aur 20-minute ka feedback call.'] as [string, string],
    partnerMessage: ' Founding Partner terms ke baare mein bhi batayein.',
    processHeading: 'Pehle message se apne system tak.',
    process: [
      ['Pehle demo', 'Hum aap ki shop ke hisaab se system dikhate hain. Bilkul free.'],
      ['Written scope', 'Kya banega aur kab tak: sign se pehle likha hua.'],
      ['Aap test karein, phir launch', 'Private link pe apna system check karein. Launch ke baad code, database aur admin accounts aap ke.'],
    ],
    faqHeading: 'Baat karne se pehle.',
    faq: [
      ['Hamare purane products aa jayenge?', 'Pehle 50 products hum khud daalte hain. Apne catalogue ka sample bhejein; zyada products ka import aur clean-up kaam shuru hone se pehle tay kar lete hain.'],
      ['Kya staff ise chala lega?', 'Admin panel shop staff ke liye bana hai. Training aur handover hum mil kar tay karte hain.'],
      ['Payment aur approval kaise hoti hai?', '3 stages mein, 40 / 40 / 20: shuru mein, test version approve hone pe, aur launch pe. Aakhri stage se pehle aap signed checklist pe test karte hain.'],
      ['Meri shop computer ki nahi. Phir bhi chalega?', 'Ji. Online store, stock aur warranty record har tech shop ke liye hai. PC builder un shops ke liye extra hai jo custom builds bechti hain.'],
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
    },
    formMessage: (shop: string, city: string, branches: string) => `Assalam o Alaikum, meri ${shop} shop ${city} mein hai (${branches}). Mujhe demo dekhna hai.`,
    orDirect: 'Ya seedha WhatsApp pe message karein',
    privacy: 'Privacy', terms: 'Terms', retailTerms: 'Retail delivery terms',
  },
}

export function funnelWhatsAppUrl(lang: FunnelLanguage, shop: ShopType, plan?: string, partner = false): string {
  const copy = FUNNEL_COPY[lang]
  return `https://wa.me/${BUSINESS.phoneE164.replace('+', '')}?text=${encodeURIComponent(copy.whatsappMessage(copy.shops[shop].chat, plan) + (partner ? copy.partnerMessage : ''))}`
}

/** The WhatsApp chat opened after the short form: the visitor's answers are already written in it. */
export function funnelFormWhatsAppUrl(lang: FunnelLanguage, lead: { shop: ShopType; city: string; branches: '1' | '2-3' | '4+' }): string {
  const copy = FUNNEL_COPY[lang]
  return `https://wa.me/${BUSINESS.phoneE164.replace('+', '')}?text=${encodeURIComponent(copy.formMessage(copy.shops[lead.shop].chat, lead.city, copy.form.branchOptions[lead.branches]))}`
}
