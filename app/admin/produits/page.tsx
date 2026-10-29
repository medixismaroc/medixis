import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { ProductRow, RangeRow } from '@/lib/supabase/types'
import { AdminList, StatusBadge } from '@/components/admin/Fields'
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton'
import { deleteProductAction } from './actions'

export default async function AdminProductsPage() {
  const supabase = await createClient()
  const [{ data: p }, { data: r }] = await Promise.all([
    supabase.from('products').select('*').order('order_index'),
    supabase.from('ranges').select('*').order('order_index'),
  ])
  const products = (p ?? []) as ProductRow[]
  const rangeName = new Map(((r ?? []) as RangeRow[]).map((x) => [x.id, x.name_fr]))
  return (
    <AdminList title="Produits" count={products.length} newHref="/admin/produits/nouveau" newLabel="Nouveau produit" empty="Aucun produit pour le moment.">
      {products.map((x) => (
        <div key={x.id} className="flex items-center justify-between gap-4 px-5 py-4">
          <div>
            <Link href={`/admin/produits/${x.id}`} className="font-medium text-ink hover:text-navy">{x.name}</Link>
            <p className="text-xs text-muted">{rangeName.get(x.range_id)}{x.brand ? ` · ${x.brand}` : ''}</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge active={x.active} />
            <DeleteConfirmButton action={deleteProductAction} id={x.id} confirmMessage="Supprimer ce produit ?" />
          </div>
        </div>
      ))}
    </AdminList>
  )
}
