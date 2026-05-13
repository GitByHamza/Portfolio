import React from 'react'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import SkillsSection from '../components/SkillsSection'
import ProjectsSection from '../components/ProjectsSection'
import TestimonialsSection from '../components/TestimonialsSection'

const Home = () => {
  return (
    <>
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <TestimonialsSection />
      </main>
    </>
  )
}

export default Home
