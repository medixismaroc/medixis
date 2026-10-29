'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { refreshPublicSite, deleteOutcome, type DeleteResult } from '../revalidate'

function slugify(s: string) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function fields(fd: FormData) {
  const name_fr = String(fd.get('name_fr') ?? '')
  return {
    slug: slugify(String(fd.get('slug') || name_fr)),
    name_fr,
    name_en: String(fd.get('name_en') || name_fr),
    summary_fr: String(fd.get('summary_fr') ?? ''),
    summary_en: String(fd.get('summary_en') ?? ''),
    body_fr: String(fd.get('body_fr') ?? ''),
    body_en: String(fd.get('body_en') ?? ''),
    image_url: String(fd.get('image_url') || '') || null,
    order_index: Number(fd.get('order_index') || 0),
    active: fd.get('active') === 'true',
  }
}

export async function createRangeAction(fd: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.from('ranges').insert(fields(fd))
  if (error) throw new Error(error.message)
  refreshPublicSite()
  redirect('/admin/gammes')
}

export async function updateRangeAction(fd: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.from('ranges').update(fields(fd)).eq('id', String(fd.get('id')))
  if (error) throw new Error(error.message)
  refreshPublicSite()
  redirect('/admin/gammes')
}

export async function deleteRangeAction(fd: FormData): Promise<DeleteResult> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('ranges').delete().eq('id', String(fd.get('id'))).select('id')
  const result = deleteOutcome(error, data)
  if (!result.error) refreshPublicSite()
  return result
}
