import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Github, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { FadeIn } from './motion/MotionReveal'

const ProjectsSection = () => {
  const { t, isUrdu } = useLanguage()

  const editorialProjects = [
    {
      id: 6,
      num: '01',
      badge: isUrdu ? 'MERA BANAYA HUA PRODUCT · LIVE MICRO-SAAS' : 'PRODUCT I BUILT · LIVE MICRO-SAAS',
      badgeClass: 'tag-blue',
      title: 'TOOLKITO — MICRO SAAS TOOLKIT',
      role: isUrdu ? 'Solo Product Builder (Concept, Engineering, Growth)' : 'Solo Product Builder (Concept, Engineering, Growth)',
      overview: isUrdu
        ? 'Aik live production Micro SaaS platform jo image upscaling, background removal, PDF conversions, OCR aur video processing ke 10+ browser utilities faraham karta hai. Zero framework overhead aur automated processing pipelines ke sath tayyar shuda.'
        : 'A live production Micro SaaS platform offering 10+ professional browser-based utilities for image upscaling, background removal, PDF conversions, OCR extraction, and video processing. Engineered from scratch with serverless processing pipelines, daily usage limits, and SEO strategy.',
      techStack: ['Next.js', 'Tailwind CSS', 'Sharp', 'FFmpeg', 'Tesseract OCR', 'Supabase PostgreSQL', 'Vercel'],
      image: '/toolkito.png',
      demoUrl: 'https://toolkito.app',
      caseStudyUrl: '/project/6',
      impactNote: isUrdu ? 'Live Solo SaaS Product at toolkito.app' : 'Live Solo SaaS Product at toolkito.app',
    },
    {
      id: 1,
      num: '02',
      badge: isUrdu ? 'PROFESSIONAL ENGINEERING · SWISS PLATFORM' : 'PROFESSIONAL ENGINEERING · SWISS PLATFORM',
      badgeClass: 'tag-pill',
      title: 'MYLS — MULTI-TENANT SAAS MODERNIZATION',
      role: isUrdu ? 'Full-Stack Systems Modernization' : 'Full-Stack Systems Modernization',
      overview: isUrdu
        ? 'Switzerland mein 2,800+ active business locations ko serve karne wala production SaaS platform. Legacy Laravel 8 se Laravel 12 aur Vue 3 (Composition API) par mukammal modernization, PostgreSQL architecture aur granular Spatie RBAC ke sath.'
        : 'Production SaaS platform serving 2,800+ active business locations in Switzerland. Successfully executed a full modernization from legacy Laravel 8 to Laravel 12, migrated the frontend to Vue 3 (Composition API), redesigned the database architecture from MySQL to PostgreSQL, and implemented granular Spatie role-based access control (RBAC).',
      techStack: ['Laravel 12', 'Vue 3 / Composition API', 'PostgreSQL', 'Spatie RBAC', 'REST APIs'],
      image: '/myls.png',
      demoUrl: 'https://app.myls.ch',
      caseStudyUrl: '/project/1',
      impactNote: isUrdu ? '2,800+ Active Swiss Business Locations' : '2,800+ Active Swiss Business Locations',
    },
    {
      id: 7,
      num: '03',
      badge: isUrdu ? 'CUSTOM E-COMMERCE · RETAIL SYSTEM' : 'CUSTOM E-COMMERCE · RETAIL SYSTEM',
      badgeClass: 'tag-blue',
      title: 'TXS — ENTERPRISE TECH STORE & PC BUILDER OS',
      role: isUrdu ? 'Full-Stack Architecture & Development' : 'Full-Stack Architecture & Development',
      overview: isUrdu
        ? 'Computer hardware, gaming rigs aur CCTV retailers ke liye khas tor par tayyar shuda e-commerce retail engine. Real-time PC Builder compatibility engine (Socket AM5/LGA1700, DDR4/DDR5, wattage calculation), multi-branch stock sync, aur WhatsApp automated dispatch ke sath.'
        : 'High-performance retail commerce engine tailored for technology, computer hardware, and CCTV retailers. Features a real-time hardware compatibility engine (CPU sockets AM5/LGA1700, DDR4/DDR5, wattage calculation), multi-branch inventory synchronization, serial number warranty lifecycle, and automated WhatsApp order dispatch.',
      techStack: ['Next.js 16', 'React 19', 'Prisma ORM', 'PostgreSQL', 'Tailwind CSS'],
      image: '/txs/home.png',
      demoUrl: 'https://store-demo-eight.vercel.app/',
      caseStudyUrl: '/project/7',
      impactNote: isUrdu ? 'Real-Time Hardware Compatibility Engine' : 'Real-Time Hardware Compatibility Engine',
    },
    {
      id: 8,
      num: '04',
      badge: isUrdu ? 'ENTERPRISE HEALTHCARE · 4-PORTAL ERP' : 'ENTERPRISE HEALTHCARE · 4-PORTAL ERP',
      badgeClass: 'tag-pill',
      title: 'MEDICORE — MODERN HOSPITAL MANAGEMENT SYSTEM',
      role: isUrdu ? 'Full-Stack ERP Architecture' : 'Full-Stack ERP Architecture',
      overview: isUrdu
        ? 'Super Admin, Doctor, Staff aur Patient ke 4 user portals par mushtamil comprehensive healthcare ERP ecosystem. Dynamic JSON clinical forms, interactive SVG 32-tooth dental chart with FDI notation, aur live ward bed occupancy tracking ke sath.'
        : 'A comprehensive hospital management ecosystem featuring multi-guard authentication across 4 user portals: Super Admin, Doctor, Staff, and Patient. Includes a dynamic JSON-configured clinical dashboard, an interactive SVG 32-tooth dental chart with FDI notation, and live ward bed occupancy tracking.',
      techStack: ['PHP Laravel 12 (REST API)', 'Next.js (App Router)', 'PostgreSQL', 'Recharts', 'TypeScript'],
      image: '/hms/landing.png',
      githubUrl: 'https://github.com/GitByHamza/Hospital-Management-System',
      caseStudyUrl: '/project/8',
      impactNote: isUrdu ? '4 Role-Based Portals & Clinical SVG Dental Engine' : '4 Role-Based Portals & Clinical SVG Dental Engine',
    },
    {
      id: 2,
      num: '05',
      badge: isUrdu ? 'AI BUSINESS AUTOMATION · 24/7 AGENT' : 'AI BUSINESS AUTOMATION · 24/7 AGENT',
      badgeClass: 'tag-pill',
      title: 'AI RECEPTIONIST & CRM PIPELINE AGENT',
      role: isUrdu ? 'AI Integration & Full-Stack Development' : 'AI Integration & Full-Stack Development',
      overview: isUrdu
        ? 'Full-stack business automation platform jisme WhatsApp voice & text AI agent 24/7 customer inquiries handle karta hai, appointments book karta hai aur real-time CRM pipelines update karta hai.'
        : 'A full-stack business automation platform featuring a WhatsApp voice & text agent that handles customer inquiries 24/7 using company knowledge base data, automates calendar appointment booking, and updates CRM lead qualification pipelines in real-time.',
      techStack: ['Next.js', 'Node.js / Laravel', 'OpenAI API', 'WhatsApp API', 'CRM System'],
      image: '/ai/main.png',
      caseStudyUrl: '/project/2',
      impactNote: isUrdu ? 'Automated 24/7 Lead Qualification & Booking' : 'Automated 24/7 Lead Qualification & Booking',
    },
  ]

  return (
    <section id="work-section" className="w-full bg-[#F6F5F0] dark:bg-[#0F0F11] border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] transition-colors duration-200">
      {/* ─── Section Header ─── */}
      <FadeIn direction="up" className="px-4 sm:px-8 py-12 sm:py-16 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#059669] dark:text-[#10B981] font-semibold mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#059669] dark:bg-[#10B981] inline-block" />
            {t('projectsSection', 'chapter')}
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6] leading-[0.9]">
            {t('projectsSection', 'heading')}
          </h2>
        </div>
        <p className="font-serif text-sm sm:text-base text-[#575652] dark:text-[#9B9A95] max-w-lg leading-relaxed">
          {t('projectsSection', 'sub')}
        </p>
      </FadeIn>

      {/* ─── Editorial Project Entries List ─── */}
      <div className="divide-y divide-[rgba(15,15,15,0.14)] dark:divide-[rgba(255,255,255,0.12)]">
        {editorialProjects.map((project) => (
          <FadeIn
            key={project.id}
            direction="up"
            distance={24}
            duration={0.6}
            className="p-6 sm:p-10 lg:p-12 hover:bg-[#FAF9F5] dark:hover:bg-[#161619] transition-colors"
          >
            <article>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Number, Title, Overview, Tech Stack (7 cols) */}
                <div className="lg:col-span-7 space-y-5">
                  {/* Meta Header */}
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                    <span className="font-display text-4xl sm:text-5xl text-[#059669] dark:text-[#10B981] leading-none">
                      {project.num}
                    </span>
                    <span className={project.badgeClass}>
                      {project.badge}
                    </span>
                    <span className="text-[11px] text-[#8E8D88] dark:text-[#6A6965] hidden sm:inline">
                      // {project.role}
                    </span>
                  </div>

                  {/* Title */}
                  <Link to={project.caseStudyUrl} className="block group">
                    <h3 className="font-display text-2xl sm:text-4xl uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6] group-hover:text-[#059669] dark:group-hover:text-[#10B981] transition-colors leading-[1.05]">
                      {project.title}
                    </h3>
                  </Link>

                  {/* Narrative Overview */}
                  <p className="font-serif text-[#575652] dark:text-[#9B9A95] text-base sm:text-lg leading-relaxed">
                    {project.overview}
                  </p>

                  {/* Tech Badges */}
                  <div className="space-y-1.5 pt-2">
                    <div className="text-[10px] font-mono text-[#8E8D88] dark:text-[#6A6965] uppercase tracking-widest">
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
                    <Link to={project.caseStudyUrl} className="btn-outline text-xs group">
                      <span>{t('projectsSection', 'view_case')}</span>
                      <ArrowRight size={13} className="arrow-slide" />
                    </Link>

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono font-semibold text-[#059669] dark:text-[#10B981] hover:underline flex items-center gap-1"
                      >
                        {t('projectsSection', 'live_deployment')} <ArrowUpRight size={14} />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-[#575652] dark:text-[#9B9A95] hover:text-[#0F0F0F] dark:hover:text-[#EDECE6] flex items-center gap-1"
                      >
                        <Github size={13} /> GITHUB REPO
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column: Visual Frame with subtle print border (5 cols) */}
                <div className="lg:col-span-5">
                  <Link to={project.caseStudyUrl} className="block group">
                    <div className="border border-[rgba(15,15,15,0.18)] dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#161619] p-2 shadow-sm card-hover-guided">
                      <div className="relative aspect-video overflow-hidden bg-[#ECEAE3] dark:bg-[#202025]">
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
          </FadeIn>
        ))}
      </div>

      {/* ─── Footer CTA to Full Work Archive ─── */}
      <FadeIn direction="up" delay={0.1} className="p-8 sm:p-12 text-center bg-[#FAF9F5] dark:bg-[#161619] border-t border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)]">
        <Link to="/work" className="btn-blue text-xs sm:text-sm px-8 py-4 group">
          <span>{t('projectsSection', 'view_all')} (8+ SYSTEMS)</span>
          <ArrowRight size={16} className="arrow-slide" />
        </Link>
      </FadeIn>
    </section>
  )
}

export default ProjectsSection
