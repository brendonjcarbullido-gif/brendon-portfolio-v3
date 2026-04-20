import { motion } from 'framer-motion'
import { ease } from '@/constants/animation'

const steps = [
  {
    title: 'Discover',
    body: "Every project starts with immersion. Brand, audience, competitors, gaps. I don't guess — I learn before I create.",
  },
  {
    title: 'Direct',
    body: 'I develop the visual and strategic framework — the language, the feeling, the system. Then I direct every element that brings it to life.',
  },
  {
    title: 'Execute',
    body: 'Shoot, edit, design, produce. I handle the full creative pipeline independently. No handoff lag. No translation loss.',
  },
  {
    title: 'Iterate',
    body: "Performance data informs every next move. Content that doesn't work gets cut. What does work gets amplified.",
  },
] as const

export function Process() {
  return (
    <section
      id="process"
      className="relative bg-[#111110] px-6 py-[clamp(5rem,10vw,10rem)] text-cream-ds md:px-16 lg:px-24"
    >
      <div className="mx-auto max-w-[96rem]">
        {/* Section head */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.p
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold lg:col-span-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease }}
          >
            02 — Process
          </motion.p>
          <motion.h2
            className="font-serif text-[clamp(2.5rem,7vw,7rem)] font-light italic leading-[0.96] tracking-[-0.02em] text-cream-ds lg:col-span-9"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease }}
          >
            A slower, more deliberate method.
          </motion.h2>
        </div>

        <div className="my-16 h-px w-full bg-[rgba(240,235,227,0.12)]" />

        {/* Editorial list — each step is a row with a large number, title, prose */}
        <div className="flex flex-col">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="group grid gap-6 border-b border-[rgba(240,235,227,0.12)] py-12 lg:grid-cols-12 lg:gap-12 lg:py-16"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease, delay: index * 0.08 }}
            >
              <span
                aria-hidden
                className="font-serif text-[clamp(3rem,5vw,5rem)] font-light italic leading-none text-gold opacity-40 lg:col-span-2"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-serif text-[clamp(1.75rem,3vw,2.75rem)] font-light italic leading-none text-cream-ds lg:col-span-4">
                {step.title}
              </h3>
              <p className="max-w-[38rem] font-sans text-[15px] font-light leading-[1.8] text-muted lg:col-span-6">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
