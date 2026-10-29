import type { Metadata } from 'next'
import { CompanyPage } from '@/components/pages/CompanyPage'

export const metadata: Metadata = {
  title: 'La société | Medixis',
  description: 'Medixis, société marocaine basée à Casablanca : vente, distribution et import de dispositifs médicaux dans tout le Maroc.',
  alternates: { canonical: '/societe' },
}

export default function Page() {
  return <CompanyPage />
}
