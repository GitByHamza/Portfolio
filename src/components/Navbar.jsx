import ThemeToggle from './ThemeToggle'
import OnboardingTooltip from './OnboardingTooltip'
import { useState, useEffect } from 'react'
import { X, Menu } from 'lucide-react'
import { cn } from '../lib/utils'

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

 useEffect(() => {
  const handleScroll = () => {
   setIsScroll(window.scrollY > 10)
  }
  window.addEventListener("scroll", handleScroll)

  return () => window.removeEventListener("scroll", handleScroll)
 }, [])

 return (
  <nav className={cn("fixed w-full z-40 transition-all duration-300 flex justify-center", isScroll ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5")}>
   <div className="container px-4 flex items-center justify-between mx-auto">
    <a href="/#hero" className='text-xl font-bold text-primary flex items-center'>
     <span className='relative z-10 font-body'>
      <span className='font-heading text-glow text-foreground'>TexCodes</span> By Hamza
     </span>
    </a>

    {/* Desktop Menu Navbar */}
    <div className='hidden md:flex space-x-8'>
     {navItems.map((item, key) => (
      <a key={key} href={item.href} className='font-body text-foreground/80 hover:text-primary transition-colors duration-300'>{item.name}</a>
     ))}
    </div>

    {/* Right Side Actions */}
    <div className="flex items-center">
     <ThemeToggle className="hidden md:flex" />

     {/* Mobile Menu Toggle & Onboarding Anchor */}
     <div className="md:hidden relative z-50">
      <button onClick={() => setIsMenuOpen((prev) => !prev)}
       className='p-2 text-foreground'
       aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}>
       {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <OnboardingTooltip />
     </div>
    </div>

    {/* Mobile Menu Backdrop & Content */}
    <div className={cn("fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col justify-center items-center transition-all duration-300 md:hidden", isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")}>

     <div className='flex flex-col space-y-8 text-xl font-body items-center'>
      {navItems.map((item, key) => (
       <a key={key}
        href={item.href}
        className='font-body text-foreground/80 hover:text-primary transition-colors duration-300'
        onClick={() => setIsMenuOpen(false)}>
        {item.name}
       </a>
      ))}

      {/* Mobile Theme Toggle */}
      <div className="pt-8 border-t border-border/50 w-full flex justify-center">
       <ThemeToggle className="static p-3 bg-secondary/30" />
      </div>
     </div>
    </div>
   </div>

  </nav>
 )
}

export default Navbar
