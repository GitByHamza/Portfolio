import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { FadeIn } from './motion/MotionReveal'

const AboutSection = () => {
  const { t, isUrdu } = useLanguage()

  const tenets = [
    {
      title: t('aboutSection', 'tenet1_title'),
      desc: t('aboutSection', 'tenet1_desc'),
    },
    {
      title: t('aboutSection', 'tenet2_title'),
      desc: t('aboutSection', 'tenet2_desc'),
    },
    {
      title: t('aboutSection', 'tenet3_title'),
      desc: t('aboutSection', 'tenet3_desc'),
    },
    {
      title: t('aboutSection', 'tenet4_title'),
      desc: t('aboutSection', 'tenet4_desc'),
    },
  ]

  return (
    <section id="about" className="w-full bg-[#F6F5F0] dark:bg-[#0F0F11] border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] py-16 sm:py-24 px-4 sm:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* ── Left Column: Editorial Story (6 cols) ── */}
          <FadeIn direction="left" className="lg:col-span-6 space-y-6">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#059669] dark:text-[#10B981] font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#059669] dark:bg-[#10B981] inline-block" />
              {t('aboutSection', 'badge')}
            </div>

            <h2 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6] leading-[0.92]">
              {t('aboutSection', 'title')}
            </h2>

            <div className="font-serif text-[#575652] dark:text-[#9B9A95] text-base sm:text-lg leading-relaxed space-y-4">
              <p>{t('aboutSection', 'p1')}</p>
              <p>
                {isUrdu ? (
                  <>
                    <strong className="text-[#0F0F0F] dark:text-[#EDECE6] font-semibold">Toolkito</strong> (10+ media utilities par mushtamil live Micro SaaS) ko architect karne se le kar Switzerland mein <strong className="text-[#0F0F0F] dark:text-[#EDECE6] font-semibold">MYLS</strong> ke bare modernization project tak (jo Europe mein 2,800+ locations ko serve karta hai), mera focus hamesha karobar ko mustahkam banana hota hai.
                  </>
                ) : (
                  <>
                    From architecting <strong className="text-[#0F0F0F] dark:text-[#EDECE6] font-semibold">Toolkito</strong> (a live production Micro SaaS with 10+ media utilities) to executing major backend and frontend modernizations for <strong className="text-[#0F0F0F] dark:text-[#EDECE6] font-semibold">MYLS in Switzerland</strong> (serving 2,800+ business locations across Europe), I focus on building software that businesses can depend upon for years.
                  </>
                )}
              </p>
            </div>

            <div className="pt-2">
              <Link to="/about" className="btn-outline text-xs group">
                <span>{t('aboutSection', 'cta')}</span>
                <ArrowRight size={14} className="arrow-slide" />
              </Link>
            </div>
          </FadeIn>

          {/* ── Right Column: Handwritten Note & Engineering Tenets (6 cols) ── */}
          <FadeIn direction="right" delay={0.15} className="lg:col-span-6 space-y-8 lg:pl-6">
            {/* Handwritten Note Callout */}
            <div className="p-6 bg-white dark:bg-[#161619] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] relative card-hover-guided">
              <span className="font-mono text-[10px] uppercase text-[#8E8D88] dark:text-[#6A6965] tracking-widest block mb-1">
                {t('aboutSection', 'note_badge')}
              </span>
              <p className="font-handwriting text-[#059669] dark:text-[#10B981] text-2xl sm:text-3xl font-bold leading-snug">
                {t('aboutSection', 'note_quote')}
              </p>
            </div>

            {/* 4 Tenets Grid */}
            <div className="space-y-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#0F0F0F] dark:text-[#EDECE6] font-semibold">
                {isUrdu ? 'BUNYADI ENGINEERING ASOOL' : 'CORE ENGINEERING PRINCIPLES'}
              </div>

              <div className="space-y-3 font-mono text-xs">
                {tenets.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white/60 dark:bg-[#161619]/60 border border-[rgba(15,15,15,0.12)] dark:border-[rgba(255,255,255,0.1)] space-y-1 card-hover-guided"
                  >
                    <div className="font-bold text-[#0F0F0F] dark:text-[#EDECE6] flex items-center gap-2">
                      <span className="text-[#059669] dark:text-[#10B981]">0{idx + 1}.</span>
                      <span>{item.title}</span>
                    </div>
                    <p className="font-sans text-[13px] text-[#575652] dark:text-[#9B9A95] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
