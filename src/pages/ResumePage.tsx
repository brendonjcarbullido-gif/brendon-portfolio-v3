import { resume } from '@/data/resume'
import { AmbientResume } from '@/components/ambient/AmbientResume'
import { ImpactStats } from '@/components/resume/ImpactStats'
import { ExperienceTimeline } from '@/components/resume/ExperienceTimeline'
import { SkillsColumns } from '@/components/resume/SkillsColumns'
import { IndustryPills } from '@/components/resume/IndustryPills'

const gold = '#c9a96e'
const cream = '#f5f0e8'
const band = '#141210'

export function ResumePage() {
  const { identity, education } = resume
  const mapsQuery = encodeURIComponent(identity.location)
  const rolesRow = identity.roles.map((r) => r.toUpperCase()).join(' · ')

  return (
    <main className="relative min-h-screen" style={{ backgroundColor: '#0a0a0a', color: cream }}>
      <AmbientResume />
      <div className="relative z-10">
        <div className="mx-auto max-w-[1200px] px-6 pb-16 pt-24 md:px-10 md:pt-28">
          <a
            href={identity.resumePdf}
            download
            className="inline-block border border-[#c9a96e] bg-[#c9a96e] px-8 py-3 font-sans uppercase text-[#0a0a0a] no-underline transition-opacity hover:opacity-90"
            style={{ fontSize: '0.7rem', letterSpacing: '0.18em' }}
          >
            Download PDF
          </a>
        </div>

        <div className="mx-auto flex max-w-[1200px] flex-col gap-0 px-6 pb-24 md:flex-row md:px-10">
          {/* Left column — desktop band */}
          <aside
            className="mb-10 w-full shrink-0 rounded-sm p-8 md:mb-0 md:w-[340px] md:rounded-none md:rounded-l-sm"
            style={{ backgroundColor: band }}
          >
            <p
              className="font-serif"
              style={{
                fontSize: '1.25rem',
                fontWeight: 500,
                letterSpacing: '0.15em',
                color: cream,
                marginBottom: '2rem',
              }}
            >
              BC
            </p>
            <div className="mb-8 space-y-3">
              <a
                href={`mailto:${identity.email}`}
                className="flex items-start gap-2 font-sans text-sm no-underline hover:text-[#c9a96e]"
                style={{ color: 'rgba(245,240,232,0.85)' }}
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#c9a96e]" />
                {identity.email}
              </a>
              <a
                href={`tel:${identity.phone.replace(/\D/g, '')}`}
                className="flex items-start gap-2 font-sans text-sm no-underline hover:text-[#c9a96e]"
                style={{ color: 'rgba(245,240,232,0.85)' }}
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#c9a96e]" />
                {identity.phone}
              </a>
              <a
                href={`https://maps.google.com/?q=${mapsQuery}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2 font-sans text-sm no-underline hover:text-[#c9a96e]"
                style={{ color: 'rgba(245,240,232,0.85)' }}
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#c9a96e]" />
                {identity.location}
              </a>
            </div>
            <p className="mb-4 font-bebas uppercase" style={{ fontSize: '11px', color: gold, letterSpacing: '0.2em' }}>
              Impact
            </p>
            <div className="mb-10">
              <ImpactStats variant="compact" />
            </div>
            <p className="mb-4 font-bebas uppercase" style={{ fontSize: '11px', color: gold, letterSpacing: '0.2em' }}>
              Core skills
            </p>
            <div className="mb-8 text-sm">
              <SkillsColumns layout="stacked" />
            </div>
            <p className="mb-4 font-bebas uppercase" style={{ fontSize: '11px', color: gold, letterSpacing: '0.2em' }}>
              Industries
            </p>
            <IndustryPills />
            <div className="mt-10 border-t border-[rgba(201,169,110,0.15)] pt-8">
              <p className="font-serif" style={{ color: cream }}>
                {education.school}
              </p>
              <p className="mt-1 font-sans text-xs" style={{ color: 'rgba(245,240,232,0.55)' }}>
                {education.degree} · {education.focus}
              </p>
              <p className="mt-1 font-serif italic text-sm" style={{ color: gold }}>
                {education.emphasis}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-[rgba(245,240,232,0.35)]">
                {education.years}
              </p>
            </div>
          </aside>

          {/* Right column */}
          <div
            className="min-w-0 flex-1 rounded-sm border border-[rgba(201,169,110,0.12)] bg-[#0a0a0a] p-8 md:rounded-l-none md:border-l-0 md:py-10 md:pl-12 md:pr-10"
          >
            <h1
              className="font-serif uppercase"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                letterSpacing: '0.08em',
                lineHeight: 1.1,
                fontWeight: 400,
              }}
            >
              Brendon{' '}
              <span className="italic" style={{ color: gold }}>
                Carbullido
              </span>
            </h1>
            <p
              className="mt-4 font-sans uppercase"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.22em',
                color: 'rgba(245,240,232,0.45)',
              }}
            >
              {rolesRow}
            </p>
            <p
              className="mt-8 font-serif"
              style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.78)' }}
            >
              {resume.summary}
            </p>
            <p className="mt-12 font-bebas uppercase" style={{ fontSize: '13px', color: gold, letterSpacing: '0.25em' }}>
              Experience
            </p>
            <div className="mt-6">
              <ExperienceTimeline density="compact" />
            </div>
            <div
              className="mt-14 border border-[rgba(201,169,110,0.2)] px-6 py-8 text-center"
              style={{ backgroundColor: band }}
            >
              <p className="font-serif italic" style={{ fontSize: '1.1rem', color: gold }}>
                {identity.portfolio} — scan to be immersed
              </p>
              <p
                className="mt-4 font-sans uppercase"
                style={{ fontSize: '0.55rem', letterSpacing: '0.14em', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8 }}
              >
                {resume.clients.join(' · ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
