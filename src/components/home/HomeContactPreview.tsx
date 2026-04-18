import { Link } from 'react-router-dom'
import { resume } from '@/data/resume'

const gold = '#c9a96e'
const cream = '#f5f0e8'
const bg = '#0a0a0a'

export function HomeContactPreview() {
  return (
    <section className="px-6 py-24 md:px-[60px] md:py-28" style={{ backgroundColor: bg, color: cream }}>
      <div className="mx-auto max-w-[720px] text-center">
        <p
          className="font-bebas uppercase"
          style={{ fontSize: '14px', color: gold, letterSpacing: '0.2em', marginBottom: '20px' }}
        >
          Contact
        </p>
        <p className="font-serif italic" style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: '28px' }}>
          Ready when you are.
        </p>
        <a
          href={`mailto:${resume.identity.email}`}
          className="font-bebas inline-block border border-[#c9a96e] px-8 py-4 text-[#f5f0e8] no-underline transition-colors hover:bg-[#c9a96e] hover:text-[#0a0a0a]"
          style={{ fontSize: '15px', letterSpacing: '0.08em' }}
        >
          {resume.identity.email}
        </a>
        <div className="mt-8">
          <Link
            to="/contact"
            className="font-sans uppercase transition-colors hover:text-[#c9a96e]"
            style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(245,240,232,0.55)' }}
          >
            Get in touch →
          </Link>
        </div>
      </div>
    </section>
  )
}
