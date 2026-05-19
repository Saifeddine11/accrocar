import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/animations/Reveal'
import FinalCta from '../sections/FinalCta'
import PageContentSections from '../components/PageContentSections'

export default function PrivateChauffeur() {
  const { t } = useTranslation()
  const tiersRaw = t('chauffeurPage.tiers', { returnObjects: true })
  const tiers = Array.isArray(tiersRaw) ? tiersRaw : []

  return (
    <PageTransition>
      <Seo
        title={t('seo.chauffeur.title')}
        description={t('seo.chauffeur.description')}
        url="https://accrocar.com/private-chauffeur"
        keywords={t('seo.chauffeur.keywords')}
      />

      <section className="relative h-[80svh] min-h-[520px] overflow-hidden text-pearl">
        <img
          src="/services/private-chauffeur-luxury-car-morocco.webp"
          alt={t('chauffeurPage.heroAlt')}
          width={1536}
          height={1024}
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 vignette" />
        <div className="relative h-full container-editorial flex flex-col justify-end pb-16 md:pb-24">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-sand">
              <span className="hairline" />
              {t('chauffeurPage.heroEyebrow')}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 font-serif text-display-xl leading-[0.95] text-pearl">
              {t('chauffeur.title')}
              <span className="mt-4 block eyebrow text-sand font-sans">
                {t('pagesSeo.chauffeur')}
              </span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="section container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="hairline" />
                {t('chauffeurPage.standardEyebrow')}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-8 font-serif text-display-md leading-[1.05]">
                {t('chauffeurPage.standardTitle')}
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <p className="text-obsidian/75 text-[16px] leading-[1.85]">
                {t('chauffeurPage.standardBody')}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-px bg-sand/60 border border-sand/60">
          {tiers.map((tier, i) => (
            <Reveal
              key={tier.hours}
              delay={i * 0.1}
              className="bg-pearl-50 p-10 md:p-14"
            >
              <p className="font-serif text-crimson text-5xl md:text-6xl">
                {tier.hours}h
              </p>
              <h3 className="mt-6 font-serif text-2xl md:text-3xl tracking-tight">
                {tier.label}
              </h3>
              <p className="mt-5 text-obsidian/75 leading-relaxed text-[15px]">
                {tier.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <PageContentSections page="chauffeur" />

      <FinalCta />
    </PageTransition>
  )
}
