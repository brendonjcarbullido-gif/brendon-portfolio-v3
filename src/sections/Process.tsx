import { motion } from 'framer-motion'
import { ease } from '@/constants/animation';


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
    <section className="bg-[#111110] px-6 py-32 text-cream-ds md:px-16 lg:px-24" id="process">
      <div className="mx-auto max-w-[1200px]">
        <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.28em] text-gold">Process</p>
        <h2 className="mt-4 font-serif text-[clamp(40px,5vw,72px)] font-bold leading-none text-cream-ds">
          How I work.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="border border-[#1E1E1C] bg-ink-deep p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease, delay: index * 0.1 }}
            >
              <p className="font-serif text-[64px] font-bold leading-none text-gold opacity-20">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 font-serif text-[22px] font-semibold text-cream-ds">{step.title}</h3>
              <p className="mt-3 font-sans text-[13px] font-light leading-[1.8] text-muted">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
