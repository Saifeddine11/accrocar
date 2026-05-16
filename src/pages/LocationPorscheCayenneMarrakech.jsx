import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Reveal from '../components/animations/Reveal'
import PageTransition from '../components/PageTransition'
import { whatsappLink } from '../lib/whatsapp'

// ── SEO constants ────────────────────────────────────────────────────────────
const PAGE_TITLE = 'Location Porsche Cayenne Marrakech | Accrocar'
const PAGE_DESCRIPTION =
  'Accrocar propose la location du Porsche Cayenne à Marrakech avec livraison VIP. SUV de luxe disponible partout au Maroc dès 350 €/jour. Réservez via WhatsApp.'
const PAGE_URL = 'https://accrocar.com/location-porsche-cayenne-marrakech'
const CAR_IMAGE = 'https://accrocar.com/cars/porsche-cayenne-location-voiture-luxe-marrakech.webp'
const OG_IMAGE = 'https://accrocar.com/bently.webp'

// ── Structured data ──────────────────────────────────────────────────────────
const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Accrocar',
      item: 'https://accrocar.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Location Voiture Luxe Marrakech',
      item: 'https://accrocar.com/location-voiture-luxe-marrakech',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Location Porsche Cayenne Marrakech',
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
      name: 'Combien coûte la location d'un Porsche Cayenne à Marrakech ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La location du Porsche Cayenne avec Accrocar est disponible à partir de 350 € par jour, livraison VIP incluse à Marrakech et dans les principales villes du Maroc. Contactez-nous pour un devis personnalisé selon la durée et le lieu de remise.',
      },
    },
    {
      '@type': 'Question',
      name: 'Livrez-vous le Porsche Cayenne à l'aéroport de Marrakech ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Accrocar assure la livraison et la reprise du Porsche Cayenne directement à l'aéroport Marrakech Menara. Précisez votre numéro de vol et l'heure d'arrivée lors de votre réservation via WhatsApp.',
      },
    },
    {
      '@type': 'Question',
      name: 'Le Porsche Cayenne convient-il aux routes de montagne au Maroc ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Grâce à sa transmission intégrale et ses suspensions adaptatives, le Porsche Cayenne est parfaitement à l'aise sur les routes de l'Atlas, les pistes d'Ouarzazate et les routes côtières vers Essaouira ou Agadir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de personnes peut accueillir le Porsche Cayenne ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le Porsche Cayenne accueille jusqu'à 5 passagers avec un grand coffre. C'est un choix idéal pour les familles, les groupes de voyageurs ou les déplacements avec bagages importants.',
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on bénéficier d'un chauffeur privé avec le Porsche Cayenne ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolument. Accrocar propose un service de chauffeur privé avec le Porsche Cayenne pour vos transferts, excursions ou événements au Maroc. Le chauffeur est formé et discret, disponible selon vos horaires.',
      },
    },
  ],
}

// ── SUV selling points ───────────────────────────────────────────────────────
const points = [
  {
    n: '01',
    title: 'Performance SUV',
    body: 'Le Cayenne allie la puissance d'une sportive à l'espace et au confort d'un SUV. Sur la route de l'aéroport comme sur les routes de l'Atlas, il s'impose avec aisance.',
  },
  {
    n: '02',
    title: 'Intérieur premium',
    body: 'Cuir pleine fleur, tableau de bord Porsche, insonorisation soignée. L'habitacle du Cayenne offre un cocon de silence et de précision, fidèle aux standards de Zuffenhausen.',
  },
  {
    n: '03',
    title: 'Polyvalence totale',
    body: 'Ville, autoroute, montagne. Le Cayenne s'adapte à tous les terrains du Maroc sans compromis. 5 places, grand coffre — idéal en famille ou avec bagages.',
  },
  {
    n: '04',
    title: 'Présence discrète',
    body: 'Le Cayenne impose sans ostentation. Une silhouette reconnaissable, une présence sobre — le choix naturel pour les voyageurs qui préfèrent la qualité à l'excès.',
  },
]

// ── Component ────────────────────────────────────────────────────────────────
export default function LocationPorscheCayenneMarrakech() {
  const waMessage = 'Bonjour Accrocar, je souhaite louer un Porsche Cayenne à Marrakech.'

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
              Porsche — Luxury SUV
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 font-serif text-display-lg leading-[0.97] text-pearl max-w-4xl">
              Location Porsche Cayenne{' '}
              <span className="italic text-sand">à Marrakech</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-8 font-serif text-xl md:text-2xl italic text-pearl/75 max-w-2xl leading-snug">
              La puissance Porsche, livrée à votre porte.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-6 text-pearl/70 leading-relaxed max-w-xl text-[15px]">
              Le Porsche Cayenne réunit deux univers rarement conciliés : les
              sensations d'une voiture de sport et l'espace d'un SUV premium.
              Accrocar vous le remet directement à votre hôtel, riad, villa ou
              aéroport à Marrakech — à partir de 350 € / jour, livraison VIP
              incluse.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={whatsappLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxe-on-dark"
              >
                Réserver via WhatsApp
              </a>
              <Link to="/fleet/porsche-cayenne" className="btn-luxe-ghost-on-dark">
                Fiche détaillée
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. Car image + intro ─────────────────────────────────────────── */}
      <section className="bg-pearl py-section">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Reveal className="lg:col-span-6">
            <div className="aspect-[3/2] overflow-hidden bg-obsidian/5">
              <img
                src="/cars/porsche-cayenne-location-voiture-luxe-marrakech.webp"
                alt="Location Porsche Cayenne de luxe à Marrakech avec livraison VIP au Maroc"
                width={1537}
                height={1023}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-5 lg:col-start-8 space-y-8">
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="hairline" />
                Le véhicule
              </p>
              <h2 className="mt-6 font-serif text-display-sm leading-tight">
                Un SUV taillé pour Marrakech
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-obsidian/70 leading-relaxed text-[15px]">
                À Marrakech, chaque trajet est une expérience. Entre les ruelles
                de la Médina, les boulevards de Guéliz et les routes sinueuses
                qui mènent à l'Atlas, le Porsche Cayenne s'impose comme le
                compagnon idéal. Transmission intégrale, suspensions adaptatives,
                accélération franche — tout pour conduire avec confiance, où que
                vous alliez.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-obsidian/70 leading-relaxed text-[15px]">
                Avec 5 places et un coffre généreux, il convient aussi bien aux
                déplacements professionnels qu'aux sorties en famille ou aux
                excursions vers Essaouira, Agadir ou les gorges du Dadès.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <Link to="/fleet/porsche-cayenne" className="link-reveal">
                Voir la fiche complète du Porsche Cayenne
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 3. 4 selling points ─────────────────────────────────────────── */}
      <section className="bg-pearl border-t border-sand/40 py-section">
        <div className="container-editorial">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="hairline" />
              Caractéristiques
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 font-serif text-display-sm max-w-xl leading-tight">
              Ce qui distingue le Cayenne
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {points.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.07}>
                <div className="border-t border-sand/60 pt-8">
                  <span className="eyebrow text-sand">{p.n}</span>
                  <h3 className="mt-4 font-serif text-xl tracking-tight text-obsidian">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-obsidian/70 leading-relaxed text-[14.5px]">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Livraison VIP ────────────────────────────────────────────── */}
      <section className="bg-obsidian text-pearl py-section">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-sand">
                <span className="hairline-on-dark" />
                Service VIP
              </p>
              <h2 className="mt-6 font-serif text-display-sm leading-tight text-pearl">
                Livré à votre hôtel,{' '}
                <span className="italic">sans détour</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-pearl/70 leading-relaxed text-[15px]">
                Notre équipe se charge de tout. Dès votre confirmation, le Porsche
                Cayenne est préparé, inspecté et acheminé à l'adresse de votre
                choix — Royal Mansour, Mamounia, Villa des Orangers, aéroport
                Menara ou riad privé de la Médina.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-pearl/70 leading-relaxed text-[15px]">
                Le retour est organisé avec la même rigueur. Une seule messagerie
                WhatsApp pour tout coordonner, disponible 7j/7.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <Link to="/vip-services" className="link-reveal text-sand">
                En savoir plus sur nos services VIP
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <ul className="space-y-5 border border-pearl/10 p-8 md:p-10">
              {[
                'Remise directe à votre hôtel ou villa',
                'Livraison à l'aéroport Marrakech Menara',
                'Disponible à Casablanca, Agadir, Essaouira, Rabat',
                'Véhicule inspecté et préparé avant chaque remise',
                'Chauffeur privé disponible sur demande',
                'Réservation rapide via WhatsApp, 7j/7',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 text-pearl/80 text-[14.5px] leading-relaxed"
                >
                  <span className="mt-[6px] flex-shrink-0 h-px w-8 bg-sand/60" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── 5. Use cases ────────────────────────────────────────────────── */}
      <section className="bg-pearl py-section">
        <div className="container-editorial">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="hairline" />
              Pour qui
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 font-serif text-display-sm max-w-2xl leading-tight">
              Qui loue un Porsche Cayenne à Marrakech ?
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {[
              {
                to: '/private-chauffeur',
                eyebrow: 'Voyageurs d'affaires',
                title: 'Déplacement professionnel',
                body: 'Arriver à une réunion ou un événement en Porsche Cayenne, c'est soigner chaque détail de son image. Discret, ponctuel, irréprochable.',
                cta: 'Voir le service chauffeur',
              },
              {
                to: '/fleet',
                eyebrow: 'Familles & groupes',
                title: 'Confort et espace',
                body: '5 places, coffre généreux, habitacle silencieux. Pour les familles en séjour à Marrakech ou les groupes qui souhaitent explorer le Maroc sans compromis.',
                cta: 'Voir toute la flotte',
              },
              {
                to: '/location-voiture-luxe-marrakech',
                eyebrow: 'Explorateurs',
                title: 'Routes du Maroc',
                body: 'Atlas, côte atlantique, Sahara. Le Cayenne est conçu pour l'aventure autant que pour la ville. Un compagnon de route fiable et engageant, quelle que soit la destination.',
                cta: 'Location voiture luxe Marrakech',
              },
            ].map((item, i) => (
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

          <div className="mt-14 max-w-3xl divide-y divide-sand/40">
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
              Réservez votre Porsche Cayenne
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 text-pearl/65 max-w-md mx-auto leading-relaxed text-[15px]">
              Indiquez vos dates et votre lieu de remise. Un conseiller Accrocar
              vous confirme la disponibilité et les détails du véhicule sans délai.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={whatsappLink(waMessage)}
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
          <Reveal delay={0.24}>
            <p className="mt-10 text-pearl/40 text-[12px] tracking-wider uppercase">
              <Link
                to="/location-voiture-luxe-marrakech"
                className="hover:text-sand transition-colors duration-500"
              >
                ← Retour — Location voiture luxe Marrakech
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
