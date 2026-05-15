import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { featuredCars } from '../data/cars'
import Reveal from '../components/animations/Reveal'

const ease = [0.16, 1, 0.3, 1]

function FeaturedCard({ car }) {
  const { t } = useTranslation()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

  return (
    <article ref={ref} className="group relative w-full">
      <div className="relative aspect-[16/10] overflow-hidden bg-pearl-200 rounded-t-xl">
        <Link to={`/fleet/${car.id}`} className="block w-full h-full">
          {car.image ? (
            <motion.img
              style={{ scale, y }}
              src={car.image}
              alt={car.altText || `${car.brand} ${car.model}`}
              width={car.imageWidth}
              height={car.imageHeight}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <motion.div
              style={{ scale, y }}
              className="absolute inset-0 w-full h-full bg-gradient-to-br from-pearl-200 via-pearl to-obsidian/[0.06] transition-transform duration-700 group-hover:scale-105"
              role="img"
              aria-label={`${car.brand} ${car.model}`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent" />
          <div className="absolute inset-0 ring-1 ring-inset ring-obsidian/0 group-hover:ring-sand/60 transition duration-700" />
        </Link>
      </div>

      <div className="mt-6 md:mt-8 p-6 bg-pearl border border-obsidian/5 rounded-b-xl">
        <div className="flex items-end justify-between">
          <div>
            <Reveal>
              <p className="eyebrow text-sand-600">{car.brand}</p>
              <h3 className="mt-3 font-serif text-2xl md:text-3xl tracking-tight text-obsidian">
                {car.model}
              </h3>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="text-right">
            <p className="mt-1 font-serif text-lg md:text-xl text-crimson leading-snug">
              {t('common.priceFromDay', {
                price: car.pricePerDay.toLocaleString('en-GB'),
              })}
            </p>
          </Reveal>
        </div>
      </div>
    </article>
  )
}

export default function FeaturedFleet() {
  const { t } = useTranslation()
  return (
    <section className="bg-pearl text-obsidian pt-24 pb-12 md:pb-16">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-20 md:mb-28">
          <div className="md:col-span-3">
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="hairline" />
                {t('home.featured.eyebrow')}
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-9 md:col-start-4">
            <Reveal>
              <h2 className="font-serif text-display-md leading-[1.05] text-balance max-w-4xl text-obsidian">
                {t('home.featured.title')}
                <span className="text-sand italic"> —</span>
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredCars.slice(0, 4).map((car) => (
            <FeaturedCard key={car.id} car={car} />
          ))}
        </div>

        <Reveal className="mt-16 md:mt-20 flex justify-center">
          <Link to="/fleet" className="btn-luxe-ghost">
            {t('home.featured.cta')} <Arrow />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

function Arrow() {
  return (
    <motion.svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      aria-hidden
      initial={{ x: 0 }}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.7, ease }}
    >
      <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.2" />
    </motion.svg>
  )
}
