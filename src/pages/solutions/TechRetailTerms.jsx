import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { defaultCurrency } from '../../lib/currency'

// Shared terms for all three Retail OS offers (Tech, Laptop, Console & Games).
// Currency follows the same rules as the offer pages (PKR only for visitors in Pakistan).
const detectCurrency = () => defaultCurrency(['USD', 'GBP', 'PKR'])

function Section({ num, title, children }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-display uppercase text-[#0F0F0F] dark:text-[#EDECE6] tracking-wide flex items-center gap-2">
        <span className="text-[#059669] dark:text-[#10B981] font-mono">{num}.</span> {title}
      </h2>
      {children}
    </section>
  )
}

function Box({ items }) {
  return (
    <div className="p-5 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-2 font-mono text-xs text-[#0F0F0F] dark:text-[#EDECE6]">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          <CheckCircle2 size={15} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  )
}

export default function TechRetailTerms() {
  const { isUrdu } = useLanguage()
  const currency = detectCurrency()
  const money = (usd, gbp, pkr) => (currency === 'USD' ? usd : currency === 'GBP' ? gbp : pkr)
  const ur = (en, urdu) => (isUrdu ? urdu : en)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const hourly = money('$45 USD', '£36 GBP', 'PKR 6,000')

  return (
    <div className="w-full bg-[#F6F5F0] dark:bg-[#0F0F11] min-h-screen py-16 px-4 sm:px-8 font-mono text-xs text-[#0F0F0F] dark:text-[#EDECE6] transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Back Link */}
        <div>
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#059669] dark:text-[#10B981] hover:underline uppercase tracking-wider"
          >
            <ArrowLeft size={14} />
            <span>{ur('BACK TO SOLUTIONS', 'SOLUTIONS PAR WAPIS JAYEIN')}</span>
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-4 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] pb-8">
          <div className="tag-green">
            <ShieldCheck size={14} />
            <span>{ur('SCOPE, OWNERSHIP & WARRANTY', 'SCOPE, MALKIAT AUR WARRANTY')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6] leading-[0.95]">
            {ur('RETAIL OS TERMS', 'RETAIL OS KI SHARAAIT')}
          </h1>

          <p className="font-serif text-sm sm:text-base text-[#575652] dark:text-[#9B9A95] leading-relaxed">
            {ur(
              'These terms apply to Tech Retail OS, Laptop Retail OS and Console & Games Retail OS builds. The signed agreement for your project takes precedence over this summary.',
              'Yeh sharaait Tech Retail OS, Laptop Retail OS aur Console & Games Retail OS builds par lagu hoti hain. Aapke project ka signed agreement is summary par muqaddam hai.'
            )}
          </p>
        </div>

        <div className="space-y-10 font-sans text-sm text-[#575652] dark:text-[#9B9A95] leading-relaxed">
          <Section num="01" title={ur('Plans and timelines', 'Plans aur timelines')}>
            <p>
              {ur(
                'Each build follows the scope written into your agreement. Prices for each plan are listed on the offer pages:',
                'Har build aapke agreement mein likhe scope ke mutabiq hoti hai. Har plan ki price offer pages par di gayi hai:'
              )}{' '}
              <Link to="/solutions/tech-retail" className="text-[#059669] dark:text-[#10B981] hover:underline">Tech Retail</Link>,{' '}
              <Link to="/solutions/laptop-retail" className="text-[#059669] dark:text-[#10B981] hover:underline">Laptop Retail</Link>,{' '}
              <Link to="/solutions/console-retail" className="text-[#059669] dark:text-[#10B981] hover:underline">Console & Games Retail</Link>.
            </p>
            <Box
              items={[
                ur(
                  'Single Store — 10 days: one location, online store, your first products loaded, admin panel and WhatsApp orders.',
                  'Single Store — 10 din: ek location, online store, pehle products setup, admin panel aur WhatsApp orders.'
                ),
                ur(
                  "Multi-Branch — 21 days: everything in Single Store, plus stock across up to 3 locations, serial-number warranty tracking, online payments, an AI assistant and the offer's specialist feature (PC builder, upgrade options or trade-in calculator).",
                  'Multi-Branch — 21 din: Single Store ka sab kuch, aur 3 locations tak stock, serial number warranty tracking, online payments, AI assistant aur offer ka khaas feature (PC builder, upgrade options ya trade-in calculator).'
                ),
                ur(
                  'Chain & Wholesale — from 30 days: unlimited branches, staff roles, integrations (POS, couriers, FBR, ERP) and wholesale features. The final timeline is fixed in your scope document.',
                  'Chain & Wholesale — 30 din se: la-mehdood branches, staff roles, integrations (POS, couriers, FBR, ERP) aur wholesale features. Final timeline scope document mein tay hoti hai.'
                ),
              ]}
            />
          </Section>

          <Section num="02" title={ur('Ownership of code and data', 'Code aur data ki malkiat')}>
            <p>
              {ur(
                'On final payment, you receive your GitHub repository, database and admin accounts, with full rights to use, host, modify and extend your system. Your content, design and custom features are exclusively yours.',
                'Aakhri payment par aapko GitHub repository, database aur admin accounts milte hain, aur system ko use, host, modify aur extend karne ke mukammal huqooq. Aapka content, design aur custom features sirf aapke hain.'
              )}
            </p>
            <p>
              {ur(
                'TeXCodes keeps ownership of its pre-existing core engine and grants you a permanent, royalty-free licence to use it as part of your system, so we can keep improving it for all clients. Market exclusivity can be added by agreement.',
                'TeXCodes apne pehle se bane core engine ka malik rehta hai aur aapko is ka mustaqil, royalty-free licence deta hai taake aap ise apne system ke hisse ke tor par use kar sakein — is tarah hum ise tamam clients ke liye behtar karte rehte hain. Market exclusivity agreement ke zariye shamil ki ja sakti hai.'
              )}
            </p>
          </Section>

          <Section num="03" title={ur('30-day warranty', '30 din ki warranty')}>
            <p>
              {ur(
                'Every plan includes a 30-day warranty after launch. Bugs and regressions in the delivered scope are fixed at no charge.',
                'Har plan mein launch ke baad 30 din ki warranty shamil hai. Delivered scope ke bugs aur regressions muft theek kiye jate hain.'
              )}
            </p>
          </Section>

          <Section num="04" title={ur('Delivery and staging approval', 'Delivery aur staging approval')}>
            <p>
              {ur(
                'The delivery date is written into your contract. The clock starts on the day we receive your content and first payment, and pauses while we wait on your content, feedback or third-party approvals (for example payment gateway accounts).',
                'Delivery date contract mein likhi hoti hai. Waqt us din se shuru hota hai jab humein aapka content aur pehli payment mil jaye, aur aapke content, feedback ya third-party approvals (maslan payment gateway account) ke intezar mein ruk jata hai.'
              )}
            </p>
            <div className="p-5 bg-white dark:bg-[#161619] border border-[#059669]/30 dark:border-[#10B981]/30 space-y-2">
              <div className="font-mono text-xs font-bold text-[#059669] dark:text-[#10B981] uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck size={16} />
                <span>{ur('STAGING APPROVAL', 'STAGING APPROVAL')}</span>
              </div>
              <p>
                {ur(
                  "Before the second payment, your system is deployed to a private staging link with your products. You test it against the acceptance checklist signed at kickoff. If any item isn't met, we fix it within 10 working days. If we still can't meet the checklist, you may request a refund of your deposit, and the engagement ends.",
                  'Doosri payment se pehle aapka system aapke products ke sath private staging link par deploy hota hai. Aap ise kickoff par sign hui acceptance checklist ke mutabiq test karte hain. Jo item poora na ho, hum 10 working days mein theek karte hain. Phir bhi checklist poori na ho sake, to aap apni deposit wapas le sakte hain aur engagement khatam ho jata hai.'
                )}
              </p>
            </div>
            <p>
              {ur(
                "If we're late beyond the agreed date, you get one free month of Care Plan for each full week of delay.",
                'Agar der hamari taraf se tay shuda date se aage jaye, to har mukammal hafte ki der par ek mahina Care Plan muft.'
              )}
            </p>
          </Section>

          <Section num="05" title={ur('Support after launch', 'Launch ke baad support')}>
            <p>
              {ur(
                'After the warranty, response times depend on your Care Plan. Business hours are Monday to Saturday, 10 am to 7 pm Pakistan time. The warranty covers the work we delivered; new features or anything outside the agreed scope are change requests.',
                'Warranty ke baad jawab ka waqt aapke Care Plan par munhasir hai. Business hours Monday se Saturday, subah 10 se shaam 7 baje (Pakistan time). Warranty sirf delivered kaam par lagti hai; naye features ya scope se bahar ki cheezein change request hain.'
              )}
            </p>
          </Section>

          <Section num="06" title={ur('Revisions and change requests', 'Revisions aur change requests')}>
            <p>
              {ur(
                `Two revision rounds are included per milestone. Anything beyond that, or outside the agreed scope, is billed at ${hourly} per hour, with an estimate before we start.`,
                `Har milestone par 2 revision rounds shamil hain. Is ke baad, ya agreed scope se bahar kuch bhi, ${hourly} fi ghanta bill hota hai, aur kaam se pehle estimate diya jata hai.`
              )}
            </p>
            <p>
              {ur(
                'A revision adjusts something already in the scope. A change request adds or removes something.',
                'Revision ka matlab scope mein mojood cheez ko theek karna. Change request ka matlab kuch naya add ya remove karna.'
              )}
            </p>
          </Section>

          <Section num="07" title={ur('Your responsibilities', 'Aapki zimmedariyan')}>
            <p>
              {ur(
                'You supply product photos, descriptions, prices and logos, and data entry beyond the included product count (or add it as an add-on). You provide access to your domain, hosting and any third-party accounts.',
                'Product photos, descriptions, prices aur logo aap dete hain, aur included products se zyada data entry bhi (ya add-on ke tor par). Domain, hosting aur third-party accounts ka access aap dete hain.'
              )}
            </p>
            <p>
              {ur(
                'If we hear nothing for more than 30 days, the project goes dormant and restarts at the next available slot. Your code and data are kept safe in the meantime.',
                'Agar 30 din se zyada koi jawab na aaye, to project dormant ho jata hai aur agle dastiyab slot par dobara shuru hota hai. Is dauran aapka code aur data mehfooz rehta hai.'
              )}
            </p>
          </Section>

          <Section num="08" title={ur('Payment and invoicing', 'Payment aur invoicing')}>
            <p>
              {ur(
                'Payment is split 40 / 40 / 20: to start, at staging approval, and at launch. Each payment follows a written sign-off.',
                'Payment 40 / 40 / 20 mein: shuru mein, staging approval par, aur launch par. Har payment likhi hui sign-off ke baad.'
              )}
            </p>
            <p>
              {ur(
                'Businesses in Pakistan are invoiced in PKR and pay by bank transfer. International clients are invoiced in USD or GBP and pay by international bank transfer or another method agreed in writing. Prices are fixed for the agreed scope.',
                'Pakistan ke karobar ko PKR mein invoice hota hai aur payment bank transfer se. International clients ko USD ya GBP mein invoice hota hai aur payment international bank transfer ya likh kar tay shuda tareeqe se. Tay shuda scope ki price fixed hai.'
              )}
            </p>
            <p>
              {ur(
                'Online card and wallet payments on your store are included in Multi-Branch and Chain & Wholesale, and available as an add-on on Single Store.',
                'Store par online card aur wallet payments Multi-Branch aur Chain & Wholesale mein shamil hain, aur Single Store par add-on ke tor par dastiyab.'
              )}
            </p>
          </Section>

          <Section num="09" title={ur('Cancellation and refunds', 'Cancellation aur refunds')}>
            <Box
              items={[
                ur(
                  'Staging not approved: if we cannot meet the signed checklist after the 10-working-day fix period, your deposit is refunded on request.',
                  'Staging approve na ho: agar 10 working days ke fix period ke baad bhi signed checklist poori na ho, to request par deposit wapas.'
                ),
                ur(
                  'Cancellation before staging, for reasons unrelated to our performance: the deposit is non-refundable.',
                  'Staging se pehle cancellation, hamari performance se hat kar kisi wajah se: deposit wapas nahi hoti.'
                ),
                ur(
                  'Cancellation after staging approval: completed milestones are billed and a 20% cancellation fee applies.',
                  'Staging approval ke baad cancellation: mukammal milestones bill hote hain aur 20% cancellation fee lagti hai.'
                ),
              ]}
            />
          </Section>

          <Section num="10" title={ur('Hosting, third-party costs and Care Plans', 'Hosting, third-party kharche aur Care Plans')}>
            <p>
              {ur(
                'The build price does not include ongoing hosting, domain renewal or third-party fees. Payment gateway fees, SMS/WhatsApp API costs and AI usage are paid by you at cost. You own the code, so you can host it anywhere or use our managed hosting.',
                'Build ki price mein hosting, domain renewal ya third-party fees shamil nahi. Payment gateway fees, SMS/WhatsApp API aur AI usage ka kharcha at-cost aap dete hain. Code aapka hai, aap kahin bhi host kar sakte hain ya hamari managed hosting le sakte hain.'
              )}
            </p>
            <Box
              items={[
                ur(
                  `Basic Care — ${money('$140', '£115', 'PKR 14,000')} per month: hosting, SSL, daily backups, uptime monitoring, small edits, email support.`,
                  `Basic Care — ${money('$140', '£115', 'PKR 14,000')} mahana: hosting, SSL, rozana backups, uptime monitoring, chhoti edits, email support.`
                ),
                ur(
                  `Growth Care — ${money('$280', '£230', 'PKR 28,000')} per month: everything in Basic, priority replies within 4 business hours, small monthly changes, WhatsApp support.`,
                  `Growth Care — ${money('$280', '£230', 'PKR 28,000')} mahana: Basic ka sab kuch, 4 business hours mein priority jawab, mahana chhoti changes, WhatsApp support.`
                ),
                ur(
                  `Enterprise Care — ${money('$550', '£450', 'PKR 55,000')} per month: everything in Growth, dedicated engineer hours, integration support, 99.5% uptime target, phone support.`,
                  `Enterprise Care — ${money('$550', '£450', 'PKR 55,000')} mahana: Growth ka sab kuch, dedicated engineer hours, integration support, 99.5% uptime target, phone support.`
                ),
              ]}
            />
            <p>
              {ur(
                'Care Plans are monthly. You can pause or stop at the end of any month; your code and data stay yours either way.',
                'Care Plans mahana hain. Aap kisi bhi mahine ke aakhir mein rok ya pause kar sakte hain; aapka code aur data har haal mein aapka rehta hai.'
              )}
            </p>
          </Section>
        </div>

        {/* Footer Links */}
        <div className="pt-8 border-t border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <Link to="/solutions" className="text-[#059669] dark:text-[#10B981] font-bold hover:underline">
            {ur('← Back to solutions', '← Solutions par wapis jayein')}
          </Link>
          <a
            href="https://wa.me/923091824000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0F0F0F] dark:text-[#EDECE6] hover:text-[#059669] dark:hover:text-[#10B981]"
          >
            {ur('Questions? Message us on WhatsApp', 'Sawal? WhatsApp par message karein')}
          </a>
        </div>
      </div>
    </div>
  )
}
