import { createClient as createSupabase } from '@supabase/supabase-js'
import { RANGES, BRANDS, POSTS, lines, specPairs, type Range, type Brand, type Product, type Post } from '@/lib/content'
import type { RangeRow, ProductRow, BrandRow, PostRow } from '@/lib/supabase/types'

/**
 * Lecture publique du contenu. Client sans cookies : les pages restent
 * statiques et sont régénérées à chaque modification dans l'admin.
 * Si Supabase n'est pas configuré ou ne répond pas, on sert le contenu de secours.
 */
function publicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createSupabase(url, key, { auth: { persistSession: false } })
}

// Anciens visuels SVG supprimés : redirige vers les photos tant que 0004_photos.sql n'a pas tourné.
const LEGACY: Record<string, string> = {
  endoscopie: 'endoscopie', sterilisation: 'sterilisation', sutures: 'instruments', ablation: 'ablation',
  electrochirurgie: 'chirurgiens', 'actu-medica': 'salon', 'actu-lancement': 'salle-vide', 'actu-partenariat': 'endoscopie',
}
function img(url: string | null): string | undefined {
  const m = url?.match(/^\/img\/placeholders\/(.+)\.svg$/)
  if (m) return LEGACY[m[1]] ? `/img/photos/${LEGACY[m[1]]}.jpg` : undefined
  return url ?? undefined
}

function toProduct(p: ProductRow, r: RangeRow): Product {
  return {
    slug: p.slug || p.id,
    name: p.name,
    brand: p.brand ?? undefined,
    description: { fr: p.description_fr, en: p.description_en },
    highlights: { fr: lines(p.highlights_fr ?? ''), en: lines(p.highlights_en ?? '') },
    specs: { fr: specPairs(p.specs_fr ?? ''), en: specPairs(p.specs_en ?? '') },
    image: img(p.image_url) ?? img(r.image_url),
    datasheet: p.datasheet_url ?? undefined,
    rangeSlug: r.slug,
    rangeName: { fr: r.name_fr, en: r.name_en },
  }
}

function toRange(r: RangeRow, products: ProductRow[]): Range {
  return {
    slug: r.slug,
    name: { fr: r.name_fr, en: r.name_en },
    summary: { fr: r.summary_fr, en: r.summary_en },
    body: { fr: r.body_fr, en: r.body_en },
    image: img(r.image_url),
    products: products.filter((p) => p.range_id === r.id).map((p) => toProduct(p, r)),
  }
}

export async function getRanges(): Promise<Range[]> {
  const sb = publicClient()
  if (!sb) return RANGES
  const [ranges, products] = await Promise.all([
    sb.from('ranges').select('*').eq('active', true).order('order_index'),
    sb.from('products').select('*').eq('active', true).order('order_index'),
  ])
  if (ranges.error || products.error) return RANGES
  return (ranges.data as RangeRow[]).map((r) => toRange(r, products.data as ProductRow[]))
}

export async function getRangeBySlug(slug: string): Promise<Range | undefined> {
  return (await getRanges()).find((r) => r.slug === slug)
}

export async function getProducts(): Promise<Product[]> {
  return (await getRanges()).flatMap((r) => r.products)
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return (await getProducts()).find((p) => p.slug === slug)
}

export async function getBrands(): Promise<Brand[]> {
  const sb = publicClient()
  if (!sb) return BRANDS
  const { data, error } = await sb.from('brands').select('*').eq('active', true).order('order_index')
  if (error) return BRANDS
  return (data as BrandRow[]).map((b) => ({
    name: b.name,
    note: b.note_fr || b.note_en ? { fr: b.note_fr ?? '', en: b.note_en ?? '' } : undefined,
    logo: b.logo_url ?? undefined,
  }))
}

export async function getPosts(): Promise<Post[]> {
  const sb = publicClient()
  if (!sb) return POSTS
  const { data, error } = await sb.from('posts').select('*').eq('active', true).order('published_at', { ascending: false })
  if (error) return POSTS
  return (data as PostRow[]).map((p) => ({
    slug: p.slug,
    title: { fr: p.title_fr, en: p.title_en },
    excerpt: { fr: p.excerpt_fr, en: p.excerpt_en },
    body: { fr: p.body_fr, en: p.body_en },
    image: img(p.image_url),
    date: p.published_at,
  }))
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find((p) => p.slug === slug)
}
