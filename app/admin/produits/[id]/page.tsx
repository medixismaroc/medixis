import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { ProductRow, RangeRow } from '@/lib/supabase/types'
import { ProductForm } from '@/components/admin/ProductForm'
import { updateProductAction } from '../actions'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const [{ data: p }, { data: r }] = await Promise.all([
    supabase.from('products').select('*').eq('id', id).single(),
    supabase.from('ranges').select('*').order('order_index'),
  ])
  if (!p) notFound()
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Modifier le produit</h1>
      <div className="mt-8"><ProductForm product={p as ProductRow} ranges={(r ?? []) as RangeRow[]} action={updateProductAction} submitLabel="Enregistrer" /></div>
    </div>
  )
}
