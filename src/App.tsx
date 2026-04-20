import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Nav } from '@/components/Nav'
import { Footer } from '@/sections/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'
import { Cursor } from '@/components/motion/Cursor'
import { IntroLoader } from '@/components/motion/IntroLoader'
import { RouteCurtain } from '@/components/motion/RouteCurtain'
import { HomePage } from '@/pages/HomePage'
import { WorkPage } from '@/pages/WorkPage'
import { AboutPage } from '@/pages/AboutPage'
import { ContactPage } from '@/pages/ContactPage'
import { ResumePage } from '@/pages/ResumePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { CaseStudyPage } from '@/pages/CaseStudyPage'

export default function App() {
  return (
    <BrowserRouter>
      <IntroLoader />
      <RouteCurtain />
      <Cursor />
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:slug" element={<CaseStudyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
