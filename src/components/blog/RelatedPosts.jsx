import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Reveal from '../animations/Reveal'
import { resolvePostTranslation, formatBlogDate } from '../../data/blogPosts'
import { localizePath } from '../../lib/routes'

export default function RelatedPosts({ posts, lang = 'fr' }) {
  const { t } = useTranslation()
  if (!posts || posts.length === 0) return null

  return (
    <section className="bg-pearl py-section border-t border-sand/30">
      <div className="container-editorial">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-sand">
            <span className="hairline" />
            {t('blog.relatedPosts')}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-6 font-serif text-display-sm max-w-xl leading-tight text-obsidian">
            {t('blog.relatedPostsTitle')}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => {
            const tr = resolvePostTranslation(post, lang)
            const imageAlt = post.imageAlt ? (post.imageAlt[lang] || post.imageAlt.fr) : tr.title || ''
            return (
              <Reveal key={post.slug} delay={i * 0.07}>
                <Link
                  to={localizePath('blogPost', lang, { slug: post.slug })}
                  className="group block border border-sand/30 hover:border-sand/70 transition-colors duration-700 h-full"
                  aria-label={tr.title}
                >
                  <div className="aspect-[3/2] overflow-hidden bg-obsidian/5">
                    <img
                      src={post.image}
                      alt={imageAlt}
                      width={post.imageWidth}
                      height={post.imageHeight}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                    />
                  </div>
                  <div className="p-5">
                    <p className="eyebrow text-sand mb-2">{t(`blog.categories.${post.categoryKey}`)}</p>
                    <h3 className="font-serif text-lg text-obsidian group-hover:text-crimson transition-colors duration-500 leading-tight">
                      {tr.title}
                    </h3>
                    <p className="mt-2 text-obsidian/60 text-[12px] tracking-wide">
                      {post.readingTime} {t('blog.minRead')} · {formatBlogDate(post.date, lang)}
                    </p>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
