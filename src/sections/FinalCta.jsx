import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Reveal from '../components/animations/Reveal'
import { localizePath } from '../lib/routes'
import { useLang } from '../lib/useLang'

export default function FinalCta() {
  const { t } = useTranslation()
  const lang = useLang()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.4, 0.7])

  return (
    <section
      ref={ref}
      className="relative h-[90svh] min-h-[600px] overflow-hidden bg-obsidian text-pearl"
    >
      <motion.div style={{ scale }} className="absolute inset-0">
        <img
          src="/experience/accrocar-begin-reservation-location-voiture-luxe-marrakech.webp"
          alt={t('home.finalCta.imageAlt')}
          title={t('home.finalCta.imageTitle')}
          width={1718}
          height={916}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>
      <motion.div style={{ opacity }} className="absolute inset-0 bg-obsidian" />
      <div className="absolute inset-0 vignette" />

      <div className="relative h-full container-editorial flex flex-col justify-center items-center text-center">
        <Reveal>
          <p className="flex items-center gap-3 justify-center uppercase font-sans text-[11px] font-medium tracking-luxe text-sand">
            <span className="hairline" />
            {t('home.finalCta.eyebrow')}
            <span className="hairline" />
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <h2 className="font-serif text-display-lg text-balance text-pearl">
            {t('home.finalCta.title')}
          </h2>
        </Reveal>

        <Reveal delay={0.2} className="mt-8">
          <p className="font-serif italic text-pearl/85 text-xl md:text-2xl max-w-xl mx-auto">
            {t('home.finalCta.body')}
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-12">
          <Link to={localizePath('contact', lang)} className="btn-luxe-on-dark">
            {t('home.finalCta.cta')}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
              <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
