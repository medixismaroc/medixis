import type { PostRow } from '@/lib/supabase/types'
import { BilingualField } from './BilingualField'
import { ImageUpload } from './ImageUpload'
import { TextField, ActiveToggle, FormCard } from './Fields'

export function PostForm({ post, action, submitLabel }: {
  post?: PostRow; action: (fd: FormData) => Promise<void>; submitLabel: string
}) {
  return (
    <FormCard action={action} submitLabel={submitLabel} id={post?.id}>
      <BilingualField label="Titre" nameFr="title_fr" nameEn="title_en" defaultValueFr={post?.title_fr} defaultValueEn={post?.title_en} required />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Date de publication" name="published_at" type="date" defaultValue={post?.published_at ?? new Date().toISOString().slice(0, 10)} />
        <TextField label="Adresse de l'article (slug)" name="slug" defaultValue={post?.slug} hint="Laisser vide pour la générer depuis le titre." />
      </div>
      <BilingualField label="Résumé (affiché sur les cartes)" nameFr="excerpt_fr" nameEn="excerpt_en" defaultValueFr={post?.excerpt_fr} defaultValueEn={post?.excerpt_en} multiline />
      <BilingualField label="Texte (une ligne vide entre deux paragraphes)" nameFr="body_fr" nameEn="body_en" defaultValueFr={post?.body_fr} defaultValueEn={post?.body_en} multiline />
      <ImageUpload name="image_url" label="Image de l'article" defaultValue={post?.image_url} folder="actualites" />
      <ActiveToggle defaultChecked={post?.active ?? true} />
    </FormCard>
  )
}
