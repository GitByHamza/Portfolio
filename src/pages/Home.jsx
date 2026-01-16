import React from 'react'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import SkillsSection from '../components/SkillsSection'
import ProjectsSection from '../components/ProjectsSection'

const Home = () => {
 return (
  <>
   {/* Main Content */}
   <main>
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
   </main>
  </>
 )
}

export default Home
