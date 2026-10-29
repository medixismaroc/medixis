'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { useT } from '@/lib/i18n/LocaleContext'
import { CONTACT } from '@/lib/constants'
import { NAV, isActive } from '@/lib/nav'
import { LangToggle } from './LangToggle'

export function Header() {
  const t = useT()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fermer le menu mobile à chaque changement de page.
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  return (
    <header className={`fixed inset-x-0 top-0 z-50 h-17 bg-paper transition-[border-color] ${scrolled ? 'border-b border-line' : 'border-b border-transparent'}`}>
      <div className="wrap flex h-full items-center gap-8">
        <Link href="/" className="flex shrink-0 items-center" aria-label={t('Accueil Medixis', 'Medixis home')}>
          <Image src="/img/logo.png" alt="Medixis" width={1200} height={988} priority className="h-11 w-auto" />
        </Link>

        <nav className="ml-auto hidden items-center gap-7 lg:flex" aria-label={t('Menu principal', 'Main menu')}>
          {NAV.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`relative py-2 text-[14px] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:origin-left after:bg-teal after:transition-transform ${
                  active ? 'text-ink after:scale-x-100' : 'text-muted hover:text-ink after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                {t(link.fr, link.en)}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link href="/contact" className="inline-flex items-center gap-1.5 bg-navy px-4 py-2.5 text-[14px] font-semibold text-paper transition-colors hover:bg-navy-deep">
            {t('Demander un devis', 'Request a quote')}
          </Link>
          <LangToggle />
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <LangToggle />
          <button
            type="button"
            aria-label={open ? t('Fermer le menu', 'Close menu') : t('Ouvrir le menu', 'Open menu')}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center text-ink"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-17 flex flex-col overflow-y-auto bg-navy-deep text-paper lg:hidden">
          <nav className="wrap flex flex-col py-6">
            {NAV.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-baseline gap-4 border-b border-paper/15 py-4"
              >
                <span className="ref text-xs text-teal">{String(i + 1).padStart(2, '0')}</span>
                <span className="display-sm text-2xl">{t(link.fr, link.en)}</span>
              </Link>
            ))}
            <Link href="/contact" className="mt-8 flex items-center justify-between bg-paper px-5 py-4 font-semibold text-navy-deep">
              {t('Demander un devis', 'Request a quote')} <ArrowUpRight size={18} />
            </Link>
            <a href={`tel:${CONTACT.phone}`} className="ref mt-4 text-sm text-paper/70">{CONTACT.phoneDisplay}</a>
          </nav>
        </div>
      )}
    </header>
  )
}
