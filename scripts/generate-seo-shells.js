// Post-build localized SEO-shell generator.
// Runs AFTER `vite build`. For every fr/es/ro/nl route it writes a static
// <path>/index.html that is a byte-for-byte copy of dist/index.html with ONLY
// the <html lang="en"> attribute swapped to the route's language. This makes
// the pre-JS HTML lang attribute correct for non-rendering crawlers (Ahrefs
// "HTML lang vs hreflang mismatch"). EN keeps the unchanged root index.html.
//
// NOT prerender: React is never rendered; canonical/hreflang remain
// client-side (react-helmet-async), exactly as before.
//
// Usage: node scripts/generate-seo-shells.js

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

import { LANGUAGES, DEFAULT_LANG, STATIC_PAGE_KEYS, localizePath } from '../src/lib/routes.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DIST = resolve(ROOT, 'dist')

const { blogPosts } = await import('../src/data/blogPosts.js')
const { cars } = await import('../src/data/cars.js')

const indexPath = resolve(DIST, 'index.html')
if (!existsSync(indexPath)) {
  console.error('✗ dist/index.html not found — run `vite build` first.')
  process.exit(1)
}

const template = readFileSync(indexPath, 'utf-8')
const LANG_ANCHOR = '<html lang="en">'
if (!template.includes(LANG_ANCHOR)) {
  console.error(`✗ "${LANG_ANCHOR}" not found in dist/index.html — index.html template changed, aborting.`)
  process.exit(1)
}

const PREFIXED = LANGUAGES.filter((l) => l !== DEFAULT_LANG) // fr, es, ro, nl
const publishedPosts = blogPosts.filter((p) => p.published)  // same filter as generate-sitemap.js

// Same route enumeration the sitemap uses. Standalone FR landing pages are
// intentionally excluded (unmapped, no hreflang cluster, not Ahrefs-flagged).
const routes = [
  ...STATIC_PAGE_KEYS.map((key) => ({ key, params: {} })),
  ...cars.map((car) => ({ key: 'carDetail', params: { id: car.id } })),
  ...publishedPosts.map((post) => ({ key: 'blogPost', params: { slug: post.slug } })),
]

let count = 0
for (const lang of PREFIXED) {
  const html = template.replace(LANG_ANCHOR, `<html lang="${lang}">`) // single literal occurrence
  for (const { key, params } of routes) {
    const rel = localizePath(key, lang, params).replace(/^\/+/, '') // 'fr' | 'fr/blog' | 'fr/flotte/<id>'
    const dir = resolve(DIST, rel)
    mkdirSync(dir, { recursive: true })
    writeFileSync(resolve(dir, 'index.html'), html, 'utf-8')
    count++
  }
}

console.log(`✓ seo-shells — ${count} files (${PREFIXED.join(',')}) — only <html lang> changed`)
