import { forwardRef, useRef } from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '@/data/projects'
import { poster } from '@/lib/media'
import { tintBackground } from '@/lib/tint'
import { useDeckVideoActivation } from '@/hooks/useDeckVideoActivation'

interface Props {
  project: Project
}

export const WorkDeckPanel = forwardRef<HTMLElement, Props>(
  function WorkDeckPanel({ project }, panelRef) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const tint = project.tint ?? '#888888'
  const role = project.caseStudy.role || 'PROJECT'

  useDeckVideoActivation(videoRef, project.video)

  return (
    <article
      ref={panelRef}
      className="snap-start snap-always relative h-[100svh] w-full overflow-hidden"
      aria-label={`Project: ${project.title}, ${project.year}`}
    >
      {/* Video / image region — full-bleed cropped to fill */}
      <div className="absolute inset-x-0 top-0 bottom-[16svh] overflow-hidden bg-black">
        {project.video ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={project.video}
            poster={poster(project.video)}
            muted
            playsInline
            loop
            preload="none"
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>

      {/* Hairline above bottom band */}
      <div
        className="absolute inset-x-0 bottom-[16svh] h-px"
        style={{ background: 'color-mix(in oklch, var(--ink) 8%, transparent)' }}
      />

      {/* Bottom band */}
      <div
        className="absolute inset-x-0 bottom-0 h-[16svh] flex items-end"
        style={{ background: tintBackground(tint, 0.08) }}
      >
        <div className="w-full px-[clamp(20px,5vw,32px)] pb-[clamp(16px,4vw,24px)]">
          <h2
            className="font-serif italic"
            style={{
              fontSize: 'clamp(22px, 5.5vw, 28px)',
              color: 'color-mix(in oklch, var(--ink) 92%, transparent)',
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </h2>

          <div
            className="font-mono uppercase mt-1"
            style={{
              fontSize: '10px',
              letterSpacing: '0.1em',
              color: 'color-mix(in oklch, var(--ink) 55%, transparent)',
            }}
          >
            {project.year} · {role}
          </div>

          <Link
            to={`/work/${project.slug}`}
            className="mt-2 inline-block font-serif italic"
            style={{ fontSize: '13px', color: 'var(--accent)' }}
          >
            Experience Art →
          </Link>
        </div>
      </div>

      {/* Tap-anywhere overlay covering the video/image region */}
      <Link
        to={`/work/${project.slug}`}
        className="absolute inset-x-0 top-0 bottom-[16svh]"
        aria-label={`Open ${project.title} case study`}
      />
    </article>
  )
})
