import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, CheckCircle2, Terminal, Database, Layers, Cpu, ShieldCheck } from 'lucide-react'

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const technicalStack = [
    {
      category: 'BACKEND & DOMAIN APIS',
      items: ['PHP Laravel 12', 'Node.js', 'REST APIs', 'Spatie RBAC', 'Database Seeders & Factories'],
    },
    {
      category: 'FRONTEND & USER INTERFACES',
      items: ['Next.js 16 (App Router)', 'React 19', 'Vue 3 (Composition API)', 'Tailwind CSS', 'TypeScript'],
    },
    {
      category: 'DATABASE & DATA INTEGRITY',
      items: ['PostgreSQL', 'Prisma ORM', 'MySQL', 'Supabase', 'Relational Schema Migrations'],
    },
    {
      category: 'PROCESSING & INFRASTRUCTURE',
      items: ['Sharp', 'FFmpeg', 'Docker', 'Vercel', 'Git / GitHub Workflow'],
    },
  ]

  return (
    <div className="w-full bg-[#F6F5F0] min-h-screen">
      {/* ─── Page Header ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#1A4BFF] font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#1A4BFF] inline-block" />
            BACKGROUND & PHILOSOPHY
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-display uppercase tracking-tight text-[#0F0F0F] leading-[0.88] max-w-5xl">
            FROM CODE TO SYSTEMS.
          </h1>

          <p className="font-serif text-lg sm:text-xl text-[#575652] max-w-3xl leading-relaxed">
            The background, production experience, and engineering principles behind TeXCodes — an independent software engineering studio and product builder.
          </p>
        </div>
      </section>

      {/* ─── Main Editorial Narrative ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Metadata / Quick Bio Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-8 lg:border-r border-[rgba(15,15,15,0.14)] lg:pr-8">
            <div className="p-6 bg-white border border-[rgba(15,15,15,0.14)] space-y-4 font-mono text-xs">
              <div className="text-[10px] text-[#8E8D88] uppercase tracking-widest">
                ENGINEER IDENTITY
              </div>
              <div className="text-xl font-display uppercase text-[#0F0F0F] tracking-tight">
                HAMZA (AMEER HAMZA)
              </div>
              <div className="space-y-2 text-[#575652] text-[11px]">
                <div>ROLE: Full-Stack Engineer & Product Builder</div>
                <div>BASE: Gujranwala, Pakistan (PKT / UTC+5)</div>
                <div>DISCIPLINE: SaaS Modernization & Business OS</div>
                <div>STATUS: Available for Selected High-Impact Builds</div>
              </div>
            </div>

            {/* Handwritten Quote */}
            <div className="p-6 bg-[#EFF3FF] border border-[#1A4BFF]/25">
              <span className="font-mono text-[10px] uppercase text-[#1A4BFF] tracking-widest block mb-1 font-semibold">
                ARCHITECTURAL STANCE
              </span>
              <p className="font-handwriting text-[#1A4BFF] text-2xl font-bold leading-snug">
                "Software should be engineered around how operations actually function, not forced into rigid templates."
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-2 font-mono text-xs">
              <div className="text-[10px] text-[#8E8D88] uppercase tracking-widest mb-2">
                VERIFIED ARCHIVES
              </div>
              <div>
                <a
                  href="https://github.com/GitByHamza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1A4BFF] hover:underline flex items-center gap-1"
                >
                  Inspect GitHub Repositories <ArrowUpRight size={13} />
                </a>
              </div>
              <div>
                <a
                  href="https://toolkito.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1A4BFF] hover:underline flex items-center gap-1"
                >
                  Live Solo Product (toolkito.app) <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Detailed Longform Chapters (8 cols) */}
          <div className="lg:col-span-8 space-y-16 lg:pl-4 font-serif text-[#575652] text-base sm:text-lg leading-relaxed">
            {/* Chapter 1 */}
            <div className="space-y-4">
              <div className="font-mono text-xs font-semibold text-[#1A4BFF] uppercase tracking-widest">
                CHAPTER 01 // THE EVOLUTION
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-[#0F0F0F] uppercase tracking-tight">
                THE TRANSITION FROM WEBSITES TO SYSTEMS
              </h2>
              <p>
                Early in my software journey, I realized that the conventional freelance agency model was fundamentally flawed. 
                Most agencies build surface-level websites: generic theme installations overloaded with 40 plugins that load slowly, 
                break on auto-updates, and charge recurring monthly subscriptions while offering zero true code ownership.
              </p>
              <p>
                Real businesses do not merely need pages — they need cohesive operational systems. They need inventory that syncs 
                automatically across warehouses and store counters. They need automated WhatsApp order dispatches. They need 
                role-based permission hierarchies so branch managers cannot see financial profit-and-loss data. 
                That realization shifted my entire engineering focus from decorative web design to robust systems architecture.
              </p>
            </div>

            {/* Chapter 2 */}
            <div className="space-y-4 pt-8 border-t border-[rgba(15,15,15,0.14)]">
              <div className="font-mono text-xs font-semibold text-[#1A4BFF] uppercase tracking-widest">
                CHAPTER 02 // ENTERPRISE MODERNIZATION
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-[#0F0F0F] uppercase tracking-tight">
                SCALING & REFACTORING: THE MYLS SWITZERLAND PLATFORM
              </h2>
              <p>
                My professional experience includes working on the core engineering of <strong className="text-[#0F0F0F] font-semibold">MYLS</strong>, 
                a high-throughput SaaS platform serving over <strong className="text-[#0F0F0F] font-semibold">2,800 active business locations across Switzerland</strong>. 
                The platform empowers businesses to manage their digital presence, listings, and customer data across 37+ platforms directly.
              </p>
              <div className="p-5 bg-white border border-[rgba(15,15,15,0.12)] space-y-3 font-mono text-xs text-[#0F0F0F]">
                <div className="font-bold text-[#1A4BFF] uppercase tracking-wider">
                  KEY FACTUAL ENGINEERING RESPONSIBILITIES:
                </div>
                <ul className="space-y-2 list-disc list-inside text-[#575652] font-sans text-sm">
                  <li><strong>Monolith Modernization:</strong> Migrated legacy PHP Laravel 8 codebase to modern PHP Laravel 12.</li>
                  <li><strong>Frontend Evolution:</strong> Upgraded legacy Vue 2 UI into Vue 3 utilizing the modern Composition API.</li>
                  <li><strong>Database Architecture:</strong> Redesigned underlying schema architecture from MySQL to PostgreSQL for multi-tenant scalability.</li>
                  <li><strong>Access Control:</strong> Implemented granular, multi-tenant role-based access control (RBAC) via Spatie permissions.</li>
                  <li><strong>Direct API Integrations:</strong> Built resilient direct REST APIs to eliminate fragile third-party aggregators.</li>
                </ul>
              </div>
              <p>
                Working in a cross-cultural distributed engineering environment on real European business infrastructure instilled 
                a rigorous standard for code quality, backwards compatibility, and systematic refactoring.
              </p>
            </div>

            {/* Chapter 3 */}
            <div className="space-y-4 pt-8 border-t border-[rgba(15,15,15,0.14)]">
              <div className="font-mono text-xs font-semibold text-[#1A4BFF] uppercase tracking-widest">
                CHAPTER 03 // PRODUCT THINKING
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-[#0F0F0F] uppercase tracking-tight">
                BUILDING & DEPLOYING TOOLKITO INDEPENDENTLY
              </h2>
              <p>
                To prove that technical architecture must be paired with genuine product thinking, I conceived, engineered, 
                and deployed <strong className="text-[#0F0F0F] font-semibold">Toolkito</strong> (<a href="https://toolkito.app" target="_blank" rel="noopener noreferrer" className="text-[#1A4BFF] hover:underline font-mono text-base">toolkito.app</a>) 
                as a live, standalone Micro SaaS product.
              </p>
              <p>
                Toolkito provides 10+ browser-based utilities including an AI Background Remover, AI Image Upscaler (2x/4x/8x), 
                OCR Image-to-Text extraction, file compressors, and an all-in-one PDF toolkit. 
                The entire stack was built solo — utilizing Next.js, Sharp, FFmpeg, Tesseract.js, and Supabase PostgreSQL. 
                Operating a live SaaS sharpened my understanding of edge deployment, serverless memory limits, user conversion friction, 
                and programmatic SEO content growth.
              </p>
            </div>

            {/* Chapter 4 */}
            <div className="space-y-4 pt-8 border-t border-[rgba(15,15,15,0.14)]">
              <div className="font-mono text-xs font-semibold text-[#1A4BFF] uppercase tracking-widest">
                CHAPTER 04 // COMMERCIAL SOLUTIONS
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-[#0F0F0F] uppercase tracking-tight">
                PURPOSE-BUILT COMMERCIAL OPERATING SYSTEMS
              </h2>
              <p>
                In 2026, I engineered <strong className="text-[#0F0F0F] font-semibold">TXS (Enterprise Tech Store & PC Builder OS)</strong>, 
                tailored specifically for technology and CCTV retailers. Rather than forcing retailers to use generic Shopify plugins, 
                TXS features a real-time hardware compatibility engine that calculates AM5/LGA1700 CPU socket matching, RAM generation compatibility, 
                and power supply wattage overhead in milliseconds, connected directly to WhatsApp order dispatch.
              </p>
              <p>
                This same engineering methodology powered <strong className="text-[#0F0F0F] font-semibold">MediCore HMS</strong> (a multi-portal hospital ERP 
                with an interactive clinical SVG 32-tooth dental charting engine) and conversational <strong className="text-[#0F0F0F] font-semibold">WhatsApp AI Voice Agents</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Technical Craft Grid ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#1A4BFF] font-semibold mb-2">
              TECHNICAL CRAFT // VERIFIED STACK
            </div>
            <h2 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-[#0F0F0F] leading-[0.9]">
              TOOLS & ARCHITECTURAL FOUNDATION
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
            {technicalStack.map((group, idx) => (
              <div
                key={idx}
                className="p-6 bg-white border border-[rgba(15,15,15,0.14)] space-y-4"
              >
                <div className="font-bold text-[#0F0F0F] pb-2 border-b border-[rgba(15,15,15,0.1)] text-[11px] tracking-wider">
                  {group.category}
                </div>
                <ul className="space-y-2 text-[#575652]">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#1A4BFF]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom Navigation CTA ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-[#0F0F0F]">
            READY TO DISCUSS AN ARCHITECTURAL BUILD?
          </h3>
          <p className="font-serif text-[#575652] text-base sm:text-lg max-w-xl mx-auto">
            Whether architecting a custom SaaS product, modernizing a legacy web application, or implementing a dedicated retail commerce engine.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-blue text-xs">
              START A CONVERSATION <ArrowRight size={14} />
            </Link>
            <Link to="/work" className="btn-outline text-xs">
              VIEW WORK ARCHIVE
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
