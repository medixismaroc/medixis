-- Medixis : remplace les visuels provisoires (SVG) par les photos d'illustration.
-- À coller dans Supabase Dashboard > SQL Editor > New query > Run (une seule fois), après 0003.

with map(old_url, new_url) as (values
  ('/img/placeholders/endoscopie.svg', '/img/photos/endoscopie.jpg'),
  ('/img/placeholders/sterilisation.svg', '/img/photos/sterilisation.jpg'),
  ('/img/placeholders/sutures.svg', '/img/photos/instruments.jpg'),
  ('/img/placeholders/ablation.svg', '/img/photos/ablation.jpg'),
  ('/img/placeholders/electrochirurgie.svg', '/img/photos/chirurgiens.jpg'),
  ('/img/placeholders/actu-medica.svg', '/img/photos/salon.jpg'),
  ('/img/placeholders/actu-lancement.svg', '/img/photos/salle-vide.jpg'),
  ('/img/placeholders/actu-partenariat.svg', '/img/photos/endoscopie.jpg')
)
update ranges set image_url = map.new_url from map where ranges.image_url = map.old_url;

with map(old_url, new_url) as (values
  ('/img/placeholders/endoscopie.svg', '/img/photos/endoscopie.jpg'),
  ('/img/placeholders/sterilisation.svg', '/img/photos/sterilisation.jpg'),
  ('/img/placeholders/sutures.svg', '/img/photos/instruments.jpg'),
  ('/img/placeholders/ablation.svg', '/img/photos/ablation.jpg'),
  ('/img/placeholders/electrochirurgie.svg', '/img/photos/chirurgiens.jpg')
)
update products set image_url = map.new_url from map where products.image_url = map.old_url;

with map(old_url, new_url) as (values
  ('/img/placeholders/actu-medica.svg', '/img/photos/salon.jpg'),
  ('/img/placeholders/actu-lancement.svg', '/img/photos/salle-vide.jpg'),
  ('/img/placeholders/actu-partenariat.svg', '/img/photos/endoscopie.jpg')
)
update posts set image_url = map.new_url from map where posts.image_url = map.old_url;
