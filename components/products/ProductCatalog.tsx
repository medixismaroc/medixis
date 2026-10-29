'use client'

import { useMemo, useState } from 'react'
import { useT } from '@/lib/i18n/LocaleContext'
import type { Range } from '@/lib/content'
import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { CtaBand } from '@/components/site/CtaBand'
import { ProductCard } from './ProductCard'

/**
 * Portefeuille produits. La tête de page est le filtre lui-même : titre court,
 * gammes en grands boutons, puis la grille, visible dès le premier écran.
 */
export function ProductCatalog({ ranges }: { ranges: Range[] }) {
  const t = useT()
  const products = useMemo(() => ranges.flatMap((r) => r.products), [ranges])
  const brands = useMemo(() => [...new Set(products.map((p) => p.brand).filter(Boolean))] as string[], [products])
  const [range, setRange] = useState('')
  const [brand, setBrand] = useState('')

  const shown = products.filter((p) => (!range || p.rangeSlug === range) && (!brand || p.brand === brand))

  const chip = (active: boolean) =>
    `flex shrink-0 items-baseline gap-2 whitespace-nowrap border px-4 py-2.5 text-[15px] transition-colors sm:px-5 sm:py-3 sm:text-base ${
      active ? 'border-navy bg-navy text-paper' : 'border-line-strong/25 text-ink hover:border-navy'
    }`

  return (
    <>
      <section className="border-b border-line">
        <div className="wrap pb-8 pt-8 sm:pt-10">
          <nav aria-label={t('Fil d’Ariane', 'Breadcrumb')} className="flex items-center gap-2 text-[13px] text-muted">
            <Link href="/" className="hover:text-ink">Medixis</Link>
            <span aria-hidden className="opacity-40">/</span>
            <span className="text-ink">{t('Produits', 'Products')}</span>
          </nav>

          <Reveal className="mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-3 border-b-2 border-ink pb-5 sm:mt-8">
            <h1 className="display text-[clamp(2.4rem,6vw,4.5rem)] leading-none text-ink">{t('Produits', 'Products')}</h1>
            <p className="max-w-[44ch] text-[15px] leading-relaxed text-muted sm:text-right">
              <span className="font-semibold text-ink">
                {t(`${products.length} références, ${ranges.length} gammes.`, `${products.length} items, ${ranges.length} ranges.`)}
              </span>{' '}
              {t('Fiches techniques complètes envoyées sur demande.', 'Full data sheets sent on request.')}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div role="group" aria-label={t('Filtrer par gamme', 'Filter by range')} className="-mx-(--gutter) mt-6 flex gap-2 overflow-x-auto px-(--gutter) pb-1 sm:mx-0 sm:flex-wrap sm:gap-3 sm:px-0">
              <button type="button" className={chip(!range)} aria-pressed={!range} onClick={() => setRange('')}>
                {t('Tout', 'All')} <span className="text-[13px] tabular-nums opacity-60">{products.length}</span>
              </button>
              {ranges.map((r) => (
                <button key={r.slug} type="button" className={chip(range === r.slug)} aria-pressed={range === r.slug} onClick={() => setRange(r.slug)}>
                  {t(r.name.fr, r.name.en)} <span className="text-[13px] tabular-nums opacity-60">{r.products.length}</span>
                </button>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              {brands.length > 1 && (
                <>
                  <label htmlFor="brand" className="text-muted">{t('Marque', 'Brand')}</label>
                  <select
                    id="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="border border-line bg-paper px-3 py-2 text-ink outline-none focus:border-navy"
                  >
                    <option value="">{t('Toutes les marques', 'All brands')}</option>
                    {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </>
              )}
              <p className="ml-auto text-muted" aria-live="polite">
                {shown.length} {shown.length > 1 ? t('résultats', 'results') : t('résultat', 'result')}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 pt-10">
        <div className="wrap">
          {shown.length > 0 ? (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          ) : (
            <div className="border-t border-line pt-10">
              <p className="text-lg text-ink">{t('Aucun produit ne correspond à ces filtres.', 'No product matches these filters.')}</p>
              <button type="button" onClick={() => { setRange(''); setBrand('') }} className="link-rule mt-3 font-semibold text-ink">
                {t('Réinitialiser les filtres', 'Reset filters')}
              </button>
            </div>
          )}
        </div>
      </section>

      <CtaBand title={{ fr: 'Vous ne trouvez pas l’équipement recherché ?', en: 'Can’t find the equipment you need?' }} label={{ fr: 'Décrire votre besoin', en: 'Describe your need' }} />
    </>
  )
}
