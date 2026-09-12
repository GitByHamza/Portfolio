import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState('')
  const location = useLocation()

  useEffect(() => {
    const now = new Date()
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
    setCurrentDate(now.toLocaleDateString('en-US', options).toUpperCase())
  }, [])

  const navLinks = [
    { name: 'WORK', path: '/work' },
    { name: 'ABOUT', path: '/about' },
    { name: 'SOLUTIONS', path: '/solutions' },
    { name: 'CONTACT', path: '/contact' },
  ]

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="w-full bg-[#F6F5F0] z-50 sticky top-0 border-b border-[rgba(15,15,15,0.14)]">
      {/* ─── Top Newspaper Metadata Ticker ─── */}
      <div className="hidden sm:flex items-center justify-between px-4 sm:px-8 py-2 text-[11px] font-mono text-[#575652] uppercase tracking-wider border-b border-[rgba(15,15,15,0.1)]">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-[#0F0F0F]">TEXCODES — VOL. 01</span>
          <span className="text-[rgba(15,15,15,0.3)]">/</span>
          <span>ENGINEERING JOURNAL & PORTFOLIO</span>
        </div>
        <div>
          <span>{currentDate || '2026 EDITION'}</span>
        </div>
      </div>

      {/* ─── Main Masthead ─── */}
      <div className="px-4 sm:px-8 py-4 sm:py-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[rgba(15,15,15,0.1)]">
        <div>
          <Link to="/" className="inline-block group">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display uppercase tracking-tight text-[#0F0F0F] leading-[0.85] group-hover:text-[#1A4BFF] transition-colors">
              TEXCODES
            </h1>
          </Link>
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#575652] mt-1.5 flex items-center gap-2">
            <span>INDEPENDENT SOFTWARE STUDIO</span>
            <span className="text-[#1A4BFF] font-bold">·</span>
            <span>PRODUCT BUILDER</span>
          </div>
        </div>

        {/* Right side masthead status */}
        <div className="hidden md:flex flex-col items-end text-right font-mono text-xs text-[#575652]">
          <div className="inline-flex items-center gap-2 text-[#1A4BFF] font-semibold text-[11px] uppercase tracking-wider bg-[#EFF3FF] px-2.5 py-1 border border-[#1A4BFF]/25">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1A4BFF] animate-pulse" />
            <span>AVAILABLE FOR SELECTED BUILDS</span>
          </div>
          <span className="text-[10px] text-[#8E8D88] mt-1">BASE: PAKISTAN · REMOTE WORLDWIDE</span>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center justify-between border-t border-[rgba(15,15,15,0.08)] pt-3">
          <span className="text-[10px] font-mono text-[#1A4BFF] font-semibold tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1A4BFF]" />
            OPEN FOR BUILDS
          </span>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1.5 text-[#0F0F0F] hover:text-[#1A4BFF] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ─── Bottom Editorial Navigation Bar ─── */}
      <nav className="hidden md:flex items-center justify-between px-4 sm:px-8 py-2.5 font-mono text-xs font-semibold tracking-widest uppercase">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className={`transition-colors hover:text-[#1A4BFF] ${
              location.pathname === '/' ? 'text-[#1A4BFF] font-bold underline underline-offset-4' : 'text-[#0F0F0F]'
            }`}
          >
            HOME
          </Link>
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`transition-colors hover:text-[#1A4BFF] ${
                isActive(item.path) ? 'text-[#1A4BFF] font-bold underline underline-offset-4' : 'text-[#0F0F0F]'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 text-[11px] font-normal text-[#575652]">
          <Link
            to="/solutions/tech-retail"
            className="text-[#1A4BFF] hover:underline font-semibold flex items-center gap-1"
          >
            RETAIL OS OFFER <ArrowUpRight size={13} />
          </Link>
          <span className="text-[rgba(15,15,15,0.2)]">|</span>
          <a
            href="https://wa.me/923288197775"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0F0F0F]"
          >
            WHATSAPP DIRECT
          </a>
        </div>
      </nav>

      {/* ─── Mobile Drawer ─── */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[rgba(15,15,15,0.14)] bg-[#F6F5F0] px-4 py-6 space-y-4 font-mono text-sm uppercase tracking-wider">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className={`block py-2 border-b border-[rgba(15,15,15,0.08)] ${
              location.pathname === '/' ? 'text-[#1A4BFF] font-bold' : 'text-[#0F0F0F]'
            }`}
          >
            01 / HOME
          </Link>
          {navLinks.map((item, idx) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block py-2 border-b border-[rgba(15,15,15,0.08)] ${
                isActive(item.path) ? 'text-[#1A4BFF] font-bold' : 'text-[#0F0F0F]'
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
              RETAIL OS SOLUTION OFFER →
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
