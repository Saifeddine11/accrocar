import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { whatsappLink } from '../lib/whatsapp'
import { localizePath } from '../lib/routes'
import { useLang } from '../lib/useLang'

const ease = [0.16, 1, 0.3, 1]
const heroImage = '/bently.webp'
const heroMobileImage = '/bentlymobile.webp'

export default function Hero() {
  const { t } = useTranslation()
  const lang = useLang()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-obsidian text-pearl"
    >
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0"
      >
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet={`${heroMobileImage} 853w`}
            sizes="100vw"
            type="image/webp"
          />
          <source
            media="(min-width: 768px)"
            srcSet={`${heroImage} 1536w`}
            sizes="100vw"
            type="image/webp"
          />
          <img
            src={heroImage}
            alt={t('home.hero.imageAlt')}
            width="1536"
            height="1024"
            className="h-[115%] w-full -translate-y-[12%] object-cover object-center md:h-full md:translate-y-0"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 vignette" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.6%22/></svg>")',
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: copyY, opacity: fade }}
        className="relative z-10 h-full container-editorial flex flex-col justify-end pb-20 md:pb-28"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.3 }}
          className="flex items-center gap-3 uppercase font-sans text-[11px] font-medium tracking-luxe text-sand"
        >
          <span className="hairline" />
          {t('home.hero.eyebrow')}
        </motion.p>

        <h1 className="mt-6 md:mt-8 font-serif text-display-xl text-balance leading-[0.95] text-pearl">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.3, ease, delay: 0.4 }}
            >
              {t('home.hero.title')}
            </motion.span>
          </span>
        </h1>

        <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 0.9 }}
            className="md:col-span-6 font-serif italic text-2xl md:text-3xl leading-snug text-pearl/85 max-w-xl"
          >
            {t('home.hero.subtitle')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 1.05 }}
            className="md:col-span-5 md:col-start-8 text-pearl/80 leading-relaxed text-[15px]"
          >
            {t('home.hero.lede')}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 1.25 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <Link to={localizePath('fleet', lang)} className="btn-luxe-on-dark">
            {t('home.hero.ctaFleet')}
            <Arrow />
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxe-ghost-on-dark"
          >
            {t('home.hero.ctaWhatsapp')}
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease, delay: 1.6 }}
        className="absolute z-10 bottom-6 right-6 md:right-10 hidden md:flex items-center gap-3 text-sand text-[10.5px] tracking-luxe uppercase"
      >
        <span>{t('common.scrollToExplore')}</span>
        <span className="relative block w-12 h-px bg-sand/50 overflow-hidden">
          <motion.span
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2.6, ease }}
            className="absolute inset-y-0 w-1/2 bg-sand"
          />
        </span>
      </motion.div>
    </section>
  )
}

function Arrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path
        d="M1 5h12m0 0L9 1m4 4L9 9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
    </svg>
  )
}
