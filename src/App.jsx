import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Error404 from "./pages/Error404"
import ProjectDetails from "./pages/ProjectDetails"
import { Footer } from "./components/Footer"
import Navbar from "./components/Navbar"
import StarBackground from "./components/StarBackground"
import ThemeToggle from "./components/ThemeToggle"

function App() {

 return (
  <>
   <BrowserRouter>
    <StarBackground />
    <Navbar />
    <Routes>
     <Route index element={<Home />} />
     <Route path="/project/:id" element={<ProjectDetails />} />
     <Route path="*" element={<Error404 />} />
    </Routes>
    <Footer />
   </BrowserRouter>
  </>
 )
}

export default App
