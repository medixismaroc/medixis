import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPosts, getPostBySlug } from '@/lib/data'
import { PostDetail } from '@/components/news/PostDetail'

export const dynamicParams = true

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/actualites/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title.fr} | Medixis`,
    description: post.excerpt.fr,
    alternates: { canonical: `/actualites/${post.slug}` },
    openGraph: post.image && !post.image.endsWith('.svg') ? { images: [post.image] } : undefined,
  }
}

export default async function PostPage({ params }: PageProps<'/actualites/[slug]'>) {
  const { slug } = await params
  const posts = await getPosts()
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()
  return <PostDetail post={post} others={posts.filter((p) => p.slug !== slug).slice(0, 3)} />
}
