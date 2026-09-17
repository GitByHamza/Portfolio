import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, ArrowLeft, CheckCircle2, Lock, Clock, FileText } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export default function TechRetailTerms() {
  const { isUrdu } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full bg-[#F6F5F0] dark:bg-[#0F0F11] min-h-screen py-16 px-4 sm:px-8 font-mono text-xs text-[#0F0F0F] dark:text-[#EDECE6] transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Back Link */}
        <div>
          <Link
            to="/solutions/tech-retail"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#059669] dark:text-[#10B981] hover:underline uppercase tracking-wider"
          >
            <ArrowLeft size={14} />
            <span>
              {isUrdu ? 'TECH-RETAIL PACKAGES PAR WAPIS JAYEIN' : 'BACK TO TECH-RETAIL SOLUTION & PRICING'}
            </span>
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-4 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] pb-8">
          <div className="tag-green">
            <ShieldCheck size={14} />
            <span>
              {isUrdu ? 'CONTRACTUAL SCOPE AGREEMENT AUR SLA GUARANTEE' : 'CONTRACTUAL SCOPE AGREEMENT & SLA GUARANTEE'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6] leading-[0.95]">
            {isUrdu ? 'SCOPE BOUNDARIES, CODE MALKIAT AUR WARRANTIES' : 'SCOPE BOUNDARIES, CODE OWNERSHIP & WARRANTIES'}
          </h1>

          <p className="font-serif text-sm sm:text-base text-[#575652] dark:text-[#9B9A95] leading-relaxed">
            {isUrdu
              ? 'TeXCodes custom e-commerce aur retail OS deployments ke liye contractual scope, revision policies, GitHub repository transfer protocol aur technical warranty sharaait.'
              : 'Written contractual scope definitions, revision policies, GitHub repository ownership transfer protocol, and warranty terms for TeXCodes custom e-commerce and retail OS deployments.'}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 font-sans text-sm text-[#575652] dark:text-[#9B9A95] leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-display uppercase text-[#0F0F0F] dark:text-[#EDECE6] tracking-wide flex items-center gap-2">
              <span className="text-[#059669] dark:text-[#10B981] font-mono">01.</span>{' '}
              {isUrdu ? 'Package Scope Boundaries' : 'Package Scope Boundaries'}
            </h2>
            <p>
              {isUrdu
                ? 'Har deployment mutafiqa milestone specifications ke mutabiq execute ki jati hai taake waqt par guaranteed delivery aur fixed pricing barqarar rahe:'
                : 'Each deployment is executed strictly according to the agreed milestone specifications. To ensure rapid delivery, high performance, and fixed pricing without scope creep:'}
            </p>
            <div className="bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] p-5 space-y-3 font-mono text-xs text-[#0F0F0F] dark:text-[#EDECE6]">
              <div>
                <span className="font-bold text-[#059669] dark:text-[#10B981]">
                  • Single Store Launch (PKR 280,000 / 10 {isUrdu ? 'Din, guaranteed' : 'Days, guaranteed'}):
                </span>
                <p className="text-[#575652] dark:text-[#9B9A95] mt-0.5">
                  {isUrdu
                    ? 'Single storefront, 50 SKUs tak initial setup, basic stock manager, direct WhatsApp dispatch. Layout branding managed rehti hai.'
                    : 'Single storefront, up to 50 SKUs initial setup, basic admin stock updates, direct WhatsApp dispatch. Layout branding remains managed.'}
                </p>
              </div>

              <div className="pt-2 border-t border-[rgba(15,15,15,0.08)] dark:border-[rgba(255,255,255,0.08)]">
                <span className="font-bold text-[#059669] dark:text-[#10B981]">
                  • Multi Branch Growth (PKR 550,000 / 21 {isUrdu ? 'Din, guaranteed' : 'Days, guaranteed'}):
                </span>
                <p className="text-[#575652] dark:text-[#9B9A95] mt-0.5">
                  {isUrdu
                    ? 'PC Builder compatibility engine, 3 branches tak inventory tracking, serial number RMA warranty logging, aur promotional sales banner manager.'
                    : 'PC Builder compatibility engine, multi-branch inventory tracking (up to 3 nodes), serial number warranty logging, self-managed promo banners & flash sales.'}
                </p>
              </div>

              <div className="pt-2 border-t border-[rgba(15,15,15,0.08)] dark:border-[rgba(255,255,255,0.08)]">
                <span className="font-bold text-[#059669] dark:text-[#10B981]">
                  • Chain and Distribution OS ({isUrdu ? 'PKR 950,000 se shuru' : 'From PKR 950,000'} / 30 {isUrdu ? 'Din, guaranteed' : 'Days, guaranteed'}):
                </span>
                <p className="text-[#575652] dark:text-[#9B9A95] mt-0.5">
                  {isUrdu
                    ? 'La-mehdood branches, custom ERP/POS API integrations, mukammal dynamic theme CMS, granular staff permissions, aur 30-day priority warranty.'
                    : 'Unlimited branches, custom ERP/POS API integrations, complete theme control CMS, granular staff permissions, 30-day priority engineering warranty.'}
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-display uppercase text-[#0F0F0F] dark:text-[#EDECE6] tracking-wide flex items-center gap-2">
              <span className="text-[#059669] dark:text-[#10B981] font-mono">02.</span>{' '}
              {isUrdu ? '100% Client Code aur Database Malkiat Transfer' : '100% Client Code & Database Ownership Transfer'}
            </h2>
            <p>
              {isUrdu
                ? 'Band SaaS platforms ke bar-aks jo aapka data qaid kar lete hain, TeXCodes 100% Client Ownership Guarantee par kaam karta hai:'
                : 'Unlike closed SaaS platforms that hold your storefront and customer data hostage, TeXCodes operates on a 100% Client Ownership Guarantee:'}
            </p>
            <div className="p-5 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-2 font-mono text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                <span>
                  {isUrdu
                    ? 'Final milestone payment par mukammal GitHub repository invitation aur transfer.'
                    : 'Full GitHub repository invitation & transfer upon final milestone settlement.'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                <span>
                  {isUrdu
                    ? 'PostgreSQL database ka direct administrative access raw SQL export ki salahiyat ke sath.'
                    : 'Direct administrative access to the PostgreSQL database with raw SQL export capability.'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                <span>
                  {isUrdu
                    ? 'Zero vendor lock-in: Aap kisi bhi waqt apne codebase ko aazadana host ya extend kar sakte hain.'
                    : 'Zero vendor lock-in: You may host, modify, or extend the codebase independently at any time.'}
                </span>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-display uppercase text-[#0F0F0F] dark:text-[#EDECE6] tracking-wide flex items-center gap-2">
              <span className="text-[#059669] dark:text-[#10B981] font-mono">03.</span>{' '}
              {isUrdu ? '30 Din Ki Post-Launch Warranty aur Support' : '30-Day Post-Launch Warranty & Support'}
            </h2>
            <p>
              {isUrdu
                ? 'Tamam tiers mein launch ke baad 30 din ki technical warranty shamil hai. Delivered scope se mutaliqa koi bhi bug priority par bila muawza theek kiya jayega.'
                : 'All tiers include a 30-day technical warranty period post-deployment. Any software bugs, layout discrepancies, or unexpected regressions directly related to the delivered scope will be resolved with priority engineering at zero additional charge.'}
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-display uppercase text-[#0F0F0F] dark:text-[#EDECE6] tracking-wide flex items-center gap-2">
              <span className="text-[#059669] dark:text-[#10B981] font-mono">04.</span>{' '}
              {isUrdu ? 'Delivery Timeline aur Late Delivery Remedy' : 'Delivery Timeline and Late Delivery Remedy'}
            </h2>
            <p>
              {isUrdu
                ? 'Delivery ka waqt contract mein likha hota hai, andaza nahi. Single Store Launch 10 din, Multi Branch Growth 21 din, aur Chain and Distribution OS 30 din mein deliver hota hai. Yeh din tab se shuru hote hain jab aap ka content aur pehli qist hamare paas pohanch jaye.'
                : 'The delivery window is written into the contract, not an estimate. Single Store Launch ships in 10 days, Multi Branch Growth in 21 days, and Chain and Distribution OS in 30 days. The clock starts the day your content and first installment reach us.'}
            </p>
            <p>
              {isUrdu
                ? 'Agar der hamari taraf se ho, to har mukammal hafte ki der par aap ko ek mahana Care Plan muft milta hai. Agar der aap ke content, feedback, ya kisi third party service ki wajah se ho, to timeline accordingly barh jati hai.'
                : 'If the delay is on our side, every full week late earns you one free month of the Care Plan. If the delay comes from your content, your feedback, or a third party service, the timeline extends by the same amount.'}
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-display uppercase text-[#0F0F0F] dark:text-[#EDECE6] tracking-wide flex items-center gap-2">
              <span className="text-[#059669] dark:text-[#10B981] font-mono">05.</span>{' '}
              {isUrdu ? 'Support SLA aur Warranty' : 'Support SLA and Warranty'}
            </h2>
            <div className="p-5 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-2 font-mono text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                <span>
                  {isUrdu
                    ? 'Har tier par 30 din ki technical warranty, delivered scope ke andar har bug priority par muft theek hota hai.'
                    : 'A 30 day technical warranty on every tier. Any bug inside the delivered scope is fixed with priority at no charge.'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                <span>
                  {isUrdu
                    ? 'Support ka jawab 4 business ghanton ke andar. Critical masail, jaise store down ya payment ruk jana, 24 se 48 ghanton mein hal hote hain.'
                    : 'Support replies within 4 business hours. Critical issues, such as the store going down or payments failing, are resolved within 24 to 48 hours.'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                <span>
                  {isUrdu
                    ? 'Jis infrastructure ko hum manage karte hain us par 99.5% uptime ka target.'
                    : 'A 99.5% uptime target on the infrastructure we manage.'}
                </span>
              </div>
            </div>
            <p>
              {isUrdu
                ? 'Business hours Monday se Saturday, subah 10 baje se shaam 7 baje Pakistan time. Warranty sirf us kaam par lagti hai jo hum ne banaya. Naye features ya scope se bahar ki cheezein change request kehlati hain.'
                : 'Business hours run Monday to Saturday, 10 am to 7 pm Pakistan time. The warranty covers the work we delivered. New features or anything outside the agreed scope count as change requests.'}
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-display uppercase text-[#0F0F0F] dark:text-[#EDECE6] tracking-wide flex items-center gap-2">
              <span className="text-[#059669] dark:text-[#10B981] font-mono">06.</span>{' '}
              {isUrdu ? 'Revisions aur Change Requests' : 'Revisions and Change Requests'}
            </h2>
            <p>
              {isUrdu
                ? 'Har milestone par 2 revision rounds shamil hain. Is ke baad, ya jo cheez agreed scope se bahar ho, woh PKR 6,000 fi ghanta bill hoti hai aur kaam shuru karne se pehle estimate de diya jata hai.'
                : 'Two revision rounds are included per milestone. Anything beyond that, or anything outside the agreed scope, is billed at PKR 6,000 per hour with an estimate given before we start.'}
            </p>
            <p>
              {isUrdu
                ? 'Revision ka matlab hai jo spec mein tha us ko theek karna. Change request ka matlab hai kuch naya add karna ya spec se hatana.'
                : 'A revision means adjusting what was already in the spec. A change request means adding something new or removing something from the spec.'}
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl font-display uppercase text-[#0F0F0F] dark:text-[#EDECE6] tracking-wide flex items-center gap-2">
              <span className="text-[#059669] dark:text-[#10B981] font-mono">07.</span>{' '}
              {isUrdu ? 'Client Zimmedariyan aur Der' : 'Client Responsibilities and Delays'}
            </h2>
            <p>
              {isUrdu
                ? 'Aap product photos, descriptions, pricing, logos, aur included SKU count se zyada data entry faraham karte hain. Aap domain, hosting credentials, aur kisi bhi third party account ka access dete hain. Hum setup karte hain jab content milta hai.'
                : 'You supply the product photos, descriptions, pricing, logos, and any data entry beyond the included SKU count. You provide the domain, hosting credentials, and access to any third party accounts. We set everything up once the content arrives.'}
            </p>
            <p>
              {isUrdu
                ? 'Jab project aap ke content ya approval ka intezar kar raha ho, delivery clock ruk jati hai. Agar 30 din se zyada koi jawab na aaye, project dormant ho jata hai. Pehli qist wapas nahi hoti aur dubara shuru karne ke liye hum naye slot par kaam karte hain.'
                : 'When a project waits on your content or approval, the delivery clock pauses. If we hear nothing for more than 30 days, the project goes dormant. The deposit is non refundable and a restart is scheduled at the next available slot.'}
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-xl font-display uppercase text-[#0F0F0F] dark:text-[#EDECE6] tracking-wide flex items-center gap-2">
              <span className="text-[#059669] dark:text-[#10B981] font-mono">08.</span>{' '}
              {isUrdu ? 'Payment, Currency aur Ordering' : 'Payment, Currency and Ordering'}
            </h2>
            <p>
              {isUrdu
                ? 'Raqam 40 / 40 / 20 mein banti hai: peshgi, approved demo, aur launch handover. Har qist par formal sign off ke baad hi release hoti hai.'
                : 'Payment splits 40 / 40 / 20 across deposit, approved demo, and launch handover. Each release happens only after a formal sign off.'}
            </p>
            <p>
              {isUrdu
                ? 'Order WhatsApp par hota hai. Default payment bank transfer ya cash on delivery hai. Chahein to online card aur wallet gateway ek paid add on ke tor par lag jata hai.'
                : 'Orders are placed over WhatsApp. The default payment method is bank transfer or cash on delivery. An online card and wallet gateway can be added as a paid add on.'}
            </p>
            <p>
              {isUrdu
                ? 'Qeematein PKR mein hain. Overseas clients ke liye invoice us tareekh ke exchange rate par banta hai aur wire fees client uthata hai.'
                : 'Prices are in PKR. Overseas clients are invoiced at the exchange rate on the invoice date and cover the wire fees.'}
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-xl font-display uppercase text-[#0F0F0F] dark:text-[#EDECE6] tracking-wide flex items-center gap-2">
              <span className="text-[#059669] dark:text-[#10B981] font-mono">09.</span>{' '}
              {isUrdu ? 'Cancellation, Abandonment aur Kill Fee' : 'Cancellation, Abandonment and Kill Fee'}
            </h2>
            <p>
              {isUrdu
                ? 'Aap kisi bhi waqt cancel kar sakte hain. Jo kaam ho chuka hai us ka bill banta hai aur peshgi wapas nahi hoti. Agar cancel tab ho jab demo approve ho chuka ho, to 20% kill fee launch handover par lagti hai.'
                : 'You may cancel at any time. Work already completed is billed and the deposit is non refundable. If you cancel after the demo is approved, a 20% kill fee applies at the launch handover stage.'}
            </p>
            <p>
              {isUrdu
                ? 'Agar client 30 din tak ghaib rahe aur koi notice na de, project abandoned mana jata hai. Code aur data us point tak safe rakha jata hai jab tak client wapas na aaye ya formally close na kare.'
                : 'If the client goes silent for 30 days without notice, the project is treated as abandoned. Code and data are kept safe up to that point until the client returns or formally closes the engagement.'}
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="text-xl font-display uppercase text-[#0F0F0F] dark:text-[#EDECE6] tracking-wide flex items-center gap-2">
              <span className="text-[#059669] dark:text-[#10B981] font-mono">10.</span>{' '}
              {isUrdu ? 'Hosting aur Care Plan' : 'Hosting and Care Plan'}
            </h2>
            <p>
              {isUrdu
                ? 'Base build mein ongoing hosting, domain renewal, ya server maintenance shamil nahi. Aap code ke malik hain, to kahin bhi host kar sakte hain, ya hamara managed hosting use kar sakte hain.'
                : 'The base build does not include ongoing hosting, domain renewal, or server maintenance. You own the code, so you may host it anywhere, or use our managed hosting.'}
            </p>
            <div className="p-5 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] space-y-2 font-mono text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                <span>
                  {isUrdu
                    ? 'Basic Care Plan PKR 14,000 mahana: hosting, backups, updates, aur priority support.'
                    : 'Basic Care Plan at PKR 14,000 per month: hosting, backups, updates, and priority support.'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                <span>
                  {isUrdu
                    ? 'Growth Care Plan PKR 28,000 mahana: sab kuch Basic se, plus multi branch monitoring aur monthly reports.'
                    : 'Growth Care Plan at PKR 28,000 per month: everything in Basic, plus multi branch monitoring and monthly reports.'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                <span>
                  {isUrdu
                    ? 'Enterprise Care Plan PKR 55,000 mahana: dedicated engineering hours, uptime monitoring, aur on call support.'
                    : 'Enterprise Care Plan at PKR 55,000 per month: dedicated engineering hours, uptime monitoring, and on call support.'}
                </span>
              </div>
            </div>
            <p>
              {isUrdu
                ? 'Care Plan mahana hai. Aap kisi bhi mahine ke aakhir mein notice de kar rok ya pause kar sakte hain. Aap ka code aur data aap ka rehta hai, chahe Care Plan jari rahe ya nahi.'
                : 'The Care Plan is monthly. You may pause or stop it with notice at the end of any month. Your code and data stay yours whether or not the Care Plan continues.'}
            </p>
          </section>
        </div>

        {/* Footer Link */}
        <div className="pt-8 border-t border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] flex items-center justify-between font-mono text-xs">
          <Link to="/solutions/tech-retail" className="text-[#059669] dark:text-[#10B981] font-bold hover:underline">
            {isUrdu ? '← Solution Packages Par Wapis Jayein' : '← Return to Solution Packages'}
          </Link>
          <a
            href="https://wa.me/923091824000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0F0F0F] dark:text-[#EDECE6] hover:text-[#059669] dark:hover:text-[#10B981]"
          >
            {isUrdu ? 'WhatsApp Par Direct Rabta' : 'Direct Inquiries via WhatsApp'}
          </a>
        </div>
      </div>
    </div>
  )
}

