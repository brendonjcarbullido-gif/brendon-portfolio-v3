import { motion } from 'framer-motion'
import { About } from '@/sections/About'
import { Process } from '@/sections/Process'
import { Expertise } from '@/sections/Expertise'
import { resume } from '@/data/resume'

const ease = [0.19, 1, 0.22, 1] as const

export function AboutPage() {
  const { identity, summary, education } = resume

  return (
    <main className="relative min-h-screen bg-cream text-ink">
      {/* Hero band */}
      <section className="px-5 pb-14 pt-32 sm:px-6 sm:pb-16 sm:pt-40 md:px-10 md:pb-24 md:pt-44">
        <div className="mx-auto max-w-[120rem]">
          <motion.p
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-light"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            {identity.roles.join(' · ')}
          </motion.p>
          <motion.h1
            className="mt-6 font-serif text-[clamp(3rem,10vw,10rem)] font-light italic leading-[0.92] tracking-[-0.03em] text-ink"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
          >
            {identity.name}
            <span className="text-accent">.</span>
          </motion.h1>
          {/* Summary */}
          <motion.p
            className="mt-10 max-w-[56ch] font-serif text-[clamp(1.125rem,1.5vw,1.4rem)] font-light leading-[1.65] text-ink"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.25 }}
          >
            {summary}
          </motion.p>
          {/* Impact stats strip */}
          <motion.div
            className="mt-14 flex flex-wrap gap-x-10 gap-y-6 border-t border-ink/15 pt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.4 }}
          >
            {resume.impact.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-light italic leading-none text-ink">
                  {stat.value}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-light">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
          {/* Client strip */}
          <motion.div
            className="mt-14 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease, delay: 0.55 }}
          >
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-light">
              Clients
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {resume.clients.map((client) => (
                <span
                  key={client}
                  className="font-serif text-[clamp(1rem,1.4vw,1.2rem)] font-light italic text-ink"
                >
                  {client}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <About />

      {/* Experience timeline */}
      <section className="bg-cream-2 px-5 py-24 text-ink sm:px-6 sm:py-28 md:px-10 md:py-36">
        <div className="mx-auto max-w-[120rem]">
          <div className="grid gap-10 md:grid-cols-12">
            <motion.p
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-light md:col-span-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease }}
            >
              Experience
            </motion.p>
            <motion.h2
              className="font-serif text-[clamp(2.5rem,5vw,5rem)] font-light italic leading-[0.96] tracking-[-0.02em] text-ink md:col-span-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease }}
            >
              Seven years<span className="text-accent">.</span>
            </motion.h2>
          </div>

          <div className="mt-16 divide-y divide-ink/15 border-t border-ink/15">
            {resume.experience.map((role, i) => (
              <motion.article
                key={`${role.company}-${role.title}-${i}`}
                className="grid gap-4 py-10 md:grid-cols-12 md:gap-10"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease, delay: i * 0.04 }}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-light md:col-span-3 md:pt-2">
                  {role.dateRange}
                </p>
                <div className="md:col-span-9">
                  <h3 className="font-serif text-[clamp(1.5rem,2.4vw,2.25rem)] font-light italic leading-tight tracking-[-0.02em] text-ink">
                    {role.title}
                    <span className="text-accent"> — </span>
                    <span className="not-italic text-ink">{role.company}</span>
                  </h3>
                  <ul className="mt-4 flex flex-col gap-2 font-sans text-[15px] font-light leading-[1.7] text-ink-light">
                    {role.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="mt-[0.7em] h-px w-3 shrink-0 bg-ink-light" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Skills + Industries + Education */}
      <section className="px-5 py-24 text-ink sm:px-6 sm:py-28 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-[120rem] gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-light">Skills</p>
            <div className="mt-6 flex flex-col gap-8">
              {(['direction', 'production', 'tools'] as const).map((k) => (
                <div key={k}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{k}</p>
                  <ul className="mt-2 flex flex-col gap-1 font-serif text-[17px] italic text-ink">
                    {resume.skills[k].map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-light">Industries</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {resume.industries.map((ind) => (
                <li
                  key={ind}
                  className="rounded-full border border-ink/25 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink"
                >
                  {ind}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-light">Education</p>
            <div className="mt-6">
              <p className="font-serif text-[clamp(1.5rem,2vw,1.875rem)] font-light italic text-ink">
                {education.school}
              </p>
              <p className="mt-2 font-sans text-[14px] font-light text-ink-light">
                {education.degree} · {education.focus}
              </p>
              <p className="mt-1 font-serif italic text-accent">{education.emphasis}</p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-light">
                {education.years}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Process />
      <Expertise />
    </main>
  )
}
