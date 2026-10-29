import type { ProductRow, RangeRow } from '@/lib/supabase/types'
import { BilingualField } from './BilingualField'
import { ImageUpload } from './ImageUpload'
import { TextField, ActiveToggle, FormCard } from './Fields'

export function ProductForm({ product, ranges, action, submitLabel }: {
  product?: ProductRow; ranges: RangeRow[]; action: (fd: FormData) => Promise<void>; submitLabel: string
}) {
  return (
    <FormCard action={action} submitLabel={submitLabel} id={product?.id}>
      <div>
        <label htmlFor="range_id" className="mb-1.5 block text-sm font-medium text-ink">Gamme</label>
        <select id="range_id" name="range_id" required defaultValue={product?.range_id ?? ''} className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy">
          <option value="" disabled>Choisir une gamme…</option>
          {ranges.map((r) => <option key={r.id} value={r.id}>{r.name_fr}</option>)}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Nom du produit" name="name" required defaultValue={product?.name} />
        <TextField label="Marque" name="brand" defaultValue={product?.brand} />
      </div>
      <TextField label="Adresse de la fiche (slug)" name="slug" defaultValue={product?.slug} hint="Ex. colonne-video-endoscopie. Laisser vide pour la générer depuis le nom." />
      <BilingualField label="Description" nameFr="description_fr" nameEn="description_en" defaultValueFr={product?.description_fr} defaultValueEn={product?.description_en} multiline />
      <BilingualField label="Points clés (un par ligne)" nameFr="highlights_fr" nameEn="highlights_en" defaultValueFr={product?.highlights_fr} defaultValueEn={product?.highlights_en} multiline />
      <BilingualField label="Caractéristiques techniques (une par ligne, « Libellé : valeur »)" nameFr="specs_fr" nameEn="specs_en" defaultValueFr={product?.specs_fr} defaultValueEn={product?.specs_en} multiline />
      <ImageUpload name="image_url" label="Photo du produit" defaultValue={product?.image_url} folder="produits" />
      <ImageUpload name="datasheet_url" label="Fiche technique (PDF, facultatif)" defaultValue={product?.datasheet_url} folder="fiches" accept="application/pdf" />
      <TextField label="Ordre d'affichage" name="order_index" type="number" defaultValue={product?.order_index ?? 0} />
      <ActiveToggle defaultChecked={product?.active ?? true} />
    </FormCard>
  )
}
