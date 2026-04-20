import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

/**
 * RoleRotator — vertically-masked italic serif crossfade.
 * Cycles through an array of roles, each holds for `intervalMs`.
 * Height is locked so surrounding layout never shifts.
 */
export function RoleRotator({
  roles,
  intervalMs = 2800,
  className = '',
}: {
  roles: readonly string[]
  intervalMs?: number
  className?: string
}) {
  const prefersReduced = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (prefersReduced) return
    const id = window.setInterval(() => setI((n) => (n + 1) % roles.length), intervalMs)
    return () => window.clearInterval(id)
  }, [roles.length, intervalMs, prefersReduced])

  return (
    <span className={`relative inline-block overflow-hidden align-bottom ${className}`} aria-live="polite">
      {/* invisible text locks the box height to the widest role */}
      <span className="invisible block whitespace-nowrap">
        {roles.reduce((a, b) => (a.length >= b.length ? a : b), '')}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={roles[i]}
          className="absolute inset-0 flex items-center whitespace-nowrap"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
