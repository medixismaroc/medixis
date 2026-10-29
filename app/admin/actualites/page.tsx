import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { PostRow } from '@/lib/supabase/types'
import { AdminList, StatusBadge } from '@/components/admin/Fields'
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton'
import { deletePostAction } from './actions'

export default async function AdminPostsPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('posts').select('*').order('published_at', { ascending: false })
  const posts = (data ?? []) as PostRow[]
  return (
    <AdminList title="Actualités" count={posts.length} newHref="/admin/actualites/nouveau" newLabel="Nouvel article" empty="Aucun article. La section reste masquée sur l'accueil tant qu'elle est vide.">
      {posts.map((p) => (
        <div key={p.id} className="flex items-center justify-between gap-4 px-5 py-4">
          <div>
            <Link href={`/admin/actualites/${p.id}`} className="font-medium text-ink hover:text-navy">{p.title_fr}</Link>
            <p className="text-xs text-muted">{p.published_at}</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge active={p.active} />
            <DeleteConfirmButton action={deletePostAction} id={p.id} confirmMessage="Supprimer cet article ?" />
          </div>
        </div>
      ))}
    </AdminList>
  )
}
