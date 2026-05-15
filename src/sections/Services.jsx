import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Reveal, { StaggerGroup, staggerItem } from '../components/animations/Reveal'

const ease = [0.16, 1, 0.3, 1]

const services = [
  {
    key: 'self',
    to: '/fleet',
    image: '/services/self-drive-hire-luxury-car-marrakech.webp',
    position: 'center center',
  },
  {
    key: 'chauffeur',
    to: '/private-chauffeur',
    image: '/services/private-chauffeur-luxury-car-morocco.webp',
    position: 'center center',
  },
  {
    key: 'wedding',
    to: '/weddings-events',
    image: '/services/weddings-events-luxury-car-marrakech.webp',
    position: 'center center',
  },
  {
    key: 'tours',
    to: '/vip-services',
    image: '/services/bespoke-tours-luxury-car-morocco.webp',
    position: 'center center',
  },
]

export default function Services() {
  const { t } = useTranslation()
  return (
    <section className="section bg-pearl text-obsidian">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16 md:mb-24">
          <div className="md:col-span-3">
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="hairline" />
                {t('home.services.eyebrow')}
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="font-serif text-display-md leading-[1.05] text-balance text-obsidian">
                {t('home.services.title')}
              </h2>
            </Reveal>
          </div>
        </div>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-px bg-sand/60">
          {services.map((s) => (
            <motion.div key={s.key} variants={staggerItem} className="bg-pearl">
              <Link
                to={s.to}
                className="group block relative overflow-hidden aspect-[5/4]"
              >
                <motion.img
                  src={s.image}
                  alt={t(`home.services.items.${s.key}.title`)}
                  width={s.key === 'tours' ? 1535 : 1536}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: s.position }}
                  className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-[1.06] transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/30 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-pearl/0 group-hover:ring-crimson/60 transition duration-700" />

                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-pearl">
                  <p className="uppercase font-sans text-[11px] font-medium tracking-luxe text-sand">
                    0{services.indexOf(s) + 1}
                  </p>
                  <h3 className="mt-4 font-serif text-3xl md:text-5xl tracking-tight text-pearl">
                    {t(`home.services.items.${s.key}.title`)}
                  </h3>
                  <p className="mt-4 text-pearl/85 max-w-md text-[14px] leading-relaxed">
                    {t(`home.services.items.${s.key}.body`)}
                  </p>
                  <div className="mt-6 flex items-center gap-3 text-pearl/85 text-[11px] tracking-luxe uppercase">
                    <span>{t('common.discover')}</span>
                    <motion.span
                      initial={{ width: 24 }}
                      whileHover={{ width: 48 }}
                      transition={{ duration: 0.7, ease }}
                      className="block h-px bg-pearl/85"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
