import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { heroLookInput } from '@/three/heroLookInput'

const ROLES = [
  'Art Director',
  'Creative Director',
  'Brand Strategist',
  'Content Director',
]

function RoleRotator() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        height: '1.6em',
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            color: 'inherit',
            fontFamily: 'inherit',
            fontStyle: 'inherit',
            fontWeight: 'inherit',
            fontSize: 'inherit',
            letterSpacing: 'inherit',
            lineHeight: 'inherit',
            whiteSpace: 'nowrap',
          }}
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export function HeroTextOverlay() {
  const roleRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const current = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const animate = () => {
      current.current.x += (heroLookInput.x - current.current.x) * 0.05
      current.current.y += (heroLookInput.y - current.current.y) * 0.05

      const cx = current.current.x
      const cy = current.current.y

      if (roleRef.current) {
        roleRef.current.style.transform = `translate(${cx * -18}px, ${cy * 12}px)`
      }
      if (taglineRef.current) {
        taglineRef.current.style.transform = `translate(${cx * -10}px, ${cy * 7}px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const isLandscape =
    typeof window !== 'undefined' &&
    window.innerWidth > window.innerHeight &&
    window.innerWidth < 1024
  const bottomPos = isLandscape ? '12%' : isMobile ? 'clamp(140px, 30%, 240px)' : '18%'

  return (
    <div
      style={{
        position: 'absolute',
        bottom: bottomPos,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        zIndex: 10,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <div
        ref={roleRef}
        style={{
          minHeight: '4rem',
          color: '#C4A882',
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
          letterSpacing: '0.04em',
          lineHeight: 1,
          willChange: 'transform',
        }}
      >
        <RoleRotator />
      </div>

      <div
        ref={taglineRef}
        style={{
          color: 'rgba(245,240,232,0.55)',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 300,
          fontSize: 'clamp(0.7rem, 1.8vw, 1.1rem)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}
      >
        Full-ownership creative.&nbsp;&nbsp;Los Angeles.
      </div>
    </div>
  )
}
