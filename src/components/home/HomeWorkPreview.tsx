import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '@/data/projects'

const gold = '#c9a96e'
const cream = '#f5f0e8'
const bg = '#0a0a0a'

const featured = projects.slice(0, 4)

export function HomeWorkPreview() {
  return (
    <section
      className="px-6 py-24 md:px-[60px] md:py-32"
      style={{ backgroundColor: bg, color: cream }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p
              className="font-bebas uppercase"
              style={{ fontSize: '14px', color: gold, letterSpacing: '0.2em', marginBottom: '16px' }}
            >
              Work
            </p>
            <h2 className="font-serif italic" style={{ fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.1 }}>
              Selected projects
            </h2>
          </div>
          <Link
            to="/work"
            className="font-sans uppercase transition-colors duration-300 hover:text-[#c9a96e]"
            style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(245,240,232,0.55)' }}
          >
            View all work →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link
                to={`/work/${p.slug}`}
                className="group block overflow-hidden rounded-sm border border-[rgba(201,169,110,0.15)] no-underline"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {p.mediaType === 'video' && p.video ? (
                    <video
                      src={p.video}
                      autoPlay
                      muted
                      playsInline
                      loop
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={p.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"
                    aria-hidden
                  />
                </div>
                <div className="p-4">
                  <p className="font-bebas" style={{ fontSize: '14px', letterSpacing: '0.08em' }}>
                    {p.client}
                  </p>
                  <p
                    className="mt-1 font-sans uppercase"
                    style={{ fontSize: '10px', letterSpacing: '0.12em', color: gold }}
                  >
                    {p.category}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
