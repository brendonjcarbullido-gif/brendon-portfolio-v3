import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: '#0a0a0a', color: '#f5f0e8' }}
    >
      <p className="font-bebas uppercase" style={{ fontSize: '14px', color: '#c9a96e', letterSpacing: '0.2em' }}>
        404
      </p>
      <h1 className="mt-4 font-serif italic" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
        Page not found
      </h1>
      <p className="mt-4 max-w-md font-sans" style={{ fontSize: '0.95rem', color: 'rgba(245,240,232,0.5)' }}>
        That route doesn&apos;t exist. Head back to the homepage or browse work.
      </p>
      <Link
        to="/"
        className="mt-10 border border-[#c9a96e] px-8 py-3 font-sans uppercase no-underline transition-colors hover:bg-[#c9a96e] hover:text-[#0a0a0a]"
        style={{ fontSize: '0.7rem', letterSpacing: '0.18em', color: '#f5f0e8' }}
      >
        Home
      </Link>
    </main>
  )
}
