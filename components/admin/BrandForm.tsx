import type { BrandRow } from '@/lib/supabase/types'
import { BilingualField } from './BilingualField'
import { ImageUpload } from './ImageUpload'
import { TextField, ActiveToggle, FormCard } from './Fields'

export function BrandForm({ brand, action, submitLabel }: {
  brand?: BrandRow; action: (fd: FormData) => Promise<void>; submitLabel: string
}) {
  return (
    <FormCard action={action} submitLabel={submitLabel} id={brand?.id}>
      <TextField label="Nom de la marque" name="name" required defaultValue={brand?.name} />
      <BilingualField label="Précision sous le nom (facultatif)" nameFr="note_fr" nameEn="note_en" defaultValueFr={brand?.note_fr ?? ''} defaultValueEn={brand?.note_en ?? ''} />
      <div>
        <ImageUpload name="logo_url" label="Logo (facultatif)" defaultValue={brand?.logo_url} folder="marques" />
        <p className="mt-2 rounded-lg bg-teal-soft px-3 py-2 text-xs text-teal-ink">
          N&apos;ajoutez un logo qu&apos;avec l&apos;accord écrit de la marque. Sans logo, seul le nom s&apos;affiche.
        </p>
      </div>
      <TextField label="Ordre d'affichage" name="order_index" type="number" defaultValue={brand?.order_index ?? 0} />
      <ActiveToggle defaultChecked={brand?.active ?? true} />
    </FormCard>
  )
}
