import { useParams, Navigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/animations/Reveal'
import { Link } from 'react-router-dom'
import { getCarById } from '../data/cars'
import BookingForm from '../components/BookingForm'
import { localizePath, fullUrl } from '../lib/routes'
import { useLang } from '../lib/useLang'
import { carProfile, similarCars, contextualBlogSlug } from '../data/carContentProfile'

const OG_DEFAULT = 'https://accrocar.com/bently.webp'

export default function CarDetail() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const lang = useLang()
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
      rows.push({ label: t('carDetail.specsLabels.power'), value: `${car.horsepower} hp` })
    if (car.topSpeed != null)
      rows.push({ label: t('carDetail.specsLabels.topSpeed'), value: `${car.topSpeed} km/h` })
    if (car.acceleration != null)
      rows.push({ label: t('carDetail.specsLabels.acceleration'), value: `${car.acceleration} s` })
    if (car.seats != null) rows.push({ label: t('carDetail.specsLabels.seats'), value: car.seats })
    if (car.transmission) rows.push({ label: t('carDetail.specsLabels.transmission'), value: car.transmission })
    if (car.year != null) rows.push({ label: t('carDetail.specsLabels.year'), value: car.year })
    return rows
  }, [car, t])

  const jsonLd = useMemo(() => {
    if (!car) return null

    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: t('nav.home'),
          item: fullUrl('home', lang),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: t('nav.fleet'),
          item: fullUrl('fleet', lang),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: `${car.brand} ${car.model}`,
          item: fullUrl('carDetail', lang, { id: car.id }),
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
  }, [car, t, lang])

  if (!car) return <Navigate to={localizePath('fleet', lang)} replace />

  const seoImage = car.image || OG_DEFAULT

  // ── Unique, category-aware editorial content (Seobility content depth) ──
  const profile = carProfile(car.category)
  const priceStr = car.pricePerDay.toLocaleString(
    i18n.language === 'en' ? 'en-GB' : i18n.language,
  )
  const tv = { brand: car.brand, model: car.model, price: priceStr }
  const bestFor = t(`carDetailContent.profiles.${profile}.bestFor`, {
    returnObjects: true,
    ...tv,
  })
  const similar = similarCars(car)
  const blogSlug = contextualBlogSlug(car)

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
              {car.brand} {car.model}
              <span className="mt-4 block eyebrow text-sand font-sans">
                {t('carDetailContent.h1Suffix')}
              </span>
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

      {/* ── Editorial content: unique per model, category-aware ───────────── */}
      <section className="section bg-pearl text-obsidian border-t border-sand/40">
        <div className="container-editorial max-w-3xl">
          <Reveal>
            <h2 className="font-serif text-display-sm leading-tight">
              {t('carDetailContent.introHeading', tv)}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 text-obsidian/80 leading-relaxed text-[15.5px] md:text-base">
              {t('carDetailContent.intro', tv)}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h3 className="mt-12 font-serif text-2xl md:text-3xl tracking-tight border-l-[3px] border-crimson pl-4">
              {t('carDetailContent.whyHeading', tv)}
            </h3>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-5 text-obsidian/80 leading-relaxed text-[15.5px] md:text-base">
              {t(`carDetailContent.profiles.${profile}.why`, tv)}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h3 className="mt-12 font-serif text-2xl md:text-3xl tracking-tight border-l-[3px] border-crimson pl-4">
              {t('carDetailContent.bestForHeading', tv)}
            </h3>
          </Reveal>
          <Reveal delay={0.05}>
            <ul className="mt-5 space-y-2.5">
              {(Array.isArray(bestFor) ? bestFor : []).map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-obsidian/80 leading-relaxed text-[15.5px] md:text-base"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.05}>
            <h3 className="mt-12 font-serif text-2xl md:text-3xl tracking-tight border-l-[3px] border-crimson pl-4">
              {t('carDetailContent.deliveryHeading', tv)}
            </h3>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-5 text-obsidian/80 leading-relaxed text-[15.5px] md:text-base">
              {t('carDetailContent.delivery', tv)}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h3 className="mt-12 font-serif text-2xl md:text-3xl tracking-tight border-l-[3px] border-crimson pl-4">
              {t('carDetailContent.chauffeurHeading', tv)}
            </h3>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-5 text-obsidian/80 leading-relaxed text-[15.5px] md:text-base">
              {t(`carDetailContent.profiles.${profile}.chauffeur`, tv)}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h3 className="mt-12 font-serif text-2xl md:text-3xl tracking-tight border-l-[3px] border-crimson pl-4">
              {t('carDetailContent.bookingHeading', tv)}
            </h3>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-5 text-obsidian/80 leading-relaxed text-[15.5px] md:text-base">
              {t('carDetailContent.booking', tv)}
            </p>
          </Reveal>

          {/* Internal links — related services, blog, similar models */}
          <Reveal delay={0.05}>
            <p className="mt-14 eyebrow flex items-center gap-3 text-sand">
              <span className="hairline" />
              {t('carDetailContent.relatedHeading')}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
              <Link to={localizePath('fleet', lang)} className="link-reveal text-obsidian">
                {t('carDetailContent.linkFleet')}
              </Link>
              <Link to={localizePath('chauffeur', lang)} className="link-reveal text-obsidian">
                {t('carDetailContent.linkChauffeur')}
              </Link>
              <Link to={localizePath('weddings', lang)} className="link-reveal text-obsidian">
                {t('carDetailContent.linkWeddings')}
              </Link>
              <Link to={localizePath('contact', lang)} className="link-reveal text-obsidian">
                {t('carDetailContent.linkContact')}
              </Link>
              <Link
                to={localizePath('blogPost', lang, { slug: blogSlug })}
                className="link-reveal text-obsidian"
              >
                {t('carDetailContent.linkBlog')}
              </Link>
            </div>
          </Reveal>

          {similar.length > 0 && (
            <Reveal delay={0.05}>
              <div className="mt-10 border-t border-sand/40 pt-8">
                <p className="eyebrow text-sand">
                  {t('carDetailContent.similarHeading')}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
                  {similar.map((s) => (
                    <Link
                      key={s.id}
                      to={localizePath('carDetail', lang, { id: s.id })}
                      className="link-reveal text-obsidian"
                    >
                      {s.brand} {s.model}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
