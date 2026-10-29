/** Menu principal : une page par entrée. */
export const NAV = [
  { href: '/specialites', fr: 'Spécialités', en: 'Specialties' },
  { href: '/produits', fr: 'Produits', en: 'Products' },
  { href: '/services', fr: 'Services', en: 'Services' },
  { href: '/actualites', fr: 'Actualités', en: 'News' },
  { href: '/societe', fr: 'La société', en: 'Company' },
] as const

/** Lien actif : la page elle-même et ses sous-pages (/produits/xxx, /gammes/xxx → Spécialités). */
export function isActive(pathname: string, href: string) {
  if (href === '/specialites' && pathname.startsWith('/gammes')) return true
  return pathname === href || pathname.startsWith(`${href}/`)
}
