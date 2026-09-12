import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp, ArrowUpRight, Mail, MessageSquare } from 'lucide-react'

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full bg-[#F6F5F0] border-t border-[rgba(15,15,15,0.14)] font-mono text-xs text-[#575652] mt-24">
      {/* ─── Main Footer Grid ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand & Ethos */}
        <div className="md:col-span-4 space-y-4">
          <Link to="/" className="inline-block">
            <span className="font-display text-4xl text-[#0F0F0F] tracking-tight uppercase">
              TEXCODES
            </span>
          </Link>
          <p className="font-serif text-[#575652] text-sm leading-relaxed max-w-sm">
            Independent software engineering studio and product builder. 
            Focused on production SaaS, custom digital systems, and business platforms built with technical discipline.
          </p>
          <div className="pt-2 text-[11px] text-[#8E8D88] space-y-1">
            <div>LEAD ENGINEER: HAMZA</div>
            <div>LOCATION: GUJRANWALA, PAKISTAN (PKT / UTC+5)</div>
          </div>
        </div>

        {/* Index Navigation */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-[11px] uppercase tracking-widest text-[#0F0F0F] font-semibold border-b border-[rgba(15,15,15,0.1)] pb-1.5">
            NAVIGATION
          </div>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/work" className="hover:text-[#1A4BFF] transition-colors flex items-center gap-1">
                Selected Work <span className="text-[10px] text-[#8E8D88]">(Archive)</span>
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#1A4BFF] transition-colors">
                About & Engineering Story
              </Link>
            </li>
            <li>
              <Link to="/solutions" className="hover:text-[#1A4BFF] transition-colors">
                Commercial Solutions
              </Link>
            </li>
            <li>
              <Link to="/solutions/tech-retail" className="text-[#1A4BFF] hover:underline font-semibold flex items-center gap-1">
                Tech Retail OS Offer <ArrowUpRight size={12} />
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#1A4BFF] transition-colors">
                Direct Contact & Status
              </Link>
            </li>
          </ul>
        </div>

        {/* Channels */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-[11px] uppercase tracking-widest text-[#0F0F0F] font-semibold border-b border-[rgba(15,15,15,0.1)] pb-1.5">
            CHANNELS
          </div>
          <ul className="space-y-2 text-xs">
            <li>
              <a
                href="mailto:professorhamza000@gmail.com"
                className="hover:text-[#1A4BFF] transition-colors flex items-center gap-1.5"
              >
                <Mail size={13} /> professorhamza000@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/923288197775"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1A4BFF] transition-colors flex items-center gap-1.5"
              >
                <MessageSquare size={13} /> WhatsApp: +92 328 8197775
              </a>
            </li>
            <li>
              <a
                href="https://github.com/GitByHamza"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1A4BFF] transition-colors flex items-center gap-1"
              >
                GitHub Profile <ArrowUpRight size={12} />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/hamza-p-v"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1A4BFF] transition-colors flex items-center gap-1"
              >
                LinkedIn Profile <ArrowUpRight size={12} />
              </a>
            </li>
          </ul>
        </div>

        {/* Status / Notice */}
        <div className="md:col-span-2 space-y-3">
          <div className="text-[11px] uppercase tracking-widest text-[#0F0F0F] font-semibold border-b border-[rgba(15,15,15,0.1)] pb-1.5">
            STATUS
          </div>
          <div className="p-3 bg-white/70 border border-[rgba(15,15,15,0.12)] space-y-2">
            <div className="flex items-center gap-2 text-[#1A4BFF] font-semibold text-[10px] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A4BFF]" />
              ACTIVE / OPEN
            </div>
            <p className="text-[11px] text-[#575652] leading-tight">
              Accepting selected production projects & technical contracts.
            </p>
          </div>
        </div>
      </div>

      {/* ─── Bottom Sub-Footer ─── */}
      <div className="border-t border-[rgba(15,15,15,0.1)] px-4 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8E8D88]">
        <div>
          © {new Date().getFullYear()} TEXCODES · ALL RIGHTS RESERVED.
        </div>

        <div className="flex items-center gap-6">
          <Link to="/solutions/tech-retail/terms" className="hover:text-[#0F0F0F] transition-colors">
            Retail SLA & Terms
          </Link>
          <Link to="/privacy" className="hover:text-[#0F0F0F] transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-[#0F0F0F] transition-colors">
            Terms of Service
          </Link>
          <button
            onClick={scrollToTop}
            className="hover:text-[#1A4BFF] transition-colors flex items-center gap-1 cursor-pointer"
            aria-label="Scroll back to top"
          >
            TOP <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
