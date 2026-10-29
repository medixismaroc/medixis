'use client'

import Link from 'next/link'
import { useT } from '@/lib/i18n/LocaleContext'
import type { Product } from '@/lib/content'

/** Vignette produit sans cadre : photo, gamme, nom, marque. */
export function ProductCard({ product: p }: { product: Product }) {
  const t = useT()
  return (
    <Link href={`/produits/${p.slug}`} className="group block">
      <div className="overflow-hidden bg-paper-alt">
        {p.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image} alt={p.name} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        )}
      </div>
      <p className="mt-4 text-xs font-medium text-teal-ink">{t(p.rangeName.fr, p.rangeName.en)}</p>
      <h3 className="display-sm mt-1.5 text-lg text-ink decoration-1 underline-offset-4 group-hover:underline">{p.name}</h3>
      <p className="mt-1 text-sm text-muted">{p.brand ?? t('Marque en cours de confirmation', 'Brand being confirmed')}</p>
    </Link>
  )
}
