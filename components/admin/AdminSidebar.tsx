'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Layers, Package, BadgeCheck, Newspaper, Settings, LogOut, Menu, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const LINKS = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, exact: true },
  { href: '/admin/gammes', label: 'Gammes', icon: Layers },
  { href: '/admin/produits', label: 'Produits', icon: Package },
  { href: '/admin/marques', label: 'Marques', icon: BadgeCheck },
  { href: '/admin/actualites', label: 'Actualités', icon: Newspaper },
  { href: '/admin/parametres', label: 'Paramètres', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const nav = (
    <nav className="mt-8 flex-1 space-y-1">
      {LINKS.map((link) => {
        const active = link.exact ? pathname === link.href : pathname.startsWith(link.href)
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active ? 'bg-navy text-paper' : 'text-muted hover:bg-paper-alt hover:text-ink'
            }`}
          >
            <link.icon size={17} />
            {link.label}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <>
      {/* Barre mobile */}
      <div className="flex items-center justify-between border-b border-line bg-paper px-4 py-3 lg:hidden">
        <Link href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
          <Image src="/img/logo.png" alt="Medixis" width={1200} height={988} className="h-9 w-auto" />
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">Admin</span>
        </Link>
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex items-center justify-center rounded-md p-2 text-ink"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Fond semi-transparent quand le tiroir mobile est ouvert */}
      {open && <div className="fixed inset-0 z-40 bg-navy-deep/40 lg:hidden" onClick={() => setOpen(false)} />}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 -translate-x-full transform flex-col border-r border-line bg-paper px-4 py-6 transition-transform duration-200 lg:static lg:z-auto lg:w-64 lg:shrink-0 lg:translate-x-0 ${
          open ? 'translate-x-0' : ''
        }`}
      >
        <Link href="/" target="_blank" rel="noopener noreferrer" className="hidden items-center gap-2 px-2 lg:flex">
          <Image src="/img/logo.png" alt="Medixis" width={1200} height={988} className="h-12 w-auto" />
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">Admin</span>
        </Link>
        {nav}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-paper-alt hover:text-ink"
        >
          <LogOut size={17} />
          Déconnexion
        </button>
      </aside>
    </>
  )
}
