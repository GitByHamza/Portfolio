import React from "react";
import { ArrowDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const HeroSection = () => {
 const shouldReduceMotion = useReducedMotion();

 const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
     opacity: 1,
     transition: {
       staggerChildren: 0.15,
       delayChildren: 0.4,
     },
   },
 };

 const itemVariants = {
   hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } },
 };

 return (
  <section
   id="hero"
   className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
  >
   <div className="container max-w-5xl mx-auto text-center z-10">
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
      className="space-y-8 flex flex-col items-center"
    >
     <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/30 border border-white/5 backdrop-blur-md mb-2 shadow-lg">
       <span className="relative flex h-2.5 w-2.5">
         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
         <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pop"></span>
       </span>
       <span className="text-sm font-body text-foreground/90 font-medium">Available for new opportunities</span>
     </motion.div>

     <motion.h1
      variants={itemVariants}
      className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight font-heading leading-[1.1]"
     >
      <span className="block text-foreground drop-shadow-sm">Crafting Digital</span>
      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-pop to-primary animate-gradient-flow bg-[length:200%_auto] pb-2 drop-shadow-lg">Experiences.</span>
     </motion.h1>

     <motion.p
      variants={itemVariants}
      className="text-justify font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto md:text-center leading-relaxed"
     >
      Hi, I'm <strong className="text-foreground">Hamza (TexCodes)</strong>. I transform complex requirements into seamless, high-performance web applications using modern stacks like Next.js, Vue 3, and Laravel.
     </motion.p>

     <motion.div
      variants={itemVariants}
      className="pt-6 flex flex-wrap justify-center gap-4"
     >
      <a href="#projects" className="cosmic-button flex items-center gap-2">
       Explore Work
      </a>
      <a href="#contact-footer" className="px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-secondary/50 border border-white/10 backdrop-blur-sm text-foreground flex items-center gap-2 group hover:border-white/30 hover:shadow-lg">
       Let's Talk
      </a>
     </motion.div>
    </motion.div>
   </div>

   <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.5, duration: 1 }}
    className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center cursor-pointer"
   >
    <span className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-body font-medium">Scroll to explore</span>
    <motion.div
     animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
     transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
     className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-1 bg-background/50 backdrop-blur-sm"
    >
      <motion.div 
        animate={shouldReduceMotion ? {} : { y: [0, 12, 0], opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="w-1.5 h-1.5 rounded-full bg-pop"
      />
    </motion.div>
   </motion.div>
  </section>
 );
};

export default HeroSection;
