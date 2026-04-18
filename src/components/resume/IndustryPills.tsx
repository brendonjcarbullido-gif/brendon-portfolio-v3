import { resume } from '@/data/resume'

export function IndustryPills() {
  return (
    <div className="flex flex-wrap gap-2">
      {resume.industries.map((ind) => (
        <span
          key={ind}
          className="border border-[rgba(201,169,110,0.35)] px-3 py-1.5 font-sans uppercase"
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.14em',
            color: 'rgba(245,240,232,0.55)',
          }}
        >
          {ind}
        </span>
      ))}
    </div>
  )
}
