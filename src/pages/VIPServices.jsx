import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo'
import PageTransition from '../components/PageTransition'
import Reveal, { StaggerGroup, staggerItem } from '../components/animations/Reveal'
import { motion } from 'framer-motion'
import FinalCta from '../sections/FinalCta'
import PageContentSections from '../components/PageContentSections'

const serviceCards = [
  {
    key: 'self',
    image: '/services/self-drive-hire-luxury-car-marrakech.webp',
    width: 1536,
    height: 1024,
    position: 'center center',
  },
  {
    key: 'chauffeur',
    image: '/services/private-chauffeur-luxury-car-morocco.webp',
    width: 1536,
    height: 1024,
    position: 'center center',
  },
  {
    key: 'wedding',
    image: '/services/weddings-events-luxury-car-marrakech.webp',
    width: 1536,
    height: 1024,
    position: 'center center',
  },
  {
    key: 'tours',
    image: '/services/bespoke-tours-luxury-car-morocco.webp',
    width: 1535,
    height: 1024,
    position: 'center center',
  },
]

export default function VIPServices() {
  const { t } = useTranslation()
  const cards = t('vipPage.cards', { returnObjects: true })
  const items = serviceCards.map((card, index) => ({
    ...card,
    ...(Array.isArray(cards) ? cards[index] : {}),
  }))
  return (
    <PageTransition>
      <Seo
        title={t('seo.vip.title')}
        description={t('seo.vip.description')}
        url="https://accrocar.com/vip-services"
        keywords={t('seo.vip.keywords')}
      />

      <header className="pt-40 md:pt-52 pb-20 md:pb-32 container-editorial">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="hairline" />
            {t('vipPage.eyebrow')}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-8 font-serif text-display-xl leading-[0.95]">
            {t('vip.title')}
            <span className="mt-4 block eyebrow text-sand font-sans">
              {t('pagesSeo.vip')}
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 font-serif italic text-2xl md:text-3xl text-obsidian/80 max-w-3xl">
            {t('vip.subtitle')}
          </p>
        </Reveal>
      </header>

      <section className="container-editorial pb-section">
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-px bg-sand/60 border border-sand/60">
          {items.map((it, i) => (
            <motion.div
              key={it.key}
              variants={staggerItem}
              className="group relative min-h-[520px] overflow-hidden bg-obsidian text-pearl"
            >
              <img
                src={it.image}
                alt={it.title}
                width={it.width}
                height={it.height}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: it.position }}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/35 to-obsidian/10" />
              <div className="absolute inset-0 ring-1 ring-inset ring-pearl/0 transition duration-700 group-hover:ring-crimson/60" />
              <div className="relative z-10 flex min-h-[520px] flex-col justify-end p-10 md:p-14">
                <p className="font-['Georgia','Times_New_Roman',serif] text-2xl text-crimson">
                  0{i + 1}
                </p>
                <h3 className="mt-6 max-w-md font-['Georgia','Times_New_Roman',serif] text-2xl font-normal leading-snug tracking-tight text-pearl md:text-3xl">
                  {it.title}
                </h3>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-pearl/85">
                  {it.body}
                </p>
              </div>
            </motion.div>
          ))}
        </StaggerGroup>
      </section>

      <PageContentSections page="vip" />

      <FinalCta />
    </PageTransition>
  )
}
