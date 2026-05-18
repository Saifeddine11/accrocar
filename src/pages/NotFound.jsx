import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import Reveal from '../components/animations/Reveal'
import { localizePath } from '../lib/routes'
import { useLang } from '../lib/useLang'

export default function NotFound() {
  const { t } = useTranslation()
  const lang = useLang()

  return (
    <>
      <Helmet>
        <title>{t('notFound.pageTitle')}</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section className="relative bg-obsidian min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover opacity-[0.06]"
          style={{ backgroundImage: "url('/experience/accrocar-experience-location-voiture-luxe-marrakech.webp')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 to-obsidian" aria-hidden="true" />

        <div className="relative text-center px-6 py-24">
          <Reveal>
            <p className="font-serif text-[10rem] md:text-[14rem] leading-none text-pearl/5 select-none" aria-hidden="true">
              404
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="eyebrow text-sand -mt-8 mb-6">{t('notFound.eyebrow')}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-serif text-3xl md:text-4xl text-pearl max-w-lg mx-auto leading-tight">
              {t('notFound.heading')}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-pearl/50 text-[15px] max-w-sm mx-auto leading-relaxed">
              {t('notFound.description')}
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to={localizePath('home', lang)} className="btn-luxe">{t('notFound.backHome')}</Link>
              <Link to={localizePath('fleet', lang)} className="btn-luxe-ghost-on-dark">{t('notFound.viewFleet')}</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
