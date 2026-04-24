import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type PanInfo,
} from 'framer-motion'
import { projects } from '@/data/projects'

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

type RailCfg = (typeof CONFIG)[keyof typeof CONFIG]

function getSnapX(index: number, cfg: RailCfg, vw: number): number {
  const panelPx = (cfg.panelVw / 100) * vw
  return -(index * (panelPx + cfg.gap))
}

export function ProjectsRail() {
  const prefersReduced = useReducedMotion()
  const size = useSize()
  const cfg = CONFIG[size]
  const panelCount = projects.length

  const [activeIndex, setActiveIndex] = useState(0)
  const isDragging = useRef(false)

  const x = useMotionValue(0)
  const xSpring = useSpring(x, { damping: 35, stiffness: 280, mass: 0.8 })

  const handleDragStart = () => {
    isDragging.current = true
  }

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const vw = window.innerWidth
    const velocity = info.velocity.x
    let next = activeIndex

    if (velocity < -300) {
      next = Math.min(panelCount - 1, activeIndex + 1)
    } else if (velocity > 300) {
      next = Math.max(0, activeIndex - 1)
    } else {
      const current = x.get()
      let minDist = Infinity
      for (let i = 0; i < panelCount; i++) {
        const snapX = getSnapX(i, cfg, vw)
        const dist = Math.abs(current - snapX)
        if (dist < minDist) {
          minDist = dist
          next = i
        }
      }
    }

    setActiveIndex(next)
    x.set(getSnapX(next, cfg, window.innerWidth))
    setTimeout(() => {
      isDragging.current = false
    }, 50)
  }

  const panelHeight = size === 'mobile' ? '56svh' : size === 'tablet' ? '66svh' : '68svh'

  return (
    <section
      id="work"
      className="relative bg-cream overflow-hidden"
      style={{ height: '100svh' }}
    >
      <div className="flex h-full flex-col overflow-hidden">

        {/* Header row */}
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
              <div
                className="absolute inset-y-0 left-0 origin-left bg-ink transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
                style={{ transform: `scaleX(${activeIndex / Math.max(1, panelCount - 1)})` }}
              />
            </div>
          </div>
        </div>

        {/* Drag track */}
        <div className="relative flex-1 select-none">
          <motion.div
            drag="x"
            dragConstraints={{
              left: getSnapX(panelCount - 1, cfg, typeof window !== 'undefined' ? window.innerWidth : 1440),
              right: 0,
            }}
            dragElastic={0.06}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{
              x: prefersReduced ? x : xSpring,
              gap: `${cfg.gap}px`,
              paddingLeft: `${cfg.leadPadVw}vw`,
              paddingRight: `${cfg.trailPadVw}vw`,
              cursor: 'grab',
              touchAction: 'pan-y',
            }}
            whileDrag={{ cursor: 'grabbing' }}
            className="absolute inset-y-0 left-0 flex items-center"
          >
            {projects.map((p, i) => (
              <ProjectPanel
                key={p.slug}
                index={i}
                project={p}
                active={i === activeIndex}
                panelVw={cfg.panelVw}
                panelHeight={panelHeight}
                isDragging={isDragging}
              />
            ))}
          </motion.div>
        </div>

        {/* Hint */}
        <p className="block px-5 pb-5 pt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-light sm:px-6 sm:pb-6">
          <motion.span
            className="inline-flex items-center gap-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="block h-px w-5 bg-ink-light" />
            Drag to browse
          </motion.span>
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
  panelHeight,
  isDragging,
}: {
  project: (typeof projects)[number]
  index: number
  active: boolean
  panelVw: number
  panelHeight: string
  isDragging: React.RefObject<boolean>
}) {
  const handleClick = (e: React.MouseEvent) => {
    if (isDragging.current) e.preventDefault()
  }

  return (
    <Link
      to={`/work/${project.slug}`}
      data-cursor="View"
      onClick={handleClick}
      className="group relative block flex-shrink-0 overflow-hidden bg-cream-2"
      style={{ width: `${panelVw}vw`, height: panelHeight }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ scale: active ? 1 : 1.04, y: active ? -8 : 0 }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      >
        {project.mediaType === 'video' && project.video ? (
          <video
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            poster={project.image}
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
