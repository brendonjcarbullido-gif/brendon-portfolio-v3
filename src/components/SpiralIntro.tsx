import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { projects } from '@/data/projects'

/**
 * Intro overlay — an Archimedean spiral of project previews.
 *   1. ENTER  — tiles stagger in from center (95ms each)
 *   2. SPIN   — full container rotates 3 turns (3s, ease-out)
 *   3. LAND   — each tile FLIP-animates to the matching WorkCard's rect
 *              so the spiral visually flows into its final grid position
 *   4. FADE   — overlay dissolves; user continues into the homepage
 *
 * Plays once per session. Skip with click / button / reduced-motion.
 */

type Phase = 'enter' | 'spin' | 'land' | 'fade' | 'done'

const SESSION_KEY = 'dialect-intro-played'
const PHASE_MS: Record<Phase, number> = {
  enter: 1200,
  spin: 3000,
  land: 1600,
  fade: 700,
  done: 0,
}

type Delta = { x: number; y: number; scale: number }

export function SpiralIntro() {
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = useState(() => {
    if (typeof window === 'undefined') return false
    return !sessionStorage.getItem(SESSION_KEY)
  })
  const [phase, setPhase] = useState<Phase>('enter')
  const [deltas, setDeltas] = useState<Delta[] | null>(null)
  const tileRefs = useRef<(HTMLDivElement | null)[]>([])

  // Gate body scroll only while mounted.
  useLayoutEffect(() => {
    if (!mounted) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mounted])

  // Reduced-motion users get an instant dismiss.
  useEffect(() => {
    if (!mounted) return
    if (prefersReduced) {
      dismissImmediate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, prefersReduced])

  // Drive the phase timeline.
  useEffect(() => {
    if (!mounted || prefersReduced) return

    if (phase === 'enter') {
      const t = window.setTimeout(() => setPhase('spin'), PHASE_MS.enter)
      return () => window.clearTimeout(t)
    }

    if (phase === 'spin') {
      const t = window.setTimeout(() => {
        // Measure the target WorkCards without scrolling — many are below the
        // fold, so tiles will fly off-screen to land where cards will be.
        const computed: Delta[] = projects.map((p, i) => {
          const tile = tileRefs.current[i]
          const target = document.querySelector(
            `[data-spiral-target="${p.slug}"]`,
          ) as HTMLElement | null
          if (!tile || !target) return { x: 0, y: 0, scale: 1 }
          const tr = tile.getBoundingClientRect()
          const gr = target.getBoundingClientRect()
          return {
            x: gr.left + gr.width / 2 - (tr.left + tr.width / 2),
            y: gr.top + gr.height / 2 - (tr.top + tr.height / 2),
            scale: gr.width / tr.width,
          }
        })
        setDeltas(computed)
        setPhase('land')
      }, PHASE_MS.spin)
      return () => window.clearTimeout(t)
    }

    if (phase === 'land') {
      const t = window.setTimeout(() => setPhase('fade'), PHASE_MS.land)
      return () => window.clearTimeout(t)
    }

    if (phase === 'fade') {
      const t = window.setTimeout(() => {
        markPlayed()
        setMounted(false)
      }, PHASE_MS.fade)
      return () => window.clearTimeout(t)
    }
  }, [phase, mounted, prefersReduced])

  function markPlayed() {
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  function dismissImmediate() {
    markPlayed()
    setMounted(false)
  }

  function handleSkip(e: React.MouseEvent) {
    e.stopPropagation()
    dismissImmediate()
  }

  function handleOverlayClick() {
    // Clicking during enter/spin skips straight out. During land/fade let it finish.
    if (phase === 'enter' || phase === 'spin') dismissImmediate()
  }

  if (!mounted) return null

  const count = projects.length
  const r0 = 64 // inner radius in vmin
  const k = 4.4 // outward growth per radian (vmin)
  const totalTurns = 1.6
  const thetaTotal = Math.PI * 2 * totalTurns

  // Container rotation per phase.
  const containerRotate: number =
    phase === 'enter' ? -8 : phase === 'spin' ? 1080 : 1080
  const containerScale: number = phase === 'land' || phase === 'fade' ? 1 : 1

  return (
    <AnimatePresence>
      <motion.div
        key="spiral-intro"
        role="dialog"
        aria-label="Site introduction — click to enter"
        onClick={handleOverlayClick}
        className="fixed inset-0 z-[300] flex cursor-pointer items-center justify-center overflow-hidden bg-ink-deep"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'fade' ? 0 : 1 }}
        transition={{ duration: PHASE_MS.fade / 1000, ease: [0.19, 1, 0.22, 1] }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(circle at center, rgba(201,168,76,0.22) 0%, rgba(201,168,76,0) 55%)',
          }}
        />

        <button
          type="button"
          onClick={handleSkip}
          className="absolute right-6 top-6 z-10 cursor-pointer font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors duration-300 hover:text-gold md:right-10 md:top-10"
        >
          Skip intro ↗
        </button>

        <motion.div
          className="pointer-events-none absolute bottom-8 left-6 z-10 md:bottom-12 md:left-12"
          animate={{
            opacity: phase === 'land' || phase === 'fade' ? 0 : 1,
            y: phase === 'land' || phase === 'fade' ? 12 : 0,
          }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
            00 — Selected Work
          </p>
          <p className="mt-2 max-w-[24rem] font-serif text-[clamp(1.25rem,2vw,1.75rem)] font-light italic leading-tight text-cream-ds">
            {projects.length} collaborations settling into place.
          </p>
        </motion.div>

        {/* Spiral container — rotates during spin phase, stops for landing */}
        <motion.div
          className="relative"
          style={{ width: '100vmin', height: '100vmin' }}
          initial={{ rotate: -8, scale: 0.94 }}
          animate={{ rotate: containerRotate, scale: containerScale }}
          transition={{
            rotate:
              phase === 'spin'
                ? { duration: PHASE_MS.spin / 1000, ease: [0.19, 1, 0.22, 1] }
                : { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
            scale: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
          }}
        >
          {projects.map((p, i) => {
            const theta = (i / Math.max(1, count - 1)) * thetaTotal
            const radius = r0 + k * theta
            const sx = radius * Math.cos(theta - Math.PI / 2)
            const sy = radius * Math.sin(theta - Math.PI / 2)
            const tileTilt = ((theta * 180) / Math.PI) * 0.1

            const delta = deltas?.[i]
            const isLanding = (phase === 'land' || phase === 'fade') && !!delta

            return (
              <motion.div
                key={p.slug}
                ref={(el) => {
                  tileRefs.current[i] = el
                }}
                className="absolute"
                style={{
                  left: `calc(50% + ${sx}vmin)`,
                  top: `calc(50% + ${sy}vmin)`,
                  translate: '-50% -50%',
                  width: 'clamp(88px, 12vmin, 156px)',
                }}
                initial={{ opacity: 0, scale: 0.3, rotate: 0 }}
                animate={
                  isLanding && delta
                    ? {
                        x: delta.x,
                        y: delta.y,
                        scale: delta.scale,
                        rotate: 0,
                        opacity: phase === 'fade' ? 0 : 1,
                      }
                    : {
                        x: 0,
                        y: 0,
                        scale: 1,
                        rotate: tileTilt,
                        opacity: 1,
                      }
                }
                transition={
                  isLanding
                    ? {
                        duration: 1.3,
                        ease: [0.19, 1, 0.22, 1],
                        delay: i * 0.07,
                        opacity: { duration: 0.5, delay: 0.6 + i * 0.04 },
                      }
                    : {
                        delay: (i * 95) / 1000,
                        duration: 0.9,
                        ease: [0.19, 1, 0.22, 1],
                      }
                }
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
              </motion.div>
            )
          })}

          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
            initial={{ scale: 0 }}
            animate={{
              scale: phase === 'enter' ? [0, 1.2, 0.8] : phase === 'spin' ? [0.8, 0.8] : 0,
              opacity: phase === 'land' || phase === 'fade' ? 0 : 1,
            }}
            transition={{
              duration: phase === 'enter' ? 1.1 : 0.4,
              ease: [0.19, 1, 0.22, 1],
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
