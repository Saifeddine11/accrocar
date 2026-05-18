import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { formatBlogDate } from '../../data/blogPosts'
import { localizePath } from '../../lib/routes'

export default function BlogCard({ post, translation, lang, size = 'normal', delay = 0 }) {
  const { t } = useTranslation()
  const tr = translation || {}
  const imageAlt = post.imageAlt
    ? (post.imageAlt[lang] || post.imageAlt.fr)
    : tr.title || ''

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className="group flex flex-col h-full"
    >
      <Link
        to={localizePath('blogPost', lang || 'en', { slug: post.slug })}
        className="block flex-1 flex flex-col border border-sand/30 hover:border-sand/70 transition-colors duration-700"
        aria-label={tr.title}
      >
        {/* Image */}
        <div className="aspect-[3/2] overflow-hidden bg-obsidian/5 flex-shrink-0">
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

        {/* Content */}
        <div className={`flex flex-col flex-1 p-6 ${size === 'large' ? 'md:p-8' : ''}`}>
          <p className="eyebrow text-sand mb-3">{t(`blog.categories.${post.categoryKey}`)}</p>

          <h3
            className={`font-serif tracking-tight text-obsidian group-hover:text-crimson transition-colors duration-500 leading-tight ${
              size === 'large' ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
            }`}
          >
            {tr.title}
          </h3>

          <p className="mt-3 text-obsidian/65 leading-relaxed text-[14px] flex-1 line-clamp-3">
            {tr.excerpt}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-sand text-[11px] tracking-luxe uppercase">
              {post.readingTime} {t('blog.minRead')} · {formatBlogDate(post.date, lang || 'fr')}
            </span>
            <span className="eyebrow text-crimson group-hover:gap-2 transition-all duration-500 flex items-center gap-1">
              {t('blog.readMore')} <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
