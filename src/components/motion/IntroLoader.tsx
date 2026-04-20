import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const SESSION_KEY = 'v3-intro-seen'

/**
 * IntroLoader — first-visit-only editorial loader.
 *  • Full-viewport ink curtain with centered italic wordmark and
 *    00 → 100% counter in JetBrains Mono.
 *  • Lifts via two stacked panels splitting vertically, v3-out easing.
 *  • Sets sessionStorage so re-renders / route changes don't re-trigger.
 *  • Skipped under reduced-motion.
 */
export function IntroLoader() {
  const prefersReduced = useReducedMotion()
  const [done, setDone] = useState(() => {
    if (typeof window === 'undefined') return true
    return sessionStorage.getItem(SESSION_KEY) === '1'
  })
  const [pct, setPct] = useState(0)
  const [lifting, setLifting] = useState(false)

  useEffect(() => {
    if (done) return
    if (prefersReduced) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setDone(true)
      return
    }
    document.body.style.overflow = 'hidden'

    const start = performance.now()
    const duration = 1600
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setPct(Math.round(eased * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else {
        setLifting(true)
        // Let the curtain animation play before unmount
        setTimeout(() => {
          sessionStorage.setItem(SESSION_KEY, '1')
          setDone(true)
          document.body.style.overflow = ''
        }, 1100)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = ''
    }
  }, [done, prefersReduced])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[90]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* Top half panel */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-ink"
            animate={{ y: lifting ? '-101%' : 0 }}
            transition={{ duration: 1.05, ease: [0.77, 0, 0.175, 1] }}
          />
          {/* Bottom half panel */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-ink"
            animate={{ y: lifting ? '101%' : 0 }}
            transition={{ duration: 1.05, ease: [0.77, 0, 0.175, 1] }}
          />
          {/* Foreground content */}
          <motion.div
            className="relative flex h-full w-full flex-col items-center justify-center text-cream"
            animate={{ opacity: lifting ? 0 : 1 }}
            transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
          >
            <motion.span
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream/60"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            >
              Brendon Carbullido — 2026
            </motion.span>
            <motion.p
              className="mt-6 font-serif text-[clamp(3.25rem,10vw,8rem)] font-light italic leading-[0.92] tracking-[-0.025em]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
            >
              Art. Direction.
            </motion.p>
            <div className="mt-10 flex w-[min(68vw,32rem)] items-center gap-4">
              <motion.div
                className="h-px flex-1 origin-left bg-cream/30"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.6, ease: [0.19, 1, 0.22, 1] }}
                style={{ transformOrigin: 'left' }}
              />
              <span className="min-w-[3ch] font-mono text-[11px] uppercase tracking-[0.18em] tabular-nums text-cream/80">
                {String(pct).padStart(3, '0')}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
