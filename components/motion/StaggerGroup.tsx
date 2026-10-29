'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { MOTION } from '@/lib/motion/tokens'

interface StaggerGroupProps {
  children: ReactNode
  className?: string
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: MOTION.stagger } },
}

const item = {
  hidden: { opacity: 0, y: MOTION.distance.base },
  show: { opacity: 1, y: 0, transition: { duration: MOTION.duration.base, ease: MOTION.ease } },
}

/** Anime les enfants directs en séquence au scroll (grilles domaines/équipements/services). */
export function StaggerGroup({ children, className }: StaggerGroupProps) {
  const reduce = useReducedMotion()

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px 120px 0px' }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: StaggerGroupProps) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  )
}
