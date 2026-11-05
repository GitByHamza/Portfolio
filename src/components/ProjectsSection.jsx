import Link from './SiteLink'

import { ArrowRight, Github, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { FadeIn } from './motion/MotionReveal'
import { projectsData, getLocalizedProject } from '../data/projects'

const ProjectsSection = () => {
  const { t, lang, isUrdu } = useLanguage()

  const existingFeaturedProjects = [{id: 6,
badge: isUrdu ? 'MERA BANAYA HUA PRODUCT · LIVE MICRO-SAAS' : 'PRODUCT I BUILT · LIVE MICRO-SAAS',
badgeClass: 'tag-blue',
role: isUrdu ? 'Solo Product Builder (Concept, Engineering, Growth)' : 'Solo Product Builder (Concept, Engineering, Growth)'},
{id: 1,
badge: isUrdu ? 'PROFESSIONAL ENGINEERING · SWISS PLATFORM' : 'PROFESSIONAL ENGINEERING · SWISS PLATFORM',
badgeClass: 'tag-pill',
role: isUrdu ? 'Full-Stack Systems Modernization' : 'Full-Stack Systems Modernization'},
{id: 7,
badge: isUrdu ? 'CUSTOM E-COMMERCE · RETAIL SYSTEM' : 'CUSTOM E-COMMERCE · RETAIL SYSTEM',
badgeClass: 'tag-blue',
role: isUrdu ? 'Full-Stack Architecture & Development' : 'Full-Stack Architecture & Development'},
{id: 8,
badge: isUrdu ? 'ENTERPRISE HEALTHCARE · 4-PORTAL ERP' : 'ENTERPRISE HEALTHCARE · 4-PORTAL ERP',
badgeClass: 'tag-pill',
role: isUrdu ? 'Full-Stack ERP Architecture' : 'Full-Stack ERP Architecture'},
{id: 2,
badge: isUrdu ? 'AI BUSINESS AUTOMATION · 24/7 AGENT' : 'AI BUSINESS AUTOMATION · 24/7 AGENT',
badgeClass: 'tag-pill',
role: isUrdu ? 'AI Integration & Full-Stack Development' : 'AI Integration & Full-Stack Development'}].map((entry) => {
 const project = getLocalizedProject(projectsData.find((item) => item.id === entry.id), lang)
 return { ...project, ...entry, title: project.title.toUpperCase(), techStack: project.tags, image: project.mainImage, caseStudyUrl: '/project/' + project.id, impactNote: project.impact }
})

  const editorialProjects = [
    ...projectsData.filter((project) => project.featured).map((rawProject) => {
      const project = getLocalizedProject(rawProject, lang)
      return {
        ...project,
        badge: isUrdu ? project.featured.badge_ur : project.featured.badge,
        badgeClass: 'tag-blue',
        role: project.featured.role,
        techStack: project.tags,
        image: project.mainImage,
        caseStudyUrl: `/project/${project.id}`,
        impactNote: project.impact,
      }
    }),
    ...existingFeaturedProjects,
  ].map((project, index) => ({ ...project, num: String(index + 1).padStart(2, '0') }))

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
                          className={`w-full h-full transition-transform duration-500 group-hover:scale-102 ${project.imagePresentation === 'portrait' ? 'object-contain object-center' : 'object-cover object-top'}`}
                          loading="lazy"
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
          <span>{t('projectsSection', 'view_all')} ({projectsData.length} SYSTEMS)</span>
          <ArrowRight size={16} className="arrow-slide" />
        </Link>
      </FadeIn>
    </section>
  )
}

export default ProjectsSection
