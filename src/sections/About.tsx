import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ease } from '@/constants/animation'
import { SectionReveal } from '@/components/motion/SectionReveal'
import { Scramble } from '@/components/motion/Scramble'

const STATS = [
  { end: 7, suffix: '+', label: 'Years' },
  { end: 45, suffix: 'K+', label: 'Followers Built' },
  { end: 40, suffix: '%', label: 'Engagement Lift' },
  { end: 7, suffix: '+', label: 'Agency Clients' },
] as const

function StatCounter({ end, suffix, label, enabled }: { end: number; suffix: string; label: string; enabled: boolean }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!enabled) return
    let raf = 0
    const start = performance.now()
    const duration = 1800
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - t) ** 3
      setValue(Math.round(end * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [end, enabled])

  return (
    <div>
      <p className="font-serif text-[clamp(2.25rem,3.6vw,3.75rem)] font-light leading-none tracking-[-0.02em] text-ink">
        {value}
        <span className="text-accent">{suffix}</span>
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-light">{label}</p>
    </div>
  )
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, amount: 0.4 })
  const prefersReduced = useReducedMotion()

  // Parallax on portrait: slow upward drift while section scrolls
  const { scrollYProgress } = useScroll({
    target: portraitRef,
    offset: ['start end', 'end start'],
  })
  const portraitY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ['0%', '0%'] : ['8%', '-8%'])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-cream px-5 py-24 text-ink sm:px-6 sm:py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[120rem]">
        {/* Section label */}
        <SectionReveal edge="left">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-light">
            <Scramble text="02 — ABOUT THE STUDIO" />
          </p>
        </SectionReveal>

        {/* — Magazine spread: portrait + prose + pull quote */}
        <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-x-10">
          {/* Portrait — stretches across 5 cols */}
          <div ref={portraitRef} className="md:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden bg-cream-2">
              <motion.img
                src="/images/about/brendon-portrait.jpg"
                alt="Brendon Carbullido — Art Director"
                className="absolute inset-[-10%] h-[120%] w-[120%] object-cover"
                style={{ y: portraitY }}
              />
            </div>
            <p className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink-light">
              <span>Brendon Carbullido</span>
              <span>Los Angeles, CA</span>
            </p>
          </div>

          {/* Prose — 6 cols, offset by 1 */}
          <div className="flex flex-col gap-10 md:col-span-6 md:col-start-7">
            <motion.h2
              className="font-serif text-[clamp(2.5rem,6vw,6rem)] font-light italic leading-[0.92] tracking-[-0.025em] text-ink"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease }}
            >
              A full creative
              <br />
              department.
              <br />
              <span className="not-italic text-ink-light">One person.</span>
            </motion.h2>

            <motion.div
              className="flex max-w-[44ch] flex-col gap-6 font-serif text-[clamp(1.0625rem,1.35vw,1.3rem)] font-light leading-[1.55] text-ink"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease, delay: 0.15 }}
            >
              <p>
                <span className="float-left mr-2 mt-[0.2em] font-serif text-[2.75rem] font-light italic leading-[0.75] text-accent sm:text-[3.25rem] md:text-[3.75rem]">
                  I
                </span>
                &apos;m an Art Director and Creative Director based in Los Angeles with
                seven-plus years building brands that perform. I shoot, direct, edit,
                and ship — strategy and execution in the same hand.
              </p>
              <p>
                The discipline of a collegiate athlete shapes how I approach every
                project. High performance isn&apos;t a phrase; it&apos;s the standard I
                hold myself to creatively, strategically, and in every client
                relationship.
              </p>
              <p>
                I&apos;ve directed across agency, in-house, and independent contexts —
                fashion, luxury spirits, CPG, beauty, wellness, jewelry, celebrity.
                The thread is full creative ownership.
              </p>
            </motion.div>

            {/* Pull quote */}
            <motion.blockquote
              className="relative border-l border-ink/20 pl-6 font-serif text-[clamp(1.5rem,2.4vw,2.25rem)] font-light italic leading-[1.25] tracking-[-0.01em] text-ink"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease, delay: 0.2 }}
            >
              &ldquo;I don&apos;t guess — I learn before I create.&rdquo;
            </motion.blockquote>
          </div>
        </div>

        {/* Stats row — full width, hairline top, generous gap */}
        <div
          ref={statsRef}
          className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-ink/15 pt-14 md:grid-cols-4 md:mt-28"
        >
          {STATS.map((s) => (
            <StatCounter key={s.label} end={s.end} suffix={s.suffix} label={s.label} enabled={statsInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
