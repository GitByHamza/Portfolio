import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useReducedMotion } from "framer-motion"
import Lenis from "lenis"
import Home from "./pages/Home"
import Error404 from "./pages/Error404"
import ProjectDetails from "./pages/ProjectDetails"
import AdminDashboard from "./pages/AdminDashboard"
import TermsOfService from "./pages/TermsOfService"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import { Footer } from "./components/Footer"
import Navbar from "./components/Navbar"
import AuroraBackground from "./components/AuroraBackground"
import PageCurtain from "./components/PageCurtain"

import CustomCursor from "./components/CustomCursor"

function SmoothScroll() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [shouldReduceMotion]);

  return null;
}

// Layout wrapper for portfolio pages (non-admin)
const MainLayout = () => (
  <>
    <AuroraBackground />
    <Navbar />
    <Outlet />
    <Footer />
  </>
)

function App() {
  return (
    <>
      <PageCurtain />
      <SmoothScroll />
      <BrowserRouter>
        <Routes>
          {/* Admin: No navbar/footer, standalone page */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Portfolio pages: shared layout */}
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
