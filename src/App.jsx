import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

import i18next from './i18n'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import ScrollToTop from './components/ScrollToTop'

const Home = lazy(() => import('./pages/Home'))
const Fleet = lazy(() => import('./pages/Fleet'))
const CarDetail = lazy(() => import('./pages/CarDetail'))
const VIPServices = lazy(() => import('./pages/VIPServices'))
const PrivateChauffeur = lazy(() => import('./pages/PrivateChauffeur'))
const Weddings = lazy(() => import('./pages/Weddings'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const LocationVoitureLuxeMarrakech = lazy(() => import('./pages/LocationVoitureLuxeMarrakech'))

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="eyebrow">
        {i18next.t('common.loading')}
      </span>
    </div>
  )
}

function HtmlLangHelmet() {
  const { i18n } = useTranslation()
  const lang = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0]
  return <Helmet htmlAttributes={{ lang }} />
}

export default function App() {
  const location = useLocation()

  return (
    <SmoothScroll>
      <HtmlLangHelmet />
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<PageFallback />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/fleet/:id" element={<CarDetail />} />
            <Route path="/vip-services" element={<VIPServices />} />
            <Route path="/private-chauffeur" element={<PrivateChauffeur />} />
            <Route path="/weddings-events" element={<Weddings />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/location-voiture-luxe-marrakech" element={<LocationVoitureLuxeMarrakech />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
    </SmoothScroll>
  )
}
