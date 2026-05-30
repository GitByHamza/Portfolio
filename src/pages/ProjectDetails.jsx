import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, Github, CheckCircle, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { projectsData } from "../data/projects";
import { cn } from "../lib/utils";
import { ProjectImage } from "../components/Skeleton";

const InteractiveGalleryCard = ({ children, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current || shouldReduceMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: shouldReduceMotion ? 0 : rotateY,
        rotateX: shouldReduceMotion ? 0 : rotateX,
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-2xl overflow-hidden shadow-xl border border-white/10 aspect-video cursor-pointer bg-card/50 backdrop-blur-sm p-[1px] hover:border-white/20 transition-colors"
    >
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
          style={{
            background: useTransform(
              () =>
                `radial-gradient(300px circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(0,212,255,0.4), transparent 40%)`
            ),
          }}
        />
      )}
      <div className="absolute inset-[1px] bg-card rounded-2xl z-0" />
      <div style={{ transform: shouldReduceMotion ? "none" : "translateZ(15px)" }} className="relative z-10 h-full w-full rounded-2xl overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};

const InteractiveDataCard = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current || shouldReduceMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: shouldReduceMotion ? 0 : rotateY,
        rotateX: shouldReduceMotion ? 0 : rotateX,
        transformStyle: "preserve-3d",
      }}
      className={cn("relative group rounded-3xl p-[1px] overflow-hidden", className)}
    >
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: useTransform(
              () =>
                `radial-gradient(400px circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(0,212,255,0.6), transparent 40%)`
            ),
          }}
        />
      )}
      <div className="absolute inset-[1px] bg-card/60 backdrop-blur-md rounded-3xl z-0" />
      <div style={{ transform: shouldReduceMotion ? "none" : "translateZ(10px)" }} className="relative z-10 h-full w-full p-8 shadow-2xl">
        {children}
      </div>
    </motion.div>
  );
};

const ProjectDetails = () => {
 const { id } = useParams();
 const project = projectsData.find((p) => p.id === parseInt(id));
 const currentIndex = projectsData.findIndex((p) => p.id === parseInt(id));
 const nextProject = currentIndex !== -1 ? projectsData[(currentIndex + 1) % projectsData.length] : null;
 const prevProject = currentIndex !== -1 ? projectsData[(currentIndex - 1 + projectsData.length) % projectsData.length] : null;
 const shouldReduceMotion = useReducedMotion();

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
   <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
    <div className="text-center space-y-6">
     <h2 className="text-4xl font-heading font-bold mb-4">Project Not Found</h2>
     <Link to="/#projects" className="cosmic-button inline-flex">
      Back to Portfolio
     </Link>
    </div>
   </div>
  );
 }

 const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
     opacity: 1,
     transition: { staggerChildren: 0.1, delayChildren: 0.2 },
   },
 };

 const itemVariants = {
   hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
 };

 return (
  <div className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background">
   {/* Lightbox Modal */}
   <AnimatePresence>
    {modalOpen && (
     <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 backdrop-blur-2xl"
      onClick={closeModal}
     >
      <motion.button
       initial={{ opacity: 0, scale: 0.5 }}
       animate={{ opacity: 1, scale: 1 }}
       exit={{ opacity: 0, scale: 0.5 }}
       transition={{ delay: 0.15 }}
       onClick={closeModal}
       className="absolute top-6 right-6 p-3 rounded-full bg-secondary/50 border border-white/10 hover:bg-white/10 hover:text-pop text-foreground transition-colors z-50"
       aria-label="Close modal"
      >
       <X size={24} />
      </motion.button>

      <motion.div
       initial={{ opacity: 0, y: -10 }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: -10 }}
       transition={{ delay: 0.2 }}
       className="absolute top-8 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-secondary/50 border border-white/10 text-foreground text-sm font-bold tracking-widest font-heading shadow-lg"
      >
       {activeIndex + 1} / {project.images.length}
      </motion.div>

      {project.images.length > 1 && (
       <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ delay: 0.1 }}
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        className="absolute left-4 md:left-8 p-4 rounded-full bg-secondary/50 border border-white/10 hover:bg-white/10 hover:text-pop text-foreground transition-all hover:scale-110 z-50"
        aria-label="Previous image"
       >
        <ChevronLeft size={28} />
       </motion.button>
      )}

      <motion.div
       key={activeIndex}
       initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
       animate={{ opacity: 1, scale: 1, y: 0 }}
       exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
       transition={{ type: "spring", stiffness: 300, damping: 30 }}
       className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center p-4"
       onClick={(e) => e.stopPropagation()}
      >
       <img
        src={project.images[activeIndex]}
        alt={`${project.title} screenshot ${activeIndex + 1}`}
        className="max-w-full max-h-[80vh] object-contain rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(79,142,247,0.2)]"
       />
      </motion.div>

      {project.images.length > 1 && (
       <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ delay: 0.1 }}
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        className="absolute right-4 md:right-8 p-4 rounded-full bg-secondary/50 border border-white/10 hover:bg-white/10 hover:text-pop text-foreground transition-all hover:scale-110 z-50"
        aria-label="Next image"
       >
        <ChevronRight size={28} />
       </motion.button>
      )}

      {project.images.length > 1 && (
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.25 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 p-3 rounded-2xl bg-secondary/50 border border-white/10 backdrop-blur-md"
       >
        {project.images.map((img, idx) => (
         <button
          key={idx}
          onClick={(e) => { e.stopPropagation(); setActiveIndex(idx); }}
          className={`w-16 h-12 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
           idx === activeIndex
            ? "border-pop scale-110 shadow-[0_0_15px_rgba(0,212,255,0.5)] z-10"
            : "border-transparent opacity-50 hover:opacity-100 hover:scale-105"
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
    <Link to="/#projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-pop transition-colors mb-12 font-body font-medium group">
     <div className="p-2 rounded-full bg-secondary/30 border border-white/5 group-hover:bg-pop/10 group-hover:border-pop/30 transition-all">
       <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
     </div>
     Back to Portfolio
    </Link>

    <motion.div variants={containerVariants} initial="hidden" animate="visible">
     <motion.h1 
      layoutId={`project-title-${project.id}`}
      variants={itemVariants} 
      className="text-5xl md:text-7xl font-bold mb-6 font-heading text-center tracking-tight"
     >
      {project.title}
     </motion.h1>

     <motion.div 
      layoutId={`project-card-${project.id}`}
      variants={itemVariants}
      className="w-full max-w-4xl mx-auto aspect-video rounded-3xl overflow-hidden mb-16 shadow-2xl border border-white/10"
     >
       <ProjectImage 
         src={project.mainImage} 
         alt={project.title}
         className="w-full h-full"
       />
     </motion.div>
     <motion.p variants={itemVariants} className="text-xl text-muted-foreground mb-10 max-w-3xl font-body leading-relaxed mx-auto text-center">
      {project.overview}
     </motion.p>

     <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-16">
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
        className="px-8 py-3 rounded-full border border-primary/50 text-foreground font-medium hover:bg-primary/10 transition-colors flex items-center gap-2 bg-secondary/30 backdrop-blur-sm hover:border-primary"
       >
        <Github size={18} /> View Code
       </a>
      )}
     </motion.div>

     <motion.div variants={itemVariants} className="mb-20">
      <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
        <h3 className="text-3xl font-bold font-heading text-foreground">Project Gallery</h3>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/30 to-transparent hidden md:block mt-2"></div>
      </div>

      {/* Mobile Slider */}
      <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
       {project.images.map((img, index) => (
        <motion.div
         key={index}
         initial={{ opacity: 0, scale: 0.9 }}
         whileInView={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.5 }}
         className="snap-center shrink-0 w-[85vw] rounded-2xl overflow-hidden shadow-lg border border-white/10 aspect-video cursor-pointer relative"
         onClick={() => openModal(index)}
        >
         <img
          src={img}
          alt={`${project.title} screenshot ${index + 1}`}
          className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
           <ZoomIn className="text-white drop-shadow-lg" size={32} />
         </div>
        </motion.div>
       ))}
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       {project.images.map((img, index) => (
        <motion.div
         key={index}
         variants={itemVariants}
        >
         <InteractiveGalleryCard onClick={() => openModal(index)}>
          <img
           src={img}
           alt={`${project.title} screenshot ${index + 1}`}
           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px] opacity-0 group-hover:opacity-100">
           <div className="p-3 bg-primary/20 rounded-full border border-primary/50 text-pop transform scale-50 group-hover:scale-100 transition-transform duration-300">
             <ZoomIn className="drop-shadow-[0_0_10px_rgba(0,212,255,0.8)]" size={28} />
           </div>
          </div>
         </InteractiveGalleryCard>
        </motion.div>
       ))}
      </div>
     </motion.div>

     <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
      <motion.div
       variants={itemVariants}
       className="md:col-span-2 space-y-12"
      >
       <section>
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-3xl font-bold font-heading text-foreground">About the Project</h3>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/30 to-transparent mt-2"></div>
        </div>
        <p className="text-muted-foreground leading-relaxed text-lg font-body text-justify">
         {project.description}
        </p>
       </section>

       <section>
        <div className="flex items-center gap-3 mb-8">
          <h3 className="text-3xl font-bold font-heading text-foreground">Key Features</h3>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/30 to-transparent mt-2"></div>
        </div>
        <div className="grid gap-4">
         {project.features.map((feature, index) => (
          <motion.div 
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ delay: index * 0.1, duration: 0.5 }}
           key={index} 
           className="flex items-start gap-4 bg-secondary/30 backdrop-blur-sm border border-white/5 p-5 rounded-xl hover:border-primary/20 transition-colors group"
          >
           <div className="p-1 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
             <CheckCircle className="h-5 w-5 text-primary" />
           </div>
           <span className="font-body text-foreground/90 leading-relaxed pt-0.5">{feature}</span>
          </motion.div>
         ))}
        </div>
       </section>
      </motion.div>

      <motion.div
       variants={itemVariants}
       className="space-y-8 perspective-[1000px]"
      >
       {/* Tech Stack */}
       <InteractiveDataCard className="border border-white/10 hover:shadow-primary/20 transition-shadow duration-300 group">
        <h3 className="text-2xl font-bold mb-8 font-heading text-foreground relative z-10 group-hover:text-primary transition-colors drop-shadow-md">Technology Stack</h3>
        <div className="space-y-5 relative z-10">
         {project.techStack.map((item, index) => (
          <div key={index} className="flex flex-col border-b border-white/5 pb-4 last:border-0 last:pb-0">
           <span className="text-xs text-muted-foreground mb-1.5 uppercase tracking-widest font-heading font-semibold text-primary/80 group-hover:text-pop transition-colors">
            {item.category}
           </span>
           <span className="font-body font-medium text-foreground/90 text-lg">
            {item.tech}
           </span>
          </div>
         ))}
        </div>
       </InteractiveDataCard>

       {/* Tags */}
       <InteractiveDataCard className="border border-white/10 hover:shadow-primary/20 transition-shadow duration-300 group">
        <h3 className="text-2xl font-bold mb-6 font-heading text-foreground group-hover:text-primary transition-colors drop-shadow-md">Tags</h3>
        <div className="flex flex-wrap gap-3">
         {project.tags.map((tag, idx) => (
          <span key={idx} className="bg-secondary/50 text-foreground px-4 py-1.5 rounded-full text-sm font-medium border border-white/10 group-hover:border-pop/30 transition-colors cursor-default z-10 relative">
           {tag}
          </span>
         ))}
        </div>
       </InteractiveDataCard>
      </motion.div>
     </div>
    </motion.div>

    {/* ─── Next / Prev Project Navigation ─── */}
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.5 }}
     className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16 pt-12 border-t border-white/5"
    >
     {prevProject && (
      <Link
       to={`/project/${prevProject.id}`}
       className="group flex items-center gap-4 p-5 rounded-2xl bg-card/40 backdrop-blur-sm border border-white/5 hover:border-primary/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(79,142,247,0.1)]"
      >
       <div className="p-2 rounded-full bg-secondary/50 group-hover:bg-primary/20 transition-colors border border-white/5">
        <ChevronLeft size={18} className="text-primary group-hover:-translate-x-0.5 transition-transform" />
       </div>
       <div className="text-left">
        <div className="text-xs text-muted-foreground font-body mb-0.5">Previous Project</div>
        <div className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors text-sm line-clamp-1">{prevProject.title}</div>
       </div>
      </Link>
     )}
     {nextProject && (
      <Link
       to={`/project/${nextProject.id}`}
       className="group flex items-center gap-4 p-5 rounded-2xl bg-card/40 backdrop-blur-sm border border-white/5 hover:border-primary/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(79,142,247,0.1)] md:flex-row-reverse md:text-right"
      >
       <div className="p-2 rounded-full bg-secondary/50 group-hover:bg-primary/20 transition-colors border border-white/5 flex-shrink-0">
        <ChevronRight size={18} className="text-primary group-hover:translate-x-0.5 transition-transform" />
       </div>
       <div className="text-left md:text-right">
        <div className="text-xs text-muted-foreground font-body mb-0.5">Next Project</div>
        <div className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors text-sm line-clamp-1">{nextProject.title}</div>
       </div>
      </Link>
     )}
    </motion.div>

    {/* ─── Conversion CTA ─── */}
    <motion.div
     initial={{ opacity: 0, y: 30 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.6 }}
     className="mt-12 p-10 md:p-14 rounded-3xl border border-white/10 bg-primary/5 backdrop-blur-xl text-center relative overflow-hidden"
    >
     <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-pop/5 pointer-events-none" />
     <div className="relative z-10">
      <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium font-body mb-5">
       Let's Work Together
      </span>
      <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-foreground">
       Interested in a{' '}
       <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pop">similar project?</span>
      </h2>
      <p className="font-body text-muted-foreground text-lg mb-8 max-w-lg mx-auto leading-relaxed">
       Let's turn your vision into a high-performance digital reality. Reach out and let's build something exceptional together.
      </p>
      <a href="/#contact-footer" className="cosmic-button inline-flex items-center gap-2 text-base">
       Start a Conversation <ArrowRight size={18} />
      </a>
     </div>
    </motion.div>
   </div>
  </div>
 );
};

export default ProjectDetails;
