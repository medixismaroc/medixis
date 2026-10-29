import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { RangeRow } from '@/lib/supabase/types'
import { AdminList, StatusBadge } from '@/components/admin/Fields'
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton'
import { deleteRangeAction } from './actions'

export default async function AdminRangesPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('ranges').select('*').order('order_index')
  const ranges = (data ?? []) as RangeRow[]
  return (
    <AdminList title="Gammes" count={ranges.length} newHref="/admin/gammes/nouveau" newLabel="Nouvelle gamme" empty="Aucune gamme pour le moment.">
      {ranges.map((r) => (
        <div key={r.id} className="flex items-center justify-between gap-4 px-5 py-4">
          <Link href={`/admin/gammes/${r.id}`} className="font-medium text-ink hover:text-navy">{r.name_fr}</Link>
          <div className="flex items-center gap-3">
            <StatusBadge active={r.active} />
            <DeleteConfirmButton action={deleteRangeAction} id={r.id} confirmMessage="Supprimer cette gamme et tous ses produits ?" />
          </div>
        </div>
      ))}
    </AdminList>
  )
}
