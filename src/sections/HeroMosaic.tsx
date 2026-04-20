import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { projects } from '@/data/projects'

/**
 * HeroMosaic — replaces the previous Three.js face-tracking hero.
 *
 * Layout:  12-col editorial grid, oversized italic serif name on the left,
 *          a four-tile asymmetric video mosaic on the right with individual
 *          parallax speeds driven by useScroll.
 *
 * Motion:  Stagger entrance (masked char reveal on name, scale-up on tiles),
 *          continuous scroll-linked parallax on each tile, subtle rotate.
 */

const TILE_SPECS = [
  { slug: 'teeccino-social', className: 'col-span-5 row-span-3', parallaxY: -120, rotate: -1.4 },
  { slug: 'anne-klein', className: 'col-span-4 row-span-2 col-start-7', parallaxY: 80, rotate: 1.2 },
  { slug: 'joseph-abboud', className: 'col-span-3 row-span-2 col-start-11 row-start-1', parallaxY: 160, rotate: -0.8 },
  { slug: 'lotto-us', className: 'col-span-4 row-span-2 col-start-8 row-start-3', parallaxY: -80, rotate: 2 },
  { slug: 'casa-amour', className: 'col-span-3 row-span-2 col-start-12 row-start-3', parallaxY: 40, rotate: -1.8 },
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

  // Base parallax multiplier — flatter if reduced-motion
  const parallaxScale = prefersReduced ? 0 : 1
  const y0 = useTransform(scrollYProgress, [0, 1], [0, TILE_SPECS[0].parallaxY * parallaxScale])
  const y1 = useTransform(scrollYProgress, [0, 1], [0, TILE_SPECS[1].parallaxY * parallaxScale])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, TILE_SPECS[2].parallaxY * parallaxScale])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, TILE_SPECS[3].parallaxY * parallaxScale])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, TILE_SPECS[4].parallaxY * parallaxScale])
  const ys = [y0, y1, y2, y3, y4]

  const nameLine1 = 'Brendon'
  const nameLine2 = 'Carbullido.'

  const heroTiles = TILE_SPECS.map((spec) => {
    const p = projects.find((pr) => pr.slug === spec.slug) ?? projects[0]
    return { ...spec, project: p }
  })

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40"
    >
      <div className="mx-auto grid max-w-[120rem] grid-cols-12 gap-x-4 gap-y-10 md:gap-y-0">
        {/* — LEFT: Name + role + availability pill */}
        <div className="col-span-12 flex flex-col justify-between md:col-span-6 md:min-h-[70vh]">
          <motion.p
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-light"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
          >
            Art / Creative Director · Los Angeles
          </motion.p>

          <h1 className="mt-8 font-serif leading-[0.88] tracking-[-0.035em] text-ink md:mt-0">
            <MaskedLine text={nameLine1} delay={0.2} />
            <br />
            <MaskedLine text={nameLine2} italic delay={0.42} />
          </h1>

          <motion.div
            className="mt-10 flex flex-col gap-8 md:mt-0"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1], delay: 1.1 }}
          >
            <p className="max-w-[34rem] font-serif text-[clamp(1.125rem,1.6vw,1.5rem)] font-light leading-[1.5] text-ink">
              A full creative department in one person. Seven years directing brands
              that perform — from concept and camera to campaign and calendar.
            </p>

            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Currently taking select projects
              </span>
            </div>
          </motion.div>
        </div>

        {/* — RIGHT: Mosaic with 12 inner cols / 4 rows */}
        <div className="col-span-12 md:col-span-6">
          <div className="grid grid-cols-12 gap-2 md:gap-3" style={{ gridAutoRows: 'minmax(14vh, 1fr)' }}>
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
                  style={{ y: ys[i], rotate: tile.rotate }}
                >
                  {project.mediaType === 'video' && project.video ? (
                    <video
                      src={project.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : project.image ? (
                    <img
                      src={project.image}
                      alt={project.client}
                      loading="eager"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : null}
                  <figcaption className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-[0.16em] text-cream mix-blend-difference">
                    {String(i + 1).padStart(2, '0')} · {project.client}
                  </figcaption>
                </motion.figure>
              )
            })}
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-ink-light"
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

function MaskedLine({ text, italic, delay = 0 }: { text: string; italic?: boolean; delay?: number }) {
  const chars = splitToChars(text)
  return (
    <span
      className={`inline-block overflow-hidden align-top text-[clamp(4rem,13vw,11rem)] ${
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
