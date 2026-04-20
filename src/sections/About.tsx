import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ease } from '@/constants/animation'

const STATS = [
  { end: 7, suffix: '+', label: 'Years Experience' },
  { end: 45, suffix: 'K+', label: 'Followers Built' },
  { end: 40, suffix: '%', label: 'Engagement Growth' },
  { end: 7, suffix: '+', label: 'Agency Clients' },
] as const

function StatCounter({
  end,
  suffix,
  label,
  enabled,
}: {
  end: number
  suffix: string
  label: string
  enabled: boolean
}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!enabled) return
    let raf = 0
    const start = performance.now()
    const duration = 1500

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
    <div className="flex flex-col gap-2">
      <p className="font-serif text-[clamp(40px,4.5vw,64px)] font-light leading-none tracking-tight text-gold">
        {value}
        {suffix}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{label}</p>
    </div>
  )
}

export function About() {
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, amount: 0.35 })

  return (
    <section
      id="about"
      className="relative bg-ink-deep px-6 py-[clamp(5rem,10vw,10rem)] text-cream-ds md:px-16 lg:px-24"
    >
      {/* Section head — mono eyebrow + oversized italic serif */}
      <div className="mx-auto max-w-[96rem]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.p
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold lg:col-span-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease }}
          >
            01 — About
          </motion.p>
          <motion.h2
            className="font-serif text-[clamp(2.5rem,7vw,7rem)] font-light italic leading-[0.96] tracking-[-0.02em] text-cream-ds lg:col-span-9"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease }}
          >
            A full creative department.
            <br />
            <span className="not-italic">One person.</span>
          </motion.h2>
        </div>

        <div className="my-16 h-px w-full bg-[rgba(240,235,227,0.12)]" />

        {/* Portrait + prose — asymmetric 12-col */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.figure
            className="relative lg:col-span-5"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease }}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <img
                src="/images/about/brendon-portrait.jpg"
                alt="Brendon Carbullido"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-dialect-out hover:scale-[1.04]"
              />
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              <span>Brendon Carbullido</span>
              <span>Los Angeles, CA</span>
            </figcaption>
          </motion.figure>

          <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-8 self-end">
            <motion.p
              className="font-serif text-[clamp(1.375rem,2vw,1.75rem)] font-light leading-[1.45] text-cream-ds"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease }}
            >
              I&apos;m Brendon Carbullido — an Art Director and Creative Director based in Los Angeles with 7+
              years building brands that perform. I shoot, direct, edit, and ship. Strategy and execution in
              the same hand.
            </motion.p>

            <motion.p
              className="max-w-[36rem] font-sans text-[15px] font-light leading-[1.8] text-muted"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
            >
              The discipline of a collegiate athlete shapes how I approach every project. High performance
              isn&apos;t a phrase — it&apos;s the standard I hold myself to creatively, strategically, and in
              every client relationship.
            </motion.p>

            <motion.p
              className="max-w-[36rem] font-sans text-[15px] font-light leading-[1.8] text-muted"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
            >
              I&apos;ve directed across agency, in-house, and independent contexts — across fashion, luxury
              spirits, CPG, beauty, health and wellness, jewelry, and celebrity. The thread: full creative
              ownership.
            </motion.p>

            <div className="mt-6 h-px w-full bg-[rgba(240,235,227,0.12)]" />

            <div ref={statsRef} className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
              {STATS.map((s) => (
                <StatCounter
                  key={s.label}
                  end={s.end}
                  suffix={s.suffix}
                  label={s.label}
                  enabled={statsInView}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
