import { useState } from 'react'
import { motion } from 'framer-motion'
import { ease } from '@/constants/animation'

const cards = [
  {
    title: 'Full Creative Ownership',
    description:
      "From concept to camera to content calendar. I'm the strategist, shooter, director, and editor. One person. Full stack.",
  },
  {
    title: 'Art Direction',
    description: 'Visual systems that are distinct, intentional, and scalable across every touchpoint.',
  },
  {
    title: 'Brand Strategy',
    description: 'I build the thinking before I build the visuals. Positioning, voice, identity — then execution.',
  },
  {
    title: 'Social Content',
    description:
      "Platform-native content built for performance. I've grown accounts from zero to 45K+ at 6% engagement.",
  },
  {
    title: 'Photography + Video',
    description: 'Commercial-grade production handled in-house. Shoot direction, editing, post — all of it.',
  },
  {
    title: 'Packaging Design',
    description: 'Physical brand presence. Product lines and seasonal packaging from concept through print-ready files.',
  },
  {
    title: 'Campaign Direction',
    description:
      'End-to-end campaign leadership for fashion, spirits, CPG, and lifestyle — from brief to delivery.',
  },
  {
    title: 'AI-Integrated Workflows',
    description: 'I use AI tooling to move faster and smarter — across content ideation, production, and analytics.',
  },
] as const

export function Expertise() {
  const [hover, setHover] = useState<number | null>(null)

  return (
    <section id="expertise" className="relative bg-cream px-6 py-28 text-ink md:px-10 md:py-40">
      <div className="mx-auto max-w-[120rem]">
        <div className="grid gap-10 md:grid-cols-12">
          <motion.p
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-light md:col-span-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease }}
          >
            04 — Capabilities
          </motion.p>
          <motion.h2
            className="font-serif text-[clamp(2.5rem,6vw,6rem)] font-light italic leading-[0.96] tracking-[-0.025em] text-ink md:col-span-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease }}
          >
            What I bring<span className="text-accent">.</span>
          </motion.h2>
        </div>

        <div className="mt-16 border-t border-ink/15">
          {cards.map((card, i) => {
            const isHover = hover === i
            return (
              <motion.button
                key={card.title}
                type="button"
                className="group relative block w-full cursor-pointer border-b border-ink/15 text-left"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease, delay: i * 0.05 }}
              >
                <div className="grid grid-cols-12 items-center gap-4 px-0 py-7 md:py-9">
                  <span className="col-span-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-light md:col-span-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="col-span-10 font-serif text-[clamp(1.75rem,3.25vw,3.25rem)] font-light italic leading-[1.02] tracking-[-0.02em] text-ink transition-colors duration-500 group-hover:text-accent md:col-span-6">
                    {card.title}
                  </h3>
                  <p
                    className={`col-span-12 row-start-2 max-w-[44ch] overflow-hidden font-sans text-[14px] font-light leading-[1.7] text-ink-light transition-[max-height,opacity,margin] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] md:col-span-5 md:col-start-8 md:row-start-auto md:max-h-[24rem] md:text-[15px] ${
                      isHover ? 'max-h-[16rem] opacity-100' : 'max-h-0 opacity-70 md:opacity-100'
                    }`}
                  >
                    {card.description}
                  </p>
                </div>
                {/* Sliding underline on hover */}
                <span
                  aria-hidden
                  className={`absolute bottom-0 left-0 block h-px origin-left bg-ink transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                    isHover ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  style={{ width: '100%' }}
                />
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
