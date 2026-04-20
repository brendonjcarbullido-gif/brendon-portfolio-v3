import { useRef, useState } from 'react'
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
 * ProjectsRail — the "Horizontal Scroll Journey" centerpiece.
 *
 * The outer section is ~N × 100vh tall. Inside, a sticky 100svh wrapper pins a
 * single horizontal track. Vertical scroll progress is mapped onto the track's
 * X translation — so as the user scrolls down, projects slide past horizontally.
 *
 * Each project panel is a large full-bleed video/image with corner typography,
 * numbered index, and a subtle scale-on-reveal. Progress bar at the top.
 */

const GAP = 32
const PANEL_WIDTH_VW = 62

export function ProjectsRail() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Map vertical progress to horizontal translation. Total travel = (N * panel + (N-1) gaps) - one viewport.
  const panelCount = projects.length
  const travel = prefersReduced
    ? '0vw'
    : `calc(-${(panelCount - 1) * PANEL_WIDTH_VW}vw - ${(panelCount - 1) * GAP}px + 18vw)`
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
      style={{ height: `${panelCount * 100}svh` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Section label + progress */}
        <div className="relative z-10 flex items-start justify-between px-6 pt-28 md:px-10 md:pt-32">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-light">
              01 — Selected Work
            </p>
            <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,4rem)] font-light italic leading-none tracking-[-0.02em] text-ink">
              A reel of recent collaborations.
            </h2>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-light">
              {String(activeIndex + 1).padStart(2, '0')} / {String(panelCount).padStart(2, '0')}
            </span>
            <div className="relative h-px w-32 bg-ink/15">
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
            className="absolute inset-y-0 left-0 flex items-center pl-[18vw] pr-[20vw]"
            style={{ x, gap: `${GAP}px` }}
          >
            {projects.map((p, i) => (
              <ProjectPanel key={p.slug} index={i} project={p} active={i === activeIndex} />
            ))}
          </motion.div>
        </div>

        {/* Mobile fallback hint */}
        <p className="block px-6 pb-6 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-light md:hidden">
          Scroll slowly — the reel moves with you.
        </p>
      </div>
    </section>
  )
}

function ProjectPanel({
  project,
  index,
  active,
}: {
  project: (typeof projects)[number]
  index: number
  active: boolean
}) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="group relative block h-[68svh] flex-shrink-0 overflow-hidden bg-cream-2"
      style={{ width: `${PANEL_WIDTH_VW}vw` }}
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
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
      </motion.div>

      {/* Top row — index + client */}
      <div className="absolute left-5 right-5 top-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-cream">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <span>{project.client}</span>
      </div>

      {/* Bottom row — title + category + year */}
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 text-cream">
        <h3 className="max-w-[24ch] font-serif text-[clamp(1.75rem,3vw,3rem)] font-light italic leading-[0.98] tracking-[-0.02em]">
          {project.title}
        </h3>
        <span className="hidden whitespace-nowrap pb-2 font-mono text-[10px] uppercase tracking-[0.16em] md:block">
          {project.category} · {String(project.year)}
        </span>
      </div>

      {/* Corner arrow */}
      <span className="absolute right-5 top-5 translate-x-2 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-0 group-hover:opacity-100">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M6 14L14 6M14 6H8M14 6V12" stroke="#F5F0E8" strokeWidth="1" />
        </svg>
      </span>
    </Link>
  )
}
