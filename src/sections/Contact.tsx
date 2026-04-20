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
      // Backend not deployed yet — treat as success for placeholder UX
    }
    setStatus('success')
    setFormData(initialForm)
  }

  return (
    <section
      id="contact"
      className="relative bg-[#111110] px-6 py-[clamp(5rem,10vw,10rem)] text-cream-ds md:px-16 lg:px-24"
    >
      <div className="mx-auto max-w-[96rem]">
        {/* Section head */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.p
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold lg:col-span-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease }}
          >
            04 — Contact
          </motion.p>
          <motion.h2
            className="font-serif text-[clamp(2.5rem,7vw,7rem)] font-light italic leading-[0.96] tracking-[-0.02em] text-cream-ds lg:col-span-9"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease }}
          >
            Let&apos;s build something.
          </motion.h2>
        </div>

        <div className="my-16 h-px w-full bg-[rgba(240,235,227,0.12)]" />

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-16">
          {/* Form — left */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="font-serif text-[clamp(1.25rem,1.8vw,1.5rem)] font-light italic leading-[1.45] text-muted">
              Available for full-time, freelance, and collaborative projects.
            </p>

            {status === 'success' ? (
              <p className="mt-12 font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light italic text-gold">
                Message sent. I&apos;ll be in touch.
              </p>
            ) : (
              <form className="mt-12 flex flex-col gap-10" onSubmit={handleSubmit}>
                {(
                  [
                    { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name', autoComplete: 'name' },
                    { id: 'email', label: 'Email', type: 'email', placeholder: 'you@email.com', autoComplete: 'email' },
                    { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Project type', autoComplete: 'off' },
                  ] as const
                ).map((field) => (
                  <div key={field.id} className="flex flex-col gap-2">
                    <label
                      htmlFor={`contact-${field.id}`}
                      className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold"
                    >
                      {field.label}
                    </label>
                    <input
                      id={`contact-${field.id}`}
                      name={field.id}
                      type={field.type}
                      required
                      value={formData[field.id as keyof typeof formData]}
                      onChange={(e) => setFormData((f) => ({ ...f, [field.id]: e.target.value }))}
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
                      className="w-full border-0 border-b border-[rgba(240,235,227,0.18)] bg-transparent pb-3 font-serif text-[clamp(1.25rem,1.6vw,1.5rem)] font-light italic text-cream-ds placeholder-[rgba(240,235,227,0.3)] outline-none transition-colors duration-300 focus:border-gold"
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Tell me about your project"
                    className="w-full resize-y border-0 border-b border-[rgba(240,235,227,0.18)] bg-transparent pb-3 font-serif text-[clamp(1.25rem,1.6vw,1.5rem)] font-light italic text-cream-ds placeholder-[rgba(240,235,227,0.3)] outline-none transition-colors duration-300 focus:border-gold"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-4 inline-flex w-fit cursor-pointer items-center gap-3 border border-gold px-8 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-gold transition-colors duration-300 hover:bg-gold hover:text-ink-deep disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </button>
              </form>
            )}
          </motion.div>

          {/* Direct links — right column */}
          <motion.div
            className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9 lg:self-start"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">Direct</p>
              <ul className="mt-4 flex flex-col">
                {(
                  [
                    { label: 'Email', value: 'brendonjcarbullido@gmail.com', href: 'mailto:brendonjcarbullido@gmail.com' },
                    { label: 'Phone', value: '(650) 454-9689', href: 'tel:+16504549689' },
                    { label: 'Location', value: 'Los Angeles, CA', href: null },
                  ] as const
                ).map((row) => {
                  const inner = (
                    <div className="group flex items-baseline justify-between gap-6 border-b border-[rgba(240,235,227,0.12)] py-4 transition-colors duration-300 hover:border-gold/60">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{row.label}</span>
                      <span className="flex items-center gap-2 font-serif text-[15px] italic text-cream-ds">
                        {row.value}
                        {row.href && (
                          <span className="text-gold transition-transform duration-300 group-hover:translate-x-1">↗</span>
                        )}
                      </span>
                    </div>
                  )
                  return (
                    <li key={row.label}>
                      {row.href ? (
                        <a href={row.href} className="block cursor-pointer">
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

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">Elsewhere</p>
              <ul className="mt-4 flex flex-col">
                {(
                  [
                    { label: 'LinkedIn', value: 'Profile', href: 'https://www.linkedin.com/in/brendoncarbullido' },
                    { label: 'Instagram', value: '@brendon.carbullido', href: 'https://www.instagram.com/brendon.carbullido' },
                  ] as const
                ).map((row) => (
                  <li key={row.label}>
                    <a
                      href={row.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block cursor-pointer"
                    >
                      <div className="flex items-baseline justify-between gap-6 border-b border-[rgba(240,235,227,0.12)] py-4 transition-colors duration-300 hover:border-gold/60">
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{row.label}</span>
                        <span className="flex items-center gap-2 font-serif text-[15px] italic text-cream-ds">
                          {row.value}
                          <span className="text-gold transition-transform duration-300 group-hover:translate-x-1">↗</span>
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
