import React, { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, CheckCircle2, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { projectsData, getLocalizedProject } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'

const ProjectDetails = () => {
  const { id } = useParams()
  const { t, lang, isUrdu } = useLanguage()

  const rawProject = projectsData.find((p) => p.id === parseInt(id))
  const currentIndex = projectsData.findIndex((p) => p.id === parseInt(id))
  const rawNextProject = currentIndex !== -1 ? projectsData[(currentIndex + 1) % projectsData.length] : null
  const rawPrevProject = currentIndex !== -1 ? projectsData[(currentIndex - 1 + projectsData.length) % projectsData.length] : null

  const project = rawProject ? getLocalizedProject(rawProject, lang) : null
  const nextProject = rawNextProject ? getLocalizedProject(rawNextProject, lang) : null
  const prevProject = rawPrevProject ? getLocalizedProject(rawPrevProject, lang) : null

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const openModal = (index) => {
    setSelectedImageIndex(index)
    setModalOpen(true)
  }

  const closeModal = () => setModalOpen(false)

  const nextImage = useCallback(() => {
    if (!project?.images?.length) return
    setSelectedImageIndex((prev) => (prev + 1) % project.images.length)
  }, [project])

  const prevImage = useCallback(() => {
    if (!project?.images?.length) return
    setSelectedImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }, [project])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!modalOpen) return
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modalOpen, nextImage, prevImage])

  if (!project) {
    return (
      <div className="w-full bg-[#F6F5F0] dark:bg-[#0A0A0A] min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4 font-mono transition-colors duration-200">
        <div className="text-[#059669] dark:text-[#10B981] text-lg font-bold">
          404 // {t('projectDetails', 'not_found')}
        </div>
        <p className="text-[#575652] dark:text-[#A3A29E] text-sm">
          {isUrdu ? 'Matlooba system ID mojooda repository mein dastyab nahi hai.' : 'The requested system ID does not exist in the active repository.'}
        </p>
        <Link to="/work" className="btn-outline text-xs">
          {t('projectDetails', 'return_archive')}
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full bg-[#F6F5F0] dark:bg-[#0A0A0A] min-h-screen transition-colors duration-200">
      {/* ─── Top Navigation Bar ─── */}
      <div className="px-4 sm:px-8 py-4 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.1)] bg-[#FAF9F5] dark:bg-[#111111] flex items-center justify-between font-mono text-xs">
        <Link
          to="/work"
          className="text-[#0F0F0F] dark:text-white hover:text-[#059669] dark:hover:text-[#10B981] transition-colors flex items-center gap-1.5 font-semibold"
        >
          <ArrowLeft size={14} /> {t('projectDetails', 'back')}
        </Link>
        <div className="text-[#8E8D88] dark:text-[#737373]">
          CASE STUDY ID #{project.id}
        </div>
      </div>

      {/* ─── Masthead Article Header ─── */}
      <section className="px-4 sm:px-8 py-12 sm:py-20 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.1)]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="tag-pill text-[10px] bg-[#059669]/10 dark:bg-[#059669]/20 text-[#059669] dark:text-[#10B981] border-[#059669]/30">
              {project.impact || (isUrdu ? 'PRODUCTION SYSTEM' : 'PRODUCTION SYSTEM')}
            </span>
            <span className="text-[#8E8D88] dark:text-[#737373]">
              {project.tags?.slice(0, 3).join(' · ')}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-white leading-[0.92] max-w-5xl">
            {project.title}
          </h1>

          <p className="font-serif text-lg sm:text-xl text-[#575652] dark:text-[#C5C4BE] max-w-3xl leading-relaxed">
            {project.overview}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4 font-mono text-xs">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-xs border-[#059669] text-[#059669] hover:bg-[#059669] hover:text-white dark:border-[#10B981] dark:text-[#10B981] dark:hover:bg-[#10B981] dark:hover:text-black"
              >
                {t('projectDetails', 'live_link')} <ArrowUpRight size={14} />
              </a>
            )}

            {project.offerUrl && (
              <Link to={project.offerUrl} className="btn-outline text-xs">
                {t('projectDetails', 'offer_link')} →
              </Link>
            )}

            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-xs"
              >
                <Github size={14} /> {t('projectDetails', 'github_link')}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ─── Main Content & Sidebar Grid ─── */}
      <section className="px-4 sm:px-8 py-12 sm:py-20 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.1)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Narrative Column (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Primary Visual Showcase */}
            {project.mainImage && (
              <div className="border border-[rgba(15,15,15,0.18)] dark:border-[rgba(255,255,255,0.15)] bg-white dark:bg-[#141414] p-2 shadow-sm">
                <img
                  src={project.mainImage}
                  alt={project.title}
                  className="w-full h-auto object-cover max-h-[500px]"
                />
              </div>
            )}

            {/* In-depth Narrative */}
            <div className="space-y-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#059669] dark:text-[#10B981] font-semibold">
                {t('projectDetails', 'overview_title')}
              </div>
              <p className="font-serif text-base sm:text-lg text-[#575652] dark:text-[#C5C4BE] leading-relaxed">
                {project.description || project.overview}
              </p>
            </div>

            {/* Key Features & Operational Capabilities */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-[rgba(15,15,15,0.12)] dark:border-[rgba(255,255,255,0.1)]">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#0F0F0F] dark:text-white font-semibold">
                  {t('projectDetails', 'features_title')}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  {project.features.map((feature, i) => (
                    <div
                      key={i}
                      className="p-3.5 bg-white dark:bg-[#141414] border border-[rgba(15,15,15,0.12)] dark:border-[rgba(255,255,255,0.1)] flex items-start gap-2.5"
                    >
                      <CheckCircle2 size={15} className="text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                      <span className="text-[#0F0F0F] dark:text-[#EDEDED] font-sans text-xs leading-normal">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Screenshots Gallery */}
            {project.images && project.images.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-[rgba(15,15,15,0.12)] dark:border-[rgba(255,255,255,0.1)]">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#0F0F0F] dark:text-white font-semibold">
                    {t('projectDetails', 'screenshots_title')} ({project.images.length})
                  </div>
                  <span className="font-mono text-[10px] text-[#8E8D88] dark:text-[#737373]">
                    {t('projectDetails', 'click_to_enlarge')}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.images.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => openModal(idx)}
                      className="group border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.15)] bg-white dark:bg-[#141414] p-1.5 cursor-pointer hover:border-[#059669] dark:hover:border-[#10B981] transition-colors relative"
                    >
                      <div className="relative aspect-video overflow-hidden bg-[#ECEAE3] dark:bg-[#1E1E1E]">
                        <img
                          src={img}
                          alt={`${project.title} screenshot ${idx + 1}`}
                          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-102"
                        />
                        <div className="absolute inset-0 bg-[#0F0F0F]/0 group-hover:bg-[#0F0F0F]/20 transition-colors flex items-center justify-center">
                          <ZoomIn size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6 font-mono text-xs">
            {/* Tech Stack Breakdown */}
            <div className="p-6 bg-white dark:bg-[#141414] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.15)] space-y-5">
              <div className="text-[11px] font-bold text-[#0F0F0F] dark:text-white uppercase tracking-wider border-b border-[rgba(15,15,15,0.1)] dark:border-[rgba(255,255,255,0.1)] pb-2">
                {t('projectDetails', 'stack_title')}
              </div>

              {project.techStack && (
                <div className="space-y-3">
                  {project.techStack.map((item, idx) => (
                    <div key={idx} className="border-b border-[rgba(15,15,15,0.08)] dark:border-[rgba(255,255,255,0.08)] pb-2.5">
                      <div className="text-[10px] text-[#8E8D88] dark:text-[#737373] uppercase tracking-widest mb-0.5">
                        {item.category}
                      </div>
                      <div className="text-[#0F0F0F] dark:text-white font-semibold text-[11px]">
                        {item.tech}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tags */}
              <div className="pt-2 space-y-2">
                <div className="text-[10px] text-[#8E8D88] dark:text-[#737373] uppercase tracking-widest">
                  INDEX TAGS
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags?.map((tTag) => (
                    <span key={tTag} className="tag-pill text-[9px]">
                      {tTag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Consultation Box */}
            <div className="p-6 bg-[#FAF9F5] dark:bg-[#161616] border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.15)] space-y-3">
              <div className="text-[10px] text-[#8E8D88] dark:text-[#737373] uppercase tracking-widest">
                {t('projectDetails', 'inquire_button')}
              </div>
              <div className="font-bold text-[#0F0F0F] dark:text-white">
                {isUrdu ? 'Kya aap aisa system engineer karwana chahte hain?' : 'Interested in engineering a platform like this?'}
              </div>
              <p className="font-serif text-[#575652] dark:text-[#A3A29E] text-xs">
                {isUrdu ? 'Hum 100% source code ownership ke sath custom software systems banate hain.' : 'We design and engineer bespoke software systems with 100% code ownership.'}
              </p>
              <div className="pt-2">
                <Link to="/contact" className="btn-outline w-full justify-center text-xs">
                  {isUrdu ? 'INQUIRY SUBMIT KAREIN →' : 'START AN INQUIRY →'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pagination Footer ─── */}
      <section className="px-4 sm:px-8 py-8 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.1)] bg-[#FAF9F5] dark:bg-[#111111] font-mono text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevProject ? (
            <Link
              to={`/project/${prevProject.id}`}
              className="text-[#575652] dark:text-[#A3A29E] hover:text-[#059669] dark:hover:text-[#10B981] transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={14} /> {t('projectDetails', 'prev')}: {prevProject.title.slice(0, 25)}...
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              to={`/project/${nextProject.id}`}
              className="text-[#575652] dark:text-[#A3A29E] hover:text-[#059669] dark:hover:text-[#10B981] transition-colors flex items-center gap-2"
            >
              {t('projectDetails', 'next')}: {nextProject.title.slice(0, 25)}... <ArrowRight size={14} />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      {/* ─── Fullscreen Image Modal Lightbox ─── */}
      {modalOpen && project.images && (
        <div className="fixed inset-0 z-50 bg-[#0F0F0F]/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8">
          <div className="relative max-w-6xl w-full bg-[#F6F5F0] dark:bg-[#141414] border border-[rgba(15,15,15,0.2)] dark:border-[rgba(255,255,255,0.2)] p-2 sm:p-4 shadow-2xl space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.1)] pb-2 px-2">
              <span className="text-[#0F0F0F] dark:text-white font-semibold">
                {project.title} — ARTIFACT {selectedImageIndex + 1} OF {project.images.length}
              </span>
              <button
                onClick={closeModal}
                className="text-[#0F0F0F] dark:text-white hover:text-[#059669] dark:hover:text-[#10B981] p-1 cursor-pointer"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative flex items-center justify-center max-h-[78vh] overflow-hidden bg-[#ECEAE3] dark:bg-[#1E1E1E]">
              <img
                src={project.images[selectedImageIndex]}
                alt={`Screenshot ${selectedImageIndex + 1}`}
                className="max-h-[78vh] w-auto object-contain mx-auto"
              />

              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 p-2 bg-[#F6F5F0] dark:bg-[#202020] text-[#0F0F0F] dark:text-white hover:bg-[#059669] hover:text-white border border-[rgba(15,15,15,0.2)] dark:border-[rgba(255,255,255,0.15)] shadow cursor-pointer transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 p-2 bg-[#F6F5F0] dark:bg-[#202020] text-[#0F0F0F] dark:text-white hover:bg-[#059669] hover:text-white border border-[rgba(15,15,15,0.2)] dark:border-[rgba(255,255,255,0.15)] shadow cursor-pointer transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectDetails

