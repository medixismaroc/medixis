import type { Metadata } from 'next'
import { ServicesPage } from '@/components/pages/ServicesPage'

export const metadata: Metadata = {
  title: 'Services | Medixis',
  description: 'Sélection, import, installation, formation, consommables et service après-vente : l’accompagnement Medixis pour vos équipements médicaux.',
  alternates: { canonical: '/services' },
}

export default function Page() {
  return <ServicesPage />
}
