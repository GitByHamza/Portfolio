import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { useLanguage } from '../context/LanguageContext'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState('')
  const location = useLocation()
  const { lang, setLang, t, isUrdu } = useLanguage()

  useEffect(() => {
    const now = new Date()
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
    setCurrentDate(now.toLocaleDateString(isUrdu ? 'ur-PK' : 'en-US', options).toUpperCase())
  }, [isUrdu])

  const navLinks = [
    { name: t('nav', 'work'), path: '/work' },
    { name: t('nav', 'about'), path: '/about' },
    { name: t('nav', 'solutions'), path: '/solutions' },
    { name: t('nav', 'contact'), path: '/contact' },
  ]

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="w-full bg-[#F6F5F0] dark:bg-[#0F0F11] z-50 sticky top-0 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] transition-colors duration-200">
      {/* ─── Top Newspaper Metadata Ticker ─── */}
      <div className="hidden sm:flex items-center justify-between px-4 sm:px-8 py-2 text-[11px] font-mono text-[#575652] dark:text-[#9B9A95] uppercase tracking-wider border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-[#0F0F0F] dark:text-[#EDECE6]">{t('nav', 'vol')}</span>
          <span className="text-[rgba(15,15,15,0.3)] dark:text-[rgba(255,255,255,0.2)]">/</span>
          <span>{t('nav', 'journal')}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{currentDate || t('nav', 'edition')}</span>
          <span className="text-[rgba(15,15,15,0.2)] dark:text-[rgba(255,255,255,0.2)]">|</span>

          {/* Language Switcher */}
          <div className="inline-flex items-center border border-[rgba(15,15,15,0.2)] dark:border-[rgba(255,255,255,0.2)] p-0.5 font-mono text-[10px] font-bold">
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 transition-colors cursor-pointer ${
                lang === 'en'
                  ? 'bg-[#059669] text-white'
                  : 'text-[#575652] dark:text-[#9B9A95] hover:text-[#0F0F0F] dark:hover:text-[#EDECE6]'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => setLang('ur-en')}
              className={`px-2 py-0.5 transition-colors cursor-pointer ${
                lang === 'ur-en'
                  ? 'bg-[#059669] text-white'
                  : 'text-[#575652] dark:text-[#9B9A95] hover:text-[#0F0F0F] dark:hover:text-[#EDECE6]'
              }`}
              title="Roman Urdu"
            >
              UR
            </button>
          </div>

          <span className="text-[rgba(15,15,15,0.2)] dark:text-[rgba(255,255,255,0.2)]">|</span>
          <ThemeToggle />
        </div>
      </div>

      {/* ─── Main Masthead ─── */}
      <div className="px-4 sm:px-8 py-2 sm:py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.08)]">
        <div className="shrink-0">
          <Link to="/" className="inline-block group">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6] leading-[0.88] group-hover:text-[#059669] dark:group-hover:text-[#10B981] transition-colors">
              TEXCODES
            </h1>
          </Link>
        </div>

        {/* Right side masthead status - vertically centered on far right */}
        <div className="hidden md:flex flex-col items-end justify-center text-right font-mono text-xs text-[#575652] dark:text-[#9B9A95]">
          <div className="inline-flex items-center gap-2 text-[#059669] dark:text-[#10B981] font-semibold text-[11px] uppercase tracking-wider bg-[#ECFDF5] dark:bg-[rgba(16,185,129,0.15)] px-2.5 py-1 border border-[#059669]/25 dark:border-[#10B981]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]" />
            <span>{t('nav', 'available')}</span>
          </div>
          <span className="text-[10px] text-[#8E8D88] dark:text-[#6A6965] mt-1 tracking-wider">
            {t('nav', 'location')}
          </span>
        </div>

        {/* Mobile menu trigger, language switcher & compact theme toggle */}
        <div className="flex md:hidden items-center justify-between border-t border-[rgba(15,15,15,0.08)] dark:border-[rgba(255,255,255,0.08)] pt-2">
          <span className="text-[10px] font-mono text-[#059669] dark:text-[#10B981] font-semibold tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#10B981]" />
            {t('nav', 'open_for_builds')}
          </span>
          <div className="flex items-center gap-2">
            {/* Mobile language switch buttons */}
            <div className="inline-flex items-center border border-[rgba(15,15,15,0.2)] dark:border-[rgba(255,255,255,0.2)] p-0.5 font-mono text-[9px] font-bold">
              <button
                onClick={() => setLang('en')}
                className={`px-1.5 py-0.5 ${lang === 'en' ? 'bg-[#059669] text-white' : 'text-[#575652] dark:text-[#9B9A95]'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ur-en')}
                className={`px-1.5 py-0.5 ${lang === 'ur-en' ? 'bg-[#059669] text-white' : 'text-[#575652] dark:text-[#9B9A95]'}`}
              >
                UR
              </button>
            </div>
            <ThemeToggle variant="icon" />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 text-[#0F0F0F] dark:text-[#EDECE6] hover:text-[#059669] dark:hover:text-[#10B981] focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ─── Bottom Editorial Navigation Bar ─── */}
      <nav className="hidden md:flex items-center justify-between px-4 sm:px-8 py-2 font-mono text-xs font-semibold tracking-widest uppercase">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className={`transition-colors hover:text-[#059669] dark:hover:text-[#10B981] ${
              location.pathname === '/'
                ? 'text-[#059669] dark:text-[#10B981] font-bold underline underline-offset-4'
                : 'text-[#0F0F0F] dark:text-[#EDECE6]'
            }`}
          >
            HOME
          </Link>
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`transition-colors hover:text-[#059669] dark:hover:text-[#10B981] ${
                isActive(item.path)
                  ? 'text-[#059669] dark:text-[#10B981] font-bold underline underline-offset-4'
                  : 'text-[#0F0F0F] dark:text-[#EDECE6]'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 text-[11px] font-normal text-[#575652] dark:text-[#9B9A95]">
          <Link
            to="/solutions/tech-retail"
            className="text-[#059669] dark:text-[#10B981] hover:underline font-semibold flex items-center gap-1"
          >
            {t('nav', 'retail_os_offer')} <ArrowUpRight size={13} />
          </Link>
          <span className="text-[rgba(15,15,15,0.2)] dark:text-[rgba(255,255,255,0.2)]">|</span>
          <a
            href="https://wa.me/923091824000"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors"
          >
            {t('nav', 'whatsapp_direct')}
          </a>
        </div>
      </nav>

      {/* ─── Mobile Drawer ─── */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#F6F5F0] dark:bg-[#0F0F11] px-4 py-6 space-y-4 font-mono text-sm uppercase tracking-wider">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(15,15,15,0.08)] dark:border-[rgba(255,255,255,0.08)]">
            <span className="text-xs text-[#575652] dark:text-[#9B9A95]">LANGUAGE / ZUBAN</span>
            <div className="inline-flex items-center border border-[rgba(15,15,15,0.2)] dark:border-[rgba(255,255,255,0.2)] p-0.5 font-mono text-xs font-bold">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 ${lang === 'en' ? 'bg-[#059669] text-white' : 'text-[#575652] dark:text-[#9B9A95]'}`}
              >
                ENGLISH
              </button>
              <button
                onClick={() => setLang('ur-en')}
                className={`px-3 py-1 ${lang === 'ur-en' ? 'bg-[#059669] text-white' : 'text-[#575652] dark:text-[#9B9A95]'}`}
              >
                ROMAN URDU
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(15,15,15,0.08)] dark:border-[rgba(255,255,255,0.08)]">
            <span className="text-xs text-[#575652] dark:text-[#9B9A95]">THEME EDITION</span>
            <ThemeToggle />
          </div>
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className={`block py-2 border-b border-[rgba(15,15,15,0.08)] dark:border-[rgba(255,255,255,0.08)] ${
              location.pathname === '/'
                ? 'text-[#059669] dark:text-[#10B981] font-bold'
                : 'text-[#0F0F0F] dark:text-[#EDECE6]'
            }`}
          >
            01 / HOME
          </Link>
          {navLinks.map((item, idx) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block py-2 border-b border-[rgba(15,15,15,0.08)] dark:border-[rgba(255,255,255,0.08)] ${
                isActive(item.path)
                  ? 'text-[#059669] dark:text-[#10B981] font-bold'
                  : 'text-[#0F0F0F] dark:text-[#EDECE6]'
              }`}
            >
              {`0${idx + 2}`} / {item.name}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              to="/solutions/tech-retail"
              onClick={() => setIsMenuOpen(false)}
              className="btn-blue w-full text-center text-xs justify-center"
            >
              {t('nav', 'retail_os_offer')} →
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
