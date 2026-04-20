import { motion } from 'framer-motion'
import { resume } from '@/data/resume'

const ease = [0.19, 1, 0.22, 1] as const

export function ResumePage() {
  const { identity, summary, experience, skills, industries, education, impact, clients } = resume

  return (
    <main className="relative min-h-screen bg-cream text-ink">
      <section className="px-5 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-40 md:px-10 md:pb-32 md:pt-44">
        <div className="mx-auto grid max-w-[120rem] gap-10 md:grid-cols-12">
          {/* Left col — identity band */}
          <aside className="md:col-span-4 md:sticky md:top-28 md:self-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-light">
                {identity.roles.join(' · ')}
              </p>
              <h1 className="mt-4 font-serif text-[clamp(2rem,4vw,3.5rem)] font-light italic leading-[0.95] tracking-[-0.025em] text-ink">
                {identity.name}<span className="text-accent">.</span>
              </h1>
              <ul className="mt-8 flex flex-col gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-ink">
                <li>
                  <a href={`mailto:${identity.email}`} className="inline-block cursor-pointer transition-colors hover:text-accent">
                    {identity.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${identity.phone.replace(/\D/g, '')}`} className="inline-block cursor-pointer transition-colors hover:text-accent">
                    {identity.phone}
                  </a>
                </li>
                <li>{identity.location}</li>
                <li>
                  <a href={identity.instagram} target="_blank" rel="noopener noreferrer" className="inline-block cursor-pointer transition-colors hover:text-accent">
                    Instagram ↗
                  </a>
                </li>
                <li>
                  <a href={identity.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block cursor-pointer transition-colors hover:text-accent">
                    LinkedIn ↗
                  </a>
                </li>
              </ul>

              <a
                href={identity.resumePdf}
                download
                className="mt-10 inline-flex w-fit cursor-pointer items-center gap-3 border border-ink bg-ink px-6 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-cream transition-colors duration-500 hover:bg-cream hover:text-ink"
              >
                Download PDF ↓
              </a>
            </motion.div>
          </aside>

          {/* Right col — content */}
          <div className="md:col-span-8">
            <motion.p
              className="max-w-[60ch] font-serif text-[clamp(1.0625rem,1.35vw,1.3rem)] font-light leading-[1.6] text-ink"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.1 }}
            >
              {summary}
            </motion.p>

            <div className="mt-14 grid grid-cols-2 gap-6 border-y border-ink/15 py-10 md:grid-cols-4">
              {impact.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-light leading-none tracking-[-0.02em] text-ink">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-light">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="mt-16 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-light">
              Experience
            </h2>
            <div className="mt-6 divide-y divide-ink/15 border-t border-ink/15">
              {experience.map((role, i) => (
                <motion.article
                  key={`${role.company}-${i}`}
                  className="grid gap-3 py-8 md:grid-cols-12 md:gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease, delay: i * 0.04 }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-light md:col-span-3 md:pt-1">
                    {role.dateRange}
                  </p>
                  <div className="md:col-span-9">
                    <h3 className="font-serif text-[clamp(1.25rem,1.75vw,1.625rem)] font-light italic leading-tight tracking-[-0.01em] text-ink">
                      {role.title}
                      <span className="text-accent"> — </span>
                      <span className="not-italic">{role.company}</span>
                    </h3>
                    <ul className="mt-3 flex flex-col gap-1.5 font-sans text-[14px] font-light leading-[1.7] text-ink-light">
                      {role.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3">
                          <span className="mt-[0.75em] h-px w-2 shrink-0 bg-ink-light" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="mt-14 grid gap-10 md:grid-cols-12">
              <div className="md:col-span-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-light">Skills</p>
                <div className="mt-4 flex flex-col gap-5">
                  {(['direction', 'production', 'tools'] as const).map((k) => (
                    <div key={k}>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{k}</p>
                      <p className="mt-1 font-serif italic text-[17px] text-ink">{skills[k].join(' · ')}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-light">Industries</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {industries.map((ind) => (
                    <li key={ind} className="rounded-full border border-ink/25 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
                      {ind}
                    </li>
                  ))}
                </ul>
                <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-light">Clients</p>
                <p className="mt-3 font-serif text-[clamp(1.125rem,1.5vw,1.4rem)] font-light italic leading-[1.4] text-ink">
                  {clients.join(' · ')}
                </p>
                <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-light">Education</p>
                <p className="mt-3 font-serif text-[clamp(1.25rem,1.75vw,1.625rem)] font-light italic text-ink">
                  {education.school}
                </p>
                <p className="mt-1 font-sans text-[13px] text-ink-light">
                  {education.degree} · {education.focus} · <span className="italic text-accent">{education.emphasis}</span>
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-light">
                  {education.years}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
