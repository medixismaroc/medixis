import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getRanges, getRangeBySlug } from '@/lib/data'
import { RangeDetail } from '@/components/ranges/RangeDetail'

export const dynamicParams = true

export async function generateStaticParams() {
  return (await getRanges()).map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: PageProps<'/gammes/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const range = await getRangeBySlug(slug)
  if (!range) return {}
  return {
    title: `${range.name.fr} | Medixis`,
    description: range.summary.fr,
    alternates: { canonical: `/gammes/${range.slug}` },
  }
}

export default async function RangePage({ params }: PageProps<'/gammes/[slug]'>) {
  const { slug } = await params
  const ranges = await getRanges()
  const index = ranges.findIndex((r) => r.slug === slug)
  if (index === -1) notFound()
  return <RangeDetail range={ranges[index]} index={index} prev={ranges[index - 1]} next={ranges[index + 1]} />
}
