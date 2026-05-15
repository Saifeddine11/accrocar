import { useTranslation } from 'react-i18next'
import Reveal, { RevealLines } from '../components/animations/Reveal'

export default function Intro() {
  const { t } = useTranslation()
  return (
    <section className="bg-pearl text-obsidian pt-12 pb-section md:pt-16">
      <div className="container-editorial grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-3">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="hairline" />
              {t('home.intro.eyebrow')}
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-9">
          <h2 className="font-serif text-display-md text-balance leading-[1.05] max-w-4xl text-obsidian">
            <RevealLines>
              {t('home.intro.title')
                .split('. ')
                .filter(Boolean)
                .map((s, i, a) => (i < a.length - 1 ? s + '.' : s))
                .join('\n')}
            </RevealLines>
          </h2>
          <Reveal delay={0.2} className="mt-12 max-w-2xl">
            <p className="text-obsidian/75 text-[15px] leading-[1.85]">
              {t('home.intro.body')}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
