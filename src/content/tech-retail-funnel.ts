// Owner's Loom can replace the locally rendered product overview when ready.
// The supplied calendar currently displays a 20-minute FREE SITE AUDIT event;
// campaign CTAs intentionally make no different duration promise.
export const FUNNEL_ASSETS: { loomUrl: string | null; bookingUrl: string | null; video: string; poster: string } = {
  loomUrl: null,
  bookingUrl: 'https://calendly.com/artsbyhamza/30min',
  video: '/video/tech-retail-overview.mp4',
  poster: '/video/tech-retail-poster.webp',
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

export const FUNNEL_COPY = {
  en: {
    headline: ['Your PC builds. Your branch stock.', 'One retail system.'],
    intro: 'For computer retailers running two or three locations. Bring your online store, PC compatibility checks and serial-number warranty records into one connected workflow.',
    cta: 'Book a personalised demo',
    ctaNote: 'A conversation about your products, locations and workflow. No commitment.',
    preview: 'Tech Retail OS · 42-second overview',
    previewNote: 'Actual product screens · Sample products and demo data',
    videoButton: 'Play the Tech Retail OS overview',
    videoFallback: 'Your browser cannot play this video.',
    previewCaption: 'Your storefront and back office, connected. Explore the workflows below.',
    problemHeading: 'Sound familiar at your shop?',
    problems: [
      ['“Will these parts work together?”', 'Your team repeats the same socket, RAM and power checks for every custom build.', 'Give customers a builder that checks CPU sockets, RAM type and estimated PSU requirements as they choose.'],
      ['“Which branch has it in stock?”', 'A customer is waiting while someone calls the other shop or checks another spreadsheet.', 'See stock by location. Counter sales and online orders work from the same inventory.'],
      ['“Where is the warranty record?”', 'A returned component means searching messages, invoices and supplier records.', 'Follow the serial number from intake to sale, invoice and warranty claim.'],
    ],
    solutionHeading: 'Built around the way a computer shop sells.',
    solutionIntro: 'A working retail product, adapted to your catalogue, branding and locations. These actual product screens use sample products and demo data.',
    screenTitles: ['Build with compatible parts.', 'Know what is available.', 'Keep every serial connected.'],
    screenCaptions: ['PC builder · Sample component catalogue', 'Product and stock administration · Demo data', 'Serial-record workflow included in this scope'],
    serialSteps: [['Intake', 'Serial number + supplier'], ['Sale', 'Invoice + customer'], ['Warranty', 'Claim + replacement record']],
    offerHeading: 'One complete setup for your next stage.',
    offerName: 'Tech Retail OS / Multi-Branch',
    offerIntro: 'For an established computer retailer bringing the counter, online store and up to three locations together.',
    priceLabel: 'One-time build',
    domestic: 'For businesses in Pakistan', international: 'For international businesses',
    included: 'Your online store and product/order admin, plus:',
    scope: 'Included scope and boundaries',
    exclusions: 'Quoted separately or outside this scope',
    delivery: '21 days after your content and first payment arrive. Time awaiting feedback or third-party approvals is additional.',
    care: 'No platform commission. Hosting, domain, gateway fees and AI usage are separate. Optional Growth Care includes hosting and support.',
    processHeading: 'A clear path from first call to your own system.',
    process: [
      ['Walk through your shop', 'We discuss your catalogue, locations and current workflow, then demonstrate the parts relevant to you.'],
      ['Agree the scope', 'We confirm deliverables, data import, staff handover, costs and acceptance criteria before the build begins.'],
      ['Test, approve, launch', 'Test your branded system on private staging. Payments follow agreed milestones; ownership transfers on final payment.'],
    ],
    faqHeading: 'Before we talk.',
    faq: [
      ['Can you bring over our existing products?', 'Your first 50 products are included in the store setup. Send a sample of your catalogue; larger imports, cleanup and extra data entry are scoped before work starts.'],
      ['Can my team manage the store?', 'The product and order admin is made for shop staff. We agree the training and handover needed for your team. Separate staff permission levels are an add-on or part of the Chain plan.'],
      ['What will we pay after launch?', 'There is no monthly platform fee or sales commission to TeXCodes. Hosting, domains, gateway transaction fees and AI usage remain running costs. Care Plans are optional.'],
      ['How do payments and approval work?', '40 / 40 / 20: to start, at staging approval and at launch. You test against a signed acceptance checklist. Unmet items are fixed within 10 working days; if we still cannot meet it, you may request a deposit refund and end the engagement.'],
      ['What do we own, and what support is included?', 'On final payment, your repository, database and admin accounts are transferred to you. Your design, content and custom features are yours; the core engine is shared across clients. Delivered bugs are fixed free for 30 days. New features are quoted separately.'],
    ],
    finalHeading: 'Let’s see how it fits your shop.',
    finalCopy: 'Bring your product list and the workflow you want to improve. We’ll walk through it together in a personalised demo.',
    pending: 'The demo booking calendar will be available here shortly.',
    identity: 'Built and delivered by Hamza · TeXCodes · Pakistan, working worldwide',
    privacy: 'Privacy', terms: 'Terms', retailTerms: 'Retail delivery terms',
  },
  'ur-en': {
    headline: ['PC builds aur branch ka stock.', 'Ek hi retail system.'],
    intro: 'Do ya teen locations walay computer retailers ke liye. Online store, PC compatibility checks aur serial-number warranty records ko ek hi workflow mein laayein.',
    cta: 'Apna personalised demo book karein',
    ctaNote: 'Aapke products, locations aur workflow par baat. Koi commitment nahi.',
    preview: 'Tech Retail OS · 42-second English overview', previewNote: 'Asal product screens · Sample products aur demo data',
    videoFallback: 'Aapka browser yeh video nahi chala sakta.',
    videoButton: 'Tech Retail OS ka overview chalayein', previewCaption: 'Storefront aur back office, aapas mein connected. Neeche workflows dekhein.',
    problemHeading: 'Kya aapki dukan mein bhi aisa hota hai?',
    problems: [
      ['“Kya yeh parts saath chalenge?”', 'Har custom build ke liye socket, RAM aur power ke checks dobara karne parte hain.', 'Customer parts chunta hai aur builder CPU socket, RAM type aur PSU requirements check karta hai.'],
      ['“Kis branch par stock hai?”', 'Customer intezar karta hai aur staff doosri dukan ko phone ya spreadsheet check karta hai.', 'Har location ka stock dekhein. Counter aur online orders ek hi inventory par kaam karte hain.'],
      ['“Warranty ka record kahan hai?”', 'Return par messages, invoices aur supplier ke records dhoondhne parte hain.', 'Serial ko intake se sale, invoice aur warranty claim tak follow karein.'],
    ],
    solutionHeading: 'Computer dukan ke kaam ke mutabiq.',
    solutionIntro: 'Chalta hua retail product, aapke catalogue, branding aur locations ke mutabiq. Yeh demonstration system ki screens hain, kisi client ke revenue results nahi.',
    screenTitles: ['Compatible parts ke saath build.', 'Stock ki wazeh soorat-e-haal.', 'Har serial ka connected record.'],
    screenCaptions: ['PC builder · Sample catalogue', 'Products aur stock admin · Demo data', 'Is scope mein shamil serial-record workflow'],
    serialSteps: [['Intake', 'Serial number + supplier'], ['Sale', 'Invoice + customer'], ['Warranty', 'Claim + replacement record']],
    offerHeading: 'Agley marhalay ke liye mukammal setup.', offerName: 'Tech Retail OS / Multi-Branch',
    offerIntro: 'Established computer retailer ke liye: counter, online store aur teen locations tak ek system mein.',
    priceLabel: 'Ek martaba build ki qeemat', domestic: 'Pakistan ke businesses ke liye', international: 'International businesses ke liye',
    included: 'Online store aur products/orders ka admin, saath mein:', scope: 'Shamil scope aur hudood', exclusions: 'Alag quote ya is scope se bahar',
    delivery: 'Content aur pehli payment milne ke baad 21 din. Feedback ya third-party approvals ke intezar ka waqt izafi hoga.',
    care: 'Platform commission nahi. Hosting, domain, gateway fees aur AI usage alag hain. Optional Growth Care mein hosting aur support shamil hain.',
    processHeading: 'Pehli call se apne system tak wazeh raasta.',
    process: [
      ['Aapki dukan ko samjhein', 'Catalogue, locations aur workflow par baat, phir aapke kaam ka demo.'],
      ['Scope tay karein', 'Build se pehle deliverables, data import, training, costs aur acceptance criteria tay honge.'],
      ['Test, approval aur launch', 'Private staging par apna system test karein. Payments milestones par; final payment par ownership transfer.'],
    ],
    faqHeading: 'Baat karne se pehle.',
    faq: [
      ['Purane products import ho sakte hain?', 'Setup mein pehle 50 products shamil hain. Catalogue ka sample bhejein; bara import, cleanup aur izafi data entry ka scope pehle tay hoga.'],
      ['Kya staff store chala sakta hai?', 'Products aur orders ka admin shop staff ke liye hai. Training aur handover mil kar tay karenge. Alag staff permissions add-on ya Chain plan mein hain.'],
      ['Launch ke baad kya kharcha hai?', 'TeXCodes ki monthly platform fee ya sales commission nahi. Hosting, domain, gateway fees aur AI usage running costs hain. Care Plans optional hain.'],
      ['Payment aur approval kaise hoti hai?', '40 / 40 / 20: shuru mein, staging approval par aur launch par. Signed checklist par test karein. Kami 10 working days mein theek hogi; phir bhi checklist poori na ho to deposit refund maang kar engagement khatam kar sakte hain.'],
      ['Ownership aur support mein kya milta hai?', 'Final payment par repository, database aur admin accounts aapke. Design, content aur custom features aapke; core engine clients mein shared hai. Delivered bugs 30 din muft theek; naye features ka alag quote.'],
    ],
    finalHeading: 'Dekhein aapki dukan mein kaise fit hota hai.', finalCopy: 'Product list aur woh workflow laayein jo behtar banana hai. Personalised demo mein saath dekhenge.',
    pending: 'Demo booking calendar jald yahan available hoga.',
    identity: 'Hamza ki taraf se · TeXCodes · Pakistan se, duniya bhar ke liye', privacy: 'Privacy', terms: 'Terms', retailTerms: 'Retail delivery terms',
  },
}
