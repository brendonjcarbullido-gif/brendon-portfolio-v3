import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'
import { WorkCard } from '@/components/WorkCard'
import { WorkModal } from '@/components/WorkModal'
import { ease } from '@/constants/animation';


const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
}

export function WorkGrid({ omitHeader = false }: { omitHeader?: boolean }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section
      id="work"
      className={
        omitHeader
          ? 'bg-ink-deep px-6 pb-32 pt-12 text-cream-ds md:px-16 lg:px-24'
          : 'bg-ink-deep px-6 py-32 text-cream-ds md:px-16 lg:px-24'
      }
    >
      <div className="mx-auto max-w-[1600px]">
        {!omitHeader ? (
          <>
            <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.28em] text-gold">Selected Work</p>
            <h2 className="mt-4 font-serif text-[clamp(56px,7vw,96px)] font-bold leading-none text-cream-ds">
              Creative Direction.
            </h2>
            <p className="mt-3 font-sans text-[13px] font-light tracking-[0.3em] text-muted">
              Campaign · Brand · Content · Production
            </p>
          </>
        ) : null}

        <motion.div
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {projects.map((p) => (
            <motion.div key={p.slug} variants={itemVariants} className="h-full">
              <WorkCard project={p} onClick={() => setSelectedProject(p)} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <WorkModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
