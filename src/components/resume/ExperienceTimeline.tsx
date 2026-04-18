import { resume } from '@/data/resume'

const gold = '#c9a96e'
const cream = '#f5f0e8'

type Density = 'comfortable' | 'compact'

export function ExperienceTimeline({ density = 'comfortable' }: { density?: Density }) {
  const compact = density === 'compact'

  return (
    <div className="flex flex-col gap-0">
      {resume.experience.map((job, i) => {
        const isCurrent = 'current' in job && job.current === true
        return (
          <article
            key={`${job.title}-${job.company}-${i}`}
            className="relative border-t border-[rgba(201,169,110,0.12)] py-8 first:border-t-0 first:pt-0 md:py-10"
            style={
              isCurrent
                ? { borderLeft: `3px solid ${gold}`, paddingLeft: compact ? '1rem' : '1.25rem', marginLeft: '-1px' }
                : undefined
            }
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
              <h3
                className="font-serif"
                style={{
                  fontSize: compact ? 'clamp(1.25rem, 2.5vw, 1.75rem)' : 'clamp(1.5rem, 3vw, 2.25rem)',
                  fontWeight: 300,
                  color: cream,
                  lineHeight: 1.15,
                }}
              >
                {job.title}
              </h3>
              <time
                className="shrink-0 font-mono uppercase"
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  color: 'rgba(245,240,232,0.35)',
                }}
              >
                {job.dateRange}
              </time>
            </div>
            <p
              className="mt-1 font-serif italic"
              style={{ fontSize: compact ? '0.95rem' : '1.05rem', color: gold }}
            >
              {job.company}
            </p>
            <ul className="mt-4 space-y-3">
              {job.bullets.map((b, bi) => (
                <li
                  key={`${job.title}-${i}-${bi}`}
                  className="flex gap-3 font-sans"
                  style={{
                    fontSize: compact ? '0.85rem' : '0.95rem',
                    lineHeight: 1.65,
                    color: 'rgba(245,240,232,0.72)',
                  }}
                >
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full"
                    style={{ backgroundColor: gold }}
                    aria-hidden
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </article>
        )
      })}
    </div>
  )
}
