import { HeroScene } from '@/three/HeroScene'
import { Marquee } from '@/sections/Marquee'
import { WorkGrid } from '@/sections/WorkGrid'
import { About } from '@/sections/About'
import { Process } from '@/sections/Process'
import { Expertise } from '@/sections/Expertise'
import { Contact } from '@/sections/Contact'
import { SpiralIntro } from '@/components/SpiralIntro'

export function HomePage() {
  return (
    <main>
      <SpiralIntro />
      <section style={{ cursor: 'none' }}>
        <HeroScene />
      </section>
      <Marquee />
      <WorkGrid />
      <About />
      <Process />
      <Expertise />
      <Contact />
    </main>
  )
}
