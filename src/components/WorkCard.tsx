import { motion } from 'framer-motion'
import type { Project } from '@/data/projects'
import { ease } from '@/constants/animation'

export interface WorkCardProps {
  project: Project
  onClick: () => void
  index?: number
}

export function WorkCard({ project, onClick }: WorkCardProps) {
  const year = String(project.year)

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative block w-full cursor-pointer bg-transparent text-left"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#141412]">
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
      </div>

      <div className="mt-6 flex items-baseline justify-between gap-6">
        <h3 className="font-serif text-[clamp(1.25rem,2.2vw,2rem)] font-light italic leading-tight text-cream-ds transition-colors duration-300 group-hover:text-gold">
          {project.title}
        </h3>
        <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          {project.client} · {year}
        </span>
      </div>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-gold">{project.category}</p>
    </button>
  )
}
