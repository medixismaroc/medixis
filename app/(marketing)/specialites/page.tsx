import type { Metadata } from 'next'
import { getRanges } from '@/lib/data'
import { SpecialtiesPage } from '@/components/pages/SpecialtiesPage'

export const metadata: Metadata = {
  title: 'Spécialités | Medixis',
  description: 'Endoscopie, stérilisation, fils de suture, ablation tumorale, générateurs ultrasoniques et électrochirurgicaux : les spécialités couvertes par Medixis au Maroc.',
  alternates: { canonical: '/specialites' },
}

export default async function Page() {
  return <SpecialtiesPage ranges={await getRanges()} />
}
