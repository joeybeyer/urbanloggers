'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimatedSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function AnimatedSection({ children, delay = 0, className }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
