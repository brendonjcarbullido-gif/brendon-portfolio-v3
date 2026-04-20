import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * SectionReveal — wraps children in a clip-path `inset()` mask that animates
 * from a starting edge to fully revealed when the element enters view.
 * Edges: 'left' | 'right' | 'bottom' | 'top'.
 */
type Edge = 'left' | 'right' | 'bottom' | 'top'

export function SectionReveal({
  children,
  edge = 'left',
  delay = 0,
  duration = 1100,
  className = '',
}: {
  children: ReactNode
  edge?: Edge
  delay?: number
  duration?: number
  className?: string
}) {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)
  const [shown, setShown] = useState(prefersReduced)

  useEffect(() => {
    if (prefersReduced) return
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
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [prefersReduced])

  const closed: Record<Edge, string> = {
    left: 'inset(0 100% 0 0)',
    right: 'inset(0 0 0 100%)',
    bottom: 'inset(0 0 100% 0)',
    top: 'inset(100% 0 0 0)',
  }
  const open = 'inset(0 0 0 0)'

  return (
    <div
      ref={ref}
      className={className}
      style={{
        clipPath: shown ? open : closed[edge],
        WebkitClipPath: shown ? open : closed[edge],
        transition: `clip-path ${duration}ms cubic-bezier(0.77, 0, 0.175, 1) ${delay}ms, -webkit-clip-path ${duration}ms cubic-bezier(0.77, 0, 0.175, 1) ${delay}ms`,
        willChange: 'clip-path',
      }}
    >
      {children}
    </div>
  )
}
