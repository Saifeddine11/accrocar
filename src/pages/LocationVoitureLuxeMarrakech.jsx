import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Reveal from '../components/animations/Reveal'
import PageTransition from '../components/PageTransition'
import { whatsappLink } from '../lib/whatsapp'

// ── SEO constants ────────────────────────────────────────────────────────────
const PAGE_TITLE =
  'Location Voiture Luxe Marrakech | Livraison VIP | Accrocar'
const PAGE_DESCRIPTION =
  'Louez une voiture de luxe à Marrakech avec Accrocar : Bentley, Range Rover, Porsche, Mercedes. Livraison VIP à votre hôtel, riad ou aéroport. Réservez via WhatsApp.'
const PAGE_URL =
  'https://accrocar.com/location-voiture-luxe-marrakech'
const OG_IMAGE = 'https://accrocar.com/bently.webp'

// ── Structured data ──────────────────────────────────────────────────────────
const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accrocar', item: 'https://accrocar.com/' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Location Voiture Luxe Marrakech',
      item: PAGE_URL,
    },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quels types de voitures proposez-vous à Marrakech ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Accrocar propose une sélection de voitures de prestige : Bentley Bentayga, Range Rover Vogue, Range Rover Sport, Porsche Cayenne, Mercedes-Benz Classe V, BMW 5 Series et bien d'autres. Notre flotte est régulièrement entretenue selon les standards les plus exigeants.',
      },
    },
    {
      '@type': 'Question',
      name: 'Livrez-vous le véhicule directement à l'hôtel ou au riad ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Notre service de livraison VIP couvre Marrakech et ses environs : hôtels, riads, villas privées et aéroport Marrakech Menara. La remise se fait à l'heure convenue, sans file d'attente ni comptoir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Proposez-vous un chauffeur privé à Marrakech ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Accrocar propose un service de chauffeur privé pour vos transferts aéroport, déplacements professionnels ou excursions au Maroc. Nos chauffeurs sont discrets, ponctuels et parfaitement formés.',
      },
    },
    {
      '@type': 'Question',
      name: 'Puis-je réserver une voiture de luxe pour mon mariage à Marrakech ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolument. Nous mettons à disposition nos véhicules d'exception pour mariages, cérémonies et événements privés à Marrakech. Chaque prestation est préparée sur mesure selon le lieu, l'horaire et vos préférences.',
      },
    },
    {
      '@type': 'Question',
      name: 'Dans quelles villes du Maroc livrez-vous vos voitures de luxe ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Accrocar livre partout au Maroc : Marrakech, Casablanca, Agadir, Essaouira, Rabat, Ouarzazate, Fès et d'autres destinations. Contactez-nous pour tout trajet sur mesure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment réserver une voiture de luxe avec Accrocar ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La réservation se fait rapidement via WhatsApp. Précisez le véhicule souhaité, la date et le lieu de remise. Un conseiller vous confirme la disponibilité et les détails dans les plus brefs délais.',
      },
    },
  ],
}

// ── Fleet highlights ─────────────────────────────────────────────────────────
const fleetHighlights = [
  {
    to: '/fleet/bentley-bentayga',
    brand: 'Bentley',
    model: 'Bentayga',
    category: 'Ultra Luxury SUV',
    price: '1 700',
    image: '/cars/bentley-bentayga-location-luxe-marrakech.webp',
    alt: 'Location Bentley Bentayga à Marrakech avec chauffeur et livraison VIP',
  },
  {
    to: '/fleet/range-rover-vogue',
    brand: 'Range Rover',
    model: 'Vogue',
    category: 'Luxury SUV',
    price: '450',
    image: '/cars/range-rover-vogue-location-voiture-luxe-marrakech.webp',
    alt: 'Location Range Rover Vogue de luxe à Marrakech avec Accrocar',
  },
  {
    to: '/fleet/porsche-cayenne',
    brand: 'Porsche',
    model: 'Cayenne',
    category: 'Luxury SUV',
    price: '350',
    image: '/cars/porsche-cayenne-location-voiture-luxe-marrakech.webp',
    alt: 'Location Porsche Cayenne à Marrakech avec livraison VIP Accrocar',
  },
  {
    to: '/fleet/mercedes-benz-v-class',
    brand: 'Mercedes-Benz',
    model: 'Classe V',
    category: 'Luxury Van',
    price: '350',
    image: '/cars/mercedes-benz-v-class-location-vip-marrakech.webp',
    alt: 'Location Mercedes-Benz Classe V pour transferts VIP et événements Marrakech',
  },
]

// ── Occasions ────────────────────────────────────────────────────────────────
const occasions = [
  {
    to: '/private-chauffeur',
    eyebrow: 'Mobilité',
    title: 'Chauffeur privé',
    body: 'Transfert aéroport, réunion d'affaires, excursion vers l'Atlas ou Essaouira. Notre service chauffeur s'adapte à votre programme avec discrétion et ponctualité.',
    cta: 'Voir le service chauffeur',
  },
  {
    to: '/weddings-events',
    eyebrow: 'Cérémonies',
    title: 'Mariage & événements',
    body: 'Votre cérémonie à Marrakech mérite une arrivée à la hauteur de l'occasion. Nous coordonnons chaque détail : véhicule, horaire, lieu de remise, retour.',
    cta: 'Mariage & événements',
  },
  {
    to: '/vip-services',
    eyebrow: 'Sur mesure',
    title: 'Services VIP',
    body: 'Location longue durée, accompagnement de délégation, coordination avec votre concierge ou votre villa. Accrocar s'intègre à votre programme sans friction.',
    cta: 'Découvrir les services VIP',
  },
]

// ── Component ────────────────────────────────────────────────────────────────
export default function LocationVoitureLuxeMarrakech() {
  return (
    <PageTransition>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:locale" content="fr_MA" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* ── 1. SEO Header ───────────────────────────────────────────────── */}
      <section className="bg-obsidian text-pearl pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="container-editorial">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-sand">
              <span className="hairline-on-dark" />
              Marrakech, Maroc
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 font-serif text-display-lg leading-[0.97] text-pearl max-w-4xl">
              Location voiture luxe{' '}
              <span className="italic text-sand">Marrakech</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-8 font-serif text-xl md:text-2xl italic text-pearl/75 max-w-2xl leading-snug">
              À Marrakech, l'expérience commence avant même de prendre le volant.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-6 text-pearl/70 leading-relaxed max-w-xl text-[15px]">
              Accrocar met à votre disposition une sélection exclusive de voitures
              de luxe — Bentley, Range Rover, Porsche, Mercedes — livrées
              directement à votre hôtel, riad, villa ou aéroport. Une remise
              discrète, à l'heure convenue, partout au Maroc.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={whatsappLink(
                  'Bonjour Accrocar, je souhaite louer une voiture de luxe à Marrakech.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxe-on-dark"
              >
                Réserver via WhatsApp
              </a>
              <Link to="/fleet" className="btn-luxe-ghost-on-dark">
                Voir la flotte
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. Pourquoi Accrocar ────────────────────────────────────────── */}
      <section className="bg-pearl py-section">
        <div className="container-editorial">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="hairline" />
              Notre engagement
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 font-serif text-display-sm max-w-2xl leading-tight">
              Pourquoi choisir Accrocar à Marrakech
            </h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {[
              {
                n: '01',
                title: 'Livraison VIP',
                body: 'Nous vous remettons le véhicule là où vous êtes — hôtel, riad, villa, aéroport — à l'heure convenue, sans file d'attente.',
              },
              {
                n: '02',
                title: 'Flotte vérifiée',
                body: 'Chaque voiture est inspectée, préparée et maintenue selon les standards les plus stricts avant chaque remise.',
              },
              {
                n: '03',
                title: 'Chauffeur disponible',
                body: 'Pour vos déplacements professionnels, votre mariage ou vos excursions, notre service chauffeur s'adapte à votre programme.',
              },
              {
                n: '04',
                title: 'Réservation rapide',
                body: 'Une seule messagerie pour confirmer votre voiture, votre date et votre lieu de remise. Disponible 7j/7 via WhatsApp.',
              },
            ].map((item, i) => (
              <Reveal key={item.n} delay={i * 0.07}>
                <div className="border-t border-sand/60 pt-8">
                  <span className="eyebrow text-sand">{item.n}</span>
                  <h3 className="mt-4 font-serif text-xl md:text-2xl tracking-tight text-obsidian">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-obsidian/70 leading-relaxed text-[14.5px]">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Livraison VIP ────────────────────────────────────────────── */}
      <section className="bg-pearl border-t border-sand/40 py-section">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow flex items-center gap-3">
              <span className="hairline" />
              Couverture nationale
            </p>
            <h2 className="mt-6 font-serif text-display-sm leading-tight">
              Livraison VIP partout au Maroc
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 space-y-5 text-obsidian/75 leading-relaxed">
            <p>
              Accrocar livre vos voitures de luxe dans tout le Maroc : Marrakech,
              Casablanca, Agadir, Essaouira, Rabat, Ouarzazate, Fès et d'autres
              destinations sur demande. Que vous séjourniez au Royal Mansour, à la
              Mamounia, dans un riad privé de la Médina ou dans une villa des
              collines de l'Agdal, notre équipe se déplace.
            </p>
            <p>
              Pas de comptoir, pas de file d'attente. Une remise discrète, sur
              mesure, à l'adresse et à l'heure de votre choix. Le retour est
              organisé avec la même rigueur, selon vos contraintes de départ.
            </p>
            <div className="pt-2">
              <Link to="/vip-services" className="link-reveal">
                En savoir plus sur nos services VIP
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 4. Fleet highlights ─────────────────────────────────────────── */}
      <section className="bg-obsidian text-pearl py-section">
        <div className="container-editorial">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-sand">
              <span className="hairline-on-dark" />
              Sélection exclusive
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 font-serif text-display-sm max-w-2xl leading-tight text-pearl">
              Notre flotte de luxe à Marrakech
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fleetHighlights.map((car, i) => (
              <Reveal key={car.to} delay={i * 0.07}>
                <Link
                  to={car.to}
                  className="group block border border-pearl/10 hover:border-sand/50 transition-colors duration-700"
                  aria-label={`Location ${car.brand} ${car.model} à Marrakech`}
                >
                  <div className="aspect-[3/2] overflow-hidden bg-obsidian-900">
                    <img
                      src={car.image}
                      alt={car.alt}
                      width={760}
                      height={507}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                    />
                  </div>
                  <div className="p-5">
                    <p className="eyebrow text-sand">{car.category}</p>
                    <p className="mt-2 font-serif text-lg text-pearl">
                      {car.brand}{' '}
                      <span className="italic">{car.model}</span>
                    </p>
                    <p className="mt-1 text-sand/80 text-[13px] tracking-wide">
                      À partir de {car.price} € / jour
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-12 text-center">
              <Link to="/fleet" className="btn-luxe-ghost-on-dark">
                Voir toute la flotte
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5. Occasions ────────────────────────────────────────────────── */}
      <section className="bg-pearl py-section">
        <div className="container-editorial">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="hairline" />
              Pour chaque occasion
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 font-serif text-display-sm max-w-2xl leading-tight">
              Un service adapté à votre séjour
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {occasions.map((item, i) => (
              <Reveal key={item.to} delay={i * 0.08}>
                <div className="border-t border-sand/60 pt-8 flex flex-col h-full">
                  <p className="eyebrow text-sand">{item.eyebrow}</p>
                  <h3 className="mt-4 font-serif text-xl md:text-2xl tracking-tight text-obsidian">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-obsidian/70 leading-relaxed text-[14.5px] flex-1">
                    {item.body}
                  </p>
                  <div className="mt-6">
                    <Link to={item.to} className="link-reveal">
                      {item.cta}
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ──────────────────────────────────────────────────────── */}
      <section className="bg-pearl border-t border-sand/40 py-section">
        <div className="container-editorial">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="hairline" />
              FAQ
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 font-serif text-display-sm max-w-xl leading-tight">
              Questions fréquentes
            </h2>
          </Reveal>

          <div className="mt-14 max-w-3xl space-y-0 divide-y divide-sand/40">
            {faqSchema.mainEntity.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="py-8">
                  <h3 className="font-serif text-lg md:text-xl text-obsidian tracking-tight">
                    {faq.name}
                  </h3>
                  <p className="mt-3 text-obsidian/70 leading-relaxed text-[14.5px]">
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. WhatsApp CTA ─────────────────────────────────────────────── */}
      <section className="bg-obsidian text-pearl py-section">
        <div className="container-editorial text-center">
          <Reveal>
            <p className="eyebrow flex items-center justify-center gap-3 text-sand">
              <span className="hairline-on-dark" />
              Réservation
              <span className="hairline-on-dark" />
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-serif text-display-sm max-w-xl mx-auto leading-tight text-pearl">
              Réservez en quelques secondes
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 text-pearl/65 max-w-md mx-auto leading-relaxed text-[15px]">
              Précisez le véhicule, la date et le lieu de remise. Un conseiller
              Accrocar vous confirme la disponibilité et les détails sans délai.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={whatsappLink(
                  'Bonjour Accrocar, je souhaite louer une voiture de luxe à Marrakech.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxe-on-dark"
              >
                Réserver via WhatsApp
              </a>
              <Link to="/contact" className="btn-luxe-ghost-on-dark">
                Formulaire de contact
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
