import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { resume } from '@/data/resume'
import { AmbientAbout } from '@/components/ambient/AmbientAbout'
import { ImpactStats } from '@/components/resume/ImpactStats'
import { ExperienceTimeline } from '@/components/resume/ExperienceTimeline'
import { SkillsColumns } from '@/components/resume/SkillsColumns'
import { IndustryPills } from '@/components/resume/IndustryPills'
import { Process } from '@/sections/Process'
import { Expertise } from '@/sections/Expertise'

const gold = '#c9a96e'
const cream = '#f5f0e8'
const bg = '#0a0a0a'

const roles = [...resume.identity.roles]

function AboutRoleRotator() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        height: '1.6em',
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            color: gold,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.25rem, 3vw, 2rem)',
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
          }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export function AboutPage() {
  const edu = resume.education

  return (
    <main className="relative" style={{ backgroundColor: bg, color: cream }}>
      <AmbientAbout />
      <div className="relative z-10">
        <section className="px-6 pb-16 pt-28 text-center md:px-[60px] md:pb-24 md:pt-32">
          <p
            className="font-serif"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 300,
              color: cream,
              marginBottom: '12px',
            }}
          >
            {resume.identity.name}
          </p>
          <AboutRoleRotator />
        </section>

        <section className="mx-auto max-w-[720px] px-6 pb-20 md:px-[60px]">
          <p
            className="font-serif"
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
              lineHeight: 1.85,
              color: 'rgba(245,240,232,0.82)',
            }}
          >
            {resume.summary}
          </p>
        </section>

        <section className="mx-auto max-w-[1000px] px-6 pb-24 md:px-[60px]">
          <p
            className="mb-8 font-bebas uppercase"
            style={{ fontSize: '14px', color: gold, letterSpacing: '0.2em' }}
          >
            Impact
          </p>
          <ImpactStats />
        </section>

        <section className="mx-auto max-w-[900px] px-6 pb-24 md:px-[60px]">
          <p
            className="mb-10 font-bebas uppercase"
            style={{ fontSize: '14px', color: gold, letterSpacing: '0.2em' }}
          >
            Experience
          </p>
          <ExperienceTimeline />
        </section>

        <section className="mx-auto max-w-[1000px] px-6 pb-24 md:px-[60px]">
          <p
            className="mb-8 font-bebas uppercase"
            style={{ fontSize: '14px', color: gold, letterSpacing: '0.2em' }}
          >
            Core skills
          </p>
          <SkillsColumns />
        </section>

        <section className="mx-auto max-w-[1000px] px-6 pb-24 md:px-[60px]">
          <p
            className="mb-6 font-bebas uppercase"
            style={{ fontSize: '14px', color: gold, letterSpacing: '0.2em' }}
          >
            Industries
          </p>
          <IndustryPills />
        </section>

        <section className="mx-auto max-w-[720px] px-6 pb-24 md:px-[60px]">
          <p
            className="mb-6 font-bebas uppercase"
            style={{ fontSize: '14px', color: gold, letterSpacing: '0.2em' }}
          >
            Education
          </p>
          <div className="rounded-sm border border-[rgba(201,169,110,0.2)] bg-[#111] p-8">
            <p className="font-serif" style={{ fontSize: '1.35rem', color: cream }}>
              {edu.school}
            </p>
            <p className="mt-2 font-sans" style={{ color: 'rgba(245,240,232,0.65)' }}>
              {edu.degree} · {edu.focus}
            </p>
            <p className="mt-1 font-serif italic" style={{ color: gold }}>
              {edu.emphasis}
            </p>
            <p
              className="mt-4 font-mono uppercase"
              style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'rgba(245,240,232,0.35)' }}
            >
              {edu.years}
            </p>
          </div>
        </section>

        <Process />
        <Expertise />

        <section className="px-6 pb-32 pt-8 text-center md:px-[60px]">
          <Link
            to="/contact"
            className="inline-block font-serif italic transition-colors hover:text-[#c9a96e]"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: cream }}
          >
            Let&apos;s build something →
          </Link>
        </section>
      </div>
    </main>
  )
}
