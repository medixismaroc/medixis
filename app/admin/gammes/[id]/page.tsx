import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { RangeRow } from '@/lib/supabase/types'
import { RangeForm } from '@/components/admin/RangeForm'
import { updateRangeAction } from '../actions'

export default async function EditRangePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('ranges').select('*').eq('id', id).single()
  if (!data) notFound()
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Modifier la gamme</h1>
      <div className="mt-8"><RangeForm range={data as RangeRow} action={updateRangeAction} submitLabel="Enregistrer" /></div>
    </div>
  )
}
