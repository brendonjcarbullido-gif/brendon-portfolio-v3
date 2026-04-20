import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'
import { WorkCard } from '@/components/WorkCard'
import { WorkModal } from '@/components/WorkModal'
import { ease } from '@/constants/animation'

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease },
  },
}

/** Dialect-style asymmetric column-span pattern — feature / standard / standard / feature ... */
function colSpanFor(i: number) {
  const pattern = [7, 5, 5, 7, 6, 6, 7, 5]
  return pattern[i % pattern.length]
}

function topOffsetFor(i: number) {
  // Staircase the right column down to mimic Dialect's asymmetric vertical rhythm
  const offsets = [0, 20, 0, 16, 8, 24, 0, 12]
  return offsets[i % offsets.length]
}

export function WorkGrid({ omitHeader = false }: { omitHeader?: boolean }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section
      id="work"
      className={
        omitHeader
          ? 'relative bg-ink-deep px-6 pb-[clamp(5rem,10vw,10rem)] pt-12 text-cream-ds md:px-16 lg:px-24'
          : 'relative bg-ink-deep px-6 py-[clamp(5rem,10vw,10rem)] text-cream-ds md:px-16 lg:px-24'
      }
    >
      <div className="mx-auto max-w-[96rem]">
        {!omitHeader && (
          <>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <motion.p
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold lg:col-span-3"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease }}
              >
                00 — Selected Work
              </motion.p>
              <motion.h2
                className="font-serif text-[clamp(2.5rem,7vw,7rem)] font-light italic leading-[0.96] tracking-[-0.02em] text-cream-ds lg:col-span-9"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease }}
              >
                Creative direction.
              </motion.h2>
            </div>
            <div className="my-16 h-px w-full bg-[rgba(240,235,227,0.12)]" />
          </>
        )}

        <motion.div
          className="grid grid-cols-1 gap-x-6 gap-y-24 md:grid-cols-12 md:gap-y-32"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
        >
          {projects.map((p, i) => {
            const span = colSpanFor(i)
            const offset = topOffsetFor(i)
            const offsetStyle = offset > 0 ? { marginTop: `${offset * 0.25}rem` } : undefined
            return (
              <motion.div
                key={p.slug}
                variants={itemVariants}
                className="h-full"
                style={{
                  gridColumn: `span ${span} / span ${span}`,
                  ...offsetStyle,
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
