import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import fr from './locales/fr.json'
import es from './locales/es.json'
import ro from './locales/ro.json'
import nl from './locales/nl.json'

import {
  ACCROCAR_SUPPORTED_LANGS,
  convertDetectedLanguage,
  createAccrocarLocalStorageDetector,
  resolveAccrocarFallbackLng,
} from '../lib/languageDetection'

const languageDetector = new LanguageDetector()
languageDetector.addDetector(createAccrocarLocalStorageDetector())

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    load: 'languageOnly',
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      es: { translation: es },
      ro: { translation: ro },
      nl: { translation: nl },
    },
    supportedLngs: ACCROCAR_SUPPORTED_LANGS,
    nonExplicitSupportedLngs: true,
    /** Used when no supported match exists (e.g. browser only `de`) and for missing keys. */
    fallbackLng: resolveAccrocarFallbackLng(),
    detection: {
      /** Saved preference first, then browser — never `<html lang>` (static `en` would win). */
      order: ['accrocarLocalStorage', 'navigator'],
      caches: ['accrocarLocalStorage'],
      convertDetectedLanguage,
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })

export default i18n
