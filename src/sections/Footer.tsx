import { motion } from 'framer-motion'

export function Footer() {
  return (
    <footer className="relative border-t border-[color:var(--rule)] bg-cream px-6 py-16 text-ink md:px-10 md:py-20">
      <div className="mx-auto max-w-[120rem]">
        <motion.a
          href="mailto:brendonjcarbullido@gmail.com"
          className="group block cursor-pointer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className="block font-serif text-[clamp(3.5rem,12vw,12rem)] font-light italic leading-[0.88] tracking-[-0.03em] text-ink transition-colors duration-500 group-hover:text-accent">
            brendonjcarbullido
            <span className="text-accent group-hover:text-ink">@</span>
            gmail
          </span>
          <span className="mt-4 block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-light">
            Get in touch ↗
          </span>
        </motion.a>

        <div className="mt-16 grid gap-8 border-t border-ink/15 pt-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-light">Studio</p>
            <p className="mt-3 font-serif text-[clamp(1.375rem,1.75vw,1.75rem)] font-light italic text-ink">
              Los Angeles, CA
            </p>
          </div>

          <nav className="md:col-span-4" aria-label="Footer navigation">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-light">Index</p>
            <ul className="mt-3 flex flex-col gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-ink">
              <li><a className="cursor-pointer transition-colors duration-300 hover:text-accent" href="/work">Work</a></li>
              <li><a className="cursor-pointer transition-colors duration-300 hover:text-accent" href="/about">About</a></li>
              <li><a className="cursor-pointer transition-colors duration-300 hover:text-accent" href="/resume">Résumé</a></li>
              <li><a className="cursor-pointer transition-colors duration-300 hover:text-accent" href="/contact">Contact</a></li>
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-light">Elsewhere</p>
            <ul className="mt-3 flex flex-col gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-ink">
              <li>
                <a
                  href="https://www.instagram.com/brendon.carbullido"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer transition-colors duration-300 hover:text-accent"
                >
                  Instagram ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/brendoncarbullido"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer transition-colors duration-300 hover:text-accent"
                >
                  LinkedIn ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink-light">
          <span>© 2026 Brendon Carbullido</span>
          <span>Art · Creative · Brand</span>
        </p>
      </div>
    </footer>
  )
}
