import { createClient } from '@/lib/supabase/server'
import type { RangeRow } from '@/lib/supabase/types'
import { ProductForm } from '@/components/admin/ProductForm'
import { createProductAction } from '../actions'

export default async function NewProductPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('ranges').select('*').order('order_index')
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Nouveau produit</h1>
      <div className="mt-8"><ProductForm ranges={(data ?? []) as RangeRow[]} action={createProductAction} submitLabel="Créer" /></div>
    </div>
  )
}
