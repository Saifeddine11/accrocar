// SEO validator — run after build.
//   npm run validate:seo                  (static + live, host = https://accrocar.com)
//   SEO_HOST=http://localhost:4173 npm run validate:seo
//   npm run validate:seo -- --no-live      (static only)
//
// Static checks (always):
//   - every <loc> is non-www, https, no query, no ?lng=
//   - no trailing slash except the exact domain root
//   - no duplicate <loc>
//   - every multilingual page carries a full reciprocal hreflang cluster
//     (5 langs + x-default) and every alternate href is itself a <loc>
//
// Live checks (unless --no-live, and only if the host is reachable):
//   - each unique <loc> returns 200 with NO redirect hop
//   NOTE: canonical/hreflang are injected client-side (react-helmet-async),
//   so DOM-level canonical parity requires a JS-rendering crawler and is
//   asserted structurally from the sitemap here, not by scraping static HTML.

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const args = process.argv.slice(2)
const NO_LIVE = args.includes('--no-live')
const HOST = process.env.SEO_HOST || 'https://accrocar.com'

const c = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
}

const errors = []
const warnings = []

const xml = readFileSync(resolve(ROOT, 'public/sitemap.xml'), 'utf-8')

// Parse <url> blocks
const urlBlocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1])
const locs = []
for (const block of urlBlocks) {
  const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1]
  if (!loc) continue
  const alts = [...block.matchAll(/<xhtml:link\s+rel="alternate"\s+hreflang="(.*?)"\s+href="(.*?)"\/>/g)].map(
    (m) => ({ lang: m[1], href: m[2] }),
  )
  locs.push({ loc, alts })
}

console.log(c.bold(`\n── SEO Validator ──────────────────────────────────────────────`))
console.log(`Sitemap URLs: ${locs.length}   Host: ${HOST}   Live: ${NO_LIVE ? 'off' : 'on'}\n`)

const ROOT_URL = 'https://accrocar.com/'
const allLocSet = new Set(locs.map((l) => l.loc))

// ── Static checks ────────────────────────────────────────────────────────────
const seen = new Set()
for (const { loc, alts } of locs) {
  if (/:\/\/www\./.test(loc)) errors.push(`www host in <loc>: ${loc}`)
  if (!loc.startsWith('https://')) errors.push(`non-https <loc>: ${loc}`)
  if (loc.includes('?')) errors.push(`query string in <loc>: ${loc}`)
  if (/[?&]lng=/.test(loc)) errors.push(`?lng= in <loc>: ${loc}`)
  if (loc !== ROOT_URL && loc.endsWith('/')) errors.push(`trailing slash in <loc>: ${loc}`)
  if (seen.has(loc)) errors.push(`duplicate <loc>: ${loc}`)
  seen.add(loc)

  // Multilingual pages must have a full reciprocal hreflang cluster
  if (alts.length > 0) {
    const langs = alts.map((a) => a.lang)
    for (const need of ['en', 'fr', 'es', 'ro', 'nl', 'x-default']) {
      if (!langs.includes(need)) errors.push(`missing hreflang "${need}" for ${loc}`)
    }
    for (const a of alts) {
      if (a.lang === 'x-default') continue
      if (!allLocSet.has(a.href)) {
        errors.push(`hreflang ${a.lang} → ${a.href} is not present as its own <loc> (non-reciprocal)`)
      }
    }
    // The page's own loc must be one of its alternates
    if (!alts.some((a) => a.href === loc)) {
      errors.push(`<loc> ${loc} not listed among its own hreflang alternates`)
    }
  }
}

console.log(
  errors.length === 0
    ? c.green('✓ Static checks passed')
    : c.red(`✗ Static checks: ${errors.length} error(s)`),
)

// ── Live checks ──────────────────────────────────────────────────────────────
if (!NO_LIVE) {
  const unique = [...allLocSet]
  let reachable = true
  try {
    const probe = await fetch(HOST, { method: 'GET', redirect: 'manual' })
    void probe
  } catch {
    reachable = false
  }

  if (!reachable) {
    warnings.push(`Host ${HOST} unreachable — live checks skipped (run after deploy or with SEO_HOST=local preview).`)
    console.log(c.yellow(`⚠ Live checks skipped — ${HOST} unreachable`))
  } else {
    let ok = 0
    let bad = 0
    for (const target of unique) {
      // Map the canonical (production) origin onto the test host if different
      const testUrl = target.replace('https://accrocar.com', HOST.replace(/\/$/, ''))
      try {
        const res = await fetch(testUrl, { method: 'GET', redirect: 'manual' })
        if (res.status >= 300 && res.status < 400) {
          bad++
          errors.push(`${res.status} redirect (must be 200): ${testUrl} → ${res.headers.get('location')}`)
        } else if (res.status !== 200) {
          bad++
          errors.push(`HTTP ${res.status} (must be 200): ${testUrl}`)
        } else {
          ok++
        }
      } catch (e) {
        bad++
        errors.push(`request failed: ${testUrl} — ${e.message}`)
      }
    }
    console.log(
      bad === 0
        ? c.green(`✓ Live checks passed — ${ok}/${unique.length} return 200, no redirects`)
        : c.red(`✗ Live checks: ${bad} failing of ${unique.length}`),
    )
  }
}

// ── Report ───────────────────────────────────────────────────────────────────
console.log(c.bold(`\n── Result ─────────────────────────────────────────────────────`))
if (warnings.length) {
  for (const w of warnings) console.log(c.yellow(`⚠ ${w}`))
}
if (errors.length) {
  for (const e of errors.slice(0, 40)) console.log(c.red(`✗ ${e}`))
  if (errors.length > 40) console.log(c.dim(`  …and ${errors.length - 40} more`))
  console.log(c.red(c.bold(`\n✗ FAIL — ${errors.length} error(s)\n`)))
  process.exit(1)
}
console.log(c.green(c.bold(`\n✓ PASS — sitemap is canonical-consistent\n`)))
process.exit(0)
