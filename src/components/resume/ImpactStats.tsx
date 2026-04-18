import { resume } from '@/data/resume'

const gold = '#c9a96e'
const cream = '#f5f0e8'

type Variant = 'default' | 'compact'

export function ImpactStats({ variant = 'default' }: { variant?: Variant }) {
  const stats = resume.impact
  const isCompact = variant === 'compact'

  return (
    <div
      className={isCompact ? 'grid grid-cols-2 gap-4' : 'grid grid-cols-2 gap-6 md:grid-cols-4'}
    >
      {stats.map((item) => (
        <div
          key={item.label}
          className="relative overflow-hidden rounded-sm border border-[rgba(201,169,110,0.2)] bg-[#111] px-4 py-5 md:px-5 md:py-6"
        >
          <span
            className="absolute left-3 top-3 h-1 w-1 rounded-full md:left-4 md:top-4"
            style={{ backgroundColor: gold }}
            aria-hidden
          />
          <p
            className="font-serif pl-4"
            style={{
              fontSize: isCompact ? 'clamp(28px, 5vw, 40px)' : 'clamp(36px, 5vw, 56px)',
              fontWeight: 300,
              color: cream,
              lineHeight: 1,
            }}
          >
            {item.value}
          </p>
          <p
            className="mt-2 pl-4 font-sans uppercase"
            style={{
              fontSize: '10px',
              letterSpacing: '0.18em',
              color: 'rgba(245,240,232,0.45)',
            }}
          >
            {item.label}
          </p>
        </div>
      ))}
    </div>
  )
}
