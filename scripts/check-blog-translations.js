// Translation completeness checker for Accrocar blog
// Usage: node scripts/check-blog-translations.js
// npm script: npm run check:blog-translations

import { blogPosts } from '../src/data/blogPosts.js'

const SUPPORTED_LANGS = ['fr', 'en', 'es', 'ro', 'nl']
const REQUIRED_FIELDS = ['title', 'seoTitle', 'metaDescription', 'excerpt']
const SITE = 'https://accrocar.com'

let hasErrors = false
let totalWarnings = 0

function red(s)    { return `\x1b[31m${s}\x1b[0m` }
function yellow(s) { return `\x1b[33m${s}\x1b[0m` }
function green(s)  { return `\x1b[32m${s}\x1b[0m` }
function bold(s)   { return `\x1b[1m${s}\x1b[0m` }
function dim(s)    { return `\x1b[2m${s}\x1b[0m` }

console.log(bold('\n── Accrocar Blog Translation Checker ──────────────────────────\n'))

const published = blogPosts.filter(p => p.published)
const drafts    = blogPosts.filter(p => !p.published)

console.log(`${bold('Published articles:')} ${published.length}`)
console.log(`${bold('Draft articles:')}     ${drafts.length}`)
console.log(`${bold('Languages checked:')}  ${SUPPORTED_LANGS.join(', ')}\n`)
console.log('─'.repeat(60))

for (const post of published) {
  const issues = []
  const warnings = []

  console.log(`\n${bold(post.slug)}`)
  console.log(dim(`  ${SITE}/blog/${post.slug}`))

  // Check imageAlt multilingual
  if (!post.imageAlt || typeof post.imageAlt !== 'object') {
    issues.push(`imageAlt is not multilingual (expected object with lang keys)`)
  } else {
    for (const lang of SUPPORTED_LANGS) {
      if (!post.imageAlt[lang]) {
        warnings.push(`imageAlt missing for lang "${lang}"`)
      }
    }
  }

  // Check translations per language
  for (const lang of SUPPORTED_LANGS) {
    const tr = post.translations?.[lang]

    if (!tr) {
      issues.push(`translations.${lang} is entirely missing`)
      continue
    }

    const langIssues = []

    // Required text fields
    for (const field of REQUIRED_FIELDS) {
      if (!tr[field] || tr[field].trim() === '') {
        langIssues.push(`${field} is empty`)
      }
    }

    // seoTitle length
    if (tr.seoTitle && tr.seoTitle.length > 60) {
      langIssues.push(`seoTitle is ${tr.seoTitle.length} chars (max 60): "${tr.seoTitle}"`)
    }

    // metaDescription length
    if (tr.metaDescription) {
      if (tr.metaDescription.length < 120) {
        langIssues.push(`metaDescription too short (${tr.metaDescription.length} chars, min ~120)`)
      }
      if (tr.metaDescription.length > 165) {
        langIssues.push(`metaDescription too long (${tr.metaDescription.length} chars, max ~165)`)
      }
    }

    // Content
    if (!tr.content || tr.content.length === 0) {
      langIssues.push(`content array is empty`)
    } else {
      // Check for inline image with alt
      const hasImage = tr.content.some(b => b.type === 'image')
      if (!hasImage) {
        langIssues.push(`no inline image in content`)
      }
    }

    // FAQ: if FR has FAQ, other langs should too
    const frFaq = post.translations?.fr?.faq
    if (frFaq && frFaq.length > 0 && (!tr.faq || tr.faq.length === 0)) {
      langIssues.push(`faq missing (FR has ${frFaq.length} items)`)
    }

    // keywords
    if (!tr.keywords || tr.keywords.length === 0) {
      langIssues.push(`keywords array is empty`)
    }

    if (langIssues.length > 0) {
      if (lang === 'fr') {
        // FR issues are hard errors
        issues.push(...langIssues.map(i => `[fr] ${i}`))
      } else {
        warnings.push(...langIssues.map(i => `[${lang}] ${i}`))
      }
    } else {
      console.log(`  ${green('✓')} ${lang.toUpperCase().padEnd(4)} — complete`)
    }
  }

  if (issues.length > 0) {
    hasErrors = true
    for (const issue of issues) {
      console.log(`  ${red('✗')} ${issue}`)
    }
  }

  if (warnings.length > 0) {
    totalWarnings += warnings.length
    for (const warn of warnings) {
      console.log(`  ${yellow('⚠')} ${warn}`)
    }
  }

  if (issues.length === 0 && warnings.length === 0) {
    console.log(`  ${green('✓ All languages complete')}`)
  }
}

// Draft summary
if (drafts.length > 0) {
  console.log(`\n${bold('─'.repeat(60))}`)
  console.log(bold('\nDrafts (not checked for completeness):'))
  for (const d of drafts) {
    const langs = Object.entries(d.translations || {})
      .filter(([, v]) => v?.title)
      .map(([k]) => k)
    console.log(`  ${dim('○')} ${d.slug} — ${dim(`translated: ${langs.join(', ') || 'fr only'}`)}`)
  }
}

// Summary
console.log(`\n${'─'.repeat(60)}`)
if (hasErrors) {
  console.log(red(bold('\n✗ ERRORS found — fix before deploying\n')))
  process.exit(1)
} else if (totalWarnings > 0) {
  console.log(yellow(bold(`\n⚠ ${totalWarnings} warning(s) — translations may need improvement\n`)))
  process.exit(0)
} else {
  console.log(green(bold('\n✓ All published blog translations are complete\n')))
  process.exit(0)
}
