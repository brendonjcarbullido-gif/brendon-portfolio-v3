import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'
import { WorkCard } from '@/components/WorkCard'
import { WorkModal } from '@/components/WorkModal'
import { ease } from '@/constants/animation'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}

/** Editorial column pattern — big / small / small / big ... */
function colSpanFor(i: number) {
  const pattern = [7, 5, 5, 7, 6, 6, 7, 5]
  return pattern[i % pattern.length]
}

function topOffsetFor(i: number) {
  const offsets = [0, 20, 0, 16, 8, 24, 0, 12]
  return offsets[i % offsets.length]
}

export function WorkGrid({ omitHeader = false }: { omitHeader?: boolean }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section
      id="work-grid"
      className={`relative bg-cream px-5 text-ink sm:px-6 md:px-10 ${omitHeader ? 'pb-24 pt-8 sm:pb-28 sm:pt-12' : 'py-24 sm:py-28 md:py-40'}`}
    >
      <div className="mx-auto max-w-[120rem]">
        {!omitHeader && (
          <>
            <div className="grid gap-10 md:grid-cols-12">
              <motion.p
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-light md:col-span-3"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease }}
              >
                Index — Selected Work
              </motion.p>
              <motion.h2
                className="font-serif text-[clamp(2.5rem,7vw,7rem)] font-light italic leading-[0.96] tracking-[-0.025em] text-ink md:col-span-9"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease }}
              >
                Creative direction<span className="text-accent">.</span>
              </motion.h2>
            </div>
            <div className="my-16 h-px w-full bg-ink/15" />
          </>
        )}

        <motion.div
          className="grid grid-cols-1 gap-x-6 gap-y-20 md:grid-cols-12 md:gap-y-28"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
        >
          {projects.map((p, i) => {
            const span = colSpanFor(i)
            const offset = topOffsetFor(i)
            return (
              <motion.div
                key={p.slug}
                variants={itemVariants}
                className="h-full"
                style={{
                  gridColumn: `span ${span} / span ${span}`,
                  marginTop: offset > 0 ? `${offset * 0.25}rem` : undefined,
                }}
              >
                <WorkCard project={p} index={i} onClick={() => setSelectedProject(p)} />
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <WorkModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
