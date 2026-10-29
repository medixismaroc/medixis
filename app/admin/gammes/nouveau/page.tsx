import { RangeForm } from '@/components/admin/RangeForm'
import { createRangeAction } from '../actions'

export default function NewRangePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Nouvelle gamme</h1>
      <div className="mt-8"><RangeForm action={createRangeAction} submitLabel="Créer" /></div>
    </div>
  )
}
