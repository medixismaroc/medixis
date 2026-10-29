import type { Metadata } from 'next'
import { getProducts, getRanges } from '@/lib/data'
import { ContactPage } from '@/components/pages/ContactPage'
import { SUBJECTS } from '@/lib/contact-subjects'

export const metadata: Metadata = {
  title: 'Contact | Medixis',
  description: 'Demande de devis, fiche technique ou partenariat fabricant : contactez Medixis à Casablanca.',
  alternates: { canonical: '/contact' },
}

/** Pré-remplit le formulaire depuis ?produit=, ?gamme=, ?sujet= et ?fiche=1. */
export default async function Page({ searchParams }: PageProps<'/contact'>) {
  const q = await searchParams
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)
  const produit = one(q.produit)
  const gamme = one(q.gamme)
  const sujet = one(q.sujet)

  let subject: string = SUBJECTS.some((s) => s.key === sujet) ? sujet! : 'devis'
  if (one(q.fiche) === '1') subject = 'fiche'

  let message = ''
  if (produit) {
    const p = (await getProducts()).find((x) => x.slug === produit)
    if (p) message = `${subject === 'fiche' ? 'Fiche technique' : 'Devis'} : ${p.name}${p.brand ? ` (${p.brand})` : ''}\n`
  } else if (gamme) {
    const r = (await getRanges()).find((x) => x.slug === gamme)
    if (r) message = `Gamme : ${r.name.fr}\n`
  }

  return <ContactPage subject={subject} message={message} />
}
