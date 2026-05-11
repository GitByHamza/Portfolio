import React, { useState, useRef, useEffect } from "react";
import { cn } from "../lib/utils";
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

const skills = [
 { name: "HTML/CSS", level: 85, category: "frontend" },
 { name: "JavaScript", level: 65, category: "frontend" },
 { name: "React", level: 80, category: "frontend" },
 { name: "Vue 3", level: 80, category: "frontend" },
 { name: "Nuxt.js (TS)", level: 75, category: "frontend" },
 { name: "Next.js", level: 85, category: "frontend" },
 { name: "Tailwind CSS", level: 75, category: "frontend" },
 { name: "Bootstrap", level: 75, category: "frontend" },
 { name: "Material-UI", level: 75, category: "frontend" },
 { name: "Node.js", level: 80, category: "backend" },
 { name: "Express", level: 75, category: "backend" },
 { name: "Php laravel 12", level: 85, category: "backend" },
 { name: "MongoDB", level: 70, category: "database" },
 { name: "MySQL", level: 65, category: "database" },
 { name: "Git/GitHub", level: 90, category: "tools" },
 { name: "Docker", level: 70, category: "tools" },
 { name: "VS Code", level: 95, category: "tools" },
];

const InteractiveCard = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

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
      className={cn("relative group rounded-xl p-[1px] overflow-hidden", className)}
    >
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: useTransform(
              () =>
                `radial-gradient(300px circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(0,212,255,0.8), transparent 40%)`
            ),
          }}
        />
      )}
      <div className="absolute inset-[1px] bg-card rounded-xl z-0" />
      <div style={{ transform: shouldReduceMotion ? "none" : "translateZ(10px)" }} className="relative z-10 h-full w-full p-6">
        {children}
      </div>
    </motion.div>
  );
};

const SkillMarquee = ({ items, direction = "left", speed = 25 }) => {
 const containerRef = useRef(null);
 const [contentWidth, setContentWidth] = useState(0);
 const x = useMotionValue(0);
 const [isDragging, setIsDragging] = useState(false);
 const shouldReduceMotion = useReducedMotion();

 useEffect(() => {
  if (containerRef.current) {
   const calculateWidth = () => {
    if (containerRef.current) {
     setContentWidth(containerRef.current.scrollWidth / 3);
    }
   }
   calculateWidth();
   window.addEventListener('resize', calculateWidth);
   return () => window.removeEventListener('resize', calculateWidth);
  }
 }, [items]);

 useAnimationFrame((t, delta) => {
  if (!isDragging && contentWidth > 0 && !shouldReduceMotion) {
   const pixelsPerSecond = 50;
   const moveBy = (direction === "left" ? -1 : 1) * (pixelsPerSecond / 1000) * delta;

   let newX = x.get() + moveBy;

   if (newX <= -contentWidth) {
    newX += contentWidth;
   } else if (newX > 0) {
    newX -= contentWidth;
   }

   x.set(newX);
  }
 });

 return (
  <div className="overflow-hidden w-full relative group cursor-grab active:cursor-grabbing">
   <motion.div
    ref={containerRef}
    style={{ x }}
    drag="x"
    dragMomentum={false}
    dragConstraints={{ left: -10000, right: 10000 }}
    onDragStart={() => setIsDragging(true)}
    onDragEnd={() => setIsDragging(false)}
    className="flex gap-6 w-max"
   >
    {[...items, ...items, ...items].map((skill, key) => (
     <div
      key={key}
      className="bg-card/50 backdrop-blur-sm p-4 rounded-xl shadow-xs w-64 flex-shrink-0 select-none border border-white/5 relative overflow-hidden group-hover:border-primary/30 transition-colors"
     >
      <div className="text-left mb-2 relative z-10">
       <h3 className="font-heading font-semibold text-lg pointer-events-none">
        {skill.name}
       </h3>
      </div>
      <div className="w-full bg-secondary/30 h-2 rounded-full overflow-hidden relative z-10">
       <div
        className="bg-gradient-to-r from-primary to-pop h-2 rounded-full origin-left"
        style={{ width: `${skill.level}%` }}
       />
      </div>
      <div className="text-right mt-1 relative z-10">
       <span className="text-sm text-muted-foreground font-body pointer-events-none">
        {skill.level}%
       </span>
      </div>
     </div>
    ))}
   </motion.div>
  </div>
 );
};

const SkillsSection = () => {
 const [activeCategory, setActiveCategory] = useState("all");
 const categories = ["all", "frontend", "backend", "database", "tools"];
 const filteredSkills = skills.filter(
  (skill) => activeCategory === "all" || skill.category === activeCategory
 );
 return (
  <section id="skills" className="py-24 px-4 relative perspective-[1000px]">
   <div className="container mx-auto max-w-5xl relative z-10">
    <motion.h2
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.5 }}
     className="text-3xl md:text-4xl font-bold mb-12 text-center font-heading"
    >
     My <span className="text-primary text-glow">Skills</span>
    </motion.h2>
    <div className="flex flex-wrap justify-center gap-4 mb-12">
     {categories.map((category, key) => (
      <button
       key={key}
       onClick={() => setActiveCategory(category)}
       className={cn(
        "px-6 py-2 rounded-full transition-all duration-300 capitalize font-medium border",
        activeCategory === category
         ? "bg-primary/20 text-primary border-primary/50 shadow-[0_0_15px_rgba(79,142,247,0.3)]"
         : "bg-secondary/30 text-foreground border-white/5 hover:border-white/20 hover:bg-secondary/50"
       )}
      >
       {category}
      </button>
     ))}
    </div>
    
    {/* Mobile Slider (Marquee) */}
    <div className="md:hidden flex flex-col gap-8">
     <SkillMarquee items={filteredSkills} direction="left" speed={0.5} />
     <SkillMarquee items={filteredSkills} direction="right" speed={0.5} />
    </div>

    {/* Desktop Grid */}
    <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
     {filteredSkills.map((skill, key) => (
      <motion.div
       key={key}
       layout
       initial={{ opacity: 0, scale: 0.9 }}
       animate={{ opacity: 1, scale: 1 }}
       transition={{ duration: 0.3 }}
      >
       <InteractiveCard className="bg-card shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
        <div className="text-left mb-4">
         <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-pop transition-colors drop-shadow-md">
          {skill.name}
         </h3>
        </div>
        <div className="w-full bg-secondary/30 h-2 rounded-full overflow-hidden">
         <motion.div
          className="bg-gradient-to-r from-primary to-pop h-2 rounded-full origin-left"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
         />
        </div>
        <div className="text-right mt-1">
         <span className="text-sm text-muted-foreground font-body">
          {skill.level}%
         </span>
        </div>
       </InteractiveCard>
      </motion.div>
     ))}
    </div>
   </div>
  </section>
 );
};

export default SkillsSection;
