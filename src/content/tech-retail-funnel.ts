// The Tech Retail funnel: one page for tech retailers in Pakistan.
// It shows no pricing. Every action opens a WhatsApp chat; prices are discussed there after the demo.
import { BUSINESS } from '../data/business.js'

export const SHOP_TYPES = ['pc', 'laptop', 'mobile', 'camera', 'console'] as const
export type ShopType = (typeof SHOP_TYPES)[number]
export type FunnelLanguage = 'en' | 'ur-en'

export const FUNNEL_ASSETS = { preview: '/tech-retail/preview.webp' }

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

type Shop = { label: string; chat: string; question: string; pain: string; fix: string; featureTitle: string; featureCaption: string; points: [string, string][] | null }
type Plan = { name: string; line: string; delivery: string; items: string[] }

export const FUNNEL_COPY = {
  en: {
    headline: ['Your tech shop, online.', 'With stock and warranty records.'],
    intro: 'Computer, laptop, mobile, camera or console: your own online store, your stock and your warranty records in one system, built for shops in Pakistan.',
    shopPrompt: 'What does your shop sell?',
    cta: 'See the demo on WhatsApp',
    ctaNote: 'A two-minute demo for your kind of shop. No commitment.',
    demoCta: 'Try the live demo yourself',
    demoNote: 'Opens a working demo store with sample products.',
    demoNoteOther: 'Opens the computer-shop demo store as an example, with sample products.',
    preview: 'A real screen from the demo store',
    previewNote: 'Sample products and demo data',
    stickyCta: 'Demo on WhatsApp',
    whatsappMessage: (shop: string, plan?: string) => `Assalam o Alaikum, I have a ${shop} shop and I would like to see the demo${plan ? ` and get a quote for the ${plan} plan` : ''}.`,
    problemHeading: 'Does this happen in your shop?',
    shops: {
      pc: { label: 'PC & Gaming', chat: 'computer / gaming', question: '“Will these parts work together?”', pain: 'Your team repeats the same socket, RAM and power-supply checks for every custom build.', fix: 'The builder checks CPU socket, RAM type and power supply before the order is placed.', featureTitle: 'Builds with parts that fit.', featureCaption: 'PC builder · Sample component catalogue', points: null },
      laptop: { label: 'Laptop', chat: 'laptop', question: '“What is the battery health? Which grade?”', pain: 'Every customer asks the same thing, and you send a screenshot every time.', fix: 'Each laptop page shows its condition grade, battery health and upgrade options.', featureTitle: 'Every laptop, fully described.', featureCaption: 'What each laptop page shows', points: [['Condition grade', 'A, B or C, stated clearly'], ['Battery health', 'Shown for each unit'], ['Upgrades', 'RAM and SSD options']] },
      mobile: { label: 'Mobile', chat: 'mobile', question: '“Is it PTA approved? Does it come with the box?”', pain: 'The same questions and the same answers, all day.', fix: 'You write the condition, PTA status, box and warranty on the product page once.', featureTitle: 'Answers on the page, not in the chat.', featureCaption: 'What you write on each phone page', points: [['Condition', 'New, used or open box'], ['PTA status', 'Approved or non-PTA'], ['Warranty', 'How long, and whose']] },
      camera: { label: 'Camera', chat: 'camera', question: '“What is the shutter count? Is the lens included?”', pain: 'Every buyer asks about condition, box and warranty before anything else.', fix: 'You write the condition, shutter count, box contents and warranty on the product page once.', featureTitle: 'Answers on the page, not in the chat.', featureCaption: 'What you write on each camera page', points: [['Condition', 'Body and lens, stated clearly'], ['Shutter count', 'Written for each body'], ['Warranty', 'How long, and whose']] },
      console: { label: 'Console & Games', chat: 'console / games', question: '“How much for the new one if I trade in my old console?”', pain: 'You work out the same trade-in sums again and again.', fix: 'The trade-in quote and the condition label are on the page.', featureTitle: 'Trade-ins without the arithmetic.', featureCaption: 'What each console page shows', points: [['Trade-in quote', 'Shown on the page'], ['Condition label', 'For every used unit'], ['Serial warranty', 'A record for each sale']] },
    } satisfies Record<ShopType, Shop>,
    stock: ['“Is it in stock?”', 'A customer waits while someone checks the shelf, the store room or the other branch.', 'Counter sales and online orders work from the same stock, by location.'],
    warranty: ['“Where is the warranty record?”', 'A returned item means searching bills, messages and supplier records.', 'Search the serial number and see when it was sold, to whom, and until when it is covered.'],
    solutionHeading: 'Built around the way a tech shop sells.',
    solutionIntro: 'A working retail system, set up with your catalogue, your name and your logo. These are real screens with sample products.',
    stockTitle: 'Know what is in stock.',
    stockCaption: 'Product and stock administration · Demo data',
    serialTitle: 'Keep every serial number on record.',
    serialCaption: 'How a serial number is followed',
    serialSteps: [['Intake', 'Serial number + supplier'], ['Sale', 'Invoice + customer'], ['Warranty', 'Claim + replacement record']],
    plansHeading: 'Three plans. One for your stage.',
    plansIntro: 'Tell us about your shop on WhatsApp and we will send the exact quote for the plan that fits.',
    plans: [
      { name: 'Single Store', line: 'One shop going online, with orders arriving on WhatsApp.', delivery: 'Live in 10 days', items: ['Your own online store, with your first 50 products loaded', 'Orders sent to your WhatsApp with full details', 'Admin panel for products, stock and orders', 'Google Search Console, sitemap and analytics set up'] },
      { name: 'Multi-Branch', line: 'Counter and online together, across up to 3 locations.', delivery: 'Live in 21 days', items: ['Everything in Single Store', 'PC builder with compatibility checks', 'Stock synced across up to 3 locations', 'Serial-number warranty tracking', 'Card and wallet payments, and an AI sales assistant'] },
      { name: 'Chain & Wholesale', line: 'Chains, wholesalers and importers with staff across locations.', delivery: 'From 30 days', items: ['Everything in Multi-Branch', 'Unlimited branches and warehouses, with stock transfers', 'Staff roles: owner, manager, cashier, warehouse', 'POS hardware, courier and FBR integration'] },
    ] satisfies Plan[],
    planCta: 'Get the quote on WhatsApp',
    plansNote: 'Delivery time starts when your content and first payment arrive.',
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
      ['What do we own afterwards?', 'On final payment your repository, database and admin accounts are transferred to you. Bugs in what we delivered are fixed free for 30 days.'],
      ['My shop is not a computer shop. Does it still fit?', 'Yes. The online store, stock and warranty records work for any tech shop. The PC builder is an extra for shops that sell custom builds.'],
    ],
    finalHeading: 'See how it fits your shop.',
    finalCopy: 'Send one message. We will reply with the demo for your kind of shop and answer your questions there.',
    identity: 'Built and delivered by Hamza · TeXCodes · Pakistan',
    privacy: 'Privacy', terms: 'Terms', retailTerms: 'Retail delivery terms',
  },
  'ur-en': {
    headline: ['Aap ki tech shop, online.', 'Stock aur warranty ke saath.'],
    intro: 'Computer, laptop, mobile, camera ya console: aap ka apna online store, stock aur warranty record ek hi system mein. Pakistan ki shops ke liye bana hai.',
    shopPrompt: 'Aap ki shop kis cheez ki hai?',
    cta: 'WhatsApp pe demo dekhein',
    ctaNote: 'Aap ki shop ke hisaab se 2-minute demo. Koi commitment nahi.',
    demoCta: 'Live demo khud dekhein',
    demoNote: 'Chalta hua demo store khulega, sample products ke saath.',
    demoNoteOther: 'Example ke taur pe computer shop ka demo store khulega, sample products ke saath.',
    preview: 'Demo store ki real screen',
    previewNote: 'Sample products aur demo data',
    stickyCta: 'WhatsApp pe demo',
    whatsappMessage: (shop: string, plan?: string) => `Assalam o Alaikum, meri ${shop} shop hai aur mujhe demo dekhna hai${plan ? `. ${plan} plan ka quote bhi chahiye` : ''}.`,
    problemHeading: 'Kya aap ki shop mein bhi aisa hota hai?',
    shops: {
      pc: { label: 'PC & Gaming', chat: 'computer / gaming', question: '“Kya yeh parts saath chalenge?”', pain: 'Har custom build ke liye socket, RAM aur power supply dobara check karni parti hai.', fix: 'Builder CPU socket, RAM type aur power supply order se pehle check kar leta hai.', featureTitle: 'Build wohi jo compatible ho.', featureCaption: 'PC builder · Sample catalogue', points: null },
      laptop: { label: 'Laptop', chat: 'laptop', question: '“Battery health kitni hai? Grade kya hai?”', pain: 'Har customer yehi poochta hai, aur aap har dafa screenshot bhejte hain.', fix: 'Har laptop ke page pe condition grade, battery health aur upgrade options likhe hote hain.', featureTitle: 'Har laptop ki poori detail.', featureCaption: 'Har laptop ke page pe yeh nazar aata hai', points: [['Condition grade', 'A, B ya C, saaf likha hua'], ['Battery health', 'Har unit ke saath'], ['Upgrades', 'RAM aur SSD options']] },
      mobile: { label: 'Mobile', chat: 'mobile', question: '“PTA approved hai? Box ke saath hai?”', pain: 'Roz wohi sawal, roz wohi jawab.', fix: 'Condition, PTA status, box aur warranty aap product page pe ek dafa likh dete hain.', featureTitle: 'Jawab page pe, chat mein nahi.', featureCaption: 'Har phone ke page pe aap yeh likhte hain', points: [['Condition', 'New, used ya open box'], ['PTA status', 'Approved ya non-PTA'], ['Warranty', 'Kitni, aur kis ki']] },
      camera: { label: 'Camera', chat: 'camera', question: '“Shutter count kitna hai? Lens saath hai?”', pain: 'Har customer pehle condition, box aur warranty poochta hai.', fix: 'Condition, shutter count, box aur warranty aap product page pe ek dafa likh dete hain.', featureTitle: 'Jawab page pe, chat mein nahi.', featureCaption: 'Har camera ke page pe aap yeh likhte hain', points: [['Condition', 'Body aur lens, saaf likha hua'], ['Shutter count', 'Har body ke saath'], ['Warranty', 'Kitni, aur kis ki']] },
      console: { label: 'Console & Games', chat: 'console / games', question: '“Purana console de kar naya kitne ka parega?”', pain: 'Trade-in ka wohi hisaab aap baar baar lagate hain.', fix: 'Trade-in quote aur condition label page pe hi hota hai.', featureTitle: 'Trade-in, hisaab ke baghair.', featureCaption: 'Har console ke page pe yeh nazar aata hai', points: [['Trade-in quote', 'Page pe hi'], ['Condition label', 'Har used unit ke saath'], ['Serial warranty', 'Har sale ka record']] },
    } satisfies Record<ShopType, Shop>,
    stock: ['“Stock mein hai?”', 'Customer wait karta hai aur koi shelf, godown ya doosri branch check karta hai.', 'Counter aur online orders ek hi stock se chalte hain, har location ke hisaab se.'],
    warranty: ['“Warranty ka record kahan hai?”', 'Return aaye to bills, messages aur supplier ke records dhoondne parte hain.', 'Serial number search karein: kab sale hua, kis ko, aur warranty kab tak hai.'],
    solutionHeading: 'Tech shop ke kaam ke mutabiq bana hai.',
    solutionIntro: 'Chalta hua retail system, aap ke catalogue, naam aur logo ke saath. Yeh real screens hain, sample products ke saath.',
    stockTitle: 'Stock ka pata, har waqt.',
    stockCaption: 'Products aur stock admin · Demo data',
    serialTitle: 'Har serial number ka record.',
    serialCaption: 'Serial number ka safar',
    serialSteps: [['Intake', 'Serial number + supplier'], ['Sale', 'Invoice + customer'], ['Warranty', 'Claim + replacement record']],
    plansHeading: '3 plans. Aap ki shop ke hisaab se.',
    plansIntro: 'WhatsApp pe apni shop ke baare mein batayein, hum aap ko sahi plan ka exact quote bhej dete hain.',
    plans: [
      { name: 'Single Store', line: 'Ek shop, online store aur WhatsApp pe orders.', delivery: '10 din mein live', items: ['Aap ka apna online store, pehle 50 products hum load karte hain', 'Orders poori detail ke saath aap ke WhatsApp pe', 'Products, stock aur orders ka admin panel', 'Google Search Console, sitemap aur analytics setup'] },
      { name: 'Multi-Branch', line: 'Counter aur online saath, 3 locations tak.', delivery: '21 din mein live', items: ['Single Store ka sab kuch', 'PC builder, compatibility checks ke saath', '3 locations tak stock sync', 'Serial-number warranty tracking', 'Card aur wallet payments, aur AI sales assistant'] },
      { name: 'Chain & Wholesale', line: 'Chains, wholesalers aur importers, staff ke saath.', delivery: '30 din se', items: ['Multi-Branch ka sab kuch', 'Unlimited branches aur warehouses, stock transfers ke saath', 'Staff roles: owner, manager, cashier, warehouse', 'POS hardware, courier aur FBR integration'] },
    ] satisfies Plan[],
    planCta: 'Quote WhatsApp pe lein',
    plansNote: 'Delivery ka time aap ka content aur pehli payment milne se shuru hota hai.',
    processHeading: 'Pehle message se apne system tak.',
    process: [
      ['Pehle demo', 'Hum aap ki shop ke hisaab se system dikhate hain. Bilkul free.'],
      ['Written scope', 'Kya banega aur kab tak: sign se pehle likha hua.'],
      ['Aap test karein, phir launch', 'Private link pe apna system check karein. Launch ke baad code, database aur admin accounts aap ke.'],
    ],
    faqHeading: 'Baat karne se pehle.',
    faq: [
      ['Hamare purane products aa jayenge?', 'Setup mein pehle 50 products shamil hain. Apne catalogue ka sample bhejein; bara import aur clean-up kaam shuru hone se pehle tay hota hai.'],
      ['Kya staff ise chala lega?', 'Admin panel shop staff ke liye bana hai. Training aur handover hum mil kar tay karte hain.'],
      ['Payment aur approval kaise hoti hai?', '3 stages mein, 40 / 40 / 20: shuru mein, test version approve hone pe, aur launch pe. Aakhri stage se pehle aap signed checklist pe test karte hain.'],
      ['Baad mein hamara kya hota hai?', 'Final payment pe repository, database aur admin accounts aap ko transfer ho jate hain. Jo humne deliver kiya us ke bugs 30 din free theek hote hain.'],
      ['Meri shop computer ki nahi. Phir bhi chalega?', 'Ji. Online store, stock aur warranty record har tech shop ke liye hai. PC builder un shops ke liye extra hai jo custom builds bechti hain.'],
    ],
    finalHeading: 'Dekhein yeh aap ki shop mein kaise chalega.',
    finalCopy: 'Ek message bhejein. Hum aap ki shop ke hisaab se demo bhejte hain aur wahin aap ke sawalon ka jawab dete hain.',
    identity: 'Hamza ki taraf se · TeXCodes · Pakistan',
    privacy: 'Privacy', terms: 'Terms', retailTerms: 'Retail delivery terms',
  },
}

export function funnelWhatsAppUrl(lang: FunnelLanguage, shop: ShopType, plan?: string): string {
  const copy = FUNNEL_COPY[lang]
  return `https://wa.me/${BUSINESS.phoneE164.replace('+', '')}?text=${encodeURIComponent(copy.whatsappMessage(copy.shops[shop].chat, plan))}`
}
