import { motion } from 'framer-motion'
import type { Project } from '@/data/projects'
import { ease } from '@/constants/animation';


export interface WorkCardProps {
  project: Project
  onClick: () => void
}

export function WorkCard({ project, onClick }: WorkCardProps) {
  const tags = project.caseStudy.deliverables.slice(0, 4)
  const year = String(project.year)

  return (
    <div className="h-full">
      <button
        type="button"
        onClick={onClick}
        className="group relative w-full cursor-pointer cursor-hover overflow-hidden border border-[#1E1E1C] bg-card-bg text-left transition-[border-color] duration-[400ms] hover:border-[rgba(201,168,76,0.3)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.div
            className="relative h-full w-full"
            initial={false}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.7, ease }}
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

          <div
            className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-[400ms] group-hover:bg-black/50"
            aria-hidden
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100">
            <p className="font-serif text-[28px] italic leading-tight text-cream-ds">{project.title}</p>
          </div>
        </div>

        <div className="p-5 text-left">
          <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-gold">{project.client}</p>
          <p className="mt-1 font-serif text-[20px] font-semibold leading-snug text-cream-ds">{project.title}</p>
          <p className="mt-1 font-sans text-[11px] font-light text-muted">
            {project.category} · {year}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="border border-[#2A2A2A] px-2 py-0.5 font-sans text-[8px] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </button>
    </div>
  )
}
