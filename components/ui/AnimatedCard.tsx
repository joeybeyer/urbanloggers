'use client'

import { motion } from 'framer-motion'

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedCard({ children, className }: AnimatedCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.03, boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)' }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}
