import { motion } from 'framer-motion'
import { type CSSProperties, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { projects } from '@/data/projects'

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '')
  const normalized = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean
  const num = Number.parseInt(normalized, 16)
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  }
}

const labelStyle: CSSProperties = {
  fontFamily: 'DM Mono, Menlo, Monaco, Consolas, monospace',
  fontSize: '0.6rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.3)',
}

export function CaseStudy() {
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()

  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const project = currentIndex >= 0 ? projects[currentIndex] : null
  const nextProject = currentIndex >= 0 ? projects[(currentIndex + 1) % projects.length] : null

  const tint = useMemo(() => {
    const color = project?.caseStudy.color ?? '#6B5A47'
    const { r, g, b } = hexToRgb(color)
    return `linear-gradient(to bottom, rgba(${r}, ${g}, ${b}, 0.08) 0%, #0a0a0a 100%)`
  }, [project])

  const isVideo = (src: string) =>
    src.endsWith('.mp4') || src.endsWith('.mov') || src.endsWith('.MOV')

  if (!project) {
    return (
      <main
        style={{
          minHeight: '100vh',
          background: '#0a0a0a',
          color: '#f5f0e8',
          display: 'grid',
          placeItems: 'center',
          padding: '2rem',
        }}
      >
        <button
          type="button"
          onClick={() => navigate('/')}
          style={{
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'transparent',
            color: 'rgba(255,255,255,0.7)',
            padding: '0.7rem 1rem',
            cursor: 'pointer',
          }}
        >
          Project not found — Back home
        </button>
      </main>
    )
  }

  return (
    <>
      <style>{`
        .case-study-shell {
          display: flex;
          min-height: 100vh;
          background: #0a0a0a;
          color: #f5f0e8;
        }
        .case-study-left {
          width: 45%;
          position: sticky;
          top: 0;
          height: 100vh;
        }
        .case-study-right {
          width: 55%;
          min-height: 100vh;
        }
        @media (max-width: 767px) {
          .case-study-shell {
            display: block;
          }
          .case-study-left {
            width: 100%;
            height: 50vh;
            position: relative;
            top: auto;
          }
          .case-study-right {
            width: 100%;
          }
          .case-study-meta-row {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .case-study-gallery {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <main className="case-study-shell">
        <aside className="case-study-left">
          <div style={{ position: 'absolute', inset: 0 }}>
            {project.mediaType === 'video' && project.video ? (
              <video
                src={project.video}
                autoPlay
                muted
                loop
                playsInline
                poster={project.image}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 40%)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'absolute', left: '2rem', right: '2rem', bottom: '2rem' }}>
            <p
              style={{
                fontFamily: 'DM Mono, Menlo, Monaco, Consolas, monospace',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '0.8rem',
              }}
            >
              {project.category} · {project.year}
            </p>
            <h1
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
                color: '#f5f0e8',
                lineHeight: 0.98,
                marginBottom: '0.7rem',
              }}
            >
              {project.title}
            </h1>
            <p
              style={{
                fontFamily: 'DM Mono, Menlo, Monaco, Consolas, monospace',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.35)',
              }}
            >
              {project.client}
            </p>
          </div>
        </aside>

        <section
          className="case-study-right"
          style={{
            background: tint,
            paddingTop: '80px',
            paddingLeft: 'clamp(2rem, 5vw, 5rem)',
            paddingRight: 'clamp(2rem, 5vw, 5rem)',
            paddingBottom: '3rem',
          }}
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              display: 'inline-block',
              border: 'none',
              background: 'transparent',
              fontFamily: 'DM Mono, Menlo, Monaco, Consolas, monospace',
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              padding: '1.5rem 0',
            }}
          >
            ← Work
          </button>

          <h2
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              fontWeight: 300,
              lineHeight: 0.95,
              color: '#f5f0e8',
              marginBottom: '3rem',
            }}
          >
            {project.caseStudy.headline}
          </h2>

          <div
            className="case-study-meta-row"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '1.5rem',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: '1.5rem',
              marginBottom: '3rem',
            }}
          >
            <div>
              <p style={labelStyle}>Role</p>
              <p
                style={{
                  marginTop: '0.55rem',
                  fontFamily: 'DM Mono, Menlo, Monaco, Consolas, monospace',
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                {project.caseStudy.role}
              </p>
            </div>
            <div>
              <p style={labelStyle}>Client</p>
              <p
                style={{
                  marginTop: '0.55rem',
                  fontFamily: 'DM Mono, Menlo, Monaco, Consolas, monospace',
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                {project.client}
              </p>
            </div>
            <div>
              <p style={labelStyle}>Year</p>
              <p
                style={{
                  marginTop: '0.55rem',
                  fontFamily: 'DM Mono, Menlo, Monaco, Consolas, monospace',
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                {project.year}
              </p>
            </div>
          </div>

          <section style={{ marginBottom: '3rem' }}>
            <p style={{ ...labelStyle, marginBottom: '1rem' }}>Overview</p>
            <p
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.65)',
              }}
            >
              {project.caseStudy.overview}
            </p>
          </section>

          <section style={{ marginBottom: '4rem' }}>
            <p style={{ ...labelStyle, marginBottom: '1rem' }}>Deliverables</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {project.caseStudy.deliverables.map((d) => (
                <span
                  key={d}
                  style={{
                    border: '1px solid rgba(255,255,255,0.15)',
                    padding: '0.4rem 0.9rem',
                    borderRadius: '1px',
                    fontFamily: 'DM Mono, Menlo, Monaco, Consolas, monospace',
                    fontSize: '0.6rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  {d}
                </span>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: '5rem' }}>
            <p style={{ ...labelStyle, marginBottom: '1.5rem' }}>Gallery</p>
            <div
              className="case-study-gallery"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: '0.75rem',
              }}
            >
              {project.caseStudy.images.map((img, i) => (
                <motion.div
                  key={`${img}-${i}`}
                  initial={{ scale: 0.97, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{ aspectRatio: '1 / 1' }}
                >
                  {isVideo(img) ? (
                    <video
                      src={img}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '2px',
                        display: 'block',
                      }}
                    />
                  ) : (
                    <img
                      src={img}
                      alt={`${project.title} gallery ${i + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '2px',
                        display: 'block',
                      }}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {nextProject ? (
            <button
              type="button"
              onClick={() => navigate(`/work/${nextProject.slug}`)}
              style={{
                width: '100%',
                textAlign: 'left',
                background: 'transparent',
                border: 'none',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '3rem',
                cursor: 'pointer',
              }}
            >
              <p style={{ ...labelStyle, marginBottom: '1rem' }}>Next Project</p>
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  color: '#f5f0e8',
                }}
              >
                {nextProject.title}
              </p>
              <p
                style={{
                  fontFamily: 'DM Mono, Menlo, Monaco, Consolas, monospace',
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: project.caseStudy.color,
                  marginTop: '0.75rem',
                }}
              >
                View Case Study →
              </p>
            </button>
          ) : null}
        </section>
      </main>
    </>
  )
}
