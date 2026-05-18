import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

import i18next from './i18n'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import ScrollToTop from './components/ScrollToTop'
import { LANGUAGES, localizePath, resolvePath } from './lib/routes'

const Home = lazy(() => import('./pages/Home'))
const Fleet = lazy(() => import('./pages/Fleet'))
const CarDetail = lazy(() => import('./pages/CarDetail'))
const VIPServices = lazy(() => import('./pages/VIPServices'))
const PrivateChauffeur = lazy(() => import('./pages/PrivateChauffeur'))
const Weddings = lazy(() => import('./pages/Weddings'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const LocationVoitureLuxeMarrakech = lazy(() => import('./pages/LocationVoitureLuxeMarrakech'))
const LocationPorscheCayenneMarrakech = lazy(() => import('./pages/LocationPorscheCayenneMarrakech'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const NotFound = lazy(() => import('./pages/NotFound'))

// pageKey → component. Dynamic pages carry a trailing param placeholder.
const PAGE_COMPONENTS = {
  home: Home,
  fleet: Fleet,
  carDetail: CarDetail,
  vip: VIPServices,
  chauffeur: PrivateChauffeur,
  weddings: Weddings,
  about: About,
  contact: Contact,
  blog: Blog,
  blogPost: BlogPost,
}

// Generate the full localized route table once.
function buildRoutes() {
  const routes = []
  for (const lang of LANGUAGES) {
    routes.push({ path: localizePath('home', lang), Cmp: Home })
    routes.push({ path: localizePath('fleet', lang), Cmp: Fleet })
    routes.push({ path: localizePath('carDetail', lang, { id: ':id' }), Cmp: CarDetail })
    routes.push({ path: localizePath('vip', lang), Cmp: VIPServices })
    routes.push({ path: localizePath('chauffeur', lang), Cmp: PrivateChauffeur })
    routes.push({ path: localizePath('weddings', lang), Cmp: Weddings })
    routes.push({ path: localizePath('about', lang), Cmp: About })
    routes.push({ path: localizePath('contact', lang), Cmp: Contact })
    routes.push({ path: localizePath('blog', lang), Cmp: Blog })
    routes.push({ path: localizePath('blogPost', lang, { slug: ':slug' }), Cmp: BlogPost })
  }
  // De-duplicate (contact slug is identical across en/fr/ro → same path)
  const seen = new Set()
  return routes.filter((r) => {
    if (seen.has(r.path)) return false
    seen.add(r.path)
    return true
  })
}

const LOCALIZED_ROUTES = buildRoutes()

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="eyebrow">{i18next.t('common.loading')}</span>
    </div>
  )
}

// URL is the single source of truth for language.
function LanguageSync() {
  const { pathname } = useLocation()
  const { i18n } = useTranslation()
  useEffect(() => {
    const { lang } = resolvePath(pathname)
    if (i18n.resolvedLanguage !== lang) i18n.changeLanguage(lang)
  }, [pathname, i18n])
  return null
}

function HtmlLangHelmet() {
  // <html lang> is derived from the URL (deterministic for crawlers),
  // not from async i18n state.
  const { pathname } = useLocation()
  const { lang } = resolvePath(pathname)
  return <Helmet htmlAttributes={{ lang }} />
}

export default function App() {
  const location = useLocation()

  return (
    <SmoothScroll>
      <LanguageSync />
      <HtmlLangHelmet />
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<PageFallback />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {LOCALIZED_ROUTES.map(({ path, Cmp }) => (
              <Route key={path} path={path} element={<Cmp />} />
            ))}

            {/* Standalone French SEO landing pages (single-language, self-canonical) */}
            <Route path="/location-voiture-luxe-marrakech" element={<LocationVoitureLuxeMarrakech />} />
            <Route path="/location-porsche-cayenne-marrakech" element={<LocationPorscheCayenneMarrakech />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
    </SmoothScroll>
  )
}

export { PAGE_COMPONENTS }
