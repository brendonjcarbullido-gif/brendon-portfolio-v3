import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Nav } from '@/components/Nav'
import { Footer } from '@/sections/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'
import { Cursor } from '@/components/motion/Cursor'
import { IntroLoader } from '@/components/motion/IntroLoader'
import { RouteCurtain } from '@/components/motion/RouteCurtain'
import { HomePage } from '@/pages/HomePage'

const WorkPage = lazy(() => import('@/pages/WorkPage').then(m => ({ default: m.WorkPage })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })))
const ContactPage = lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })))
const ResumePage = lazy(() => import('@/pages/ResumePage').then(m => ({ default: m.ResumePage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })))
const CaseStudyPage = lazy(() => import('@/pages/CaseStudyPage').then(m => ({ default: m.CaseStudyPage })))

export default function App() {
  return (
    <BrowserRouter>
      <IntroLoader />
      <RouteCurtain />
      <Cursor />
      <ScrollToTop />
      <Nav />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  )
}
