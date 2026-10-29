import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { BrandRow } from '@/lib/supabase/types'
import { BrandForm } from '@/components/admin/BrandForm'
import { updateBrandAction } from '../actions'

export default async function EditBrandPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('brands').select('*').eq('id', id).single()
  if (!data) notFound()
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Modifier la marque</h1>
      <div className="mt-8"><BrandForm brand={data as BrandRow} action={updateBrandAction} submitLabel="Enregistrer" /></div>
    </div>
  )
}
