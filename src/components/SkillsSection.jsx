import React, { useState, useRef, useEffect } from "react";
import { cn } from "../lib/utils";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";

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
const SkillMarquee = ({ items, direction = "left", speed = 25 }) => {
 const containerRef = useRef(null);
 const [contentWidth, setContentWidth] = useState(0);
 // Start at a slight offset to avoid edge flickers, or 0.
 const x = useMotionValue(0);
 const [isDragging, setIsDragging] = useState(false);

 useEffect(() => {
  if (containerRef.current) {
   // The container has 3 duplicates. So single set width is scrollWidth / 3
   const calculateWidth = () => {
    if (containerRef.current) {
     setContentWidth(containerRef.current.scrollWidth / 3); // Adjusted for triplicate
    }
   }
   calculateWidth();
   window.addEventListener('resize', calculateWidth);
   return () => window.removeEventListener('resize', calculateWidth);
  }
 }, [items]);

 useAnimationFrame((t, delta) => {
  if (!isDragging && contentWidth > 0) {
   // Calculate move distance based on time delta for consistent speed
   // Speed factor: pixels per second
   // 25s for full width -> width / 25000 px/ms
   // Let's us a fixed pixel speed for consistency: 50px/s
   const pixelsPerSecond = 50;
   const moveBy = (direction === "left" ? -1 : 1) * (pixelsPerSecond / 1000) * delta;

   let newX = x.get() + moveBy;

   // Wrap logic
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
    dragMomentum={false} // Disable momentum to prevent conflict with auto-scroll
    dragConstraints={{ left: -10000, right: 10000 }} // Practically infinite
    onDragStart={() => setIsDragging(true)}
    onDragEnd={() => setIsDragging(false)}
    className="flex gap-6 w-max"
   >
    {/* Triplicate items to ensure no gaps during wide screen or fast scroll wrapping */}
    {[...items, ...items, ...items].map((skill, key) => (
     <div
      key={key}
      className="bg-card p-4 rounded-lg shadow-xs card-hover animate-glow-breathe w-64 flex-shrink-0 select-none border border-border/50"
     >
      <div className="text-left mb-2">
       <h3 className="font-heading font-semibold text-lg pointer-events-none">
        {skill.name}
       </h3>
      </div>
      <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
       <div
        className="bg-primary h-2 rounded-full origin-left"
        style={{ width: `${skill.level}%` }}
       />
      </div>
      <div className="text-right mt-1">
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
  (skills) => activeCategory === "all" || skills.category === activeCategory
 );
 return (
  <section id="skills" className="py-24 px-4 relative bg-secondary/30">
   <div className="container mx-auto max-w-5xl">
    <motion.h2
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.5 }}
     className="text-3xl md:text-4xl font-bold mb-12 text-center font-heading"
    >
     My <span className="text-primary">Skills</span>
    </motion.h2>
    <div className="flex flex-wrap justify-center gap-4 mb-12">
     {categories.map((category, key) => (
      <button
       key={key}
       onClick={() => setActiveCategory(category)}
       className={cn(
        "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
        activeCategory === category
         ? "bg-primary text-primary-foreground"
         : "bg-secondary/70 text-forefround hover:bd-secondary"
       )}
      >
       {category}
      </button>
     ))}
    </div>
    {/* Mobile Slider (Marquee) */}
    <div className="md:hidden flex flex-col gap-8">
     {/* First Row - Left to Right (Actually user asked both sides, so one L->R, one R->L) */}
     {/* Original code had first row L->R (x: 0 to -1000 is actually moving LEFT).  */}
     {/* Wait, animate={{ x: [0, -1000] }} moves the content to the LEFT. So items appear to move Left. */}

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
       className="bg-card p-6 rounded-lg shadow-xs card-hover animate-glow-breathe"
      >
       <div className="text-left mb-4">
        <h3 className="font-heading font-semibold text-lg">
         {skill.name}
        </h3>
       </div>
       <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
        <motion.div
         className="bg-primary h-2 rounded-full origin-left"
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
      </motion.div>
     ))}
    </div>
   </div>
  </section>
 );
};

export default SkillsSection;
