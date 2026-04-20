import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ease } from '@/constants/animation'
import { SectionReveal } from '@/components/motion/SectionReveal'
import { Scramble } from '@/components/motion/Scramble'

const steps = [
  {
    title: 'Discover',
    body:
      "Every project starts with immersion. Brand, audience, competitors, gaps. I don't guess — I learn before I create.",
  },
  {
    title: 'Direct',
    body:
      'I develop the visual and strategic framework — the language, the feeling, the system. Then I direct every element that brings it to life.',
  },
  {
    title: 'Execute',
    body:
      'Shoot, edit, design, produce. I handle the full creative pipeline independently. No handoff lag. No translation loss.',
  },
  {
    title: 'Iterate',
    body:
      "Performance data informs every next move. Content that doesn't work gets cut. What does work gets amplified.",
  },
] as const

export function Process() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 30%'],
  })
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      ref={ref}
      id="process"
      className="relative bg-cream-2 px-5 py-24 text-ink sm:px-6 sm:py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[120rem]">
        <div className="grid gap-10 md:grid-cols-12">
          {/* — LEFT: sticky section header */}
          <div className="md:col-span-4 md:sticky md:top-24 md:self-start">
            <SectionReveal edge="left">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-light">
                <Scramble text="03 — METHOD" />
              </p>
            </SectionReveal>
            <motion.h2
              className="mt-4 font-serif text-[clamp(2.5rem,5vw,5rem)] font-light italic leading-[0.96] tracking-[-0.02em] text-ink"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease }}
            >
              A slower,
              <br />
              deliberate
              <br />
              <span className="not-italic">method.</span>
            </motion.h2>
          </div>

          {/* — RIGHT: rail with progress bar and numbered steps */}
          <div className="relative md:col-span-7 md:col-start-6">
            {/* Progress spine */}
            <div className="absolute left-0 top-0 h-full w-px bg-ink/12">
              <motion.div className="absolute left-0 top-0 w-px origin-top bg-ink" style={{ height: progressHeight }} />
            </div>

            <div className="flex flex-col gap-10">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  className="relative pl-10"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease, delay: i * 0.05 }}
                >
                  {/* Step dot */}
                  <span className="absolute left-[-4.5px] top-4 h-[9px] w-[9px] rounded-full bg-cream border border-ink" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-light">
                    Step {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-2 font-serif text-[clamp(2rem,3vw,2.75rem)] font-light italic leading-[0.98] tracking-[-0.02em] text-ink">
                    {s.title}.
                  </h3>
                  <p className="mt-4 max-w-[48ch] font-sans text-[15px] font-light leading-[1.75] text-ink-light">
                    {s.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
