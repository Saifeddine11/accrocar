import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

import { ACCROCAR_LANG_STORAGE_KEY } from '../lib/languageDetection'

const langs = [
  { code: 'fr', label: 'FR', flag: '🇫🇷', name: 'Français' },
  { code: 'en', label: 'EN', flag: '🇬🇧', name: 'English' },
  { code: 'es', label: 'ES', flag: '🇪🇸', name: 'Español' },
  { code: 'ro', label: 'RO', flag: '🇷🇴', name: 'Română' },
  { code: 'nl', label: 'NL', flag: '🇳🇱', name: 'Nederlands' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const current =
    langs.find((l) => l.code === i18n.resolvedLanguage) || langs[0]

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
                  onClick={() => {
                    void i18n.changeLanguage(l.code)
                    try {
                      localStorage.setItem(ACCROCAR_LANG_STORAGE_KEY, l.code)
                      localStorage.setItem('i18nextLng', l.code)
                    } catch {
                      /* ignore */
                    }
                    setOpen(false)
                  }}
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
