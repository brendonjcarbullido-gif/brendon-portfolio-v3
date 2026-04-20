import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Project } from '@/data/projects'
import { ease } from '@/constants/animation'

export interface WorkCardProps {
  project: Project
  onClick?: () => void
  index?: number
  /** Use a link (to case study) instead of a button that opens a modal. */
  asLink?: boolean
}

export function WorkCard({ project, onClick, asLink }: WorkCardProps) {
  const year = String(project.year)
  const Wrapper: React.ElementType = asLink ? Link : 'button'
  const wrapperProps = asLink
    ? { to: `/work/${project.slug}` }
    : { type: 'button' as const, onClick }

  return (
    <Wrapper
      {...wrapperProps}
      className="group relative block w-full cursor-pointer bg-transparent text-left"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream-2">
        <motion.div
          className="relative h-full w-full"
          initial={false}
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 1.2, ease }}
        >
          {project.mediaType === 'video' && project.video ? (
            <video
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              className="block h-full w-full object-cover"
            />
          ) : project.image ? (
            <img
              src={project.image}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : null}
        </motion.div>
        <span className="pointer-events-none absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.16em] text-cream mix-blend-difference">
          {project.client}
        </span>
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-6">
        <h3 className="font-serif text-[clamp(1.25rem,2.2vw,2rem)] font-light italic leading-tight text-ink transition-colors duration-500 group-hover:text-accent">
          {project.title}
        </h3>
        <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-ink-light">
          {project.category} · {year}
        </span>
      </div>
    </Wrapper>
  )
}
