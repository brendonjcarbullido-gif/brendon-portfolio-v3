import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/data/projects'

/**
 * Full-screen intro overlay — previews projects arranged along an Archimedean
 * spiral. Plays once per session. Dismisses on click, skip button, or timeout.
 *
 * Spiral formula: r(θ) = r0 + k·θ, θ sweeps two revolutions across N items.
 * Each tile is positioned with polar → cartesian and rotated tangentially.
 */
const AUTO_DISMISS_MS = 5200
const REVEAL_STAGGER_MS = 95
const SESSION_KEY = 'dialect-intro-played'

export function SpiralIntro() {
  const [mounted, setMounted] = useState(() => {
    if (typeof window === 'undefined') return false
    return !sessionStorage.getItem(SESSION_KEY)
  })
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!mounted) return
    timerRef.current = window.setTimeout(() => dismiss(), AUTO_DISMISS_MS)
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [mounted])

  function dismiss() {
    if (!mounted) return
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      // SSR or sandboxed contexts — ignore
    }
    setMounted(false)
  }

  if (!mounted) return null

  const count = projects.length
  // Spiral parameters — chosen for 8 items to feel like two loose revolutions.
  const r0 = 64 // innermost radius in vmin
  const k = 4.6 // outward growth per radian in vmin
  const totalTurns = 1.6
  const thetaTotal = Math.PI * 2 * totalTurns

  return (
    <AnimatePresence>
      <motion.div
        key="spiral-intro"
        role="dialog"
        aria-label="Site introduction — click anywhere to enter"
        onClick={dismiss}
        className="fixed inset-0 z-[300] flex cursor-pointer items-center justify-center overflow-hidden bg-ink-deep"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } }}
      >
        {/* Radial gold glow behind spiral */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(circle at center, rgba(201,168,76,0.22) 0%, rgba(201,168,76,0) 55%)',
          }}
        />

        {/* Skip */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            dismiss()
          }}
          className="absolute right-6 top-6 z-10 cursor-pointer font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors duration-300 hover:text-gold md:right-10 md:top-10"
        >
          Skip intro ↗
        </button>

        {/* Caption — bottom left, stays fixed while spiral rotates */}
        <div className="pointer-events-none absolute bottom-8 left-6 z-10 md:bottom-12 md:left-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
            00 — Selected Work
          </p>
          <p className="mt-2 max-w-[24rem] font-serif text-[clamp(1.25rem,2vw,1.75rem)] font-light italic leading-tight text-cream-ds">
            {projects.length} collaborations. Click anywhere to enter.
          </p>
        </div>

        {/* The spiral itself — slow continuous rotation after settle */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ rotate: -6, scale: 0.9 }}
          animate={{ rotate: [-6, 0, 14], scale: [0.9, 1, 1] }}
          transition={{
            duration: 4.8,
            times: [0, 0.35, 1],
            ease: [0.19, 1, 0.22, 1],
          }}
          style={{ width: '100vmin', height: '100vmin' }}
        >
          {projects.map((p, i) => {
            const theta = (i / (count - 1)) * thetaTotal
            const radius = r0 + k * theta // in vmin units (we'll convert via calc())
            const x = radius * Math.cos(theta - Math.PI / 2)
            const y = radius * Math.sin(theta - Math.PI / 2)
            const tileRotate = ((theta * 180) / Math.PI) * 0.12 // subtle tangential tilt

            return (
              <motion.figure
                key={p.slug}
                className="absolute"
                style={{
                  left: `calc(50% + ${x}vmin)`,
                  top: `calc(50% + ${y}vmin)`,
                  translate: '-50% -50%',
                  width: 'clamp(88px, 13vmin, 168px)',
                }}
                initial={{ opacity: 0, scale: 0.4, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: tileRotate }}
                transition={{
                  delay: (i * REVEAL_STAGGER_MS) / 1000,
                  duration: 0.9,
                  ease: [0.19, 1, 0.22, 1],
                }}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#141412] ring-1 ring-gold/20">
                  {p.mediaType === 'video' && p.video ? (
                    <video
                      src={p.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  ) : p.image ? (
                    <img
                      src={p.image}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  ) : null}
                  <span className="absolute bottom-1 left-1 font-mono text-[8px] uppercase tracking-[0.16em] text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </motion.figure>
            )
          })}

          {/* Center mark */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute h-2 w-2 rounded-full bg-gold"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0.6] }}
            transition={{ duration: 2.4, ease: [0.19, 1, 0.22, 1] }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
