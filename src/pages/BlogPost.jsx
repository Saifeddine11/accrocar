import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import Reveal from '../components/animations/Reveal'
import ArticleBody from '../components/blog/ArticleBody'
import RelatedCars from '../components/blog/RelatedCars'
import RelatedPosts from '../components/blog/RelatedPosts'
import NotFound from './NotFound'
import { getPostBySlug, publishedPosts, formatBlogDate, resolvePostTranslation } from '../data/blogPosts'
import { fullUrl, alternatesFor, localizePath, LANGUAGES, DEFAULT_LANG, BASE_URL } from '../lib/routes'
import { useLang } from '../lib/useLang'

function buildBlogPostingSchema(post, tr, lang, postUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: tr.seoTitle || tr.title,
    description: tr.metaDescription,
    image: `${BASE_URL}${post.image}`,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    author: { '@type': 'Organization', name: post.author || 'Accrocar', url: BASE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Accrocar',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/favicon.ico` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    keywords: (tr.keywords || []).join(', '),
    inLanguage: lang === 'fr' ? 'fr-MA' : lang === 'en' ? 'en-GB' : lang === 'es' ? 'es-ES' : lang === 'ro' ? 'ro-RO' : 'nl-NL',
  }
}

function buildBreadcrumbSchema(post, tr, t, lang, postUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('blog.breadcrumbHome'), item: fullUrl('home', lang) },
      { '@type': 'ListItem', position: 2, name: t('blog.breadcrumbJournal'), item: fullUrl('blog', lang) },
      { '@type': 'ListItem', position: 3, name: tr.title, item: postUrl },
    ],
  }
}

function buildFAQSchema(faq) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const lang = useLang()

  const post = getPostBySlug(slug)
  if (!post || !post.published) return <NotFound />

  const tr = resolvePostTranslation(post, lang)
  const imageAlt = post.imageAlt[lang] || post.imageAlt.fr
  const postUrl = fullUrl('blogPost', lang, { slug: post.slug })
  const postAlternates = alternatesFor('blogPost', { slug: post.slug })

  const relatedPosts = publishedPosts
    .filter(p => (post.relatedSlugs || []).includes(p.slug))
    .slice(0, 3)

  return (
    <>
      <Helmet>
        <title>{tr.seoTitle || tr.title}</title>
        <meta name="description" content={tr.metaDescription} />
        <link rel="canonical" href={postUrl} />
        {LANGUAGES.map((l) => (
          <link key={l} rel="alternate" hrefLang={l} href={postAlternates[l]} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={postAlternates[DEFAULT_LANG]} />
        <meta property="og:title" content={tr.seoTitle || tr.title} />
        <meta property="og:description" content={tr.metaDescription} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`${BASE_URL}${post.image}`} />
        <meta property="og:image:alt" content={imageAlt} />
        <meta name="twitter:title" content={tr.seoTitle || tr.title} />
        <meta name="twitter:description" content={tr.metaDescription} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.updatedAt || post.date} />
        <script type="application/ld+json">{JSON.stringify(buildBlogPostingSchema(post, tr, lang, postUrl))}</script>
        <script type="application/ld+json">{JSON.stringify(buildBreadcrumbSchema(post, tr, t, lang, postUrl))}</script>
        {tr.faq && tr.faq.length > 0 && (
          <script type="application/ld+json">{JSON.stringify(buildFAQSchema(tr.faq))}</script>
        )}
      </Helmet>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-obsidian overflow-hidden min-h-[60vh] md:min-h-[70vh] flex items-end">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={imageAlt}
            width={post.imageWidth}
            height={post.imageHeight}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/20" />
        </div>

        <div className="relative container-editorial pb-14 pt-40 md:pt-48">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-pearl/40 text-[11px] tracking-luxe uppercase">
              <li><Link to={localizePath('home', lang)} className="hover:text-pearl/80 transition-colors duration-300">{t('blog.breadcrumbHome')}</Link></li>
              <li aria-hidden="true" className="text-pearl/20">·</li>
              <li><Link to={localizePath('blog', lang)} className="hover:text-pearl/80 transition-colors duration-300">{t('blog.breadcrumbJournal')}</Link></li>
              <li aria-hidden="true" className="text-pearl/20">·</li>
              <li className="text-pearl/60 truncate max-w-[200px]">{t(`blog.categories.${post.categoryKey}`)}</li>
            </ol>
          </nav>

          <Reveal>
            <p className="eyebrow text-sand mb-4">{t(`blog.categories.${post.categoryKey}`)}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="font-serif text-display-sm md:text-display-md tracking-tight text-pearl max-w-3xl leading-tight">
              {tr.title}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-pearl/50 text-[12px] tracking-wide">
              <span>{t('blog.by')} {post.author}</span>
              <span aria-hidden="true" className="text-pearl/20">·</span>
              <span>{post.readingTime} {t('blog.readingTime')}</span>
              <span aria-hidden="true" className="text-pearl/20">·</span>
              <time dateTime={post.date}>{formatBlogDate(post.date, lang)}</time>
              {post.updatedAt && post.updatedAt !== post.date && (
                <>
                  <span aria-hidden="true" className="text-pearl/20">·</span>
                  <span>{t('blog.updatedOn')} <time dateTime={post.updatedAt}>{formatBlogDate(post.updatedAt, lang)}</time></span>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Article body ─────────────────────────────────────────────────── */}
      <section className="bg-pearl py-section">
        <div className="container-editorial">
          <ArticleBody content={tr.content} />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      {tr.faq && tr.faq.length > 0 && (
        <section className="bg-pearl border-t border-sand/30 py-section">
          <div className="container-editorial">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-sand">
                <span className="hairline" />
                {t('blog.faqEyebrow')}
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 font-serif text-display-sm max-w-xl leading-tight text-obsidian">
                {t('blog.faqTitle')}
              </h2>
            </Reveal>

            <div className="mt-12 max-w-2xl mx-auto divide-y divide-sand/30">
              {tr.faq.map((item, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <details className="group py-6 cursor-pointer" open={i === 0}>
                    <summary className="flex items-center justify-between gap-4 list-none font-serif text-lg text-obsidian group-hover:text-crimson transition-colors duration-300">
                      {item.question}
                      <span className="flex-shrink-0 text-sand text-xl transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
                    </summary>
                    <p className="mt-4 text-obsidian/70 leading-relaxed text-[15px]">
                      {item.answer}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Related cars ─────────────────────────────────────────────────── */}
      {post.relatedCars && post.relatedCars.length > 0 && (
        <RelatedCars carIds={post.relatedCars} />
      )}

      {/* ── Related posts ────────────────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <RelatedPosts posts={relatedPosts} lang={lang} />
      )}

      {/* ── Back to journal ──────────────────────────────────────────────── */}
      <section className="bg-obsidian py-16 text-center">
        <div className="container-editorial">
          <Reveal>
            <Link to={localizePath('blog', lang)} className="btn-luxe-ghost-on-dark">
              {t('blog.backToJournal')}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
