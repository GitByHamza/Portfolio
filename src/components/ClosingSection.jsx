import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Github, Linkedin, MessageSquare } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { FadeIn } from './motion/MotionReveal'

const ClosingSection = () => {
  const { t, isUrdu } = useLanguage()

  return (
    <section className="w-full bg-[#FAF9F5] dark:bg-[#161619] border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] py-20 sm:py-28 px-4 sm:px-8 transition-colors duration-200">
      <FadeIn direction="up" className="max-w-7xl mx-auto space-y-8">
        <div className="text-[11px] font-mono uppercase tracking-widest text-[#059669] dark:text-[#10B981] font-semibold flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#059669] dark:bg-[#10B981] inline-block" />
          {t('closing', 'badge')}
        </div>

        {/* Big Editorial Headline */}
        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-display uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6] leading-[0.88] max-w-5xl">
          {t('closing', 'title_prefix')}{' '}
          <span className="text-[#059669] dark:text-[#10B981] block sm:inline">
            {t('closing', 'title_accent')}
          </span>
        </h2>

        <p className="font-serif text-[#575652] dark:text-[#9B9A95] text-base sm:text-xl max-w-2xl leading-relaxed">
          {t('closing', 'desc')}
        </p>

        {/* Buttons Row */}
        <div className="pt-4 flex flex-wrap items-center gap-3">
          <Link to="/contact" className="btn-blue text-xs group">
            <span>{t('closing', 'cta_start')}</span>
            <ArrowRight size={14} className="arrow-slide" />
          </Link>

          <Link to="/solutions" className="btn-outline text-xs">
            {t('closing', 'cta_solutions')}
          </Link>

          <a
            href="mailto:admin@texcodes.com"
            className="btn-outline text-xs"
          >
            <Mail size={13} /> {t('closing', 'cta_email')}
          </a>

          <a
            href="https://wa.me/923091824000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-xs text-[#059669] dark:text-[#10B981] border-[#059669]/40 dark:border-[#10B981]/40 hover:bg-[#059669] hover:text-white dark:hover:bg-[#10B981] dark:hover:text-[#0F0F11]"
          >
            <MessageSquare size={13} /> {t('closing', 'cta_whatsapp')}
          </a>

          <a
            href="https://github.com/GitByHamza"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-xs"
          >
            <Github size={13} /> {t('closing', 'cta_github')}
          </a>

          <a
            href="https://linkedin.com/in/texcodes"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-xs"
          >
            <Linkedin size={13} /> {t('closing', 'cta_linkedin')}
          </a>
        </div>
      </FadeIn>
    </section>
  )
}

export default ClosingSection
