import { motion } from 'framer-motion'
import { ease } from '@/constants/animation';


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
    <section className="bg-ink-deep px-6 py-32 text-cream-ds md:px-16 lg:px-24" id="expertise">
      <div className="mx-auto max-w-[1200px]">
        <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.28em] text-gold">Expertise</p>
        <h2 className="mt-4 font-serif text-[clamp(40px,5vw,72px)] font-bold leading-none text-cream-ds">
          What I bring.
        </h2>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              className={`group flex cursor-pointer cursor-hover flex-col border border-[#1E1E1C] bg-[#111110] p-8 transition-[border-color,background-color] duration-300 hover:border-[rgba(201,168,76,0.25)] hover:bg-[#141412] ${card.wide ? 'col-span-2' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease, delay: index * 0.05 }}
            >
              <h3 className="font-serif text-[20px] font-semibold text-cream-ds">{card.title}</h3>
              <p className="mt-3 flex-1 font-sans text-[12px] font-light leading-[1.8] text-muted">{card.description}</p>
              <span
                className="mt-6 inline-block font-sans text-gold transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              >
                →
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
