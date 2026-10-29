import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export const metadata: Metadata = {
  title: 'Admin | Medixis',
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Pas d'utilisateur → le middleware redirige déjà vers /admin/login.
  // On rend les children sans la sidebar pour éviter la boucle sur la page de login.
  if (!user) {
    return <div className="min-h-screen bg-paper-alt">{children}</div>
  }

  return (
    <div className="min-h-screen bg-paper-alt lg:flex">
      <AdminSidebar />
      <main className="min-w-0 flex-1 overflow-auto p-4 sm:p-8">{children}</main>
    </div>
  )
}
