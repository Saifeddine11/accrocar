import { useTranslation } from 'react-i18next'
import { useMemo, useState } from 'react'
import Seo from '../components/Seo'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/animations/Reveal'
import { whatsappDisplayNumber, whatsappLink } from '../lib/whatsapp'

function Field({ label, name, type = 'text', as = 'input', required = true, rows = 5 }) {
  const sharedClass =
    'mt-3 w-full bg-transparent border-b border-sand/60 focus:border-crimson py-3 outline-none transition-colors duration-500 font-serif text-xl text-obsidian placeholder:text-obsidian/30 resize-none'
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      {as === 'textarea' ? (
        <textarea name={name} required={required} rows={rows} className={sharedClass} />
      ) : (
        <input name={name} type={type} required={required} className={sharedClass} />
      )}
    </label>
  )
}

export default function Contact() {
  const { t, i18n } = useTranslation()
  const [submitted, setSubmitted] = useState(false)
  const faqRaw = t('contact.faqItems', { returnObjects: true })
  const faqItems = Array.isArray(faqRaw) ? faqRaw : []

  const faqJsonLd = useMemo(() => {
    if (faqItems.length === 0) return null
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    }
  }, [faqItems, i18n.resolvedLanguage])

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    const text = t('contact.whatsappPrefill', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    })
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  return (
    <PageTransition>
      <Seo
        title={t('seo.contact.title')}
        description={t('seo.contact.description')}
        url="https://accrocar.com/contact"
        keywords={t('seo.contact.keywords')}
        jsonLd={faqJsonLd}
      />

      <header className="pt-40 md:pt-52 pb-12 container-editorial">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="hairline" />
            {t('contact.eyebrowPrivately')}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-8 font-serif text-display-xl leading-[0.95]">
            {t('contact.title')}
            <span className="mt-4 block eyebrow text-sand font-sans">
              {t('pagesSeo.contact')}
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 font-serif italic text-2xl md:text-3xl text-obsidian/80 max-w-3xl">
            {t('contact.subtitle')}
          </p>
        </Reveal>
        <Reveal delay={0.28}>
          <p className="mt-8 max-w-3xl text-obsidian/75 leading-relaxed text-[15px]">
            {t('contact.deliveryNote')}
          </p>
        </Reveal>
      </header>

      <section className="section container-editorial pt-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow">{t('contact.eyebrowHouse')}</p>
              <p className="mt-4 font-serif text-2xl">
                Hivernage<br />Marrakech 40000
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-10">
                <p className="eyebrow">{t('contact.eyebrowDirect')}</p>
                <p className="mt-4 font-serif text-2xl">{whatsappDisplayNumber()}</p>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block link-reveal text-crimson"
                >
                  {t('contact.linkWhatsapp')}
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10">
                <p className="eyebrow">Email</p>
                <p className="mt-4 font-serif text-2xl">contact@accrocar.com</p>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            {submitted ? (
              <Reveal>
                <div className="border border-sand/60 p-12 bg-pearl-50">
                  <p className="eyebrow text-crimson">{t('contact.sentEyebrow')}</p>
                  <h2 className="mt-6 font-serif text-display-sm">
                    {t('contact.sentTitle')}
                  </h2>
                </div>
              </Reveal>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Field label={t('contact.name')} name="name" />
                <Field label={t('contact.email')} name="email" type="email" />
                <Field label={t('contact.phone')} name="phone" type="tel" />
                <div className="md:col-span-2">
                  <Field label={t('contact.message')} name="message" as="textarea" />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button type="submit" className="btn-luxe-primary">
                    {t('contact.send')}
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
                      <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {faqItems.length > 0 && (
        <section className="section container-editorial border-t border-sand/60 pt-16 md:pt-24 pb-section">
          <Reveal>
            <p className="eyebrow">{t('contact.faqEyebrow')}</p>
            <h2 className="mt-6 font-serif text-display-sm text-obsidian max-w-2xl">
              {t('contact.faqTitle')}
            </h2>
          </Reveal>
          <dl className="mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-14">
            {faqItems.map((item, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div>
                  <dt className="font-serif text-xl md:text-2xl text-obsidian leading-snug">
                    {item.q}
                  </dt>
                  <dd className="mt-4 text-obsidian/75 leading-relaxed text-[15px]">{item.a}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </section>
      )}
    </PageTransition>
  )
}
