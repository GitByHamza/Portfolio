import React from "react";
import { ArrowBigDownDashIcon } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
 return (
  <section
   id="hero"
   className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
  >
   <div className="container max-w-4xl mx-auto text-center z-10">
    <div className="space-y-6">
     <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-4xl md:text-6xl font-bold tracking-tight"
     >
      <span className="font-body">Hi, I'm</span>
      <span className="font-heading text-glow text-primary"> Tex</span>
      <span className="font-heading text-gradient ml-2"> Codes</span>
     </motion.h1>

     <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="text-justify font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
     >
      {/* Describe about yourself */}
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Consequuntur, illo numquam? Quo harum cumque beatae. Totam,
      provident. Hic nihil incidunt sed nemo unde veritatis natus optio id
      excepturi commodi, impedit totam, dicta cumque odio.
     </motion.p>

     <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="pt-4"
     >
      <a href="#projects" className="cosmic-button">
       Drive Thru
      </a>
     </motion.div>
    </div>
   </div>

   <motion.div
    animate={{ y: [0, 10, 0] }}
    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center cursor-pointer"
   >
    <span className="text-sm text-muted-foreground mb-2">Scroll</span>
    <ArrowBigDownDashIcon className="w-5 h-5 text-primary" />
   </motion.div>
  </section>
 );
};

export default HeroSection;
