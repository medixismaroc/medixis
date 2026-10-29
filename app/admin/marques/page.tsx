import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { BrandRow } from '@/lib/supabase/types'
import { AdminList, StatusBadge } from '@/components/admin/Fields'
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton'
import { deleteBrandAction } from './actions'

export default async function AdminBrandsPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('brands').select('*').order('order_index')
  const brands = (data ?? []) as BrandRow[]
  return (
    <AdminList title="Marques" count={brands.length} newHref="/admin/marques/nouveau" newLabel="Nouvelle marque" empty="Aucune marque. La section reste masquée sur le site tant qu'elle est vide.">
      {brands.map((b) => (
        <div key={b.id} className="flex items-center justify-between gap-4 px-5 py-4">
          <Link href={`/admin/marques/${b.id}`} className="font-medium text-ink hover:text-navy">{b.name}</Link>
          <div className="flex items-center gap-3">
            <StatusBadge active={b.active} />
            <DeleteConfirmButton action={deleteBrandAction} id={b.id} confirmMessage="Supprimer cette marque ?" />
          </div>
        </div>
      ))}
    </AdminList>
  )
}
