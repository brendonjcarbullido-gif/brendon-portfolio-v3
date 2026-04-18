import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '@/data/projects'

const ease = [0.25, 0.1, 0.25, 1] as const

export interface WorkModalProps {
  project: Project | null
  onClose: () => void
}

export function WorkModal({ project, onClose }: WorkModalProps) {
  useEffect(() => {
    if (!project) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [project])

  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, onClose])

  const year = project ? String(project.year) : ''

  return createPortal(
    <AnimatePresence>
      {project ? (
        <motion.div
          key={project.slug}
          role="dialog"
          aria-modal="true"
          aria-labelledby="work-modal-title"
          className="fixed inset-0 z-[200] overflow-y-auto bg-ink-deep"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.45, ease }}
        >
          <button
            type="button"
            onClick={onClose}
            className="fixed right-8 top-6 z-[210] cursor-pointer cursor-hover font-serif text-[32px] leading-none text-cream-ds transition-colors duration-300 hover:text-gold"
            aria-label="Close"
          >
            ×
          </button>

          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="aspect-[16/9] w-full overflow-hidden">
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
                <img src={project.image} alt="" className="h-full w-full object-cover" />
              ) : null}
            </div>

            <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-[2fr_1fr]">
              <div>
                <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-gold">
                  {project.category}
                </p>
                <h2
                  id="work-modal-title"
                  className="mt-2 font-serif text-[clamp(40px,5vw,72px)] font-bold italic leading-[1.05] text-cream-ds"
                >
                  {project.title}
                </h2>
                <p className="mt-2 font-serif text-[20px] font-normal text-muted">{project.client}</p>
                <p className="mt-8 font-sans text-[15px] font-light leading-[1.85] text-muted">
                  {project.caseStudy.overview}
                </p>
                <ul className="mt-6 space-y-2">
                  {project.caseStudy.deliverables.map((d) => (
                    <li key={d} className="font-sans text-[13px] font-light text-muted">
                      <span className="mr-2 text-gold">▸</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:sticky lg:top-20 lg:self-start">
                <div>
                  <p className="font-sans text-[8px] font-bold uppercase tracking-[0.25em] text-gold">Role</p>
                  <p className="mt-1 font-serif text-[16px] font-normal text-cream-ds">{project.caseStudy.role}</p>
                </div>
                <div className="my-4 h-px bg-[#1E1E1C]" />
                <div>
                  <p className="font-sans text-[8px] font-bold uppercase tracking-[0.25em] text-gold">Client</p>
                  <p className="mt-1 font-serif text-[16px] font-normal text-cream-ds">{project.client}</p>
                </div>
                <div className="my-4 h-px bg-[#1E1E1C]" />
                <div>
                  <p className="font-sans text-[8px] font-bold uppercase tracking-[0.25em] text-gold">Year</p>
                  <p className="mt-1 font-serif text-[16px] font-normal text-cream-ds">{year}</p>
                </div>
                <div className="my-4 h-px bg-[#1E1E1C]" />
                <div>
                  <p className="font-sans text-[8px] font-bold uppercase tracking-[0.25em] text-gold">Results</p>
                  <p className="mt-2 font-serif text-[18px] italic leading-relaxed text-cream-ds">
                    {project.caseStudy.headline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
