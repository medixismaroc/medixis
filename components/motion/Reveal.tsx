'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { MOTION } from '@/lib/motion/tokens'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li'
}

export function Reveal({ children, delay = 0, y = MOTION.distance.base, className, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion()
  const Component = motion[as]

  return (
    <Component
      // Même état initial côté serveur et navigateur (sinon erreur d'hydratation) ;
      // « réduire les animations » rend simplement la transition instantanée.
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px 120px 0px' }}
      transition={reduce ? { duration: 0 } : { duration: MOTION.duration.base, delay, ease: MOTION.ease }}
      className={className}
    >
      {children}
    </Component>
  )
}
