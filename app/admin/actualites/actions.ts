'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/content'
import { refreshPublicSite, deleteOutcome, type DeleteResult } from '../revalidate'

function fields(fd: FormData) {
  const title_fr = String(fd.get('title_fr') ?? '')
  return {
    slug: slugify(String(fd.get('slug') || '') || title_fr),
    title_fr,
    title_en: String(fd.get('title_en') ?? ''),
    excerpt_fr: String(fd.get('excerpt_fr') ?? ''),
    excerpt_en: String(fd.get('excerpt_en') ?? ''),
    body_fr: String(fd.get('body_fr') ?? ''),
    body_en: String(fd.get('body_en') ?? ''),
    image_url: String(fd.get('image_url') || '') || null,
    published_at: String(fd.get('published_at') || new Date().toISOString().slice(0, 10)),
    active: fd.get('active') === 'true',
  }
}

export async function createPostAction(fd: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.from('posts').insert(fields(fd))
  if (error) throw new Error(error.message)
  refreshPublicSite()
  redirect('/admin/actualites')
}

export async function updatePostAction(fd: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.from('posts').update(fields(fd)).eq('id', String(fd.get('id')))
  if (error) throw new Error(error.message)
  refreshPublicSite()
  redirect('/admin/actualites')
}

export async function deletePostAction(fd: FormData): Promise<DeleteResult> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('posts').delete().eq('id', String(fd.get('id'))).select('id')
  const result = deleteOutcome(error, data)
  if (!result.error) refreshPublicSite()
  return result
}
