import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import { whatsappDisplayNumber } from '../lib/whatsapp'
import { localizePath, resolvePath } from '../lib/routes'
import { useLang } from '../lib/useLang'

const easeExpo = [0.16, 1, 0.3, 1]

export default function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const lang = useLang()
  const items = [
    { to: localizePath('fleet', lang), label: t('nav.fleet') },
    { to: localizePath('vip', lang), label: t('nav.vip') },
    { to: localizePath('chauffeur', lang), label: t('nav.chauffeur') },
    { to: localizePath('weddings', lang), label: t('nav.weddings') },
    { to: localizePath('about', lang), label: t('nav.about') },
    { to: localizePath('contact', lang), label: t('nav.contact') },
  ]
  const homePath = localizePath('home', lang)
  const contactPath = localizePath('contact', lang)

  // Pages that begin with a fullscreen image-hero — keep the bar transparent at the top.
  const { pageKey } = resolvePath(location.pathname)
  const onImageHero =
    pageKey === 'home' ||
    pageKey === 'chauffeur' ||
    pageKey === 'weddings' ||
    pageKey === 'carDetail'

  const transparent = onImageHero && !scrolled && !open

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: easeExpo, delay: 0.1 }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          transparent
            ? 'bg-transparent text-pearl'
            : 'bg-pearl/90 backdrop-blur-md border-b border-obsidian/8 text-obsidian'
        } ${open ? 'bg-pearl text-obsidian' : ''}`}
      >
        <div className="container-editorial flex items-center justify-between h-16 md:h-20">
          <Link to={homePath} className="group flex shrink-0 items-center">
            <img
              src="/logo.png"
              alt="Accrocar logo"
              width={3750}
              height={938}
              className="h-auto max-h-9 w-auto max-w-[142px] object-contain transition-opacity duration-500 group-hover:opacity-80 md:max-h-[42px] md:max-w-[168px]"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-9">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) =>
                  `link-reveal opacity-85 hover:opacity-100 transition-opacity duration-500 ${
                    isActive ? 'text-crimson opacity-100' : ''
                  }`
                }
              >
                {it.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            <LanguageSwitcher />
            <Link
              to={contactPath}
              className={`hidden md:inline-flex btn-luxe py-2.5 px-5 text-[10.5px] ${
                transparent
                  ? 'border border-pearl/35 text-pearl hover:border-crimson hover:bg-crimson hover:text-pearl'
                  : 'border border-sand text-obsidian hover:border-sand hover:bg-sand/15 hover:text-crimson'
              }`}
            >
              {t('nav.book')}
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden relative h-9 w-9 flex flex-col justify-center items-end gap-[6px]"
            >
              <span
                className={`block h-px bg-current transition-all duration-500 ${
                  open ? 'w-6 translate-y-[3.5px] rotate-45' : 'w-6'
                }`}
              />
              <span
                className={`block h-px bg-current transition-all duration-500 ${
                  open ? 'w-6 -translate-y-[3.5px] -rotate-45' : 'w-4'
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: easeExpo }}
            className="fixed inset-0 z-40 bg-pearl text-obsidian"
          >
            <div className="container-editorial pt-32 md:pt-40">
              <ul className="space-y-2">
                {items.map((it, i) => (
                  <motion.li
                    key={it.to}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.1 + i * 0.06,
                      ease: easeExpo,
                    }}
                  >
                    <Link
                      to={it.to}
                      className="block font-serif text-5xl md:text-7xl tracking-tight py-2 hover:italic hover:text-crimson transition-all"
                    >
                      {it.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-16 pt-8 border-t border-sand/60 flex items-center justify-between text-sand text-[11px] tracking-luxe uppercase"
              >
                <span>Marrakech, Morocco</span>
                <span>{whatsappDisplayNumber()}</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
