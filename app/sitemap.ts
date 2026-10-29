import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { getRanges, getPosts } from '@/lib/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [ranges, posts] = await Promise.all([getRanges(), getPosts()])
  return [
    { url: `${SITE_URL}/`, changeFrequency: 'monthly', priority: 1 },
    ...['specialites', 'produits', 'services', 'societe', 'contact'].map((page) => ({ url: `${SITE_URL}/${page}`, changeFrequency: 'monthly' as const, priority: 0.9 })),
    { url: `${SITE_URL}/actualites`, changeFrequency: 'weekly', priority: 0.7 },
    ...ranges.map((r) => ({ url: `${SITE_URL}/gammes/${r.slug}`, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...ranges.flatMap((r) => r.products).map((p) => ({ url: `${SITE_URL}/produits/${p.slug}`, changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...posts.map((p) => ({ url: `${SITE_URL}/actualites/${p.slug}`, lastModified: p.date, changeFrequency: 'yearly' as const, priority: 0.5 })),
  ]
}
