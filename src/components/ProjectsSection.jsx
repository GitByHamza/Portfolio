import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, Github, Layers, ArrowUpRight } from 'lucide-react'

const ProjectsSection = () => {
  const editorialProjects = [
    {
      id: 6,
      num: '01',
      badge: 'PRODUCT I BUILT · LIVE MICRO-SAAS',
      badgeClass: 'tag-blue',
      title: 'TOOLKITO — MICRO SAAS TOOLKIT',
      role: 'Solo Product Builder (Concept, Engineering, Growth)',
      overview:
        'A live production Micro SaaS platform offering 10+ professional browser-based utilities for image upscaling, background removal, PDF conversions, OCR extraction, and video processing. Engineered from scratch with serverless processing pipelines, daily usage limits, and SEO strategy.',
      techStack: ['Next.js', 'Tailwind CSS', 'Sharp', 'FFmpeg', 'Tesseract OCR', 'Supabase PostgreSQL', 'Vercel'],
      image: '/toolkito.png',
      demoUrl: 'https://toolkito.app',
      caseStudyUrl: '/project/6',
      impactNote: 'Live Solo SaaS Product at toolkito.app',
    },
    {
      id: 1,
      num: '02',
      badge: 'PROFESSIONAL ENGINEERING · SWISS PLATFORM',
      badgeClass: 'tag-pill',
      title: 'MYLS — MULTI-TENANT SAAS MODERNIZATION',
      role: 'Full-Stack Systems Modernization',
      overview:
        'Production SaaS platform serving 2,800+ active business locations in Switzerland. Successfully executed a full modernization from legacy Laravel 8 to Laravel 12, migrated the frontend to Vue 3 (Composition API), redesigned the database architecture from MySQL to PostgreSQL, and implemented granular Spatie role-based access control (RBAC).',
      techStack: ['Laravel 12', 'Vue 3 / Composition API', 'PostgreSQL', 'Spatie RBAC', 'REST APIs'],
      image: '/myls.png',
      demoUrl: 'https://app.myls.ch',
      caseStudyUrl: '/project/1',
      impactNote: '2,800+ Active Swiss Business Locations',
    },
    {
      id: 7,
      num: '03',
      badge: 'CUSTOM E-COMMERCE · RETAIL SYSTEM',
      badgeClass: 'tag-blue',
      title: 'TXS — ENTERPRISE TECH STORE & PC BUILDER OS',
      role: 'Full-Stack Architecture & Development',
      overview:
        'High-performance retail commerce engine tailored for technology, computer hardware, and CCTV retailers. Features a real-time hardware compatibility engine (CPU sockets AM5/LGA1700, DDR4/DDR5, wattage calculation), multi-branch inventory synchronization, serial number warranty lifecycle, and automated WhatsApp order dispatch.',
      techStack: ['Next.js 16', 'React 19', 'Prisma ORM', 'PostgreSQL', 'Tailwind CSS'],
      image: '/txs/home.png',
      demoUrl: 'https://store-demo-eight.vercel.app/',
      caseStudyUrl: '/project/7',
      impactNote: 'Real-Time Hardware Compatibility Engine',
    },
    {
      id: 8,
      num: '04',
      badge: 'ENTERPRISE HEALTHCARE · 4-PORTAL ERP',
      badgeClass: 'tag-pill',
      title: 'MEDICORE — MODERN HOSPITAL MANAGEMENT SYSTEM',
      role: 'Full-Stack ERP Architecture',
      overview:
        'A comprehensive hospital management ecosystem featuring multi-guard authentication across 4 user portals: Super Admin, Doctor, Staff, and Patient. Includes a dynamic JSON-configured clinical dashboard, an interactive SVG 32-tooth dental chart with FDI notation, and live ward bed occupancy tracking.',
      techStack: ['PHP Laravel 12 (REST API)', 'Next.js (App Router)', 'PostgreSQL', 'Recharts', 'TypeScript'],
      image: '/hms/landing.png',
      githubUrl: 'https://github.com/GitByHamza/Hospital-Management-System',
      caseStudyUrl: '/project/8',
      impactNote: '4 Role-Based Portals & Clinical SVG Dental Engine',
    },
    {
      id: 2,
      num: '05',
      badge: 'AI BUSINESS AUTOMATION · 24/7 AGENT',
      badgeClass: 'tag-pill',
      title: 'AI RECEPTIONIST & CRM PIPELINE AGENT',
      role: 'AI Integration & Full-Stack Development',
      overview:
        'A full-stack business automation platform featuring a WhatsApp voice & text agent that handles customer inquiries 24/7 using company knowledge base data, automates calendar appointment booking, and updates CRM lead qualification pipelines in real-time.',
      techStack: ['Next.js', 'Node.js / Laravel', 'OpenAI API', 'WhatsApp API', 'CRM System'],
      image: '/ai/main.png',
      caseStudyUrl: '/project/2',
      impactNote: 'Automated 24/7 Lead Qualification & Booking',
    },
  ]

  return (
    <section id="work-section" className="w-full bg-[#F6F5F0] border-b border-[rgba(15,15,15,0.14)]">
      {/* ─── Section Header ─── */}
      <div className="px-4 sm:px-8 py-12 sm:py-16 border-b border-[rgba(15,15,15,0.14)] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#1A4BFF] font-semibold mb-2">
            SELECTED WORK // PRODUCTION SYSTEMS (2023 — 2026)
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display uppercase tracking-tight text-[#0F0F0F] leading-[0.9]">
            ENGINEERED SYSTEMS
          </h2>
        </div>
        <p className="font-serif text-sm sm:text-base text-[#575652] max-w-lg leading-relaxed">
          Production SaaS platforms, custom commerce engines, and software architectures built with clean domain boundaries, 
          resilient data models, and verified production performance.
        </p>
      </div>

      {/* ─── Editorial Project Entries List ─── */}
      <div className="divide-y divide-[rgba(15,15,15,0.14)]">
        {editorialProjects.map((project) => (
          <article
            key={project.id}
            className="p-6 sm:p-10 lg:p-12 hover:bg-[#FAF9F5] transition-colors"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Number, Title, Overview, Tech Stack (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                  <span className="font-display text-4xl sm:text-5xl text-[#1A4BFF] leading-none">
                    {project.num}
                  </span>
                  <span className={project.badgeClass}>
                    {project.badge}
                  </span>
                  <span className="text-[11px] text-[#8E8D88] hidden sm:inline">
                    // {project.role}
                  </span>
                </div>

                {/* Title */}
                <Link to={project.caseStudyUrl} className="block group">
                  <h3 className="font-display text-2xl sm:text-4xl uppercase tracking-tight text-[#0F0F0F] group-hover:text-[#1A4BFF] transition-colors leading-[1.05]">
                    {project.title}
                  </h3>
                </Link>

                {/* Narrative Overview */}
                <p className="font-serif text-[#575652] text-base sm:text-lg leading-relaxed">
                  {project.overview}
                </p>

                {/* Tech Badges */}
                <div className="space-y-1.5 pt-2">
                  <div className="text-[10px] font-mono text-[#8E8D88] uppercase tracking-widest">
                    TECH STACK & ARCHITECTURE:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tag-pill text-[10px]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link to={project.caseStudyUrl} className="btn-outline text-xs">
                    READ CASE STUDY <ArrowRight size={13} />
                  </Link>

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-semibold text-[#1A4BFF] hover:underline flex items-center gap-1"
                    >
                      LIVE DEPLOYMENT <ArrowUpRight size={14} />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-[#575652] hover:text-[#0F0F0F] flex items-center gap-1"
                    >
                      <Github size={13} /> GITHUB REPO
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Visual Frame with subtle print border (5 cols) */}
              <div className="lg:col-span-5">
                <Link to={project.caseStudyUrl} className="block group">
                  <div className="border border-[rgba(15,15,15,0.18)] bg-white p-2 shadow-sm transition-all duration-300 group-hover:border-[#1A4BFF]">
                    <div className="relative aspect-video overflow-hidden bg-[#ECEAE3]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                      />
                      <div className="absolute bottom-2 left-2 bg-[#0F0F0F] text-white font-mono text-[9px] uppercase px-2 py-0.5 tracking-wider">
                        {project.impactNote}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ─── Footer CTA to Full Work Archive ─── */}
      <div className="p-8 sm:p-12 text-center bg-[#FAF9F5] border-t border-[rgba(15,15,15,0.14)]">
        <Link to="/work" className="btn-blue text-xs sm:text-sm px-8 py-4">
          EXPLORE COMPLETE WORK ARCHIVE (8+ SYSTEMS) <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}

export default ProjectsSection
