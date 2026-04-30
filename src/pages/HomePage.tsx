import { HeroMosaic } from '@/sections/HeroMosaic'
import { Marquee } from '@/sections/Marquee'
import { ProjectsRail } from '@/sections/ProjectsRail'
import { About } from '@/sections/About'
import { Process } from '@/sections/Process'
import { Expertise } from '@/sections/Expertise'
import { Contact } from '@/sections/Contact'
import { OrientationProvider } from '@/contexts/OrientationContext'
import { ExperienceToggle } from '@/components/ExperienceToggle'

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
        <ExperienceToggle />
      </>
    </OrientationProvider>
  )
}
