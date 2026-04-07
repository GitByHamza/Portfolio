import React from 'react'
import { motion } from 'framer-motion'
import { Rocket, MoveLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <div className="text-9xl font-heading font-black text-primary/20 select-none">404</div>
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ 
            y: [0, -20, 0],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <Rocket className="w-24 h-24 text-primary" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-heading font-bold mb-4 text-glow"
      >
        Lost in Outer Space?
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-muted-foreground font-body max-w-md mb-10"
      >
        The page you're looking for has drifted into a black hole or never existed in this galaxy.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link 
          to="/" 
          className="cosmic-button inline-flex items-center gap-2 group"
        >
          <MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Earth
        </Link>
      </motion.div>
    </div>
  )
}

export default Error404