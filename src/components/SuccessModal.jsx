import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Sparkles } from "lucide-react";

const SuccessModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal Container */}
          <motion.div
            className="relative z-10 w-[90%] max-w-md"
            initial={{ scale: 0.5, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -30 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.5 }}
          >
            {/* Outer Glow Ring */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 opacity-60 blur-lg animate-pulse" />

            {/* Card */}
            <div className="relative rounded-2xl border border-border bg-card overflow-hidden">
              {/* Top Gradient Bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 via-violet-400 to-indigo-500" />

              {/* Content */}
              <div className="px-8 py-10 flex flex-col items-center text-center space-y-5">
                {/* Animated Icon Container */}
                <motion.div
                  className="relative"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.15 }}
                >
                  {/* Icon Glow */}
                  <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl scale-150" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-2xl">
                    <CheckCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h3
                  className="text-2xl font-bold text-foreground font-heading"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  Message Sent!
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="text-foreground/60 text-sm font-body leading-relaxed max-w-xs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </motion.p>

                {/* Sparkle Decorations */}
                <motion.div
                  className="flex items-center gap-1 text-primary/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                >
                  <Sparkles className="w-3 h-3" />
                  <span className="text-xs font-body text-foreground/40">Auto-closing shortly</span>
                  <Sparkles className="w-3 h-3" />
                </motion.div>
              </div>

              {/* Bottom Shimmer Bar */}
              <div className="h-1 w-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-primary/60"
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
              }}
              animate={{
                x: (Math.random() - 0.5) * 300,
                y: (Math.random() - 0.5) * 300,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.15,
                ease: "easeOut",
              }}
              style={{
                top: "50%",
                left: "50%",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
