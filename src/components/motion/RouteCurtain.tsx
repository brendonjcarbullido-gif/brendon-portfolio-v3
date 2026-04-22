import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { preloadAssets } from '@/hooks/useMediaPreload'
import { getPageAssets } from '@/lib/preloadAssets'
import { projects } from '@/data/projects'

const ease = [0.77, 0, 0.175, 1] as const

const ROUTE_LABEL: Record<string, string> = {
  '/': 'Index',
  '/work': 'Selected Work',
  '/about': 'About',
  '/contact': 'Contact',
  '/resume': 'Résumé',
}

const DEFAULT_ACCENT = '#8b6f47'

type CurtainMeta = {
  label: string
  subLabel?: string
  accentColor: string
}

function hexToRgb(hex: string) {
  const clean = hex.replace('#', '')
  const n = Number.parseInt(clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

function getCurtainMeta(pathname: string): CurtainMeta {
  if (pathname.startsWith('/work/')) {
    const slug = pathname.slice('/work/'.length)
    const project = projects.find((p) => p.slug === slug)
    if (project) {
      return {
        label: project.client,
        subLabel: project.category,
        accentColor: project.caseStudy.color,
      }
    }
  }
  return {
    label: ROUTE_LABEL[pathname] ?? 'Brendon',
    accentColor: DEFAULT_ACCENT,
  }
}

const MIN_COVER_MS = 650
const MAX_WAIT_MS = 7000

/**
 * RouteCurtain — ink wipe on every route change that also preloads the
 * destination page's media before lifting, so nothing pops after reveal.
 *
 *  1. pathname changes → curtain drops in (cover).
 *  2. preloadAssets(destination) races against MAX_WAIT_MS timeout.
 *  3. once both MIN_COVER elapsed AND assets ready → curtain lifts.
 */
export function RouteCurtain() {
  const prefersReduced = useReducedMotion()
  const { pathname } = useLocation()
  const firstRender = useRef(true)
  const [phase, setPhase] = useState<'idle' | 'covering' | 'uncovering'>('idle')
  const [meta, setMeta] = useState<CurtainMeta>({ label: 'Index', accentColor: DEFAULT_ACCENT })

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (prefersReduced) return

    setMeta(getCurtainMeta(pathname))
    setPhase('covering')

    const assets = getPageAssets(pathname)
    const coverStart = Date.now()
    let cancelled = false

    Promise.race([
      preloadAssets(assets),
      new Promise<void>((r) => setTimeout(r, MAX_WAIT_MS)),
    ]).then(() => {
      if (cancelled) return
      const elapsed = Date.now() - coverStart
      const remaining = Math.max(0, MIN_COVER_MS - elapsed)
      setTimeout(() => {
        if (cancelled) return
        setPhase('uncovering')
        setTimeout(() => {
          if (cancelled) return
          setPhase('idle')
        }, 900)
      }, remaining)
    })

    return () => {
      cancelled = true
    }
  }, [pathname, prefersReduced])

  if (prefersReduced) return null

  const { r, g, b } = hexToRgb(meta.accentColor)
  const brandTint = `radial-gradient(ellipse 60% 50% at 50% 80%, rgba(${r},${g},${b},0.12) 0%, transparent 70%)`

  return (
    <AnimatePresence>
      {phase !== 'idle' && (
        <motion.div
          key="curtain"
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[70] flex flex-col items-center justify-center bg-ink text-cream"
          style={{ background: `#0a0a0a` }}
          initial={{ y: '-101%' }}
          animate={{ y: phase === 'uncovering' ? '-101%' : 0 }}
          exit={{ y: '-101%' }}
          transition={{ duration: 0.85, ease }}
        >
          {/* brand tint glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: brandTint }}
          />

          <motion.div
            className="relative flex flex-col items-center gap-3 text-center"
            initial={{ y: 24, opacity: 0 }}
            animate={{
              y: phase === 'covering' ? 0 : -24,
              opacity: phase === 'covering' ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease, delay: phase === 'covering' ? 0.25 : 0 }}
          >
            {meta.subLabel && (
              <span
                style={{
                  fontFamily: 'DM Mono, Menlo, monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: `rgba(${r},${g},${b},0.7)`,
                }}
              >
                {meta.subLabel}
              </span>
            )}
            <span className="font-serif text-[clamp(2.5rem,9vw,7rem)] font-light italic leading-none tracking-[-0.02em]">
              {meta.label}
              <span style={{ color: meta.accentColor }}>.</span>
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
