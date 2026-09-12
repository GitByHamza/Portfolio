import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Github, Linkedin, MessageSquare } from 'lucide-react'

const ClosingSection = () => {
  return (
    <section className="w-full bg-[#FAF9F5] border-b border-[rgba(15,15,15,0.14)] py-20 sm:py-28 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-[11px] font-mono uppercase tracking-widest text-[#1A4BFF] font-semibold flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#1A4BFF] inline-block" />
          COMMISSION & INQUIRIES
        </div>

        {/* Big Editorial Headline */}
        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-display uppercase tracking-tight text-[#0F0F0F] leading-[0.88] max-w-5xl">
          LET'S BUILD SOMETHING{' '}
          <span className="text-[#1A4BFF] block sm:inline">
            WORTH RUNNING A BUSINESS ON.
          </span>
        </h2>

        <p className="font-serif text-[#575652] text-base sm:text-xl max-w-2xl leading-relaxed">
          Open to select high-impact software projects, full-stack systems engineering, and commercial retail platforms. 
          Based in Pakistan (PKT / UTC+5), delivering production software worldwide.
        </p>

        {/* Buttons Row */}
        <div className="pt-4 flex flex-wrap items-center gap-3">
          <Link to="/contact" className="btn-blue text-xs">
            START A PROJECT <ArrowRight size={14} />
          </Link>

          <Link to="/solutions" className="btn-outline text-xs">
            EXPLORE SOLUTIONS
          </Link>

          <a
            href="mailto:professorhamza000@gmail.com"
            className="btn-outline text-xs"
          >
            <Mail size={13} /> EMAIL DIRECT
          </a>

          <a
            href="https://wa.me/923288197775"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-xs text-[#1A4BFF] border-[#1A4BFF]/40 hover:bg-[#1A4BFF] hover:text-white"
          >
            <MessageSquare size={13} /> WHATSAPP
          </a>

          <a
            href="https://github.com/GitByHamza"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-xs"
          >
            <Github size={13} /> GITHUB
          </a>

          <a
            href="https://linkedin.com/in/hamza-p-v"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-xs"
          >
            <Linkedin size={13} /> LINKEDIN
          </a>
        </div>
      </div>
    </section>
  )
}

export default ClosingSection
