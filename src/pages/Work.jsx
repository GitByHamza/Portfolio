import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { projectsData } from '../data/projects'
import { ArrowRight, ExternalLink, Github, ArrowUpRight, Box } from 'lucide-react'

export default function Work() {
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const categories = ['ALL', 'ENTERPRISE SYSTEMS', 'COMMERCE & RETAIL', 'SAAS & AI TOOLS']

  const filteredProjects = projectsData.filter((p) => {
    if (filter === 'ALL') return true
    if (filter === 'ENTERPRISE SYSTEMS') {
      return (
        p.tags?.some((t) => ['Laravel 12', 'PostgreSQL', 'Spatie', 'Next.js'].includes(t)) ||
        p.title.includes('Enterprise') ||
        p.title.includes('Myls') ||
        p.title.includes('Hospital')
      )
    }
    if (filter === 'COMMERCE & RETAIL') {
      return (
        p.tags?.includes('Prisma') ||
        p.title.includes('Store') ||
        p.title.includes('Shop') ||
        p.title.includes('Ecommerce') ||
        p.title.includes('Retail')
      )
    }
    if (filter === 'SAAS & AI TOOLS') {
      return (
        p.title.includes('SaaS') ||
        p.title.includes('AI') ||
        p.tags?.some((t) => t.toLowerCase().includes('ai') || t.includes('Micro SaaS'))
      )
    }
    return true
  })

  return (
    <div className="w-full bg-[#F6F5F0] min-h-screen">
      {/* ─── Page Header ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#1A4BFF] font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#1A4BFF] inline-block" />
            ARCHIVE // PRODUCTION WORK (2023 — 2026)
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-display uppercase tracking-tight text-[#0F0F0F] leading-[0.88] max-w-5xl">
            SELECTED WORK ARCHIVE.
          </h1>

          <p className="font-serif text-lg sm:text-xl text-[#575652] max-w-2xl leading-relaxed">
            A comprehensive index of software platforms, SaaS products, commerce operating systems, 
            and full-stack architectures engineered by TeXCodes.
          </p>

          {/* Filter Tabs */}
          <div className="pt-6 flex flex-wrap items-center gap-2 font-mono text-xs">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 border uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  filter === c
                    ? 'bg-[#0F0F0F] text-white border-[#0F0F0F]'
                    : 'bg-white text-[#575652] border-[rgba(15,15,15,0.18)] hover:text-[#0F0F0F] hover:border-[#0F0F0F]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Projects List ─── */}
      <section className="px-4 sm:px-8 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto divide-y divide-[rgba(15,15,15,0.14)] border-y border-[rgba(15,15,15,0.14)]">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              className="py-10 sm:py-14 hover:bg-[#FAF9F5] transition-colors"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Visual Thumbnail (4 cols) */}
                <div className="lg:col-span-4">
                  <Link to={`/project/${project.id}`} className="block group">
                    <div className="border border-[rgba(15,15,15,0.18)] bg-white p-2 shadow-sm group-hover:border-[#1A4BFF] transition-colors">
                      <div className="relative aspect-video overflow-hidden bg-[#ECEAE3]">
                        {project.mainImage ? (
                          <img
                            src={project.mainImage}
                            alt={project.title}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#8E8D88]">
                            <Box size={28} />
                          </div>
                        )}
                        {project.impact && (
                          <div className="absolute top-2 left-2 bg-[#0F0F0F] text-white font-mono text-[9px] uppercase px-2 py-0.5 tracking-wider">
                            {project.impact}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Content (8 cols) */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#8E8D88]">
                    <span className="font-display text-2xl text-[#1A4BFF]">
                      0{idx + 1}
                    </span>
                    <span>/</span>
                    <span className="text-[#0F0F0F] font-semibold uppercase">
                      ID #{project.id}
                    </span>
                  </div>

                  <Link to={`/project/${project.id}`} className="block group">
                    <h2 className="font-display text-2xl sm:text-4xl uppercase tracking-tight text-[#0F0F0F] group-hover:text-[#1A4BFF] transition-colors leading-tight">
                      {project.title}
                    </h2>
                  </Link>

                  <p className="font-serif text-sm sm:text-base text-[#575652] leading-relaxed">
                    {project.overview}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags?.map((tag) => (
                      <span key={tag} className="tag-pill text-[10px]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4 font-mono text-xs">
                    <Link to={`/project/${project.id}`} className="btn-outline text-xs">
                      READ CASE STUDY <ArrowRight size={13} />
                    </Link>

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#1A4BFF] hover:underline flex items-center gap-1"
                      >
                        LIVE DEPLOYMENT <ArrowUpRight size={13} />
                      </a>
                    )}

                    {project.githubUrl && project.githubUrl !== '#' && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#575652] hover:text-[#0F0F0F] flex items-center gap-1"
                      >
                        <Github size={13} /> GITHUB REPO
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
