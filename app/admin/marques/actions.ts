'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { refreshPublicSite, deleteOutcome, type DeleteResult } from '../revalidate'

function fields(fd: FormData) {
  return {
    name: String(fd.get('name') ?? ''),
    note_fr: String(fd.get('note_fr') || '') || null,
    note_en: String(fd.get('note_en') || '') || null,
    logo_url: String(fd.get('logo_url') || '') || null,
    order_index: Number(fd.get('order_index') || 0),
    active: fd.get('active') === 'true',
  }
}

export async function createBrandAction(fd: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.from('brands').insert(fields(fd))
  if (error) throw new Error(error.message)
  refreshPublicSite()
  redirect('/admin/marques')
}

export async function updateBrandAction(fd: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.from('brands').update(fields(fd)).eq('id', String(fd.get('id')))
  if (error) throw new Error(error.message)
  refreshPublicSite()
  redirect('/admin/marques')
}

export async function deleteBrandAction(fd: FormData): Promise<DeleteResult> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('brands').delete().eq('id', String(fd.get('id'))).select('id')
  const result = deleteOutcome(error, data)
  if (!result.error) refreshPublicSite()
  return result
}
