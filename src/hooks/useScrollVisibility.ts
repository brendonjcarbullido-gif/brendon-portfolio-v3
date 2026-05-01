import { useEffect, useRef, useState } from 'react'
import {
  useScroll,
  useAnimationControls,
  useMotionValueEvent,
  type AnimationControls,
} from 'framer-motion'

type Options = {
  thresholdMultiplier?: number  // default 0.9 — fraction of viewport height
  fadeOutY?: number              // default 20 — pixels of slide-down on hide
  duration?: number              // default 0.3 — show/hide transition seconds
  entryDelay?: number            // default 1.8 — initial reveal delay seconds
}

export function useScrollVisibility(opts?: Options): {
  controls: AnimationControls
  interactive: boolean
} {
  const {
    thresholdMultiplier = 0.9,
    fadeOutY = 20,
    duration = 0.3,
    entryDelay = 1.8,
  } = opts ?? {}

  const controls = useAnimationControls()
  const { scrollY } = useScroll()
  const [interactive, setInteractive] = useState(true)
  const visibleRef = useRef(true)

  // Entry animation — fires once on mount after entryDelay
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: entryDelay },
    })
  }, [controls, entryDelay])

  // Scroll-driven show/hide — only fires at threshold crossings
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const threshold = typeof window !== 'undefined' ? window.innerHeight * thresholdMultiplier : 600
    const shouldBeVisible = latest < threshold
    if (shouldBeVisible === visibleRef.current) return
    visibleRef.current = shouldBeVisible
    setInteractive(shouldBeVisible)
    controls.start(
      shouldBeVisible
        ? { opacity: 1, y: 0,         transition: { duration, ease: [0.19, 1, 0.22, 1] } }
        : { opacity: 0, y: fadeOutY,  transition: { duration, ease: [0.19, 1, 0.22, 1] } },
    )
  })

  return { controls, interactive }
}
