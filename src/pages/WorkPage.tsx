import { motion } from 'framer-motion'
import { WorkGrid } from '@/sections/WorkGrid'
import { WorkDeck } from '@/sections/mobile/WorkDeck'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { resume } from '@/data/resume'

export function WorkPage() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const clientLine = resume.clients.join(' · ')

  if (isMobile) {
    return (
      <main>
        <WorkDeck />
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-cream text-ink">
      <section className="px-5 pb-12 pt-32 sm:px-6 sm:pb-16 sm:pt-40 md:px-10 md:pb-20 md:pt-44">
        <div className="mx-auto max-w-[120rem]">
          <motion.p
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-light"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            Index — Selected Work
          </motion.p>
          <motion.h1
            className="mt-6 font-serif text-[clamp(3rem,9vw,9rem)] font-light italic leading-[0.92] tracking-[-0.03em] text-ink"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
          >
            Campaigns, identities,
            <br />
            <span className="not-italic">content systems.</span>
          </motion.h1>
          <motion.p
            className="mt-8 max-w-[48ch] font-serif text-[clamp(1.0625rem,1.35vw,1.3rem)] font-light leading-[1.55] text-ink-light"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1], delay: 0.25 }}
          >
            Work across {clientLine}. Full case studies below.
          </motion.p>
        </div>
      </section>

      <WorkGrid omitHeader />
    </main>
  )
}
