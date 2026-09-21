import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp, ArrowUpRight, Mail, MessageSquare } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export const Footer = () => {
  const { t } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full bg-[#F6F5F0] dark:bg-[#0F0F11] border-t border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] font-mono text-xs text-[#575652] dark:text-[#9B9A95] mt-24 transition-colors duration-200">
      {/* ─── Main Footer Grid ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand & Ethos */}
        <div className="md:col-span-4 space-y-4">
          <Link to="/" className="inline-block">
            <span className="font-display text-4xl text-[#0F0F0F] dark:text-[#EDECE6] tracking-tight uppercase">
              TEXCODES
            </span>
          </Link>
          <p className="font-serif text-[#575652] dark:text-[#9B9A95] text-sm leading-relaxed max-w-sm">
            {t('footer', 'pledge')}
          </p>
          <div className="pt-2 text-[11px] text-[#8E8D88] dark:text-[#6A6965] space-y-1">
            <div>LEAD ENGINEER: HAMZA</div>
            <div>LOCATION: GUJRANWALA, PAKISTAN (PKT / UTC+5)</div>
          </div>
        </div>

        {/* Index Navigation */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-[11px] uppercase tracking-widest text-[#0F0F0F] dark:text-[#EDECE6] font-semibold border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-1.5">
            {t('footer', 'col_nav')}
          </div>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/work" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors flex items-center gap-1">
                {t('footer', 'selected_work')} <span className="text-[10px] text-[#8E8D88] dark:text-[#6A6965]">({t('footer', 'archive')})</span>
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                {t('footer', 'about_story')}
              </Link>
            </li>
            <li>
              <Link to="/solutions" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                {t('footer', 'commercial_solutions')}
              </Link>
            </li>
            <li>
              <Link to="/solutions/tech-retail" className="text-[#059669] dark:text-[#10B981] hover:underline font-semibold flex items-center gap-1">
                {t('footer', 'retail_os_offer')} <ArrowUpRight size={12} />
              </Link>
            </li>
            <li>
              <Link to="/solutions/laptop-retail" className="text-[#059669] dark:text-[#10B981] hover:underline font-semibold flex items-center gap-1">
                {t('footer', 'laptop_retail_os_offer')} <ArrowUpRight size={12} />
              </Link>
            </li>
            <li>
              <Link to="/solutions/console-retail" className="text-[#059669] dark:text-[#10B981] hover:underline font-semibold flex items-center gap-1">
                {t('footer', 'console_retail_os_offer')} <ArrowUpRight size={12} />
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                {t('footer', 'direct_contact')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Channels */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-[11px] uppercase tracking-widest text-[#0F0F0F] dark:text-[#EDECE6] font-semibold border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-1.5">
            {t('footer', 'col_channels')}
          </div>
          <ul className="space-y-2 text-xs">
            <li>
              <a
                href="mailto:admin@texcodes.com"
                className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors flex items-center gap-1.5"
              >
                <Mail size={13} /> admin@texcodes.com
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/923091824000"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors flex items-center gap-1.5"
              >
                <MessageSquare size={13} /> {t('footer', 'whatsapp')}
              </a>
            </li>
            <li>
              <a
                href="https://github.com/GitByHamza"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors flex items-center gap-1"
              >
                {t('footer', 'github')} <ArrowUpRight size={12} />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/hamza-texcodes"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors flex items-center gap-1"
              >
                {t('footer', 'linkedin')} <ArrowUpRight size={12} />
              </a>
            </li>
          </ul>
        </div>

        {/* System & Architecture Pledge */}
        <div className="md:col-span-2 space-y-3">
          <div className="text-[11px] uppercase tracking-widest text-[#0F0F0F] dark:text-[#EDECE6] font-semibold border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-1.5">
            {t('footer', 'col_status')}
          </div>
          <div className="space-y-2 text-[11px]">
            <div className="text-[#059669] dark:text-[#10B981] font-semibold">{t('footer', 'active_production')}</div>
            <p className="text-[#8E8D88] dark:text-[#6A6965] leading-relaxed">
              {t('footer', 'pledge')}
            </p>
            <button
              onClick={scrollToTop}
              className="pt-2 text-[#0F0F0F] dark:text-[#EDECE6] hover:text-[#059669] dark:hover:text-[#10B981] flex items-center gap-1 font-semibold cursor-pointer"
            >
              <ArrowUp size={12} /> {t('footer', 'top_dispatch')}
            </button>
          </div>
        </div>
      </div>

      {/* ─── Bottom Colophon / Bar ─── */}
      <div className="border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#8E8D88] dark:text-[#6A6965]">
        <div>
          {t('footer', 'copyright')}
        </div>
        <div className="flex items-center gap-4">
          <Link to="/terms" className="hover:underline">{t('footer', 'terms')}</Link>
          <span>·</span>
          <Link to="/privacy" className="hover:underline">{t('footer', 'privacy')}</Link>
        </div>
      </div>
    </footer>
  )
}
