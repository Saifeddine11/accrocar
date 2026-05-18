// ── Localized routing config ─────────────────────────────────────────────────
// Scheme: EN is the default language and has NO prefix.
// FR/ES/RO/NL are prefixed (/fr, /es, /ro, /nl) with translated path segments.
// Car ids and blog slugs are language-agnostic (single id/slug across languages).
// ─────────────────────────────────────────────────────────────────────────────

export const BASE_URL = 'https://accrocar.com'
export const LANGUAGES = ['en', 'fr', 'es', 'ro', 'nl']
export const DEFAULT_LANG = 'en'

// pageKey → URL segment per language (segment is the path after optional /{lang})
// '' === language home (root for that language)
export const ROUTE_SEGMENTS = {
  home:      { en: '',                  fr: '',                    es: '',                ro: '',                 nl: '' },
  fleet:     { en: 'fleet',             fr: 'flotte',              es: 'flota',           ro: 'flota',            nl: 'vloot' },
  carDetail: { en: 'fleet',             fr: 'flotte',              es: 'flota',           ro: 'flota',            nl: 'vloot' }, // + /:id
  vip:       { en: 'vip-services',      fr: 'services-vip',        es: 'servicios-vip',   ro: 'servicii-vip',     nl: 'vip-diensten' },
  chauffeur: { en: 'private-chauffeur', fr: 'chauffeur-prive',     es: 'chofer-privado',  ro: 'sofer-privat',     nl: 'privechauffeur' },
  weddings:  { en: 'weddings-events',   fr: 'mariages-evenements', es: 'bodas-eventos',   ro: 'nunti-evenimente', nl: 'bruiloften-evenementen' },
  about:     { en: 'about',             fr: 'a-propos',            es: 'sobre-nosotros',  ro: 'despre-noi',       nl: 'over-ons' },
  contact:   { en: 'contact',           fr: 'contact',             es: 'contacto',        ro: 'contact',          nl: 'contact' },
  blog:      { en: 'blog',              fr: 'blog',                es: 'blog',            ro: 'blog',             nl: 'blog' },
  blogPost:  { en: 'blog',              fr: 'blog',                es: 'blog',            ro: 'blog',             nl: 'blog' }, // + /:slug
}

// Page keys that take a dynamic trailing param
const DYNAMIC = { carDetail: 'id', blogPost: 'slug' }

export function isLang(seg) {
  return LANGUAGES.includes(seg)
}

export function langPrefix(lang) {
  return lang && lang !== DEFAULT_LANG ? `/${lang}` : ''
}

/**
 * Build an internal path for a pageKey in a language.
 * @param {string} pageKey
 * @param {string} lang
 * @param {{id?:string, slug?:string}} params
 */
export function localizePath(pageKey, lang = DEFAULT_LANG, params = {}) {
  const segMap = ROUTE_SEGMENTS[pageKey]
  if (!segMap) return langPrefix(lang) || '/'
  const seg = segMap[lang] ?? segMap[DEFAULT_LANG] ?? ''
  const prefix = langPrefix(lang)

  if (pageKey === 'home') return prefix || '/'

  let path = `${prefix}/${seg}`
  const dynKey = DYNAMIC[pageKey]
  if (dynKey && params[dynKey]) path += `/${params[dynKey]}`
  return path
}

export function fullUrl(pageKey, lang, params) {
  const p = localizePath(pageKey, lang, params)
  return `${BASE_URL}${p === '/' ? '/' : p}`
}

/** hreflang alternates map { en, fr, es, ro, nl } of absolute URLs */
export function alternatesFor(pageKey, params) {
  const out = {}
  for (const lang of LANGUAGES) out[lang] = fullUrl(pageKey, lang, params)
  return out
}

/**
 * Reverse-resolve a pathname → { lang, pageKey, params }.
 * pageKey is null for unmapped paths (landing pages, 404).
 */
export function resolvePath(pathname) {
  const clean = (pathname || '/').replace(/\/+$/, '') || '/'
  const parts = clean.split('/').filter(Boolean)

  let lang = DEFAULT_LANG
  let rest = parts
  // A leading non-default language code is a prefix
  if (parts[0] && isLang(parts[0]) && parts[0] !== DEFAULT_LANG) {
    lang = parts[0]
    rest = parts.slice(1)
  }

  if (rest.length === 0) return { lang, pageKey: 'home', params: {} }

  const segment = rest[0]
  for (const [key, segMap] of Object.entries(ROUTE_SEGMENTS)) {
    if (key === 'home' || key === 'carDetail' || key === 'blogPost') continue
    if (segMap[lang] === segment) {
      if (key === 'fleet' && rest[1]) return { lang, pageKey: 'carDetail', params: { id: rest[1] } }
      if (key === 'blog' && rest[1]) return { lang, pageKey: 'blogPost', params: { slug: rest[1] } }
      return { lang, pageKey: key, params: {} }
    }
  }
  return { lang, pageKey: null, params: {} }
}

/** All sitemap-eligible static page keys (no dynamic param) */
export const STATIC_PAGE_KEYS = ['home', 'fleet', 'vip', 'chauffeur', 'weddings', 'about', 'contact', 'blog']
