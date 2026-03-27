import { ArrowRight, ExternalLink, Github } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projectsData } from "../data/projects";

const ProjectsSection = () => {
 return (
  <section id="projects" className="py-24 px-4 relative">
   <div className="container mx-auto max-w-5xl">
    <motion.h2
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.5 }}
     className="text-3xl md:text-4xl font-bold mb-4 text-center font-heading"
    >
     {" "}
     Featured <span className="text-primary"> Projects </span>
    </motion.h2>

    <motion.p
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.5, delay: 0.2 }}
     className="font-body text-justify md:text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
    >
     Here are some of my recent projects. Each project was carefully crafted
     with attention to detail, performance, and user experience.
    </motion.p>
    {/* Mobile Slider (Swipeable) */}
    <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 scrollbar-hide">
     {projectsData.map((project, key) => (
      <div
       key={key}
       className="snap-center shrink-0 w-[85vw] sm:w-[60vw]"
      >
       <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group bg-card rounded-lg overflow-hidden shadow-xs h-full flex flex-col"
       >
        <Link to={`/project/${project.id}`} className="block h-full flex flex-col">
         <div className="h-48 overflow-hidden relative">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
          <img
           src={project.mainImage}
           alt={project.title}
           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
         </div>
         <div className="p-6 flex-1 flex flex-col">
          <div className="flex flex-wrap gap-2 mb-4">
           {project.tags.slice(0, 3).map((tag, i) => (
            <span
             key={i}
             className="font-body px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
            >
             {tag}
            </span>
           ))}
           {project.tags.length > 3 && (
            <span className="font-body px-2 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">
             +{project.tags.length - 3}
            </span>
           )}
          </div>
          <h3 className="font-heading text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
           {project.title}
          </h3>
          <p className="font-body text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
           {project.overview}
          </p>

          <div className="mt-auto pt-4 flex justify-between items-center border-t border-border/50">
           <span className="text-sm font-medium text-primary flex items-center">
            View Details <ArrowRight size={16} className="ml-1" />
           </span>
          </div>
         </div>
        </Link>
       </motion.div>
      </div>
     ))}
    </div>

    {/* Desktop Grid */}
    <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
     {projectsData.map((project, key) => (
      <motion.div
       key={key}
       initial={{ opacity: 0, y: 30 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.5, delay: key * 0.1 }}
       whileHover={{ y: -10 }}
       className="group bg-card rounded-lg overflow-hidden shadow-xs h-full flex flex-col"
      >
       <Link to={`/project/${project.id}`} className="block h-full flex flex-col">
        <div className="h-48 overflow-hidden relative">
         <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
         <img
          src={project.mainImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
         />
        </div>
        <div className="p-6 flex-1 flex flex-col">
         <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag, i) => (
           <span
            key={i}
            className="font-body px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
           >
            {tag}
           </span>
          ))}
          {project.tags.length > 3 && (
           <span className="font-body px-2 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">
            +{project.tags.length - 3}
           </span>
          )}
         </div>
         <h3 className="font-heading text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {project.title}
         </h3>
         <p className="font-body text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
          {project.overview}
         </p>

         <div className="mt-auto pt-4 flex justify-between items-center border-t border-border/50">
          <span className="text-sm font-medium text-primary flex items-center">
           View Details <ArrowRight size={16} className="ml-1" />
          </span>
          <div className="flex space-x-3">
           {/* Icons strictly for quick access if needed, but the whole card is clickable */}
          </div>
         </div>
        </div>
       </Link>
      </motion.div>
     ))}
    </div>
    <div className="text-center mt-12">
     <a
      className="cosmic-button w-fit flex items-center mx-auto gap-2"
      target="_blank"
      href="https://github.com/GitByHamza"
     >
      Check My Github <ArrowRight size={16} />
     </a>
    </div>
   </div>
  </section>
 );
};

export default ProjectsSection;
