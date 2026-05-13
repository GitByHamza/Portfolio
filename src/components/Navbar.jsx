import ThemeToggle from './ThemeToggle'
import OnboardingTooltip from './OnboardingTooltip'
import Magnetic from './Magnetic'
import { useState, useEffect } from 'react'
import { X, Menu } from 'lucide-react'
import { cn } from '../lib/utils'
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring } from 'framer-motion'

const Navbar = () => {
  const navItems = [
    { name: 'Home',     href: '/#hero',           sectionId: 'hero' },
    { name: 'About',    href: '/#about',          sectionId: 'about' },
    { name: 'Skills',   href: '/#skills',         sectionId: 'skills' },
    { name: 'Projects', href: '/#projects',       sectionId: 'projects' },
    { name: 'Contact',  href: '#contact-footer',  sectionId: 'contact-footer' },
  ]

  const [isScroll, setIsScroll] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const shouldReduceMotion = useReducedMotion()

  // Scroll progress bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Navbar background on scroll
  useEffect(() => {
    const handleScroll = () => setIsScroll(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Active section tracker via IntersectionObserver
  useEffect(() => {
    const sectionIds = navItems.map((i) => i.sectionId)
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.25, rootMargin: '-10% 0px -65% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* ─── Scroll Progress Bar ─── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-pop to-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      <nav className="fixed top-0 w-full z-40 flex justify-center pointer-events-none px-4 mt-2 md:mt-4 transition-all">
        <div
          className={cn(
            'pointer-events-auto flex items-center justify-between transition-all duration-500',
            'w-full md:w-auto md:px-8 md:py-3 md:rounded-full',
            isScroll
              ? 'bg-background/80 backdrop-blur-xl shadow-2xl border border-white/5 py-3 px-4 rounded-2xl md:bg-background/70 md:border-white/10'
              : 'py-4 md:bg-transparent md:shadow-none md:border-transparent md:backdrop-blur-none'
          )}
        >
          {/* Logo */}
          <Magnetic>
            <a href="/#hero" className="text-xl font-bold text-primary flex items-center mr-8">
              <span className="relative z-10 font-body">
                <span className="font-heading text-glow text-foreground">TexCodes</span> By Hamza
              </span>
            </a>
          </Magnetic>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  'relative font-body text-sm px-3 py-1.5 rounded-full transition-colors duration-300',
                  activeSection === item.sectionId
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-foreground'
                )}
              >
                {item.name}
                {activeSection === item.sectionId && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}

            <div className="pl-4 border-l border-border/50 flex items-center gap-3">
              <ThemeToggle />
              {/* Hire Me CTA */}
              <Magnetic>
                <a
                  href="#contact-footer"
                  className="cosmic-button py-1.5 px-5 text-sm font-body"
                >
                  Hire Me 🚀
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center">
            <div className="relative z-50">
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="p-2 text-foreground focus:outline-none"
                aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <OnboardingTooltip />
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: '-100%' }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: '-100%' }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 bg-background/95 backdrop-blur-xl z-30 flex flex-col pt-32 px-6 pointer-events-auto md:hidden"
            >
              <div className="flex flex-col space-y-6 text-2xl font-body items-start">
                {navItems.map((item, key) => (
                  <motion.a
                    key={item.name}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + key * 0.08 }}
                    href={item.href}
                    className={cn(
                      'font-heading font-bold transition-colors duration-300 w-full pb-4 border-b border-border/30',
                      activeSection === item.sectionId
                        ? 'text-primary'
                        : 'text-foreground hover:text-primary'
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}

                {/* Hire Me — mobile */}
                <motion.a
                  href="#contact-footer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="cosmic-button w-full text-center mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Hire Me 🚀
                </motion.a>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="pt-6 w-full flex justify-between items-center"
                >
                  <span className="text-sm text-muted-foreground">Switch Theme</span>
                  <ThemeToggle className="static p-3 bg-secondary/30" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}

export default Navbar
