import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function PageCurtain() {
  const shouldReduceMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1400)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={shouldReduceMotion ? { opacity: 0 } : { y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
      className="fixed inset-0 z-[100] bg-[#F6F5F0] flex items-center justify-center pointer-events-none border-b border-[rgba(15,15,15,0.2)]"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center font-mono"
      >
        <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-[#0F0F0F]">
          TEXCODES
        </h1>
        <div className="text-[10px] text-[#1A4BFF] uppercase tracking-widest mt-1">
          INDEPENDENT SOFTWARE STUDIO
        </div>
      </motion.div>
    </motion.div>
  )
}
