import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
} from 'framer-motion'
import { projects } from '@/data/projects'

/**
 * ProjectsRail — horizontal scroll-linked rail on all breakpoints, with
 * panel widths and rail travel tuned per viewport class:
 *   mobile   : panel 86vw, gap 16px
 *   tablet   : panel 72vw, gap 24px
 *   desktop  : panel 62vw, gap 32px
 */

type Size = 'mobile' | 'tablet' | 'desktop'

function useSize(): Size {
  const [size, setSize] = useState<Size>(() => {
    if (typeof window === 'undefined') return 'desktop'
    if (window.innerWidth < 768) return 'mobile'
    if (window.innerWidth < 1280) return 'tablet'
    return 'desktop'
  })
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setSize(w < 768 ? 'mobile' : w < 1280 ? 'tablet' : 'desktop')
    }
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return size
}

const CONFIG = {
  mobile: { panelVw: 86, gap: 16, leadPadVw: 7, trailPadVw: 7 },
  tablet: { panelVw: 72, gap: 24, leadPadVw: 14, trailPadVw: 14 },
  desktop: { panelVw: 62, gap: 32, leadPadVw: 18, trailPadVw: 20 },
} as const

export function ProjectsRail() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const size = useSize()
  const cfg = CONFIG[size]
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const panelCount = projects.length
  const travel = prefersReduced
    ? '0vw'
    : `calc(-${(panelCount - 1) * cfg.panelVw}vw - ${(panelCount - 1) * cfg.gap}px + ${cfg.leadPadVw}vw)`
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', travel])
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(panelCount - 1, Math.max(0, Math.round(v * (panelCount - 1))))
    setActiveIndex(idx)
  })

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative"
      // Tune total height so horizontal travel feels right on each viewport.
      style={{ height: `${panelCount * (size === 'mobile' ? 85 : 100)}svh` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Section label + progress */}
        <div className="relative z-10 flex items-start justify-between gap-4 px-5 pt-24 sm:px-6 sm:pt-28 md:px-10 md:pt-32">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-light sm:text-[11px]">
              01 — Selected Work
            </p>
            <h2 className="mt-2 font-serif text-[clamp(1.75rem,4.5vw,4rem)] font-light italic leading-[0.98] tracking-[-0.02em] text-ink sm:mt-3 sm:leading-none">
              A reel of recent
              <br className="md:hidden" />
              <span className="md:ml-2"> collaborations.</span>
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-3 pt-1 md:gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-light">
              {String(activeIndex + 1).padStart(2, '0')} / {String(panelCount).padStart(2, '0')}
            </span>
            <div className="relative hidden h-px w-16 bg-ink/15 sm:block md:w-32">
              <motion.div
                className="absolute inset-y-0 left-0 origin-left bg-ink"
                style={{ scaleX: progressScale }}
              />
            </div>
          </div>
        </div>

        {/* Horizontal track */}
        <div className="relative flex-1">
          <motion.div
            className="absolute inset-y-0 left-0 flex items-center"
            style={{
              x,
              gap: `${cfg.gap}px`,
              paddingLeft: `${cfg.leadPadVw}vw`,
              paddingRight: `${cfg.trailPadVw}vw`,
            }}
          >
            {projects.map((p, i) => (
              <ProjectPanel
                key={p.slug}
                index={i}
                project={p}
                active={i === activeIndex}
                panelVw={cfg.panelVw}
                size={size}
              />
            ))}
          </motion.div>
        </div>

        <p className="block px-5 pb-4 pt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-light sm:px-6 sm:pb-6 md:hidden">
          Scroll down — the reel moves with you ↗
        </p>
      </div>
    </section>
  )
}

function ProjectPanel({
  project,
  index,
  active,
  panelVw,
  size,
}: {
  project: (typeof projects)[number]
  index: number
  active: boolean
  panelVw: number
  size: Size
}) {
  const panelHeight = size === 'mobile' ? '62svh' : size === 'tablet' ? '66svh' : '68svh'
  return (
    <Link
      to={`/work/${project.slug}`}
      className="group relative block flex-shrink-0 overflow-hidden bg-cream-2"
      style={{ width: `${panelVw}vw`, height: panelHeight }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ scale: active ? 1 : 1.04 }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      >
        {project.mediaType === 'video' && project.video ? (
          <video
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        ) : project.image ? (
          <img
            src={project.image}
            alt={project.client}
            loading={index < 3 ? 'eager' : 'lazy'}
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.03]"
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/15 to-transparent" />
      </motion.div>

      {/* Top row */}
      <div className="absolute left-4 right-4 top-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-cream sm:left-5 sm:right-5 sm:top-5 sm:text-[10px]">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <span>{project.client}</span>
      </div>

      {/* Bottom row */}
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-cream sm:bottom-5 sm:left-5 sm:right-5 md:bottom-6 md:left-6 md:right-6">
        <h3 className="max-w-[22ch] font-serif text-[clamp(1.25rem,3vw,3rem)] font-light italic leading-[1.02] tracking-[-0.02em]">
          {project.title}
        </h3>
        <span className="hidden whitespace-nowrap pb-2 font-mono text-[10px] uppercase tracking-[0.16em] md:block">
          {project.category} · {String(project.year)}
        </span>
      </div>

      <span className="absolute right-4 top-4 translate-x-2 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-0 group-hover:opacity-100 sm:right-5 sm:top-5">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M6 14L14 6M14 6H8M14 6V12" stroke="#F5F0E8" strokeWidth="1" />
        </svg>
      </span>
    </Link>
  )
}
