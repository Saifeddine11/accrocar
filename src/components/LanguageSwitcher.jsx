import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import { ACCROCAR_LANG_STORAGE_KEY } from '../lib/languageDetection'
import { resolvePath, localizePath } from '../lib/routes'

const langs = [
  { code: 'fr', label: 'FR', flag: '🇫🇷', name: 'Français' },
  { code: 'en', label: 'EN', flag: '🇬🇧', name: 'English' },
  { code: 'es', label: 'ES', flag: '🇪🇸', name: 'Español' },
  { code: 'ro', label: 'RO', flag: '🇷🇴', name: 'Română' },
  { code: 'nl', label: 'NL', flag: '🇳🇱', name: 'Nederlands' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const { pageKey, params } = resolvePath(location.pathname)

  const switchTo = (code) => {
    void i18n.changeLanguage(code)
    try {
      localStorage.setItem(ACCROCAR_LANG_STORAGE_KEY, code)
      localStorage.setItem('i18nextLng', code)
    } catch {
      /* ignore */
    }
    // Navigate to the equivalent page in the target language. Unmapped pages
    // (single-language landing pages / 404) go to that language's home.
    const dest = pageKey ? localizePath(pageKey, code, params) : localizePath('home', code)
    navigate(dest)
    setOpen(false)
  }

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const urlLang = resolvePath(location.pathname).lang
  const current = langs.find((l) => l.code === urlLang) || langs[0]

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 text-[11px] tracking-luxe uppercase opacity-85 transition-colors duration-500 hover:text-crimson hover:opacity-100"
        aria-label={`Change language, current language ${current.name}`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-[13px] leading-none" aria-hidden="true">
          {current.flag}
        </span>
        <span>{current.label}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="Select language"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-3 min-w-[8.5rem] bg-pearl text-obsidian border border-sand/50 shadow-[0_8px_30px_rgba(22,22,22,0.06)] py-2"
          >
            {langs.map((l) => (
              <li key={l.code}>
                <button
                  role="option"
                  aria-selected={l.code === current.code}
                  onClick={() => switchTo(l.code)}
                  className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-[11px] tracking-luxe uppercase transition-colors duration-300 hover:bg-sand/10 ${
                    l.code === current.code
                      ? 'text-crimson'
                      : 'text-obsidian hover:text-crimson'
                  }`}
                >
                  <span className="text-[13px] leading-none" aria-hidden="true">
                    {l.flag}
                  </span>
                  <span>{l.label}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
