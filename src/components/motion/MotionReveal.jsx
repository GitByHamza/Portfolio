import React from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

/**
 * Editorial Spring Easing Curve:
 * Crisp start, graceful deceleration — standard in high-end product software
 */
export const EDITORIAL_EASE = [0.22, 1, 0.36, 1]

/**
 * FadeIn:
 * Smooth scroll-triggered or entrance reveal for text, sections, and containers.
 */
export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 20,
  once = true,
  className = '',
  ...props
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className} {...props}>{children}</div>
  }

  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }

  const initial = {
    opacity: 0,
    ...(directions[direction] || {}),
  }

  const animate = {
    opacity: 1,
    x: 0,
    y: 0,
  }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: EDITORIAL_EASE,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerContainer & StaggerItem:
 * Organizes sequential card cascades (e.g. Card 1 -> Card 2 -> Card 3)
 */
export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  delayChildren = 0,
  once = true,
  className = '',
  ...props
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className} {...props}>{children}</div>
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  direction = 'up',
  distance = 18,
  duration = 0.55,
  className = '',
  ...props
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className} {...props}>{children}</div>
  }

  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      ...(directions[direction] || {}),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: EDITORIAL_EASE,
      },
    },
  }

  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  )
}

/**
 * ScrollProgress:
 * Subtle, ultra-thin emerald reading guide bar anchored under the navigation.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#059669] via-[#10B981] to-[#34D399] origin-left z-[99] pointer-events-none"
    />
  )
}
