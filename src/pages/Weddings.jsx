import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/animations/Reveal'
import FinalCta from '../sections/FinalCta'
import PageContentSections from '../components/PageContentSections'

export default function Weddings() {
  const { t } = useTranslation()
  const servicesRaw = t('weddingsPage.services', { returnObjects: true })
  const services = Array.isArray(servicesRaw) ? servicesRaw : []

  return (
    <PageTransition>
      <Seo
        title={t('seo.weddings.title')}
        description={t('seo.weddings.description')}
        url="https://accrocar.com/weddings-events"
        keywords={t('seo.weddings.keywords')}
      />

      <section className="relative h-[88svh] min-h-[560px] overflow-hidden text-pearl">
        <img
          src="/services/weddings-events-luxury-car-marrakech.webp"
          alt={t('weddingsPage.heroAlt')}
          width={1536}
          height={1024}
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 vignette" />
        <div className="relative h-full container-editorial flex flex-col justify-end pb-20 md:pb-28">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-sand">
              <span className="hairline" />
              {t('weddingsPage.heroEyebrow')}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 font-serif text-display-xl leading-[0.95] text-pearl">
              {t('weddings.title')}
              <span className="mt-4 block eyebrow text-sand font-sans">
                {t('pagesSeo.weddings')}
              </span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="section container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {services.map((s) => (
            <Reveal key={s.n} className="border-t border-sand/60 pt-8">
              <p className="font-serif text-crimson text-2xl">{s.n}</p>
              <h3 className="mt-6 font-serif text-2xl md:text-3xl tracking-tight">
                {s.title}
              </h3>
              <p className="mt-5 text-obsidian/75 leading-relaxed text-[15px]">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <PageContentSections page="weddings" />

      <FinalCta />
    </PageTransition>
  )
}
