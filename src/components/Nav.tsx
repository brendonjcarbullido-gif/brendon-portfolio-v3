import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/resume', label: 'Résumé' },
  { to: '/contact', label: 'Contact' },
] as const

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
          scrolled ? 'bg-cream/85 backdrop-blur-md' : 'bg-transparent'
        }`}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
      >
        <div className="mx-auto flex w-full max-w-[120rem] items-center justify-between px-6 py-5 md:px-10 md:py-6">
          <NavLink
            to="/"
            end
            className="flex items-center gap-3 font-serif text-[1.125rem] font-medium tracking-[0.02em] text-ink"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden />
            Brendon Carbullido
          </NavLink>

          <nav className="hidden md:block" aria-label="Primary">
            <ul className="flex items-center gap-10">
              {links.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `group relative font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                        isActive ? 'text-ink' : 'text-ink-light hover:text-ink'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span>{label}</span>
                        <span
                          className={`absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100 ${
                            isActive ? 'scale-x-100' : ''
                          }`}
                          aria-hidden
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="md:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="flex h-8 w-8 flex-col items-center justify-center gap-1.5">
              <span className={`block h-px w-5 bg-ink transition-transform duration-300 ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
              <span className={`block h-px w-5 bg-ink transition-transform duration-300 ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[50] bg-cream md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="flex h-full flex-col justify-center px-8">
              <ul className="flex flex-col gap-6">
                {links.map(({ to, label }, i) => (
                  <motion.li
                    key={to}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: 0.1 + i * 0.06 }}
                  >
                    <NavLink
                      to={to}
                      className="block font-serif text-[clamp(3rem,9vw,6rem)] font-light italic leading-none tracking-[-0.02em]"
                    >
                      {label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
