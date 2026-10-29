'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useT } from '@/lib/i18n/LocaleContext'
import type { Range } from '@/lib/content'

/**
 * Index des gammes façon catalogue : une ligne par gamme (réf., nom, marques,
 * nombre de produits). Sur grand écran, la photo de la ligne survolée s'affiche à droite.
 */
export function RangeIndex({ ranges }: { ranges: Range[] }) {
  const t = useT()
  const [hover, setHover] = useState(0)
  const current = ranges[hover]

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <ol className="border-t-2 border-ink lg:col-span-7">
        {ranges.map((r, i) => {
          const brands = [...new Set(r.products.map((p) => p.brand).filter(Boolean))]
          return (
            <li key={r.slug} onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)}>
              <Link
                href={`/gammes/${r.slug}`}
                className="group grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-line py-6 transition-colors hover:bg-paper-alt sm:px-2"
              >
                <span>
                  <span className="display-sm block text-[clamp(1.35rem,2.6vw,2rem)] text-ink">{t(r.name.fr, r.name.en)}</span>
                  <span className="mt-1.5 block text-sm text-muted">
                    {brands.length > 0 ? brands.join(' · ') : t('Marque en cours de confirmation', 'Brand being confirmed')}
                    {' · '}
                    {r.products.length} {r.products.length > 1 ? t('produits', 'products') : t('produit', 'product')}
                  </span>
                </span>
                <ArrowUpRight size={22} className="text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy" />
              </Link>
            </li>
          )
        })}
      </ol>

      <div className="relative hidden lg:col-span-5 lg:block">
        {current?.image && (
          <div className="sticky top-28">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={current.slug} src={current.image} alt="" className="aspect-[4/5] w-full object-cover" />
            <p className="mt-3 max-w-[40ch] text-sm text-muted">{t(current.summary.fr, current.summary.en)}</p>
          </div>
        )}
      </div>
    </div>
  )
}
