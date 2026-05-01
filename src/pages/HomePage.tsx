import { HeroMosaic } from '@/sections/HeroMosaic'
import { Marquee } from '@/sections/Marquee'
import { ProjectsRail } from '@/sections/ProjectsRail'
import { About } from '@/sections/About'
import { Process } from '@/sections/Process'
import { Expertise } from '@/sections/Expertise'
import { Contact } from '@/sections/Contact'
import { OrientationProvider } from '@/contexts/OrientationContext'
import { ExperienceToggle } from '@/components/ExperienceToggle'
import { RecenterButton } from '@/components/RecenterButton'

export function HomePage() {
  return (
    <OrientationProvider>
      <>
        <main className="relative">
          <HeroMosaic />
          <Marquee />
          <ProjectsRail />
          <About />
          <Process />
          <Expertise />
          <Contact />
        </main>
        <div
          className="fixed z-30 md:hidden flex items-center gap-3"
          style={{
            right: '16px',
            bottom: 'calc(16px + env(safe-area-inset-bottom))',
            pointerEvents: 'none',
          }}
        >
          <RecenterButton />
          <ExperienceToggle />
        </div>
      </>
    </OrientationProvider>
  )
}
