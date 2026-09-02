import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { projectsData } from '../data/projects'
import { ProjectImage } from './Skeleton'

// Map common tag names to Iconify icon IDs
const tagIconMap = {
  'Vue 3':        'logos:vue',
  'React':        'logos:react',
  'React Js':     'logos:react',
  'Next.js':      'logos:nextjs-icon',
  'Nuxt (TS)':    'logos:nuxt-icon',
  'Laravel 12':   'logos:laravel',
  'Php Laravel 8.3': 'logos:laravel',
  'Node.js':      'logos:nodejs-icon',
  'TailwindCSS':  'logos:tailwindcss-icon',
  'Tailwind CSS': 'logos:tailwindcss-icon',
  'MongoDB':      'logos:mongodb-icon',
  'MySQL':        'logos:mysql-icon',
  'Docker':       'logos:docker-icon',
  'OpenAI':       'simple-icons:openai',
  'Supabase':     'logos:supabase-icon',
  'Vercel':       'logos:vercel-icon',
  'Micro SaaS':   'fluent:rocket-16-filled',
  'Prisma':       'logos:prisma',
  'PostgreSQL':   'logos:postgresql',
  'TypeScript':   'logos:typescript-icon',
  'Recharts':     'simple-icons:recharts',
  'shadcn/ui':    'simple-icons:shadcnui',
}

const TiltCard = ({ children, className }) => {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const shouldReduceMotion = useReducedMotion()

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg'])

  const handleMouseMove = (e) => {
    if (!ref.current || shouldReduceMotion) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{
        rotateY: shouldReduceMotion ? 0 : rotateY,
        rotateX: shouldReduceMotion ? 0 : rotateX,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: useTransform(
              () =>
                `radial-gradient(circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(255,255,255,0.12) 0%, transparent 50%)`
            ),
          }}
        />
      )}
      <div style={{ transform: shouldReduceMotion ? 'none' : 'translateZ(20px)' }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  )
}

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative perspective-[1000px]">
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-4 text-center font-heading"
        >
          Featured{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pop">
            Projects
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-body text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Carefully crafted with attention to detail, performance, and real-world business impact.
        </motion.p>

        {/* Mobile Swipe Slider */}
        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 scrollbar-hide">
          {projectsData.map((project, key) => (
            <div key={key} className="snap-center shrink-0 w-[85vw] sm:w-[60vw]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group bg-card/80 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden shadow-xl h-full flex flex-col"
              >
                <Link to={`/project/${project.id}`} className="block h-full flex flex-col">
                  <div className="h-48 overflow-hidden relative">
                    {/* Impact badge */}
                    {project.impact && (
                      <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-pop/20 border border-pop/40 text-pop text-[11px] font-bold backdrop-blur-sm">
                        🏆 {project.impact}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent z-10" />
                    <ProjectImage
                      layoutId={`project-image-${project.id}`}
                      src={project.mainImage}
                      alt={project.title}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="font-body px-2 py-0.5 text-xs font-medium rounded-full bg-primary/20 text-primary border border-primary/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <motion.h3 
                      layoutId={`project-title-${project.id}`}
                      className="font-heading text-xl font-bold mb-2 group-hover:text-pop transition-colors"
                    >
                      {project.title}
                    </motion.h3>
                    <p className="font-body text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                      {project.overview}
                    </p>
                    <div className="mt-auto pt-3 flex justify-between items-center border-t border-white/5">
                      <span className="text-sm font-bold text-pop flex items-center group-hover:translate-x-1 transition-transform">
                        View Details <ArrowRight size={15} className="ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {projectsData.map((project, key) => (
            <motion.div
              key={key}
              layoutId={`project-card-${project.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: key * 0.1 }}
              className="h-full"
            >
              <TiltCard className="group relative bg-card/80 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden shadow-2xl h-full flex flex-col transition-colors hover:border-white/20">
                <Link to={`/project/${project.id}`} className="block h-full flex flex-col relative z-30">
                  <div className="h-48 overflow-hidden relative">
                    {/* Impact badge */}
                    {project.impact && (
                      <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-pop/20 border border-pop/40 text-pop text-[11px] font-bold backdrop-blur-sm shadow-lg">
                        🏆 {project.impact}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent z-10 opacity-80 group-hover:opacity-50 transition-opacity" />
                    <ProjectImage
                      layoutId={`project-image-${project.id}`}
                      src={project.mainImage}
                      alt={project.title}
                      className="w-full h-full"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col bg-card/50">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="font-body px-2 py-0.5 text-xs font-medium rounded-full bg-primary/20 text-primary border border-primary/30">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="font-body px-2 py-0.5 text-xs font-medium rounded-full bg-secondary/50 border border-white/10 text-muted-foreground">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <motion.h3 
                      layoutId={`project-title-${project.id}`}
                      className="font-heading text-xl font-bold mb-2 group-hover:text-pop transition-colors drop-shadow-sm"
                    >
                      {project.title}
                    </motion.h3>
                    <p className="font-body text-muted-foreground text-sm mb-3 line-clamp-2 flex-1">
                      {project.overview}
                    </p>

                    {/* Tech icon row */}
                    <div className="flex gap-2 mb-3">
                      {project.tags.slice(0, 4).map((tag, i) => tagIconMap[tag] ? (
                        <div key={i} title={tag} className="w-6 h-6 flex-shrink-0">
                          <Icon icon={tagIconMap[tag]} width={20} height={20} />
                        </div>
                      ) : null)}
                    </div>

                    <div className="mt-auto pt-3 flex justify-between items-center border-t border-white/5">
                      <span className="text-sm font-bold text-pop flex items-center group-hover:translate-x-1 transition-transform">
                        View Details <ArrowRight size={15} className="ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/GitByHamza"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
