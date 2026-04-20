import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Cursor — editorial custom cursor.
 *  • Small dot by default (mix-blend-difference reads over any bg)
 *  • Elements with `data-cursor="Label"` morph it into a labeled pill
 *  • Elements with `data-cursor-scale` grow the dot without a label
 * Disabled on touch, reduced-motion, or when pointer is not fine.
 */
export function Cursor() {
  const prefersReduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [scaled, setScaled] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 })
  const sy = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 })
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReduced) return
    const fine = matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(fine.matches)
    update()
    fine.addEventListener('change', update)
    return () => fine.removeEventListener('change', update)
  }, [prefersReduced])

  useEffect(() => {
    if (!enabled) return

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    const over = (e: Event) => {
      const t = e.target as Element | null
      if (!t || !(t instanceof Element)) return
      const el = t.closest('[data-cursor], [data-cursor-scale], a, button')
      if (!el) {
        setLabel(null)
        setScaled(false)
        return
      }
      const next = el.getAttribute('data-cursor')
      const scale = el.hasAttribute('data-cursor-scale')
      if (next) setLabel(next)
      else setLabel(null)
      if (scale || el.tagName === 'A' || el.tagName === 'BUTTON') setScaled(true)
      else setScaled(false)
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    window.addEventListener('pointerleave', leave)
    window.addEventListener('pointerenter', enter)
    document.documentElement.style.cursor = 'none'
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      window.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerenter', enter)
      document.documentElement.style.cursor = ''
    }
  }, [enabled, x, y, visible])

  if (!enabled) return null

  const mode: 'dot' | 'ring' | 'label' = label ? 'label' : scaled ? 'ring' : 'dot'

  return (
    <motion.div
      ref={ringRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] flex items-center justify-center"
      style={{
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
        mixBlendMode: 'difference',
        opacity: visible ? 1 : 0,
        transition: 'opacity 200ms ease',
      }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-cream text-[10px] font-mono uppercase tracking-[0.18em] text-ink"
        animate={{
          width: mode === 'label' ? 92 : mode === 'ring' ? 36 : 8,
          height: mode === 'label' ? 30 : mode === 'ring' ? 36 : 8,
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 260, mass: 0.5 }}
      >
        <motion.span
          key={label ?? 'empty'}
          className="select-none whitespace-nowrap px-3"
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: mode === 'label' ? 1 : 0, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
      </motion.div>
    </motion.div>
  )
}
