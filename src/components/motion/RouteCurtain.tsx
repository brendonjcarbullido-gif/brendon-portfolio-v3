import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { preloadAssets } from '@/hooks/useMediaPreload'
import { getPageAssets } from '@/lib/preloadAssets'

const ease = [0.77, 0, 0.175, 1] as const

const ROUTE_LABEL: Record<string, string> = {
  '/': 'Index',
  '/work': 'Selected Work',
  '/about': 'About',
  '/contact': 'Contact',
  '/resume': 'Résumé',
}

const MIN_COVER_MS = 650  // time for cover animation to complete before revealing
const MAX_WAIT_MS = 7000  // never hold longer than this

/**
 * RouteCurtain — ink wipe on every route change that also preloads the
 * destination page's media before lifting, so nothing pops after reveal.
 *
 *  1. pathname changes → curtain drops in (cover).
 *  2. preloadAssets(destination) races against MAX_WAIT_MS timeout.
 *  3. once both MIN_COVER elapsed AND assets ready → curtain lifts.
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

    const assets = getPageAssets(pathname)
    const coverStart = Date.now()
    let cancelled = false

    Promise.race([
      preloadAssets(assets),
      new Promise<void>((r) => setTimeout(r, MAX_WAIT_MS)),
    ]).then(() => {
      if (cancelled) return
      const elapsed = Date.now() - coverStart
      const remaining = Math.max(0, MIN_COVER_MS - elapsed)
      setTimeout(() => {
        if (cancelled) return
        setPhase('uncovering')
        setTimeout(() => {
          if (cancelled) return
          setPhase('idle')
        }, 900)
      }, remaining)
    })

    return () => {
      cancelled = true
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
