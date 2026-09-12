import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp, ArrowUpRight, Mail, MessageSquare } from 'lucide-react'

export const Footer = () => {
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
            Independent software engineering studio and product builder. 
            Focused on production SaaS, custom digital systems, and business platforms built with technical discipline.
          </p>
          <div className="pt-2 text-[11px] text-[#8E8D88] dark:text-[#6A6965] space-y-1">
            <div>LEAD ENGINEER: HAMZA</div>
            <div>LOCATION: GUJRANWALA, PAKISTAN (PKT / UTC+5)</div>
          </div>
        </div>

        {/* Index Navigation */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-[11px] uppercase tracking-widest text-[#0F0F0F] dark:text-[#EDECE6] font-semibold border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-1.5">
            NAVIGATION
          </div>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/work" className="hover:text-[#1A4BFF] dark:hover:text-[#3D6BFF] transition-colors flex items-center gap-1">
                Selected Work <span className="text-[10px] text-[#8E8D88] dark:text-[#6A6965]">(Archive)</span>
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#1A4BFF] dark:hover:text-[#3D6BFF] transition-colors">
                About & Engineering Story
              </Link>
            </li>
            <li>
              <Link to="/solutions" className="hover:text-[#1A4BFF] dark:hover:text-[#3D6BFF] transition-colors">
                Commercial Solutions
              </Link>
            </li>
            <li>
              <Link to="/solutions/tech-retail" className="text-[#1A4BFF] dark:text-[#3D6BFF] hover:underline font-semibold flex items-center gap-1">
                Tech Retail OS Offer <ArrowUpRight size={12} />
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#1A4BFF] dark:hover:text-[#3D6BFF] transition-colors">
                Direct Contact & Status
              </Link>
            </li>
          </ul>
        </div>

        {/* Channels */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-[11px] uppercase tracking-widest text-[#0F0F0F] dark:text-[#EDECE6] font-semibold border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-1.5">
            CHANNELS
          </div>
          <ul className="space-y-2 text-xs">
            <li>
              <a
                href="mailto:professorhamza000@gmail.com"
                className="hover:text-[#1A4BFF] dark:hover:text-[#3D6BFF] transition-colors flex items-center gap-1.5"
              >
                <Mail size={13} /> professorhamza000@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/923288197775"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1A4BFF] dark:hover:text-[#3D6BFF] transition-colors flex items-center gap-1.5"
              >
                <MessageSquare size={13} /> WhatsApp: +92 328 8197775
              </a>
            </li>
            <li>
              <a
                href="https://github.com/GitByHamza"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1A4BFF] dark:hover:text-[#3D6BFF] transition-colors flex items-center gap-1"
              >
                GitHub Profile <ArrowUpRight size={12} />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/hamza-texcodes"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1A4BFF] dark:hover:text-[#3D6BFF] transition-colors flex items-center gap-1"
              >
                LinkedIn <ArrowUpRight size={12} />
              </a>
            </li>
          </ul>
        </div>

        {/* System & Architecture Pledge */}
        <div className="md:col-span-2 space-y-3">
          <div className="text-[11px] uppercase tracking-widest text-[#0F0F0F] dark:text-[#EDECE6] font-semibold border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-1.5">
            STATUS
          </div>
          <div className="space-y-2 text-[11px]">
            <div className="text-[#1A4BFF] dark:text-[#3D6BFF] font-semibold">● ACTIVE PRODUCTION</div>
            <p className="text-[#8E8D88] dark:text-[#6A6965] leading-relaxed">
              No bloated frameworks. Strict engineering discipline. Handover with 100% source ownership.
            </p>
            <button
              onClick={scrollToTop}
              className="pt-2 text-[#0F0F0F] dark:text-[#EDECE6] hover:text-[#1A4BFF] dark:hover:text-[#3D6BFF] flex items-center gap-1 font-semibold cursor-pointer"
            >
              <ArrowUp size={12} /> TOP OF DISPATCH
            </button>
          </div>
        </div>
      </div>

      {/* ─── Bottom Colophon / Bar ─── */}
      <div className="border-t border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#8E8D88] dark:text-[#6A6965]">
        <div>
          © 2026 TEXCODES STUDIO · INDEPENDENT SOFTWARE ENGINEERING & PRODUCT BUILDING
        </div>
        <div className="flex items-center gap-4">
          <Link to="/terms" className="hover:underline">TERMS OF DISPATCH</Link>
          <span>·</span>
          <Link to="/privacy" className="hover:underline">PRIVACY</Link>
        </div>
      </div>
    </footer>
  )
}
