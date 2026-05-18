import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Reveal from './animations/Reveal'
import { INSTAGRAM_URL, whatsappDisplayNumber, whatsappLink } from '../lib/whatsapp'
import { localizePath } from '../lib/routes'
import { useLang } from '../lib/useLang'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  const lang = useLang()
  const p = (key) => localizePath(key, lang)

  return (
    <footer className="relative bg-pearl text-obsidian border-t border-sand/60">
      <div className="container-editorial py-section">
        <Reveal>
          <h2 className="font-serif text-display-md tracking-tight max-w-3xl text-obsidian">
            {t('footer.heroPrefix')}{' '}
            <span className="italic text-crimson">{t('footer.heroAccent')}</span>
            {t('footer.heroSuffix')}
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="eyebrow">Accrocar</p>
            <p className="mt-6 text-obsidian/75 leading-relaxed max-w-md">
              {t('footer.tagline')}.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow">{t('footer.menu')}</p>
            <ul className="mt-6 space-y-3 text-obsidian/85">
              <li>
                <Link to={p('fleet')} className="link-reveal">
                  {t('nav.fleet')}
                </Link>
              </li>
              <li>
                <Link to={p('vip')} className="link-reveal">
                  {t('nav.vip')}
                </Link>
              </li>
              <li>
                <Link to={p('chauffeur')} className="link-reveal">
                  {t('nav.chauffeur')}
                </Link>
              </li>
              <li>
                <Link to={p('weddings')} className="link-reveal">
                  {t('nav.weddings')}
                </Link>
              </li>
              <li>
                <Link to={p('about')} className="link-reveal">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to={p('blog')} className="link-reveal">
                  {t('footer.journal')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow">{t('footer.contact')}</p>
            {/* NAP — Name / Address / Phone for local SEO */}
            <address
              className="mt-6 not-italic"
              itemScope
              itemType="https://schema.org/AutoRental"
            >
              <meta itemProp="name" content="Accrocar" />
              <ul className="space-y-3 text-obsidian/85">
                <li
                  itemProp="address"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
                  <span itemProp="addressLocality">Marrakech</span>
                  {', '}
                  <span itemProp="addressCountry">Morocco</span>
                </li>
                <li>
                  <a
                    href="tel:+212713155350"
                    className="link-reveal"
                    itemProp="telephone"
                  >
                    {whatsappDisplayNumber()}
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@accrocar.com"
                    className="link-reveal"
                    itemProp="email"
                  >
                    contact@accrocar.com
                  </a>
                </li>
              </ul>
            </address>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow">{t('footer.follow')}</p>
            <ul className="mt-6 space-y-3 text-obsidian/85">
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="link-reveal">
                  Instagram
                </a>
              </li>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="link-reveal">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 h-px w-full bg-sand/60" />
        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sand-600 text-[11px] tracking-luxe uppercase">
          <span>© {year} Accrocar. {t('footer.rights')}.</span>
          <span>{t('footer.madeIn')}</span>
        </div>
      </div>
    </footer>
  )
}
