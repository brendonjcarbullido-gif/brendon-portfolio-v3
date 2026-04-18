import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.25, 0.1, 0.25, 1] as const

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

  const display = `${value}${suffix}`

  return (
    <div>
      <p className="font-serif text-[44px] font-bold leading-none text-gold">{display}</p>
      <p className="mt-1 font-sans text-[9px] font-medium uppercase tracking-[0.15em] text-muted">{label}</p>
    </div>
  )
}

export function About() {
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, amount: 0.35 })

  return (
    <section className="bg-ink-deep px-6 py-32 text-cream-ds md:px-16 lg:px-24" id="about">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-20 lg:grid-cols-2">
        <motion.div
          className="relative aspect-[3/4] w-full overflow-hidden ring-1 ring-[rgba(201,168,76,0.2)] lg:aspect-[4/5]"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease }}
        >
          <img
            src="/images/about/brendon-portrait.jpg"
            alt="Brendon Carbullido"
            className="h-full w-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[rgba(201,168,76,0.08)] mix-blend-multiply"
            aria-hidden
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.28em] text-gold">About</p>
          <h2 className="mt-4 font-serif text-[clamp(36px,4vw,60px)] font-bold leading-tight text-cream-ds">
            A full creative department. One person.
          </h2>

          <p className="mt-6 font-sans text-[14px] font-light leading-[1.9] text-muted">
            I&apos;m Brendon Carbullido — an Art Director and Creative Director based in Los Angeles with 7+ years
            building brands that perform. I shoot, direct, edit, and ship. Strategy and execution in the same hand.
          </p>
          <p className="mt-6 font-sans text-[14px] font-light leading-[1.9] text-muted">
            The discipline of a collegiate athlete shapes how I approach every project. High performance isn&apos;t a
            phrase — it&apos;s the standard I hold myself to creatively, strategically, and in every client
            relationship.
          </p>
          <p className="mt-6 font-sans text-[14px] font-light leading-[1.9] text-muted">
            I&apos;ve directed across agency, in-house, and independent contexts — across fashion, luxury spirits, CPG,
            beauty, health and wellness, jewelry, and celebrity. The thread: full creative ownership.
          </p>

          <div className="my-10 border-t border-[#1E1E1C]" />

          <div ref={statsRef} className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((s) => (
              <StatCounter key={s.label} end={s.end} suffix={s.suffix} label={s.label} enabled={statsInView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
