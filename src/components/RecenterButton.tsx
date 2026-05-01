import { useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useOrientation } from '@/contexts/OrientationContext'
import { useScrollVisibility } from '@/hooks/useScrollVisibility'

export function RecenterButton() {
  const prefersReduced = useReducedMotion()
  const [{ enabled }, { recenter }] = useOrientation()
  const { controls, interactive } = useScrollVisibility()

  const handleTap = useCallback(() => {
    if (enabled) recenter()
  }, [enabled, recenter])

  if (prefersReduced) return null

  return (
    <motion.div
      style={{ pointerEvents: interactive ? 'auto' : 'none' }}
      initial={{ opacity: 0, y: 12 }}
      animate={controls}
    >
      {/*
        Outer button provides the 44×44 minimum tap target.
        Inner span is the visible pill — matches ExperienceToggle's pill exactly.
      */}
      <button
        type="button"
        onClick={handleTap}
        aria-label="Recenter motion baseline"
        aria-disabled={!enabled}
        className="flex items-center justify-center"
        style={{
          minWidth: '44px',
          minHeight: '44px',
          cursor: enabled ? 'pointer' : 'not-allowed',
        }}
      >
        <span
          className="flex items-center justify-center rounded-full border backdrop-blur-md"
          style={{
            padding: '12px',
            background: 'rgba(245, 240, 232, 0.72)',
            borderColor: 'rgba(26, 22, 18, 0.15)',
            color: 'var(--ink)',
            opacity: enabled ? 1 : 0.35,
            transition: 'opacity 0.3s ease, background 0.3s ease, border-color 0.3s ease',
          }}
        >
          <CrosshairIcon />
        </span>
      </button>
    </motion.div>
  )
}

function CrosshairIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      style={{ color: 'var(--ink)' }}
    >
      <circle cx="7" cy="7" r="1" fill="currentColor" />
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <line x1="7" y1="0" x2="7" y2="2.5" stroke="currentColor" strokeWidth="0.8" />
      <line x1="7" y1="11.5" x2="7" y2="14" stroke="currentColor" strokeWidth="0.8" />
      <line x1="0" y1="7" x2="2.5" y2="7" stroke="currentColor" strokeWidth="0.8" />
      <line x1="11.5" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  )
}
