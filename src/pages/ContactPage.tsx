import { resume } from '@/data/resume'
import { AmbientContact } from '@/components/ambient/AmbientContact'

const gold = '#c9a96e'
const cream = '#f5f0e8'
const bg = '#0a0a0a'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm6-8.1a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z"
        fill="currentColor"
      />
      <path
        d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6A5.2 5.2 0 0 1 16.8 22H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm9.6 1.7H7.2a3.5 3.5 0 0 0-3.5 3.5v9.6a3.5 3.5 0 0 0 3.5 3.5h9.6a3.5 3.5 0 0 0 3.5-3.5V7.2a3.5 3.5 0 0 0-3.5-3.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6.5 9.2v10.3H3.2V9.2h3.3ZM4.9 4.1a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8ZM21 19.5h-3.3v-5c0-1.2 0-2.8-1.7-2.8-1.7 0-2 1.3-2 2.7v5.1h-3.3V9.2h3.2v1.4h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5v5.6Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function ContactPage() {
  const { email, phone, location, instagram, linkedin } = resume.identity
  const mapsQuery = encodeURIComponent(location)

  return (
    <main className="relative min-h-screen" style={{ backgroundColor: bg, color: cream }}>
      <AmbientContact />
      <div className="relative z-10 mx-auto max-w-[720px] px-6 pb-24 pt-28 md:px-[60px] md:pt-32">
        <h1
          className="font-serif italic"
          style={{
            fontSize: 'clamp(40px, 7vw, 72px)',
            lineHeight: 1.08,
            marginBottom: '1.5rem',
          }}
        >
          Let&apos;s work together
        </h1>
        <p
          className="font-serif"
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.8,
            color: 'rgba(245,240,232,0.75)',
            marginBottom: '2.5rem',
          }}
        >
          Multidisciplinary Art Director and Creative Strategist with 7+ years of full-ownership creative
          experience — conceiving, shooting, directing, editing, and deploying content across every medium.
        </p>

        <div className="mb-10 space-y-4">
          <a
            href={`mailto:${email}`}
            className="flex items-start gap-3 font-sans no-underline transition-colors hover:text-[#c9a96e]"
            style={{ fontSize: '0.95rem', color: cream }}
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#c9a96e]" aria-hidden />
            {email}
          </a>
          <a
            href={`tel:${phone.replace(/\D/g, '')}`}
            className="flex items-start gap-3 font-sans no-underline transition-colors hover:text-[#c9a96e]"
            style={{ fontSize: '0.95rem', color: cream }}
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#c9a96e]" aria-hidden />
            {phone}
          </a>
          <a
            href={`https://maps.google.com/?q=${mapsQuery}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-3 font-sans no-underline transition-colors hover:text-[#c9a96e]"
            style={{ fontSize: '0.95rem', color: cream }}
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#c9a96e]" aria-hidden />
            {location}
          </a>
        </div>

        <div className="mb-14 flex items-center gap-6 text-[#c9a96e]">
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[rgba(201,169,110,0.75)] transition-colors hover:text-[#c9a96e]"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[rgba(201,169,110,0.75)] transition-colors hover:text-[#c9a96e]"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
        </div>

        <div
          className="rounded-sm border border-[rgba(201,169,110,0.2)] bg-[#111] p-8"
          style={{ marginBottom: '2rem' }}
        >
          <p className="mb-6 font-bebas uppercase" style={{ fontSize: '12px', color: gold, letterSpacing: '0.2em' }}>
            Project inquiry
          </p>
          {/* TODO: wire to Resend API in Phase 6 deployment session */}
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <label className="flex flex-col gap-2 font-sans" style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.5)' }}>
              Name
              <input
                type="text"
                name="name"
                className="rounded-sm border border-[rgba(201,169,110,0.25)] bg-[#0a0a0a] px-3 py-2 text-[#f5f0e8]"
                autoComplete="name"
              />
            </label>
            <label className="flex flex-col gap-2 font-sans" style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.5)' }}>
              Email
              <input
                type="email"
                name="email"
                className="rounded-sm border border-[rgba(201,169,110,0.25)] bg-[#0a0a0a] px-3 py-2 text-[#f5f0e8]"
                autoComplete="email"
              />
            </label>
            <label className="flex flex-col gap-2 font-sans" style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.5)' }}>
              Project type
              <input
                type="text"
                name="projectType"
                className="rounded-sm border border-[rgba(201,169,110,0.25)] bg-[#0a0a0a] px-3 py-2 text-[#f5f0e8]"
              />
            </label>
            <label className="flex flex-col gap-2 font-sans" style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.5)' }}>
              Message
              <textarea
                name="message"
                rows={5}
                className="resize-y rounded-sm border border-[rgba(201,169,110,0.25)] bg-[#0a0a0a] px-3 py-2 text-[#f5f0e8]"
              />
            </label>
            <button
              type="submit"
              className="mt-2 border border-[#c9a96e] bg-transparent py-3 font-sans uppercase transition-colors hover:bg-[#c9a96e] hover:text-[#0a0a0a]"
              style={{ fontSize: '0.7rem', letterSpacing: '0.18em', color: cream }}
            >
              Send message
            </button>
          </form>
        </div>

        <p className="text-center font-sans" style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.4)' }}>
          Typically responds within 48 hours.
        </p>
      </div>
    </main>
  )
}
