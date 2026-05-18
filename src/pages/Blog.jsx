import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Reveal from '../components/animations/Reveal'
import BlogCard from '../components/blog/BlogCard'
import { publishedPosts, featuredPost, blogCategoryKeys, resolvePostTranslation, formatBlogDate } from '../data/blogPosts'
import { localizePath, fullUrl, alternatesFor, LANGUAGES, DEFAULT_LANG, BASE_URL } from '../lib/routes'
import { useLang } from '../lib/useLang'

export default function Blog() {
  const { t } = useTranslation()
  const lang = useLang()

  const blogCanonical = fullUrl('blog', lang)
  const blogAlternates = alternatesFor('blog')

  const [activeCategory, setActiveCategory] = useState('all')

  const allFiltered = useMemo(() => {
    if (activeCategory === 'all') return publishedPosts
    return publishedPosts.filter(p => p.categoryKey === activeCategory)
  }, [activeCategory])

  const showFeatured = activeCategory === 'all' && featuredPost

  const gridPosts = useMemo(() => {
    if (showFeatured) return allFiltered.filter(p => !p.featured)
    return allFiltered
  }, [allFiltered, showFeatured])

  const featuredTr = featuredPost ? resolvePostTranslation(featuredPost, lang) : null

  return (
    <>
      <Helmet>
        <title>{t('blog.seoTitle')}</title>
        <meta name="description" content={t('blog.seoDescription')} />
        <link rel="canonical" href={blogCanonical} />
        {LANGUAGES.map((l) => (
          <link key={l} rel="alternate" hrefLang={l} href={blogAlternates[l]} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={blogAlternates[DEFAULT_LANG]} />
        <meta property="og:title" content={t('blog.seoTitle')} />
        <meta property="og:description" content={t('blog.seoDescription')} />
        <meta property="og:url" content={blogCanonical} />
        <meta property="og:type" content="website" />
        {featuredPost && <meta property="og:image" content={`${BASE_URL}${featuredPost.image}`} />}
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: t('blog.schemaName'),
          description: t('blog.schemaDescription'),
          url: blogCanonical,
          publisher: { '@type': 'Organization', name: 'Accrocar', url: BASE_URL },
        })}</script>
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative bg-obsidian overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32">
        <div
          className="absolute inset-0 bg-center bg-cover opacity-[0.08]"
          style={{ backgroundImage: "url('/experience/accrocar-experience-location-voiture-luxe-marrakech.webp')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-transparent to-obsidian/80" aria-hidden="true" />

        <div className="relative container-editorial text-center">
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-3 text-sand">
              <span className="hairline-on-dark" />
              {t('blog.heroEyebrow')}
              <span className="hairline-on-dark" />
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 font-serif text-display-md md:text-display-lg tracking-tight text-pearl max-w-3xl mx-auto leading-tight">
              {t('blog.heroTitle')}{' '}
              <span className="italic text-sand">{t('blog.heroTitleAccent')}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 text-pearl/60 max-w-xl mx-auto leading-relaxed text-[15px]">
              {t('blog.heroSubtitle')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Featured post ────────────────────────────────────────────────────── */}
      {showFeatured && featuredTr && (
        <section className="bg-pearl py-16 md:py-20 border-b border-sand/20">
          <div className="container-editorial">
            <Reveal>
              <p className="eyebrow text-sand mb-8">{t('blog.featured')}</p>
            </Reveal>
            <Link
              to={localizePath('blogPost', lang, { slug: featuredPost.slug })}
              className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border border-sand/30 hover:border-sand/70 transition-colors duration-700"
              aria-label={featuredTr.title}
            >
              <div className="md:col-span-7 aspect-[3/2] md:aspect-auto overflow-hidden bg-obsidian/5">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.imageAlt[lang] || featuredPost.imageAlt.fr}
                  width={featuredPost.imageWidth}
                  height={featuredPost.imageHeight}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"
                />
              </div>
              <div className="md:col-span-5 flex flex-col justify-center p-6 md:p-10 md:pl-2">
                <p className="eyebrow text-sand">{t(`blog.categories.${featuredPost.categoryKey}`)}</p>
                <h2 className="mt-4 font-serif text-2xl md:text-3xl lg:text-4xl tracking-tight text-obsidian group-hover:text-crimson transition-colors duration-500 leading-tight">
                  {featuredTr.title}
                </h2>
                <p className="mt-4 text-obsidian/65 leading-relaxed text-[14px] line-clamp-4">
                  {featuredTr.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sand text-[11px] tracking-luxe uppercase">
                    {featuredPost.readingTime} {t('blog.minRead')} · {formatBlogDate(featuredPost.date, lang)}
                  </span>
                  <span className="eyebrow text-crimson flex items-center gap-1 group-hover:gap-2 transition-all duration-500">
                    {t('blog.readArticle')} <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── Category filter + grid ────────────────────────────────────────────── */}
      <section className="bg-pearl py-section">
        <div className="container-editorial">

          {/* Filter pills */}
          <Reveal>
            <div className="flex flex-wrap gap-3 mb-12">
              {['all', ...blogCategoryKeys].map(key => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`eyebrow px-4 py-2 border transition-colors duration-300 ${
                    activeCategory === key
                      ? 'bg-crimson text-pearl border-crimson'
                      : 'bg-transparent text-obsidian/70 border-sand/40 hover:border-sand/80 hover:text-obsidian'
                  }`}
                >
                  {t(`blog.categories.${key}`)}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {allFiltered.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-obsidian/50 text-center py-16"
              >
                {t('blog.noArticles')}
              </motion.p>
            ) : (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {gridPosts.map((post, i) => (
                  <BlogCard
                    key={post.slug}
                    post={post}
                    translation={resolvePostTranslation(post, lang)}
                    lang={lang}
                    delay={i * 0.07}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA strip ───────────────────────────────────────────────────────── */}
      <section className="bg-obsidian py-20 text-center">
        <div className="container-editorial">
          <Reveal>
            <p className="font-serif text-2xl md:text-3xl text-pearl max-w-xl mx-auto leading-snug">
              {t('blog.ctaTitle')}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to={localizePath('fleet', lang)} className="btn-luxe">{t('blog.ctaFleet')}</Link>
              <Link to={localizePath('contact', lang)} className="btn-luxe-ghost-on-dark">{t('blog.ctaContact')}</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
