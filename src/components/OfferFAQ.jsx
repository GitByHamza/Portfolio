import { ChevronDown } from 'lucide-react'
import { FAQ_I18N } from '../content/faq.ts'
export default function OfferFAQ({ lang = 'en' }) {
 const t = FAQ_I18N[lang] || FAQ_I18N.en
 return <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-black/15 dark:border-white/15 bg-[#FAF9F5] dark:bg-[#121215]">
  <div className="max-w-4xl mx-auto space-y-8"><h2 className="offer-h2 text-center">{t.title}</h2>
   <div className="bg-white dark:bg-[#161619] border border-black/15 dark:border-white/15 divide-y divide-black/10 dark:divide-white/10">
    {t.items.map((item, i) => <details key={item.q} className="group" open={i === 0}>
     <summary className="flex justify-between items-center gap-4 p-5 cursor-pointer list-none"><span className="offer-ui-strong">{item.q}</span><ChevronDown size={16} className="shrink-0 text-[#059669] dark:text-[#10B981] transition-transform group-open:rotate-180" /></summary>
     <p className="px-5 pb-5 offer-body text-[#575652] dark:text-[#C5C4BE]">{item.a}</p>
    </details>)}
   </div>
  </div>
 </section>
}
