import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useMediaPreload } from '@/hooks/useMediaPreload'
import { PRELOAD_ASSETS, getPageAssets } from '@/lib/preloadAssets'

const SESSION_KEY = 'v3-intro-seen'
const MIN_DISPLAY_MS = 1300  // always show for at least this long
const MAX_WAIT_MS = 9000     // never block longer than this

/**
 * IntroLoader — first-visit-only editorial loader.
 *  • Preloads all hero/rail media during the curtain so nothing pops after lift.
 *  • Counter reflects real load progress (0 → 100) with smooth easing.
 *  • Lifts via two stacked panels splitting vertically once assets are ready.
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

  // Combine global preload with any page-specific assets (e.g. case study gallery on direct link)
  const assets = done
    ? []
    : [...PRELOAD_ASSETS, ...getPageAssets(window.location.pathname)]
  const { progress } = useMediaPreload(assets)

  // Keep a ref so the RAF loop always reads the latest value without re-mounting
  const progressRef = useRef(0)
  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  useEffect(() => {
    if (done) return
    if (prefersReduced) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setDone(true)
      return
    }

    document.body.style.overflow = 'hidden'

    const start = performance.now()
    let displayPct = 0
    let raf = 0
    let lifted = false

    const tick = (now: number) => {
      const elapsed = now - start
      // Force 100% after max wait so a slow connection never blocks forever
      const realTarget = elapsed >= MAX_WAIT_MS ? 100 : progressRef.current * 100

      // Ease displayPct toward realTarget — minimum step prevents it from stalling
      const diff = realTarget - displayPct
      const step = Math.max(0.18, diff * 0.055)
      displayPct = Math.min(realTarget, displayPct + step)

      setPct(Math.round(displayPct))

      if (displayPct >= 99.5 && elapsed >= MIN_DISPLAY_MS && !lifted) {
        lifted = true
        setLifting(true)
        setTimeout(() => {
          sessionStorage.setItem(SESSION_KEY, '1')
          setDone(true)
          document.body.style.overflow = ''
        }, 1100)
        return
      }

      raf = requestAnimationFrame(tick)
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
                animate={{ scaleX: pct / 100 }}
                transition={{ duration: 0.1, ease: 'linear' }}
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
