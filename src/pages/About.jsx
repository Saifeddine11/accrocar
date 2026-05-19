import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/animations/Reveal'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import FinalCta from '../sections/FinalCta'

export default function About() {
  const { t } = useTranslation()
  const milestonesRaw = t('aboutPage.milestones', { returnObjects: true })
  const milestones = Array.isArray(milestonesRaw) ? milestonesRaw : []
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1])

  return (
    <PageTransition>
      <Seo
        title={t('seo.about.title')}
        description={t('seo.about.description')}
        url="https://accrocar.com/about"
        keywords={t('seo.about.keywords')}
      />

      <header className="pt-40 md:pt-52 pb-20 container-editorial">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="hairline" />
            {t('aboutPage.headerEyebrow')}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-8 font-serif text-display-xl leading-[0.95]">
            {t('about.title')}
            <span className="mt-4 block eyebrow text-sand font-sans">
              {t('pagesSeo.about')}
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 font-serif italic text-2xl md:text-3xl text-obsidian/80 max-w-3xl">
            {t('about.subtitle')}
          </p>
        </Reveal>
      </header>

      <section ref={ref} className="relative h-[80svh] min-h-[520px] overflow-hidden">
        <motion.img
          style={{ y, scale }}
          src="/about/maison-accrocar-location-voiture-luxe-marrakech.webp"
          alt={t('aboutPage.heroAlt')}
          title={t('aboutPage.heroImageTitle')}
          width={1672}
          height={941}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/35 to-transparent" />
      </section>

      <section className="section container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="hairline" />
                {t('aboutPage.disciplineEyebrow')}
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal>
              <h2 className="font-serif text-display-md leading-[1.05] text-balance">
                {t('aboutPage.disciplineTitle')}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 space-y-7 text-obsidian/75 leading-[1.85] text-[16px] max-w-2xl">
                <p>{t('aboutPage.disciplineP1')}</p>
                <p>{t('aboutPage.disciplineP2')}</p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-4 gap-10">
          {milestones.map((m, i) => (
            <Reveal key={m.year} delay={i * 0.06} className="border-t border-sand/60 pt-6">
              <p className="font-serif text-crimson text-3xl md:text-4xl">{m.year}</p>
              <p className="mt-4 eyebrow text-sand-600">{m.label}</p>
              <p className="mt-3 text-obsidian/75 text-[14px] leading-relaxed">
                {m.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCta />
    </PageTransition>
  )
}
