import { useTranslation } from 'react-i18next'
import Reveal, { StaggerGroup, staggerItem } from '../components/animations/Reveal'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Experience() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1])
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])

  const items = [
    { key: 'delivery', n: '01' },
    { key: 'concierge', n: '02' },
    { key: 'discretion', n: '03' },
  ]

  return (
    <section className="section bg-pearl text-obsidian">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="hairline" />
                {t('home.experience.eyebrow')}
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8">
              <h2 className="font-serif text-display-md leading-[1.05] text-balance text-obsidian">
                {t('home.experience.title')}
              </h2>
            </Reveal>
          </div>

          <div
            ref={ref}
            className="md:col-span-7 relative aspect-[4/5] md:aspect-[5/6] overflow-hidden"
          >
            <motion.img
              style={{ scale: imgScale, y: imgY }}
              src="/experience/accrocar-experience-location-voiture-luxe-marrakech.webp"
              alt={t('home.experience.imageAlt')}
              title={t('home.experience.imageTitle')}
              width={1024}
              height={1536}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 to-transparent" />
          </div>
        </div>

        <StaggerGroup className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {items.map(({ key, n }) => (
            <motion.div
              key={key}
              variants={staggerItem}
              className="border-t border-sand/60 pt-8"
            >
              <p className="font-serif text-sand text-2xl">{n}</p>
              <h3 className="mt-6 font-serif text-2xl md:text-3xl tracking-tight text-obsidian">
                {t(`home.experience.items.${key}.title`)}
              </h3>
              <p className="mt-5 text-obsidian/75 leading-relaxed text-[15px]">
                {t(`home.experience.items.${key}.body`)}
              </p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
