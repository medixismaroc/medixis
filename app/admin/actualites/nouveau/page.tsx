import { PostForm } from '@/components/admin/PostForm'
import { createPostAction } from '../actions'

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Nouvel article</h1>
      <div className="mt-8"><PostForm action={createPostAction} submitLabel="Publier" /></div>
    </div>
  )
}
