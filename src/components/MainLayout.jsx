import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { Footer } from './Footer'

// Layout wrapper for all editorial pages. Also used by src/entry-legal.jsx to
// prerender the legal pages with the same header and footer.
const MainLayout = () => (
  <div className="w-full bg-[#F6F5F0] dark:bg-[#0F0F11] text-[#0F0F0F] dark:text-[#EDECE6] min-h-screen flex flex-col justify-between transition-colors duration-200">
    <Navbar />
    <div id="page-content" className="flex-1 w-full" tabIndex={-1}>
      <Outlet />
    </div>
    <Footer />
  </div>
)

export default MainLayout
