import { Link } from 'react-router-dom'
import { resume } from '@/data/resume'
import { ImpactStats } from '@/components/resume/ImpactStats'

const gold = '#c9a96e'
const cream = '#f5f0e8'
const bg = '#0a0a0a'

function firstTwoSentences(text: string): string {
  const parts = text.match(/[^.!?]+[.!?]+/g)
  if (!parts || parts.length === 0) return text
  return parts.slice(0, 2).join(' ').trim()
}

export function HomeAboutPreview() {
  const blurb = firstTwoSentences(resume.summary)

  return (
    <section className="px-6 py-24 md:px-[60px] md:py-32" style={{ backgroundColor: bg, color: cream }}>
      <div className="mx-auto max-w-[1200px]">
        <p
          className="font-bebas uppercase"
          style={{ fontSize: '14px', color: gold, letterSpacing: '0.2em', marginBottom: '24px' }}
        >
          About
        </p>
        <p
          className="mx-auto max-w-[720px] font-serif"
          style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            lineHeight: 1.85,
            color: 'rgba(245,240,232,0.85)',
            marginBottom: '40px',
          }}
        >
          {blurb}
        </p>
        <div className="mx-auto mb-10 max-w-[900px]">
          <ImpactStats variant="compact" />
        </div>
        <Link
          to="/about"
          className="inline-block font-sans uppercase transition-colors hover:text-[#c9a96e]"
          style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(245,240,232,0.55)' }}
        >
          Read more →
        </Link>
      </div>
    </section>
  )
}
