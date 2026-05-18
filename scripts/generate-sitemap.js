// ES-module sitemap generator — run before vite build
// Emits every page in every language with translated slugs and reciprocal
// hreflang alternates. All URLs are non-www, no trailing slash (except root),
// matching Seo.jsx canonical + the .htaccess canonical target.
// Usage: node scripts/generate-sitemap.js

import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

import {
  LANGUAGES,
  DEFAULT_LANG,
  fullUrl,
  alternatesFor,
} from '../src/lib/routes.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const { blogPosts } = await import('../src/data/blogPosts.js')
const { cars } = await import('../src/data/cars.js')

const TODAY = new Date().toISOString().split('T')[0]

// pageKey → { priority, changefreq }
const STATIC_PAGES = [
  { key: 'home',      priority: '1.0', changefreq: 'weekly'  },
  { key: 'fleet',     priority: '0.9', changefreq: 'weekly'  },
  { key: 'vip',       priority: '0.8', changefreq: 'monthly' },
  { key: 'chauffeur', priority: '0.8', changefreq: 'monthly' },
  { key: 'weddings',  priority: '0.7', changefreq: 'monthly' },
  { key: 'about',     priority: '0.6', changefreq: 'monthly' },
  { key: 'contact',   priority: '0.6', changefreq: 'monthly' },
  { key: 'blog',      priority: '0.8', changefreq: 'weekly'  },
]

const publishedPosts = blogPosts.filter((p) => p.published)

/**
 * Build the <url> entries for one page across all languages, each entry
 * carrying the full reciprocal hreflang cluster (xhtml:link).
 */
function entriesForPage(pageKey, params, priority, changefreq, lastmod) {
  const alternates = alternatesFor(pageKey, params)
  const xhtml = [
    ...LANGUAGES.map(
      (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${alternates[l]}"/>`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${alternates[DEFAULT_LANG]}"/>`,
  ].join('\n')

  return LANGUAGES.map((lang) => {
    const loc = fullUrl(pageKey, lang, params)
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastmod || TODAY}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      xhtml,
      '  </url>',
    ].join('\n')
  })
}

const entries = []

// Static pages × langs
for (const { key, priority, changefreq } of STATIC_PAGES) {
  entries.push(...entriesForPage(key, {}, priority, changefreq, TODAY))
}

// Car detail × cars × langs
for (const car of cars) {
  entries.push(...entriesForPage('carDetail', { id: car.id }, '0.7', 'monthly', TODAY))
}

// Blog posts × langs
for (const post of publishedPosts) {
  entries.push(
    ...entriesForPage('blogPost', { slug: post.slug }, '0.8', 'monthly', post.updatedAt || post.date),
  )
}

// Standalone single-language French SEO landing pages (no alternates)
const LANDING = [
  { loc: 'https://accrocar.com/location-voiture-luxe-marrakech', priority: '0.9' },
  { loc: 'https://accrocar.com/location-porsche-cayenne-marrakech', priority: '0.8' },
]
for (const { loc, priority } of LANDING) {
  entries.push(
    [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${TODAY}</lastmod>`,
      '    <changefreq>monthly</changefreq>',
      `    <priority>${priority}</priority>`,
      '  </url>',
    ].join('\n'),
  )
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...entries,
  '</urlset>',
].join('\n')

const outPath = resolve(ROOT, 'public/sitemap.xml')
writeFileSync(outPath, xml, 'utf-8')
console.log(`✓ sitemap.xml — ${entries.length} URLs (${LANGUAGES.length} langs) → ${outPath}`)
