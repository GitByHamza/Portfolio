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
     <div className='space-y-6'>
      <h3 className='font-heading text-2xl font-semibold'>Passionate Web Devloper</h3>

      <p className='font-body text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, veritatis alias. Quae odio praesentium explicabo! Porro harum repellendus iste similique nesciunt hic incidunt illum voluptates!P</p>
      <p className='font-body text-muted-foreground'>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quas error distinctio explicabo perspiciatis! Praesentium tenetur perferendis beatae dolore eum quibusdam, vitae animi eos adipisci aut repudiandae tempora at quos?
      </p>
      <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
       <a href="#contact" className='font-body cosmic-button' >Get In Touch</a>
       <a href="" className='font-body px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300' >Download CV</a>
      </div>
     </div>
     <div className="grid grid-cols gap-6">
      <div className="gradient-border p-6 card-hover animate-glow-breathe">
       <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10">
         <Code className='h-6 text-primary' />
        </div>
        <div className="text-left">
         <h4 className='font-heading font-semibold text-lg'>Web Developement</h4>
         <p className='font-body text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat omnis delectus nisi odit sint aut.</p>
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
         <p className='font-body text-muted-foreground'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo ipsa dicta tempora nesciunt eaque! Quisquam autem officia rem vel dolore!</p>
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
         <p className='font-body text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat omnis delectus nisi odit sint aut.</p>
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
