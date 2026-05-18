import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Reveal from '../animations/Reveal'
import { getCarById } from '../../data/cars'
import { localizePath } from '../../lib/routes'
import { useLang } from '../../lib/useLang'

export default function RelatedCars({ carIds }) {
  const { t } = useTranslation()
  const lang = useLang()
  if (!carIds || carIds.length === 0) return null

  const cars = carIds.map(getCarById).filter(Boolean)
  if (cars.length === 0) return null

  return (
    <section className="bg-obsidian text-pearl py-section">
      <div className="container-editorial">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-sand">
            <span className="hairline-on-dark" />
            {t('blog.relatedCars')}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-6 font-serif text-display-sm max-w-xl leading-tight text-pearl">
            {t('blog.relatedCarsTitle')}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cars.map((car, i) => (
            <Reveal key={car.id} delay={i * 0.07}>
              <Link
                to={localizePath('carDetail', lang, { id: car.id })}
                className="group block border border-pearl/10 hover:border-sand/50 transition-colors duration-700"
                aria-label={`${car.brand} ${car.model}`}
              >
                {car.image ? (
                  <div className="aspect-[3/2] overflow-hidden bg-obsidian/60">
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model} — Accrocar`}
                      width={car.imageWidth || 760}
                      height={car.imageHeight || 507}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                    />
                  </div>
                ) : (
                  <div className="aspect-[3/2] bg-obsidian/40" />
                )}
                <div className="p-5">
                  <p className="eyebrow text-sand">{car.categoryLabel || car.category}</p>
                  <p className="mt-2 font-serif text-lg text-pearl">
                    {car.brand} <span className="italic">{car.model}</span>
                  </p>
                  <p className="mt-1 text-sand/70 text-[12px] tracking-wide">
                    {t('common.priceFromDay', { price: car.pricePerDay.toLocaleString('fr-FR') })}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-10 text-center">
            <Link to={localizePath('fleet', lang)} className="btn-luxe-ghost-on-dark">
              {t('blog.viewAllFleet')}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
