'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/content'
import { refreshPublicSite, deleteOutcome, type DeleteResult } from '../revalidate'

function fields(fd: FormData) {
  const name = String(fd.get('name') ?? '')
  return {
    range_id: String(fd.get('range_id')),
    name,
    slug: slugify(String(fd.get('slug') || '') || name),
    highlights_fr: String(fd.get('highlights_fr') ?? ''),
    highlights_en: String(fd.get('highlights_en') ?? ''),
    specs_fr: String(fd.get('specs_fr') ?? ''),
    specs_en: String(fd.get('specs_en') ?? ''),
    brand: String(fd.get('brand') || '') || null,
    description_fr: String(fd.get('description_fr') ?? ''),
    description_en: String(fd.get('description_en') ?? ''),
    image_url: String(fd.get('image_url') || '') || null,
    datasheet_url: String(fd.get('datasheet_url') || '') || null,
    order_index: Number(fd.get('order_index') || 0),
    active: fd.get('active') === 'true',
  }
}

export async function createProductAction(fd: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.from('products').insert(fields(fd))
  if (error) throw new Error(error.message)
  refreshPublicSite()
  redirect('/admin/produits')
}

export async function updateProductAction(fd: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.from('products').update(fields(fd)).eq('id', String(fd.get('id')))
  if (error) throw new Error(error.message)
  refreshPublicSite()
  redirect('/admin/produits')
}

export async function deleteProductAction(fd: FormData): Promise<DeleteResult> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('products').delete().eq('id', String(fd.get('id'))).select('id')
  const result = deleteOutcome(error, data)
  if (!result.error) refreshPublicSite()
  return result
}
