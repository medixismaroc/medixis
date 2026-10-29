import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { PostRow } from '@/lib/supabase/types'
import { PostForm } from '@/components/admin/PostForm'
import { updatePostAction } from '../actions'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('posts').select('*').eq('id', id).single()
  if (!data) notFound()
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Modifier l&apos;article</h1>
      <div className="mt-8"><PostForm post={data as PostRow} action={updatePostAction} submitLabel="Enregistrer" /></div>
    </div>
  )
}
