import { motion } from 'framer-motion'
import { ease } from '@/constants/animation'

const cards = [
  {
    title: 'Full Creative Ownership',
    description:
      "From concept to camera to content calendar. I'm the strategist, shooter, director, and editor. One person. Full stack.",
    wide: true,
  },
  {
    title: 'Art Direction',
    description: 'Visual systems that are distinct, intentional, and scalable across every touchpoint.',
    wide: false,
  },
  {
    title: 'Brand Strategy',
    description: 'I build the thinking before I build the visuals. Positioning, voice, identity — then execution.',
    wide: false,
  },
  {
    title: 'Social Content',
    description:
      "Platform-native content built for performance. I've grown accounts from zero to 45K+ at 6% engagement.",
    wide: false,
  },
  {
    title: 'Photography + Video',
    description: 'Commercial-grade production handled in-house. Shoot direction, editing, post — all of it.',
    wide: false,
  },
  {
    title: 'Packaging Design',
    description: 'Physical brand presence. Product lines and seasonal packaging from concept through print-ready files.',
    wide: false,
  },
  {
    title: 'Campaign Direction',
    description:
      'End-to-end campaign leadership for fashion, spirits, CPG, and lifestyle — from brief to delivery.',
    wide: false,
  },
  {
    title: 'AI-Integrated Workflows',
    description: 'I use AI tooling to move faster and smarter — across content ideation, production, and analytics.',
    wide: false,
  },
] as const

export function Expertise() {
  return (
    <section
      id="expertise"
      className="relative bg-ink-deep px-6 py-[clamp(5rem,10vw,10rem)] text-cream-ds md:px-16 lg:px-24"
    >
      <div className="mx-auto max-w-[96rem]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.p
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold lg:col-span-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease }}
          >
            03 — Capabilities
          </motion.p>
          <motion.h2
            className="font-serif text-[clamp(2.5rem,7vw,7rem)] font-light italic leading-[0.96] tracking-[-0.02em] text-cream-ds lg:col-span-9"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease }}
          >
            What I bring.
          </motion.h2>
        </div>

        <div className="my-16 h-px w-full bg-[rgba(240,235,227,0.12)]" />

        <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              className={`group relative flex min-h-[16rem] cursor-pointer flex-col justify-between border-t border-[rgba(240,235,227,0.12)] p-8 transition-colors duration-300 hover:bg-[#141412] md:[&:nth-child(3n+1)]:border-l-0 md:border-l md:[&:nth-child(3n+2)]:border-l md:[&:nth-child(3n+3)]:border-l ${
                card.wide ? 'md:col-span-2' : ''
              }`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease, delay: index * 0.05 }}
            >
              <div className="flex items-start justify-between gap-6">
                <h3 className="font-serif text-[clamp(1.5rem,2.2vw,2rem)] font-light italic leading-tight text-cream-ds">
                  {card.title}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="mt-8 max-w-[34rem] font-sans text-[14px] font-light leading-[1.8] text-muted">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
