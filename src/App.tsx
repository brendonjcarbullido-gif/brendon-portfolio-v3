import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Nav } from '@/components/Nav'
import { GyroPermission } from '@/components/GyroPermission'
import { FaceTracker } from '@/three/FaceTracker'
import { Footer } from '@/sections/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'
import { PageTransition } from '@/components/PageTransition'
import { HomePage } from '@/pages/HomePage'
import { WorkPage } from '@/pages/WorkPage'
import { AboutPage } from '@/pages/AboutPage'
import { ContactPage } from '@/pages/ContactPage'
import { ResumePage } from '@/pages/ResumePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { CaseStudyPage } from '@/pages/CaseStudyPage'

function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
        <Route
          path="/work"
          element={
            <PageTransition>
              <WorkPage />
            </PageTransition>
          }
        />
        <Route
          path="/work/:slug"
          element={
            <PageTransition>
              <CaseStudyPage />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <AboutPage />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <ContactPage />
            </PageTransition>
          }
        />
        <Route
          path="/resume"
          element={
            <PageTransition>
              <ResumePage />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFoundPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />
      <GyroPermission />
      <FaceTracker />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  )
}
