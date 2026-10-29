'use client'

import Link from 'next/link'
import { useT } from '@/lib/i18n/LocaleContext'
import type { Brand, Range } from '@/lib/content'
import { Reveal } from '@/components/motion/Reveal'

// Logos officiels, repris des sites des fabricants. [À CONFIRMER] : accord écrit avant publication.
const LOGO: Record<string, string> = {
  Wego: '/img/partenaires/wego.png',
  'Pine BM': '/img/partenaires/pine-bm.png',
}

/** Partenaires industriels sur l'accueil : une ligne par marque, puis les gammes dont la marque reste à confirmer. */
export function PartnerTable({ brands, ranges }: { brands: Brand[]; ranges: Range[] }) {
  const t = useT()
  const rangeOf = (name: string) => ranges.find((r) => r.products.some((p) => p.brand?.startsWith(name)))
  const unbranded = ranges.filter((r) => r.products.length > 0 && r.products.every((p) => !p.brand))

  return (
    <section id="partenaires" className="section border-t border-line">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="display text-[clamp(2.2rem,5vw,4rem)] text-ink">{t('Nos partenaires industriels', 'Our industrial partners')}</h2>
          </Reveal>
          <Reveal delay={0.08} className="flex items-end lg:col-span-4 lg:col-start-9">
            <p className="text-muted">
              {t('Nous travaillons en direct avec chaque fabricant : import, installation et suivi passent par Medixis.', 'We work directly with each manufacturer: import, installation and follow-up go through Medixis.')}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 border-t-2 border-ink">
          <div className="hidden grid-cols-12 gap-6 border-b border-line py-3 text-xs font-medium text-muted md:grid">
            <span className="col-span-4">{t('Marque', 'Brand')}</span>
            <span className="col-span-3">{t('Spécialité', 'Specialty')}</span>
            <span className="col-span-3">{t('Logo', 'Logo')}</span>
            <span className="col-span-2 text-right">{t('Gamme', 'Range')}</span>
          </div>
          {brands.map((b, i) => {
            const r = rangeOf(b.name)
            const logo = b.logo ?? LOGO[b.name]
            return (
              <Reveal key={b.name} delay={i * 0.05} className="grid gap-2 border-b border-line py-7 md:grid-cols-12 md:items-baseline md:gap-6">
                <p className="display text-[clamp(1.8rem,3.4vw,2.75rem)] text-ink md:col-span-4">{b.name}</p>
                <p className="text-ink md:col-span-3">{b.note ? t(b.note.fr, b.note.en) : ''}</p>
                <div className="md:col-span-3 md:self-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {logo && <img src={logo} alt={`Logo ${b.name}`}className="h-8 w-auto max-w-[10rem] object-contain" />}
                </div>
                <p className="md:col-span-2 md:text-right">
                  {r && <Link href={`/gammes/${r.slug}`} className="link-rule text-sm font-semibold text-ink">{t('Voir la gamme', 'View range')}</Link>}
                </p>
              </Reveal>
            )
          })}
          {unbranded.length > 0 && (
            <div className="grid gap-2 border-b border-line py-7 md:grid-cols-12 md:items-baseline md:gap-6">
              <p className="display-sm text-xl text-muted md:col-span-4">{t('Marques en cours de confirmation', 'Brands being confirmed')}</p>
              <p className="text-ink md:col-span-8">{unbranded.map((r) => t(r.name.fr, r.name.en)).join(' · ')}</p>
            </div>
          )}
        </div>

        <p className="mt-10 text-muted">
          {t('Vous êtes fabricant et cherchez un distributeur au Maroc ?', 'Are you a manufacturer looking for a distributor in Morocco?')}{' '}
          <Link href="/contact?sujet=partenariat" className="link-rule font-semibold text-ink">{t('Proposer un partenariat', 'Propose a partnership')}</Link>
        </p>
      </div>
    </section>
  )
}
