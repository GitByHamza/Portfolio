import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { projectsData, getLocalizedProject } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'
import { ArrowRight, ExternalLink, Github, ArrowUpRight, Box } from 'lucide-react'

export default function Work() {
  const { t, lang, isUrdu } = useLanguage()
  const [filterId, setFilterId] = useState('ALL')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const categories = [
    { id: 'ALL', label: t('workPage', 'filter_all') },
    { id: 'ENTERPRISE', label: t('workPage', 'filter_enterprise') },
    { id: 'COMMERCE', label: t('workPage', 'filter_commerce') },
    { id: 'SAAS', label: t('workPage', 'filter_saas') },
  ]

  const filteredProjects = projectsData.filter((p) => {
    if (filterId === 'ALL') return true
    if (filterId === 'ENTERPRISE') {
      return (
        p.tags?.some((t) => ['Laravel 12', 'PostgreSQL', 'Spatie', 'Next.js'].includes(t)) ||
        p.title.includes('Enterprise') ||
        p.title.includes('Myls') ||
        p.title.includes('Hospital')
      )
    }
    if (filterId === 'COMMERCE') {
      return (
        p.tags?.includes('Prisma') ||
        p.title.includes('Store') ||
        p.title.includes('Shop') ||
        p.title.includes('Ecommerce') ||
        p.title.includes('Retail')
      )
    }
    if (filterId === 'SAAS') {
      return (
        p.title.includes('SaaS') ||
        p.title.includes('AI') ||
        p.tags?.some((t) => t.toLowerCase().includes('ai') || t.includes('Micro SaaS'))
      )
    }
    return true
  })

  return (
    <div className="w-full bg-[#F6F5F0] dark:bg-[#0A0A0A] min-h-screen transition-colors duration-200">
      {/* ─── Page Header ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.1)] bg-[#FAF9F5] dark:bg-[#111111]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#059669] dark:text-[#10B981] font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#059669] dark:bg-[#10B981] inline-block" />
            {t('workPage', 'badge')}
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-white leading-[0.88] max-w-5xl">
            {t('workPage', 'title')}
          </h1>

          <p className="font-serif text-lg sm:text-xl text-[#575652] dark:text-[#A3A29E] max-w-2xl leading-relaxed">
            {t('workPage', 'desc')}
          </p>

          {/* Filter Tabs */}
          <div className="pt-6 flex flex-wrap items-center gap-2 font-mono text-xs">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilterId(c.id)}
                className={`px-4 py-2 border uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  filterId === c.id
                    ? 'bg-[#0F0F0F] dark:bg-white text-white dark:text-[#0F0F0F] border-[#0F0F0F] dark:border-white'
                    : 'bg-white dark:bg-[#181818] text-[#575652] dark:text-[#A3A29E] border-[rgba(15,15,15,0.18)] dark:border-[rgba(255,255,255,0.15)] hover:text-[#0F0F0F] dark:hover:text-white hover:border-[#0F0F0F] dark:hover:border-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Projects List ─── */}
      <section className="px-4 sm:px-8 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto divide-y divide-[rgba(15,15,15,0.14)] dark:divide-[rgba(255,255,255,0.1)] border-y border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.1)]">
          {filteredProjects.map((rawProject, idx) => {
            const project = getLocalizedProject(rawProject, lang)
            return (
              <article
                key={project.id}
                className="py-10 sm:py-14 hover:bg-[#FAF9F5] dark:hover:bg-[#111111] transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Visual Thumbnail (4 cols) */}
                  <div className="lg:col-span-4">
                    <Link to={`/project/${project.id}`} className="block group">
                      <div className="border border-[rgba(15,15,15,0.18)] dark:border-[rgba(255,255,255,0.15)] bg-white dark:bg-[#141414] p-2 shadow-sm group-hover:border-[#059669] dark:group-hover:border-[#10B981] transition-colors">
                        <div className="relative aspect-video overflow-hidden bg-[#ECEAE3] dark:bg-[#1E1E1E]">
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
                            <div className="absolute top-2 left-2 bg-[#0F0F0F] dark:bg-black text-white font-mono text-[9px] uppercase px-2 py-0.5 tracking-wider border border-white/20">
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
                      <span className="font-display text-2xl text-[#059669] dark:text-[#10B981]">
                        0{idx + 1}
                      </span>
                      <span>/</span>
                      <span className="text-[#0F0F0F] dark:text-white font-semibold uppercase">
                        ID #{project.id}
                      </span>
                    </div>

                    <Link to={`/project/${project.id}`} className="block group">
                      <h2 className="font-display text-2xl sm:text-4xl uppercase tracking-tight text-[#0F0F0F] dark:text-white group-hover:text-[#059669] dark:group-hover:text-[#10B981] transition-colors leading-tight">
                        {project.title}
                      </h2>
                    </Link>

                    <p className="font-serif text-sm sm:text-base text-[#575652] dark:text-[#C5C4BE] leading-relaxed">
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
                        {isUrdu ? 'CASE STUDY PARHEIN' : 'READ CASE STUDY'} <ArrowRight size={13} />
                      </Link>

                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#059669] dark:text-[#10B981] hover:underline flex items-center gap-1"
                        >
                          {t('workPage', 'live_link')} <ArrowUpRight size={13} />
                        </a>
                      )}

                      {project.githubUrl && project.githubUrl !== '#' && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#575652] dark:text-[#A3A29E] hover:text-[#0F0F0F] dark:hover:text-white flex items-center gap-1"
                        >
                          <Github size={13} /> {t('workPage', 'github_link')}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
