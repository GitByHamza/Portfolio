import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';

const OnboardingTooltip = () => {
 const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
  // Check if user has seen the tooltip
  const hasSeenTooltip = localStorage.getItem('hasSeenThemeTooltip');

  // Show after a short delay for new users
  if (!hasSeenTooltip) {
   const timer = setTimeout(() => {
    setIsVisible(true);
   }, 1000);
   return () => clearTimeout(timer);
  }
 }, []);

 const dismissTooltip = () => {
  setIsVisible(false);
  localStorage.setItem('hasSeenThemeTooltip', 'true');
 };

 return (
  <AnimatePresence>
   {isVisible && (
    <motion.div
     initial={{ opacity: 0, scale: 0.8, y: 10 }}
     animate={{ opacity: 1, scale: 1, y: 0 }}
     exit={{ opacity: 0, scale: 0.9 }}
     transition={{ type: "spring", damping: 20, stiffness: 300 }}
     className="absolute top-12 right-0 w-64 z-50"
    >
     <div className="relative">
      {/* Arrow pointing up-right towards the hamburger */}
      <div className="absolute -top-2 right-4 w-4 h-4 bg-primary rotate-45 border-l border-t border-white/20"></div>

      <div className="bg-card/30 backdrop-blur-xl border border-primary/20 p-4 rounded-xl shadow-2xl relative overflow-hidden group">
       {/* Glow Effect */}
       <div className="absolute inset-0 bg-primary/10 blur-xl group-hover:bg-primary/20 transition-colors" />

       <div className="relative z-10">
        <div className="flex justify-between items-start mb-2">
         <h4 className="text-sm font-heading font-bold text-primary flex items-center gap-2">
          Customize View <ArrowUpRight size={14} />
         </h4>
         <button
          onClick={dismissTooltip}
          className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
         >
          <X size={14} />
         </button>
        </div>

        <p className="text-xs font-body text-foreground/90 leading-relaxed mb-3">
         Tap the menu to find the <strong>Theme Toggle</strong>. You can switch themes from there!
        </p>

        <button
         onClick={dismissTooltip}
         className="w-full text-xs font-bold py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
        >
         Got it!
        </button>
       </div>
      </div>
     </div>
    </motion.div>
   )}
  </AnimatePresence>
 );
};

export default OnboardingTooltip;
