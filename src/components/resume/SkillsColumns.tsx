import { resume } from '@/data/resume'

const gold = '#c9a96e'

const sections = [
  { key: 'direction' as const, label: 'Direction' },
  { key: 'production' as const, label: 'Production' },
  { key: 'tools' as const, label: 'Tools' },
]

export function SkillsColumns({ layout = 'default' }: { layout?: 'default' | 'stacked' }) {
  const gridClass =
    layout === 'stacked'
      ? 'grid grid-cols-1 gap-8'
      : 'grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8'

  return (
    <div className={gridClass}>
      {sections.map(({ key, label }) => (
        <div key={key}>
          <p
            className="mb-4 font-serif italic"
            style={{ fontSize: '1rem', color: gold, letterSpacing: '0.02em' }}
          >
            {label}
          </p>
          <ul className="space-y-2">
            {resume.skills[key].map((item) => (
              <li
                key={item}
                className="flex gap-2 font-sans"
                style={{ fontSize: '0.9rem', color: 'rgba(245,240,232,0.7)' }}
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#c9a96e]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
