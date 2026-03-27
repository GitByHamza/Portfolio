import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { projectsData } from "../data/projects";

const ProjectDetails = () => {
 const { id } = useParams();
 const project = projectsData.find((p) => p.id === parseInt(id));

 useEffect(() => {
  window.scrollTo(0, 0);
 }, []);

 if (!project) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
     <h2 className="text-2xl font-bold mb-4">Project not found</h2>
     <Link to="/" className="cosmic-button">
      Back to Home
     </Link>
    </div>
   </div>
  );
 }

 return (
  <div className="min-h-screen pt-32 pb-12 relative overflow-hidden">


   <div className="container mx-auto px-4 max-w-6xl relative z-10">

    {/* Header */}
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5 }}
    >
     <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-glow text-center">
      {project.title}
     </h1>
     <p className="text-xl text-muted-foreground mb-8 max-w-3xl font-body leading-relaxed mx-auto text-center">
      {project.overview}
     </p>

     {/* Links */}
     <div className="flex justify-center gap-4 mb-12">
      {project.demoUrl && (
       <a
        href={project.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="cosmic-button flex items-center gap-2"
       >
        <ExternalLink size={18} /> Live Demo
       </a>
      )}
      {project.githubUrl && project.githubUrl !== "#" && (
       <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-2 rounded-full border border-primary/50 text-foreground font-medium hover:bg-primary/10 transition-colors flex items-center gap-2"
       >
        <Github size={18} /> View Code
       </a>
      )}
     </div>
    </motion.div>

    {/* Images Grid */}
    {/* Images Section */}
    <div className="mb-16">
     <h3 className="text-2xl font-bold mb-6 font-heading text-primary pl-1">Project Gallery</h3>

     {/* Mobile Slider */}
     <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
      {project.images.map((img, index) => (
       <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="snap-center shrink-0 w-[85vw] rounded-xl overflow-hidden shadow-lg border border-white/10 aspect-video"
       >
        <img
         src={img}
         alt={`${project.title} screenshot ${index + 1}`}
         className="w-full h-full object-cover"
        />
       </motion.div>
      ))}
     </div>

     {/* Desktop Grid */}
     <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {project.images.map((img, index) => (
       <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
        className="rounded-xl overflow-hidden shadow-lg border border-white/10 aspect-video cursor-pointer"
       >
        <img
         src={img}
         alt={`${project.title} screenshot ${index + 1}`}
         className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
       </motion.div>
      ))}
     </div>
    </div>

    <div className="grid md:grid-cols-3 gap-12">
     {/* Main Content */}
     <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="md:col-span-2 space-y-12"
     >
      {/* Description */}
      <section>
       <h3 className="text-2xl font-bold mb-4 font-heading text-primary">About the Project</h3>
       <p className="text-muted-foreground leading-relaxed text-lg font-body">
        {project.description}
       </p>
      </section>

      {/* Key Features */}
      <section>
       <h3 className="text-2xl font-bold mb-6 font-heading text-primary">Key Features</h3>
       <div className="grid gap-4">
        {project.features.map((feature, index) => (
         <div key={index} className="flex items-start gap-3 bg-secondary/20 p-4 rounded-lg">
          <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
          <span className="font-body text-foreground/90">{feature}</span>
         </div>
        ))}
       </div>
      </section>
     </motion.div>

     {/* Sidebar */}
     <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-y-8"
     >
      {/* Tech Stack Table */}
      <div className="bg-card rounded-xl p-6 border border-primary/20 shadow-lg animate-glow-breathe">
       <h3 className="text-xl font-bold mb-6 font-heading text-primary">Technology Stack</h3>
       <div className="space-y-4">
        {project.techStack.map((item, index) => (
         <div key={index} className="flex flex-col border-b border-primary/10 pb-3 last:border-0 last:pb-0">
          <span className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold opacity-70">
           {item.category}
          </span>
          <span className="font-body font-medium text-foreground">
           {item.tech}
          </span>
         </div>
        ))}
       </div>
      </div>

      {/* Tags Cloud */}
      <div className="bg-card rounded-xl p-6 border border-primary/20 shadow-lg animate-glow-breathe">
       <h3 className="text-xl font-bold mb-4 font-heading text-primary">Tags</h3>
       <div className="flex flex-wrap gap-2">
        {project.tags.map((tag, idx) => (
         <span key={idx} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/30 shadow-[0_0_10px_rgba(139,92,246,0.2)] animate-pulse">
          {tag}
         </span>
        ))}
       </div>
      </div>
     </motion.div>
    </div>
   </div>
  </div>
 );
};

export default ProjectDetails;
