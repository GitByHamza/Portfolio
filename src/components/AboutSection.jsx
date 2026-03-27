import { Briefcase, Code, User } from 'lucide-react'
import React from 'react'

const AboutSection = () => {
 return (
  <section id='about' className='py-24 px-4 relative'>
   <div className="container mx-auto max-w-5xl ">
    <h2 className='font-heading text-3xl md:text-4xl font-bold mb-12 text-center'>
     About
     <span className='text-primary'> Me</span>
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
     <div className='space-y-6 text-left'>
      <h3 className='font-heading text-2xl font-semibold'>Passionate Full Stack Developer</h3>

      <p className='font-body text-muted-foreground text-justify'>
       I am a dedicated developer with a strong foundation in the MERN stack and modern web technologies. My journey involves not just writing code, but solving real-world problems through efficient, scalable, and user-friendly solutions. I strive to create digital experiences that are not only functional but also visually compelling.
      </p>
      <p className='font-body text-muted-foreground text-justify'>
       From migrating legacy systems to modern architectures like Vue 3 and Laravel 12, to building real-time chat applications and complex SaaS platforms, I love tackling challenges that push my boundaries. I am constantly learning and adapting to the latest industry trends to deliver the best possible results for every project.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-start">
       <a href="#contact-footer" className='font-body cosmic-button text-center' >Get In Touch</a>
       <a href="#" className='font-body px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 text-center' >Download CV</a>
      </div>
     </div>
     <div className="grid grid-cols gap-6">
      <div className="gradient-border p-6 card-hover animate-glow-breathe">
       <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10">
         <Code className='h-6 text-primary' />
        </div>
        <div className="text-left">
         <h4 className='font-heading font-semibold text-lg'>Web Development</h4>
         <p className='font-body text-muted-foreground'>Building responsive, high-performance web applications with modern frameworks and best practices.</p>
        </div>
       </div>
      </div>
      <div className="gradient-border p-6 card-hover animate-glow-breathe">
       <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10">
         <User className='h-6 text-primary' />
        </div>
        <div className="text-left">
         <h4 className='font-heading font-semibold text-lg'>New Technologies</h4>
         <p className='font-body text-muted-foreground'>Always exploring and mastering bleeding-edge tech like Nuxt, Next.js, and Cloud services.</p>
        </div>
       </div>
      </div>
      <div className="gradient-border p-6 card-hover animate-glow-breathe">
       <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10">
         <Briefcase className='h-6 text-primary' />
        </div>
        <div className="text-left">
         <h4 className='font-heading font-semibold text-lg'>Projects</h4>
         <p className='font-body text-muted-foreground'>Delivering end-to-end solutions, from concept to deployment, ensuring scalability and maintainability.</p>
        </div>
       </div>
      </div>

     </div>
    </div>
   </div>
  </section>
 )
}

export default AboutSection
