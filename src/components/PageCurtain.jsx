import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PageCurtain() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide curtain completely from DOM after animation
    const timer = setTimeout(() => setIsVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={shouldReduceMotion ? { opacity: 0 } : { y: '-100%' }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center pointer-events-none"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-glow text-primary">
          TexCodes
        </h1>
      </motion.div>
    </motion.div>
  );
}
