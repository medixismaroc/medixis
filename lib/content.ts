/**
 * Contenus du site Medixis.
 *
 * Les gammes, produits, marques et actualités se gèrent depuis l'espace admin (/admin).
 * Les valeurs ci-dessous ne servent que de secours si Supabase est injoignable
 * ou pas encore configuré. Les métiers, services et zones restent ici.
 * Ne rien inventer : laisser vide plutôt que de supposer.
 */

export interface Bilingual { fr: string; en: string }

/**
 * Photos d'illustration (Unsplash, licence libre, usage commercial autorisé) en attendant
 * celles des brochures. Aucune ne montre de produit d'une marque concurrente.
 */
export const PHOTO = {
  hero: '/img/photos/electrochirurgie.jpg',
  endoscopie: '/img/photos/endoscopie.jpg',
  sterilisation: '/img/photos/sterilisation.jpg',
  sutures: '/img/photos/instruments.jpg',
  ablation: '/img/photos/ablation.jpg',
  electrochirurgie: '/img/photos/chirurgiens.jpg',
  salleVide: '/img/photos/salle-vide.jpg',
  blocOperatoire: '/img/photos/bloc-operatoire.jpg',
  equipe: '/img/photos/equipe.jpg',
  moniteur: '/img/photos/moniteur.jpg',
  casablanca: '/img/photos/casablanca.jpg',
  salon: '/img/photos/salon.jpg',
}

/** Les trois métiers, repris de la signature du logo : Sales. Distribution. Import. */
export const PILLARS: { key: string; title: Bilingual; body: Bilingual }[] = [
  {
    key: 'sales',
    title: { fr: 'Vente', en: 'Sales' },
    body: {
      fr: 'Conseil et accompagnement des établissements de santé dans le choix de leurs équipements.',
      en: 'Advice and support for healthcare facilities in choosing their equipment.',
    },
  },
  {
    key: 'distribution',
    title: { fr: 'Distribution', en: 'Distribution' },
    body: {
      fr: 'Mise à disposition des équipements et des consommables partout au Maroc.',
      en: 'Supply of equipment and consumables across Morocco.',
    },
  },
  {
    key: 'import',
    title: { fr: 'Import', en: 'Import' },
    body: {
      fr: 'Relation directe avec les fabricants et prise en charge des formalités d’importation.',
      en: 'Direct relationships with manufacturers and handling of import formalities.',
    },
  },
]

export interface Product {
  slug: string
  name: string
  brand?: string
  description: Bilingual
  /** Points clés. */
  highlights: { fr: string[]; en: string[] }
  /** Caractéristiques techniques [libellé, valeur]. */
  specs: { fr: [string, string][]; en: [string, string][] }
  image?: string
  datasheet?: string
  rangeSlug: string
  rangeName: Bilingual
}

export interface Range {
  slug: string
  name: Bilingual
  summary: Bilingual
  /** Texte de la page dédiée. */
  body: Bilingual
  /** Produits présentés sur la page de la gamme. */
  products: Product[]
  image?: string
}

/** Découpe un texte multi-lignes en liste (lignes vides ignorées). */
export function lines(text: string): string[] {
  return text.split('\n').map((l) => l.trim()).filter(Boolean)
}

/** Identifiant d'URL : « Colonne vidéo » → « colonne-video ». */
export function slugify(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

/** « Libellé : valeur » par ligne → paires. */
export function specPairs(text: string): [string, string][] {
  return lines(text).map((l) => {
    const i = l.indexOf(':')
    return i === -1 ? [l, ''] : [l.slice(0, i).trim(), l.slice(i + 1).trim()]
  })
}

type ProductSeed = Omit<Product, 'rangeSlug' | 'rangeName'>
type RangeSeed = Omit<Range, 'products'> & { products: ProductSeed[] }

function product(slug: string, name: string, brand: string | undefined, image: string, description: Bilingual, highlights: { fr: string[]; en: string[] }): ProductSeed {
  return { slug, name, brand, image, description, highlights, specs: { fr: [], en: [] } }
}

// Contenu tiré du compte rendu du 12/10/2026. [À VALIDER] avec les brochures :
// noms de modèles, caractéristiques techniques et photos réelles.
// Garder aligné avec supabase/migrations/0003_portfolio_actualites.sql.
const RANGE_SEEDS: RangeSeed[] = [
  {
    slug: 'endoscopie',
    name: { fr: 'Endoscopie', en: 'Endoscopy' },
    summary: {
      fr: 'Systèmes vidéo-endoscopiques Shenda by Lepu Medical pour le diagnostic et l’intervention.',
      en: 'Shenda by Lepu Medical video endoscopy systems for diagnosis and intervention.',
    },
    body: {
      fr: 'Medixis distribue au Maroc la gamme d’endoscopie Shenda, développée par le groupe Lepu Medical. Colonnes vidéo et endoscopes sont proposés avec l’installation, la formation des équipes et le suivi après-vente.',
      en: 'Medixis distributes the Shenda endoscopy range, developed by the Lepu Medical group, in Morocco. Video towers and endoscopes come with installation, team training and after-sales follow-up.',
    },
    image: PHOTO.endoscopie,
    products: [
      product('colonne-video-endoscopie-shenda', 'Colonne vidéo-endoscopique', 'Shenda by Lepu Medical', PHOTO.endoscopie,
        { fr: 'Processeur vidéo, source lumineuse et moniteur pour les explorations endoscopiques.', en: 'Video processor, light source and monitor for endoscopic examinations.' },
        { fr: ['Gamme Shenda by Lepu Medical', 'Installation et formation sur site', 'Suivi après-vente au Maroc'], en: ['Shenda by Lepu Medical range', 'On-site installation and training', 'After-sales support in Morocco'] }),
      product('videoendoscopes-shenda', 'Vidéo-endoscopes', 'Shenda by Lepu Medical', PHOTO.endoscopie,
        { fr: 'Endoscopes compatibles avec la colonne Shenda. Modèles disponibles selon votre spécialité.', en: 'Endoscopes compatible with the Shenda tower. Models available for your specialty.' },
        { fr: ['Compatibles colonne Shenda', 'Choix selon la spécialité', 'Stérilisation à froid possible (gamme Wego)'], en: ['Compatible with the Shenda tower', 'Chosen by specialty', 'Cold sterilization available (Wego range)'] }),
    ],
  },
  {
    slug: 'sterilisation',
    name: { fr: 'Stérilisation des instruments', en: 'Instrument sterilization' },
    summary: {
      fr: 'Solutions Wego de stérilisation à chaud et à froid, y compris pour les caméras d’endoscopie.',
      en: 'Wego hot and cold sterilization solutions, including for endoscopy cameras.',
    },
    body: {
      fr: 'La gamme Wego couvre la stérilisation à chaud des instruments chirurgicaux et la stérilisation à froid des équipements sensibles à la chaleur, comme les caméras d’endoscopie.',
      en: 'The Wego range covers hot sterilization of surgical instruments and cold sterilization of heat-sensitive equipment such as endoscopy cameras.',
    },
    image: PHOTO.sterilisation,
    products: [
      product('sterilisation-a-chaud-wego', 'Stérilisation à chaud', 'Wego', PHOTO.sterilisation,
        { fr: 'Stérilisateurs pour les instruments chirurgicaux réutilisables.', en: 'Sterilizers for reusable surgical instruments.' },
        { fr: ['Instruments chirurgicaux réutilisables', 'Installation et formation'], en: ['Reusable surgical instruments', 'Installation and training'] }),
      product('sterilisation-a-froid-wego', 'Stérilisation à froid', 'Wego', PHOTO.sterilisation,
        { fr: 'Stérilisation basse température pour les équipements sensibles à la chaleur, dont les caméras d’endoscopie.', en: 'Low-temperature sterilization for heat-sensitive equipment, including endoscopy cameras.' },
        { fr: ['Adaptée aux caméras d’endoscopie', 'Équipements thermosensibles'], en: ['Suitable for endoscopy cameras', 'Heat-sensitive equipment'] }),
    ],
  },
  {
    slug: 'sutures',
    name: { fr: 'Fils de suture chirurgicaux', en: 'Surgical sutures' },
    summary: {
      fr: 'Fils de suture Pine BM, fabricant coréen, pour les blocs opératoires.',
      en: 'Pine BM sutures, a Korean manufacturer, for operating rooms.',
    },
    body: {
      fr: 'Medixis distribue les fils de suture du fabricant coréen Pine BM. La gamme complète et les références sont disponibles sur demande.',
      en: 'Medixis distributes sutures from Korean manufacturer Pine BM. The full range and references are available on request.',
    },
    image: PHOTO.sutures,
    products: [
      product('fils-de-suture-pine-bm', 'Fils de suture', 'Pine BM', PHOTO.sutures,
        { fr: 'Fils de suture chirurgicaux. Références, calibres et aiguilles précisés dans la fiche technique.', en: 'Surgical sutures. References, gauges and needles listed in the data sheet.' },
        { fr: ['Fabricant coréen', 'Approvisionnement régulier au Maroc'], en: ['Korean manufacturer', 'Regular supply in Morocco'] }),
    ],
  },
  {
    slug: 'ablation',
    name: { fr: 'Ablation tumorale', en: 'Tumor ablation' },
    summary: {
      fr: 'Radiofréquence, micro-ondes et électroporation : trois technologies d’ablation.',
      en: 'Radiofrequency, microwave and electroporation: three ablation technologies.',
    },
    body: {
      fr: 'Medixis propose des systèmes d’ablation par radiofréquence, par micro-ondes et par électroporation, pour permettre à chaque équipe de choisir la technique adaptée à l’indication.',
      en: 'Medixis offers radiofrequency, microwave and electroporation ablation systems, so each team can choose the technique suited to the indication.',
    },
    image: PHOTO.ablation,
    // [À CONFIRMER] marque : Surgnova ou Dophi.
    products: [
      product('ablation-radiofrequence', 'Ablation par radiofréquence', undefined, PHOTO.ablation,
        { fr: 'Générateur et électrodes d’ablation par radiofréquence.', en: 'Radiofrequency ablation generator and electrodes.' },
        { fr: ['Technologie radiofréquence', 'Formation des équipes'], en: ['Radiofrequency technology', 'Team training'] }),
      product('ablation-micro-ondes', 'Ablation par micro-ondes', undefined, PHOTO.ablation,
        { fr: 'Système d’ablation par micro-ondes et antennes associées.', en: 'Microwave ablation system and matching antennas.' },
        { fr: ['Technologie micro-ondes', 'Formation des équipes'], en: ['Microwave technology', 'Team training'] }),
      product('electroporation', 'Électroporation', undefined, PHOTO.ablation,
        { fr: 'Système d’ablation par électroporation.', en: 'Electroporation ablation system.' },
        { fr: ['Technologie d’électroporation', 'Formation des équipes'], en: ['Electroporation technology', 'Team training'] }),
    ],
  },
  {
    slug: 'electrochirurgie',
    name: { fr: 'Générateurs ultrasoniques et électrochirurgicaux', en: 'Ultrasonic and electrosurgical generators' },
    summary: {
      fr: 'Couper et coaguler les vaisseaux avec un seul système au lieu de deux.',
      en: 'Cut and coagulate vessels with one system instead of two.',
    },
    body: {
      fr: 'Ce générateur réunit l’énergie ultrasonique et l’électrochirurgie dans un même système : le chirurgien coupe et coagule les vaisseaux sans changer d’appareil.',
      en: 'This generator combines ultrasonic energy and electrosurgery in one system: surgeons cut and coagulate vessels without switching devices.',
    },
    image: PHOTO.electrochirurgie,
    // [À CONFIRMER] marque.
    products: [
      product('generateur-ultrasonique-electrochirurgical', 'Générateur ultrasonique et électrochirurgical', undefined, PHOTO.electrochirurgie,
        { fr: 'Un seul générateur pour couper et coaguler les vaisseaux.', en: 'One generator to cut and coagulate vessels.' },
        { fr: ['Ultrasons et électrochirurgie réunis', 'Un appareil au lieu de deux', 'Installation et formation'], en: ['Ultrasonic and electrosurgery combined', 'One device instead of two', 'Installation and training'] }),
    ],
  },
]

export const RANGES: Range[] = RANGE_SEEDS.map((r) => ({
  ...r,
  products: r.products.map((p) => ({ ...p, rangeSlug: r.slug, rangeName: r.name })),
}))

/**
 * Marques partenaires. ATTENTION avant mise en ligne (même règle que Medicaris) :
 *  - vérifier que Medixis est autorisée à citer chaque marque ;
 *  - obtenir l'accord écrit avant d'afficher un logo ;
 * Tant que ce n'est pas fait, on n'affiche que les noms.
 */
export interface Brand { name: string; note?: Bilingual; logo?: string }
export const BRANDS: Brand[] = [
  { name: 'Shenda', note: { fr: 'by Lepu Medical · Endoscopie', en: 'by Lepu Medical · Endoscopy' } },
  { name: 'Wego', note: { fr: 'Stérilisation', en: 'Sterilization' } },
  { name: 'Pine BM', note: { fr: 'Fils de suture', en: 'Sutures' } },
]

export interface Post {
  slug: string
  title: Bilingual
  excerpt: Bilingual
  /** Paragraphes séparés par une ligne vide. */
  body: Bilingual
  image?: string
  /** AAAA-MM-JJ */
  date: string
}

// Articles de lancement. [À VALIDER] par le client avant publication.
export const POSTS: Post[] = [
  {
    slug: 'medixis-a-medica-2026',
    date: '2026-11-09',
    image: PHOTO.salon,
    title: { fr: 'Medixis à MEDICA 2026, Düsseldorf', en: 'Medixis at MEDICA 2026, Düsseldorf' },
    excerpt: {
      fr: 'Du 16 au 19 novembre, l’équipe Medixis sera au salon MEDICA pour rencontrer ses partenaires et de nouveaux fabricants.',
      en: 'From 16 to 19 November, the Medixis team will be at MEDICA to meet its partners and new manufacturers.',
    },
    body: {
      fr: 'Du 16 au 19 novembre 2026, l’équipe Medixis se rend au salon MEDICA à Düsseldorf, l’un des plus grands salons mondiaux des technologies médicales.\n\nAu programme : des rencontres avec nos partenaires actuels et la sélection de nouvelles gammes à proposer aux établissements de santé marocains.\n\nVous serez aussi à Düsseldorf ? Contactez-nous pour fixer un rendez-vous sur place.',
      en: 'From 16 to 19 November 2026, the Medixis team will attend MEDICA in Düsseldorf, one of the world’s largest medical technology trade fairs.\n\nOn the agenda: meetings with our current partners and the selection of new ranges for Moroccan healthcare facilities.\n\nWill you be in Düsseldorf too? Contact us to set up a meeting on site.',
    },
  },
  {
    slug: 'lancement-du-site-medixis',
    date: '2026-11-09',
    image: PHOTO.salleVide,
    title: { fr: 'Medixis lance son site internet', en: 'Medixis launches its website' },
    excerpt: {
      fr: 'Gammes, fiches produits et demande de devis : retrouvez toute l’offre Medixis en ligne.',
      en: 'Ranges, product sheets and quote requests: the full Medixis offer is now online.',
    },
    body: {
      fr: 'Medixis ouvre son site internet. Vous y trouverez nos gammes de dispositifs médicaux, une fiche pour chaque produit et un formulaire pour demander un devis.\n\nLe site s’enrichira au fil des nouvelles gammes et des actualités de nos partenaires.',
      en: 'Medixis opens its website. You will find our medical device ranges, a sheet for each product and a form to request a quote.\n\nThe site will grow with new ranges and news from our partners.',
    },
  },
  {
    slug: 'partenariat-shenda-lepu-medical',
    date: '2026-11-05',
    image: PHOTO.endoscopie,
    title: { fr: 'Endoscopie : Medixis distribue la gamme Shenda by Lepu Medical', en: 'Endoscopy: Medixis distributes the Shenda by Lepu Medical range' },
    excerpt: {
      fr: 'Les systèmes d’endoscopie Shenda, développés par le groupe Lepu Medical, sont désormais disponibles au Maroc via Medixis.',
      en: 'Shenda endoscopy systems, developed by the Lepu Medical group, are now available in Morocco through Medixis.',
    },
    body: {
      fr: 'Medixis distribue désormais au Maroc la gamme d’endoscopie Shenda, développée par le groupe Lepu Medical.\n\nColonnes vidéo et endoscopes sont proposés avec l’installation, la formation des équipes et le suivi après-vente.\n\nPour recevoir la documentation ou organiser une démonstration, contactez-nous.',
      en: 'Medixis now distributes the Shenda endoscopy range, developed by the Lepu Medical group, in Morocco.\n\nVideo towers and endoscopes come with installation, team training and after-sales follow-up.\n\nTo receive documentation or arrange a demonstration, contact us.',
    },
  },
]

/** Accompagnement en 4 étapes (section Services). */
export const SERVICES: { key: string; title: Bilingual; body: Bilingual }[] = [
  { key: 'selection', title: { fr: 'Sélection', en: 'Selection' }, body: { fr: 'Nous vous aidons à choisir l’équipement adapté à votre pratique et à votre budget.', en: 'We help you choose the equipment that fits your practice and budget.' } },
  { key: 'import', title: { fr: 'Import', en: 'Import' }, body: { fr: 'Commande auprès du fabricant, transport et formalités douanières.', en: 'Ordering from the manufacturer, shipping and customs formalities.' } },
  { key: 'installation', title: { fr: 'Installation et formation', en: 'Installation and training' }, body: { fr: 'Mise en service dans votre établissement et formation de vos équipes.', en: 'Commissioning at your facility and training for your teams.' } },
  { key: 'support', title: { fr: 'Consommables et SAV', en: 'Consumables and support' }, body: { fr: 'Réapprovisionnement en consommables et suivi après-vente.', en: 'Consumable resupply and after-sales follow-up.' } },
]

// [À CONFIRMER] avec le client : villes réellement desservies.
export const ZONES = {
  hq: 'Casablanca',
  cities: ['Rabat', 'Marrakech', 'Tanger', 'Fès', 'Agadir', 'Oujda'],
}
