import { BrowserRouter, Route, Routes, Outlet, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'

import Home from './pages/Home'
import Work from './pages/Work'
import About from './pages/About'
import Contact from './pages/Contact'
import Solutions from './pages/Solutions'
import TechRetailSolution from './pages/solutions/TechRetailSolution'
import TechRetailTerms from './pages/solutions/TechRetailTerms'
import ProjectDetails from './pages/ProjectDetails'
import AdminDashboard from './pages/AdminDashboard'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Error404 from './pages/Error404'

import Navbar from './components/Navbar'
import { Footer } from './components/Footer'
import PageCurtain from './components/PageCurtain'
import { LanguageProvider } from './context/LanguageContext'
import { ScrollProgress } from './components/motion/MotionReveal'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // 1. Immediately reset Lenis smooth scroll engine position to 0
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true })
    }
    // 2. Immediately reset native browser scroll position
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])

  return null
}

function SmoothScroll() {
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) return

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    window.__lenis = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      delete window.__lenis
      lenis.destroy()
    }
  }, [shouldReduceMotion])

  return null
}

// Layout wrapper for all editorial pages
const MainLayout = () => (
  <div className="w-full bg-[#F6F5F0] dark:bg-[#0F0F11] text-[#0F0F0F] dark:text-[#EDECE6] min-h-screen flex flex-col justify-between transition-colors duration-200">
    <Navbar />
    <div className="flex-1 w-full">
      <Outlet />
    </div>
    <Footer />
  </div>
)

function App() {
  useEffect(() => {
    // Prevent browser from restoring old scroll offset on client navigation
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // Initial theme sync: default to Light unless user explicitly chose Dark
    const savedTheme = localStorage.getItem('Theme')
    if (savedTheme === 'Dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <LanguageProvider>
      <PageCurtain />
      <SmoothScroll />
      <ScrollProgress />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Admin Dashboard: Standalone */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Main Editorial & Solution Pages */}
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:id" element={<ProjectDetails />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/tech-retail" element={<TechRetailSolution />} />
            <Route path="/solutions/tech-retail/terms" element={<TechRetailTerms />} />
            
            {/* Quick Shareable Redirects for WhatsApp / Marketing */}
            <Route path="/offer" element={<Navigate to="/solutions/tech-retail" replace />} />
            <Route path="/offer/tech-retail" element={<Navigate to="/solutions/tech-retail" replace />} />

            {/* Legal */}
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
