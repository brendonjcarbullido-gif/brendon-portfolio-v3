import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { projects } from '@/data/projects'
import { resume } from '@/data/resume'
import { RoleRotator } from '@/components/motion/RoleRotator'
import { Scramble } from '@/components/motion/Scramble'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useOrientation } from '@/contexts/OrientationContext'

/**
 * HeroMosaic — editorial hero with:
 *  • masked char-by-char name reveal
 *  • italic-serif role rotator below name (Art / Creative Director / Brand Strategist)
 *  • 5-tile asymmetric video mosaic with continuous Ken Burns + scroll parallax
 *  • scramble-in captions on each tile
 * Mobile shows a simplified 2×2 mosaic with gentler parallax and the same rotator.
 */

const TILE_SPECS = [
  { slug: 'teeccino-packaging', className: 'col-span-7 row-span-3', parallaxDesk: -100, parallaxMob: -32, kb: 'kb-a', depthGyro: 8 },
  { slug: 'anne-klein', className: 'col-span-5 row-span-2 col-start-8', parallaxDesk: 60, parallaxMob: 20, kb: 'kb-b', depthGyro: 6 },
  { slug: 'joseph-abboud', className: 'col-span-4 row-span-2 col-start-1 row-start-4', parallaxDesk: 120, parallaxMob: 40, kb: 'kb-c', depthGyro: 4 },
  { slug: 'lotto-us', className: 'col-span-5 row-span-2 col-start-5 row-start-4', parallaxDesk: -60, parallaxMob: -20, kb: 'kb-d', depthGyro: 5 },
  { slug: 'casa-amour', className: 'col-span-3 row-span-2 col-start-10 row-start-4', parallaxDesk: 40, parallaxMob: 15, kb: 'kb-e', depthGyro: 3 },
] as const

const ROLES = ['Art Director', 'Creative Director', 'Brand Strategist'] as const

type HeroTile = (typeof TILE_SPECS)[number] & { project: (typeof projects)[number] }

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
  const my4 = useTransform(scrollYProgress, [0, 1], [0, TILE_SPECS[4].parallaxMob])
  const desktopY = [dy0, dy1, dy2, dy3, dy4]
  const mobileY = [my0, my1, my2, my3, my4]

  // Gyroscopic X-axis depth — mobile only, behind the Experience toggle
  const [{ enabled, gamma, beta }] = useOrientation()
  const gammaMv = useMotionValue(0)
  const betaMv  = useMotionValue(0)
  useEffect(() => { gammaMv.set(gamma) }, [gamma, gammaMv])
  useEffect(() => { betaMv.set(beta)   }, [beta,  betaMv])

  const SPRING = { stiffness: 100, damping: 20 } as const

  // X translation — depthGyro * 2 px range per tile
  const gx0 = useTransform(gammaMv, [-1, 1], [-TILE_SPECS[0].depthGyro * 2, TILE_SPECS[0].depthGyro * 2])
  const gx1 = useTransform(gammaMv, [-1, 1], [-TILE_SPECS[1].depthGyro * 2, TILE_SPECS[1].depthGyro * 2])
  const gx2 = useTransform(gammaMv, [-1, 1], [-TILE_SPECS[2].depthGyro * 2, TILE_SPECS[2].depthGyro * 2])
  const gx3 = useTransform(gammaMv, [-1, 1], [-TILE_SPECS[3].depthGyro * 2, TILE_SPECS[3].depthGyro * 2])
  const gx4 = useTransform(gammaMv, [-1, 1], [-TILE_SPECS[4].depthGyro * 2, TILE_SPECS[4].depthGyro * 2])
  const gx0Spring = useSpring(gx0, SPRING)
  const gx1Spring = useSpring(gx1, SPRING)
  const gx2Spring = useSpring(gx2, SPRING)
  const gx3Spring = useSpring(gx3, SPRING)
  const gx4Spring = useSpring(gx4, SPRING)
  const gyroX = [gx0Spring, gx1Spring, gx2Spring, gx3Spring, gx4Spring]

  // rotateY — gamma-driven, magnitude = depthGyro * 1.0 deg
  const ry0 = useTransform(gammaMv, [-1, 1], [-(TILE_SPECS[0].depthGyro * 1.0), TILE_SPECS[0].depthGyro * 1.0])
  const ry1 = useTransform(gammaMv, [-1, 1], [-(TILE_SPECS[1].depthGyro * 1.0), TILE_SPECS[1].depthGyro * 1.0])
  const ry2 = useTransform(gammaMv, [-1, 1], [-(TILE_SPECS[2].depthGyro * 1.0), TILE_SPECS[2].depthGyro * 1.0])
  const ry3 = useTransform(gammaMv, [-1, 1], [-(TILE_SPECS[3].depthGyro * 1.0), TILE_SPECS[3].depthGyro * 1.0])
  const ry4 = useTransform(gammaMv, [-1, 1], [-(TILE_SPECS[4].depthGyro * 1.0), TILE_SPECS[4].depthGyro * 1.0])
  const ry0Spring = useSpring(ry0, SPRING)
  const ry1Spring = useSpring(ry1, SPRING)
  const ry2Spring = useSpring(ry2, SPRING)
  const ry3Spring = useSpring(ry3, SPRING)
  const ry4Spring = useSpring(ry4, SPRING)
  const gyroRotY = [ry0Spring, ry1Spring, ry2Spring, ry3Spring, ry4Spring]

  // rotateX — beta-driven, magnitude = depthGyro * 1.0 deg
  const rx0 = useTransform(betaMv, [-1, 1], [-(TILE_SPECS[0].depthGyro * 1.0), TILE_SPECS[0].depthGyro * 1.0])
  const rx1 = useTransform(betaMv, [-1, 1], [-(TILE_SPECS[1].depthGyro * 1.0), TILE_SPECS[1].depthGyro * 1.0])
  const rx2 = useTransform(betaMv, [-1, 1], [-(TILE_SPECS[2].depthGyro * 1.0), TILE_SPECS[2].depthGyro * 1.0])
  const rx3 = useTransform(betaMv, [-1, 1], [-(TILE_SPECS[3].depthGyro * 1.0), TILE_SPECS[3].depthGyro * 1.0])
  const rx4 = useTransform(betaMv, [-1, 1], [-(TILE_SPECS[4].depthGyro * 1.0), TILE_SPECS[4].depthGyro * 1.0])
  const rx0Spring = useSpring(rx0, SPRING)
  const rx1Spring = useSpring(rx1, SPRING)
  const rx2Spring = useSpring(rx2, SPRING)
  const rx3Spring = useSpring(rx3, SPRING)
  const rx4Spring = useSpring(rx4, SPRING)
  const gyroRotX = [rx0Spring, rx1Spring, rx2Spring, rx3Spring, rx4Spring]

  // scale — gamma-driven, offset = depthGyro * 0.005
  const sc0 = useTransform(gammaMv, [-1, 1], [1 - TILE_SPECS[0].depthGyro * 0.005, 1 + TILE_SPECS[0].depthGyro * 0.005])
  const sc1 = useTransform(gammaMv, [-1, 1], [1 - TILE_SPECS[1].depthGyro * 0.005, 1 + TILE_SPECS[1].depthGyro * 0.005])
  const sc2 = useTransform(gammaMv, [-1, 1], [1 - TILE_SPECS[2].depthGyro * 0.005, 1 + TILE_SPECS[2].depthGyro * 0.005])
  const sc3 = useTransform(gammaMv, [-1, 1], [1 - TILE_SPECS[3].depthGyro * 0.005, 1 + TILE_SPECS[3].depthGyro * 0.005])
  const sc4 = useTransform(gammaMv, [-1, 1], [1 - TILE_SPECS[4].depthGyro * 0.005, 1 + TILE_SPECS[4].depthGyro * 0.005])
  const sc0Spring = useSpring(sc0, SPRING)
  const sc1Spring = useSpring(sc1, SPRING)
  const sc2Spring = useSpring(sc2, SPRING)
  const sc3Spring = useSpring(sc3, SPRING)
  const sc4Spring = useSpring(sc4, SPRING)
  const gyroScale = [sc0Spring, sc1Spring, sc2Spring, sc3Spring, sc4Spring]

  // Shadow filter — single string template driven by both axes
  const shadowFilter = useTransform(
    [gammaMv, betaMv],
    ([g, b]: number[]) => `drop-shadow(${g * 16}px ${b * 8}px 16px rgba(0,0,0,0.18))`,
  )

  const heroTiles: HeroTile[] = TILE_SPECS.map((spec) => {
    const p = projects.find((pr) => pr.slug === spec.slug) ?? projects[0]
    return { ...spec, project: p }
  })

  const [activeTile, setActiveTile] = useState<HeroTile | null>(null)
  const lightboxRef = useRef<HTMLDivElement>(null)
  useFocusTrap(lightboxRef, !!activeTile)

  useEffect(() => {
    if (!activeTile) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveTile(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeTile])

  useEffect(() => {
    document.body.style.overflow = activeTile ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeTile])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative w-full touch-manipulation overscroll-y-contain overflow-hidden px-5 pb-10 pt-28 sm:px-6 sm:pb-24 sm:pt-32 md:min-h-[100svh] md:px-10 md:pb-28 md:pt-36 lg:pt-40"
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
            <Scramble text="LOS ANGELES / 2018 — PRESENT" />
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
              {resume.summaryShort}
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
                  data-cursor={activeTile ? undefined : 'View'}
                  className={`relative overflow-hidden bg-cream-2 ${tile.className} ${tile.kb}`}
                  initial={{ opacity: 0, y: 48, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 1.1,
                    ease: [0.19, 1, 0.22, 1],
                    delay: 0.5 + i * 0.14,
                  }}
                  style={{ cursor: 'pointer', y: prefersReduced ? 0 : desktopY[i] }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${project.title}`}
                  onClick={() => setActiveTile(tile)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActiveTile(tile)
                    }
                  }}
                >
                  <TileMedia project={project} eager={i === 0} />
                  <figcaption className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-[0.16em] text-cream mix-blend-difference">
                    <Scramble text={`${String(i + 1).padStart(2, '0')} · ${project.client.toUpperCase()}`} durationMs={1100} />
                  </figcaption>
                </motion.figure>
              )
            })}
          </div>

          {/* Mobile: 5-tile vertical stagger */}
          <div className="flex flex-col gap-3 md:hidden" style={{ perspective: '1200px' }}>
            {(
              [
                { tile: heroTiles[0], width: '80%', align: 'self-start', aspect: 'aspect-[4/5]' },
                { tile: heroTiles[1], width: '75%', align: 'self-end',   aspect: 'aspect-[1/1]' },
                { tile: heroTiles[2], width: '70%', align: 'self-start', aspect: 'aspect-[5/4]' },
                { tile: heroTiles[3], width: '85%', align: 'self-end',   aspect: 'aspect-[3/4]' },
                { tile: heroTiles[4], width: '55%', align: 'self-start', aspect: 'aspect-[1/1]' },
              ] as { tile: HeroTile; width: string; align: string; aspect: string }[]
            ).map(({ tile, width, align, aspect }, i) => {
              const project = tile.project
              return (
                <motion.figure
                  key={`mob-stagger-${tile.slug}`}
                  data-cursor={activeTile ? undefined : 'View'}
                  className={`relative overflow-hidden bg-cream-2 ${tile.kb} ${align} ${aspect}`}
                  initial={{ opacity: 0, y: 32, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1.0, ease: [0.19, 1, 0.22, 1], delay: 0.5 + i * 0.1 }}
                  style={{
                    width,
                    cursor: 'pointer',
                    touchAction: 'manipulation',
                    transformOrigin: 'center center',
                    transformStyle: 'preserve-3d',
                    transformPerspective: 1200,
                    y:       prefersReduced ? 0 : mobileY[i],
                    x:       prefersReduced ? 0 : (enabled ? gyroX[i]    : 0),
                    rotateY: prefersReduced ? 0 : (enabled ? gyroRotY[i] : 0),
                    rotateX: prefersReduced ? 0 : (enabled ? gyroRotX[i] : 0),
                    scale:   prefersReduced ? 1 : (enabled ? gyroScale[i] : 1),
                    filter:  enabled && !prefersReduced ? shadowFilter : undefined,
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${project.title}`}
                  onClick={() => setActiveTile(tile)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActiveTile(tile)
                    }
                  }}
                >
                  <TileMedia project={project} eager={i === 0} />
                  <figcaption className="absolute bottom-2 left-2 font-mono text-[8px] uppercase tracking-[0.16em] text-cream mix-blend-difference">
                    <Scramble text={`${String(i + 1).padStart(2, '0')} · ${project.client.toUpperCase()}`} durationMs={1100} />
                  </figcaption>
                </motion.figure>
              )
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeTile && (
          <motion.div
            ref={lightboxRef}
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Project preview"
            className="fixed inset-0 z-[70] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            onClick={() => setActiveTile(null)}
          >
            <motion.div
              className="absolute inset-0 bg-ink"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.92 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            />

            <motion.div
              className="relative z-10"
              initial={{ scale: 0.88, opacity: 0, y: 32 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ duration: 0.65, ease: [0.19, 1, 0.22, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: 'min(90vw, 1100px)',
                maxHeight: '85vh',
                borderRadius: '2px',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-end',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: 'fit-content',
                  margin: '0 auto',
                  maxWidth: '100%',
                }}
              >
                {activeTile.project.mediaType === 'video' && (activeTile.project.fullVideo ?? activeTile.project.video) ? (
                  <video
                    src={activeTile.project.fullVideo ?? activeTile.project.video}
                    poster={activeTile.project.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    crossOrigin="anonymous"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '82vh',
                      objectFit: 'contain',
                      display: 'block',
                      borderRadius: '2px',
                    }}
                  />
                ) : activeTile.project.image ? (
                  <img
                    src={activeTile.project.image}
                    alt={activeTile.project.client}
                    decoding="async"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '82vh',
                      objectFit: 'contain',
                      display: 'block',
                      borderRadius: '2px',
                    }}
                  />
                ) : null}

                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1.5rem',
                    background: 'linear-gradient(to top, rgba(10,10,10,0.75) 0%, transparent 100%)',
                    borderRadius: '0 0 2px 2px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: 'DM Mono, monospace',
                        fontSize: '0.6rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.22em',
                        color: 'rgba(245,240,232,0.5)',
                        marginBottom: '0.3rem',
                      }}
                    >
                      {activeTile.project.category} · {activeTile.project.year}
                    </p>
                    <p
                      style={{
                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                        fontStyle: 'italic',
                        fontSize: 'clamp(1.1rem,2.2vw,1.8rem)',
                        fontWeight: 300,
                        color: '#f5f0e8',
                        lineHeight: 1,
                      }}
                    >
                      {activeTile.project.title}
                    </p>
                  </div>
                  <p
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.6rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.22em',
                      color: 'rgba(245,240,232,0.35)',
                    }}
                  >
                    {activeTile.project.client}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.button
              type="button"
              className="absolute right-4 top-12 z-20 flex h-11 w-11 items-center justify-center sm:right-6 sm:top-6"
              onClick={() => setActiveTile(null)}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              aria-label="Close"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/60 transition-colors duration-200 hover:text-cream">
                Close
              </span>
            </motion.button>

            <motion.p
              className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.2em] text-cream/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="sm:hidden">Tap to close</span>
              <span className="hidden sm:inline">Click anywhere to close</span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

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
        preload="metadata"
        crossOrigin="anonymous"
        poster={project.image ?? ''}
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
