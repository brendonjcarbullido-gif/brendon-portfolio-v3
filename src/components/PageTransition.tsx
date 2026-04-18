import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const easeExit = [0.43, 0.13, 0.23, 0.96] as const

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.45, delay: 0.1, ease: easeExit },
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.35, ease: easeExit },
      }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  )
}
