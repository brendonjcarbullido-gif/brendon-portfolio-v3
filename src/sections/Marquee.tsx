import { useEffect } from 'react'
import { motion, useScroll, useVelocity, useSpring, useTransform, useReducedMotion } from 'framer-motion'

const CLIENTS = [
  'Anne Klein',
  'Joseph Abboud',
  'Lotto US',
  'Casa Amour Tequila',
  'Teeccino',
  'Kloo Coffee',
  'Kandeyce Jorden Art',
  'GCMG Agency',
  'Saints Rose Agency',
] as const

/**
 * Marquee — two counter-scrolling tracks.
 * Skew tilts with scroll velocity (spring-smoothed). Fast scroll → visible tilt,
 * still → flat. Feels kinetic when the user is moving through the page.
 */
export function Marquee() {
  const prefersReduced = useReducedMotion()
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smoothed = useSpring(velocity, { damping: 40, stiffness: 140 })
  const skewTop = useTransform(smoothed, [-3000, 0, 3000], [-6, 0, 6])
  const skewBottom = useTransform(smoothed, [-3000, 0, 3000], [6, 0, -6])

  // Reset spring's initial frame so first scroll isn't jumpy.
  useEffect(() => {
    smoothed.set(0)
  }, [smoothed])

  const doubled = [...CLIENTS, ...CLIENTS, ...CLIENTS]
  return (
    <section className="relative overflow-hidden border-y border-[color:var(--rule)] bg-cream py-6 sm:py-8 md:py-10">
      <motion.div
        className="flex whitespace-nowrap will-change-transform"
        style={{ animation: 'mq-left 38s linear infinite', skewY: prefersReduced ? 0 : skewTop }}
      >
        {doubled.map((name, i) => (
          <span
            key={`t-${i}`}
            className="flex flex-shrink-0 items-center gap-10 pr-10 font-serif italic text-ink"
            style={{ fontSize: 'clamp(1.5rem,3vw,2.75rem)', fontWeight: 300 }}
          >
            {name}
            <span className="inline-block h-[6px] w-[6px] flex-shrink-0 rounded-full bg-accent" />
          </span>
        ))}
      </motion.div>
      <motion.div
        className="mt-4 flex whitespace-nowrap will-change-transform"
        style={{ animation: 'mq-right 46s linear infinite', skewY: prefersReduced ? 0 : skewBottom }}
      >
        {[...doubled].reverse().map((name, i) => (
          <span
            key={`b-${i}`}
            className="flex flex-shrink-0 items-center gap-10 pr-10 font-mono uppercase text-ink-light"
            style={{ fontSize: '0.85rem', letterSpacing: '0.22em' }}
          >
            {name}
            <span className="inline-block h-1 w-1 flex-shrink-0 rounded-full bg-ink-light" />
          </span>
        ))}
      </motion.div>
      <style>{`
        @keyframes mq-left  { from { transform: translateX(0); }    to { transform: translateX(-33.333%); } }
        @keyframes mq-right { from { transform: translateX(-33.333%); } to { transform: translateX(0); } }
      `}</style>
    </section>
  )
}
