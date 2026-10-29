import type { Metadata } from 'next'
import { getRanges } from '@/lib/data'
import { ProductCatalog } from '@/components/products/ProductCatalog'

export const metadata: Metadata = {
  title: 'Portefeuille produits | Medixis',
  description: 'Endoscopie, stérilisation, sutures, ablation et électrochirurgie : les dispositifs médicaux distribués par Medixis au Maroc.',
  alternates: { canonical: '/produits' },
}

export default async function ProductsPage() {
  return <ProductCatalog ranges={await getRanges()} />
}
