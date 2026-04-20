import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ease } from '@/constants/animation'
import { SectionReveal } from '@/components/motion/SectionReveal'
import { Scramble } from '@/components/motion/Scramble'

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

function useCanHover() {
  const [canHover, setCanHover] = useState(true)
  useEffect(() => {
    const mq = matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setCanHover(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return canHover
}

export function Expertise() {
  const [hover, setHover] = useState<number | null>(null)
  const canHover = useCanHover()

  return (
    <section id="expertise" className="relative bg-cream px-5 py-24 text-ink sm:px-6 sm:py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[120rem]">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <SectionReveal edge="left" className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-light">
              <Scramble text="04 — CAPABILITIES" />
            </p>
          </SectionReveal>
          <motion.h2
            className="font-serif text-[clamp(2.25rem,6vw,6rem)] font-light italic leading-[0.96] tracking-[-0.025em] text-ink md:col-span-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease }}
          >
            What I bring<span className="text-accent">.</span>
          </motion.h2>
        </div>

        <div className="mt-12 border-t border-ink/15 sm:mt-14 md:mt-16">
          {cards.map((card, i) => {
            const isHover = canHover && hover === i
            // On touch: descriptions always visible.
            const showDescription = !canHover || isHover
            return (
              <motion.div
                key={card.title}
                className="group relative block w-full border-b border-ink/15 text-left"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease, delay: i * 0.04 }}
              >
                <div className="grid grid-cols-12 items-start gap-x-4 gap-y-3 px-0 py-6 sm:py-7 md:items-center md:py-9">
                  <span className="col-span-2 pt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-light sm:text-[11px] md:col-span-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="col-span-10 font-serif text-[clamp(1.5rem,3.25vw,3.25rem)] font-light italic leading-[1.02] tracking-[-0.02em] text-ink transition-colors duration-500 group-hover:text-accent md:col-span-6">
                    {card.title}
                  </h3>
                  <div
                    className={`col-span-12 row-start-2 overflow-hidden transition-[max-height,opacity,margin] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] md:col-span-5 md:col-start-8 md:row-start-auto ${
                      canHover
                        ? isHover
                          ? 'max-h-[16rem] opacity-100'
                          : 'max-h-0 opacity-0'
                        : 'max-h-[20rem] opacity-100'
                    }`}
                  >
                    <p className="max-w-[44ch] font-sans text-[13px] font-light leading-[1.7] text-ink-light sm:text-[14px] md:text-[15px]">
                      {card.description}
                    </p>
                  </div>
                </div>
                <span
                  aria-hidden
                  className={`absolute bottom-0 left-0 block h-px w-full origin-left bg-ink transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                    showDescription && canHover ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
