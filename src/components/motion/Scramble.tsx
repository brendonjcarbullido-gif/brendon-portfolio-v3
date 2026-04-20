import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Scramble — renders `text` but on-mount scrambles through random chars then
 * settles into the correct value. Uses IntersectionObserver so it triggers
 * only when visible. Great for mono section labels.
 */
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+·'

export function Scramble({
  text,
  className,
  durationMs = 900,
}: {
  text: string
  className?: string
  durationMs?: number
}) {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement | null>(null)
  const [display, setDisplay] = useState(prefersReduced ? text : ' '.repeat(text.length))

  useEffect(() => {
    if (prefersReduced) {
      setDisplay(text)
      return
    }
    const el = ref.current
    if (!el) return

    let rafId = 0
    let started = false
    let startTime = 0

    const tick = (now: number) => {
      if (!startTime) startTime = now
      const t = Math.min(1, (now - startTime) / durationMs)
      const out = text
        .split('')
        .map((ch, j) => {
          if (ch === ' ') return ' '
          const threshold = j / text.length
          if (t >= threshold + 0.2) return ch
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        })
        .join('')
      setDisplay(out)
      if (t < 1) rafId = requestAnimationFrame(tick)
      else setDisplay(text)
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (started) return
        for (const e of entries) {
          if (e.isIntersecting) {
            started = true
            io.disconnect()
            rafId = requestAnimationFrame(tick)
            break
          }
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [text, durationMs, prefersReduced])

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display}
    </span>
  )
}
