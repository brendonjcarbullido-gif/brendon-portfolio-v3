import { motion } from 'framer-motion'
import { ease } from '@/constants/animation'

export function Footer() {
  return (
    <footer className="relative border-t border-[rgba(240,235,227,0.1)] bg-ink-deep px-6 py-[clamp(4rem,8vw,8rem)] md:px-16 lg:px-24">
      <div className="mx-auto flex max-w-[96rem] flex-col gap-16">
        <motion.a
          href="mailto:brendonjcarbullido@gmail.com"
          className="group inline-block cursor-pointer self-start"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease }}
        >
          <span className="font-serif text-[clamp(3rem,10vw,10rem)] font-light italic leading-[0.9] tracking-[-0.02em] text-cream-ds">
            brendonjcarbullido
            <span className="text-gold">@</span>
            gmail.com
          </span>
          <span className="mt-4 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors duration-300 group-hover:text-gold">
            Get in touch ↗
          </span>
        </motion.a>

        <div className="grid gap-8 border-t border-[rgba(240,235,227,0.1)] pt-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Studio</p>
            <p className="mt-3 font-serif text-[clamp(1.5rem,2vw,1.75rem)] font-light italic text-cream-ds">
              Los Angeles, CA
            </p>
          </div>

          <nav className="lg:col-span-5" aria-label="Footer">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Elsewhere</p>
            <ul className="mt-3 flex flex-col gap-2 font-mono text-[12px] uppercase tracking-[0.14em]">
              <li>
                <a
                  href="https://www.instagram.com/brendon.carbullido"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block cursor-pointer text-cream-ds transition-colors duration-300 hover:text-gold"
                >
                  Instagram ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/brendoncarbullido"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block cursor-pointer text-cream-ds transition-colors duration-300 hover:text-gold"
                >
                  LinkedIn ↗
                </a>
              </li>
            </ul>
          </nav>

          <p className="lg:col-span-3 lg:text-right font-mono text-[10px] uppercase tracking-[0.16em] text-muted self-end">
            © 2026 Brendon Carbullido
            <br className="hidden lg:inline" />
            <span className="lg:hidden"> · </span>Art · Creative · Brand
          </p>
        </div>
      </div>
    </footer>
  )
}
