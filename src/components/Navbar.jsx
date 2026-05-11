import ThemeToggle from './ThemeToggle'
import OnboardingTooltip from './OnboardingTooltip'
import { useState, useEffect } from 'react'
import { X, Menu } from 'lucide-react'
import { cn } from '../lib/utils'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const Navbar = () => {
 const navItems = [
  { name: "Home", href: "/#hero" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/#projects" },
  { name: "Contact", href: "#contact-footer" },
 ]
 const [isScroll, setIsScroll] = useState(false)
 const [isMenuOpen, setIsMenuOpen] = useState(false)
 const shouldReduceMotion = useReducedMotion()

 useEffect(() => {
  const handleScroll = () => {
   setIsScroll(window.scrollY > 10)
  }
  window.addEventListener("scroll", handleScroll)

  return () => window.removeEventListener("scroll", handleScroll)
 }, [])

 return (
  <nav className="fixed top-0 w-full z-40 flex justify-center pointer-events-none px-4 mt-2 md:mt-4 transition-all">
   {/* Floating Island for Desktop, Full Width Header for Mobile */}
   <div className={cn(
     "pointer-events-auto flex items-center justify-between transition-all duration-500",
     "w-full md:w-auto md:px-8 md:py-3 md:rounded-full",
     isScroll ? "bg-background/80 backdrop-blur-xl shadow-2xl border border-white/5 py-3 px-4 rounded-2xl md:bg-background/70 md:border-white/10" : "py-4 md:bg-transparent md:shadow-none md:border-transparent md:backdrop-blur-none"
   )}>
    <a href="/#hero" className='text-xl font-bold text-primary flex items-center mr-8'>
     <span className='relative z-10 font-body'>
      <span className='font-heading text-glow text-foreground'>TexCodes</span> By Hamza
     </span>
    </a>

    {/* Desktop Menu Navbar */}
    <div className='hidden md:flex items-center space-x-8'>
     {navItems.map((item, key) => (
      <a key={key} href={item.href} className='font-body text-sm text-foreground/80 hover:text-primary transition-colors duration-300'>{item.name}</a>
     ))}
     <div className="pl-4 border-l border-border/50">
       <ThemeToggle />
     </div>
    </div>

    {/* Mobile Menu Toggle & Onboarding Anchor */}
    <div className="flex md:hidden items-center">
     <div className="relative z-50">
      <button onClick={() => setIsMenuOpen((prev) => !prev)}
       className='p-2 text-foreground focus:outline-none'
       aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}>
       {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <OnboardingTooltip />
     </div>
    </div>
   </div>

   {/* Mobile Menu Full-Width Drawer */}
   <AnimatePresence>
    {isMenuOpen && (
     <motion.div 
       initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: "-100%" }}
       animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
       exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: "-100%" }}
       transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
       className="fixed inset-0 bg-background/95 backdrop-blur-xl z-30 flex flex-col pt-32 px-6 pointer-events-auto md:hidden"
     >
      <div className='flex flex-col space-y-6 text-2xl font-body items-start'>
       {navItems.map((item, key) => (
        <motion.a 
         key={key}
         initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ delay: 0.1 + key * 0.1 }}
         href={item.href}
         className='font-heading font-bold text-foreground hover:text-primary transition-colors duration-300 w-full pb-4 border-b border-border/30'
         onClick={() => setIsMenuOpen(false)}>
         {item.name}
        </motion.a>
       ))}

       {/* Mobile Theme Toggle */}
       <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="pt-8 w-full flex justify-between items-center"
       >
        <span className="text-sm text-muted-foreground">Switch Theme</span>
        <ThemeToggle className="static p-3 bg-secondary/30" />
       </motion.div>
      </div>
     </motion.div>
    )}
   </AnimatePresence>
  </nav>
 )
}

export default Navbar
