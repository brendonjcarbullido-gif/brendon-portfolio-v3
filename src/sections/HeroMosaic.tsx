import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { projects } from '@/data/projects'
import { RoleRotator } from '@/components/motion/RoleRotator'
import { Scramble } from '@/components/motion/Scramble'

/**
 * HeroMosaic — editorial hero with:
 *  • masked char-by-char name reveal
 *  • italic-serif role rotator below name (Art / Creative Director / Brand Strategist)
 *  • 5-tile asymmetric video mosaic with continuous Ken Burns + scroll parallax
 *  • scramble-in captions on each tile
 * Mobile shows a simplified 2×2 mosaic with gentler parallax and the same rotator.
 */

const TILE_SPECS = [
  { slug: 'teeccino-social', className: 'col-span-7 row-span-3', parallaxDesk: -100, parallaxMob: -32, kb: 'kb-a' },
  { slug: 'anne-klein', className: 'col-span-5 row-span-2 col-start-8', parallaxDesk: 60, parallaxMob: 20, kb: 'kb-b' },
  { slug: 'joseph-abboud', className: 'col-span-4 row-span-2 col-start-1 row-start-4', parallaxDesk: 120, parallaxMob: 40, kb: 'kb-c' },
  { slug: 'lotto-us', className: 'col-span-5 row-span-2 col-start-5 row-start-4', parallaxDesk: -60, parallaxMob: -20, kb: 'kb-d' },
  { slug: 'casa-amour', className: 'col-span-3 row-span-2 col-start-10 row-start-4', parallaxDesk: 40, parallaxMob: 15, kb: 'kb-e' },
] as const

const ROLES = ['Art Director', 'Creative Director', 'Brand Strategist'] as const

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

  // Build tile-specific parallax transforms for desktop + mobile amounts.
  // We always declare them so React stays happy, then switch the applied value
  // based on a media query at render.
  const dy0 = useTransform(scrollYProgress, [0, 1], [0, TILE_SPECS[0].parallaxDesk])
  const dy1 = useTransform(scrollYProgress, [0, 1], [0, TILE_SPECS[1].parallaxDesk])
  const dy2 = useTransform(scrollYProgress, [0, 1], [0, TILE_SPECS[2].parallaxDesk])
  const dy3 = useTransform(scrollYProgress, [0, 1], [0, TILE_SPECS[3].parallaxDesk])
  const dy4 = useTransform(scrollYProgress, [0, 1], [0, TILE_SPECS[4].parallaxDesk])
  const my0 = useTransform(scrollYProgress, [0, 1], [0, TILE_SPECS[0].parallaxMob])
  const my1 = useTransform(scrollYProgress, [0, 1], [0, TILE_SPECS[1].parallaxMob])
  const my2 = useTransform(scrollYProgress, [0, 1], [0, TILE_SPECS[2].parallaxMob])
  const my3 = useTransform(scrollYProgress, [0, 1], [0, TILE_SPECS[3].parallaxMob])
  const desktopY = [dy0, dy1, dy2, dy3, dy4]
  const mobileY = [my0, my1, my2, my3]

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
        {/* — LEFT: Name + role rotator + CTA pill */}
        <div className="col-span-12 flex flex-col justify-between gap-10 md:col-span-6 md:min-h-[70vh] md:gap-0">
          <motion.p
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-light sm:text-[11px]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
          >
            <Scramble text="LOS ANGELES / 2019 — PRESENT" />
          </motion.p>

          <h1 className="font-serif leading-[0.88] tracking-[-0.035em] text-ink">
            <MaskedLine
              text="Brendon"
              delay={0.2}
              sizeClass="text-[clamp(2.75rem,13vw,11rem)]"
            />
            <MaskedLine
              text="Carbullido."
              italic
              delay={0.42}
              sizeClass="text-[clamp(1.9rem,8.5vw,7.25rem)]"
            />
          </h1>

          <motion.div
            className="flex flex-col gap-6 md:gap-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1], delay: 1.1 }}
          >
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-serif text-[clamp(1rem,1.4vw,1.5rem)] font-light leading-[1.4] text-ink">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-light sm:text-[11px]">
                Currently —
              </span>
              <RoleRotator roles={ROLES} className="italic text-accent" />
            </p>

            <p className="max-w-[36ch] font-serif text-[clamp(1rem,1.35vw,1.4rem)] font-light leading-[1.5] text-ink">
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
                  data-cursor="View"
                  className={`relative overflow-hidden bg-cream-2 ${tile.className} ${tile.kb}`}
                  initial={{ opacity: 0, y: 48, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 1.1,
                    ease: [0.19, 1, 0.22, 1],
                    delay: 0.5 + i * 0.14,
                  }}
                  style={{ y: prefersReduced ? 0 : desktopY[i] }}
                >
                  <TileMedia project={project} eager={i === 0} />
                  <figcaption className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-[0.16em] text-cream mix-blend-difference">
                    <Scramble text={`${String(i + 1).padStart(2, '0')} · ${project.client.toUpperCase()}`} durationMs={1100} />
                  </figcaption>
                </motion.figure>
              )
            })}
          </div>

          {/* Mobile: simplified 2×2 grid — 4 tiles, gentler parallax */}
          <div className="grid grid-cols-2 gap-2 md:hidden">
            {heroTiles.slice(0, 4).map((tile, i) => {
              const project = tile.project
              return (
                <motion.figure
                  key={tile.slug}
                  data-cursor="View"
                  className={`relative aspect-[4/5] overflow-hidden bg-cream-2 ${tile.kb}`}
                  initial={{ opacity: 0, y: 32, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 1.1,
                    ease: [0.19, 1, 0.22, 1],
                    delay: 0.5 + i * 0.1,
                  }}
                  style={{ y: prefersReduced ? 0 : mobileY[i] }}
                >
                  <TileMedia project={project} eager={i === 0} />
                  <figcaption className="absolute bottom-1.5 left-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-cream mix-blend-difference">
                    <Scramble text={`${String(i + 1).padStart(2, '0')} · ${project.client.toUpperCase()}`} durationMs={1100} />
                  </figcaption>
                </motion.figure>
              )
            })}
          </div>
        </div>
      </div>

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
        poster={project.image}
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

function MaskedLine({
  text,
  italic,
  delay = 0,
  sizeClass = 'text-[clamp(2.75rem,13vw,11rem)]',
}: {
  text: string
  italic?: boolean
  delay?: number
  sizeClass?: string
}) {
  const chars = splitToChars(text)
  return (
    <span
      className={`block overflow-hidden align-top whitespace-nowrap ${sizeClass} ${
        italic ? 'italic font-light' : 'font-light'
      }`}
      aria-label={text}
    >
      <span className="inline-flex flex-nowrap whitespace-nowrap" aria-hidden>
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
