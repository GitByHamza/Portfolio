import { Briefcase, Code, User, Calendar } from 'lucide-react'
import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { cn } from '../lib/utils'

const Highlight = ({ children }) => (
  <span className="text-foreground font-semibold hover:text-pop transition-colors duration-300 cursor-default relative group">
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pop transition-all duration-300 group-hover:w-full" />
  </span>
)

const experience = [
  {
    year: '2025 – Present',
    role: 'Full Stack Developer',
    company: 'MYLS — Switzerland',
    tech: 'Vue 3, Nuxt TS, Laravel 12',
    color: 'bg-primary',
  },
  {
    year: '2026',
    role: 'Full Stack Developer',
    company: 'Freelance / AI Projects',
    tech: 'WhatsApp AI Receptionist, CRM, Appointment Booking',
    color: 'bg-pop',
  },
]

const AboutSection = () => {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const shouldReduceMotion = useReducedMotion()

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  const handleMouseMove = (e) => {
    if (!ref.current || shouldReduceMotion) return
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
  }

  return (
    <section
      id="about"
      ref={ref}
      onMouseMove={handleMouseMove}
      className="py-24 px-4 relative overflow-hidden"
    >
      {/* Spotlight */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-40 z-0"
          style={{
            background: useTransform(
              [mouseXSpring, mouseYSpring],
              ([lx, ly]) =>
                `radial-gradient(600px circle at ${lx}px ${ly}px, rgba(79,142,247,0.09), transparent 40%)`
            ),
          }}
        />
      )}

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-heading text-3xl md:text-5xl font-bold mb-16 text-center"
        >
          About{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pop drop-shadow-md">
            Me
          </span>
        </motion.h2>

        {/* ─── Bio + Feature Cards ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-left"
          >
            <h3 className="font-heading text-2xl md:text-3xl font-semibold leading-snug">
              Passionate <span className="text-primary">Full Stack</span> Developer
            </h3>
            <p className="font-body text-muted-foreground text-justify md:text-left leading-relaxed text-lg">
              I am a dedicated developer specializing in high-performance web solutions. 
              With specialized experience at <Highlight>MYLS Platform</Highlight> and a focused freelance background, 
              I transform complex requirements into scalable digital realities, specifically in the realms of <Highlight>E-commerce platforms</Highlight> and <Highlight>AI Automation Agents</Highlight>.
            </p>
            <p className="font-body text-muted-foreground text-justify md:text-left leading-relaxed text-lg">
              My expertise spans modern architectures like <Highlight>Vue 3</Highlight>, <Highlight>Nuxt TS</Highlight>, and <Highlight>Laravel 12</Highlight>. 
              I love tackling technical challenges that push boundaries and deliver real-world business impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#contact-footer"
                className="font-body cosmic-button text-center w-full sm:w-auto shadow-lg shadow-primary/20"
              >
                Get In Touch
              </a>
              <a
                href="#"
                className="font-body px-8 py-3 rounded-full border border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary transition-all duration-300 text-center w-full sm:w-auto backdrop-blur-sm"
              >
                Download CV
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-1 gap-5"
          >
            {[
              { icon: Code,     title: 'Web Development', desc: 'Building responsive, high-performance web applications with modern frameworks and best practices.' },
              { icon: User,     title: 'New Technologies', desc: 'Always exploring and mastering bleeding-edge tech like Nuxt, Next.js, and Cloud services.' },
              { icon: Briefcase,title: 'Projects',         desc: 'Delivering end-to-end solutions, from concept to deployment, ensuring scalability and maintainability.' },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative bg-card/50 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,142,247,0.1)] hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="flex items-start gap-5 relative z-10">
                  <div className="p-3.5 rounded-2xl bg-secondary/50 group-hover:bg-primary/20 transition-colors duration-300 border border-white/5 group-hover:border-primary/20">
                    <item.icon className="h-6 w-6 text-primary group-hover:text-pop transition-colors duration-300" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-heading font-semibold text-xl mb-1 text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="font-body text-muted-foreground/80 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ─── Experience Timeline ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Calendar size={20} className="text-primary" />
            <h3 className="font-heading text-2xl font-bold text-foreground">Experience</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
          </div>

          <div className="space-y-4">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative flex gap-5 group"
              >
                {/* Dot + line */}
                <div className="flex flex-col items-center">
                  <div className={cn('w-3 h-3 rounded-full mt-1.5 flex-shrink-0', exp.color)} />
                  {index < experience.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-white/20 to-transparent mt-1" />
                  )}
                </div>

                {/* Card */}
                <div className="pb-6 flex-1 bg-card/30 backdrop-blur-sm border border-white/5 p-5 rounded-2xl group-hover:border-primary/20 transition-colors hover:bg-card/50">
                  <span className="text-xs font-body text-muted-foreground tracking-widest uppercase mb-1 block">
                    {exp.year}
                  </span>
                  <div className="font-heading font-bold text-foreground text-lg">{exp.role}</div>
                  <div className="font-body text-primary text-sm mt-0.5">{exp.company}</div>
                  <div className="font-body text-xs text-muted-foreground mt-2 px-2 py-1 bg-secondary/30 rounded-full inline-block border border-white/5">
                    {exp.tech}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
