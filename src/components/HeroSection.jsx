import React, { Suspense, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { useDarkMode } from '../hooks/useDarkMode'
import Magnetic from './Magnetic'

const HeroScene3D = React.lazy(() => import('./HeroScene3D'))

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion()
  const [particlesReady, setParticlesReady] = useState(false)
  const isDark = useDarkMode()

  // Particle colors — dark navy in light mode, bright blue/cyan in dark mode
  const particleColors = isDark ? ['#4F8EF7', '#00D4FF'] : ['#1e3a8a', '#1d4ed8']
  const linkColor      = isDark ? '#4F8EF7' : '#1e3a8a'

  useEffect(() => {
    if (shouldReduceMotion) return
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setParticlesReady(true))
  }, [shouldReduceMotion])

  const particlesOptions = {
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    interactivity: {
      events: { onHover: { enable: true, mode: 'grab' } },
      modes: { grab: { distance: 140, links: { opacity: 0.3 } } },
    },
    particles: {
      color: { value: particleColors },
      links: { color: linkColor, distance: 140, enable: true, opacity: isDark ? 0.08 : 0.18, width: 1 },
      move: { enable: true, speed: 0.6, random: true, straight: false },
      number: { density: { enable: true, area: 1000 }, value: 55 },
      opacity: { value: isDark ? 0.35 : 0.55 },
      size: { value: { min: 1, max: 2.5 } },
    },
    detectRetina: true,
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.14, delayChildren: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } },
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-4 overflow-hidden"
    >
      {/* Particles */}
      {particlesReady && !shouldReduceMotion && (
        <Particles
          id="hero-particles"
          options={particlesOptions}
          className="absolute inset-0 z-0"
        />
      )}

      <div className="container max-w-6xl mx-auto z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen py-32">

          {/* ─── Left: Text Content ─── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left space-y-7"
          >
            {/* Available badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/30 border border-white/5 backdrop-blur-md shadow-lg"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pop" />
              </span>
              <span className="text-sm font-body text-foreground/90 font-medium">Available for new opportunities</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-[4.2rem] font-bold tracking-tight font-heading leading-[1.08]"
            >
              <span className="block text-foreground drop-shadow-sm">Hi, I'm</span>
              <Magnetic>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-pop to-primary bg-[length:200%_auto] animate-gradient-flow pb-1 cursor-default">
                  Hamza
                </span>
              </Magnetic>
              <span className="block text-foreground/80 text-3xl md:text-4xl font-medium mt-1">
                I build{' '}
                <TypeAnimation
                  sequence={[
                    'SaaS Platforms', 2400,
                    'AI Automations', 2400,
                    'Admin Dashboards', 2400,

                    'Full Stack Apps', 2400,
                    'Problem Solutions', 2400,
                  ]}
                  wrapper="span"
                  speed={55}
                  deletionSpeed={75}
                  repeat={Infinity}
                  className="text-pop"
                />
              </span>
            </motion.h1>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="font-body text-lg text-muted-foreground max-w-lg leading-relaxed"
            >
              With specialized experience at <strong className="text-foreground">MYLS Platform</strong> and a proven track record in freelance development, I build high-performance <strong className="text-foreground">E-commerce applications and AI Automation Agents</strong> using modern tech stacks.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-1">
              <Magnetic>
                <a href="#projects" className="cosmic-button flex items-center gap-2">
                  Explore My Work
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact-footer"
                  className="px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-secondary/50 border border-white/10 backdrop-blur-sm text-foreground flex items-center gap-2 hover:border-white/30 hover:shadow-lg"
                >
                  Let's Talk
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* ─── Right: 3D Scene ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="hidden lg:flex items-center justify-center relative h-[750px] w-full"
          >
            {/* Glow behind sphere */}
            <div className="absolute w-[800px] h-[800px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />

            {/* R3F Canvas — expanded to prevent clipping */}
            <div className="w-[800px] h-[800px] relative bg-transparent overflow-visible border-none outline-none shadow-none">
              {!shouldReduceMotion && (
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full border-2 border-primary/20 animate-spin border-t-primary" />
                    </div>
                  }
                >
                  <HeroScene3D />
                </Suspense>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
      >
        <span className="text-[10px] tracking-widest uppercase text-muted-foreground mb-3 font-body">
          Scroll to explore
        </span>
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-1 bg-background/50 backdrop-blur-sm"
        >
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-pop"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
