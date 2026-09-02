import React, { useState, useRef, useEffect } from 'react'
import { cn } from '../lib/utils'
import { Icon } from '@iconify/react'
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion'

const skills = [
  { name: 'HTML / CSS',   icon: 'logos:html-5',              level: 85, category: 'frontend' },
  { name: 'JavaScript',   icon: 'logos:javascript',          level: 65, category: 'frontend' },
  { name: 'TypeScript',   icon: 'logos:typescript-icon',     level: 80, category: 'frontend' },
  { name: 'React',        icon: 'logos:react',               level: 80, category: 'frontend' },
  { name: 'Vue 3',        icon: 'logos:vue',                 level: 80, category: 'frontend' },
  { name: 'Nuxt.js (TS)', icon: 'logos:nuxt-icon',           level: 75, category: 'frontend' },
  { name: 'Next.js',      icon: 'logos:nextjs-icon',         level: 85, category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon',    level: 75, category: 'frontend' },
  { name: 'Bootstrap',    icon: 'logos:bootstrap',           level: 75, category: 'frontend' },
  { name: 'Node.js',      icon: 'logos:nodejs-icon',         level: 80, category: 'backend' },
  { name: 'Express',      icon: 'skill-icons:expressjs-light', level: 75, category: 'backend' },
  { name: 'Laravel 12',   icon: 'logos:laravel',             level: 85, category: 'backend' },
  { name: 'PostgreSQL',   icon: 'logos:postgresql',          level: 85, category: 'database' },
  { name: 'MySQL',        icon: 'logos:mysql-icon',          level: 65, category: 'database' },
  { name: 'MongoDB',      icon: 'logos:mongodb-icon',        level: 70, category: 'database' },
  { name: 'Prisma ORM',   icon: 'logos:prisma',              level: 80, category: 'database' },
  { name: 'Git / GitHub', icon: 'logos:git-icon',            level: 90, category: 'tools' },
  { name: 'Docker',       icon: 'logos:docker-icon',         level: 70, category: 'tools' },
  { name: 'VS Code',      icon: 'logos:visual-studio-code',  level: 95, category: 'tools' },
  // ── DevOps / Deployment ──
  { name: 'Vercel',       icon: 'logos:vercel-icon',         level: 90, category: 'devops' },
  { name: 'Supabase',     icon: 'logos:supabase-icon',       level: 80, category: 'devops' },
  { name: 'Linux / VPS',  icon: 'logos:linux-tux',           level: 65, category: 'devops' },
  { name: 'CI / CD',      icon: 'devicon:githubactions',     level: 60, category: 'devops' },
]

// Circular SVG progress ring
const CircularProgress = ({ level, size = 72, stroke = 5 }) => {
  const radius = (size - stroke * 2) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (level / 100) * circumference

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="url(#prog-gradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        />
        <defs>
          <linearGradient id="prog-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(217 91% 64%)" />
            <stop offset="100%" stopColor="hsl(190 100% 50%)" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute text-[11px] font-bold font-heading text-primary">{level}%</span>
    </div>
  )
}

// 3D tilt card (kept from original)
const InteractiveCard = ({ children, className }) => {
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
      className={cn('relative group rounded-xl p-[1px] overflow-hidden', className)}
    >
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: useTransform(
              () => `radial-gradient(300px circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(0,212,255,0.8), transparent 40%)`
            ),
          }}
        />
      )}
      <div className="absolute inset-[1px] bg-card rounded-xl z-0" />
      <div
        style={{ transform: shouldReduceMotion ? 'none' : 'translateZ(10px)' }}
        className="relative z-10 h-full w-full p-5"
      >
        {children}
      </div>
    </motion.div>
  )
}

// Mobile marquee (unchanged logic, visual refresh)
const SkillMarquee = ({ items, direction = 'left' }) => {
  const containerRef = useRef(null)
  const [contentWidth, setContentWidth] = useState(0)
  const x = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const calc = () => {
      if (containerRef.current)
        setContentWidth(containerRef.current.scrollWidth / 3)
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [items])

  useAnimationFrame((_, delta) => {
    if (!isDragging && contentWidth > 0 && !shouldReduceMotion) {
      const pps = 45
      let newX = x.get() + (direction === 'left' ? -1 : 1) * (pps / 1000) * delta
      if (newX <= -contentWidth) newX += contentWidth
      else if (newX > 0) newX -= contentWidth
      x.set(newX)
    }
  })

  return (
    <div className="overflow-hidden w-full relative cursor-grab active:cursor-grabbing">
      <motion.div
        ref={containerRef}
        style={{ x }}
        drag="x"
        dragMomentum={false}
        dragConstraints={{ left: -10000, right: 10000 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        className="flex gap-4 w-max"
      >
        {[...items, ...items, ...items].map((skill, key) => (
          <div
            key={`${skill.name}-${key}`}
            className="bg-card/50 backdrop-blur-sm p-4 rounded-xl shadow-sm w-56 flex-shrink-0 select-none border border-white/5 group-hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <Icon icon={skill.icon} width={22} height={22} className="flex-shrink-0" />
              <h3 className="font-heading font-semibold text-base pointer-events-none">{skill.name}</h3>
            </div>
            <div className="w-full bg-secondary/30 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary to-pop h-1.5 rounded-full"
                style={{ width: `${skill.level}%` }}
              />
            </div>
            <div className="text-right mt-1">
              <span className="text-xs text-muted-foreground font-body">{skill.level}%</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const categories = ['all', 'frontend', 'backend', 'database', 'tools', 'devops']
  const filteredSkills = skills.filter(
    (s) => activeCategory === 'all' || s.category === activeCategory
  )

  return (
    <section id="skills" className="py-24 px-4 relative perspective-[1000px]">
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center font-heading"
        >
          My{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pop text-glow">
            Skills
          </span>
        </motion.h2>

        {/* Category filters — animated pill */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'relative px-6 py-2 rounded-full transition-all duration-300 capitalize font-medium border text-sm font-body',
                activeCategory === cat
                  ? 'text-primary border-primary/50'
                  : 'bg-secondary/30 text-foreground border-white/5 hover:border-white/20 hover:bg-secondary/50'
              )}
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="skill-tab-bg"
                  className="absolute inset-0 rounded-full bg-primary/15 shadow-[0_0_12px_rgba(79,142,247,0.25)]"
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Mobile marquee */}
        <div className="md:hidden flex flex-col gap-6">
          <SkillMarquee items={filteredSkills} direction="left" />
          <SkillMarquee items={filteredSkills} direction="right" />
        </div>

        {/* Desktop grid */}
        <motion.div
          layout
          className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.3 }}
              >
                <InteractiveCard className="bg-card shadow-md hover:shadow-primary/15 transition-shadow duration-300 h-full">
                  {/* Icon + Name */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary/50 border border-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Icon icon={skill.icon} width={22} height={22} />
                      </div>
                      <h3 className="font-heading font-semibold text-foreground group-hover:text-pop transition-colors text-base">
                        {skill.name}
                      </h3>
                    </div>
                    <CircularProgress level={skill.level} />
                  </div>

                  {/* Bar */}
                  <div className="w-full bg-secondary/30 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-pop h-1.5 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: 0.15, ease: 'easeOut' }}
                    />
                  </div>
                </InteractiveCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsSection

