import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FadeIn } from './motion/MotionReveal'

const FAQ_I18N = {
  en: {
    eyebrow: 'FAQ',
    title: 'Common questions',
    items: [
      {
        q: 'Are there any monthly costs?',
        a: "No platform fee and no commission. You pay for hosting (included in any Care Plan, or host it yourself) and your payment gateway's standard fees. If you use the AI assistant, its usage is billed at cost.",
      },
      {
        q: 'Do I really own the code?',
        a: 'Yes. On final payment we transfer your GitHub repository, database and admin accounts. Your design, content and custom features are yours alone. Our core engine is shared across clients so it keeps improving; exclusivity in your market can be arranged.',
      },
      {
        q: 'What do you need from me?',
        a: 'Your logo, a product list with prices, product photos (or we add them as an add-on), your branch details, and access to your domain and payment gateway account.',
      },
      {
        q: 'How long does it take?',
        a: 'Single Store: 10 days. Multi-Branch: 21 days. Chain & Wholesale: from 30 days. Counted from the day we receive your content and first payment.',
      },
      {
        q: 'Can my staff update products and prices?',
        a: 'Yes. The admin panel is built for shop staff; no coding needed.',
      },
      {
        q: 'What if I need changes after launch?',
        a: 'Bugs in the delivered work are fixed free for 30 days. New features are quoted upfront, or covered by a Care Plan.',
      },
      {
        q: 'Do you work with shops outside Pakistan?',
        a: 'Yes. We work remotely and invoice international clients in USD or GBP.',
      },
    ],
  },
  'ur-en': {
    eyebrow: 'SAWALAT',
    title: 'Aam sawalat',
    items: [
      {
        q: 'Kya koi mahana kharcha hai?',
        a: 'Na platform fee, na commission. Aap sirf hosting (kisi bhi Care Plan mein shamil, ya khud host karein) aur apne payment gateway ki standard fee dete hain. AI assistant use karein to us ki usage at-cost bill hoti hai.',
      },
      {
        q: 'Kya code waqai mera hoga?',
        a: 'Jee haan. Aakhri payment par GitHub repository, database aur admin accounts aapke naam. Aapka design, content aur custom features sirf aapke. Hamara core engine clients mein shared hai is liye behtar hota rehta hai; aapke market mein exclusivity bhi tay ki ja sakti hai.',
      },
      {
        q: 'Aapko mujh se kya chahiye?',
        a: 'Logo, prices ke sath products ki list, product photos (ya add-on ke tor par hum daal dein), branches ki details, aur domain aur payment gateway account ka access.',
      },
      {
        q: 'Kitna waqt lagta hai?',
        a: 'Single Store: 10 din. Multi-Branch: 21 din. Chain & Wholesale: 30 din se. Din us waqt se gine jate hain jab content aur pehli payment mil jaye.',
      },
      {
        q: 'Kya mera staff products aur prices khud update kar sakta hai?',
        a: 'Jee haan. Admin panel dukan ke staff ke liye bana hai; coding ki zaroorat nahi.',
      },
      {
        q: 'Launch ke baad tabdeeli chahiye to?',
        a: 'Delivered kaam ke bugs 30 din tak muft theek hote hain. Naye features ka pehle quote diya jata hai, ya Care Plan mein cover hote hain.',
      },
      {
        q: 'Kya aap Pakistan se bahar bhi kaam karte hain?',
        a: 'Jee haan. Hum remote kaam karte hain aur international clients ko USD ya GBP mein invoice karte hain.',
      },
    ],
  },
}

export default function OfferFAQ({ lang = 'en' }) {
  const [openIndex, setOpenIndex] = useState(0)
  const t = FAQ_I18N[lang] || FAQ_I18N.en

  return (
    <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#121215]">
      <FadeIn direction="up" className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="offer-eyebrow text-[#059669] dark:text-[#10B981] font-semibold">{t.eyebrow}</div>
          <h2 className="offer-h2 text-[#0F0F0F] dark:text-[#EDECE6]">{t.title}</h2>
        </div>

        <div className="bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] divide-y divide-[rgba(15,15,15,0.1)] dark:divide-[rgba(255,255,255,0.1)]">
          {t.items.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
                >
                  <span className="offer-ui-strong text-[#0F0F0F] dark:text-[#EDECE6]">{item.q}</span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-[#059669] dark:text-[#10B981] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <p className="px-5 pb-5 offer-body text-[#575652] dark:text-[#9B9A95]">{item.a}</p>
                )}
              </div>
            )
          })}
        </div>
      </FadeIn>
    </section>
  )
}
