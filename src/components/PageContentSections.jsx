import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Reveal from './animations/Reveal'
import { localizePath } from '../lib/routes'
import { useLang } from '../lib/useLang'

// Shared, lightweight editorial content block for the thin service/fleet pages.
// All copy comes from i18n (pageContent.<page>), so it is fully localized.
// No new routes/images/libraries; internal links point to existing routes only.
export default function PageContentSections({ page }) {
  const { t } = useTranslation()
  const lang = useLang()

  const base = `pageContent.${page}`
  const cases = t(`${base}.cases`, { returnObjects: true })
  const faq = t(`${base}.faq`, { returnObjects: true })
  // Optional second paragraph — only some pages define it (no Fleet bloat).
  const extraP2 = t(`${base}.extraP2`, { defaultValue: '' })

  // Related internal links — existing routes only, excluding the current page.
  const related = [
    { key: 'fleet', to: localizePath('fleet', lang), label: t('carDetailContent.linkFleet') },
    { key: 'vip', to: localizePath('vip', lang), label: t('nav.vip') },
    { key: 'chauffeur', to: localizePath('chauffeur', lang), label: t('carDetailContent.linkChauffeur') },
    { key: 'weddings', to: localizePath('weddings', lang), label: t('carDetailContent.linkWeddings') },
    { key: 'contact', to: localizePath('contact', lang), label: t('carDetailContent.linkContact') },
    {
      key: 'blog',
      to: localizePath('blogPost', lang, { slug: 'location-voiture-luxe-marrakech-guide' }),
      label: t('carDetailContent.linkBlog'),
    },
  ].filter((l) => l.key !== page)

  const H3 = ({ children }) => (
    <Reveal delay={0.05}>
      <h3 className="mt-12 font-serif text-2xl md:text-3xl tracking-tight border-l-[3px] border-crimson pl-4">
        {children}
      </h3>
    </Reveal>
  )
  const P = ({ children }) => (
    <Reveal delay={0.05}>
      <p className="mt-5 text-obsidian/80 leading-relaxed text-[15.5px] md:text-base">
        {children}
      </p>
    </Reveal>
  )

  return (
    <section className="section bg-pearl text-obsidian border-t border-sand/40">
      <div className="container-editorial max-w-3xl">
        <Reveal>
          <h2 className="font-serif text-display-sm leading-tight">
            {t(`${base}.introH`)}
          </h2>
        </Reveal>
        <P>{t(`${base}.introP`)}</P>

        <H3>{t(`${base}.casesH`)}</H3>
        <Reveal delay={0.05}>
          <ul className="mt-5 space-y-2.5">
            {(Array.isArray(cases) ? cases : []).map((item) => (
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

        <H3>{t(`${base}.threeH`)}</H3>
        <P>{t(`${base}.threeP`)}</P>

        <H3>{t(`${base}.bookingH`)}</H3>
        <P>{t(`${base}.bookingP`)}</P>

        <P>{t(`${base}.extraP`)}</P>

        <H3>{t(`${base}.faqH`)}</H3>
        <div className="mt-5 divide-y divide-sand/40 border-t border-sand/40">
          {(Array.isArray(faq) ? faq : []).map((item) => (
            <Reveal key={item.q} delay={0.04}>
              <div className="py-5">
                <h4 className="font-serif text-lg md:text-xl text-obsidian">
                  {item.q}
                </h4>
                <p className="mt-2 text-obsidian/75 leading-relaxed text-[15px]">
                  {item.a}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {extraP2 ? <P>{extraP2}</P> : null}

        <Reveal delay={0.05}>
          <p className="mt-14 eyebrow flex items-center gap-3 text-sand">
            <span className="hairline" />
            {t('carDetailContent.relatedHeading')}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
            {related.map((l) => (
              <Link key={l.key} to={l.to} className="link-reveal text-obsidian">
                {l.label}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
