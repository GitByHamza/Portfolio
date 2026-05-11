import { Briefcase, Code, User } from 'lucide-react'
import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { cn } from '../lib/utils'

const Highlight = ({ children }) => (
  <span className="text-foreground font-semibold hover:text-pop transition-colors duration-300 cursor-default relative group">
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pop transition-all duration-300 group-hover:w-full" />
  </span>
)

const AboutSection = () => {
 const ref = useRef(null);
 const x = useMotionValue(0);
 const y = useMotionValue(0);
 const shouldReduceMotion = useReducedMotion();

 const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
 const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

 const handleMouseMove = (e) => {
   if (!ref.current || shouldReduceMotion) return;
   const rect = ref.current.getBoundingClientRect();
   const mouseX = e.clientX - rect.left;
   const mouseY = e.clientY - rect.top;
   x.set(mouseX);
   y.set(mouseY);
 };

 return (
  <section 
    id='about' 
    ref={ref}
    onMouseMove={handleMouseMove}
    className='py-24 px-4 relative overflow-hidden'
  >
   {/* Interactive Spotlight */}
   {!shouldReduceMotion && (
     <motion.div
       className="absolute inset-0 pointer-events-none opacity-50 z-0"
       style={{
         background: useTransform(
           [mouseXSpring, mouseYSpring],
           ([latestX, latestY]) => `radial-gradient(600px circle at ${latestX}px ${latestY}px, rgba(79, 142, 247, 0.08), transparent 40%)`
         ),
       }}
     />
   )}

   <div className="container mx-auto max-w-5xl relative z-10">
    <motion.h2 
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.5 }}
     className='font-heading text-3xl md:text-5xl font-bold mb-16 text-center'
    >
     About
     <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary to-pop drop-shadow-md ml-3'>Me</span>
    </motion.h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
     <motion.div 
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className='space-y-6 text-left'
     >
      <h3 className='font-heading text-2xl md:text-3xl font-semibold leading-snug'>
       Passionate <span className="text-primary">Full Stack</span> Developer
      </h3>

      <p className='font-body text-muted-foreground text-justify md:text-left leading-relaxed text-lg'>
       I am a dedicated developer with a strong foundation in the <Highlight>MERN stack</Highlight> and modern web technologies. My journey involves not just writing code, but solving real-world problems through efficient, scalable, and user-friendly solutions. I strive to create digital experiences that are not only functional but also visually compelling.
      </p>
      <p className='font-body text-muted-foreground text-justify md:text-left leading-relaxed text-lg'>
       From migrating legacy systems to modern architectures like <Highlight>Vue 3</Highlight> and <Highlight>Laravel 12</Highlight>, to building real-time chat applications and complex SaaS platforms, I love tackling challenges that push my boundaries. I am constantly learning and adapting to the latest industry trends to deliver the best possible results for every project.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-start">
       <a href="#contact-footer" className='font-body cosmic-button text-center w-full sm:w-auto shadow-lg shadow-primary/20 hover:shadow-pop/30'>Get In Touch</a>
       <a href="#" className='font-body px-8 py-3 rounded-full border border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary transition-all duration-300 text-center w-full sm:w-auto backdrop-blur-sm'>Download CV</a>
      </div>
     </motion.div>

     <motion.div 
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid grid-cols-1 gap-6"
     >
      {[
        { icon: Code, title: "Web Development", desc: "Building responsive, high-performance web applications with modern frameworks and best practices." },
        { icon: User, title: "New Technologies", desc: "Always exploring and mastering bleeding-edge tech like Nuxt, Next.js, and Cloud services." },
        { icon: Briefcase, title: "Projects", desc: "Delivering end-to-end solutions, from concept to deployment, ensuring scalability and maintainability." }
      ].map((item, index) => (
        <div key={index} className="group relative bg-card/50 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,142,247,0.1)] hover:-translate-y-1 overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
         <div className="flex items-start gap-5 relative z-10">
          <div className="p-3.5 rounded-2xl bg-secondary/50 group-hover:bg-primary/20 transition-colors duration-300 border border-white/5 group-hover:border-primary/20 shadow-inner">
           <item.icon className='h-6 w-6 text-primary group-hover:text-pop transition-colors duration-300' />
          </div>
          <div className="text-left">
           <h4 className='font-heading font-semibold text-xl mb-1 text-foreground group-hover:text-primary transition-colors'>{item.title}</h4>
           <p className='font-body text-muted-foreground/80 leading-relaxed text-sm'>{item.desc}</p>
          </div>
         </div>
        </div>
      ))}
     </motion.div>
    </div>
   </div>
  </section>
 )
}

export default AboutSection
