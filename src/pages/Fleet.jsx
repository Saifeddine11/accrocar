import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/animations/Reveal'
import FleetLuxeSelect from '../components/FleetLuxeSelect'
import { cars } from '../data/cars'
import { localizePath } from '../lib/routes'
import { useLang } from '../lib/useLang'
import {
  FLEET_FILTER_BRAND_VALUES,
  FLEET_FILTER_CATEGORY_SLUGS,
} from '../data/fleetFilters'

const ease = [0.16, 1, 0.3, 1]

function FleetCardMedia({ car }) {
  if (car.image) {
    return (
      <motion.img
        src={car.image}
        alt={car.altText || `${car.brand} ${car.model}`}
        width={car.imageWidth}
        height={car.imageHeight}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
      />
    )
  }
  return (
    <div
      className="absolute inset-0 h-full w-full bg-gradient-to-br from-pearl-200 via-pearl to-obsidian/[0.06]"
      role="img"
      aria-label={`${car.brand} ${car.model}`}
    />
  )
}

export default function Fleet() {
  const { t, i18n } = useTranslation()
  const lang = useLang()
  const [brandFilter, setBrandFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [priceSort, setPriceSort] = useState('default')
  const [openFilter, setOpenFilter] = useState(null)

  const brandOptions = useMemo(
    () => [
      { value: 'all', label: t('fleet.allBrands') },
      ...FLEET_FILTER_BRAND_VALUES.map((b) => ({ value: b, label: b })),
    ],
    [t],
  )

  const categoryOptions = useMemo(
    () => [
      { value: 'all', label: t('fleet.allCategories') },
      ...FLEET_FILTER_CATEGORY_SLUGS.map((slug) => ({
        value: slug,
        label: t(`fleet.categoryLabels.${slug}`),
      })),
    ],
    [t],
  )

  const priceOptions = useMemo(
    () => [
      { value: 'default', label: t('fleet.sortDefault') },
      { value: 'asc', label: t('fleet.sortPriceAsc') },
      { value: 'desc', label: t('fleet.sortPriceDesc') },
    ],
    [t],
  )

  const visible = useMemo(() => {
    let list = cars.filter(
      (c) =>
        (brandFilter === 'all' || c.brand === brandFilter) &&
        (categoryFilter === 'all' || c.category === categoryFilter),
    )
    if (priceSort === 'asc') {
      list = [...list].sort((a, b) => a.pricePerDay - b.pricePerDay)
    } else if (priceSort === 'desc') {
      list = [...list].sort((a, b) => b.pricePerDay - a.pricePerDay)
    }
    return list
  }, [brandFilter, categoryFilter, priceSort])

  const filterKey = `${brandFilter}-${categoryFilter}-${priceSort}`

  const setBrandOpen = (open) => setOpenFilter(open ? 'brand' : null)
  const setCategoryOpen = (open) => setOpenFilter(open ? 'category' : null)
  const setPriceOpen = (open) => setOpenFilter(open ? 'price' : null)

  return (
    <PageTransition>
      <Seo
        title={t('seo.fleet.title')}
        description={t('seo.fleet.description')}
        url="https://accrocar.com/fleet"
        keywords={t('seo.fleet.keywords')}
      />

      <header className="container-editorial bg-pearl pb-12 pt-40 text-obsidian md:pb-16 md:pt-48">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="hairline" />
            {t('fleet.heroEyebrow')}
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          <h1 className="font-serif text-display-xl leading-[0.95] text-obsidian">
            {t('fleet.title')}
          </h1>
        </Reveal>
        <Reveal delay={0.2} className="mt-8 max-w-xl">
          <p className="font-serif text-2xl italic text-obsidian/80 md:text-3xl">
            {t('fleet.subtitle')}
          </p>
        </Reveal>

        <Reveal delay={0.25} className="mt-10 md:mt-12">
          <div className="border-t border-sand/30 pt-6 md:pt-7">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-4 lg:gap-6">
              <FleetLuxeSelect
                id="fleet-filter-brand"
                label={t('fleet.filterBrands')}
                value={brandFilter}
                onChange={setBrandFilter}
                options={brandOptions}
                isOpen={openFilter === 'brand'}
                onOpenChange={setBrandOpen}
              />
              <FleetLuxeSelect
                id="fleet-filter-category"
                label={t('fleet.filterCategories')}
                value={categoryFilter}
                onChange={setCategoryFilter}
                options={categoryOptions}
                isOpen={openFilter === 'category'}
                onOpenChange={setCategoryOpen}
              />
              <FleetLuxeSelect
                id="fleet-filter-price"
                label={t('fleet.filterPrice')}
                value={priceSort}
                onChange={setPriceSort}
                options={priceOptions}
                isOpen={openFilter === 'price'}
                onOpenChange={setPriceOpen}
              />
            </div>
          </div>
        </Reveal>
      </header>

      <section className="container-editorial pb-section">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={filterKey}
            layout
            className="grid auto-rows-fr grid-cols-1 gap-8 md:grid-cols-2 lg:gap-x-10 lg:gap-y-20"
          >
            {visible.map((car, i) => (
              <motion.article
                key={car.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease, delay: i * 0.05 }}
                className="h-full"
              >
                <Link
                  to={localizePath('carDetail', lang, { id: car.id })}
                  className="group flex h-full flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-pearl-200">
                    <FleetCardMedia car={car} />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-transparent transition-colors duration-700 group-hover:ring-sand/60" />
                  </div>

                  <div className="mt-6 flex flex-1 flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                    <div className="min-w-0">
                      <p className="eyebrow text-sand-600">{car.brand}</p>
                      <h2 className="mt-3 font-serif text-2xl tracking-tight text-obsidian transition-colors duration-500 group-hover:text-crimson md:text-3xl">
                        {car.model}
                      </h2>
                      <p className="mt-2 text-[11px] uppercase tracking-luxe text-sand-600">
                        {car.categoryLabel}
                      </p>
                    </div>
                    <p className="shrink-0 whitespace-nowrap font-serif text-lg text-crimson md:text-xl">
                      {t('common.priceFromDay', {
                        price: car.pricePerDay.toLocaleString(
                          i18n.language === 'en' ? 'en-GB' : i18n.language,
                        ),
                      })}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </PageTransition>
  )
}
