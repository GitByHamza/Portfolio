import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom"
import Home from "./pages/Home"
import Error404 from "./pages/Error404"
import ProjectDetails from "./pages/ProjectDetails"
import AdminDashboard from "./pages/AdminDashboard"
import TermsOfService from "./pages/TermsOfService"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import { Footer } from "./components/Footer"
import Navbar from "./components/Navbar"
import StarBackground from "./components/StarBackground"

// Layout wrapper for portfolio pages (non-admin)
const MainLayout = () => (
  <>
    <StarBackground />
    <Navbar />
    <Outlet />
    <Footer />
  </>
)

function App() {
  return (
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
  )
}

export default App
