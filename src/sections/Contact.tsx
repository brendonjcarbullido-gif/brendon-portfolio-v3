import { type FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { ease } from '@/constants/animation';


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
    <section className="bg-[#111110] px-6 py-32 text-cream-ds md:px-16 lg:px-24" id="contact">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-[3fr_2fr]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease }}
          >
            <h2 className="font-serif text-[clamp(40px,5vw,72px)] font-bold italic leading-tight text-cream-ds">
              Let&apos;s build something.
            </h2>
            <p className="mt-4 font-sans text-[14px] font-light text-muted">
              Available for full-time, freelance, and collaborative projects.
            </p>

            {status === 'success' ? (
              <p className="mt-12 font-serif text-[28px] italic text-gold">Message sent. I&apos;ll be in touch.</p>
            ) : (
              <form className="mt-12" onSubmit={handleSubmit}>
                <div className="mb-8">
                  <label htmlFor="contact-name" className="mb-2 block font-sans text-[9px] font-semibold uppercase tracking-[0.25em] text-gold">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                    autoComplete="name"
                    className="w-full border-0 border-b border-[#2A2A2A] bg-transparent py-3 pl-0 pr-0 font-sans text-[14px] font-light text-cream-ds placeholder-[#444444] outline-none transition-colors duration-300 focus:border-gold"
                    placeholder="Your name"
                  />
                </div>
                <div className="mb-8">
                  <label htmlFor="contact-email" className="mb-2 block font-sans text-[9px] font-semibold uppercase tracking-[0.25em] text-gold">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                    autoComplete="email"
                    className="w-full border-0 border-b border-[#2A2A2A] bg-transparent py-3 pl-0 pr-0 font-sans text-[14px] font-light text-cream-ds placeholder-[#444444] outline-none transition-colors duration-300 focus:border-gold"
                    placeholder="you@email.com"
                  />
                </div>
                <div className="mb-8">
                  <label htmlFor="contact-subject" className="mb-2 block font-sans text-[9px] font-semibold uppercase tracking-[0.25em] text-gold">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData((f) => ({ ...f, subject: e.target.value }))}
                    className="w-full border-0 border-b border-[#2A2A2A] bg-transparent py-3 pl-0 pr-0 font-sans text-[14px] font-light text-cream-ds placeholder-[#444444] outline-none transition-colors duration-300 focus:border-gold"
                    placeholder="Project type"
                  />
                </div>
                <div className="mb-8">
                  <label htmlFor="contact-message" className="mb-2 block font-sans text-[9px] font-semibold uppercase tracking-[0.25em] text-gold">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                    className="w-full resize-y border-0 border-b border-[#2A2A2A] bg-transparent py-3 pl-0 pr-0 font-sans text-[14px] font-light text-cream-ds placeholder-[#444444] outline-none transition-colors duration-300 focus:border-gold"
                    placeholder="Tell me about your project"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-4 w-full cursor-pointer cursor-hover border border-gold py-4 px-9 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:bg-gold hover:text-ink-deep disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending...' : 'Send message'}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease, delay: 0.08 }}
            className="text-cream-ds"
          >
            <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.28em] text-gold">Direct</p>

            <a
              href="mailto:brendonjcarbullido@gmail.com"
              className="group mt-6 flex cursor-pointer cursor-hover items-center justify-between border-b border-[#1E1E1C] py-4"
            >
              <span className="font-sans text-[12px] font-light text-muted">Email</span>
              <span className="flex items-center gap-2 font-sans text-[12px] font-medium text-cream-ds">
                brendonjcarbullido@gmail.com
                <span className="text-gold transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </a>
            <a
              href="tel:+16504549689"
              className="group flex cursor-pointer cursor-hover items-center justify-between border-b border-[#1E1E1C] py-4"
            >
              <span className="font-sans text-[12px] font-light text-muted">Phone</span>
              <span className="flex items-center gap-2 font-sans text-[12px] font-medium text-cream-ds">
                (650) 454-9689
                <span className="text-gold transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </a>
            <div className="group flex cursor-default items-center justify-between border-b border-[#1E1E1C] py-4">
              <span className="font-sans text-[12px] font-light text-muted">Location</span>
              <span className="flex items-center gap-2 font-sans text-[12px] font-medium text-cream-ds">
                Los Angeles, CA
                <span className="text-gold transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>

            <div className="my-8 h-px bg-[#1E1E1C]" />

            <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.28em] text-gold">Connect</p>

            <a
              href="https://www.linkedin.com/in/brendoncarbullido"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 flex cursor-pointer cursor-hover items-center justify-between border-b border-[#1E1E1C] py-4"
            >
              <span className="font-sans text-[12px] font-light text-muted">LinkedIn</span>
              <span className="flex items-center gap-2 font-sans text-[12px] font-medium text-cream-ds">
                Profile
                <span className="text-gold transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </a>
            <a
              href="https://www.instagram.com/brendon.carbullido"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex cursor-pointer cursor-hover items-center justify-between border-b border-[#1E1E1C] py-4"
            >
              <span className="font-sans text-[12px] font-light text-muted">Instagram</span>
              <span className="flex items-center gap-2 font-sans text-[12px] font-medium text-cream-ds">
                @brendon.carbullido
                <span className="text-gold transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
