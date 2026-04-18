import { WorkGrid } from '@/sections/WorkGrid'
import { resume } from '@/data/resume'
import { AmbientWork } from '@/components/ambient/AmbientWork'

const gold = '#c9a96e'
const cream = '#f5f0e8'

export function WorkPage() {
  const clientLine = resume.clients.join(' · ')

  return (
    <main className="relative" style={{ backgroundColor: '#0a0a0a', color: cream }}>
      <AmbientWork />
      <div className="relative z-10 pt-28 md:pt-32">
        <div className="mx-auto max-w-[1600px] px-4 md:px-[60px]">
          <h1
            className="font-serif italic"
            style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              lineHeight: 1.05,
              marginBottom: '1rem',
            }}
          >
            Selected Work
          </h1>
          <p
            className="max-w-[900px] font-sans"
            style={{
              fontSize: '0.95rem',
              lineHeight: 1.7,
              color: 'rgba(245,240,232,0.55)',
              marginBottom: '0.5rem',
            }}
          >
            Campaigns, identities, and content systems for {clientLine}.
          </p>
          <p className="font-sans uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: gold }}>
            Full case studies below
          </p>
        </div>
        <WorkGrid omitHeader />
      </div>
    </main>
  )
}
