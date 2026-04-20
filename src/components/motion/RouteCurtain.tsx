import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const ease = [0.77, 0, 0.175, 1] as const

const ROUTE_LABEL: Record<string, string> = {
  '/': 'Index',
  '/work': 'Selected Work',
  '/about': 'About',
  '/contact': 'Contact',
  '/resume': 'Résumé',
}

/**
 * RouteCurtain — standalone ink wipe that runs on every route change.
 * Lives at the app root, outside of <Routes>, so it can't interfere
 * with sticky/scroll-linked sections inside a page.
 *
 *  1. pathname changes → curtain drops in from above (cover).
 *  2. brief pause with the route label stamped in serif italic.
 *  3. curtain lifts off the top, revealing the new page.
 *
 * Skipped on very first mount (IntroLoader handles that) and under
 * reduced-motion.
 */
export function RouteCurtain() {
  const prefersReduced = useReducedMotion()
  const { pathname } = useLocation()
  const firstRender = useRef(true)
  const [phase, setPhase] = useState<'idle' | 'covering' | 'uncovering'>('idle')
  const [label, setLabel] = useState('Index')

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (prefersReduced) return

    setLabel(
      ROUTE_LABEL[pathname] ??
        (pathname.startsWith('/work/') ? 'Case Study' : 'Brendon'),
    )
    setPhase('covering')
    const t1 = setTimeout(() => setPhase('uncovering'), 650)
    const t2 = setTimeout(() => setPhase('idle'), 650 + 900)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [pathname, prefersReduced])

  if (prefersReduced) return null

  return (
    <AnimatePresence>
      {phase !== 'idle' && (
        <motion.div
          key="curtain"
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center bg-ink text-cream"
          initial={{ y: '-101%' }}
          animate={{ y: phase === 'uncovering' ? '-101%' : 0 }}
          exit={{ y: '-101%' }}
          transition={{ duration: 0.85, ease }}
        >
          <motion.span
            className="font-serif text-[clamp(2.5rem,9vw,7rem)] font-light italic leading-none tracking-[-0.02em]"
            initial={{ y: 24, opacity: 0 }}
            animate={{
              y: phase === 'covering' ? 0 : -24,
              opacity: phase === 'covering' ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease, delay: phase === 'covering' ? 0.25 : 0 }}
          >
            {label}
            <span className="text-accent">.</span>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
