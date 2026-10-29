import { BrandForm } from '@/components/admin/BrandForm'
import { createBrandAction } from '../actions'

export default function NewBrandPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Nouvelle marque</h1>
      <div className="mt-8"><BrandForm action={createBrandAction} submitLabel="Créer" /></div>
    </div>
  )
}
