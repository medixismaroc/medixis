// À CONFIRMER avec le client avant mise en ligne : domaine, téléphone, adresse, mentions légales.
export const SITE_URL = 'https://medixis.ma'

export const CONTACT = {
  // Numéro repris du devis du 14/10/2026 — à confirmer comme numéro public de Medixis.
  phone: '+212669182123',
  phoneDisplay: '+212 6 69 18 21 23',
  whatsappNumber: '212669182123',
  cityFr: 'Casablanca, Maroc',
  cityEn: 'Casablanca, Morocco',
}

// Laisser vide tant que le client n'a pas transmis ses informations légales :
// le bloc correspondant ne s'affiche pas.
export const LEGAL = {
  raisonSociale: 'Medixis',
  rc: '',
  ice: '',
  if: '',
}

export function whatsappHref(prefilledText?: string) {
  const base = `https://wa.me/${CONTACT.whatsappNumber}`
  return prefilledText ? `${base}?text=${encodeURIComponent(prefilledText)}` : base
}
