'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useT } from '@/lib/i18n/LocaleContext'
import { CONTACT, LEGAL, whatsappHref } from '@/lib/constants'
import { NAV } from '@/lib/nav'
import type { Range } from '@/lib/content'

export function Footer({ ranges }: { ranges: Range[] }) {
  const t = useT()
  const year = new Date().getFullYear()
  const legal = [LEGAL.rc && `RC ${LEGAL.rc}`, LEGAL.ice && `ICE ${LEGAL.ice}`, LEGAL.if && `IF ${LEGAL.if}`].filter(Boolean)

  return (
    <footer className="bg-navy-deep text-paper">
      <div className="wrap pb-10 pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Image src="/img/logo-blanc.png" alt="Medixis" width={1200} height={988} className="h-16 w-auto" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-paper/70">
              {t('Vente, distribution et import de dispositifs médicaux. Casablanca, Maroc.', 'Sales, distribution and import of medical devices. Casablanca, Morocco.')}
            </p>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-xs font-semibold text-paper/50">{t('Pages', 'Pages')}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-paper/80 hover:text-paper">{t(l.fr, l.en)}</Link></li>
              ))}
              <li><Link href="/contact" className="text-paper/80 hover:text-paper">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-xs font-semibold text-paper/50">{t('Gammes', 'Ranges')}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {ranges.map((r) => (
                <li key={r.slug}><Link href={`/gammes/${r.slug}`} className="text-paper/80 hover:text-paper">{t(r.name.fr, r.name.en)}</Link></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-xs font-semibold text-paper/50">Contact</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-paper/80">
              <li><a href={`tel:${CONTACT.phone}`} className="ref hover:text-paper">{CONTACT.phoneDisplay}</a></li>
              <li><a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="hover:text-paper">WhatsApp</a></li>
              <li>{t(CONTACT.cityFr, CONTACT.cityEn)}</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-paper/15 pt-6 text-xs text-paper/50 sm:flex-row sm:justify-between">
          <p>© {year} Medixis{legal.length > 0 && ` · ${legal.join(' · ')}`}</p>
          <p>
            {t('Site réalisé par', 'Website by')}{' '}
            <a href="https://agencelepanaf.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-paper">Agence Le Panaf</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
