import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProducts, getProductBySlug } from '@/lib/data'
import { ProductDetail } from '@/components/products/ProductDetail'

export const dynamicParams = true

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/produits/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}
  return {
    title: `${product.name}${product.brand ? ` ${product.brand}` : ''} | Medixis`,
    description: product.description.fr,
    alternates: { canonical: `/produits/${product.slug}` },
  }
}

export default async function ProductPage({ params }: PageProps<'/produits/[slug]'>) {
  const { slug } = await params
  const products = await getProducts()
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()
  const related = products.filter((p) => p.rangeSlug === product.rangeSlug && p.slug !== product.slug).slice(0, 3)
  return <ProductDetail product={product} related={related} />
}
