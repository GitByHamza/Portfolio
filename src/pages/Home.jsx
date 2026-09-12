import React from 'react'
import HeroSection from '../components/HeroSection'
import ProjectsSection from '../components/ProjectsSection'
import SolutionsBridgeSection from '../components/SolutionsBridgeSection'
import AboutSection from '../components/AboutSection'
import ClosingSection from '../components/ClosingSection'

const Home = () => {
  return (
    <main className="w-full bg-[#F6F5F0]">
      <HeroSection />
      <ProjectsSection />
      <SolutionsBridgeSection />
      <AboutSection />
      <ClosingSection />
    </main>
  )
}

export default Home
