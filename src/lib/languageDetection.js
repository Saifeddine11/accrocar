/** Supported UI languages (ISO 639-1). */
export const ACCROCAR_SUPPORTED_LANGS = ['en', 'fr', 'es', 'ro', 'nl']

/** Primary key for manual / auto language preference (i18next also mirrors to `i18nextLng`). */
export const ACCROCAR_LANG_STORAGE_KEY = 'accrocarLang'

const LEGACY_LANG_STORAGE_KEY = 'i18nextLng'

function collectNavigatorLanguageTags() {
  if (typeof navigator === 'undefined') return []
  const out = []
  if (navigator.language) out.push(navigator.language)
  if (Array.isArray(navigator.languages)) out.push(...navigator.languages)
  return out
}

function baseLanguage(tag) {
  if (!tag || typeof tag !== 'string') return ''
  return tag.split(/[-_]/)[0].toLowerCase()
}

/** True if any navigator preference resolves to a supported site language. */
export function navigatorListsSupportedLanguage() {
  return collectNavigatorLanguageTags().some((tag) =>
    ACCROCAR_SUPPORTED_LANGS.includes(baseLanguage(tag)),
  )
}

/** Read a previously saved supported language from localStorage (Accrocar + legacy i18next). */
export function readStoredAccrocarLanguage() {
  if (typeof localStorage === 'undefined') return null
  try {
    for (const key of [ACCROCAR_LANG_STORAGE_KEY, LEGACY_LANG_STORAGE_KEY]) {
      const raw = localStorage.getItem(key)
      if (!raw) continue
      const code = baseLanguage(raw)
      if (ACCROCAR_SUPPORTED_LANGS.includes(code)) return code
    }
  } catch {
    /* private mode / blocked storage */
  }
  return null
}

/**
 * When no supported language appears anywhere in navigator preferences,
 * choose French for Maghreb / Arabic / likely francophone contexts; otherwise English.
 */
export function fallbackLngWhenNavigatorUnsupported() {
  const tags = collectNavigatorLanguageTags()
  for (const tag of tags) {
    const parts = tag.split(/[-_]/)
    const base = parts[0]?.toLowerCase() || ''
    const region = (parts[1] || '').toUpperCase()
    const maghrebAndFrancophoneAfrica = [
      'MA',
      'DZ',
      'TN',
      'LY',
      'MR',
      'SN',
      'ML',
      'NE',
      'BF',
      'BJ',
      'TG',
      'CI',
      'CM',
      'MG',
      'CD',
    ]
    if (region && maghrebAndFrancophoneAfrica.includes(region)) return 'fr'
    if (base === 'ar') return 'fr'
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    if (
      /Casablanca|Rabat|Marrakech|Algiers|Tunis|Tripoli|Ndjamena|Bamako|Dakar|Ouagadougou|Niamey|Nouakchott/i.test(
        tz,
      )
    ) {
      return 'fr'
    }
  } catch {
    /* ignore */
  }
  return 'en'
}

/**
 * i18next `fallbackLng` when keys are missing, and the default resolved language when
 * the browser lists no supported locale (e.g. only `de`).
 */
export function resolveAccrocarFallbackLng() {
  const stored = readStoredAccrocarLanguage()
  if (stored) return 'en'
  if (navigatorListsSupportedLanguage()) return 'en'
  return fallbackLngWhenNavigatorUnsupported()
}

/**
 * Normalize BCP47 tags to base language; map Maghreb Arabic locales to French for the UI.
 * (Bare `ar` stays `ar` so `['ar','en']` can still resolve to English; pure `ar` uses fallback rules.)
 */
export function convertDetectedLanguage(lng) {
  if (!lng || typeof lng !== 'string') return lng
  const parts = lng.split(/[-_]/)
  const base = parts[0].toLowerCase()
  const region = (parts[1] || '').toUpperCase()
  if (base === 'ar' && ['MA', 'DZ', 'TN', 'LY', 'MR', 'SN'].includes(region)) return 'fr'
  return base
}

/** Custom detector: Accrocar key first, then legacy i18next key; caches both on change. */
export function createAccrocarLocalStorageDetector() {
  return {
    name: 'accrocarLocalStorage',
    lookup() {
      return readStoredAccrocarLanguage() || undefined
    },
    cacheUserLanguage(lng) {
      if (typeof localStorage === 'undefined') return
      try {
        localStorage.setItem(ACCROCAR_LANG_STORAGE_KEY, lng)
        localStorage.setItem(LEGACY_LANG_STORAGE_KEY, lng)
      } catch {
        /* ignore */
      }
    },
  }
}
