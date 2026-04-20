import { useRef, useState, useEffect, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * SplitReveal — masked per-line slide-up reveal for multi-line headings.
 * Pass each visual line as its own child (use spans or strings). The
 * component clips each line and slides it up from below on trigger.
 *
 * Descender handling: each line wrapper reserves `padding-bottom` and
 * compensates with `margin-bottom` so italic g/p/y tails aren't clipped
 * while stacked line-spacing stays identical to the un-masked h2.
 */
export function SplitReveal({
  children,
  delay = 0,
  stagger = 0.08,
  duration = 1.05,
  trigger = 'inView',
  threshold = 0.25,
  className = '',
  as: Tag = 'span',
}: {
  children: ReactNode[]
  delay?: number
  stagger?: number
  duration?: number
  trigger?: 'inView' | 'mount'
  threshold?: number
  className?: string
  as?: 'span' | 'h2' | 'h1' | 'p' | 'div'
}) {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(trigger === 'mount' || !!prefersReduced)

  useEffect(() => {
    if (shown || trigger !== 'inView') return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true)
            io.disconnect()
            break
          }
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [shown, trigger, threshold])

  const lines = Array.isArray(children) ? children : [children]

  return (
    <Tag ref={ref as never} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className="block align-top"
          style={{
            // Reserve space for italic descenders (f/g/p/y) + ascenders.
            // Negative margin restores natural stacked line-spacing.
            overflow: 'hidden',
            paddingTop: '0.08em',
            paddingBottom: '0.22em',
            marginTop: '-0.08em',
            marginBottom: '-0.22em',
          }}
        >
          <motion.span
            className="block"
            initial={false}
            animate={{ y: shown ? '0%' : '110%' }}
            transition={{
              duration,
              ease: [0.19, 1, 0.22, 1],
              delay: delay + i * stagger,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
