import { useParams, Navigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/animations/Reveal'
import { getCarById } from '../data/cars'
import BookingForm from '../components/BookingForm'

const OG_DEFAULT = 'https://accrocar.com/bently.webp'

export default function CarDetail() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const car = getCarById(id)

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  const specs = useMemo(() => {
    if (!car) return []
    const rows = []
    if (car.horsepower != null)
      rows.push({ label: 'Power', value: `${car.horsepower} hp` })
    if (car.topSpeed != null)
      rows.push({ label: 'Top speed', value: `${car.topSpeed} km/h` })
    if (car.acceleration != null)
      rows.push({ label: '0–100', value: `${car.acceleration} s` })
    if (car.seats != null) rows.push({ label: 'Seats', value: car.seats })
    if (car.transmission) rows.push({ label: 'Transmission', value: car.transmission })
    if (car.year != null) rows.push({ label: 'Year', value: car.year })
    return rows
  }, [car])

  const jsonLd = useMemo(() => {
    if (!car) return null

    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://accrocar.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Fleet',
          item: 'https://accrocar.com/fleet',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: `${car.brand} ${car.model}`,
          item: `https://accrocar.com/fleet/${car.id}`,
        },
      ],
    }

    const product = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${car.brand} ${car.model}`,
      description:
        car.seoDescription ||
        t('seo.carDetail.productDescription', {
          description: car.description,
        }),
      brand: { '@type': 'Brand', name: car.brand },
      // Absolute URL required for Google rich result eligibility
      ...(car.image ? { image: `https://accrocar.com${car.image}` } : {}),
      offers: {
        '@type': 'Offer',
        priceCurrency: car.currency,
        price: car.pricePerDay,
        availability: 'https://schema.org/InStock',
        url: `https://accrocar.com/fleet/${car.id}`,
      },
    }

    return [breadcrumb, product]
  }, [car, t])

  if (!car) return <Navigate to="/fleet" replace />

  const seoImage = car.image || OG_DEFAULT

  return (
    <PageTransition>
      <Seo
        title={car.seoTitle || `${car.brand} ${car.model}`}
        description={
          car.seoDescription ||
          t('seo.carDetail.description', {
            brand: car.brand,
            model: car.model,
            description: car.description,
          })
        }
        url={`https://accrocar.com/fleet/${car.id}`}
        keywords={t('seo.carDetail.keywords', {
          brand: car.brand,
          model: car.model,
        })}
        image={seoImage}
        jsonLd={jsonLd}
      />

      <section
        ref={ref}
        className="relative h-[100svh] min-h-[600px] overflow-hidden bg-obsidian text-pearl"
      >
        {car.image ? (
          <motion.img
            style={{ scale, y }}
            src={car.image}
            alt={car.altText || `${car.brand} ${car.model}`}
            width={car.imageWidth}
            height={car.imageHeight}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <motion.div
            style={{ scale, y }}
            className="absolute inset-0 w-full h-full bg-obsidian"
            role="img"
            aria-label={`${car.brand} ${car.model}`}
          />
        )}
        <div className="absolute inset-0 vignette" />
        <div className="relative z-10 h-full container-editorial flex flex-col justify-end pb-20 md:pb-28">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-sand">
              <span className="hairline" />
              {car.brand} — {car.categoryLabel}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-serif text-display-xl leading-[0.95] text-pearl">
              {car.model}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 font-serif italic text-2xl md:text-3xl text-pearl/80 max-w-2xl">
              {car.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-pearl text-obsidian">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 lg:items-start">
          <div className="lg:col-span-5 space-y-10 lg:space-y-12 lg:pr-4">
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="hairline" />
                {t('booking.specLabel')}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif text-display-sm leading-tight">
                {t('booking.specTitle')}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-serif text-2xl md:text-3xl text-crimson">
                {t('common.priceFromDay', {
                  price: car.pricePerDay.toLocaleString(
                    i18n.language === 'en' ? 'en-GB' : i18n.language,
                  ),
                })}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
                <p className="font-serif text-base md:text-lg text-obsidian/75 leading-relaxed max-w-md">
                {t('booking.leftColumnBlurb')}
              </p>
            </Reveal>

            {specs.length > 0 ? (
              <Reveal delay={0.2}>
                <dl className="grid grid-cols-2 gap-x-8 gap-y-8 border-t border-sand/60 pt-10">
                  {specs.map((s) => (
                    <div key={s.label}>
                      <dt className="eyebrow text-sand">{s.label}</dt>
                      <dd className="mt-2 font-serif text-xl md:text-2xl tracking-tight text-obsidian">
                        {s.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ) : (
              <Reveal delay={0.2}>
                <div className="border-t border-sand/60 pt-10 max-w-md">
                  <p className="font-serif text-lg md:text-xl text-obsidian/80 leading-relaxed">
                    {t('common.specsOnRequest')}
                  </p>
                </div>
              </Reveal>
            )}
          </div>

          <div className="lg:col-span-7 border border-sand/60 bg-pearl p-6 sm:p-8 md:p-10 lg:sticky lg:top-28">
            <Reveal>
              <p className="eyebrow mb-2">{t('booking.formEyebrow')}</p>
              <p className="font-serif text-xl md:text-2xl text-obsidian mb-8 md:mb-10">
                {car.brand} {car.model}
              </p>
            </Reveal>
            <BookingForm car={car} />
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
