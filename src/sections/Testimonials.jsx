import { useTranslation } from 'react-i18next'
import Reveal, { StaggerGroup, staggerItem } from '../components/animations/Reveal'
import { motion } from 'framer-motion'

const quotes = [
  {
    quote:
      "An impeccable house. The Cullinan was waiting before our jet had stopped taxiing — keys handed over with two words. Exactly as it should be.",
    name: 'M.A.',
    title: 'Founder, London',
  },
  {
    quote:
      'I have rented in Monaco, in St-Tropez, in Dubai. Accrocar is the only house in Marrakech that operates at that standard.',
    name: 'C. de V.',
    title: 'Editor, Paris',
  },
  {
    quote:
      'Discreet, exact, fast. Three things I value above all. Used Accrocar twice this season and we will use them again.',
    name: 'H.S.',
    title: 'Private Office, Riyadh',
  },
]

export default function Testimonials() {
  const { t } = useTranslation()
  return (
    <section className="section bg-pearl text-obsidian border-t border-sand/60">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16 md:mb-20">
          <div className="md:col-span-3">
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="hairline" />
                {t('home.testimonials.eyebrow')}
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="font-serif text-display-md leading-[1.05] text-obsidian">
                {t('home.testimonials.title')}
              </h2>
            </Reveal>
          </div>
        </div>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          {quotes.map((q, i) => (
            <motion.figure
              key={i}
              variants={staggerItem}
              className="border-t border-sand/60 pt-8"
            >
              <span className="block font-serif text-crimson text-5xl leading-none">
                “
              </span>
              <blockquote className="mt-4 font-serif text-xl md:text-2xl leading-snug text-obsidian">
                {q.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3 text-sand-600 text-[11px] tracking-luxe uppercase">
                <span>{q.name}</span>
                <span className="block w-6 h-px bg-sand" />
                <span>{q.title}</span>
              </figcaption>
            </motion.figure>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
