import { useCallback, useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useAnimationControls,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion'
import { useOrientation } from '@/contexts/OrientationContext'

export function ExperienceToggle() {
  const prefersReduced = useReducedMotion()
  const [{ enabled, permission }, { enable, disable }] = useOrientation()
  const [blocked, setBlocked] = useState(false)
  // Tracks whether the toggle is in the visible (interactive) state.
  // Only changes at threshold crossings — not on every scroll tick.
  const [interactive, setInteractive] = useState(true)

  const controls = useAnimationControls()
  const { scrollY } = useScroll()
  const visibleRef = useRef(true)

  // Entry animation — fires once on mount, preserves the 1.8s delayed reveal
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: 1.8 },
    })
  }, [controls])

  // Scroll-driven show/hide — animation via controls, no render-cycle overhead
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const threshold = typeof window !== 'undefined' ? window.innerHeight * 0.9 : 600
    const shouldBeVisible = latest < threshold
    if (shouldBeVisible === visibleRef.current) return
    visibleRef.current = shouldBeVisible
    setInteractive(shouldBeVisible)
    controls.start(
      shouldBeVisible
        ? { opacity: 1, y: 0,  transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] } }
        : { opacity: 0, y: 20, transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] } },
    )
  })

  // Fire "Motion blocked" only when permission transitions TO denied
  const prevPermission = useRef(permission)
  useEffect(() => {
    if (prevPermission.current !== 'denied' && permission === 'denied') {
      setBlocked(true)
    }
    prevPermission.current = permission
  }, [permission])

  // Auto-clear the blocked label after 2s
  useEffect(() => {
    if (!blocked) return
    const t = setTimeout(() => setBlocked(false), 2000)
    return () => clearTimeout(t)
  }, [blocked])

  const handleTap = useCallback(async () => {
    if (enabled) {
      disable()
    } else {
      await enable()
    }
  }, [enabled, enable, disable])

  // No toggle for reduced-motion users — the effect won't fire for them anyway
  if (prefersReduced) return null

  const label = blocked ? 'Motion blocked' : enabled ? 'Experience: On' : 'Experience: Off'

  return (
    <motion.div
      className="fixed z-30 md:hidden"
      style={{
        right: '16px',
        bottom: 'calc(16px + env(safe-area-inset-bottom))',
        // Immediately non-interactive once faded out, even mid-transition
        pointerEvents: interactive ? 'auto' : 'none',
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={controls}
    >
      {/*
        Outer button provides the 44×44 minimum tap target.
        Inner span is the visible pill — kept tight to the content.
      */}
      <button
        type="button"
        onClick={handleTap}
        aria-pressed={enabled}
        aria-label={label}
        className="flex items-center justify-center"
        style={{ minWidth: '44px', minHeight: '44px' }}
      >
        <span
          className="flex items-center gap-[7px] rounded-full border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] backdrop-blur-md"
          style={{
            background: 'rgba(245, 240, 232, 0.72)',
            borderColor: 'rgba(26, 22, 18, 0.15)',
            color: 'var(--ink)',
            transition: 'background 0.3s ease, border-color 0.3s ease',
          }}
        >
          <StatusDot enabled={enabled} blocked={blocked} />
          {label}
        </span>
      </button>
    </motion.div>
  )
}

function StatusDot({ enabled, blocked }: { enabled: boolean; blocked: boolean }) {
  if (enabled) {
    return (
      <span
        aria-hidden
        className="relative flex flex-shrink-0"
        style={{ width: '6px', height: '6px' }}
      >
        {/* Subtle pulse ring — matches the availability pill in HeroMosaic */}
        <span
          className="absolute inset-0 animate-ping rounded-full opacity-60"
          style={{ background: 'var(--accent)' }}
        />
        <span
          className="relative inline-flex h-full w-full rounded-full"
          style={{ background: 'var(--accent)' }}
        />
      </span>
    )
  }

  return (
    <span
      aria-hidden
      className="flex-shrink-0 rounded-full border"
      style={{
        width: '6px',
        height: '6px',
        // Blocked: amber ring echoes the accent to indicate "tried but failed"
        borderColor: blocked
          ? 'rgba(139, 111, 71, 0.6)'
          : 'rgba(26, 22, 18, 0.30)',
        transition: 'border-color 0.3s ease',
      }}
    />
  )
}
