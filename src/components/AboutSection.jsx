import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ShieldCheck, Database, Layers, Terminal } from 'lucide-react'

const AboutSection = () => {
  const tenets = [
    {
      title: '100% CLIENT IP & CODE OWNERSHIP',
      desc: 'Complete GitHub repository transfer and direct database control. Zero vendor lock-in and zero platform sales tax.',
    },
    {
      title: 'DOMAIN-DRIVEN BACKEND ARCHITECTURE',
      desc: 'Clean REST APIs, service-layer patterns, and Spatie-style role-based access control (RBAC) built to scale without technical debt.',
    },
    {
      title: 'RESILIENT RELATIONAL DATA MODELS',
      desc: 'PostgreSQL with relational schema integrity, typed ORM migrations, and audit trails rather than brittle flat files.',
    },
    {
      title: 'ZERO BLOAT & MINIMAL DEPENDENCIES',
      desc: 'Purpose-built user interfaces in Next.js and Vue 3, eliminating sluggish plugins and unpredictable auto-updates.',
    },
  ]

  return (
    <section id="about" className="w-full bg-[#F6F5F0] border-b border-[rgba(15,15,15,0.14)] py-16 sm:py-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* ── Left Column: Editorial Story (6 cols) ── */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#1A4BFF] font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#1A4BFF] inline-block" />
              PHILOSOPHY // FROM CODE TO SYSTEMS
            </div>

            <h2 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-[#0F0F0F] leading-[0.92]">
              WE ENGINEER SYSTEMS, NOT DISPOSABLE PAGES.
            </h2>

            <div className="font-serif text-[#575652] text-base sm:text-lg leading-relaxed space-y-4">
              <p>
                My background spans both independent product building and large-scale systems engineering. 
                Rather than treating web development as visual decoration, I approach software from an operational perspective: 
                how data flows through the business, how multiple user roles interact, and how the system behaves under real customer load.
              </p>
              <p>
                From architecting <strong className="text-[#0F0F0F] font-semibold">Toolkito</strong> (a live production Micro SaaS with 10+ media utilities) 
                to executing major backend and frontend modernizations for <strong className="text-[#0F0F0F] font-semibold">MYLS in Switzerland</strong> (serving 2,800+ business locations across Europe), 
                I focus on building software that businesses can depend upon for years.
              </p>
            </div>

            <div className="pt-2">
              <Link to="/about" className="btn-outline text-xs">
                READ THE FULL STORY <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* ── Right Column: Handwritten Note & Engineering Tenets (6 cols) ── */}
          <div className="lg:col-span-6 space-y-8 lg:pl-6">
            {/* Handwritten Note Callout */}
            <div className="p-6 bg-white border border-[rgba(15,15,15,0.14)] relative">
              <span className="font-mono text-[10px] uppercase text-[#8E8D88] tracking-widest block mb-1">
                ARCHITECTURAL ETHOS
              </span>
              <p className="font-handwriting text-[#1A4BFF] text-2xl sm:text-3xl font-bold leading-snug">
                "Every serious system begins with an uncompromising architecture and clean data models."
              </p>
            </div>

            {/* 4 Tenets Grid */}
            <div className="space-y-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#0F0F0F] font-semibold">
                CORE ENGINEERING PRINCIPLES
              </div>

              <div className="space-y-3 font-mono text-xs">
                {tenets.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white/60 border border-[rgba(15,15,15,0.12)] space-y-1"
                  >
                    <div className="font-bold text-[#0F0F0F] flex items-center gap-2">
                      <span className="text-[#1A4BFF]">0{idx + 1}.</span>
                      <span>{item.title}</span>
                    </div>
                    <p className="font-sans text-[13px] text-[#575652] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
