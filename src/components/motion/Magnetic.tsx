import { useRef, type ReactNode, type ReactElement, cloneElement } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Magnetic — pulls children toward the pointer within a padded bounding box.
 * Wrap a single interactive element. Respects reduced-motion.
 *
 * strength: 0.2–0.45 feels tactile; 0.55+ gets cartoony.
 * padding:  px of "capture" zone beyond the element's rect.
 */
export function Magnetic({
  children,
  strength = 0.3,
  padding = 60,
  className,
}: {
  children: ReactNode
  strength?: number
  padding?: number
  className?: string
}) {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { damping: 18, stiffness: 260, mass: 0.35 })
  const sy = useSpring(y, { damping: 18, stiffness: 260, mass: 0.35 })

  if (prefersReduced) {
    return <span className={className}>{children}</span>
  }

  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const capped = Math.max(r.width / 2 + padding, r.height / 2 + padding)
    const dist = Math.hypot(dx, dy)
    if (dist > capped) {
      x.set(0)
      y.set(0)
      return
    }
    x.set(dx * strength)
    y.set(dy * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  // Use motion.span as the outer capture zone so child styling stays intact.
  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-block ${className ?? ''}`}
      style={{ x: sx, y: sy }}
    >
      {children}
    </motion.span>
  )
}

/**
 * MagneticInner — variant that lets the child translate while leaving
 * the outer hit-box stationary. Useful for magnetic buttons where the
 * hit target shouldn't drift (avoids flicker).
 */
export function MagneticInner({
  children,
  strength = 0.35,
  padding = 60,
}: {
  children: ReactElement
  strength?: number
  padding?: number
}) {
  const prefersReduced = useReducedMotion()
  const wrapRef = useRef<HTMLSpanElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { damping: 18, stiffness: 260, mass: 0.35 })
  const sy = useSpring(y, { damping: 18, stiffness: 260, mass: 0.35 })

  if (prefersReduced) return <>{children}</>

  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const capped = Math.max(r.width / 2 + padding, r.height / 2 + padding)
    if (Math.hypot(dx, dy) > capped) {
      x.set(0)
      y.set(0)
      return
    }
    x.set(dx * strength)
    y.set(dy * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const wrapped = cloneElement(children, {
    style: { ...(children.props.style ?? {}), transform: 'translateZ(0)' },
  })

  return (
    <span
      ref={wrapRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="inline-block"
    >
      <motion.span className="inline-block" style={{ x: sx, y: sy }}>
        {wrapped}
      </motion.span>
    </span>
  )
}
