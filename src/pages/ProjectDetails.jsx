import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, CheckCircle, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "../data/projects";

const ProjectDetails = () => {
 const { id } = useParams();
 const project = projectsData.find((p) => p.id === parseInt(id));

 const [modalOpen, setModalOpen] = useState(false);
 const [activeIndex, setActiveIndex] = useState(0);

 const openModal = (index) => {
  setActiveIndex(index);
  setModalOpen(true);
 };

 const closeModal = () => setModalOpen(false);

 const goNext = useCallback(() => {
  if (!project) return;
  setActiveIndex((prev) => (prev + 1) % project.images.length);
 }, [project]);

 const goPrev = useCallback(() => {
  if (!project) return;
  setActiveIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
 }, [project]);

 // Keyboard navigation
 useEffect(() => {
  if (!modalOpen) return;
  const handleKeyDown = (e) => {
   if (e.key === "Escape") closeModal();
   if (e.key === "ArrowRight") goNext();
   if (e.key === "ArrowLeft") goPrev();
  };
  document.body.style.overflow = "hidden";
  window.addEventListener("keydown", handleKeyDown);
  return () => {
   document.body.style.overflow = "";
   window.removeEventListener("keydown", handleKeyDown);
  };
 }, [modalOpen, goNext, goPrev]);

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

   {/* Lightbox Modal */}
   <AnimatePresence>
    {modalOpen && (
     <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={closeModal}
      style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", backgroundColor: "rgba(0, 0, 0, 0.85)" }}
     >
      {/* Close Button */}
      <motion.button
       initial={{ opacity: 0, scale: 0.5 }}
       animate={{ opacity: 1, scale: 1 }}
       exit={{ opacity: 0, scale: 0.5 }}
       transition={{ delay: 0.15 }}
       onClick={closeModal}
       className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
       aria-label="Close modal"
      >
       <X size={24} />
      </motion.button>

      {/* Image Counter */}
      <motion.div
       initial={{ opacity: 0, y: -10 }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: -10 }}
       transition={{ delay: 0.2 }}
       className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium tracking-wider font-body"
      >
       {activeIndex + 1} / {project.images.length}
      </motion.div>

      {/* Previous Button */}
      {project.images.length > 1 && (
       <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ delay: 0.1 }}
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 z-10"
        aria-label="Previous image"
       >
        <ChevronLeft size={28} />
       </motion.button>
      )}

      {/* Image */}
      <motion.div
       key={activeIndex}
       initial={{ opacity: 0, scale: 0.85 }}
       animate={{ opacity: 1, scale: 1 }}
       exit={{ opacity: 0, scale: 0.85 }}
       transition={{ type: "spring", stiffness: 300, damping: 30 }}
       className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
       onClick={(e) => e.stopPropagation()}
      >
       <img
        src={project.images[activeIndex]}
        alt={`${project.title} screenshot ${activeIndex + 1}`}
        className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
        style={{ boxShadow: "0 0 60px rgba(139, 92, 246, 0.3), 0 25px 50px rgba(0, 0, 0, 0.5)" }}
       />
      </motion.div>

      {/* Next Button */}
      {project.images.length > 1 && (
       <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ delay: 0.1 }}
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 z-10"
        aria-label="Next image"
       >
        <ChevronRight size={28} />
       </motion.button>
      )}

      {/* Thumbnail Strip */}
      {project.images.length > 1 && (
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.25 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2"
       >
        {project.images.map((img, idx) => (
         <button
          key={idx}
          onClick={(e) => { e.stopPropagation(); setActiveIndex(idx); }}
          className={`w-16 h-10 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
           idx === activeIndex
            ? "border-primary scale-110 shadow-[0_0_12px_rgba(139,92,246,0.6)]"
            : "border-white/20 opacity-50 hover:opacity-80"
          }`}
         >
          <img src={img} alt="" className="w-full h-full object-cover" />
         </button>
        ))}
       </motion.div>
      )}
     </motion.div>
    )}
   </AnimatePresence>

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
        className="snap-center shrink-0 w-[85vw] rounded-xl overflow-hidden shadow-lg border border-white/10 aspect-video cursor-pointer"
        onClick={() => openModal(index)}
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
        className="group relative rounded-xl overflow-hidden shadow-lg border border-white/10 aspect-video cursor-pointer"
        onClick={() => openModal(index)}
       >
        <img
         src={img}
         alt={`${project.title} screenshot ${index + 1}`}
         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
         <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" size={32} />
        </div>
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
