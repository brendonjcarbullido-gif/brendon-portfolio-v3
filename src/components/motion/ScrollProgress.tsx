import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * ScrollProgress — thin accent-colored bar fixed at the top of the viewport
 * that scales horizontally with total page scroll progress. Layered under
 * the Nav. Spring-smoothed so it feels organic, not linear.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  })
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[45] h-[2px] origin-left bg-accent"
      style={{ scaleX }}
    />
  )
}
