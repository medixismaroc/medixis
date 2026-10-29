import type { Metadata } from 'next'
import { getPosts } from '@/lib/data'
import { NewsList } from '@/components/news/NewsList'

export const metadata: Metadata = {
  title: 'Actualités | Medixis',
  description: 'Nouvelles gammes, salons et partenariats de Medixis, distributeur de dispositifs médicaux au Maroc.',
  alternates: { canonical: '/actualites' },
}

export default async function NewsPage() {
  return <NewsList posts={await getPosts()} />
}
