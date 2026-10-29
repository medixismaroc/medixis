import type { RangeRow } from '@/lib/supabase/types'
import { BilingualField } from './BilingualField'
import { ImageUpload } from './ImageUpload'
import { TextField, ActiveToggle, FormCard } from './Fields'

export function RangeForm({ range, action, submitLabel }: {
  range?: RangeRow; action: (fd: FormData) => Promise<void>; submitLabel: string
}) {
  return (
    <FormCard action={action} submitLabel={submitLabel} id={range?.id}>
      <BilingualField required label="Nom de la gamme" nameFr="name_fr" nameEn="name_en" defaultValueFr={range?.name_fr} defaultValueEn={range?.name_en} />
      <BilingualField label="Résumé (carte sur l'accueil)" nameFr="summary_fr" nameEn="summary_en" defaultValueFr={range?.summary_fr} defaultValueEn={range?.summary_en} multiline />
      <BilingualField label="Présentation (page de la gamme)" nameFr="body_fr" nameEn="body_en" defaultValueFr={range?.body_fr} defaultValueEn={range?.body_en} multiline />
      <ImageUpload name="image_url" label="Image de la gamme" defaultValue={range?.image_url} folder="gammes" />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Adresse de la page" name="slug" defaultValue={range?.slug} hint="Ex. imagerie → medixis.ma/gammes/imagerie. Vide = calculé depuis le nom." />
        <TextField label="Ordre d'affichage" name="order_index" type="number" defaultValue={range?.order_index ?? 0} />
      </div>
      <ActiveToggle defaultChecked={range?.active ?? true} />
    </FormCard>
  )
}
