import { useTranslation } from 'react-i18next'
import Reveal, { StaggerGroup, staggerItem } from '../components/animations/Reveal'
import { motion } from 'framer-motion'

const points = ['fleet', 'team', 'trust', 'speed']

export default function Why() {
  const { t } = useTranslation()
  return (
    <section className="section bg-pearl text-obsidian">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-20">
          <div className="md:col-span-3">
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="hairline" />
                {t('home.why.eyebrow')}
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="font-serif text-display-md leading-[1.05] text-balance max-w-3xl text-obsidian">
                {t('home.why.title')}
              </h2>
            </Reveal>
          </div>
        </div>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-px bg-sand/60 border border-sand/60">
          {points.map((k, i) => (
            <motion.div
              key={k}
              variants={staggerItem}
              className="group bg-pearl p-10 md:p-14 hover:bg-sand/10 transition-colors duration-700"
            >
              <div className="flex items-baseline gap-6">
                <span className="font-serif text-sand text-3xl md:text-4xl">
                  0{i + 1}
                </span>
                <span className="accent-dot opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              <h3 className="mt-6 font-serif text-2xl md:text-3xl tracking-tight max-w-md text-obsidian">
                {t(`home.why.points.${k}.title`)}
              </h3>
              <p className="mt-5 text-obsidian/75 max-w-md text-[15px] leading-relaxed">
                {t(`home.why.points.${k}.body`)}
              </p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
