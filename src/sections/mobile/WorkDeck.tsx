import { useEffect, useRef, useState } from 'react'
import { projects } from '@/data/projects'
import { WorkDeckPanel } from './WorkDeckPanel'

export function WorkDeck() {
  const [activeIndex, setActiveIndex] = useState(0)
  const panelRefs = useRef<(HTMLElement | null)[]>([])

  // Track which panel is in view — drives both the progress indicator
  // and could drive video activation in a future refactor
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio >= 0.5) {
            const idx = panelRefs.current.indexOf(entry.target as HTMLElement)
            if (idx !== -1) setActiveIndex(idx)
          }
        }
      },
      { threshold: 0.5 },
    )

    const els = panelRefs.current
    els.forEach((el) => { if (el) observer.observe(el) })

    return () => observer.disconnect()
  }, [])

  const scrollToPanel = (index: number) => {
    const prefersReduced = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    panelRefs.current[index]?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
    })
  }

  const total = projects.length
  const activeTint = projects[activeIndex]?.tint ?? '#888888'

  return (
    <div className="relative h-[100svh] w-full overflow-y-scroll snap-y snap-mandatory">
      {projects.map((project, i) => (
        <WorkDeckPanel
          key={project.slug}
          project={project}
          ref={(el) => { panelRefs.current[i] = el }}
        />
      ))}

      {/* Progress indicator — 44px tap target, 2px visible track, 50vh centered */}
      <div
        className="fixed top-1/2 -translate-y-1/2 z-10"
        style={{ right: 0, width: '44px', height: '50vh' }}
      >
        {/* Visible track */}
        <div
          className="absolute top-0 bottom-0 rounded-full pointer-events-none"
          style={{
            left: '20px',
            width: '2px',
            background: 'color-mix(in oklch, var(--ink) 10%, transparent)',
          }}
        />

        {/* Fill line — grows from top to active project position */}
        <div
          className="absolute top-0 rounded-full pointer-events-none"
          style={{
            left: '20px',
            width: '2px',
            height: total > 1 ? `${(activeIndex / (total - 1)) * 100}%` : '0%',
            background: `color-mix(in oklch, ${activeTint} 50%, var(--cream))`,
            transition: 'height 0.3s ease, background 0.3s ease',
          }}
        />

        {/* Per-project tap zones with active dot */}
        {projects.map((project, i) => {
          const pct = total > 1 ? i / (total - 1) : 0
          const isActive = i === activeIndex
          const tint = project.tint ?? '#888888'
          return (
            <button
              key={project.slug}
              onClick={() => scrollToPanel(i)}
              aria-label={`Go to ${project.title}`}
              className="absolute flex items-center justify-center"
              style={{
                width: '44px',
                height: '24px',
                left: 0,
                top: `calc(${pct * 100}% - 12px)`,
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: isActive ? '6px' : '4px',
                  height: isActive ? '6px' : '4px',
                  background: isActive
                    ? `color-mix(in oklch, ${tint} 80%, var(--cream))`
                    : 'color-mix(in oklch, var(--ink) 25%, transparent)',
                  transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease',
                }}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
