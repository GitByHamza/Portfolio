import React, { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 250 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleHoverStart = (e) => {
      if (e.target.closest('button, a, .cursor-pointer')) {
        setIsHovering(true)
      }
    }

    const handleHoverEnd = () => {
      setIsHovering(false)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleHoverStart)
    window.addEventListener('mouseout', handleHoverEnd)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleHoverStart)
      window.removeEventListener('mouseout', handleHoverEnd)
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[9999] hidden md:block"
      style={{
        x: x,
        y: y,
        translateX: '-50%',
        translateY: '-50%',
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? 'rgba(79, 142, 247, 0.1)' : 'transparent',
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-pop rounded-full" />
    </motion.div>
  )
}

export default CustomCursor
