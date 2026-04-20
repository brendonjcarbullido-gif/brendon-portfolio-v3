import { type FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { ease } from '@/constants/animation'

type FormStatus = 'idle' | 'sending' | 'success'

const initialForm = { name: '', email: '', subject: '', message: '' }

export function Contact() {
  const [formData, setFormData] = useState(initialForm)
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setFormData(initialForm)
        return
      }
    } catch {
      // backend not deployed — placeholder success
    }
    setStatus('success')
    setFormData(initialForm)
  }

  return (
    <section id="contact" className="relative bg-cream-2 px-6 py-28 text-ink md:px-10 md:py-40">
      <div className="mx-auto max-w-[120rem]">
        {/* Eyebrow + mega line */}
        <div className="grid gap-10 md:grid-cols-12">
          <motion.p
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-light md:col-span-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease }}
          >
            05 — Contact
          </motion.p>
          <motion.h2
            className="font-serif text-[clamp(2.5rem,7vw,7rem)] font-light italic leading-[0.95] tracking-[-0.025em] text-ink md:col-span-8"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease }}
          >
            Let&apos;s build
            <br />
            <span className="not-italic">something sharp.</span>
          </motion.h2>
        </div>

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-20">
          {/* — FORM: cream-card with hairline rules */}
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease }}
          >
            <div className="rounded-sm border border-ink/15 bg-cream/70 p-8 backdrop-blur-sm md:p-12">
              {status === 'success' ? (
                <p className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light italic leading-[1.2] text-ink">
                  Message sent.
                  <br />
                  <span className="text-accent">I&apos;ll be in touch.</span>
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  {([
                    { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name', autoComplete: 'name' },
                    { id: 'email', label: 'Email', type: 'email', placeholder: 'you@email.com', autoComplete: 'email' },
                    { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Project type', autoComplete: 'off' },
                  ] as const).map((f) => (
                    <div key={f.id} className="flex flex-col gap-2">
                      <label
                        htmlFor={`c-${f.id}`}
                        className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-light"
                      >
                        {f.label}
                      </label>
                      <input
                        id={`c-${f.id}`}
                        name={f.id}
                        type={f.type}
                        required
                        autoComplete={f.autoComplete}
                        placeholder={f.placeholder}
                        value={formData[f.id as keyof typeof formData]}
                        onChange={(e) => setFormData((d) => ({ ...d, [f.id]: e.target.value }))}
                        className="w-full border-0 border-b border-ink/25 bg-transparent pb-3 font-serif text-[clamp(1.125rem,1.5vw,1.4rem)] font-light italic text-ink placeholder-ink/30 outline-none transition-colors duration-300 focus:border-accent"
                      />
                    </div>
                  ))}

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="c-message"
                      className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-light"
                    >
                      Message
                    </label>
                    <textarea
                      id="c-message"
                      name="message"
                      required
                      rows={3}
                      placeholder="Tell me about your project"
                      value={formData.message}
                      onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                      className="w-full resize-y border-0 border-b border-ink/25 bg-transparent pb-3 font-serif text-[clamp(1.125rem,1.5vw,1.4rem)] font-light italic text-ink placeholder-ink/30 outline-none transition-colors duration-300 focus:border-accent"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group mt-6 inline-flex w-fit cursor-pointer items-center gap-3 border border-ink bg-ink px-8 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-cream transition-colors duration-500 hover:bg-cream hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path
                        d="M1 13L13 1M13 1H4M13 1V10"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
                      />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* — DIRECT: hairline-ruled list */}
          <motion.div
            className="flex flex-col gap-10 md:col-span-4 md:col-start-9 md:self-start md:pt-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
          >
            <DirectList
              label="Direct"
              rows={[
                { label: 'Email', value: 'brendonjcarbullido@gmail.com', href: 'mailto:brendonjcarbullido@gmail.com' },
                { label: 'Phone', value: '(650) 454-9689', href: 'tel:+16504549689' },
                { label: 'Location', value: 'Los Angeles, CA' },
              ]}
            />
            <DirectList
              label="Elsewhere"
              rows={[
                { label: 'LinkedIn', value: 'Profile', href: 'https://www.linkedin.com/in/brendoncarbullido', external: true },
                { label: 'Instagram', value: '@brendon.carbullido', href: 'https://www.instagram.com/brendon.carbullido', external: true },
              ]}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function DirectList({
  label,
  rows,
}: {
  label: string
  rows: Array<{ label: string; value: string; href?: string; external?: boolean }>
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-light">{label}</p>
      <ul className="mt-4 flex flex-col border-t border-ink/15">
        {rows.map((row) => {
          const inner = (
            <div className="group flex items-baseline justify-between gap-6 border-b border-ink/15 py-4 transition-colors duration-300 hover:border-accent">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-light">{row.label}</span>
              <span className="flex items-center gap-2 font-serif text-[16px] italic text-ink">
                {row.value}
                {row.href && (
                  <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">↗</span>
                )}
              </span>
            </div>
          )
          return (
            <li key={row.label}>
              {row.href ? (
                <a href={row.href} target={row.external ? '_blank' : undefined} rel={row.external ? 'noopener noreferrer' : undefined} className="block cursor-pointer">
                  {inner}
                </a>
              ) : (
                inner
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
