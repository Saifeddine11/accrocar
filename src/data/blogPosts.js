// ── Accrocar Blog — Article data ─────────────────────────────────────────────
// published: true  → live on /blog and /blog/:slug
// published: false → draft, slug reserved, not rendered
// ─────────────────────────────────────────────────────────────────────────────

const rawPosts = [

  // ══════════════════════════════════════════════════════════════════════════
  // ARTICLE 1 — Guide complet location voiture luxe Marrakech
  // Target: "location voiture luxe Marrakech"
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'location-voiture-luxe-marrakech-guide',
    title: 'Location voiture luxe Marrakech : le guide complet',
    seoTitle: 'Location Voiture Luxe Marrakech : Guide Complet | Accrocar',
    metaDescription:
      "Tout ce qu'il faut savoir pour louer une voiture de luxe à Marrakech : choix du véhicule, livraison VIP, chauffeur privé, mariage, tarifs. Guide Accrocar 2025.",
    excerpt:
      "Bentley, Range Rover, Porsche ou Mercedes — comment choisir, réserver et recevoir votre voiture de luxe à Marrakech. Le guide complet Accrocar.",
    category: 'Guide Marrakech',
    date: '2025-05-16',
    updatedAt: '2025-05-16',
    author: 'Accrocar',
    readingTime: 7,
    featured: true,
    published: true,
    image: '/cars/bentley-bentayga-location-luxe-marrakech.webp',
    imageWidth: 1537,
    imageHeight: 1023,
    imageAlt: 'Location Bentley Bentayga de luxe à Marrakech avec livraison VIP — Accrocar',
    keywords: [
      'location voiture luxe Marrakech',
      'location voiture prestige Marrakech',
      'voiture luxe Marrakech',
      'location voiture Marrakech',
    ],
    content: [
      {
        type: 'paragraph',
        text: "Marrakech concentre tout ce qu'une destination peut offrir : culture millénaire, palaces de légende, routes de montagne, cuisine d'exception. Mais une expérience véritablement premium passe aussi par le véhicule que vous choisissez. Accrocar s'est construit autour d'une idée simple — remettre le bon véhicule à la bonne personne, au bon endroit et à la bonne heure, sans friction, sans comptoir d'agence, sans attente. Ce guide vous donne toutes les clés pour louer une voiture de luxe à Marrakech dans les meilleures conditions.",
      },
      {
        type: 'h2',
        text: 'Pourquoi louer une voiture de luxe à Marrakech ?',
      },
      {
        type: 'paragraph',
        text: "Marrakech n'est pas une ville qui se vit passivement. Entre la Médina et ses ruelles, les boulevards de Guéliz, les palaces des collines de l'Agdal et les routes qui filent vers l'Atlas ou Essaouira, les distances sont plus importantes qu'on ne l'imagine. Un taxi peut suffire pour un trajet isolé. Mais pour un séjour qui allie liberté, confort et image, une voiture de luxe à votre disposition change fondamentalement l'expérience.",
      },
      {
        type: 'paragraph',
        text: "Arriver à La Mamounia au volant d'un Range Rover Vogue, prendre la route de l'Ourika en Porsche Cayenne, ou offrir à vos proches une arrivée en Bentley Bentayga le jour de votre mariage — ce sont des détails qui comptent quand chaque moment du voyage a été pensé avec soin.",
      },
      {
        type: 'image',
        src: '/cars/range-rover-vogue-location-voiture-luxe-marrakech.webp',
        alt: 'Location Range Rover Vogue de luxe à Marrakech avec livraison VIP — Accrocar',
        width: 1537,
        height: 1023,
      },
      {
        type: 'h2',
        text: 'Quelle voiture de luxe choisir à Marrakech ?',
      },
      {
        type: 'paragraph',
        text: "La flotte Accrocar couvre un spectre large, des SUV ultra-luxe aux berlines premium. Le choix dépend de votre usage, de votre nombre de passagers et de l'image que vous souhaitez projeter.",
      },
      {
        type: 'list',
        items: [
          "Bentley Bentayga — L'ultra-luxe absolu. Pour un mariage, une arrivée dans un palace ou l'exigence du summum. À partir de 1 700 € / jour.",
          "Range Rover Vogue — L'équilibre entre représentation et polyvalence. Routes de montagne, 5 passagers en grand confort, image sobre et forte. À partir de 450 € / jour.",
          "Porsche Cayenne — Performance et espace sans compromis. Idéal pour les excursions, les déplacements professionnels ou les voyageurs qui aiment conduire. À partir de 350 € / jour.",
          "Mercedes-Benz Classe V — Le luxe pour les groupes. 7 à 8 places en configuration premium, parfait pour les familles ou les délégations. À partir de 350 € / jour.",
          "Range Rover Sport Autobiography — Le compromis terrain / luxe pour les explorations au Maroc. À partir de 500 € / jour.",
        ],
      },
      {
        type: 'h2',
        text: 'La livraison VIP : une remise sans comptoir',
      },
      {
        type: 'paragraph',
        text: "Le service Accrocar ne commence pas à l'agence — il n'y a pas d'agence. Vous confirmez votre réservation via WhatsApp, vous précisez l'adresse et l'heure, et votre voiture arrive. Royal Mansour, La Mamounia, Villa des Orangers, un riad de la Médina, une villa privée de l'Agdal, l'aéroport Marrakech Menara : notre équipe livre votre véhicule à l'adresse de votre choix, dans toute la ville. La remise prend quelques minutes — un contrôle rapide, les clés, et vous partez.",
      },
      {
        type: 'paragraph',
        text: "Nous couvrons également les principales villes du Maroc : Casablanca, Agadir, Essaouira, Rabat, Ouarzazate, Fès et d'autres destinations sur demande. Un seul interlocuteur, une seule messagerie, toutes les villes. Le retour est organisé avec la même rigueur, selon vos contraintes de départ.",
      },
      {
        type: 'pullquote',
        text: "Pas de comptoir d'agence, pas de file d'attente. Votre voiture de luxe vous attend là où vous êtes.",
      },
      {
        type: 'h2',
        text: 'Chauffeur privé ou conduite autonome ?',
      },
      {
        type: 'paragraph',
        text: "Accrocar propose les deux formules. Si vous souhaitez conduire vous-même, votre véhicule est livré avec le plein, inspecté et prêt. Si vous préférez déléguer le volant, un chauffeur professionnel, discret et ponctuel, est disponible pour la durée de votre choix — une heure, une journée, une semaine.",
      },
      {
        type: 'paragraph',
        text: "Le service chauffeur est particulièrement apprécié pour les transferts aéroport, les rendez-vous professionnels, les dîners en soirée ou les excursions d'une journée vers l'Atlas, Essaouira ou l'Agafay. Le chauffeur connaît les routes, les adresses et les usages — un atout précieux à Marrakech.",
      },
      {
        type: 'cta',
        label: 'Réserver via WhatsApp',
        href: 'whatsapp',
        message: 'Bonjour Accrocar, je souhaite louer une voiture de luxe à Marrakech.',
        variant: 'primary',
      },
      {
        type: 'h2',
        text: 'Location de luxe pour un mariage à Marrakech',
      },
      {
        type: 'paragraph',
        text: "Marrakech est l'une des grandes destinations mondiales pour les mariages et événements de prestige. Des centaines de cérémonies y sont organisées chaque année dans des palais, des riads, des domaines de l'Agafay ou des villas privées. Accrocar accompagne ces moments avec des véhicules préparés à la hauteur de l'occasion.",
      },
      {
        type: 'paragraph',
        text: "Bentley Bentayga, Range Rover Vogue, Range Rover Sport Autobiography : nos véhicules sont disponibles à l'unité ou en convoi, avec ou sans chauffeur, selon vos horaires et votre programme. Chaque prestation est coordonnée en détail pour garantir une arrivée impeccable au bon endroit, à la bonne heure.",
      },
      {
        type: 'cta',
        label: 'Mariages & événements',
        to: '/weddings-events',
        variant: 'secondary',
      },
      {
        type: 'h2',
        text: 'Comment réserver et quels sont les tarifs ?',
      },
      {
        type: 'paragraph',
        text: "Les tarifs Accrocar s'entendent livraison incluse, pour une durée à la journée ou à la semaine. Il n'y a pas de frais cachés ni de supplément de livraison en ville. La réservation se fait en quelques minutes via WhatsApp : précisez le modèle souhaité, la date de prise en charge, l'adresse et la durée estimée. Un conseiller vous confirme la disponibilité sous peu.",
      },
      {
        type: 'cta',
        label: 'Voir toute la flotte',
        to: '/fleet',
        variant: 'secondary',
      },
    ],
    faq: [
      {
        question: "Quel est le prix d'une location voiture de luxe à Marrakech ?",
        answer:
          "Les tarifs Accrocar débutent à 350 € / jour pour un Porsche Cayenne ou une Mercedes-Benz Classe V, et atteignent 1 700 € / jour pour un Bentley Bentayga. La livraison VIP est toujours incluse dans le prix, sans frais supplémentaires.",
      },
      {
        question: "Livrez-vous à l'aéroport Marrakech Menara ?",
        answer:
          "Oui. Accrocar assure la remise et la reprise de vos véhicules directement à l'aéroport Marrakech Menara. Précisez votre numéro de vol et votre heure d'arrivée lors de votre réservation.",
      },
      {
        question: "Peut-on louer une voiture de luxe pour un mariage à Marrakech ?",
        answer:
          "Absolument. Nous mettons à disposition des véhicules d'exception pour mariages, cérémonies et événements privés à Marrakech. Chaque prestation est coordonnée selon votre programme, votre lieu de réception et vos horaires.",
      },
      {
        question: "Proposez-vous un chauffeur privé à Marrakech ?",
        answer:
          "Oui. Un service de chauffeur professionnel est disponible pour tous vos trajets — transferts aéroport, déplacements d'affaires, excursions ou événements. Les chauffeurs sont discrets, ponctuels et parfaitement formés.",
      },
      {
        question: "Dans quelles villes du Maroc livrez-vous vos voitures de luxe ?",
        answer:
          "Accrocar livre partout au Maroc : Marrakech, Casablanca, Agadir, Essaouira, Rabat, Ouarzazate, Fès et d'autres destinations sur demande. Contactez-nous pour tout trajet ou livraison sur mesure.",
      },
    ],
    relatedCars: ['bentley-bentayga', 'range-rover-vogue', 'porsche-cayenne', 'mercedes-benz-v-class'],
    relatedSlugs: ['quelle-voiture-luxe-choisir-marrakech', 'location-porsche-cayenne-marrakech'],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ARTICLE 2 — Quelle voiture luxe choisir Marrakech
  // Target: "voiture luxe Marrakech"
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'quelle-voiture-luxe-choisir-marrakech',
    title: 'Quelle voiture de luxe choisir à Marrakech ?',
    seoTitle: 'Quelle Voiture de Luxe Choisir à Marrakech ? | Accrocar',
    metaDescription:
      "Bentley Bentayga, Range Rover Vogue, Porsche Cayenne ou Mercedes Classe V : comparatif complet pour choisir votre voiture de luxe à Marrakech selon votre usage.",
    excerpt:
      "Mariage, excursion dans l'Atlas, déplacement professionnel ou séjour en famille — chaque usage a son véhicule idéal. Comparatif complet de la flotte Accrocar.",
    category: 'Flotte',
    date: '2025-05-16',
    updatedAt: '2025-05-16',
    author: 'Accrocar',
    readingTime: 6,
    featured: false,
    published: true,
    image: '/cars/range-rover-vogue-location-voiture-luxe-marrakech.webp',
    imageWidth: 1537,
    imageHeight: 1023,
    imageAlt: 'Location Range Rover Vogue de luxe à Marrakech — comparatif flotte Accrocar',
    keywords: [
      'voiture luxe Marrakech',
      'quelle voiture louer Marrakech',
      'comparatif voiture luxe Marrakech',
      'location voiture prestige Marrakech',
    ],
    content: [
      {
        type: 'paragraph',
        text: "Bentley, Range Rover, Porsche, Mercedes — chaque marque porte une promesse différente. À Marrakech, le choix dépend moins du prestige de la plaque que de ce que vous comptez faire avec le véhicule. Arrivée dans un palace, excursion dans l'Atlas, mariage dans un riad, déplacement professionnel, semaine en famille — chaque usage a son véhicule idéal. Ce guide vous aide à choisir avec précision.",
      },
      {
        type: 'h2',
        text: "Bentley Bentayga — l'expérience ultra-luxe",
      },
      {
        type: 'paragraph',
        text: "Le Bentley Bentayga est dans une catégorie à part. Il ne s'agit pas seulement d'un SUV premium — c'est une déclaration. Cuirs grainés à la main, finitions bois véritable, insonorisation de chambre d'hôtel, tableau de bord d'une précision horlogère : chaque détail est pensé pour l'occupant, pas seulement le conducteur. Pour un mariage à Marrakech, une arrivée à La Mamounia ou au Royal Mansour, le Bentayga s'impose naturellement.",
      },
      {
        type: 'paragraph',
        text: "Il gère aussi parfaitement les routes de montagne : sa transmission intégrale et ses suspensions pneumatiques adaptatives en font un compagnon à l'aise partout, malgré son gabarit imposant. À partir de 1 700 € / jour, livraison VIP incluse.",
      },
      {
        type: 'h2',
        text: 'Range Rover Vogue — le luxe discret et polyvalent',
      },
      {
        type: 'paragraph',
        text: "Le Range Rover Vogue est le choix de ceux qui n'ont pas besoin d'afficher. Reconnaissable sans être ostentatoire, confortable sans être clinquant, il représente l'équilibre parfait entre image et sobriété. À Marrakech, il passe partout : de la Médina aux routes de l'Atlas, des boulevards de Guéliz aux pistes de l'Agafay.",
      },
      {
        type: 'paragraph',
        text: "Cinq places en configuration grand confort, coffre généreux, technologie embarquée discrète. Pour un séjour en famille, un déplacement professionnel ou une semaine de découverte du Maroc, le Vogue reste notre recommandation principale. À partir de 450 € / jour, livraison VIP incluse.",
      },
      {
        type: 'image',
        src: '/cars/range-rover-sport-location-voiture-luxe-marrakech.webp',
        alt: 'Location Range Rover Sport de luxe pour excursion Marrakech — Accrocar',
        width: 1537,
        height: 1023,
      },
      {
        type: 'h2',
        text: 'Porsche Cayenne — la performance au service du confort',
      },
      {
        type: 'paragraph',
        text: "Le Porsche Cayenne occupe une position unique : il a les performances d'une voiture de sport et l'espace d'un SUV familial. Sur la route de l'Ourika ou vers les gorges du Dadès, ses accélérations sont franches et sa tenue de route impeccable. En ville, il s'impose naturellement sans effort.",
      },
      {
        type: 'paragraph',
        text: "Pour un voyageur qui veut conduire — et pas seulement être conduit — le Cayenne est le choix évident. Son intérieur en cuir premium, sa chaîne audio Bose et son tableau de bord Porsche font de chaque trajet une expérience. À partir de 350 € / jour, livraison VIP incluse.",
      },
      {
        type: 'image',
        src: '/cars/porsche-cayenne-location-voiture-luxe-marrakech.webp',
        alt: 'Location Porsche Cayenne premium à Marrakech avec livraison VIP — Accrocar',
        width: 1537,
        height: 1023,
      },
      {
        type: 'h2',
        text: 'Mercedes-Benz Classe V — le luxe pour les groupes',
      },
      {
        type: 'paragraph',
        text: "Pour cinq à sept passagers, le Mercedes-Benz Classe V redéfinit le transport de groupe. Ce n'est pas une minivan — c'est un espace de voyage configuré en salon roulant : sièges en cuir, finitions premium, espace généreux pour les bagages. Utilisé par les délégations, les familles, les équipes ou les groupes de voyageurs exigeants, il est aussi disponible avec chauffeur privé.",
      },
      {
        type: 'paragraph',
        text: "Pour un transfert depuis l'aéroport Menara avec un groupe, pour une excursion collective ou pour un événement nécessitant plusieurs véhicules, le Classe V est la solution la plus élégante disponible au Maroc. À partir de 350 € / jour, livraison VIP incluse.",
      },
      {
        type: 'h2',
        text: 'Choisir selon votre programme à Marrakech',
      },
      {
        type: 'paragraph',
        text: "Voici comment orienter votre décision en fonction de votre type de séjour :",
      },
      {
        type: 'list',
        items: [
          "Mariage ou événement de prestige → Bentley Bentayga, avec chauffeur de préférence",
          "Séjour en couple ou famille, routes variées → Range Rover Vogue",
          "Excursions montagne, conduite plaisir → Porsche Cayenne",
          "Groupe de 5 à 7 personnes, délégation → Mercedes-Benz Classe V",
          "Exploration Maroc sur plusieurs jours → Range Rover Sport Autobiography",
          "Budget optimisé avec style → BMW 5 Série ou Volkswagen Touareg",
        ],
      },
      {
        type: 'cta',
        label: 'Réserver via WhatsApp',
        href: 'whatsapp',
        message: 'Bonjour Accrocar, je souhaite choisir une voiture de luxe pour mon séjour à Marrakech.',
        variant: 'primary',
      },
      {
        type: 'h2',
        text: 'Réservation et livraison à Marrakech',
      },
      {
        type: 'paragraph',
        text: "Tous ces véhicules sont disponibles avec livraison directe à votre hôtel, riad, villa ou aéroport à Marrakech. Accrocar ne dispose pas d'agence physique — la remise se fait à l'adresse de votre choix, à l'heure convenue, sans file d'attente. Un seul interlocuteur via WhatsApp pour confirmer votre véhicule, votre date et votre lieu. Disponible 7j/7, en français, en anglais et en arabe.",
      },
      {
        type: 'cta',
        label: 'Explorer toute la flotte',
        to: '/fleet',
        variant: 'secondary',
      },
    ],
    faq: [
      {
        question: "Quelle est la meilleure voiture de luxe pour un séjour à Marrakech ?",
        answer:
          "Cela dépend de votre programme. Pour un mariage ou un événement de prestige, le Bentley Bentayga est inégalable. Pour un séjour polyvalent en couple ou en famille, le Range Rover Vogue est notre recommandation principale. Pour la conduite plaisir et les excursions, le Porsche Cayenne.",
      },
      {
        question: "Range Rover ou Porsche Cayenne pour Marrakech ?",
        answer:
          "Les deux sont excellents. Le Range Rover Vogue offre plus de hauteur de caisse et de visibilité sur les routes de montagne. Le Porsche Cayenne est plus dynamique et engagé. Si vous aimez conduire et ressentir le moteur, choisissez le Cayenne. Si vous cherchez un confort absolu sans effort, le Vogue.",
      },
      {
        question: "Quelle voiture de luxe pour un mariage à Marrakech ?",
        answer:
          "Le Bentley Bentayga est le choix naturel pour un mariage de prestige. Le Range Rover Vogue est également très apprécié pour un cortège élégant et discret. Les deux sont disponibles avec chauffeur privé et peuvent être réservés en convoi pour plusieurs véhicules.",
      },
      {
        question: "Mercedes Classe V ou Range Rover Vogue pour un groupe ?",
        answer:
          "Pour 5 à 7 personnes avec bagages, le Mercedes-Benz Classe V est plus adapté grâce à son espace et sa configuration modulable. Le Range Rover Vogue est idéal pour 4 passagers en confort maximal. Pour une délégation ou une famille nombreuse, le Classe V s'impose.",
      },
    ],
    relatedCars: ['bentley-bentayga', 'range-rover-vogue', 'porsche-cayenne', 'mercedes-benz-v-class'],
    relatedSlugs: ['location-voiture-luxe-marrakech-guide', 'location-porsche-cayenne-marrakech'],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ARTICLE 3 — Location Porsche Cayenne Marrakech
  // Target: "location Porsche Cayenne Marrakech"
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'location-porsche-cayenne-marrakech',
    title: 'Location Porsche Cayenne à Marrakech : pour quel usage ?',
    seoTitle: 'Porsche Cayenne Marrakech : Location & Usage | Accrocar',
    metaDescription:
      "Louez un Porsche Cayenne à Marrakech avec Accrocar : routes de l'Atlas, chauffeur privé, livraison VIP à l'aéroport ou à l'hôtel. Dès 350 € / jour.",
    excerpt:
      "SUV de sport, compagnon de route, voiture de représentation — le Porsche Cayenne convient à Marrakech mieux qu'on ne le pense. Découvrez pour quel usage le louer.",
    category: 'Flotte',
    date: '2025-05-16',
    updatedAt: '2025-05-16',
    author: 'Accrocar',
    readingTime: 5,
    featured: false,
    published: true,
    image: '/cars/porsche-cayenne-location-voiture-luxe-marrakech.webp',
    imageWidth: 1537,
    imageHeight: 1023,
    imageAlt: 'Location Porsche Cayenne de luxe à Marrakech avec livraison VIP — Accrocar',
    keywords: [
      'location Porsche Cayenne Marrakech',
      'Porsche Cayenne Marrakech',
      'location SUV luxe Marrakech',
      'Porsche Cayenne location Maroc',
    ],
    content: [
      {
        type: 'paragraph',
        text: "Le Porsche Cayenne occupe un terrain que peu de voitures habitent aussi naturellement : celui de l'élégance performante. Ni trop grand, ni trop visible, il impose par sa présence plutôt que par son volume. À Marrakech, où les trajets varient du boulevard urbain à la piste de montagne en passant par l'autoroute côtière, c'est l'un des choix les plus cohérents de la flotte Accrocar.",
      },
      {
        type: 'h2',
        text: "Pourquoi le Porsche Cayenne s'impose à Marrakech",
      },
      {
        type: 'paragraph',
        text: "Marrakech n'est pas une ville homogène. La Médina a ses ruelles, Guéliz ses boulevards larges, et à moins de 45 minutes du centre, les routes de l'Atlas commencent à grimper. Le Porsche Cayenne gère ces transitions avec naturel : en ville, son gabarit SUV reste maîtrisable. Sur autoroute vers Agadir ou Casablanca, ses 340 à 460 chevaux selon la version permettent une progression fluide et sereine. Sur les routes sinueuses vers Ouarzazate ou l'Ourika, sa transmission intégrale et ses suspensions adaptatives font la différence.",
      },
      {
        type: 'paragraph',
        text: "Ajoutez un intérieur en cuir pleine fleur, un tableau de bord Porsche d'une précision millimétrée, une chaîne audio Bose et une insonorisation travaillée : chaque trajet devient une bulle de confort que le conducteur choisit de rendre aussi dynamique ou aussi sereine qu'il le souhaite.",
      },
      {
        type: 'h2',
        text: 'Trois profils qui louent le Porsche Cayenne à Marrakech',
      },
      {
        type: 'paragraph',
        text: "Le voyageur qui explore. Marrakech–Essaouira en 3 heures, Marrakech–Agadir en 3h30, Marrakech–Ouarzazate en 4 heures : avec le Cayenne, ces routes deviennent un plaisir en elles-mêmes. La côte atlantique, les gorges du Dadès, les dunes de l'Agafay — le Cayenne les aborde avec la même sérénité.",
      },
      {
        type: 'paragraph',
        text: "Le voyageur professionnel. Arriver à une réunion d'affaires ou un événement en Porsche Cayenne, c'est arriver avec une image précise : compétence, discrétion, standards élevés. Pas ostentatoire, mais reconnu de ceux qui s'y connaissent.",
      },
      {
        type: 'paragraph',
        text: "La famille exigeante. Cinq places en configuration premium, coffre généreux pour les bagages, suspensions confortables sur les routes défoncées : le Cayenne accommode aussi les familles qui ne souhaitent pas sacrifier le plaisir de conduite au profit de l'espace.",
      },
      {
        type: 'image',
        src: '/cars/range-rover-sport-autobiography-location-voiture-luxe-marrakech.webp',
        alt: 'Route de montagne au Maroc avec voiture de luxe — Accrocar',
        width: 1537,
        height: 1023,
      },
      {
        type: 'pullquote',
        text: "Sur la route de l'Ourika ou à l'entrée d'un palace, le Porsche Cayenne n'a pas besoin de se justifier.",
      },
      {
        type: 'h2',
        text: 'Avec chauffeur privé ou en conduite autonome ?',
      },
      {
        type: 'paragraph',
        text: "Le Porsche Cayenne est proposé avec ou sans chauffeur. Beaucoup de nos clients choisissent de conduire eux-mêmes — c'est précisément pour cela qu'ils choisissent un Porsche et pas un Range Rover. La sensation de conduite est une valeur en soi. D'autres préfèrent un chauffeur professionnel pour les transferts aéroport ou les soirées, afin de profiter du véhicule depuis la banquette.",
      },
      {
        type: 'paragraph',
        text: "Notre service de chauffeur privé est disponible pour toutes les configurations : transfert ponctuel, journée complète, semaine entière. Le chauffeur est formé, discret et disponible selon vos horaires.",
      },
      {
        type: 'cta',
        label: 'Découvrir le service chauffeur',
        to: '/private-chauffeur',
        variant: 'secondary',
      },
      {
        type: 'h2',
        text: "Livraison VIP — aéroport, hôtel, villa",
      },
      {
        type: 'paragraph',
        text: "Votre Porsche Cayenne est livré à l'adresse de votre choix. Aéroport Marrakech Menara, Royal Mansour, Mamounia, riad privé ou villa dans les quartiers résidentiels — notre équipe se déplace. La remise prend quelques minutes : un contrôle rapide du véhicule, les clés, et vous partez. Disponible 7j/7 via WhatsApp, en français, en anglais et en arabe.",
      },
      {
        type: 'cta',
        label: 'Réserver via WhatsApp',
        href: 'whatsapp',
        message: 'Bonjour Accrocar, je souhaite louer un Porsche Cayenne à Marrakech.',
        variant: 'primary',
      },
      {
        type: 'h2',
        text: 'Porsche Cayenne vs Range Rover Sport — lequel choisir ?',
      },
      {
        type: 'paragraph',
        text: "La question revient souvent, tant les deux véhicules sont dans une gamme similaire. Voici les différences pratiques :",
      },
      {
        type: 'list',
        items: [
          "Porsche Cayenne : plus dynamique en conduite, précision allemande, acoustique moteur engageante, silhouette plus sportive et basse",
          "Range Rover Sport : garde au sol plus élevée, image SUV britannique, légèrement plus spacieux en hauteur intérieure, mieux adapté aux pistes non goudronnées légères",
          "Prix : équivalents, à partir de 350 € / jour pour les deux chez Accrocar, livraison VIP incluse",
          "Chauffeur : disponible avec l'un et l'autre selon votre préférence",
        ],
      },
      {
        type: 'paragraph',
        text: "Si vous aimez conduire et ressentir la route, choisissez le Cayenne. Si vous cherchez une présence terrain plus affirmée ou une image SUV classique, optez pour le Range Rover Sport.",
      },
      {
        type: 'h2',
        text: 'Tarif et réservation',
      },
      {
        type: 'paragraph',
        text: "La location du Porsche Cayenne avec Accrocar commence à 350 € / jour, livraison VIP incluse partout à Marrakech. Pour une durée de plusieurs jours ou une destination spécifique au Maroc, contactez-nous pour un devis sur mesure adapté à votre programme.",
      },
      {
        type: 'cta',
        label: 'Voir la fiche Porsche Cayenne',
        to: '/fleet/porsche-cayenne',
        variant: 'secondary',
      },
    ],
    faq: [
      {
        question: "Quel est le prix de location du Porsche Cayenne à Marrakech ?",
        answer:
          "La location du Porsche Cayenne débute à 350 € par jour avec Accrocar, livraison VIP incluse à Marrakech ou à l'aéroport Menara. Pour une durée de plusieurs jours ou une destination au Maroc, un devis personnalisé est disponible sur demande.",
      },
      {
        question: "Le Porsche Cayenne convient-il aux routes de montagne au Maroc ?",
        answer:
          "Oui. Grâce à sa transmission intégrale et ses suspensions adaptatives, le Cayenne est parfaitement à l'aise sur les routes de l'Atlas, les cols vers Ouarzazate ou les routes côtières vers Essaouira et Agadir.",
      },
      {
        question: "Puis-je obtenir un chauffeur privé avec le Porsche Cayenne ?",
        answer:
          "Absolument. Accrocar propose un service de chauffeur privé professionnel avec le Porsche Cayenne pour tous vos trajets à Marrakech et au Maroc — transferts, excursions, événements ou déplacements professionnels.",
      },
      {
        question: "Livrez-vous le Porsche Cayenne à l'aéroport Marrakech Menara ?",
        answer:
          "Oui. Nous livrons le Porsche Cayenne directement à l'aéroport Marrakech Menara. Précisez votre numéro de vol et votre heure d'arrivée lors de votre réservation via WhatsApp pour une remise sans attente.",
      },
    ],
    relatedCars: ['porsche-cayenne', 'range-rover-sport', 'range-rover-vogue'],
    relatedSlugs: ['quelle-voiture-luxe-choisir-marrakech', 'location-voiture-luxe-marrakech-guide'],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // DRAFTS — planned but not yet published (published: false)
  // These slugs are reserved. BlogPost will return NotFound for these.
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'bentley-bentayga-marrakech',
    title: "Bentley Bentayga à Marrakech : l'expérience SUV ultra-luxe",
    seoTitle: 'Bentley Bentayga Marrakech : Location Ultra-Luxe | Accrocar',
    metaDescription:
      "Louez un Bentley Bentayga à Marrakech avec Accrocar. Livraison VIP à votre palace, riad ou aéroport. L'ultra-luxe SUV disponible partout au Maroc.",
    excerpt: "Le Bentley Bentayga à Marrakech — pour les occasions où rien d'autre ne suffit.",
    category: 'Flotte',
    date: '2025-05-16',
    updatedAt: '2025-05-16',
    author: 'Accrocar',
    readingTime: 5,
    featured: false,
    published: false,
    image: '/cars/bentley-bentayga-location-luxe-marrakech.webp',
    imageWidth: 1537,
    imageHeight: 1023,
    imageAlt: 'Location Bentley Bentayga ultra-luxe à Marrakech — Accrocar',
    keywords: ['Bentley Bentayga Marrakech', 'location Bentley Marrakech'],
    content: [],
    faq: [],
    relatedCars: ['bentley-bentayga', 'range-rover-vogue'],
    relatedSlugs: [],
  },
  {
    slug: 'chauffeur-prive-marrakech',
    title: "Voiture avec chauffeur privé à Marrakech : quand la choisir ?",
    seoTitle: 'Chauffeur Privé Marrakech : Voiture avec Chauffeur | Accrocar',
    metaDescription:
      "Service de chauffeur privé à Marrakech avec Accrocar : transferts aéroport, excursions, événements. Discret, ponctuel, disponible 7j/7 partout au Maroc.",
    excerpt: "Transfert aéroport, soirée, excursion — quand opter pour un chauffeur privé à Marrakech ?",
    category: 'Chauffeur privé',
    date: '2025-05-16',
    updatedAt: '2025-05-16',
    author: 'Accrocar',
    readingTime: 5,
    featured: false,
    published: false,
    image: '/services/private-chauffeur-luxury-car-morocco.webp',
    imageWidth: 1536,
    imageHeight: 1024,
    imageAlt: 'Chauffeur privé avec voiture de luxe à Marrakech — Accrocar',
    keywords: ['chauffeur privé Marrakech', 'voiture avec chauffeur Marrakech'],
    content: [],
    faq: [],
    relatedCars: ['range-rover-vogue', 'bentley-bentayga', 'mercedes-benz-v-class'],
    relatedSlugs: [],
  },
  {
    slug: 'location-voiture-mariage-marrakech',
    title: "Location voiture mariage Marrakech : conseils pour une arrivée élégante",
    seoTitle: 'Location Voiture Mariage Marrakech : Conseils | Accrocar',
    metaDescription:
      "Choisissez la voiture parfaite pour votre mariage à Marrakech : Bentley Bentayga, Range Rover Vogue, avec ou sans chauffeur. Guide Accrocar.",
    excerpt: "Bentley ou Range Rover, avec chauffeur ou en conduite — comment choisir votre voiture de mariage à Marrakech.",
    category: 'Mariage',
    date: '2025-05-16',
    updatedAt: '2025-05-16',
    author: 'Accrocar',
    readingTime: 5,
    featured: false,
    published: false,
    image: '/services/weddings-events-luxury-car-marrakech.webp',
    imageWidth: 1536,
    imageHeight: 1024,
    imageAlt: 'Voiture de luxe pour mariage à Marrakech — Accrocar',
    keywords: ['location voiture mariage Marrakech', 'voiture mariage luxe Marrakech'],
    content: [],
    faq: [],
    relatedCars: ['bentley-bentayga', 'range-rover-vogue', 'range-rover-sport-autobiography'],
    relatedSlugs: [],
  },
  {
    slug: 'livraison-vip-aeroport-marrakech',
    title: "Livraison VIP à l'aéroport Marrakech Menara : comment ça fonctionne ?",
    seoTitle: "Livraison VIP Aéroport Marrakech Menara | Accrocar",
    metaDescription:
      "Accrocar livre votre voiture de luxe directement à l'aéroport Marrakech Menara. Pas de comptoir, remise VIP sur le tarmac. Disponible 7j/7.",
    excerpt: "Comment fonctionne la livraison VIP à l'aéroport Marrakech Menara avec Accrocar ?",
    category: 'Services VIP',
    date: '2025-05-16',
    updatedAt: '2025-05-16',
    author: 'Accrocar',
    readingTime: 4,
    featured: false,
    published: false,
    image: '/services/self-drive-hire-luxury-car-marrakech.webp',
    imageWidth: 1536,
    imageHeight: 1024,
    imageAlt: "Livraison voiture de luxe à l'aéroport Marrakech Menara — Accrocar",
    keywords: ["livraison VIP aéroport Marrakech", "location voiture aéroport Marrakech"],
    content: [],
    faq: [],
    relatedCars: ['range-rover-vogue', 'porsche-cayenne', 'mercedes-benz-v-class'],
    relatedSlugs: [],
  },
  {
    slug: 'itineraires-premium-marrakech-agafay-essaouira',
    title: "Marrakech, Agafay, Essaouira : itinéraires premium en voiture de luxe",
    seoTitle: 'Itinéraires Luxe Marrakech Agafay Essaouira | Accrocar',
    metaDescription:
      "Découvrez les plus beaux itinéraires en voiture de luxe depuis Marrakech : Agafay, Essaouira, Atlas, Ouarzazate. Conseils Accrocar pour un road trip premium au Maroc.",
    excerpt: "De l'Agafay à Essaouira en passant par l'Atlas — les itinéraires premium à faire en voiture de luxe depuis Marrakech.",
    category: 'Itinéraires',
    date: '2025-05-16',
    updatedAt: '2025-05-16',
    author: 'Accrocar',
    readingTime: 6,
    featured: false,
    published: false,
    image: '/services/bespoke-tours-luxury-car-morocco.webp',
    imageWidth: 1535,
    imageHeight: 1024,
    imageAlt: 'Itinéraire voiture de luxe au Maroc depuis Marrakech — Accrocar',
    keywords: ['itinéraire luxe Marrakech', 'road trip luxe Maroc', 'Marrakech Essaouira voiture luxe'],
    content: [],
    faq: [],
    relatedCars: ['range-rover-sport-autobiography', 'porsche-cayenne', 'range-rover-vogue'],
    relatedSlugs: [],
  },
]

// ── Multilingual adapter ─────────────────────────────────────────────────────
// rawPosts above hold the French master content. This adapter reshapes them
// into the multilingual structure the components consume, without mutating any
// French text. EN/ES/RO/NL fall back to FR via resolvePostTranslation() until
// per-language translations are added to a post's `translations` map.
const CATEGORY_KEY = {
  'Guide Marrakech': 'guideMarrakech',
  'Flotte': 'fleet',
  'Chauffeur privé': 'privateChauffeur',
  'Mariage': 'weddings',
  'Services VIP': 'vipServices',
  'Itinéraires': 'itineraries',
  'Conseils': 'advice',
}

export const blogPosts = rawPosts.map((p) => ({
  ...p,
  categoryKey: p.categoryKey || CATEGORY_KEY[p.category] || 'advice',
  imageAlt: p.imageAlt && typeof p.imageAlt === 'object' ? p.imageAlt : { fr: p.imageAlt || '' },
  translations: p.translations || {
    fr: {
      title: p.title,
      seoTitle: p.seoTitle,
      metaDescription: p.metaDescription,
      excerpt: p.excerpt,
      keywords: p.keywords || [],
      content: p.content || [],
      faq: p.faq || [],
    },
  },
}))

// ── Helpers ──────────────────────────────────────────────────────────────────
export const publishedPosts = blogPosts.filter((p) => p.published)
export const featuredPost = publishedPosts.find((p) => p.featured) || publishedPosts[0]

export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug)
}

export function getPublishedPostsByCategory(categoryKey) {
  if (!categoryKey || categoryKey === 'all') return publishedPosts
  return publishedPosts.filter((p) => p.categoryKey === categoryKey)
}

// Unique categoryKey list from published posts (for filter pills)
export const blogCategoryKeys = [...new Set(publishedPosts.map((p) => p.categoryKey))]

// Resolve a post's translation for a language, falling back to FR
export function resolvePostTranslation(post, lang) {
  const supported = ['fr', 'en', 'es', 'ro', 'nl']
  const safeLang = supported.includes(lang) ? lang : 'fr'
  const tr = post.translations?.[safeLang]
  if (!tr || !tr.title) {
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development' && safeLang !== 'fr') {
      // eslint-disable-next-line no-console
      console.warn(`[blog] Missing "${safeLang}" translation for "${post.slug}" — using FR fallback`)
    }
    return post.translations.fr
  }
  return tr
}

// Language-aware date formatting via Intl
export function formatBlogDate(dateStr, lang = 'fr') {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  const locale =
    lang === 'fr' ? 'fr-FR'
    : lang === 'es' ? 'es-ES'
    : lang === 'ro' ? 'ro-RO'
    : lang === 'nl' ? 'nl-NL'
    : 'en-GB'
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}
