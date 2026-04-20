import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { projects } from '@/data/projects'

/**
 * HeroMosaic — replaces the Three.js face-tracking hero.
 *
 * Responsive behavior:
 *  - < md (mobile):   name stacks top, simplified 2×2 + 1 tall mosaic below.
 *  - md to xl:        split 6/6 with slightly reduced mosaic complexity.
 *  - xl and up:       full 5-tile asymmetric layout with parallax.
 *
 * Motion:  Stagger entrance (masked char reveal on name, scale-up on tiles),
 *          continuous scroll-linked parallax on each tile (desktop only).
 */

const TILE_SPECS = [
  { slug: 'teeccino-social', className: 'col-span-7 row-span-3', parallaxY: -100 },
  { slug: 'anne-klein', className: 'col-span-5 row-span-2 col-start-8', parallaxY: 60 },
  { slug: 'joseph-abboud', className: 'col-span-4 row-span-2 col-start-1 row-start-4', parallaxY: 120 },
  { slug: 'lotto-us', className: 'col-span-5 row-span-2 col-start-5 row-start-4', parallaxY: -60 },
  { slug: 'casa-amour', className: 'col-span-3 row-span-2 col-start-10 row-start-4', parallaxY: 40 },
] as const

function splitToChars(text: string) {
  return text.split('').map((ch, i) => ({ ch: ch === ' ' ? '\u00A0' : ch, i }))
}

export function HeroMosaic() {
  const ref = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const parallaxScale = prefersReduced ? 0 : 1
  const y0 = useTransform(scrollYProgress, [0, 1], [0, TILE_SPECS[0].parallaxY * parallaxScale])
  const y1 = useTransform(scrollYProgress, [0, 1], [0, TILE_SPECS[1].parallaxY * parallaxScale])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, TILE_SPECS[2].parallaxY * parallaxScale])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, TILE_SPECS[3].parallaxY * parallaxScale])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, TILE_SPECS[4].parallaxY * parallaxScale])
  const ys = [y0, y1, y2, y3, y4]

  const heroTiles = TILE_SPECS.map((spec) => {
    const p = projects.find((pr) => pr.slug === spec.slug) ?? projects[0]
    return { ...spec, project: p }
  })

  return (
    <section
      ref={ref}
      id="hero"
      className="relative w-full overflow-hidden px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 md:min-h-[100svh] md:px-10 md:pb-28 md:pt-36 lg:pt-40"
    >
      <div className="mx-auto grid w-full max-w-[120rem] grid-cols-12 gap-x-3 gap-y-8 md:gap-x-4 md:gap-y-0">
        {/* — LEFT: Name + role */}
        <div className="col-span-12 flex flex-col justify-between gap-10 md:col-span-6 md:min-h-[70vh] md:gap-0">
          <motion.p
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-light sm:text-[11px]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
          >
            Art / Creative Director · Los Angeles
          </motion.p>

          <h1 className="font-serif leading-[0.88] tracking-[-0.035em] text-ink">
            <MaskedLine text="Brendon" delay={0.2} />
            <br />
            <MaskedLine text="Carbullido." italic delay={0.42} />
          </h1>

          <motion.div
            className="flex flex-col gap-6 md:gap-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1], delay: 1.1 }}
          >
            <p className="max-w-[36ch] font-serif text-[clamp(1rem,1.4vw,1.5rem)] font-light leading-[1.5] text-ink">
              A full creative department in one person. Seven years directing brands
              that perform — from concept and camera to campaign and calendar.
            </p>

            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/30 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink sm:px-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="hidden sm:inline">Currently taking select projects</span>
              <span className="sm:hidden">Taking projects</span>
            </span>
          </motion.div>
        </div>

        {/* — RIGHT: Mosaic */}
        <div className="col-span-12 md:col-span-6">
          {/* Desktop: complex 12-col asymmetric grid (5 tiles) */}
          <div
            className="hidden grid-cols-12 gap-2 md:grid md:gap-3"
            style={{ gridAutoRows: 'minmax(11vh, 1fr)' }}
          >
            {heroTiles.map((tile, i) => {
              const project = tile.project
              return (
                <motion.figure
                  key={tile.slug}
                  className={`relative overflow-hidden bg-cream-2 ${tile.className}`}
                  initial={{ opacity: 0, y: 48, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 1.1,
                    ease: [0.19, 1, 0.22, 1],
                    delay: 0.5 + i * 0.14,
                  }}
                  style={{ y: ys[i] }}
                >
                  <TileMedia project={project} eager={i === 0} />
                  <figcaption className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-[0.16em] text-cream mix-blend-difference">
                    {String(i + 1).padStart(2, '0')} · {project.client}
                  </figcaption>
                </motion.figure>
              )
            })}
          </div>

          {/* Mobile: simplified 2x2 grid — 4 tiles only, no parallax */}
          <div className="grid grid-cols-2 gap-2 md:hidden">
            {heroTiles.slice(0, 4).map((tile, i) => {
              const project = tile.project
              return (
                <motion.figure
                  key={tile.slug}
                  className="relative aspect-[4/5] overflow-hidden bg-cream-2"
                  initial={{ opacity: 0, y: 32, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 1.1,
                    ease: [0.19, 1, 0.22, 1],
                    delay: 0.5 + i * 0.1,
                  }}
                >
                  <TileMedia project={project} eager={i === 0} />
                  <figcaption className="absolute bottom-1.5 left-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-cream mix-blend-difference">
                    {String(i + 1).padStart(2, '0')} · {project.client}
                  </figcaption>
                </motion.figure>
              )
            })}
          </div>
        </div>
      </div>

      {/* Scroll hint — hidden on mobile to save space */}
      <motion.div
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-light md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.22em]">Scroll</span>
        <motion.span
          className="block h-8 w-px bg-ink-light"
          animate={{ scaleY: [0.2, 1, 0.2], originY: 0 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}

function TileMedia({ project, eager }: { project: (typeof projects)[number]; eager?: boolean }) {
  if (project.mediaType === 'video' && project.video) {
    return (
      <video
        src={project.video}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
    )
  }
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.client}
        loading={eager ? 'eager' : 'lazy'}
        className="absolute inset-0 h-full w-full object-cover"
      />
    )
  }
  return null
}

function MaskedLine({ text, italic, delay = 0 }: { text: string; italic?: boolean; delay?: number }) {
  const chars = splitToChars(text)
  return (
    <span
      className={`inline-block overflow-hidden align-top text-[clamp(3.25rem,14vw,11rem)] ${
        italic ? 'italic font-light' : 'font-light'
      }`}
      aria-label={text}
    >
      <span className="inline-flex flex-wrap" aria-hidden>
        {chars.map(({ ch, i }) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: 1.1,
              ease: [0.19, 1, 0.22, 1],
              delay: delay + i * 0.03,
            }}
          >
            {ch}
          </motion.span>
        ))}
      </span>
    </span>
  )
}
