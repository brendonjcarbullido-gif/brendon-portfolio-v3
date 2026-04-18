import { useState, useEffect, useRef, type CSSProperties } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const MENU_BG = '#1A1612'
const EASE_PANEL = [0.43, 0.13, 0.23, 0.96] as const

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => (typeof window !== 'undefined' ? window.innerWidth >= 768 : true),
  )
  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 768)
    handler()
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isDesktop
}

const navItems = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/resume', label: 'Résumé' },
] as const

const linkBase: CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 400,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(245,240,232,0.55)',
  fontFamily: 'DM Sans, sans-serif',
  textDecoration: 'none',
  transition: 'color 0.25s',
  cursor: 'pointer',
  paddingBottom: '2px',
  borderBottom: '1px solid transparent',
}

function DesktopLinks() {
  const isDesktop = useIsDesktop()
  if (!isDesktop) return null
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
      {navItems.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          style={({ isActive }) => ({
            ...linkBase,
            color: isActive ? '#F5F0E8' : 'rgba(245,240,232,0.55)',
            borderBottomColor: isActive ? '#c9a96e' : 'transparent',
          })}
        >
          {label}
        </NavLink>
      ))}
    </div>
  )
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const isDesktop = useIsDesktop()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (!open) {
      menuButtonRef.current?.focus()
      return
    }
    const id = window.requestAnimationFrame(() => {
      firstLinkRef.current?.focus()
    })
    return () => window.cancelAnimationFrame(id)
  }, [open])

  const panelTransition = isDesktop
    ? { duration: 0.4, ease: EASE_PANEL }
    : { type: 'spring' as const, stiffness: 300, damping: 30 }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 28px',
        }}
      >
        <NavLink
          to="/"
          end
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1rem',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#F5F0E8',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          BC
        </NavLink>

        <DesktopLinks />

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls="site-menu-panel"
          onClick={() => setOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            padding: '4px',
          }}
        >
          <span style={{ width: '24px', height: '1px', background: '#F5F0E8', display: 'block' }} />
          <span style={{ width: '24px', height: '1px', background: '#F5F0E8', display: 'block' }} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            {/* Desktop only: dim + blur; click closes */}
            <motion.button
              type="button"
              key="menu-backdrop"
              aria-hidden
              tabIndex={-1}
              className="pointer-events-auto fixed inset-0 z-[200] hidden cursor-default border-0 md:block"
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              key="menu-panel"
              id="site-menu-panel"
              role="dialog"
              aria-modal="true"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={panelTransition}
              className="fixed right-0 top-0 z-[201] flex h-screen w-full flex-col shadow-none md:w-[clamp(380px,28vw,440px)] md:shadow-[-20px_0_40px_rgba(0,0,0,0.4)]"
              style={{ backgroundColor: MENU_BG }}
            >
              <div className="relative flex h-full flex-col px-10 pb-10 pt-10 md:px-0 md:pb-10 md:pt-0">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mb-12 self-end md:absolute md:mb-0 md:right-10 md:top-10 md:z-10"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#F5F0E8',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                  }}
                >
                  ✕
                </button>

                <div className="flex min-h-0 flex-1 flex-col md:justify-center md:pl-12 md:pr-10 md:pt-10">
                  {navItems.map(({ to, label }, i) => (
                    <motion.div
                      key={to}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <NavLink
                        ref={i === 0 ? firstLinkRef : undefined}
                        to={to}
                        onClick={() => setOpen(false)}
                        style={({ isActive }) => ({
                          display: 'block',
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: '3rem',
                          fontWeight: 300,
                          color: isActive ? '#c9a96e' : '#F5F0E8',
                          letterSpacing: '-0.01em',
                          lineHeight: 1.35,
                          marginBottom: '8px',
                          textDecoration: 'none',
                          borderBottom: isActive ? '2px solid #c9a96e' : '2px solid transparent',
                          width: 'fit-content',
                          cursor: 'pointer',
                          transition: 'color 0.2s, border-color 0.2s',
                        })}
                      >
                        {label}
                      </NavLink>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto flex flex-col gap-4 md:pl-12 md:pr-10">
                  <a
                    href="https://www.instagram.com/brendon.carbullido"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: '0.7rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'rgba(245,240,232,0.4)',
                      fontFamily: 'DM Sans, sans-serif',
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Instagram ↗
                  </a>
                  <a
                    href="https://www.linkedin.com/in/brendoncarbullido"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: '0.7rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'rgba(245,240,232,0.4)',
                      fontFamily: 'DM Sans, sans-serif',
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
