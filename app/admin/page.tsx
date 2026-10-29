import Link from 'next/link'
import { Layers, Package, BadgeCheck, Newspaper, AlertTriangle } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { isMaintenanceMode } from '@/lib/settings'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const [ranges, products, brands, posts, maintenance] = await Promise.all([
    supabase.from('ranges').select('id', { count: 'exact', head: true }).eq('active', true),
    supabase.from('products').select('id', { count: 'exact', head: true }).eq('active', true),
    supabase.from('brands').select('id', { count: 'exact', head: true }).eq('active', true),
    supabase.from('posts').select('id', { count: 'exact', head: true }).eq('active', true),
    isMaintenanceMode(),
  ])

  const cards = [
    { href: '/admin/gammes', label: 'Gammes visibles', count: ranges.count ?? 0, icon: Layers },
    { href: '/admin/produits', label: 'Produits visibles', count: products.count ?? 0, icon: Package },
    { href: '/admin/marques', label: 'Marques visibles', count: brands.count ?? 0, icon: BadgeCheck },
    { href: '/admin/actualites', label: 'Actualités publiées', count: posts.count ?? 0, icon: Newspaper },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Tableau de bord</h1>
      <p className="mt-1 text-sm text-muted">Vue d&apos;ensemble du contenu publié sur le site.</p>
      {maintenance && (
        <Link href="/admin/parametres" className="mt-6 flex items-center gap-2.5 rounded-xl bg-teal-soft px-4 py-3 text-sm font-medium text-teal-ink">
          <AlertTriangle size={16} />
          Le site est en veille : les visiteurs voient une page de maintenance.
        </Link>
      )}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="rounded-2xl border border-line bg-paper p-6 shadow-card transition-shadow hover:shadow-lift">
            <c.icon size={20} className="text-navy" />
            <div className="mt-4 text-2xl font-bold text-ink">{c.count}</div>
            <div className="mt-1 text-sm text-muted">{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
