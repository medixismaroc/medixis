-- Medixis — portefeuille produits, actualités et contenu réel
-- À coller dans Supabase Dashboard → SQL Editor → New query → Run (une seule fois),
-- après 0001 et 0002.
--
-- ATTENTION : remplace les gammes de départ « Gamme 1/2/3 [À COMPLÉTER] » (et leurs produits).
-- Les gammes créées depuis l'admin ne sont pas touchées.

-- ── Fiches produits détaillées ──────────────────────────────
alter table products
  add column slug text unique,
  add column highlights_fr text not null default '',
  add column highlights_en text not null default '',
  add column specs_fr text not null default '',
  add column specs_en text not null default '';

-- ── Actualités ──────────────────────────────────────────────
create table posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_fr text not null,
  title_en text not null,
  excerpt_fr text not null default '',
  excerpt_en text not null default '',
  body_fr text not null default '',
  body_en text not null default '',
  image_url text,
  published_at date not null default current_date,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger posts_touch before update on posts for each row execute function touch_updated_at();

alter table posts enable row level security;
create policy "public read active posts" on posts for select using (active = true or is_admin());
create policy "admin manage posts" on posts for all using (is_admin()) with check (is_admin());

-- ── Contenu (compte rendu du 12/10/2026, photos d'illustration) ──
delete from ranges where slug in ('gamme-1', 'gamme-2', 'gamme-3');

insert into ranges (slug, name_fr, name_en, summary_fr, summary_en, body_fr, body_en, image_url, order_index) values
('endoscopie', 'Endoscopie', 'Endoscopy', 'Systèmes vidéo-endoscopiques Shenda by Lepu Medical pour le diagnostic et l’intervention.', 'Shenda by Lepu Medical video endoscopy systems for diagnosis and intervention.', 'Medixis distribue au Maroc la gamme d’endoscopie Shenda, développée par le groupe Lepu Medical. Colonnes vidéo et endoscopes sont proposés avec l’installation, la formation des équipes et le suivi après-vente.', 'Medixis distributes the Shenda endoscopy range, developed by the Lepu Medical group, in Morocco. Video towers and endoscopes come with installation, team training and after-sales follow-up.', '/img/photos/endoscopie.jpg', 1),
('sterilisation', 'Stérilisation des instruments', 'Instrument sterilization', 'Solutions Wego de stérilisation à chaud et à froid, y compris pour les caméras d’endoscopie.', 'Wego hot and cold sterilization solutions, including for endoscopy cameras.', 'La gamme Wego couvre la stérilisation à chaud des instruments chirurgicaux et la stérilisation à froid des équipements sensibles à la chaleur, comme les caméras d’endoscopie.', 'The Wego range covers hot sterilization of surgical instruments and cold sterilization of heat-sensitive equipment such as endoscopy cameras.', '/img/photos/sterilisation.jpg', 2),
('sutures', 'Fils de suture chirurgicaux', 'Surgical sutures', 'Fils de suture Pine BM, fabricant coréen, pour les blocs opératoires.', 'Pine BM sutures, a Korean manufacturer, for operating rooms.', 'Medixis distribue les fils de suture du fabricant coréen Pine BM. La gamme complète et les références sont disponibles sur demande.', 'Medixis distributes sutures from Korean manufacturer Pine BM. The full range and references are available on request.', '/img/photos/instruments.jpg', 3),
('ablation', 'Ablation tumorale', 'Tumor ablation', 'Radiofréquence, micro-ondes et électroporation : trois technologies d’ablation.', 'Radiofrequency, microwave and electroporation: three ablation technologies.', 'Medixis propose des systèmes d’ablation par radiofréquence, par micro-ondes et par électroporation, pour permettre à chaque équipe de choisir la technique adaptée à l’indication.', 'Medixis offers radiofrequency, microwave and electroporation ablation systems, so each team can choose the technique suited to the indication.', '/img/photos/ablation.jpg', 4),
('electrochirurgie', 'Générateurs ultrasoniques et électrochirurgicaux', 'Ultrasonic and electrosurgical generators', 'Couper et coaguler les vaisseaux avec un seul système au lieu de deux.', 'Cut and coagulate vessels with one system instead of two.', 'Ce générateur réunit l’énergie ultrasonique et l’électrochirurgie dans un même système : le chirurgien coupe et coagule les vaisseaux sans changer d’appareil.', 'This generator combines ultrasonic energy and electrosurgery in one system: surgeons cut and coagulate vessels without switching devices.', '/img/photos/chirurgiens.jpg', 5);

insert into products (range_id, slug, name, brand, description_fr, description_en, highlights_fr, highlights_en, image_url, order_index) values
((select id from ranges where slug = 'endoscopie'), 'colonne-video-endoscopie-shenda', 'Colonne vidéo-endoscopique', 'Shenda by Lepu Medical', 'Processeur vidéo, source lumineuse et moniteur pour les explorations endoscopiques.', 'Video processor, light source and monitor for endoscopic examinations.', 'Gamme Shenda by Lepu Medical
Installation et formation sur site
Suivi après-vente au Maroc', 'Shenda by Lepu Medical range
On-site installation and training
After-sales support in Morocco', '/img/photos/endoscopie.jpg', 1),
((select id from ranges where slug = 'endoscopie'), 'videoendoscopes-shenda', 'Vidéo-endoscopes', 'Shenda by Lepu Medical', 'Endoscopes compatibles avec la colonne Shenda. Modèles disponibles selon votre spécialité.', 'Endoscopes compatible with the Shenda tower. Models available for your specialty.', 'Compatibles colonne Shenda
Choix selon la spécialité
Stérilisation à froid possible (gamme Wego)', 'Compatible with the Shenda tower
Chosen by specialty
Cold sterilization available (Wego range)', '/img/photos/endoscopie.jpg', 2),
((select id from ranges where slug = 'sterilisation'), 'sterilisation-a-chaud-wego', 'Stérilisation à chaud', 'Wego', 'Stérilisateurs pour les instruments chirurgicaux réutilisables.', 'Sterilizers for reusable surgical instruments.', 'Instruments chirurgicaux réutilisables
Installation et formation', 'Reusable surgical instruments
Installation and training', '/img/photos/sterilisation.jpg', 1),
((select id from ranges where slug = 'sterilisation'), 'sterilisation-a-froid-wego', 'Stérilisation à froid', 'Wego', 'Stérilisation basse température pour les équipements sensibles à la chaleur, dont les caméras d’endoscopie.', 'Low-temperature sterilization for heat-sensitive equipment, including endoscopy cameras.', 'Adaptée aux caméras d’endoscopie
Équipements thermosensibles', 'Suitable for endoscopy cameras
Heat-sensitive equipment', '/img/photos/sterilisation.jpg', 2),
((select id from ranges where slug = 'sutures'), 'fils-de-suture-pine-bm', 'Fils de suture', 'Pine BM', 'Fils de suture chirurgicaux. Références, calibres et aiguilles précisés dans la fiche technique.', 'Surgical sutures. References, gauges and needles listed in the data sheet.', 'Fabricant coréen
Approvisionnement régulier au Maroc', 'Korean manufacturer
Regular supply in Morocco', '/img/photos/instruments.jpg', 1),
((select id from ranges where slug = 'ablation'), 'ablation-radiofrequence', 'Ablation par radiofréquence', null, 'Générateur et électrodes d’ablation par radiofréquence.', 'Radiofrequency ablation generator and electrodes.', 'Technologie radiofréquence
Formation des équipes', 'Radiofrequency technology
Team training', '/img/photos/ablation.jpg', 1),
((select id from ranges where slug = 'ablation'), 'ablation-micro-ondes', 'Ablation par micro-ondes', null, 'Système d’ablation par micro-ondes et antennes associées.', 'Microwave ablation system and matching antennas.', 'Technologie micro-ondes
Formation des équipes', 'Microwave technology
Team training', '/img/photos/ablation.jpg', 2),
((select id from ranges where slug = 'ablation'), 'electroporation', 'Électroporation', null, 'Système d’ablation par électroporation.', 'Electroporation ablation system.', 'Technologie d’électroporation
Formation des équipes', 'Electroporation technology
Team training', '/img/photos/ablation.jpg', 3),
((select id from ranges where slug = 'electrochirurgie'), 'generateur-ultrasonique-electrochirurgical', 'Générateur ultrasonique et électrochirurgical', null, 'Un seul générateur pour couper et coaguler les vaisseaux.', 'One generator to cut and coagulate vessels.', 'Ultrasons et électrochirurgie réunis
Un appareil au lieu de deux
Installation et formation', 'Ultrasonic and electrosurgery combined
One device instead of two
Installation and training', '/img/photos/chirurgiens.jpg', 1);

insert into brands (name, note_fr, note_en, order_index) values
('Shenda', 'by Lepu Medical · Endoscopie', 'by Lepu Medical · Endoscopy', 1),
('Wego', 'Stérilisation', 'Sterilization', 2),
('Pine BM', 'Fils de suture', 'Sutures', 3);

insert into posts (slug, title_fr, title_en, excerpt_fr, excerpt_en, body_fr, body_en, image_url, published_at) values
('medixis-a-medica-2026', 'Medixis à MEDICA 2026, Düsseldorf', 'Medixis at MEDICA 2026, Düsseldorf', 'Du 16 au 19 novembre, l’équipe Medixis sera au salon MEDICA pour rencontrer ses partenaires et de nouveaux fabricants.', 'From 16 to 19 November, the Medixis team will be at MEDICA to meet its partners and new manufacturers.', 'Du 16 au 19 novembre 2026, l’équipe Medixis se rend au salon MEDICA à Düsseldorf, l’un des plus grands salons mondiaux des technologies médicales.

Au programme : des rencontres avec nos partenaires actuels et la sélection de nouvelles gammes à proposer aux établissements de santé marocains.

Vous serez aussi à Düsseldorf ? Contactez-nous pour fixer un rendez-vous sur place.', 'From 16 to 19 November 2026, the Medixis team will attend MEDICA in Düsseldorf, one of the world’s largest medical technology trade fairs.

On the agenda: meetings with our current partners and the selection of new ranges for Moroccan healthcare facilities.

Will you be in Düsseldorf too? Contact us to set up a meeting on site.', '/img/photos/salon.jpg', '2026-11-09'),
('lancement-du-site-medixis', 'Medixis lance son site internet', 'Medixis launches its website', 'Gammes, fiches produits et demande de devis : retrouvez toute l’offre Medixis en ligne.', 'Ranges, product sheets and quote requests: the full Medixis offer is now online.', 'Medixis ouvre son site internet. Vous y trouverez nos gammes de dispositifs médicaux, une fiche pour chaque produit et un formulaire pour demander un devis.

Le site s’enrichira au fil des nouvelles gammes et des actualités de nos partenaires.', 'Medixis opens its website. You will find our medical device ranges, a sheet for each product and a form to request a quote.

The site will grow with new ranges and news from our partners.', '/img/photos/salle-vide.jpg', '2026-11-09'),
('partenariat-shenda-lepu-medical', 'Endoscopie : Medixis distribue la gamme Shenda by Lepu Medical', 'Endoscopy: Medixis distributes the Shenda by Lepu Medical range', 'Les systèmes d’endoscopie Shenda, développés par le groupe Lepu Medical, sont désormais disponibles au Maroc via Medixis.', 'Shenda endoscopy systems, developed by the Lepu Medical group, are now available in Morocco through Medixis.', 'Medixis distribue désormais au Maroc la gamme d’endoscopie Shenda, développée par le groupe Lepu Medical.

Colonnes vidéo et endoscopes sont proposés avec l’installation, la formation des équipes et le suivi après-vente.

Pour recevoir la documentation ou organiser une démonstration, contactez-nous.', 'Medixis now distributes the Shenda endoscopy range, developed by the Lepu Medical group, in Morocco.

Video towers and endoscopes come with installation, team training and after-sales follow-up.

To receive documentation or arrange a demonstration, contact us.', '/img/photos/endoscopie.jpg', '2026-11-05');
