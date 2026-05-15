/**
 * Best-effort default country (ISO 3166-1 alpha-2) for phone input.
 * Uses browser locale; falls back to MA for Accrocar's home market.
 */
export function guessDefaultCountry() {
  if (typeof navigator === 'undefined') return 'MA'

  const tags = [navigator.language, ...(navigator.languages || [])].filter(Boolean)

  for (const tag of tags) {
    const match = String(tag).match(/-([A-Za-z]{2})$/)
    if (match) {
      let region = match[1].toUpperCase()
      if (region === 'UK') region = 'GB'
      if (region.length === 2) return region
    }
  }

  const primary = String(navigator.language || 'en').slice(0, 2).toLowerCase()
  const fromLang = {
    fr: 'FR',
    es: 'ES',
    en: 'GB',
    ar: 'MA',
    ro: 'RO',
    de: 'DE',
    it: 'IT',
    pt: 'PT',
    nl: 'NL',
  }
  return fromLang[primary] || 'MA'
}
